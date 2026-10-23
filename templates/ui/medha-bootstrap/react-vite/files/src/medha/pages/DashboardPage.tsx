// Ported from the Medha theme by medha-starter. Source: index.html. Regenerated from the theme; build new screens from these components.
import type { CSSProperties } from "react";
import { Link } from "react-router";
import { MedhaPage } from "../../components/medha/MedhaPage";
import schemeCss from "../styles/scheme.css?inline";
import schemeScript from "../scripts/scheme";
import appScript from "../scripts/app";
import { IconLibrary } from "../chrome/IconLibrary";

export default function DashboardPage() {
  return (
    <MedhaPage
      documentTitle="Medha IoT • Operations dashboard"
      styles={[schemeCss]}
      scripts={[schemeScript, appScript]}
      bodyClass=""
    >
      <a className="skip-link" href="#main">
        Skip to dashboard
      </a>
      <IconLibrary />
      <aside
        className="sidebar offcanvas offcanvas-start"
        tabIndex={-1}
        id="sidebar"
        aria-labelledby="brand-label"
      >
        {" "}
        <div className="brand">
          <img
            src="/medha/medha-logo.svg"
            alt="Medha Techno Research LLP"
            width="220"
            height="65"
          />
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
        <nav aria-label="Main navigation" className="nav flex-column sidebar-nav mb-3">
          {" "}
          <button className="nav-link active" data-view="overview" aria-current="page">
            <svg className="icon">
              <use href="#i-grid" />
            </svg>
            Overview
          </button>{" "}
          <button className="nav-link" data-view="gateways">
            <svg className="icon">
              <use href="#i-device" />
            </svg>
            Gateways<span className="nav-count">24</span>
          </button>{" "}
          <button className="nav-link" data-view="alerts">
            <svg className="icon">
              <use href="#i-bell" />
            </svg>
            Alerts &amp; events<span className="nav-count amber">3</span>
          </button>{" "}
          <button className="nav-link" data-view="reports">
            <svg className="icon">
              <use href="#i-chart" />
            </svg>
            Reports
          </button>{" "}
        </nav>
        <div className="nav-label">COMPONENTS</div>
        <nav aria-label="Components" className="nav flex-column sidebar-nav mb-3">
          <Link to="/dashboard/buttons" className="nav-link">
            <svg className="icon ">
              <use href="#i-cursor" />
            </svg>
            Buttons &amp; badges
          </Link>
          <Link to="/dashboard/grids" className="nav-link">
            <svg className="icon ">
              <use href="#i-layout" />
            </svg>
            Grids
          </Link>
          <Link to="/dashboard/typography" className="nav-link">
            <svg className="icon ">
              <use href="#i-type" />
            </svg>
            Typography
          </Link>
          <Link to="/dashboard/icons" className="nav-link">
            <svg className="icon ">
              <use href="#i-star" />
            </svg>
            Icons
          </Link>
          <Link to="/dashboard/general" className="nav-link">
            <svg className="icon ">
              <use href="#i-settings" />
            </svg>
            General elements
          </Link>
          <Link to="/dashboard/media" className="nav-link">
            <svg className="icon ">
              <use href="#i-user" />
            </svg>
            Media objects
          </Link>
          <Link to="/dashboard/widgets" className="nav-link">
            <svg className="icon ">
              <use href="#i-grid" />
            </svg>
            Widgets
          </Link>
          <Link to="/dashboard/tree" className="nav-link">
            <svg className="icon ">
              <use href="#i-share" />
            </svg>
            Tree diagram
          </Link>
          <Link to="/dashboard/tree-editor" className="nav-link">
            <svg className="icon ">
              <use href="#i-edit" />
            </svg>
            Tree editor
          </Link>
          <Link to="/dashboard/uml-editor" className="nav-link">
            <svg className="icon ">
              <use href="#i-layout" />
            </svg>
            UML editor
          </Link>
          <Link to="/dashboard/math-editor" className="nav-link">
            <svg className="icon ">
              <use href="#i-type" />
            </svg>
            MathML editor
          </Link>
          <Link to="/dashboard/vedic-editor" className="nav-link">
            <svg className="icon ">
              <use href="#i-file" />
            </svg>
            Vedic editor
          </Link>
          <Link to="/dashboard/colors" className="nav-link">
            <svg className="icon ">
              <use href="#i-settings" />
            </svg>
            Colour schemes
          </Link>
          <Link to="/dashboard/codes" className="nav-link">
            <svg className="icon ">
              <use href="#i-layout" />
            </svg>
            Short codes
          </Link>
        </nav>
        <div className="nav-label">BOOTSTRAP KIT</div>
        <nav aria-label="Bootstrap Kit" className="nav flex-column sidebar-nav mb-3">
          <Link to="/dashboard/navigation" className="nav-link">
            <svg className="icon ">
              <use href="#i-menu" />
            </svg>
            Navigation
          </Link>
          <Link to="/dashboard/cards" className="nav-link">
            <svg className="icon ">
              <use href="#i-layout" />
            </svg>
            Cards &amp; lists
          </Link>
          <Link to="/dashboard/feedback" className="nav-link">
            <svg className="icon ">
              <use href="#i-alert" />
            </svg>
            Feedback
          </Link>
          <Link to="/dashboard/carousels" className="nav-link">
            <svg className="icon ">
              <use href="#i-image" />
            </svg>
            Carousels &amp; accordions
          </Link>
        </nav>
        <div className="nav-label">WEBSITE</div>
        <nav aria-label="Website" className="nav flex-column sidebar-nav mb-3">
          <Link to="/" className="nav-link">
            <svg className="icon ">
              <use href="#i-home" />
            </svg>
            Home
          </Link>
          <Link to="/about" className="nav-link">
            <svg className="icon ">
              <use href="#i-users" />
            </svg>
            About
          </Link>
          <Link to="/services" className="nav-link">
            <svg className="icon ">
              <use href="#i-award" />
            </svg>
            Services
          </Link>
          <Link to="/gallery" className="nav-link">
            <svg className="icon ">
              <use href="#i-image" />
            </svg>
            Gallery
          </Link>
          <Link to="/contact" className="nav-link">
            <svg className="icon ">
              <use href="#i-mail" />
            </svg>
            Contact
          </Link>
        </nav>
        <div className="nav-label">APPS</div>
        <nav aria-label="Apps" className="nav flex-column sidebar-nav mb-3">
          <Link to="/dashboard/inbox" className="nav-link">
            <svg className="icon ">
              <use href="#i-mail" />
            </svg>
            Inbox
          </Link>
          <Link to="/dashboard/compose" className="nav-link">
            <svg className="icon ">
              <use href="#i-edit" />
            </svg>
            Compose
          </Link>
        </nav>
        <div className="nav-label">FORMS &amp; DATA</div>
        <nav aria-label={"Forms & Data"} className="nav flex-column sidebar-nav mb-3">
          <Link to="/dashboard/inputs" className="nav-link">
            <svg className="icon ">
              <use href="#i-form" />
            </svg>
            Inputs
          </Link>
          <Link to="/dashboard/validation" className="nav-link">
            <svg className="icon ">
              <use href="#i-check" />
            </svg>
            Validation
          </Link>
          <Link to="/dashboard/tables" className="nav-link">
            <svg className="icon ">
              <use href="#i-table" />
            </svg>
            Tables
          </Link>
          <Link to="/dashboard/charts" className="nav-link">
            <svg className="icon ">
              <use href="#i-chart" />
            </svg>
            Charts
          </Link>
          <Link to="/dashboard/calendar" className="nav-link">
            <svg className="icon ">
              <use href="#i-calendar" />
            </svg>
            Calendar
          </Link>
          <Link to="/dashboard/editor" className="nav-link">
            <svg className="icon ">
              <use href="#i-edit" />
            </svg>
            Editor
          </Link>
        </nav>
        <div className="nav-label">PAGES</div>
        <nav aria-label="Pages" className="nav flex-column sidebar-nav mb-3">
          <Link to="/login" className="nav-link">
            <svg className="icon ">
              <use href="#i-lock" />
            </svg>
            Sign in
          </Link>
          <Link to="/register" className="nav-link">
            <svg className="icon ">
              <use href="#i-user" />
            </svg>
            Sign up
          </Link>
          <Link to="/dashboard/faq" className="nav-link">
            <svg className="icon ">
              <use href="#i-help" />
            </svg>
            FAQ
          </Link>
          <Link to="/dashboard/blank" className="nav-link">
            <svg className="icon ">
              <use href="#i-file" />
            </svg>
            Blank page
          </Link>
          <Link to="/404" className="nav-link">
            <svg className="icon ">
              <use href="#i-alert" />
            </svg>
            Error 404
          </Link>
          <Link to="/500" className="nav-link">
            <svg className="icon ">
              <use href="#i-alert" />
            </svg>
            Error 500
          </Link>
        </nav>{" "}
        <div className="sidebar-bottom">
          <div className="platform-note">
            <span className="small-dot" />
            Theme preview<small>Sample data · No live connection</small>
          </div>
          <div className="user">
            <span className="avatar">MA</span>
            <div>
              <strong>Medha Admin</strong>
              <small>Workspace administrator</small>
            </div>
          </div>
        </div>{" "}
      </aside>
      <div className="app-shell">
        <header className="topbar">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn icon-btn mobile-menu"
              data-bs-toggle="offcanvas"
              data-bs-target="#sidebar"
              aria-controls="sidebar"
              aria-label="Open navigation"
            >
              <svg className="icon">
                <use href="#i-menu" />
              </svg>
            </button>
            <span className="breadcrumb-label">
              Workspace <span>/</span> <strong id="breadcrumb">Overview</strong>
            </span>
          </div>
          <div className="top-actions">
            <span className="demo-tag">DEMO WORKSPACE</span>
            <button
              className="btn icon-btn notification-button"
              aria-label="View 3 alerts"
              data-view="alerts"
            >
              <svg className="icon">
                <use href="#i-bell" />
              </svg>
              <span />
            </button>
            <span className="avatar avatar-sm" aria-label="Medha Admin">
              MA
            </span>
          </div>
        </header>{" "}
        <main id="main" tabIndex={-1}>
          <section className="page-heading">
            <div>
              <div className="eyebrow">CONNECTED INFRASTRUCTURE</div>
              <h1 id="page-title">Operations overview</h1>
              <p id="page-subtitle">A clear view of your devices, data, and network health.</p>
            </div>
            <div className="heading-actions">
              <label className="visually-hidden" htmlFor="site-filter">
                Filter by site
              </label>
              <select className="form-select" id="site-filter">
                <option value="all">All sites</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Vadodara">Vadodara</option>
                <option value="Surat">Surat</option>
              </select>
              <button className="btn btn-primary" id="export-button">
                <svg className="icon">
                  <use href="#i-down" />
                </svg>{" "}
                Export report
              </button>
            </div>
          </section>{" "}
          <div id="overview-view" className="view">
            {" "}
            <section className="welcome-banner">
              <div>
                <div className="banner-status">
                  <span className="small-dot" />
                  NETWORK SNAPSHOT
                </div>
                <h2>Your infrastructure. In focus.</h2>
                <p>
                  <strong id="banner-online">22 of 24 gateways</strong> are online and delivering
                  telemetry.
                </p>
                <div className="banner-footer">
                  <span>
                    <svg className="icon">
                      <use href="#i-clock" />
                    </svg>{" "}
                    Sample snapshot · 09 Oct 2026, 14:30 IST
                  </span>
                </div>
              </div>
              <div className="network-art" aria-hidden="true">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <span className="network-node node-one">
                  <svg className="icon">
                    <use href="#i-sun" />
                  </svg>
                </span>
                <span className="network-node node-two">
                  <svg className="icon">
                    <use href="#i-wave" />
                  </svg>
                </span>
                <span className="network-node node-three">
                  <svg className="icon">
                    <use href="#i-device" />
                  </svg>
                </span>
                <div className="network-core">
                  <svg className="icon">
                    <use href="#i-device" />
                  </svg>
                </div>
                <span className="art-caption">MEDHASENSE NETWORK</span>
              </div>
            </section>{" "}
            <section className="row g-3 metric-row" aria-label="Network metrics">
              {" "}
              <div className="col-6 col-xl-3">
                <article className="metric-card">
                  <div className="metric-label">
                    Total gateways
                    <svg className="icon">
                      <use href="#i-device" />
                    </svg>
                  </div>
                  <div className="metric-value" id="total-stat">
                    24
                  </div>
                  <div className="metric-caption">
                    <span className="metric-neutral">3 locations</span> across your network
                  </div>
                </article>
              </div>{" "}
              <div className="col-6 col-xl-3">
                <article className="metric-card">
                  <div className="metric-label">
                    Online gateways
                    <svg className="icon">
                      <use href="#i-wave" />
                    </svg>
                  </div>
                  <div className="metric-value" id="online-stat">
                    22 <span className="metric-unit">/ 24</span>
                  </div>
                  <div className="metric-caption">
                    <span className="text-success" id="online-percent">
                      91.7%
                    </span>{" "}
                    fleet availability
                  </div>
                </article>
              </div>{" "}
              <div className="col-6 col-xl-3">
                <article className="metric-card">
                  <div className="metric-label">
                    Energy today
                    <svg className="icon">
                      <use href="#i-sun" />
                    </svg>
                  </div>
                  <div className="metric-value">
                    <span id="energy-stat">486.2</span> <span className="metric-unit">kWh</span>
                  </div>
                  <div className="metric-caption">
                    <span className="text-success">↗ 8.4%</span> vs. previous sample day
                  </div>
                </article>
              </div>{" "}
              <div className="col-6 col-xl-3">
                <article className="metric-card">
                  <div className="metric-label">
                    Open alerts
                    <svg className="icon">
                      <use href="#i-bell" />
                    </svg>
                  </div>
                  <div className="metric-value" id="alerts-stat">
                    3
                  </div>
                  <div className="metric-caption">
                    <span className="text-amber">1 critical</span>{" "}
                    <span id="alert-caption">needs your attention</span>
                  </div>
                </article>
              </div>{" "}
            </section>{" "}
            <section className="row g-3 chart-row">
              <div className="col-xl-8">
                <article className="panel chart-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Energy generation</h2>
                      <p>Aggregated solar output across selected sites</p>
                    </div>
                    <div className="period-toggle" role="group" aria-label="Chart period">
                      <button className="active" data-period="today" aria-pressed="true">
                        Today
                      </button>
                      <button data-period="week" aria-pressed="false">
                        7 days
                      </button>
                      <button data-period="month" aria-pressed="false">
                        30 days
                      </button>
                    </div>
                  </div>
                  <div className="chart-summary">
                    <strong id="chart-total">
                      486.2 <small>kWh</small>
                    </strong>
                    <span className="chart-legend">
                      <i />
                      <span id="chart-legend">Power output (kW)</span>
                    </span>
                  </div>
                  <div className="chart-wrap" id="energy-chart" />
                  <div className="chart-footnote">
                    <span id="chart-note">Sample readings · 06:00–18:00 IST</span>
                    <span>
                      Solar generation{" "}
                      <svg className="icon">
                        <use href="#i-sun" />
                      </svg>
                    </span>
                  </div>
                </article>
              </div>{" "}
              <div className="col-xl-4">
                <article className="panel health-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Network health</h2>
                      <p>Gateway connectivity at a glance</p>
                    </div>
                    <span className="soft-icon">
                      <svg className="icon">
                        <use href="#i-wave" />
                      </svg>
                    </span>
                  </div>
                  <div className="health-content">
                    <div
                      className="health-donut"
                      id="health-donut"
                      role="img"
                      aria-label="22 online, 1 warning, 1 offline"
                    >
                      <div>
                        <strong id="health-percent">
                          91.7<span>%</span>
                        </strong>
                        <small>Online availability</small>
                      </div>
                    </div>
                    <div className="health-legend">
                      <div>
                        <span>
                          <i className="dot-online" />
                          Online
                        </span>
                        <strong id="health-online">22</strong>
                      </div>
                      <div>
                        <span>
                          <i className="dot-warning" />
                          Warning
                        </span>
                        <strong id="health-warning">1</strong>
                      </div>
                      <div>
                        <span>
                          <i className="dot-offline" />
                          Offline
                        </span>
                        <strong id="health-offline">1</strong>
                      </div>
                    </div>
                  </div>
                  <button className="health-link" data-view="gateways">
                    Explore your gateways
                    <svg className="icon">
                      <use href="#i-chevron" />
                    </svg>
                  </button>
                </article>
              </div>
            </section>{" "}
            <section className="row g-3 chart-row">
              <div className="col-xl-6">
                <article className="panel h-100">
                  <div className="panel-heading">
                    <div>
                      <h2>Latest report</h2>
                      <p>Fleet totals by period (sample)</p>
                    </div>
                  </div>
                  <div className="stat-list">
                    {" "}
                    <div className="stat-row">
                      <div>
                        <strong>65,800</strong>
                        <span>Readings ingested</span>
                      </div>
                      <b>
                        20 <small>this year</small>
                      </b>
                    </div>{" "}
                    <div className="stat-row">
                      <div>
                        <strong>2,690</strong>
                        <span>Readings ingested</span>
                      </div>
                      <b>
                        40 <small>this month</small>
                      </b>
                    </div>{" "}
                    <div className="stat-row">
                      <div>
                        <strong>24,660</strong>
                        <span>Readings ingested</span>
                      </div>
                      <b>
                        30 <small>this week</small>
                      </b>
                    </div>{" "}
                    <div className="stat-row">
                      <div>
                        <strong>1,204</strong>
                        <span>Readings ingested</span>
                      </div>
                      <b>
                        10 <small>today</small>
                      </b>
                    </div>
                  </div>
                </article>
              </div>{" "}
              <div className="col-xl-6">
                <article className="panel h-100">
                  <div className="panel-heading">
                    <div>
                      <h2>Capacity &amp; uptime</h2>
                      <p>Circular progress, sample values</p>
                    </div>
                  </div>
                  <div className="ring-grid">
                    {" "}
                    <div className="ring" style={{ "--v": "92" } as CSSProperties}>
                      <span>92%</span>
                      <small>Uptime</small>
                    </div>
                    <div className="ring" style={{ "--v": "76" } as CSSProperties}>
                      <span>76%</span>
                      <small>Capacity</small>
                    </div>
                    <div className="ring" style={{ "--v": "58" } as CSSProperties}>
                      <span>58%</span>
                      <small>Storage</small>
                    </div>
                    <div className="ring" style={{ "--v": "84" } as CSSProperties}>
                      <span>84%</span>
                      <small>Signal</small>
                    </div>
                  </div>
                </article>
              </div>
            </section>{" "}
            <section className="row g-3 chart-row">
              <div className="col-6 col-xl-3">
                <article className="rev-tile rev-a">
                  <span className="rev-icon">
                    <svg className="icon ">
                      <use href="#i-chart" />
                    </svg>
                  </span>
                  <div>
                    <strong>$452</strong>
                    <small>Total revenue</small>
                  </div>
                </article>
              </div>
              <div className="col-6 col-xl-3">
                <article className="rev-tile rev-b">
                  <span className="rev-icon">
                    <svg className="icon ">
                      <use href="#i-globe" />
                    </svg>
                  </span>
                  <div>
                    <strong>$1019</strong>
                    <small>Online revenue</small>
                  </div>
                </article>
              </div>
              <div className="col-6 col-xl-3">
                <article className="rev-tile rev-c">
                  <span className="rev-icon">
                    <svg className="icon ">
                      <use href="#i-table" />
                    </svg>
                  </span>
                  <div>
                    <strong>$1012</strong>
                    <small>Expenses</small>
                  </div>
                </article>
              </div>
              <div className="col-6 col-xl-3">
                <article className="rev-tile rev-d">
                  <span className="rev-icon">
                    <svg className="icon ">
                      <use href="#i-bolt" />
                    </svg>
                  </span>
                  <div>
                    <strong>$450</strong>
                    <small>Expenditure</small>
                  </div>
                </article>
              </div>
            </section>
            <section className="social-strip chart-row">
              <div className="social-cell">
                <strong>1283+</strong>
                <small>Reviews</small>
              </div>
              <div className="social-cell">
                <strong>2262+</strong>
                <small>Visitors</small>
              </div>
              <div className="social-cell">
                <strong>1,296</strong>
                <small>Friends</small>
              </div>
              <div className="social-cell">
                <strong>647</strong>
                <small>Likes</small>
              </div>
              <div className="social-cell">
                <strong>1,997</strong>
                <small>Followers</small>
              </div>
              <div className="social-cell">
                <strong>321</strong>
                <small>Shares</small>
              </div>
            </section>
            <section className="row g-3 chart-row">
              <div className="col-xl-4">
                <article className="panel h-100">
                  <div className="panel-heading">
                    <div>
                      <h2>Chat</h2>
                      <p>Team conversation</p>
                    </div>
                  </div>
                  <div className="chat-list">
                    <div className="chat-msg ">
                      <span className="avatar avatar-sm">MC</span>
                      <div>
                        <p>Hello! Gateway MS-004 shows a warning.</p>
                        <small>06:01 AM</small>
                      </div>
                    </div>
                    <div className="chat-msg me">
                      <span className="avatar avatar-sm">AL</span>
                      <div>
                        <p>Thanks, checking the signal level now.</p>
                        <small>06:02 AM</small>
                      </div>
                    </div>
                    <div className="chat-msg ">
                      <span className="avatar avatar-sm">MC</span>
                      <div>
                        <p>Fine, let me know what you find.</p>
                        <small>06:05 AM</small>
                      </div>
                    </div>
                    <div className="chat-msg me">
                      <span className="avatar avatar-sm">AL</span>
                      <div>
                        <p>Reset done, back online.</p>
                        <small>06:20 AM</small>
                      </div>
                    </div>
                  </div>
                  <form className="chat-form" onSubmit={(event) => event.preventDefault()}>
                    <input
                      className="form-control"
                      aria-label="Message"
                      placeholder="Type a message…"
                    />
                    <button className="btn btn-primary">Send</button>
                  </form>
                </article>
              </div>
              <div className="col-xl-4">
                <article className="panel h-100">
                  <div className="panel-heading">
                    <div>
                      <h2>To-do</h2>
                      <p>Tick items off</p>
                    </div>
                  </div>
                  <div className="todo-list">
                    <label className="todo-item">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <span>Calibrate Surat gateway sensors</span>
                    </label>
                    <label className="todo-item">
                      <input className="form-check-input" type="checkbox" />
                      <span>Review weekly energy report</span>
                    </label>
                    <label className="todo-item">
                      <input className="form-check-input" type="checkbox" />
                      <span>Update firmware on GW-04</span>
                    </label>
                    <label className="todo-item">
                      <input className="form-check-input" type="checkbox" />
                      <span>Replace SIM at Vadodara</span>
                    </label>
                    <label className="todo-item">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <span>Archive March telemetry</span>
                    </label>
                  </div>
                </article>
              </div>
              <div className="col-xl-4">
                <article className="panel h-100">
                  <div className="panel-heading">
                    <div>
                      <h2>Inbox</h2>
                      <p>Latest messages</p>
                    </div>
                    <Link to="/dashboard/inbox" className="text-button">
                      Open inbox →
                    </Link>
                  </div>
                  <div className="inbox-list">
                    <div className="inbox-item">
                      <span className="avatar avatar-sm">MC</span>
                      <div>
                        <strong>Michael Chris</strong>
                        <small>Hey! I am available.</small>
                      </div>
                      <time>12:05 PM</time>
                    </div>
                    <div className="inbox-item">
                      <span className="avatar avatar-sm">AX</span>
                      <div>
                        <strong>Alexander</strong>
                        <small>Report is ready to review.</small>
                      </div>
                      <time>12:06 PM</time>
                    </div>
                    <div className="inbox-item">
                      <span className="avatar avatar-sm">DL</span>
                      <div>
                        <strong>Daniel Lucas</strong>
                        <small>Site visit confirmed.</small>
                      </div>
                      <time>01:30 PM</time>
                    </div>
                    <div className="inbox-item">
                      <span className="avatar avatar-sm">JJ</span>
                      <div>
                        <strong>Jackson Jacob</strong>
                        <small>New gateway installed.</small>
                      </div>
                      <time>01:50 PM</time>
                    </div>
                  </div>
                </article>
              </div>
            </section>
            <section className="chart-row">
              <div id="dashCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#dashCarousel"
                    data-bs-slide-to="0"
                    className="active"
                    aria-label="Slide 1"
                  />
                  <button
                    type="button"
                    data-bs-target="#dashCarousel"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  />
                  <button
                    type="button"
                    data-bs-target="#dashCarousel"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  />
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div
                      className="hero-slide"
                      style={{
                        background:
                          "linear-gradient(120deg,var(--ms-4a2e1b,#4a2e1b),var(--ms-0f0804,#0f0804))",
                      }}
                    >
                      <h3>Your infrastructure. In focus.</h3>
                      <p>Live telemetry from every site.</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div
                      className="hero-slide"
                      style={{
                        background:
                          "linear-gradient(120deg,var(--ms-b45309,#b45309),var(--ms-4a2e1b,#4a2e1b))",
                      }}
                    >
                      <h3>Energy that adds up.</h3>
                      <p>Solar output tracked hour by hour.</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div
                      className="hero-slide"
                      style={{
                        background:
                          "linear-gradient(120deg,var(--ms-d99b26,#d99b26),var(--ms-b45309,#b45309))",
                      }}
                    >
                      <h3>Alerts that matter.</h3>
                      <p>Acknowledge events in one click.</p>
                    </div>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#dashCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#dashCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </section>{" "}
          </div>{" "}
          <section id="gateway-section" className="panel gateway-panel">
            <div className="panel-heading">
              <div>
                <h2 id="gateway-heading">
                  Gateway fleet{" "}
                  <span className="count-pill" id="fleet-count">
                    24 devices
                  </span>
                </h2>
                <p>Monitor connectivity and latest readings from every gateway.</p>
              </div>
              <button className="text-button" id="view-all" data-view="gateways">
                View all gateways <span>→</span>
              </button>
            </div>
            <div className="table-toolbar">
              <div className="search-wrap">
                <svg className="icon">
                  <use href="#i-search" />
                </svg>
                <input
                  type="search"
                  className="form-control"
                  id="device-search"
                  aria-label="Search gateways"
                  placeholder="Search gateway, site or serial number…"
                />
              </div>
              <label className="visually-hidden" htmlFor="status-filter">
                Gateway status
              </label>
              <select className="form-select" id="status-filter">
                <option value="all">All statuses</option>
                <option value="Online">Online</option>
                <option value="Warning">Warning</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th scope="col">GATEWAY / DEVICE</th>
                    <th scope="col">SITE</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">CONNECTION</th>
                    <th scope="col">POWER</th>
                    <th scope="col">LAST SYNC</th>
                    <th scope="col">
                      <span className="visually-hidden">Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody id="gateway-rows" />
              </table>
            </div>
            <div className="table-footer">
              <span id="table-count" aria-live="polite" />
              <div className="pagination-controls">
                <button className="btn btn-sm btn-light" id="prev-page" aria-label="Previous page">
                  ←
                </button>
                <span id="page-number">1</span>
                <button className="btn btn-sm btn-light" id="next-page" aria-label="Next page">
                  →
                </button>
              </div>
            </div>
          </section>{" "}
          <section id="alerts-view" className="view d-none panel">
            <div className="panel-heading">
              <div>
                <h2>Alerts &amp; events</h2>
                <p>Review and acknowledge sample gateway events.</p>
              </div>
              <span className="demo-tag">DEMO EVENTS</span>
            </div>
            <div id="alerts-list" />
          </section>{" "}
          <section id="reports-view" className="view d-none panel reports-panel">
            <div className="panel-heading">
              <div>
                <h2>Fleet summary report</h2>
                <p>Export the sample dataset for the selected site.</p>
              </div>
              <svg className="icon">
                <use href="#i-chart" />
              </svg>
            </div>
            <div className="report-body">
              <span className="report-icon">
                <svg className="icon">
                  <use href="#i-chart" />
                </svg>
              </span>
              <h3>From telemetry to a clear picture.</h3>
              <p>
                Your CSV includes gateway identity, site, connectivity, power output, and last sync.
                Site selection is applied to the report.
              </p>
              <button className="btn btn-primary" id="report-download">
                <svg className="icon">
                  <use href="#i-down" />
                </svg>{" "}
                Download fleet CSV
              </button>
              <small>Sample snapshot · 09 October 2026 · 24 gateways</small>
            </div>
          </section>{" "}
          <footer className="page-footer">
            <span>© 2026 Medha Techno Research LLP</span>
            <span>
              Medha IoT <i>•</i> Bootstrap 5.0 theme <i>•</i> Demo data
            </span>
          </footer>{" "}
        </main>
      </div>
      <div
        className="modal fade"
        id="device-modal"
        tabIndex={-1}
        aria-labelledby="device-modal-title"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5" id="device-modal-title">
                Gateway details
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body" id="device-modal-body" />
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>{" "}
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div id="app-toast" className="toast" role="status" aria-live="polite" aria-atomic="true">
            <div className="toast-body d-flex align-items-center">
              <span id="toast-message" />
              <button
                className="btn-close ms-auto"
                data-bs-dismiss="toast"
                aria-label="Close notification"
              />
            </div>
          </div>
        </div>{" "}
      </div>
    </MedhaPage>
  );
}
