import pc from "picocolors";
import { getOption, STACK_KEYS, STACK_REGISTRY } from "../core/registry.js";
import type { ProjectConfig, StackKey } from "../types/config.js";

export function formatStackValue(key: StackKey, value: string | readonly string[]): string {
  const ids = typeof value === "string" ? [value] : value;
  if (ids.length === 0) return "none";
  return ids.map((id) => getOption(key, id)?.label ?? id).join(", ");
}

export function formatSummary(project: ProjectConfig): string {
  const rows: [string, string][] = [
    ["Project", project.packageName],
    ["Location", project.targetDirectory],
    ...STACK_KEYS.map((key): [string, string] => [
      STACK_REGISTRY[key].title,
      formatStackValue(key, project.stack[key]),
    ]),
    ["Install dependencies", project.install ? "yes" : "no"],
    ["Initialise git", project.git ? "yes" : "no"],
  ];
  const width = Math.max(...rows.map(([label]) => label.length));

  return [
    pc.bold("Configuration"),
    ...rows.map(([label, value]) => `  ${pc.dim(label.padEnd(width))}  ${value}`),
  ].join("\n");
}
