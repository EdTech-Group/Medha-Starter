import { lstat, readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import type { LayerManifest, LayerSelection, ResolvedLayer } from "../../types/generator.js";
import { isErrnoException } from "../../utils/fs.js";

const MANIFEST_FILE = "layer.json";
const FILES_DIRECTORY = "files";

const envVariableSchema = z.object({
  key: z.string().regex(/^[A-Z][A-Z0-9_]*$/, "env keys must be UPPER_SNAKE_CASE"),
  example: z.string(),
  description: z.string().min(1),
});

const stringMap = z.record(z.string(), z.string());

const layerManifestSchema = z.object({
  id: z.string().min(1),
  description: z.string().min(1),
  packageJson: z
    .looseObject({
      scripts: stringMap.optional(),
      dependencies: stringMap.optional(),
      devDependencies: stringMap.optional(),
    })
    .optional(),
  env: z.array(envVariableSchema).optional(),
  overrides: z.array(z.string().min(1)).optional(),
});

export type LayerFile = {
  /** Path relative to the layer's files/ directory, forward slashes. */
  readonly relativePath: string;
  readonly absolutePath: string;
  readonly mode: number;
};

export async function resolveLayer(
  templatesRoot: string,
  selection: LayerSelection,
): Promise<ResolvedLayer> {
  const directory = join(templatesRoot, ...selection.id.split("/"));
  const manifestPath = join(directory, MANIFEST_FILE);

  let raw: string;
  try {
    raw = await readFile(manifestPath, "utf8");
  } catch (error) {
    if (isErrnoException(error, "ENOENT")) {
      throw new Error(`Template layer "${selection.id}" is missing (expected ${manifestPath}).`);
    }
    throw error;
  }

  const result = layerManifestSchema.safeParse(JSON.parse(raw));
  if (!result.success) {
    throw new Error(`Invalid ${manifestPath}: ${z.prettifyError(result.error)}`);
  }
  if (result.data.id !== selection.id) {
    throw new Error(`${manifestPath} declares id "${result.data.id}", expected "${selection.id}".`);
  }

  return { ...selection, manifest: result.data as LayerManifest, directory };
}

/** Lists the files a layer contributes, sorted for deterministic output. */
export async function listLayerFiles(layer: ResolvedLayer): Promise<LayerFile[]> {
  const root = join(layer.directory, FILES_DIRECTORY);
  const files: LayerFile[] = [];

  const walk = async (directory: string, prefix: string): Promise<void> => {
    let entries: string[];
    try {
      entries = await readdir(directory);
    } catch (error) {
      if (isErrnoException(error, "ENOENT") && directory === root) return;
      throw error;
    }

    for (const name of entries.sort()) {
      const absolutePath = join(directory, name);
      const relativePath = prefix ? `${prefix}/${name}` : name;
      const stats = await lstat(absolutePath);

      if (stats.isSymbolicLink()) {
        throw new Error(
          `Layer "${layer.id}" contains a symlink (${relativePath}). Templates must contain real files so they survive npm packing.`,
        );
      }
      if (stats.isDirectory()) {
        await walk(absolutePath, relativePath);
      } else if (stats.isFile()) {
        files.push({ relativePath, absolutePath, mode: stats.mode & 0o777 });
      }
    }
  };

  await walk(root, "");
  return files;
}
