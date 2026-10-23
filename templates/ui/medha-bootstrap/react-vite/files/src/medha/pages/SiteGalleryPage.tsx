// Ported from the Medha theme by medha-starter. Source: site-gallery.html. Regenerated from the theme; build new screens from these components.
import { Link } from "react-router";
import { SiteShell } from "../../components/medha/SiteShell";

export default function SiteGalleryPage() {
  return (
    <SiteShell documentTitle="Gallery • Medha">
      <section className="page-banner">
        <div className="container">
          <h1>Gallery</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Gallery
              </li>
            </ol>
          </nav>
        </div>
      </section>
      <section className="site-sec">
        <div className="container">
          <div className="sec-head">
            <span>Gallery</span>
            <h2>Click a tile to enlarge</h2>
            <i />
          </div>
          <div className="row g-3">
            <div className="col-6 col-md-4">
              <button
                className="g-tile"
                style={{
                  background:
                    "linear-gradient(135deg,var(--ms-4a2e1b,#4a2e1b),var(--ms-0f0804,#0f0804))",
                }}
                data-bs-toggle="modal"
                data-bs-target="#lightbox"
                data-caption="Proin vitae luctus dui, sit amet ultricies leo (1)"
                data-bg="linear-gradient(135deg,#4a2e1b,#0f0804)"
                aria-label="Open image 1"
              >
                <span>
                  <svg className="icon ">
                    <use href="#i-image" />
                  </svg>
                </span>
                <em>Proin vitae luctus dui, sit amet ultricies leo</em>
              </button>
            </div>
            <div className="col-6 col-md-4">
              <button
                className="g-tile"
                style={{
                  background:
                    "linear-gradient(135deg,var(--ms-b45309,#b45309),var(--ms-4a2e1b,#4a2e1b))",
                }}
                data-bs-toggle="modal"
                data-bs-target="#lightbox"
                data-caption="Proin vitae luctus dui, sit amet ultricies leo (2)"
                data-bg="linear-gradient(135deg,#b45309,#4a2e1b)"
                aria-label="Open image 2"
              >
                <span>
                  <svg className="icon ">
                    <use href="#i-image" />
                  </svg>
                </span>
                <em>Proin vitae luctus dui, sit amet ultricies leo</em>
              </button>
            </div>
            <div className="col-6 col-md-4">
              <button
                className="g-tile"
                style={{
                  background:
                    "linear-gradient(135deg,var(--ms-d99b26,#d99b26),var(--ms-b45309,#b45309))",
                }}
                data-bs-toggle="modal"
                data-bs-target="#lightbox"
                data-caption="Proin vitae luctus dui, sit amet ultricies leo (3)"
                data-bg="linear-gradient(135deg,#d99b26,#b45309)"
                aria-label="Open image 3"
              >
                <span>
                  <svg className="icon ">
                    <use href="#i-image" />
                  </svg>
                </span>
                <em>Proin vitae luctus dui, sit amet ultricies leo</em>
              </button>
            </div>
            <div className="col-6 col-md-4">
              <button
                className="g-tile"
                style={{ background: "linear-gradient(135deg,#45806b,var(--ms-2c190e,#2c190e))" }}
                data-bs-toggle="modal"
                data-bs-target="#lightbox"
                data-caption="Proin vitae luctus dui, sit amet ultricies leo (4)"
                data-bg="linear-gradient(135deg,#45806b,#2c190e)"
                aria-label="Open image 4"
              >
                <span>
                  <svg className="icon ">
                    <use href="#i-image" />
                  </svg>
                </span>
                <em>Proin vitae luctus dui, sit amet ultricies leo</em>
              </button>
            </div>
            <div className="col-6 col-md-4">
              <button
                className="g-tile"
                style={{
                  background:
                    "linear-gradient(135deg,var(--ms-5b7f95,#5b7f95),var(--ms-4a2e1b,#4a2e1b))",
                }}
                data-bs-toggle="modal"
                data-bs-target="#lightbox"
                data-caption="Proin vitae luctus dui, sit amet ultricies leo (5)"
                data-bg="linear-gradient(135deg,#5b7f95,#4a2e1b)"
                aria-label="Open image 5"
              >
                <span>
                  <svg className="icon ">
                    <use href="#i-image" />
                  </svg>
                </span>
                <em>Proin vitae luctus dui, sit amet ultricies leo</em>
              </button>
            </div>
            <div className="col-6 col-md-4">
              <button
                className="g-tile"
                style={{ background: "linear-gradient(135deg,#b0473a,var(--ms-4a2e1b,#4a2e1b))" }}
                data-bs-toggle="modal"
                data-bs-target="#lightbox"
                data-caption="Proin vitae luctus dui, sit amet ultricies leo (6)"
                data-bg="linear-gradient(135deg,#b0473a,#4a2e1b)"
                aria-label="Open image 6"
              >
                <span>
                  <svg className="icon ">
                    <use href="#i-image" />
                  </svg>
                </span>
                <em>Proin vitae luctus dui, sit amet ultricies leo</em>
              </button>
            </div>
            <div className="col-6 col-md-4">
              <button
                className="g-tile"
                style={{
                  background:
                    "linear-gradient(135deg,var(--ms-7a3806,#7a3806),var(--ms-d99b26,#d99b26))",
                }}
                data-bs-toggle="modal"
                data-bs-target="#lightbox"
                data-caption="Proin vitae luctus dui, sit amet ultricies leo (7)"
                data-bg="linear-gradient(135deg,#7a3806,#d99b26)"
                aria-label="Open image 7"
              >
                <span>
                  <svg className="icon ">
                    <use href="#i-image" />
                  </svg>
                </span>
                <em>Proin vitae luctus dui, sit amet ultricies leo</em>
              </button>
            </div>
            <div className="col-6 col-md-4">
              <button
                className="g-tile"
                style={{
                  background:
                    "linear-gradient(135deg,var(--ms-2c190e,#2c190e),var(--ms-b45309,#b45309))",
                }}
                data-bs-toggle="modal"
                data-bs-target="#lightbox"
                data-caption="Proin vitae luctus dui, sit amet ultricies leo (8)"
                data-bg="linear-gradient(135deg,#2c190e,#b45309)"
                aria-label="Open image 8"
              >
                <span>
                  <svg className="icon ">
                    <use href="#i-image" />
                  </svg>
                </span>
                <em>Proin vitae luctus dui, sit amet ultricies leo</em>
              </button>
            </div>
            <div className="col-6 col-md-4">
              <button
                className="g-tile"
                style={{
                  background:
                    "linear-gradient(135deg,var(--ms-a8750f,#a8750f),var(--ms-4a2e1b,#4a2e1b))",
                }}
                data-bs-toggle="modal"
                data-bs-target="#lightbox"
                data-caption="Proin vitae luctus dui, sit amet ultricies leo (9)"
                data-bg="linear-gradient(135deg,#a8750f,#4a2e1b)"
                aria-label="Open image 9"
              >
                <span>
                  <svg className="icon ">
                    <use href="#i-image" />
                  </svg>
                </span>
                <em>Proin vitae luctus dui, sit amet ultricies leo</em>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="modal fade" id="lightbox" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="lb-cap">
                Image
              </h5>
              <button className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="lb-img" id="lb-img" />
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
