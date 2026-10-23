// Ported from the Medha theme by medha-starter. Source: tree-editor.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";
import treeCss from "../styles/tree.css?inline";
import treeEditorCss from "../styles/tree-editor.css?inline";
import schemeCss from "../styles/scheme.css?inline";
import schemeScript from "../scripts/scheme";
import pagesScript from "../scripts/pages";
import treeEditorScript from "../scripts/tree-editor";

export default function TreeEditorPage() {
  return (
    <AppShell
      title="Tree diagram editor"
      documentTitle="Tree diagram editor • Medha IoT"
      styles={[treeCss, treeEditorCss, schemeCss]}
      scripts={[schemeScript, pagesScript, treeEditorScript]}
    >
      <section className="page-heading">
        <div>
          <div className="eyebrow">COMPONENTS</div>
          <h1>Tree diagram editor</h1>
          <p>
            Add, rename, reorder, drag-and-drop and delete nodes with a live diagram, undo/redo and
            JSON import/export.
          </p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Tree editor</h2>
            <p>
              Build and restructure the hierarchy — changes appear in the outline and the diagram
              instantly and are saved in this browser
            </p>
          </div>
        </div>
        <div className="panel-body">
          <div className="te-bar">
            <div className="te-grp" role="group" aria-label="Add and edit">
              <button type="button" className="btn btn-primary btn-sm" data-act="child">
                + Add child
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" data-act="sibling">
                + Add sibling
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" data-act="rename">
                Rename
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" data-act="dup">
                Duplicate
              </button>
              <button type="button" className="btn btn-outline-danger btn-sm" data-act="del">
                Delete
              </button>
            </div>
            <div className="te-grp" role="group" aria-label="Arrange">
              <button type="button" className="btn btn-outline-secondary btn-sm" data-act="up">
                ↑ Up
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" data-act="down">
                ↓ Down
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" data-act="indent">
                → Indent
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" data-act="outdent">
                ← Outdent
              </button>
            </div>
            <div className="te-grp" role="group" aria-label="History">
              <button type="button" className="btn btn-outline-secondary btn-sm" data-act="undo">
                Undo
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" data-act="redo">
                Redo
              </button>
            </div>
            <div className="te-grp" role="group" aria-label="View">
              <button type="button" className="btn btn-outline-secondary btn-sm" data-act="expand">
                Expand all
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                data-act="collapse"
              >
                Collapse all
              </button>
            </div>
            <div className="te-grp" role="group" aria-label="Data">
              <button type="button" className="btn btn-outline-secondary btn-sm" data-act="export">
                Export JSON
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" data-act="import">
                Import JSON
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" data-act="reset">
                Reset
              </button>
              <input type="file" id="te-file" accept="application/json,.json" hidden />
            </div>
          </div>
          <div className="te-status" id="te-status" role="status" aria-live="polite">
            Select a node, then use the toolbar, keyboard shortcuts or drag and drop.
          </div>
          <div className="te-help">
            <kbd>F2</kbd> rename · <kbd>Insert</kbd> add child · <kbd>Enter</kbd> add sibling ·{" "}
            <kbd>Delete</kbd> remove · <kbd>Alt</kbd>+<kbd>↑↓</kbd> move · <kbd>Alt</kbd>+
            <kbd>→←</kbd> indent / outdent · <kbd>Ctrl</kbd>+<kbd>D</kbd> duplicate ·{" "}
            <kbd>Ctrl</kbd>+<kbd>Z</kbd>/<kbd>Y</kbd> undo / redo · double-click a node to rename ·
            drag a node onto another to re-parent (edges = reorder) · click a count badge to
            collapse
          </div>
        </div>
      </section>
      <div className="row g-3 mt-0">
        <div className="col-xl-4 d-flex flex-column gap-3">
          <section className="panel  mb-4">
            <div className="panel-heading">
              <div>
                <h2>Outline</h2>
                <p>
                  Hierarchy <span id="te-total" className="ms-2 text-muted" />
                </p>
              </div>
            </div>
            <div className="panel-body">
              <div className="te-tree-wrap">
                <ul role="tree" aria-label="Tree outline" className="te-tree" id="te-outline" />
              </div>
            </div>
          </section>
          <section className="panel  mb-4">
            <div className="panel-heading">
              <div>
                <h2>Properties</h2>
                <p>Edit the selected node</p>
              </div>
            </div>
            <div className="panel-body">
              <div id="te-props">
                <div className="te-path" id="te-path" />
                <div className="mb-3">
                  <label className="form-label" htmlFor="te-p-name">
                    Name
                  </label>
                  <input className="form-control" id="te-p-name" maxLength={80} />
                </div>
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label" htmlFor="te-p-icon">
                      Type
                    </label>
                    <select className="form-select" id="te-p-icon">
                      <option value="globe">Workspace</option>
                      <option value="pin">Site</option>
                      <option value="device">Gateway</option>
                      <option value="sun">Solar</option>
                      <option value="bolt">Energy</option>
                      <option value="wave">Sensor</option>
                      <option value="users">Team</option>
                      <option value="cloud">Cloud</option>
                      <option value="home">Building</option>
                      <option value="laptop">Server</option>
                      <option value="shield">Security</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label" htmlFor="te-p-st">
                      Status
                    </label>
                    <select className="form-select" id="te-p-st">
                      <option value="">None</option>
                      <option>Online</option>
                      <option>Warning</option>
                      <option>Offline</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="form-label" htmlFor="te-p-note">
                    Note
                  </label>
                  <textarea
                    className="form-control"
                    id="te-p-note"
                    rows={3}
                    maxLength={300}
                    placeholder="Optional description"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="col-xl-8 d-flex flex-column gap-3">
          <section className="panel  mb-4">
            <div className="panel-heading">
              <div>
                <h2>Diagram</h2>
                <p>Live preview — click to select, drag to re-parent</p>
              </div>
            </div>
            <div className="panel-body">
              <div className="oc-scroll">
                <div className="oc" id="te-diagram" />
              </div>
            </div>
          </section>
          <section className="panel  mb-4">
            <div className="panel-heading">
              <div>
                <h2>JSON</h2>
                <p>Export, paste or edit the whole structure, then apply</p>
              </div>
            </div>
            <div className="panel-body">
              <textarea
                className="form-control te-json"
                id="te-json"
                spellCheck={false}
                aria-label="Tree JSON"
              />
              <div className="d-flex gap-2 mt-3">
                <button type="button" className="btn btn-primary btn-sm" data-act="apply">
                  Apply JSON
                </button>
                <button type="button" className="btn btn-outline-secondary btn-sm" data-act="copy">
                  Copy
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
