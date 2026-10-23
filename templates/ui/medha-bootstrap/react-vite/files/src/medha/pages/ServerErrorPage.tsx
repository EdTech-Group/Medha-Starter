// Ported from the Medha theme by medha-starter. Source: 500.html. Regenerated from the theme; build new screens from these components.
import { Link } from "react-router";
import { AuthShell } from "../../components/medha/AuthShell";

export default function ServerErrorPage() {
  return (
    <AuthShell documentTitle="Server error • Medha IoT">
      <div className="auth-card">
        <Link to="/dashboard" className="auth-logo">
          <img
            src="/medha/medha-logo.svg"
            alt="Medha Techno Research LLP"
            width="220"
            height="65"
          />
        </Link>
        <div className="err-code">500</div>
        <h1>Oops! Something went wrong.</h1>
        <p>We hit an unexpected error. Please try again shortly.</p>
        <Link to="/dashboard" className="btn btn-primary mt-3">
          Back to dashboard
        </Link>
      </div>
      <p className="auth-foot">© 2026 Medha Techno Research LLP</p>
    </AuthShell>
  );
}
