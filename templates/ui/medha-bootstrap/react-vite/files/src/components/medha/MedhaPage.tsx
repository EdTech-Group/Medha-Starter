import { type ReactNode, useLayoutEffect, useReducer, useRef } from "react";
import type { PageScript } from "../../medha/theme";
import { runPageScripts } from "./page-scripts";

export type MedhaPageProps = {
  /** Browser tab title. */
  readonly documentTitle: string;
  /** Class of <body> while the page is shown: "" (workspace), "site" or "auth-page". */
  readonly bodyClass?: string;
  /** Page stylesheets as CSS text (import them with `?inline`), in the theme's order. */
  readonly styles?: readonly string[];
  /** Theme scripts that enhance the rendered markup, in order. */
  readonly scripts?: readonly PageScript[];
  readonly children: ReactNode;
};

const enhanced = new WeakSet<Element>();

/**
 * One page of the app, the React counterpart of one HTML page of the Medha theme. Use a shell
 * (AppShell, SiteShell, AuthShell) for new pages; they render this with the right chrome.
 */
export function MedhaPage({
  documentTitle,
  bodyClass = "",
  styles = [],
  scripts = [],
  children,
}: MedhaPageProps) {
  const root = useRef<HTMLDivElement>(null);
  const [generation, remount] = useReducer((count: number) => count + 1, 0);

  // A page's title, styles and scripts are fixed, so they run once per mount (like a page load)
  // rather than whenever the props' identities change.
  // biome-ignore lint/correctness/useExhaustiveDependencies: see the comment above.
  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    // StrictMode runs effects twice. Theme scripts change the DOM they enhance, so the second
    // run gets freshly rendered markup instead of enhancing the same elements twice.
    if (enhanced.has(element)) {
      remount();
      return;
    }
    enhanced.add(element);
    document.title = documentTitle;
    return runPageScripts({ bodyClass, styles, scripts });
  }, [generation]);

  return (
    <div ref={root} key={generation} className="medha-page">
      {children}
    </div>
  );
}
