// Ported from the Medha theme by medha-starter. Source: colors.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function ColorsPage() {
  return (
    <AppShell title="Colour schemes" documentTitle="Colour schemes • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">COMPONENTS</div>
          <h1>Colour schemes</h1>
          <p>
            Choose a complementary, analogous, triadic, tetradic, split-complementary or
            monochromatic scheme for the whole theme.
          </p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Colour scheme designer</h2>
            <p>
              Pick a colour-wheel scheme and a base colour. The whole theme — sidebar, buttons,
              panels, charts — re-colours instantly and the choice is remembered in this browser.
            </p>
          </div>
        </div>
        <div className="panel-body">
          <div data-ms-designer="" />
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Live preview</h2>
            <p>Success, warning and error colours stay fixed so status meaning is preserved.</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="ms-demo">
            <button className="btn btn-primary">Primary action</button>
            <button className="btn btn-outline-secondary">Secondary</button>
            <span className="badge bg-warning text-dark">Highlight</span>
            <span className="badge bg-success">Online</span>
            <span className="badge bg-danger">Offline</span>
            <div className="progress" style={{ width: "220px", height: "10px" }}>
              <div className="progress-bar" style={{ width: "64%" }} />
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Colour theory used</h2>
            <p>
              Each scheme assigns hues to four theme roles — primary (sidebar, headings), action
              (buttons, links), highlight (accents) and, for tetradic, an information accent.
            </p>
          </div>
        </div>
        <div className="panel-body">
          <div className="ms-theory">
            <div>
              <h3>Monochromatic</h3>
              <p>
                Lighter and darker versions of one base colour for a consistent, subtle palette.
              </p>
            </div>
            <div>
              <h3>Analogous</h3>
              <p>
                Hues that sit next to each other on the wheel (±30°) for a natural, harmonious
                scheme.
              </p>
            </div>
            <div>
              <h3>Complementary</h3>
              <p>Hues on opposite ends of the wheel (180°), striking contrast when paired.</p>
            </div>
            <div>
              <h3>Split complementary</h3>
              <p>
                The base colour plus the two hues either side of its complement (150° and 210°):
                vibrant yet balanced.
              </p>
            </div>
            <div>
              <h3>Triadic</h3>
              <p>
                Three hues equally distributed round the wheel (120° apart): vibrant, eye-catching.
              </p>
            </div>
            <div>
              <h3>Tetradic</h3>
              <p>Four hues forming a square (90° apart): vivid contrast, but harder to balance.</p>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
