import type { StackConfig, StackKey } from "./config.js";

/**
 * "available" options can be generated. "planned" options are listed so users can see the
 * roadmap, but selecting one is rejected before any file is written.
 */
export type OptionStatus = "available" | "planned";

export type OptionDescriptor<Id extends string = string> = {
  readonly id: Id;
  readonly label: string;
  readonly description: string;
  readonly status: OptionStatus;
};

type ElementOf<T> = T extends readonly (infer U)[] ? U : T;

/** The option id type for each stack key (integrations are a list, so use the element type). */
export type StackOptionId<K extends StackKey> = ElementOf<StackConfig[K]> & string;

export type StackRegistry = {
  readonly [K in StackKey]: {
    readonly title: string;
    readonly multiple: boolean;
    readonly options: readonly OptionDescriptor<StackOptionId<K>>[];
  };
};

export type CompatibilityIssue = {
  readonly rule: string;
  readonly message: string;
  readonly fix: string;
};

export type CompatibilityRule = {
  readonly id: string;
  /** One-line, human-readable statement of the rule (shown by "medha-starter list"). */
  readonly summary: string;
  /** Returns an issue when the configuration breaks this rule, otherwise null. */
  readonly check: (stack: StackConfig) => Omit<CompatibilityIssue, "rule"> | null;
};
