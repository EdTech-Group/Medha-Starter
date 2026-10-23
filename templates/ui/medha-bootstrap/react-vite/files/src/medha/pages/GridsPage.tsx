// Ported from the Medha theme by medha-starter. Source: grids.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function GridsPage() {
  return (
    <AppShell title="Grids" documentTitle="Grids • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">COMPONENTS</div>
          <h1>Grids</h1>
          <p>Responsive layout grid.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Twelve-column grid</h2>
            <p>Bootstrap 5 responsive grid</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="row g-3 mb-3">
            <div className="col-1">
              <div className="grid-cell">1</div>
            </div>
            <div className="col-1">
              <div className="grid-cell">1</div>
            </div>
            <div className="col-1">
              <div className="grid-cell">1</div>
            </div>
            <div className="col-1">
              <div className="grid-cell">1</div>
            </div>
            <div className="col-1">
              <div className="grid-cell">1</div>
            </div>
            <div className="col-1">
              <div className="grid-cell">1</div>
            </div>
            <div className="col-1">
              <div className="grid-cell">1</div>
            </div>
            <div className="col-1">
              <div className="grid-cell">1</div>
            </div>
            <div className="col-1">
              <div className="grid-cell">1</div>
            </div>
            <div className="col-1">
              <div className="grid-cell">1</div>
            </div>
            <div className="col-1">
              <div className="grid-cell">1</div>
            </div>
            <div className="col-1">
              <div className="grid-cell">1</div>
            </div>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-md-8">
              <div className="grid-cell">col-md-8</div>
            </div>
            <div className="col-md-4">
              <div className="grid-cell">col-md-4</div>
            </div>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <div className="grid-cell">col-md-4</div>
            </div>
            <div className="col-md-4">
              <div className="grid-cell">col-md-4</div>
            </div>
            <div className="col-md-4">
              <div className="grid-cell">col-md-4</div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="grid-cell">col-md-6</div>
            </div>
            <div className="col-md-6">
              <div className="grid-cell">col-md-6</div>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Responsive stack</h2>
            <p>Columns collapse at small widths</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <div className="col-sm-6 col-lg-3">
              <div className="grid-cell">col-sm-6 col-lg-3</div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="grid-cell">col-sm-6 col-lg-3</div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="grid-cell">col-sm-6 col-lg-3</div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="grid-cell">col-sm-6 col-lg-3</div>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
