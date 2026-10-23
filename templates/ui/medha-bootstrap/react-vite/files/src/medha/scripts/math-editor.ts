// @ts-nocheck -- the theme's own script, kept byte for byte so its behaviour does not drift.
// Ported from the Medha theme by medha-starter. Source: assets/math-editor.js, unchanged inside this function.
// The theme runs it once per page load; here it runs each time its page mounts (see
// src/components/medha/page-scripts.ts, which also removes its global listeners afterwards).
export default function mathEditorScript(): void {
  (function () {
    "use strict";
    var R = String.raw,
      $ = function (id) {
        return document.getElementById(id);
      };
    if (!$("mx-tex") || !window.MML) return;
    var KEY = "medha-mathml-editor-v1",
      SAVED = "medha-mathml-saved-v1";
    function L(s) {
      return s
        .split("\n")
        .map(function (x) {
          return x.trim();
        })
        .filter(Boolean);
    }
    /* ---------- palette ---------- */
    var PAL = [
      {
        c: "Algebra",
        i: L(R`
x^{▢}
x_{▢}
x_{▢}^{▢}
\frac{▢}{▢}
\dfrac{▢}{▢}
\sqrt{▢}
\sqrt[▢]{▢}
\left(▢\right)
\left[▢\right]
\left\{▢\right\}
\left|▢\right|
\left\lVert ▢\right\rVert
\lfloor ▢\rfloor
\lceil ▢\rceil
\pm
\mp
\times
\div
\cdot
\neq
\leq
\geq
\approx
\infty
n!
\binom{▢}{▢}
\sqrt[3]{▢}
\frac{-b\pm\sqrt{b^{2}-4ac}}{2a}
\sum_{i=1}^{n}▢
\prod_{i=1}^{n}▢
a_{1},a_{2},\ldots,a_{n}
|▢|
\overline{▢}
\mathrm{e}^{▢}
\log_{▢}▢
\%
`),
      },
      {
        c: "Greek",
        i: L(R`
\alpha
\beta
\gamma
\delta
\epsilon
\varepsilon
\zeta
\eta
\theta
\vartheta
\iota
\kappa
\lambda
\mu
\nu
\xi
\pi
\varpi
\rho
\varrho
\sigma
\varsigma
\tau
\upsilon
\phi
\varphi
\chi
\psi
\omega
\Gamma
\Delta
\Theta
\Lambda
\Xi
\Pi
\Sigma
\Upsilon
\Phi
\Psi
\Omega
`),
      },
      {
        c: "Operators",
        i: L(R`
\pm
\mp
\times
\div
\cdot
\ast
\star
\circ
\bullet
\oplus
\ominus
\otimes
\oslash
\odot
\cup
\cap
\setminus
\wedge
\vee
\sqcup
\sqcap
\uplus
\dagger
=
\neq
\equiv
\approx
\cong
\simeq
\sim
\propto
<
>
\leq
\geq
\ll
\gg
\prec
\succ
\preceq
\succeq
\parallel
\perp
\mid
\nmid
\triangleq
\coloneqq
`),
      },
      {
        c: "Arrows",
        i: L(R`
\to
\leftarrow
\leftrightarrow
\Rightarrow
\Leftarrow
\Leftrightarrow
\longrightarrow
\longleftarrow
\longleftrightarrow
\Longrightarrow
\Longleftarrow
\iff
\implies
\mapsto
\longmapsto
\uparrow
\downarrow
\updownarrow
\Uparrow
\Downarrow
\nearrow
\searrow
\swarrow
\nwarrow
\hookrightarrow
\hookleftarrow
\rightleftharpoons
\rightharpoonup
\leftharpoonup
\leadsto
\twoheadrightarrow
\nrightarrow
\xrightarrow{▢}
\xleftarrow{▢}
\xrightarrow[▢]{▢}
\overset{▢}{\longrightarrow}
`),
      },
      {
        c: "Calculus",
        i: L(R`
\int_{▢}^{▢}▢\,dx
\int▢\,dx
\iint_{D}▢\,dA
\iiint_{V}▢\,dV
\oint_{C}▢\cdot d\mathbf{r}
\oiint_{S}▢\,dS
\lim_{x\to▢}▢
\lim_{n\to\infty}▢
\sum_{n=0}^{\infty}▢
\prod_{n=1}^{\infty}▢
\frac{d}{dx}
\frac{d▢}{d▢}
\frac{d^{2}▢}{d▢^{2}}
\frac{\partial ▢}{\partial ▢}
\frac{\partial^{2} ▢}{\partial ▢^{2}}
\partial
\nabla
\nabla\cdot\vec{F}
\nabla\times\vec{F}
\nabla^{2}
\Delta
f'(x)
f''(x)
f^{(n)}(x)
\dot{x}
\ddot{x}
\bigcup_{i=1}^{n}▢
\bigcap_{i=1}^{n}▢
\bigoplus
\bigotimes
\sup
\inf
\limsup
\liminf
\left.▢\right|_{x=a}
\int_{-\infty}^{\infty}
\varepsilon\to0
\mathrm{d}x
`),
      },
      {
        c: "Trigonometry",
        i: L(R`
\sin
\cos
\tan
\cot
\sec
\csc
\arcsin
\arccos
\arctan
\sinh
\cosh
\tanh
\coth
\log
\ln
\lg
\exp
\log_{▢}
\sin^{2}\theta
\cos^{2}\theta
\sin(▢)
\cos(▢)
\tan(▢)
\sin\theta
\cos\theta
\tan\theta
e^{i\theta}
\operatorname{atan2}
\operatorname{sgn}
\operatorname{▢}
\arg
\deg
\bmod
\pmod{▢}
`),
      },
      {
        c: "Linear algebra",
        i: L(R`
\begin{pmatrix}▢&▢\\▢&▢\end{pmatrix}
\begin{bmatrix}▢&▢\\▢&▢\end{bmatrix}
\begin{vmatrix}▢&▢\\▢&▢\end{vmatrix}
\begin{Vmatrix}▢&▢\\▢&▢\end{Vmatrix}
\begin{Bmatrix}▢&▢\\▢&▢\end{Bmatrix}
\begin{matrix}▢&▢\\▢&▢\end{matrix}
\begin{pmatrix}▢&▢&▢\\▢&▢&▢\\▢&▢&▢\end{pmatrix}
\begin{bmatrix}1&0\\0&1\end{bmatrix}
\begin{bmatrix}a_{11}&\cdots&a_{1n}\\\vdots&\ddots&\vdots\\a_{m1}&\cdots&a_{mn}\end{bmatrix}
\begin{pmatrix}▢\\▢\\▢\end{pmatrix}
\begin{pmatrix}▢&▢&▢\end{pmatrix}
\left[\begin{array}{cc|c}▢&▢&▢\\▢&▢&▢\end{array}\right]
\begin{smallmatrix}▢&▢\\▢&▢\end{smallmatrix}
\vec{▢}
\mathbf{▢}
\overrightarrow{AB}
A^{T}
A^{-1}
A^{\dagger}
\det(A)
\operatorname{tr}(A)
\operatorname{rank}(A)
\langle ▢,▢\rangle
\lVert ▢\rVert
\otimes
\cdots
\vdots
\ddots
\hat{▢}
\mathbb{R}^{n}
A\vec{x}=\vec{b}
\vec{u}\cdot\vec{v}
\vec{u}\times\vec{v}
`),
      },
      {
        c: "Sets & logic",
        i: L(R`
\in
\notin
\ni
\subset
\subseteq
\supset
\supseteq
\nsubseteq
\subsetneq
\cup
\cap
\setminus
\emptyset
\varnothing
\mathbb{N}
\mathbb{Z}
\mathbb{Q}
\mathbb{R}
\mathbb{C}
\mathbb{P}
\mathcal{P}(▢)
\forall
\exists
\nexists
\neg
\land
\lor
\Rightarrow
\Leftrightarrow
\therefore
\because
\vdash
\models
\top
\bot
\{x\mid ▢\}
\{▢,▢,▢\}
|A|
\overline{A}
A^{c}
A\times B
\bigcup_{i\in I}A_{i}
\bigcap_{i\in I}A_{i}
\aleph_{0}
`),
      },
      {
        c: "Accents",
        i: L(R`
\hat{▢}
\bar{▢}
\vec{▢}
\dot{▢}
\ddot{▢}
\tilde{▢}
\check{▢}
\breve{▢}
\acute{▢}
\grave{▢}
\mathring{▢}
\widehat{▢}
\widetilde{▢}
\overline{▢}
\underline{▢}
\overrightarrow{▢}
\overleftarrow{▢}
\overbrace{▢}^{▢}
\underbrace{▢}_{▢}
\overset{▢}{▢}
\underset{▢}{▢}
\boxed{▢}
\cancel{▢}
\bcancel{▢}
\xcancel{▢}
\sout{▢}
\phantom{▢}
\color{red}{▢}
\textcolor{#b45309}{▢}
`),
      },
      {
        c: "Fonts & text",
        i: L(R`
\mathbb{A}
\mathbb{R}
\mathcal{A}
\mathcal{L}
\mathfrak{g}
\mathfrak{A}
\mathbf{A}
\mathbf{x}
\boldsymbol{\alpha}
\mathit{abc}
\mathrm{abc}
\mathsf{A}
\mathtt{A}
\text{▢}
\text{ if }
\text{ and }
\text{ for all }
\operatorname{▢}
\mathrm{d}
\mathrm{e}
\mathrm{i}
\,
\;
\quad
\qquad
\!
\hspace{1em}
`),
      },
      {
        c: "Systems & align",
        i: L(R`
f(x)=\begin{cases}▢&\text{if }▢\\▢&\text{otherwise}\end{cases}
\begin{cases}▢\\▢\end{cases}
\begin{cases}x+y=▢\\x-y=▢\end{cases}
\begin{aligned}▢&=▢\\&=▢\end{aligned}
\begin{aligned}▢&=▢\\▢&=▢\\▢&=▢\end{aligned}
\begin{gathered}▢\\▢\end{gathered}
\begin{array}{ll}▢&▢\\▢&▢\end{array}
\begin{array}{c|c}▢&▢\\\hline▢&▢\end{array}
\left\{\begin{array}{l}▢\\▢\end{array}\right.
\begin{rcases}▢\\▢\end{rcases}
\substack{▢\\▢}
\sum_{\substack{i<n\\j<m}}▢
\begin{split}▢&=▢\\&=▢\end{split}
`),
      },
      {
        c: "Statistics",
        i: L(R`
\mathbb{E}[X]
\mathbb{E}\left[X^{2}\right]
\operatorname{Var}(X)
\operatorname{Cov}(X,Y)
\operatorname{Corr}(X,Y)
P(A\mid B)
P(A\cap B)
\Pr(X=x)
\bar{x}
\hat{\beta}
\hat{\sigma}^{2}
\sigma^{2}
\mu
X\sim\mathcal{N}(\mu,\sigma^{2})
\chi^{2}
\frac{\sum_{i=1}^{n}(x_i-\bar{x})^{2}}{n-1}
\frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^{2}}{2\sigma^{2}}}
\binom{n}{k}p^{k}(1-p)^{n-k}
\frac{\bar{x}-\mu}{s/\sqrt{n}}
r=\frac{\operatorname{Cov}(X,Y)}{\sigma_X\sigma_Y}
\overline{X}
\mathrm{SE}
H_{0}
H_{1}
\rho_{XY}
\sum_{i=1}^{n}x_{i}
\hat{y}=\beta_{0}+\beta_{1}x
\mathrm{MSE}
\lambda e^{-\lambda x}
`),
      },
      {
        c: "Physics & units",
        i: L(R`
\hbar
\vec{F}=m\vec{a}
E=mc^{2}
\mathrm{m\,s^{-1}}
\mathrm{kg\,m^{2}\,s^{-2}}
\mathrm{N\cdot m}
\mu_{0}
\varepsilon_{0}
\langle\psi|
|\psi\rangle
\langle\phi|\psi\rangle
\hat{H}\psi=E\psi
i\hbar\frac{\partial}{\partial t}\Psi
\Delta E\,\Delta t\geq\frac{\hbar}{2}
\nabla^{2}
\partial_{t}
\Delta x
^{\circ}\mathrm{C}
{}^{\circ}
\mathrm{\mu m}
\mathrm{\Omega}
\hbar\omega
\vec{E}
\vec{B}
\frac{1}{2}mv^{2}
\oint\vec{B}\cdot d\vec{l}=\mu_{0}I
G_{\mu\nu}+\Lambda g_{\mu\nu}=\frac{8\pi G}{c^{4}}T_{\mu\nu}
\frac{\mathrm{d}\vec{p}}{\mathrm{d}t}
\gamma=\frac{1}{\sqrt{1-v^{2}/c^{2}}}
`),
      },
      {
        c: "Chemistry",
        i: L(R`
\ce{H2O}
\ce{CO2}
\ce{H2SO4}
\ce{CH3COOH}
\ce{NaCl(aq)}
\ce{Ca(OH)2}
\ce{SO4^{2-}}
\ce{Fe^{3+}}
\ce{NH4+}
\ce{2H2 + O2 -> 2H2O}
\ce{N2 + 3H2 <=> 2NH3}
\ce{CH4 + 2O2 -> CO2 + 2H2O}
\ce{A ->[\Delta] B}
\ce{A ->[catalyst][heat] B}
\ce{CuSO4*5H2O}
\mathrm{pH}=-\log_{10}\left[\mathrm{H}^{+}\right]
\Delta H
\Delta G=\Delta H-T\Delta S
K_{\mathrm{eq}}=\frac{[\mathrm{C}]^{c}[\mathrm{D}]^{d}}{[\mathrm{A}]^{a}[\mathrm{B}]^{b}}
^{14}_{6}\mathrm{C}
{}^{238}_{92}\mathrm{U}\to{}^{234}_{90}\mathrm{Th}+{}^{4}_{2}\mathrm{He}
\rightleftharpoons
\xrightarrow{\Delta}
\xrightarrow{\text{catalyst}}
\uparrow
\downarrow
\mathrm{mol\,L^{-1}}
`),
      },
      {
        c: "Geometry",
        i: L(R`
\angle ABC
\measuredangle ABC
\triangle ABC
\perp
\parallel
\cong
\sim
\overline{AB}
\overrightarrow{AB}
\widehat{AB}
\degree
90^{\circ}
\pi r^{2}
2\pi r
\frac{4}{3}\pi r^{3}
a^{2}+b^{2}=c^{2}
\sqrt{a^{2}+b^{2}}
\frac{1}{2}bh
\sin\theta=\frac{\text{opposite}}{\text{hypotenuse}}
(x-h)^{2}+(y-k)^{2}=r^{2}
\frac{x^{2}}{a^{2}}+\frac{y^{2}}{b^{2}}=1
y=mx+c
d=\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}
\odot
\square
\diamond
`),
      },
      {
        c: "Number theory",
        i: L(R`
n!
\binom{n}{k}
\lfloor ▢\rfloor
\lceil ▢\rceil
a\equiv b\pmod{n}
a\mid b
a\nmid b
\gcd(a,b)
\operatorname{lcm}(a,b)
\varphi(n)
\zeta(s)
\pi(x)
\sum_{p\text{ prime}}\frac{1}{p}
\prod_{p}\left(1-p^{-s}\right)^{-1}
\sum_{k=0}^{n}\binom{n}{k}
\sum_{d\mid n}d
n\in\mathbb{N}
2^{p}-1
F_{n}=F_{n-1}+F_{n-2}
\frac{n(n+1)}{2}
\sum_{k=1}^{n}k^{2}=\frac{n(n+1)(2n+1)}{6}
x\sim y
\mathbb{Z}/n\mathbb{Z}
\underbrace{1+1+\cdots+1}_{n}
a\equiv b\ (\mathrm{mod}\ n)
\Gamma(z)
`),
      },
      {
        c: "Symbols",
        i: L(R`
\infty
\partial
\nabla
\hbar
\ell
\wp
\Re
\Im
\aleph
\prime
\dagger
\ddagger
\S
\P
\copyright
\checkmark
\star
\ldots
\cdots
\vdots
\ddots
\angle
\degree
\blacksquare
\Box
\diamond
\clubsuit
\diamondsuit
\heartsuit
\spadesuit
\flat
\natural
\sharp
\imath
\jmath
\eth
\mho
\forall
\exists
\therefore
\because
\euro
\pounds
\yen
`),
      },
    ];
    /* ---------- examples ---------- */
    var EX = [
      ["Algebra", "Quadratic formula", R`x=\frac{-b\pm\sqrt{b^{2}-4ac}}{2a}`],
      ["Algebra", "Binomial theorem", R`(x+y)^{n}=\sum_{k=0}^{n}\binom{n}{k}x^{n-k}y^{k}`],
      ["Algebra", "Geometric series", R`\sum_{k=0}^{\infty}ar^{k}=\frac{a}{1-r},\qquad |r|<1`],
      [
        "Algebra",
        "Partial fractions",
        R`\frac{1}{(x-a)(x-b)}=\frac{1}{a-b}\left(\frac{1}{x-a}-\frac{1}{x-b}\right)`,
      ],
      ["Trigonometry", "Pythagorean identity", R`\sin^{2}\theta+\cos^{2}\theta=1`],
      [
        "Trigonometry",
        "Angle sum",
        R`\cos(\alpha\pm\beta)=\cos\alpha\cos\beta\mp\sin\alpha\sin\beta`,
      ],
      ["Trigonometry", "Euler's formula", R`e^{i\theta}=\cos\theta+i\sin\theta`],
      ["Trigonometry", "Law of cosines", R`c^{2}=a^{2}+b^{2}-2ab\cos\gamma`],
      ["Calculus", "Fundamental theorem", R`\int_{a}^{b}f'(x)\,dx=f(b)-f(a)`],
      ["Calculus", "Taylor series", R`f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(a)}{n!}(x-a)^{n}`],
      ["Calculus", "Definition of derivative", R`f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}`],
      ["Calculus", "Gaussian integral", R`\int_{-\infty}^{\infty}e^{-x^{2}}\,dx=\sqrt{\pi}`],
      ["Calculus", "Integration by parts", R`\int u\,dv=uv-\int v\,du`],
      [
        "Calculus",
        "Double integral",
        R`\iint_{D}f(x,y)\,dA=\int_{a}^{b}\int_{c}^{d}f(x,y)\,dy\,dx`,
      ],
      [
        "Differential equations",
        "Heat equation",
        R`\frac{\partial u}{\partial t}=\alpha\,\nabla^{2}u`,
      ],
      [
        "Differential equations",
        "Wave equation",
        R`\frac{\partial^{2}u}{\partial t^{2}}=c^{2}\,\frac{\partial^{2}u}{\partial x^{2}}`,
      ],
      [
        "Differential equations",
        "Maxwell's equations",
        R`\begin{aligned}\nabla\cdot\vec{E}&=\frac{\rho}{\varepsilon_{0}}\\\nabla\cdot\vec{B}&=0\\\nabla\times\vec{E}&=-\frac{\partial\vec{B}}{\partial t}\\\nabla\times\vec{B}&=\mu_{0}\vec{J}+\mu_{0}\varepsilon_{0}\frac{\partial\vec{E}}{\partial t}\end{aligned}`,
      ],
      ["Linear algebra", "Determinant (2×2)", R`\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc`],
      [
        "Linear algebra",
        "Eigenvalue equation",
        R`A\vec{v}=\lambda\vec{v},\qquad \det(A-\lambda I)=0`,
      ],
      [
        "Linear algebra",
        "Matrix product",
        R`\begin{bmatrix}a&b\\c&d\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}=\begin{bmatrix}ax+by\\cx+dy\end{bmatrix}`,
      ],
      [
        "Linear algebra",
        "Augmented system",
        R`\left[\begin{array}{cc|c}1&2&5\\3&4&6\end{array}\right]`,
      ],
      [
        "Statistics",
        "Normal distribution",
        R`f(x)=\frac{1}{\sigma\sqrt{2\pi}}\,e^{-\frac{(x-\mu)^{2}}{2\sigma^{2}}}`,
      ],
      ["Statistics", "Bayes' theorem", R`P(A\mid B)=\frac{P(B\mid A)\,P(A)}{P(B)}`],
      [
        "Statistics",
        "Variance",
        R`\operatorname{Var}(X)=\mathbb{E}\left[X^{2}\right]-\left(\mathbb{E}[X]\right)^{2}`,
      ],
      ["Statistics", "Sample mean", R`\bar{x}=\frac{1}{n}\sum_{i=1}^{n}x_{i}`],
      ["Physics", "Mass–energy", R`E=mc^{2}`],
      [
        "Physics",
        "Schrödinger equation",
        R`i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t)=\hat{H}\Psi(\mathbf{r},t)`,
      ],
      [
        "Physics",
        "Einstein field equations",
        R`G_{\mu\nu}+\Lambda g_{\mu\nu}=\frac{8\pi G}{c^{4}}T_{\mu\nu}`,
      ],
      ["Physics", "Lorentz factor", R`\gamma=\frac{1}{\sqrt{1-\frac{v^{2}}{c^{2}}}}`],
      ["Chemistry", "Water formation", R`\ce{2H2 + O2 -> 2H2O}`],
      ["Chemistry", "Haber process", R`\ce{N2 + 3H2 <=> 2NH3}`],
      [
        "Chemistry",
        "Equilibrium constant",
        R`K_{\mathrm{eq}}=\frac{[\mathrm{C}]^{c}[\mathrm{D}]^{d}}{[\mathrm{A}]^{a}[\mathrm{B}]^{b}}`,
      ],
      [
        "Chemistry",
        "Alpha decay",
        R`{}^{238}_{92}\mathrm{U}\to{}^{234}_{90}\mathrm{Th}+{}^{4}_{2}\mathrm{He}`,
      ],
      ["Chemistry", "pH", R`\mathrm{pH}=-\log_{10}\left[\mathrm{H}^{+}\right]`],
      [
        "Logic & sets",
        "Epsilon–delta limit",
        R`\forall\varepsilon>0\ \exists\delta>0:\ |x-a|<\delta\Rightarrow|f(x)-f(a)|<\varepsilon`,
      ],
      ["Logic & sets", "De Morgan's law", R`\overline{A\cup B}=\overline{A}\cap\overline{B}`],
      [
        "Logic & sets",
        "Subset definition",
        R`A\subseteq B\iff\forall x\,(x\in A\Rightarrow x\in B)`,
      ],
      ["Number theory", "Basel problem", R`\sum_{n=1}^{\infty}\frac{1}{n^{2}}=\frac{\pi^{2}}{6}`],
      ["Number theory", "Euler product", R`\zeta(s)=\prod_{p\text{ prime}}\frac{1}{1-p^{-s}}`],
      ["Number theory", "Fermat's little theorem", R`a^{p-1}\equiv1\pmod{p}`],
      [
        "Number theory",
        "Stirling's approximation",
        R`n!\sim\sqrt{2\pi n}\left(\frac{n}{e}\right)^{n}`,
      ],
      ["Number theory", "Euler's identity", R`e^{i\pi}+1=0`],
      ["Geometry", "Pythagorean theorem", R`a^{2}+b^{2}=c^{2}`],
      ["Geometry", "Sphere volume", R`V=\frac{4}{3}\pi r^{3}`],
      ["Geometry", "Heron's formula", R`A=\sqrt{s(s-a)(s-b)(s-c)},\quad s=\frac{a+b+c}{2}`],
      ["Piecewise", "Absolute value", R`|x|=\begin{cases}x,&x\geq0\\-x,&x<0\end{cases}`],
      [
        "Piecewise",
        "Sign function",
        R`\operatorname{sgn}(x)=\begin{cases}-1&\text{if }x<0\\0&\text{if }x=0\\1&\text{if }x>0\end{cases}`,
      ],
      [
        "Complex analysis",
        "Cauchy integral formula",
        R`f(a)=\frac{1}{2\pi i}\oint_{\gamma}\frac{f(z)}{z-a}\,dz`,
      ],
      [
        "Complex analysis",
        "Fourier transform",
        R`\hat{f}(\xi)=\int_{-\infty}^{\infty}f(x)\,e^{-2\pi i x\xi}\,dx`,
      ],
      [
        "Vector calculus",
        "Divergence theorem",
        R`\oiint_{S}\vec{F}\cdot d\vec{S}=\iiint_{V}\nabla\cdot\vec{F}\,dV`,
      ],
      [
        "Vector calculus",
        "Stokes' theorem",
        R`\oint_{C}\vec{F}\cdot d\vec{r}=\iint_{S}\left(\nabla\times\vec{F}\right)\cdot d\vec{S}`,
      ],
    ];
    /* ---------- state & rendering ---------- */
    var tex = $("mx-tex"),
      prev = $("mx-prev"),
      src = $("mx-src"),
      status = $("mx-status"),
      inline = false,
      size = 2.2,
      mode = "latex",
      cleanXml = "",
      timer = null,
      history = [];
    function setStatus(m, bad) {
      status.textContent = m;
      status.classList.toggle("bad", !!bad);
    }
    function placeMath(parent, t, inl) {
      var r = MML.convert(t, { inline: inl }),
        m = MML.sanitize(r.mathml);
      parent.innerHTML = "";
      if (m) {
        MML.enhance(m);
        parent.appendChild(m);
      }
      return r;
    }
    function render() {
      var t = tex.value,
        r = MML.convert(t, { inline: inline }),
        m = MML.sanitize(r.mathml);
      prev.innerHTML = "";
      if (!t.trim()) {
        prev.innerHTML =
          '<span class="mx-ph">Type LaTeX below or use the palette — your equation appears here.</span>';
        cleanXml = "";
        src.value = "";
        setStatus("");
        return;
      }
      if (m) {
        MML.enhance(m);
        prev.appendChild(m);
        cleanXml = MML.pretty(MML.sanitize(r.mathml), 0, true);
        src.value = cleanXml;
      }
      var msg = [];
      if (r.errors.length) msg.push(r.errors.join(" · "));
      if (r.holes)
        msg.push(r.holes + " empty slot" + (r.holes > 1 ? "s" : "") + " (▢) left to fill");
      setStatus(msg.join(" — ") || "MathML generated ✓", !!r.errors.length);
      mode = "latex";
      $("mx-mode").hidden = true;
      try {
        localStorage.setItem(KEY, t);
      } catch (e) {}
    }
    function applyMathML() {
      var m = MML.sanitize(src.value);
      if (!m) {
        setStatus("Could not find a valid <math> element in the MathML source.", true);
        return;
      }
      m.setAttribute("display", inline ? "inline" : "block");
      prev.innerHTML = "";
      MML.enhance(m);
      prev.appendChild(m);
      cleanXml = MML.pretty(MML.sanitize(m.outerHTML), 0, true);
      src.value = cleanXml;
      mode = "mathml";
      $("mx-mode").hidden = false;
      setStatus(
        "Preview rendered from the MathML source (unsupported elements and attributes were removed).",
      );
    }
    tex.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(render, 80);
    });
    /* ---------- palette UI ---------- */
    var cats = $("mx-cats"),
      grid = $("mx-grid"),
      curCat = 0,
      query = "";
    function lab(item) {
      return item.replace(/▢/g, "▢");
    }
    var ALIAS = [
      [/\\int|\\oint|\\iint/, "integral integrate antiderivative"],
      [/\\sum/, "sum summation sigma series"],
      [/\\prod/, "product pi"],
      [/\\lim/, "limit"],
      [/\\frac/, "fraction divide ratio"],
      [/\\sqrt/, "root square cube radical"],
      [/\\binom/, "binomial choose combination"],
      [/matrix|array/, "matrix determinant table grid"],
      [/cases/, "piecewise cases system brace"],
      [/aligned|split|gathered/, "align equations multiline"],
      [/\\partial|\\nabla/, "derivative partial gradient divergence curl del"],
      [/\\vec|overrightarrow/, "vector arrow"],
      [/\\hat|\\bar|\\tilde|\\dot/, "accent decoration"],
      [/\\overline|\\underline/, "line bar conjugate"],
      [/\\overbrace|\\underbrace/, "brace group"],
      [/\\cancel|\\boxed/, "strike box cancel"],
      [/\\ce\{/, "chemistry chemical reaction molecule formula"],
      [/\\mathbb/, "blackboard double struck number set"],
      [/\\mathcal/, "calligraphic script"],
      [/\\mathfrak/, "fraktur gothic"],
      [/\\infty/, "infinity"],
      [/\\leq|\\geq|\\neq/, "inequality compare relation"],
      [/\\pm|\\mp/, "plus minus"],
      [/\\to|\\rightarrow|\\Rightarrow/, "arrow implies"],
      [/\\in|\\subset|\\cup|\\cap/, "set element union intersection"],
      [/\\forall|\\exists/, "quantifier logic"],
      [/\\sin|\\cos|\\tan/, "trig trigonometry function"],
      [/\\log|\\ln/, "logarithm"],
      [/\\det/, "determinant"],
      [/\\angle|\\triangle/, "geometry angle triangle"],
      [/\\text/, "text words"],
      [/\\hbar|\\psi/, "quantum physics"],
      [/\\mathrm/, "roman upright unit"],
    ];
    function hay(it) {
      var h = it.toLowerCase();
      ALIAS.forEach(function (a) {
        if (a[0].test(it)) h += " " + a[1];
      });
      return h;
    }
    function renderGrid() {
      grid.innerHTML = "";
      var list = [];
      if (query) {
        var q = query.toLowerCase();
        PAL.forEach(function (c) {
          c.i.forEach(function (it) {
            if (hay(it).indexOf(q) >= 0 || c.c.toLowerCase().indexOf(q) >= 0) list.push(it);
          });
        });
        list = list.filter(function (x, i) {
          return list.indexOf(x) === i;
        });
      } else list = PAL[curCat].i;
      if (!list.length) {
        grid.innerHTML = '<p class="mx-empty">No symbol matches “' + MML.esc(query) + "”.</p>";
        return;
      }
      list.forEach(function (it) {
        var b = document.createElement("button");
        b.type = "button";
        b.className =
          "mx-sym" + (it.length > 26 || /begin|frac\{.*\}.*frac|\\ce/.test(it) ? " wide" : "");
        b.dataset.t = it;
        b.title = it.replace(/▢/g, "□");
        b.setAttribute("aria-label", "Insert " + it.replace(/▢/g, "empty slot"));
        var span = document.createElement("span");
        placeMath(span, it, true);
        b.appendChild(span);
        grid.appendChild(b);
      });
    }
    PAL.forEach(function (c, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "mx-cat";
      b.textContent = c.c;
      b.dataset.i = i;
      b.setAttribute("aria-pressed", i === 0);
      cats.appendChild(b);
    });
    cats.addEventListener("click", function (e) {
      var b = e.target.closest(".mx-cat");
      if (!b) return;
      curCat = +b.dataset.i;
      query = "";
      $("mx-q").value = "";
      [].forEach.call(cats.children, function (x) {
        x.setAttribute("aria-pressed", x === b);
      });
      renderGrid();
    });
    $("mx-q").addEventListener("input", function () {
      query = this.value.trim();
      renderGrid();
    });
    grid.addEventListener("click", function (e) {
      var b = e.target.closest(".mx-sym");
      if (b) insert(b.dataset.t);
    });
    function insert(s) {
      var a = tex.selectionStart,
        b = tex.selectionEnd,
        sel = tex.value.slice(a, b),
        ins = s;
      if (sel && ins.indexOf("▢") >= 0) ins = ins.replace("▢", sel);
      var needSp = a > 0 && /[A-Za-z]$/.test(tex.value.slice(0, a)) && /^\\[A-Za-z]/.test(ins);
      /* LaTeX commands directly after letters would merge into one command name: they never do, because \ starts a new token; no spacing needed */
      tex.value = tex.value.slice(0, a) + ins + tex.value.slice(b);
      var f = ins.indexOf("▢");
      tex.focus();
      if (f >= 0 && !sel) tex.setSelectionRange(a + f, a + f + 1);
      else tex.setSelectionRange(a + ins.length, a + ins.length);
      render();
    }
    function nextSlot(back) {
      var v = tex.value,
        from = back ? tex.selectionStart - 1 : tex.selectionEnd,
        i = back ? v.lastIndexOf("▢", Math.max(0, from)) : v.indexOf("▢", from);
      if (i < 0) i = back ? v.lastIndexOf("▢") : v.indexOf("▢");
      if (i < 0) {
        setStatus("No empty slots (▢) left.");
        return;
      }
      tex.focus();
      tex.setSelectionRange(i, i + 1);
    }
    /* ---------- actions ---------- */
    function copy(text, msg) {
      function fb() {
        var t = document.createElement("textarea");
        t.value = text;
        t.style.position = "fixed";
        t.style.opacity = "0";
        document.body.appendChild(t);
        t.select();
        try {
          document.execCommand("copy");
          setStatus(msg);
        } catch (e) {
          setStatus("Copy failed — select the text and copy it manually.", true);
        }
        t.remove();
      }
      if (navigator.clipboard && navigator.clipboard.writeText)
        navigator.clipboard.writeText(text).then(function () {
          setStatus(msg);
        }, fb);
      else fb();
    }
    function dl(name, type, text) {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([text], { type: type }));
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
      }, 800);
    }
    var HTMLCSS =
      'math{font-family:"Latin Modern Math","STIX Two Math","Cambria Math","Noto Sans Math","Asana Math",math}mtd.mm-l{text-align:left}mtd.mm-r{text-align:right}mtd.mm-bl{border-left:1px solid currentColor}body.mm-fb menclose[notation~=top]{border-top:1px solid currentColor}body.mm-fb menclose[notation~=bottom]{border-bottom:1px solid currentColor}body.mm-fb menclose[notation~=box]{border:1px solid currentColor;padding:.2em}body.mm-fb menclose[notation~=horizontalstrike]{background:linear-gradient(currentColor,currentColor) center/100% 1px no-repeat}body.mm-fb menclose[notation~=updiagonalstrike]{background:linear-gradient(to top right,transparent calc(50% - .5px),currentColor,transparent calc(50% + .5px))}body.mm-fb menclose[notation~=downdiagonalstrike]{background:linear-gradient(to bottom right,transparent calc(50% - .5px),currentColor,transparent calc(50% + .5px))}';
    function exportHTML() {
      var m = MML.sanitize(src.value || "");
      if (!m) {
        setStatus("Nothing to export yet.", true);
        return;
      }
      MML.enhance(m);
      var html =
        '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><title>Equation</title>\n<style>body{font-size:2em;margin:2em;font-family:system-ui,sans-serif}' +
        HTMLCSS +
        "</style></head><body>\n" +
        new XMLSerializer().serializeToString(m) +
        '\n<script>(function(){var d=document.createElement("div");d.innerHTML=\'<math><menclose notation="box"><mn>1</mn></menclose></math>\';d.style.cssText="position:absolute;visibility:hidden";document.body.appendChild(d);var w=d.querySelector("menclose").getBoundingClientRect().width,m=d.querySelector("mn").getBoundingClientRect().width;if(w-m<2)document.body.classList.add("mm-fb");d.remove()})()<\/script>\n</body></html>\n';
      dl("equation.html", "text/html", html);
      setStatus("Downloaded equation.html");
    }
    document.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-mx]");
      if (!b) return;
      ({
        copyml: function () {
          copy(src.value, "MathML copied to the clipboard ✓");
        },
        copytex: function () {
          copy(tex.value, "LaTeX copied to the clipboard ✓");
        },
        mml: function () {
          dl("equation.mml", "application/mathml+xml", src.value);
          setStatus("Downloaded equation.mml");
        },
        html: exportHTML,
        next: function () {
          nextSlot(false);
        },
        prev: function () {
          nextSlot(true);
        },
        clear: function () {
          tex.value = "";
          render();
          tex.focus();
        },
        apply: applyMathML,
        save: function () {
          var t = tex.value.trim();
          if (!t) return;
          var s = load();
          if (s.indexOf(t) >= 0) {
            setStatus("Already in your saved list.");
            return;
          }
          s.unshift(t);
          store(s.slice(0, 40));
          renderSaved();
          setStatus("Saved to “My equations”.");
        },
        inl: function () {
          inline = !inline;
          b.setAttribute("aria-pressed", inline);
          b.textContent = inline ? "Inline" : "Block";
          if (mode === "mathml") applyMathML();
          else render();
        },
      })[b.dataset.mx]();
    });
    $("mx-size").addEventListener("input", function () {
      size = +this.value;
      prev.style.fontSize = size + "em";
    });
    /* tabs */
    [].forEach.call(document.querySelectorAll(".mx-tab"), function (t) {
      t.addEventListener("click", function () {
        [].forEach.call(document.querySelectorAll(".mx-tab"), function (x) {
          x.setAttribute("aria-selected", x === t);
        });
        [].forEach.call(document.querySelectorAll(".mx-pane"), function (p) {
          p.hidden = p.id !== t.dataset.p;
        });
        if (t.dataset.p === "mx-p-ex") renderEx();
      });
    });
    /* examples */
    var exDone = false;
    function renderEx() {
      if (exDone) return;
      exDone = true;
      var box = $("mx-ex"),
        last = "";
      EX.forEach(function (e) {
        if (e[0] !== last) {
          last = e[0];
          var h = document.createElement("h4");
          h.textContent = last;
          box.appendChild(h);
        }
        var b = document.createElement("button");
        b.type = "button";
        b.className = "mx-exbtn";
        b.dataset.t = e[2];
        var sp = document.createElement("span");
        sp.className = "mx-ext";
        sp.textContent = e[1];
        var mm = document.createElement("span");
        mm.className = "mx-exm";
        placeMath(mm, e[2], true);
        b.appendChild(sp);
        b.appendChild(mm);
        box.appendChild(b);
      });
      box.addEventListener("click", function (ev) {
        var b = ev.target.closest(".mx-exbtn");
        if (!b) return;
        tex.value = b.dataset.t;
        render();
        window.scrollTo({
          top: $("mx-top").getBoundingClientRect().top + window.pageYOffset - 80,
          behavior: "smooth",
        });
      });
    }
    /* saved */
    function load() {
      try {
        var s = JSON.parse(localStorage.getItem(SAVED) || "[]");
        return Array.isArray(s)
          ? s
              .filter(function (x) {
                return typeof x === "string";
              })
              .slice(0, 40)
          : [];
      } catch (e) {
        return [];
      }
    }
    function store(s) {
      try {
        localStorage.setItem(SAVED, JSON.stringify(s));
      } catch (e) {}
    }
    function renderSaved() {
      var box = $("mx-saved"),
        s = load();
      box.innerHTML = "";
      if (!s.length) {
        box.innerHTML =
          '<p class="mx-empty">Nothing saved yet. Press <b>Save</b> above to keep the current equation here (stored in this browser).</p>';
        return;
      }
      s.forEach(function (t, i) {
        var row = document.createElement("div");
        row.className = "mx-srow";
        var b = document.createElement("button");
        b.type = "button";
        b.className = "mx-exbtn";
        b.dataset.t = t;
        var mm = document.createElement("span");
        mm.className = "mx-exm";
        placeMath(mm, t, true);
        b.appendChild(mm);
        var d = document.createElement("button");
        d.type = "button";
        d.className = "btn btn-outline-danger btn-sm";
        d.textContent = "Delete";
        d.setAttribute("aria-label", "Delete saved equation " + (i + 1));
        d.dataset.i = i;
        row.appendChild(b);
        row.appendChild(d);
        box.appendChild(row);
      });
    }
    $("mx-saved").addEventListener("click", function (e) {
      var b = e.target.closest(".mx-exbtn");
      if (b) {
        tex.value = b.dataset.t;
        render();
        return;
      }
      var d = e.target.closest("[data-i]");
      if (d) {
        var s = load();
        s.splice(+d.dataset.i, 1);
        store(s);
        renderSaved();
      }
    });
    /* shortcuts */
    tex.addEventListener("keydown", function (e) {
      if (e.altKey && e.key === "]") {
        e.preventDefault();
        nextSlot(false);
      } else if (e.altKey && e.key === "[") {
        e.preventDefault();
        nextSlot(true);
      }
    });
    /* detect missing MathML / menclose support */
    (function () {
      var d = document.createElement("div");
      d.style.cssText = "position:absolute;visibility:hidden;left:-999px";
      d.innerHTML =
        '<math><mfrac><mn>1</mn><mn>2</mn></mfrac></math><math><menclose notation="box"><mn>1</mn></menclose></math><math><mn>1</mn></math>';
      document.body.appendChild(d);
      var ms = d.querySelectorAll("math"),
        fh = ms[0].getBoundingClientRect().height,
        nh = ms[2].getBoundingClientRect().height;
      var mw = ms[1].getBoundingClientRect().width,
        pw = ms[2].getBoundingClientRect().width;
      if (!(fh > nh * 1.3)) $("mx-warn").hidden = false;
      if (mw - pw < 2) document.body.classList.add("mm-fb");
      d.remove();
    })();
    /* init */
    var init = R`x=\frac{-b\pm\sqrt{b^{2}-4ac}}{2a}`;
    try {
      var s0 = localStorage.getItem(KEY);
      if (s0 !== null) init = s0;
    } catch (e) {}
    tex.value = init;
    prev.style.fontSize = size + "em";
    renderGrid();
    renderSaved();
    render();
  })();
}
