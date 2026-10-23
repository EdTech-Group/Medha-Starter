import type { ReactNode } from "react";
import { APP_NAME } from "../../app-config";
import { IconLibrary } from "../../medha/chrome/IconLibrary";
import { SiteFooter } from "../../medha/chrome/SiteFooter";
import { SiteHeader } from "../../medha/chrome/SiteHeader";
import { type PageScript, SHELL_ASSETS } from "../../medha/theme";
import { MedhaPage } from "./MedhaPage";

export type SiteShellProps = {
  /** Browser tab title. */
  readonly documentTitle?: string;
  readonly styles?: readonly string[];
  readonly scripts?: readonly PageScript[];
  readonly children: ReactNode;
};

/** The public website layout: top bar, navigation bar and footer (landing, about, contact). */
export function SiteShell({
  documentTitle = APP_NAME,
  styles = SHELL_ASSETS.site.styles,
  scripts = SHELL_ASSETS.site.scripts,
  children,
}: SiteShellProps) {
  return (
    <MedhaPage documentTitle={documentTitle} bodyClass="site" styles={styles} scripts={scripts}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <IconLibrary />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </MedhaPage>
  );
}
