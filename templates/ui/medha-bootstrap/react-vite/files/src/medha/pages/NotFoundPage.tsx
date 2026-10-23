// Ported from the Medha theme by medha-starter. Source: 404.html. Regenerated from the theme; build new screens from these components.
import { Link } from "react-router";
import { AuthShell } from "../../components/medha/AuthShell";

export default function NotFoundPage() {
  return (
    <AuthShell documentTitle="Page not found • Medha IoT">
      <div className="auth-card">
        <Link to="/dashboard" className="auth-logo">
          <img
            src="/medha/medha-logo.svg"
            alt="Medha Techno Research LLP"
            width="220"
            height="65"
          />
        </Link>
        <div className="err-code">404</div>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/dashboard" className="btn btn-primary mt-3">
          Back to dashboard
        </Link>
      </div>
      <p className="auth-foot">© 2026 Medha Techno Research LLP</p>
    </AuthShell>
  );
}
