import { describe, expect, test } from "bun:test";
import { isSupportedNode } from "../src/cli.js";

describe("isSupportedNode", () => {
  test.each([
    ["16.20.2", false],
    ["18.17.1", false],
    ["18.18.0", true],
    ["18.19.1", true],
    ["20.9.0", true],
    ["22.11.0", true],
    ["24.3.0", true],
  ])("%s → %p", (version, supported) => {
    expect(isSupportedNode(version)).toBe(supported);
  });
});
