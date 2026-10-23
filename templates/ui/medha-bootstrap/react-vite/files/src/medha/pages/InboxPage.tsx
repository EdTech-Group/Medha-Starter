// Ported from the Medha theme by medha-starter. Source: inbox.html. Regenerated from the theme; build new screens from these components.
import { Link } from "react-router";
import { AppShell } from "../../components/medha/AppShell";

export default function InboxPage() {
  return (
    <AppShell title="Inbox" documentTitle="Inbox • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">APPS</div>
          <h1>Inbox</h1>
          <p>Messages grouped by day.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>
              Mail <span className="count-pill">7 messages</span>
            </h2>
            <p>Sample inbox</p>
          </div>
          <Link to="/dashboard/compose" className="btn btn-primary">
            <svg className="icon ">
              <use href="#i-edit" />
            </svg>{" "}
            Compose
          </Link>
        </div>
        <div className="mail-list">
          <div className="mail-group">Today</div>
          <div className="mail-row">
            <input className="form-check-input" type="checkbox" aria-label="Select" />
            <button className="star on" aria-label="Star">
              <svg className="icon ">
                <use href="#i-star" />
              </svg>
            </button>
            <strong className="mail-from">Michael Chris</strong>
            <span className="mail-subj">
              <b>Gateway MS-004 signal warning</b>{" "}
              <span className="text-muted">
                — Please check the signal strength at the Vadodara site
              </span>
            </span>
            <span className="badge bg-secondary">Work</span>
            <time>12:05 PM</time>
          </div>
          <div className="mail-row">
            <input className="form-check-input" type="checkbox" aria-label="Select" />
            <button className="star" aria-label="Star">
              <svg className="icon ">
                <use href="#i-star" />
              </svg>
            </button>
            <strong className="mail-from">Alexander</strong>
            <span className="mail-subj">
              <b>Weekly energy report ready</b>{" "}
              <span className="text-muted">— The report for week 41 is attached</span>
            </span>
            <span className="badge bg-secondary">Report</span>
            <time>11:20 AM</time>
          </div>
          <div className="mail-row">
            <input className="form-check-input" type="checkbox" aria-label="Select" />
            <button className="star" aria-label="Star">
              <svg className="icon ">
                <use href="#i-star" />
              </svg>
            </button>
            <strong className="mail-from">Daniel Lucas</strong>
            <span className="mail-subj">
              <b>Site visit confirmed</b>{" "}
              <span className="text-muted">— Visit scheduled for Thursday at Surat</span>
            </span>
            <time>09:10 AM</time>
          </div>
          <div className="mail-group">Yesterday</div>
          <div className="mail-row">
            <input className="form-check-input" type="checkbox" aria-label="Select" />
            <button className="star on" aria-label="Star">
              <svg className="icon ">
                <use href="#i-star" />
              </svg>
            </button>
            <strong className="mail-from">Jackson Jacob</strong>
            <span className="mail-subj">
              <b>New gateway installed</b>{" "}
              <span className="text-muted">— Installed at Ahmedabad plant 2</span>
            </span>
            <span className="badge bg-secondary">Work</span>
            <time>06:48 PM</time>
          </div>
          <div className="mail-row">
            <input className="form-check-input" type="checkbox" aria-label="Select" />
            <button className="star" aria-label="Star">
              <svg className="icon ">
                <use href="#i-star" />
              </svg>
            </button>
            <strong className="mail-from">Laura Smith</strong>
            <span className="mail-subj">
              <b>Invoice for October</b>{" "}
              <span className="text-muted">— Please find the invoice attached</span>
            </span>
            <time>03:12 PM</time>
          </div>
          <div className="mail-group">Older</div>
          <div className="mail-row">
            <input className="form-check-input" type="checkbox" aria-label="Select" />
            <button className="star" aria-label="Star">
              <svg className="icon ">
                <use href="#i-star" />
              </svg>
            </button>
            <strong className="mail-from">David Samuel</strong>
            <span className="mail-subj">
              <b>Firmware 2.1 release notes</b>{" "}
              <span className="text-muted">— Highlights and known issues</span>
            </span>
            <span className="badge bg-secondary">Update</span>
            <time>Oct 07</time>
          </div>
          <div className="mail-row">
            <input className="form-check-input" type="checkbox" aria-label="Select" />
            <button className="star" aria-label="Star">
              <svg className="icon ">
                <use href="#i-star" />
              </svg>
            </button>
            <strong className="mail-from">Merina Lisa</strong>
            <span className="mail-subj">
              <b>Quarterly planning</b>{" "}
              <span className="text-muted">— Agenda for the planning call</span>
            </span>
            <time>Oct 05</time>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
