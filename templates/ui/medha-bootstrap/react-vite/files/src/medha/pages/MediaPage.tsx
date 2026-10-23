// Ported from the Medha theme by medha-starter. Source: media.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function MediaPage() {
  return (
    <AppShell title="Media objects" documentTitle="Media objects • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">COMPONENTS</div>
          <h1>Media objects</h1>
          <p>Avatar and text layouts.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Media objects</h2>
            <p>Avatar and text layouts, with nesting</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="d-flex mb-4">
            <span className="avatar ">MC</span>
            <div className="ms-3">
              <h3 className="mh">Media heading</h3>
              <p>
                Gateway telemetry is aggregated per site and delivered to the dashboard in near real
                time.
              </p>
              <div className="d-flex mb-4">
                <span className="avatar ">NK</span>
                <div className="ms-3">
                  <h3 className="mh">Nested media heading</h3>
                  <p>Nested media object inside a parent.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex mb-4">
            <span className="avatar ">AL</span>
            <div className="ms-3">
              <h3 className="mh">Media heading</h3>
              <p>
                Gateway telemetry is aggregated per site and delivered to the dashboard in near real
                time.
              </p>
            </div>
          </div>
          <div className="d-flex mb-4 justify-content-end text-end">
            <div className="me-3">
              <h3 className="mh">Right-aligned</h3>
              <p>
                Gateway telemetry is aggregated per site and delivered to the dashboard in near real
                time.
              </p>
            </div>
            <span className="avatar ">JJ</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="avatar ">DL</span>
            <div className="ms-3">
              <h3 className="mh">Vertically centred</h3>
              <p>Aligned to the middle of the avatar.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Media list</h2>
            <p>Stacked list of media items</p>
          </div>
        </div>
        <div className="panel-body">
          <ul className="list-unstyled mb-0">
            <li className="d-flex mb-3">
              <span className="avatar ">MC</span>
              <div className="ms-3">
                <h3 className="mh">Michael</h3>
                <p>List item 1 description.</p>
              </div>
            </li>
            <li className="d-flex mb-3">
              <span className="avatar ">AL</span>
              <div className="ms-3">
                <h3 className="mh">Alexander</h3>
                <p>List item 2 description.</p>
              </div>
            </li>
            <li className="d-flex mb-3">
              <span className="avatar ">DL</span>
              <div className="ms-3">
                <h3 className="mh">Daniel</h3>
                <p>List item 3 description.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </AppShell>
  );
}
