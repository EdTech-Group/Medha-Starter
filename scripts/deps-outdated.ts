/**
 * Lists template dependencies whose newest release is outside the range the templates declare
 * (usually a new major version). New projects already get the newest release *within* each
 * range automatically; this report is the to-do list for moving templates to new majors after
 * testing them.
 *
 *   bun run deps:outdated                     # checks templates/
 *   bun run deps:outdated -- tests/fixtures/demo-templates
 *
 * Exits 1 when anything is outdated, so the weekly CI job makes it visible.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import semver from "semver";
import { createRegistryClient } from "../src/utils/registry.js";

const root = join(import.meta.dir, "..");
const templatesRoot = join(root, process.argv[2] ?? "templates");
const client = createRegistryClient({ timeoutMs: 15_000 });

type Entry = { layer: string; name: string; range: string };
const entries: Entry[] = [];

for (const manifestPath of findManifests(templatesRoot)) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as {
    packageJson?: Record<string, Record<string, string> | undefined>;
  };
  const layer = relative(templatesRoot, join(manifestPath, ".."));
  for (const section of ["dependencies", "devDependencies"]) {
    for (const [name, range] of Object.entries(manifest.packageJson?.[section] ?? {})) {
      entries.push({ layer, name, range });
    }
  }
}

if (entries.length === 0) {
  console.log(`No template dependencies found under ${relative(root, templatesRoot) || "."}.`);
  process.exit(0);
}

const outdated: string[] = [];
const failed: string[] = [];

for (const name of [...new Set(entries.map((entry) => entry.name))].sort()) {
  let latest: string | null = null;
  try {
    latest = (await client.getPackageVersions(name))?.latest ?? null;
  } catch (error) {
    failed.push(`${name}: ${error instanceof Error ? error.message : String(error)}`);
    continue;
  }
  if (!latest) continue;

  for (const entry of entries.filter((candidate) => candidate.name === name)) {
    if (semver.validRange(entry.range) && !semver.satisfies(latest, entry.range)) {
      outdated.push(
        `${entry.name.padEnd(28)} ${entry.range.padEnd(12)} → ${latest.padEnd(12)} ${entry.layer}`,
      );
    }
  }
}

if (outdated.length === 0) {
  console.log(`All ${entries.length} template dependency ranges include the latest release.`);
} else {
  console.log(
    "Newer releases outside the template ranges (test, then raise the range in layer.json):\n",
  );
  console.log(`${"package".padEnd(28)} ${"range".padEnd(12)}   ${"latest".padEnd(12)} layer`);
  for (const line of outdated) console.log(line);
}
for (const line of failed) console.error(`Could not check ${line}`);

process.exitCode = outdated.length > 0 || failed.length > 0 ? 1 : 0;

function findManifests(directory: string): string[] {
  let names: string[];
  try {
    names = readdirSync(directory);
  } catch {
    return [];
  }
  return names.flatMap((name) => {
    const path = join(directory, name);
    if (name === "files") return [];
    if (name === "layer.json") return [path];
    return statSync(path).isDirectory() ? findManifests(path) : [];
  });
}
