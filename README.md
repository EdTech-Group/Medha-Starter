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

Run `npx medha-starter --help` for every flag. The CLI needs Node.js 18.18 or newer. Generated
Next.js projects need Node.js 20.9 or newer.

### What the CLI guarantees

- Incompatible combinations are rejected with a fix before any file is written.
- Files are written to a staging directory and moved into place only when everything succeeded;
  on failure the target is restored to exactly what it was.
- The selected stack is recorded in `medha.json` in the generated project.

### Generating into a folder that already has files

You can generate into an existing folder or repository (`npx medha-starter .`). Files the project
does not generate are left alone. When a generated file already exists, it is combined with yours:

| Existing file | What happens |
| --- | --- |
| `.gitignore`, `.dockerignore`, `.npmignore`, `.gitattributes`, `.npmrc` | Missing lines are appended |
| `.env.example` | Variables you do not have yet are appended; your values are never changed |
| `README.md` and other `.md` files | The generated text is appended in a marked section |
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
