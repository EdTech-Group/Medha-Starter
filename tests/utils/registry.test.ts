import { afterEach, describe, expect, test } from "bun:test";
import { createRegistryClient, resolveRegistryUrl } from "../../src/utils/registry.js";
import { startRegistry } from "../helpers/registry-server.js";

let close: (() => Promise<void>) | undefined;
afterEach(async () => {
  await close?.();
  close = undefined;
});

describe("resolveRegistryUrl", () => {
  test("uses the configured registry, with a trailing slash", () => {
    expect(resolveRegistryUrl({})).toBe("https://registry.npmjs.org/");
    expect(resolveRegistryUrl({ npm_config_registry: "https://npm.example.com/repo" })).toBe(
      "https://npm.example.com/repo/",
    );
    expect(resolveRegistryUrl({ NPM_CONFIG_REGISTRY: "https://other.example.com/" })).toBe(
      "https://other.example.com/",
    );
  });
});

describe("createRegistryClient", () => {
  test("reads versions and the latest tag, including scoped packages, and caches lookups", async () => {
    const registry = await startRegistry({
      next: { versions: ["16.4.2", "16.5.0"], latest: "16.5.0" },
      "@types/node": { versions: ["22.0.0"], latest: "22.0.0" },
    });
    close = registry.close;
    const client = createRegistryClient({ registry: registry.url });

    expect(await client.getPackageVersions("next")).toEqual({
      versions: ["16.4.2", "16.5.0"],
      latest: "16.5.0",
    });
    expect(await client.getPackageVersions("@types/node")).toEqual({
      versions: ["22.0.0"],
      latest: "22.0.0",
    });
    await client.getPackageVersions("next");
    expect(registry.requests).toEqual(["next", "@types/node"]);
  });

  test("returns null for unknown packages and rejects on server errors and timeouts", async () => {
    const ok = await startRegistry({});
    close = ok.close;
    expect(await createRegistryClient({ registry: ok.url }).getPackageVersions("nope")).toBeNull();
    await ok.close();

    const failing = await startRegistry({}, { failWith: 503 });
    close = failing.close;
    await expect(
      createRegistryClient({ registry: failing.url }).getPackageVersions("x"),
    ).rejects.toThrow("HTTP 503");
    await failing.close();

    const slow = await startRegistry({ x: { versions: ["1.0.0"] } }, { delayMs: 500 });
    close = slow.close;
    await expect(
      createRegistryClient({ registry: slow.url, timeoutMs: 50 }).getPackageVersions("x"),
    ).rejects.toThrow("did not respond");
  });
});
