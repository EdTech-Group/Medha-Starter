import http from "node:http";
import https from "node:https";

const DEFAULT_REGISTRY = "https://registry.npmjs.org/";
// Even abbreviated metadata is large for packages with many canaries (next: ~26 MB).
const MAX_BODY_BYTES = 100 * 1024 * 1024;

export type PackageVersions = {
  /** Every published version, including prereleases. */
  readonly versions: readonly string[];
  /** The "latest" dist-tag, or null when the package has none. */
  readonly latest: string | null;
};

export type RegistryClient = {
  readonly registry: string;
  /** Resolves to null when the package does not exist; rejects on network errors and timeouts. */
  readonly getPackageVersions: (name: string) => Promise<PackageVersions | null>;
};

/** The registry npm, pnpm, yarn and bun were configured with, or the public npm registry. */
export function resolveRegistryUrl(env: NodeJS.ProcessEnv = process.env): string {
  const configured = env.npm_config_registry ?? env.NPM_CONFIG_REGISTRY ?? DEFAULT_REGISTRY;
  return configured.endsWith("/") ? configured : `${configured}/`;
}

export function createRegistryClient(
  options: { readonly registry?: string; readonly timeoutMs?: number } = {},
): RegistryClient {
  const registry = options.registry ?? resolveRegistryUrl();
  const timeoutMs = options.timeoutMs ?? 5000;
  const cache = new Map<string, Promise<PackageVersions | null>>();

  return {
    registry,
    getPackageVersions(name) {
      let pending = cache.get(name);
      if (!pending) {
        pending = fetchPackageVersions(registry, name, timeoutMs);
        cache.set(name, pending);
      }
      return pending;
    },
  };
}

async function fetchPackageVersions(
  registry: string,
  name: string,
  timeoutMs: number,
): Promise<PackageVersions | null> {
  // Scoped names keep their "@" but encode the "/" (e.g. @types%2fnode).
  const url = new URL(
    `${registry}${name.startsWith("@") ? `@${encodeURIComponent(name.slice(1))}` : encodeURIComponent(name)}`,
  );
  const body = await getJson(url, timeoutMs);
  if (body === null) return null;

  const document = body as {
    versions?: Record<string, unknown>;
    "dist-tags"?: { latest?: unknown };
  };
  const latest = document["dist-tags"]?.latest;
  return {
    versions: Object.keys(document.versions ?? {}),
    latest: typeof latest === "string" ? latest : null,
  };
}

function getJson(url: URL, timeoutMs: number): Promise<unknown | null> {
  const transport = url.protocol === "http:" ? http : https;

  return new Promise((resolve, reject) => {
    const request = transport.get(
      url,
      {
        headers: {
          // Abbreviated metadata: much smaller than the full document.
          accept: "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8",
          "user-agent": "medha-starter",
        },
      },
      (response) => {
        const status = response.statusCode ?? 0;
        if (status === 404) {
          response.resume();
          resolve(null);
          return;
        }
        if (status < 200 || status >= 300) {
          response.resume();
          reject(new Error(`${url.href} responded with HTTP ${status}.`));
          return;
        }

        const chunks: Buffer[] = [];
        let size = 0;
        response.on("data", (chunk: Buffer) => {
          size += chunk.length;
          if (size > MAX_BODY_BYTES) {
            request.destroy(new Error(`${url.href} returned more than ${MAX_BODY_BYTES} bytes.`));
            return;
          }
          chunks.push(chunk);
        });
        response.on("end", () => {
          try {
            resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
          } catch {
            reject(new Error(`${url.href} returned invalid JSON.`));
          }
        });
        response.on("error", reject);
      },
    );

    request.setTimeout(timeoutMs, () => {
      request.destroy(new Error(`${url.href} did not respond within ${timeoutMs / 1000}s.`));
    });
    request.on("error", reject);
  });
}
