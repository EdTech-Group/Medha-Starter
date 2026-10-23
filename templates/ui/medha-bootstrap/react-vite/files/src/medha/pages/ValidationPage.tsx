// Ported from the Medha theme by medha-starter. Source: validation.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function ValidationPage() {
  return (
    <AppShell title="Validation" documentTitle="Validation • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">FORMS</div>
          <h1>Validation</h1>
          <p>Bootstrap validation states.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Form validation</h2>
            <p>Client-side validation using Bootstrap 5 styles</p>
          </div>
        </div>
        <div className="panel-body">
          <form className="row g-3 needs-validation" noValidate>
            <div className="col-md-6">
              <label className="form-label" htmlFor="v1">
                Full name
              </label>
              <input id="v1" className="form-control" required />
              <div className="invalid-feedback">Please enter your name.</div>
              <div className="valid-feedback">Looks good.</div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="v2">
                Email
              </label>
              <input id="v2" type="email" className="form-control" required />
              <div className="invalid-feedback">Enter a valid email address.</div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="v3">
                Site
              </label>
              <select id="v3" className="form-select" required>
                <option value="">Choose…</option>
                <option>Ahmedabad</option>
                <option>Vadodara</option>
                <option>Surat</option>
              </select>
              <div className="invalid-feedback">Select a site.</div>
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="v4">
                Password (min 8)
              </label>
              <input id="v4" type="password" className="form-control" minLength={8} required />
              <div className="invalid-feedback">At least 8 characters.</div>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="v5" required />
                <label className="form-check-label" htmlFor="v5">
                  Agree to terms
                </label>
                <div className="invalid-feedback">You must agree first.</div>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Submit form
              </button>
            </div>
          </form>
        </div>
      </section>
    </AppShell>
  );
}
