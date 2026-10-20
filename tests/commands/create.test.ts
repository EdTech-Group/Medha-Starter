import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { runCreateCommand } from "../../src/commands/create.js";
import { CliUsageError, ConfigError } from "../../src/core/errors.js";
import type { CreateCliOptions } from "../../src/types/cli.js";
import { pathExists } from "../../src/utils/fs.js";
import { makeStack, makeTempDir, removeDir, writeFixtureTemplates } from "../helpers/fixtures.js";

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
  allowPlanned: false,
  updateCheck: false,
  offline: true,
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

  test("generates into an existing folder, keeps its description, and a second run changes nothing", async () => {
    const templatesRoot = join(cwd, "templates");
    await writeFixtureTemplates(templatesRoot, makeStack());
    const repo = join(cwd, "repo");
    await mkdir(repo);
    await writeFile(join(repo, "README.md"), "# repo\nSensor dashboard for the Pune plant\n");
    await writeFile(
      join(repo, "package.json"),
      JSON.stringify({ name: "pune-sensors", version: "2.0.0" }),
    );

    const run = () =>
      runCreateCommand(options({ projectName: ".", allowPlanned: true }), {
        ...context(),
        cwd: repo,
        templatesRoot,
      });

    await run();
    const readme = await readFile(join(repo, "README.md"), "utf8");
    expect(readme).toContain(
      "# Pune Sensors\n\nSensor dashboard for the Pune plant.\n\nA full-stack TypeScript application",
    );
    expect(JSON.parse(await readFile(join(repo, "package.json"), "utf8"))).toMatchObject({
      name: "pune-sensors",
      version: "2.0.0",
      description: "Sensor dashboard for the Pune plant",
    });

    const backups = await readdir(join(repo, ".medha-starter", "backups"));
    await run();
    expect(await readFile(join(repo, "README.md"), "utf8")).toBe(readme);
    expect(await readdir(join(repo, ".medha-starter", "backups"))).toEqual(backups);
  });

  test("still rejects planned options without --allow-planned", async () => {
    await expect(runCreateCommand(options({ projectName: "app" }), context())).rejects.toThrow(
      "is planned but not available",
    );
  });
});
