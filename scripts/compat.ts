/**
 * Runtime and package-runner compatibility matrix for the published package.
 *
 * Packs medha-starter exactly as npm would publish it, then, for every supported runtime and
 * runner, prints the version and generates the default project from the templates inside the
 * tarball, checking that the README, medha.json and the Medha pages are written and that the
 * runner's package manager was detected.
 *
 *   bun run compat            # everything
 *   bun run compat -- --quick # current Node.js and Bun only
 *
 * Needs network access the first time (npx downloads node@<version>, pnpm and yarn).
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = join(import.meta.dir, "..");
const quick = process.argv.includes("--quick");
// npx, pnpm and bunx are .cmd shims on Windows, which only start through a shell.
const shell = process.platform === "win32";
const NODE_VERSIONS = ["18.18.0", "20", "22", "24"];

type Case = {
  readonly name: string;
  readonly command: string;
  readonly args: readonly string[];
  /** Package manager the CLI should detect from this runner when --pm is not given. */
  readonly expectedPackageManager: string;
  readonly cwd?: string;
};

const work = mkdtempSync(join(tmpdir(), "medha-compat-"));
const results: { name: string; ok: boolean; detail: string }[] = [];

try {
  step("Building and packing");
  must(spawnSync("bun", ["run", "build"], { cwd: root, encoding: "utf8", shell }), "build");
  must(
    spawnSync("npm", ["pack", "--pack-destination", work], { cwd: root, encoding: "utf8", shell }),
    "npm pack",
  );
  const tarball = join(work, readdirSync(work).find((name) => name.endsWith(".tgz")) ?? "");

  // An installed copy for running the CLI directly on specific runtimes.
  const installDir = join(work, "installed");
  mkdirSync(installDir);
  must(
    spawnSync("npm", ["install", "--no-save", "--no-audit", "--no-fund", tarball], {
      cwd: installDir,
      encoding: "utf8",
      shell,
    }),
    "npm install tarball",
  );
  const installedCli = join(installDir, "node_modules", "medha-starter", "dist", "cli.js");

  const cases: Case[] = [
    {
      // Ask the real binary: under `bun run`, process.versions.node is Bun's compatibility version.
      name: `Node.js ${spawnSync("node", ["--version"], { encoding: "utf8", shell }).stdout.trim().replace(/^v/, "")} (system)`,
      command: "node",
      args: [installedCli],
      expectedPackageManager: "npm",
    },
    {
      name: "Bun runtime",
      command: "bun",
      args: ["--bun", installedCli],
      expectedPackageManager: "bun",
    },
  ];

  if (!quick) {
    for (const version of NODE_VERSIONS) {
      cases.push({
        name: `Node.js ${version}`,
        command: "npx",
        args: ["--yes", "-p", `node@${version}`, "--", "node", installedCli],
        expectedPackageManager: "npm",
      });
    }
    cases.push(
      {
        name: "npx",
        command: "npx",
        args: ["--yes", "--package", tarball, "medha-starter"],
        expectedPackageManager: "npm",
      },
      // bunx runs the local install's bin; with Node installed it uses Node, --bun forces Bun.
      {
        name: "bunx",
        command: "bunx",
        args: ["medha-starter"],
        expectedPackageManager: "bun",
        cwd: installDir,
      },
      {
        name: "bunx --bun",
        command: "bunx",
        args: ["--bun", "medha-starter"],
        expectedPackageManager: "bun",
        cwd: installDir,
      },
      {
        name: "pnpm dlx",
        command: "npx",
        args: ["--yes", "pnpm@10", "--package", tarball, "dlx", "medha-starter"],
        expectedPackageManager: "pnpm",
      },
      {
        name: "yarn dlx (Yarn 4)",
        command: "npx",
        args: [
          "--yes",
          "@yarnpkg/cli-dist@4",
          "dlx",
          "-p",
          `medha-starter@file:${tarball}`,
          "medha-starter",
        ],
        expectedPackageManager: "yarn",
      },
    );
  }

  for (const [index, testCase] of cases.entries()) {
    step(testCase.name);
    results.push(runCase(testCase, join(work, `out-${index}`)));
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}

console.log("\nResults");
for (const result of results) {
  console.log(`  ${result.ok ? "PASS" : "FAIL"}  ${result.name.padEnd(28)} ${result.detail}`);
}
process.exitCode = results.every((result) => result.ok) ? 0 : 1;

function runCase(testCase: Case, outDir: string): { name: string; ok: boolean; detail: string } {
  mkdirSync(outDir, { recursive: true });
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    NO_COLOR: "1",
  };
  // Let each runner set its own user agent, as it would for a real user (`bun run` sets one).
  delete env.npm_config_user_agent;
  const exec = (args: readonly string[], cwd: string) =>
    spawnSync(testCase.command, [...testCase.args, ...args], {
      cwd,
      env,
      encoding: "utf8",
      shell,
      timeout: 300_000,
    });

  const version = exec(["--version"], testCase.cwd ?? outDir);
  if (version.status !== 0) {
    return {
      name: testCase.name,
      ok: false,
      detail: `--version failed: ${(version.stderr || version.stdout).trim().split("\n").at(-1)}`,
    };
  }

  const target = join(outDir, "app");
  const generate = exec(
    [target, "--yes", "--offline", "--no-install", "--no-git"],
    testCase.cwd ?? outDir,
  );
  if (generate.status !== 0) {
    return {
      name: testCase.name,
      ok: false,
      detail: `generate failed: ${(generate.stderr || generate.stdout).trim().split("\n").at(-1)}`,
    };
  }

  try {
    const readme = readFileSync(join(target, "README.md"), "utf8");
    const stack = JSON.parse(readFileSync(join(target, "medha.json"), "utf8")).stack;
    if (!readme.includes("# App")) throw new Error("README.md has no title");
    if (!existsSync(join(target, "src", "medha", "routes.tsx"))) {
      throw new Error("the Medha pages were not generated (templates missing from the package?)");
    }
    if (stack.packageManager !== testCase.expectedPackageManager) {
      throw new Error(
        `detected package manager ${stack.packageManager}, expected ${testCase.expectedPackageManager}`,
      );
    }
    return {
      name: testCase.name,
      ok: true,
      // Runners such as Yarn print their own install log first; the version is the last line.
      detail: `v${version.stdout.trim().split("\n").at(-1)}, README ok, detected ${stack.packageManager}`,
    };
  } catch (error) {
    return {
      name: testCase.name,
      ok: false,
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}

function step(message: string): void {
  console.log(`\n▸ ${message}`);
}

function must(result: ReturnType<typeof spawnSync>, label: string): void {
  if (result.status !== 0) {
    console.error(`${label} failed:\n${result.stdout}\n${result.stderr}`);
    process.exit(1);
  }
}
