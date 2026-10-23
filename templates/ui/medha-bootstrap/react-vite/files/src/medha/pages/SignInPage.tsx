// Ported from the Medha theme by medha-starter. Source: signin.html. Regenerated from the theme; build new screens from these components.
import { Link } from "react-router";
import { AuthShell } from "../../components/medha/AuthShell";

export default function SignInPage() {
  return (
    <AuthShell documentTitle="Sign in • Medha IoT">
      <div className="auth-card">
        <Link to="/dashboard" className="auth-logo">
          <img
            src="/medha/medha-logo.svg"
            alt="Medha Techno Research LLP"
            width="220"
            height="65"
          />
        </Link>
        <h1>Sign in</h1>
        <p>Welcome back to the Medha IoT console.</p>
        <form className="needs-validation" noValidate data-redirect="/dashboard">
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
            <input id="p" type="password" className="form-control" required />
            <div className="invalid-feedback">Enter your password.</div>
          </div>
          <button className="btn btn-primary w-100 mt-2" type="submit">
            Sign in
          </button>
        </form>
        <p className="mt-3 text-center">
          <Link to="/register">Create an account</Link>
        </p>
        <p className="note">Demo page: no authentication is performed.</p>
      </div>
      <p className="auth-foot">© 2026 Medha Techno Research LLP</p>
    </AuthShell>
  );
}
