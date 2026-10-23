// Ported from the Medha theme by medha-starter. Source: navigation.html. Regenerated from the theme; build new screens from these components.
import type { CSSProperties } from "react";
import { AppShell } from "../../components/medha/AppShell";

export default function NavigationPage() {
  return (
    <AppShell title="Navigation" documentTitle="Navigation • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">BOOTSTRAP KIT</div>
          <h1>Navigation</h1>
          <p>Navs, tabs, pills, breadcrumbs and responsive navbars.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Navbars</h2>
            <p>
              Responsive navbars with collapse, dropdown and search — resize the window to see the
              toggler
            </p>
          </div>
        </div>
        <div className="panel-body">
          <nav className="navbar navbar-expand-lg navbar-light nb-light mb-3 rounded">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Medha
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#nb1"
                aria-controls="nb1"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="nb1">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <a className="nav-link active" href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Features
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                      Sites
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Ahmedabad
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Vadodara
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Surat
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">
                      Disabled
                    </a>
                  </li>
                </ul>
                <form className="d-flex gap-2" onSubmit={(event) => event.preventDefault()}>
                  <input
                    className="form-control form-control-sm"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-primary btn-sm">Search</button>
                </form>
              </div>
            </div>
          </nav>
          <nav className="navbar navbar-expand-lg navbar-dark nb-brown mb-3 rounded">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Medha
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#nb2"
                aria-controls="nb2"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="nb2">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <a className="nav-link active" href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Features
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                      Sites
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Ahmedabad
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Vadodara
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Surat
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">
                      Disabled
                    </a>
                  </li>
                </ul>
                <form className="d-flex gap-2" onSubmit={(event) => event.preventDefault()}>
                  <input
                    className="form-control form-control-sm"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-light btn-sm">Search</button>
                </form>
              </div>
            </div>
          </nav>
          <nav className="navbar navbar-expand-lg navbar-dark nb-amber mb-3 rounded">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Medha
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#nb3"
                aria-controls="nb3"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="nb3">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <a className="nav-link active" href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Features
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                      Sites
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Ahmedabad
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Vadodara
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Surat
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">
                      Disabled
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Navs</h2>
            <p>Base nav, tabs, pills, fill/justified and vertical</p>
          </div>
        </div>
        <div className="panel-body">
          <ul className="nav mb-3">
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
              <a className="nav-link disabled" href="#">
                Disabled
              </a>
            </li>
          </ul>
          <ul className="nav nav-tabs mb-3">
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
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">
                More
              </a>
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
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                Disabled
              </a>
            </li>
          </ul>
          <ul className="nav nav-pills mb-3">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Active
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pill
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pill
              </a>
            </li>
          </ul>
          <ul className="nav nav-pills nav-fill mb-3">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Fill
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Longer link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
          </ul>
          <ul className="nav nav-pills nav-justified">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Justified
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
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Vertical pills with tab panes</h2>
            <p>JavaScript tabs</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-3">
              <div className="nav flex-column nav-pills mb-3 mb-md-0" role="tablist">
                <button
                  className="nav-link active text-start"
                  data-bs-toggle="pill"
                  data-bs-target="#vp1"
                  type="button"
                >
                  Overview
                </button>
                <button
                  className="nav-link text-start"
                  data-bs-toggle="pill"
                  data-bs-target="#vp2"
                  type="button"
                >
                  Gateways
                </button>
                <button
                  className="nav-link text-start"
                  data-bs-toggle="pill"
                  data-bs-target="#vp3"
                  type="button"
                >
                  Reports
                </button>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="vp1">
                  <p>Overview content.</p>
                </div>
                <div className="tab-pane fade" id="vp2">
                  <p>Gateways content.</p>
                </div>
                <div className="tab-pane fade" id="vp3">
                  <p>Reports content.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Breadcrumbs</h2>
            <p>Dividers and trails</p>
          </div>
        </div>
        <div className="panel-body">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Gateways</a>
              </li>
              <li className="breadcrumb-item active">Surat</li>
            </ol>
          </nav>
          <nav style={{ "--bs-breadcrumb-divider": "'›'" } as CSSProperties}>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Custom divider</li>
            </ol>
          </nav>
        </div>
      </section>
    </AppShell>
  );
}
