import { describe, expect, test } from "bun:test";
import { join, sep } from "node:path";
import {
  checkForUpdate,
  runnerFor,
  SKIP_UPDATE_ENV,
  UPDATED_ENV,
} from "../../src/core/self-update.js";
import type { RegistryClient } from "../../src/utils/registry.js";

const installed = join(sep, "home", "u", ".npm", "_npx", "abc", "node_modules", "medha-starter");
const client = (latest: string | null | Error): RegistryClient => ({
  registry: "fake",
  getPackageVersions: async () => {
    if (latest instanceof Error) throw latest;
    return latest === null ? null : { versions: [latest], latest };
  },
});
const input = (overrides: Partial<Parameters<typeof checkForUpdate>[0]> = {}) => ({
  currentVersion: "0.1.0",
  packageRoot: installed,
  argv: ["my-app", "--yes"],
  env: { npm_config_user_agent: "npm/10.8.0 node/v22.0.0 linux x64" },
  client: client("0.2.0"),
  disabled: false,
  ...overrides,
});

describe("checkForUpdate", () => {
  test("re-runs the exact newer version through the same runner, with the same arguments", async () => {
    expect(await checkForUpdate(input())).toEqual({
      kind: "update",
      latest: "0.2.0",
      runner: { command: "npx", args: ["--yes", "medha-starter@0.2.0", "my-app", "--yes"] },
    });
  });

  test("does nothing when already current, or when the registry has nothing newer", async () => {
    expect(await checkForUpdate(input({ client: client("0.1.0") }))).toEqual({ kind: "current" });
    expect(await checkForUpdate(input({ client: client("0.0.9") }))).toEqual({ kind: "current" });
    expect(await checkForUpdate(input({ client: client(null) }))).toEqual({ kind: "current" });
  });

  test("never blocks: offline, disabled, already updated or a source checkout all skip", async () => {
    const skipped = async (overrides: Parameters<typeof input>[0]) =>
      (await checkForUpdate(input(overrides))).kind;
    expect(await skipped({ client: client(new Error("ENOTFOUND")) })).toBe("skip");
    expect(await skipped({ disabled: true })).toBe("skip");
    expect(await skipped({ env: { [SKIP_UPDATE_ENV]: "1" } })).toBe("skip");
    expect(await skipped({ env: { [UPDATED_ENV]: "0.2.0" } })).toBe("skip");
    expect(await skipped({ packageRoot: join(sep, "src", "Medha-Starter") })).toBe("skip");
  });
});

describe("runnerFor", () => {
  test.each([
    ["npm/10.8.0 node/v22.0.0", "npx", ["--yes", "medha-starter@1.0.0", "a"]],
    ["bun/1.4.2 npm/? node/v24.3.0", "bunx", ["medha-starter@1.0.0", "a"]],
    ["pnpm/10.0.0 npm/? node/v22.0.0", "pnpm", ["dlx", "medha-starter@1.0.0", "a"]],
    ["yarn/4.5.0 npm/? node/v22.0.0", "yarn", ["dlx", "medha-starter@1.0.0", "a"]],
    ["yarn/1.22.22 npm/? node/v22.0.0", "npx", ["--yes", "medha-starter@1.0.0", "a"]],
    ["", "npx", ["--yes", "medha-starter@1.0.0", "a"]],
  ])("%p → %s", (userAgent, command, args) => {
    expect(runnerFor("medha-starter@1.0.0", ["a"], { npm_config_user_agent: userAgent })).toEqual({
      command,
      args,
    });
  });
});
