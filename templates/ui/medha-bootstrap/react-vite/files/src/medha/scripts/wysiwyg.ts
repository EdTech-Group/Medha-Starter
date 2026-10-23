// @ts-nocheck -- the theme's own script, kept byte for byte so its behaviour does not drift.
// Ported from the Medha theme by medha-starter. Source: assets/wysiwyg.js, unchanged inside this function.
// The theme runs it once per page load; here it runs each time its page mounts (see
// src/components/medha/page-scripts.ts, which also removes its global listeners afterwards).
export default function wysiwygScript(): void {
  (function () {
    function safeUrl(u, img) {
      u = (u || "").trim();
      if (/^(https?:|mailto:|#|\/|\.\/|\.\.\/)/i.test(u)) return u;
      if (img && /^data:image\/(png|jpe?g|gif|webp);/i.test(u)) return u;
      if (/^[\w.-]+\.[a-z]{2,}/i.test(u)) return "https://" + u;
      return null;
    }
    var PX = { a4: [794, 1123], letter: [816, 1056], a5: [559, 794], legal: [816, 1344] },
      CM = 37.795;
    var OKT = {
      B: 1,
      STRONG: 1,
      I: 1,
      EM: 1,
      U: 1,
      S: 1,
      STRIKE: 1,
      SUB: 1,
      SUP: 1,
      P: 1,
      BR: 1,
      UL: 1,
      OL: 1,
      LI: 1,
      H1: 1,
      H2: 1,
      H3: 1,
      H4: 1,
      BLOCKQUOTE: 1,
      PRE: 1,
      CODE: 1,
      A: 1,
      TABLE: 1,
      THEAD: 1,
      TBODY: 1,
      TR: 1,
      TD: 1,
      TH: 1,
      HR: 1,
      IMG: 1,
    };
    function clean(node, out) {
      Array.prototype.forEach.call(node.childNodes, function (n) {
        if (n.nodeType == 3) {
          out.appendChild(document.createTextNode(n.nodeValue));
          return;
        }
        if (n.nodeType != 1) return;
        var t = n.tagName;
        if (
          /^(SCRIPT|STYLE|META|LINK|HEAD|TITLE|IFRAME|OBJECT|EMBED|FORM|INPUT|BUTTON|SVG|MATH|NOSCRIPT)$/.test(
            t,
          )
        )
          return;
        if (t == "DIV") {
          var p = document.createElement("p");
          clean(n, p);
          if (p.textContent.trim() || p.querySelector("img")) out.appendChild(p);
          return;
        }
        if (!OKT[t]) {
          clean(n, out);
          return;
        }
        var e = document.createElement(t);
        if (t == "A") {
          var h = safeUrl(n.getAttribute("href"));
          if (h) e.setAttribute("href", h);
        }
        if (t == "IMG") {
          var s = safeUrl(n.getAttribute("src"), true);
          if (!s) return;
          e.setAttribute("src", s);
          e.setAttribute("alt", n.getAttribute("alt") || "");
        }
        if (t == "TD" || t == "TH") {
          ["colspan", "rowspan"].forEach(function (k) {
            var v = parseInt(n.getAttribute(k), 10);
            if (v > 1 && v < 50) e.setAttribute(k, v);
          });
        }
        clean(n, e);
        out.appendChild(e);
      });
    }
    function cleanHtml(html) {
      var d = new DOMParser().parseFromString(html, "text/html"),
        o = document.createElement("div");
      clean(d.body, o);
      return o.innerHTML;
    }
    document.querySelectorAll(".wysiwyg").forEach(function (w) {
      var area = w.querySelector(".we-area"),
        src = w.querySelector(".we-source"),
        ins = w.querySelector(".we-insert"),
        a = w.querySelector(".we-in-a"),
        b = w.querySelector(".we-in-b"),
        c = w.querySelector(".we-in-c"),
        count = w.querySelector(".we-count"),
        saved = null,
        mode = null,
        out = document.getElementById(w.id + "-out"),
        word = w.classList.contains("we-word"),
        vw = word ? w.querySelector(".we-canvas") : area,
        wordCmd = null,
        wordState = null,
        wordSync = null;
      function sync() {
        var t = area.innerText.trim(),
          words = t ? t.split(/\s+/).length : 0;
        count.textContent =
          words + " word" + (words == 1 ? "" : "s") + " · " + t.length + " characters";
        if (out) out.textContent = area.innerHTML;
        area.dispatchEvent(new Event("we-change", { bubbles: true }));
        if (wordSync) wordSync();
      }
      function saveSel() {
        var s = getSelection();
        if (s.rangeCount && area.contains(s.anchorNode)) saved = s.getRangeAt(0).cloneRange();
      }
      function restore() {
        area.focus();
        if (saved) {
          var s = getSelection();
          s.removeAllRanges();
          s.addRange(saved);
        }
      }
      function exec(cmd, val) {
        restore();
        document.execCommand("styleWithCSS", false, cmd == "hiliteColor" || cmd == "foreColor");
        document.execCommand(cmd, false, val || null);
        sync();
        state();
      }
      function state() {
        w.querySelectorAll(".we-btn[data-cmd]").forEach(function (btn) {
          var cm = btn.dataset.cmd;
          if (
            /^(bold|italic|underline|strikeThrough|subscript|superscript|insertUnorderedList|insertOrderedList|justify\w+)$/.test(
              cm,
            )
          ) {
            try {
              btn.classList.toggle("on", document.queryCommandState(cm));
            } catch (e) {}
          }
        });
        var blk = w.querySelector("[data-block]");
        if (wordState) wordState();
        if (blk)
          try {
            var v = (document.queryCommandValue("formatBlock") || "")
              .toLowerCase()
              .replace(/[<>]/g, "");
            if (["p", "h1", "h2", "h3", "h4", "pre"].indexOf(v) > -1) blk.value = v;
          } catch (e) {}
      }
      function openIns(m) {
        saveSel();
        mode = m;
        ins.classList.remove("d-none");
        b.classList.add("d-none");
        c.classList.add("d-none");
        a.type = "text";
        if (m == "link") {
          a.placeholder = "https://example.com";
          a.value = "";
        }
        if (m == "image") {
          a.placeholder = "Image URL (https://…)";
          a.value = "";
        }
        if (m == "table") {
          a.type = "hidden";
          b.classList.remove("d-none");
          c.classList.remove("d-none");
        }
        a.focus();
      }
      function closeIns() {
        ins.classList.add("d-none");
        mode = null;
        restore();
      }
      w.querySelector(".we-apply").onclick = function () {
        if (mode == "link") {
          var u = safeUrl(a.value);
          if (!u) {
            a.classList.add("is-invalid");
            return;
          }
          a.classList.remove("is-invalid");
          restore();
          var sel = getSelection();
          if (sel.isCollapsed) {
            document.execCommand(
              "insertHTML",
              false,
              '<a href="' + u.replace(/"/g, "&quot;") + '">' + u.replace(/</g, "&lt;") + "</a>",
            );
          } else document.execCommand("createLink", false, u);
          closeIns();
          sync();
        } else if (mode == "image") {
          var u2 = safeUrl(a.value, true);
          if (!u2) {
            a.classList.add("is-invalid");
            return;
          }
          a.classList.remove("is-invalid");
          restore();
          document.execCommand("insertImage", false, u2);
          closeIns();
          sync();
        } else if (mode == "table") {
          var cols = Math.max(1, Math.min(12, +b.value || 3)),
            rows = Math.max(1, Math.min(20, +c.value || 3)),
            h = "<table><tbody>";
          for (var r = 0; r < rows; r++) {
            h += "<tr>";
            for (var k = 0; k < cols; k++) h += r == 0 ? "<th>Header</th>" : "<td>&nbsp;</td>";
            h += "</tr>";
          }
          h += "</tbody></table><p><br></p>";
          restore();
          document.execCommand("insertHTML", false, h);
          closeIns();
          sync();
        }
      };
      w.querySelector(".we-cancel").onclick = closeIns;
      a.addEventListener("keydown", function (e) {
        if (e.key == "Enter") {
          e.preventDefault();
          w.querySelector(".we-apply").click();
        }
        if (e.key == "Escape") closeIns();
      });

      var mframe = null,
        mmodal = null,
        mready = false,
        mpend = null,
        editing = null;
      function bad(x) {
        return /<script|\son\w+\s*=|javascript:/i.test(x);
      }
      function closeMath() {
        if (mmodal) mmodal.classList.add("d-none");
        document.body.classList.remove("we-modal-open");
        editing = null;
        mpend = null;
        restore();
      }
      function sendLoad() {
        if (mpend && mready && mframe.contentWindow) {
          mframe.contentWindow.postMessage(mpend, "*");
        }
      }
      function buildMath() {
        if (mmodal) return;
        mmodal = document.createElement("div");
        mmodal.className = "we-modal d-none";
        mmodal.setAttribute("role", "dialog");
        mmodal.setAttribute("aria-modal", "true");
        mmodal.setAttribute("aria-label", "Equation editor");
        mmodal.innerHTML =
          '<div class="we-modal-box"><div class="we-modal-head"><b>Equation editor</b><button type="button" class="we-modal-x" aria-label="Close">&times;</button></div><iframe class="we-modal-frame" title="Equation editor"></iframe></div>';
        document.body.appendChild(mmodal);
        mframe = mmodal.querySelector("iframe");
        mframe.src = w.getAttribute("data-math-src") || "math-embed.html";
        mmodal.querySelector(".we-modal-x").onclick = closeMath;
        mmodal.addEventListener("mousedown", function (e) {
          if (e.target === mmodal) closeMath();
        });
        document.addEventListener("keydown", function (e) {
          if (e.key == "Escape" && mmodal && !mmodal.classList.contains("d-none")) closeMath();
        });
        window.addEventListener("message", function (e) {
          if (!mframe || e.source !== mframe.contentWindow) return;
          var d = e.data || {};
          if (d.type == "medha-math-ready") {
            mready = true;
            sendLoad();
          } else if (d.type == "medha-math-cancel") closeMath();
          else if (d.type == "medha-math-insert") {
            var m = String(d.mathml || "");
            if (!/^\s*<math[\s>]/i.test(m) || bad(m)) return;
            var inl = !!d.inline,
              el = document.createElement(inl ? "span" : "div");
            el.className = "we-math" + (inl ? "" : " we-math-block");
            el.setAttribute("contenteditable", "false");
            el.setAttribute("data-inline", inl ? "1" : "0");
            el.setAttribute("aria-label", "Equation");
            if (d.tex) el.setAttribute("data-tex", String(d.tex));
            el.innerHTML = m;
            if (editing && area.contains(editing)) {
              editing.replaceWith(el);
            } else {
              restore();
              document.execCommand("insertHTML", false, el.outerHTML + (inl ? "&nbsp;" : ""));
            }
            closeMath();
            sync();
          }
        });
      }
      function openMath(el) {
        saveSel();
        editing = el || null;
        buildMath();
        var p = { type: "medha-math-load", tex: "", mathml: "", inline: false };
        if (el) {
          p.tex = el.getAttribute("data-tex") || "";
          var mm = el.querySelector("math");
          p.mathml = mm ? mm.outerHTML : "";
          p.inline = el.getAttribute("data-inline") == "1";
        }
        mpend = p;
        mmodal.classList.remove("d-none");
        document.body.classList.add("we-modal-open");
        sendLoad();
        setTimeout(function () {
          try {
            mframe.focus();
          } catch (e) {}
        }, 50);
      }
      area.addEventListener("dblclick", function (e) {
        var m = e.target.closest && e.target.closest(".we-math");
        if (m && area.contains(m)) {
          e.preventDefault();
          openMath(m);
        }
      });
      w.querySelector(".we-toolbar").addEventListener("mousedown", function (e) {
        if (e.target.closest(".we-btn")) e.preventDefault();
      });
      w.querySelectorAll(".we-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var cmd = btn.dataset.cmd;
          if (wordCmd && wordCmd(cmd, btn)) return;
          if (cmd == "@link") return openIns("link");
          if (cmd == "@image") return openIns("image");
          if (cmd == "@table") return openIns("table");
          if (cmd == "@math") return openMath(null);
          if (cmd == "@full") {
            w.classList.toggle("is-full");
            btn.classList.toggle("on");
            document.body.style.overflow = w.classList.contains("is-full") ? "hidden" : "";
            if (w._weFit) setTimeout(w._weFit, 50);
            return;
          }
          if (cmd == "@source") {
            var on = !src.classList.contains("d-none");
            if (on) {
              area.innerHTML = src.value;
              src.classList.add("d-none");
              vw.classList.remove("d-none");
              btn.classList.remove("on");
              w.querySelectorAll(".we-btn,.we-select,.we-color").forEach(function (x) {
                if (x !== btn) x.style.opacity = "";
                x.disabled = false;
              });
              sync();
            } else {
              src.value = area.innerHTML.replace(/></g, ">\n<");
              src.classList.remove("d-none");
              vw.classList.add("d-none");
              btn.classList.add("on");
              w.querySelectorAll(".we-btn,.we-select").forEach(function (x) {
                if (x !== btn && !x.matches('[data-cmd="@full"]')) x.disabled = true;
              });
            }
            return;
          }
          if (btn.dataset.blockCmd) {
            restore();
            var cur = (document.queryCommandValue("formatBlock") || "").toLowerCase();
            document.execCommand("formatBlock", false, cur == "blockquote" ? "p" : "blockquote");
            sync();
            state();
            return;
          }
          exec(cmd);
        });
      });
      var blkSel = w.querySelector("[data-block]");
      if (blkSel)
        blkSel.addEventListener("change", function (e) {
          exec("formatBlock", e.target.value);
        });
      var szSel = w.querySelector("[data-size]");
      if (szSel)
        szSel.addEventListener("change", function (e) {
          exec("fontSize", e.target.value);
        });
      w.querySelectorAll("[data-color]").forEach(function (i) {
        i.addEventListener("mousedown", saveSel);
        i.addEventListener("input", function () {
          exec(i.dataset.color, i.value);
        });
      });
      area.addEventListener("input", sync);
      area.addEventListener("keyup", function () {
        saveSel();
        state();
      });
      area.addEventListener("mouseup", function () {
        saveSel();
        state();
      });
      area.addEventListener("blur", saveSel);
      area.addEventListener("paste", function (e) {
        e.preventDefault();
        var cd = e.clipboardData || window.clipboardData,
          h = word ? cd.getData("text/html") : "",
          t = cd.getData("text/plain");
        if (h) {
          var c = cleanHtml(h);
          if (c.trim()) {
            document.execCommand("insertHTML", false, c);
            return;
          }
        }
        document.execCommand("insertText", false, t);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key == "Escape" && w.classList.contains("is-full")) {
          w.classList.remove("is-full");
          document.body.style.overflow = "";
        }
      });

      if (word) {
        var sheet = w.querySelector(".we-sheet"),
          zw = w.querySelector(".we-zoomwrap"),
          canvas = vw,
          ruler = w.querySelector(".we-ruler"),
          pgNo = w.querySelector(".we-page-no"),
          zr = w.querySelector("[data-zoom]"),
          zl = w.querySelector(".we-zoom-l"),
          PW = 794,
          PH = 1123,
          PM = 96,
          Z = 1;
        function $q(s) {
          return w.querySelector(s);
        }
        function selOf(a) {
          return w.querySelector("[" + a + "]");
        }
        // ---- tabs
        function showTab(n) {
          w.querySelectorAll(".we-tab").forEach(function (t) {
            var on = t.dataset.tab == n;
            t.classList.toggle("on", on);
            t.setAttribute("aria-selected", on);
          });
          w.querySelectorAll(".we-panel").forEach(function (p) {
            p.classList.toggle("d-none", p.dataset.panel != n);
          });
        }
        w.querySelectorAll(".we-tab").forEach(function (t) {
          t.addEventListener("click", function () {
            showTab(t.dataset.tab);
          });
        });
        // ---- layout / zoom / ruler
        function drawRuler() {
          ruler.style.width = PW + "px";
          ruler.style.setProperty("--pm", PM + "px");
          var h =
              '<i class="we-r-l" style="width:' +
              PM +
              'px"></i><i class="we-r-r" style="width:' +
              PM +
              'px"></i>',
            n = Math.floor((PW - 2 * PM) / CM);
          for (var k = 1; k <= n; k++) h += '<b style="left:' + (PM + k * CM) + 'px">' + k + "</b>";
          h += '<b style="left:' + PM + 'px">0</b>';
          ruler.innerHTML = h;
        }
        function applyZoom(z) {
          Z = Math.max(0.4, Math.min(2, z));
          zw.style.zoom = Z;
          if (zr) zr.value = Math.round(Z * 100);
          if (zl) zl.textContent = Math.round(Z * 100) + "%";
        }
        function fit() {
          var cw = canvas.clientWidth;
          if (cw > 100) applyZoom(Math.min(1, (cw - 36) / PW));
        }
        function layout() {
          var ps = (selOf("data-psize") || {}).value || "a4",
            or = (selOf("data-orient") || {}).value || "p",
            mg = +((selOf("data-margin") || {}).value || 96),
            cols = +((selOf("data-cols") || {}).value || 1),
            d = PX[ps] || PX.a4;
          PW = or == "l" ? d[1] : d[0];
          PH = or == "l" ? d[0] : d[1];
          PM = mg;
          sheet.style.setProperty("--pw", PW + "px");
          sheet.style.setProperty("--ph", PH + "px");
          sheet.style.setProperty("--pm", PM + "px");
          area.style.columnCount = cols > 1 ? cols : "";
          area.style.columnGap = cols > 1 ? "32px" : "";
          zw.style.width = PW + "px";
          drawRuler();
          wordSync();
        }
        ["data-psize", "data-orient", "data-margin", "data-cols"].forEach(function (a) {
          var s = selOf(a);
          if (s) s.addEventListener("change", layout);
        });
        if (zr)
          zr.addEventListener("input", function () {
            applyZoom(zr.value / 100);
          });
        var rt = selOf("data-ruler");
        // ---- status
        wordSync = function () {
          var pages = Math.max(1, Math.ceil((sheet.offsetHeight - 2) / PH));
          var cur = 1;
          try {
            var s = getSelection();
            if (s.rangeCount && area.contains(s.anchorNode)) {
              var nd = s.anchorNode.nodeType == 1 ? s.anchorNode : s.anchorNode.parentElement,
                r = s.getRangeAt(0).getBoundingClientRect();
              if (!r.height) r = nd.getBoundingClientRect();
              var top = r.top - sheet.getBoundingClientRect().top;
              cur = Math.min(pages, Math.max(1, Math.floor(top / (PH * Z)) + 1));
            }
          } catch (e) {}
          if (pgNo) pgNo.textContent = "Page " + cur + " of " + pages;
        };
        // ---- state
        var fontSel = selOf("data-font"),
          sizeSel = selOf("data-fsize");
        wordState = function () {
          var s = getSelection(),
            inTbl = false,
            el = null;
          if (s.rangeCount && area.contains(s.anchorNode)) {
            el = s.anchorNode.nodeType == 1 ? s.anchorNode : s.anchorNode.parentElement;
            inTbl = !!el.closest("td,th");
          }
          var tt = w.querySelector(".we-tab-ctx");
          if (tt) {
            tt.classList.toggle("d-none", !inTbl);
            if (!inTbl && tt.classList.contains("on")) showTab("home");
          }
          if (el) {
            var cs = getComputedStyle(el);
            if (sizeSel) {
              var pt = Math.round(parseFloat(cs.fontSize) * 0.75 * 2) / 2,
                found = false;
              Array.prototype.forEach.call(sizeSel.options, function (o) {
                if (+o.value == pt) {
                  sizeSel.value = o.value;
                  found = true;
                }
              });
              if (!found) {
                var o = sizeSel.querySelector("[data-tmp]");
                if (!o) {
                  o = document.createElement("option");
                  o.setAttribute("data-tmp", "1");
                  sizeSel.appendChild(o);
                }
                o.value = pt;
                o.textContent = pt;
                sizeSel.value = pt;
              }
            }
            if (fontSel) {
              var fam = (cs.fontFamily || "")
                .split(",")[0]
                .replace(/["']/g, "")
                .trim()
                .toLowerCase();
              var hit = "";
              Array.prototype.forEach.call(fontSel.options, function (o) {
                if (o.dataset.n && o.dataset.n.toLowerCase() == fam) hit = o.value;
              });
              fontSel.value = hit || fontSel.options[0].value;
            }
          }
          var bv = "";
          try {
            bv = (document.queryCommandValue("formatBlock") || "")
              .toLowerCase()
              .replace(/[<>]/g, "");
          } catch (e) {}
          w.querySelectorAll("[data-style]").forEach(function (b) {
            b.classList.toggle("on", b.dataset.style == (bv == "div" ? "p" : bv));
          });
        };
        function wrapWord() {
          var s = getSelection();
          if (s.isCollapsed && s.modify) {
            s.modify("move", "backward", "word");
            s.modify("extend", "forward", "word");
          }
        }
        if (fontSel)
          fontSel.addEventListener("change", function () {
            exec("fontName", fontSel.value);
          });
        if (sizeSel)
          sizeSel.addEventListener("change", function () {
            var pt = +sizeSel.value;
            restore();
            wrapWord();
            document.execCommand("styleWithCSS", false, false);
            document.execCommand("fontSize", false, "7");
            area.querySelectorAll('font[size="7"]').forEach(function (f) {
              var sp = document.createElement("span");
              sp.style.fontSize = pt + "pt";
              while (f.firstChild) sp.appendChild(f.firstChild);
              f.replaceWith(sp);
            });
            area
              .querySelectorAll('span[style*="xxx-large"],span[style*="-webkit-xxx-large"]')
              .forEach(function (sp) {
                sp.style.fontSize = pt + "pt";
              });
            saveSel();
            sync();
            state();
          });
        var lhSel = selOf("data-lh");
        if (lhSel)
          lhSel.addEventListener("change", function () {
            restore();
            var s = getSelection();
            if (!s.rangeCount) return;
            var r = s.getRangeAt(0),
              list = Array.prototype.filter.call(
                area.querySelectorAll("p,h1,h2,h3,h4,li,blockquote,pre,td,th"),
                function (b) {
                  return r.intersectsNode(b);
                },
              );
            if (!list.length) {
              var e = s.anchorNode.nodeType == 1 ? s.anchorNode : s.anchorNode.parentElement,
                b2 = e.closest("p,h1,h2,h3,h4,li,blockquote,pre,td,th");
              if (b2) list = [b2];
            }
            list.forEach(function (b) {
              b.style.lineHeight = lhSel.value;
            });
            sync();
          });
        var symSel = selOf("data-symbol");
        if (symSel)
          symSel.addEventListener("change", function () {
            if (symSel.value) {
              restore();
              document.execCommand("insertText", false, symSel.value);
              sync();
            }
            symSel.selectedIndex = 0;
          });
        w.querySelectorAll("[data-shade]").forEach(function (i) {
          i.addEventListener("mousedown", saveSel);
          i.addEventListener("input", function () {
            var c = cellOf();
            if (c) {
              c.style.backgroundColor = i.value;
              sync();
            }
          });
        });
        w.querySelectorAll(".we-color input").forEach(function (i) {
          i.addEventListener("input", function () {
            var sp = i.parentNode.querySelector("span");
            if (sp && !i.parentNode.classList.contains("hl")) sp.style.borderBottomColor = i.value;
          });
        });
        // ---- table tools
        function cellOf() {
          var s = saved ? saved.startContainer : null;
          if (!s) return null;
          var e = s.nodeType == 1 ? s : s.parentElement;
          var c = e && e.closest("td,th");
          return c && area.contains(c) ? c : null;
        }
        function newCell(tag) {
          var c = document.createElement(tag);
          c.innerHTML = "<br>";
          return c;
        }
        function tbl(op) {
          var c = cellOf();
          if (!c) return;
          var tr = c.parentElement,
            t = c.closest("table"),
            idx = c.cellIndex;
          if (op == "row-above" || op == "row-below") {
            var n = document.createElement("tr");
            for (var k = 0; k < tr.cells.length; k++) n.appendChild(newCell("td"));
            tr.parentNode.insertBefore(n, op == "row-above" ? tr : tr.nextSibling);
          } else if (op == "col-left" || op == "col-right") {
            Array.prototype.forEach.call(t.rows, function (r) {
              var ref = r.cells[idx],
                tag = ref ? ref.tagName.toLowerCase() : "td",
                n = newCell(tag);
              if (ref) r.insertBefore(n, op == "col-left" ? ref : ref.nextSibling);
              else r.appendChild(n);
            });
          } else if (op == "del-row") {
            if (t.rows.length <= 1) t.remove();
            else tr.remove();
          } else if (op == "del-col") {
            if (tr.cells.length <= 1) t.remove();
            else
              Array.prototype.forEach.call(t.rows, function (r) {
                if (r.cells[idx]) r.deleteCell(idx);
              });
          } else if (op == "del-table") t.remove();
          else if (op == "header") {
            var hd = tr.cells;
            Array.prototype.forEach.call(hd, function (x) {
              var n = document.createElement(x.tagName == "TH" ? "td" : "th");
              n.innerHTML = x.innerHTML;
              if (x.getAttribute("style")) n.setAttribute("style", x.getAttribute("style"));
              x.replaceWith(n);
            });
          }
          sync();
          wordState();
        }
        // ---- find & replace
        var fbar = $q(".we-find"),
          fq = $q(".we-f-q"),
          fr = $q(".we-f-r"),
          fc = $q(".we-f-case"),
          fn = $q(".we-f-n"),
          hl = null;
        function tnodes() {
          var tw = document.createTreeWalker(area, NodeFilter.SHOW_TEXT, {
              acceptNode: function (n) {
                return n.parentElement.closest(".we-math")
                  ? NodeFilter.FILTER_REJECT
                  : NodeFilter.FILTER_ACCEPT;
              },
            }),
            a = [],
            n;
          while ((n = tw.nextNode())) a.push(n);
          return a;
        }
        function matches() {
          var q = fq.value,
            res = [];
          if (!q) return res;
          var cs = fc.checked,
            qq = cs ? q : q.toLowerCase();
          tnodes().forEach(function (n) {
            var t = cs ? n.nodeValue : n.nodeValue.toLowerCase(),
              i = 0;
            while ((i = t.indexOf(qq, i)) > -1) {
              res.push({ n: n, s: i, e: i + q.length });
              i += q.length || 1;
            }
          });
          return res;
        }
        function rng(m) {
          var r = document.createRange();
          r.setStart(m.n, m.s);
          r.setEnd(m.n, m.e);
          return r;
        }
        function paintHl(ms) {
          try {
            if (window.CSS && CSS.highlights && window.Highlight) {
              CSS.highlights.delete("we-find-" + w.id);
              if (ms.length) CSS.highlights.set("we-find-" + w.id, new Highlight(...ms.map(rng)));
            }
          } catch (e) {}
        }
        function findGo(back) {
          var ms = matches();
          fn.textContent = ms.length ? ms.length + " found" : fq.value ? "No matches" : "";
          paintHl(ms);
          if (!ms.length) return null;
          var s = getSelection(),
            ref = saved && area.contains(saved.startContainer) ? saved : null,
            pick = null;
          if (ref) {
            for (var k = 0; k < ms.length; k++) {
              var r = rng(ms[k]);
              var c = back
                ? r.compareBoundaryPoints(Range.START_TO_START, ref)
                : r.compareBoundaryPoints(Range.START_TO_START, ref);
              if (back) {
                if (c < 0) pick = ms[k];
              } else if (c > 0 || (c == 0 && ref.collapsed)) {
                pick = ms[k];
                break;
              }
            }
          }
          if (!pick) pick = back ? ms[ms.length - 1] : ms[0];
          var rr = rng(pick);
          saved = rr.cloneRange();
          s.removeAllRanges();
          s.addRange(rr);
          pick.n.parentElement.scrollIntoView({ block: "center", inline: "nearest" });
          return pick;
        }
        function openFind(rep) {
          fbar.classList.remove("d-none");
          saveSel();
          var s = getSelection();
          if (
            s.rangeCount &&
            !s.isCollapsed &&
            area.contains(s.anchorNode) &&
            s.toString().length < 80 &&
            s.toString().indexOf("\n") < 0
          )
            fq.value = s.toString();
          (rep ? fr : fq).focus();
          fq.select && !rep && fq.select();
          if (fq.value) findGo();
        }
        function closeFind() {
          fbar.classList.add("d-none");
          paintHl([]);
          restore();
        }
        $q(".we-f-next").onclick = function () {
          findGo(false);
        };
        $q(".we-f-prev").onclick = function () {
          findGo(true);
        };
        $q(".we-f-x").onclick = closeFind;
        fq.addEventListener("input", function () {
          saved = null;
          var ms = matches();
          fn.textContent = ms.length ? ms.length + " found" : fq.value ? "No matches" : "";
          paintHl(ms);
        });
        fc.addEventListener("change", function () {
          fq.dispatchEvent(new Event("input"));
        });
        [fq, fr].forEach(function (i) {
          i.addEventListener("keydown", function (e) {
            if (e.key == "Enter") {
              e.preventDefault();
              findGo(e.shiftKey);
            }
            if (e.key == "Escape") closeFind();
          });
        });
        $q(".we-f-rep").onclick = function () {
          var s = getSelection(),
            cs = fc.checked,
            sel = saved && !saved.collapsed ? saved.toString() : "";
          if (sel && (cs ? sel == fq.value : sel.toLowerCase() == fq.value.toLowerCase())) {
            area.focus();
            s.removeAllRanges();
            s.addRange(saved);
            document.execCommand("insertText", false, fr.value);
            saveSel();
            sync();
          }
          findGo(false);
        };
        $q(".we-f-all").onclick = function () {
          var ms = matches();
          if (!ms.length) return;
          area.focus();
          for (var k = ms.length - 1; k >= 0; k--) {
            var r = rng(ms[k]),
              s = getSelection();
            s.removeAllRanges();
            s.addRange(r);
            document.execCommand("insertText", false, fr.value);
          }
          saved = null;
          fn.textContent = ms.length + " replaced";
          paintHl([]);
          sync();
        };
        // ---- commands
        wordCmd = function (cmd, btn) {
          if (btn.dataset.style) {
            restore();
            var st = btn.dataset.style;
            if (st == "blockquote") {
              var cur = (document.queryCommandValue("formatBlock") || "").toLowerCase();
              document.execCommand("formatBlock", false, cur == "blockquote" ? "p" : "blockquote");
            } else document.execCommand("formatBlock", false, st);
            sync();
            state();
            return true;
          }
          if (btn.dataset.tbl) {
            saveSel();
            tbl(btn.dataset.tbl);
            return true;
          }
          if (cmd == "@find") {
            openFind(btn.dataset.rep == "1");
            return true;
          }
          if (cmd == "@selectall") {
            area.focus();
            document.execCommand("selectAll");
            saveSel();
            return true;
          }
          if (cmd == "@cut" || cmd == "@copy") {
            restore();
            document.execCommand(cmd == "@cut" ? "cut" : "copy");
            sync();
            return true;
          }
          if (cmd == "@paste") {
            var done = function (h, t) {
              restore();
              if (h) {
                var c = cleanHtml(h);
                if (c.trim()) {
                  document.execCommand("insertHTML", false, c);
                  sync();
                  return;
                }
              }
              if (t) document.execCommand("insertText", false, t);
              sync();
            };
            if (navigator.clipboard && navigator.clipboard.read) {
              navigator.clipboard
                .read()
                .then(function (items) {
                  var it = items[0];
                  if (it && it.types.indexOf("text/html") > -1)
                    it.getType("text/html")
                      .then(function (b) {
                        return b.text();
                      })
                      .then(function (h) {
                        done(h, "");
                      });
                  else if (it && it.types.indexOf("text/plain") > -1)
                    it.getType("text/plain")
                      .then(function (b) {
                        return b.text();
                      })
                      .then(function (t) {
                        done("", t);
                      });
                })
                .catch(function () {
                  navigator.clipboard
                    .readText()
                    .then(function (t) {
                      done("", t);
                    })
                    .catch(function () {
                      area.focus();
                    });
                });
            } else area.focus();
            return true;
          }
          if (cmd == "@pagebreak") {
            restore();
            document.execCommand("insertHTML", false, '<hr class="we-pb"><p><br></p>');
            sync();
            return true;
          }
          if (cmd == "@date") {
            restore();
            document.execCommand("insertText", false, new Date().toLocaleString());
            sync();
            return true;
          }
          if (cmd == "@fit") {
            fit();
            return true;
          }
          if (cmd == "@ruler") {
            var on = canvas.classList.toggle("no-ruler");
            btn.classList.toggle("on", !on);
            return true;
          }
          return false;
        };
        if (rt) rt.classList.add("on");
        // ---- shortcuts
        area.addEventListener("keydown", function (e) {
          var k = e.key.toLowerCase(),
            m = e.ctrlKey || e.metaKey;
          if (!m) return;
          var map = { l: "justifyLeft", e: "justifyCenter", r: "justifyRight", j: "justifyFull" };
          if (!e.shiftKey && !e.altKey && map[k]) {
            e.preventDefault();
            exec(map[k]);
          } else if (k == "k" && !e.shiftKey) {
            e.preventDefault();
            openIns("link");
          } else if (k == "f" && !e.shiftKey) {
            e.preventDefault();
            openFind(false);
          } else if (k == "h" && !e.shiftKey) {
            e.preventDefault();
            openFind(true);
          } else if (e.altKey && /^[1-3]$/.test(e.key)) {
            e.preventDefault();
            exec("formatBlock", "h" + e.key);
          } else if (e.altKey && e.key == "0") {
            e.preventDefault();
            exec("formatBlock", "p");
          }
        });
        w.addEventListener("keydown", function (e) {
          if (
            e.key == "Escape" &&
            fbar &&
            !fbar.classList.contains("d-none") &&
            !e.defaultPrevented
          )
            closeFind();
        });
        var tabs = w.querySelector(".we-tabs");
        window.addEventListener("resize", function () {
          if (!w.classList.contains("is-full") && canvas.clientWidth < PW * Z + 20) fit();
        });
        w._weFit = fit;
        layout();
        fit();
        wordSync();
      }
      document.execCommand("defaultParagraphSeparator", false, "p");
      sync();
    });
    var cp = document.getElementById("copy-html");
    if (cp)
      cp.addEventListener("click", function () {
        var t = document.getElementById("ed1-out").textContent;
        function done() {
          var o = cp.innerHTML;
          cp.textContent = "Copied";
          setTimeout(function () {
            cp.innerHTML = o;
          }, 1400);
        }
        if (navigator.clipboard && navigator.clipboard.writeText)
          navigator.clipboard.writeText(t).then(done, done);
        else done();
      });
  })();
}
