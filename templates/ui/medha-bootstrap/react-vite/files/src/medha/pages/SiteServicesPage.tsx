// Ported from the Medha theme by medha-starter. Source: site-services.html. Regenerated from the theme; build new screens from these components.
import { Link } from "react-router";
import { SiteShell } from "../../components/medha/SiteShell";

export default function SiteServicesPage() {
  return (
    <SiteShell documentTitle="Services • Medha">
      <section className="page-banner">
        <div className="container">
          <h1>Services</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Services
              </li>
            </ol>
          </nav>
        </div>
      </section>
      <section className="site-sec">
        <div className="container">
          <div className="sec-head">
            <span>Services</span>
            <h2>When climbing the career ladder</h2>
            <i />
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="offer-card">
                <span className="rev-icon">
                  <svg className="icon ">
                    <use href="#i-bolt" />
                  </svg>
                </span>
                <h3>Ornare aliquet</h3>
                <p>
                  Vivamus hendrerit non mauris eget consectetur. Sed placerat metus vitae nisi
                  porttitor tristique.
                </p>
                <a href="#" className="text-button">
                  Learn more →
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="offer-card">
                <span className="rev-icon">
                  <svg className="icon ">
                    <use href="#i-shield" />
                  </svg>
                </span>
                <h3>Hendrerit mauris</h3>
                <p>
                  Vivamus hendrerit non mauris eget consectetur. Sed placerat metus vitae nisi
                  porttitor tristique.
                </p>
                <a href="#" className="text-button">
                  Learn more →
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="offer-card">
                <span className="rev-icon">
                  <svg className="icon ">
                    <use href="#i-chart" />
                  </svg>
                </span>
                <h3>Iaculis dolor</h3>
                <p>
                  Vivamus hendrerit non mauris eget consectetur. Sed placerat metus vitae nisi
                  porttitor tristique.
                </p>
                <a href="#" className="text-button">
                  Learn more →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="site-sec alt">
        <div className="container">
          <div className="sec-head">
            <span>How it works</span>
            <h2>Three simple steps</h2>
            <i />
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="step-card">
                <b>01.</b>
                <h3>Lobortis sem</h3>
                <p>
                  Praesent nec blandit lorem, et facilisis mi. Ut fringilla massa massa, id
                  consequat eros iaculis quis.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step-card">
                <b>02.</b>
                <h3>Blandit lorem</h3>
                <p>
                  Praesent nec blandit lorem, et facilisis mi. Ut fringilla massa massa, id
                  consequat eros iaculis quis.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step-card">
                <b>03.</b>
                <h3>Consequat eros</h3>
                <p>
                  Praesent nec blandit lorem, et facilisis mi. Ut fringilla massa massa, id
                  consequat eros iaculis quis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="site-sec">
        <div className="container">
          <div className="sec-head">
            <span>Upcoming</span>
            <h2>Events timeline</h2>
            <i />
          </div>
          <ul className="event-list">
            <li>
              <time>20 Jan 2026</time>
              <div>
                <h3>Maximus pretium</h3>
                <p>
                  Morbi sollicitudin odio massa, et rutrum sem rutrum in. Duis elementum turpis
                  ultricies, finibus leo.
                </p>
              </div>
            </li>
            <li>
              <time>25 Jan 2026</time>
              <div>
                <h3>Aliquam faucibus</h3>
                <p>
                  Morbi sollicitudin odio massa, et rutrum sem rutrum in. Duis elementum turpis
                  ultricies, finibus leo.
                </p>
              </div>
            </li>
            <li>
              <time>30 Jan 2026</time>
              <div>
                <h3>Vitae faucibus</h3>
                <p>
                  Morbi sollicitudin odio massa, et rutrum sem rutrum in. Duis elementum turpis
                  ultricies, finibus leo.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
