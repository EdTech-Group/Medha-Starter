#!/usr/bin/env node
import { realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";
import pc from "picocolors";
import { parseCliArgs, getCliHelpText } from "./cli-args.js";
import { runCreateCommand } from "./commands/create.js";
import { formatOptionList } from "./commands/list.js";
import { CancelledError, CliUsageError, ConfigError } from "./core/errors.js";
import { getPackageVersion } from "./paths.js";
import { killActiveProcesses } from "./utils/process.js";

// Exit codes follow sysexits.h conventions.
const EXIT_ERROR = 1;
const EXIT_USAGE = 64;
const EXIT_CANCELLED = 130;

const BANNER = `${pc.bold(pc.yellow("Medha-Starter"))} ${pc.dim("full-stack apps in the Medha style")}`;

export async function main(argv: readonly string[]): Promise<number> {
  let debug = false;

  try {
    const command = parseCliArgs(argv);
    const version = getPackageVersion();

    switch (command.kind) {
      case "help":
        console.log(getCliHelpText(version));
        return 0;
      case "version":
        console.log(version);
        return 0;
      case "list":
        console.log(`${BANNER}\n\n${formatOptionList()}`);
        return 0;
      case "create":
        debug = command.options.debug;
        console.log(BANNER);
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
