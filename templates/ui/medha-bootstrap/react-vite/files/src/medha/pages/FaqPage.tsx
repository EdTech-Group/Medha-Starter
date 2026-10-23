// Ported from the Medha theme by medha-starter. Source: faq.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function FaqPage() {
  return (
    <AppShell title="FAQ" documentTitle="FAQ • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">PAGES</div>
          <h1>FAQ</h1>
          <p>Frequently asked questions.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Questions</h2>
            <p />
          </div>
        </div>
        <div className="panel-body">
          <div className="accordion" id="faq">
            <div className="accordion-item">
              <h2 className="accordion-header" id="h0">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#q0"
                  aria-expanded="true"
                  aria-controls="q0"
                >
                  What is the Medha IoT theme?
                </button>
              </h2>
              <div id="q0" className="accordion-collapse collapse show" data-bs-parent="#faq">
                <div className="accordion-body">
                  A responsive Bootstrap 5.0 dashboard theme combining the Medha colour palette and
                  logo with the Esteem page set.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="h1">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#q1"
                  aria-expanded="false"
                  aria-controls="q1"
                >
                  Do I need an internet connection?
                </button>
              </h2>
              <div id="q1" className="accordion-collapse collapse" data-bs-parent="#faq">
                <div className="accordion-body">
                  No. Bootstrap, scripts and the logo are bundled locally and the icons are inline
                  SVG.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="h2">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#q2"
                  aria-expanded="false"
                  aria-controls="q2"
                >
                  How do I connect live data?
                </button>
              </h2>
              <div id="q2" className="accordion-collapse collapse" data-bs-parent="#faq">
                <div className="accordion-body">
                  Replace the sample arrays in assets/app.js with responses from your API.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="h3">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#q3"
                  aria-expanded="false"
                  aria-controls="q3"
                >
                  Where is the palette defined?
                </button>
              </h2>
              <div id="q3" className="accordion-collapse collapse" data-bs-parent="#faq">
                <div className="accordion-body">
                  At the top of assets/theme.css as CSS variables (--medha-*).
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
