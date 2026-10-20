import type { DatabaseId, OrmId, StackConfig, StackKey } from "../types/config.js";
import type { CompatibilityIssue, CompatibilityRule } from "../types/registry.js";
import { getOption, STACK_KEYS } from "./registry.js";

const ORMS_BY_DATABASE: Readonly<Record<DatabaseId, readonly OrmId[]>> = {
  postgres: ["drizzle", "prisma"],
  mysql: ["drizzle", "prisma"],
  mongodb: ["mongoose"],
};

export function compatibleOrms(database: DatabaseId): readonly OrmId[] {
  return ORMS_BY_DATABASE[database];
}

export function defaultOrmFor(database: DatabaseId): OrmId {
  const [first] = ORMS_BY_DATABASE[database];
  if (!first) {
    throw new Error(`No ORM is registered for database "${database}".`);
  }
  return first;
}

/**
 * Explicit compatibility matrix. Each rule names the conflict and how to fix it, so the CLI can
 * reject a combination before writing files instead of generating a broken project.
 */
export const COMPATIBILITY_RULES: readonly CompatibilityRule[] = [
  {
    id: "orm-matches-database",
    summary: "PostgreSQL and MySQL use Drizzle or Prisma; MongoDB uses Mongoose.",
    check: ({ database, orm }) =>
      ORMS_BY_DATABASE[database].includes(orm)
        ? null
        : {
            message: `ORM "${orm}" cannot be used with database "${database}".`,
            fix: `Use --orm ${ORMS_BY_DATABASE[database].join(" or --orm ")}.`,
          },
  },
  {
    id: "next-backend-needs-next-frontend",
    summary: "The Next.js backend requires the Next.js frontend.",
    check: ({ frontend, backend }) =>
      backend === "next" && frontend !== "next"
        ? {
            message:
              "Next.js Route Handlers run inside a Next.js app, so they need the Next.js frontend.",
            fix: "Use --frontend next, or choose --backend nestjs or --backend elysia.",
          }
        : null,
  },
  {
    id: "elysia-needs-bun",
    summary: "The Elysia backend requires Bun as the package manager and runtime.",
    check: ({ backend, packageManager }) =>
      backend === "elysia" && packageManager !== "bun"
        ? {
            message: "The Elysia API server runs on the Bun runtime.",
            fix: "Use --pm bun (Bun must be installed), or choose --backend nestjs.",
          }
        : null,
  },
];

export function findCompatibilityIssues(stack: StackConfig): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];

  for (const rule of COMPATIBILITY_RULES) {
    const issue = rule.check(stack);
    if (issue) {
      issues.push({ rule: rule.id, ...issue });
    }
  }

  return issues;
}

/** Reports every selected option that is registered but not yet implemented. */
export function findAvailabilityIssues(stack: StackConfig): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];

  for (const key of STACK_KEYS) {
    for (const id of selectedIds(stack, key)) {
      const option = getOption(key, id);
      if (option?.status === "planned") {
        issues.push({
          rule: "option-available",
          message: `${option.label} (${key} "${id}") is planned but not available in this version.`,
          fix: 'Run "medha-starter list" to see which options can be generated today.',
        });
      }
    }
  }

  return issues;
}

export function validateStack(stack: StackConfig): CompatibilityIssue[] {
  return [...findAvailabilityIssues(stack), ...findCompatibilityIssues(stack)];
}

/** Lists each problem once; a fix shared by several problems is printed once, after them. */
export function formatIssues(issues: readonly CompatibilityIssue[]): string {
  const lines: string[] = [];

  issues.forEach((issue, index) => {
    lines.push(`  - ${issue.message}`);
    if (issues[index + 1]?.fix !== issue.fix) {
      lines.push(`    Fix: ${issue.fix}`);
    }
  });

  return lines.join("\n");
}

function selectedIds(stack: StackConfig, key: StackKey): readonly string[] {
  const value = stack[key];
  return Array.isArray(value) ? value : [value as string];
}
