// Ported from the Medha theme by medha-starter. Source: cards.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function CardsPage() {
  return (
    <AppShell title={"Cards & lists"} documentTitle={"Cards & lists • Medha IoT"}>
      <section className="page-heading">
        <div>
          <div className="eyebrow">BOOTSTRAP KIT</div>
          <h1>Cards &amp; lists</h1>
          <p>Content cards, image cards, card groups and list groups.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Image cards</h2>
            <p>Top image, title, text and action</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card h-100 ctx">
                <div
                  className="card-img-top card-art"
                  style={{
                    background:
                      "linear-gradient(135deg,var(--ms-4a2e1b,#4a2e1b),var(--ms-0f0804,#0f0804))",
                  }}
                >
                  <svg className="icon ">
                    <use href="#i-image" />
                  </svg>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Image card</h5>
                  <p className="card-text">
                    Sample text that builds on the card title and makes up the bulk of the card
                    content.
                  </p>
                  <a href="#" className="btn btn-primary btn-sm">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 ctx">
                <div
                  className="card-img-top card-art"
                  style={{
                    background:
                      "linear-gradient(135deg,var(--ms-b45309,#b45309),var(--ms-4a2e1b,#4a2e1b))",
                  }}
                >
                  <svg className="icon ">
                    <use href="#i-image" />
                  </svg>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Another card</h5>
                  <p className="card-text">
                    Sample text that builds on the card title and makes up the bulk of the card
                    content.
                  </p>
                  <a href="#" className="btn btn-primary btn-sm">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 ctx">
                <div
                  className="card-img-top card-art"
                  style={{
                    background:
                      "linear-gradient(135deg,var(--ms-d99b26,#d99b26),var(--ms-b45309,#b45309))",
                  }}
                >
                  <svg className="icon ">
                    <use href="#i-image" />
                  </svg>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Third card</h5>
                  <p className="card-text">
                    Sample text that builds on the card title and makes up the bulk of the card
                    content.
                  </p>
                  <a href="#" className="btn btn-primary btn-sm">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Content cards</h2>
            <p>Header, footer, titles, links and horizontal layout</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card ctx">
                <div className="card-header">Featured</div>
                <div className="card-body">
                  <h5 className="card-title">Special title</h5>
                  <p className="card-text">Supporting text below as a natural lead-in.</p>
                  <a href="#" className="btn btn-primary btn-sm">
                    Open
                  </a>
                </div>
                <div className="card-footer text-muted">2 days ago</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card ctx text-center">
                <div className="card-body">
                  <h5 className="card-title">Centered</h5>
                  <p className="card-text">Text alignment utilities work on cards.</p>
                  <a href="#" className="card-link">
                    Card link
                  </a>
                  <a href="#" className="card-link">
                    Another link
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card ctx">
                <div className="card-header">
                  <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                      <a className="nav-link active" href="#">
                        Active
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Link
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <p className="card-text">Card with tabs in the header.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card ctx mt-3">
            <div className="row g-0">
              <div className="col-md-3">
                <div
                  className="card-art h-100"
                  style={{
                    background:
                      "linear-gradient(135deg,var(--ms-b45309,#b45309),var(--ms-4a2e1b,#4a2e1b))",
                    minHeight: "120px",
                  }}
                >
                  <svg className="icon ">
                    <use href="#i-image" />
                  </svg>
                </div>
              </div>
              <div className="col-md-9">
                <div className="card-body">
                  <h5 className="card-title">Horizontal card</h5>
                  <p className="card-text">
                    A wider card with image on the left and supporting text on the right.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Contextual &amp; overlay cards</h2>
            <p>Background colours and image overlay</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <div className="col-6 col-md-4 col-xl-2">
              <div className="card text-white bg-primary h-100">
                <div className="card-header">Primary</div>
                <div className="card-body">
                  <p className="card-text small">Quick example text.</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-xl-2">
              <div className="card text-white bg-secondary h-100">
                <div className="card-header">Secondary</div>
                <div className="card-body">
                  <p className="card-text small">Quick example text.</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-xl-2">
              <div className="card text-white bg-success h-100">
                <div className="card-header">Success</div>
                <div className="card-body">
                  <p className="card-text small">Quick example text.</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-xl-2">
              <div className="card text-white bg-warning h-100">
                <div className="card-header">Warning</div>
                <div className="card-body">
                  <p className="card-text small">Quick example text.</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-xl-2">
              <div className="card text-white bg-danger h-100">
                <div className="card-header">Danger</div>
                <div className="card-body">
                  <p className="card-text small">Quick example text.</p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-xl-2">
              <div className="card text-white bg-info h-100">
                <div className="card-header">Info</div>
                <div className="card-body">
                  <p className="card-text small">Quick example text.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card text-white mt-3 border-0 overlay-card">
            <div className="card-img-overlay d-flex flex-column justify-content-end">
              <h5 className="card-title">Card with overlay</h5>
              <p className="card-text">Text sits on top of a gradient image area.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Card group</h2>
            <p>Equal-height attached cards</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="card-group">
            <div className="card ctx">
              <div className="card-body">
                <h5 className="card-title">Card 1</h5>
                <p className="card-text">Short supporting text for card 1.</p>
              </div>
              <div className="card-footer">
                <small className="text-muted">Updated 1 mins ago</small>
              </div>
            </div>
            <div className="card ctx">
              <div className="card-body">
                <h5 className="card-title">Card 2</h5>
                <p className="card-text">Short supporting text for card 2.</p>
              </div>
              <div className="card-footer">
                <small className="text-muted">Updated 2 mins ago</small>
              </div>
            </div>
            <div className="card ctx">
              <div className="card-body">
                <h5 className="card-title">Card 3</h5>
                <p className="card-text">Short supporting text for card 3.</p>
              </div>
              <div className="card-footer">
                <small className="text-muted">Updated 3 mins ago</small>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>List groups</h2>
            <p>Basic, active, disabled, actionable and contextual</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item active">Active item</li>
                <li className="list-group-item">Second item</li>
                <li className="list-group-item disabled">Disabled item</li>
                <li className="list-group-item">Fourth item</li>
              </ul>
            </div>
            <div className="col-md-4">
              <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action active">
                  Action active
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  Action link
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  Another link
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item list-group-item-primary">Primary item</li>
                <li className="list-group-item list-group-item-secondary">Secondary item</li>
                <li className="list-group-item list-group-item-success">Success item</li>
                <li className="list-group-item list-group-item-warning">Warning item</li>
                <li className="list-group-item list-group-item-danger">Danger item</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Flush, badge and checkbox lists</h2>
            <p>Borderless lists inside panels, with badges and inputs</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <div className="col-md-4">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Online<span className="badge bg-success rounded-pill">22</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Warning<span className="badge bg-warning rounded-pill">1</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Offline<span className="badge bg-danger rounded-pill">1</span>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id="lc1"
                    defaultChecked
                  />
                  <label htmlFor="lc1">Checklist item 1</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-2" type="checkbox" id="lc2" />
                  <label htmlFor="lc2">Checklist item 2</label>
                </li>
                <li className="list-group-item">
                  <input className="form-check-input me-2" type="checkbox" id="lc3" />
                  <label htmlFor="lc3">Checklist item 3</label>
                </li>
              </ul>
            </div>
          </div>
          <h3 className="mh mt-4">Horizontal</h3>
          <ul className="list-group list-group-horizontal-md">
            <li className="list-group-item">One</li>
            <li className="list-group-item">Two</li>
            <li className="list-group-item">Three</li>
          </ul>
        </div>
      </section>
    </AppShell>
  );
}
