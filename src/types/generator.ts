import type { ProjectConfig } from "./config.js";

export type EnvVariable = {
  readonly key: string;
  /** Safe example value written to .env.example. Never a real credential. */
  readonly example: string;
  readonly description: string;
};

export type PackageJsonFragment = {
  readonly scripts?: Readonly<Record<string, string>>;
  readonly dependencies?: Readonly<Record<string, string>>;
  readonly devDependencies?: Readonly<Record<string, string>>;
  readonly [field: string]: unknown;
};

/** Contents of a template layer's layer.json. */
export type LayerManifest = {
  readonly id: string;
  readonly description: string;
  readonly packageJson?: PackageJsonFragment;
  readonly env?: readonly EnvVariable[];
  /** Paths (relative to the layer's destination) this layer deliberately replaces. */
  readonly overrides?: readonly string[];
};

/** A layer selected for a stack, and where in the project its files go. */
export type LayerSelection = {
  readonly id: string;
  /** Project-relative directory, "." for the root or e.g. "apps/web". */
  readonly destination: string;
};

export type ResolvedLayer = LayerSelection & {
  readonly manifest: LayerManifest;
  /** Absolute path of the layer directory inside the templates root. */
  readonly directory: string;
};

export type PlannedFile = {
  /** Project-relative output path with forward slashes. */
  readonly path: string;
  readonly layerId: string;
  /** Rendered text for .tmpl files and generated files, otherwise null (copy source bytes). */
  readonly content: string | null;
  readonly source: string | null;
  readonly mode: number;
};

/** How an existing file at a planned path is combined with the generated one. */
export type ExistingFileStrategy =
  | "append-lines"
  | "merge-env"
  | "append-markdown"
  | "merge-package-json"
  | "keep"
  | "overwrite";

export type WriteAction = {
  readonly path: string;
  readonly layerId: string;
  /** "create" when nothing exists at the path yet. */
  readonly strategy: ExistingFileStrategy | "create";
  /** False when the existing file is kept as it is (nothing to add, or "keep"). */
  readonly changed: boolean;
  /** Final text to write, or null to copy `source` byte for byte. */
  readonly content: string | null;
  readonly source: string | null;
  readonly mode: number;
  /** What a merge changed, for the summary shown before and after writing. */
  readonly notes: readonly string[];
};

export type WriteReport = {
  readonly actions: readonly WriteAction[];
  /** Where originals of changed existing files were copied, or null when none were changed. */
  readonly backupDirectory: string | null;
};

export type GenerationPlan = {
  readonly project: ProjectConfig;
  readonly layers: readonly ResolvedLayer[];
  readonly files: readonly PlannedFile[];
};
