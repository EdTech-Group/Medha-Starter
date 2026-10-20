import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// This module sits directly under src/ (and dist/ once built), one level below the package root.
export const PACKAGE_ROOT = fileURLToPath(new URL("../", import.meta.url));
const packageRoot = PACKAGE_ROOT;

export const TEMPLATES_ROOT = fileURLToPath(new URL("../templates/", import.meta.url));

export function getPackageVersion(): string {
  const raw = readFileSync(`${packageRoot}package.json`, "utf8");
  const { version } = JSON.parse(raw) as { version?: unknown };
  return typeof version === "string" ? version : "0.0.0";
}
