import { describe, expect, test } from "bun:test";
import {
  appendLines,
  appendMarkdown,
  chooseStrategy,
  mergeEnv,
  mergePackageJsonFile,
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
  test("appends the generated document inside markers", () => {
    const result = appendMarkdown("# My repo\n\nNotes.", "# Generated\n\nRun it.\n");
    expect(result.content).toBe(
      "# My repo\n\nNotes.\n\n<!-- medha-starter:begin -->\n# Generated\n\nRun it.\n<!-- medha-starter:end -->\n",
    );
  });

  test("re-running replaces the marked section instead of appending again", () => {
    const first = appendMarkdown("# My repo\n", "Version 1").content ?? "";
    const second = appendMarkdown(`${first}\nAfter.\n`, "Version 2").content ?? "";
    expect(second).toContain("Version 2");
    expect(second).not.toContain("Version 1");
    expect(second.match(/medha-starter:begin/g)).toHaveLength(1);
    expect(second.endsWith("After.\n")).toBe(true);
  });

  test("leaves a file alone when it already contains the generated document", () => {
    expect(appendMarkdown("# Generated\n\nRun it.\n", "# Generated\n\nRun it.").content).toBeNull();
  });
});

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
      "scripts.dev vite → next dev",
      "scripts.build added",
      "dependencies.next 15.0.0 → 16.4.2",
      "dependencies.react added",
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
