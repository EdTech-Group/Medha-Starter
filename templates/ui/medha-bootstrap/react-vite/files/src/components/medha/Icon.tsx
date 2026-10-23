import type { IconName } from "../../medha/icons";

export type IconProps = {
  readonly name: IconName;
  readonly className?: string;
  /** Accessible name; without one the icon is decorative and hidden from screen readers. */
  readonly label?: string;
};

/** An icon from the Medha icon library (rendered by every shell). */
export function Icon({ name, className, label }: IconProps) {
  return (
    <svg
      className={className ? `icon ${className}` : "icon"}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <use href={`#i-${name}`} />
    </svg>
  );
}
