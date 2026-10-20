import { describe, expect, test } from "bun:test";
import { completeStack, parseStackFlags } from "../../src/core/config.js";
import { CliUsageError } from "../../src/core/errors.js";

describe("parseStackFlags", () => {
  test("accepts registered ids", () => {
    expect(parseStackFlags({ backend: "elysia", database: "mongodb", orm: "mongoose" })).toEqual({
      backend: "elysia",
      database: "mongodb",
      orm: "mongoose",
    });
  });

  test("rejects unknown ids and lists the valid ones", () => {
    expect(() => parseStackFlags({ database: "oracle" })).toThrow(CliUsageError);
    expect(() => parseStackFlags({ database: "oracle" })).toThrow(
      'Unknown value "oracle" for --database. Valid values: postgres, mysql, mongodb.',
    );
  });

  test("parses integration lists, removing duplicates and blanks", () => {
    expect(parseStackFlags({ integrations: "docker, docker,,github-actions" })).toEqual({
      integrations: ["docker", "github-actions"],
    });
    expect(parseStackFlags({ integrations: "none" })).toEqual({ integrations: [] });
    expect(() => parseStackFlags({ integrations: "docker,k8s" })).toThrow('"k8s"');
  });
});

describe("completeStack", () => {
  test("uses the documented defaults", () => {
    expect(completeStack({}, "pnpm")).toEqual({
      frontend: "next",
      backend: "next",
      database: "postgres",
      orm: "drizzle",
      ui: "medha-bootstrap",
      auth: "none",
      testing: "vitest",
      integrations: [],
      packageManager: "pnpm",
    });
  });

  test("derives the ORM from the database", () => {
    expect(completeStack({ database: "mongodb" }, "npm").orm).toBe("mongoose");
    expect(completeStack({ database: "mysql" }, "npm").orm).toBe("drizzle");
  });

  test("defaults to Bun for Elysia, but keeps an explicit package manager", () => {
    expect(completeStack({ backend: "elysia" }, "npm").packageManager).toBe("bun");
    expect(completeStack({ backend: "elysia", packageManager: "pnpm" }, "npm").packageManager).toBe(
      "pnpm",
    );
  });
});
