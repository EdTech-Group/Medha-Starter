// Medha style check: run with `node scripts/check-style.mjs`. See MEDHA_STYLE.md.
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
// The ported theme defines the palette; everything else must use its tokens.
const THEME_PATHS = ["src/medha/"];
const LOGO_COMPONENT = "src/components/medha/MedhaLogo.tsx";
const SOURCE = /\.(css|ts|tsx|js|jsx|mjs)$/;
const UI_KITS = [
  "tailwindcss",
  "@mui/",
  "@material-ui/",
  "antd",
  "@chakra-ui/",
  "@mantine/",
  "bulma",
  "primereact",
  "semantic-ui",
  "@headlessui/",
  "daisyui",
  "flowbite",
  "@radix-ui/themes",
  "font-awesome",
  "@fortawesome/",
];
const HEX_IN_CSS = /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})\b/i;
const HEX_IN_CODE = /["'`\s:(,]#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})(?![\w-])/i;
const COLOUR_FUNCTION = /\b(?:rgba?|hsla?|hwb|oklch|oklab|lab|lch)\(/i;

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return entry.name === "node_modules" ? [] : files(path);
    return SOURCE.test(entry.name) ? [path] : [];
  });
}

const problems = [];
const report = (file, line, message) => problems.push(`${file}:${line}  ${message}`);

for (const path of files(join(root, "src"))) {
  const file = relative(root, path).split("\\").join("/");
  if (THEME_PATHS.some((prefix) => file.startsWith(prefix))) continue;
  const css = file.endsWith(".css");

  readFileSync(path, "utf8")
    .split("\n")
    .forEach((text, index) => {
      const line = index + 1;
      const code = css ? text.replace(/\/\*.*?\*\//g, "") : text.replace(/\/\/.*$/, "");
      if ((css ? HEX_IN_CSS : HEX_IN_CODE).test(code) || COLOUR_FUNCTION.test(code)) {
        report(file, line, "hard-coded colour; use a --medha-* token or a theme class");
      }
      if (file !== LOGO_COMPONENT && code.includes("medha-logo.svg")) {
        report(file, line, "logo used directly; render <MedhaLogo /> instead");
      }
      for (const kit of UI_KITS) {
        if (
          new RegExp(`(?:from\\s+|import\\s*\\(|@import\\s+|require\\()["'\`]${kit}`).test(code)
        ) {
          report(file, line, `"${kit}" is another UI kit; build with the Medha components`);
        }
      }
    });
}

const manifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
for (const name of Object.keys({ ...manifest.dependencies, ...manifest.devDependencies })) {
  const kit = UI_KITS.find((candidate) => name === candidate || name.startsWith(candidate));
  if (kit) report("package.json", 1, `"${name}" is another UI kit; remove it`);
}

if (problems.length > 0) {
  console.error(`Medha style check failed (${problems.length}):\n${problems.join("\n")}`);
  console.error("See MEDHA_STYLE.md.");
  process.exit(1);
}
console.log("Medha style check passed.");
