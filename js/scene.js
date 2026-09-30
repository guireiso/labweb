/* ============================================================
   CDG · living particle scene (Three.js r128, vendored)
   One fixed WebGL canvas behind every page. The same ~32k
   particles hold four forms and flow between them (all illustrative):

     0  a protein (central β-sheet + α-helices, drawn as ribbons of
        dots) with a densely-packed ligand docked in its pocket and
        dotted hydrogen bonds
     1  the complex opened into two equal halves (two groups),
        the ligand bridging them
     2  an enrichment-map-like network of communities, seen face-on
     3  a drug-like small molecule at full resolution

   Home: the form follows the scroll position of [data-stage]
   sections. Other pages: CDGScene.setMode(page) settles a form
   on the right-hand side, dimmed behind the content.
   ============================================================ */
(function () {
  'use strict';
  var canvas = document.getElementById('gl');
  if (!canvas || !window.THREE) return;
  var reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var T = THREE, renderer;
  try { renderer = new T.WebGLRenderer({ canvas: canvas, antialias: false, alpha: true, powerPreference: 'high-performance' }); }
  catch (e) { return; }
  renderer.setClearColor(0x000000, 0);

  var W0 = window.innerWidth;
  var N = W0 < 820 ? 12000 : (W0 < 1280 ? 22000 : 32000);        // fewer particles on smaller screens
  var INTER = (W0 < 820 || (window.matchMedia && matchMedia('(pointer: coarse)').matches)) ? 0.5 : 1;
  var FOV = 30, CAM = 60, TAN = Math.tan(FOV * Math.PI / 360);

  /* ── seeded helpers: the forms are stable from visit to visit ── */
  var seed = 917305;
  function rnd() { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
  function rr(a, b) { return a + (b - a) * rnd(); }
  function rdir() { var u = rnd() * 2 - 1, th = rnd() * 6.2831853, s = Math.sqrt(1 - u * u); return [s * Math.cos(th), s * Math.sin(th), u]; }
  function nrm(v) { var l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function crs(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function add3(a, b, s) { s = s === undefined ? 1 : s; return [a[0] + b[0] * s, a[1] + b[1] * s, a[2] + b[2] * s]; }
  function sub3(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function dot3(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function len3(a) { return Math.hypot(a[0], a[1], a[2]); }
  function lerp3(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
  function perp(t) { var r = rdir(), d = dot3(r, t); return nrm([r[0] - t[0] * d, r[1] - t[1] * d, r[2] - t[2] * d]); }
  function gauss() { return (rnd() + rnd() + rnd() + rnd() - 2) / 2; }
  function wpick(cum, total) { var x = rnd() * total, lo = 0, hi = cum.length - 1; while (lo < hi) { var mid = (lo + hi) >> 1; if (cum[mid] < x) lo = mid + 1; else hi = mid; } return lo; }

  var PAL = {
    teal:  [[0.20, 0.78, 0.76], [0.13, 0.62, 0.64], [0.40, 0.88, 0.85], [0.12, 0.55, 0.60]],
    gold:  [[0.91, 0.71, 0.29], [0.84, 0.58, 0.20], [0.97, 0.82, 0.46]],
    pearl: [[0.84, 0.87, 0.90], [0.64, 0.69, 0.75], [0.95, 0.97, 0.99]],
    rose:  [[0.88, 0.34, 0.60], [0.78, 0.26, 0.52], [0.95, 0.52, 0.74]],
    drug:  [[1.0, 0.42, 0.62], [1.0, 0.62, 0.78], [0.98, 0.86, 0.92]]
  };
  function pick(key) { var a = PAL[key], c = a[Math.floor(rnd() * a.length)], v = rr(0.88, 1.08); return [c[0] * v, c[1] * v, c[2] * v]; }

  var i, k;

  /* ═════ the four forms — clouds of dots, rings and hexagons (see the header for what each shows) ═════ */
  var P0 = new Float32Array(N * 3), P1 = new Float32Array(N * 3), P2 = new Float32Array(N * 3), P3 = new Float32Array(N * 3);
  var C0 = new Float32Array(N * 3), C1 = new Float32Array(N * 3), C2 = new Float32Array(N * 3), C3 = new Float32Array(N * 3), SEED = new Float32Array(N * 4);
  var CAT = new Uint8Array(N);            // 0 ribbon · 1 surface · 2 ligand · 3 H-bond
  function setP(A, j, p) { A[j * 3] = p[0]; A[j * 3 + 1] = p[1]; A[j * 3 + 2] = p[2]; }
  function setC(A, j, c, s) { s = s || 1; A[j * 3] = c[0] * s; A[j * 3 + 1] = c[1] * s; A[j * 3 + 2] = c[2] * s; }
  function add3(a, b, s) { s = s === undefined ? 1 : s; return [a[0] + b[0] * s, a[1] + b[1] * s, a[2] + b[2] * s]; }
  function sub3(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function dot3(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function len3(a) { return Math.hypot(a[0], a[1], a[2]); }
  function perp(t) { var r = rdir(); var pr = sub3(r, [t[0] * dot3(r, t), t[1] * dot3(r, t), t[2] * dot3(r, t)]); return nrm(pr); }

  /* ═════ the ligand · a drug-like small molecule (fused bicycle + amide + tilted aryl ring) ═════ */
  var LA = [], LB = [], BL = 1.45, D2R = Math.PI / 180;
  function at(p, el) { LA.push({ p: p, el: el }); return LA.length - 1; }
  function bond(a, b) { LB.push([a, b]); }
  (function () {
    var c1 = [-4.6, 0.3, 0], c2c = [-4.6 + BL * Math.sqrt(3), 0.3, 0];
    function hv6(c, kk) { var an = (30 + 60 * kk) * D2R; return [c[0] + BL * Math.cos(an), c[1] + BL * Math.sin(an), 0]; }
    var Lr = []; for (k = 0; k < 6; k++) Lr.push(at(hv6(c1, k), 'C'));
    for (k = 0; k < 6; k++) bond(Lr[k], Lr[(k + 1) % 6]);
    var Rr = []; Rr[2] = Lr[0]; Rr[3] = Lr[5];
    [0, 1, 4, 5].forEach(function (kk) { Rr[kk] = at(hv6(c2c, kk), kk === 4 ? 'N' : 'C'); });
    for (k = 0; k < 6; k++) bond(Rr[k], Rr[(k + 1) % 6]);
    var lo = LA[Lr[2]].p, oM = at([lo[0] - 1.3, lo[1] + 0.75, 0.2], 'O'); bond(Lr[2], oM); var me = at([lo[0] - 2.6, lo[1] + 0.1, 0.3], 'C'); bond(oM, me);
    var r0 = LA[Rr[0]].p, dA = [Math.cos(30 * D2R), Math.sin(30 * D2R), 0];
    var cA = at([r0[0] + dA[0] * BL, r0[1] + dA[1] * BL, 0], 'C'); bond(Rr[0], cA);
    var oA = at([LA[cA].p[0] - 0.2, LA[cA].p[1] + 1.4, 0.1], 'O'); bond(cA, oA);
    var nA = at([LA[cA].p[0] + 1.35, LA[cA].p[1] - 0.6, -0.2], 'N'); bond(cA, nA);
    var cB = at([LA[nA].p[0] + 1.35, LA[nA].p[1] + 0.55, -0.4], 'C'); bond(nA, cB);
    var cP = [LA[cB].p[0] + 2.2, LA[cB].p[1] - 0.2, -0.8], u1 = [1, -0.1, 0], v1 = [0.08, Math.cos(58 * D2R), Math.sin(58 * D2R)], PR = [];
    for (k = 0; k < 6; k++) { var an3 = (180 + 60 * k) * D2R; PR.push(at([0, 1, 2].map(function (c) { return cP[c] + BL * (Math.cos(an3) * u1[c] + Math.sin(an3) * v1[c]); }), 'C')); }
    for (k = 0; k < 6; k++) bond(PR[k], PR[(k + 1) % 6]);
    bond(cB, PR[0]);
    var pp = LA[PR[3]].p, cl3 = at([pp[0] + 1.75, pp[1] - 0.15, pp[2] - 0.2], 'Cl'); bond(PR[3], cl3);
    var fl = LA[Rr[4]].p, hN = at([fl[0] + 0.2, fl[1] - 1.3, 0.3], 'N'); bond(Rr[4], hN);
    var lc = [0, 0, 0]; LA.forEach(function (a) { lc = add3(lc, a.p); }); lc = lc.map(function (v) { return v / LA.length; });
    LA.forEach(function (a) { a.p = sub3(a.p, lc); });
  })();
  var R3 = 0; LA.forEach(function (a) { R3 = Math.max(R3, Math.hypot(a.p[0], a.p[1]) + 0.8); });
  var ER = { C: 0.62, N: 0.6, O: 0.58, Cl: 0.85 };
  function ligSample() {                   // → [point, colour key]
    if (rnd() < 0.6) { var aa = LA[Math.floor(rnd() * LA.length)], r3 = ER[aa.el] * (0.96 + rnd() * 0.08); return [add3(aa.p, rdir(), r3), aa.el]; }
    var bb = LB[Math.floor(rnd() * LB.length)], pa = LA[bb[0]].p, pb = LA[bb[1]].p, tt = rnd();
    return [add3(add3(pa, sub3(pb, pa), tt), rdir(), 0.14 + rnd() * 0.06), 'B'];
  }

  /* ═════ FORM 0 · a Rossmann-like α/β fold: central parallel β-sheet, α-helices on both faces ═════ */
  var CA = [], SS = [], AX = [], SP = [];   // Cα trace · type (E/H/L) · orientation · progress within element
  function strand(x) {
    var tw = x * 0.028, n = 7;
    for (var j = 0; j < n; j++) { var y = -10 + j * 3.3, z = 0.011 * x * x; var c = Math.cos(tw), s = Math.sin(tw);
      CA.push([x, y * c - z * s, y * s + z * c]); SS.push('E'); AX.push(nrm([0, -s, c])); SP.push(j / (n - 1)); }
  }
  function helix(x, z, n, tilt, top) {
    tilt = tilt || 0; top = top === undefined ? 9.5 : top;
    var ax = nrm([Math.sin(tilt), -Math.cos(tilt), 0]), u = nrm(crs(ax, [0, 0, 1])), v = crs(ax, u), o = [x - ax[0] * 9, top, z];
    o = [x - Math.sin(tilt) * (n * 0.75), top, z];
    for (var j = 0; j < n; j++) { var a = j * 100 * D2R, c = add3(o, ax, j * 1.5);
      CA.push(add3(add3(c, u, 2.3 * Math.cos(a)), v, 2.3 * Math.sin(a))); SS.push('H'); AX.push(ax); SP.push(j / (n - 1)); }
  }
  function loop(bulge) {
    var a = CA[CA.length - 1], mark = CA.length;
    return function () {           // called once the next element is pushed: splice a curved loop in between
      var b = CA[mark], ctrl = add3([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], bulge);
      var n = Math.max(2, Math.ceil(len3(sub3(b, a)) / 3.6)), ins = [], ss = [], ax = [], sp = [];
      for (var j = 1; j < n; j++) { var t = j / n, q = [0, 1, 2].map(function (c) { return (1 - t) * (1 - t) * a[c] + 2 * (1 - t) * t * ctrl[c] + t * t * b[c]; });
        ins.push(q); ss.push('L'); ax.push([0, 0, 1]); sp.push(t); }
      Array.prototype.splice.apply(CA, [mark, 0].concat(ins)); Array.prototype.splice.apply(SS, [mark, 0].concat(ss));
      Array.prototype.splice.apply(AX, [mark, 0].concat(ax)); Array.prototype.splice.apply(SP, [mark, 0].concat(sp));
    };
  }
  // topology 3-2-1-4-5: β1 → α1 → β2 → α2 → β3 → (crossover) → α3 → β4 → α4 → β5 → α5
  var fix = [];
  strand(0);
  fix.push(loop([0, 5, 5])); helix(-2.6, 10, 14, 0.35);
  fix.push(loop([0, -5, 5])); strand(-4.8);
  fix.push(loop([-1, 5, 5])); helix(-8.8, 9.5, 12, -0.3, 8);
  fix.push(loop([-2, -5, 5])); strand(-9.6);
  fix.push(loop([-3, -6, 2])); helix(-15.5, 1, 10, 0.5, 6);
  fix.push(loop([6, 8, -4])); helix(2.4, -10.5, 15, -0.3, 10.5);
  fix.push(loop([0, -5, -5])); strand(4.8);
  fix.push(loop([1, 5, -5])); helix(8.8, -9.5, 12, 0.4);
  fix.push(loop([0, -5, -5])); strand(9.6);
  fix.push(loop([4, 5, 2])); helix(15.5, 2, 11, -0.45, 8);
  // apply loops back-to-front so the stored indices stay valid
  for (k = fix.length - 1; k >= 0; k--) fix[k]();
  var NCA = CA.length;
  function cr(u) {                       // Catmull–Rom through the Cα trace
    var j = Math.min(NCA - 2, Math.max(0, Math.floor(u))), t = u - j;
    var p0 = CA[Math.max(j - 1, 0)], p1 = CA[j], p2 = CA[j + 1], p3 = CA[Math.min(j + 2, NCA - 1)], t2 = t * t, t3 = t2 * t;
    return [0, 1, 2].map(function (c) { return 0.5 * ((2 * p1[c]) + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3); });
  }
  function ribbonPoint() {
    var u = rnd() * (NCA - 1.001), j = Math.round(u), s = SS[j], p = cr(u), tg = nrm(sub3(cr(Math.min(NCA - 1.001, u + 0.05)), cr(Math.max(0, u - 0.05))));
    if (s === 'L') return [add3(p, perp(tg), 0.45 * Math.sqrt(rnd())), 'L'];
    var ax = AX[j], wd, nm, hw, th;
    if (s === 'H') { wd = nrm(sub3(ax, [tg[0] * dot3(ax, tg), tg[1] * dot3(ax, tg), tg[2] * dot3(ax, tg)])); hw = 1.15; th = 0.28; }
    else { nm = ax; wd = nrm(crs(tg, nm)); hw = 1.3; th = 0.32;
      var jf = Math.floor(u); if (SS[jf] === 'E' && SP[jf] > 0.8) hw = 2.2 * (1 - (u - jf)); }   // arrow head
    var nn = nrm(crs(tg, wd)), w = (rnd() * 2 - 1), t2 = (rnd() * 2 - 1);
    if (rnd() < 0.35) w = w < 0 ? -1 : 1;  // crisp ribbon edges
    return [add3(add3(p, wd, w * hw), nn, t2 * th), s];
  }
  // the ligand docks in the pocket at the C-terminal edge of the sheet
  var POCK = [1.8, 14.2, 3.0], LIG0 = LA.map(function (a) { return add3(POCK, [a.p[0] * 0.95, a.p[1] * 0.95 * 0.6 + a.p[2] * 0.4, a.p[2] * 0.8 + 1.0]); });
  // surface envelope: pseudo-atoms on the Cα trace, sampled where not buried
  var SA = CA.map(function (c) { return { p: c, r: 3.3 }; });
  for (k = 0; k < NCA - 1; k++) SA.push({ p: [(CA[k][0] + CA[k + 1][0]) / 2, (CA[k][1] + CA[k + 1][1]) / 2, (CA[k][2] + CA[k + 1][2]) / 2], r: 3.0 });
  function surfPoint() {
    for (var tr = 0; tr < 60; tr++) {
      var a = SA[Math.floor(rnd() * SA.length)], p = add3(a.p, rdir(), a.r), ok = true;
      for (var m = 0; m < SA.length; m++) { var b = SA[m]; if (b === a) continue; var d = sub3(p, b.p); if (dot3(d, d) < b.r * b.r * 0.97) { ok = false; break; } }
      if (!ok) continue;
      for (m = 0; m < LIG0.length; m++) { var dl2 = sub3(p, LIG0[m]); if (dot3(dl2, dl2) < 16) { ok = false; break; } }   // leave the pocket open
      if (ok) return p;
    }
    return add3(SA[0].p, rdir(), 3.3);
  }
  // hydrogen bonds: dashed lines from the ligand heteroatoms to the nearest residues
  var HB = [];
  LA.forEach(function (a, ai) {
    if (a.el === 'C') return; var lp = LIG0[ai], best = -1, bd = 1e9;
    CA.forEach(function (c, ci) { var d = len3(sub3(c, lp)); if (d < bd && d > 2.5) { bd = d; best = ci; } });
    if (best >= 0 && bd < 11) HB.push([lp, CA[best]]);
  });
  function hbPoint() {
    var h = HB[Math.floor(rnd() * HB.length)], t;
    do { t = rnd(); } while ((t * 7) % 1 > 0.55);                 // dashed
    return add3(add3(h[0], sub3(h[1], h[0]), 0.12 + t * 0.76), rdir(), 0.06);
  }
  var nL = Math.floor(N * 0.2), nH = HB.length ? Math.floor(N * 0.035) : 0, nS = Math.floor(N * 0.13), nR = N - nL - nH - nS;
  var LKEY = {}, SSK = {};
  for (i = 0; i < N; i++) {
    var pt, col, sc = 1;
    if (i < nR) { var rp = ribbonPoint(); pt = rp[0]; CAT[i] = 0; SSK[i] = rp[1];
      col = rp[1] === 'H' ? pick('teal') : rp[1] === 'E' ? pick('gold') : pick('pearl'); sc = rp[1] === 'L' ? 0.75 : 1.0; }
    else if (i < nR + nS) { pt = surfPoint(); CAT[i] = 1; col = rnd() < 0.6 ? pick('teal') : pick('pearl'); sc = 0.09; }
    else if (i < nR + nS + nL) { var lq = ligSample(), ai2 = -1, bd2 = 1e9;
      LA.forEach(function (a, idx) { var d = len3(sub3(a.p, lq[0])); if (d < bd2) { bd2 = d; ai2 = idx; } });
      var off = sub3(lq[0], LA[ai2].p); pt = add3(LIG0[ai2], off, 0.95); CAT[i] = 2; LKEY[i] = lq[1];
      col = lq[1] === 'O' ? pick('rose') : lq[1] === 'N' ? [0.98, 0.62, 0.8] : lq[1] === 'Cl' ? pick('gold') : lq[1] === 'B' ? [0.95, 0.55, 0.75] : [1.0, 0.9, 0.95]; sc = 0.95; }
    else { pt = hbPoint(); CAT[i] = 3; col = [0.9, 0.97, 1.0]; sc = 0.85; }
    setP(P0, i, pt); setC(C0, i, col, sc);
  }
  // centre the complex
  var cx = 0, cy = 0, cz = 0;
  for (i = 0; i < N; i++) { cx += P0[i * 3]; cy += P0[i * 3 + 1]; cz += P0[i * 3 + 2]; }
  cx /= N; cy /= N; cz /= N;
  var dl = [];
  for (i = 0; i < N; i++) { P0[i * 3] -= cx; P0[i * 3 + 1] -= cy; P0[i * 3 + 2] -= cz; dl.push(Math.hypot(P0[i * 3], P0[i * 3 + 1], P0[i * 3 + 2])); }
  var tz = -0.62, tx = 0.35, czr = Math.cos(tz), szr = Math.sin(tz), cxr = Math.cos(tx), sxr = Math.sin(tx);
  function tiltP(p) { var x = p[0] * czr - p[1] * szr, y = p[0] * szr + p[1] * czr, z = p[2]; return [x, y * cxr - z * sxr, y * sxr + z * cxr]; }
  for (i = 0; i < N; i++) { var tp = tiltP([P0[i * 3], P0[i * 3 + 1], P0[i * 3 + 2]]); setP(P0, i, tp); }
  dl.sort(function (a, b) { return a - b; });
  var R0 = dl[Math.floor(N * 0.94)];
  var ligC = tiltP(sub3(POCK, [cx, cy, cz]));

  /* ═════ FORM 1 · the complex opens into two groups, the ligand holding them together ═════ */
  var R1 = 0;
  for (i = 0; i < N; i++) {
    var p1 = [P0[i * 3], P0[i * 3 + 1], P0[i * 3 + 2]], c = CAT[i], q1, col1;
    if (c === 2) { q1 = add3([0, 0.5, 2], sub3(p1, ligC), 1.3); col1 = [C0[i * 3] / 0.95, C0[i * 3 + 1] / 0.95, C0[i * 3 + 2] / 0.95]; setC(C1, i, col1, 0.95); }
    else if (c === 3) { q1 = add3([0, 0.5, 2], rdir(), 3 + rnd() * 5); setC(C1, i, [0.95, 0.55, 0.75], 0.5); }
    else {
      var left = p1[0] < -0.5;
      q1 = add3(p1, left ? [-8.5, 1.4, 0] : [8.5, -1.4, 0]);
      var k1 = left ? 'teal' : 'gold', dim = c === 1 ? 0.2 : (SSK[i] === 'L' ? 0.55 : 0.72);
      setC(C1, i, pick(k1), dim);
    }
    setP(P1, i, q1); R1 = Math.max(R1, Math.hypot(q1[0], q1[1]) * 0.9);
  }

  /* ═════ FORM 2 · an enrichment-map-like network: communities of nodes, edges within and between ═════ */
  var FW = 22;
  var COMM = [[-15, 5.5, 'teal'], [-17, -4.5, 'gold'], [-6, -8.8, 'pearl'], [5.5, -8.5, 'rose'], [16, -4, 'teal'], [15.5, 6, 'gold'], [1.5, 8.8, 'pearl']];
  var NODES = [], EDGES = [];
  COMM.forEach(function (cm, ci) {
    var n = 7 + Math.floor(rnd() * 6), first = NODES.length;
    for (var j = 0; j < n; j++) NODES.push({ p: [cm[0] + gauss() * 4, cm[1] + gauss() * 2.6, gauss() * 0.8], v: [0, 0], r: 0.4 + Math.pow(rnd(), 2) * 1.15, c: ci });
    for (j = first; j < NODES.length; j++) for (var m2 = j + 1; m2 < NODES.length; m2++) if (rnd() < 0.3 || m2 === j + 1) EDGES.push([j, m2, rnd() < 0.3 ? 2 : 1]);
  });
  for (var ci = 0; ci < COMM.length; ci++) {         // bridges between neighbouring communities, a few long ones
    var nb = (ci + 1) % COMM.length, a0 = NODES.filter(function (nd) { return nd.c === ci; }), b0 = NODES.filter(function (nd) { return nd.c === nb; });
    for (k = 0; k < 3; k++) EDGES.push([NODES.indexOf(a0[Math.floor(rnd() * a0.length)]), NODES.indexOf(b0[Math.floor(rnd() * b0.length)]), 0]);
  }
  for (k = 0; k < 5; k++) EDGES.push([Math.floor(rnd() * NODES.length), Math.floor(rnd() * NODES.length), 0]);
  for (var itr = 0; itr < 220; itr++) {              // a small force layout
    NODES.forEach(function (a) { a.f = [0, 0]; a.f[0] += (COMM[a.c][0] - a.p[0]) * 0.06; a.f[1] += (COMM[a.c][1] - a.p[1]) * 0.08; });
    for (var ia = 0; ia < NODES.length; ia++) for (var ib = ia + 1; ib < NODES.length; ib++) {
      var A = NODES[ia], B = NODES[ib], dx = A.p[0] - B.p[0], dy = A.p[1] - B.p[1], d2 = dx * dx + dy * dy + 0.05; if (d2 > 30) continue; var rep = (A.c === B.c ? 0.9 : 1.6) / d2;
      A.f[0] += dx * rep; A.f[1] += dy * rep; B.f[0] -= dx * rep; B.f[1] -= dy * rep; }
    EDGES.forEach(function (e) { if (e[2] === 0) return; var A = NODES[e[0]], B = NODES[e[1]], dx = B.p[0] - A.p[0], dy = B.p[1] - A.p[1], d = Math.hypot(dx, dy) + 1e-3, f = (d - 3.4) * 0.05;
      A.f[0] += dx / d * f; A.f[1] += dy / d * f; B.f[0] -= dx / d * f; B.f[1] -= dy / d * f; });
    NODES.forEach(function (a) { a.p[0] += Math.max(-0.25, Math.min(0.25, a.f[0])); a.p[1] += Math.max(-0.25, Math.min(0.25, a.f[1])); });
  }
  EDGES = EDGES.filter(function (e) { return e[0] !== e[1]; });
  var ncum = [], ntot = 0; NODES.forEach(function (nd) { ntot += nd.r * nd.r + 0.4; ncum.push(ntot); });
  var ecum = [], etot = 0; EDGES.forEach(function (e) { etot += len3(sub3(NODES[e[0]].p, NODES[e[1]].p)) * (e[2] === 2 ? 1.6 : 1); ecum.push(etot); });
  function wpick(cumA, total) { var x = rnd() * total, lo = 0, hi = cumA.length - 1; while (lo < hi) { var mid = (lo + hi) >> 1; if (cumA[mid] < x) lo = mid + 1; else hi = mid; } return lo; }
  for (i = 0; i < N; i++) {
    var q2, c2, s2 = 1, r2 = rnd();
    if (r2 < 0.4) {                                   // nodes: crisp circle, faint fill, bright core
      var nd = NODES[wpick(ncum, ntot)], kind = rnd(), an = rnd() * 6.2832; c2 = pick(COMM[nd.c][2]);
      if (kind < 0.58) { q2 = [nd.p[0] + Math.cos(an) * nd.r, nd.p[1] + Math.sin(an) * nd.r, nd.p[2] + (rnd() - 0.5) * 0.06]; s2 = 1.0; }
      else if (kind < 0.85) { var rf = nd.r * Math.sqrt(rnd()) * 0.92; q2 = [nd.p[0] + Math.cos(an) * rf, nd.p[1] + Math.sin(an) * rf, nd.p[2]]; s2 = 0.3; }
      else { q2 = add3(nd.p, rdir(), 0.12 * rnd()); s2 = 1.1; }
    } else if (r2 < 0.985) {                           // edges: thin, a little thicker when the overlap is strong
      var ed = EDGES[wpick(ecum, etot)], A2 = NODES[ed[0]], B2 = NODES[ed[1]], dAB = sub3(B2.p, A2.p), lAB = len3(dAB);
      var t0 = A2.r / lAB, t1 = 1 - B2.r / lAB, tt2 = t0 + rnd() * Math.max(0.01, t1 - t0);
      q2 = add3(add3(A2.p, dAB, tt2), rdir(), 0.025 + 0.03 * ed[2]);
      c2 = ed[2] === 0 ? pick('pearl') : pick(COMM[A2.c][2]); s2 = ed[2] === 0 ? 0.38 : 0.62; }
    else { q2 = [rr(-FW * 1.1, FW * 1.1), gauss() * 14, rr(-10, 8)]; c2 = pick(rnd() < 0.5 ? 'teal' : 'pearl'); s2 = 0.45; }
    setP(P2, i, q2); setC(C2, i, c2, s2);
  }

  /* ═════ FORM 3 · the ligand alone, at full resolution ═════ */
  for (i = 0; i < N; i++) {
    var lq3 = ligSample(), e3 = lq3[1];
    var col3 = e3 === 'O' ? pick('rose') : e3 === 'N' ? pick('teal') : e3 === 'Cl' ? pick('gold') : e3 === 'B' ? (rnd() < 0.7 ? pick('teal') : pick('pearl')) : (rnd() < 0.3 ? pick('teal') : pick('pearl'));
    setP(P3, i, lq3[0]); setC(C3, i, col3, 0.62);
  }

  // per particle: delay · glyph (dot / ring / hexagon) · size · phase
  for (i = 0; i < N; i++) {
    var c0 = CAT[i], gl, sz;
    if (c0 === 1) { gl = rnd() < 0.85 ? 0.3 : 0.7; sz = rr(0.45, 0.85); }
    else if (c0 === 2) { gl = rnd() < 0.9 ? 0.3 : 0.7; sz = rr(0.32, 0.6); }
    else if (c0 === 0) { gl = rnd() < 0.96 ? 0.3 : 0.7; sz = gl < 0.55 ? rr(0.5, 0.85) : rr(0.8, 1.2); }
    else { gl = 0.3; sz = rr(0.35, 0.6); }
    if (rnd() < 0.01) sz *= 2.2;
    SEED[i * 4] = rnd(); SEED[i * 4 + 1] = gl; SEED[i * 4 + 2] = sz; SEED[i * 4 + 3] = rnd();
  }


  /* ── GPU: every form lives in the vertex shader ── */
  var geo = new T.BufferGeometry();
  geo.setAttribute('position', new T.BufferAttribute(P0, 3));
  geo.setAttribute('aP0', new T.BufferAttribute(P0, 3)); geo.setAttribute('aP1', new T.BufferAttribute(P1, 3));
  geo.setAttribute('aP2', new T.BufferAttribute(P2, 3)); geo.setAttribute('aP3', new T.BufferAttribute(P3, 3));
  geo.setAttribute('aC0', new T.BufferAttribute(C0, 3)); geo.setAttribute('aC1', new T.BufferAttribute(C1, 3));
  geo.setAttribute('aC2', new T.BufferAttribute(C2, 3)); geo.setAttribute('aC3', new T.BufferAttribute(C3, 3));
  geo.setAttribute('aSeed', new T.BufferAttribute(SEED, 4));
  var U = {
    uTime: { value: 0 }, uMorph: { value: 0 }, uEntry: { value: reduce ? 1 : 0 }, uRotY: { value: 0 }, uRotX: { value: 0 },
    uBase: { value: 5 }, uMot: { value: reduce ? 0.12 : 1 }, uHalfH: { value: 16 }, uCam: { value: CAM }, uDim: { value: 1 },
    uPl0: { value: new T.Vector4() }, uPl1: { value: new T.Vector4() }, uPl2: { value: new T.Vector4() }, uPl3: { value: new T.Vector4() },
    uMouse: { value: new T.Vector3(0, 0, 0) }, uPar: { value: new T.Vector2() }, uPulse: { value: new T.Vector4(0, 0, 0, -99) },
    uFogN: { value: 50 }, uFogF: { value: 75 }, uScatter: { value: reduce ? 0.06 : 0.3 }
  };
  var VS = [
    'attribute vec3 aP0; attribute vec3 aP1; attribute vec3 aP2; attribute vec3 aP3;',
    'attribute vec3 aC0; attribute vec3 aC1; attribute vec3 aC2; attribute vec3 aC3; attribute vec4 aSeed;',
    'uniform float uTime, uMorph, uEntry, uRotY, uRotX, uBase, uMot, uHalfH, uCam, uFogN, uFogF, uScatter, uDim;',
    'uniform vec4 uPl0, uPl1, uPl2, uPl3; uniform vec3 uMouse; uniform vec2 uPar; uniform vec4 uPulse;',
    'varying vec3 vCol; varying float vA; varying float vGlyph; varying float vGlow;',
    'float hash(float n){ return fract(sin(n) * 43758.5453); }',
    'vec3 rot(vec3 p, float ay, float ax){ float c = cos(ay), s = sin(ay); p = vec3(c*p.x + s*p.z, p.y, -s*p.x + c*p.z); c = cos(ax); s = sin(ax); return vec3(p.x, c*p.y - s*p.z, s*p.y + c*p.z); }',
    'vec3 place(vec3 p, vec4 pl){ return rot(p, uRotY * pl.w, uRotX * pl.w) * pl.z + vec3(pl.xy, 0.0); }',
    'void main(){',
    '  float m = clamp(uMorph, 0.0, 3.0); float seg = min(floor(m), 2.0); float f = m - seg;',
    '  float dly = aSeed.x * 0.5; float fi = smoothstep(dly, dly + 0.5, f);',
    '  vec3 pA; vec3 pB; vec3 cA; vec3 cB; vec4 lA; vec4 lB;',
    '  if (seg < 0.5) { pA = aP0; pB = aP1; cA = aC0; cB = aC1; lA = uPl0; lB = uPl1; }',
    '  else if (seg < 1.5) { pA = aP1; pB = aP2; cA = aC1; cB = aC2; lA = uPl1; lB = uPl2; }',
    '  else { pA = aP2; pB = aP3; cA = aC2; cB = aC3; lA = uPl2; lB = uPl3; }',
    '  float ph = aSeed.w * 6.2831;',
    '  float br = 1.0 + 0.02 * uMot * sin(uTime * 0.55 + length(pA) * 0.12 + ph * 0.3);',
    '  vec3 w = mix(place(pA * br, lA), place(pB * br, lB), fi);',
    '  vec3 nd = normalize(vec3(hash(ph * 1.3) - 0.5, hash(ph * 2.1 + 1.0) - 0.5, hash(ph * 3.7 + 2.0) - 0.5) + 1e-4);',
    '  w += nd * sin(3.14159 * fi) * uHalfH * uScatter;',
    '  float wand = 1.0 + step(0.965, hash(ph * 9.1)) * 5.0;',
    '  vec3 osc = vec3(sin(uTime * (0.55 + aSeed.w * 0.9) + ph), sin(uTime * (0.45 + aSeed.x * 0.8) + ph * 1.7), sin(uTime * (0.6 + aSeed.z * 0.3) + ph * 2.3));',
    '  float crisp = mix(lA.w, lB.w, fi) < 0.2 ? 0.35 : 1.0;',
    '  w += osc * uHalfH * 0.0055 * uMot * wand * crisp;',
    '  float e = smoothstep(aSeed.x * 0.45, aSeed.x * 0.45 + 0.55, uEntry); float ee = e * e * (3.0 - 2.0 * e);',
    '  vec3 st = nd * uHalfH * (1.3 + hash(ph * 5.3) * 1.5) + vec3(lA.xy * 0.5, 0.0);',
    '  vec3 sw = normalize(cross(nd, vec3(0.0, 1.0, 0.0)) + 1e-4) * sin(3.14159 * ee) * uHalfH * 0.35;',
    '  w = mix(st, w, ee) + sw;',
    '  vec2 dm = w.xy - uMouse.xy; float dist = length(dm) + 1e-4; float fall = 1.0 - smoothstep(0.0, uHalfH * 0.3, dist); fall *= fall;',
    '  vec2 dir = dm / dist; w.xy += (dir + vec2(-dir.y, dir.x) * 0.35) * fall * uMouse.z * uHalfH * 0.075; w.z += fall * uMouse.z * uHalfH * 0.05;',
    '  w.xy += uPar * (w.z / uHalfH) * uHalfH * 0.06;',
    '  vec4 mv = modelViewMatrix * vec4(w, 1.0); gl_Position = projectionMatrix * mv;',
    '  float d = -mv.z; float fog = smoothstep(uFogN, uFogF, d);',
    '  float glow = pow(max(0.0, sin(uTime * (0.22 + aSeed.x * 0.3) + ph * 7.0)), 80.0);',
    '  float pt = uTime - uPulse.w; vec3 pC = fi < 0.5 ? pA : pB;',
    '  if (pt > 0.0 && pt < 3.6) { float dd = length(pC - uPulse.xyz) / (lA.w < 0.2 ? 1.0 : 3.5); glow += exp(-pow((dd - pt * 3.2) / 1.1, 2.0)) * (1.0 - pt / 3.6) * 1.1; }',
    '  vGlow = glow; vCol = mix(cA, cB, fi); vGlyph = aSeed.y;',
    '  gl_PointSize = max(1.0, aSeed.z * uBase * (uCam / d) * (1.0 + glow * 0.5) * (0.55 + 0.45 * ee));',
    '  vA = ee * (1.0 - fog * 0.78) * (0.8 + 0.2 * sin(uTime * 0.4 + ph)) * uDim;',
    '}'].join('\n');
  var FS = [
    'precision highp float;',
    'varying vec3 vCol; varying float vA; varying float vGlyph; varying float vGlow;',
    'void main(){',
    '  vec2 p = gl_PointCoord * 2.0 - 1.0; float r = length(p); float a;',
    '  if (vGlyph < 0.55) { a = 1.0 - smoothstep(0.25, 1.0, r); a *= a; }',
    '  else if (vGlyph < 0.85) { a = 1.0 - smoothstep(0.1, 0.24, abs(r - 0.68)); }',
    '  else { vec2 q = abs(p); float h = max(q.x * 0.866 + q.y * 0.5, q.y); a = 1.0 - smoothstep(0.1, 0.22, abs(h - 0.7)); }',
    '  a *= vA; if (a < 0.004) discard;',
    '  vec3 col = vCol * (0.9 + vGlow * 1.3) + vec3(vGlow * 0.3);',
    '  gl_FragColor = vec4(col, a * 0.8);',
    '}'].join('\n');
  var mat = new T.ShaderMaterial({ uniforms: U, vertexShader: VS, fragmentShader: FS, transparent: true, depthWrite: false, depthTest: false, blending: T.AdditiveBlending });
  var pts = new T.Points(geo, mat); pts.frustumCulled = false;
  var scene = new T.Scene(); scene.add(pts);
  var camera = new T.PerspectiveCamera(FOV, 1, 1, 500); camera.position.set(0, 0, CAM);

  /* ── placement: where each form sits (home story vs. inner pages) ── */
  var PAGE_FORM = { home: 0, research: 3, groups: 1, publications: 2, contact: 0 };
  var mode = 'home', vw = 1, vh = 1, halfH = 1, halfW = 1, narrow = false, stageMid = [], glowPos = [];
  var target = [[0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1]], curPl = null, dimT = 1, dimS = 1, glowT = [75, 48];
  function fit(wf, hf, R) { return Math.min(wf * 2 * halfW, hf * 2 * halfH) / (2 * R); }
  function computeTargets() {
    if (mode === 'home') {
      if (!narrow) {
        target = [[0.5 * halfW, 0.04 * halfH, fit(0.44, 0.72, R0), 1], [-0.42 * halfW, -0.02 * halfH, fit(0.52, 0.72, R1), 0.3],
                  [0, 0.02 * halfH, halfW * 1.02 / FW, 0], [-0.42 * halfW, 0, fit(0.5, 0.7, R3), 1]];
        glowPos = [[75, 48], [28, 50], [50, 50], [29, 50]];
      } else {
        target = [[0, -0.44 * halfH, fit(0.95, 0.46, R0), 1], [0, 0.4 * halfH, fit(0.95, 0.42, R1), 0.3],
                  [0, 0, halfW * 1.2 / FW, 0], [0, 0.4 * halfH, fit(0.9, 0.4, R3), 1]];
        glowPos = [[50, 72], [50, 30], [50, 50], [50, 30]];
      }
      dimT = 1;
    } else {
      // inner pages: every form settles on the right, smaller and quieter, behind the content
      var x = narrow ? 0 : 0.56 * halfW, y = narrow ? 0.62 * halfH : -0.04 * halfH, wf = narrow ? 0.8 : 0.36, hf = narrow ? 0.3 : 0.62;
      target = [[x, y, fit(wf, hf, R0), 1], [x, y, fit(wf, hf, R1), 0.3], [x, y, (narrow ? halfW * 0.5 : halfW * 0.42) / FW, 0], [x, y, fit(wf, hf, R3), 1]];
      glowPos = [[narrow ? 50 : 78, narrow ? 18 : 50]];
      dimT = narrow ? 0.32 : 0.5;
    }
    if (!curPl) curPl = target.map(function (t) { return t.slice(); });
  }
  function layout() {
    vw = window.innerWidth; vh = window.innerHeight; narrow = vw < 820;
    var pr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(pr); renderer.setSize(vw, vh, false);
    camera.aspect = vw / vh; camera.updateProjectionMatrix();
    halfH = TAN * CAM; halfW = halfH * camera.aspect;
    U.uHalfH.value = halfH; U.uBase.value = (narrow ? 3.8 : 4.6) * pr * Math.min(1.25, Math.max(0.85, vh / 900));
    computeTargets();
    var Rs = R0 * target[0][2]; U.uFogN.value = CAM - Rs * 0.3; U.uFogF.value = CAM + Rs * 1.6;
    measureStages();
  }
  function measureStages() {
    var secs = Array.prototype.slice.call(document.querySelectorAll('.page.active [data-stage]'));
    stageMid = secs.map(function (s) { var r = s.getBoundingClientRect(); return r.top + window.scrollY + r.height / 2; });
  }
  layout();
  window.addEventListener('resize', layout);
  window.addEventListener('load', layout);

  /* ── input ── */
  var mx = 0, my = 0, mxS = 0, myS = 0, pres = 0, presS = 0, fx = 0, fy = 0, fxS = 0, fyS = 0, spd = 0, lx = null, ly = 0, lt = 0;
  window.addEventListener('pointermove', function (e) {
    mx = (e.clientX / vw) * 2 - 1; my = -((e.clientY / vh) * 2 - 1); pres = e.pointerType === 'touch' ? 0.6 : 1;
    fx = mx * halfW; fy = my * halfH;
    var now = performance.now(); if (lx !== null) { var v = Math.hypot(e.clientX - lx, e.clientY - ly) / Math.max(8, now - lt); spd = Math.max(spd, Math.min(1.4, v)); }
    lx = e.clientX; ly = e.clientY; lt = now;
  }, { passive: true });
  document.addEventListener('pointerleave', function () { pres = 0; mx = my = 0; lx = null; });
  window.addEventListener('blur', function () { pres = 0; });

  function morphTarget() {
    if (mode !== 'home') return PAGE_FORM[mode] || 0;
    var c = window.scrollY + vh / 2, t = stageMid;
    if (!t.length || c <= t[0]) return 0;
    for (var j = 0; j < t.length - 1; j++) if (c < t[j + 1]) { var f = (c - t[j]) / (t[j + 1] - t[j]); return j + Math.min(1, Math.max(0, (f - 0.1) / 0.8)); }
    return t.length - 1;
  }

  /* ── loop ── */
  var tm = 0, last = performance.now(), morphS = 0, tiltX = 0, tiltY = 0, entryT = reduce ? 99 : -0.35, nextPulse = 4 + Math.random() * 2;
  var bgGlow = document.getElementById('bgGlow'), FORMS = [P0, P1, P2, P3], PLU = [U.uPl0, U.uPl1, U.uPl2, U.uPl3];
  function tick(now) {
    requestAnimationFrame(tick);
    var dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000)); last = now; tm += dt;
    var mt = morphTarget();
    morphS += (mt - morphS) * (1 - Math.exp(-dt * (mode === 'home' ? 5 : 1.8)));
    var kp = 1 - Math.exp(-dt * (reduce ? 20 : 2.4));
    for (var q = 0; q < 4; q++) { for (var c = 0; c < 4; c++) curPl[q][c] += (target[q][c] - curPl[q][c]) * kp; PLU[q].value.set(curPl[q][0], curPl[q][1], curPl[q][2], curPl[q][3]); }
    dimS += (dimT - dimS) * kp; U.uDim.value = dimS;
    entryT += dt; if (!reduce) U.uEntry.value = Math.min(1, Math.max(0, entryT / 2.6));
    mxS += (mx - mxS) * (1 - Math.exp(-dt * 2.6)); myS += (my - myS) * (1 - Math.exp(-dt * 2.6));
    presS += (pres - presS) * (1 - Math.exp(-dt * (pres > presS ? 4 : 1.5)));
    fxS += (fx - fxS) * (1 - Math.exp(-dt * 12)); fyS += (fy - fyS) * (1 - Math.exp(-dt * 12)); spd *= Math.exp(-dt * 2.2);
    var inter = INTER * (mode === 'home' ? 1 : 0.5);
    tiltY += (mxS * 0.28 * inter * presS - tiltY) * (1 - Math.exp(-dt * 2));
    tiltX += (-myS * 0.2 * inter * presS - tiltX) * (1 - Math.exp(-dt * 2));
    var t = tm * (reduce ? 0.25 : 1);
    U.uTime.value = t; U.uMorph.value = morphS;
    U.uRotY.value = 0.4 + 0.035 * t + 0.22 * Math.sin(0.057 * t + 0.3) + 0.07 * Math.sin(0.131 * t + 1.7) + tiltY + morphS * 0.9
                    - (reduce ? 0 : 0.8 * (1 - Math.min(1, Math.max(0, entryT / 3.2))));
    U.uRotX.value = -0.1 + 0.09 * Math.sin(0.043 * t + 2.1) + 0.03 * Math.sin(0.107 * t) + tiltX;
    U.uMouse.value.set(fxS, fyS, presS * inter * (reduce ? 0.25 : 1) * (0.55 + 0.7 * Math.min(1, spd)));
    U.uPar.value.set(mxS * inter, myS * inter);
    if (!reduce && tm > nextPulse && entryT > 3) {
      var arr = FORMS[Math.min(3, Math.round(morphS))], j = Math.floor(Math.random() * N);
      U.uPulse.value.set(arr[j * 3], arr[j * 3 + 1], arr[j * 3 + 2], t);
      nextPulse = tm + 3.5 + Math.random() * 4;
    }
    var gp = mode === 'home' ? glowPos[Math.min(3, Math.round(morphS))] : glowPos[0];
    if (gp) { glowT[0] += (gp[0] - glowT[0]) * kp; glowT[1] += (gp[1] - glowT[1]) * kp;
      bgGlow.style.setProperty('--gx', glowT[0].toFixed(1) + '%'); bgGlow.style.setProperty('--gy', glowT[1].toFixed(1) + '%'); }
    renderer.render(scene, camera);
  }
  requestAnimationFrame(function (n) { last = n; tick(n); });

  window.CDGScene = {
    setMode: function (m) { mode = PAGE_FORM.hasOwnProperty(m) ? m : 'home'; computeTargets(); setTimeout(measureStages, 60); },
    remeasure: measureStages,
    info: { particles: N }
  };
})();
