import { describe, expect, test } from "bun:test";
import { renderTemplate } from "../../../src/core/generator/render.js";

describe("renderTemplate", () => {
  test("replaces placeholders, with or without inner spaces", () => {
    expect(
      renderTemplate(
        "# {{projectTitle}} ({{ projectName }})",
        { projectTitle: "My App", projectName: "my-app" },
        "README",
      ),
    ).toBe("# My App (my-app)");
  });

  test("fails on unknown variables instead of leaving them in the output", () => {
    expect(() => renderTemplate("{{ nope }} {{ alsoNope }}", {}, "x.tmpl")).toThrow(
      "Unknown template variable(s) in x.tmpl: nope, alsoNope.",
    );
  });

  test("leaves JSX-like double braces that are not identifiers alone", () => {
    expect(renderTemplate("style={{ width: 1 }}", {}, "x")).toBe("style={{ width: 1 }}");
  });
});
