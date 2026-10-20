import type { ExistingFileStrategy } from "../../types/generator.js";

const MARKDOWN_BEGIN =
  "<!-- medha-starter:begin (regenerated on each run; add your own notes outside this block) -->";
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
 * Combines a generated Markdown document with an existing one:
 * - an empty or placeholder file (a title and at most a line or two, such as the README GitHub
 *   creates with a new repository) is replaced by the generated document;
 * - otherwise the generated document is appended inside marker comments, with its headings
 *   demoted one level when the existing file already has a top-level heading, so the result
 *   still reads as one document;
 * - a marked section left by an earlier run is replaced, so re-running never duplicates it.
 */
export function appendMarkdown(existing: string, generated: string): MergeResult {
  const body = unwrapGeneratedSection(generated).trim();
  if (body.length === 0 || existing.trim() === body) return { content: null, notes: [] };

  const begin = existing.indexOf(MARKDOWN_BEGIN);
  const end = existing.indexOf(MARKDOWN_END, begin);
  const hasSection = begin >= 0 && end > begin;

  if (!hasSection && isPlaceholderMarkdown(existing)) {
    return {
      content: wrapGeneratedSection(body),
      notes: ["placeholder replaced with the generated document"],
    };
  }

  const userContent = hasSection
    ? `${existing.slice(0, begin)}${existing.slice(end + MARKDOWN_END.length)}`
    : existing;
  const sectionBody = /^#\s/m.test(stripFencedCode(userContent)) ? demoteHeadings(body) : body;
  const section = `${MARKDOWN_BEGIN}\n${sectionBody}\n${MARKDOWN_END}`;

  const content = hasSection
    ? `${existing.slice(0, begin)}${section}${existing.slice(end + MARKDOWN_END.length)}`
    : `${withTrailingNewline(existing)}\n${section}\n`;

  if (content === existing) return { content: null, notes: [] };
  return {
    content,
    notes: [hasSection ? "generated section updated" : "generated section appended at the end"],
  };
}

/** Wraps generated Markdown in markers so later runs can find and replace exactly this part. */
export function wrapGeneratedSection(markdown: string): string {
  return `${MARKDOWN_BEGIN}\n${unwrapGeneratedSection(markdown).trim()}\n${MARKDOWN_END}\n`;
}

function unwrapGeneratedSection(markdown: string): string {
  const begin = markdown.indexOf(MARKDOWN_BEGIN);
  const end = markdown.indexOf(MARKDOWN_END, begin);
  return begin >= 0 && end > begin ? markdown.slice(begin + MARKDOWN_BEGIN.length, end) : markdown;
}

/** A file with no real content yet: blank, or a heading plus at most a couple of short lines. */
export function isPlaceholderMarkdown(text: string): boolean {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  return lines.length <= 3 && text.trim().length <= 200 && !text.includes("```");
}

/** Turns "# A" into "## A" (and so on, up to level 6), leaving fenced code blocks untouched. */
export function demoteHeadings(markdown: string): string {
  let inFence = false;
  return markdown
    .split("\n")
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
      if (inFence || !/^#{1,5}\s/.test(line)) return line;
      return `#${line}`;
    })
    .join("\n");
}

function stripFencedCode(markdown: string): string {
  return markdown.replace(/^\s*(```|~~~)[\s\S]*?^\s*\1.*$/gm, "");
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
      let added = 0;
      const updated: string[] = [];
      for (const [name, version] of Object.entries(asStringMap(value) ?? {})) {
        const before = section[name];
        if (before === version) continue;
        section[name] = version;
        if (before === undefined) added += 1;
        else updated.push(`${name} ${before} → ${version}`);
      }
      merged[field] = section;
      // One note per section: how many were added, and every changed value spelled out.
      const parts = [...(added > 0 ? [`${added} added`] : []), ...updated];
      if (parts.length > 0) notes.push(`${field}: ${parts.join(", ")}`);
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
