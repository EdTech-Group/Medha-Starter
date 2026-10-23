// Ported from the Medha theme by medha-starter. Source: uml-editor.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";
import treeEditorCss from "../styles/tree-editor.css?inline";
import umlEditorCss from "../styles/uml-editor.css?inline";
import schemeCss from "../styles/scheme.css?inline";
import schemeScript from "../scripts/scheme";
import pagesScript from "../scripts/pages";
import umlEditorScript from "../scripts/uml-editor";

export default function UmlEditorPage() {
  return (
    <AppShell
      title="UML diagram editor"
      documentTitle="UML diagram editor • Medha IoT"
      styles={[treeEditorCss, umlEditorCss, schemeCss]}
      scripts={[schemeScript, pagesScript, umlEditorScript]}
    >
      <section className="page-heading">
        <div>
          <div className="eyebrow">COMPONENTS</div>
          <h1>UML diagram editor</h1>
          <p>Structural and behavioral UML diagrams — 14 types in one editor.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>UML diagram editor</h2>
            <p>
              14 diagram types — structural (class, object, component, composite structure, package,
              deployment, profile) and behavioral (use case, activity, state machine, sequence,
              communication, interaction overview, timing) — drag, connect and annotate. Saved in
              this browser.
            </p>
          </div>
        </div>
        <div className="panel-body">
          <div className="uml-tabs" id="uml-tabs" role="tablist" aria-label="Diagram type" />
          <div className="uml-bar">
            <div className="te-grp" role="group" aria-label="History">
              <button type="button" className="btn btn-outline-secondary btn-sm" data-uml="undo">
                Undo
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" data-uml="redo">
                Redo
              </button>
            </div>
            <div className="te-grp" role="group" aria-label="Edit">
              <button type="button" className="btn btn-outline-secondary btn-sm" data-uml="dup">
                Duplicate
              </button>
              <button type="button" className="btn btn-outline-danger btn-sm" data-uml="del">
                Delete
              </button>
            </div>
            <div className="te-grp" role="group" aria-label="Export">
              <button type="button" className="btn btn-outline-secondary btn-sm" data-uml="svg">
                Export SVG
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" data-uml="png">
                Export PNG
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" data-uml="json">
                Export JSON
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" data-uml="imp">
                Import JSON
              </button>
              <input type="file" id="uml-file" accept="application/json,.json" hidden />
            </div>
            <div className="te-grp" role="group" aria-label="Diagram">
              <button type="button" className="btn btn-outline-secondary btn-sm" data-uml="reset">
                Load sample
              </button>
              <button type="button" className="btn btn-outline-danger btn-sm" data-uml="clear">
                Clear
              </button>
              <div className="form-check form-switch ms-2 mb-0">
                <input className="form-check-input" type="checkbox" id="uml-snap" defaultChecked />
                <label className="form-check-label" htmlFor="uml-snap" style={{ fontSize: "12px" }}>
                  Snap to grid
                </label>
              </div>
            </div>
          </div>
          <div className="uml-wrap">
            <aside className="uml-side" aria-label="Palette">
              <h3>Elements</h3>
              <div className="uml-pal" id="uml-pn" />
              <h3>Relationships</h3>
              <div className="uml-pal" id="uml-pe" />
              <p className="te-help" id="uml-note" style={{ marginTop: "14px" }} />
            </aside>
            <div>
              <div className="uml-canvas" id="uml-canvas">
                <svg id="uml-svg" tabIndex={0} role="application" aria-label="UML diagram canvas" />
                <div className="uml-hint" id="uml-hint" />
                <div className="uml-zoom">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    data-uml="zout"
                  >
                    −
                  </button>
                  <span id="uml-zoomv">100%</span>
                  <button type="button" className="btn btn-outline-secondary btn-sm" data-uml="zin">
                    +
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    data-uml="z100"
                  >
                    1:1
                  </button>
                  <button type="button" className="btn btn-outline-secondary btn-sm" data-uml="fit">
                    Fit
                  </button>
                </div>
              </div>
              <div className="te-status" id="uml-status" role="status" aria-live="polite" />
              <div className="te-help">
                <kbd>Delete</kbd> remove · <kbd>Ctrl</kbd>+<kbd>Z</kbd>/<kbd>Y</kbd> undo / redo ·{" "}
                <kbd>Ctrl</kbd>+<kbd>D</kbd> duplicate · <kbd>Ctrl</kbd>+<kbd>A</kbd> select all ·{" "}
                <kbd>Shift</kbd>+click multi-select · arrow keys nudge · drag the corner handle to
                resize · drop elements onto a package / node / part to nest them · ports snap to the
                border of the container
              </div>
            </div>
            <aside className="uml-side" aria-label="Properties">
              <h3>Properties</h3>
              <div id="uml-props" className="uml-props">
                <div id="up-none" className="uml-empty">
                  Nothing selected.
                  <br />
                  <br />• Add elements from the palette (click or drag).
                  <br />• To draw a relationship, pick one under <b>Relationships</b>, then click
                  the source and the target.
                  <br />• Double-click an element to rename it.
                  <br />• Ctrl + scroll zooms, drag the background to pan.
                </div>
                <div id="up-multi" className="uml-empty" hidden>
                  <span id="up-multi-t" />
                </div>
                <div id="up-node" hidden>
                  <div className="sec">
                    <b id="up-title" style={{ fontSize: "13px" }} />
                  </div>
                  <div className="sec" id="up-f-name">
                    <label className="form-label" htmlFor="up-name" id="up-name-l">
                      Name
                    </label>
                    <input className="form-control" id="up-name" maxLength={80} />
                  </div>
                  <div className="sec" id="up-f-stereo">
                    <label className="form-label" htmlFor="up-stereo">
                      Stereotype «…»
                    </label>
                    <input
                      className="form-control"
                      id="up-stereo"
                      maxLength={40}
                      placeholder="e.g. entity"
                    />
                  </div>
                  <div className="sec" id="up-f-attrs">
                    <label className="form-label" htmlFor="up-attrs" id="up-attrs-l">
                      Attributes
                    </label>
                    <textarea
                      className="form-control"
                      id="up-attrs"
                      rows={4}
                      spellCheck={false}
                      placeholder="one per line"
                    />
                  </div>
                  <div className="sec" id="up-f-meth">
                    <label className="form-label" id="up-meth-l" htmlFor="up-meth">
                      Operations
                    </label>
                    <textarea
                      className="form-control"
                      id="up-meth"
                      rows={4}
                      spellCheck={false}
                      placeholder="one per line"
                    />
                  </div>
                  <div className="sec" id="up-f-text">
                    <label className="form-label" htmlFor="up-text">
                      Text
                    </label>
                    <textarea className="form-control" id="up-text" rows={4} maxLength={400} />
                  </div>
                  <div className="sec form-check" id="up-f-abs">
                    <input className="form-check-input" type="checkbox" id="up-abs" />
                    <label
                      className="form-check-label"
                      htmlFor="up-abs"
                      style={{ fontSize: "12px" }}
                    >
                      Abstract (italic name)
                    </label>
                  </div>
                  <div className="sec" id="up-f-color">
                    <label className="form-label" htmlFor="up-color">
                      Fill colour
                    </label>
                    <select className="form-select" id="up-color">
                      <option value="">Default</option>
                      <option value="#faf0de">Amber tint</option>
                      <option value="#efe6dd">Brown tint</option>
                      <option value="#e3f0ea">Green tint</option>
                      <option value="#e4edf3">Blue tint</option>
                      <option value="#f6e3df">Red tint</option>
                      <option value="#fff7e0">Cream</option>
                    </select>
                  </div>
                  <div className="row g-2">
                    <div className="col-6 sec" id="up-f-w">
                      <label className="form-label" htmlFor="up-w">
                        Width
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="up-w"
                        min="40"
                        max="1200"
                        step="10"
                      />
                    </div>
                    <div className="col-6 sec" id="up-f-h">
                      <label className="form-label" htmlFor="up-h">
                        Height
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="up-h"
                        min="40"
                        max="1200"
                        step="10"
                      />
                    </div>
                  </div>
                </div>
                <div id="up-edge" hidden>
                  <div className="sec">
                    <b style={{ fontSize: "13px" }}>Relationship</b>
                    <div
                      className="text-muted"
                      style={{ fontSize: "11px", marginTop: "4px" }}
                      id="up-eends"
                    />
                  </div>
                  <div className="sec">
                    <label className="form-label" htmlFor="up-ekind">
                      Type
                    </label>
                    <select className="form-select" id="up-ekind" />
                  </div>
                  <div className="sec">
                    <label className="form-label" htmlFor="up-elabel">
                      Label
                    </label>
                    <input className="form-control" id="up-elabel" maxLength={60} />
                  </div>
                  <div className="sec" id="up-f-ey" hidden>
                    <label className="form-label" htmlFor="up-ey">
                      Message height (y)
                    </label>
                    <input type="number" className="form-control" id="up-ey" step="10" />
                  </div>
                  <div className="row g-2">
                    <div className="col-6 sec">
                      <label className="form-label" htmlFor="up-em1">
                        Multiplicity (source)
                      </label>
                      <input className="form-control" id="up-em1" maxLength={12} placeholder="1" />
                    </div>
                    <div className="col-6 sec">
                      <label className="form-label" htmlFor="up-em2">
                        Multiplicity (target)
                      </label>
                      <input
                        className="form-control"
                        id="up-em2"
                        maxLength={12}
                        placeholder="0..*"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      data-uml="swap"
                    >
                      ⇄ Reverse
                    </button>
                    <button type="button" className="btn btn-outline-danger btn-sm" data-uml="edel">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
