import { describe, expect, test } from "bun:test";
import { DEFAULT_STACK, getOption, STACK_KEYS, STACK_REGISTRY } from "../../src/core/registry.js";
import {
  AUTH_IDS,
  BACKEND_IDS,
  DATABASE_IDS,
  FRONTEND_IDS,
  INTEGRATION_IDS,
  ORM_IDS,
  PACKAGE_MANAGER_IDS,
  TESTING_IDS,
  UI_IDS,
} from "../../src/types/config.js";

describe("registry", () => {
  test("registers exactly the ids declared in the config types", () => {
    const declared = {
      frontend: FRONTEND_IDS,
      backend: BACKEND_IDS,
      database: DATABASE_IDS,
      orm: ORM_IDS,
      ui: UI_IDS,
      auth: AUTH_IDS,
      testing: TESTING_IDS,
      integrations: INTEGRATION_IDS,
      packageManager: PACKAGE_MANAGER_IDS,
    };
    for (const key of STACK_KEYS) {
      expect(STACK_REGISTRY[key].options.map((option) => option.id)).toEqual([...declared[key]]);
    }
  });

  test("prompts for every stack key exactly once", () => {
    expect([...STACK_KEYS].sort()).toEqual(
      Object.keys(STACK_REGISTRY).sort() as (typeof STACK_KEYS)[number][],
    );
  });

  test("defaults refer to available options", () => {
    expect(getOption("frontend", DEFAULT_STACK.frontend)?.status).toBe("available");
    expect(getOption("ui", DEFAULT_STACK.ui)?.status).toBe("available");
    expect(getOption("auth", DEFAULT_STACK.auth)?.status).toBe("available");
    expect(getOption("testing", DEFAULT_STACK.testing)?.status).toBe("available");
  });
});
