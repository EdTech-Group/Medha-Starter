export type MedhaLogoProps = {
  readonly width?: number;
  readonly height?: number;
};

/** The Medha logo. Always use this component; never copy the image path into other markup. */
export function MedhaLogo({ width = 220, height = 65 }: MedhaLogoProps) {
  return (
    <img
      src="/medha/medha-logo.svg"
      alt="Medha Techno Research LLP"
      width={width}
      height={height}
    />
  );
}
