import type { ReactNode } from "react";
import { APP_NAME } from "../../app-config";
import { type PageScript, SHELL_ASSETS } from "../../medha/theme";
import { MedhaPage } from "./MedhaPage";

export type AuthShellProps = {
  /** Browser tab title. */
  readonly documentTitle?: string;
  readonly styles?: readonly string[];
  readonly scripts?: readonly PageScript[];
  /** Usually one `.auth-card`. */
  readonly children: ReactNode;
};

/** The centred card layout of the sign-in, registration and error pages. */
export function AuthShell({
  documentTitle = APP_NAME,
  styles = SHELL_ASSETS.auth.styles,
  scripts = SHELL_ASSETS.auth.scripts,
  children,
}: AuthShellProps) {
  return (
    <MedhaPage
      documentTitle={documentTitle}
      bodyClass="auth-page"
      styles={styles}
      scripts={scripts}
    >
      <main className="auth-wrap">{children}</main>
    </MedhaPage>
  );
}
