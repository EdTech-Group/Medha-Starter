import prompts, { type Choice, type PromptObject } from "prompts";
import { compatibleOrms } from "../core/compatibility.js";
import { completeStack } from "../core/config.js";
import { CancelledError } from "../core/errors.js";
import { STACK_KEYS, STACK_REGISTRY } from "../core/registry.js";
import type { PackageManager, PartialStackConfig, StackConfig, StackKey } from "../types/config.js";
import type { OptionDescriptor } from "../types/registry.js";

const onCancel = (): never => {
  throw new CancelledError();
};

export async function promptProjectName(): Promise<string> {
  const { projectName } = (await prompts(
    {
      type: "text",
      name: "projectName",
      message: "Project name",
      initial: "medha-app",
      validate: (value: string) => (value.trim().length > 0 ? true : "Project name is required."),
    },
    { onCancel },
  )) as { projectName?: string };

  return (projectName ?? "").trim();
}

/**
 * Prompts for every choice not already given as a flag. Each prompt only offers options that are
 * compatible with earlier answers; planned options are shown disabled.
 */
export async function promptForStack(
  given: PartialStackConfig,
  detectedPackageManager: PackageManager,
  allowPlanned = false,
): Promise<StackConfig> {
  const answers: PartialStackConfig = { ...given };

  for (const key of STACK_KEYS) {
    if (answers[key] !== undefined) continue;

    // Defaults derived from the answers so far (e.g. the ORM follows the database).
    const defaults = completeStack(answers, detectedPackageManager);
    const options = visibleOptions(key, answers).map((option) =>
      allowPlanned ? { ...option, status: "available" as const } : option,
    );

    // Nothing selectable yet: keep the default and let validation explain what is missing.
    if (!options.some((option) => option.status === "available")) continue;

    const value = await promptForKey(key, options, defaults[key]);
    Object.assign(answers, { [key]: value });
  }

  return completeStack(answers, detectedPackageManager);
}

export async function confirmGeneration(): Promise<boolean> {
  const { confirmed } = (await prompts(
    { type: "confirm", name: "confirmed", message: "Generate this project?", initial: true },
    { onCancel },
  )) as { confirmed?: boolean };

  return confirmed === true;
}

function visibleOptions(key: StackKey, answers: PartialStackConfig): readonly OptionDescriptor[] {
  const options: readonly OptionDescriptor[] = STACK_REGISTRY[key].options;

  if (key === "orm" && answers.database) {
    const allowed: readonly string[] = compatibleOrms(answers.database);
    return options.filter((option) => allowed.includes(option.id));
  }
  if (key === "backend" && answers.frontend && answers.frontend !== "next") {
    return options.filter((option) => option.id !== "next");
  }

  return options;
}

async function promptForKey(
  key: StackKey,
  options: readonly OptionDescriptor[],
  defaultValue: StackConfig[StackKey],
): Promise<unknown> {
  const { title, multiple } = STACK_REGISTRY[key];
  const choices: Choice[] = options.map((option) => ({
    title: option.status === "planned" ? `${option.label} (planned)` : option.label,
    value: option.id,
    disabled: option.status === "planned",
    ...(option.description ? { description: option.description } : {}),
    ...(multiple && Array.isArray(defaultValue)
      ? { selected: defaultValue.includes(option.id) }
      : {}),
  }));

  const question: PromptObject = multiple
    ? {
        type: "multiselect",
        name: "value",
        message: title,
        choices,
        hint: "Space to toggle, Enter to continue",
        instructions: false,
      }
    : {
        type: "select",
        name: "value",
        message: title,
        choices,
        initial: initialIndex(options, defaultValue),
      };

  const { value } = (await prompts(question, { onCancel })) as { value?: unknown };
  return value;
}

function initialIndex(options: readonly OptionDescriptor[], defaultValue: unknown): number {
  const preferred = options.findIndex(
    (option) => option.id === defaultValue && option.status === "available",
  );
  if (preferred >= 0) return preferred;
  return Math.max(
    0,
    options.findIndex((option) => option.status === "available"),
  );
}
