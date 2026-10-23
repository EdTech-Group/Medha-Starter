/* Medha colour schemes — colour-wheel based theme palettes (monochromatic, analogous, complementary,
   split complementary, triadic, tetradic). Re-colours every brand colour of the theme at runtime through
   CSS variables (--ms-<hex>); semantic colours (success, danger) and neutrals stay as they are. */
(function (W, D) {
  'use strict';
  var KEY = 'medha-scheme-v1';
  var WARM = ["0f0804", "0f172a", "160c06", "1d130b", "26150b", "2b1d12", "2c190e", "2d1b10", "3a2314", "404e58", "4a2e1b", "4a6a7e", "5b7f95", "644329", "674529", "6a4630", "6c5133", "7a3806", "7a5410", "7a6a58", "815c32", "8a6a45", "8a785f", "8a7a68", "934208", "97662c", "977048", "977950", "98703d", "9a713e", "9b8c79", "9c8670", "9d8e7a", "a37332", "a57744", "a8750f", "a88963", "a99a88", "aa8151", "aa8660", "ac772f", "ad801e", "af967d", "b45309", "b47715", "b47b34", "b5a08b", "b69c82", "b77919", "b77b39", "b79f86", "b8893d", "b8a58f", "b8a98f", "b9a88e", "bb813d", "bd803d", "bd944f", "c4b6a4", "c4bbb0", "c58b1c", "c69459", "c9c0b3", "c9c3b8", "cbb49b", "cdbba8", "cddbe3", "d6b68a", "d7d3cc", "d99b26", "d9cfbd", "dab564", "dbc29c", "dccdbd", "deccb7", "e0ddd8", "e4d4be", "e5d9c9", "e6e1d8", "e9bd73", "e9decd", "e9e4da", "e9f0f4", "eadbc5", "eadfd2", "ebe7e0", "ecd9b8", "ecdccb", "ece8e0", "ece8e1", "ece9e3", "edc995", "eee5d8", "eeeae3", "efe6d8", "efe6dd", "f0d3ad", "f0dba6", "f0ece4", "f0ede8", "f0eeea", "f1ece4", "f1ede6", "f2c47d", "f2efeb", "f2f1ef", "f3ca84", "f3e6d3", "f3f1ec", "f3f2ef", "f4e8d6", "f5f2ed", "f6efe3", "f6f2ea", "f7f0e5", "f8f5ee", "f8f5ef", "f8f7f4", "f9f4eb", "faf0de", "faf7f1", "faf8f3", "faf9f6", "fbeede", "fbf3dc", "fcfbf8", "fdf0dd", "fdf3dd", "fdf7ea", "ffd54a", "ffd98a", "fff3de", "fff5df", "fff7e0", "fffaf0", "fffdf8", "fffdf9", "fffefa"];      // brand hex values (no #) used in the theme CSS
  var WRGB = ["15,8,4", "180,83,9", "217,155,38", "38,21,11", "60,40,20"];      // brand r,g,b triples used in rgba()
  var ORIG = { P: 26, A: 27, G: 40, Q: 203 };   // hue of the original Medha brown / amber / gold / info-blue
  var SCHEMES = [
    { id: 'original', name: 'Original Medha', off: null, desc: 'The shipped brown, amber and gold palette.' },
    { id: 'mono', name: 'Monochromatic', off: [0, 0, 0, null], desc: 'Lighter and darker shades of one base colour — a consistent, subtle palette.' },
    { id: 'analogous', name: 'Analogous', off: [0, 30, -30, null], desc: 'Neighbouring hues on the wheel — a natural, harmonious scheme.' },
    { id: 'complementary', name: 'Complementary', off: [0, 180, 180, null], desc: 'Opposite ends of the wheel — striking contrast when paired.' },
    { id: 'split', name: 'Split complementary', off: [0, 150, 210, null], desc: 'Base colour plus the two hues beside its complement — vibrant yet balanced.' },
    { id: 'triadic', name: 'Triadic', off: [0, 120, 240, null], desc: 'Three hues equally spaced round the wheel — vibrant and eye-catching.' },
    { id: 'tetradic', name: 'Tetradic', off: [0, 90, 180, 270], desc: 'Four hues forming a square — vivid contrast, harder to balance.' }
  ];
  var BYID = {}; SCHEMES.forEach(function (s) { BYID[s.id] = s; });
  var PRESETS = [['Medha', 26], ['Crimson', 352], ['Rose', 330], ['Violet', 272], ['Indigo', 238], ['Ocean', 205], ['Teal', 172], ['Forest', 140], ['Olive', 78]];
  var DEF = { scheme: 'original', hue: 26, sat: 100 };

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function hsl(hex) {
    var r = parseInt(hex.substr(0, 2), 16) / 255, g = parseInt(hex.substr(2, 2), 16) / 255, b = parseInt(hex.substr(4, 2), 16) / 255;
    var mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, h = 0, s = 0, d = mx - mn;
    if (d) { s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? ((g - b) / d + (g < b ? 6 : 0)) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; }
    return [h, s, l];
  }
  function rgbOf(h, s, l) {
    h = ((h % 360) + 360) % 360; var c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2, r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; } else if (h < 180) { g = c; b = x; } else if (h < 240) { g = x; b = c; } else if (h < 300) { r = x; b = c; } else { r = c; b = x; }
    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
  }
  function hex2(n) { return (n < 16 ? '0' : '') + n.toString(16); }
  function toHex(h, s, l) { var c = rgbOf(h, s, l); return hex2(c[0]) + hex2(c[1]) + hex2(c[2]); }
  function lum(hex) { return [0, 2, 4].map(function (i) { var v = parseInt(hex.substr(i, 2), 16) / 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }).reduce(function (a, v, i) { return a + v * [.2126, .7152, .0722][i]; }, 0); }
  function contrast(hex) { return 1.05 / (lum(hex) + .05); }   // against white

  function role(h, s, l) {
    if (s < .10) return null;
    if (h >= 15 && h <= 52) { if (h <= 36) return s >= .70 ? 'A' : 'P'; return (s >= .5 && l < .78) ? 'G' : 'P'; }
    if (h >= 185 && h <= 240 && s >= .15) return 'Q';
    return null;
  }
  function mapHex(hex, st) {
    st = st || cur; hex = hex.toLowerCase().replace('#', '');
    if (st.scheme === 'original') return hex;
    var c = hsl(hex), r = role(c[0], c[1], c[2]); if (!r) return hex;
    var off = BYID[st.scheme].off, i = { P: 0, A: 1, G: 2, Q: 3 }[r]; if (off[i] == null) return hex;
    var nh = st.hue + off[i] + (c[0] - ORIG[r]), ns = clamp(c[1] * st.sat / 100, 0, 1), nl = c[2], out = toHex(nh, ns, nl);
    if ((r === 'P' || r === 'A') && nl < .5 && contrast(hex) >= 4.5) { while (contrast(out) < 4.5 && nl > .06) { nl -= .01; out = toHex(nh, ns, nl); } }
    return out;
  }
  // the four scheme roles for display / export
  function roles(st) {
    st = st || cur; var sc = BYID[st.scheme];
    if (st.scheme === 'original') return [['Primary', '4a2e1b', 26], ['Action', 'b45309', 27], ['Highlight', 'd99b26', 40], ['Surface', 'faf0de', 38]];
    var k = st.sat / 100, o = sc.off;
    var out = [['Primary', toHex(st.hue, .46 * k, .20), st.hue], ['Action', toHex(st.hue + o[1], clamp(.92 * k, 0, 1), .37), st.hue + o[1]], ['Highlight', toHex(st.hue + o[2], clamp(.72 * k, 0, 1), .50), st.hue + o[2]]];
    if (o[3] != null) out.push(['Accent', toHex(st.hue + o[3], clamp(.35 * k, 0, 1), .45), st.hue + o[3]]);
    else out.push(['Surface', toHex(st.hue, clamp(.70 * k, 0, 1), .93), st.hue]);
    return out;
  }
  function hueMarks(st) {
    var sc = BYID[st.scheme]; if (st.scheme === 'original') return [26, 27, 40];
    var m = [st.hue]; sc.off.forEach(function (o, i) { if (i && o != null) m.push(st.hue + o); }); return m;
  }

  /* ---------- state + apply ---------- */
  var cur = load();
  function load() { var s = DEF; try { var j = JSON.parse(localStorage.getItem(KEY) || 'null'); if (j && BYID[j.scheme]) s = { scheme: j.scheme, hue: clamp(+j.hue || 0, 0, 360), sat: clamp(+j.sat || 100, 30, 120) }; } catch (e) { } return { scheme: s.scheme, hue: s.hue, sat: s.sat }; }
  function css(st) {
    if (st.scheme === 'original') return '';
    var t = ':root{';
    WARM.forEach(function (h) { t += '--ms-' + h + ':#' + mapHex(h, st) + ';'; });
    WRGB.forEach(function (rgb) { var p = rgb.split(','), h = hex2(+p[0]) + hex2(+p[1]) + hex2(+p[2]), n = mapHex(h, st); t += '--ms-rgb-' + p.join('-') + ':' + parseInt(n.substr(0, 2), 16) + ',' + parseInt(n.substr(2, 2), 16) + ',' + parseInt(n.substr(4, 2), 16) + ';'; });
    return t + '}';
  }
  function apply(st, save) {
    cur = { scheme: st.scheme, hue: ((Math.round(st.hue) % 360) + 360) % 360, sat: st.sat }; 
    var el = D.getElementById('ms-vars');
    if (!el) { el = D.createElement('style'); el.id = 'ms-vars'; (D.head || D.documentElement).appendChild(el); }
    el.textContent = css(cur);
    var m = D.querySelector('meta[name=theme-color]'); if (m) m.setAttribute('content', '#' + mapHex('2c190e', cur));
    D.documentElement.setAttribute('data-scheme', cur.scheme);
    if (save !== false) { try { localStorage.setItem(KEY, JSON.stringify(cur)); } catch (e) { } }
    listeners.forEach(function (f) { f(cur); });
  }
  var listeners = [];
  apply(cur, false);

  /* ---------- UI ---------- */
  function el(t, c, x) { var e = D.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
  function wheelSvg(st, size) {
    var NS = 'http://www.w3.org/2000/svg', s = D.createElementNS(NS, 'svg'), R = 50, r0 = 33, r1 = 48;
    s.setAttribute('viewBox', '0 0 100 100'); s.setAttribute('width', size); s.setAttribute('height', size); s.setAttribute('aria-hidden', 'true');
    function pt(a, r) { var t = (a - 90) * Math.PI / 180; return [50 + r * Math.cos(t), 50 + r * Math.sin(t)]; }
    for (var i = 0; i < 36; i++) {
      var a0 = i * 10, a1 = a0 + 10.4, p = D.createElementNS(NS, 'path'), A = pt(a0, r1), B = pt(a1, r1), C = pt(a1, r0), E = pt(a0, r0);
      p.setAttribute('d', 'M' + A + 'A' + r1 + ' ' + r1 + ' 0 0 1 ' + B + 'L' + C + 'A' + r0 + ' ' + r0 + ' 0 0 0 ' + E + 'Z'); p.setAttribute('fill', 'hsl(' + (a0 + 5) + ',68%,56%)'); s.appendChild(p);
    }
    var marks = hueMarks(st), mid = (r0 + r1) / 2, pts = marks.map(function (h) { return pt(h, r0 - 4); });
    if (marks.length > 1) {
      var poly = D.createElementNS(NS, marks.length === 2 ? 'line' : 'polygon');
      if (marks.length === 2) { poly.setAttribute('x1', pts[0][0]); poly.setAttribute('y1', pts[0][1]); poly.setAttribute('x2', pts[1][0]); poly.setAttribute('y2', pts[1][1]); }
      else poly.setAttribute('points', pts.map(function (q) { return q.join(','); }).join(' '));
      poly.setAttribute('fill', 'rgba(255,255,255,.55)'); poly.setAttribute('stroke', '#333'); poly.setAttribute('stroke-width', '1.2'); poly.setAttribute('stroke-linejoin', 'round'); s.appendChild(poly);
    }
    marks.forEach(function (h, i) { var q = pt(h, mid), c = D.createElementNS(NS, 'circle'); c.setAttribute('cx', q[0]); c.setAttribute('cy', q[1]); c.setAttribute('r', i === 0 ? 6.5 : 5); c.setAttribute('fill', 'hsl(' + h + ',68%,56%)'); c.setAttribute('stroke', '#fff'); c.setAttribute('stroke-width', '2'); s.appendChild(c); var c2 = D.createElementNS(NS, 'circle'); c2.setAttribute('cx', q[0]); c2.setAttribute('cy', q[1]); c2.setAttribute('r', i === 0 ? 6.5 : 5); c2.setAttribute('fill', 'none'); c2.setAttribute('stroke', '#222'); c2.setAttribute('stroke-width', '.8'); s.appendChild(c2); });
    return s;
  }
  function strip(st) { var d = el('div', 'ms-strip'); roles(st).forEach(function (r) { var b = el('span'); b.style.background = '#' + r[1]; b.title = r[0] + ' #' + r[1]; d.appendChild(b); }); return d; }

  function designer(root, opt) {
    opt = opt || {}; root.textContent = ''; root.classList.add('ms-designer'); if (opt.compact) root.classList.add('ms-compact');
    var cards = el('div', 'ms-cards'); cards.setAttribute('role', 'radiogroup'); cards.setAttribute('aria-label', 'Colour scheme type');
    var ctl = el('div', 'ms-ctl'), info = el('div', 'ms-info'), out = el('div', 'ms-out');
    var hueRow = el('div', 'ms-row'); hueRow.appendChild(el('label', 'ms-lbl', 'Base colour'));
    var colorIn = el('input', 'ms-color'); colorIn.type = 'color'; colorIn.setAttribute('aria-label', 'Base colour');
    var hue = el('input', 'ms-hue'); hue.type = 'range'; hue.min = 0; hue.max = 359; hue.setAttribute('aria-label', 'Base hue');
    hueRow.appendChild(colorIn); hueRow.appendChild(hue);
    var pre = el('div', 'ms-presets'); PRESETS.forEach(function (p) { var b = el('button', 'ms-pre'); b.type = 'button'; b.title = p[0]; b.setAttribute('aria-label', p[0]); b.style.background = 'hsl(' + p[1] + ',62%,42%)'; b.addEventListener('click', function () { apply({ scheme: cur.scheme === 'original' ? 'complementary' : cur.scheme, hue: p[1], sat: cur.sat }); }); pre.appendChild(b); });
    var satRow = el('div', 'ms-row'); satRow.appendChild(el('label', 'ms-lbl', 'Saturation'));
    var sat = el('input', 'ms-sat'); sat.type = 'range'; sat.min = 40; sat.max = 120; sat.setAttribute('aria-label', 'Saturation'); satRow.appendChild(sat);
    var satV = el('span', 'ms-val'); satRow.appendChild(satV);
    ctl.appendChild(hueRow); ctl.appendChild(pre); ctl.appendChild(satRow);
    var btns = el('div', 'ms-btns');
    var rs = el('button', 'btn btn-outline-secondary btn-sm', 'Reset to original'); rs.type = 'button'; rs.addEventListener('click', function () { apply(DEF); });
    var cp = el('button', 'btn btn-outline-secondary btn-sm', 'Copy CSS variables'); cp.type = 'button';
    cp.addEventListener('click', function () { var t = cssText(); if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { cp.textContent = 'Copied'; setTimeout(function () { cp.textContent = 'Copy CSS variables'; }, 1400); }); });
    btns.appendChild(rs); btns.appendChild(cp);
    var wheelBox = el('div', 'ms-wheelbox'), chips = el('div', 'ms-chips'); info.appendChild(wheelBox); info.appendChild(chips);
    var desc = el('p', 'ms-desc');
    root.appendChild(cards); root.appendChild(ctl); root.appendChild(info); root.appendChild(desc); root.appendChild(btns);
    var exp = null;
    if (opt.exportBox) { exp = el('textarea', 'form-control ms-exp'); exp.readOnly = true; exp.rows = 7; exp.setAttribute('aria-label', 'CSS variables'); root.appendChild(exp); }

    SCHEMES.forEach(function (sc) {
      var b = el('button', 'ms-card'); b.type = 'button'; b.setAttribute('role', 'radio'); b.dataset.id = sc.id;
      b.appendChild(el('span', 'ms-card-n', sc.name)); b.appendChild(el('span', 'ms-card-s')); 
      b.addEventListener('click', function () { apply({ scheme: sc.id, hue: cur.hue, sat: cur.sat }); }); cards.appendChild(b);
    });
    hue.addEventListener('input', function () { apply({ scheme: cur.scheme === 'original' ? 'complementary' : cur.scheme, hue: +hue.value, sat: cur.sat }); });
    colorIn.addEventListener('input', function () { var c = hsl(colorIn.value.slice(1)); apply({ scheme: cur.scheme === 'original' ? 'complementary' : cur.scheme, hue: c[0], sat: cur.sat }); });
    sat.addEventListener('input', function () { apply({ scheme: cur.scheme, hue: cur.hue, sat: +sat.value }); });

    function cssText() {
      var t = ':root{\n'; [['--medha-brown', '4a2e1b'], ['--medha-amber', 'b45309'], ['--medha-gold', 'd99b26'], ['--medha-ivory', 'fffdf8'], ['--medha-deep', '0f0804']].forEach(function (p) { t += '  ' + p[0] + ': #' + mapHex(p[1], cur) + ';\n'; });
      return t + '}\n/* scheme: ' + BYID[cur.scheme].name + ', base hue ' + Math.round(cur.hue) + '°, saturation ' + cur.sat + '% */';
    }
    function refresh() {
      Array.prototype.forEach.call(cards.children, function (b) {
        var id = b.dataset.id, on = id === cur.scheme; b.setAttribute('aria-checked', on ? 'true' : 'false'); b.classList.toggle('on', on); b.tabIndex = on ? 0 : -1;
        var st = { scheme: id, hue: cur.hue, sat: cur.sat }, s = b.querySelector('.ms-card-s'); s.textContent = ''; s.appendChild(strip(st));
      });
      hue.value = Math.round(cur.hue) % 360; sat.value = cur.sat; satV.textContent = cur.sat + '%';
      var h0 = rgbOf(cur.hue, .6, .45); colorIn.value = '#' + hex2(h0[0]) + hex2(h0[1]) + hex2(h0[2]);
      hue.style.opacity = cur.scheme === 'original' ? .55 : 1;
      wheelBox.textContent = ''; wheelBox.appendChild(wheelSvg(cur, opt.compact ? 104 : 140));
      chips.textContent = ''; roles(cur).forEach(function (r) { var c = el('div', 'ms-chip'); var sw = el('span', 'ms-sw'); sw.style.background = '#' + r[1]; c.appendChild(sw); var tx = el('span'); tx.appendChild(el('b', '', r[0])); tx.appendChild(el('code', '', '#' + r[1])); c.appendChild(tx); chips.appendChild(c); });
      desc.textContent = BYID[cur.scheme].desc + (cur.scheme === 'original' ? '' : ' Success, warning and error colours stay fixed so status meaning is preserved.');
      if (exp) exp.value = cssText();
    }
    cards.addEventListener('keydown', function (e) {
      var k = e.key, i = SCHEMES.map(function (s) { return s.id; }).indexOf(cur.scheme), n = SCHEMES.length;
      if (k === 'ArrowRight' || k === 'ArrowDown') i = (i + 1) % n; else if (k === 'ArrowLeft' || k === 'ArrowUp') i = (i + n - 1) % n; else return;
      e.preventDefault(); apply({ scheme: SCHEMES[i].id, hue: cur.hue, sat: cur.sat }); var b = cards.children[i]; if (b) b.focus();
    });
    listeners.push(refresh); refresh();
  }

  function popover() {
    var host = D.querySelector('.top-actions'), wrap = el('div', 'ms-wrap');
    var b = el('button', 'btn icon-btn ms-btn'); b.type = 'button'; b.setAttribute('aria-label', 'Colour scheme'); b.setAttribute('aria-expanded', 'false'); b.title = 'Colour scheme';
    b.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.8 2-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8z"/><circle cx="7.5" cy="11.5" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="14.5" cy="7.5" r="1"/></svg>';
    var pop = el('div', 'ms-pop'); pop.hidden = true; pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', 'Colour scheme');
    var h = el('div', 'ms-pop-h'); h.appendChild(el('b', '', 'Colour scheme')); var more = el('a', 'ms-more', 'Colour designer →'); more.href = 'colors.html'; h.appendChild(more); pop.appendChild(h);
    var body = el('div'); pop.appendChild(body); designer(body, { compact: true });
    wrap.appendChild(b); wrap.appendChild(pop);
    if (host) { var ref = host.querySelector('.demo-tag'); host.insertBefore(wrap, ref ? ref.nextSibling : host.firstChild); } else { wrap.classList.add('ms-float'); D.body.appendChild(wrap); }
    function close() { pop.hidden = true; b.setAttribute('aria-expanded', 'false'); }
    b.addEventListener('click', function (e) { e.stopPropagation(); pop.hidden = !pop.hidden; b.setAttribute('aria-expanded', pop.hidden ? 'false' : 'true'); });
    D.addEventListener('click', function (e) { if (!wrap.contains(e.target)) close(); });
    D.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) { close(); b.focus(); } });
  }
  function init() { popover(); Array.prototype.forEach.call(D.querySelectorAll('[data-ms-designer]'), function (n) { designer(n, { exportBox: true }); }); }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init); else init();
  W.MedhaScheme = { apply: apply, state: function () { return cur; }, mapHex: mapHex, roles: roles, schemes: SCHEMES, reset: function () { apply(DEF); }, designer: designer };
})(window, document);
