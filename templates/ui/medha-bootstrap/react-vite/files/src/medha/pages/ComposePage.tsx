// Ported from the Medha theme by medha-starter. Source: compose.html. Regenerated from the theme; build new screens from these components.
import { Link } from "react-router";
import { AppShell } from "../../components/medha/AppShell";
import wysiwygCss from "../styles/wysiwyg.css?inline";
import schemeCss from "../styles/scheme.css?inline";
import schemeScript from "../scripts/scheme";
import pagesScript from "../scripts/pages";
import wysiwygScript from "../scripts/wysiwyg";

export default function ComposePage() {
  return (
    <AppShell
      title="Compose"
      documentTitle="Compose • Medha IoT"
      styles={[wysiwygCss, schemeCss]}
      scripts={[schemeScript, pagesScript, wysiwygScript]}
    >
      <section className="page-heading">
        <div>
          <div className="eyebrow">APPS</div>
          <h1>Compose</h1>
          <p>Write a new message.</p>
        </div>
        <div className="heading-actions" />
      </section>
      <section className="panel  mb-4">
        <div className="panel-heading">
          <div>
            <h2>New message</h2>
            <p>Draft and send (demo)</p>
          </div>
        </div>
        <div className="panel-body">
          <form className="needs-validation" noValidate>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label" htmlFor="to">
                To
              </label>
              <div className="col-sm-10">
                <input id="to" type="email" className="form-control" required />
                <div className="invalid-feedback">Enter a recipient.</div>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label" htmlFor="cc">
                Cc
              </label>
              <div className="col-sm-10">
                <input id="cc" type="email" className="form-control" />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label" htmlFor="sb">
                Subject
              </label>
              <div className="col-sm-10">
                <input id="sb" className="form-control" />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label" htmlFor="bd">
                Message
              </label>
              <div className="col-sm-10">
                <div className="wysiwyg" id="ed3" data-math-src="/math-embed.html">
                  <div className="we-toolbar" role="toolbar" aria-label="Formatting">
                    <select className="we-select" data-block="" aria-label="Paragraph style">
                      <option value="p">Paragraph</option>
                      <option value="h1">Heading 1</option>
                      <option value="h2">Heading 2</option>
                      <option value="h3">Heading 3</option>
                      <option value="h4">Heading 4</option>
                      <option value="pre">Code block</option>
                    </select>
                    <select className="we-select" data-size="" aria-label="Font size">
                      <option value="3">Normal</option>
                      <option value="1">Small</option>
                      <option value="5">Large</option>
                      <option value="6">X-large</option>
                    </select>
                    <span className="we-sep" />
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
                      <s>S</s>
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
                    <label className="we-color" title="Text colour">
                      <span>A</span>
                      <input
                        type="color"
                        defaultValue="#b45309"
                        data-color="foreColor"
                        aria-label="Text colour"
                      />
                    </label>
                    <label className="we-color hl" title="Highlight">
                      <span>▮</span>
                      <input
                        type="color"
                        defaultValue="#d99b26"
                        data-color="hiliteColor"
                        aria-label="Highlight colour"
                      />
                    </label>
                    <span className="we-sep" />
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="insertUnorderedList"
                      title="Bulleted list"
                      aria-label="Bulleted list"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="insertOrderedList"
                      title="Numbered list"
                      aria-label="Numbered list"
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
                    <span className="we-sep" />
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="justifyLeft"
                      title="Align left"
                      aria-label="Align left"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M4 6h16M4 10h10M4 14h16M4 18h10" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="justifyCenter"
                      title="Align centre"
                      aria-label="Align centre"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M4 6h16M7 10h10M4 14h16M7 18h10" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="justifyRight"
                      title="Align right"
                      aria-label="Align right"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M4 6h16M10 10h10M4 14h16M10 18h10" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="justifyFull"
                      title="Justify"
                      aria-label="Justify"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                    <span className="we-sep" />
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
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="insertHorizontalRule"
                      title="Horizontal rule"
                      aria-label="Horizontal rule"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M4 12h16" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="@link"
                      title="Insert link"
                      aria-label="Insert link"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
                      </svg>
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
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="@image"
                      title="Insert image"
                      aria-label="Insert image"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <circle cx="9" cy="10" r="2" />
                        <path d="m21 16-5-5-8 8" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="@table"
                      title="Insert table"
                      aria-label="Insert table"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <path d="M3 10h18M3 15h18M9 4v16" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="@math"
                      title="Insert equation"
                      aria-label="Insert equation"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M18 6H7l6 6-6 6h11" />
                      </svg>
                    </button>
                    <span className="we-sep" />
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="undo"
                      title="Undo"
                      aria-label="Undo"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="redo"
                      title="Redo"
                      aria-label="Redo"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="m15 14 5-5-5-5M20 9H10a6 6 0 0 0 0 12h3" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="we-btn"
                      data-cmd="removeFormat"
                      title="Clear formatting"
                      aria-label="Clear formatting"
                    >
                      <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                        <path d="M5 5h14M12 5l-3 14M4 20 20 4" />
                      </svg>
                    </button>
                    <span className="we-spacer" />
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
                  <div className="we-insert d-none">
                    <label className="visually-hidden" htmlFor="ed3-a">
                      Value
                    </label>
                    <input id="ed3-a" className="form-control form-control-sm we-in-a" />
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
                  <div
                    className="we-area"
                    contentEditable={true}
                    role="textbox"
                    aria-multiline="true"
                    aria-label="Editor content"
                    data-placeholder="Write your message…"
                    style={{ minHeight: "220px" }}
                  />
                  <textarea
                    className="we-source form-control d-none"
                    spellCheck={false}
                    aria-label="HTML source"
                  />
                  <div className="we-status">
                    <span className="we-count">0 words · 0 characters</span>
                    <span className="we-hint">
                      Tip: select text, then use the toolbar. Paste is converted to plain
                      formatting.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label" htmlFor="at">
                Attachment
              </label>
              <div className="col-sm-10">
                <input id="at" type="file" className="form-control" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10 offset-sm-2 d-flex gap-2">
                <button className="btn btn-primary" type="submit">
                  Send
                </button>
                <Link to="/dashboard/inbox" className="btn btn-outline-secondary">
                  Discard
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </AppShell>
  );
}
