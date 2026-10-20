import semver from "semver";
import type { DependencyUpdate, VersionResolutionReport } from "../../types/generator.js";
import type { RegistryClient } from "../../utils/registry.js";

const RESOLVED_SECTIONS = ["dependencies", "devDependencies"] as const;
const UPDATABLE_RANGE = /^([\^~])(\d+\.\d+\.\d+)$/;
const CONCURRENCY = 8;

/**
 * Raises each "^x.y.z" / "~x.y.z" range to the newest stable release that still satisfies it, so
 * a new project starts on current versions without crossing into an untested major (or, for "~",
 * minor) release. Exact pins and other specifiers are left alone. Mutates the package.json objects.
 */
export async function resolveNewestVersions(
  packageJsons: ReadonlyMap<string, Record<string, unknown>>,
  client: RegistryClient,
): Promise<VersionResolutionReport> {
  const targets: { file: string; section: Record<string, string>; name: string; range: string }[] =
    [];

  for (const [destination, packageJson] of packageJsons) {
    const file = destination === "." ? "package.json" : `${destination}/package.json`;
    for (const sectionName of RESOLVED_SECTIONS) {
      const section = packageJson[sectionName] as Record<string, string> | undefined;
      for (const [name, range] of Object.entries(section ?? {})) {
        if (section && UPDATABLE_RANGE.test(range)) {
          targets.push({ file, section, name, range });
        }
      }
    }
  }

  const newest = new Map<string, string | null>();
  const names = [...new Set(targets.map((target) => target.name))];
  const unresolved = new Set<string>();

  await mapWithConcurrency(names, CONCURRENCY, async (name) => {
    try {
      const info = await client.getPackageVersions(name);
      if (!info) {
        unresolved.add(name);
        return;
      }
      for (const target of targets.filter((candidate) => candidate.name === name)) {
        const best = semver.maxSatisfying(
          info.versions.filter((version) => semver.prerelease(version) === null),
          target.range,
        );
        newest.set(`${target.file}\0${name}\0${target.range}`, best);
      }
    } catch {
      unresolved.add(name);
    }
  });

  const updates: DependencyUpdate[] = [];
  for (const target of targets) {
    const best = newest.get(`${target.file}\0${target.name}\0${target.range}`);
    const [, operator = "^", floor = ""] = UPDATABLE_RANGE.exec(target.range) ?? [];
    if (!best || !semver.gt(best, floor)) continue;

    const to = `${operator}${best}`;
    target.section[target.name] = to;
    updates.push({ file: target.file, name: target.name, from: target.range, to });
  }

  return { updates, unresolved: [...unresolved].sort() };
}

async function mapWithConcurrency<T>(
  items: readonly T[],
  limit: number,
  task: (item: T) => Promise<void>,
): Promise<void> {
  let next = 0;
  const worker = async (): Promise<void> => {
    while (next < items.length) {
      const item = items[next];
      next += 1;
      if (item !== undefined) await task(item);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
}
