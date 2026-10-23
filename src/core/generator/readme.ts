import type { ProjectConfig, StackKey } from "../../types/config.js";
import type { EnvVariable, ReadmeImage, ResolvedLayer } from "../../types/generator.js";
import { formatRunCommand } from "../../utils/package-manager.js";
import { getOption, STACK_KEYS, STACK_REGISTRY } from "../registry.js";
import { renderTemplate } from "./render.js";

export type ReadmeInput = {
  readonly project: ProjectConfig;
  readonly layers: readonly ResolvedLayer[];
  /** Destination ("." or e.g. "apps/api") → composed package.json. */
  readonly packageJsons: ReadonlyMap<string, Readonly<Record<string, unknown>>>;
  /** Destination → env variables written to that destination's .env.example. */
  readonly envVariables: ReadonlyMap<string, ReadonlyMap<string, EnvVariable>>;
  readonly variables: Readonly<Record<string, string>>;
  readonly generatorVersion: string;
};

/**
 * Composes the project README from the stack and what each layer declares about itself, so it
 * always describes the project that was actually generated: its stack, setup, environment
 * variables, scripts and structure.
 */
export function renderReadme(input: ReadmeInput): string {
  const { project, variables } = input;
  const render = (text: string, layer: ResolvedLayer): string =>
    renderTemplate(text, variables, `${layer.id}/layer.json (readme)`);
  const each = <T>(pick: (layer: ResolvedLayer) => readonly T[] | undefined) =>
    input.layers.flatMap((layer) => (pick(layer) ?? []).map((value) => ({ layer, value })));

  const blocks: string[] = [];

  const logoLayer = input.layers.find((layer) => layer.manifest.readme?.logo);
  const logo = logoLayer?.manifest.readme?.logo;
  if (logoLayer && logo) {
    blocks.push(
      `<p align="center">\n  <img src="${imagePath(logo, logoLayer)}" alt="${escapeAttribute(logo.alt)}" width="240">\n</p>`,
    );
  }

  blocks.push(`# ${variables.projectTitle}`, introduction(project));

  const images = each((layer) => layer.manifest.readme?.images);
  if (images.length > 0) {
    blocks.push(
      images.map(({ layer, value }) => `![${value.alt}](${imagePath(value, layer)})`).join("\n\n"),
    );
  }

  const features = each((layer) => layer.manifest.readme?.features);
  if (features.length > 0) {
    blocks.push(
      "## What's inside",
      features.map(({ layer, value }) => `- ${render(value, layer)}`).join("\n"),
    );
  }

  blocks.push("## Tech stack", stackTable(project));
  blocks.push(...gettingStarted(input, each, render));

  const envSection = environmentSection(input);
  if (envSection) blocks.push(envSection);

  const scriptsSection = scriptSection(input, render);
  if (scriptsSection) blocks.push(scriptsSection);

  const structure = each((layer) =>
    Object.entries(layer.manifest.readme?.structure ?? {}).map(([path, description]) => ({
      path: joinPath(layer.destination, path),
      description,
    })),
  );
  if (structure.length > 0) {
    const entries = [
      ...structure.map(({ layer, value }) => ({
        path: value.path,
        description: render(value.description, layer),
      })),
      { path: "medha.json", description: "The stack this project was generated with." },
    ].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
    const rows = entries.map(({ path, description }) => [`\`${path}\``, description]);
    blocks.push("## Project structure", table(["Path", "Contents"], rows));
  }

  for (const { layer, value } of each((layer) => layer.manifest.readme?.sections)) {
    blocks.push(`## ${render(value.title, layer)}`, render(value.body, layer).trim());
  }

  blocks.push(
    "---",
    `Generated with medha-starter ${input.generatorVersion}. The selected stack is recorded in [\`medha.json\`](medha.json).`,
  );

  return `${blocks.join("\n\n")}\n`;
}

function introduction(project: ProjectConfig): string {
  const { stack } = project;
  const label = (key: StackKey, id: string) => getOption(key, id)?.label ?? id;
  const backend =
    stack.backend === "next"
      ? "API routes in the same Next.js app"
      : `a separate ${label("backend", stack.backend)} API in \`apps/api\``;
  const theme = `The interface uses the ${label("ui", stack.ui)} theme.`;
  const stackSentence =
    stack.backend === "none"
      ? `A TypeScript single-page application built with ${label("frontend", stack.frontend)}. ${theme}`
      : [
          `A full-stack TypeScript application with a ${label("frontend", stack.frontend)} frontend, ${backend},`,
          `and ${label("database", stack.database)} through ${label("orm", stack.orm)}.`,
          theme,
        ].join(" ");

  // Lead with what the project is about when the folder already said so.
  return project.description
    ? `${withFullStop(project.description)}\n\n${stackSentence}`
    : stackSentence;
}

function withFullStop(text: string): string {
  const trimmed = text.trim();
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function stackTable(project: ProjectConfig): string {
  const rows = STACK_KEYS.map((key) => {
    const value = project.stack[key];
    const ids: readonly string[] = typeof value === "string" ? [value] : value;
    const labels = ids.map((id) => getOption(key, id)?.label ?? id);
    return [STACK_REGISTRY[key].title, labels.length > 0 ? labels.join(", ") : "None"];
  });
  return table(["Area", "Choice"], rows);
}

function gettingStarted(
  input: ReadmeInput,
  each: <T>(
    pick: (layer: ResolvedLayer) => readonly T[] | undefined,
  ) => { layer: ResolvedLayer; value: T }[],
  render: (text: string, layer: ResolvedLayer) => string,
): string[] {
  const { packageManager } = input.project.stack;
  const blocks = ["## Getting started"];

  const prerequisites = each((layer) => layer.manifest.readme?.prerequisites);
  const packageManagerLabel = getOption("packageManager", packageManager)?.label ?? packageManager;
  blocks.push(
    "### Prerequisites",
    [...prerequisites.map(({ layer, value }) => render(value, layer)), packageManagerLabel]
      .filter((value, index, all) => all.indexOf(value) === index)
      .map((value) => `- ${value}`)
      .join("\n"),
  );

  const envCopies = [...input.envVariables.keys()].map((destination) => {
    const file = joinPath(destination, ".env");
    return `\`cp ${joinPath(destination, ".env.example")} ${file}\``;
  });
  const steps = [
    `Install dependencies: \`${input.variables.installCommand}\``,
    ...(envCopies.length > 0
      ? [
          `Create your environment file${envCopies.length > 1 ? "s" : ""}: ${envCopies.join(", ")}, then set real values (see [Environment variables](#environment-variables)).`,
        ]
      : []),
    ...each((layer) => layer.manifest.readme?.setup).map(({ layer, value }) =>
      render(value, layer),
    ),
    `Start the development server: \`${formatRunCommand(packageManager, "dev")}\``,
  ];
  blocks.push("### Run it locally", steps.map((step, index) => `${index + 1}. ${step}`).join("\n"));

  return blocks;
}

function environmentSection(input: ReadmeInput): string | null {
  if (input.envVariables.size === 0) return null;

  const parts = ["## Environment variables"];
  const multiple = input.envVariables.size > 1 || !input.envVariables.has(".");
  for (const [destination, variables] of input.envVariables) {
    if (multiple) parts.push(`### \`${joinPath(destination, ".env")}\``);
    parts.push(
      table(
        ["Variable", "Description", "Example"],
        [...variables.values()].map((variable) => [
          `\`${variable.key}\``,
          variable.description,
          variable.example ? `\`${variable.example}\`` : "",
        ]),
      ),
    );
  }
  parts.push(
    "Never commit `.env` files. `.env.example` lists every variable with a safe example value.",
  );
  return parts.join("\n\n");
}

function scriptSection(
  input: ReadmeInput,
  render: (text: string, layer: ResolvedLayer) => string,
): string | null {
  const { packageManager } = input.project.stack;
  const parts = ["## Scripts"];
  const multiple = input.packageJsons.size > 1;

  for (const [destination, packageJson] of input.packageJsons) {
    const scripts = Object.entries(
      (packageJson.scripts as Record<string, string> | undefined) ?? {},
    );
    if (scripts.length === 0) continue;

    const descriptions = new Map<string, string>();
    for (const layer of input.layers.filter((candidate) => candidate.destination === destination)) {
      for (const [name, description] of Object.entries(layer.manifest.readme?.scripts ?? {})) {
        descriptions.set(name, render(description, layer));
      }
    }

    if (multiple) parts.push(destination === "." ? "### Workspace root" : `### \`${destination}\``);
    parts.push(
      table(
        ["Command", "What it does"],
        scripts.map(([name, command]) => [
          `\`${formatRunCommand(packageManager, name)}\``,
          descriptions.get(name) ?? `Runs \`${command}\``,
        ]),
      ),
    );
  }

  return parts.length > 1 ? parts.join("\n\n") : null;
}

function table(headers: readonly string[], rows: readonly (readonly string[])[]): string {
  const cell = (value: string) => value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
  return [
    `| ${headers.map(cell).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map((value) => cell(value)).join(" | ")} |`),
  ].join("\n");
}

function imagePath(image: ReadmeImage, layer: ResolvedLayer): string {
  return /^https:\/\//.test(image.src) ? image.src : joinPath(layer.destination, image.src);
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function joinPath(destination: string, path: string): string {
  return destination === "." ? path : `${destination}/${path}`;
}
