import { describe, expect, test } from "bun:test";
import {
  compatibleOrms,
  findAvailabilityIssues,
  findCompatibilityIssues,
  formatIssues,
} from "../../src/core/compatibility.js";
import { makeStack } from "../helpers/fixtures.js";

const ruleIds = (issues: { rule: string }[]) => issues.map((issue) => issue.rule);

describe("compatibility rules", () => {
  test.each([
    ["Next.js + Next.js backend + PostgreSQL", { backend: "next", database: "postgres" }],
    ["Next.js + NestJS + MySQL", { backend: "nestjs", database: "mysql" }],
    ["Next.js + Elysia + PostgreSQL", { backend: "elysia", database: "postgres" }],
    ["Next.js + NestJS + MongoDB", { backend: "nestjs", database: "mongodb" }],
  ] as const)("accepts %s", (_name, partial) => {
    expect(findCompatibilityIssues(makeStack(partial))).toEqual([]);
  });

  test("rejects a SQL ORM on MongoDB and Mongoose on SQL databases", () => {
    expect(
      ruleIds(findCompatibilityIssues(makeStack({ database: "mongodb", orm: "drizzle" }))),
    ).toEqual(["orm-matches-database"]);
    expect(
      ruleIds(findCompatibilityIssues(makeStack({ database: "postgres", orm: "mongoose" }))),
    ).toEqual(["orm-matches-database"]);
  });

  test("rejects Next.js Route Handlers without the Next.js frontend", () => {
    expect(
      ruleIds(findCompatibilityIssues(makeStack({ frontend: "react-vite", backend: "next" }))),
    ).toEqual(["next-backend-needs-next-frontend"]);
  });

  test("rejects Elysia without Bun", () => {
    const issues = findCompatibilityIssues(makeStack({ backend: "elysia", packageManager: "npm" }));
    expect(ruleIds(issues)).toEqual(["elysia-needs-bun"]);
    expect(formatIssues(issues)).toContain("Fix: Use --pm bun");
  });

  test("reports several broken rules at once", () => {
    const stack = makeStack({
      frontend: "react-vite",
      backend: "next",
      database: "mongodb",
      orm: "prisma",
    });
    expect(ruleIds(findCompatibilityIssues(stack)).sort()).toEqual([
      "next-backend-needs-next-frontend",
      "orm-matches-database",
    ]);
  });

  test("accepts the frontend-only React app and rejects a database or sign-in without a backend", () => {
    const frontendOnly = { frontend: "react-vite", backend: "none", database: "none" } as const;
    expect(findCompatibilityIssues(makeStack(frontendOnly))).toEqual([]);
    expect(
      ruleIds(findCompatibilityIssues(makeStack({ ...frontendOnly, database: "postgres" }))),
    ).toEqual(["database-needs-backend"]);
    expect(
      ruleIds(findCompatibilityIssues(makeStack({ backend: "nestjs", database: "none" }))),
    ).toEqual(["database-needs-backend"]);
    expect(
      ruleIds(findCompatibilityIssues(makeStack({ ...frontendOnly, auth: "credentials" }))),
    ).toEqual(["credentials-need-backend"]);
  });

  test("lists compatible ORMs per database", () => {
    expect(compatibleOrms("mongodb")).toEqual(["mongoose"]);
    expect(compatibleOrms("postgres")).toEqual(["drizzle", "prisma"]);
  });
});

describe("availability", () => {
  test("the frontend-only React app with tests and CI is fully available", () => {
    const stack = makeStack({
      frontend: "react-vite",
      backend: "none",
      database: "none",
      integrations: ["github-actions"],
    });
    expect(findAvailabilityIssues(stack)).toEqual([]);
  });

  test("rejects planned options with a pointer to the list command", () => {
    const issues = findAvailabilityIssues(makeStack({ integrations: ["docker"] }));
    expect(issues.length).toBeGreaterThan(0);
    expect(issues.every((issue) => issue.rule === "option-available")).toBe(true);
    expect(issues.map((issue) => issue.message).join("\n")).toContain('integrations "docker"');
    expect(issues[0]?.fix).toContain("medha-starter list");
  });
});

describe("formatIssues", () => {
  test("prints a fix shared by consecutive issues only once", () => {
    const output = formatIssues([
      { rule: "a", message: "one", fix: "same" },
      { rule: "a", message: "two", fix: "same" },
      { rule: "b", message: "three", fix: "other" },
    ]);
    expect(output).toBe("  - one\n  - two\n    Fix: same\n  - three\n    Fix: other");
  });
});
