import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";

export type FakePackage = { readonly versions: readonly string[]; readonly latest?: string };

/** A local stand-in for the npm registry's abbreviated metadata endpoint. */
export async function startRegistry(
  packages: Readonly<Record<string, FakePackage>>,
  behaviour: { readonly failWith?: number; readonly delayMs?: number } = {},
): Promise<{
  readonly url: string;
  readonly requests: string[];
  readonly close: () => Promise<void>;
}> {
  const requests: string[] = [];
  const server: Server = createServer((request, response) => {
    const name = decodeURIComponent((request.url ?? "/").slice(1));
    requests.push(name);
    setTimeout(() => {
      if (behaviour.failWith) {
        response.writeHead(behaviour.failWith).end();
        return;
      }
      const found = packages[name];
      if (!found) {
        response.writeHead(404).end();
        return;
      }
      response.writeHead(200, { "content-type": "application/json" });
      response.end(
        JSON.stringify({
          name,
          "dist-tags": found.latest ? { latest: found.latest } : {},
          versions: Object.fromEntries(found.versions.map((version) => [version, {}])),
        }),
      );
    }, behaviour.delayMs ?? 0);
  });

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return {
    url: `http://127.0.0.1:${port}/`,
    requests,
    close: () =>
      new Promise((resolve) => {
        server.closeAllConnections?.();
        server.close(() => resolve());
      }),
  };
}
