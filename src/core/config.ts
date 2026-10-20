import { z } from "zod";
import type { RawStackFlags } from "../types/cli.js";
import {
  AUTH_IDS,
  BACKEND_IDS,
  DATABASE_IDS,
  FRONTEND_IDS,
  INTEGRATION_IDS,
  ORM_IDS,
  PACKAGE_MANAGER_IDS,
  type PackageManager,
  type PartialStackConfig,
  type StackConfig,
  type StackKey,
  TESTING_IDS,
  UI_IDS,
} from "../types/config.js";
import { defaultOrmFor } from "./compatibility.js";
import { CliUsageError } from "./errors.js";
import { DEFAULT_STACK, getOptionIds, STACK_KEYS } from "./registry.js";

export const stackConfigSchema = z.object({
  frontend: z.enum(FRONTEND_IDS),
  backend: z.enum(BACKEND_IDS),
  database: z.enum(DATABASE_IDS),
  orm: z.enum(ORM_IDS),
  ui: z.enum(UI_IDS),
  auth: z.enum(AUTH_IDS),
  testing: z.enum(TESTING_IDS),
  integrations: z.array(z.enum(INTEGRATION_IDS)),
  packageManager: z.enum(PACKAGE_MANAGER_IDS),
}) satisfies z.ZodType<StackConfig>;

const FLAG_NAMES: Readonly<Record<StackKey, string>> = {
  frontend: "--frontend",
  backend: "--backend",
  database: "--database",
  orm: "--orm",
  ui: "--ui",
  auth: "--auth",
  testing: "--testing",
  integrations: "--integrations",
  packageManager: "--pm",
};

/** Validates raw flag values against the registry. Unknown ids are usage errors. */
export function parseStackFlags(raw: RawStackFlags): PartialStackConfig {
  const parsed: Record<string, unknown> = {};

  for (const key of STACK_KEYS) {
    const value = raw[key];
    if (value === undefined) continue;

    const validIds = getOptionIds(key);
    const requested =
      key === "integrations"
        ? value.toLowerCase() === "none"
          ? []
          : [...new Set(value.split(",").map((id) => id.trim()))].filter((id) => id.length > 0)
        : [value];

    for (const id of requested) {
      if (!validIds.includes(id)) {
        throw new CliUsageError(
          `Unknown value "${id}" for ${FLAG_NAMES[key]}. Valid values: ${validIds.join(", ")}.`,
        );
      }
    }

    parsed[key] = key === "integrations" ? requested : value;
  }

  return parsed as PartialStackConfig;
}

/** Fills every missing choice with its default. Derived defaults follow earlier choices. */
export function completeStack(
  partial: PartialStackConfig,
  detectedPackageManager: PackageManager,
): StackConfig {
  const database = partial.database ?? DEFAULT_STACK.database;
  const backend = partial.backend ?? DEFAULT_STACK.backend;

  return stackConfigSchema.parse({
    frontend: partial.frontend ?? DEFAULT_STACK.frontend,
    backend,
    database,
    orm: partial.orm ?? defaultOrmFor(database),
    ui: partial.ui ?? DEFAULT_STACK.ui,
    auth: partial.auth ?? DEFAULT_STACK.auth,
    testing: partial.testing ?? DEFAULT_STACK.testing,
    integrations: partial.integrations ?? DEFAULT_STACK.integrations,
    packageManager:
      partial.packageManager ?? (backend === "elysia" ? "bun" : detectedPackageManager),
  });
}
