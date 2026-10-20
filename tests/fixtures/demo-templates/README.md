# Demo template layers (test fixtures)

Stand-in layers for the default stack (Next.js + Next.js backend + PostgreSQL/Drizzle + Medha).
They carry realistic `layer.json` metadata (dependencies, env, README content) but only stub
source files. Tests and the runtime compatibility matrix generate projects from them with
`--allow-planned` and `MEDHA_STARTER_TEMPLATES_DIR`. They are not shipped in the npm package.
