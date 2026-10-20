import { describe, expect, test } from "bun:test";
import { resolveNewestVersions } from "../../../src/core/generator/versions.js";
import type { RegistryClient } from "../../../src/utils/registry.js";

const fakeClient = (packages: Record<string, string[] | Error>): RegistryClient => ({
  registry: "fake",
  getPackageVersions: async (name) => {
    const entry = packages[name];
    if (entry instanceof Error) throw entry;
    return entry ? { versions: entry, latest: entry.at(-1) ?? null } : null;
  },
});

describe("resolveNewestVersions", () => {
  test("raises ranges to the newest stable release inside them, never across a major", async () => {
    const packageJsons = new Map<string, Record<string, unknown>>([
      [
        ".",
        {
          dependencies: {
            next: "^16.4.2",
            react: "~19.3.1",
            bootstrap: "5.3.8",
            local: "workspace:*",
          },
          devDependencies: { typescript: "^5.9.0" },
        },
      ],
      ["apps/api", { dependencies: { next: "^16.4.2" } }],
    ]);
    const client = fakeClient({
      next: ["16.4.2", "16.6.1", "16.7.0-canary.3", "17.0.0"],
      react: ["19.3.1", "19.3.4", "19.4.0"],
      bootstrap: ["5.3.8", "5.3.9"],
      typescript: ["5.9.0", "5.9.3", "6.0.0"],
    });

    const report = await resolveNewestVersions(packageJsons, client);

    expect(packageJsons.get(".")).toEqual({
      dependencies: { next: "^16.6.1", react: "~19.3.4", bootstrap: "5.3.8", local: "workspace:*" },
      devDependencies: { typescript: "^5.9.3" },
    });
    expect(packageJsons.get("apps/api")).toEqual({ dependencies: { next: "^16.6.1" } });
    expect(report).toEqual({
      updates: [
        { file: "package.json", name: "next", from: "^16.4.2", to: "^16.6.1" },
        { file: "package.json", name: "react", from: "~19.3.1", to: "~19.3.4" },
        { file: "package.json", name: "typescript", from: "^5.9.0", to: "^5.9.3" },
        { file: "apps/api/package.json", name: "next", from: "^16.4.2", to: "^16.6.1" },
      ],
      unresolved: [],
    });
  });

  test("keeps the template range when a lookup fails or the package is missing", async () => {
    const packageJsons = new Map<string, Record<string, unknown>>([
      [".", { dependencies: { zod: "^4.6.7", ghost: "^1.0.0", current: "^2.0.0" } }],
    ]);
    const report = await resolveNewestVersions(
      packageJsons,
      fakeClient({ zod: new Error("offline"), current: ["2.0.0"] }),
    );
    expect(packageJsons.get(".")).toEqual({
      dependencies: { zod: "^4.6.7", ghost: "^1.0.0", current: "^2.0.0" },
    });
    expect(report).toEqual({ updates: [], unresolved: ["ghost", "zod"] });
  });
});
