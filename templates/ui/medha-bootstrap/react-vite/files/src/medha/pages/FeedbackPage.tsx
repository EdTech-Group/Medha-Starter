// Ported from the Medha theme by medha-starter. Source: feedback.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function FeedbackPage() {
  return (
    <AppShell title="Feedback" documentTitle="Feedback • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">BOOTSTRAP KIT</div>
          <h1>Feedback</h1>
          <p>Alerts, progress bars, spinners and toast notifications.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Alerts</h2>
            <p>Contextual, with links, icons and additional content</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="alert alert-primary" role="alert">
            A simple primary alert with{" "}
            <a href="#" className="alert-link">
              an example link
            </a>
            .
          </div>
          <div className="alert alert-success" role="alert">
            A simple success alert with{" "}
            <a href="#" className="alert-link">
              an example link
            </a>
            .
          </div>
          <div className="alert alert-warning" role="alert">
            A simple warning alert with{" "}
            <a href="#" className="alert-link">
              an example link
            </a>
            .
          </div>
          <div className="alert alert-danger" role="alert">
            A simple danger alert with{" "}
            <a href="#" className="alert-link">
              an example link
            </a>
            .
          </div>
          <div className="alert alert-success d-flex align-items-center" role="alert">
            <svg className="icon ">
              <use href="#i-check" />
            </svg>
            <span className="ms-2">Alert with an icon — gateway synced successfully.</span>
          </div>
          <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading" style={{ fontSize: "14px" }}>
              Well done!
            </h4>
            <p>Additional content inside the alert.</p>
            <hr />
            <p className="mb-0">Use utilities to keep spacing tidy.</p>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Progress bars</h2>
            <p>Heights, labels, stacked, striped and animated</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="progress mb-3" style={{ height: "4px" }}>
            <div className="progress-bar" style={{ width: "25%" }} />
          </div>
          <div className="progress mb-3">
            <div className="progress-bar" style={{ width: "50%" }}>
              50%
            </div>
          </div>
          <div className="progress mb-3" style={{ height: "22px" }}>
            <div className="progress-bar bg-success" style={{ width: "75%" }}>
              75%
            </div>
          </div>
          <div className="progress mb-3">
            <div className="progress-bar" style={{ width: "30%" }} />
            <div className="progress-bar bg-warning" style={{ width: "20%" }} />
            <div className="progress-bar bg-danger" style={{ width: "10%" }} />
          </div>
          <div className="progress mb-3">
            <div className="progress-bar progress-bar-striped" style={{ width: "60%" }} />
          </div>
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-info"
              style={{ width: "80%" }}
            />
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Spinners</h2>
            <p>Border and grow, colours, sizes and in buttons</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
          </div>
          <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
            <div className="spinner-grow text-success" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
          </div>
          <div className="d-flex flex-wrap align-items-center gap-3">
            <div className="spinner-border spinner-border-sm text-primary" role="status" />
            <div className="spinner-grow spinner-grow-sm text-primary" role="status" />
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />{" "}
              Loading…
            </button>
            <button className="btn btn-secondary" type="button" disabled>
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />{" "}
              Syncing
            </button>
            <button className="btn btn-outline-primary" id="load-btn" type="button">
              Click to load
            </button>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Toasts</h2>
            <p>Static examples and live triggers</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="d-flex flex-wrap gap-3 mb-4">
            <div
              className="toast show position-static"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              id="ts1"
            >
              <div className="toast-header">
                <span className="toast-dot bg-primary" />
                <strong className="me-auto">Medha</strong>
                <small>just now</small>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                />
              </div>
              <div className="toast-body">Hello, this is a static toast.</div>
            </div>
            <div
              className="toast show position-static"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              id="ts2"
            >
              <div className="toast-header">
                <span className="toast-dot bg-success" />
                <strong className="me-auto">Gateway synced</strong>
                <small>just now</small>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                />
              </div>
              <div className="toast-body">Surat GW-02 is back online.</div>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <button className="btn btn-primary" data-toast-target="#live1">
              Show live toast
            </button>
            <button className="btn btn-outline-secondary" data-toast-target="#live2">
              Show success toast
            </button>
            <button className="btn btn-outline-danger" data-toast-target="#live3">
              Show error toast
            </button>
          </div>
          <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div
              className="toast "
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              id="live1"
            >
              <div className="toast-header">
                <span className="toast-dot bg-primary" />
                <strong className="me-auto">Medha</strong>
                <small>just now</small>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                />
              </div>
              <div className="toast-body">This live toast appears at the bottom right.</div>
            </div>
            <div
              className="toast "
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              id="live2"
            >
              <div className="toast-header">
                <span className="toast-dot bg-success" />
                <strong className="me-auto">Success</strong>
                <small>just now</small>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                />
              </div>
              <div className="toast-body">Report exported.</div>
            </div>
            <div
              className="toast "
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              id="live3"
            >
              <div className="toast-header">
                <span className="toast-dot bg-danger" />
                <strong className="me-auto">Error</strong>
                <small>just now</small>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                />
              </div>
              <div className="toast-body">Sync failed. Please retry.</div>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
