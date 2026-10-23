// Ported from the Medha theme by medha-starter. Source: charts.html. Regenerated from the theme; build new screens from these components.
import type { CSSProperties } from "react";
import { AppShell } from "../../components/medha/AppShell";

export default function ChartsPage() {
  return (
    <AppShell title="Charts" documentTitle="Charts • Medha IoT">
      <section className="page-heading">
        <div>
          <div className="eyebrow">FORMS &amp; DATA</div>
          <h1>Charts</h1>
          <p>Line, bar, donut, stacked, combo, scatter and dual-axis charts.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <div className="row g-3">
        <div className="col-xl-8">
          <section className="panel h-100 mb-4">
            <div className="panel-heading">
              <div>
                <h2>Power output</h2>
                <p>Sample line chart</p>
              </div>
            </div>
            <div className="panel-body">
              <svg
                viewBox="0 0 640 220"
                role="img"
                aria-label="Sample power output by hour"
                style={{ width: "100%" }}
              >
                <title>Power output (kW), sample hours 06:00–17:00</title>
                <line x1="40" x2="620" y1="190.0" y2="190.0" stroke="var(--ms-ece8e1,#ece8e1)" />
                <line x1="40" x2="620" y1="136.7" y2="136.7" stroke="var(--ms-ece8e1,#ece8e1)" />
                <line x1="40" x2="620" y1="83.3" y2="83.3" stroke="var(--ms-ece8e1,#ece8e1)" />
                <line x1="40" x2="620" y1="30.0" y2="30.0" stroke="var(--ms-ece8e1,#ece8e1)" />
                <path
                  d="M40.0,174.0 L92.7,163.3 L145.5,142.0 L198.2,115.3 L250.9,88.7 L303.6,62.0 L356.4,46.0 L409.1,51.3 L461.8,78.0 L514.5,115.3 L567.3,147.3 L620.0,168.7 L620.0,190 L40.0,190Z"
                  fill="var(--ms-d99b26,#d99b26)"
                  opacity=".18"
                />
                <path
                  d="M40.0,174.0 L92.7,163.3 L145.5,142.0 L198.2,115.3 L250.9,88.7 L303.6,62.0 L356.4,46.0 L409.1,51.3 L461.8,78.0 L514.5,115.3 L567.3,147.3 L620.0,168.7"
                  fill="none"
                  stroke="var(--ms-b45309,#b45309)"
                  strokeWidth="2.5"
                />
                <text x="40.0" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  6:00
                </text>
                <text x="92.7" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  7:00
                </text>
                <text x="145.5" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  8:00
                </text>
                <text x="198.2" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  9:00
                </text>
                <text x="250.9" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  10:00
                </text>
                <text x="303.6" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  11:00
                </text>
                <text x="356.4" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  12:00
                </text>
                <text x="409.1" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  13:00
                </text>
                <text x="461.8" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  14:00
                </text>
                <text x="514.5" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  15:00
                </text>
                <text x="567.3" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  16:00
                </text>
                <text x="620.0" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  17:00
                </text>
              </svg>
            </div>
          </section>
        </div>
        <div className="col-xl-4">
          <section className="panel h-100 mb-4">
            <div className="panel-heading">
              <div>
                <h2>Source mix</h2>
                <p>Sample donut chart</p>
              </div>
            </div>
            <div className="panel-body">
              <div className="d-flex align-items-center gap-4 flex-wrap justify-content-center">
                <svg viewBox="0 0 180 180" width="180" role="img" aria-label="Energy source mix">
                  <title>Energy source mix</title>
                  <circle
                    r="60"
                    cx="90"
                    cy="90"
                    fill="none"
                    stroke="var(--ms-b45309,#b45309)"
                    strokeWidth="26"
                    strokeDasharray="196.0 181.0"
                    strokeDashoffset="0.0"
                    transform="rotate(-90 90 90)"
                  />
                  <circle
                    r="60"
                    cx="90"
                    cy="90"
                    fill="none"
                    stroke="var(--ms-d99b26,#d99b26)"
                    strokeWidth="26"
                    strokeDasharray="105.6 271.4"
                    strokeDashoffset="-196.0"
                    transform="rotate(-90 90 90)"
                  />
                  <circle
                    r="60"
                    cx="90"
                    cy="90"
                    fill="none"
                    stroke="var(--ms-4a2e1b,#4a2e1b)"
                    strokeWidth="26"
                    strokeDasharray="75.4 301.6"
                    strokeDashoffset="-301.6"
                    transform="rotate(-90 90 90)"
                  />
                </svg>
                <div style={{ minWidth: "150px" }}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <i className="legend-dot" style={{ background: "var(--ms-b45309,#b45309)" }} />
                    Solar <strong className="ms-auto">52%</strong>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <i className="legend-dot" style={{ background: "var(--ms-d99b26,#d99b26)" }} />
                    Grid <strong className="ms-auto">28%</strong>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <i className="legend-dot" style={{ background: "var(--ms-4a2e1b,#4a2e1b)" }} />
                    Storage <strong className="ms-auto">20%</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="col-xl-6">
          <section className="panel  mb-4">
            <div className="panel-heading">
              <div>
                <h2>Energy by site</h2>
                <p>Sample bar chart</p>
              </div>
            </div>
            <div className="panel-body">
              <svg
                viewBox="0 0 420 220"
                role="img"
                aria-label="Sample energy by site"
                style={{ width: "100%" }}
              >
                <title>Energy today by site (kWh)</title>
                <line x1="40" x2="410" y1="190" y2="190" stroke="var(--ms-ece8e1,#ece8e1)" />
                <rect
                  x="60"
                  y="44.4"
                  width="70"
                  height="145.6"
                  rx="6"
                  fill="var(--ms-b45309,#b45309)"
                />
                <text
                  x="95"
                  y="38.4"
                  fontSize="11"
                  textAnchor="middle"
                  fill="var(--ms-0f172a,#0f172a)"
                >
                  182
                </text>
                <text x="95" y="210" fontSize="11" textAnchor="middle" fill="#8a9299">
                  Ahmedabad
                </text>
                <rect
                  x="175"
                  y="77.2"
                  width="70"
                  height="112.8"
                  rx="6"
                  fill="var(--ms-d99b26,#d99b26)"
                />
                <text
                  x="210"
                  y="71.2"
                  fontSize="11"
                  textAnchor="middle"
                  fill="var(--ms-0f172a,#0f172a)"
                >
                  141
                </text>
                <text x="210" y="210" fontSize="11" textAnchor="middle" fill="#8a9299">
                  Vadodara
                </text>
                <rect
                  x="290"
                  y="59.6"
                  width="70"
                  height="130.4"
                  rx="6"
                  fill="var(--ms-4a2e1b,#4a2e1b)"
                />
                <text
                  x="325"
                  y="53.6"
                  fontSize="11"
                  textAnchor="middle"
                  fill="var(--ms-0f172a,#0f172a)"
                >
                  163
                </text>
                <text x="325" y="210" fontSize="11" textAnchor="middle" fill="#8a9299">
                  Surat
                </text>
              </svg>
            </div>
          </section>
        </div>
        <div className="col-xl-6">
          <section className="panel  mb-4">
            <div className="panel-heading">
              <div>
                <h2>Progress</h2>
                <p>Circular and linear indicators</p>
              </div>
            </div>
            <div className="panel-body">
              <div className="ring-grid">
                <div className="ring" style={{ "--v": "92" } as CSSProperties}>
                  <span>92%</span>
                  <small>Uptime</small>
                </div>
                <div className="ring" style={{ "--v": "76" } as CSSProperties}>
                  <span>76%</span>
                  <small>Capacity</small>
                </div>
                <div className="ring" style={{ "--v": "58" } as CSSProperties}>
                  <span>58%</span>
                  <small>Storage</small>
                </div>
              </div>
              <div className="mt-4">
                <div className="progress">
                  <div className="progress-bar" style={{ width: "80%" }} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="row g-3 mt-1">
        <div className="col-xl-6">
          <section className="panel  mb-4">
            <div className="panel-heading">
              <div>
                <h2>Stacked bar chart</h2>
                <p>Energy by source per quarter</p>
              </div>
            </div>
            <div className="panel-body">
              <svg
                viewBox="0 0 420 220"
                style={{ width: "100%" }}
                role="img"
                aria-label="Stacked bars by quarter"
              >
                <title>Stacked energy by source per quarter</title>
                <line x1="40" x2="410" y1="190" y2="190" stroke="var(--ms-ece8e1,#ece8e1)" />
                <rect x="50" y="134.0" width="60" height="56.0" fill="var(--ms-b45309,#b45309)" />
                <rect x="50" y="92.0" width="60" height="42.0" fill="var(--ms-d99b26,#d99b26)" />
                <rect x="50" y="64.0" width="60" height="28.0" fill="var(--ms-4a2e1b,#4a2e1b)" />
                <text x="80" y="210" fontSize="11" textAnchor="middle" fill="#8a9299">
                  Q1
                </text>
                <rect x="142" y="113.0" width="60" height="77.0" fill="var(--ms-b45309,#b45309)" />
                <rect x="142" y="78.0" width="60" height="35.0" fill="var(--ms-d99b26,#d99b26)" />
                <rect x="142" y="57.0" width="60" height="21.0" fill="var(--ms-4a2e1b,#4a2e1b)" />
                <text x="172" y="210" fontSize="11" textAnchor="middle" fill="#8a9299">
                  Q2
                </text>
                <rect x="234" y="141.0" width="60" height="49.0" fill="var(--ms-b45309,#b45309)" />
                <rect x="234" y="85.0" width="60" height="56.0" fill="var(--ms-d99b26,#d99b26)" />
                <rect x="234" y="50.0" width="60" height="35.0" fill="var(--ms-4a2e1b,#4a2e1b)" />
                <text x="264" y="210" fontSize="11" textAnchor="middle" fill="#8a9299">
                  Q3
                </text>
                <rect x="326" y="106.0" width="60" height="84.0" fill="var(--ms-b45309,#b45309)" />
                <rect x="326" y="78.0" width="60" height="28.0" fill="var(--ms-d99b26,#d99b26)" />
                <rect x="326" y="64.0" width="60" height="14.0" fill="var(--ms-4a2e1b,#4a2e1b)" />
                <text x="356" y="210" fontSize="11" textAnchor="middle" fill="#8a9299">
                  Q4
                </text>
              </svg>
            </div>
          </section>
        </div>
        <div className="col-xl-6">
          <section className="panel  mb-4">
            <div className="panel-heading">
              <div>
                <h2>Column &amp; line graph</h2>
                <p>Monthly output with trend</p>
              </div>
            </div>
            <div className="panel-body">
              <svg
                viewBox="0 0 420 220"
                style={{ width: "100%" }}
                role="img"
                aria-label="Column and line combination"
              >
                <title>Columns with line overlay</title>
                <line x1="40" x2="410" y1="190" y2="190" stroke="var(--ms-ece8e1,#ece8e1)" />
                <rect
                  x="50"
                  y="126.0"
                  width="34"
                  height="64.0"
                  rx="4"
                  fill="var(--ms-d99b26,#d99b26)"
                />
                <text x="67" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  M1
                </text>
                <rect
                  x="108"
                  y="86.0"
                  width="34"
                  height="104.0"
                  rx="4"
                  fill="var(--ms-d99b26,#d99b26)"
                />
                <text x="125" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  M2
                </text>
                <rect
                  x="166"
                  y="110.0"
                  width="34"
                  height="80.0"
                  rx="4"
                  fill="var(--ms-d99b26,#d99b26)"
                />
                <text x="183" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  M3
                </text>
                <rect
                  x="224"
                  y="62.0"
                  width="34"
                  height="128.0"
                  rx="4"
                  fill="var(--ms-d99b26,#d99b26)"
                />
                <text x="241" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  M4
                </text>
                <rect
                  x="282"
                  y="78.0"
                  width="34"
                  height="112.0"
                  rx="4"
                  fill="var(--ms-d99b26,#d99b26)"
                />
                <text x="299" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  M5
                </text>
                <rect
                  x="340"
                  y="38.0"
                  width="34"
                  height="152.0"
                  rx="4"
                  fill="var(--ms-d99b26,#d99b26)"
                />
                <text x="357" y="210" fontSize="10" textAnchor="middle" fill="#8a9299">
                  M6
                </text>
                <path
                  d="M67,134.0 L125,99.0 L183,120.0 L241,78.0 L299,92.0 L357,57.0"
                  fill="none"
                  stroke="var(--ms-4a2e1b,#4a2e1b)"
                  strokeWidth="2.5"
                />
                <circle cx="67" cy="134.0" r="4" fill="var(--ms-4a2e1b,#4a2e1b)" />
                <circle cx="125" cy="99.0" r="4" fill="var(--ms-4a2e1b,#4a2e1b)" />
                <circle cx="183" cy="120.0" r="4" fill="var(--ms-4a2e1b,#4a2e1b)" />
                <circle cx="241" cy="78.0" r="4" fill="var(--ms-4a2e1b,#4a2e1b)" />
                <circle cx="299" cy="92.0" r="4" fill="var(--ms-4a2e1b,#4a2e1b)" />
                <circle cx="357" cy="57.0" r="4" fill="var(--ms-4a2e1b,#4a2e1b)" />
              </svg>
            </div>
          </section>
        </div>
        <div className="col-xl-6">
          <section className="panel  mb-4">
            <div className="panel-heading">
              <div>
                <h2>Points</h2>
                <p>Scatter plot</p>
              </div>
            </div>
            <div className="panel-body">
              <svg
                viewBox="0 0 420 220"
                style={{ width: "100%" }}
                role="img"
                aria-label="Scatter points"
              >
                <title>Scatter plot, temperature vs output</title>
                <line x1="40" x2="410" y1="190" y2="190" stroke="var(--ms-ece8e1,#ece8e1)" />
                <line x1="40" x2="40" y1="10" y2="190" stroke="var(--ms-ece8e1,#ece8e1)" />
                <circle cx="57.5" cy="186.4" r="4" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="75.0" cy="147.0" r="5" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="92.5" cy="176.0" r="4" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="110.0" cy="177.0" r="6" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="127.5" cy="110.8" r="4" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="145.0" cy="148.3" r="6" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="162.5" cy="131.5" r="4" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="180.0" cy="93.4" r="5" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="197.5" cy="125.4" r="4" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="215.0" cy="77.6" r="5" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="232.5" cy="71.7" r="4" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="250.0" cy="105.2" r="5" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="267.5" cy="67.3" r="6" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="285.0" cy="37.8" r="5" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="302.5" cy="86.9" r="6" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="320.0" cy="62.8" r="5" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="337.5" cy="44.0" r="4" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="355.0" cy="53.0" r="5" fill="var(--ms-b45309,#b45309)" opacity=".65" />
                <circle cx="372.5" cy="55.5" r="6" fill="var(--ms-b45309,#b45309)" opacity=".65" />
              </svg>
            </div>
          </section>
        </div>
        <div className="col-xl-6">
          <section className="panel  mb-4">
            <div className="panel-heading">
              <div>
                <h2>Multiple y-axis</h2>
                <p>Output vs temperature</p>
              </div>
            </div>
            <div className="panel-body">
              <svg
                viewBox="0 0 420 220"
                style={{ width: "100%" }}
                role="img"
                aria-label="Two lines on separate axes"
              >
                <title>Multiple y-axis line chart</title>
                <line x1="40" x2="410" y1="190" y2="190" stroke="var(--ms-ece8e1,#ece8e1)" />
                <path
                  d="M50,146.0 L102,113.0 L154,124.0 L206,80.0 L258,53.6 L310,69.0 L362,36.0"
                  fill="none"
                  stroke="var(--ms-b45309,#b45309)"
                  strokeWidth="2.5"
                />
                <path
                  d="M50,46.0 L102,82.0 L154,71.2 L206,109.0 L258,121.6 L310,114.4 L362,145.0"
                  fill="none"
                  stroke="var(--ms-4a2e1b,#4a2e1b)"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />
                <text x="8" y="20" fontSize="10" fill="var(--ms-b45309,#b45309)">
                  kW
                </text>
                <text x="390" y="20" fontSize="10" fill="var(--ms-4a2e1b,#4a2e1b)">
                  °C
                </text>
              </svg>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
