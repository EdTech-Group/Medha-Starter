// @ts-nocheck -- the theme's own script, kept byte for byte so its behaviour does not drift.
// Ported from the Medha theme by medha-starter. Source: assets/tree-editor.js, unchanged inside this function.
// The theme runs it once per page load; here it runs each time its page mounts (see
// src/components/medha/page-scripts.ts, which also removes its global listeners afterwards).
export default function treeEditorScript(): void {
  (function () {
    "use strict";
    var KEY = "medha-tree-editor-v1";
    var ICONS = {
      globe: "Workspace",
      pin: "Site",
      device: "Gateway",
      sun: "Solar",
      bolt: "Energy",
      wave: "Sensor",
      users: "Team",
      cloud: "Cloud",
      home: "Building",
      laptop: "Server",
      shield: "Security",
    };
    var STS = ["", "Online", "Warning", "Offline"];
    var DEF = {
      name: "Medha workspace",
      icon: "globe",
      kids: [
        {
          name: "Ahmedabad",
          icon: "pin",
          kids: [
            {
              name: "MedhaSense 001",
              icon: "device",
              st: "Online",
              kids: [
                { name: "Solar inverter", icon: "sun" },
                { name: "Energy meter", icon: "bolt" },
              ],
            },
            {
              name: "MedhaSense 004",
              icon: "device",
              st: "Warning",
              kids: [{ name: "Temperature probe", icon: "wave" }],
            },
          ],
        },
        {
          name: "Vadodara",
          icon: "pin",
          kids: [
            {
              name: "MedhaSense 002",
              icon: "device",
              st: "Online",
              kids: [{ name: "Energy meter", icon: "bolt" }],
            },
          ],
        },
        {
          name: "Surat",
          icon: "pin",
          kids: [
            {
              name: "MedhaSense 006",
              icon: "device",
              st: "Offline",
              kids: [{ name: "Gateway modem", icon: "wave" }],
            },
          ],
        },
      ],
    };
    var $ = function (id) {
      return document.getElementById(id);
    };
    if (!$("te-outline")) return;
    var uid = 0,
      count = 0,
      root,
      sel,
      renaming = null,
      undo = [],
      redo = [],
      pBefore = null,
      drag = null;

    function esc(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    }
    function ic(n, c) {
      return '<svg class="icon ' + (c || "") + '"><use href="#i-' + n + '"/></svg>';
    }
    function clean(n, d) {
      if (!n || typeof n !== "object" || d > 12 || count >= 500) return null;
      count++;
      var o = {
        id: ++uid,
        name: String(n.name == null ? "Untitled" : n.name).slice(0, 80) || "Untitled",
        icon: ICONS[n.icon] ? n.icon : "pin",
        st: STS.indexOf(n.st) > 0 ? n.st : "",
        note: String(n.note || "").slice(0, 300),
        open: n.open !== false,
        kids: [],
      };
      if (Array.isArray(n.kids))
        n.kids.forEach(function (k) {
          var c = clean(k, d + 1);
          if (c) o.kids.push(c);
        });
      return o;
    }
    function build(d) {
      count = 0;
      return clean(d, 0);
    }
    function ser(n) {
      return {
        name: n.name,
        icon: n.icon,
        st: n.st || undefined,
        note: n.note || undefined,
        open: n.open === false ? false : undefined,
        kids: n.kids.length ? n.kids.map(ser) : undefined,
      };
    }
    function snap() {
      return JSON.stringify(ser(root));
    }
    function find(id, n, p, i) {
      n = n || root;
      if (n.id === id) return { n: n, p: p || null, i: i || 0 };
      for (var k = 0; k < n.kids.length; k++) {
        var r = find(id, n.kids[k], n, k);
        if (r) return r;
      }
      return null;
    }
    function contains(a, b) {
      if (a === b) return true;
      return a.kids.some(function (k) {
        return contains(k, b);
      });
    }
    function pathOf(n) {
      var out = [];
      (function w(x, acc) {
        if (x === n) {
          out = acc;
          return true;
        }
        for (var k = 0; k < x.kids.length; k++) if (w(x.kids[k], acc.concat(k))) return true;
        return false;
      })(root, []);
      return out;
    }
    function byPath(p) {
      var n = root;
      for (var i = 0; i < p.length; i++) {
        if (!n.kids[p[i]]) break;
        n = n.kids[p[i]];
      }
      return n;
    }
    function ancestors(n) {
      var a = [];
      (function w(x, acc) {
        if (x === n) {
          a = acc;
          return true;
        }
        for (var k = 0; k < x.kids.length; k++) if (w(x.kids[k], acc.concat(x))) return true;
        return false;
      })(root, []);
      return a;
    }
    function status(m) {
      $("te-status").textContent = m;
    }
    function save() {
      try {
        localStorage.setItem(KEY, snap());
      } catch (e) {}
    }

    function commit(label, fn) {
      var before = snap(),
        bp = pathOf(sel);
      fn();
      if (snap() !== before) {
        undo.push({ s: before, p: bp });
        if (undo.length > 100) undo.shift();
        redo = [];
      }
      render();
      save();
      if (label) status(label);
    }
    function load(e) {
      root = build(JSON.parse(e.s));
      sel = byPath(e.p);
      renaming = null;
    }
    function doUndo() {
      if (!undo.length) return;
      var cur = { s: snap(), p: pathOf(sel) },
        e = undo.pop();
      redo.push(cur);
      load(e);
      render();
      save();
      status("Undone");
    }
    function doRedo() {
      if (!redo.length) return;
      var cur = { s: snap(), p: pathOf(sel) },
        e = redo.pop();
      undo.push(cur);
      load(e);
      render();
      save();
      status("Redone");
    }

    /* ---------- rendering ---------- */
    function ol(n, lvl) {
      var has = n.kids.length > 0,
        open = n.open !== false,
        isRoot = n === root;
      var row =
        '<div class="te-row' +
        (n === sel ? " sel" : "") +
        '" role="treeitem" data-id="' +
        n.id +
        '" aria-level="' +
        lvl +
        '" aria-selected="' +
        (n === sel) +
        '"' +
        (has ? ' aria-expanded="' + open + '"' : "") +
        ' tabindex="' +
        (n === sel ? 0 : -1) +
        '"' +
        (isRoot || renaming === n.id ? "" : ' draggable="true"') +
        ">" +
        (has
          ? '<span class="te-tg' +
            (open ? " open" : "") +
            '" data-tg="' +
            n.id +
            '" aria-hidden="true">' +
            ic("chevron") +
            "</span>"
          : '<span class="te-tg"></span>') +
        ic(n.icon, "te-ico") +
        (renaming === n.id
          ? '<input class="te-rename" id="te-rn" maxlength="80" aria-label="Node name" value="' +
            esc(n.name) +
            '">'
          : '<span class="te-text">' + esc(n.name) + "</span>") +
        (n.st ? '<span class="status-badge status-' + n.st + '">' + n.st + "</span>" : "") +
        (has ? '<span class="te-count">' + n.kids.length + "</span>" : "") +
        "</div>";
      return (
        '<li role="none">' +
        row +
        (has && open
          ? '<ul role="group">' +
            n.kids
              .map(function (k) {
                return ol(k, lvl + 1);
              })
              .join("") +
            "</ul>"
          : "") +
        "</li>"
      );
    }
    function dg(n, lvl) {
      var has = n.kids.length > 0,
        open = n.open !== false,
        isRoot = n === root;
      var node =
        '<div class="oc-node te-node lvl' +
        Math.min(lvl, 2) +
        (n === sel ? " sel" : "") +
        '" role="button" tabindex="0" data-id="' +
        n.id +
        '" aria-pressed="' +
        (n === sel) +
        '"' +
        (isRoot ? "" : ' draggable="true"') +
        ">" +
        '<span class="oc-ic">' +
        ic(n.icon) +
        '</span><span class="oc-t"><b>' +
        esc(n.name) +
        "</b><small>" +
        esc(n.st || ICONS[n.icon]) +
        "</small></span>" +
        (n.st ? '<i class="oc-dot oc-' + n.st + '"></i>' : "") +
        (has
          ? '<span class="oc-cnt" data-tg="' +
            n.id +
            '" title="' +
            (open ? "Collapse" : "Expand") +
            '"' +
            (open ? "" : ' style="background:#f3ca84"') +
            ">" +
            (open ? "" : "+ ") +
            n.kids.length +
            "</span>"
          : "") +
        "</div>";
      return (
        "<li" +
        (has && !open ? ' class="collapsed"' : "") +
        ">" +
        node +
        (has
          ? "<ul>" +
            n.kids
              .map(function (k) {
                return dg(k, lvl + 1);
              })
              .join("") +
            "</ul>"
          : "") +
        "</li>"
      );
    }
    function render() {
      $("te-outline").innerHTML = ol(root, 1);
      $("te-diagram").innerHTML = "<ul>" + dg(root, 0) + "</ul>";
      var ta = $("te-json");
      if (document.activeElement !== ta) ta.value = JSON.stringify(ser(root), null, 2);
      $("te-total").textContent = total(root) + " nodes";
      props();
      bar();
      if (renaming != null) {
        var r = $("te-rn");
        if (r) {
          r.focus();
          r.select();
        }
      }
    }
    function total(n) {
      return (
        1 +
        n.kids.reduce(function (a, k) {
          return a + total(k);
        }, 0)
      );
    }
    function updateSel() {
      [].forEach.call(document.querySelectorAll(".te-row"), function (r) {
        var s = +r.dataset.id === sel.id;
        r.classList.toggle("sel", s);
        r.setAttribute("aria-selected", s);
        r.tabIndex = s ? 0 : -1;
      });
      [].forEach.call(document.querySelectorAll(".te-node"), function (r) {
        var s = +r.dataset.id === sel.id;
        r.classList.toggle("sel", s);
        r.setAttribute("aria-pressed", s);
      });
      props();
      bar();
    }
    function props() {
      var a = document.activeElement,
        inP = a && a.closest && a.closest("#te-props");
      $("te-path").textContent = ancestors(sel)
        .concat(sel)
        .map(function (x) {
          return x.name;
        })
        .join("  ›  ");
      if (inP && a.id === "te-p-name") {
      } else $("te-p-name").value = sel.name;
      if (!(inP && a.id === "te-p-icon")) $("te-p-icon").value = sel.icon;
      if (!(inP && a.id === "te-p-st")) $("te-p-st").value = sel.st;
      if (!(inP && a.id === "te-p-note")) $("te-p-note").value = sel.note;
    }
    function bar() {
      var f = find(sel.id),
        isRoot = sel === root;
      function dis(a, v) {
        var b = document.querySelector('[data-act="' + a + '"]');
        if (b) b.disabled = !!v;
      }
      dis("sibling", isRoot);
      dis("dup", isRoot);
      dis("del", isRoot);
      dis("up", isRoot || f.i === 0);
      dis("down", isRoot || f.i === f.p.kids.length - 1);
      dis("indent", isRoot || f.i === 0);
      dis("outdent", isRoot || f.p === root);
      dis("undo", !undo.length);
      dis("redo", !redo.length);
    }

    /* ---------- operations ---------- */
    function newNode(depth) {
      return {
        id: ++uid,
        name: "New node",
        icon: depth <= 1 ? "pin" : depth === 2 ? "device" : "wave",
        st: "",
        note: "",
        open: true,
        kids: [],
      };
    }
    function select(id, focus) {
      var f = find(id);
      if (!f) return;
      sel = f.n;
      var closed = ancestors(sel).filter(function (a) {
        return a.open === false;
      });
      closed.forEach(function (a) {
        a.open = true;
      });
      if (closed.length) render();
      else updateSel();
      if (focus) {
        var r = document.querySelector('.te-row[data-id="' + sel.id + '"]');
        if (r) r.focus();
      }
    }
    function addChild() {
      var c;
      commit("Added child node", function () {
        c = newNode(ancestors(sel).length + 1);
        sel.kids.push(c);
        sel.open = true;
        sel = c;
      });
      startRename(c.id);
    }
    function addSibling() {
      if (sel === root) return addChild();
      var c;
      commit("Added sibling node", function () {
        var f = find(sel.id);
        c = newNode(ancestors(sel).length);
        f.p.kids.splice(f.i + 1, 0, c);
        sel = c;
      });
      startRename(c.id);
    }
    function startRename(id) {
      renaming = id;
      render();
    }
    function endRename(ok) {
      if (renaming == null) return;
      var id = renaming,
        inp = $("te-rn");
      renaming = null;
      var v = inp ? inp.value.trim() : "";
      var n = find(id).n;
      if (ok && v && v !== n.name)
        commit("Renamed to “" + v + "”", function () {
          n.name = v.slice(0, 80);
        });
      else render();
      var r = document.querySelector('.te-row[data-id="' + id + '"]');
      if (r) r.focus();
    }
    function dup() {
      if (sel === root) return;
      commit("Duplicated", function () {
        var f = find(sel.id),
          c = build(ser(sel));
        c.name = (c.name + " copy").slice(0, 80);
        f.p.kids.splice(f.i + 1, 0, c);
        sel = c;
      });
    }
    function del() {
      if (sel === root) return;
      var nm = sel.name;
      commit("Deleted “" + nm + "” — press Ctrl+Z to undo", function () {
        var f = find(sel.id);
        f.p.kids.splice(f.i, 1);
        sel = f.p.kids[f.i] || f.p.kids[f.i - 1] || f.p;
      });
    }
    function move(d) {
      if (sel === root) return;
      commit("Moved " + (d < 0 ? "up" : "down"), function () {
        var f = find(sel.id),
          j = f.i + d;
        if (j < 0 || j >= f.p.kids.length) return;
        f.p.kids.splice(f.i, 1);
        f.p.kids.splice(j, 0, sel);
      });
    }
    function indent() {
      if (sel === root) return;
      commit("Indented", function () {
        var f = find(sel.id);
        if (f.i === 0) return;
        var prev = f.p.kids[f.i - 1];
        f.p.kids.splice(f.i, 1);
        prev.kids.push(sel);
        prev.open = true;
      });
    }
    function outdent() {
      if (sel === root) return;
      commit("Outdented", function () {
        var f = find(sel.id);
        if (f.p === root) return;
        var g = find(f.p.id);
        f.p.kids.splice(f.i, 1);
        g.p.kids.splice(g.i + 1, 0, sel);
      });
    }
    function toggle(id, open) {
      var f = find(id);
      if (!f || !f.n.kids.length) return;
      var n = f.n;
      n.open = open == null ? n.open === false : open;
      if (!n.open && sel !== n && contains(n, sel)) sel = n;
      render();
      save();
    }
    function setAll(open) {
      (function w(n, d) {
        if (n.kids.length) n.open = d === 0 ? true : open;
        n.kids.forEach(function (k) {
          w(k, d + 1);
        });
      })(root, 0);
      if (!open && sel !== root && ancestors(sel).length > 1) sel = ancestors(sel)[1];
      render();
      save();
      status(open ? "Expanded all" : "Collapsed below the first level");
    }
    function moveTo(id, tid, zone) {
      commit("Moved", function () {
        var f = find(id);
        f.p.kids.splice(f.i, 1);
        var t = find(tid);
        if (zone === "in") {
          t.n.kids.push(f.n);
          t.n.open = true;
        } else t.p.kids.splice(t.i + (zone === "after" ? 1 : 0), 0, f.n);
        sel = f.n;
      });
    }
    function applyJSON(text) {
      var d;
      try {
        d = JSON.parse(text);
      } catch (e) {
        status("Invalid JSON: " + e.message);
        return;
      }
      if (Array.isArray(d)) d = { name: "Imported", icon: "globe", kids: d };
      var r = build(d);
      if (!r) {
        status('JSON must describe a node with a "name" and optional "kids".');
        return;
      }
      commit("Applied JSON (" + total(r) + " nodes)", function () {
        root = r;
        sel = root;
      });
    }

    /* ---------- events ---------- */
    document.addEventListener("click", function (e) {
      var tg = e.target.closest && e.target.closest("[data-tg]");
      if (tg) {
        e.stopPropagation();
        toggle(+tg.dataset.tg);
        return;
      }
      var it = e.target.closest && e.target.closest(".te-row,.te-node");
      if (it && !e.target.closest(".te-rename")) {
        select(+it.dataset.id, it.classList.contains("te-row"));
        return;
      }
      var b = e.target.closest && e.target.closest("[data-act]");
      if (!b || b.disabled) return;
      ({
        child: addChild,
        sibling: addSibling,
        rename: function () {
          startRename(sel.id);
        },
        dup: dup,
        del: del,
        up: function () {
          move(-1);
        },
        down: function () {
          move(1);
        },
        indent: indent,
        outdent: outdent,
        undo: doUndo,
        redo: doRedo,
        expand: function () {
          setAll(true);
        },
        collapse: function () {
          setAll(false);
        },
        reset: function () {
          commit("Reset to sample tree", function () {
            root = build(DEF);
            sel = root;
          });
        },
        export: function () {
          var bl = new Blob([JSON.stringify(ser(root), null, 2)], { type: "application/json" }),
            a = document.createElement("a");
          a.href = URL.createObjectURL(bl);
          a.download = "medha-tree.json";
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(function () {
            URL.revokeObjectURL(a.href);
          }, 500);
          status("Exported medha-tree.json");
        },
        import: function () {
          $("te-file").click();
        },
        apply: function () {
          applyJSON($("te-json").value);
        },
        copy: function () {
          var t = $("te-json");
          t.select();
          try {
            document.execCommand("copy");
            status("JSON copied");
          } catch (x) {
            status("Copy failed — select the text and copy manually");
          }
        },
      })[b.dataset.act]();
    });
    document.addEventListener("dblclick", function (e) {
      var it = e.target.closest && e.target.closest(".te-row,.te-node");
      if (it && !e.target.closest("[data-tg]") && !e.target.closest(".te-rename")) {
        select(+it.dataset.id);
        startRename(+it.dataset.id);
      }
    });
    $("te-file").addEventListener("change", function () {
      var f = this.files[0];
      if (!f) return;
      if (f.size > 1e6) {
        status("File too large (max 1 MB).");
        return;
      }
      var r = new FileReader();
      r.onload = function () {
        applyJSON(String(r.result));
      };
      r.readAsText(f);
      this.value = "";
    });
    document.addEventListener("focusout", function (e) {
      if (e.target.id === "te-rn") endRename(true);
      if (e.target.closest && e.target.closest("#te-props")) pBefore = null;
    });
    document.addEventListener("keydown", function (e) {
      var t = e.target;
      if (t.id === "te-rn") {
        if (e.key === "Enter") {
          e.preventDefault();
          endRename(true);
        } else if (e.key === "Escape") {
          e.preventDefault();
          endRename(false);
        }
        return;
      }
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName);
      if ((e.ctrlKey || e.metaKey) && !typing) {
        var k = e.key.toLowerCase();
        if (k === "z" && !e.shiftKey) {
          e.preventDefault();
          doUndo();
          return;
        }
        if (k === "y" || (k === "z" && e.shiftKey)) {
          e.preventDefault();
          doRedo();
          return;
        }
      }
      var row = t.closest && t.closest(".te-row,.te-node");
      if (!row || typing) return;
      var id = +row.dataset.id,
        isRow = row.classList.contains("te-row");
      if (id !== sel.id) select(id);
      if (e.ctrlKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        dup();
        return;
      }
      if (e.altKey) {
        var m = {
          ArrowUp: function () {
            move(-1);
          },
          ArrowDown: function () {
            move(1);
          },
          ArrowRight: indent,
          ArrowLeft: outdent,
        }[e.key];
        if (m) {
          e.preventDefault();
          m();
          var r = document.querySelector(
            (isRow ? ".te-row" : ".te-node") + '[data-id="' + sel.id + '"]',
          );
          if (r) r.focus();
          return;
        }
      }
      if (e.key === "F2") {
        e.preventDefault();
        startRename(sel.id);
        return;
      }
      if (e.key === "Delete") {
        e.preventDefault();
        del();
        var rr = document.querySelector(
          (isRow ? ".te-row" : ".te-node") + '[data-id="' + sel.id + '"]',
        );
        if (rr) rr.focus();
        return;
      }
      if (e.key === "Insert") {
        e.preventDefault();
        addChild();
        return;
      }
      if (e.key === "Enter" && isRow) {
        e.preventDefault();
        addSibling();
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        if (!isRow) e.preventDefault();
        return;
      }
      if (!isRow) return;
      var rows = [].slice.call(document.querySelectorAll(".te-row")),
        i = rows.indexOf(row),
        n = sel,
        has = n.kids.length > 0;
      if (e.key === "ArrowDown" && rows[i + 1]) {
        e.preventDefault();
        select(+rows[i + 1].dataset.id, true);
      } else if (e.key === "ArrowUp" && rows[i - 1]) {
        e.preventDefault();
        select(+rows[i - 1].dataset.id, true);
      } else if (e.key === "Home") {
        e.preventDefault();
        select(+rows[0].dataset.id, true);
      } else if (e.key === "End") {
        e.preventDefault();
        select(+rows[rows.length - 1].dataset.id, true);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (has && n.open === false) {
          toggle(n.id, true);
          select(n.id, true);
        } else if (has) select(n.kids[0].id, true);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (has && n.open !== false) {
          toggle(n.id, false);
          select(n.id, true);
        } else if (n !== root) select(find(n.id).p.id, true);
      }
    });

    /* properties */
    var P = $("te-props");
    P.addEventListener("focusin", function (e) {
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) && !pBefore)
        pBefore = { s: snap(), p: pathOf(sel) };
    });
    P.addEventListener("input", function (e) {
      var id = e.target.id;
      if (id === "te-p-name") sel.name = e.target.value.slice(0, 80) || "Untitled";
      else if (id === "te-p-icon") sel.icon = e.target.value;
      else if (id === "te-p-st") sel.st = e.target.value;
      else if (id === "te-p-note") sel.note = e.target.value;
      else return;
      render();
      save();
    });
    P.addEventListener("change", function () {
      if (pBefore && pBefore.s !== snap()) {
        undo.push(pBefore);
        if (undo.length > 100) undo.shift();
        redo = [];
      }
      pBefore = null;
      bar();
      status("Updated “" + sel.name + "”");
    });

    /* drag and drop (outline + diagram) */
    function zoneFor(e, t) {
      var r = t.getBoundingClientRect(),
        h = t.classList.contains("te-node");
      var p = h ? (e.clientX - r.left) / r.width : (e.clientY - r.top) / r.height;
      var z = p < 0.25 ? "before" : p > 0.75 ? "after" : "in";
      return +t.dataset.id === root.id ? "in" : z;
    }
    function clearDrop() {
      [].forEach.call(
        document.querySelectorAll(".te-drop-in,.te-drop-before,.te-drop-after,.dragging"),
        function (x) {
          x.classList.remove("te-drop-in", "te-drop-before", "te-drop-after", "dragging");
        },
      );
    }
    document.addEventListener("dragstart", function (e) {
      var t = e.target.closest && e.target.closest('[draggable="true"][data-id]');
      if (!t) return;
      drag = +t.dataset.id;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(drag));
      t.classList.add("dragging");
    });
    document.addEventListener("dragover", function (e) {
      if (drag == null) return;
      var t = e.target.closest && e.target.closest(".te-row,.te-node");
      if (!t) return;
      var tid = +t.dataset.id,
        f = find(drag);
      if (!f || tid === drag || contains(f.n, find(tid).n)) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      var z = zoneFor(e, t);
      [].forEach.call(
        document.querySelectorAll(".te-drop-in,.te-drop-before,.te-drop-after"),
        function (x) {
          x.classList.remove("te-drop-in", "te-drop-before", "te-drop-after");
        },
      );
      t.classList.add("te-drop-" + z);
      // highlight the twin element in the other view too
      var other = document.querySelector(
        (t.classList.contains("te-row") ? ".te-node" : ".te-row") + '[data-id="' + tid + '"]',
      );
      if (other) other.classList.add("te-drop-" + z);
    });
    document.addEventListener("drop", function (e) {
      if (drag == null) return;
      var t = e.target.closest && e.target.closest(".te-row,.te-node");
      if (!t) return;
      var tid = +t.dataset.id,
        f = find(drag);
      if (!f || tid === drag || contains(f.n, find(tid).n)) return;
      e.preventDefault();
      var z = zoneFor(e, t),
        id = drag;
      drag = null;
      clearDrop();
      moveTo(id, tid, z);
    });
    document.addEventListener("dragend", function () {
      drag = null;
      clearDrop();
    });

    /* init */
    var saved = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch (e) {}
    try {
      root = build(saved ? JSON.parse(saved) : DEF);
    } catch (e) {
      root = null;
    }
    if (!root) root = build(DEF);
    sel = root;
    render();
    var sc = $("te-diagram").parentNode;
    sc.scrollLeft = Math.max(0, (sc.scrollWidth - sc.clientWidth) / 2);
  })();
}
