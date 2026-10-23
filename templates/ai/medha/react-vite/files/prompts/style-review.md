Read AGENTS.md and MEDHA_STYLE.md first.

Review the changes in <files or branch> against them. For each problem give the file and line,
the rule it breaks, and the fix. Check in particular:

- Pages use AppShell, SiteShell or AuthShell and are registered in src/App.tsx.
- Existing Medha components and theme markup are reused instead of new styles.
- No hard-coded colours, other UI kits, icon fonts, or logo outside <MedhaLogo />.
- Accessibility: one h1, labelled inputs, aria-label on icon-only buttons, real buttons/links.
- Strict TypeScript: typed props, no `any`, no DOM queries for behaviour React should own.

Finish with the output of the check:style script.
