import { describe, expect, test } from "bun:test";
import {
  appendLines,
  appendMarkdown,
  chooseStrategy,
  demoteHeadings,
  isPlaceholderMarkdown,
  mergeEnv,
  mergePackageJsonFile,
  wrapGeneratedSection,
} from "../../../src/core/generator/merge.js";

describe("chooseStrategy", () => {
  test.each([
    [".gitignore", "append-lines"],
    ["apps/web/.gitignore", "append-lines"],
    [".dockerignore", "append-lines"],
    [".npmrc", "append-lines"],
    [".env.example", "merge-env"],
    ["README.md", "append-markdown"],
    ["docs/setup.md", "append-markdown"],
    ["AGENTS.md", "append-markdown"],
    ["package.json", "merge-package-json"],
    ["apps/api/package.json", "merge-package-json"],
    ["LICENSE", "keep"],
    ["LICENSE.md", "keep"],
    ["tsconfig.json", "overwrite"],
    ["src/app/page.tsx", "overwrite"],
  ] as const)("%s → %s", (path, strategy) => {
    expect(chooseStrategy(path)).toBe(strategy);
  });
});

describe("appendLines", () => {
  test("appends only missing entries, under a header, without generated comments", () => {
    const result = appendLines(
      "node_modules\n.env\n",
      "# deps\nnode_modules\n.next\n\n.env\ndist\n",
    );
    expect(result.content).toBe("node_modules\n.env\n\n# Added by medha-starter\n.next\ndist\n");
    expect(result.notes).toEqual(["2 new lines appended"]);
  });

  test("returns null when nothing is missing", () => {
    expect(appendLines("a\nb", "b\na\n").content).toBeNull();
  });

  test("handles a file without a trailing newline", () => {
    expect(appendLines("a", "b").content).toBe("a\n\n# Added by medha-starter\nb\n");
  });
});

describe("mergeEnv", () => {
  const generated =
    "# Generated header\n# Never commit credentials.\n\n# Connection\nDATABASE_URL=postgres://localhost/app\n\n# Port\nPORT=3000\n";

  test("adds only variables the file lacks, with their comments, and keeps existing values", () => {
    const result = mergeEnv("DATABASE_URL=postgres://prod-host/real\n", generated);
    expect(result.content).toBe(
      "DATABASE_URL=postgres://prod-host/real\n\n# Added by medha-starter\n# Port\nPORT=3000\n",
    );
    expect(result.notes).toEqual(["added PORT"]);
  });

  test("recognises export-prefixed and spaced keys", () => {
    expect(mergeEnv("export DATABASE_URL=x\nPORT = 1\n", generated).content).toBeNull();
  });
});

describe("appendMarkdown", () => {
  const BEGIN =
    "<!-- medha-starter:begin (regenerated on each run; add your own notes outside this block) -->";
  const END = "<!-- medha-starter:end -->";
  const realReadme =
    "# Team project\n\nWe track sensor data.\n\n## Contributing\n\nOpen a PR against main.\n";
  const generated = wrapGeneratedSection(
    "# Demo App\n\nIntro.\n\n## Scripts\n\n```sh\n# not a heading\n```\n",
  );

  test("replaces a placeholder README such as the one GitHub creates", () => {
    const result = appendMarkdown("# demo-app\nMy new repo\n", generated);
    expect(result.content).toBe(generated);
    expect(result.notes).toEqual(["placeholder replaced with the generated document"]);
    expect(appendMarkdown("", generated).content).toBe(generated);
  });

  test("appends after real content, demoting headings outside code blocks", () => {
    const result = appendMarkdown(realReadme, generated);
    expect(result.content).toBe(
      `${realReadme}\n${BEGIN}\n## Demo App\n\nIntro.\n\n### Scripts\n\n\`\`\`sh\n# not a heading\n\`\`\`\n${END}\n`,
    );
    expect(result.notes).toEqual(["generated section appended at the end"]);
  });

  test("does not demote when the existing file has no top-level heading", () => {
    const result = appendMarkdown(
      "Some notes without headings, long enough to count as real content.\nLine two.\nLine three.\nLine four.\n",
      generated,
    );
    expect(result.content).toContain(`${BEGIN}\n# Demo App`);
  });

  test("re-running is a no-op, and a newer generated document replaces only its own section", () => {
    const first = appendMarkdown(realReadme, generated).content ?? "";
    expect(appendMarkdown(first, generated).content).toBeNull();

    const edited = `${first}\nNotes added later.\n`;
    const second =
      appendMarkdown(edited, wrapGeneratedSection("# Demo App\n\nVersion 2.")).content ?? "";
    expect(second).toContain("## Demo App\n\nVersion 2.");
    expect(second).not.toContain("Intro.");
    expect(second.match(/medha-starter:begin/g)).toHaveLength(1);
    expect(second.startsWith(realReadme)).toBe(true);
    expect(second.endsWith("Notes added later.\n")).toBe(true);
  });

  test("a README created by an earlier run is updated in place, not appended to", () => {
    const newer = wrapGeneratedSection("# Demo App\n\nNewer version with more text.");
    expect(appendMarkdown(generated, newer).content).toBe(newer);
    expect(appendMarkdown(generated, generated).content).toBeNull();
  });
});

describe("isPlaceholderMarkdown and demoteHeadings", () => {
  test("detects placeholder files", () => {
    expect(isPlaceholderMarkdown("")).toBe(true);
    expect(isPlaceholderMarkdown("# repo\n\nShort description.\n")).toBe(true);
    expect(isPlaceholderMarkdown(realReadmeForPlaceholder)).toBe(false);
    expect(isPlaceholderMarkdown("# repo\n```sh\nrun\n```")).toBe(false);
  });

  test("stops demoting at level 6", () => {
    expect(demoteHeadings("###### Deep\n##### Five")).toBe("###### Deep\n###### Five");
  });
});

const realReadmeForPlaceholder = "# Repo\n\nLine one.\n\nLine two.\n\nLine three.\n";

describe("mergePackageJsonFile", () => {
  const generated = JSON.stringify({
    name: "medha-app",
    version: "0.1.0",
    private: true,
    type: "module",
    scripts: { dev: "next dev", build: "next build" },
    dependencies: { next: "16.4.2", react: "19.3.1" },
  });

  test("keeps the user's identity fields and their other entries, adds and updates the rest", () => {
    const existing = JSON.stringify({
      name: "my-company-app",
      version: "2.3.0",
      private: false,
      scripts: { dev: "vite", lint: "eslint ." },
      dependencies: { next: "15.0.0", lodash: "^4.17.21" },
      engines: { node: ">=20" },
    });
    const result = mergePackageJsonFile(existing, generated, "package.json");
    expect(JSON.parse(result.content ?? "")).toEqual({
      name: "my-company-app",
      version: "2.3.0",
      private: false,
      scripts: { dev: "next dev", lint: "eslint .", build: "next build" },
      dependencies: { next: "16.4.2", lodash: "^4.17.21", react: "19.3.1" },
      engines: { node: ">=20" },
      type: "module",
    });
    expect(result.notes).toEqual([
      "type added",
      "scripts: 1 added, dev vite → next dev",
      "dependencies: 1 added, next 15.0.0 → 16.4.2",
    ]);
  });

  test("returns null when everything is already present", () => {
    expect(mergePackageJsonFile(generated, generated, "package.json").content).toBeNull();
  });

  test("refuses to merge invalid JSON", () => {
    expect(() => mergePackageJsonFile("{ nope", generated, "apps/web/package.json")).toThrow(
      "The existing apps/web/package.json is not valid JSON",
    );
    expect(() => mergePackageJsonFile("[]", generated, "package.json")).toThrow(
      "not a JSON object",
    );
  });
});
