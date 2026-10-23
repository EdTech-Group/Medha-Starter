// Ported from the Medha theme by medha-starter. Source: typo.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function TypographyPage() {
  return (
    <AppShell title="Typography" documentTitle="Typography • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">COMPONENTS</div>
          <h1>Typography</h1>
          <p>Type, lists, quotes and the colour palette.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Headings</h2>
            <p>Medha type scale</p>
          </div>
        </div>
        <div className="panel-body">
          <h1 className="mb-2" style={{ fontSize: "26px" }}>
            Heading 1
          </h1>
          <h2 className="mb-2" style={{ fontSize: "22px" }}>
            Heading 2
          </h2>
          <h3 className="mb-2" style={{ fontSize: "19px" }}>
            Heading 3
          </h3>
          <h4 className="mb-2" style={{ fontSize: "16px" }}>
            Heading 4
          </h4>
          <h5 className="mb-2" style={{ fontSize: "14px" }}>
            Heading 5
          </h5>
          <h6 className="mb-2" style={{ fontSize: "12px" }}>
            Heading 6
          </h6>
          <p className="lead mt-3">Lead paragraph for connected infrastructure.</p>
          <p>
            Body text — a clear view of your devices, data and network health.{" "}
            <a href="#">Inline link</a>, <strong>strong</strong>, <em>emphasis</em>,{" "}
            <mark>highlight</mark> and <code>inline code</code>.
          </p>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Lists &amp; quotes</h2>
            <p />
          </div>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-6">
              <ul>
                <li>Gateways</li>
                <li>Alerts &amp; events</li>
                <li>Reports</li>
              </ul>
              <ol>
                <li>Connect</li>
                <li>Monitor</li>
                <li>Export</li>
              </ol>
            </div>
            <div className="col-md-6">
              <blockquote className="blockquote">
                <p>From telemetry to a clear picture.</p>
                <footer className="blockquote-footer">
                  Medha <cite>IoT</cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Palette</h2>
            <p>Colour tokens from the Medha reference</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <div className="col-6 col-md-3">
              <div className="swatch" style={{ background: "var(--ms-4a2e1b,#4a2e1b)" }} />
              <strong className="d-block mt-2">Brown</strong>
              <small className="text-muted">#4a2e1b</small>
            </div>
            <div className="col-6 col-md-3">
              <div className="swatch" style={{ background: "var(--ms-0f0804,#0f0804)" }} />
              <strong className="d-block mt-2">Deep</strong>
              <small className="text-muted">#0f0804</small>
            </div>
            <div className="col-6 col-md-3">
              <div className="swatch" style={{ background: "var(--ms-b45309,#b45309)" }} />
              <strong className="d-block mt-2">Amber</strong>
              <small className="text-muted">#b45309</small>
            </div>
            <div className="col-6 col-md-3">
              <div className="swatch" style={{ background: "var(--ms-d99b26,#d99b26)" }} />
              <strong className="d-block mt-2">Gold</strong>
              <small className="text-muted">#d99b26</small>
            </div>
            <div className="col-6 col-md-3">
              <div className="swatch" style={{ background: "var(--ms-fffdf8,#fffdf8)" }} />
              <strong className="d-block mt-2">Ivory</strong>
              <small className="text-muted">#fffdf8</small>
            </div>
            <div className="col-6 col-md-3">
              <div className="swatch" style={{ background: "var(--ms-0f172a,#0f172a)" }} />
              <strong className="d-block mt-2">Ink</strong>
              <small className="text-muted">#0f172a</small>
            </div>
            <div className="col-6 col-md-3">
              <div className="swatch" style={{ background: "#45806b" }} />
              <strong className="d-block mt-2">Success</strong>
              <small className="text-muted">#45806b</small>
            </div>
            <div className="col-6 col-md-3">
              <div className="swatch" style={{ background: "#b0473a" }} />
              <strong className="d-block mt-2">Danger</strong>
              <small className="text-muted">#b0473a</small>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
