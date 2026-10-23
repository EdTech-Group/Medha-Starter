// Ported from the Medha theme by medha-starter. Source: vedic-editor.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";
import vedicCss from "../styles/vedic.css?inline";
import schemeCss from "../styles/scheme.css?inline";
import schemeScript from "../scripts/scheme";
import pagesScript from "../scripts/pages";
import vedicScript from "../scripts/vedic";

export default function VedicEditorPage() {
  return (
    <AppShell
      title="Vedic Sanskrit editor"
      documentTitle="Vedic Sanskrit editor • Medha IoT"
      styles={[vedicCss, schemeCss]}
      scripts={[schemeScript, pagesScript, vedicScript]}
    >
      <section className="page-heading">
        <div>
          <div className="eyebrow">COMPONENTS</div>
          <h1>Vedic Sanskrit editor</h1>
          <p>
            Type Vedic Sanskrit phonetically — svara marks, visarga and anusvara signs, Samaveda
            numerals — with an on-screen keyboard.
          </p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Vedic Sanskrit editor</h2>
            <p>
              Phonetic Devanagari typing with Vedic accents and signs (U+1CD0–1CFF, U+A8E0–A8FF),
              on-screen phonetic keyboard and WYSIWYG formatting. Unicode fonts bundled — works
              offline. Saved in this browser.
            </p>
          </div>
        </div>
        <div className="panel-body">
          <div data-vedic-editor="" />
        </div>
      </section>
    </AppShell>
  );
}
