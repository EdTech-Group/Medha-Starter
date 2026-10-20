import { CliUsageError } from "./core/errors.js";
import type { CreateCliOptions, ParsedCliCommand, RawStackFlags } from "./types/cli.js";
import type { StackKey } from "./types/config.js";

const HELP_TEXT = `Generate a full-stack TypeScript project in the Medha style.

Usage:
  medha-starter [create] [project-name] [options]
  medha-starter list

Stack options (prompted for when omitted on an interactive terminal):
  --frontend <id>        next | react-vite
  --backend <id>         next | nestjs | elysia
  --database, --db <id>  postgres | mysql | mongodb
  --orm <id>             drizzle | prisma | mongoose
  --ui <id>              medha-bootstrap
  --auth <id>            none | credentials
  --testing <id>         vitest | none
  --integrations <ids>   comma-separated: docker,github-actions (or "none")
  --pm <id>              npm | pnpm | yarn | bun (also --npm, --pnpm, --yarn, --bun)

General options:
  -y, --yes              Use defaults for every option not given; never prompt
  --dry-run              Show the generation plan without writing files
  --no-install           Skip dependency installation
  --no-git               Skip "git init" in the new project
  --offline              Do not contact the npm registry; use the versions the templates were tested with
  --no-update-check      Do not check for a newer medha-starter before running
  --debug                Show stack traces on errors
  -h, --help             Show help
  -V, --version          Show version

Maintainer options (for developing templates; output may not work):
  --allow-planned        Allow options that are still marked "planned"
  MEDHA_STARTER_TEMPLATES_DIR=<path>  Read template layers from another directory

Examples:
  npx medha-starter create my-app
  npx medha-starter my-app --yes
  npx medha-starter my-app --backend nestjs --db mysql --pm pnpm
  npx medha-starter my-app --backend elysia --db postgres --pm bun --dry-run
  npx medha-starter list
  bunx medha-starter my-app          # Bun (add --bun to run on the Bun runtime)
  pnpm dlx medha-starter my-app      # pnpm; yarn dlx works the same way
`;

export function getCliHelpText(version: string): string {
  return `medha-starter ${version}\n\n${HELP_TEXT}`;
}

const STACK_VALUE_FLAGS: Readonly<Record<string, StackKey>> = {
  "--frontend": "frontend",
  "--backend": "backend",
  "--database": "database",
  "--db": "database",
  "--orm": "orm",
  "--ui": "ui",
  "--auth": "auth",
  "--testing": "testing",
  "--integrations": "integrations",
  "--pm": "packageManager",
};

const PACKAGE_MANAGER_FLAGS: Readonly<Record<string, string>> = {
  "--npm": "npm",
  "--pnpm": "pnpm",
  "--yarn": "yarn",
  "--bun": "bun",
};

export function parseCliArgs(rawArgs: readonly string[]): ParsedCliCommand {
  const [first, ...rest] = rawArgs;

  if (first === "list") {
    if (rest.length > 0) {
      throw new CliUsageError('The "list" command does not accept arguments.');
    }
    return { kind: "list" };
  }

  return parseCreateArgs(first === "create" ? rest : rawArgs);
}

function parseCreateArgs(args: readonly string[]): ParsedCliCommand {
  const stack: RawStackFlags = {};
  let projectName: string | undefined;
  let yes = false;
  let install = true;
  let git = true;
  let dryRun = false;
  let debug = false;
  let allowPlanned = false;
  let updateCheck = true;
  let offline = false;

  const setStackValue = (key: StackKey, flag: string, value: string): void => {
    const existing = stack[key];
    if (existing !== undefined && existing !== value) {
      throw new CliUsageError(`Conflicting values for ${flag}: "${existing}" and "${value}".`);
    }
    stack[key] = value;
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === undefined) continue;

    switch (argument) {
      case "-h":
      case "--help":
        return { kind: "help" };
      case "-V":
      case "--version":
        return { kind: "version" };
      case "-y":
      case "--yes":
        yes = true;
        continue;
      case "--dry-run":
        dryRun = true;
        continue;
      case "--no-install":
        install = false;
        continue;
      case "--no-git":
        git = false;
        continue;
      case "--debug":
        debug = true;
        continue;
      case "--allow-planned":
        allowPlanned = true;
        continue;
      case "--no-update-check":
        updateCheck = false;
        continue;
      case "--offline":
        offline = true;
        continue;
    }

    const packageManager = PACKAGE_MANAGER_FLAGS[argument];
    if (packageManager) {
      setStackValue("packageManager", "the package manager", packageManager);
      continue;
    }

    const [flagName = argument, ...inlineParts] = argument.split("=");
    const stackKey = STACK_VALUE_FLAGS[flagName];
    if (stackKey) {
      let value: string;
      if (inlineParts.length > 0) {
        value = inlineParts.join("=").trim();
      } else {
        value = args[index + 1]?.trim() ?? "";
        index += 1;
      }
      if (value.length === 0 || value.startsWith("-")) {
        throw new CliUsageError(`Option ${flagName} requires a value.`);
      }
      setStackValue(stackKey, flagName, value);
      continue;
    }

    if (argument.startsWith("-")) {
      throw new CliUsageError(`Unknown option: ${argument}. Run "medha-starter --help".`);
    }

    if (projectName !== undefined) {
      throw new CliUsageError(`Unexpected argument: ${argument}`);
    }
    projectName = argument;
  }

  const options: CreateCliOptions = {
    ...(projectName !== undefined ? { projectName } : {}),
    stack,
    yes,
    install,
    git,
    dryRun,
    debug,
    allowPlanned,
    updateCheck,
    offline,
  };

  return { kind: "create", options };
}
