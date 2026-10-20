import { describe, expect, test } from "bun:test";
import { buildTemplateVariables } from "../../../src/core/generator/plan.js";
import { renderReadme } from "../../../src/core/generator/readme.js";
import type { EnvVariable, LayerManifest, ResolvedLayer } from "../../../src/types/generator.js";
import { makeProject, makeStack } from "../../helpers/fixtures.js";

const layer = (
  id: string,
  destination: string,
  manifest: Partial<LayerManifest>,
): ResolvedLayer => ({
  id,
  destination,
  directory: `/templates/${id}`,
  manifest: { id, description: id, ...manifest },
});

const env = (entries: EnvVariable[]) => new Map(entries.map((entry) => [entry.key, entry]));

describe("renderReadme", () => {
  test("describes a full-stack Next.js project from its stack and layers", () => {
    const project = makeProject("/work/demo-app", makeStack({ packageManager: "pnpm" }));
    const readme = renderReadme({
      project,
      generatorVersion: "1.2.3",
      variables: buildTemplateVariables(project, "1.2.3"),
      layers: [
        layer("ui/medha-bootstrap/next", ".", {
          readme: {
            logo: { src: "public/brand/medha-logo.svg", alt: "Medha" },
            images: [{ src: "docs/screenshots/dashboard.png", alt: "Dashboard" }],
            features: ["Medha sidebar layout and colour scheme"],
            structure: { "src/components/medha": "Medha layout components" },
            sections: [
              {
                title: "Design system",
                body: "Use the Medha tokens. Run `{{ runScript }} check:style`.",
              },
            ],
          },
        }),
        layer("database/drizzle/postgres", ".", {
          readme: {
            features: ["PostgreSQL schema and migrations with Drizzle"],
            prerequisites: ["PostgreSQL 14 or newer"],
            setup: ["Create the tables: `{{ runScript }} db:migrate`"],
            scripts: { "db:migrate": "Applies pending migrations" },
          },
        }),
      ],
      packageJsons: new Map([
        [
          ".",
          { name: "demo-app", scripts: { dev: "next dev", "db:migrate": "drizzle-kit migrate" } },
        ],
      ]),
      envVariables: new Map([
        [
          ".",
          env([
            {
              key: "DATABASE_URL",
              example: "postgres://localhost/app",
              description: "PostgreSQL connection",
            },
          ]),
        ],
      ]),
    });

    expect(readme).toContain('<img src="public/brand/medha-logo.svg" alt="Medha" width="240">');
    expect(readme).toContain(
      "# Demo App\n\nA full-stack TypeScript application with a Next.js (App Router) frontend, API routes in the same Next.js app,",
    );
    expect(readme).toContain("![Dashboard](docs/screenshots/dashboard.png)");
    expect(readme).toContain(
      "## What's inside\n\n- Medha sidebar layout and colour scheme\n- PostgreSQL schema and migrations with Drizzle",
    );
    expect(readme).toContain("| Database | PostgreSQL |");
    expect(readme).toContain("| Optional integrations | None |");
    expect(readme).toContain("- PostgreSQL 14 or newer\n- pnpm");
    expect(readme).toContain(
      "1. Install dependencies: `pnpm install`\n2. Create your environment file: `cp .env.example .env`, then set real values (see [Environment variables](#environment-variables)).\n3. Create the tables: `pnpm db:migrate`\n4. Start the development server: `pnpm dev`",
    );
    expect(readme).toContain(
      "| `DATABASE_URL` | PostgreSQL connection | `postgres://localhost/app` |",
    );
    expect(readme).toContain("| `pnpm db:migrate` | Applies pending migrations |");
    expect(readme).toContain("| `pnpm dev` | Runs `next dev` |");
    expect(readme).toContain(
      "| `medha.json` | The stack this project was generated with. |\n| `src/components/medha` | Medha layout components |",
    );
    expect(readme).toContain("## Design system\n\nUse the Medha tokens. Run `pnpm check:style`.");
    expect(
      readme
        .trimEnd()
        .endsWith(
          "Generated with medha-starter 1.2.3. The selected stack is recorded in [`medha.json`](medha.json).",
        ),
    ).toBe(true);
  });

  test("groups env variables and scripts per package in a workspace", () => {
    const project = makeProject(
      "/work/demo-app",
      makeStack({ backend: "nestjs", database: "mysql" }),
    );
    const readme = renderReadme({
      project,
      generatorVersion: "1.0.0",
      variables: buildTemplateVariables(project, "1.0.0"),
      layers: [
        layer("backend/nestjs", "apps/api", {
          readme: {
            scripts: { "start:dev": "Starts the API with reload" },
            structure: { "src/modules": "Feature modules" },
          },
        }),
      ],
      packageJsons: new Map([
        [".", { scripts: { dev: "npm run dev --workspaces" } }],
        ["apps/api", { scripts: { "start:dev": "nest start --watch" } }],
        ["packages/shared", {}],
      ]),
      envVariables: new Map([
        ["apps/api", env([{ key: "PORT", example: "4000", description: "API port" }])],
        [
          "apps/web",
          env([
            {
              key: "NEXT_PUBLIC_API_URL",
              example: "http://localhost:4000",
              description: "API base URL",
            },
          ]),
        ],
      ]),
    });

    expect(readme).toContain("a separate NestJS API in `apps/api`");
    expect(readme).toContain(
      "`cp apps/api/.env.example apps/api/.env`, `cp apps/web/.env.example apps/web/.env`",
    );
    expect(readme).toContain("### `apps/api/.env`\n\n| Variable");
    expect(readme).toContain("### Workspace root\n\n| Command | What it does |");
    expect(readme).toContain(
      "### `apps/api`\n\n| Command | What it does |\n| --- | --- |\n| `npm run start:dev` | Starts the API with reload |",
    );
    expect(readme).toContain("| `apps/api/src/modules` | Feature modules |");
    expect(readme).not.toContain("packages/shared`\n\n| Command");
  });

  test("leads with the project's own description and sorts structure by path", () => {
    const project = {
      ...makeProject("/work/a", makeStack()),
      description: "Sensor dashboard for the Pune plant",
    };
    const readme = renderReadme({
      project,
      generatorVersion: "1",
      variables: buildTemplateVariables(project, "1"),
      layers: [
        layer("frontend/next", ".", { readme: { structure: { "src/app": "Routes" } } }),
        layer("backend/next", ".", { readme: { structure: { "src/app/api": "API" } } }),
      ],
      packageJsons: new Map(),
      envVariables: new Map(),
    });
    expect(readme).toContain(
      "# Demo App\n\nSensor dashboard for the Pune plant.\n\nA full-stack TypeScript application",
    );
    expect(readme.indexOf("`src/app` |")).toBeLessThan(readme.indexOf("`src/app/api` |"));
  });

  test("escapes pipes in table cells", () => {
    const project = makeProject("/work/a", makeStack());
    const readme = renderReadme({
      project,
      generatorVersion: "1",
      variables: buildTemplateVariables(project, "1"),
      layers: [],
      packageJsons: new Map([[".", { scripts: { check: "lint || exit 1" } }]]),
      envVariables: new Map(),
    });
    expect(readme).toContain("Runs `lint \\|\\| exit 1`");
    expect(readme).not.toContain("## Environment variables");
    expect(readme).not.toContain("## What's inside");
  });
});
