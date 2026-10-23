/* Medha Vedic Editor — phonetic Vedic Sanskrit WYSIWYG editor (Devanagari + Vedic Extensions).
   Engine: window.Vedic.translit(roman) / toIAST(devanagari). UI: Vedic.mount(element). No dependencies. */
(function (W) {
  'use strict';
  var VIR = '्', NUKTA = '़';
  var NAMES = {"0900":"Sign Inverted Candrabindu","0901":"Sign Candrabindu","0902":"Sign Anusvara","0903":"Sign Visarga","0904":"Letter Short A","0905":"Letter A","0906":"Letter Aa","0907":"Letter I","0908":"Letter Ii","0909":"Letter U","090A":"Letter Uu","090B":"Letter Vocalic R","090C":"Letter Vocalic L","090D":"Letter Candra E","090E":"Letter Short E","090F":"Letter E","0910":"Letter Ai","0911":"Letter Candra O","0912":"Letter Short O","0913":"Letter O","0914":"Letter Au","0915":"Letter Ka","0916":"Letter Kha","0917":"Letter Ga","0918":"Letter Gha","0919":"Letter Nga","091A":"Letter Ca","091B":"Letter Cha","091C":"Letter Ja","091D":"Letter Jha","091E":"Letter Nya","091F":"Letter Tta","0920":"Letter Ttha","0921":"Letter Dda","0922":"Letter Ddha","0923":"Letter Nna","0924":"Letter Ta","0925":"Letter Tha","0926":"Letter Da","0927":"Letter Dha","0928":"Letter Na","0929":"Letter Nnna","092A":"Letter Pa","092B":"Letter Pha","092C":"Letter Ba","092D":"Letter Bha","092E":"Letter Ma","092F":"Letter Ya","0930":"Letter Ra","0931":"Letter Rra","0932":"Letter La","0933":"Letter Lla","0934":"Letter Llla","0935":"Letter Va","0936":"Letter Sha","0937":"Letter Ssa","0938":"Letter Sa","0939":"Letter Ha","093A":"Vowel Sign Oe","093B":"Vowel Sign Ooe","093C":"Sign Nukta","093D":"Sign Avagraha","093E":"Vowel Sign Aa","093F":"Vowel Sign I","0940":"Vowel Sign Ii","0941":"Vowel Sign U","0942":"Vowel Sign Uu","0943":"Vowel Sign Vocalic R","0944":"Vowel Sign Vocalic Rr","0945":"Vowel Sign Candra E","0946":"Vowel Sign Short E","0947":"Vowel Sign E","0948":"Vowel Sign Ai","0949":"Vowel Sign Candra O","094A":"Vowel Sign Short O","094B":"Vowel Sign O","094C":"Vowel Sign Au","094D":"Sign Virama","094E":"Vowel Sign Prishthamatra E","094F":"Vowel Sign Aw","0950":"Om","0951":"Stress Sign Udatta","0952":"Stress Sign Anudatta","0953":"Grave Accent","0954":"Acute Accent","0955":"Vowel Sign Candra Long E","0956":"Vowel Sign Ue","0957":"Vowel Sign Uue","0958":"Letter Qa","0959":"Letter Khha","095A":"Letter Ghha","095B":"Letter Za","095C":"Letter Dddha","095D":"Letter Rha","095E":"Letter Fa","095F":"Letter Yya","0960":"Letter Vocalic Rr","0961":"Letter Vocalic Ll","0962":"Vowel Sign Vocalic L","0963":"Vowel Sign Vocalic Ll","0964":"Danda","0965":"Double Danda","0966":"Digit Zero","0967":"Digit One","0968":"Digit Two","0969":"Digit Three","096A":"Digit Four","096B":"Digit Five","096C":"Digit Six","096D":"Digit Seven","096E":"Digit Eight","096F":"Digit Nine","0970":"Abbreviation Sign","0971":"Sign High Spacing Dot","0972":"Letter Candra A","0973":"Letter Oe","0974":"Letter Ooe","0975":"Letter Aw","0976":"Letter Ue","0977":"Letter Uue","0978":"Letter Marwari Dda","0979":"Letter Zha","097A":"Letter Heavy Ya","097B":"Letter Gga","097C":"Letter Jja","097D":"Letter Glottal Stop","097E":"Letter Ddda","097F":"Letter Bba","1CD0":"Tone Karshana","1CD1":"Tone Shara","1CD2":"Tone Prenkha","1CD3":"Sign Nihshvasa","1CD4":"Sign Yajurmidline Svarita","1CD5":"Tone Yajuraggravated Independent Svarita","1CD6":"Tone Yajurindependent Svarita","1CD7":"Tone Yajurkathaka Independent Svarita","1CD8":"Tone Candra Below","1CD9":"Tone Yajurkathaka Independent Svarita Schroeder","1CDA":"Tone Double Svarita","1CDB":"Tone Triple Svarita","1CDC":"Tone Kathaka Anudatta","1CDD":"Tone Dot Below","1CDE":"Tone Two Dots Below","1CDF":"Tone Three Dots Below","1CE0":"Tone Rigkashmiri Independent Svarita","1CE1":"Tone Atharvaindependent Svarita","1CE2":"Sign Visarga Svarita","1CE3":"Sign Visarga Udatta","1CE4":"Sign Reversed Visarga Udatta","1CE5":"Sign Visarga Anudatta","1CE6":"Sign Reversed Visarga Anudatta","1CE7":"Sign Visarga Udatta With Tail","1CE8":"Sign Visarga Anudatta With Tail","1CE9":"Sign Anusvara Antargomukha","1CEA":"Sign Anusvara Bahirgomukha","1CEB":"Sign Anusvara Vamagomukha","1CEC":"Sign Anusvara Vamagomukha With Tail","1CED":"Sign Tiryak","1CEE":"Sign Hexiform Long Anusvara","1CEF":"Sign Long Anusvara","1CF0":"Sign Rthang Long Anusvara","1CF1":"Sign Anusvara Ubhayato Mukha","1CF2":"Sign Ardhavisarga","1CF3":"Sign Rotated Ardhavisarga","1CF4":"Tone Candra Above","1CF5":"Sign Jihvamuliya","1CF6":"Sign Upadhmaniya","1CF7":"Sign Atikrama","1CF8":"Tone Ring Above","1CF9":"Tone Double Ring Above","1CFA":"Sign Double Anusvara Antargomukha","A8E0":"Combining Digit Zero","A8E1":"Combining Digit One","A8E2":"Combining Digit Two","A8E3":"Combining Digit Three","A8E4":"Combining Digit Four","A8E5":"Combining Digit Five","A8E6":"Combining Digit Six","A8E7":"Combining Digit Seven","A8E8":"Combining Digit Eight","A8E9":"Combining Digit Nine","A8EA":"Combining Letter A","A8EB":"Combining Letter U","A8EC":"Combining Letter Ka","A8ED":"Combining Letter Na","A8EE":"Combining Letter Pa","A8EF":"Combining Letter Ra","A8F0":"Combining Letter Vi","A8F1":"Combining Sign Avagraha","A8F2":"Sign Spacing Candrabindu","A8F3":"Sign Candrabindu Virama","A8F4":"Sign Double Candrabindu Virama","A8F5":"Sign Candrabindu Two","A8F6":"Sign Candrabindu Three","A8F7":"Sign Candrabindu Avagraha","A8F8":"Sign Pushpika","A8F9":"Gap Filler","A8FA":"Caret","A8FB":"Headstroke","A8FC":"Sign Siddham","A8FD":"Jain Om","A8FE":"Letter Ay","A8FF":"Vowel Sign Ay","200C":"Zero Width Non-Joiner","200D":"Zero Width Joiner","25CC":"Dotted Circle"};

  /* ---------- phonetic scheme (ITRANS-based, IAST accepted, Vedic extensions) ---------- */
  var T = {}, CODE = {};
  function def(keys, tok, label) {
    keys.forEach(function (k) { T[k] = tok; });
    var best = keys.filter(function (k) { return /^[\x20-\x7e]+$/.test(k); }).sort(function (a, b) { return a.length - b.length; })[0] || keys[0];
    if (label !== false) CODE[tok.id || tok.i || tok.c || tok.m] = CODE[tok.id || tok.i || tok.c || tok.m] || best;
  }
  [
    [['a'], 'अ', ''], [['aa', 'A', 'ā'], 'आ', 'ा'], [['i'], 'इ', 'ि'], [['ii', 'I', 'ī'], 'ई', 'ी'],
    [['u'], 'उ', 'ु'], [['uu', 'U', 'ū'], 'ऊ', 'ू'],
    [['RRi', 'R^i', 'Ri', 'R', 'ṛ'], 'ऋ', 'ृ'], [['RRI', 'R^I', 'RI', 'ṝ'], 'ॠ', 'ॄ'],
    [['LLi', 'L^i', 'ḷ'], 'ऌ', 'ॢ'], [['LLI', 'L^I', 'ḹ'], 'ॡ', 'ॣ'],
    [['e', 'ē'], 'ए', 'े'], [['ai'], 'ऐ', 'ै'], [['o', 'ō'], 'ओ', 'ो'], [['au'], 'औ', 'ौ']
  ].forEach(function (r) { def(r[0], { t: 'v', i: r[1], m: r[2], id: r[1] }); });
  [
    [['k'], 'क'], [['kh', 'K'], 'ख'], [['g'], 'ग'], [['gh', 'G'], 'घ'], [['N^', 'ṅ'], 'ङ'],
    [['c'], 'च'], [['ch', 'C'], 'छ'], [['j'], 'ज'], [['jh', 'J'], 'झ'], [['~n', '~N', 'ñ'], 'ञ'],
    [['T', 'ṭ'], 'ट'], [['Th', 'ṭh'], 'ठ'], [['D', 'ḍ'], 'ड'], [['Dh', 'ḍh'], 'ढ'], [['N', 'ṇ'], 'ण'],
    [['t'], 'त'], [['th'], 'थ'], [['d'], 'द'], [['dh'], 'ध'], [['n'], 'न'],
    [['p'], 'प'], [['ph', 'P'], 'फ'], [['b'], 'ब'], [['bh', 'B'], 'भ'], [['m'], 'म'],
    [['y'], 'य'], [['r'], 'र'], [['l'], 'ल'], [['v', 'w'], 'व'],
    [['sh', 'ś'], 'श'], [['Sh', 'S', 'ṣ'], 'ष'], [['s'], 'स'], [['h'], 'ह'], [['L'], 'ळ']
  ].forEach(function (r) { def(r[0], { t: 'c', c: r[1], id: r[1] }); });
  def(['chh'], { t: 'c', c: 'छ' }, false);
  def(['.D'], { t: 'c', c: 'ड' + NUKTA }, false); def(['.Dh'], { t: 'c', c: 'ढ' + NUKTA }, false);
  def(['x'], { t: 'c', c: 'क' + VIR + 'ष', id: 'क्ष' }); def(['GY'], { t: 'c', c: 'ज' + VIR + 'ञ', id: 'ज्ञ' });
  [
    [['M', 'ṃ', 'ṁ'], 'ं'], [['H', 'ḥ'], 'ः'], [['.N', '.n'], 'ँ'], [['.a'], 'ऽ'],
    [["'"], '॑'], [['_'], '॒'], [['"'], '᳚'], [['OM', 'AUM'], 'ॐ'], [['|'], '।'], [['||'], '॥']
  ].forEach(function (r) { def(r[0], { t: 'm', m: r[1], id: r[1] }); });
  def(['^', '.h'], { t: 'h' }, false);
  def(['\\'], { t: 'b' }, false);
  var MAXK = 4;
  var DIG = '०१२३४५६७८९';

  function translit(src, opt) {
    opt = opt || {};
    var s = String(src).normalize('NFC'), out = '', pend = false, i = 0, n = s.length;
    while (i < n) {
      var tk = null, L = Math.min(MAXK, n - i), len = 0;
      for (; L > 0; L--) { var k = s.substr(i, L); if (T.hasOwnProperty(k)) { tk = T[k]; len = L; break; } }
      if (!tk) {
        var ch = s.charAt(i), d = '0123456789'.indexOf(ch);
        out += (opt.digits && d >= 0) ? DIG.charAt(d) : ch; pend = false; i++; continue;
      }
      i += len;
      if (tk.t === 'c') { if (pend) out += VIR; out += tk.c; pend = true; }
      else if (tk.t === 'v') { if (pend) out += tk.m; else out += tk.i; pend = false; }
      else if (tk.t === 'm') { out += tk.m; pend = false; }
      else if (tk.t === 'h') { if (pend) { out += VIR; pend = false; } else out += s.substr(i - len, len); }
      else if (tk.t === 'b') { pend = false; }
    }
    return out;
  }

  /* Devanagari -> IAST (Vedic accents: svarita acute, anudatta macron-below, double svarita double-acute) */
  var R = { 'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū', 'ऋ': 'ṛ', 'ॠ': 'ṝ', 'ऌ': 'ḷ', 'ॡ': 'ḹ', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
    'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū', 'ृ': 'ṛ', 'ॄ': 'ṝ', 'ॢ': 'ḷ', 'ॣ': 'ḹ', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
    'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ṅ', 'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ñ', 'ट': 'ṭ', 'ठ': 'ṭh', 'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ',
    'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n', 'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'ś', 'ष': 'ṣ', 'स': 's', 'ह': 'h', 'ळ': 'ḷ',
    'ं': 'ṃ', 'ः': 'ḥ', 'ँ': 'm̐', 'ऽ': '’', 'ॐ': 'oṃ', '।': '|', '॥': '||', '॑': '́', '॒': '̱', '᳚': '̋', 'ꣳ': 'ṃ' };
  var CONS = 'कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहळ', MATRA = 'ािीुूृॄॢॣेैोौ';
  function toIAST(src) {
    var s = String(src).normalize('NFC'), o = '', i = 0, c;
    for (; i < s.length; i++) {
      c = s.charAt(i);
      if (CONS.indexOf(c) >= 0) {
        o += R[c]; var nx = s.charAt(i + 1);
        if (nx === NUKTA) { i++; nx = s.charAt(i + 1); }
        if (nx === VIR) { i++; } else if (MATRA.indexOf(nx) >= 0) { o += R[nx]; i++; } else o += 'a';
      } else if (R.hasOwnProperty(c)) o += R[c];
      else { var d = DIG.indexOf(c); o += d >= 0 ? d : c; }
    }
    return o.normalize('NFC');
  }

  /* ---------- sanitiser for stored / imported HTML ---------- */
  var OK = { P: 1, DIV: 1, BR: 1, SPAN: 1, B: 1, I: 1, U: 1, STRONG: 1, EM: 1, UL: 1, OL: 1, LI: 1, H1: 1, H2: 1, H3: 1, BLOCKQUOTE: 1, SUB: 1, SUP: 1, FONT: 1, HR: 1 };
  function sanitize(html) {
    var t = document.createElement('template'); t.innerHTML = html;
    (function walk(n) {
      Array.prototype.slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 3) return;
        if (c.nodeType !== 1 || !OK[c.tagName]) { if (c.nodeType === 1 && /^(SCRIPT|STYLE|IFRAME|OBJECT|EMBED|LINK|META)$/.test(c.tagName)) n.removeChild(c); else if (c.nodeType === 1) { walk(c); while (c.firstChild) n.insertBefore(c.firstChild, c); n.removeChild(c); } else n.removeChild(c); return; }
        Array.prototype.slice.call(c.attributes).forEach(function (a) {
          var nm = a.name.toLowerCase();
          if (nm === 'style') { var v = a.value.replace(/(expression|url|@import|javascript)[^;]*/gi, ''); c.setAttribute('style', v); }
          else if (nm !== 'class' && nm !== 'face' && nm !== 'size' && nm !== 'lang' && nm !== 'dir') c.removeAttribute(a.name);
        });
        walk(c);
      });
    })(t.content);
    var d = document.createElement('div'); d.appendChild(t.content); return d.innerHTML;
  }

  /* ---------- mark / letter data for keyboard ---------- */
  var G_MARKS = [
    ['Svara — accent marks', '0951 0952 0953 0954 1CD0 1CD1 1CD2 1CD4 1CD5 1CD6 1CD7 1CD8 1CD9 1CDA 1CDB 1CDC 1CDD 1CDE 1CDF 1CE0 1CE1 1CED 1CF4 1CF8 1CF9'],
    ['Visarga, anusvara & other signs', '0900 0901 0902 0903 093C 093D 0950 1CD3 1CE2 1CE3 1CE4 1CE5 1CE6 1CE7 1CE8 1CE9 1CEA 1CEB 1CEC 1CEE 1CEF 1CF0 1CF1 1CF2 1CF3 1CF5 1CF6 1CFA A8F2 A8F3 A8F4 A8F5 A8F6 A8F7'],
    ['Punctuation & digits', '0964 0965 0970 0971 A8F8 A8FA A8FC 0966 0967 0968 0969 096A 096B 096C 096D 096E 096F'],
    ['Combining letters & digits (Samaveda / Yajurveda)', 'A8E0 A8E1 A8E2 A8E3 A8E4 A8E5 A8E6 A8E7 A8E8 A8E9 A8EA A8EB A8EC A8ED A8EE A8EF A8F0 A8F1'],
    ['Extended letters', 'A8FB A8FD A8FE A8FF 200C 200D']
  ];
  function isMark(cp) { return /[̀-ͯऀ-ं़॑-॔᳐-᳔᳒-᳡᳢-᳨᳭᳴᳸᳹꣠-꣱ꣿ्]/.test(cp); }
  function nm(cp) { var h = cp.codePointAt(0).toString(16).toUpperCase(); while (h.length < 4) h = '0' + h; return 'U+' + h + (NAMES[h] ? ' ' + NAMES[h] : ''); }

  var SWAR = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ', 'ए', 'ऐ', 'ओ', 'औ'];
  var MAT = ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'ॢ', 'ॣ', 'े', 'ै', 'ो', 'ौ', '्'];
  var VYA = [['क', 'ख', 'ग', 'घ', 'ङ'], ['च', 'छ', 'ज', 'झ', 'ञ'], ['ट', 'ठ', 'ड', 'ढ', 'ण'], ['त', 'थ', 'द', 'ध', 'न'], ['प', 'फ', 'ब', 'भ', 'म'], ['य', 'र', 'ल', 'व', 'ळ'], ['श', 'ष', 'स', 'ह'], ['क्ष', 'ज्ञ', 'त्र', 'श्र']];
  var MATCODE = { 'ा': 'aa', 'ि': 'i', 'ी': 'ii', 'ु': 'u', 'ू': 'uu', 'ृ': 'RRi', 'ॄ': 'RRI', 'ॢ': 'LLi', 'ॣ': 'LLI', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', '्': '^' };
  var ROWS = ['1234567890', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

  var SAMPLES = {
    rv1: 'अ॒ग्निमी॑ळे पु॒रोहि॑तं य॒ज्ञस्य॑ दे॒वमृ॒त्विज॑म् ।\nहोता॑रं रत्न॒धात॑मम् ॥ १ ॥',
    gay: 'तत्स॑वि॒तुर्वरे᳚ण्यं॒ भर्गो॑ दे॒वस्य॑ धीमहि ।\nधियो॒ यो नः॑ प्रचो॒दया᳚त् ॥',
    marks: 'ॐ  ॑  ॒  ᳚  ᳛  ᳐  ᳑  ᳒  ᳓  ᳔  ᳕  ᳖  ᳗  ᳘  ᳙  ᳜  ᳝  ᳞  ᳟  ᳠  ᳡  ᳢  ᳣  ᳤  ᳥  ᳦  ᳧  ᳨  ᳩ  ᳪ  ᳫ  ᳬ  ꣳ  ꣴ  ꣵ'
  };
  var TYPE_SAMPLE = "a_gnimI'Le pu_rohi'taM ya_j~nasya' de_vamR_tvija'm^ |\nhotA'raM ratna_dhAta'mam^ || 1 ||";

  var FONTS = [['Noto Serif Devanagari', '"Noto Serif Devanagari"', 0], ['Noto Sans Devanagari', '"Noto Sans Devanagari"', 0],['Tiro Devanagari Sanskrit', '"Tiro Devanagari Sanskrit"', 0],['Mukta', '"Mukta"', 0],['Tiro Devanagari Hindi', '"Tiro Devanagari Hindi"', 1],['Martel', '"Martel"', 1],['Eczar', '"Eczar"', 1],['Sahitya', '"Sahitya"', 1],['Yantramanav', '"Yantramanav"', 1],['Palanquin', '"Palanquin"', 1],['Glegoo', '"Glegoo"', 1],['Sarala', '"Sarala"', 1],['Kurale', '"Kurale"', 1],['Pragati Narrow', '"Pragati Narrow"', 1],['Inknut Antiqua', '"Inknut Antiqua"', 1]];
  var FGROUPS = ['Full Vedic marks support', 'Devanagari letters (Vedic marks drawn by Noto)'];
  var KEY = 'medha-vedic-editor-v1';
  function st(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

  /* ================= editor UI ================= */
  function mount(host, o) {
    o = o || {};
    host.classList.add('ved');
    host.textContent = '';
    var S = { phon: st(KEY + '-phon') !== '0', digits: st(KEY + '-dig') !== '0', kb: st(KEY + '-kb') !== '0', font: parseInt(st(KEY + '-font'), 10) || 0, size: parseInt(st(KEY + '-size'), 10) || 24, tab: 'phon' };
    var comp = null, busy = false, savedRange = null, shift = false;

    // toolbar
    var bar = el('div', 'ved-bar'), bar2 = el('div', 'ved-bar');
    function grp(parent) { var g = el('div', 'ved-grp'); g.setAttribute('role', 'group'); parent.appendChild(g); return g; }
    function btn(g, label, title, fn, cls) {
      var b = el('button', 'btn btn-outline-secondary btn-sm ' + (cls || ''), label); b.type = 'button'; b.title = title; b.setAttribute('aria-label', title);
      b.addEventListener('mousedown', function (e) { e.preventDefault(); });
      b.addEventListener('click', function () { fn(b); }); g.appendChild(b); return b;
    }
    function sel(g, label, opts, val, fn) {
      var s = el('select', 'form-select form-select-sm ved-sel'); s.setAttribute('aria-label', label); s.title = label;
      opts.forEach(function (p) { var op = el('option', '', p[1]); op.value = p[0]; s.appendChild(op); }); s.value = val;
      s.addEventListener('change', function () { fn(s.value); }); g.appendChild(s); return s;
    }
    var g1 = grp(bar);
    var fontSel = sel(g1, 'Font', [], S.font, function (v) { S.font = +v; st(KEY + '-font', v); applyStyle(); });
    FGROUPS.forEach(function (gn, gi) { var og = document.createElement('optgroup'); og.label = gn; FONTS.forEach(function (f, i) { if (f[2] === gi) { var op = el('option', '', f[0]); op.value = i; og.appendChild(op); } }); fontSel.appendChild(og); });
    fontSel.value = S.font; if (fontSel.value === '' || fontSel.selectedIndex < 0) { S.font = 0; fontSel.value = 0; }
    var sizeSel = sel(g1, 'Size', [14, 16, 18, 20, 24, 28, 32, 40, 48, 60].map(function (n) { return [n, n + ' px']; }), S.size, function (v) { S.size = +v; st(KEY + '-size', v); applyStyle(); });
    var g2 = grp(bar);
    var blk = sel(g2, 'Paragraph style', [['p', 'Paragraph'], ['h1', 'Heading 1'], ['h2', 'Heading 2'], ['h3', 'Heading 3'], ['blockquote', 'Quote']], 'p', function (v) { ed.focus(); restore(); cmd('formatBlock', v); });
    var g3 = grp(bar);
    btn(g3, 'B', 'Bold (Ctrl+B)', function () { cmd('bold'); }, 'fw-bold'); btn(g3, 'I', 'Italic (Ctrl+I)', function () { cmd('italic'); }, 'fst-italic'); btn(g3, 'U', 'Underline (Ctrl+U)', function () { cmd('underline'); }, 'text-decoration-underline');
    var g4 = grp(bar);
    btn(g4, '⯇', 'Align left', function () { cmd('justifyLeft'); }); btn(g4, '≡', 'Centre', function () { cmd('justifyCenter'); }); btn(g4, '⯈', 'Align right', function () { cmd('justifyRight'); });
    btn(g4, '• List', 'Bulleted list', function () { cmd('insertUnorderedList'); }); btn(g4, '1. List', 'Numbered list', function () { cmd('insertOrderedList'); });
    var g5 = grp(bar);
    btn(g5, 'Undo', 'Undo (Ctrl+Z)', function () { comp = null; cmd('undo'); }); btn(g5, 'Redo', 'Redo (Ctrl+Y)', function () { comp = null; cmd('redo'); });
    btn(g5, 'Clear format', 'Remove formatting from selection', function () { cmd('removeFormat'); });

    var g6 = grp(bar2);
    var phonBtn = btn(g6, '', 'Phonetic typing on/off (Ctrl+Space)', function () { setPhon(!S.phon); }, 'ved-phon');
    var digLbl = el('label', 'ved-chk'); var dig = el('input'); dig.type = 'checkbox'; dig.checked = S.digits; digLbl.appendChild(dig); digLbl.appendChild(document.createTextNode(' Devanagari digits'));
    dig.addEventListener('change', function () { S.digits = dig.checked; st(KEY + '-dig', S.digits ? '1' : '0'); }); g6.appendChild(digLbl);
    var kbBtn = btn(g6, 'Keyboard', 'Show / hide the on-screen keyboard', function () { S.kb = !S.kb; st(KEY + '-kb', S.kb ? '1' : '0'); kbWrap.hidden = !S.kb; kbBtn.classList.toggle('active', S.kb); });
    var g7 = grp(bar2);
    btn(g7, 'Roman → देवनागरी', 'Convert the selected Roman (ITRANS / IAST) text to Devanagari', function () { convertSel(translit, 'Converted selection to Devanagari'); });
    btn(g7, 'देवनागरी → IAST', 'Convert the selected Devanagari to IAST roman', function () { convertSel(toIAST, 'Converted selection to IAST'); });
    var smp = sel(g7, 'Insert sample', [['', 'Insert sample…'], ['rv1', 'Ṛgveda 1.1.1'], ['gay', 'Gāyatrī (Ṛgveda 3.62.10)'], ['marks', 'Vedic signs showcase'], ['type', 'Typing demo (roman)']], '', function (v) {
      if (!v) return; smp.value = '';
      if (v === 'type') { var t = TYPE_SAMPLE; var was = S.phon; insertBlocks(t.split('\n').map(function (l) { return translit(l, { digits: true }); })); status('Typing demo converted — compare with the roman code in Help'); return; }
      insertBlocks(SAMPLES[v].split('\n'));
    });
    var g8 = grp(bar2);
    btn(g8, 'Copy', 'Copy plain text', function () { var t = plain(); if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { status('Copied ' + count(t) + ' characters'); }, function () { status('Copy blocked — select text and press Ctrl+C'); }); else status('Select text and press Ctrl+C'); });
    btn(g8, '.txt', 'Download as UTF-8 text', function () { dl('vedic-text.txt', 'text/plain;charset=utf-8', '﻿' + plain()); });
    btn(g8, '.html', 'Download as HTML', function () { dl('vedic-text.html', 'text/html;charset=utf-8', exportHtml()); });
    btn(g8, 'Print', 'Print', function () { window.print(); });
    btn(g8, 'New', 'Clear the document', function () { if (!ed.textContent || confirm('Clear the document?')) { ed.innerHTML = '<p><br></p>'; save(); status('New document'); ed.focus(); } }, 'btn-outline-danger');

    // editor
    var wrap = el('div', 'ved-pagewrap');
    var ed = el('div', 'ved-page'); ed.contentEditable = 'true'; ed.spellcheck = false; ed.lang = 'sa-Deva'; ed.setAttribute('role', 'textbox'); ed.setAttribute('aria-multiline', 'true'); ed.setAttribute('aria-label', 'Vedic Sanskrit editor');
    ed.setAttribute('data-ph', 'Start typing — e.g. a_gnimI\'Le puro\'hitaM …');
    wrap.appendChild(ed);
    var statusEl = el('div', 'ved-status'); statusEl.setAttribute('role', 'status'); statusEl.setAttribute('aria-live', 'polite');
    var insp = el('div', 'ved-insp'); insp.setAttribute('aria-label', 'Code points at the caret');
    var info = el('div', 'ved-info');
    var stBar = el('div', 'ved-stbar'); stBar.appendChild(statusEl); stBar.appendChild(info);

    // keyboard
    var kbWrap = el('div', 'ved-kb'); kbWrap.hidden = !S.kb;
    var tabs = el('div', 'ved-tabs'); tabs.setAttribute('role', 'tablist');
    var kbBody = el('div', 'ved-kbbody');
    [['phon', 'Phonetic keys'], ['let', 'Letters & vowel signs'], ['marks', 'Vedic marks & signs']].forEach(function (p) {
      var b = el('button', 'ved-tab', p[1]); b.type = 'button'; b.setAttribute('role', 'tab'); b.dataset.t = p[0];
      b.addEventListener('mousedown', function (e) { e.preventDefault(); }); b.addEventListener('click', function () { S.tab = p[0]; drawKb(); }); tabs.appendChild(b);
    });
    kbWrap.appendChild(tabs); kbWrap.appendChild(kbBody);

    host.appendChild(bar); host.appendChild(bar2); host.appendChild(wrap); host.appendChild(stBar); host.appendChild(insp);
    host.appendChild(kbWrap);
    var help = el('details', 'ved-helpbox'); help.innerHTML = '<summary>Typing guide (phonetic scheme)</summary>';
    help.appendChild(helpBody()); host.appendChild(help);

    /* ----- helpers ----- */
    function applyStyle() { ed.style.fontFamily = FONTS[S.font][1] + ',"Noto Serif Devanagari","Noto Sans Devanagari",serif'; ed.style.fontSize = S.size + 'px'; }
    function status(t) { statusEl.textContent = t; }
    function count(t) { return Array.from(t).length; }
    function plain() { return ed.innerText.replace(/ /g, ' ').replace(/\n{3,}/g, '\n\n').replace(/\n$/, ''); }
    function dl(name, type, data) { var a = el('a'); var u = URL.createObjectURL(new Blob([data], { type: type })); a.href = u; a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(u); a.remove(); }, 500); }
    function exportHtml() {
      return '<!doctype html><html lang="sa-Deva"><head><meta charset="utf-8"><title>Vedic text</title><style>body{max-width:760px;margin:40px auto;padding:0 20px;font:' + S.size + 'px/1.9 ' + FONTS[S.font][1] + ',"Noto Serif Devanagari","Siddhanta","Sanskrit Text","Nirmala UI","Kokila",serif;color:#222}</style></head><body>' + sanitize(ed.innerHTML) + '</body></html>';
    }
    function inEd(n) { return n && (n === ed || ed.contains(n)); }
    function restore() { var s = getSelection(); if (!inEd(s.anchorNode) && savedRange) { s.removeAllRanges(); s.addRange(savedRange); } }
    function focusEnd() { ed.focus(); var s = getSelection(); if (!inEd(s.anchorNode)) { var r = document.createRange(); r.selectNodeContents(ed); r.collapse(false); s.removeAllRanges(); s.addRange(r); } }
    function cmd(c, v) { ed.focus(); restore(); comp = null; try { document.execCommand(c, false, v == null ? null : v); } catch (e) { } save(); }
    function setPhon(v) { S.phon = v; st(KEY + '-phon', v ? '1' : '0'); phonBtn.textContent = v ? 'Phonetic: ON  अ' : 'Phonetic: OFF  A'; phonBtn.classList.toggle('active', v); comp = null; ed.focus(); status(v ? 'Phonetic typing ON — type roman letters to get Devanagari' : 'Phonetic typing OFF — keys type as written'); }
    function raw(t) { focusEnd(); comp = null; busy = true; document.execCommand('insertText', false, t); busy = false; save(); }
    function insertBlocks(lines) {
      ed.focus(); var r0 = document.createRange(); r0.selectNodeContents(ed); r0.collapse(false); getSelection().removeAllRanges(); getSelection().addRange(r0); comp = null; var h = lines.map(function (l) { var d = el('div'); d.textContent = l; return '<p>' + d.innerHTML + '</p>'; }).join('');
      if (!ed.textContent.trim()) { ed.innerHTML = h; var r1 = document.createRange(); r1.selectNodeContents(ed); r1.collapse(false); getSelection().removeAllRanges(); getSelection().addRange(r1); } else {
        var n = getSelection().anchorNode, blk = (n === ed ? ed.lastChild : n); while (blk && blk !== ed && !/^(P|DIV|H1|H2|H3|LI|BLOCKQUOTE)$/.test(blk.nodeName)) blk = blk.parentNode;
        busy = true; if (blk && blk !== ed && blk.textContent.trim()) document.execCommand('insertParagraph'); document.execCommand('insertHTML', false, h); busy = false; }
      save(); status('Inserted');
    }
    function convertSel(fn, msg) {
      focusEnd(); var s = getSelection(); var t = s.toString().replace(/\n{2,}/g, '\n');
      if (!t) { status('Select some text first'); return; }
      comp = null; busy = true; document.execCommand('insertText', false, fn(t, { digits: S.digits })); busy = false; save(); status(msg);
    }

    /* ----- phonetic composition ----- */
    function validComp() {
      var s = getSelection(); if (!comp || !s.isCollapsed || s.anchorNode !== comp.node || s.anchorOffset !== comp.end) return null;
      if (comp.node.data.substr(comp.end - comp.text.length, comp.text.length) !== comp.text) return null; return comp;
    }
    function feed(ch) {
      focusEnd(); var s = getSelection();
      if (!s.isCollapsed) { busy = true; document.execCommand('delete'); busy = false; comp = null; }
      var c = validComp(), buf = (c ? c.buf : '') + ch, out = translit(buf, { digits: false });
      if (c) s.setBaseAndExtent(c.node, c.end - c.text.length, c.node, c.end);
      busy = true; document.execCommand('insertText', false, out); busy = false;
      s = getSelection();
      comp = (s.isCollapsed && s.anchorNode && s.anchorNode.nodeType === 3) ? { node: s.anchorNode, end: s.anchorOffset, text: out, buf: buf } : null;
      save();
    }
    var ENG = /^[A-Za-z'"_\\|^~Ā-ſḀ-ỿ]$/;
    ed.addEventListener('beforeinput', function (e) {
      if (busy || !S.phon || e.isComposing || e.inputType !== 'insertText' || !e.data) return;
      var d = e.data;
      if (d.length === 1 && /[0-9]/.test(d) && S.digits) { e.preventDefault(); raw(DIG.charAt(+d)); return; }
      if (d.length === 1 && (ENG.test(d) || (d === '.' && validComp()))) { e.preventDefault(); feed(d); return; }
      comp = null;
    });
    ed.addEventListener('keydown', function (e) {
      if (e.ctrlKey && e.code === 'Space') { e.preventDefault(); setPhon(!S.phon); return; }
      if (e.key === 'Shift') { shift = true; drawKb(true); }
      hl(e.key, true);
      if (e.key === 'Backspace' || e.key === 'Delete' || e.key.indexOf('Arrow') === 0) comp = null;
    });
    ed.addEventListener('keyup', function (e) { if (e.key === 'Shift') { shift = false; drawKb(true); } hl(e.key, false); });
    ed.addEventListener('paste', function (e) { e.preventDefault(); var t = (e.clipboardData || W.clipboardData).getData('text/plain'); comp = null; busy = true; document.execCommand('insertText', false, t); busy = false; save(); });
    ed.addEventListener('mousedown', function () { comp = null; });
    ed.addEventListener('blur', function () { var s = getSelection(); if (s.rangeCount && inEd(s.anchorNode)) savedRange = s.getRangeAt(0).cloneRange(); });
    ed.addEventListener('input', function () { if (!ed.firstChild) ed.innerHTML = '<p><br></p>'; });

    /* ----- keyboard drawing ----- */
    function hl(k, on) { var b = kbBody.querySelector('[data-k="' + (k.length === 1 ? k : '').replace(/"/g, '\\"') + '"]'); if (b) b.classList.toggle('on', on); }
    function key(parent, big, small, title, fn, cls) {
      var b = el('button', 'ved-key ' + (cls || '')); b.type = 'button'; b.title = title || '';
      var m = el('span', 'k-big', big); b.appendChild(m); if (small) b.appendChild(el('span', 'k-sm', small));
      b.addEventListener('mousedown', function (e) { e.preventDefault(); }); b.addEventListener('click', function () { fn(b); }); parent.appendChild(b); return b;
    }
    function face(cp) { return isMark(cp) ? '\u25CC' + cp : cp; }
    function drawKb(keep) {
      Array.prototype.forEach.call(tabs.children, function (b) { b.setAttribute('aria-selected', b.dataset.t === S.tab ? 'true' : 'false'); });
      kbBody.textContent = '';
      if (S.tab === 'phon') {
        var note = el('div', 'ved-knote', 'Click a key or type on your keyboard. Hold Shift for capitals (ट ठ ड ढ ण ष ळ ऋ ं ः …). Corner letter = the key you press.'); kbBody.appendChild(note);
        ROWS.forEach(function (r, ri) {
          var row = el('div', 'ved-krow ved-r' + ri);
          r.split('').forEach(function (ch) {
            var k = shift ? ch.toUpperCase() : ch; if (ri === 0) k = ch;
            var o = ri === 0 ? (S.digits ? DIG.charAt(+ch) : ch) : translit(k);
            var latin = o === k;
            var b = key(row, latin ? k : o, k, nm(o.charAt(0)) + '  ←  ' + k, function () { if (ri === 0) { raw(S.digits ? DIG.charAt(+ch) : ch); } else feed(k); }, latin ? 'dim' : '');
            b.dataset.k = k; row.appendChild(b);
          });
          kbBody.appendChild(row);
        });
        var sp = el('div', 'ved-krow ved-rs');
        [["'", 'svarita / udātta ॑'], ['_', 'anudātta ॒'], ['"', 'double svarita ᳚'], ['|', 'daṇḍa ।'], ['||', 'double daṇḍa ॥'], ['^', 'virāma (halant) after a consonant'], ['\\', 'separator: k\\h = क+ह, not ख']].forEach(function (p) {
          var o = p[0] === '\\' ? '⌁' : (p[0] === '^' ? '◌्' : (p[0].length === 1 && ENG.test(p[0]) && p[0] !== '|' ? '◌' + translit(p[0]) : translit(p[0])));
          if (p[0] === '"' ) o = '◌᳚'; var b2 = key(sp, o, p[0], p[1], function () { if (p[0] === '||') { raw('॥'); } else feed(p[0]); }, 'wide'); b2.dataset.k = p[0];
        });
        kbBody.appendChild(sp);
        var ac = el('div', 'ved-krow ved-rs');
        key(ac, 'Space', '', 'Space', function () { raw(' '); }, 'space'); key(ac, '⏎', '', 'New line', function () { focusEnd(); comp = null; cmd('insertParagraph'); }, 'wide');
        key(ac, '⌫', '', 'Backspace', function () { focusEnd(); comp = null; document.execCommand('delete'); save(); }, 'wide');
        key(ac, '⇧', '', 'Shift (sticky) for capitals', function (b) { shift = !shift; drawKb(true); }, 'wide' + (shift ? ' on' : ''));
        kbBody.appendChild(ac);
      } else if (S.tab === 'let') {
        sect('Svara — independent vowels', SWAR.map(function (c) { return [c, CODE[c], c]; }));
        sect('Vowel signs (after a consonant) & virāma', MAT.map(function (c) { return ['◌' + c, MATCODE[c], c]; }));
        VYA.forEach(function (r, i) { sect(i === 0 ? 'Vyañjana — consonants' : '', r.map(function (c) { return [c, CODE[c] || '', c]; }), i > 0); });
      } else {
        G_MARKS.forEach(function (g) {
          var cps = g[1].split(' ').map(function (h) { return String.fromCodePoint(parseInt(h, 16)); }).filter(function (c) { return !/[᳷]/.test(c); });
          sect(g[0], cps.map(function (c) { return [face(c), '', c, nm(c)]; }));
        });
        var n = el('div', 'ved-knote', 'Marks are inserted at the caret and combine with the preceding letter. Hover a key for its Unicode name.'); kbBody.appendChild(n);
      }
    }
    function sect(title, items, noTitle) {
      if (title) kbBody.appendChild(el('h4', 'ved-kh', title));
      var row = el('div', 'ved-krow wrapx');
      items.forEach(function (it) { key(row, it[0], it[1] || '', it[3] || (nm(it[2].charAt(0)) + (it[1] ? '   typed as: ' + it[1] : '')), function () { raw(it[2]); }, 'sq'); });
      kbBody.appendChild(row);
    }

    /* ----- inspector, counts, persistence ----- */
    function inspect() {
      var s = getSelection(); insp.textContent = '';
      if (!inEd(s.anchorNode)) { return; }
      var t = ''; if (!s.isCollapsed) t = s.toString(); else if (s.anchorNode.nodeType === 3) t = s.anchorNode.data.slice(0, s.anchorOffset);
      var cps = Array.from(t); if (cps.length > 14) cps = cps.slice(-14);
      if (!cps.length) { insp.appendChild(el('span', 'ved-cp-empty', 'Code points at caret appear here')); return; }
      cps.forEach(function (c) { var h = c.codePointAt(0).toString(16).toUpperCase(); while (h.length < 4) h = '0' + h; var b = el('span', 'ved-cp'); b.title = nm(c); b.appendChild(el('b', '', c.charCodeAt(0) < 32 ? '↵' : (c === ' ' ? '␣' : isMark(c) ? '◌' + c : c))); b.appendChild(el('i', '', 'U+' + h)); insp.appendChild(b); });
    }
    function counts() { var t = plain(); var w = t.trim() ? t.trim().split(/\s+/).length : 0; info.textContent = count(t.replace(/\s/g, '')) + ' characters · ' + w + ' words'; }
    var tmr;
    function save() { clearTimeout(tmr); tmr = setTimeout(function () { st(KEY, ed.innerHTML); counts(); }, 300); counts(); }
    document.addEventListener('selectionchange', function () { var s = getSelection(); if (inEd(s.anchorNode)) { if (s.rangeCount) savedRange = s.getRangeAt(0).cloneRange(); inspect(); } });
    ed.addEventListener('input', save);

    function helpBody() {
      var d = el('div', 'ved-helpgrid');
      function tbl(title, rows) { var s = el('div'); s.appendChild(el('h5', '', title)); var t = el('table', 'table table-sm'); rows.forEach(function (r) { var tr = el('tr'); r.forEach(function (c, i) { var td = el(i ? 'td' : 'th', i === 0 ? 'code' : '', c); tr.appendChild(td); }); t.appendChild(tr); }); s.appendChild(t); return s; }
      d.appendChild(tbl('Vowels', [['a  aa/A  i  ii/I  u  uu/U', 'अ आ इ ई उ ऊ'], ['R / RRi / R^i / ṛ', 'ऋ'], ['RRI / ṝ', 'ॠ'], ['LLi / ḷ', 'ऌ'], ['e  ai  o  au', 'ए ऐ ओ औ'], ['M / ṃ   H / ḥ   .N', 'ं  ः  ँ'], ['.a', 'ऽ (avagraha)'], ['OM', 'ॐ']]));
      d.appendChild(tbl('Consonants', [['k kh g gh N^', 'क ख ग घ ङ'], ['c ch j jh ~n', 'च छ ज झ ञ'], ['T Th D Dh N', 'ट ठ ड ढ ण'], ['t th d dh n', 'त थ द ध न'], ['p ph b bh m', 'प फ ब भ म'], ['y r l v', 'य र ल व'], ['sh  Sh / S  s  h', 'श ष स ह'], ['L', 'ळ (Vedic)'], ['x   GY', 'क्ष   ज्ञ'], ['IAST letters (ā ī ū ṛ ṅ ñ ṭ ḍ ṇ ś ṣ ṃ ḥ)', 'also accepted']]));
      d.appendChild(tbl('Vedic marks & controls', [["'", 'svarita / udātta ॑'], ['_', 'anudātta ॒'], ['"', 'double svarita ᳚'], ['^ or .h', 'virāma ्  (k^ → क्)'], ['\\', 'separator (k\\h → कह)'], ['| ||', '। ॥'], ['0–9', 'Devanagari digits (optional)'], ['Ctrl+Space', 'phonetic on / off'], ['Other signs', 'use the “Vedic marks & signs” keyboard tab']]));
      d.appendChild(tbl('Example', [["a_gnimI'Le", 'अ॒ग्निमी॑ळे'], ["pu_rohi'taM", 'पु॒रोहि॑तं'], ["ya_j~nasya'", 'य॒ज्ञस्य॑'], ["tvija'm^", 'त्विज॑म् (^ = virāma)'], ['ka  kaa  k', 'क  का  क (a is absorbed)']]));
      return d;
    }

    // init
    var saved = st(KEY);
    ed.innerHTML = saved ? sanitize(saved) : '<p><br></p>';
    if (!ed.firstChild) ed.innerHTML = '<p><br></p>';
    try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch (e) { }
    applyStyle(); setPhon(S.phon); kbBtn.classList.toggle('active', S.kb); status(''); drawKb(); counts(); inspect();
    return { el: ed, translit: translit, setPhonetic: setPhon };
  }

  W.Vedic = { translit: translit, toIAST: toIAST, sanitize: sanitize, mount: mount, names: NAMES };
  document.addEventListener('DOMContentLoaded', function () { var h = document.querySelector('[data-vedic-editor]'); if (h) mount(h); });
})(window);
