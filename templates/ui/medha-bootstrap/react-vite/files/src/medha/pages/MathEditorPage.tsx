// Ported from the Medha theme by medha-starter. Source: math-editor.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";
import treeEditorCss from "../styles/tree-editor.css?inline";
import mathEditorCss from "../styles/math-editor.css?inline";
import schemeCss from "../styles/scheme.css?inline";
import schemeScript from "../scripts/scheme";
import pagesScript from "../scripts/pages";
import mathmlScript from "../scripts/mathml";
import mathEditorScript from "../scripts/math-editor";

export default function MathEditorPage() {
  return (
    <AppShell
      title="MathML editor"
      documentTitle="MathML editor • Medha IoT"
      styles={[treeEditorCss, mathEditorCss, schemeCss]}
      scripts={[schemeScript, pagesScript, mathmlScript, mathEditorScript]}
    >
      <section className="page-heading">
        <div>
          <div className="eyebrow">COMPONENTS</div>
          <h1>MathML editor</h1>
          <p>
            Equation editor with LaTeX input, symbol palette for every category of mathematics, live
            MathML preview and export.
          </p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>MathML equation editor</h2>
            <p>
              Write or insert equations from any field of mathematics and get clean, accessible
              Presentation MathML — algebra, calculus, linear algebra, statistics, physics,
              chemistry and more
            </p>
          </div>
        </div>
        <div className="panel-body">
          <div className="mx-warn" id="mx-warn" hidden>
            <b>Your browser does not render MathML.</b> The MathML output below is still correct,
            but the preview will look wrong. Use a current Chrome, Edge, Firefox or Safari.
          </div>
          <span id="mx-top" />
          <div className="row g-4">
            <div className="col-xl-5">
              <h3
                style={{
                  fontSize: "10px",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "var(--ms-a57744,#a57744)",
                  margin: "0 0 4px",
                  fontWeight: "600",
                }}
              >
                Symbols &amp; templates
              </h3>
              <div className="mx-search">
                <label className="visually-hidden" htmlFor="mx-q">
                  Search symbols
                </label>
                <div className="search-wrap">
                  <svg className="icon">
                    <use href="#i-search" />
                  </svg>
                  <input
                    type="search"
                    className="form-control"
                    id="mx-q"
                    placeholder={"Search symbols, e.g. integral, \\alpha, matrix…"}
                  />
                </div>
              </div>
              <div className="mx-cats" id="mx-cats" role="group" aria-label="Equation categories" />
              <div className="mx-grid" id="mx-grid" />
            </div>
            <div className="col-xl-7">
              <div className="te-bar mb-3">
                <div className="te-grp">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    data-mx="inl"
                    aria-pressed="false"
                    title="Switch between block (display) and inline equations"
                  >
                    Block
                  </button>
                  <label className="mx-sizer">
                    Size{" "}
                    <input
                      type="range"
                      id="mx-size"
                      min="1"
                      max="4"
                      step="0.1"
                      defaultValue="2.2"
                      aria-label="Preview size"
                    />
                  </label>
                </div>
                <div className="te-grp">
                  <button type="button" className="btn btn-primary btn-sm" data-mx="copyml">
                    Copy MathML
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    data-mx="copytex"
                  >
                    Copy LaTeX
                  </button>
                  <button type="button" className="btn btn-outline-secondary btn-sm" data-mx="mml">
                    Download .mml
                  </button>
                  <button type="button" className="btn btn-outline-secondary btn-sm" data-mx="html">
                    Download HTML
                  </button>
                  <button type="button" className="btn btn-outline-secondary btn-sm" data-mx="save">
                    Save
                  </button>
                </div>
              </div>
              <div
                className="mx-prev"
                id="mx-prev"
                aria-live="polite"
                aria-label="Equation preview"
              />
              <div className="mx-status" id="mx-status" role="status" />
              <label className="form-label" htmlFor="mx-tex">
                LaTeX input{" "}
                <span className="text-muted" style={{ fontWeight: "400" }}>
                  — converted to MathML as you type
                </span>
              </label>
              <textarea
                className="form-control mx-tex"
                id="mx-tex"
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
              />
              <div className="d-flex flex-wrap gap-2 mt-2">
                <button type="button" className="btn btn-outline-secondary btn-sm" data-mx="prev">
                  ◂ Previous ▢
                </button>
                <button type="button" className="btn btn-outline-secondary btn-sm" data-mx="next">
                  Next ▢ ▸
                </button>
                <button type="button" className="btn btn-outline-danger btn-sm" data-mx="clear">
                  Clear
                </button>
              </div>
              <div className="mx-keys">
                Click a palette item to insert it at the cursor (selected text fills the first ▢
                slot) · <kbd>Alt</kbd>+<kbd>]</kbd> / <kbd>Alt</kbd>+<kbd>[</kbd> jump between ▢
                slots · hover a palette item to see its LaTeX
              </div>
              <div className="mx-tabs" role="tablist">
                <button
                  type="button"
                  className="mx-tab"
                  role="tab"
                  aria-selected="true"
                  data-p="mx-p-src"
                >
                  MathML source
                </button>
                <button
                  type="button"
                  className="mx-tab"
                  role="tab"
                  aria-selected="false"
                  data-p="mx-p-ex"
                >
                  Equation library
                </button>
                <button
                  type="button"
                  className="mx-tab"
                  role="tab"
                  aria-selected="false"
                  data-p="mx-p-sv"
                >
                  My equations
                </button>
              </div>
              <div className="mx-pane" id="mx-p-src">
                <div className="mx-mode" id="mx-mode" hidden>
                  Preview is showing edited MathML. Edit the LaTeX to regenerate it from LaTeX
                  again.
                </div>
                <textarea
                  className="form-control mx-src"
                  id="mx-src"
                  spellCheck={false}
                  aria-label="MathML source"
                />
                <div className="d-flex gap-2 mt-2">
                  <button type="button" className="btn btn-primary btn-sm" data-mx="apply">
                    Apply MathML
                  </button>
                </div>
                <p className="mx-keys">
                  You can paste any Presentation MathML here and press <b>Apply</b>. Scripts, event
                  handlers, links and unsupported elements are stripped before it is rendered.
                </p>
              </div>
              <div className="mx-pane" id="mx-p-ex" hidden>
                <div className="mx-ex" id="mx-ex" />
              </div>
              <div className="mx-pane" id="mx-p-sv" hidden>
                <div className="mx-saved" id="mx-saved" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
