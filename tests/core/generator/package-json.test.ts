import { describe, expect, test } from "bun:test";
import {
  mergePackageJson,
  serializePackageJson,
} from "../../../src/core/generator/package-json.js";

describe("mergePackageJson", () => {
  test("merges dependency maps and other fields", () => {
    const target: Record<string, unknown> = { name: "app" };
    mergePackageJson(target, { type: "module", dependencies: { next: "16.4.2" } }, "a");
    mergePackageJson(target, { dependencies: { react: "19.3.1", next: "16.4.2" } }, "b");
    expect(target).toEqual({
      name: "app",
      type: "module",
      dependencies: { next: "16.4.2", react: "19.3.1" },
    });
  });

  test("rejects conflicting versions, scripts and fields", () => {
    const target: Record<string, unknown> = {};
    mergePackageJson(
      target,
      { dependencies: { zod: "^4.0.0" }, scripts: { dev: "next dev" }, type: "module" },
      "a",
    );
    expect(() => mergePackageJson(target, { dependencies: { zod: "^3.0.0" } }, "b")).toThrow(
      'Layer "b" sets dependencies.zod to "^3.0.0"',
    );
    expect(() => mergePackageJson(target, { scripts: { dev: "vite" } }, "b")).toThrow(
      "scripts.dev",
    );
    expect(() => mergePackageJson(target, { type: "commonjs" }, "b")).toThrow('"type"');
  });
});

describe("serializePackageJson", () => {
  test("orders well-known fields first and sorts dependencies, not scripts", () => {
    const output = serializePackageJson({
      devDependencies: { b: "1", a: "1" },
      scripts: { start: "x", dev: "y" },
      name: "app",
      engines: { node: ">=20" },
    });
    expect(JSON.parse(output)).toEqual({
      name: "app",
      scripts: { start: "x", dev: "y" },
      devDependencies: { a: "1", b: "1" },
      engines: { node: ">=20" },
    });
    expect(Object.keys(JSON.parse(output))).toEqual([
      "name",
      "scripts",
      "devDependencies",
      "engines",
    ]);
    expect(Object.keys(JSON.parse(output).scripts)).toEqual(["start", "dev"]);
    expect(output.endsWith("}\n")).toBe(true);
  });
});
