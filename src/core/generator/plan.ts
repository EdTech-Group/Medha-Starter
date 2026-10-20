import { readFile } from "node:fs/promises";
import type { ProjectConfig, StackConfig } from "../../types/config.js";
import type {
  EnvVariable,
  GenerationPlan,
  LayerSelection,
  PlannedFile,
  ResolvedLayer,
} from "../../types/generator.js";
import { formatRunCommand } from "../../utils/package-manager.js";
import { listLayerFiles, resolveLayer } from "./layers.js";
import { mergePackageJson, serializePackageJson } from "./package-json.js";
import { wrapGeneratedSection } from "./merge.js";
import type { RegistryClient } from "../../utils/registry.js";
import { renderReadme } from "./readme.js";
import { resolveNewestVersions } from "./versions.js";
import { renderTemplate, TEMPLATE_SUFFIX } from "./render.js";

/** npm drops these from published packages, so templates store them without the leading dot. */
const DOTFILE_RENAMES: Readonly<Record<string, string>> = {
  gitignore: ".gitignore",
  npmrc: ".npmrc",
};

/** Files the engine composes itself; layers contribute to them through layer.json instead. */
const GENERATED_FILES = new Set(["package.json", ".env.example"]);
export const STACK_FILE = "medha.json";
/** The root README is composed from the stack and each layer's "readme" metadata. */
export const README_FILE = "README.md";

export function hasSeparateBackend(stack: StackConfig): boolean {
  return stack.backend !== "next";
}

/**
 * The ordered template layers for a stack. Later layers may only replace earlier files they
 * list in "overrides". A full-stack Next.js app is a single package; a separate backend produces
 * an npm-workspaces monorepo with apps/web, apps/api and packages/shared.
 */
export function selectLayers(stack: StackConfig): LayerSelection[] {
  const separate = hasSeparateBackend(stack);
  const web = separate ? "apps/web" : ".";
  const api = separate ? "apps/api" : ".";
  const layers: LayerSelection[] = [];

  if (separate) {
    layers.push({ id: "workspace/monorepo", destination: "." });
    layers.push({ id: "shared/schemas", destination: "packages/shared" });
  }

  layers.push({ id: `frontend/${stack.frontend}`, destination: web });
  layers.push({ id: `ui/${stack.ui}/${stack.frontend}`, destination: web });
  layers.push({ id: `backend/${stack.backend}`, destination: api });
  layers.push({ id: `database/${stack.orm}/${stack.database}`, destination: api });
  layers.push({ id: `feature/projects/api/${stack.backend}-${stack.orm}`, destination: api });
  layers.push({ id: `feature/projects/web/${stack.frontend}`, destination: web });

  if (stack.auth === "credentials") {
    layers.push({ id: `auth/credentials/api/${stack.backend}-${stack.orm}`, destination: api });
    layers.push({ id: `auth/credentials/web/${stack.frontend}`, destination: web });
  }

  if (stack.testing === "vitest") {
    layers.push({ id: `testing/vitest/${stack.frontend}`, destination: web });
    if (separate) {
      layers.push({ id: `testing/vitest/${stack.backend}`, destination: api });
    }
  }

  for (const integration of stack.integrations) {
    layers.push({ id: `integration/${integration}`, destination: "." });
  }

  // Always last: AI-assistant guidance and style checks describe the finished project.
  layers.push({ id: "ai/medha", destination: "." });

  return layers;
}

export function buildTemplateVariables(
  project: ProjectConfig,
  generatorVersion: string,
): Record<string, string> {
  const { stack } = project;

  return {
    projectName: project.packageName,
    projectTitle: toTitle(project.packageName),
    projectDescription: project.description ?? "",
    packageManager: stack.packageManager,
    runScript: formatRunCommand(stack.packageManager, "").trimEnd(),
    installCommand: stack.packageManager === "yarn" ? "yarn" : `${stack.packageManager} install`,
    apiBaseUrl: hasSeparateBackend(stack) ? "http://localhost:4000" : "/api",
    frontend: stack.frontend,
    backend: stack.backend,
    database: stack.database,
    orm: stack.orm,
    generatorVersion,
  };
}

export type CreatePlanOptions = {
  readonly templatesRoot: string;
  readonly generatorVersion: string;
  /** When given, dependency ranges are raised to the newest compatible release. */
  readonly registry?: RegistryClient;
};

export async function createGenerationPlan(
  project: ProjectConfig,
  options: CreatePlanOptions,
): Promise<GenerationPlan> {
  const selections = selectLayers(project.stack);
  const layers: ResolvedLayer[] = [];
  for (const selection of selections) {
    layers.push(await resolveLayer(options.templatesRoot, selection));
  }

  const variables = buildTemplateVariables(project, options.generatorVersion);
  const files = new Map<string, PlannedFile>();
  const packageJsons = new Map<string, Record<string, unknown>>();
  const envVariables = new Map<string, Map<string, EnvVariable>>();

  for (const layer of layers) {
    const { manifest, destination } = layer;

    if (!packageJsons.has(destination)) {
      packageJsons.set(destination, {
        name: packageNameFor(project.packageName, destination),
        version: "0.1.0",
        private: true,
        ...(destination === "." && project.description ? { description: project.description } : {}),
      });
    }
    if (manifest.packageJson) {
      mergePackageJson(packageJsonFor(packageJsons, destination), manifest.packageJson, layer.id);
    }

    for (const variable of manifest.env ?? []) {
      addEnvVariable(envVariables, destination, variable, layer.id);
    }

    const overrides = new Set(
      (manifest.overrides ?? []).map((path) => joinPath(destination, path)),
    );

    for (const file of await listLayerFiles(layer)) {
      const isTemplate = file.relativePath.endsWith(TEMPLATE_SUFFIX);
      const outputPath = joinPath(destination, outputName(file.relativePath, isTemplate));
      const fileName = outputPath.split("/").at(-1) ?? outputPath;

      if (
        GENERATED_FILES.has(fileName) ||
        outputPath === STACK_FILE ||
        outputPath === README_FILE
      ) {
        throw new Error(
          `Layer "${layer.id}" ships ${file.relativePath}; declare package.json fields, env variables and README content in layer.json instead.`,
        );
      }

      const existing = files.get(outputPath);
      if (existing && !overrides.has(outputPath)) {
        throw new Error(
          `Layers "${existing.layerId}" and "${layer.id}" both write ${outputPath}. Add it to "overrides" in ${layer.id}/layer.json if the replacement is intended.`,
        );
      }
      if (!existing && overrides.has(outputPath)) {
        throw new Error(
          `Layer "${layer.id}" overrides ${outputPath}, but no earlier layer writes it.`,
        );
      }
      overrides.delete(outputPath);

      const content = isTemplate
        ? renderTemplate(
            await readFile(file.absolutePath, "utf8"),
            variables,
            `${layer.id}/files/${file.relativePath}`,
          )
        : null;

      files.set(outputPath, {
        path: outputPath,
        layerId: layer.id,
        content,
        source: isTemplate ? null : file.absolutePath,
        mode: file.mode,
      });
    }

    if (overrides.size > 0) {
      throw new Error(
        `Layer "${layer.id}" lists overrides for files that no earlier layer writes: ${[...overrides].join(", ")}.`,
      );
    }
  }

  const versions = options.registry
    ? await resolveNewestVersions(packageJsons, options.registry)
    : null;

  for (const [destination, packageJson] of packageJsons) {
    addGeneratedFile(
      files,
      joinPath(destination, "package.json"),
      serializePackageJson(packageJson),
    );
  }
  for (const [destination, variablesByKey] of envVariables) {
    addGeneratedFile(
      files,
      joinPath(destination, ".env.example"),
      formatEnvExample(variablesByKey),
    );
  }
  addGeneratedFile(
    files,
    README_FILE,
    wrapGeneratedSection(
      renderReadme({
        project,
        layers,
        packageJsons,
        envVariables,
        variables,
        generatorVersion: options.generatorVersion,
      }),
    ),
  );
  addGeneratedFile(
    files,
    STACK_FILE,
    `${JSON.stringify(
      {
        generator: "medha-starter",
        version: options.generatorVersion,
        project: { name: project.packageName, description: project.description },
        stack: project.stack,
      },
      null,
      2,
    )}\n`,
  );

  return {
    project,
    layers,
    versions,
    // Code-unit order, so output is identical regardless of the machine's locale.
    files: [...files.values()].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0)),
  };
}

function addGeneratedFile(files: Map<string, PlannedFile>, path: string, content: string): void {
  files.set(path, { path, layerId: "generator", content, source: null, mode: 0o644 });
}

function packageJsonFor(
  packageJsons: Map<string, Record<string, unknown>>,
  destination: string,
): Record<string, unknown> {
  const packageJson = packageJsons.get(destination);
  if (!packageJson) {
    throw new Error(`No package.json was initialised for ${destination}.`);
  }
  return packageJson;
}

function addEnvVariable(
  envVariables: Map<string, Map<string, EnvVariable>>,
  destination: string,
  variable: EnvVariable,
  layerId: string,
): void {
  const byKey = envVariables.get(destination) ?? new Map<string, EnvVariable>();
  const existing = byKey.get(variable.key);

  if (existing && existing.example !== variable.example) {
    throw new Error(
      `Layer "${layerId}" redefines ${variable.key} in ${destination} with a different example value.`,
    );
  }

  byKey.set(variable.key, existing ?? variable);
  envVariables.set(destination, byKey);
}

function formatEnvExample(variables: Map<string, EnvVariable>): string {
  const lines = [
    "# Generated by medha-starter. Copy to .env (Next.js also reads .env.local) and set real values.",
    "# Never commit real credentials.",
  ];

  for (const variable of variables.values()) {
    lines.push("", `# ${variable.description}`, `${variable.key}=${variable.example}`);
  }

  return `${lines.join("\n")}\n`;
}

function outputName(relativePath: string, isTemplate: boolean): string {
  const withoutSuffix = isTemplate ? relativePath.slice(0, -TEMPLATE_SUFFIX.length) : relativePath;
  const segments = withoutSuffix.split("/");
  const last = segments.pop() ?? "";
  return [...segments, DOTFILE_RENAMES[last] ?? last].join("/");
}

function joinPath(destination: string, relativePath: string): string {
  return destination === "." ? relativePath : `${destination}/${relativePath}`;
}

function packageNameFor(packageName: string, destination: string): string {
  return destination === "." ? packageName : `${packageName}-${destination.split("/").at(-1)}`;
}

function toTitle(packageName: string): string {
  return (packageName.split("/").at(-1) ?? packageName)
    .split(/[-_.]/)
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
