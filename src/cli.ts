#!/usr/bin/env node
import { realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";
import pc from "picocolors";
import { parseCliArgs, getCliHelpText } from "./cli-args.js";
import { runCreateCommand } from "./commands/create.js";
import { formatOptionList } from "./commands/list.js";
import { CancelledError, CliUsageError, ConfigError } from "./core/errors.js";
import { checkForUpdate, UPDATED_ENV } from "./core/self-update.js";
import { getPackageVersion, PACKAGE_ROOT } from "./paths.js";
import { killActiveProcesses, runAttached } from "./utils/process.js";
import { createRegistryClient } from "./utils/registry.js";

// Exit codes follow sysexits.h conventions.
const EXIT_ERROR = 1;
const EXIT_USAGE = 64;
const EXIT_CANCELLED = 130;

const MINIMUM_NODE = [18, 18] as const;

const banner = (version: string) =>
  `${pc.bold(pc.yellow("Medha-Starter"))} ${version} ${pc.dim("full-stack apps in the Medha style")}`;

/** Node.js (or Bun's Node compatibility version) must be at least 18.18. */
export function isSupportedNode(version: string): boolean {
  const [major = 0, minor = 0] = version.split(".").map((part) => Number.parseInt(part, 10));
  return major > MINIMUM_NODE[0] || (major === MINIMUM_NODE[0] && minor >= MINIMUM_NODE[1]);
}

/**
 * Hands over to a newer published medha-starter when there is one. Returns its exit code, or
 * null to continue with this version.
 */
async function runLatestIfOutdated(
  argv: readonly string[],
  version: string,
): Promise<number | null> {
  const decision = await checkForUpdate({
    currentVersion: version,
    packageRoot: PACKAGE_ROOT,
    argv,
    env: process.env,
    client: createRegistryClient({ timeoutMs: 2000 }),
    disabled: false,
  });
  if (decision.kind !== "update") return null;

  console.log(
    pc.cyan(
      `medha-starter ${decision.latest} is available (this is ${version}). Running ${decision.latest}...\n`,
    ),
  );
  try {
    return await runAttached(decision.runner.command, decision.runner.args, {
      ...process.env,
      [UPDATED_ENV]: decision.latest,
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.log(
      pc.yellow(`Could not start ${decision.latest} (${reason}). Continuing with ${version}.\n`),
    );
    return null;
  }
}

export async function main(argv: readonly string[]): Promise<number> {
  let debug = false;

  if (!isSupportedNode(process.versions.node)) {
    console.error(
      pc.red(
        `medha-starter needs Node.js ${MINIMUM_NODE.join(".")} or newer (or Bun); this is Node.js ${process.versions.node}. Install a current LTS from https://nodejs.org.`,
      ),
    );
    return EXIT_ERROR;
  }

  try {
    const command = parseCliArgs(argv);
    const version = getPackageVersion();

    if (
      (command.kind === "create" && command.options.updateCheck && !command.options.offline) ||
      command.kind === "list"
    ) {
      const exitCode = await runLatestIfOutdated(argv, version);
      if (exitCode !== null) return exitCode;
    }

    switch (command.kind) {
      case "help":
        console.log(getCliHelpText(version));
        return 0;
      case "version":
        console.log(version);
        return 0;
      case "list":
        console.log(`${banner(version)}\n\n${formatOptionList()}`);
        return 0;
      case "create":
        debug = command.options.debug;
        console.log(banner(version));
        await runCreateCommand(command.options);
        return 0;
    }
  } catch (error) {
    if (error instanceof CancelledError) {
      console.error(pc.dim(`\n${error.message}`));
      return EXIT_CANCELLED;
    }

    const message = error instanceof Error ? error.message : String(error);
    console.error(pc.red(`\nError: ${message}`));

    if (debug && error instanceof Error && error.stack) {
      console.error(pc.dim(error.stack));
    } else if (!(error instanceof CliUsageError || error instanceof ConfigError)) {
      console.error(pc.dim("Run again with --debug for details."));
    }

    return error instanceof CliUsageError || error instanceof ConfigError ? EXIT_USAGE : EXIT_ERROR;
  }
}

function onSignal(): void {
  killActiveProcesses();
  console.error(pc.dim("\nCancelled."));
  process.exit(EXIT_CANCELLED);
}

function isEntryPoint(): boolean {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return realpathSync(entry) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (isEntryPoint()) {
  process.on("SIGINT", onSignal);
  process.on("SIGTERM", onSignal);
  process.exitCode = await main(process.argv.slice(2));
}
