import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { isErrnoException } from "../../utils/fs.js";
import { isPlaceholderMarkdown } from "./merge.js";

export type ExistingProjectInfo = {
  /** "name" from an existing package.json. */
  readonly name: string | null;
  /** From package.json "description", medha.json, or the text of a placeholder README. */
  readonly description: string | null;
};

const PACKAGE_NAME_PATTERN = /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

/**
 * Reads what an existing folder already says about the project, so the generated README keeps
 * the project's own name and description instead of the folder name and a generic intro.
 */
export async function readExistingProjectInfo(directory: string): Promise<ExistingProjectInfo> {
  let name: string | null = null;
  let description: string | null = null;

  const packageJson = await readOptional(join(directory, "package.json"));
  if (packageJson !== null) {
    try {
      const parsed = JSON.parse(packageJson) as { name?: unknown; description?: unknown };
      if (typeof parsed.name === "string" && PACKAGE_NAME_PATTERN.test(parsed.name)) {
        name = parsed.name;
      }
      if (typeof parsed.description === "string" && parsed.description.trim()) {
        description = parsed.description.trim();
      }
    } catch {
      // Invalid JSON is reported when package.json is merged.
    }
  }

  // Recorded by an earlier run, e.g. taken from a placeholder README that has since been replaced.
  if (description === null) {
    const stackFile = await readOptional(join(directory, "medha.json"));
    if (stackFile !== null) {
      try {
        const recorded = (JSON.parse(stackFile) as { project?: { description?: unknown } }).project;
        if (typeof recorded?.description === "string" && recorded.description.trim()) {
          description = recorded.description.trim();
        }
      } catch {
        // A damaged medha.json is overwritten by this run.
      }
    }
  }

  if (description === null) {
    const readme = await readOptional(join(directory, "README.md"));
    if (readme !== null && isPlaceholderMarkdown(readme)) {
      const text = readme
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith("#"))
        .join(" ");
      description = text || null;
    }
  }

  return { name, description };
}

async function readOptional(path: string): Promise<string | null> {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if (isErrnoException(error, "ENOENT") || isErrnoException(error, "EISDIR")) return null;
    throw error;
  }
}
