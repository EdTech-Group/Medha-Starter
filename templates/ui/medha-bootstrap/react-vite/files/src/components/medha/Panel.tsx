import type { ReactNode } from "react";

export type PanelProps = {
  readonly title?: string;
  readonly description?: string;
  /** Controls shown on the right of the heading. */
  readonly actions?: ReactNode;
  readonly className?: string;
  readonly children: ReactNode;
};

/** A Medha panel: the white card that holds a section of a workspace page. */
export function Panel({ title, description, actions, className, children }: PanelProps) {
  return (
    <section className={className ? `panel ${className}` : "panel mb-4"}>
      {title ? (
        <div className="panel-heading">
          <div>
            <h2>{title}</h2>
            {description ? <p>{description}</p> : null}
          </div>
          {actions}
        </div>
      ) : null}
      <div className="panel-body">{children}</div>
    </section>
  );
}
