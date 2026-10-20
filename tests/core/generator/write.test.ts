import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { chmod, mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createGenerationPlan } from "../../../src/core/generator/plan.js";
import { BACKUP_ROOT, planWrites, writeProject } from "../../../src/core/generator/write.js";
import type { GenerationPlan } from "../../../src/types/generator.js";
import { pathExists } from "../../../src/utils/fs.js";
import {
  makeProject,
  makeStack,
  makeTempDir,
  removeDir,
  writeFixtureTemplates,
} from "../../helpers/fixtures.js";

let root: string;
let templates: string;
let target: string;

beforeEach(async () => {
  root = await makeTempDir();
  templates = join(root, "templates");
  target = join(root, "out");
});

afterEach(async () => {
  await removeDir(root);
});

async function plan(): Promise<GenerationPlan> {
  const stack = makeStack({ testing: "none" });
  await writeFixtureTemplates(templates, stack, {
    "frontend/next": {
      manifest: {
        packageJson: { scripts: { dev: "next dev" }, dependencies: { next: "^16.4.2" } },
      },
      files: {
        "src/app/page.tsx": "export default 1;\n",
        "scripts/run.sh": "#!/bin/sh\n",
        gitignore: "node_modules\n.next\n",
        "tsconfig.json": '{ "generated": true }\n',
        LICENSE: "MIT generated\n",
      },
    },
  });
  await chmod(join(templates, "frontend", "next", "files", "scripts", "run.sh"), 0o755);
  return createGenerationPlan(makeProject(target, stack), {
    templatesRoot: templates,
    generatorVersion: "1.0.0",
  });
}

const read = (path: string) => readFile(join(target, path), "utf8");

async function seed(files: Record<string, string>): Promise<void> {
  for (const [path, content] of Object.entries(files)) {
    await mkdir(join(target, path, ".."), { recursive: true });
    await writeFile(join(target, path), content);
  }
}

const brokenCopy = (generation: GenerationPlan): GenerationPlan => ({
  ...generation,
  files: [
    ...generation.files,
    {
      path: "zzz/broken.txt",
      layerId: "x",
      content: null,
      source: join(root, "missing"),
      mode: 0o644,
    },
  ],
});

describe("writeProject into a new directory", () => {
  test("creates every planned file and preserves the executable bit", async () => {
    const generation = await plan();
    const report = await writeProject(generation);

    for (const file of generation.files) {
      expect(await pathExists(join(target, file.path))).toBe(true);
    }
    expect(report.backupDirectory).toBeNull();
    expect(report.actions.every((action) => action.strategy === "create")).toBe(true);
    expect((await stat(join(target, "scripts/run.sh"))).mode & 0o111).not.toBe(0);
    expect((await readdir(target)).some((name) => name.startsWith(".medha-starter"))).toBe(false);
  });

  test("removes the new directory when writing fails", async () => {
    await expect(writeProject(brokenCopy(await plan()))).rejects.toThrow();
    expect(await pathExists(target)).toBe(false);
  });
});

describe("writeProject into an existing project", () => {
  const existing = {
    "README.md": "# My repo\n\nTeam notes.\n\n## Deploying\n\nAsk ops for access first.\n",
    ".gitignore": "node_modules\n.env\n",
    "package.json": JSON.stringify({
      name: "my-repo",
      version: "3.0.0",
      dependencies: { lodash: "^4" },
    }),
    "tsconfig.json": '{ "mine": true }\n',
    LICENSE: "Apache-2.0 mine\n",
    "NOTES.txt": "unrelated\n",
    "src/lib/util.ts": "export const keep = 1;\n",
  };

  test("appends, merges, keeps or overwrites each existing file and backs up the originals", async () => {
    await seed(existing);
    const report = await writeProject(await plan());
    const byPath = new Map(report.actions.map((action) => [action.path, action]));

    expect(await read("README.md")).toContain(existing["README.md"]);
    expect(await read("README.md")).toContain("medha-starter:begin");
    expect(await read("README.md")).toContain("\n## Demo App\n");
    expect(await read(".gitignore")).toBe(
      "node_modules\n.env\n\n# Added by medha-starter\n.next\n",
    );
    expect(JSON.parse(await read("package.json"))).toMatchObject({
      name: "my-repo",
      version: "3.0.0",
      dependencies: { lodash: "^4", next: "^16.4.2" },
      scripts: { dev: "next dev" },
    });
    expect(await read("tsconfig.json")).toBe('{ "generated": true }\n');
    expect(await read("LICENSE")).toBe("Apache-2.0 mine\n");
    expect(await read("NOTES.txt")).toBe("unrelated\n");
    expect(await read("src/lib/util.ts")).toBe("export const keep = 1;\n");
    expect(await read("src/app/page.tsx")).toBe("export default 1;\n");

    expect(byPath.get("LICENSE")).toMatchObject({ strategy: "keep", changed: false });
    expect(byPath.get("tsconfig.json")).toMatchObject({ strategy: "overwrite", changed: true });

    const backup = report.backupDirectory ?? "";
    expect(backup).toContain(join(target, ...BACKUP_ROOT.split("/")));
    for (const path of ["README.md", ".gitignore", "package.json", "tsconfig.json"]) {
      expect(await readFile(join(backup, path), "utf8")).toBe(
        existing[path as keyof typeof existing],
      );
    }
    expect(await pathExists(join(backup, "LICENSE"))).toBe(false);
    expect(await readFile(join(target, ".medha-starter", ".gitignore"), "utf8")).toBe("*\n");
  });

  test("replaces a placeholder README with the generated one, keeping the original as a backup", async () => {
    await seed({ "README.md": "# demo-app\nCreated on GitHub\n" });
    const report = await writeProject(await plan());
    const readme = await read("README.md");
    expect(readme).toContain("# Demo App\n\nA full-stack TypeScript application");
    expect(readme).not.toContain("Created on GitHub");
    expect(await readFile(join(report.backupDirectory ?? "", "README.md"), "utf8")).toBe(
      "# demo-app\nCreated on GitHub\n",
    );
  });

  test("running again changes nothing and makes no new backup", async () => {
    await seed(existing);
    const generation = await plan();
    await writeProject(generation);
    const snapshot = await read("README.md");

    const second = await planWrites(generation);
    expect(second.filter((action) => action.changed)).toEqual([]);
    const report = await writeProject(generation, second);
    expect(report.backupDirectory).toBeNull();
    expect(await read("README.md")).toBe(snapshot);
  });

  test("restores every existing file and removes new ones when writing fails", async () => {
    await seed(existing);
    await expect(writeProject(brokenCopy(await plan()))).rejects.toThrow();

    for (const [path, content] of Object.entries(existing)) {
      expect(await read(path)).toBe(content);
    }
    expect(await pathExists(join(target, "src/app"))).toBe(false);
    expect(await pathExists(join(target, "scripts"))).toBe(false);
    expect(await pathExists(join(target, ".medha-starter"))).toBe(false);
    expect((await readdir(target)).sort()).toEqual(
      [
        ".gitignore",
        "LICENSE",
        "NOTES.txt",
        "README.md",
        "package.json",
        "src",
        "tsconfig.json",
      ].sort(),
    );
  });

  test("refuses when a directory sits where a file goes, or a file where a directory goes", async () => {
    await mkdir(join(target, "README.md"), { recursive: true });
    await expect(planWrites(await plan())).rejects.toThrow(
      "README.md already exists as a directory",
    );

    await removeDir(target);
    await seed({ src: "a file named src" });
    await expect(planWrites(await plan())).rejects.toThrow(
      "src already exists and is not a directory",
    );
  });

  test("refuses to merge an invalid package.json before writing anything", async () => {
    await seed({ "package.json": "{ broken" });
    await expect(planWrites(await plan())).rejects.toThrow("not valid JSON");
    expect(await readdir(target)).toEqual(["package.json"]);
  });
});
