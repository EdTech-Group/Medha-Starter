import { basename, join, relative, resolve } from "node:path";
import pc from "picocolors";
import {
  findAvailabilityIssues,
  findCompatibilityIssues,
  formatIssues,
} from "../core/compatibility.js";
import { completeStack, parseStackFlags } from "../core/config.js";
import { CancelledError, CliUsageError, ConfigError } from "../core/errors.js";
import { readExistingProjectInfo } from "../core/generator/existing-project.js";
import { createGenerationPlan } from "../core/generator/plan.js";
import { formatExistingFileActions, planWrites, writeProject } from "../core/generator/write.js";
import { getPackageVersion, TEMPLATES_ROOT } from "../paths.js";
import { confirmGeneration, promptForStack, promptProjectName } from "../prompts/interactive.js";
import { formatSummary } from "../prompts/summary.js";
import type { CreateCliOptions } from "../types/cli.js";
import type { PackageManager, ProjectConfig, StackConfig } from "../types/config.js";
import type { GenerationPlan } from "../types/generator.js";
import {
  detectPackageManager,
  formatRunCommand,
  installDependencies,
} from "../utils/package-manager.js";
import { pathExists } from "../utils/fs.js";
import { runCommand } from "../utils/process.js";
import { createRegistryClient, type RegistryClient } from "../utils/registry.js";
import { toValidPackageName, validateProjectName } from "../utils/project-name.js";

export type CreateCommandContext = {
  readonly interactive: boolean;
  readonly cwd: string;
  readonly templatesRoot: string;
  readonly detectedPackageManager: PackageManager;
  readonly log: (message: string) => void;
  /** Registry used for newest-version lookups (defaults to the configured npm registry). */
  readonly registry?: RegistryClient;
};

export function defaultCreateContext(options: CreateCliOptions): CreateCommandContext {
  return {
    interactive: !options.yes && process.stdin.isTTY === true && process.stdout.isTTY === true,
    cwd: process.cwd(),
    templatesRoot: process.env.MEDHA_STARTER_TEMPLATES_DIR
      ? resolve(process.env.MEDHA_STARTER_TEMPLATES_DIR)
      : TEMPLATES_ROOT,
    detectedPackageManager: detectPackageManager(),
    log: (message) => console.log(message),
  };
}

export async function runCreateCommand(
  options: CreateCliOptions,
  context: CreateCommandContext = defaultCreateContext(options),
): Promise<GenerationPlan | null> {
  const { log } = context;
  const givenStack = parseStackFlags(options.stack);

  let projectName = options.projectName?.trim();
  if (!projectName) {
    if (!context.interactive) {
      throw new CliUsageError(
        'A project name is required when not prompting, e.g. "medha-starter my-app --yes".',
      );
    }
    projectName = await promptProjectName();
  }
  projectName = validateProjectName(projectName);

  const stack: StackConfig = context.interactive
    ? await promptForStack(givenStack, context.detectedPackageManager, options.allowPlanned)
    : completeStack(givenStack, context.detectedPackageManager);

  const planned = findAvailabilityIssues(stack);
  const issues = [...(options.allowPlanned ? [] : planned), ...findCompatibilityIssues(stack)];
  if (options.allowPlanned && planned.length > 0) {
    log(
      pc.yellow(
        `Warning: --allow-planned is generating options that are not finished:\n${planned.map((issue) => `  - ${issue.message}`).join("\n")}`,
      ),
    );
  }
  if (issues.length > 0) {
    throw new ConfigError(`This configuration cannot be generated:\n${formatIssues(issues)}`);
  }

  const targetDirectory = resolve(context.cwd, projectName);
  const existing = await readExistingProjectInfo(targetDirectory);
  const project: ProjectConfig = {
    projectName,
    targetDirectory,
    packageName:
      existing.name ??
      toValidPackageName(projectName === "." ? basename(targetDirectory) : basename(projectName)),
    description: existing.description,
    stack,
    install: options.install && !options.dryRun,
    git: options.git && !options.dryRun,
  };

  const plan = await createGenerationPlan(project, {
    templatesRoot: context.templatesRoot,
    generatorVersion: getPackageVersion(),
    ...(options.offline ? {} : { registry: context.registry ?? createRegistryClient() }),
  });
  const actions = await planWrites(plan);
  const existingFileLines = formatExistingFileActions(actions);

  log(`\n${formatSummary(project)}\n`);
  if (existingFileLines.length > 0) {
    log(`${existingFileLines.join("\n")}\n`);
  }
  log(`${formatVersionReport(plan, options.dryRun)}\n`);

  if (options.dryRun) {
    log(formatPlan(plan));
    log(pc.yellow("\nDry run: no files were written."));
    return plan;
  }

  if (context.interactive && !(await confirmGeneration())) {
    throw new CancelledError();
  }

  const changedCount = actions.filter((action) => action.changed).length;
  log(
    changedCount === 0
      ? pc.cyan("Everything is already up to date; no files need to change.")
      : pc.cyan(`Writing ${changedCount} file${changedCount === 1 ? "" : "s"}...`),
  );
  const report = await writeProject(plan, actions);
  if (report.backupDirectory) {
    log(pc.dim(`Originals of changed files: ${relative(targetDirectory, report.backupDirectory)}`));
  }

  if (project.git && !(await pathExists(join(targetDirectory, ".git")))) {
    await initGit(targetDirectory, log);
  }

  if (project.install) {
    log(pc.cyan(`Installing dependencies with ${stack.packageManager}...`));
    await installDependencies(stack.packageManager, targetDirectory);
  }

  log(formatNextSteps(project, context.cwd));
  return plan;
}

export function formatVersionReport(plan: GenerationPlan, detailed: boolean): string {
  const report = plan.versions;
  if (!report) {
    return pc.dim("Dependencies: using the versions the templates were tested with (--offline).");
  }

  const lines = [
    `Dependencies: newest compatible releases from the npm registry${report.updates.length > 0 ? ` (${report.updates.length} newer than the templates)` : ""}.`,
  ];
  if (detailed) {
    for (const update of report.updates) {
      lines.push(pc.dim(`  ${update.file}  ${update.name} ${update.from} → ${update.to}`));
    }
  }
  if (report.unresolved.length > 0) {
    lines.push(
      pc.yellow(
        `Could not look up ${report.unresolved.join(", ")}; ${report.unresolved.length === 1 ? "it uses" : "they use"} the tested version range.`,
      ),
    );
  }
  return lines.join("\n");
}

export function formatPlan(plan: GenerationPlan): string {
  const layerLines = plan.layers.map(
    (layer) => `  ${layer.id} ${pc.dim(`→ ${layer.destination}`)}`,
  );
  const fileLines = plan.files.map((file) => `  ${file.path} ${pc.dim(`(${file.layerId})`)}`);

  return [
    pc.bold("Layers"),
    ...layerLines,
    "",
    pc.bold(`Files (${plan.files.length})`),
    ...fileLines,
  ].join("\n");
}

async function initGit(directory: string, log: (message: string) => void): Promise<void> {
  try {
    await runCommand("git", ["init", "-q"], { cwd: directory, inheritOutput: false });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    log(pc.yellow(`Skipped git init: ${reason}`));
  }
}

function formatNextSteps(project: ProjectConfig, cwd: string): string {
  const { packageManager } = project.stack;
  const relativeTarget = relative(cwd, project.targetDirectory) || ".";
  const steps = [
    ...(relativeTarget !== "." ? [`cd ${relativeTarget}`] : []),
    ...(project.install ? [] : [packageManager === "yarn" ? "yarn" : `${packageManager} install`]),
    "cp .env.example .env   # then set real values (see README.md)",
    formatRunCommand(packageManager, "dev"),
  ];

  return [pc.green("\nProject ready.\n"), "Next steps:", ...steps.map((step) => `  ${step}`)].join(
    "\n",
  );
}
