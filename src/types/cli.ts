import type { StackKey } from "./config.js";

/** Stack choices exactly as typed on the command line, before validation. */
export type RawStackFlags = { -readonly [K in StackKey]?: string };

export type CreateCliOptions = {
  readonly projectName?: string;
  readonly stack: RawStackFlags;
  /** Accept defaults for every choice not given as a flag; never prompt. */
  readonly yes: boolean;
  readonly install: boolean;
  readonly git: boolean;
  readonly dryRun: boolean;
  readonly debug: boolean;
};

export type ParsedCliCommand =
  | { readonly kind: "create"; readonly options: CreateCliOptions }
  | { readonly kind: "list" }
  | { readonly kind: "help" }
  | { readonly kind: "version" };
