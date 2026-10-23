// Ported from the Medha theme by medha-starter. Regenerated from the theme; build new screens from these components.
import { Link, NavLink } from "react-router";

export function Sidebar() {
  return (
    <aside
      className="sidebar offcanvas offcanvas-start"
      tabIndex={-1}
      id="sidebar"
      aria-labelledby="brand-label"
    >
      {" "}
      <div className="brand">
        <Link to="/dashboard">
          <img
            src="/medha/medha-logo.svg"
            alt="Medha Techno Research LLP"
            width="220"
            height="65"
          />
        </Link>
        <span id="brand-label">IOT OPERATIONS CONSOLE</span>
      </div>{" "}
      <div className="workspace">
        <span className="workspace-icon">M</span>
        <div>
          <strong>Medha workspace</strong>
          <small>Industrial IoT platform</small>
        </div>
        <span className="workspace-dot" />
      </div>{" "}
      <div className="nav-label">WORKSPACE</div>
      <nav aria-label="Workspace" className="nav flex-column sidebar-nav mb-3">
        <NavLink to="/dashboard" className="nav-link">
          <svg className="icon ">
            <use href="#i-grid" />
          </svg>
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/components" className="nav-link">
          <svg className="icon ">
            <use href="#i-layout" />
          </svg>
          Component explorer
        </NavLink>
      </nav>
      <div className="nav-label">COMPONENTS</div>
      <nav aria-label="Components" className="nav flex-column sidebar-nav mb-3">
        <NavLink to="/dashboard/buttons" className="nav-link">
          <svg className="icon ">
            <use href="#i-cursor" />
          </svg>
          Buttons &amp; badges
        </NavLink>
        <NavLink to="/dashboard/grids" className="nav-link">
          <svg className="icon ">
            <use href="#i-layout" />
          </svg>
          Grids
        </NavLink>
        <NavLink to="/dashboard/typography" className="nav-link">
          <svg className="icon ">
            <use href="#i-type" />
          </svg>
          Typography
        </NavLink>
        <NavLink to="/dashboard/icons" className="nav-link">
          <svg className="icon ">
            <use href="#i-star" />
          </svg>
          Icons
        </NavLink>
        <NavLink to="/dashboard/general" className="nav-link">
          <svg className="icon ">
            <use href="#i-settings" />
          </svg>
          General elements
        </NavLink>
        <NavLink to="/dashboard/media" className="nav-link">
          <svg className="icon ">
            <use href="#i-user" />
          </svg>
          Media objects
        </NavLink>
        <NavLink to="/dashboard/widgets" className="nav-link">
          <svg className="icon ">
            <use href="#i-grid" />
          </svg>
          Widgets
        </NavLink>
        <NavLink to="/dashboard/tree" className="nav-link">
          <svg className="icon ">
            <use href="#i-share" />
          </svg>
          Tree diagram
        </NavLink>
        <NavLink to="/dashboard/tree-editor" className="nav-link">
          <svg className="icon ">
            <use href="#i-edit" />
          </svg>
          Tree editor
        </NavLink>
        <NavLink to="/dashboard/uml-editor" className="nav-link">
          <svg className="icon ">
            <use href="#i-layout" />
          </svg>
          UML editor
        </NavLink>
        <NavLink to="/dashboard/math-editor" className="nav-link">
          <svg className="icon ">
            <use href="#i-type" />
          </svg>
          MathML editor
        </NavLink>
        <NavLink to="/dashboard/vedic-editor" className="nav-link">
          <svg className="icon ">
            <use href="#i-file" />
          </svg>
          Vedic editor
        </NavLink>
        <NavLink to="/dashboard/colors" className="nav-link">
          <svg className="icon ">
            <use href="#i-settings" />
          </svg>
          Colour schemes
        </NavLink>
        <NavLink to="/dashboard/codes" className="nav-link">
          <svg className="icon ">
            <use href="#i-layout" />
          </svg>
          Short codes
        </NavLink>
      </nav>
      <div className="nav-label">BOOTSTRAP KIT</div>
      <nav aria-label="Bootstrap Kit" className="nav flex-column sidebar-nav mb-3">
        <NavLink to="/dashboard/navigation" className="nav-link">
          <svg className="icon ">
            <use href="#i-menu" />
          </svg>
          Navigation
        </NavLink>
        <NavLink to="/dashboard/cards" className="nav-link">
          <svg className="icon ">
            <use href="#i-layout" />
          </svg>
          Cards &amp; lists
        </NavLink>
        <NavLink to="/dashboard/feedback" className="nav-link">
          <svg className="icon ">
            <use href="#i-alert" />
          </svg>
          Feedback
        </NavLink>
        <NavLink to="/dashboard/carousels" className="nav-link">
          <svg className="icon ">
            <use href="#i-image" />
          </svg>
          Carousels &amp; accordions
        </NavLink>
      </nav>
      <div className="nav-label">WEBSITE</div>
      <nav aria-label="Website" className="nav flex-column sidebar-nav mb-3">
        <NavLink end to="/" className="nav-link">
          <svg className="icon ">
            <use href="#i-home" />
          </svg>
          Home
        </NavLink>
        <NavLink to="/about" className="nav-link">
          <svg className="icon ">
            <use href="#i-users" />
          </svg>
          About
        </NavLink>
        <NavLink to="/services" className="nav-link">
          <svg className="icon ">
            <use href="#i-award" />
          </svg>
          Services
        </NavLink>
        <NavLink to="/gallery" className="nav-link">
          <svg className="icon ">
            <use href="#i-image" />
          </svg>
          Gallery
        </NavLink>
        <NavLink to="/contact" className="nav-link">
          <svg className="icon ">
            <use href="#i-mail" />
          </svg>
          Contact
        </NavLink>
      </nav>
      <div className="nav-label">APPS</div>
      <nav aria-label="Apps" className="nav flex-column sidebar-nav mb-3">
        <NavLink to="/dashboard/inbox" className="nav-link">
          <svg className="icon ">
            <use href="#i-mail" />
          </svg>
          Inbox
        </NavLink>
        <NavLink to="/dashboard/compose" className="nav-link">
          <svg className="icon ">
            <use href="#i-edit" />
          </svg>
          Compose
        </NavLink>
      </nav>
      <div className="nav-label">FORMS &amp; DATA</div>
      <nav aria-label={"Forms & Data"} className="nav flex-column sidebar-nav mb-3">
        <NavLink to="/dashboard/inputs" className="nav-link">
          <svg className="icon ">
            <use href="#i-form" />
          </svg>
          Inputs
        </NavLink>
        <NavLink to="/dashboard/validation" className="nav-link">
          <svg className="icon ">
            <use href="#i-check" />
          </svg>
          Validation
        </NavLink>
        <NavLink to="/dashboard/tables" className="nav-link">
          <svg className="icon ">
            <use href="#i-table" />
          </svg>
          Tables
        </NavLink>
        <NavLink to="/dashboard/charts" className="nav-link">
          <svg className="icon ">
            <use href="#i-chart" />
          </svg>
          Charts
        </NavLink>
        <NavLink to="/dashboard/calendar" className="nav-link">
          <svg className="icon ">
            <use href="#i-calendar" />
          </svg>
          Calendar
        </NavLink>
        <NavLink to="/dashboard/editor" className="nav-link">
          <svg className="icon ">
            <use href="#i-edit" />
          </svg>
          Editor
        </NavLink>
      </nav>
      <div className="nav-label">PAGES</div>
      <nav aria-label="Pages" className="nav flex-column sidebar-nav mb-3">
        <NavLink to="/login" className="nav-link">
          <svg className="icon ">
            <use href="#i-lock" />
          </svg>
          Sign in
        </NavLink>
        <NavLink to="/register" className="nav-link">
          <svg className="icon ">
            <use href="#i-user" />
          </svg>
          Sign up
        </NavLink>
        <NavLink to="/dashboard/faq" className="nav-link">
          <svg className="icon ">
            <use href="#i-help" />
          </svg>
          FAQ
        </NavLink>
        <NavLink to="/dashboard/blank" className="nav-link">
          <svg className="icon ">
            <use href="#i-file" />
          </svg>
          Blank page
        </NavLink>
        <NavLink to="/404" className="nav-link">
          <svg className="icon ">
            <use href="#i-alert" />
          </svg>
          Error 404
        </NavLink>
        <NavLink to="/500" className="nav-link">
          <svg className="icon ">
            <use href="#i-alert" />
          </svg>
          Error 500
        </NavLink>
      </nav>{" "}
      <div className="sidebar-bottom">
        <div className="user">
          <span className="avatar">MA</span>
          <div>
            <strong>Medha Admin</strong>
            <small>Workspace administrator</small>
          </div>
        </div>
      </div>{" "}
    </aside>
  );
}
