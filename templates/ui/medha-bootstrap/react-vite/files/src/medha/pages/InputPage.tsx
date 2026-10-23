// Ported from the Medha theme by medha-starter. Source: input.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function InputPage() {
  return (
    <AppShell title="Inputs" documentTitle="Inputs • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">FORMS</div>
          <h1>Inputs</h1>
          <p>Text fields, selects, checks, switches and form layouts.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Text inputs</h2>
            <p>Controls styled for the Medha theme</p>
          </div>
        </div>
        <div className="panel-body">
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label" htmlFor="f1">
                Gateway name
              </label>
              <input id="f1" className="form-control" placeholder="Ahmedabad GW-01" />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="f2">
                Serial number
              </label>
              <input id="f2" className="form-control" placeholder="MS-000123" />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="f3">
                Site
              </label>
              <select id="f3" className="form-select">
                <option>Ahmedabad</option>
                <option>Vadodara</option>
                <option>Surat</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="f4">
                Email
              </label>
              <div className="input-group">
                <span className="input-group-text">@</span>
                <input
                  id="f4"
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                />
              </div>
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="f5">
                Notes
              </label>
              <textarea id="f5" className="form-control" rows={3} />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="f6">
                Upload
              </label>
              <input id="f6" type="file" className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="f7">
                Threshold
              </label>
              <input id="f7" type="range" className="form-range" />
            </div>
          </form>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Checks, radios &amp; switches</h2>
            <p />
          </div>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-4">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="c1" defaultChecked />
                <label className="form-check-label" htmlFor="c1">
                  Email alerts
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="c2" />
                <label className="form-check-label" htmlFor="c2">
                  SMS alerts
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="r" id="r1" defaultChecked />
                <label className="form-check-label" htmlFor="r1">
                  Hourly
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="r" id="r2" />
                <label className="form-check-label" htmlFor="r2">
                  Daily
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="s1" defaultChecked />
                <label className="form-check-label" htmlFor="s1">
                  Live polling
                </label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="s2" />
                <label className="form-check-label" htmlFor="s2">
                  Maintenance mode
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Horizontal form</h2>
            <p>Labels beside fields</p>
          </div>
        </div>
        <div className="panel-body">
          <form>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label" htmlFor="h1">
                Email
              </label>
              <div className="col-sm-9">
                <input id="h1" type="email" className="form-control" />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label" htmlFor="h2">
                Password
              </label>
              <div className="col-sm-9">
                <input id="h2" type="password" className="form-control" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-9 offset-sm-3">
                <button className="btn btn-primary">Sign in</button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Inline form, sizes &amp; floating labels</h2>
            <p />
          </div>
        </div>
        <div className="panel-body">
          <form className="row row-cols-lg-auto g-2 align-items-center mb-4">
            <div className="col-12">
              <input className="form-control" placeholder="Email" aria-label="Email" />
            </div>
            <div className="col-12">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                aria-label="Password"
              />
            </div>
            <div className="col-12">
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
          <input className="form-control form-control-lg mb-2" placeholder="Large" />
          <input className="form-control mb-2" placeholder="Default" />
          <input className="form-control form-control-sm mb-4" placeholder="Small" />
          <div className="form-floating">
            <input className="form-control" id="fl" placeholder="x" />
            <label htmlFor="fl">Floating label</label>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Selects &amp; checks</h2>
            <p>Sizes, multiple, disabled, inline checks and radios</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label" htmlFor="s1">
                Large select
              </label>
              <select id="s1" className="form-select form-select-lg">
                <option>Ahmedabad</option>
                <option>Vadodara</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="s2">
                Small select
              </label>
              <select id="s2" className="form-select form-select-sm">
                <option>Ahmedabad</option>
                <option>Vadodara</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="s3">
                Disabled
              </label>
              <select id="s3" className="form-select" disabled>
                <option>Disabled</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="s4">
                Multiple
              </label>
              <select
                defaultValue={["Ahmedabad"]}
                id="s4"
                className="form-select"
                multiple
                size={3}
              >
                <option>Ahmedabad</option>
                <option>Vadodara</option>
                <option>Surat</option>
              </select>
            </div>
            <div className="col-md-6">
              <div className="mb-2">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="ic1" />
                  <label className="form-check-label" htmlFor="ic1">
                    Inline 1
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="ic2" defaultChecked />
                  <label className="form-check-label" htmlFor="ic2">
                    Inline 2
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="ic3" disabled />
                  <label className="form-check-label" htmlFor="ic3">
                    Disabled
                  </label>
                </div>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ir"
                  id="ir1"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="ir1">
                  Radio 1
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="ir" id="ir2" />
                <label className="form-check-label" htmlFor="ir2">
                  Radio 2
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="ir" id="ir3" disabled />
                <label className="form-check-label" htmlFor="ir3">
                  Disabled
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Floating labels, range &amp; more inputs</h2>
            <p>Floating textarea/select, range, colour, datalist and read-only</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="ft1"
                  placeholder="x"
                  style={{ height: "100px" }}
                />
                <label htmlFor="ft1">Comments</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <select className="form-select" id="ft2">
                  <option>Ahmedabad</option>
                  <option>Vadodara</option>
                  <option>Surat</option>
                </select>
                <label htmlFor="ft2">Floating select</label>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="rg1">
                Range (min 0, max 5, step 0.5)
              </label>
              <input type="range" className="form-range" min="0" max="5" step="0.5" id="rg1" />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="rg2">
                Disabled range
              </label>
              <input type="range" className="form-range" id="rg2" disabled />
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="cl1">
                Colour
              </label>
              <input
                type="color"
                className="form-control form-control-color"
                id="cl1"
                defaultValue="#b45309"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="dl1">
                Datalist
              </label>
              <input className="form-control" list="dlo" id="dl1" placeholder="Type to search…" />
              <datalist id="dlo">
                <option value="Ahmedabad" />
                <option value="Vadodara" />
                <option value="Surat" />
              </datalist>
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="ro1">
                Read-only plain text
              </label>
              <input
                className="form-control-plaintext"
                id="ro1"
                readOnly
                defaultValue="email@example.com"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Input group variations</h2>
            <p>Sizing, checkbox/radio add-ons and multiple add-ons</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text">Large</span>
            <input className="form-control" aria-label="Large" />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text">Small</span>
            <input className="form-control" aria-label="Small" />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input className="form-check-input mt-0" type="checkbox" aria-label="Check" />
            </div>
            <input className="form-control" aria-label="With checkbox" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">$</span>
            <span className="input-group-text">0.00</span>
            <input className="form-control" aria-label="Amount" />
          </div>
          <div className="input-group">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              type="button"
            >
              Dropdown
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another
                </a>
              </li>
            </ul>
            <input className="form-control" aria-label="With dropdown" />
          </div>
        </div>
      </section>
    </AppShell>
  );
}
