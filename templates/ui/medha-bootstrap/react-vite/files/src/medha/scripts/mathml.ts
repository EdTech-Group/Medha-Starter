// @ts-nocheck -- the theme's own script, kept byte for byte so its behaviour does not drift.
// Ported from the Medha theme by medha-starter. Source: assets/mathml.js, unchanged inside this function.
// The theme runs it once per page load; here it runs each time its page mounts (see
// src/components/medha/page-scripts.ts, which also removes its global listeners afterwards).
export default function mathmlScript(): void {
  /* LaTeX -> MathML converter + sanitiser (no dependencies) */
  (function (g) {
    "use strict";
    var R = String.raw;
    function esc(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
    /* ---------- tables ---------- */
    var GREEK = {
      alpha: "α",
      beta: "β",
      gamma: "γ",
      delta: "δ",
      epsilon: "ϵ",
      varepsilon: "ε",
      zeta: "ζ",
      eta: "η",
      theta: "θ",
      vartheta: "ϑ",
      iota: "ι",
      kappa: "κ",
      varkappa: "ϰ",
      lambda: "λ",
      mu: "μ",
      nu: "ν",
      xi: "ξ",
      omicron: "ο",
      pi: "π",
      varpi: "ϖ",
      rho: "ρ",
      varrho: "ϱ",
      sigma: "σ",
      varsigma: "ς",
      tau: "τ",
      upsilon: "υ",
      phi: "ϕ",
      varphi: "φ",
      chi: "χ",
      psi: "ψ",
      omega: "ω",
      digamma: "ϝ",
    };
    var GREEKU = {
      Gamma: "Γ",
      Delta: "Δ",
      Theta: "Θ",
      Lambda: "Λ",
      Xi: "Ξ",
      Pi: "Π",
      Sigma: "Σ",
      Upsilon: "Υ",
      Phi: "Φ",
      Psi: "Ψ",
      Omega: "Ω",
    };
    var ORD = {
      infty: "∞",
      partial: "∂",
      nabla: "∇",
      hbar: "ℏ",
      ell: "ℓ",
      wp: "℘",
      Re: "ℜ",
      Im: "ℑ",
      aleph: "ℵ",
      beth: "ℶ",
      gimel: "ℷ",
      daleth: "ℸ",
      emptyset: "∅",
      varnothing: "∅",
      angle: "∠",
      measuredangle: "∡",
      sphericalangle: "∢",
      triangle: "△",
      top: "⊤",
      bot: "⊥",
      prime: "′",
      backprime: "‵",
      degree: "°",
      checkmark: "✓",
      S: "§",
      P: "¶",
      copyright: "©",
      pounds: "£",
      yen: "¥",
      euro: "€",
      imath: "ı",
      jmath: "ȷ",
      Box: "□",
      square: "□",
      blacksquare: "■",
      lozenge: "◊",
      diamond: "⋄",
      clubsuit: "♣",
      diamondsuit: "♢",
      heartsuit: "♡",
      spadesuit: "♠",
      flat: "♭",
      natural: "♮",
      sharp: "♯",
      mho: "℧",
      complement: "∁",
      eth: "ð",
      Bbbk: "𝕜",
      circledR: "®",
      sun: "☉",
      female: "♀",
      male: "♂",
      star: "⋆",
      smiley: "☺",
      bigstar: "★",
      surd: "√",
    };
    var OPS = {
      pm: "±",
      mp: "∓",
      times: "×",
      div: "÷",
      cdot: "⋅",
      ast: "∗",
      circ: "∘",
      bullet: "∙",
      oplus: "⊕",
      ominus: "⊖",
      otimes: "⊗",
      oslash: "⊘",
      odot: "⊙",
      cup: "∪",
      cap: "∩",
      setminus: "∖",
      smallsetminus: "∖",
      wedge: "∧",
      land: "∧",
      vee: "∨",
      lor: "∨",
      neg: "¬",
      lnot: "¬",
      sqcup: "⊔",
      sqcap: "⊓",
      uplus: "⊎",
      dagger: "†",
      ddagger: "‡",
      wr: "≀",
      triangleleft: "◁",
      triangleright: "▷",
      bigtriangleup: "△",
      bigtriangledown: "▽",
      diamondop: "⋄",
      le: "≤",
      leq: "≤",
      ge: "≥",
      geq: "≥",
      ne: "≠",
      neq: "≠",
      equiv: "≡",
      approx: "≈",
      cong: "≅",
      simeq: "≃",
      sim: "∼",
      propto: "∝",
      ll: "≪",
      gg: "≫",
      prec: "≺",
      succ: "≻",
      preceq: "⪯",
      succeq: "⪰",
      parallel: "∥",
      nparallel: "∦",
      perp: "⊥",
      mid: "∣",
      nmid: "∤",
      in: "∈",
      notin: "∉",
      ni: "∋",
      owns: "∋",
      subset: "⊂",
      supset: "⊃",
      subseteq: "⊆",
      supseteq: "⊇",
      nsubseteq: "⊈",
      nsupseteq: "⊉",
      subsetneq: "⊊",
      supsetneq: "⊋",
      sqsubset: "⊏",
      sqsupset: "⊐",
      sqsubseteq: "⊑",
      sqsupseteq: "⊒",
      vdash: "⊢",
      dashv: "⊣",
      models: "⊨",
      vDash: "⊨",
      asymp: "≍",
      doteq: "≐",
      bowtie: "⋈",
      smile: "⌣",
      frown: "⌢",
      lesssim: "≲",
      gtrsim: "≳",
      leqslant: "⩽",
      geqslant: "⩾",
      lneq: "⪇",
      gneq: "⪈",
      ncong: "≇",
      nsim: "≁",
      napprox: "≉",
      nless: "≮",
      ngtr: "≯",
      nleq: "≰",
      ngeq: "≱",
      triangleq: "≜",
      coloneqq: "≔",
      eqqcolon: "≕",
      exists: "∃",
      nexists: "∄",
      forall: "∀",
      therefore: "∴",
      because: "∵",
      to: "→",
      rightarrow: "→",
      gets: "←",
      leftarrow: "←",
      leftrightarrow: "↔",
      Rightarrow: "⇒",
      Leftarrow: "⇐",
      Leftrightarrow: "⇔",
      implies: "⟹",
      impliedby: "⟸",
      iff: "⟺",
      mapsto: "↦",
      longmapsto: "⟼",
      longrightarrow: "⟶",
      longleftarrow: "⟵",
      longleftrightarrow: "⟷",
      Longrightarrow: "⟹",
      Longleftarrow: "⟸",
      Longleftrightarrow: "⟺",
      uparrow: "↑",
      downarrow: "↓",
      updownarrow: "↕",
      Uparrow: "⇑",
      Downarrow: "⇓",
      Updownarrow: "⇕",
      nearrow: "↗",
      searrow: "↘",
      swarrow: "↙",
      nwarrow: "↖",
      hookrightarrow: "↪",
      hookleftarrow: "↩",
      rightleftharpoons: "⇌",
      leftrightharpoons: "⇋",
      rightharpoonup: "⇀",
      rightharpoondown: "⇁",
      leftharpoonup: "↼",
      leftharpoondown: "↽",
      leadsto: "⇝",
      rightsquigarrow: "⇝",
      twoheadrightarrow: "↠",
      twoheadleftarrow: "↞",
      nrightarrow: "↛",
      nleftarrow: "↚",
      nRightarrow: "⇏",
      looparrowright: "↬",
      curvearrowright: "↷",
      circlearrowright: "↻",
      ldots: "…",
      dots: "…",
      cdots: "⋯",
      vdots: "⋮",
      ddots: "⋱",
      dotsb: "⋯",
      dotsc: "…",
      langle: "⟨",
      rangle: "⟩",
      lfloor: "⌊",
      rfloor: "⌋",
      lceil: "⌈",
      rceil: "⌉",
      lvert: "|",
      rvert: "|",
      lVert: "‖",
      rVert: "‖",
      vert: "|",
      Vert: "‖",
      backslash: "∖",
      lbrace: "{",
      rbrace: "}",
      lbrack: "[",
      rbrack: "]",
      lgroup: "(",
      rgroup: ")",
      "{": "{",
      "}": "}",
      "|": "‖",
      "%": "%",
      "&": "&",
      _: "_",
      "#": "#",
      $: "$",
    };
    var BIGOP = {
      sum: ["∑", 1],
      prod: ["∏", 1],
      coprod: ["∐", 1],
      bigcup: ["⋃", 1],
      bigcap: ["⋂", 1],
      bigoplus: ["⨁", 1],
      bigotimes: ["⨂", 1],
      bigodot: ["⨀", 1],
      biguplus: ["⨄", 1],
      bigvee: ["⋁", 1],
      bigwedge: ["⋀", 1],
      bigsqcup: ["⨆", 1],
      int: ["∫", 0],
      iint: ["∬", 0],
      iiint: ["∭", 0],
      iiiint: ["⨌", 0],
      oint: ["∮", 0],
      oiint: ["∯", 0],
      oiiint: ["∰", 0],
      ointctrclockwise: ["∲", 0],
      varointclockwise: ["∲", 0],
      intop: ["∫", 0],
    };
    var LIMF = {
      lim: "lim",
      limsup: "lim sup",
      liminf: "lim inf",
      max: "max",
      min: "min",
      sup: "sup",
      inf: "inf",
      det: "det",
      gcd: "gcd",
      Pr: "Pr",
      injlim: "inj lim",
      projlim: "proj lim",
      varlimsup: "lim sup",
      varliminf: "lim inf",
    };
    var FUNCS =
      "sin cos tan cot sec csc arcsin arccos arctan arccot sinh cosh tanh coth sech csch ln log lg exp deg dim ker hom arg sgn Tr tr rank".split(
        " ",
      );
    var ACC = {
      hat: ["^", 0],
      widehat: ["^", 1],
      bar: ["¯", 0],
      vec: ["→", 0],
      dot: ["˙", 0],
      ddot: ["¨", 0],
      dddot: ["⃛", 0],
      tilde: ["˜", 0],
      widetilde: ["˜", 1],
      check: ["ˇ", 0],
      breve: ["˘", 0],
      acute: ["´", 0],
      grave: ["`", 0],
      mathring: ["˚", 0],
      overrightarrow: ["→", 1],
      overleftarrow: ["←", 1],
      overleftrightarrow: ["↔", 1],
      overarc: ["⌢", 1],
      overparen: ["⏜", 1],
    };
    var DELIM = {
      "(": "(",
      ")": ")",
      "[": "[",
      "]": "]",
      "|": "|",
      "/": "/",
      "<": "⟨",
      ">": "⟩",
      ".": "",
      "{": "{",
      "}": "}",
      "\\|": "‖",
      langle: "⟨",
      rangle: "⟩",
      lfloor: "⌊",
      rfloor: "⌋",
      lceil: "⌈",
      rceil: "⌉",
      lvert: "|",
      rvert: "|",
      lVert: "‖",
      rVert: "‖",
      vert: "|",
      Vert: "‖",
      backslash: "∖",
      lbrace: "{",
      rbrace: "}",
      lbrack: "[",
      rbrack: "]",
      uparrow: "↑",
      downarrow: "↓",
      updownarrow: "↕",
      Uparrow: "⇑",
      Downarrow: "⇓",
      lgroup: "(",
      rgroup: ")",
      ulcorner: "⌜",
      urcorner: "⌝",
      llcorner: "⌞",
      lrcorner: "⌟",
    };
    var NOT = {
      in: "∉",
      subset: "⊄",
      supset: "⊅",
      equiv: "≢",
      "=": "≠",
      le: "≰",
      leq: "≰",
      ge: "≱",
      geq: "≱",
      sim: "≁",
      approx: "≉",
      cong: "≇",
      mid: "∤",
      parallel: "∦",
      exists: "∄",
      ni: "∌",
      subseteq: "⊈",
      supseteq: "⊉",
      prec: "⊀",
      succ: "⊁",
      leftarrow: "↚",
      rightarrow: "↛",
      Rightarrow: "⇏",
      Leftarrow: "⇍",
      to: "↛",
      "<": "≮",
      ">": "≯",
    };
    var BIGSZ = { big: "1.2em", Big: "1.8em", bigg: "2.4em", Bigg: "3em" };
    var SPACE = {
      ",": "0.1667em",
      ":": "0.2222em",
      ";": "0.2778em",
      "!": "-0.1667em",
      " ": "0.25em",
      quad: "1em",
      qquad: "2em",
      thinspace: "0.1667em",
      medspace: "0.2222em",
      thickspace: "0.2778em",
      enspace: "0.5em",
      negthinspace: "-0.1667em",
      negmedspace: "-0.2222em",
      negthickspace: "-0.2778em",
      space: "0.25em",
    };
    var HOLES = {
      it: { h: 0x210e },
      cal: {
        B: 0x212c,
        E: 0x2130,
        F: 0x2131,
        H: 0x210b,
        I: 0x2110,
        L: 0x2112,
        M: 0x2133,
        R: 0x211b,
        e: 0x212f,
        g: 0x210a,
        o: 0x2134,
      },
      frak: { C: 0x212d, H: 0x210c, I: 0x2111, R: 0x211c, Z: 0x2128 },
      bb: { C: 0x2102, H: 0x210d, N: 0x2115, P: 0x2119, Q: 0x211a, R: 0x211d, Z: 0x2124 },
    };
    var FB = {
      bf: [0x1d400, 0x1d41a, 0x1d7ce],
      it: [0x1d434, 0x1d44e, null],
      bi: [0x1d468, 0x1d482, null],
      cal: [0x1d49c, 0x1d4b6, null],
      bb: [0x1d538, 0x1d552, 0x1d7d8],
      frak: [0x1d504, 0x1d51e, null],
      sf: [0x1d5a0, 0x1d5ba, 0x1d7e2],
      tt: [0x1d670, 0x1d68a, 0x1d7f6],
    };
    function mapFont(ch, f) {
      var b = FB[f];
      if (!b) return ch;
      var c = ch.codePointAt(0),
        o;
      if (HOLES[f] && HOLES[f][ch]) return String.fromCodePoint(HOLES[f][ch]);
      if (c >= 65 && c <= 90) o = b[0] + c - 65;
      else if (c >= 97 && c <= 122) o = b[1] + c - 97;
      else if (c >= 48 && c <= 57 && b[2]) o = b[2] + c - 48;
      else return ch;
      return String.fromCodePoint(o);
    }
    var FONTCMD = {
      mathbb: "bb",
      Bbb: "bb",
      mathcal: "cal",
      mathscr: "cal",
      cal: "cal",
      mathfrak: "frak",
      frak: "frak",
      mathbf: "bf",
      bf: "bf",
      mathit: "it",
      it: "it",
      mathrm: "rm",
      rm: "rm",
      mathsf: "sf",
      mathtt: "tt",
      boldsymbol: "bi",
      bm: "bi",
      mathnormal: null,
      pmb: "bf",
      textbf: "bf",
    };
    /* ---------- tokenizer ---------- */
    function tokenize(s) {
      var t = [],
        i = 0,
        sp = false;
      while (i < s.length) {
        var c = s[i];
        if (/\s/.test(c)) {
          sp = true;
          i++;
          continue;
        }
        if (c === "%") {
          while (i < s.length && s[i] !== "\n") i++;
          continue;
        }
        var tok;
        if (c === "\\") {
          i++;
          if (i >= s.length) tok = { k: "c", v: "\\" };
          else if (/[a-zA-Z]/.test(s[i])) {
            var j = i;
            while (j < s.length && /[a-zA-Z]/.test(s[j])) j++;
            tok = { k: "c", v: s.slice(i, j) };
            i = j;
          } else {
            var ch = String.fromCodePoint(s.codePointAt(i));
            tok = { k: "c", v: ch };
            i += ch.length;
          }
        } else {
          var ch2 = String.fromCodePoint(s.codePointAt(i));
          tok = { k: "ch", v: ch2 };
          i += ch2.length;
        }
        tok.sp = sp;
        sp = false;
        t.push(tok);
      }
      return t;
    }
    /* ---------- node helpers ---------- */
    function N(m, o) {
      var n = { m: m };
      if (o) for (var k in o) n[k] = o[k];
      return n;
    }
    function nodeStr(n) {
      return n.m + (n.post || "");
    }
    function seqM(nodes) {
      if (!nodes.length) return "<mrow></mrow>";
      if (nodes.length === 1 && !nodes[0].post) return nodes[0].m;
      return "<mrow>" + nodes.map(nodeStr).join("") + "</mrow>";
    }
    function mo(c, a) {
      return "<mo" + (a || "") + ">" + esc(c) + "</mo>";
    }
    function chemString(src, depth) {
      return chem(src, depth);
    }
    /* ---------- parser ---------- */
    function Parser(toks, depth) {
      this.t = toks;
      this.i = 0;
      this.errs = [];
      this.font = null;
      this.depth = depth || 0;
    }
    var P = Parser.prototype;
    P.peek = function () {
      return this.t[this.i];
    };
    P.err = function (m) {
      if (this.errs.indexOf(m) < 0) this.errs.push(m);
    };
    P.isCh = function (v) {
      var t = this.peek();
      return t && t.k === "ch" && t.v === v;
    };
    P.isCmd = function (v) {
      var t = this.peek();
      return t && t.k === "c" && t.v === v;
    };
    P.parseSeq = function (stop) {
      var out = [];
      while (this.i < this.t.length) {
        var tk = this.peek();
        if (stop && stop(tk)) break;
        if (tk.k === "c") {
          var v = tk.v;
          if (v === "color") {
            this.i++;
            var col = this.rawGroup();
            var rest = this.parseSeq(stop);
            out.push(N('<mstyle mathcolor="' + safeColor(col) + '">' + seqM(rest) + "</mstyle>"));
            break;
          }
          if (
            v === "displaystyle" ||
            v === "textstyle" ||
            v === "scriptstyle" ||
            v === "scriptscriptstyle"
          ) {
            this.i++;
            var r2 = this.parseSeq(stop);
            var at =
              v === "displaystyle"
                ? ' displaystyle="true"'
                : v === "textstyle"
                  ? ' displaystyle="false" scriptlevel="0"'
                  : v === "scriptstyle"
                    ? ' displaystyle="false" scriptlevel="1"'
                    : ' displaystyle="false" scriptlevel="2"';
            out.push(N("<mstyle" + at + ">" + seqM(r2) + "</mstyle>"));
            break;
          }
          if (
            v === "rm" ||
            v === "bf" ||
            v === "it" ||
            v === "cal" ||
            v === "frak" ||
            v === "tt" ||
            v === "sf"
          ) {
            this.i++;
            var old = this.font;
            this.font = FONTCMD[v];
            var r3 = this.parseSeq(stop);
            this.font = old;
            out = out.concat(r3);
            break;
          }
          if (
            v === "hline" ||
            v === "nonumber" ||
            v === "notag" ||
            v === "allowbreak" ||
            v === "relax" ||
            v === "left." ||
            v === "protect" ||
            v === "noindent"
          ) {
            this.i++;
            continue;
          }
          if (v === "label" || v === "tag" || v === "vspace" || v === "hspace*") {
            this.i++;
            this.rawGroup();
            continue;
          }
        }
        var n = this.parseScripted();
        if (n) out.push(n);
        else if (this.i < this.t.length && this.peek() === tk) this.i++;
      }
      return out;
    };
    P.rawGroup = function () {
      var t = this.peek();
      if (!t || !(t.k === "ch" && t.v === "{")) {
        var x = this.t[this.i++];
        return x ? x.v : "";
      }
      this.i++;
      var d = 1,
        s = "";
      while (this.i < this.t.length) {
        var k = this.t[this.i++];
        if (k.k === "ch" && k.v === "{") {
          d++;
          s += (k.sp ? " " : "") + "{";
          continue;
        }
        if (k.k === "ch" && k.v === "}") {
          d--;
          if (!d) return s;
          s += "}";
          continue;
        }
        s +=
          (k.sp && s ? " " : "") +
          (k.k === "c" ? "\\" + k.v + (/[a-zA-Z]/.test(k.v) ? " " : "") : k.v);
      }
      this.err("Missing closing }");
      return s;
    };
    P.textGroup = function () {
      var t = this.peek();
      if (!t || !(t.k === "ch" && t.v === "{")) {
        var x = this.t[this.i++];
        return x ? x.v : "";
      }
      this.i++;
      var d = 1,
        s = "";
      while (this.i < this.t.length) {
        var k = this.t[this.i++];
        if (k.k === "ch" && k.v === "{") {
          d++;
          continue;
        }
        if (k.k === "ch" && k.v === "}") {
          d--;
          if (!d) {
            if (k.sp) s += " ";
            return s;
          }
          continue;
        }
        if (k.sp) s += " ";
        if (k.k === "c") {
          var sp = SPACE[k.v];
          if (sp) s += k.v === "quad" || k.v === "qquad" ? "  " : " ";
          else if (ORD[k.v] != null || OPS[k.v] != null) s += ORD[k.v] || OPS[k.v];
          else if (GREEK[k.v]) s += GREEK[k.v];
          continue;
        }
        s += k.v;
      }
      this.err("Missing closing }");
      return s;
    };
    P.parseArg = function () {
      var t = this.peek();
      if (!t) return N("<mrow></mrow>");
      if (t.k === "ch" && t.v === "{") return this.parseAtom(false);
      var a = this.parseAtom(true);
      return a || N("<mrow></mrow>");
    };
    P.parseScripted = function () {
      var tk = this.peek(),
        base = null;
      if (!(tk.k === "ch" && (tk.v === "^" || tk.v === "_"))) {
        base = this.parseAtom(false);
        if (!base) return null;
      }
      var sub = null,
        sup = null,
        primes = "",
        limMode = null;
      for (;;) {
        var t = this.peek();
        if (!t) break;
        if (t.k === "c" && (t.v === "limits" || t.v === "nolimits")) {
          this.i++;
          limMode = t.v;
          continue;
        }
        if (t.k === "ch" && t.v === "_") {
          this.i++;
          if (sub) this.err("Double subscript");
          sub = this.parseArg();
          continue;
        }
        if (t.k === "ch" && t.v === "^") {
          this.i++;
          if (sup) this.err("Double superscript");
          sup = this.parseArg();
          continue;
        }
        if (t.k === "ch" && t.v === "'") {
          this.i++;
          primes += "′";
          continue;
        }
        break;
      }
      if (primes) {
        var pm =
          primes.length === 1
            ? "′"
            : primes.length === 2
              ? "″"
              : primes.length === 3
                ? "‴"
                : primes;
        var pn = mo(pm);
        sup = sup ? N("<mrow>" + pn + nodeStr(sup) + "</mrow>") : N(pn);
      }
      if (!sub && !sup) return base;
      var b = base || N("<mrow></mrow>"),
        bm = b.m;
      var lim = b.lim;
      if (limMode === "limits") lim = true;
      else if (limMode === "nolimits") lim = false;
      var tag;
      if (lim) {
        tag = sub && sup ? "munderover" : sub ? "munder" : "mover";
      } else {
        tag = sub && sup ? "msubsup" : sub ? "msub" : "msup";
      }
      var inner = bm + (sub ? nodeStr(sub) : "") + (sup ? nodeStr(sup) : "");
      var node = N("<" + tag + ">" + inner + "</" + tag + ">", { post: b.post });
      if (b.lim && lim) node.lim = false;
      return node;
    };
    function safeColor(c) {
      c = String(c).trim();
      return /^(#[0-9a-fA-F]{3,8}|[a-zA-Z]{3,20})$/.test(c) ? c : "currentColor";
    }
    function mkLetter(c, font) {
      if (font === "rm") return '<mi mathvariant="normal">' + esc(c) + "</mi>";
      if (font && FB[font]) return "<mi>" + esc(mapFont(c, font)) + "</mi>";
      return "<mi>" + esc(c) + "</mi>";
    }
    P.parseAtom = function (single) {
      var tk = this.peek();
      if (!tk) return null;
      var font = this.font;
      if (tk.k === "ch") {
        var c = tk.v;
        if (c === "{") {
          this.i++;
          var nodes = this.parseSeq(function (t) {
            return t.k === "ch" && t.v === "}";
          });
          if (this.isCh("}")) this.i++;
          else this.err("Missing closing }");
          return N(seqM(nodes));
        }
        if (c === "}") {
          this.i++;
          this.err("Unexpected }");
          return null;
        }
        if (c === "&" || c === "#") {
          this.i++;
          this.err("Unexpected " + c + " (use a matrix or aligned environment)");
          return null;
        }
        this.i++;
        if (/[A-Za-z]/.test(c)) return N(mkLetter(c, font));
        if (
          /[0-9]/.test(c) ||
          (c === "." && this.peek() && this.peek().k === "ch" && /[0-9]/.test(this.peek().v))
        ) {
          var s = c;
          if (!single) {
            while (
              this.peek() &&
              this.peek().k === "ch" &&
              !this.peek().sp &&
              (/[0-9]/.test(this.peek().v) ||
                (this.peek().v === "." &&
                  this.t[this.i + 1] &&
                  this.t[this.i + 1].k === "ch" &&
                  /[0-9]/.test(this.t[this.i + 1].v) &&
                  s.indexOf(".") < 0))
            )
              s += this.t[this.i++].v;
          }
          if (font && FB[font])
            s = s.replace(/[0-9]/g, function (d) {
              return mapFont(d, font);
            });
          return N("<mn>" + esc(s) + "</mn>");
        }
        if (c === "▢") return N('<mi mathvariant="normal">▢</mi>');
        if (c === "~") return N('<mspace width="0.25em"></mspace>');
        if (c === "'") {
          return N(mo("′"));
        }
        if (c === "-") return N(mo("−"));
        if (c === "*") return N(mo("∗"));
        if (c === "^" || c === "_") {
          return null;
        }
        if (/[\u0370-\u03FF\u00C0-\u024F]/.test(c) && /\p{L}/u.test(c)) return N(mkLetter(c, font));
        if (c === "(" || c === ")" || c === "[" || c === "]" || c === "/")
          return N(mo(c, ' stretchy="false"'));
        if (c === "|") return N(mo(c, ' stretchy="false" lspace="0" rspace="0"'));
        if (
          c === "," ||
          c === ";" ||
          c === "!" ||
          c === "?" ||
          c === ":" ||
          c === "=" ||
          c === "+" ||
          c === "<" ||
          c === ">" ||
          c === "@" ||
          c === "." ||
          c === '"' ||
          c === "`"
        )
          return N(mo(c));
        return N(mo(c));
      }
      /* command */
      this.i++;
      var v = tk.v,
        self = this;
      if (FONTCMD.hasOwnProperty(v)) {
        var old = this.font,
          f = FONTCMD[v];
        this.font = f;
        var a = this.parseArg();
        this.font = old;
        return a;
      }
      if (GREEK[v])
        return N(
          font === "rm"
            ? '<mi mathvariant="normal">' + GREEK[v] + "</mi>"
            : "<mi>" + GREEK[v] + "</mi>",
        );
      if (GREEKU[v]) return N('<mi mathvariant="normal">' + GREEKU[v] + "</mi>");
      if (ORD.hasOwnProperty(v)) {
        return N("<mi" + (/^[A-Za-z]$/.test(ORD[v]) ? "" : "") + ">" + esc(ORD[v]) + "</mi>");
      }
      if (OPS.hasOwnProperty(v)) {
        var ch = OPS[v],
          at = "";
        if (
          /^(langle|rangle|lfloor|rfloor|lceil|rceil|lvert|rvert|lVert|rVert|vert|Vert|\{|\}|lbrace|rbrace|lbrack|rbrack|lgroup|rgroup)$/.test(
            v,
          )
        )
          at = ' fence="true" stretchy="false"';
        if (v === "mid") at = ' lspace="0.2778em" rspace="0.2778em" stretchy="false"';
        if (v === "|" || v === "vert" || v === "Vert") at += ' stretchy="false"';
        if (v === "ldots" || v === "dots" || v === "cdots" || v === "vdots" || v === "ddots")
          at = ' stretchy="false"';
        return N(mo(ch, at));
      }
      if (BIGOP[v])
        return N(
          mo(
            BIGOP[v][0],
            ' largeop="true" stretchy="false"' + (BIGOP[v][1] ? ' movablelimits="true"' : ""),
          ),
          { lim: !!BIGOP[v][1] },
        );
      if (LIMF[v])
        return N('<mo movablelimits="true">' + esc(LIMF[v]) + "</mo>", {
          lim: true,
          post: "<mo>&#x2061;</mo>",
        });
      if (FUNCS.indexOf(v) >= 0) return N("<mi>" + v + "</mi>", { post: "<mo>&#x2061;</mo>" });
      if (ACC[v]) {
        var base = this.parseArg(),
          ac = ACC[v];
        return N(
          '<mover accent="true">' +
            nodeStr(base) +
            "<mo" +
            (ac[1] ? ' stretchy="true"' : ' stretchy="false"') +
            ">" +
            esc(ac[0]) +
            "</mo></mover>",
        );
      }
      switch (v) {
        case "frac":
        case "dfrac":
        case "tfrac":
        case "cfrac": {
          var n1 = this.parseArg(),
            d1 = this.parseArg(),
            fr = "<mfrac>" + nodeStr(n1) + nodeStr(d1) + "</mfrac>";
          if (v === "dfrac" || v === "cfrac")
            fr = '<mstyle displaystyle="true" scriptlevel="0">' + fr + "</mstyle>";
          if (v === "tfrac")
            fr = '<mstyle displaystyle="false" scriptlevel="0">' + fr + "</mstyle>";
          return N(fr);
        }
        case "binom":
        case "dbinom":
        case "tbinom": {
          var a1 = this.parseArg(),
            b1 = this.parseArg();
          return N(
            "<mrow>" +
              mo("(", ' stretchy="true" fence="true"') +
              '<mfrac linethickness="0">' +
              nodeStr(a1) +
              nodeStr(b1) +
              "</mfrac>" +
              mo(")", ' stretchy="true" fence="true"') +
              "</mrow>",
          );
        }
        case "sqrt": {
          var idx = null;
          if (this.isCh("[")) {
            this.i++;
            var is = this.parseSeq(function (t) {
              return t.k === "ch" && t.v === "]";
            });
            if (this.isCh("]")) this.i++;
            idx = seqM(is);
          }
          var rad = this.parseArg();
          return N(
            idx !== null
              ? "<mroot>" + nodeStr(rad) + idx + "</mroot>"
              : "<msqrt>" + nodeStr(rad) + "</msqrt>",
          );
        }
        case "text":
        case "textrm":
        case "textnormal":
        case "mbox":
        case "hbox":
        case "textsf":
        case "texttt":
        case "textit": {
          var s2 = this.textGroup();
          if (v === "textit")
            s2 = s2.replace(/[A-Za-z]/g, function (x) {
              return mapFont(x, "it");
            });
          if (v === "textsf")
            s2 = s2.replace(/[A-Za-z]/g, function (x) {
              return mapFont(x, "sf");
            });
          if (v === "texttt")
            s2 = s2.replace(/[A-Za-z]/g, function (x) {
              return mapFont(x, "tt");
            });
          s2 = s2.replace(/^ /, "\u00A0").replace(/ $/, "\u00A0");
          return N("<mtext>" + esc(s2) + "</mtext>");
        }
        case "operatorname":
        case "DeclareMathOperator": {
          var star = false;
          if (this.isCh("*")) {
            this.i++;
            star = true;
          }
          var nm = this.textGroup();
          return N("<mi>" + esc(nm) + "</mi>", { post: "<mo>&#x2061;</mo>", lim: star });
        }
        case "mathop": {
          var a2 = this.parseArg();
          return N(nodeStr(a2), { lim: true });
        }
        case "mathrel":
        case "mathbin": {
          var a3 = this.parseArg();
          return N("<mrow>" + nodeStr(a3) + "</mrow>");
        }
        case "mathord":
        case "mathopen":
        case "mathclose":
        case "mathpunct":
        case "mathinner":
        case "boldmath": {
          return this.parseArg();
        }
        case "textcolor":
        case "colorbox": {
          var col = safeColor(this.rawGroup()),
            a4 = this.parseArg();
          return N('<mstyle mathcolor="' + col + '">' + nodeStr(a4) + "</mstyle>");
        }
        case "left": {
          var d1x = this.readDelim();
          var inner = this.parseSeq(function (t) {
            return t.k === "c" && (t.v === "right" || t.v === "middle");
          });
          var parts = [mo(d1x, ' fence="true" stretchy="true" form="prefix"')].concat([
            seqM(inner),
          ]);
          var kids = [];
          while (this.isCmd("middle")) {
            this.i++;
            var dm = this.readDelim();
            kids.push(
              mo(dm, ' fence="true" stretchy="true" form="infix" lspace="0.2em" rspace="0.2em"'),
            );
            var more = this.parseSeq(function (t) {
              return t.k === "c" && (t.v === "right" || t.v === "middle");
            });
            kids.push(seqM(more));
          }
          var d2x = "";
          if (this.isCmd("right")) {
            this.i++;
            d2x = this.readDelim();
          } else this.err("\\left without matching \\right");
          return N(
            "<mrow>" +
              parts[0] +
              parts[1] +
              kids.join("") +
              mo(d2x, ' fence="true" stretchy="true" form="postfix"') +
              "</mrow>",
          );
        }
        case "right":
        case "middle": {
          this.err("\\" + v + " without \\left");
          this.readDelim();
          return null;
        }
        case "big":
        case "Big":
        case "bigg":
        case "Bigg":
        case "bigl":
        case "Bigl":
        case "biggl":
        case "Biggl":
        case "bigr":
        case "Bigr":
        case "biggr":
        case "Biggr":
        case "bigm":
        case "Bigm": {
          var dd = this.readDelim(),
            sz = BIGSZ[v.replace(/[lrm]$/, "")] || "1.2em",
            frm = /l$/.test(v) ? "prefix" : /r$/.test(v) ? "postfix" : "infix";
          return N(
            mo(
              dd,
              ' fence="true" stretchy="true" symmetric="true" minsize="' +
                sz +
                '" maxsize="' +
                sz +
                '" form="' +
                frm +
                '"',
            ),
          );
        }
        case "overline": {
          var o1 = this.parseArg();
          return N('<menclose notation="top">' + nodeStr(o1) + "</menclose>");
        }
        case "underline": {
          var u1 = this.parseArg();
          return N('<menclose notation="bottom">' + nodeStr(u1) + "</menclose>");
        }
        case "boxed":
        case "fbox": {
          var b2 = this.parseArg();
          return N('<menclose notation="box">' + nodeStr(b2) + "</menclose>");
        }
        case "cancel": {
          var c1 = this.parseArg();
          return N('<menclose notation="updiagonalstrike">' + nodeStr(c1) + "</menclose>");
        }
        case "bcancel": {
          var c2 = this.parseArg();
          return N('<menclose notation="downdiagonalstrike">' + nodeStr(c2) + "</menclose>");
        }
        case "xcancel": {
          var c3 = this.parseArg();
          return N(
            '<menclose notation="updiagonalstrike downdiagonalstrike">' +
              nodeStr(c3) +
              "</menclose>",
          );
        }
        case "sout": {
          var c4 = this.parseArg();
          return N('<menclose notation="horizontalstrike">' + nodeStr(c4) + "</menclose>");
        }
        case "overbrace": {
          var ob = this.parseArg();
          return N("<mover>" + nodeStr(ob) + '<mo stretchy="true">⏞</mo></mover>', { lim: true });
        }
        case "underbrace": {
          var ub = this.parseArg();
          return N("<munder>" + nodeStr(ub) + '<mo stretchy="true">⏟</mo></munder>', { lim: true });
        }
        case "overset":
        case "stackrel": {
          var top = this.parseArg(),
            bs = this.parseArg();
          return N("<mover>" + nodeStr(bs) + nodeStr(top) + "</mover>");
        }
        case "underset": {
          var bt = this.parseArg(),
            bs2 = this.parseArg();
          return N("<munder>" + nodeStr(bs2) + nodeStr(bt) + "</munder>");
        }
        case "xrightarrow":
        case "xleftarrow":
        case "xleftrightarrow":
        case "xRightarrow":
        case "xLeftarrow":
        case "xrightleftharpoons":
        case "xmapsto": {
          var below = null;
          if (this.isCh("[")) {
            this.i++;
            var bsq = this.parseSeq(function (t) {
              return t.k === "ch" && t.v === "]";
            });
            if (this.isCh("]")) this.i++;
            below = seqM(bsq);
          }
          var above = this.parseArg(),
            arr = {
              xrightarrow: "→",
              xleftarrow: "←",
              xleftrightarrow: "↔",
              xRightarrow: "⇒",
              xLeftarrow: "⇐",
              xrightleftharpoons: "⇌",
              xmapsto: "↦",
            }[v];
          var am = mo(arr, ' stretchy="true"');
          return N(
            below !== null
              ? "<munderover>" + am + below + nodeStr(above) + "</munderover>"
              : "<mover>" + am + nodeStr(above) + "</mover>",
          );
        }
        case "phantom": {
          var p1 = this.parseArg();
          return N("<mphantom>" + nodeStr(p1) + "</mphantom>");
        }
        case "vphantom": {
          var p2 = this.parseArg();
          return N('<mpadded width="0"><mphantom>' + nodeStr(p2) + "</mphantom></mpadded>");
        }
        case "hphantom": {
          var p3 = this.parseArg();
          return N(
            '<mpadded height="0" depth="0"><mphantom>' + nodeStr(p3) + "</mphantom></mpadded>",
          );
        }
        case "smash": {
          var p4 = this.parseArg();
          return N('<mpadded height="0" depth="0">' + nodeStr(p4) + "</mpadded>");
        }
        case "hspace":
        case "mspace":
        case "kern":
        case "mkern": {
          var wd = this.rawGroup().replace(/\s/g, "");
          wd = hlen(wd);
          return N('<mspace width="' + wd + '"></mspace>');
        }
        case "not": {
          var nt = this.peek(),
            key = nt ? (nt.k === "c" ? nt.v : nt.v) : "";
          if (nt && NOT[key]) {
            this.i++;
            return N(mo(NOT[key], ' stretchy="false"'));
          }
          var na = this.parseAtom(true);
          return N("<mrow>" + (na ? nodeStr(na) : "") + mo("\u0338") + "</mrow>");
        }
        case "pmod": {
          var pm = this.parseArg();
          return N(
            '<mrow><mspace width="1em"></mspace>' +
              mo("(") +
              '<mi>mod</mi><mspace width="0.3333em"></mspace>' +
              nodeStr(pm) +
              mo(")") +
              "</mrow>",
          );
        }
        case "bmod":
          return N('<mo lspace="0.2778em" rspace="0.2778em">mod</mo>');
        case "mod":
          return N(
            '<mrow><mspace width="1em"></mspace><mi>mod</mi><mspace width="0.3333em"></mspace></mrow>',
          );
        case "substack":
        case "subarray": {
          if (this.isCh("{")) this.i++;
          var rows = this.parseRows(function (t) {
            return t.k === "ch" && t.v === "}";
          });
          if (this.isCh("}")) this.i++;
          return N(table(rows, ["center"], { small: true }));
        }
        case "begin":
          return this.parseEnv();
        case "end": {
          this.err("\\end without \\begin");
          this.rawGroup();
          return null;
        }
        case "\\":
        case "cr": {
          return null;
        }
        case "limits":
        case "nolimits":
          return null;
        case "ce": {
          var cs = this.rawGroup();
          return N(chem(cs, this.depth));
        }
        case "pu": {
          var us = this.textGroup();
          return N("<mtext>" + esc(us) + "</mtext>");
        }
        case "sideset":
        case "prescript":
          return null;
        case "displaystyle":
        case "textstyle":
          return null;
        case "tag":
          return null;
        case "dot":
          return null;
        case "lim":
          return null;
        case "And":
          return N(mo("&"));
        case "colon":
          return N(mo(":"));
        case "ldotp":
          return N(mo("."));
        case "cdotp":
          return N(mo("⋅"));
        case "lq":
          return N(mo("‘"));
        case "rq":
          return N(mo("’"));
        case "hat":
          return null;
      }
      if (SPACE.hasOwnProperty(v)) return N('<mspace width="' + SPACE[v] + '"></mspace>');
      if (v === "mathstrut" || v === "strut") return N("<mspace></mspace>");
      this.err("Unknown command \\" + v);
      return N("<merror><mtext>\\" + esc(v) + "</mtext></merror>");
    };
    function hlen(s) {
      var m = /^(-?[0-9]*\.?[0-9]+)(em|ex|pt|px|mu|cm|mm|in)?$/.exec(s);
      if (!m) return "0.5em";
      var u = m[2] || "em";
      if (u === "mu") {
        return parseFloat(m[1]) / 18 + "em";
      }
      return m[1] + u;
    }
    P.readDelim = function () {
      var t = this.peek();
      if (!t) {
        this.err("Missing delimiter");
        return "";
      }
      this.i++;
      var key = t.k === "c" ? t.v : t.v;
      if (t.k === "ch" && t.v === "{") {
        this.err("Invalid delimiter");
        return "";
      }
      if (DELIM.hasOwnProperty(key)) return DELIM[key];
      this.err("Unknown delimiter " + (t.k === "c" ? "\\" : "") + key);
      return "";
    };
    P.parseRows = function (stop) {
      var rows = [],
        cur = [],
        cell = [];
      var self = this;
      var cellStop = function (t) {
        return stop(t) || (t.k === "ch" && t.v === "&") || (t.k === "c" && t.v === "\\");
      };
      for (;;) {
        cell = this.parseSeq(cellStop);
        cur.push(cell);
        var t = this.peek();
        if (!t) break;
        if (t.k === "ch" && t.v === "&") {
          this.i++;
          continue;
        }
        if (t.k === "c" && t.v === "\\") {
          this.i++;
          if (this.isCh("[")) {
            while (this.peek() && !this.isCh("]")) this.i++;
            if (this.isCh("]")) this.i++;
          }
          rows.push(cur);
          cur = [];
          continue;
        }
        break;
      }
      if (cur.length > 1 || (cur.length === 1 && cur[0].length)) rows.push(cur);
      return rows;
    };
    function table(rows, aligns, o) {
      o = o || {};
      var ncol = 0;
      rows.forEach(function (r) {
        ncol = Math.max(ncol, r.length);
      });
      var al = [];
      for (var i = 0; i < ncol; i++) al.push(aligns[i % aligns.length]);
      var body = rows
        .map(function (r) {
          var cells = [];
          for (var i = 0; i < ncol; i++) {
            var c = r[i] || [],
              h = seqM(c);
            if (o.pad && i % 2 === 1 && c.length && c[0].m.indexOf("<mo") === 0)
              h = '<mrow><mspace width="0.2778em"></mspace>' + c.map(nodeStr).join("") + "</mrow>";
            cells.push("<mtd>" + h + "</mtd>");
          }
          return "<mtr>" + cells.join("") + "</mtr>";
        })
        .join("");
      var at =
        ' columnalign="' +
        al.join(" ") +
        '"' +
        (o.lines ? ' columnlines="' + o.lines + '"' : "") +
        (o.disp ? ' displaystyle="true"' : "");
      var t = "<mtable" + at + ">" + body + "</mtable>";
      if (o.small) t = '<mstyle scriptlevel="1" displaystyle="false">' + t + "</mstyle>";
      return t;
    }
    var MATFENCE = {
      matrix: ["", ""],
      pmatrix: ["(", ")"],
      bmatrix: ["[", "]"],
      Bmatrix: ["{", "}"],
      vmatrix: ["|", "|"],
      Vmatrix: ["‖", "‖"],
      smallmatrix: ["", ""],
      cases: ["{", ""],
      dcases: ["{", ""],
      rcases: ["", "}"],
      array: ["", ""],
      tabular: ["", ""],
    };
    P.parseEnv = function () {
      var name = this.rawGroup().replace(/\*$/, "").trim(),
        spec = null;
      if (name === "array" || name === "tabular" || name === "alignat" || name === "subarray") {
        if (this.isCh("{")) spec = this.rawGroup();
      }
      var self = this;
      var rows = this.parseRows(function (t) {
        return t.k === "c" && t.v === "end";
      });
      if (this.isCmd("end")) {
        this.i++;
        var en = this.rawGroup().replace(/\*$/, "").trim();
        if (en !== name) this.err("\\begin{" + name + "} closed by \\end{" + en + "}");
      } else this.err("Missing \\end{" + name + "}");
      var m;
      if (MATFENCE[name]) {
        var al = ["center"],
          lines = null;
        if (name === "cases" || name === "dcases" || name === "rcases") al = ["left"];
        if (spec) {
          var cols = [],
            ls = [],
            pend = false;
          spec
            .replace(/@\{[^}]*\}/g, "")
            .split("")
            .forEach(function (ch) {
              if (ch === "l" || ch === "c" || ch === "r") {
                cols.push({ l: "left", c: "center", r: "right" }[ch]);
                ls.push(pend ? "solid" : "none");
                pend = false;
              } else if (ch === "|") {
                if (cols.length) ls[ls.length - 1] = ls[ls.length - 1];
                pend = cols.length ? "after" : true;
                if (cols.length) {
                  ls.push("__bar__");
                }
              }
            });
          /* simplified column-line handling: compute 'solid' between columns */
          var al2 = [],
            ln = [],
            last = null;
          var spec2 = spec.replace(/@\{[^}]*\}/g, "").replace(/\s/g, "");
          var colsX = [],
            barsBetween = [];
          var seenCol = false,
            bar = false;
          for (var q = 0; q < spec2.length; q++) {
            var cc = spec2[q];
            if (/[lcr]/.test(cc)) {
              if (seenCol) barsBetween.push(bar ? "solid" : "none");
              colsX.push({ l: "left", c: "center", r: "right" }[cc]);
              seenCol = true;
              bar = false;
            } else if (cc === "|") {
              bar = true;
            }
          }
          if (colsX.length) {
            al = colsX;
            if (barsBetween.indexOf("solid") >= 0) lines = barsBetween.join(" ");
          }
        }
        var disp = name === "cases" || name === "dcases" || name === "rcases" ? false : false;
        var tb = table(rows, al, { small: name === "smallmatrix", lines: lines, disp: disp });
        var f = MATFENCE[name];
        m =
          f[0] || f[1]
            ? "<mrow>" +
              (f[0] ? mo(f[0], ' fence="true" stretchy="true" form="prefix"') : "") +
              tb +
              (f[1] ? mo(f[1], ' fence="true" stretchy="true" form="postfix"') : "") +
              "</mrow>"
            : tb;
        if (name === "cases" || name === "dcases" || name === "rcases")
          m = m.replace("<mtable", "<mtable").replace(/<mtd>/g, "<mtd>");
      } else if (/^(aligned|align|alignat|split|eqnarray|flalign|alignedat)$/.test(name)) {
        m = table(rows, ["right", "left"], { pad: true, disp: true });
      } else if (/^(gather|gathered|equation|multline|displaymath|math)$/.test(name)) {
        m = table(rows, ["center"], { disp: true });
      } else if (/^(Bmatrixx)$/.test(name)) {
        m = table(rows, ["center"]);
      } else {
        this.err("Unknown environment " + name);
        m = table(rows, ["center"]);
      }
      return N(m);
    };
    /* ---------- chemistry (\ce) ---------- */
    function chem(src, depth) {
      depth = depth || 0;
      var i = 0,
        out = [];
      function sub(tex) {
        var p = new Parser(tokenize(tex), depth + 1);
        return seqM(p.parseSeq(null));
      }
      function num() {
        var s = "";
        while (i < src.length && /[0-9]/.test(src[i])) s += src[i++];
        return s;
      }
      function readBrace() {
        var d = 1,
          s = "";
        i++;
        while (i < src.length && d) {
          var c = src[i++];
          if (c === "{") d++;
          else if (c === "}") {
            d--;
            if (!d) break;
          }
          s += c;
        }
        return s;
      }
      function charge(s) {
        return s.replace(/-/g, "−");
      }
      function species(close) {
        var nodes = [];
        while (i < src.length) {
          var c = src[i];
          if (close && c === close) break;
          if (
            /\s/.test(c) ||
            (c === "-" && src[i + 1] === ">") ||
            c === "<" ||
            (c === "=" && src[i + 1] === ">")
          )
            break;
          if (c === "(" && /^\((aq|s|l|g|cr)\)/.test(src.slice(i))) {
            var st = /^\((aq|s|l|g|cr)\)/.exec(src.slice(i))[0];
            i += st.length;
            nodes.push("<mtext>" + st + "</mtext>");
            continue;
          }
          if (c === "(" || c === "[") {
            var cl = c === "(" ? ")" : "]";
            i++;
            var inner = species(cl);
            if (src[i] === cl) i++;
            var NS = ' stretchy="false" lspace="0" rspace="0"';
            var grp = "<mrow>" + mo(c, NS) + inner + mo(cl, NS) + "</mrow>";
            var d = num();
            nodes.push(d ? "<msub>" + grp + "<mn>" + d + "</mn></msub>" : grp);
            continue;
          }
          if (c === "^" || c === "_") {
            var up = c === "^";
            i++;
            var t;
            if (src[i] === "{") t = readBrace();
            else {
              t = "";
              while (i < src.length && /[0-9+\-]/.test(src[i])) t += src[i++];
            }
            var tm =
              "<mrow>" +
              (/^[0-9]*[+\-]$/.test(t)
                ? "<mn>" +
                  t.replace(/[+\-]$/, "") +
                  "</mn>" +
                  mo(t.slice(-1) === "-" ? "−" : "+", ' lspace="0" rspace="0"')
                : sub(t)) +
              "</mrow>";
            if (nodes.length && !nodes.pre) {
              var b = nodes.pop();
              nodes.push(up ? "<msup>" + b + tm + "</msup>" : "<msub>" + b + tm + "</msub>");
            } else {
              nodes.push(
                up
                  ? "<msup><mrow></mrow>" + tm + "</msup>"
                  : "<msub><mrow></mrow>" + tm + "</msub>",
              );
            }
            continue;
          }
          if (c === "*" || (c === "." && !/[0-9]/.test(src[i + 1] || ""))) {
            i++;
            nodes.push(mo("⋅"));
            continue;
          }
          if (/[A-Z]/.test(c)) {
            var el = c;
            i++;
            if (
              i < src.length &&
              /[a-z]/.test(src[i]) &&
              !/^[a-z]{2,}\b/.test(src.slice(i) + "  ")
            ) {
              el += src[i++];
            } else if (i < src.length && /[a-z]/.test(src[i])) {
              el += src[i++];
            }
            var base = '<mi mathvariant="normal">' + el + "</mi>",
              d2 = num();
            nodes.push(d2 ? "<msub>" + base + "<mn>" + d2 + "</mn></msub>" : base);
            continue;
          }
          if (/[0-9]/.test(c)) {
            nodes.push("<mn>" + num() + "</mn>");
            continue;
          }
          if (c === "+" || c === "-") {
            i++;
            var ch2 = '<mo lspace="0" rspace="0">' + (c === "-" ? "−" : "+") + "</mo>";
            if (nodes.length) {
              var bb = nodes.pop();
              nodes.push("<msup>" + bb + ch2 + "</msup>");
            } else nodes.push(ch2);
            continue;
          }
          if (/[a-z]/.test(c)) {
            var w = "";
            while (i < src.length && /[a-z]/.test(src[i])) w += src[i++];
            nodes.push('<mi mathvariant="normal">' + w + "</mi>");
            continue;
          }
          i++;
        }
        return nodes.join("");
      }
      while (i < src.length) {
        var c = src[i];
        if (/\s/.test(c)) {
          i++;
          continue;
        }
        if (
          src.startsWith("<=>", i) ||
          src.startsWith("<->", i) ||
          src.startsWith("->", i) ||
          src.startsWith("<-", i) ||
          src.startsWith("=>", i)
        ) {
          var ar = src.startsWith("<=>", i)
            ? ["⇌", 3]
            : src.startsWith("<->", i)
              ? ["↔", 3]
              : src.startsWith("->", i)
                ? ["→", 2]
                : src.startsWith("<-", i)
                  ? ["←", 2]
                  : ["⇒", 2];
          i += ar[1];
          var over = null,
            under = null;
          if (src[i] === "[") {
            var e = src.indexOf("]", i);
            over = src.slice(i + 1, e);
            i = e + 1;
            if (src[i] === "[") {
              var e2 = src.indexOf("]", i);
              under = src.slice(i + 1, e2);
              i = e2 + 1;
            }
          }
          var am = mo(ar[0], ' stretchy="true"');
          out.push(
            over !== null
              ? under !== null
                ? "<munderover>" + am + sub(under) + sub(over) + "</munderover>"
                : "<mover>" + am + sub(over) + "</mover>"
              : '<mo stretchy="true" lspace="0.28em" rspace="0.28em">' + ar[0] + "</mo>",
          );
          continue;
        }
        if (c === "+") {
          i++;
          out.push(mo("+"));
          continue;
        }
        if (c === "^" || c === "_") {
          out.push(species(null));
          continue;
        }
        var coef = num();
        if (coef) {
          out.push("<mn>" + coef + '</mn><mspace width="0.1667em"></mspace>');
        }
        var sp = species(null);
        if (!sp && i < src.length && !coef) {
          i++;
        }
        out.push(sp);
      }
      return "<mrow>" + out.join("") + "</mrow>";
    }
    /* ---------- public API ---------- */
    function convert(tex, opts) {
      opts = opts || {};
      var p = new Parser(tokenize(tex));
      var nodes = p.parseSeq(null);
      while (p.i < p.t.length) {
        p.err("Unexpected " + (p.peek().k === "c" ? "\\" : "") + p.peek().v);
        p.i++;
        nodes = nodes.concat(p.parseSeq(null));
      }
      var body = nodes.length ? nodes.map(nodeStr).join("") : "";
      var holes = (tex.match(/▢/g) || []).length;
      var m =
        '<math xmlns="http://www.w3.org/1998/Math/MathML" display="' +
        (opts.inline ? "inline" : "block") +
        '"><semantics><mrow>' +
        body +
        '</mrow><annotation encoding="application/x-tex">' +
        esc(tex) +
        "</annotation></semantics></math>";
      return { mathml: m, errors: p.errs, holes: holes };
    }
    /* ---------- sanitiser ---------- */
    var EL =
      "math semantics annotation mrow mi mn mo mtext mspace ms mfrac msqrt mroot msub msup msubsup munder mover munderover mmultiscripts mprescripts none mtable mtr mtd mstyle mpadded mphantom merror menclose".split(
        " ",
      );
    var AT =
      "display mathvariant mathcolor mathbackground mathsize displaystyle scriptlevel stretchy symmetric largeop movablelimits accent accentunder fence separator form lspace rspace minsize maxsize linethickness notation width height depth voffset lquote rquote columnalign rowalign columnspan rowspan align columnlines rowlines frame dir xmlns class encoding".split(
        " ",
      );
    function sanitize(html) {
      var doc = new DOMParser().parseFromString("<!DOCTYPE html><body>" + html, "text/html"),
        root = doc.body,
        mathEl = null;
      function walk(n) {
        for (var c = n.firstChild; c; ) {
          var nx = c.nextSibling;
          if (c.nodeType === 1) {
            var nm = c.localName.toLowerCase();
            if (EL.indexOf(nm) < 0 || c.namespaceURI !== "http://www.w3.org/1998/Math/MathML") {
              n.removeChild(c);
            } else {
              [].slice.call(c.attributes).forEach(function (a) {
                var an = a.name.toLowerCase(),
                  v = a.value;
                if (AT.indexOf(an) < 0) c.removeAttribute(a.name);
                else if (an === "encoding") {
                  if (!(nm === "annotation" && v === "application/x-tex"))
                    c.removeAttribute(a.name);
                } else if (an === "class") {
                  var ok = v
                    .split(/\s+/)
                    .filter(function (x) {
                      return /^mm-[a-z]{1,8}$/.test(x);
                    })
                    .join(" ");
                  if (ok) c.setAttribute("class", ok);
                  else c.removeAttribute("class");
                } else if (an === "xmlns") {
                  if (v !== "http://www.w3.org/1998/Math/MathML") c.removeAttribute(a.name);
                } else if (!/^[A-Za-z0-9#%.\s\-+,_]{0,80}$/.test(v)) c.removeAttribute(a.name);
              });
              walk(c);
            }
          } else if (c.nodeType !== 3) n.removeChild(c);
          c = nx;
        }
      }
      walk(root);
      mathEl = root.querySelector("math");
      return mathEl;
    }
    /* pretty-print DOM -> XML string */
    function pretty(el, depth, clean) {
      depth = depth || 0;
      var pad = new Array(depth + 1).join("  ");
      if (el.nodeType === 3) return esc(el.nodeValue);
      var nm = el.localName,
        at = "";
      [].slice.call(el.attributes).forEach(function (a) {
        if (a.name === "class" && clean) return;
        at += " " + a.name + '="' + esc(a.value) + '"';
      });
      if (nm === "math" && !/xmlns=/.test(at))
        at = ' xmlns="http://www.w3.org/1998/Math/MathML"' + at;
      var kids = [].slice.call(el.childNodes).filter(function (c) {
        return (
          c.nodeType === 1 ||
          (c.nodeType === 3 && c.nodeValue.trim() !== "") ||
          (c.nodeType === 3 && el.localName === "mtext")
        );
      });
      if (!kids.length) return pad + "<" + nm + at + "/>";
      if (
        kids.every(function (c) {
          return c.nodeType === 3;
        })
      )
        return (
          pad +
          "<" +
          nm +
          at +
          ">" +
          kids
            .map(function (c) {
              return esc(c.nodeValue);
            })
            .join("") +
          "</" +
          nm +
          ">"
        );
      return (
        pad +
        "<" +
        nm +
        at +
        ">\n" +
        kids
          .map(function (c) {
            return c.nodeType === 3
              ? pad + "  " + esc(c.nodeValue.trim())
              : pretty(c, depth + 1, clean);
          })
          .join("\n") +
        "\n" +
        pad +
        "</" +
        nm +
        ">"
      );
    }
    /* presentational enhancement for engines lacking mtable alignment (adds mm-* classes) */
    function enhance(math) {
      [].forEach.call(math.querySelectorAll("mtable"), function (t) {
        var ca = (t.getAttribute("columnalign") || "center").split(/\s+/),
          cl = (t.getAttribute("columnlines") || "").split(/\s+/).filter(Boolean);
        [].forEach.call(t.children, function (tr) {
          if (tr.localName !== "mtr") return;
          var col = 0;
          [].forEach.call(tr.children, function (td) {
            if (td.localName !== "mtd") return;
            var a = td.getAttribute("columnalign") || ca[col % ca.length];
            var cls = td.getAttribute("class") || "";
            if (a === "left") cls += " mm-l";
            else if (a === "right") cls += " mm-r";
            if (col > 0 && cl[col - 1] === "solid") cls += " mm-bl";
            if (cls.trim()) td.setAttribute("class", cls.trim());
            col += parseInt(td.getAttribute("columnspan") || "1", 10) || 1;
          });
        });
      });
      return math;
    }
    g.MML = { convert: convert, sanitize: sanitize, pretty: pretty, enhance: enhance, esc: esc };
  })(window);
}
