<!-- Ported from the Medha theme by medha-starter. This is the theme's own README; its pages are the routes in src/medha/routes.tsx. -->

# Medha IoT × Esteem — Bootstrap 5.0 admin theme

Combines the **Esteem** admin template's page set (dashboard, buttons, grids, inputs, validation, tables, typography, icons, charts, calendar, sign in/up, FAQ, blank, 404) with the **Medha** theme's colour palette, logo, sidebar layout and dashboard, rebuilt on Bootstrap 5.0.2.

Also includes pages and components from the **Glance** dashboard (general elements, media objects, widgets, inbox, compose, 500, extra form/table/chart variants, dashboard chat/to-do/inbox/carousel widgets) and the **Instruction** website template (public site: `site-home.html`, `site-about.html`, `site-services.html`, `site-gallery.html`, `site-contact.html`, plus `codes.html` short codes).

Includes a dependency-free Word-style **WYSIWYG editor** (ribbon tabs, page view with ruler, find & replace, table tools, equations) (`editor.html`, `assets/wysiwyg.js`/`wysiwyg.css`): headings, bold/italic/underline/strike, sub/superscript, colours, lists, alignment, quote, links, images, tables, undo/redo, HTML source view, fullscreen and live output. It uses the browser's `contenteditable`/`execCommand`; always sanitise the saved HTML on your server.

Includes a **tree diagram** page (`tree.html`): a collapsible, keyboard-accessible tree view with cascading checkboxes and filter, plus a CSS organisation-chart diagram (`assets/tree.css`, `assets/tree.js`). Replace the sample hierarchy with your own nested lists.

Includes a **tree diagram editor** (`tree-editor.html`): add / rename / duplicate / delete nodes, reorder, indent, drag-and-drop re-parenting in both the outline and the diagram, properties panel, undo/redo, autosave to localStorage and JSON import/export (`assets/tree-editor.css`, `assets/tree-editor.js`). The JSON is sanitised on import (text-only names, whitelisted icons/status); validate and escape again on your server.

Includes a **UML diagram editor** (`uml-editor.html`) with 14 diagram types — structural: class, object, component, composite structure, package, deployment, profile; behavioral: use case, activity, state machine, sequence, communication, interaction overview, timing. Palette and drag-and-drop, relationship tool (inheritance, association, aggregation, composition, realization, dependency, import/access/merge, deploy/manifest, extension…), nesting in packages/nodes/parts, ports snapping to borders, properties panel, zoom/pan, undo/redo, autosave, export to SVG / PNG / JSON and JSON import (`assets/uml-editor.css`, `assets/uml-editor.js`).

Includes a **MathML equation editor** (`math-editor.html`): type LaTeX or click the palette (algebra, Greek, operators, arrows, calculus, trigonometry, linear algebra, sets & logic, accents, fonts, systems & alignment, statistics, physics & units, chemistry `\\ce{}`, geometry, number theory, symbols), see a live native-MathML preview, edit or paste raw MathML, browse a 50-equation library, save your own, and export `.mml`, a standalone HTML page, or copy the MathML / LaTeX. The converter (`assets/mathml.js`) has no dependencies and sanitises all MathML before it is rendered. MathML is rendered natively by Chrome/Edge 109+, Firefox and Safari; Core MathML has no `menclose`/table-alignment support in Chromium, so the editor adds CSS fallbacks for preview only.

Includes a **Vedic Sanskrit editor** (`vedic-editor.html`): phonetic (ITRANS/IAST-based) Devanagari typing, Vedic accent marks and signs from the Vedic Extensions and Devanagari Extended blocks, an on-screen phonetic keyboard, WYSIWYG formatting, Roman⇄Devanagari conversion, TXT/HTML export. Bundled Noto Serif/Sans Devanagari fonts (SIL OFL) in `assets/fonts/` (`assets/vedic.css`, `assets/vedic.js`).

Includes a **colour scheme selector**: a palette button in every top bar (and the full designer in `colors.html`) re-colours the whole theme using colour-wheel schemes — monochromatic, analogous, complementary, split complementary, triadic and tetradic — from any base colour, with saturation control, saved in the browser. Copy the generated `--medha-*` variables to make a scheme permanent (`assets/scheme.js`, `assets/scheme.css`).

Open `index.html` directly — no build step, CDN or icon font needed.

- `index.html` — Medha operations dashboard (working filters, charts, table) plus Esteem-style "Latest report" and circular-progress widgets
- `assets/theme.css` — original Medha theme (palette tokens `--medha-*`)
- `assets/pages.css` / `pages.js` — extra components, Bootstrap palette overrides, calendar, validation
- `assets/medha-logo.svg` — Medha logo (unchanged)

Palette: brown `#4a2e1b`, deep `#0f0804`, amber `#b45309` (primary), gold `#d99b26`, ivory `#fffdf8`, ink `#0f172a`.
Esteem's Bootstrap 3 / jQuery / FontAwesome / amCharts / FlipClock plugins are intentionally not carried over; the Maps page was not ported. Sign-in/up pages are demo-only. Esteem, Glance and Instruction are © W3layouts (CC BY 3.0); Bootstrap is MIT.
