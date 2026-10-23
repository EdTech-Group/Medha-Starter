// Ported from the Medha theme by medha-starter. Source: site-about.html. Regenerated from the theme; build new screens from these components.
import { Link } from "react-router";
import { SiteShell } from "../../components/medha/SiteShell";

export default function SiteAboutPage() {
  return (
    <SiteShell documentTitle="About • Medha">
      <section className="page-banner">
        <div className="container">
          <h1>About us</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                About
              </li>
            </ol>
          </nav>
        </div>
      </section>
      <section className="site-sec">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="sec-head text-start">
                <span>About us</span>
                <h2>When climbing the career ladder</h2>
              </div>
              <h3 className="lead-h">
                Pellentesque a ligula nec dui ornare pulvinar in non sem condimentum erat
              </h3>
              <p>
                In eleifend nisl fermentum bibendum euismod. Pellentesque ac mi quis tortor
                consequat scelerisque.
              </p>
              <p className="mb-4">
                Sed eros urna, rhoncus nec tortor quis, pretium vestibulum purus. Nunc quis augue
                nibh. Proin non enim non nulla scelerisque scelerisque vitae non est.
              </p>
              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Lorem</span>
                  <span>90%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" data-skill="90" style={{ width: "0" }} />
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Ipsum</span>
                  <span>75%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" data-skill="75" style={{ width: "0" }} />
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Tortor</span>
                  <span>85%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" data-skill="85" style={{ width: "0" }} />
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between small mb-1">
                  <span>Odio</span>
                  <span>65%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" data-skill="65" style={{ width: "0" }} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-art">
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#aboutModal"
                >
                  <svg className="icon ">
                    <use href="#i-eye" />
                  </svg>{" "}
                  Lorem ipsum dolor sit amet
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="site-sec alt">
        <div className="container">
          <div className="sec-head">
            <span>Meet our staff</span>
            <h2>When climbing the career ladder</h2>
            <i />
          </div>
          <div className="row g-4">
            <div className="col-6 col-lg-3">
              <div className="staff-card">
                <span className="avatar staff-av">AS</span>
                <h3>Amanda Seylon</h3>
                <small>Lorem</small>
                <div className="staff-social">
                  <a href="#" aria-label="Share">
                    <svg className="icon ">
                      <use href="#i-share" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Email">
                    <svg className="icon ">
                      <use href="#i-mail" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Link">
                    <svg className="icon ">
                      <use href="#i-link" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="staff-card">
                <span className="avatar staff-av">LM</span>
                <h3>Laura Mark</h3>
                <small>Donec</small>
                <div className="staff-social">
                  <a href="#" aria-label="Share">
                    <svg className="icon ">
                      <use href="#i-share" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Email">
                    <svg className="icon ">
                      <use href="#i-mail" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Link">
                    <svg className="icon ">
                      <use href="#i-link" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="staff-card">
                <span className="avatar staff-av">LJ</span>
                <h3>Lusiana James</h3>
                <small>Vivamus</small>
                <div className="staff-social">
                  <a href="#" aria-label="Share">
                    <svg className="icon ">
                      <use href="#i-share" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Email">
                    <svg className="icon ">
                      <use href="#i-mail" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Link">
                    <svg className="icon ">
                      <use href="#i-link" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="staff-card">
                <span className="avatar staff-av">CA</span>
                <h3>Catharine</h3>
                <small>Sagittis</small>
                <div className="staff-social">
                  <a href="#" aria-label="Share">
                    <svg className="icon ">
                      <use href="#i-share" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Email">
                    <svg className="icon ">
                      <use href="#i-mail" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Link">
                    <svg className="icon ">
                      <use href="#i-link" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="modal fade" id="aboutModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Medha</h5>
              <button className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              Duis venenatis, turpis eu bibendum porttitor, sapien quam ultricies tellus, ac rhoncus
              risus odio eget nunc. Pellentesque ac fermentum diam. Integer eu facilisis nunc, a
              iaculis felis.
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
