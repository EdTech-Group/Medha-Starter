// Ported from the Medha theme by medha-starter. Source: tree.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";
import treeCss from "../styles/tree.css?inline";
import schemeCss from "../styles/scheme.css?inline";
import schemeScript from "../scripts/scheme";
import pagesScript from "../scripts/pages";
import treeScript from "../scripts/tree";

export default function TreePage() {
  return (
    <AppShell
      title="Tree diagram"
      documentTitle="Tree diagram • Medha IoT"
      styles={[treeCss, schemeCss]}
      scripts={[schemeScript, pagesScript, treeScript]}
    >
      <section className="page-heading">
        <div>
          <div className="eyebrow">COMPONENTS</div>
          <h1>Tree diagram</h1>
          <p>Collapsible tree view and organisation-chart tree diagram.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Tree diagram</h2>
            <p>Organisation chart — click a node to collapse or expand its branch</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="oc-tools">
            <button className="btn btn-outline-secondary btn-sm" id="oc-expand" type="button">
              Expand all
            </button>
            <button className="btn btn-outline-secondary btn-sm" id="oc-collapse" type="button">
              Collapse to sites
            </button>
            <span className="oc-legend">
              <i className="oc-dot oc-Online" />
              Online <i className="oc-dot oc-Warning" />
              Warning <i className="oc-dot oc-Offline" />
              Offline
            </span>
          </div>
          <div className="oc-scroll">
            <div className="oc">
              <ul>
                <li>
                  <button type="button" className="oc-node lvl0" aria-expanded="true">
                    <span className="oc-ic">
                      <svg className="icon ">
                        <use href="#i-globe" />
                      </svg>
                    </span>
                    <span className="oc-t">
                      <b>Medha workspace</b>
                    </span>
                    <span className="oc-cnt">3</span>
                  </button>
                  <ul>
                    <li>
                      <button type="button" className="oc-node lvl1" aria-expanded="true">
                        <span className="oc-ic">
                          <svg className="icon ">
                            <use href="#i-pin" />
                          </svg>
                        </span>
                        <span className="oc-t">
                          <b>Ahmedabad</b>
                        </span>
                        <span className="oc-cnt">2</span>
                      </button>
                      <ul>
                        <li>
                          <button type="button" className="oc-node lvl2">
                            <span className="oc-ic">
                              <svg className="icon ">
                                <use href="#i-device" />
                              </svg>
                            </span>
                            <span className="oc-t">
                              <b>MS-001</b>
                              <small>Online</small>
                            </span>
                            <i className="oc-dot oc-Online" />
                          </button>
                        </li>
                        <li>
                          <button type="button" className="oc-node lvl2">
                            <span className="oc-ic">
                              <svg className="icon ">
                                <use href="#i-device" />
                              </svg>
                            </span>
                            <span className="oc-t">
                              <b>MS-004</b>
                              <small>Warning</small>
                            </span>
                            <i className="oc-dot oc-Warning" />
                          </button>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <button type="button" className="oc-node lvl1" aria-expanded="true">
                        <span className="oc-ic">
                          <svg className="icon ">
                            <use href="#i-pin" />
                          </svg>
                        </span>
                        <span className="oc-t">
                          <b>Vadodara</b>
                        </span>
                        <span className="oc-cnt">2</span>
                      </button>
                      <ul>
                        <li>
                          <button type="button" className="oc-node lvl2">
                            <span className="oc-ic">
                              <svg className="icon ">
                                <use href="#i-device" />
                              </svg>
                            </span>
                            <span className="oc-t">
                              <b>MS-002</b>
                              <small>Online</small>
                            </span>
                            <i className="oc-dot oc-Online" />
                          </button>
                        </li>
                        <li>
                          <button type="button" className="oc-node lvl2">
                            <span className="oc-ic">
                              <svg className="icon ">
                                <use href="#i-device" />
                              </svg>
                            </span>
                            <span className="oc-t">
                              <b>MS-005</b>
                              <small>Online</small>
                            </span>
                            <i className="oc-dot oc-Online" />
                          </button>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <button type="button" className="oc-node lvl1" aria-expanded="true">
                        <span className="oc-ic">
                          <svg className="icon ">
                            <use href="#i-pin" />
                          </svg>
                        </span>
                        <span className="oc-t">
                          <b>Surat</b>
                        </span>
                        <span className="oc-cnt">2</span>
                      </button>
                      <ul>
                        <li>
                          <button type="button" className="oc-node lvl2">
                            <span className="oc-ic">
                              <svg className="icon ">
                                <use href="#i-device" />
                              </svg>
                            </span>
                            <span className="oc-t">
                              <b>MS-003</b>
                              <small>Online</small>
                            </span>
                            <i className="oc-dot oc-Online" />
                          </button>
                        </li>
                        <li>
                          <button type="button" className="oc-node lvl2">
                            <span className="oc-ic">
                              <svg className="icon ">
                                <use href="#i-device" />
                              </svg>
                            </span>
                            <span className="oc-t">
                              <b>MS-006</b>
                              <small>Offline</small>
                            </span>
                            <i className="oc-dot oc-Offline" />
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Tree view</h2>
            <p>
              Collapsible hierarchy with checkboxes, search and keyboard navigation (arrow keys,
              Home/End)
            </p>
          </div>
        </div>
        <div className="panel-body">
          <div className="tv-tools">
            <div className="search-wrap">
              <svg className="icon">
                <use href="#i-search" />
              </svg>
              <input
                type="search"
                className="form-control"
                id="tv-search"
                aria-label="Filter tree"
                placeholder="Filter nodes…"
              />
            </div>
            <button className="btn btn-outline-secondary btn-sm" id="tv-expand" type="button">
              Expand all
            </button>
            <button className="btn btn-outline-secondary btn-sm" id="tv-collapse" type="button">
              Collapse all
            </button>
          </div>
          <ul role="tree" aria-label="Device hierarchy" className="tv-root" id="tv">
            <li role="none" className="tv-li">
              <div className="tv-row">
                <button
                  type="button"
                  className="tv-toggle"
                  aria-label="Toggle Medha workspace"
                  tabIndex={-1}
                >
                  <svg className="icon ">
                    <use href="#i-chevron" />
                  </svg>
                </button>
                <input
                  type="checkbox"
                  className="form-check-input tv-check"
                  aria-label="Select Medha workspace"
                />
                <span
                  role="treeitem"
                  tabIndex={-1}
                  aria-expanded="true"
                  aria-level={1}
                  className="tv-label"
                >
                  <svg className="icon ">
                    <use href="#i-globe" />
                  </svg>
                  <span className="tv-text">Medha workspace</span>
                </span>
              </div>
              <ul role="group" className="tv-group">
                <li role="none" className="tv-li">
                  <div className="tv-row">
                    <button
                      type="button"
                      className="tv-toggle"
                      aria-label="Toggle Ahmedabad"
                      tabIndex={-1}
                    >
                      <svg className="icon ">
                        <use href="#i-chevron" />
                      </svg>
                    </button>
                    <input
                      type="checkbox"
                      className="form-check-input tv-check"
                      aria-label="Select Ahmedabad"
                    />
                    <span
                      role="treeitem"
                      tabIndex={-1}
                      aria-expanded="true"
                      aria-level={2}
                      className="tv-label"
                    >
                      <svg className="icon ">
                        <use href="#i-pin" />
                      </svg>
                      <span className="tv-text">Ahmedabad</span>
                    </span>
                  </div>
                  <ul role="group" className="tv-group">
                    <li role="none" className="tv-li">
                      <div className="tv-row">
                        <button
                          type="button"
                          className="tv-toggle"
                          aria-label="Toggle MedhaSense 001"
                          tabIndex={-1}
                        >
                          <svg className="icon ">
                            <use href="#i-chevron" />
                          </svg>
                        </button>
                        <input
                          type="checkbox"
                          className="form-check-input tv-check"
                          aria-label="Select MedhaSense 001"
                        />
                        <span
                          role="treeitem"
                          tabIndex={-1}
                          aria-expanded="false"
                          aria-level={3}
                          className="tv-label"
                        >
                          <svg className="icon ">
                            <use href="#i-device" />
                          </svg>
                          <span className="tv-text">MedhaSense 001</span>
                          <span className="status-badge status-Online ms-2">Online</span>
                        </span>
                      </div>
                      <ul role="group" className="tv-group d-none">
                        <li role="none" className="tv-li">
                          <div className="tv-row">
                            <span className="tv-toggle ph" />
                            <input
                              type="checkbox"
                              className="form-check-input tv-check"
                              aria-label="Select Solar inverter"
                            />
                            <span role="treeitem" tabIndex={-1} aria-level={4} className="tv-label">
                              <svg className="icon ">
                                <use href="#i-sun" />
                              </svg>
                              <span className="tv-text">Solar inverter</span>
                            </span>
                          </div>
                        </li>
                        <li role="none" className="tv-li">
                          <div className="tv-row">
                            <span className="tv-toggle ph" />
                            <input
                              type="checkbox"
                              className="form-check-input tv-check"
                              aria-label="Select Energy meter"
                            />
                            <span role="treeitem" tabIndex={-1} aria-level={4} className="tv-label">
                              <svg className="icon ">
                                <use href="#i-bolt" />
                              </svg>
                              <span className="tv-text">Energy meter</span>
                            </span>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li role="none" className="tv-li">
                      <div className="tv-row">
                        <button
                          type="button"
                          className="tv-toggle"
                          aria-label="Toggle MedhaSense 004"
                          tabIndex={-1}
                        >
                          <svg className="icon ">
                            <use href="#i-chevron" />
                          </svg>
                        </button>
                        <input
                          type="checkbox"
                          className="form-check-input tv-check"
                          aria-label="Select MedhaSense 004"
                        />
                        <span
                          role="treeitem"
                          tabIndex={-1}
                          aria-expanded="false"
                          aria-level={3}
                          className="tv-label"
                        >
                          <svg className="icon ">
                            <use href="#i-device" />
                          </svg>
                          <span className="tv-text">MedhaSense 004</span>
                          <span className="status-badge status-Warning ms-2">Warning</span>
                        </span>
                      </div>
                      <ul role="group" className="tv-group d-none">
                        <li role="none" className="tv-li">
                          <div className="tv-row">
                            <span className="tv-toggle ph" />
                            <input
                              type="checkbox"
                              className="form-check-input tv-check"
                              aria-label="Select Solar inverter"
                            />
                            <span role="treeitem" tabIndex={-1} aria-level={4} className="tv-label">
                              <svg className="icon ">
                                <use href="#i-sun" />
                              </svg>
                              <span className="tv-text">Solar inverter</span>
                            </span>
                          </div>
                        </li>
                        <li role="none" className="tv-li">
                          <div className="tv-row">
                            <span className="tv-toggle ph" />
                            <input
                              type="checkbox"
                              className="form-check-input tv-check"
                              aria-label="Select Temperature probe"
                            />
                            <span role="treeitem" tabIndex={-1} aria-level={4} className="tv-label">
                              <svg className="icon ">
                                <use href="#i-wave" />
                              </svg>
                              <span className="tv-text">Temperature probe</span>
                            </span>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li role="none" className="tv-li">
                  <div className="tv-row">
                    <button
                      type="button"
                      className="tv-toggle"
                      aria-label="Toggle Vadodara"
                      tabIndex={-1}
                    >
                      <svg className="icon ">
                        <use href="#i-chevron" />
                      </svg>
                    </button>
                    <input
                      type="checkbox"
                      className="form-check-input tv-check"
                      aria-label="Select Vadodara"
                    />
                    <span
                      role="treeitem"
                      tabIndex={-1}
                      aria-expanded="true"
                      aria-level={2}
                      className="tv-label"
                    >
                      <svg className="icon ">
                        <use href="#i-pin" />
                      </svg>
                      <span className="tv-text">Vadodara</span>
                    </span>
                  </div>
                  <ul role="group" className="tv-group">
                    <li role="none" className="tv-li">
                      <div className="tv-row">
                        <button
                          type="button"
                          className="tv-toggle"
                          aria-label="Toggle MedhaSense 002"
                          tabIndex={-1}
                        >
                          <svg className="icon ">
                            <use href="#i-chevron" />
                          </svg>
                        </button>
                        <input
                          type="checkbox"
                          className="form-check-input tv-check"
                          aria-label="Select MedhaSense 002"
                        />
                        <span
                          role="treeitem"
                          tabIndex={-1}
                          aria-expanded="false"
                          aria-level={3}
                          className="tv-label"
                        >
                          <svg className="icon ">
                            <use href="#i-device" />
                          </svg>
                          <span className="tv-text">MedhaSense 002</span>
                          <span className="status-badge status-Online ms-2">Online</span>
                        </span>
                      </div>
                      <ul role="group" className="tv-group d-none">
                        <li role="none" className="tv-li">
                          <div className="tv-row">
                            <span className="tv-toggle ph" />
                            <input
                              type="checkbox"
                              className="form-check-input tv-check"
                              aria-label="Select Energy meter"
                            />
                            <span role="treeitem" tabIndex={-1} aria-level={4} className="tv-label">
                              <svg className="icon ">
                                <use href="#i-bolt" />
                              </svg>
                              <span className="tv-text">Energy meter</span>
                            </span>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li role="none" className="tv-li">
                      <div className="tv-row">
                        <button
                          type="button"
                          className="tv-toggle"
                          aria-label="Toggle MedhaSense 005"
                          tabIndex={-1}
                        >
                          <svg className="icon ">
                            <use href="#i-chevron" />
                          </svg>
                        </button>
                        <input
                          type="checkbox"
                          className="form-check-input tv-check"
                          aria-label="Select MedhaSense 005"
                        />
                        <span
                          role="treeitem"
                          tabIndex={-1}
                          aria-expanded="false"
                          aria-level={3}
                          className="tv-label"
                        >
                          <svg className="icon ">
                            <use href="#i-device" />
                          </svg>
                          <span className="tv-text">MedhaSense 005</span>
                          <span className="status-badge status-Online ms-2">Online</span>
                        </span>
                      </div>
                      <ul role="group" className="tv-group d-none">
                        <li role="none" className="tv-li">
                          <div className="tv-row">
                            <span className="tv-toggle ph" />
                            <input
                              type="checkbox"
                              className="form-check-input tv-check"
                              aria-label="Select Solar inverter"
                            />
                            <span role="treeitem" tabIndex={-1} aria-level={4} className="tv-label">
                              <svg className="icon ">
                                <use href="#i-sun" />
                              </svg>
                              <span className="tv-text">Solar inverter</span>
                            </span>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li role="none" className="tv-li">
                  <div className="tv-row">
                    <button
                      type="button"
                      className="tv-toggle"
                      aria-label="Toggle Surat"
                      tabIndex={-1}
                    >
                      <svg className="icon ">
                        <use href="#i-chevron" />
                      </svg>
                    </button>
                    <input
                      type="checkbox"
                      className="form-check-input tv-check"
                      aria-label="Select Surat"
                    />
                    <span
                      role="treeitem"
                      tabIndex={-1}
                      aria-expanded="true"
                      aria-level={2}
                      className="tv-label"
                    >
                      <svg className="icon ">
                        <use href="#i-pin" />
                      </svg>
                      <span className="tv-text">Surat</span>
                    </span>
                  </div>
                  <ul role="group" className="tv-group">
                    <li role="none" className="tv-li">
                      <div className="tv-row">
                        <button
                          type="button"
                          className="tv-toggle"
                          aria-label="Toggle MedhaSense 003"
                          tabIndex={-1}
                        >
                          <svg className="icon ">
                            <use href="#i-chevron" />
                          </svg>
                        </button>
                        <input
                          type="checkbox"
                          className="form-check-input tv-check"
                          aria-label="Select MedhaSense 003"
                        />
                        <span
                          role="treeitem"
                          tabIndex={-1}
                          aria-expanded="false"
                          aria-level={3}
                          className="tv-label"
                        >
                          <svg className="icon ">
                            <use href="#i-device" />
                          </svg>
                          <span className="tv-text">MedhaSense 003</span>
                          <span className="status-badge status-Online ms-2">Online</span>
                        </span>
                      </div>
                      <ul role="group" className="tv-group d-none">
                        <li role="none" className="tv-li">
                          <div className="tv-row">
                            <span className="tv-toggle ph" />
                            <input
                              type="checkbox"
                              className="form-check-input tv-check"
                              aria-label="Select Solar inverter"
                            />
                            <span role="treeitem" tabIndex={-1} aria-level={4} className="tv-label">
                              <svg className="icon ">
                                <use href="#i-sun" />
                              </svg>
                              <span className="tv-text">Solar inverter</span>
                            </span>
                          </div>
                        </li>
                        <li role="none" className="tv-li">
                          <div className="tv-row">
                            <span className="tv-toggle ph" />
                            <input
                              type="checkbox"
                              className="form-check-input tv-check"
                              aria-label="Select Energy meter"
                            />
                            <span role="treeitem" tabIndex={-1} aria-level={4} className="tv-label">
                              <svg className="icon ">
                                <use href="#i-bolt" />
                              </svg>
                              <span className="tv-text">Energy meter</span>
                            </span>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li role="none" className="tv-li">
                      <div className="tv-row">
                        <button
                          type="button"
                          className="tv-toggle"
                          aria-label="Toggle MedhaSense 006"
                          tabIndex={-1}
                        >
                          <svg className="icon ">
                            <use href="#i-chevron" />
                          </svg>
                        </button>
                        <input
                          type="checkbox"
                          className="form-check-input tv-check"
                          aria-label="Select MedhaSense 006"
                        />
                        <span
                          role="treeitem"
                          tabIndex={-1}
                          aria-expanded="false"
                          aria-level={3}
                          className="tv-label"
                        >
                          <svg className="icon ">
                            <use href="#i-device" />
                          </svg>
                          <span className="tv-text">MedhaSense 006</span>
                          <span className="status-badge status-Offline ms-2">Offline</span>
                        </span>
                      </div>
                      <ul role="group" className="tv-group d-none">
                        <li role="none" className="tv-li">
                          <div className="tv-row">
                            <span className="tv-toggle ph" />
                            <input
                              type="checkbox"
                              className="form-check-input tv-check"
                              aria-label="Select Gateway modem"
                            />
                            <span role="treeitem" tabIndex={-1} aria-level={4} className="tv-label">
                              <svg className="icon ">
                                <use href="#i-wave" />
                              </svg>
                              <span className="tv-text">Gateway modem</span>
                            </span>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <div className="tv-foot" id="tv-sel" aria-live="polite">
            0 selected
          </div>
        </div>
      </section>
    </AppShell>
  );
}
