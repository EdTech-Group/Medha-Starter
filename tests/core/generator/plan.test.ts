import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { join } from "node:path";
import { createGenerationPlan, selectLayers } from "../../../src/core/generator/plan.js";
import type { StackConfig } from "../../../src/types/config.js";
import {
  type FixtureLayer,
  makeProject,
  makeStack,
  makeTempDir,
  removeDir,
  writeFixtureTemplates,
} from "../../helpers/fixtures.js";

let root: string;

beforeEach(async () => {
  root = await makeTempDir();
});

afterEach(async () => {
  await removeDir(root);
});

async function planFor(stack: StackConfig, layers: Record<string, FixtureLayer> = {}) {
  const templates = join(root, "templates");
  await writeFixtureTemplates(templates, stack, layers);
  return createGenerationPlan(makeProject(join(root, "out"), stack), {
    templatesRoot: templates,
    generatorVersion: "9.9.9",
  });
}

const ids = (stack: StackConfig) =>
  selectLayers(stack).map((layer) => `${layer.id} -> ${layer.destination}`);

describe("selectLayers", () => {
  test("full-stack Next.js is a single package", () => {
    expect(ids(makeStack())).toEqual([
      "frontend/next -> .",
      "ui/medha-bootstrap/next -> .",
      "backend/next -> .",
      "database/drizzle/postgres -> .",
      "feature/projects/api/next-drizzle -> .",
      "feature/projects/web/next -> .",
      "testing/vitest/next -> .",
      "ai/medha -> .",
    ]);
  });

  test("a separate backend becomes a workspace with apps/web and apps/api", () => {
    expect(
      ids(
        makeStack({
          backend: "nestjs",
          database: "mongodb",
          auth: "credentials",
          integrations: ["docker"],
        }),
      ),
    ).toEqual([
      "workspace/monorepo -> .",
      "shared/schemas -> packages/shared",
      "frontend/next -> apps/web",
      "ui/medha-bootstrap/next -> apps/web",
      "backend/nestjs -> apps/api",
      "database/mongoose/mongodb -> apps/api",
      "feature/projects/api/nestjs-mongoose -> apps/api",
      "feature/projects/web/next -> apps/web",
      "auth/credentials/api/nestjs-mongoose -> apps/api",
      "auth/credentials/web/next -> apps/web",
      "testing/vitest/next -> apps/web",
      "testing/vitest/nestjs -> apps/api",
      "integration/docker -> .",
      "ai/medha -> .",
    ]);
  });
});

describe("createGenerationPlan", () => {
  test("composes files, package.json, .env.example and medha.json deterministically", async () => {
    const stack = makeStack({ testing: "none" });
    const plan = await planFor(stack, {
      "frontend/next": {
        manifest: {
          packageJson: {
            type: "module",
            scripts: { dev: "next dev" },
            dependencies: { next: "^16.4.2" },
          },
          env: [{ key: "NEXT_PUBLIC_APP_NAME", example: "{{x}}", description: "Display name" }],
        },
        files: {
          "docs/guide.md.tmpl": "# {{ projectTitle }} on {{packageManager}}",
          gitignore: "node_modules\n",
        },
      },
      "database/drizzle/postgres": {
        manifest: {
          packageJson: { dependencies: { "drizzle-orm": "^0.45.4" } },
          env: [
            {
              key: "DATABASE_URL",
              example: "postgres://user:password@localhost:5432/app",
              description: "Connection",
            },
          ],
        },
      },
    });

    const paths = plan.files.map((file) => file.path);
    expect(paths).toEqual([...paths].sort());
    expect(paths).toContain("docs/guide.md");
    expect(paths).toContain("README.md");
    expect(paths).toContain(".gitignore");
    expect(paths).not.toContain("gitignore");

    const byPath = (path: string) => plan.files.find((file) => file.path === path);
    expect(byPath("docs/guide.md")?.content).toBe("# Demo App on npm");
    expect(byPath("README.md")?.content).toContain("# Demo App");
    expect(byPath(".gitignore")?.content).toBeNull();

    expect(JSON.parse(byPath("package.json")?.content ?? "")).toEqual({
      name: "demo-app",
      version: "0.1.0",
      private: true,
      type: "module",
      scripts: { dev: "next dev" },
      dependencies: { "drizzle-orm": "^0.45.4", next: "^16.4.2" },
    });

    const env = byPath(".env.example")?.content ?? "";
    expect(env).toContain("# Display name\nNEXT_PUBLIC_APP_NAME={{x}}");
    expect(env).toContain("DATABASE_URL=postgres://user:password@localhost:5432/app");

    expect(JSON.parse(byPath("medha.json")?.content ?? "")).toEqual({
      generator: "medha-starter",
      version: "9.9.9",
      project: { name: "demo-app", description: null },
      stack,
    });
  });

  test("gives each workspace package its own package.json", async () => {
    const plan = await planFor(makeStack({ backend: "nestjs", testing: "none" }));
    const names = plan.files
      .filter((file) => file.path.endsWith("package.json"))
      .map((file) => [file.path, JSON.parse(file.content ?? "").name]);
    expect(names).toEqual([
      ["apps/api/package.json", "demo-app-api"],
      ["apps/web/package.json", "demo-app-web"],
      ["package.json", "demo-app"],
      ["packages/shared/package.json", "demo-app-shared"],
    ]);
  });

  test("rejects two layers writing the same file unless declared as an override", async () => {
    const stack = makeStack({ testing: "none" });
    await expect(
      planFor(stack, {
        "frontend/next": { files: { "src/app/page.tsx": "a" } },
        "feature/projects/web/next": { files: { "src/app/page.tsx": "b" } },
      }),
    ).rejects.toThrow(
      'Layers "frontend/next" and "feature/projects/web/next" both write src/app/page.tsx',
    );
  });

  test("allows a declared override and keeps the later file", async () => {
    const plan = await planFor(makeStack({ testing: "none" }), {
      "frontend/next": { files: { "src/app/page.tsx": "a" } },
      "feature/projects/web/next": {
        manifest: { overrides: ["src/app/page.tsx"] },
        files: { "src/app/page.tsx": "b" },
      },
    });
    expect(plan.files.find((file) => file.path === "src/app/page.tsx")?.layerId).toBe(
      "feature/projects/web/next",
    );
  });

  test("rejects stale overrides", async () => {
    await expect(
      planFor(makeStack({ testing: "none" }), {
        "frontend/next": { manifest: { overrides: ["nothing.ts"] } },
      }),
    ).rejects.toThrow("no earlier layer writes: nothing.ts");
  });

  test("rejects layers that ship package.json or .env.example as files", async () => {
    await expect(
      planFor(makeStack(), { "frontend/next": { files: { "package.json": "{}" } } }),
    ).rejects.toThrow(
      "declare package.json fields, env variables and README content in layer.json",
    );
  });

  test("rejects conflicting dependency versions across layers", async () => {
    await expect(
      planFor(makeStack(), {
        "frontend/next": { manifest: { packageJson: { dependencies: { zod: "^4.6.7" } } } },
        "backend/next": { manifest: { packageJson: { dependencies: { zod: "^3.0.0" } } } },
      }),
    ).rejects.toThrow('sets dependencies.zod to "^3.0.0"');
  });

  test("rejects invalid manifests and unknown template variables", async () => {
    await expect(
      planFor(makeStack(), {
        "frontend/next": { manifest: { env: [{ key: "lower", example: "", description: "x" }] } },
      }),
    ).rejects.toThrow("UPPER_SNAKE_CASE");
    await expect(
      planFor(makeStack(), { "frontend/next": { files: { "a.ts.tmpl": "{{ secretSauce }}" } } }),
    ).rejects.toThrow("Unknown template variable(s) in frontend/next/files/a.ts.tmpl: secretSauce");
  });

  test("requires ^ or ~ ranges unless a dependency is listed as pinned", async () => {
    await expect(
      planFor(makeStack(), {
        "frontend/next": { manifest: { packageJson: { dependencies: { next: "16.4.2" } } } },
      }),
    ).rejects.toThrow('dependencies.next is "16.4.2". Use a "^x.y.z" or "~x.y.z" range');
    await expect(
      planFor(makeStack(), {
        "frontend/next": { manifest: { packageJson: { devDependencies: { x: "latest" } } } },
      }),
    ).rejects.toThrow('devDependencies.x is "latest"');

    const plan = await planFor(makeStack(), {
      "frontend/next": {
        manifest: {
          pinned: ["@biomejs/biome"],
          packageJson: { devDependencies: { "@biomejs/biome": "2.5.15" } },
        },
      },
    });
    expect(plan.files.find((file) => file.path === "package.json")?.content).toContain(
      '"@biomejs/biome": "2.5.15"',
    );

    await expect(
      planFor(makeStack(), { "frontend/next": { manifest: { pinned: ["ghost"] } } }),
    ).rejects.toThrow('"pinned" lists ghost, which is not a dependency of this layer');
  });

  test("reports a missing layer by id and path", async () => {
    const stack = makeStack();
    const templates = join(root, "templates");
    await writeFixtureTemplates(templates, stack);
    await removeDir(join(templates, "ai"));
    await expect(
      createGenerationPlan(makeProject(join(root, "out"), stack), {
        templatesRoot: templates,
        generatorVersion: "1.0.0",
      }),
    ).rejects.toThrow('Template layer "ai/medha" is missing');
  });
});
