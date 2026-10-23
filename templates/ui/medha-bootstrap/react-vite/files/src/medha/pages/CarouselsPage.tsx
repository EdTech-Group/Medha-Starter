// Ported from the Medha theme by medha-starter. Source: carousels.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function CarouselsPage() {
  return (
    <AppShell title={"Carousels & accordions"} documentTitle={"Carousels & accordions • Medha IoT"}>
      <section className="page-heading">
        <div>
          <div className="eyebrow">BOOTSTRAP KIT</div>
          <h1>Carousels &amp; accordions</h1>
          <p>Sliders with controls, indicators, captions and collapsible accordion panels.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Slider with controls &amp; indicators</h2>
            <p>Content slides</p>
          </div>
        </div>
        <div className="panel-body">
          <div id="cs1" className="carousel slide " data-bs-ride="false">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#cs1"
                data-bs-slide-to="0"
                className="active"
                aria-label="Slide 1"
              />
              <button
                type="button"
                data-bs-target="#cs1"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              />
              <button
                type="button"
                data-bs-target="#cs1"
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
                  <h3>First slide</h3>
                  <p>Content with controls and indicators.</p>
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
                  <h3>Second slide</h3>
                  <p>Use the arrows or dots to move.</p>
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
                  <h3>Third slide</h3>
                  <p>Slides can hold any content.</p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#cs1"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#cs1"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Crossfade</h2>
            <p>Fade transition instead of slide</p>
          </div>
        </div>
        <div className="panel-body">
          <div id="cs2" className="carousel slide carousel-fade" data-bs-ride="false">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#cs2"
                data-bs-slide-to="0"
                className="active"
                aria-label="Slide 1"
              />
              <button
                type="button"
                data-bs-target="#cs2"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              />
              <button
                type="button"
                data-bs-target="#cs2"
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
                  <h3>First slide</h3>
                  <p>Content with controls and indicators.</p>
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
                  <h3>Second slide</h3>
                  <p>Use the arrows or dots to move.</p>
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
                  <h3>Third slide</h3>
                  <p>Slides can hold any content.</p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#cs2"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#cs2"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Captions &amp; auto-play</h2>
            <p>Captions over the slide; auto-plays every 3 s</p>
          </div>
        </div>
        <div className="panel-body">
          <div id="cs3" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div
                  className="hero-slide"
                  style={{
                    background:
                      "linear-gradient(120deg,var(--ms-4a2e1b,#4a2e1b),var(--ms-0f0804,#0f0804))",
                  }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>First slide</h5>
                  <p>Content with controls and indicators.</p>
                </div>
              </div>
              <div className="carousel-item">
                <div
                  className="hero-slide"
                  style={{
                    background:
                      "linear-gradient(120deg,var(--ms-b45309,#b45309),var(--ms-4a2e1b,#4a2e1b))",
                  }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide</h5>
                  <p>Use the arrows or dots to move.</p>
                </div>
              </div>
              <div className="carousel-item">
                <div
                  className="hero-slide"
                  style={{
                    background:
                      "linear-gradient(120deg,var(--ms-d99b26,#d99b26),var(--ms-b45309,#b45309))",
                  }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Third slide</h5>
                  <p>Slides can hold any content.</p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#cs3"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" />
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#cs3"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" />
            </button>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Accordions</h2>
            <p>Default, flush and always-open</p>
          </div>
        </div>
        <div className="panel-body">
          <h3 className="mh">Default</h3>
          <div className="accordion " id="ac1">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#ac1c0"
                  aria-expanded="true"
                >
                  Accordion item #1
                </button>
              </h2>
              <div id="ac1c0" className="accordion-collapse collapse show" data-bs-parent="#ac1">
                <div className="accordion-body">
                  Collapsible panel content for item 1. Gateway data is aggregated per site.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#ac1c1"
                  aria-expanded="false"
                >
                  Accordion item #2
                </button>
              </h2>
              <div id="ac1c1" className="accordion-collapse collapse" data-bs-parent="#ac1">
                <div className="accordion-body">
                  Collapsible panel content for item 2. Gateway data is aggregated per site.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#ac1c2"
                  aria-expanded="false"
                >
                  Accordion item #3
                </button>
              </h2>
              <div id="ac1c2" className="accordion-collapse collapse" data-bs-parent="#ac1">
                <div className="accordion-body">
                  Collapsible panel content for item 3. Gateway data is aggregated per site.
                </div>
              </div>
            </div>
          </div>
          <h3 className="mh mt-4">Flush</h3>
          <div className="accordion accordion-flush" id="ac2">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#ac2c0"
                  aria-expanded="true"
                >
                  Accordion item #1
                </button>
              </h2>
              <div id="ac2c0" className="accordion-collapse collapse show" data-bs-parent="#ac2">
                <div className="accordion-body">
                  Collapsible panel content for item 1. Gateway data is aggregated per site.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#ac2c1"
                  aria-expanded="false"
                >
                  Accordion item #2
                </button>
              </h2>
              <div id="ac2c1" className="accordion-collapse collapse" data-bs-parent="#ac2">
                <div className="accordion-body">
                  Collapsible panel content for item 2. Gateway data is aggregated per site.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#ac2c2"
                  aria-expanded="false"
                >
                  Accordion item #3
                </button>
              </h2>
              <div id="ac2c2" className="accordion-collapse collapse" data-bs-parent="#ac2">
                <div className="accordion-body">
                  Collapsible panel content for item 3. Gateway data is aggregated per site.
                </div>
              </div>
            </div>
          </div>
          <h3 className="mh mt-4">Always open</h3>
          <div className="accordion " id="ac3">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#ac3c0"
                  aria-expanded="true"
                >
                  Accordion item #1
                </button>
              </h2>
              <div id="ac3c0" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  Collapsible panel content for item 1. Gateway data is aggregated per site.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#ac3c1"
                  aria-expanded="false"
                >
                  Accordion item #2
                </button>
              </h2>
              <div id="ac3c1" className="accordion-collapse collapse">
                <div className="accordion-body">
                  Collapsible panel content for item 2. Gateway data is aggregated per site.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#ac3c2"
                  aria-expanded="false"
                >
                  Accordion item #3
                </button>
              </h2>
              <div id="ac3c2" className="accordion-collapse collapse">
                <div className="accordion-body">
                  Collapsible panel content for item 3. Gateway data is aggregated per site.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
