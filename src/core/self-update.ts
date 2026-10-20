import { sep } from "node:path";
import semver from "semver";
import type { RegistryClient } from "../utils/registry.js";

export const PACKAGE_NAME = "medha-starter";
/** Set on the re-run process so it never tries to update itself again. */
export const UPDATED_ENV = "MEDHA_STARTER_UPDATED";
/** Set to 1 to never check for a newer version (same as --no-update-check). */
export const SKIP_UPDATE_ENV = "MEDHA_STARTER_SKIP_UPDATE_CHECK";

export type Runner = { readonly command: string; readonly args: readonly string[] };

export type UpdateDecision =
  | { readonly kind: "skip"; readonly reason: string }
  | { readonly kind: "current" }
  | { readonly kind: "update"; readonly latest: string; readonly runner: Runner };

export type UpdateCheckInput = {
  readonly currentVersion: string;
  /** Directory this copy of the CLI runs from. */
  readonly packageRoot: string;
  readonly argv: readonly string[];
  readonly env: NodeJS.ProcessEnv;
  readonly client: RegistryClient;
  readonly disabled: boolean;
};

/**
 * Decides whether this run should hand over to a newer published version. Package runners cache
 * what they downloaded (npx, bunx, pnpm dlx), so `npx medha-starter` can keep running an old copy;
 * this makes every run use the latest release. Any failure (offline, registry down) keeps the
 * current version: an update check must never stop a project from being generated.
 */
export async function checkForUpdate(input: UpdateCheckInput): Promise<UpdateDecision> {
  if (input.disabled || input.env[SKIP_UPDATE_ENV] === "1") {
    return { kind: "skip", reason: "update check disabled" };
  }
  if (input.env[UPDATED_ENV]) {
    return { kind: "skip", reason: "already running the version it updated to" };
  }
  if (!`${input.packageRoot}${sep}`.includes(`${sep}node_modules${sep}`)) {
    return { kind: "skip", reason: "running from a source checkout" };
  }

  let latest: string | null;
  try {
    latest = (await input.client.getPackageVersions(PACKAGE_NAME))?.latest ?? null;
  } catch {
    return { kind: "skip", reason: "the npm registry could not be reached" };
  }

  if (!latest || !semver.valid(latest) || !semver.gt(latest, input.currentVersion)) {
    return { kind: "current" };
  }

  return {
    kind: "update",
    latest,
    runner: runnerFor(`${PACKAGE_NAME}@${latest}`, input.argv, input.env),
  };
}

/**
 * The command that runs a specific version through the package runner the user started with:
 * npx, bunx, pnpm dlx or yarn dlx (Yarn 2+; Yarn 1 has no dlx, so it falls back to npx).
 */
export function runnerFor(spec: string, argv: readonly string[], env: NodeJS.ProcessEnv): Runner {
  const userAgent = env.npm_config_user_agent?.toLowerCase() ?? "";
  const yarnMajor = Number.parseInt(/^yarn\/(\d+)/.exec(userAgent)?.[1] ?? "0", 10);

  if (userAgent.startsWith("bun")) return { command: "bunx", args: [spec, ...argv] };
  if (userAgent.startsWith("pnpm")) return { command: "pnpm", args: ["dlx", spec, ...argv] };
  if (userAgent.startsWith("yarn") && yarnMajor >= 2) {
    return { command: "yarn", args: ["dlx", spec, ...argv] };
  }
  return { command: "npx", args: ["--yes", spec, ...argv] };
}
