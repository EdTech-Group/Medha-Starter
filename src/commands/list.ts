import pc from "picocolors";
import { COMPATIBILITY_RULES } from "../core/compatibility.js";
import { STACK_KEYS, STACK_REGISTRY } from "../core/registry.js";

export function formatOptionList(): string {
  const lines: string[] = [];

  for (const key of STACK_KEYS) {
    const { title, options } = STACK_REGISTRY[key];
    lines.push(pc.bold(title));
    for (const option of options) {
      // Pad before colouring: escape codes would otherwise count towards the width.
      const status = option.status === "available" ? pc.green("available") : pc.dim("planned  ");
      const description = option.description ? pc.dim(`  ${option.description}`) : "";
      lines.push(`  ${option.id.padEnd(16)} ${option.label.padEnd(24)} ${status}${description}`);
    }
    lines.push("");
  }

  lines.push(pc.bold("Compatibility rules"));
  for (const rule of COMPATIBILITY_RULES) {
    lines.push(`  - ${rule.summary}`);
  }

  return lines.join("\n");
}
