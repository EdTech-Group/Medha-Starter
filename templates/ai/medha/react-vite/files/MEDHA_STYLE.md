# Medha style guide

Every screen in this project looks and behaves like the Medha theme. These rules apply to people
and AI assistants alike; `check:style` enforces the mechanical ones.

## Identity

- Palette (always through tokens): brown `--medha-brown`, deep `--medha-deep`, amber
  `--medha-amber` (primary), gold `--medha-gold`, ivory `--medha-ivory`, ink `--medha-ink`,
  muted `--medha-muted`, borders `--medha-border`. Bootstrap's `primary` is Medha amber, so
  `btn-primary`, `text-primary` and friends are on-brand.
- The colour-scheme selector (palette button in the topbar, full designer at
  `/dashboard/colors`) re-colours the app at runtime. Hard-coded colours break it.
- Logo: `<MedhaLogo />` only, never stretched or re-coloured.
- Icons: the Medha icon library through `<Icon name="..." />`. No icon fonts.

## Layout

- Workspace pages: `AppShell` → `PageHeading` → one or more `Panel`s in Bootstrap grid rows
  (`row g-3`, `col-xl-*`). Metrics go in a row of `MetricCard`s above the panels.
- Website pages: `SiteShell` with `site-sec` sections, as on the landing page.
- Sign-in, registration, errors: `AuthShell` with one `auth-card`.

## Components and markup

- Reuse before you write: the shells and components in `src/components/medha/`, then markup
  copied from the theme pages in `src/medha/pages/` (browse `/dashboard/components`).
- Keep the theme's class names (`panel`, `panel-heading`, `metric-card`, `status-badge`, …).
  Bootstrap 5.0 utilities are available; Bootstrap 5.3-only classes are not.
- Copy: short, sentence case, no exclamation marks. Labels say what happens ("Save changes").

## Accessibility

- Every page keeps the skip link and one `<h1>`; headings do not skip levels.
- Every input has a `<label>` (use `visually-hidden` to hide it visually).
- Icon-only buttons have `aria-label`. Decorative icons are hidden from screen readers.
- Interactive elements are `<button>` or links, never clickable `<div>`s.

## Never

- Hard-coded colours (`#b45309`, `rgb(...)`) outside the theme files.
- Another UI kit or CSS framework (Tailwind, MUI, Ant Design, Chakra, Mantine, Bulma, …).
- Copying the logo path or inlining its SVG.
- Editing the theme's scripts in `src/medha/scripts/` to add features.
