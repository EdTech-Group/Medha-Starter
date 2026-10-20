import type { PackageJsonFragment } from "../../types/generator.js";

type MutablePackageJson = Record<string, unknown>;

const MAP_SECTIONS = new Set(["scripts", "dependencies", "devDependencies", "peerDependencies"]);

/**
 * Merges a layer's package.json fragment. Two layers may declare the same entry only with the
 * same value; anything else is a template bug and fails generation instead of silently winning.
 */
export function mergePackageJson(
  target: MutablePackageJson,
  fragment: PackageJsonFragment,
  layerId: string,
): void {
  for (const [field, value] of Object.entries(fragment)) {
    if (MAP_SECTIONS.has(field)) {
      const section = { ...((target[field] as Record<string, string> | undefined) ?? {}) };
      for (const [name, version] of Object.entries(value as Record<string, string>)) {
        const existing = section[name];
        if (existing !== undefined && existing !== version) {
          throw new Error(
            `Layer "${layerId}" sets ${field}.${name} to "${version}", but an earlier layer set "${existing}". Align the layer manifests.`,
          );
        }
        section[name] = version;
      }
      target[field] = section;
      continue;
    }

    if (field in target && JSON.stringify(target[field]) !== JSON.stringify(value)) {
      throw new Error(
        `Layer "${layerId}" sets package.json "${field}" differently from an earlier layer.`,
      );
    }
    target[field] = value;
  }
}

/** Stable output: well-known fields first, dependency maps sorted alphabetically. */
export function serializePackageJson(packageJson: MutablePackageJson): string {
  const order = [
    "name",
    "version",
    "private",
    "type",
    "workspaces",
    "scripts",
    "dependencies",
    "devDependencies",
  ];
  const sorted: MutablePackageJson = {};

  for (const field of [...order, ...Object.keys(packageJson).sort()]) {
    if (!(field in packageJson) || field in sorted) continue;
    const value = packageJson[field];
    sorted[field] =
      MAP_SECTIONS.has(field) && field !== "scripts" && value && typeof value === "object"
        ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b, "en")))
        : value;
  }

  return `${JSON.stringify(sorted, null, 2)}\n`;
}
