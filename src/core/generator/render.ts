const PLACEHOLDER_PATTERN = /\{\{\s*([A-Za-z][A-Za-z0-9_]*)\s*\}\}/g;

export const TEMPLATE_SUFFIX = ".tmpl";

/**
 * Replaces {{ name }} placeholders. Only files ending in .tmpl are rendered, so JSX such as
 * style={{ ... }} in ordinary source files is never touched. Unknown names are an error rather
 * than silently left in the output.
 */
export function renderTemplate(
  content: string,
  variables: Readonly<Record<string, string>>,
  fileLabel: string,
): string {
  const missing = new Set<string>();

  const rendered = content.replace(PLACEHOLDER_PATTERN, (match, name: string) => {
    const value = variables[name];
    if (value === undefined) {
      missing.add(name);
      return match;
    }
    return value;
  });

  if (missing.size > 0) {
    throw new Error(`Unknown template variable(s) in ${fileLabel}: ${[...missing].join(", ")}.`);
  }

  return rendered;
}
