import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { makeTempDir, removeDir } from "../helpers/fixtures.js";

// Runs the compiled CLI the way package runners do: on Node.js (npx, pnpm dlx, yarn dlx, and bunx
// when Node is installed) and on the Bun runtime (bunx --bun). This proves the published entry
// point works on both. The Node 18/20/22/24 and runner matrix runs in CI and `bun run compat`.
const root = join(import.meta.dir, "..", "..");
const cli = join(root, "dist", "cli.js");
const fixtures = join(root, "tests", "fixtures", "demo-templates");

const RUNTIMES = [
  { name: "Node.js", command: "node", args: [cli] },
  { name: "Bun", command: "bun", args: ["--bun", cli] },
] as const;

let workspace: string;

beforeAll(async () => {
  const build = spawnSync("bun", ["run", "build"], { cwd: root, encoding: "utf8" });
  if (build.status !== 0) {
    throw new Error(`Build failed:\n${build.stdout}\n${build.stderr}`);
  }
  workspace = await makeTempDir("medha-e2e-");
});

afterAll(async () => {
  await removeDir(workspace);
});

for (const runtime of RUNTIMES) {
  describe(`compiled CLI on ${runtime.name}`, () => {
    const run = (args: string[], cwd = root) => {
      const result = spawnSync(runtime.command, [...runtime.args, ...args], {
        cwd,
        encoding: "utf8",
        env: { ...process.env, NO_COLOR: "1", MEDHA_STARTER_TEMPLATES_DIR: fixtures },
      });
      return { code: result.status, stdout: result.stdout, stderr: result.stderr };
    };

    test("prints help and version", () => {
      const help = run(["--help"]);
      expect(help.code).toBe(0);
      expect(help.stdout).toContain("npx medha-starter create my-app");
      expect(run(["--version"]).stdout.trim()).toMatch(/^\d+\.\d+\.\d+/);
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

      const incompatible = run(["app", "--yes", "--offline", "--db", "mongodb", "--orm", "prisma"]);
      expect(incompatible.code).toBe(64);
      expect(incompatible.stderr).toContain("Fix: Use --orm mongoose.");
    });

    test("generates a project with its README", async () => {
      const name = `app-${runtime.command}`;
      const result = run(
        [name, "--yes", "--allow-planned", "--offline", "--no-install", "--no-git", "--pm", "bun"],
        workspace,
      );
      expect(result.stderr).toBe("");
      expect(result.code).toBe(0);
      expect(result.stdout).toContain("Project ready.");

      const readme = await readFile(join(workspace, name, "README.md"), "utf8");
      expect(readme).toContain(`# App ${runtime.command === "node" ? "Node" : "Bun"}`);
      expect(readme).toContain("1. Install dependencies: `bun install`");
      const packageJson = JSON.parse(await readFile(join(workspace, name, "package.json"), "utf8"));
      expect(packageJson.dependencies.next).toBe("^16.4.2");
    });
  });
}
