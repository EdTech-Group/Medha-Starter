import { constants } from "node:fs";
import { access, readdir } from "node:fs/promises";

export function isErrnoException(error: unknown, code: string): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { readonly code?: unknown }).code === code
  );
}

export async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch (error) {
    if (isErrnoException(error, "ENOENT")) return false;
    throw error;
  }
}

/** Entry names of a directory, or null when it does not exist. */
export async function readDirectoryNames(path: string): Promise<string[] | null> {
  try {
    return await readdir(path);
  } catch (error) {
    if (isErrnoException(error, "ENOENT")) return null;
    if (isErrnoException(error, "ENOTDIR")) {
      throw new Error(`"${path}" already exists and is not a directory.`);
    }
    throw error;
  }
}
