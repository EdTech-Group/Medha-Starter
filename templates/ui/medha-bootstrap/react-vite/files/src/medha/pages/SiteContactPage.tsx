// Ported from the Medha theme by medha-starter. Source: site-contact.html. Regenerated from the theme; build new screens from these components.
import { Link } from "react-router";
import { SiteShell } from "../../components/medha/SiteShell";

export default function SiteContactPage() {
  return (
    <SiteShell documentTitle="Contact • Medha">
      <section className="page-banner">
        <div className="container">
          <h1>Contact us</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Contact
              </li>
            </ol>
          </nav>
        </div>
      </section>
      <section className="site-sec">
        <div className="container">
          <div className="sec-head">
            <span>Contact us</span>
            <h2>Get in touch</h2>
            <i />
          </div>
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="contact-card">
                <span className="rev-icon">
                  <svg className="icon ">
                    <use href="#i-phone" />
                  </svg>
                </span>
                <div>
                  <strong>Telephone</strong>
                  <p>+91 00000 00000</p>
                </div>
              </div>
              <div className="contact-card">
                <span className="rev-icon">
                  <svg className="icon ">
                    <use href="#i-mail" />
                  </svg>
                </span>
                <div>
                  <strong>Mail</strong>
                  <p>info@example.com</p>
                </div>
              </div>
              <div className="contact-card">
                <span className="rev-icon">
                  <svg className="icon ">
                    <use href="#i-pin" />
                  </svg>
                </span>
                <div>
                  <strong>Location</strong>
                  <p>8088 USA, Honey block, New York City.</p>
                </div>
              </div>
              <svg className="map-ph" viewBox="0 0 400 220" role="img" aria-label="Map placeholder">
                <title>Map placeholder</title>
                <rect width="400" height="220" fill="var(--ms-f6f2ea,#f6f2ea)" />
                <g stroke="var(--ms-e4d4be,#e4d4be)" strokeWidth="1">
                  <line x1="0" y1="0" x2="0" y2="220" />
                  <line x1="40" y1="0" x2="40" y2="220" />
                  <line x1="80" y1="0" x2="80" y2="220" />
                  <line x1="120" y1="0" x2="120" y2="220" />
                  <line x1="160" y1="0" x2="160" y2="220" />
                  <line x1="200" y1="0" x2="200" y2="220" />
                  <line x1="240" y1="0" x2="240" y2="220" />
                  <line x1="280" y1="0" x2="280" y2="220" />
                  <line x1="320" y1="0" x2="320" y2="220" />
                  <line x1="360" y1="0" x2="360" y2="220" />
                  <line x1="0" y1="0" x2="400" y2="0" />
                  <line x1="0" y1="40" x2="400" y2="40" />
                  <line x1="0" y1="80" x2="400" y2="80" />
                  <line x1="0" y1="120" x2="400" y2="120" />
                  <line x1="0" y1="160" x2="400" y2="160" />
                  <line x1="0" y1="200" x2="400" y2="200" />
                </g>
                <path
                  d="M0 150 C100 100 200 190 400 90"
                  fill="none"
                  stroke="var(--ms-d99b26,#d99b26)"
                  strokeWidth="6"
                />
                <circle cx="210" cy="110" r="10" fill="var(--ms-b45309,#b45309)" />
                <circle cx="210" cy="110" r="4" fill="#fff" />
              </svg>
            </div>
            <div className="col-lg-7">
              <form className="needs-validation contact-form" noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="cn">
                      Name
                    </label>
                    <input id="cn" className="form-control" required />
                    <div className="invalid-feedback">Enter your name.</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="ce">
                      Email
                    </label>
                    <input id="ce" type="email" className="form-control" required />
                    <div className="invalid-feedback">Enter a valid email.</div>
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="cs">
                      Subject
                    </label>
                    <input id="cs" className="form-control" />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="cm">
                      Message
                    </label>
                    <textarea id="cm" rows={6} className="form-control" required />
                    <div className="invalid-feedback">Please write a message.</div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary" type="submit">
                      <svg className="icon ">
                        <use href="#i-send" />
                      </svg>{" "}
                      Send message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
