/**
 * Ports the Medha theme (`Bootstrap Medha/`) to the React + Vite UI layer.
 *
 * `scripts/medha-theme.map.json` is the explicit mapping: every page, stylesheet, script and asset
 * of the theme is listed there with where it goes. Conversion fails when the theme contains a file
 * the map does not mention, or when a page's sidebar, topbar or footer no longer matches the shared
 * chrome, so nothing is dropped or changed silently.
 *
 *   bun run theme:sync   # regenerate the generated part of the layer
 *   bun run theme:check  # fail when the committed layer differs from a fresh conversion
 *
 * Generated paths (inside the layer's files/): src/medha/, public/medha/ and every embed output.
 * Everything else in the layer (shells, App, main) is written by hand.
 */
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { type DefaultTreeAdapterTypes, parse, parseFragment } from "parse5";

type Element = DefaultTreeAdapterTypes.Element;
type ChildNode = DefaultTreeAdapterTypes.ChildNode;
type ShellId = "app" | "site" | "auth";

type ThemeMap = {
  readonly source: string;
  readonly output: string;
  readonly globalStyles: readonly string[];
  readonly pageStyles: readonly string[];
  readonly vendorScripts: readonly string[];
  readonly pageScripts: readonly string[];
  /** Theme files that are identical to a file of an npm dependency; the project imports those. */
  readonly fromNpm: Readonly<Record<string, string>>;
  readonly shells: Readonly<
    Record<
      ShellId,
      { readonly chromeFrom?: string; readonly styles: string[]; readonly scripts: string[] }
    >
  >;
  readonly pages: readonly PageEntry[];
  /** Links added to the sidebar for pages the project adds (written by hand, not in the theme). */
  readonly sidebarExtras: readonly {
    readonly file: string;
    readonly path: string;
    readonly label: string;
    readonly icon: string;
    readonly after: string;
  }[];
  /** Attributes added to elements with a class on the listed pages. */
  readonly attributes: readonly {
    readonly files: readonly string[];
    readonly class: string;
    readonly name: string;
    readonly value: string;
  }[];
  readonly embeds: readonly {
    readonly file: string;
    readonly output: string;
    readonly assets: string;
    readonly assetsUrl: string;
  }[];
  readonly publicAssets: Readonly<Record<string, string>>;
  readonly assetUrls: Readonly<Record<string, string>>;
  readonly cssUrls: Readonly<Record<string, string>>;
  readonly docs: Readonly<Record<string, string>>;
};

type PageEntry = {
  readonly file: string;
  readonly path: string;
  readonly component: string;
  readonly shell: ShellId | "custom";
  readonly notFound?: boolean;
};

const root = join(import.meta.dir, "..");
const map = JSON.parse(
  readFileSync(join(import.meta.dir, "medha-theme.map.json"), "utf8"),
) as ThemeMap;
const sourceDir = join(root, map.source);
const assetsDir = join(sourceDir, "assets");
const biome = join(
  root,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "biome.cmd" : "biome",
);

/** Paths inside the layer's files/ directory that this script owns. */
const OWNED = ["src/medha", "public/medha", ...map.embeds.map((embed) => embed.output)];
const HEADER = "Ported from the Medha theme by medha-starter.";

class ThemeError extends Error {}

function fail(message: string): never {
  throw new ThemeError(message);
}

// ---------------------------------------------------------------------------------------------
// DOM helpers

function isElement(node: ChildNode): node is Element {
  return "tagName" in node;
}

function attr(element: Element, name: string): string | undefined {
  return element.attrs.find((candidate) => candidate.name === name)?.value;
}

function classes(element: Element): string[] {
  return (attr(element, "class") ?? "").split(/\s+/).filter((name) => name.length > 0);
}

function elementChildren(element: Element): Element[] {
  return element.childNodes.filter(isElement);
}

function walk(node: Element, visit: (element: Element) => void): void {
  visit(node);
  for (const child of elementChildren(node)) walk(child, visit);
}

function find(node: Element, predicate: (element: Element) => boolean): Element | undefined {
  let found: Element | undefined;
  walk(node, (element) => {
    if (!found && predicate(element)) found = element;
  });
  return found;
}

type ParsedPage = {
  readonly file: string;
  readonly title: string;
  readonly bodyClass: string;
  /** Body children that are rendered (scripts and whitespace removed). */
  readonly body: Element[];
  readonly styles: string[];
  readonly scripts: string[];
};

function parsePage(file: string): ParsedPage {
  const document = parse(readFileSync(join(sourceDir, file), "utf8"));
  const html = document.childNodes.find(
    (node): node is Element => isElement(node) && node.tagName === "html",
  );
  if (!html) fail(`${file}: no <html> element.`);
  const head = elementChildren(html).find((element) => element.tagName === "head");
  const body = elementChildren(html).find((element) => element.tagName === "body");
  if (!head || !body) fail(`${file}: missing <head> or <body>.`);

  const styles: string[] = [];
  const scripts: string[] = [];
  const collectScript = (element: Element) => {
    if (element.tagName !== "script") return;
    const src = attr(element, "src");
    if (!src?.startsWith("assets/")) fail(`${file}: inline or external <script> is not supported.`);
    scripts.push(src.slice("assets/".length));
  };
  for (const element of elementChildren(head)) {
    if (element.tagName === "link" && attr(element, "rel") === "stylesheet") {
      const href = attr(element, "href") ?? "";
      if (!href.startsWith("assets/")) fail(`${file}: stylesheet ${href} is not in assets/.`);
      styles.push(href.slice("assets/".length));
    }
    collectScript(element);
  }
  walk(body, collectScript);

  const title = elementChildren(head).find((element) => element.tagName === "title");
  return {
    file,
    title: textContent(title).trim(),
    bodyClass: attr(body, "class") ?? "",
    body: elementChildren(body).filter((element) => element.tagName !== "script"),
    styles,
    scripts,
  };
}

function textContent(node: ChildNode | undefined): string {
  if (!node) return "";
  if (node.nodeName === "#text" && "value" in node) return node.value;
  return isElement(node) ? node.childNodes.map(textContent).join("") : "";
}

/**
 * A comparable fingerprint of an element: tags, attributes and collapsed text, ignoring
 * whitespace-only text and scripts. `omit` removes per-page state such as the active link.
 */
function fingerprint(node: ChildNode, omit: (element: Element) => Element = (e) => e): string {
  if (!isElement(node)) {
    if (node.nodeName !== "#text" || !("value" in node)) return "";
    const text = node.value.replace(/\s+/g, " ");
    return text.trim() ? text : "";
  }
  if (node.tagName === "script") return "";
  const element = omit(node);
  const attrs = element.attrs.map((a) => `${a.name}="${a.value}"`).join(" ");
  const children = element.childNodes.map((child) => fingerprint(child, omit)).join("");
  return `<${element.tagName}${attrs ? ` ${attrs}` : ""}>${children}</${element.tagName}>`;
}

/** Removes the active-page markers from navigation links (NavLink adds them back). */
function withoutActiveLink(element: Element): Element {
  if (element.tagName !== "a" || !classes(element).includes("nav-link")) return element;
  return {
    ...element,
    attrs: element.attrs
      .filter((a) => a.name !== "aria-current")
      .map((a) =>
        a.name === "class"
          ? {
              ...a,
              value: classes(element)
                .filter((name) => name !== "active")
                .join(" "),
            }
          : a,
      ),
  };
}

// ---------------------------------------------------------------------------------------------
// HTML → JSX

type Imports = {
  link: boolean;
  navLink: boolean;
  cssProperties: boolean;
};

type JsxContext = {
  readonly file: string;
  readonly imports: Imports;
  /** Turn `.nav-link` anchors into NavLinks (shared chrome). */
  readonly navLinks: boolean;
  readonly pre: boolean;
  /** Returns replacement JSX for an element, or null to convert it normally. */
  readonly substitute?: (element: Element) => string | null;
};

const VOID_ELEMENTS = new Set(["br", "hr", "img", "input", "wbr", "col", "source", "track"]);
/** Containers where whitespace text cannot render (React also rejects it in tables). */
const NO_WHITESPACE = new Set([
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "colgroup",
  "select",
  "datalist",
  "optgroup",
  "ul",
  "ol",
  "svg",
  "defs",
  "symbol",
  "g",
]);

type AttributeKind = "string" | "number" | "boolean" | "booleanish";

/** Every attribute the theme uses, mapped explicitly; anything else fails the conversion. */
const ATTRIBUTES: Readonly<Record<string, readonly [string, AttributeKind]>> = {
  accept: ["accept", "string"],
  alt: ["alt", "string"],
  autocapitalize: ["autoCapitalize", "string"],
  autocomplete: ["autoComplete", "string"],
  class: ["className", "string"],
  contenteditable: ["contentEditable", "booleanish"],
  cx: ["cx", "string"],
  cy: ["cy", "string"],
  d: ["d", "string"],
  disabled: ["disabled", "boolean"],
  fill: ["fill", "string"],
  "font-size": ["fontSize", "string"],
  for: ["htmlFor", "string"],
  height: ["height", "string"],
  hidden: ["hidden", "boolean"],
  href: ["href", "string"],
  id: ["id", "string"],
  list: ["list", "string"],
  max: ["max", "string"],
  maxlength: ["maxLength", "number"],
  min: ["min", "string"],
  minlength: ["minLength", "number"],
  multiple: ["multiple", "boolean"],
  name: ["name", "string"],
  novalidate: ["noValidate", "boolean"],
  opacity: ["opacity", "string"],
  placeholder: ["placeholder", "string"],
  r: ["r", "string"],
  readonly: ["readOnly", "boolean"],
  required: ["required", "boolean"],
  role: ["role", "string"],
  rows: ["rows", "number"],
  rx: ["rx", "string"],
  scope: ["scope", "string"],
  size: ["size", "number"],
  spellcheck: ["spellCheck", "booleanish"],
  src: ["src", "string"],
  step: ["step", "string"],
  stroke: ["stroke", "string"],
  "stroke-dasharray": ["strokeDasharray", "string"],
  "stroke-dashoffset": ["strokeDashoffset", "string"],
  "stroke-width": ["strokeWidth", "string"],
  tabindex: ["tabIndex", "number"],
  "text-anchor": ["textAnchor", "string"],
  title: ["title", "string"],
  transform: ["transform", "string"],
  type: ["type", "string"],
  value: ["value", "string"],
  viewBox: ["viewBox", "string"],
  width: ["width", "string"],
  x: ["x", "string"],
  x1: ["x1", "string"],
  x2: ["x2", "string"],
  xmlns: ["xmlns", "string"],
  y: ["y", "string"],
  y1: ["y1", "string"],
  y2: ["y2", "string"],
};

/** ARIA attributes typed as numbers in React's DOM types. */
const NUMERIC_ARIA = new Set([
  "aria-valuenow",
  "aria-valuemin",
  "aria-valuemax",
  "aria-level",
  "aria-setsize",
  "aria-posinset",
  "aria-colcount",
  "aria-rowcount",
  "aria-colindex",
  "aria-rowindex",
  "aria-colspan",
  "aria-rowspan",
]);

const routeByFile = new Map(
  [...map.pages, ...map.sidebarExtras].map((page) => [page.file, page.path]),
);

function inSidebar(element: Element): boolean {
  for (let node = element.parentNode; node && "tagName" in node; node = node.parentNode) {
    if (node.tagName === "aside" && classes(node).includes("sidebar")) return true;
  }
  return false;
}

/** Sidebar links the project adds after a theme link (see "sidebarExtras" in the map). */
function sidebarExtrasAfter(element: Element, context: JsxContext): string {
  if (element.tagName !== "a" || !classes(element).includes("nav-link") || !inSidebar(element)) {
    return "";
  }
  const href = attr(element, "href");
  return map.sidebarExtras
    .filter((extra) => extra.after === href)
    .map((extra) => {
      const [link] = parseFragment(
        `<a class="nav-link" href="${extra.file}"><svg class="icon "><use href="#i-${extra.icon}"/></svg>${extra.label}</a>`,
      ).childNodes;
      if (!link || !isElement(link)) fail(`Could not build the sidebar link for ${extra.file}.`);
      return convertElement(link, context);
    })
    .join("");
}

function withAddedAttributes(element: Element, context: JsxContext): Element {
  const added = map.attributes.filter(
    (rule) => rule.files.includes(context.file) && classes(element).includes(rule.class),
  );
  if (added.length === 0) return element;
  return {
    ...element,
    attrs: [...element.attrs, ...added.map((rule) => ({ name: rule.name, value: rule.value }))],
  };
}

function routeFor(href: string, file: string): string | null {
  const match = /^([\w-]+\.html)(#.*)?$/.exec(href);
  if (!match?.[1]) return null;
  const route = routeByFile.get(match[1]);
  if (route === undefined) fail(`${file}: link to ${match[1]}, which is not mapped to a route.`);
  return `${route}${match[2] ?? ""}`;
}

function stringProp(name: string, value: string): string {
  // JSX string attributes decode entities and cannot contain quotes; use an expression instead.
  return /["&\n\\]/.test(value) ? `${name}={${JSON.stringify(value)}}` : `${name}="${value}"`;
}

function styleProp(css: string, context: JsxContext): string {
  const declarations: string[] = [];
  let depth = 0;
  let current = "";
  for (const char of css) {
    if (char === "(") depth += 1;
    if (char === ")") depth -= 1;
    if (char === ";" && depth === 0) {
      declarations.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  declarations.push(current);

  let custom = false;
  const entries = declarations
    .map((declaration) => declaration.trim())
    .filter((declaration) => declaration.length > 0)
    .map((declaration) => {
      const colon = declaration.indexOf(":");
      if (colon < 0) fail(`${context.file}: cannot parse inline style "${css}".`);
      const property = declaration.slice(0, colon).trim();
      const value = declaration.slice(colon + 1).trim();
      if (value.includes("!important")) {
        fail(`${context.file}: inline style "${css}" uses !important, which React cannot set.`);
      }
      if (property.startsWith("--")) {
        custom = true;
        return `${JSON.stringify(property)}: ${JSON.stringify(value)}`;
      }
      const key = property
        .replace(/^-ms-/, "ms-")
        .replace(/^-(\w)/, (_, letter: string) => letter.toUpperCase())
        .replace(/-(\w)/g, (_, letter: string) => letter.toUpperCase());
      return `${key}: ${JSON.stringify(value)}`;
    });

  if (custom) context.imports.cssProperties = true;
  return `style={{ ${entries.join(", ")} }${custom ? " as CSSProperties" : ""}}`;
}

function convertAttribute(element: Element, name: string, value: string, context: JsxContext) {
  if (name.startsWith("data-")) {
    if (name === "data-redirect") {
      const route = routeFor(value, context.file);
      return stringProp(name, route ?? value);
    }
    return stringProp(name, value);
  }
  if (name.startsWith("aria-")) {
    if (NUMERIC_ARIA.has(name)) {
      if (!/^-?\d+(\.\d+)?$/.test(value))
        fail(`${context.file}: ${name}="${value}" is not a number.`);
      return `${name}={${value}}`;
    }
    return stringProp(name, value);
  }
  if (name === "style") return styleProp(value, context);
  if (name === "onsubmit") {
    if (value.trim() !== "return false") fail(`${context.file}: unsupported onsubmit="${value}".`);
    return "onSubmit={(event) => event.preventDefault()}";
  }
  if (
    name === "autocomplete" &&
    !["input", "select", "textarea", "form"].includes(element.tagName)
  ) {
    // Bootstrap toggle buttons set it (Firefox keeps their state otherwise); React's types only
    // allow it on form controls, so pass it through a spread to keep the DOM attribute.
    return `{...{ autoComplete: ${JSON.stringify(value)} }}`;
  }
  if (name === "value" && element.tagName === "input") return stringProp("defaultValue", value);
  if (name === "checked" && element.tagName === "input") return "defaultChecked";
  if (name === "src" || (name === "href" && element.tagName !== "a" && element.tagName !== "use")) {
    const url = map.assetUrls[value];
    if (url) return stringProp(name, url);
    if (/^(assets\/|[\w-]+\.html)/.test(value)) {
      fail(`${context.file}: ${element.tagName} ${name}="${value}" is not mapped in assetUrls.`);
    }
  }

  const mapped = ATTRIBUTES[name];
  if (!mapped) fail(`${context.file}: attribute "${name}" on <${element.tagName}> is not mapped.`);
  const [prop, kind] = mapped;
  switch (kind) {
    case "boolean":
      return prop;
    case "number":
      if (!/^-?\d+$/.test(value)) fail(`${context.file}: ${name}="${value}" is not a number.`);
      return `${prop}={${value}}`;
    case "booleanish":
      if (value === "" || value === "true") return `${prop}={true}`;
      if (value === "false") return `${prop}={false}`;
      fail(`${context.file}: ${name}="${value}" is not true or false.`);
      break;
    default:
      return stringProp(prop, value);
  }
}

function escapeText(text: string): string {
  return text.replace(
    /[&<>{} ]/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "{": "&#123;", "}": "&#125;", " ": "&nbsp;" })[
        char
      ] ?? char,
  );
}

function convertChildren(element: Element, context: JsxContext): string {
  const dropWhitespace = NO_WHITESPACE.has(element.tagName);
  return element.childNodes
    .map((child) => {
      if (isElement(child)) return convertElement(child, context);
      if (child.nodeName !== "#text" || !("value" in child)) return "";
      if (context.pre) return `{${JSON.stringify(child.value)}}`;
      const text = child.value.replace(/[ \t\n\r\f]+/g, " ");
      if (text === " " && dropWhitespace) return "";
      return escapeText(text);
    })
    .join("");
}

function convertElement(source: Element, context: JsxContext): string {
  const replacement = context.substitute?.(source);
  if (replacement != null) return replacement;
  if (source.tagName === "script") return "";
  return (
    convertTag(withAddedAttributes(source, context), context) + sidebarExtrasAfter(source, context)
  );
}

function convertTag(element: Element, context: JsxContext): string {
  let tag = element.tagName;
  const props: string[] = [];
  let attrs = element.attrs;

  if (tag === "a") {
    const href = attr(element, "href") ?? "";
    const route = routeFor(href, context.file);
    if (route !== null) {
      const nav = context.navLinks && classes(element).includes("nav-link");
      if (nav) {
        attrs = withoutActiveLink(element).attrs;
        tag = "NavLink";
        context.imports.navLink = true;
        if (route === "/") props.push("end");
      } else {
        tag = "Link";
        context.imports.link = true;
      }
      props.push(stringProp("to", route));
      attrs = attrs.filter((a) => a.name !== "href");
    }
  }

  let children = "";
  if (tag === "select") {
    const selected = elementChildren(element)
      .filter((option) => option.tagName === "option" && attr(option, "selected") !== undefined)
      .map((option) => attr(option, "value") ?? textContent(option));
    if (selected.length > 0) {
      props.push(
        attr(element, "multiple") !== undefined
          ? `defaultValue={${JSON.stringify(selected)}}`
          : stringProp("defaultValue", selected[0] ?? ""),
      );
    }
  }
  if (tag === "option") attrs = attrs.filter((a) => a.name !== "selected");

  for (const { name, value } of attrs) {
    const prop = convertAttribute(element, name, value, context);
    if (prop) props.push(prop);
  }

  if (tag === "textarea") {
    const text = textContent(element);
    if (text) props.push(`defaultValue={${JSON.stringify(text)}}`);
  } else {
    children = convertChildren(element, { ...context, pre: context.pre || tag === "pre" });
  }
  if (attr(element, "contenteditable") !== undefined && children) {
    props.push("suppressContentEditableWarning");
  }

  const open = `<${tag}${props.length > 0 ? ` ${props.join(" ")}` : ""}`;
  if (VOID_ELEMENTS.has(tag) || children.length === 0) return `${open} />`;
  return `${open}>${children}</${tag}>`;
}

// ---------------------------------------------------------------------------------------------
// Pages and chrome

const identifier = (file: string, suffix: string) =>
  file
    .replace(/\.(js|css)$/, "")
    .replace(/[-.](\w)/g, (_, letter: string) => letter.toUpperCase())
    .replace(/^(\w)/, (letter) => letter.toLowerCase()) + suffix;

const scriptName = (file: string) => identifier(file, "Script");
const styleName = (file: string) => identifier(file, "Css");

type Chrome = {
  readonly sprite: string;
  readonly sidebar: string;
  readonly topbar: string;
  readonly footer: string;
  readonly siteHeader: string;
  readonly siteFooter: string;
};

/** The breadcrumb title holder in the topbar. */
function breadcrumbTitle(topbar: Element): Element {
  const label = find(topbar, (element) => classes(element).includes("breadcrumb-label"));
  const strong = label && elementChildren(label).find((element) => element.tagName === "strong");
  if (!strong) fail("topbar has no .breadcrumb-label <strong>.");
  return strong;
}

function topbarFingerprint(topbar: Element): string {
  const title = breadcrumbTitle(topbar);
  return fingerprint(topbar, (element) =>
    element === title ? { ...element, childNodes: [] } : element,
  );
}

/** Skeleton the hand-written AppShell renders around a page; checked for every app page. */
function appSkeleton(page: ParsedPage): { topbar: Element; main: Element; content: Element[] } {
  const [skip, sprite, sidebar, shell, ...rest] = page.body;
  const ok =
    skip &&
    fingerprint(skip) === '<a class="skip-link" href="#main">Skip to content</a>' &&
    sprite &&
    classes(sprite).includes("icon-library") &&
    sidebar?.tagName === "aside" &&
    shell &&
    fingerprint({ ...shell, childNodes: [] }) === '<div class="app-shell"></div>' &&
    rest.length === 0 &&
    page.bodyClass === "";
  if (!ok || !shell) fail(`${page.file}: body does not have the standard app layout.`);
  const [topbar, main, ...more] = elementChildren(shell);
  if (!topbar || !main || more.length > 0 || topbar.tagName !== "header") {
    fail(`${page.file}: .app-shell must contain exactly the topbar and <main>.`);
  }
  if (fingerprint({ ...main, childNodes: [] }) !== '<main id="main" tabindex="-1"></main>') {
    fail(`${page.file}: <main> attributes changed: ${fingerprint({ ...main, childNodes: [] })}`);
  }
  const content = elementChildren(main);
  const footer = content.at(-1);
  if (!footer || !classes(footer).includes("page-footer")) {
    fail(`${page.file}: <main> must end with footer.page-footer.`);
  }
  return { topbar, main, content: content.slice(0, -1) };
}

function siteSkeleton(page: ParsedPage): { main: Element } {
  const [skip, sprite, topbar, navbar, main, footer, ...rest] = page.body;
  const ok =
    skip &&
    fingerprint(skip) === '<a class="skip-link" href="#main">Skip to content</a>' &&
    sprite &&
    classes(sprite).includes("icon-library") &&
    topbar &&
    classes(topbar).includes("site-topbar") &&
    navbar?.tagName === "nav" &&
    main &&
    fingerprint({ ...main, childNodes: [] }) === '<main id="main" tabindex="-1"></main>' &&
    footer &&
    classes(footer).includes("site-footer") &&
    rest.length === 0 &&
    page.bodyClass === "site";
  if (!ok || !main) fail(`${page.file}: body does not have the standard website layout.`);
  return { main };
}

function authSkeleton(page: ParsedPage): { main: Element } {
  const [main, ...rest] = page.body;
  if (
    !main ||
    rest.length > 0 ||
    page.bodyClass !== "auth-page" ||
    fingerprint({ ...main, childNodes: [] }) !== '<main class="auth-wrap"></main>'
  ) {
    fail(`${page.file}: body does not have the standard auth layout.`);
  }
  return { main };
}

function extractChrome(pages: ReadonlyMap<string, ParsedPage>): Chrome {
  const appFrom = pages.get(map.shells.app.chromeFrom ?? "");
  const siteFrom = pages.get(map.shells.site.chromeFrom ?? "");
  if (!appFrom || !siteFrom)
    fail("shells.app.chromeFrom and shells.site.chromeFrom must be pages.");
  const [, sprite, sidebar] = appFrom.body;
  const { topbar, main } = appSkeleton(appFrom);
  const footer = elementChildren(main).at(-1);
  const [, , siteTopbar, siteNavbar, , siteFooter] = siteFrom.body;
  if (!sprite || !sidebar || !footer || !siteTopbar || !siteNavbar || !siteFooter) {
    fail("Could not find the shared chrome.");
  }

  const chrome = {
    sprite: fingerprint(sprite),
    sidebar: fingerprint(sidebar, withoutActiveLink),
    topbar: topbarFingerprint(topbar),
    footer: fingerprint(footer),
    siteHeader: fingerprint(siteTopbar) + fingerprint(siteNavbar, withoutActiveLink),
    siteFooter: fingerprint(siteFooter),
  };

  // Every page using a shell must use exactly this chrome; differences are reported, not lost.
  for (const entry of map.pages) {
    const page = pages.get(entry.file);
    if (!page) continue;
    const mismatch = (part: string) =>
      fail(
        `${entry.file}: its ${part} differs from ${part === "website header" || part === "website footer" ? map.shells.site.chromeFrom : map.shells.app.chromeFrom}. Update the shared chrome or set "shell": "custom" for this page in scripts/medha-theme.map.json.`,
      );
    if (entry.shell === "app") {
      const [, pageSprite, pageSidebar] = page.body;
      const skeleton = appSkeleton(page);
      if (!pageSprite || fingerprint(pageSprite) !== chrome.sprite) mismatch("icon library");
      if (!pageSidebar || fingerprint(pageSidebar, withoutActiveLink) !== chrome.sidebar) {
        mismatch("sidebar");
      }
      if (topbarFingerprint(skeleton.topbar) !== chrome.topbar) mismatch("topbar");
      const pageFooter = elementChildren(skeleton.main).at(-1);
      if (!pageFooter || fingerprint(pageFooter) !== chrome.footer) mismatch("page footer");
    }
    if (entry.shell === "site") {
      const [, pageSprite, pageTopbar, pageNavbar, , pageFooter] = page.body;
      siteSkeleton(page);
      if (!pageSprite || fingerprint(pageSprite) !== chrome.sprite) mismatch("icon library");
      if (
        !pageTopbar ||
        !pageNavbar ||
        fingerprint(pageTopbar) + fingerprint(pageNavbar, withoutActiveLink) !== chrome.siteHeader
      ) {
        mismatch("website header");
      }
      if (!pageFooter || fingerprint(pageFooter) !== chrome.siteFooter) mismatch("website footer");
    }
  }

  return chrome;
}

type GeneratedFile = { readonly path: string; readonly content: string | Buffer };

function moduleSource(imports: Imports, extra: readonly string[], body: string): string {
  const router = [imports.link ? "Link" : "", imports.navLink ? "NavLink" : ""].filter(Boolean);
  return [
    `// ${HEADER} Regenerated from the theme; build new screens from these components.`,
    ...(imports.cssProperties ? ['import type { CSSProperties } from "react";'] : []),
    ...(router.length > 0 ? [`import { ${router.join(", ")} } from "react-router";`] : []),
    ...extra,
    "",
    body,
    "",
  ].join("\n");
}

function newContext(file: string, navLinks: boolean): JsxContext {
  return {
    file,
    imports: { link: false, navLink: false, cssProperties: false },
    navLinks,
    pre: false,
  };
}

function chromeFiles(pages: ReadonlyMap<string, ParsedPage>): GeneratedFile[] {
  const appFrom = pages.get(map.shells.app.chromeFrom ?? "");
  const siteFrom = pages.get(map.shells.site.chromeFrom ?? "");
  if (!appFrom || !siteFrom) fail("Missing chrome source pages.");
  const [, sprite, sidebar] = appFrom.body;
  const { topbar, main } = appSkeleton(appFrom);
  const footer = elementChildren(main).at(-1);
  const [, , siteTopbar, siteNavbar, , siteFooter] = siteFrom.body;
  if (!sprite || !sidebar || !footer || !siteTopbar || !siteNavbar || !siteFooter) {
    fail("Could not find the shared chrome.");
  }

  const component = (
    name: string,
    file: string,
    elements: readonly Element[],
    options: { navLinks?: boolean; props?: string; substitute?: JsxContext["substitute"] } = {},
  ): GeneratedFile => {
    const context = {
      ...newContext(file, options.navLinks ?? false),
      ...(options.substitute ? { substitute: options.substitute } : {}),
    };
    const jsx = elements.map((element) => convertElement(element, context)).join("");
    const body = `export function ${name}(${options.props ?? ""}) {\n  return ${elements.length > 1 ? `<>${jsx}</>` : jsx};\n}`;
    return {
      path: `src/medha/chrome/${name}.tsx`,
      content: moduleSource(context.imports, [], body),
    };
  };

  const title = breadcrumbTitle(topbar);
  return [
    component("IconLibrary", appFrom.file, [sprite]),
    component("Sidebar", appFrom.file, [sidebar], { navLinks: true }),
    component("Topbar", appFrom.file, [topbar], {
      props: "{ title }: { readonly title: string }",
      substitute: (element) => (element === title ? "<strong>{title}</strong>" : null),
    }),
    component("PageFooter", appFrom.file, [footer]),
    component("SiteHeader", siteFrom.file, [siteTopbar, siteNavbar], { navLinks: true }),
    component("SiteFooter", siteFrom.file, [siteFooter]),
  ];
}

function pageFile(entry: PageEntry, page: ParsedPage, chrome: Chrome): GeneratedFile {
  const context = newContext(page.file, false);
  const imports: string[] = [];
  const [global, ...rest] = [page.styles.slice(0, map.globalStyles.length), page.styles];
  if (global.join() !== map.globalStyles.join()) {
    fail(`${page.file}: stylesheets must start with ${map.globalStyles.join(", ")}.`);
  }
  const styles = (rest[0] ?? []).slice(map.globalStyles.length);
  for (const style of styles) {
    if (!map.pageStyles.includes(style)) fail(`${page.file}: ${style} is not in pageStyles.`);
  }
  const scripts = page.scripts.filter((script) => !map.vendorScripts.includes(script));
  for (const script of scripts) {
    if (!map.pageScripts.includes(script)) fail(`${page.file}: ${script} is not in pageScripts.`);
  }
  if (page.scripts.length - scripts.length !== map.vendorScripts.length) {
    fail(`${page.file}: expected the vendor scripts ${map.vendorScripts.join(", ")}.`);
  }

  for (const style of styles) {
    imports.push(`import ${styleName(style)} from "../styles/${style}?inline";`);
  }
  for (const script of scripts) {
    imports.push(`import ${scriptName(script)} from "../scripts/${moduleName(script)}";`);
  }

  const defaults = entry.shell === "custom" ? null : map.shells[entry.shell];
  const props = [stringProp("documentTitle", page.title)];
  if (!defaults || defaults.styles.join() !== styles.join()) {
    props.push(`styles={[${styles.map(styleName).join(", ")}]}`);
  }
  if (!defaults || defaults.scripts.join() !== scripts.join()) {
    props.push(`scripts={[${scripts.map(scriptName).join(", ")}]}`);
  }
  // Defaults come from the shell; drop imports the page does not pass.
  const used = props.join(" ");
  const pageImports = imports.filter((line) => {
    const name = /^import (\w+)/.exec(line)?.[1] ?? "";
    return new RegExp(`\\b${name}\\b`).test(used);
  });

  const convert = (elements: readonly Element[]) =>
    elements.map((element) => convertElement(element, context)).join("");
  let jsx: string;
  const shellImport = (name: string) =>
    pageImports.unshift(`import { ${name} } from "../../components/medha/${name}";`);

  switch (entry.shell) {
    case "app": {
      const { topbar, content } = appSkeleton(page);
      const title = textContent(breadcrumbTitle(topbar)).trim();
      props.unshift(stringProp("title", title));
      jsx = `<AppShell ${props.join(" ")}>${convert(content)}</AppShell>`;
      shellImport("AppShell");
      break;
    }
    case "site": {
      const { main } = siteSkeleton(page);
      jsx = `<SiteShell ${props.join(" ")}>${convertChildren(main, context)}</SiteShell>`;
      shellImport("SiteShell");
      break;
    }
    case "auth": {
      const { main } = authSkeleton(page);
      jsx = `<AuthShell ${props.join(" ")}>${convertChildren(main, context)}</AuthShell>`;
      shellImport("AuthShell");
      break;
    }
    default: {
      const iconLibrary = page.body.find((element) => classes(element).includes("icon-library"));
      const substitute = (element: Element) =>
        element === iconLibrary && fingerprint(element) === chrome.sprite
          ? "<IconLibrary />"
          : null;
      const customContext = { ...context, substitute };
      props.push(stringProp("bodyClass", page.bodyClass));
      jsx = `<MedhaPage ${props.join(" ")}>${page.body.map((element) => convertElement(element, customContext)).join("")}</MedhaPage>`;
      shellImport("MedhaPage");
      if (iconLibrary && fingerprint(iconLibrary) === chrome.sprite) {
        pageImports.push('import { IconLibrary } from "../chrome/IconLibrary";');
      }
    }
  }

  const body = `export default function ${entry.component}() {\n  return (${jsx});\n}`;
  return {
    path: `src/medha/pages/${entry.component}.tsx`,
    content: moduleSource(context.imports, pageImports, body).replace(
      HEADER,
      `${HEADER} Source: ${page.file}.`,
    ),
  };
}

function routesFile(pages: ReadonlyMap<string, ParsedPage>): GeneratedFile {
  const notFound = map.pages.filter((page) => page.notFound);
  if (notFound.length !== 1 || !notFound[0]) fail('Exactly one page must set "notFound": true.');
  const entries = map.pages.map(
    (entry) =>
      `  { path: ${JSON.stringify(entry.path)}, title: ${JSON.stringify(pages.get(entry.file)?.title ?? "")}, Page: lazy(() => import("./pages/${entry.component}")) },`,
  );
  return {
    path: "src/medha/routes.tsx",
    content: [
      `// ${HEADER} One route per page of the theme.`,
      'import { type ComponentType, type LazyExoticComponent, lazy } from "react";',
      "",
      "export type MedhaRoute = {",
      "  readonly path: string;",
      "  /** The page's document title. */",
      "  readonly title: string;",
      "  readonly Page: LazyExoticComponent<ComponentType>;",
      "};",
      "",
      "export const medhaRoutes: readonly MedhaRoute[] = [",
      ...entries,
      "];",
      "",
      "/** Shown for paths no route matches. */",
      `export const NotFoundPage = lazy(() => import("./pages/${notFound[0].component}"));`,
      "",
    ].join("\n"),
  };
}

function themeFile(): GeneratedFile {
  const styles = [...new Set(Object.values(map.shells).flatMap((shell) => shell.styles))];
  const scripts = [...new Set(Object.values(map.shells).flatMap((shell) => shell.scripts))];
  const shell = (id: ShellId) =>
    `  ${id}: { styles: [${map.shells[id].styles.map(styleName).join(", ")}], scripts: [${map.shells[id].scripts.map(scriptName).join(", ")}] },`;
  return {
    path: "src/medha/theme.ts",
    content: [
      `// ${HEADER} Stylesheets and scripts each shell loads, in the theme's order.`,
      ...styles.map((style) => `import ${styleName(style)} from "./styles/${style}?inline";`),
      ...scripts.map(
        (script) => `import ${scriptName(script)} from "./scripts/${moduleName(script)}";`,
      ),
      "",
      "/** A theme script: runs against the page's DOM each time the page mounts. */",
      "export type PageScript = () => void;",
      "",
      "export type ShellAssets = {",
      "  /** Page stylesheets (CSS text), added while the page is shown. */",
      "  readonly styles: readonly string[];",
      "  readonly scripts: readonly PageScript[];",
      "};",
      "",
      'export const SHELL_ASSETS: Readonly<Record<"app" | "site" | "auth", ShellAssets>> = {',
      shell("app"),
      shell("site"),
      shell("auth"),
      "};",
      "",
    ].join("\n"),
  };
}

function iconsFile(pages: ReadonlyMap<string, ParsedPage>): GeneratedFile {
  const page = pages.get(map.shells.app.chromeFrom ?? "");
  const sprite = page?.body.find((element) => classes(element).includes("icon-library"));
  if (!sprite) fail("No icon library found.");
  const ids: string[] = [];
  walk(sprite, (element) => {
    const id = attr(element, "id");
    if (element.tagName === "symbol" && id?.startsWith("i-")) ids.push(id.slice(2));
  });
  return {
    path: "src/medha/icons.ts",
    content: [
      `// ${HEADER} Icons in <IconLibrary />; use them through <Icon name="..." />.`,
      `export const ICON_NAMES = [${ids.map((id) => JSON.stringify(id)).join(", ")}] as const;`,
      "",
      "export type IconName = (typeof ICON_NAMES)[number];",
      "",
    ].join("\n"),
  };
}

function scriptFile(script: string): GeneratedFile {
  const source = readFileSync(join(assetsDir, script), "utf8");
  try {
    // ES modules are strict: make sure the theme script parses as strict code.
    new Function(`"use strict";\n${source}`);
  } catch (error) {
    fail(`assets/${script} is not valid strict-mode JavaScript: ${String(error)}`);
  }
  return {
    path: `src/medha/scripts/${moduleName(script)}.ts`,
    content: [
      "// @ts-nocheck -- the theme's own script, kept byte for byte so its behaviour does not drift.",
      `// ${HEADER} Source: assets/${script}, unchanged inside this function.`,
      "// The theme runs it once per page load; here it runs each time its page mounts (see",
      "// src/components/medha/page-scripts.ts, which also removes its global listeners afterwards).",
      `export default function ${scriptName(script)}(): void {`,
      source.trimEnd(),
      "}",
      "",
    ].join("\n"),
  };
}

const moduleName = (script: string) => script.replace(/\.js$/, "");

type CatalogItem = {
  readonly path: string;
  readonly label: string;
  readonly icon: string;
  readonly description: string;
  readonly entry: PageEntry;
  readonly page: ParsedPage;
};

/** Sidebar sections of the theme, with each page's heading text, for the explorer and agents. */
function catalog(
  pages: ReadonlyMap<string, ParsedPage>,
): { section: string; items: CatalogItem[] }[] {
  const sidebar = pages.get(map.shells.app.chromeFrom ?? "")?.body[2];
  if (!sidebar) fail("No sidebar to build the catalog from.");
  const entries = new Map(map.pages.map((entry) => [entry.file, entry]));
  const sections: { section: string; items: CatalogItem[] }[] = [];

  for (const nav of elementChildren(sidebar).filter((element) => element.tagName === "nav")) {
    const items = elementChildren(nav).map((link): CatalogItem => {
      const file = attr(link, "href") ?? "";
      const entry = entries.get(file);
      const page = pages.get(file);
      if (!entry || !page) fail(`Sidebar link ${file} is not a mapped page.`);
      const icon = attr(find(link, (element) => element.tagName === "use") ?? link, "href") ?? "";
      const heading = page.body
        .map((element) =>
          find(element, (candidate) =>
            ["page-heading", "page-banner", "auth-card"].some((name) =>
              classes(candidate).includes(name),
            ),
          ),
        )
        .find(Boolean);
      const paragraph = heading && find(heading, (element) => element.tagName === "p");
      return {
        path: entry.path,
        label: textContent(link).trim(),
        icon: icon.replace(/^#i-/, ""),
        description: textContent(paragraph).replace(/\s+/g, " ").trim(),
        entry,
        page,
      };
    });
    sections.push({ section: attr(nav, "aria-label") ?? "", items });
  }
  return sections;
}

function catalogFiles(pages: ReadonlyMap<string, ParsedPage>): GeneratedFile[] {
  const sections = catalog(pages);
  const item = (value: CatalogItem) =>
    `{ path: ${JSON.stringify(value.path)}, label: ${JSON.stringify(value.label)}, icon: ${JSON.stringify(value.icon)}, description: ${JSON.stringify(value.description)}, component: ${JSON.stringify(value.entry.component)} }`;
  const ts = [
    `// ${HEADER} Every theme page, grouped as in the sidebar. Drives the component explorer.`,
    'import type { IconName } from "./icons";',
    "",
    "export type CatalogItem = {",
    "  readonly path: string;",
    "  readonly label: string;",
    "  readonly icon: IconName;",
    "  readonly description: string;",
    "  /** Page component in src/medha/pages/. */",
    "  readonly component: string;",
    "};",
    "",
    "export type CatalogSection = { readonly section: string; readonly items: readonly CatalogItem[] };",
    "",
    "export const CATALOG: readonly CatalogSection[] = [",
    ...sections.map(
      (section) =>
        `  { section: ${JSON.stringify(section.section)}, items: [${section.items.map(item).join(", ")}] },`,
    ),
    "];",
    "",
  ].join("\n");

  const markdown = [
    "# Medha component catalog",
    "",
    "<!-- Generated by medha-starter from the Medha theme. -->",
    "",
    "Every page of the Medha theme is a route in this project. Open a page, find the markup you",
    "need and copy it into your own component; keep its class names, which carry the Medha style.",
    "",
    ...sections.flatMap((section) => [
      `## ${section.section}`,
      "",
      "| Route | Page | Component | Shell | Theme scripts |",
      "| --- | --- | --- | --- | --- |",
      ...section.items.map((value) => {
        const scripts = value.page.scripts
          .filter((script) => !map.vendorScripts.includes(script))
          .join(", ");
        const label = value.description ? `${value.label}: ${value.description}` : value.label;
        return `| \`${value.path}\` | ${label.replace(/\|/g, "\\|")} | \`src/medha/pages/${value.entry.component}.tsx\` | ${value.entry.shell} | ${scripts} |`;
      }),
      "",
    ]),
  ].join("\n");

  return [
    { path: "src/medha/catalog.ts", content: ts },
    { path: "src/medha/CATALOG.md", content: markdown },
  ];
}

function rewriteCssUrls(css: string): string {
  let result = css;
  for (const [from, to] of Object.entries(map.cssUrls)) {
    result = result.replaceAll(`url(${from}`, `url(${to}`);
  }
  const unmapped = /url\((?!["']?(data:|\/|https:|#))[^)]*\)/.exec(result);
  if (unmapped) fail(`CSS ${unmapped[0]} is not mapped in cssUrls.`);
  return result;
}

function embedFiles(): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  for (const embed of map.embeds) {
    let html = readFileSync(join(sourceDir, embed.file), "utf8");
    const assets = new Set<string>();
    html = html.replace(/(href|src)="assets\/([^"]+)"/g, (_, name: string, asset: string) => {
      assets.add(asset);
      return `${name}="${embed.assetsUrl}/${asset}"`;
    });
    if (/(href|src)="(?!#|https:|\/)/.test(html)) fail(`${embed.file}: unmapped relative URL.`);
    files.push({ path: embed.output, content: html });
    for (const asset of [...assets].sort()) {
      const content = readFileSync(join(assetsDir, asset), "utf8");
      files.push({
        path: `${embed.assets}/${asset}`,
        content: asset.endsWith(".css") ? rewriteCssUrls(content) : content,
      });
    }
  }
  return files;
}

function copyTree(from: string, to: string): GeneratedFile[] {
  if (statSync(from).isFile()) return [{ path: to, content: readFileSync(from) }];
  return readdirSync(from)
    .sort()
    .flatMap((name) => copyTree(join(from, name), `${to}/${name}`));
}

/** Fails when the theme has a file the map does not account for. */
function checkCoverage(): void {
  const mapped = new Set([
    ...map.pages.map((page) => page.file),
    ...map.embeds.map((embed) => embed.file),
    ...Object.keys(map.docs),
    ...[
      ...map.globalStyles,
      ...map.pageStyles,
      ...map.vendorScripts,
      ...map.pageScripts,
      ...Object.keys(map.publicAssets),
    ].map((name) => `assets/${name}`),
  ]);
  const embedAssets = new Set(
    map.embeds.flatMap((embed) =>
      [...readFileSync(join(sourceDir, embed.file), "utf8").matchAll(/"assets\/([^"]+)"/g)].map(
        (match) => `assets/${match[1]}`,
      ),
    ),
  );
  const unmapped = [
    ...readdirSync(sourceDir).filter((name) => name !== "assets"),
    ...readdirSync(assetsDir).map((name) => `assets/${name}`),
  ].filter((name) => !mapped.has(name) && !embedAssets.has(name));
  if (unmapped.length > 0) {
    fail(`Not in scripts/medha-theme.map.json: ${unmapped.join(", ")}.`);
  }
}

export function convertTheme(): GeneratedFile[] {
  checkCoverage();
  const pages = new Map(map.pages.map((entry) => [entry.file, parsePage(entry.file)]));
  const chrome = extractChrome(pages);

  const files: GeneratedFile[] = [
    ...chromeFiles(pages),
    ...map.pages.map((entry) => {
      const page = pages.get(entry.file);
      if (!page) fail(`${entry.file} was not parsed.`);
      return pageFile(entry, page, chrome);
    }),
    routesFile(pages),
    themeFile(),
    iconsFile(pages),
    ...catalogFiles(pages),
    ...map.pageScripts.map(scriptFile),
    ...[...map.globalStyles, ...map.pageStyles]
      .filter((style) => !(style in map.fromNpm))
      .map((style) => ({
        path: `src/medha/styles/${style}`,
        content: rewriteCssUrls(readFileSync(join(assetsDir, style), "utf8")),
      })),
    ...embedFiles(),
    ...Object.entries(map.publicAssets).flatMap(([from, to]) =>
      copyTree(join(assetsDir, from), to),
    ),
    ...Object.entries(map.docs).map(([from, to]) => ({
      path: to,
      content: `<!-- ${HEADER} This is the theme's own README; its pages are the routes in src/medha/routes.tsx. -->\n\n${readFileSync(join(sourceDir, from), "utf8")}`,
    })),
  ];

  for (const file of files) {
    if (!OWNED.some((owned) => file.path === owned || file.path.startsWith(`${owned}/`))) {
      fail(`Generated ${file.path} is outside the generated paths (${OWNED.join(", ")}).`);
    }
  }
  return files;
}

/** Writes files into a directory and formats the generated TypeScript with Biome. */
function writeFormatted(files: readonly GeneratedFile[], directory: string): void {
  for (const file of files) {
    const path = join(directory, file.path);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, file.content);
  }
  writeFileSync(
    join(directory, "biome.json"),
    JSON.stringify({
      files: { includes: ["**/*.ts", "**/*.tsx"] },
      formatter: { indentStyle: "space", indentWidth: 2, lineWidth: 100 },
      javascript: { formatter: { quoteStyle: "double" } },
    }),
  );
  const result = spawnSync(biome, ["format", "--write", "."], {
    cwd: directory,
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  rmSync(join(directory, "biome.json"));
  if (result.status !== 0) fail(`Formatting failed:\n${result.stdout}\n${result.stderr}`);
}

function listFiles(directory: string, prefix = ""): string[] {
  if (!existsSync(directory)) return [];
  if (statSync(directory).isFile()) return [prefix];
  return readdirSync(directory)
    .sort()
    .flatMap((name) => listFiles(join(directory, name), prefix ? `${prefix}/${name}` : name));
}

function main(): void {
  const check = process.argv.includes("--check");
  const output = join(root, map.output);
  const staging = mkdtempSync(join(tmpdir(), "medha-theme-"));

  try {
    writeFormatted(convertTheme(), staging);

    if (check) {
      const differences: string[] = [];
      for (const owned of OWNED) {
        const expected = new Set(listFiles(join(staging, owned), owned));
        const actual = new Set(listFiles(join(output, owned), owned));
        for (const path of new Set([...expected, ...actual])) {
          if (!expected.has(path)) differences.push(`unexpected ${path}`);
          else if (!actual.has(path)) differences.push(`missing ${path}`);
          else if (!readFileSync(join(staging, path)).equals(readFileSync(join(output, path)))) {
            differences.push(`changed ${path}`);
          }
        }
      }
      if (differences.length > 0) {
        console.error(
          `The Medha theme layer is out of date (${differences.length} files). Run "bun run theme:sync".\n  ${differences.slice(0, 20).join("\n  ")}`,
        );
        process.exit(1);
      }
      console.log("The Medha theme layer matches Bootstrap Medha/.");
      return;
    }

    for (const owned of OWNED) {
      rmSync(join(output, owned), { recursive: true, force: true });
      const from = join(staging, owned);
      if (existsSync(from)) cpSync(from, join(output, owned), { recursive: true });
    }
    const count = OWNED.reduce((total, owned) => total + listFiles(join(output, owned)).length, 0);
    console.log(`Wrote ${count} files to ${relative(root, output)}.`);
  } catch (error) {
    if (error instanceof ThemeError) {
      console.error(`medha-theme: ${error.message}`);
      process.exit(1);
    }
    throw error;
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}

if (import.meta.main) main();
