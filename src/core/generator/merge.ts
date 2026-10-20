import type { ExistingFileStrategy } from "../../types/generator.js";

const MARKDOWN_BEGIN = "<!-- medha-starter:begin -->";
const MARKDOWN_END = "<!-- medha-starter:end -->";
const ADDED_HEADER = "# Added by medha-starter";

/** Ignore-style files: one entry per line, order rarely matters, duplicates are harmless. */
const LINE_FILES = new Set([
  ".gitignore",
  ".dockerignore",
  ".npmignore",
  ".prettierignore",
  ".eslintignore",
  ".gitattributes",
  ".npmrc",
]);

const ENV_FILES = new Set([".env.example", ".env.sample", ".env.template"]);

const KEEP_PATTERN = /^(licen[cs]e|copying)(\.[a-z]+)?$/i;

/** package.json fields that describe the user's project; an existing value always wins. */
const IDENTITY_FIELDS = new Set([
  "name",
  "version",
  "description",
  "author",
  "contributors",
  "license",
  "repository",
  "homepage",
  "bugs",
  "keywords",
  "private",
]);

const DEPENDENCY_SECTIONS = ["scripts", "dependencies", "devDependencies", "peerDependencies"];

/** How to combine a generated file with a file that already exists at the same path. */
export function chooseStrategy(path: string): ExistingFileStrategy {
  const name = path.split("/").at(-1) ?? path;

  if (name === "package.json") return "merge-package-json";
  if (ENV_FILES.has(name)) return "merge-env";
  if (LINE_FILES.has(name)) return "append-lines";
  if (KEEP_PATTERN.test(name)) return "keep";
  if (name.toLowerCase().endsWith(".md")) return "append-markdown";
  return "overwrite";
}

export type MergeResult = {
  /** The merged file, or null when the existing file already has everything. */
  readonly content: string | null;
  readonly notes: readonly string[];
};

/** Appends generated lines that the existing file lacks. Generated comment lines are dropped. */
export function appendLines(existing: string, generated: string): MergeResult {
  const present = new Set(existing.split(/\r?\n/).map((line) => line.trim()));
  const added = [
    ...new Set(
      generated
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith("#") && !present.has(line)),
    ),
  ];

  if (added.length === 0) return { content: null, notes: [] };

  return {
    content: `${withTrailingNewline(existing)}\n${ADDED_HEADER}\n${added.join("\n")}\n`,
    notes: [`${added.length} new line${added.length === 1 ? "" : "s"} appended`],
  };
}

/**
 * Appends generated variables whose keys the existing file does not define, each with its
 * comment. Existing keys and values are never changed.
 */
export function mergeEnv(existing: string, generated: string): MergeResult {
  const existingKeys = new Set(
    existing
      .split(/\r?\n/)
      .map((line) => envKey(line))
      .filter((key): key is string => key !== null),
  );

  const addedKeys: string[] = [];
  const addedBlocks: string[] = [];

  for (const block of generated.split(/\r?\n\s*\r?\n/)) {
    const keys = block
      .split(/\r?\n/)
      .map((line) => envKey(line))
      .filter((key): key is string => key !== null);
    const newKeys = keys.filter((key) => !existingKeys.has(key));
    if (keys.length === 0 || newKeys.length === 0) continue;

    addedKeys.push(...newKeys);
    addedBlocks.push(block.trim());
  }

  if (addedBlocks.length === 0) return { content: null, notes: [] };

  return {
    content: `${withTrailingNewline(existing)}\n${ADDED_HEADER}\n${addedBlocks.join("\n\n")}\n`,
    notes: [`added ${addedKeys.join(", ")}`],
  };
}

/**
 * Appends the generated document inside marker comments. If an earlier run left a marked
 * section, that section is replaced instead, so re-running never duplicates it.
 */
export function appendMarkdown(existing: string, generated: string): MergeResult {
  const body = generated.trim();
  if (body.length === 0 || existing.includes(body)) return { content: null, notes: [] };

  const section = `${MARKDOWN_BEGIN}\n${body}\n${MARKDOWN_END}`;
  const begin = existing.indexOf(MARKDOWN_BEGIN);
  const end = existing.indexOf(MARKDOWN_END, begin);

  if (begin >= 0 && end > begin) {
    return {
      content: `${existing.slice(0, begin)}${section}${existing.slice(end + MARKDOWN_END.length)}`,
      notes: ["generated section replaced"],
    };
  }

  return {
    content: `${withTrailingNewline(existing)}\n${section}\n`,
    notes: ["generated section appended"],
  };
}

/**
 * Merges package.json. The user's identity fields (name, version, ...) win; scripts and
 * dependencies the generated app needs are added or updated, and every change is reported.
 */
export function mergePackageJsonFile(
  existing: string,
  generated: string,
  path: string,
): MergeResult {
  let current: Record<string, unknown>;
  try {
    current = JSON.parse(existing) as Record<string, unknown>;
  } catch {
    throw new Error(`The existing ${path} is not valid JSON. Fix or remove it, then run again.`);
  }
  if (typeof current !== "object" || current === null || Array.isArray(current)) {
    throw new Error(`The existing ${path} is not a JSON object. Fix or remove it, then run again.`);
  }

  const incoming = JSON.parse(generated) as Record<string, unknown>;
  const merged: Record<string, unknown> = { ...current };
  const notes: string[] = [];

  for (const [field, value] of Object.entries(incoming)) {
    if (DEPENDENCY_SECTIONS.includes(field)) {
      const section = { ...(asStringMap(current[field]) ?? {}) };
      for (const [name, version] of Object.entries(asStringMap(value) ?? {})) {
        const before = section[name];
        if (before === version) continue;
        section[name] = version;
        notes.push(
          before === undefined
            ? `${field}.${name} added`
            : `${field}.${name} ${before} → ${version}`,
        );
      }
      merged[field] = section;
      continue;
    }

    if (!(field in current)) {
      merged[field] = value;
      notes.push(`${field} added`);
    } else if (
      !IDENTITY_FIELDS.has(field) &&
      JSON.stringify(current[field]) !== JSON.stringify(value)
    ) {
      merged[field] = value;
      notes.push(`${field} replaced`);
    }
  }

  if (notes.length === 0) return { content: null, notes: [] };

  return { content: `${JSON.stringify(merged, null, 2)}\n`, notes };
}

function envKey(line: string): string | null {
  const match = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=/.exec(line);
  return match?.[1] ?? null;
}

function withTrailingNewline(text: string): string {
  return text.length === 0 || text.endsWith("\n") ? text : `${text}\n`;
}

function asStringMap(value: unknown): Record<string, string> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, string>)
    : null;
}
