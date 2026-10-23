// Ported from the Medha theme by medha-starter. Regenerated from the theme; build new screens from these components.
import { Link } from "react-router";

export function Topbar({ title }: { readonly title: string }) {
  return (
    <header className="topbar">
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn icon-btn mobile-menu"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebar"
          aria-controls="sidebar"
          aria-label="Open navigation"
        >
          <svg className="icon ">
            <use href="#i-menu" />
          </svg>
        </button>
        <span className="breadcrumb-label">
          Workspace <span>/</span> <strong>{title}</strong>
        </span>
      </div>{" "}
      <div className="top-actions">
        <form
          className="top-search d-none d-md-block"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="visually-hidden" htmlFor="top-search">
            Search
          </label>
          <input id="top-search" type="search" className="form-control" placeholder="Search…" />
        </form>
        <span className="demo-tag">DEMO WORKSPACE</span>
        <Link to="/dashboard" className="btn icon-btn notification-button" aria-label="Alerts">
          <svg className="icon ">
            <use href="#i-bell" />
          </svg>
          <span />
        </Link>
        <div className="dropdown">
          <button
            className="avatar avatar-sm border-0"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-label="Account menu"
          >
            MA
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link to="/login" className="dropdown-item">
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
