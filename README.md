# Medha-Starter

`medha-starter` generates full-stack TypeScript projects in the Medha visual style. You choose the
frontend, backend, database, ORM, authentication, testing and integrations, and it writes a runnable
project with matching dependencies, configuration, sample CRUD feature and AI-assistant guidance.

> **Status: pre-release.** The CLI, configuration model, compatibility checks and generation engine are
> in place. Stack options become selectable as their templates are completed and verified;
> `medha-starter list` shows what is available today.

## Usage

```sh
npx medha-starter create my-app            # interactive
npx medha-starter my-app --yes             # defaults, no prompts
npx medha-starter my-app --backend nestjs --db mysql --pm pnpm
npx medha-starter my-app --dry-run         # show the plan, write nothing
npx medha-starter list                     # options and compatibility rules
```

Run `npx medha-starter --help` for every flag.

### Node.js, Bun and every package runner

Use whichever runner you already have; each one works and each makes the new project use that
package manager by default (override with `--pm`):

| Runner | Command | Project uses |
| --- | --- | --- |
| npm | `npx medha-starter my-app` | npm |
| Bun | `bunx medha-starter my-app` (add `--bun` to run on the Bun runtime) | Bun |
| pnpm | `pnpm dlx medha-starter my-app` | pnpm |
| Yarn 2+ | `yarn dlx medha-starter my-app` | Yarn |

The CLI runs on Node.js 18.18 or newer and on Bun 1.x, on Linux, macOS and Windows. Generated
Next.js projects need Node.js 20.9 or newer (or Bun).

### Always the latest medha-starter

Package runners cache what they download, so `npx medha-starter` could otherwise keep running an
old copy. Before generating, the CLI asks the npm registry for the newest release and, if there is
one, runs it instead, through the same runner and with the same arguments. If the registry cannot be
reached, the installed version continues. Turn this off with `--no-update-check` (or
`MEDHA_STARTER_SKIP_UPDATE_CHECK=1`).

### Up-to-date dependencies

Templates declare each dependency as a tested compatible range (`^16.4.2`). While generating, the
CLI looks up every dependency and writes the newest stable release inside its range, so a new
project starts on current versions without jumping to an untested major version. No lockfile is
copied, so the first install resolves fresh. A custom registry configured for npm
(`npm_config_registry`) is respected. `--offline` skips all lookups and uses the tested ranges as
they are.

### What the CLI guarantees

- Incompatible combinations are rejected with a fix before any file is written.
- Files are written to a staging directory and moved into place only when everything succeeded;
  on failure the target is restored to exactly what it was.
- The selected stack is recorded in `medha.json` in the generated project.

### The generated README

Every project gets a `README.md` written for its exact stack: what the project is, what is inside,
the tech stack, prerequisites, step-by-step setup, environment variables, every script with what it
does, the project structure, the Medha design system and how AI assistants are kept on style. It is
composed from the selected stack and from what each template layer declares, so it never describes
files or commands the project does not have.

When the folder already describes the project (a `package.json` name and description, or the text
of a placeholder README), the README uses that name and opens with that description. The description
is also stored in `package.json` (if it has none) and `medha.json`, so later runs keep it.

### Generating into a folder that already has files

You can generate into an existing folder or repository (`npx medha-starter .`). Files the project
does not generate are left alone. When a generated file already exists, it is combined with yours:

| Existing file | What happens |
| --- | --- |
| `.gitignore`, `.dockerignore`, `.npmignore`, `.gitattributes`, `.npmrc` | Missing lines are appended |
| `.env.example` | Variables you do not have yet are appended; your values are never changed |
| `README.md` | A placeholder (such as the one GitHub creates) is replaced; a README with real content keeps it and gets the generated README appended below it |
| Other `.md` files | The generated text is appended in a marked section |
| `package.json` | Merged: your name, version and description stay; generated scripts and dependencies are added or updated |
| `LICENSE` | Kept as it is |
| Anything else (`tsconfig.json`, source files) | Overwritten |

The list of affected files is shown before anything is written, and interactive runs ask for
confirmation. The original of every changed file is copied to `.medha-starter/backups/<time>/`
(ignored by git). Running the generator again replaces its own marked sections instead of
appending them twice, and leaves files that are already up to date untouched.

## Development

Requires Bun (development only; the published CLI runs on Node.js).

```sh
bun install
bun run dev -- my-app --dry-run   # run from source
bun run check                     # format, lint, typecheck, tests, build
```

See `AGENTS.md` for the rules on registries, compatibility rules and template layers.

## License

MIT. Forked from V Starter CLI by Virat Software Solutions (see `LICENSE`).
