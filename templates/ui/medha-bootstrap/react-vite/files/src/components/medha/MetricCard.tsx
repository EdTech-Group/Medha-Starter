import type { ReactNode } from "react";
import type { IconName } from "../../medha/icons";
import { Icon } from "./Icon";

export type MetricCardProps = {
  readonly label: string;
  readonly icon: IconName;
  readonly value: ReactNode;
  readonly caption?: ReactNode;
};

/** A dashboard metric: label with icon, large value and a caption. */
export function MetricCard({ label, icon, value, caption }: MetricCardProps) {
  return (
    <article className="metric-card">
      <div className="metric-label">
        {label}
        <Icon name={icon} />
      </div>
      <div className="metric-value">{value}</div>
      {caption ? <div className="metric-caption">{caption}</div> : null}
    </article>
  );
}
