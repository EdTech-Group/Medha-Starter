import { beforeAll, describe, expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

// Runs the compiled CLI with real Node.js, the way `npx medha-starter` does, to prove the
// published entry point has no Bun-only dependencies.
const root = join(import.meta.dir, "..", "..");
const cli = join(root, "dist", "cli.js");

function run(args: string[]) {
  const result = spawnSync("node", [cli, ...args], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, NO_COLOR: "1" },
  });
  return { code: result.status, stdout: result.stdout, stderr: result.stderr };
}

beforeAll(() => {
  const build = spawnSync("bun", ["run", "build"], { cwd: root, encoding: "utf8" });
  if (build.status !== 0) {
    throw new Error(`Build failed:\n${build.stdout}\n${build.stderr}`);
  }
});

describe("compiled CLI on Node.js", () => {
  test("prints help and version", () => {
    const help = run(["--help"]);
    expect(help.code).toBe(0);
    expect(help.stdout).toContain("npx medha-starter create my-app");

    const version = run(["--version"]);
    expect(version.code).toBe(0);
    expect(version.stdout.trim()).toMatch(/^\d+\.\d+\.\d+/);
  });

  test("lists options and rules", () => {
    const list = run(["list"]);
    expect(list.code).toBe(0);
    expect(list.stdout).toContain("PostgreSQL");
    expect(list.stdout).toContain("MongoDB uses Mongoose");
  });

  test("exits 64 with an actionable message for bad input", () => {
    const unknown = run(["app", "--wat"]);
    expect(unknown.code).toBe(64);
    expect(unknown.stderr).toContain("Unknown option: --wat");

    const incompatible = run(["app", "--yes", "--db", "mongodb", "--orm", "prisma"]);
    expect(incompatible.code).toBe(64);
    expect(incompatible.stderr).toContain("Fix: Use --orm mongoose.");
  });
});
