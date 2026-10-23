import type { StackConfig, StackKey } from "../types/config.js";
import type { OptionDescriptor, StackOptionId, StackRegistry } from "../types/registry.js";

/**
 * Every selectable technology. Order within a list is the order shown in prompts.
 * Flip an option to "available" only when its templates exist and its combinations pass
 * the generated-project checks.
 */
export const STACK_REGISTRY: StackRegistry = {
  frontend: {
    title: "Frontend",
    multiple: false,
    options: [
      {
        id: "next",
        label: "Next.js (App Router)",
        description: "React + TypeScript with server and client components.",
        status: "planned",
      },
      {
        id: "react-vite",
        label: "React + Vite",
        description: "React SPA: landing site, sign-in, dashboard and every Medha component.",
        status: "available",
      },
    ],
  },
  backend: {
    title: "Backend",
    multiple: false,
    options: [
      {
        id: "none",
        label: "None (frontend only)",
        description: "No API server; add one later or call an existing API.",
        status: "available",
      },
      {
        id: "next",
        label: "Next.js Route Handlers",
        description: "API inside the Next.js app; one deployable.",
        status: "planned",
      },
      {
        id: "nestjs",
        label: "NestJS",
        description: "Separate modular API server on Node.js (apps/api).",
        status: "planned",
      },
      {
        id: "elysia",
        label: "Elysia",
        description: "Separate type-safe API server on Bun (apps/api).",
        status: "planned",
      },
    ],
  },
  database: {
    title: "Database",
    multiple: false,
    options: [
      { id: "none", label: "None", description: "No database.", status: "available" },
      { id: "postgres", label: "PostgreSQL", description: "Relational, SQL.", status: "planned" },
      { id: "mysql", label: "MySQL", description: "Relational, SQL.", status: "planned" },
      { id: "mongodb", label: "MongoDB", description: "Document store.", status: "planned" },
    ],
  },
  orm: {
    title: "ORM / driver",
    multiple: false,
    options: [
      { id: "none", label: "None", description: "No database access layer.", status: "available" },
      {
        id: "drizzle",
        label: "Drizzle ORM",
        description: "SQL-first, typed schema and migrations.",
        status: "planned",
      },
      {
        id: "prisma",
        label: "Prisma",
        description: "Schema file, generated client and migrations.",
        status: "planned",
      },
      {
        id: "mongoose",
        label: "Mongoose",
        description: "Schemas and models for MongoDB.",
        status: "planned",
      },
    ],
  },
  ui: {
    title: "UI and theme",
    multiple: false,
    options: [
      {
        id: "medha-bootstrap",
        label: "Medha (Bootstrap 5)",
        description: "Medha palette, logo, sidebar layout and page set.",
        status: "available",
      },
    ],
  },
  auth: {
    title: "Authentication",
    multiple: false,
    options: [
      { id: "none", label: "None", description: "No sign-in.", status: "available" },
      {
        id: "credentials",
        label: "Email + password",
        description: "Hashed passwords and HTTP-only session cookies.",
        status: "planned",
      },
    ],
  },
  testing: {
    title: "Testing",
    multiple: false,
    options: [
      {
        id: "vitest",
        label: "Vitest",
        description: "Unit and API tests.",
        status: "available",
      },
      { id: "none", label: "None", description: "No test setup.", status: "available" },
    ],
  },
  integrations: {
    title: "Optional integrations",
    multiple: true,
    options: [
      {
        id: "docker",
        label: "Docker",
        description: "Dockerfile(s) and docker-compose with the database.",
        status: "planned",
      },
      {
        id: "github-actions",
        label: "GitHub Actions",
        description: "CI workflow running lint, typecheck, style check, tests and build.",
        status: "available",
      },
    ],
  },
  packageManager: {
    title: "Package manager",
    multiple: false,
    options: [
      { id: "npm", label: "npm", description: "", status: "available" },
      { id: "pnpm", label: "pnpm", description: "", status: "available" },
      { id: "yarn", label: "Yarn", description: "", status: "available" },
      { id: "bun", label: "Bun", description: "", status: "available" },
    ],
  },
};

/** Prompt and validation order. */
export const STACK_KEYS: readonly StackKey[] = [
  "frontend",
  "backend",
  "database",
  "orm",
  "ui",
  "auth",
  "testing",
  "integrations",
  "packageManager",
];

/** Backend, database and ORM follow from the other choices (see completeStack). */
export const DEFAULT_STACK: Omit<StackConfig, "backend" | "database" | "orm" | "packageManager"> = {
  frontend: "react-vite",
  ui: "medha-bootstrap",
  auth: "none",
  testing: "vitest",
  integrations: [],
};

export function getOption<K extends StackKey>(
  key: K,
  id: string,
): OptionDescriptor<StackOptionId<K>> | undefined {
  const options = STACK_REGISTRY[key].options as readonly OptionDescriptor<StackOptionId<K>>[];
  return options.find((option) => option.id === id);
}

export function getOptionIds(key: StackKey): string[] {
  return STACK_REGISTRY[key].options.map((option) => option.id);
}
