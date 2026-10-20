export const FRONTEND_IDS = ["next", "react-vite"] as const;
export const BACKEND_IDS = ["next", "nestjs", "elysia"] as const;
export const DATABASE_IDS = ["postgres", "mysql", "mongodb"] as const;
export const ORM_IDS = ["drizzle", "prisma", "mongoose"] as const;
export const UI_IDS = ["medha-bootstrap"] as const;
export const AUTH_IDS = ["none", "credentials"] as const;
export const TESTING_IDS = ["vitest", "none"] as const;
export const INTEGRATION_IDS = ["docker", "github-actions"] as const;
export const PACKAGE_MANAGER_IDS = ["npm", "pnpm", "yarn", "bun"] as const;

export type FrontendId = (typeof FRONTEND_IDS)[number];
export type BackendId = (typeof BACKEND_IDS)[number];
export type DatabaseId = (typeof DATABASE_IDS)[number];
export type OrmId = (typeof ORM_IDS)[number];
export type UiId = (typeof UI_IDS)[number];
export type AuthId = (typeof AUTH_IDS)[number];
export type TestingId = (typeof TESTING_IDS)[number];
export type IntegrationId = (typeof INTEGRATION_IDS)[number];
export type PackageManager = (typeof PACKAGE_MANAGER_IDS)[number];

/** The complete, validated stack selection a project is generated from. */
export type StackConfig = {
  readonly frontend: FrontendId;
  readonly backend: BackendId;
  readonly database: DatabaseId;
  readonly orm: OrmId;
  readonly ui: UiId;
  readonly auth: AuthId;
  readonly testing: TestingId;
  readonly integrations: readonly IntegrationId[];
  readonly packageManager: PackageManager;
};

export type StackKey = keyof StackConfig;

/** A stack selection where any choice may still be missing (from flags, before prompting). */
export type PartialStackConfig = { -readonly [K in StackKey]?: StackConfig[K] };

export type ProjectConfig = {
  /** Name as typed by the user: a simple directory name, "." or an absolute path. */
  readonly projectName: string;
  /** Absolute target directory. */
  readonly targetDirectory: string;
  /** Valid npm package name derived from the project name. */
  readonly packageName: string;
  readonly stack: StackConfig;
  readonly install: boolean;
  readonly git: boolean;
};
