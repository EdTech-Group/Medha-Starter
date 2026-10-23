import type { ReactNode } from "react";

export type PageHeadingProps = {
  /** Small upper-case label above the title, e.g. "WORKSPACE". */
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  /** Buttons shown on the right. */
  readonly actions?: ReactNode;
};

/** The heading block at the top of every workspace page. */
export function PageHeading({ eyebrow, title, description, actions }: PageHeadingProps) {
  return (
    <section className="page-heading">
      <div>
        {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="heading-actions">{actions}</div>
    </section>
  );
}
