import { useId, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { AppShell } from "../components/medha/AppShell";
import { Icon } from "../components/medha/Icon";
import { PageHeading } from "../components/medha/PageHeading";
import { CATALOG, type CatalogSection } from "../medha/catalog";

const tabId = (section: CatalogSection) =>
  section.section.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/**
 * Every page of the Medha theme, one tab per sidebar section. Open a page to see its components
 * working, then copy the markup you need into your own component.
 */
export function ComponentExplorerPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const searchId = useId();
  const active = CATALOG.find((section) => tabId(section) === params.get("tab")) ?? CATALOG[0];
  const needle = query.trim().toLowerCase();
  const items = (active?.items ?? []).filter(
    (item) =>
      needle.length === 0 ||
      item.label.toLowerCase().includes(needle) ||
      item.description.toLowerCase().includes(needle),
  );

  return (
    <AppShell title="Component explorer">
      <PageHeading
        eyebrow="WORKSPACE"
        title="Component explorer"
        description="Every Medha page and component, grouped as in the sidebar. Open one, then reuse its markup in your own screens."
      />
      <section className="panel mb-4">
        <div className="panel-heading">
          <div>
            <h2>Browse by section</h2>
            <p>{`${CATALOG.reduce((total, section) => total + section.items.length, 0)} pages in ${CATALOG.length} sections`}</p>
          </div>
          <div>
            <label className="visually-hidden" htmlFor={searchId}>
              Filter pages
            </label>
            <input
              id={searchId}
              type="search"
              className="form-control"
              placeholder="Filter this section…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="panel-body">
          <div className="nav nav-tabs mb-3" role="tablist" aria-label="Sections">
            {CATALOG.map((section) => {
              const selected = section === active;
              return (
                <button
                  key={section.section}
                  type="button"
                  role="tab"
                  id={`tab-${tabId(section)}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tabId(section)}`}
                  className={selected ? "nav-link active" : "nav-link"}
                  onClick={() => setParams({ tab: tabId(section) })}
                >
                  {section.section}
                  <span className="badge bg-light text-dark ms-2">{section.items.length}</span>
                </button>
              );
            })}
          </div>
          {active ? (
            <div
              role="tabpanel"
              id={`panel-${tabId(active)}`}
              aria-labelledby={`tab-${tabId(active)}`}
              className="row g-3"
            >
              {items.map((item) => (
                <div key={item.path} className="col-md-6 col-xl-4">
                  <article className="panel h-100 mb-0">
                    <div className="panel-heading">
                      <div>
                        <h2>
                          <Icon name={item.icon} /> {item.label}
                        </h2>
                        <p>{item.description || "Medha page"}</p>
                      </div>
                    </div>
                    <div className="panel-body d-flex justify-content-between align-items-center gap-2">
                      <code className="small text-truncate">{`src/medha/pages/${item.component}.tsx`}</code>
                      <Link className="btn btn-primary btn-sm" to={item.path}>
                        Open
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
              {items.length === 0 ? <p className="text-muted">No page matches “{query}”.</p> : null}
            </div>
          ) : null}
        </div>
      </section>
    </AppShell>
  );
}
