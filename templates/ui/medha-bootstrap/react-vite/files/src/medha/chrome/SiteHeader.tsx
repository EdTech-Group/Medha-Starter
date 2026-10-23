// Ported from the Medha theme by medha-starter. Regenerated from the theme; build new screens from these components.
import { Link, NavLink } from "react-router";

export function SiteHeader() {
  return (
    <>
      <div className="site-topbar">
        <div className="container d-flex justify-content-between">
          <span>
            <svg className="icon ">
              <use href="#i-phone" />
            </svg>{" "}
            +91 00000 00000
          </span>
          <span>
            <svg className="icon ">
              <use href="#i-mail" />
            </svg>{" "}
            info@example.com
          </span>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg site-nav">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img
              src="/medha/medha-logo.svg"
              alt="Medha Techno Research LLP"
              width="170"
              height="50"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#siteNav"
            aria-controls="siteNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="siteNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <NavLink end to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/services" className="nav-link">
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/gallery" className="nav-link">
                  Gallery
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  Pages
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/dashboard/codes" className="dropdown-item">
                      Short codes
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/icons" className="dropdown-item">
                      Icons
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="dropdown-item">
                      Sign in
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item ms-lg-3">
                <Link to="/dashboard" className="btn btn-primary">
                  Open console
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
