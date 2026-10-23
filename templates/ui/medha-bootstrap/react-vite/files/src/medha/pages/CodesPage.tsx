// Ported from the Medha theme by medha-starter. Source: codes.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function CodesPage() {
  return (
    <AppShell title="Short codes" documentTitle="Short codes • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">COMPONENTS</div>
          <h1>Short codes</h1>
          <p>Breadcrumbs, pagination, badges, wells, button groups, input groups and alerts.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Breadcrumbs</h2>
            <p>Navigation trail</p>
          </div>
        </div>
        <div className="panel-body">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item active">Home</li>
            </ol>
          </nav>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Library</li>
            </ol>
          </nav>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Library</a>
              </li>
              <li className="breadcrumb-item active">Data</li>
            </ol>
          </nav>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Pagination</h2>
            <p>Sizes and alignment</p>
          </div>
        </div>
        <div className="panel-body">
          <nav aria-label="Pagination">
            <ul className="pagination pagination-lg">
              <li className="page-item">
                <a className="page-link" href="#">
                  «
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
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
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  »
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Pagination">
            <ul className="pagination ">
              <li className="page-item">
                <a className="page-link" href="#">
                  «
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
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
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  »
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Pagination">
            <ul className="pagination pagination-sm">
              <li className="page-item">
                <a className="page-link" href="#">
                  «
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
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
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  »
                </a>
              </li>
            </ul>
          </nav>
          <div className="d-flex justify-content-center">
            <nav aria-label="Pagination">
              <ul className="pagination mb-0">
                <li className="page-item">
                  <a className="page-link" href="#">
                    «
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item active">
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
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    5
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    »
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Badges</h2>
            <p>Pills, in buttons and in lists</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="d-flex flex-wrap gap-2 mb-3">
            <span className="badge rounded-pill bg-primary">1</span>
            <span className="badge rounded-pill bg-success">22</span>
            <span className="badge rounded-pill bg-info">30</span>
            <span className="badge rounded-pill bg-warning">412</span>
            <span className="badge rounded-pill bg-danger">999</span>
          </div>
          <div className="d-flex flex-wrap gap-2 mb-3">
            <button className="btn btn-primary">
              Inbox <span className="badge bg-light text-dark">5021</span>
            </button>
            <button className="btn btn-secondary">
              Profile visits <span className="badge bg-light text-dark">14</span>
            </button>
          </div>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Messages<span className="badge bg-primary rounded-pill">14</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Bookmarks<span className="badge bg-success rounded-pill">30</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Notifications<span className="badge bg-danger rounded-pill">2</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Wells</h2>
            <p>Inset content blocks</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="well mb-3">
            There are many variations of passages of Lorem Ipsum available, but the majority have
            suffered alteration in some form.
          </div>
          <div className="well well-lg mb-3">
            It is a long established fact that a reader will be distracted by the readable content
            of a page when looking at its layout.
          </div>
          <div className="well well-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Button groups</h2>
            <p>Groups, toolbars, sizes and split dropdowns</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="btn-group mb-3" role="group">
            <button className="btn btn-outline-secondary">Left</button>
            <button className="btn btn-outline-secondary">Middle</button>
            <button className="btn btn-outline-secondary">Right</button>
          </div>
          <div className="btn-toolbar mb-3 gap-2">
            <div className="btn-group">
              <button className="btn btn-primary">1</button>
              <button className="btn btn-primary">2</button>
              <button className="btn btn-primary">3</button>
            </div>
            <div className="btn-group">
              <button className="btn btn-secondary">4</button>
              <button className="btn btn-secondary">5</button>
            </div>
          </div>
          <div className="btn-group mb-3">
            <button className="btn btn-primary">Action</button>
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
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else
                </a>
              </li>
            </ul>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-lg">Block level button</button>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Input groups</h2>
            <p>Add-ons and buttons</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input className="form-control" placeholder="Username" aria-label="Username" />
          </div>
          <div className="input-group mb-3">
            <input className="form-control" placeholder="Recipient" aria-label="Recipient" />
            <span className="input-group-text">@example.com</span>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">$</span>
            <input className="form-control" aria-label="Amount" />
            <span className="input-group-text">.00</span>
          </div>
          <div className="input-group">
            <input className="form-control" placeholder="Search for…" aria-label="Search" />
            <button className="btn btn-primary">Go!</button>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Dismissible alerts</h2>
            <p>With headings</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <h4 className="alert-heading" style={{ fontSize: "14px" }}>
              Well done!
            </h4>
            You successfully read this important alert message.
            <button className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
          </div>
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <h4 className="alert-heading" style={{ fontSize: "14px" }}>
              Warning!
            </h4>
            Best check yourself, you are not looking too good.
            <button className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
          </div>
        </div>
      </section>
    </AppShell>
  );
}
