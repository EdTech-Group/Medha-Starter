import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { join } from "node:path";
import { runCreateCommand } from "../../src/commands/create.js";
import { CliUsageError, ConfigError } from "../../src/core/errors.js";
import type { CreateCliOptions } from "../../src/types/cli.js";
import { pathExists } from "../../src/utils/fs.js";
import { makeTempDir, removeDir } from "../helpers/fixtures.js";

let cwd: string;

beforeEach(async () => {
  cwd = await makeTempDir();
});

afterEach(async () => {
  await removeDir(cwd);
});

const options = (overrides: Partial<CreateCliOptions> = {}): CreateCliOptions => ({
  stack: {},
  yes: true,
  install: false,
  git: false,
  dryRun: false,
  debug: false,
  ...overrides,
});

const context = () => ({
  interactive: false,
  cwd,
  templatesRoot: join(cwd, "templates"),
  detectedPackageManager: "npm" as const,
  log: () => {},
});

describe("runCreateCommand", () => {
  test("requires a project name when not prompting", async () => {
    await expect(runCreateCommand(options(), context())).rejects.toThrow(CliUsageError);
  });

  test("validates the project name", async () => {
    await expect(
      runCreateCommand(options({ projectName: "../escape" }), context()),
    ).rejects.toThrow("path separators");
  });

  test("rejects unknown stack values as usage errors", async () => {
    await expect(
      runCreateCommand(options({ projectName: "app", stack: { database: "oracle" } }), context()),
    ).rejects.toThrow(CliUsageError);
  });

  test("rejects incompatible combinations before writing anything", async () => {
    const error = await runCreateCommand(
      options({ projectName: "app", stack: { database: "mongodb", orm: "drizzle" } }),
      context(),
    ).catch((caught: unknown) => caught);

    expect(error).toBeInstanceOf(ConfigError);
    expect((error as Error).message).toContain(
      'ORM "drizzle" cannot be used with database "mongodb"',
    );
    expect(await pathExists(join(cwd, "app"))).toBe(false);
  });
});
