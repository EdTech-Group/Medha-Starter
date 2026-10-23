import type { ReactNode } from "react";
import { APP_NAME } from "../../app-config";
import { IconLibrary } from "../../medha/chrome/IconLibrary";
import { PageFooter } from "../../medha/chrome/PageFooter";
import { Sidebar } from "../../medha/chrome/Sidebar";
import { Topbar } from "../../medha/chrome/Topbar";
import { type PageScript, SHELL_ASSETS } from "../../medha/theme";
import { MedhaPage } from "./MedhaPage";

export type AppShellProps = {
  /** Page name, shown in the topbar breadcrumb. */
  readonly title: string;
  /** Browser tab title; defaults to "<title> • <app name>". */
  readonly documentTitle?: string;
  readonly styles?: readonly string[];
  readonly scripts?: readonly PageScript[];
  readonly children: ReactNode;
};

/** The Medha workspace layout: sidebar, topbar and footer around the page content. */
export function AppShell({
  title,
  documentTitle = `${title} • ${APP_NAME}`,
  styles = SHELL_ASSETS.app.styles,
  scripts = SHELL_ASSETS.app.scripts,
  children,
}: AppShellProps) {
  return (
    <MedhaPage documentTitle={documentTitle} styles={styles} scripts={scripts}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <IconLibrary />
      <Sidebar />
      <div className="app-shell">
        <Topbar title={title} />
        <main id="main" tabIndex={-1}>
          {children}
          <PageFooter />
        </main>
      </div>
    </MedhaPage>
  );
}
