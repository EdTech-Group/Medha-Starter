// Ported from the Medha theme by medha-starter. Source: editor.html. Regenerated from the theme; build new screens from these components.
import { Link } from "react-router";
import { AppShell } from "../../components/medha/AppShell";
import wysiwygCss from "../styles/wysiwyg.css?inline";
import schemeCss from "../styles/scheme.css?inline";
import schemeScript from "../scripts/scheme";
import pagesScript from "../scripts/pages";
import wysiwygScript from "../scripts/wysiwyg";

export default function EditorPage() {
  return (
    <AppShell
      title="Editor"
      documentTitle="Editor • Medha IoT"
      styles={[wysiwygCss, schemeCss]}
      scripts={[schemeScript, pagesScript, wysiwygScript]}
    >
      <section className="page-heading">
        <div>
          <div className="eyebrow">FORMS &amp; DATA</div>
          <h1>Editor</h1>
          <p>
            Rich text (WYSIWYG) editor with formatting, links, images, tables and HTML source view.
          </p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Rich text editor</h2>
            <p>
              A Word-style document editor: ribbon, page view, ruler, find &amp; replace, table
              tools
            </p>
          </div>
        </div>
        <div className="">
          <div className="wysiwyg we-word" id="ed1" data-math-src="/math-embed.html">
            <div className="we-top">
              <div className="we-qat">
                <button
                  type="button"
                  className="we-btn"
                  data-cmd="undo"
                  title="Undo (Ctrl+Z)"
                  aria-label="Undo (Ctrl+Z)"
                >
                  <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                    <path d="M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="we-btn"
                  data-cmd="redo"
                  title="Redo (Ctrl+Y)"
                  aria-label="Redo (Ctrl+Y)"
                >
                  <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                    <path d="m15 14 5-5-5-5M20 9H10a6 6 0 0 0 0 12h3" />
                  </svg>
                </button>
              </div>
              <div className="we-tabs" role="tablist" aria-label="Ribbon tabs">
                <button
                  type="button"
                  className="we-tab on"
                  role="tab"
                  data-tab="home"
                  aria-selected="true"
                >
                  Home
                </button>
                <button
                  type="button"
                  className="we-tab"
                  role="tab"
                  data-tab="insert"
                  aria-selected="false"
                >
                  Insert
                </button>
                <button
                  type="button"
                  className="we-tab"
                  role="tab"
                  data-tab="layout"
                  aria-selected="false"
                >
                  Layout
                </button>
                <button
                  type="button"
                  className="we-tab"
                  role="tab"
                  data-tab="view"
                  aria-selected="false"
                >
                  View
                </button>
                <button
                  type="button"
                  className="we-tab we-tab-ctx d-none"
                  role="tab"
                  data-tab="table"
                  aria-selected="false"
                >
                  Table
                </button>
              </div>
              <span className="we-spacer" />
              <div className="we-qat">
                <button
                  type="button"
                  className="we-btn"
                  data-cmd="@source"
                  title="HTML source"
                  aria-label="HTML source"
                >
                  &lt;/&gt;
                </button>
                <button
                  type="button"
                  className="we-btn"
                  data-cmd="@full"
                  title="Fullscreen"
                  aria-label="Fullscreen"
                >
                  <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="we-toolbar we-ribbon" role="toolbar" aria-label="Formatting">
              <div className="we-panel" data-panel="home" role="tabpanel">
                <div className="we-group ">
                  <div className="we-group-body">
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@paste"
                      title="Paste"
                      aria-label="Paste"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <rect x="6" y="4" width="12" height="17" rx="2" />
                        <path d="M9 4h6v3H9z" />
                      </svg>
                      <span>Paste</span>
                    </button>
                    <div className="we-col">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@cut"
                        title="Cut"
                        aria-label="Cut"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <circle cx="6" cy="18" r="3" />
                          <circle cx="18" cy="18" r="3" />
                          <path d="M8 16 18 3M16 16 6 3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@copy"
                        title="Copy"
                        aria-label="Copy"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="9" y="9" width="11" height="11" rx="2" />
                          <path d="M5 15V6a2 2 0 0 1 2-2h8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Clipboard</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <select className="we-select we-sel-font" data-font="" aria-label="Font">
                        <option
                          value="'Segoe UI',Calibri,Carlito,system-ui,sans-serif"
                          data-n="Segoe UI"
                        >
                          Segoe UI / Calibri
                        </option>
                        <option value="Arial,Helvetica,sans-serif" data-n="Arial">
                          Arial
                        </option>
                        <option value="Georgia,serif" data-n="Georgia">
                          Georgia
                        </option>
                        <option value="'Times New Roman',Times,serif" data-n="Times New Roman">
                          Times New Roman
                        </option>
                        <option value="Verdana,Geneva,sans-serif" data-n="Verdana">
                          Verdana
                        </option>
                        <option value="Tahoma,sans-serif" data-n="Tahoma">
                          Tahoma
                        </option>
                        <option value="'Trebuchet MS',sans-serif" data-n="Trebuchet MS">
                          Trebuchet MS
                        </option>
                        <option value="'Courier New',monospace" data-n="Courier New">
                          Courier New
                        </option>
                        <option value="Cambria,Georgia,serif" data-n="Cambria">
                          Cambria
                        </option>
                      </select>
                      <select
                        defaultValue="11"
                        className="we-select we-sel-size"
                        data-fsize=""
                        aria-label="Font size (pt)"
                      >
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="14">14</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                        <option value="20">20</option>
                        <option value="24">24</option>
                        <option value="28">28</option>
                        <option value="32">32</option>
                        <option value="36">36</option>
                        <option value="48">48</option>
                        <option value="60">60</option>
                        <option value="72">72</option>
                      </select>
                    </div>
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="bold"
                        title="Bold (Ctrl+B)"
                        aria-label="Bold (Ctrl+B)"
                      >
                        <b>B</b>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="italic"
                        title="Italic (Ctrl+I)"
                        aria-label="Italic (Ctrl+I)"
                      >
                        <i>I</i>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="underline"
                        title="Underline (Ctrl+U)"
                        aria-label="Underline (Ctrl+U)"
                      >
                        <u>U</u>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="strikeThrough"
                        title="Strikethrough"
                        aria-label="Strikethrough"
                      >
                        <s>ab</s>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="subscript"
                        title="Subscript"
                        aria-label="Subscript"
                      >
                        x<sub>2</sub>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="superscript"
                        title="Superscript"
                        aria-label="Superscript"
                      >
                        x<sup>2</sup>
                      </button>
                      <span className="we-sep" />
                      <label className="we-color" title="Font colour">
                        <span>A</span>
                        <input
                          type="color"
                          defaultValue="#c00000"
                          data-color="foreColor"
                          aria-label="Font colour"
                        />
                      </label>
                      <label className="we-color hl" title="Text highlight colour">
                        <span>▮</span>
                        <input
                          type="color"
                          defaultValue="#ffe066"
                          data-color="hiliteColor"
                          aria-label="Highlight colour"
                        />
                      </label>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="removeFormat"
                        title="Clear all formatting"
                        aria-label="Clear all formatting"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M5 5h14M12 5l-3 14M4 20 20 4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Font</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="insertUnorderedList"
                        title="Bullets"
                        aria-label="Bullets"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="insertOrderedList"
                        title="Numbering"
                        aria-label="Numbering"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M10 6h10M10 12h10M10 18h10M4 5l1-1v4M4 14h2l-2 3h2" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="outdent"
                        title="Decrease indent"
                        aria-label="Decrease indent"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M3 6h18M11 12h10M3 18h18M7 9l-3 3 3 3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="indent"
                        title="Increase indent"
                        aria-label="Increase indent"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M3 6h18M11 12h10M3 18h18M4 9l3 3-3 3" />
                        </svg>
                      </button>
                      <select className="we-select we-sel-lh" data-lh="" aria-label="Line spacing">
                        <option value="">↕ Spacing</option>
                        <option value="1">1.0</option>
                        <option value="1.15">1.15</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2.0</option>
                        <option value="2.5">2.5</option>
                        <option value="3">3.0</option>
                      </select>
                    </div>
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="justifyLeft"
                        title="Align left (Ctrl+L)"
                        aria-label="Align left (Ctrl+L)"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M4 6h16M4 10h10M4 14h16M4 18h10" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="justifyCenter"
                        title="Centre (Ctrl+E)"
                        aria-label="Centre (Ctrl+E)"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M4 6h16M7 10h10M4 14h16M7 18h10" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="justifyRight"
                        title="Align right (Ctrl+R)"
                        aria-label="Align right (Ctrl+R)"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M4 6h16M10 10h10M4 14h16M10 18h10" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="justifyFull"
                        title="Justify (Ctrl+J)"
                        aria-label="Justify (Ctrl+J)"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="insertHorizontalRule"
                        title="Horizontal line"
                        aria-label="Horizontal line"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M4 12h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Paragraph</div>
                </div>
                <div className="we-group we-g-styles">
                  <div className="we-group-body">
                    <div className="we-gallery">
                      <button
                        type="button"
                        className="we-btn we-style"
                        data-style="p"
                        data-cmd="@style"
                        title="Normal"
                      >
                        <span className="s-n">Normal</span>
                      </button>
                      <button
                        type="button"
                        className="we-btn we-style"
                        data-style="h1"
                        data-cmd="@style"
                        title="Heading 1"
                      >
                        <span className="s-h1">Heading 1</span>
                      </button>
                      <button
                        type="button"
                        className="we-btn we-style"
                        data-style="h2"
                        data-cmd="@style"
                        title="Heading 2"
                      >
                        <span className="s-h2">Heading 2</span>
                      </button>
                      <button
                        type="button"
                        className="we-btn we-style"
                        data-style="h3"
                        data-cmd="@style"
                        title="Heading 3"
                      >
                        <span className="s-h3">Heading 3</span>
                      </button>
                      <button
                        type="button"
                        className="we-btn we-style"
                        data-style="blockquote"
                        data-cmd="@style"
                        title="Quote"
                      >
                        <span className="s-q">Quote</span>
                      </button>
                      <button
                        type="button"
                        className="we-btn we-style"
                        data-style="pre"
                        data-cmd="@style"
                        title="Code"
                      >
                        <span className="s-c">Code</span>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Styles</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@find"
                        title="Find (Ctrl+F)"
                        aria-label="Find (Ctrl+F)"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <circle cx="11" cy="11" r="6" />
                          <path d="m20 20-4.5-4.5" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@find"
                        title="Replace (Ctrl+H)"
                        aria-label="Replace (Ctrl+H)"
                        data-rep="1"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M4 7h12l-3-3M20 17H8l3 3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@selectall"
                        title="Select all"
                        aria-label="Select all"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="4" y="4" width="16" height="16" rx="2" strokeDasharray="3 2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Editing</div>
                </div>
              </div>
              <div className="we-panel d-none" data-panel="insert" role="tabpanel">
                <div className="we-group ">
                  <div className="we-group-body">
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@table"
                      title="Table"
                      aria-label="Table"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <path d="M3 10h18M3 15h18M9 4v16" />
                      </svg>
                      <span>Table</span>
                    </button>
                  </div>
                  <div className="we-group-label">Tables</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@image"
                      title="Picture"
                      aria-label="Picture"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <circle cx="9" cy="10" r="2" />
                        <path d="m21 16-5-5-8 8" />
                      </svg>
                      <span>Picture</span>
                    </button>
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@math"
                      title="Equation"
                      aria-label="Equation"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M18 6H7l6 6-6 6h11" />
                      </svg>
                      <span>Equation</span>
                    </button>
                  </div>
                  <div className="we-group-label">Illustrations</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@link"
                      title="Link"
                      aria-label="Link"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
                      </svg>
                      <span>Link</span>
                    </button>
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="unlink"
                      title="Remove link"
                      aria-label="Remove link"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M10 14a4 4 0 0 0 5.7 0l3-3M14 10a4 4 0 0 0-5.7 0l-3 3M4 4l16 16" />
                      </svg>
                    </button>
                  </div>
                  <div className="we-group-label">Links</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@pagebreak"
                      title="Page break"
                      aria-label="Page break"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M5 4h14M5 20h14M3 12h4M10 12h4M17 12h4" />
                      </svg>
                      <span>Page break</span>
                    </button>
                  </div>
                  <div className="we-group-label">Pages</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@date"
                      title={"Date & time"}
                      aria-label={"Date & time"}
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <circle cx="12" cy="12" r="8" />
                        <path d="M12 8v4l3 2" />
                      </svg>
                      <span>Date &amp; time</span>
                    </button>
                    <select className="we-select" data-symbol="" aria-label="Insert symbol">
                      <option value="">Ω Symbol</option>
                      <option value="©">©</option>
                      <option value="®">®</option>
                      <option value="™">™</option>
                      <option value="§">§</option>
                      <option value="¶">¶</option>
                      <option value="†">†</option>
                      <option value="‡">‡</option>
                      <option value="•">•</option>
                      <option value="…">…</option>
                      <option value="–">–</option>
                      <option value="—">—</option>
                      <option value="«">«</option>
                      <option value="»">»</option>
                      <option value="°">°</option>
                      <option value="±">±</option>
                      <option value="×">×</option>
                      <option value="÷">÷</option>
                      <option value="≈">≈</option>
                      <option value="≠">≠</option>
                      <option value="≤">≤</option>
                      <option value="≥">≥</option>
                      <option value="∞">∞</option>
                      <option value="π">π</option>
                      <option value="Ω">Ω</option>
                      <option value="µ">µ</option>
                      <option value="€">€</option>
                      <option value="£">£</option>
                      <option value="¥">¥</option>
                      <option value="₹">₹</option>
                      <option value="←">←</option>
                      <option value="→">→</option>
                      <option value="↑">↑</option>
                      <option value="↓">↓</option>
                      <option value="✓">✓</option>
                      <option value="✗">✗</option>
                      <option value="★">★</option>
                    </select>
                  </div>
                  <div className="we-group-label">Text</div>
                </div>
              </div>
              <div className="we-panel d-none" data-panel="layout" role="tabpanel">
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <label className="we-lbl">
                        Margins
                        <select className="we-select" data-margin="">
                          <option value="96">Normal (2.54 cm)</option>
                          <option value="48">Narrow (1.27 cm)</option>
                          <option value="144">Wide (3.81 cm)</option>
                          <option value="0">None</option>
                        </select>
                      </label>
                      <label className="we-lbl">
                        Orientation
                        <select className="we-select" data-orient="">
                          <option value="p">Portrait</option>
                          <option value="l">Landscape</option>
                        </select>
                      </label>
                      <label className="we-lbl">
                        Size
                        <select defaultValue="a4" className="we-select" data-psize="">
                          <option value="a4">A4</option>
                          <option value="letter">Letter</option>
                          <option value="a5">A5</option>
                          <option value="legal">Legal</option>
                        </select>
                      </label>
                      <label className="we-lbl">
                        Columns
                        <select className="we-select" data-cols="">
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </label>
                    </div>
                  </div>
                  <div className="we-group-label">Page setup</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="outdent"
                        title="Decrease indent"
                        aria-label="Decrease indent"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M3 6h18M11 12h10M3 18h18M7 9l-3 3 3 3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="indent"
                        title="Increase indent"
                        aria-label="Increase indent"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M3 6h18M11 12h10M3 18h18M4 9l3 3-3 3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="formatBlockquote"
                        title="Quote"
                        aria-label="Quote"
                        data-block-cmd="blockquote"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M5 17c0-5 2-8 6-9M14 17c0-5 2-8 6-9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Paragraph</div>
                </div>
              </div>
              <div className="we-panel d-none" data-panel="view" role="tabpanel">
                <div className="we-group ">
                  <div className="we-group-body">
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@ruler"
                      title="Ruler"
                      aria-label="Ruler"
                      data-ruler=""
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <rect x="3" y="8" width="18" height="8" rx="1" />
                        <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
                      </svg>
                      <span>Ruler</span>
                    </button>
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@fit"
                      title="Fit to width"
                      aria-label="Fit to width"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                      </svg>
                      <span>Fit to width</span>
                    </button>
                  </div>
                  <div className="we-group-label">Show</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <label className="we-lbl">
                      Zoom <span className="we-zoom-l">100%</span>
                      <input
                        type="range"
                        min="40"
                        max="200"
                        defaultValue="100"
                        data-zoom=""
                        aria-label="Zoom"
                        className="we-zoom-r"
                      />
                    </label>
                  </div>
                  <div className="we-group-label">Zoom</div>
                </div>
              </div>
              <div className="we-panel d-none" data-panel="table" role="tabpanel">
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Insert row above"
                        aria-label="Insert row above"
                        data-tbl="row-above"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="3" y="9" width="18" height="11" rx="1" />
                          <path d="M12 3v4M10 5h4" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Insert row below"
                        aria-label="Insert row below"
                        data-tbl="row-below"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="11" rx="1" />
                          <path d="M12 17v4M10 19h4" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Insert column left"
                        aria-label="Insert column left"
                        data-tbl="col-left"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="9" y="3" width="11" height="18" rx="1" />
                          <path d="M3 12h4M5 10v4" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Insert column right"
                        aria-label="Insert column right"
                        data-tbl="col-right"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="4" y="3" width="11" height="18" rx="1" />
                          <path d="M17 12h4M19 10v4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Rows &amp; columns</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Delete row"
                        aria-label="Delete row"
                        data-tbl="del-row"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="3" y="9" width="18" height="6" rx="1" />
                          <path d="M8 4l8 3M8 20l8-3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Delete column"
                        aria-label="Delete column"
                        data-tbl="del-col"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="9" y="3" width="6" height="18" rx="1" />
                          <path d="M4 8l3 8M20 8l-3 8" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Delete table"
                        aria-label="Delete table"
                        data-tbl="del-table"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Delete</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Toggle header row cells"
                        aria-label="Toggle header row cells"
                        data-tbl="header"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="16" rx="2" />
                          <path d="M3 9h18" strokeWidth="3" />
                        </svg>
                      </button>
                      <label className="we-color" title="Cell shading">
                        <span>▦</span>
                        <input
                          type="color"
                          defaultValue="#faf0de"
                          data-shade=""
                          aria-label="Cell shading"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="we-group-label">Cell</div>
                </div>
              </div>
            </div>
            <div className="we-find d-none" role="search">
              <input
                className="form-control form-control-sm we-f-q"
                placeholder="Find"
                aria-label="Find"
              />
              <input
                className="form-control form-control-sm we-f-r"
                placeholder="Replace with"
                aria-label="Replace with"
              />
              <label className="we-f-lbl">
                <input type="checkbox" className="we-f-case" /> Match case
              </label>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm we-f-prev"
                aria-label="Previous match"
              >
                ◂
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm we-f-next"
                aria-label="Next match"
              >
                ▸
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm we-f-rep">
                Replace
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm we-f-all">
                Replace all
              </button>
              <span className="we-f-n" role="status" />
              <button type="button" className="we-f-x" aria-label="Close find">
                ×
              </button>
            </div>
            <div className="we-insert d-none">
              <label className="visually-hidden" htmlFor="ed1-a">
                Value
              </label>
              <input id="ed1-a" className="form-control form-control-sm we-in-a" />
              <input
                className="form-control form-control-sm we-in-b d-none"
                type="number"
                min="1"
                max="12"
                defaultValue="3"
                aria-label="Columns"
                style={{ width: "80px" }}
              />
              <input
                className="form-control form-control-sm we-in-c d-none"
                type="number"
                min="1"
                max="20"
                defaultValue="3"
                aria-label="Rows"
                style={{ width: "80px" }}
              />
              <button type="button" className="btn btn-primary btn-sm we-apply">
                Insert
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm we-cancel">
                Cancel
              </button>
            </div>
            <div className="we-canvas" style={{ height: "620px" }}>
              <div className="we-zoomwrap">
                <div className="we-ruler" aria-hidden="true" />
                <div className="we-sheet">
                  <div
                    className="we-area"
                    contentEditable={true}
                    role="textbox"
                    aria-multiline="true"
                    aria-label="Document"
                    data-placeholder="Start typing…"
                    spellCheck={true}
                    suppressContentEditableWarning
                  >
                    <h2>Operations update</h2>
                    <p>
                      Write <b>rich text</b> with <i>italic</i>, <u>underline</u> and{" "}
                      <span style={{ color: "var(--ms-b45309,#b45309)" }}>coloured</span> text. Try
                      the toolbar above.
                    </p>
                    <ul>
                      <li>Lists and nested lists</li>
                      <li>Links, images and tables</li>
                      <li>HTML source view</li>
                    </ul>
                    <blockquote>From telemetry to a clear picture.</blockquote>
                    <p>
                      Visit the <Link to="/dashboard">dashboard</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <textarea
              className="we-source form-control d-none"
              spellCheck={false}
              aria-label="HTML source"
            />
            <div className="we-status">
              <span className="we-page-no">Page 1 of 1</span>
              <span className="we-count">0 words · 0 characters</span>
              <span className="we-hint">
                Ctrl+F find · Ctrl+H replace · Ctrl+K link · Ctrl+Alt+1–3 headings
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Live HTML output</h2>
            <p>Updates as you type — copy it into your own form field or API</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-muted">
              Sanitise HTML on the server before storing or displaying.
            </small>
            <button className="btn btn-outline-secondary btn-sm" id="copy-html" type="button">
              <svg className="icon ">
                <use href="#i-copy" />
              </svg>{" "}
              Copy HTML
            </button>
          </div>
          <pre className="we-out" id="ed1-out" />
        </div>
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>Second editor (A5 page)</h2>
            <p>A second instance on a smaller A5 page, for notes or short letters</p>
          </div>
        </div>
        <div className="">
          <div className="wysiwyg we-word" id="ed2" data-math-src="/math-embed.html">
            <div className="we-top">
              <div className="we-qat">
                <button
                  type="button"
                  className="we-btn"
                  data-cmd="undo"
                  title="Undo (Ctrl+Z)"
                  aria-label="Undo (Ctrl+Z)"
                >
                  <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                    <path d="M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="we-btn"
                  data-cmd="redo"
                  title="Redo (Ctrl+Y)"
                  aria-label="Redo (Ctrl+Y)"
                >
                  <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                    <path d="m15 14 5-5-5-5M20 9H10a6 6 0 0 0 0 12h3" />
                  </svg>
                </button>
              </div>
              <div className="we-tabs" role="tablist" aria-label="Ribbon tabs">
                <button
                  type="button"
                  className="we-tab on"
                  role="tab"
                  data-tab="home"
                  aria-selected="true"
                >
                  Home
                </button>
                <button
                  type="button"
                  className="we-tab"
                  role="tab"
                  data-tab="insert"
                  aria-selected="false"
                >
                  Insert
                </button>
                <button
                  type="button"
                  className="we-tab"
                  role="tab"
                  data-tab="layout"
                  aria-selected="false"
                >
                  Layout
                </button>
                <button
                  type="button"
                  className="we-tab"
                  role="tab"
                  data-tab="view"
                  aria-selected="false"
                >
                  View
                </button>
                <button
                  type="button"
                  className="we-tab we-tab-ctx d-none"
                  role="tab"
                  data-tab="table"
                  aria-selected="false"
                >
                  Table
                </button>
              </div>
              <span className="we-spacer" />
              <div className="we-qat">
                <button
                  type="button"
                  className="we-btn"
                  data-cmd="@source"
                  title="HTML source"
                  aria-label="HTML source"
                >
                  &lt;/&gt;
                </button>
                <button
                  type="button"
                  className="we-btn"
                  data-cmd="@full"
                  title="Fullscreen"
                  aria-label="Fullscreen"
                >
                  <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="we-toolbar we-ribbon" role="toolbar" aria-label="Formatting">
              <div className="we-panel" data-panel="home" role="tabpanel">
                <div className="we-group ">
                  <div className="we-group-body">
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@paste"
                      title="Paste"
                      aria-label="Paste"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <rect x="6" y="4" width="12" height="17" rx="2" />
                        <path d="M9 4h6v3H9z" />
                      </svg>
                      <span>Paste</span>
                    </button>
                    <div className="we-col">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@cut"
                        title="Cut"
                        aria-label="Cut"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <circle cx="6" cy="18" r="3" />
                          <circle cx="18" cy="18" r="3" />
                          <path d="M8 16 18 3M16 16 6 3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@copy"
                        title="Copy"
                        aria-label="Copy"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="9" y="9" width="11" height="11" rx="2" />
                          <path d="M5 15V6a2 2 0 0 1 2-2h8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Clipboard</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <select className="we-select we-sel-font" data-font="" aria-label="Font">
                        <option
                          value="'Segoe UI',Calibri,Carlito,system-ui,sans-serif"
                          data-n="Segoe UI"
                        >
                          Segoe UI / Calibri
                        </option>
                        <option value="Arial,Helvetica,sans-serif" data-n="Arial">
                          Arial
                        </option>
                        <option value="Georgia,serif" data-n="Georgia">
                          Georgia
                        </option>
                        <option value="'Times New Roman',Times,serif" data-n="Times New Roman">
                          Times New Roman
                        </option>
                        <option value="Verdana,Geneva,sans-serif" data-n="Verdana">
                          Verdana
                        </option>
                        <option value="Tahoma,sans-serif" data-n="Tahoma">
                          Tahoma
                        </option>
                        <option value="'Trebuchet MS',sans-serif" data-n="Trebuchet MS">
                          Trebuchet MS
                        </option>
                        <option value="'Courier New',monospace" data-n="Courier New">
                          Courier New
                        </option>
                        <option value="Cambria,Georgia,serif" data-n="Cambria">
                          Cambria
                        </option>
                      </select>
                      <select
                        defaultValue="11"
                        className="we-select we-sel-size"
                        data-fsize=""
                        aria-label="Font size (pt)"
                      >
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="14">14</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                        <option value="20">20</option>
                        <option value="24">24</option>
                        <option value="28">28</option>
                        <option value="32">32</option>
                        <option value="36">36</option>
                        <option value="48">48</option>
                        <option value="60">60</option>
                        <option value="72">72</option>
                      </select>
                    </div>
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="bold"
                        title="Bold (Ctrl+B)"
                        aria-label="Bold (Ctrl+B)"
                      >
                        <b>B</b>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="italic"
                        title="Italic (Ctrl+I)"
                        aria-label="Italic (Ctrl+I)"
                      >
                        <i>I</i>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="underline"
                        title="Underline (Ctrl+U)"
                        aria-label="Underline (Ctrl+U)"
                      >
                        <u>U</u>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="strikeThrough"
                        title="Strikethrough"
                        aria-label="Strikethrough"
                      >
                        <s>ab</s>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="subscript"
                        title="Subscript"
                        aria-label="Subscript"
                      >
                        x<sub>2</sub>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="superscript"
                        title="Superscript"
                        aria-label="Superscript"
                      >
                        x<sup>2</sup>
                      </button>
                      <span className="we-sep" />
                      <label className="we-color" title="Font colour">
                        <span>A</span>
                        <input
                          type="color"
                          defaultValue="#c00000"
                          data-color="foreColor"
                          aria-label="Font colour"
                        />
                      </label>
                      <label className="we-color hl" title="Text highlight colour">
                        <span>▮</span>
                        <input
                          type="color"
                          defaultValue="#ffe066"
                          data-color="hiliteColor"
                          aria-label="Highlight colour"
                        />
                      </label>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="removeFormat"
                        title="Clear all formatting"
                        aria-label="Clear all formatting"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M5 5h14M12 5l-3 14M4 20 20 4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Font</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="insertUnorderedList"
                        title="Bullets"
                        aria-label="Bullets"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="insertOrderedList"
                        title="Numbering"
                        aria-label="Numbering"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M10 6h10M10 12h10M10 18h10M4 5l1-1v4M4 14h2l-2 3h2" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="outdent"
                        title="Decrease indent"
                        aria-label="Decrease indent"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M3 6h18M11 12h10M3 18h18M7 9l-3 3 3 3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="indent"
                        title="Increase indent"
                        aria-label="Increase indent"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M3 6h18M11 12h10M3 18h18M4 9l3 3-3 3" />
                        </svg>
                      </button>
                      <select className="we-select we-sel-lh" data-lh="" aria-label="Line spacing">
                        <option value="">↕ Spacing</option>
                        <option value="1">1.0</option>
                        <option value="1.15">1.15</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2.0</option>
                        <option value="2.5">2.5</option>
                        <option value="3">3.0</option>
                      </select>
                    </div>
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="justifyLeft"
                        title="Align left (Ctrl+L)"
                        aria-label="Align left (Ctrl+L)"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M4 6h16M4 10h10M4 14h16M4 18h10" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="justifyCenter"
                        title="Centre (Ctrl+E)"
                        aria-label="Centre (Ctrl+E)"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M4 6h16M7 10h10M4 14h16M7 18h10" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="justifyRight"
                        title="Align right (Ctrl+R)"
                        aria-label="Align right (Ctrl+R)"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M4 6h16M10 10h10M4 14h16M10 18h10" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="justifyFull"
                        title="Justify (Ctrl+J)"
                        aria-label="Justify (Ctrl+J)"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="insertHorizontalRule"
                        title="Horizontal line"
                        aria-label="Horizontal line"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M4 12h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Paragraph</div>
                </div>
                <div className="we-group we-g-styles">
                  <div className="we-group-body">
                    <div className="we-gallery">
                      <button
                        type="button"
                        className="we-btn we-style"
                        data-style="p"
                        data-cmd="@style"
                        title="Normal"
                      >
                        <span className="s-n">Normal</span>
                      </button>
                      <button
                        type="button"
                        className="we-btn we-style"
                        data-style="h1"
                        data-cmd="@style"
                        title="Heading 1"
                      >
                        <span className="s-h1">Heading 1</span>
                      </button>
                      <button
                        type="button"
                        className="we-btn we-style"
                        data-style="h2"
                        data-cmd="@style"
                        title="Heading 2"
                      >
                        <span className="s-h2">Heading 2</span>
                      </button>
                      <button
                        type="button"
                        className="we-btn we-style"
                        data-style="h3"
                        data-cmd="@style"
                        title="Heading 3"
                      >
                        <span className="s-h3">Heading 3</span>
                      </button>
                      <button
                        type="button"
                        className="we-btn we-style"
                        data-style="blockquote"
                        data-cmd="@style"
                        title="Quote"
                      >
                        <span className="s-q">Quote</span>
                      </button>
                      <button
                        type="button"
                        className="we-btn we-style"
                        data-style="pre"
                        data-cmd="@style"
                        title="Code"
                      >
                        <span className="s-c">Code</span>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Styles</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@find"
                        title="Find (Ctrl+F)"
                        aria-label="Find (Ctrl+F)"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <circle cx="11" cy="11" r="6" />
                          <path d="m20 20-4.5-4.5" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@find"
                        title="Replace (Ctrl+H)"
                        aria-label="Replace (Ctrl+H)"
                        data-rep="1"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M4 7h12l-3-3M20 17H8l3 3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@selectall"
                        title="Select all"
                        aria-label="Select all"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="4" y="4" width="16" height="16" rx="2" strokeDasharray="3 2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Editing</div>
                </div>
              </div>
              <div className="we-panel d-none" data-panel="insert" role="tabpanel">
                <div className="we-group ">
                  <div className="we-group-body">
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@table"
                      title="Table"
                      aria-label="Table"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <path d="M3 10h18M3 15h18M9 4v16" />
                      </svg>
                      <span>Table</span>
                    </button>
                  </div>
                  <div className="we-group-label">Tables</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@image"
                      title="Picture"
                      aria-label="Picture"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <circle cx="9" cy="10" r="2" />
                        <path d="m21 16-5-5-8 8" />
                      </svg>
                      <span>Picture</span>
                    </button>
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@math"
                      title="Equation"
                      aria-label="Equation"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M18 6H7l6 6-6 6h11" />
                      </svg>
                      <span>Equation</span>
                    </button>
                  </div>
                  <div className="we-group-label">Illustrations</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@link"
                      title="Link"
                      aria-label="Link"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
                      </svg>
                      <span>Link</span>
                    </button>
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="unlink"
                      title="Remove link"
                      aria-label="Remove link"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M10 14a4 4 0 0 0 5.7 0l3-3M14 10a4 4 0 0 0-5.7 0l-3 3M4 4l16 16" />
                      </svg>
                    </button>
                  </div>
                  <div className="we-group-label">Links</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@pagebreak"
                      title="Page break"
                      aria-label="Page break"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M5 4h14M5 20h14M3 12h4M10 12h4M17 12h4" />
                      </svg>
                      <span>Page break</span>
                    </button>
                  </div>
                  <div className="we-group-label">Pages</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@date"
                      title={"Date & time"}
                      aria-label={"Date & time"}
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <circle cx="12" cy="12" r="8" />
                        <path d="M12 8v4l3 2" />
                      </svg>
                      <span>Date &amp; time</span>
                    </button>
                    <select className="we-select" data-symbol="" aria-label="Insert symbol">
                      <option value="">Ω Symbol</option>
                      <option value="©">©</option>
                      <option value="®">®</option>
                      <option value="™">™</option>
                      <option value="§">§</option>
                      <option value="¶">¶</option>
                      <option value="†">†</option>
                      <option value="‡">‡</option>
                      <option value="•">•</option>
                      <option value="…">…</option>
                      <option value="–">–</option>
                      <option value="—">—</option>
                      <option value="«">«</option>
                      <option value="»">»</option>
                      <option value="°">°</option>
                      <option value="±">±</option>
                      <option value="×">×</option>
                      <option value="÷">÷</option>
                      <option value="≈">≈</option>
                      <option value="≠">≠</option>
                      <option value="≤">≤</option>
                      <option value="≥">≥</option>
                      <option value="∞">∞</option>
                      <option value="π">π</option>
                      <option value="Ω">Ω</option>
                      <option value="µ">µ</option>
                      <option value="€">€</option>
                      <option value="£">£</option>
                      <option value="¥">¥</option>
                      <option value="₹">₹</option>
                      <option value="←">←</option>
                      <option value="→">→</option>
                      <option value="↑">↑</option>
                      <option value="↓">↓</option>
                      <option value="✓">✓</option>
                      <option value="✗">✗</option>
                      <option value="★">★</option>
                    </select>
                  </div>
                  <div className="we-group-label">Text</div>
                </div>
              </div>
              <div className="we-panel d-none" data-panel="layout" role="tabpanel">
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <label className="we-lbl">
                        Margins
                        <select className="we-select" data-margin="">
                          <option value="96">Normal (2.54 cm)</option>
                          <option value="48">Narrow (1.27 cm)</option>
                          <option value="144">Wide (3.81 cm)</option>
                          <option value="0">None</option>
                        </select>
                      </label>
                      <label className="we-lbl">
                        Orientation
                        <select className="we-select" data-orient="">
                          <option value="p">Portrait</option>
                          <option value="l">Landscape</option>
                        </select>
                      </label>
                      <label className="we-lbl">
                        Size
                        <select defaultValue="a5" className="we-select" data-psize="">
                          <option value="a4">A4</option>
                          <option value="letter">Letter</option>
                          <option value="a5">A5</option>
                          <option value="legal">Legal</option>
                        </select>
                      </label>
                      <label className="we-lbl">
                        Columns
                        <select className="we-select" data-cols="">
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </label>
                    </div>
                  </div>
                  <div className="we-group-label">Page setup</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="outdent"
                        title="Decrease indent"
                        aria-label="Decrease indent"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M3 6h18M11 12h10M3 18h18M7 9l-3 3 3 3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="indent"
                        title="Increase indent"
                        aria-label="Increase indent"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M3 6h18M11 12h10M3 18h18M4 9l3 3-3 3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="formatBlockquote"
                        title="Quote"
                        aria-label="Quote"
                        data-block-cmd="blockquote"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M5 17c0-5 2-8 6-9M14 17c0-5 2-8 6-9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Paragraph</div>
                </div>
              </div>
              <div className="we-panel d-none" data-panel="view" role="tabpanel">
                <div className="we-group ">
                  <div className="we-group-body">
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@ruler"
                      title="Ruler"
                      aria-label="Ruler"
                      data-ruler=""
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <rect x="3" y="8" width="18" height="8" rx="1" />
                        <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
                      </svg>
                      <span>Ruler</span>
                    </button>
                    <button
                      type="button"
                      className="we-btn we-big"
                      data-cmd="@fit"
                      title="Fit to width"
                      aria-label="Fit to width"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                      </svg>
                      <span>Fit to width</span>
                    </button>
                  </div>
                  <div className="we-group-label">Show</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <label className="we-lbl">
                      Zoom <span className="we-zoom-l">100%</span>
                      <input
                        type="range"
                        min="40"
                        max="200"
                        defaultValue="100"
                        data-zoom=""
                        aria-label="Zoom"
                        className="we-zoom-r"
                      />
                    </label>
                  </div>
                  <div className="we-group-label">Zoom</div>
                </div>
              </div>
              <div className="we-panel d-none" data-panel="table" role="tabpanel">
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Insert row above"
                        aria-label="Insert row above"
                        data-tbl="row-above"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="3" y="9" width="18" height="11" rx="1" />
                          <path d="M12 3v4M10 5h4" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Insert row below"
                        aria-label="Insert row below"
                        data-tbl="row-below"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="11" rx="1" />
                          <path d="M12 17v4M10 19h4" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Insert column left"
                        aria-label="Insert column left"
                        data-tbl="col-left"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="9" y="3" width="11" height="18" rx="1" />
                          <path d="M3 12h4M5 10v4" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Insert column right"
                        aria-label="Insert column right"
                        data-tbl="col-right"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="4" y="3" width="11" height="18" rx="1" />
                          <path d="M17 12h4M19 10v4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Rows &amp; columns</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Delete row"
                        aria-label="Delete row"
                        data-tbl="del-row"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="3" y="9" width="18" height="6" rx="1" />
                          <path d="M8 4l8 3M8 20l8-3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Delete column"
                        aria-label="Delete column"
                        data-tbl="del-col"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="9" y="3" width="6" height="18" rx="1" />
                          <path d="M4 8l3 8M20 8l-3 8" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Delete table"
                        aria-label="Delete table"
                        data-tbl="del-table"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="we-group-label">Delete</div>
                </div>
                <div className="we-group ">
                  <div className="we-group-body">
                    <div className="we-row">
                      <button
                        type="button"
                        className="we-btn"
                        data-cmd="@tbl"
                        title="Toggle header row cells"
                        aria-label="Toggle header row cells"
                        data-tbl="header"
                      >
                        <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="16" rx="2" />
                          <path d="M3 9h18" strokeWidth="3" />
                        </svg>
                      </button>
                      <label className="we-color" title="Cell shading">
                        <span>▦</span>
                        <input
                          type="color"
                          defaultValue="#faf0de"
                          data-shade=""
                          aria-label="Cell shading"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="we-group-label">Cell</div>
                </div>
              </div>
            </div>
            <div className="we-find d-none" role="search">
              <input
                className="form-control form-control-sm we-f-q"
                placeholder="Find"
                aria-label="Find"
              />
              <input
                className="form-control form-control-sm we-f-r"
                placeholder="Replace with"
                aria-label="Replace with"
              />
              <label className="we-f-lbl">
                <input type="checkbox" className="we-f-case" /> Match case
              </label>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm we-f-prev"
                aria-label="Previous match"
              >
                ◂
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm we-f-next"
                aria-label="Next match"
              >
                ▸
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm we-f-rep">
                Replace
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm we-f-all">
                Replace all
              </button>
              <span className="we-f-n" role="status" />
              <button type="button" className="we-f-x" aria-label="Close find">
                ×
              </button>
            </div>
            <div className="we-insert d-none">
              <label className="visually-hidden" htmlFor="ed2-a">
                Value
              </label>
              <input id="ed2-a" className="form-control form-control-sm we-in-a" />
              <input
                className="form-control form-control-sm we-in-b d-none"
                type="number"
                min="1"
                max="12"
                defaultValue="3"
                aria-label="Columns"
                style={{ width: "80px" }}
              />
              <input
                className="form-control form-control-sm we-in-c d-none"
                type="number"
                min="1"
                max="20"
                defaultValue="3"
                aria-label="Rows"
                style={{ width: "80px" }}
              />
              <button type="button" className="btn btn-primary btn-sm we-apply">
                Insert
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm we-cancel">
                Cancel
              </button>
            </div>
            <div className="we-canvas" style={{ height: "360px" }}>
              <div className="we-zoomwrap">
                <div className="we-ruler" aria-hidden="true" />
                <div className="we-sheet">
                  <div
                    className="we-area"
                    contentEditable={true}
                    role="textbox"
                    aria-multiline="true"
                    aria-label="Document"
                    data-placeholder="Start typing…"
                    spellCheck={true}
                    suppressContentEditableWarning
                  >
                    <p>Short note…</p>
                  </div>
                </div>
              </div>
            </div>
            <textarea
              className="we-source form-control d-none"
              spellCheck={false}
              aria-label="HTML source"
            />
            <div className="we-status">
              <span className="we-page-no">Page 1 of 1</span>
              <span className="we-count">0 words · 0 characters</span>
              <span className="we-hint">
                Ctrl+F find · Ctrl+H replace · Ctrl+K link · Ctrl+Alt+1–3 headings
              </span>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
