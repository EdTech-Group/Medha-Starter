// Ported from the Medha theme by medha-starter. Source: calendar.html. Regenerated from the theme; build new screens from these components.
import { AppShell } from "../../components/medha/AppShell";

export default function CalendarPage() {
  return (
    <AppShell title="Calendar" documentTitle="Calendar • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">FORMS &amp; DATA</div>
          <h1>Calendar</h1>
          <p>Maintenance and event schedule (sample).</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel mb-4">
        <div className="panel-heading">
          <div>
            <h2 id="cal-title">Month</h2>
            <p>Sample maintenance windows highlighted</p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              id="cal-prev"
              aria-label="Previous month"
            >
              ←
            </button>
            <button className="btn btn-outline-secondary btn-sm" id="cal-today">
              Today
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              id="cal-next"
              aria-label="Next month"
            >
              →
            </button>
          </div>
        </div>
        <div className="panel-body">
          <div id="calendar" className="calendar" />
        </div>
      </section>
    </AppShell>
  );
}
