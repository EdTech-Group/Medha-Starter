// Ported from the Medha theme by medha-starter. Source: blank.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function BlankPage() {
  return (
    <AppShell title="Blank page" documentTitle="Blank page • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">PAGES</div>
          <h1>Blank page</h1>
          <p>Start building here.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Your content</h2>
            <p>Use this page as a starting point.</p>
          </div>
        </div>
        <div className="panel-body">
          <p>Add components here.</p>
        </div>
      </section>
    </AppShell>
  );
}
