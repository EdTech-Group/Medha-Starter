/**
 * Generated-project matrix: every combination of "available" options.
 *
 * AGENTS.md requires each combination an available option takes part in to pass install,
 * typecheck, lint, style check, tests and build in a generated project. This script generates
 * every such combination from the built CLI, installs it with its package manager and runs those
 * scripts.
 *
 *   bun run verify:stacks                 # every combination
 *   bun run verify:stacks -- --pm npm     # only combinations using one package manager
 *   bun run verify:stacks -- --keep       # keep the generated projects for inspection
 *
 * Needs network access, Node.js new enough for the generated projects (see their README), and
 * each package manager on PATH.
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { findCompatibilityIssues } from "../src/core/compatibility.js";
import { STACK_KEYS, STACK_REGISTRY } from "../src/core/registry.js";
import type { StackConfig, StackKey } from "../src/types/config.js";

const root = join(import.meta.dir, "..");
const cli = join(root, "dist", "cli.js");
const shell = process.platform === "win32";
const onlyPm = flagValue("--pm");
const keep = process.argv.includes("--keep");
/** Scripts every generated project must pass, in order; missing ones are skipped. */
const CHECKS = ["lint", "typecheck", "check:style", "test", "build"];
const FLAGS: Readonly<Record<StackKey, string>> = {
  frontend: "--frontend",
  backend: "--backend",
  database: "--db",
  orm: "--orm",
  ui: "--ui",
  auth: "--auth",
  testing: "--testing",
  integrations: "--integrations",
  packageManager: "--pm",
};

function flagValue(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function available(key: StackKey): string[] {
  return STACK_REGISTRY[key].options
    .filter((option) => option.status === "available")
    .map((option) => option.id);
}

function subsets(ids: readonly string[]): string[][] {
  const result: string[][] = [[]];
  for (const id of ids) {
    for (const subset of result.slice()) result.push([...subset, id]);
  }
  return result;
}

/** Every compatible stack built from available options (integrations: every subset). */
function combinations(): StackConfig[] {
  let stacks: Record<string, unknown>[] = [{}];
  for (const key of STACK_KEYS) {
    const ids = available(key);
    const values: unknown[] = STACK_REGISTRY[key].multiple ? subsets(ids) : ids;
    stacks = stacks.flatMap((stack) => values.map((value) => ({ ...stack, [key]: value })));
  }
  return (stacks as StackConfig[]).filter(
    (stack) =>
      findCompatibilityIssues(stack).length === 0 &&
      (onlyPm === undefined || stack.packageManager === onlyPm),
  );
}

function run(command: string, args: readonly string[], cwd: string) {
  return spawnSync(command, args, { cwd, encoding: "utf8", shell, timeout: 900_000 });
}

function lastLines(result: ReturnType<typeof run>): string {
  return `${result.stdout ?? ""}${result.stderr ?? ""}`.trim().split("\n").slice(-15).join("\n");
}

function describe(stack: StackConfig): string {
  return STACK_KEYS.map((key) => {
    const value = stack[key];
    return Array.isArray(value) ? (value.length > 0 ? value.join("+") : "-") : value;
  }).join(" ");
}

const build = run("bun", ["run", "build"], root);
if (build.status !== 0) {
  console.error(`Build failed:\n${lastLines(build)}`);
  process.exit(1);
}

const stacks = combinations();
const work = mkdtempSync(join(tmpdir(), "medha-stacks-"));
const results: { stack: string; ok: boolean; detail: string }[] = [];
console.log(`Verifying ${stacks.length} combinations in ${work}`);

for (const [index, stack] of stacks.entries()) {
  const name = `app-${index + 1}`;
  const label = describe(stack);
  const flags = STACK_KEYS.flatMap((key) => {
    const value = stack[key];
    return [FLAGS[key], Array.isArray(value) ? value.join(",") || "none" : String(value)];
  });
  process.stdout.write(`[${index + 1}/${stacks.length}] ${label} … `);

  const generate = run("node", [cli, name, "--yes", "--no-git", ...flags], work);
  const project = join(work, name);
  let failure = generate.status === 0 ? null : `generate:\n${lastLines(generate)}`;

  if (!failure) {
    const scripts = Object.keys(
      (
        JSON.parse(readFileSync(join(project, "package.json"), "utf8")) as {
          scripts?: Record<string, string>;
        }
      ).scripts ?? {},
    );
    for (const script of CHECKS.filter((candidate) => scripts.includes(candidate))) {
      const result = run(stack.packageManager, ["run", script], project);
      if (result.status !== 0) {
        failure = `${stack.packageManager} run ${script}:\n${lastLines(result)}`;
        break;
      }
    }
  }

  results.push({ stack: label, ok: !failure, detail: failure ?? "" });
  console.log(failure ? "FAILED" : "ok");
  if (!keep && !failure) rmSync(project, { recursive: true, force: true });
}

console.log(`\nKeys: ${STACK_KEYS.join(" ")}`);
for (const result of results.filter((candidate) => !candidate.ok)) {
  console.log(`\n✗ ${result.stack}\n${result.detail}`);
}
const failed = results.filter((result) => !result.ok).length;
console.log(`\n${results.length - failed}/${results.length} combinations passed.`);
if (failed === 0 && !keep) rmSync(work, { recursive: true, force: true });
process.exit(failed === 0 ? 0 : 1);
