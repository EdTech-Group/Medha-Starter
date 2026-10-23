// @ts-nocheck -- the theme's own script, kept byte for byte so its behaviour does not drift.
// Ported from the Medha theme by medha-starter. Source: assets/pages.js, unchanged inside this function.
// The theme runs it once per page load; here it runs each time its page mounts (see
// src/components/medha/page-scripts.ts, which also removes its global listeners afterwards).
export default function pagesScript(): void {
  (function () {
    document.querySelectorAll(".needs-validation").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!f.checkValidity()) {
          e.stopPropagation();
          f.classList.add("was-validated");
          return;
        }
        f.classList.add("was-validated");
        var r = f.getAttribute("data-redirect");
        if (r) window.location.href = r;
      });
    });
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (e) {
      new bootstrap.Tooltip(e);
    });
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(function (e) {
      new bootstrap.Popover(e);
    });
    document.querySelectorAll(".star").forEach(function (b) {
      b.addEventListener("click", function () {
        b.classList.toggle("on");
      });
    });
    var mc = document.getElementById("mini-cal");
    if (mc) {
      var n = new Date(),
        y = n.getFullYear(),
        m = n.getMonth(),
        h = "SMTWTFS"
          .split("")
          .map(function (d) {
            return '<div class="dow">' + d + "</div>";
          })
          .join(""),
        f = new Date(y, m, 1).getDay(),
        dm = new Date(y, m + 1, 0).getDate();
      for (var i = 0; i < f; i++) h += "<div></div>";
      for (var d = 1; d <= dm; d++)
        h += '<div class="d' + (d == n.getDate() ? " today" : "") + '">' + d + "</div>";
      mc.innerHTML = h;
    }
    var cal = document.getElementById("calendar");
    if (!cal) return;
    var cur = new Date();
    cur = new Date(cur.getFullYear(), cur.getMonth(), 1);
    var events = {
      3: ["Firmware update", "a"],
      9: ["Site inspection · Surat", "g"],
      14: ["Calibration", "a"],
      21: ["Gateway GW-04 service", "g"],
      27: ["Monthly report", "a"],
    };
    function render() {
      var y = cur.getFullYear(),
        m = cur.getMonth();
      document.getElementById("cal-title").textContent = cur.toLocaleString("en", {
        month: "long",
        year: "numeric",
      });
      var h = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
        .map(function (d) {
          return '<div class="dow">' + d + "</div>";
        })
        .join("");
      var first = new Date(y, m, 1).getDay(),
        days = new Date(y, m + 1, 0).getDate(),
        prev = new Date(y, m, 0).getDate(),
        t = new Date();
      for (var i = first - 1; i >= 0; i--) h += '<div class="day muted">' + (prev - i) + "</div>";
      for (var d = 1; d <= days; d++) {
        var td = t.getFullYear() == y && t.getMonth() == m && t.getDate() == d;
        var ev = events[d]
          ? '<span class="ev ' + (events[d][1] == "g" ? "g" : "") + '">' + events[d][0] + "</span>"
          : "";
        h +=
          '<div class="day' +
          (td ? " today" : "") +
          '"><span class="n">' +
          d +
          "</span>" +
          ev +
          "</div>";
      }
      var rem = (7 - ((first + days) % 7)) % 7;
      for (var k = 1; k <= rem; k++) h += '<div class="day muted">' + k + "</div>";
      cal.innerHTML = h;
    }
    document.getElementById("cal-prev").onclick = function () {
      cur = new Date(cur.getFullYear(), cur.getMonth() - 1, 1);
      render();
    };
    document.getElementById("cal-next").onclick = function () {
      cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
      render();
    };
    document.getElementById("cal-today").onclick = function () {
      var n = new Date();
      cur = new Date(n.getFullYear(), n.getMonth(), 1);
      render();
    };
    render();
  })();
  (function () {
    document.querySelectorAll("[data-toast-target]").forEach(function (b) {
      b.addEventListener("click", function () {
        var t = document.querySelector(b.getAttribute("data-toast-target"));
        if (t) bootstrap.Toast.getOrCreateInstance(t).show();
      });
    });
    var lb = document.getElementById("load-btn");
    if (lb)
      lb.addEventListener("click", function () {
        var o = lb.innerHTML;
        lb.disabled = true;
        lb.innerHTML =
          '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading…';
        setTimeout(function () {
          lb.disabled = false;
          lb.innerHTML = o;
        }, 1800);
      });
  })();
}
