// Ported from the Medha theme by medha-starter. Source: general.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function GeneralPage() {
  return (
    <AppShell title="General elements" documentTitle="General elements • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">COMPONENTS</div>
          <h1>General elements</h1>
          <p>Contextual panels, modals, tabs, tooltips, popovers, scrollspy and accordion.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Contextual panels</h2>
            <p>Six panel styles</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-6 col-xl-4">
              <div className="card ctx ctx-d mb-3">
                <div className="card-header">Default panel</div>
                <div className="card-body">Panel content using the default contextual style.</div>
              </div>
            </div>
            <div className="col-md-6 col-xl-4">
              <div className="card ctx ctx-a mb-3">
                <div className="card-header">Primary panel</div>
                <div className="card-body">Panel content using the primary contextual style.</div>
              </div>
            </div>
            <div className="col-md-6 col-xl-4">
              <div className="card ctx ctx-s mb-3">
                <div className="card-header">Success panel</div>
                <div className="card-body">Panel content using the success contextual style.</div>
              </div>
            </div>
            <div className="col-md-6 col-xl-4">
              <div className="card ctx ctx-i mb-3">
                <div className="card-header">Info panel</div>
                <div className="card-body">Panel content using the info contextual style.</div>
              </div>
            </div>
            <div className="col-md-6 col-xl-4">
              <div className="card ctx ctx-w mb-3">
                <div className="card-header">Warning panel</div>
                <div className="card-body">Panel content using the warning contextual style.</div>
              </div>
            </div>
            <div className="col-md-6 col-xl-4">
              <div className="card ctx ctx-r mb-3">
                <div className="card-header">Danger panel</div>
                <div className="card-body">Panel content using the danger contextual style.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Modals</h2>
            <p>Dialog examples</p>
          </div>
        </div>
        <div className="panel-body">
          <button className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#m1">
            Launch modal
          </button>
          <button
            className="btn btn-outline-secondary me-2"
            data-bs-toggle="modal"
            data-bs-target="#m2"
          >
            New message
          </button>
          <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#m3">
            Small modal
          </button>{" "}
          <div className="modal fade" id="m1" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal title</h5>
                  <button className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">Sample modal body text for the Medha theme.</div>
                <div className="modal-footer">
                  <button className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="modal fade" id="m2" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">New message</h5>
                  <button className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <label className="form-label" htmlFor="mr">
                    Recipient
                  </label>
                  <input id="mr" className="form-control mb-3" />
                  <label className="form-label" htmlFor="mm">
                    Message
                  </label>
                  <textarea id="mm" className="form-control" rows={3} />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button className="btn btn-primary">Send</button>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="modal fade" id="m3" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-sm modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">Small modal.</div>
                <div className="modal-footer">
                  <button className="btn btn-primary btn-sm" data-bs-dismiss="modal">
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Tabs</h2>
            <p>Horizontal tabs</p>
          </div>
        </div>
        <div className="panel-body">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <button
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#t1"
                type="button"
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#t2" type="button">
                Profile
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#t3" type="button">
                Messages
              </button>
            </li>
          </ul>
          <div className="tab-content pt-3">
            <div className="tab-pane fade show active" id="t1">
              <p>Home tab content.</p>
            </div>
            <div className="tab-pane fade" id="t2">
              <p>Profile tab content.</p>
            </div>
            <div className="tab-pane fade" id="t3">
              <p>Messages tab content.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Tooltips &amp; popovers</h2>
            <p>Hover or click</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-outline-secondary"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Tooltip on top"
            >
              Top
            </button>
            <button
              className="btn btn-outline-secondary"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="Tooltip on right"
            >
              Right
            </button>
            <button
              className="btn btn-outline-secondary"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Tooltip on bottom"
            >
              Bottom
            </button>
            <button
              className="btn btn-outline-primary"
              data-bs-toggle="popover"
              data-bs-placement="top"
              title="Popover title"
              data-bs-content="Popover content for the Medha theme."
            >
              Popover
            </button>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Scrollspy</h2>
            <p>Scroll the box on the right</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-4">
              <div id="spy-list" className="list-group">
                <a className="list-group-item list-group-item-action" href="#sp1">
                  Item 1
                </a>
                <a className="list-group-item list-group-item-action" href="#sp2">
                  Item 2
                </a>
                <a className="list-group-item list-group-item-action" href="#sp3">
                  Item 3
                </a>
              </div>
            </div>
            <div className="col-8">
              <div
                data-bs-spy="scroll"
                data-bs-target="#spy-list"
                data-bs-offset="0"
                className="scrollspy-box"
                tabIndex={0}
              >
                <h4 id="sp1">Item 1</h4>
                <p>
                  Gateway telemetry arrives every few seconds and is aggregated per site. Scroll
                  this box to see the list highlight change. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </p>
                <h4 id="sp2">Item 2</h4>
                <p>
                  Alerts are grouped by severity and can be acknowledged individually. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat.
                </p>
                <h4 id="sp3">Item 3</h4>
                <p>
                  Reports export fleet data as CSV. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                  est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Accordion</h2>
            <p>Collapsible sections</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="accordion" id="acc2">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#a0"
                >
                  Product 1
                </button>
              </h2>
              <div id="a0" className="accordion-collapse collapse show" data-bs-parent="#acc2">
                <div className="accordion-body">Details for product 1.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#a1"
                >
                  Product 2
                </button>
              </h2>
              <div id="a1" className="accordion-collapse collapse" data-bs-parent="#acc2">
                <div className="accordion-body">Details for product 2.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#a2"
                >
                  Product 3
                </button>
              </h2>
              <div id="a2" className="accordion-collapse collapse" data-bs-parent="#acc2">
                <div className="accordion-body">Details for product 3.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>More modals</h2>
            <p>Scrollable, static backdrop, sizes, fullscreen and offcanvas</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#m4"
            >
              Scrollable
            </button>
            <button
              className="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#m5"
            >
              Static backdrop
            </button>
            <button
              className="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#m6"
            >
              Large
            </button>
            <button
              className="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#m7"
            >
              Fullscreen
            </button>
            <button
              className="btn btn-outline-primary"
              data-bs-toggle="offcanvas"
              data-bs-target="#ocEnd"
            >
              Offcanvas right
            </button>
            <button
              className="btn btn-outline-primary"
              data-bs-toggle="offcanvas"
              data-bs-target="#ocBottom"
            >
              Offcanvas bottom
            </button>
          </div>
          <div className="modal fade" id="m4" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Scrollable modal</h5>
                  <button className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <p>
                    Long content paragraph. Gateway telemetry arrives every few seconds and is
                    aggregated per site for reporting.
                  </p>
                  <p>
                    Long content paragraph. Gateway telemetry arrives every few seconds and is
                    aggregated per site for reporting.
                  </p>
                  <p>
                    Long content paragraph. Gateway telemetry arrives every few seconds and is
                    aggregated per site for reporting.
                  </p>
                  <p>
                    Long content paragraph. Gateway telemetry arrives every few seconds and is
                    aggregated per site for reporting.
                  </p>
                  <p>
                    Long content paragraph. Gateway telemetry arrives every few seconds and is
                    aggregated per site for reporting.
                  </p>
                  <p>
                    Long content paragraph. Gateway telemetry arrives every few seconds and is
                    aggregated per site for reporting.
                  </p>
                  <p>
                    Long content paragraph. Gateway telemetry arrives every few seconds and is
                    aggregated per site for reporting.
                  </p>
                  <p>
                    Long content paragraph. Gateway telemetry arrives every few seconds and is
                    aggregated per site for reporting.
                  </p>
                  <p>
                    Long content paragraph. Gateway telemetry arrives every few seconds and is
                    aggregated per site for reporting.
                  </p>
                  <p>
                    Long content paragraph. Gateway telemetry arrives every few seconds and is
                    aggregated per site for reporting.
                  </p>
                  <p>
                    Long content paragraph. Gateway telemetry arrives every few seconds and is
                    aggregated per site for reporting.
                  </p>
                  <p>
                    Long content paragraph. Gateway telemetry arrives every few seconds and is
                    aggregated per site for reporting.
                  </p>
                  <p>
                    Long content paragraph. Gateway telemetry arrives every few seconds and is
                    aggregated per site for reporting.
                  </p>
                  <p>
                    Long content paragraph. Gateway telemetry arrives every few seconds and is
                    aggregated per site for reporting.
                  </p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" data-bs-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="m5"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Static backdrop</h5>
                </div>
                <div className="modal-body">
                  Clicking outside will not close this modal. Use a button.
                </div>
                <div className="modal-footer">
                  <button className="btn btn-outline-secondary" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button className="btn btn-primary" data-bs-dismiss="modal">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="m6" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Large modal</h5>
                  <button className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">Large modal body.</div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="m7" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-fullscreen">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Fullscreen modal</h5>
                  <button className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">Fullscreen content.</div>
              </div>
            </div>
          </div>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="ocEnd"
            aria-labelledby="ocEndL"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="ocEndL">
                Offcanvas
              </h5>
              <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            <div className="offcanvas-body">Offcanvas panel content slides in from the right.</div>
          </div>
          <div
            className="offcanvas offcanvas-bottom"
            tabIndex={-1}
            id="ocBottom"
            aria-labelledby="ocBL"
            style={{ height: "30vh" }}
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="ocBL">
                Bottom panel
              </h5>
              <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            <div className="offcanvas-body">Content from the bottom.</div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
