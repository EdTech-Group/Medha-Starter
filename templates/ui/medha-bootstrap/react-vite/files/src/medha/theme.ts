// Ported from the Medha theme by medha-starter. Stylesheets and scripts each shell loads, in the theme's order.
import schemeCss from "./styles/scheme.css?inline";
import siteCss from "./styles/site.css?inline";
import schemeScript from "./scripts/scheme";
import pagesScript from "./scripts/pages";
import siteScript from "./scripts/site";

/** A theme script: runs against the page's DOM each time the page mounts. */
export type PageScript = () => void;

export type ShellAssets = {
  /** Page stylesheets (CSS text), added while the page is shown. */
  readonly styles: readonly string[];
  readonly scripts: readonly PageScript[];
};

export const SHELL_ASSETS: Readonly<Record<"app" | "site" | "auth", ShellAssets>> = {
  app: { styles: [schemeCss], scripts: [schemeScript, pagesScript] },
  site: { styles: [siteCss, schemeCss], scripts: [schemeScript, pagesScript, siteScript] },
  auth: { styles: [schemeCss], scripts: [schemeScript, pagesScript] },
};
