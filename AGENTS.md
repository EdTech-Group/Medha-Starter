# Medha-Starter agent requirements

Requirement keywords **MUST**, **MUST NOT**, **SHOULD** and **MAY** follow RFC 2119.

## What this repository is

The root is the `medha-starter` CLI, a project generator. It is not an application.
Generated applications are composed from template layers under `templates/`.

## Rules

### Runtime

- **MUST** keep everything under `src/` runnable on Node.js >= 18.18 (it ships as `npx medha-starter`).
  No `Bun.*` APIs in `src/`; `tsconfig.build.json` compiles `src/` with Node types only to enforce this.
- **MAY** use Bun for development tooling (`bun test`, `bun run`).

### Options and compatibility

- **MUST** register every selectable technology in `src/core/registry.ts` and its id in `src/types/config.ts`.
- **MUST** express incompatible combinations as rules in `src/core/compatibility.ts`, each with a message and a fix.
  Never generate a combination that is known to be broken.
- **MUST NOT** mark an option `"available"` until its template layers exist and every combination it
  takes part in has passed install, typecheck, lint, style check, tests and build in a generated project.

### Template layers

- One directory per layer: `templates/<layer id>/layer.json` plus `templates/<layer id>/files/`.
  `selectLayers()` in `src/core/generator/plan.ts` defines which layer ids a stack uses and where they go.
- **MUST** declare dependencies, scripts and env variables in `layer.json`, never as `package.json`
  or `.env.example` files. The engine composes those files and rejects conflicting versions.
- **MUST** list a file in `"overrides"` when a layer intentionally replaces an earlier layer's file.
- Only files ending in `.tmpl` are rendered (`{{ variable }}`); unknown variables fail generation.
- Store `.gitignore` and `.npmrc` as `gitignore` and `npmrc` (npm strips the dotted names when publishing).
- **MUST NOT** put symlinks, real credentials, or generated lockfiles in templates.

### Existing files in the target

- Strategies per file type live in `src/core/generator/merge.ts` (`chooseStrategy`). Add a file type
  there, with tests, rather than special-casing it elsewhere.
- **MUST** back up every existing file before changing it, and restore all of them if writing fails.
- **MUST** keep merges idempotent: running the generator twice must not duplicate content.

### Medha visual identity

- **MUST** preserve the Medha theme from `Bootstrap Medha/` (palette, logo, sidebar layout, page set).
  Adapt it through explicit mapping files; never replace it with a generic theme.

### Code organisation

- Shared types live in `src/types/`. Tests live in `tests/`, mirroring `src/`.
- Prefer small modules and explicit data (registries, rule lists) over nested conditionals.

### Validation

- **MUST** run `bun run check` (format, lint, typecheck, tests, build) before reporting work as done.
- **MUST** report only results that were actually observed; say which checks could not run and why.
