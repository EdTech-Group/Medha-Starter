// Ported from the Medha theme by medha-starter. Source: signup.html. Regenerated from the theme; build new screens from these components.
import { Link } from "react-router";
import { AuthShell } from "../../components/medha/AuthShell";

export default function SignUpPage() {
  return (
    <AuthShell documentTitle="Sign up • Medha IoT">
      <div className="auth-card">
        <Link to="/dashboard" className="auth-logo">
          <img
            src="/medha/medha-logo.svg"
            alt="Medha Techno Research LLP"
            width="220"
            height="65"
          />
        </Link>
        <h1>Create account</h1>
        <p>Set up your Medha IoT workspace.</p>
        <form className="needs-validation" noValidate data-redirect="/login">
          <div className="mb-3">
            <label className="form-label" htmlFor="n">
              Full name
            </label>
            <input id="n" className="form-control" required />
            <div className="invalid-feedback">Enter your name.</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="e">
              Email
            </label>
            <input id="e" type="email" className="form-control" required />
            <div className="invalid-feedback">Enter a valid email.</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="p">
              Password
            </label>
            <input id="p" type="password" minLength={8} className="form-control" required />
            <div className="invalid-feedback">At least 8 characters.</div>
          </div>
          <button className="btn btn-primary w-100 mt-2" type="submit">
            Sign up
          </button>
        </form>
        <p className="mt-3 text-center">
          <Link to="/login">Already have an account?</Link>
        </p>
        <p className="note">Demo page: no account is created.</p>
      </div>
      <p className="auth-foot">© 2026 Medha Techno Research LLP</p>
    </AuthShell>
  );
}
