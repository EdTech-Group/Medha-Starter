import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { completeStack } from "../../src/core/config.js";
import { selectLayers } from "../../src/core/generator/plan.js";
import type { PartialStackConfig, ProjectConfig, StackConfig } from "../../src/types/config.js";
import type { LayerManifest } from "../../src/types/generator.js";

export type FixtureLayer = {
  readonly manifest?: Partial<LayerManifest>;
  readonly files?: Readonly<Record<string, string>>;
};

export async function makeTempDir(prefix = "medha-test-"): Promise<string> {
  return mkdtemp(join(tmpdir(), prefix));
}

export async function removeDir(path: string): Promise<void> {
  await rm(path, { recursive: true, force: true });
}

/**
 * The full-stack baseline most generator tests use (and the demo fixture layers model):
 * Next.js frontend and backend with PostgreSQL. `partial` overrides any of it.
 */
export const FULL_STACK: PartialStackConfig = {
  frontend: "next",
  backend: "next",
  database: "postgres",
};

export function makeStack(partial: PartialStackConfig = {}): StackConfig {
  return completeStack({ ...FULL_STACK, ...partial }, "npm");
}

export function makeProject(targetDirectory: string, stack: StackConfig): ProjectConfig {
  return {
    projectName: "demo-app",
    targetDirectory,
    packageName: "demo-app",
    description: null,
    stack,
    install: false,
    git: false,
  };
}

/**
 * Creates a templates root with one layer for every id selectLayers() returns for the stack.
 * Layers default to a single marker file; pass overrides per layer id.
 */
export async function writeFixtureTemplates(
  root: string,
  stack: StackConfig,
  layers: Readonly<Record<string, FixtureLayer>> = {},
): Promise<void> {
  for (const { id } of selectLayers(stack)) {
    const layer = layers[id] ?? {};
    const directory = join(root, ...id.split("/"));
    await mkdir(directory, { recursive: true });
    await writeFile(
      join(directory, "layer.json"),
      JSON.stringify({ id, description: `Fixture ${id}`, ...layer.manifest }),
    );

    const files = layer.files ?? { [`layers/${id.replaceAll("/", "__")}.txt`]: id };
    for (const [path, content] of Object.entries(files)) {
      const filePath = join(directory, "files", ...path.split("/"));
      await mkdir(dirname(filePath), { recursive: true });
      await writeFile(filePath, content);
    }
  }
}
