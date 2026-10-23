// Ported from the Medha theme by medha-starter. Source: site-home.html. Regenerated from the theme; build new screens from these components.
import { Link } from "react-router";
import { SiteShell } from "../../components/medha/SiteShell";

export default function SiteHomePage() {
  return (
    <SiteShell documentTitle="Home • Medha">
      <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              className="hero-slide hero-big"
              style={{
                background:
                  "linear-gradient(120deg,var(--ms-4a2e1b,#4a2e1b),var(--ms-0f0804,#0f0804))",
              }}
            >
              <div className="container">
                <span className="hero-eyebrow">Connected infrastructure</span>
                <h2>Designing smarter systems</h2>
                <p>
                  Any successful project starts with good data. Together we deliver deeper insight
                  into your devices.
                </p>
                <Link to="/about" className="btn btn-light">
                  Read more »
                </Link>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div
              className="hero-slide hero-big"
              style={{
                background:
                  "linear-gradient(120deg,var(--ms-b45309,#b45309),var(--ms-4a2e1b,#4a2e1b))",
              }}
            >
              <div className="container">
                <span className="hero-eyebrow">Energy that adds up</span>
                <h2>Solar monitoring course</h2>
                <p>Track generation, uptime and alerts across every site from a single console.</p>
                <Link to="/about" className="btn btn-light">
                  Read more »
                </Link>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div
              className="hero-slide hero-big"
              style={{
                background:
                  "linear-gradient(120deg,var(--ms-d99b26,#d99b26),var(--ms-b45309,#b45309))",
              }}
            >
              <div className="container">
                <span className="hero-eyebrow">Research partnerships</span>
                <h2>Digital measurement programme</h2>
                <p>Reliable measurement, clear reporting and a team that explains the numbers.</p>
                <Link to="/about" className="btn btn-light">
                  Read more »
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <section className="site-sec">
        <div className="container">
          <div className="sec-head">
            <span>Welcome</span>
            <h2>When climbing the career ladder</h2>
            <p>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <i />
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="course-card">
                <h3>Design course</h3>
                <div className="course-item">
                  <span className="rev-icon">
                    <svg className="icon ">
                      <use href="#i-edit" />
                    </svg>
                  </span>
                  <div>
                    <strong>Fashion design</strong>
                    <p>Ncididunt ut labore et t enim ad minim.</p>
                  </div>
                </div>
                <div className="course-item">
                  <span className="rev-icon">
                    <svg className="icon ">
                      <use href="#i-edit" />
                    </svg>
                  </span>
                  <div>
                    <strong>Interior design</strong>
                    <p>Ncididunt ut labore et t enim ad minim.</p>
                  </div>
                </div>
                <div className="course-item">
                  <span className="rev-icon">
                    <svg className="icon ">
                      <use href="#i-edit" />
                    </svg>
                  </span>
                  <div>
                    <strong>Graphic design</strong>
                    <p>Ncididunt ut labore et t enim ad minim.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="course-card">
                <h3>Marketing course</h3>
                <div className="course-item">
                  <span className="rev-icon">
                    <svg className="icon ">
                      <use href="#i-globe" />
                    </svg>
                  </span>
                  <div>
                    <strong>Facebook marketing</strong>
                    <p>Ncididunt ut labore et t enim ad minim.</p>
                  </div>
                </div>
                <div className="course-item">
                  <span className="rev-icon">
                    <svg className="icon ">
                      <use href="#i-globe" />
                    </svg>
                  </span>
                  <div>
                    <strong>YouTube marketing</strong>
                    <p>Ncididunt ut labore et t enim ad minim.</p>
                  </div>
                </div>
                <div className="course-item">
                  <span className="rev-icon">
                    <svg className="icon ">
                      <use href="#i-globe" />
                    </svg>
                  </span>
                  <div>
                    <strong>Twitter marketing</strong>
                    <p>Ncididunt ut labore et t enim ad minim.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="course-card">
                <h3>Financial course</h3>
                <div className="course-item">
                  <span className="rev-icon">
                    <svg className="icon ">
                      <use href="#i-table" />
                    </svg>
                  </span>
                  <div>
                    <strong>Complexities of banking</strong>
                    <p>Ncididunt ut labore et t enim ad minim.</p>
                  </div>
                </div>
                <div className="course-item">
                  <span className="rev-icon">
                    <svg className="icon ">
                      <use href="#i-table" />
                    </svg>
                  </span>
                  <div>
                    <strong>Compliance regulations</strong>
                    <p>Ncididunt ut labore et t enim ad minim.</p>
                  </div>
                </div>
                <div className="course-item">
                  <span className="rev-icon">
                    <svg className="icon ">
                      <use href="#i-table" />
                    </svg>
                  </span>
                  <div>
                    <strong>Finance products</strong>
                    <p>Ncididunt ut labore et t enim ad minim.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="stats-band">
        <div className="container">
          <div className="sec-head light">
            <span>Our stats</span>
            <h2>When climbing the career ladder</h2>
            <i />
          </div>
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <div className="stat-icon">
                <svg className="icon ">
                  <use href="#i-award" />
                </svg>
              </div>
              <div className="count" data-count="45">
                0
              </div>
              <small>Graduates</small>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-icon">
                <svg className="icon ">
                  <use href="#i-users" />
                </svg>
              </div>
              <div className="count" data-count="165">
                0
              </div>
              <small>Certified staff</small>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-icon">
                <svg className="icon ">
                  <use href="#i-book" />
                </svg>
              </div>
              <div className="count" data-count="563">
                0
              </div>
              <small>Students</small>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-icon">
                <svg className="icon ">
                  <use href="#i-star" />
                </svg>
              </div>
              <div className="count" data-count="245">
                0
              </div>
              <small>Awards</small>
            </div>
          </div>
        </div>
      </section>
      <section className="site-sec alt">
        <div className="container">
          <div className="sec-head">
            <span>What we offer</span>
            <h2>When climbing the career ladder</h2>
            <i />
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="offer-card">
                <span className="rev-icon">
                  <svg className="icon ">
                    <use href="#i-book" />
                  </svg>
                </span>
                <h3>Undergraduate study</h3>
                <p>
                  Lorem ipsum dolor sit amet, sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="offer-card">
                <span className="rev-icon">
                  <svg className="icon ">
                    <use href="#i-award" />
                  </svg>
                </span>
                <h3>Professional study</h3>
                <p>
                  Lorem ipsum dolor sit amet, sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="offer-card">
                <span className="rev-icon">
                  <svg className="icon ">
                    <use href="#i-layout" />
                  </svg>
                </span>
                <h3>Programs</h3>
                <p>
                  Lorem ipsum dolor sit amet, sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="offer-card">
                <span className="rev-icon">
                  <svg className="icon ">
                    <use href="#i-laptop" />
                  </svg>
                </span>
                <h3>Online learning</h3>
                <p>
                  Lorem ipsum dolor sit amet, sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="offer-card">
                <span className="rev-icon">
                  <svg className="icon ">
                    <use href="#i-calendar" />
                  </svg>
                </span>
                <h3>Summer session</h3>
                <p>
                  Lorem ipsum dolor sit amet, sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="offer-card">
                <span className="rev-icon">
                  <svg className="icon ">
                    <use href="#i-globe" />
                  </svg>
                </span>
                <h3>Global education</h3>
                <p>
                  Lorem ipsum dolor sit amet, sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="site-sec">
        <div className="container">
          <div className="sec-head">
            <span>Testimonials</span>
            <h2>When climbing the career ladder</h2>
            <i />
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div id="testiCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="testi">
                      <span className="quote-mark">
                        <svg className="icon ">
                          <use href="#i-quote" />
                        </svg>
                      </span>
                      <p>
                        Sed semper leo metus, a lacinia eros semper at. Etiam sodales orci sit amet
                        vehicula pellentesque. Pellentesque ac mi quis tortor consequat scelerisque.
                      </p>
                      <div className="testi-who">
                        <span className="avatar">MJ</span>
                        <div>
                          <strong>Mary Jane</strong>
                          <small>Vestibulum</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="testi">
                      <span className="quote-mark">
                        <svg className="icon ">
                          <use href="#i-quote" />
                        </svg>
                      </span>
                      <p>
                        Sed semper leo metus, a lacinia eros semper at. Etiam sodales orci sit amet
                        vehicula pellentesque. Pellentesque ac mi quis tortor consequat scelerisque.
                      </p>
                      <div className="testi-who">
                        <span className="avatar">JD</span>
                        <div>
                          <strong>John Doe</strong>
                          <small>Praesent</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="testi">
                      <span className="quote-mark">
                        <svg className="icon ">
                          <use href="#i-quote" />
                        </svg>
                      </span>
                      <p>
                        Sed semper leo metus, a lacinia eros semper at. Etiam sodales orci sit amet
                        vehicula pellentesque. Pellentesque ac mi quis tortor consequat scelerisque.
                      </p>
                      <div className="testi-who">
                        <span className="avatar">AS</span>
                        <div>
                          <strong>Amanda Seylon</strong>
                          <small>Lorem</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-indicators static">
                  <button
                    type="button"
                    data-bs-target="#testiCarousel"
                    data-bs-slide-to="0"
                    className="active"
                    aria-label="Testimonial 1"
                  />
                  <button
                    type="button"
                    data-bs-target="#testiCarousel"
                    data-bs-slide-to="1"
                    aria-label="Testimonial 2"
                  />
                  <button
                    type="button"
                    data-bs-target="#testiCarousel"
                    data-bs-slide-to="2"
                    aria-label="Testimonial 3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
