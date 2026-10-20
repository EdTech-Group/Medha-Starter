import { describe, expect, test } from "bun:test";
import { parseCliArgs } from "../src/cli-args.js";
import { CliUsageError } from "../src/core/errors.js";

describe("parseCliArgs", () => {
  test("treats a bare name and the create subcommand the same way", () => {
    const bare = parseCliArgs(["my-app"]);
    const explicit = parseCliArgs(["create", "my-app"]);
    expect(bare).toEqual(explicit);
    expect(bare).toMatchObject({ kind: "create", options: { projectName: "my-app" } });
  });

  test("defaults: install and git on, prompting allowed", () => {
    expect(parseCliArgs([])).toEqual({
      kind: "create",
      options: {
        stack: {},
        yes: false,
        install: true,
        git: true,
        dryRun: false,
        debug: false,
        allowPlanned: false,
        updateCheck: true,
        offline: false,
      },
    });
  });

  test("reads stack flags in both --flag value and --flag=value forms", () => {
    const parsed = parseCliArgs([
      "app",
      "--backend",
      "nestjs",
      "--db=mysql",
      "--orm",
      "drizzle",
      "--integrations=docker,github-actions",
      "--pnpm",
    ]);
    expect(parsed).toMatchObject({
      kind: "create",
      options: {
        stack: {
          backend: "nestjs",
          database: "mysql",
          orm: "drizzle",
          integrations: "docker,github-actions",
          packageManager: "pnpm",
        },
      },
    });
  });

  test("reads general flags", () => {
    expect(
      parseCliArgs(["app", "-y", "--dry-run", "--no-install", "--no-git", "--debug"]),
    ).toMatchObject({
      options: { yes: true, dryRun: true, install: false, git: false, debug: true },
    });
  });

  test("reads network flags", () => {
    expect(parseCliArgs(["app", "--offline", "--no-update-check"])).toMatchObject({
      options: { offline: true, updateCheck: false },
    });
  });

  test("help, version and list", () => {
    expect(parseCliArgs(["--help"])).toEqual({ kind: "help" });
    expect(parseCliArgs(["app", "-h"])).toEqual({ kind: "help" });
    expect(parseCliArgs(["-V"])).toEqual({ kind: "version" });
    expect(parseCliArgs(["list"])).toEqual({ kind: "list" });
  });

  test.each([
    [["--backend"], "requires a value"],
    [["--backend", "--yes"], "requires a value"],
    [["--backend="], "requires a value"],
    [["--wat"], "Unknown option"],
    [["one", "two"], "Unexpected argument"],
    [["list", "extra"], "does not accept"],
    [["--pm", "npm", "--bun"], "Conflicting values"],
    [["--db", "mysql", "--database", "postgres"], "Conflicting values"],
  ])("rejects %p", (args, message) => {
    expect(() => parseCliArgs(args)).toThrow(CliUsageError);
    expect(() => parseCliArgs(args)).toThrow(message);
  });

  test("allows repeating a flag with the same value", () => {
    expect(parseCliArgs(["--bun", "--pm", "bun"])).toMatchObject({
      options: { stack: { packageManager: "bun" } },
    });
  });
});
