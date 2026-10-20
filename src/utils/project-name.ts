import { CliUsageError } from "../core/errors.js";

// Reserved names that shouldn't be used as project names
const RESERVED_NAMES = [
  "node_modules",
  ".git",
  ".github",
  ".vscode",
  "package.json",
  "package-lock.json",
  "bun.lock",
  "yarn.lock",
  "pnpm-lock.yaml",
];

// Windows reserved device names
const WINDOWS_RESERVED = [
  "con",
  "prn",
  "aux",
  "nul",
  "com1",
  "com2",
  "com3",
  "com4",
  "com5",
  "com6",
  "com7",
  "com8",
  "com9",
  "lpt1",
  "lpt2",
  "lpt3",
  "lpt4",
  "lpt5",
  "lpt6",
  "lpt7",
  "lpt8",
  "lpt9",
];

export function validateProjectName(projectName: string): string {
  if (projectName.length === 0) {
    throw new CliUsageError("Project name is required.");
  }

  // Allow "." to scaffold in current directory
  if (projectName === ".") {
    return projectName;
  }

  if (projectName === "..") {
    throw new CliUsageError('Project name cannot be "..".');
  }

  // Allow absolute paths (for programmatic use)
  // But validate the basename for relative paths
  const isAbsolutePath = projectName.startsWith("/") || /^[A-Za-z]:[\\/]/.test(projectName);

  if (isAbsolutePath) {
    // For absolute paths, just return as-is (validation happens at directory level)
    return projectName;
  }

  // For relative paths, don't allow path separators (must be a simple name)
  if (/[\\/]/.test(projectName)) {
    throw new CliUsageError(
      "Project name cannot contain path separators. Use an absolute path or a simple name.",
    );
  }

  // Check for reserved names
  const lowerName = projectName.toLowerCase();
  if (RESERVED_NAMES.includes(lowerName)) {
    throw new CliUsageError(
      `"${projectName}" is a reserved name and cannot be used as a project name.`,
    );
  }

  // Check for Windows reserved device names
  if (
    WINDOWS_RESERVED.includes(lowerName) ||
    WINDOWS_RESERVED.some((r) => lowerName.startsWith(`${r}.`))
  ) {
    throw new CliUsageError(`"${projectName}" is a reserved system name and cannot be used.`);
  }

  // Check for invalid characters (only allow alphanumeric, dash, underscore, dot)
  if (!/^[a-zA-Z0-9._-]+$/.test(projectName)) {
    throw new CliUsageError(
      "Project name can only contain letters, numbers, dashes, underscores, and dots.",
    );
  }

  // Don't allow names starting with a dot (hidden files)
  if (projectName.startsWith(".")) {
    throw new CliUsageError("Project name cannot start with a dot.");
  }

  return projectName;
}

const LEADING_INVALID_CHARS = /^([._]|-)+/;
const INVALID_PACKAGE_CHARS = /[^a-z0-9-~]+/g;

export function toValidPackageName(input: string): string {
  const normalized = input
    .trim()
    .toLowerCase()
    .replace(/[\s._]+/g, "-")
    .replace(INVALID_PACKAGE_CHARS, "-")
    .replace(/-+/g, "-")
    .replace(LEADING_INVALID_CHARS, "")
    .replace(/-$/g, "");

  return normalized || "medha-app";
}
