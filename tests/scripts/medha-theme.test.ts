import { describe, expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const root = join(import.meta.dir, "..", "..");

describe("Medha theme port", () => {
  test("the committed React layer matches a fresh conversion of Bootstrap Medha/", () => {
    const result = spawnSync("bun", ["scripts/medha-theme.ts", "--check"], {
      cwd: root,
      encoding: "utf8",
    });
    expect(`${result.stdout}${result.stderr}`).toContain("matches Bootstrap Medha/");
    expect(result.status).toBe(0);
  }, 60_000);
});
