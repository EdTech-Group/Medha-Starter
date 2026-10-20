import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { readExistingProjectInfo } from "../../../src/core/generator/existing-project.js";
import { buildTemplateVariables } from "../../../src/core/generator/plan.js";
import { makeProject, makeStack, makeTempDir, removeDir } from "../../helpers/fixtures.js";

let directory: string;

beforeEach(async () => {
  directory = await makeTempDir();
});

afterEach(async () => {
  await removeDir(directory);
});

describe("readExistingProjectInfo", () => {
  test("returns nothing for an empty or missing folder", async () => {
    expect(await readExistingProjectInfo(directory)).toEqual({ name: null, description: null });
    expect(await readExistingProjectInfo(join(directory, "missing"))).toEqual({
      name: null,
      description: null,
    });
  });

  test("prefers package.json name and description", async () => {
    await writeFile(
      join(directory, "package.json"),
      JSON.stringify({ name: "@medha/pune-sensors", description: "Sensor dashboard" }),
    );
    await writeFile(join(directory, "README.md"), "# x\nSomething else\n");
    expect(await readExistingProjectInfo(directory)).toEqual({
      name: "@medha/pune-sensors",
      description: "Sensor dashboard",
    });
  });

  test("falls back to the text of a placeholder README", async () => {
    await writeFile(
      join(directory, "README.md"),
      "# existing-repo\nSensor dashboard for the Pune plant\n",
    );
    expect(await readExistingProjectInfo(directory)).toEqual({
      name: null,
      description: "Sensor dashboard for the Pune plant",
    });
  });

  test("uses the description recorded in medha.json once the README is no longer a placeholder", async () => {
    await writeFile(join(directory, "README.md"), "# Repo\n\nOne.\n\nTwo.\n\nThree.\n\nFour.\n");
    await writeFile(
      join(directory, "medha.json"),
      JSON.stringify({ project: { description: "Sensor dashboard" } }),
    );
    expect((await readExistingProjectInfo(directory)).description).toBe("Sensor dashboard");
  });

  test("ignores a real README, invalid names and invalid JSON", async () => {
    await writeFile(join(directory, "README.md"), "# Repo\n\nOne.\n\nTwo.\n\nThree.\n\nFour.\n");
    await writeFile(join(directory, "package.json"), JSON.stringify({ name: "Not A Valid Name" }));
    expect(await readExistingProjectInfo(directory)).toEqual({ name: null, description: null });
    await writeFile(join(directory, "package.json"), "{ broken");
    expect(await readExistingProjectInfo(directory)).toEqual({ name: null, description: null });
  });
});

describe("project titles", () => {
  test("drop the npm scope and split on separators", () => {
    const project = { ...makeProject("/w", makeStack()), packageName: "@medha/pune_sensors.app" };
    expect(buildTemplateVariables(project, "1").projectTitle).toBe("Pune Sensors App");
  });
});
