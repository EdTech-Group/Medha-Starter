import type { PackageManager } from "../types/config.js";
import { runCommand } from "./process.js";

/**
 * Detects the package manager from how the CLI was invoked:
 * npm_config_user_agent (npx, pnpm dlx, yarn dlx, bunx), then the Bun runtime, then npm.
 */
export function detectPackageManager(env: NodeJS.ProcessEnv = process.env): PackageManager {
  const userAgent = env.npm_config_user_agent?.toLowerCase() ?? "";

  if (userAgent.startsWith("bun")) return "bun";
  if (userAgent.startsWith("pnpm")) return "pnpm";
  if (userAgent.startsWith("yarn")) return "yarn";
  if (userAgent.startsWith("npm")) return "npm";
  if (process.versions.bun) return "bun";
  return "npm";
}

export function formatRunCommand(packageManager: PackageManager, script: string): string {
  return packageManager === "npm" ? `npm run ${script}` : `${packageManager} ${script}`;
}

export async function installDependencies(
  packageManager: PackageManager,
  cwd: string,
): Promise<void> {
  await runCommand(packageManager, packageManager === "yarn" ? [] : ["install"], { cwd });
}
