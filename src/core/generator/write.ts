import {
  chmod,
  copyFile,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
  rmdir,
  writeFile,
} from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import pc from "picocolors";
import type {
  GenerationPlan,
  PlannedFile,
  WriteAction,
  WriteReport,
} from "../../types/generator.js";
import { isErrnoException, pathExists, readDirectoryNames } from "../../utils/fs.js";
import {
  appendLines,
  appendMarkdown,
  chooseStrategy,
  type MergeResult,
  mergeEnv,
  mergePackageJsonFile,
} from "./merge.js";

const STAGING_PREFIX = ".medha-starter-staging-";
export const BACKUP_ROOT = ".medha-starter/backups";

/**
 * Decides, per planned file, whether to create it or how to combine it with an existing file
 * (append, merge, keep or overwrite). Reads the target but never writes to it.
 */
export async function planWrites(plan: GenerationPlan): Promise<WriteAction[]> {
  const target = plan.project.targetDirectory;
  if ((await readDirectoryNames(target)) === null) {
    return plan.files.map(createAction);
  }

  const actions: WriteAction[] = [];
  for (const file of plan.files) {
    const existingPath = join(target, ...file.path.split("/"));
    await assertParentsAreDirectories(target, file.path);

    let stats: Awaited<ReturnType<typeof lstat>>;
    try {
      stats = await lstat(existingPath);
    } catch (error) {
      if (isErrnoException(error, "ENOENT")) {
        actions.push(createAction(file));
        continue;
      }
      throw error;
    }

    if (!stats.isFile()) {
      throw new Error(
        `${file.path} already exists as a ${stats.isDirectory() ? "directory" : "link or special file"}, so the generated file cannot be written there. Move it and run again; nothing was written.`,
      );
    }

    actions.push(await combineWithExisting(file, existingPath, stats.mode & 0o777));
  }

  return actions;
}

/**
 * Applies the actions: stages every new or merged file inside the target, copies the original of
 * every existing file it changes to .medha-starter/backups/<time>/, then moves files into place.
 * On any failure the target is restored to exactly what it was before.
 */
export async function writeProject(
  plan: GenerationPlan,
  actions?: readonly WriteAction[],
): Promise<WriteReport> {
  const resolvedActions = actions ?? (await planWrites(plan));
  const target = plan.project.targetDirectory;
  const targetExisted = (await readDirectoryNames(target)) !== null;
  const toWrite = resolvedActions.filter((action) => action.changed);
  const toBackUp = toWrite.filter((action) => action.strategy !== "create");

  await mkdir(target, { recursive: true });
  const staging = await mkdtemp(join(target, STAGING_PREFIX));
  const backupDirectory =
    toBackUp.length > 0
      ? join(target, ...BACKUP_ROOT.split("/"), new Date().toISOString().replace(/[:.]/g, "-"))
      : null;
  const createdDirectories: string[] = [];
  const applied: WriteAction[] = [];

  try {
    for (const action of toWrite) {
      const staged = join(staging, ...action.path.split("/"));
      await mkdir(dirname(staged), { recursive: true });
      if (action.content !== null) {
        await writeFile(staged, action.content, "utf8");
      } else if (action.source !== null) {
        await copyFile(action.source, staged);
      } else {
        throw new Error(`Planned file ${action.path} has neither content nor a source.`);
      }
      await chmod(staged, action.mode);
    }

    if (backupDirectory) {
      const backupRoot = join(target, ".medha-starter");
      createdDirectories.push(...(await ensureDirectory(target, backupDirectory)));
      if (!(await pathExists(join(backupRoot, ".gitignore")))) {
        await writeFile(join(backupRoot, ".gitignore"), "*\n", "utf8");
      }
      for (const action of toBackUp) {
        const backup = join(backupDirectory, ...action.path.split("/"));
        await mkdir(dirname(backup), { recursive: true });
        await copyFile(join(target, ...action.path.split("/")), backup);
      }
    }

    for (const action of toWrite) {
      const destination = join(target, ...action.path.split("/"));
      createdDirectories.push(...(await ensureDirectory(target, dirname(destination))));
      await rename(join(staging, ...action.path.split("/")), destination);
      applied.push(action);
    }

    await rm(staging, { recursive: true, force: true });
  } catch (error) {
    await rm(staging, { recursive: true, force: true });
    if (!targetExisted) {
      await rm(target, { recursive: true, force: true });
    } else {
      await restore(target, applied, backupDirectory, createdDirectories);
    }
    throw error;
  }

  return { actions: resolvedActions, backupDirectory };
}

/** Lines describing what happens to files that already exist. Empty when there are none. */
export function formatExistingFileActions(actions: readonly WriteAction[]): string[] {
  const existing = actions.filter((action) => action.strategy !== "create");
  if (existing.length === 0) return [];

  const width = Math.max(...existing.map((action) => action.path.length));
  const describe = (action: WriteAction): string => {
    if (!action.changed)
      return action.strategy === "keep" ? "keep (left as it is)" : "unchanged (already up to date)";
    const label: Record<string, string> = {
      "append-lines": "append",
      "merge-env": "append",
      "append-markdown": "append",
      "merge-package-json": "merge",
      overwrite: "overwrite",
    };
    const detail = action.notes.length > 0 ? action.notes.join("; ") : "original backed up";
    return `${label[action.strategy] ?? action.strategy} ${pc.dim(`(${detail})`)}`;
  };

  return [
    pc.bold(`Existing files (${existing.length})`),
    ...existing.map((action) => `  ${action.path.padEnd(width)}  ${describe(action)}`),
  ];
}

function createAction(file: PlannedFile): WriteAction {
  return {
    path: file.path,
    layerId: file.layerId,
    strategy: "create",
    changed: true,
    content: file.content,
    source: file.source,
    mode: file.mode,
    notes: [],
  };
}

async function combineWithExisting(
  file: PlannedFile,
  existingPath: string,
  existingMode: number,
): Promise<WriteAction> {
  const strategy = chooseStrategy(file.path);
  const base = {
    path: file.path,
    layerId: file.layerId,
    strategy,
    source: null,
    mode: existingMode,
  };

  if (strategy === "keep") {
    return { ...base, changed: false, content: null, notes: [] };
  }
  if (strategy === "overwrite") {
    const generatedBytes =
      file.content !== null ? Buffer.from(file.content, "utf8") : await readFile(file.source ?? "");
    const identical = generatedBytes.equals(await readFile(existingPath));
    return { ...createAction(file), strategy, changed: !identical, notes: [] };
  }

  const existing = await readFile(existingPath, "utf8");
  const generated = file.content ?? (await readFile(file.source ?? "", "utf8"));
  const merged: MergeResult =
    strategy === "append-lines"
      ? appendLines(existing, generated)
      : strategy === "merge-env"
        ? mergeEnv(existing, generated)
        : strategy === "append-markdown"
          ? appendMarkdown(existing, generated)
          : mergePackageJsonFile(existing, generated, file.path);

  return {
    ...base,
    changed: merged.content !== null,
    content: merged.content,
    notes: merged.notes,
  };
}

/** Fails when a parent of the planned path exists as a file (e.g. a file named "src"). */
async function assertParentsAreDirectories(target: string, path: string): Promise<void> {
  const segments = path.split("/").slice(0, -1);
  for (let index = 1; index <= segments.length; index += 1) {
    const parent = join(target, ...segments.slice(0, index));
    try {
      const stats = await lstat(parent);
      if (!stats.isDirectory()) {
        throw new Error(
          `${segments.slice(0, index).join("/")} already exists and is not a directory, so ${path} cannot be written. Move it and run again; nothing was written.`,
        );
      }
    } catch (error) {
      if (isErrnoException(error, "ENOENT")) return;
      throw error;
    }
  }
}

/** Creates a directory and returns the directories that did not exist before, outermost first. */
async function ensureDirectory(root: string, directory: string): Promise<string[]> {
  const missing: string[] = [];
  let current = directory;
  while (relative(root, current) !== "" && !(await pathExists(current))) {
    missing.unshift(current);
    current = dirname(current);
  }
  await mkdir(directory, { recursive: true });
  return missing;
}

async function restore(
  target: string,
  applied: readonly WriteAction[],
  backupDirectory: string | null,
  createdDirectories: readonly string[],
): Promise<void> {
  for (const action of applied) {
    const destination = join(target, ...action.path.split("/"));
    if (action.strategy === "create") {
      await rm(destination, { force: true });
    } else if (backupDirectory) {
      await copyFile(join(backupDirectory, ...action.path.split("/")), destination);
    }
  }

  if (backupDirectory) {
    await rm(backupDirectory, { recursive: true, force: true });
  }

  for (const directory of [...createdDirectories].reverse()) {
    try {
      await rmdir(directory);
    } catch {
      // Not empty (it held other files) or already removed: leave it.
    }
  }

  const backupRoot = join(target, ".medha-starter");
  if (createdDirectories.includes(backupRoot)) {
    await rm(backupRoot, { recursive: true, force: true });
  }
}
