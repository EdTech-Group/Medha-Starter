// Ported from the Medha theme by medha-starter. Source: buttons.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function ButtonsPage() {
  return (
    <AppShell title={"Buttons & badges"} documentTitle={"Buttons & badges • Medha IoT"}>
      <section className="page-heading">
        <div>
          <div className="eyebrow">COMPONENTS</div>
          <h1>Buttons &amp; badges</h1>
          <p>Buttons, badges, alerts and navigation in the Medha palette.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Buttons</h2>
            <p>Solid, outline and sized buttons using the Medha palette</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="d-flex flex-wrap gap-2 mb-3">
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-success">Success</button>
            <button className="btn btn-warning">Warning</button>
            <button className="btn btn-danger">Danger</button>
            <button className="btn btn-info">Info</button>
            <button className="btn btn-light">Light</button>
            <button className="btn btn-dark">Dark</button>
          </div>
          <div className="d-flex flex-wrap gap-2 mb-3">
            <button className="btn btn-outline-primary">Primary</button>
            <button className="btn btn-outline-secondary">Secondary</button>
            <button className="btn btn-outline-success">Success</button>
            <button className="btn btn-outline-warning">Warning</button>
            <button className="btn btn-outline-danger">Danger</button>
            <button className="btn btn-outline-info">Info</button>
          </div>
          <div className="d-flex flex-wrap align-items-center gap-2">
            <button className="btn btn-primary btn-lg">Large</button>
            <button className="btn btn-primary">Default</button>
            <button className="btn btn-primary btn-sm">Small</button>
            <button className="btn btn-primary" disabled>
              Disabled
            </button>
            <button className="btn btn-primary">
              <svg className="icon ">
                <use href="#i-plus" />
              </svg>{" "}
              With icon
            </button>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Badges, alerts &amp; progress</h2>
            <p>Status feedback components</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="d-flex flex-wrap gap-2 mb-4">
            <span className="badge bg-primary">Primary</span>
            <span className="badge bg-secondary">Secondary</span>
            <span className="badge bg-success">Success</span>
            <span className="badge bg-warning">Warning</span>
            <span className="badge bg-danger">Danger</span>
            <span className="badge bg-info">Info</span>
          </div>
          <div className="alert alert-primary" role="alert">
            <strong>Primary.</strong> Sample message for gateway events.
          </div>
          <div className="alert alert-success" role="alert">
            <strong>Success.</strong> Sample message for gateway events.
          </div>
          <div className="alert alert-warning" role="alert">
            <strong>Warning.</strong> Sample message for gateway events.
          </div>
          <div className="alert alert-danger" role="alert">
            <strong>Danger.</strong> Sample message for gateway events.
          </div>
          <div className="progress mb-2">
            <div className="progress-bar" style={{ width: "72%" }}>
              72%
            </div>
          </div>
          <div className="progress">
            <div className="progress-bar bg-success" style={{ width: "45%" }} />
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Dropdowns, pills &amp; pagination</h2>
            <p>Navigation components</p>
          </div>
        </div>
        <div className="panel-body">
          <ul className="nav nav-pills mb-4">
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
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
          </ul>
          <div className="dropdown mb-4">
            <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
              Dropdown
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
            </ul>
          </div>
          <nav aria-label="Pagination">
            <ul className="pagination mb-0">
              <li className="page-item disabled">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Dropdown buttons</h2>
            <p>Variants and directions</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="d-flex flex-wrap gap-2 mb-3">
            <div className="btn-group">
              <button
                className="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Primary
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button
                className="btn btn-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Secondary
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button
                className="btn btn-success dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Success
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button
                className="btn btn-warning dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Warning
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button
                className="btn btn-danger dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Danger
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button
                className="btn btn-info dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Info
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <div className="btn-group dropup">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropup
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group dropend">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropend
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group dropstart">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropstart
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group ">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Split buttons</h2>
            <p>Primary action with a menu</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="d-flex flex-wrap gap-2">
            <div className="btn-group">
              <button className="btn btn-primary">Primary</button>
              <button
                className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="visually-hidden">Toggle</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button className="btn btn-secondary">Secondary</button>
              <button
                className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="visually-hidden">Toggle</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button className="btn btn-success">Success</button>
              <button
                className="btn btn-success dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="visually-hidden">Toggle</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button className="btn btn-warning">Warning</button>
              <button
                className="btn btn-warning dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="visually-hidden">Toggle</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button className="btn btn-danger">Danger</button>
              <button
                className="btn btn-danger dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="visually-hidden">Toggle</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-group">
              <button className="btn btn-info">Info</button>
              <button
                className="btn btn-info dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="visually-hidden">Toggle</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Toggle buttons</h2>
            <p>Single toggle, checkbox and radio button groups</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="d-flex flex-wrap gap-3 align-items-center">
            <button
              className="btn btn-outline-primary"
              data-bs-toggle="button"
              {...{ autoComplete: "off" }}
            >
              Toggle button
            </button>
            <button
              className="btn btn-primary active"
              data-bs-toggle="button"
              aria-pressed="true"
              {...{ autoComplete: "off" }}
            >
              Active toggle
            </button>
            <div className="btn-group" role="group">
              <input
                type="checkbox"
                className="btn-check"
                id="tb1"
                autoComplete="off"
                defaultChecked
              />
              <label className="btn btn-outline-primary" htmlFor="tb1">
                Checkbox 1
              </label>
              <input type="checkbox" className="btn-check" id="tb2" autoComplete="off" />
              <label className="btn btn-outline-primary" htmlFor="tb2">
                Checkbox 2
              </label>
              <input type="checkbox" className="btn-check" id="tb3" autoComplete="off" />
              <label className="btn btn-outline-primary" htmlFor="tb3">
                Checkbox 3
              </label>
            </div>
            <div className="btn-group" role="group">
              <input
                type="radio"
                className="btn-check"
                name="tbr"
                id="tr1"
                autoComplete="off"
                defaultChecked
              />
              <label className="btn btn-outline-secondary" htmlFor="tr1">
                Day
              </label>
              <input type="radio" className="btn-check" name="tbr" id="tr2" autoComplete="off" />
              <label className="btn btn-outline-secondary" htmlFor="tr2">
                Week
              </label>
              <input type="radio" className="btn-check" name="tbr" id="tr3" autoComplete="off" />
              <label className="btn btn-outline-secondary" htmlFor="tr3">
                Month
              </label>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
