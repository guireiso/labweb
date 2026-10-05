/* ============================================================
   CDG · i18n.js — English ⇄ Português
   The data/*.js files hold the English content (base). When the
   language is "pt", data/data.pt.js is laid over it, and SITE is
   rewritten in place, so render.js / network.js just read SITE.
   Language choice: ?lang=pt|en in the URL → saved choice → browser language.
   ============================================================ */
(function () {
  'use strict';
  var PT = (typeof SITE_PT !== 'undefined') ? SITE_PT : null;
  var BASE = JSON.parse(JSON.stringify(SITE));
  var KEY = 'cdg-lang';

  function isPrim(x) { return x === null || typeof x !== 'object'; }

  // lay the translation patch over the base, same shape; lists of objects match by position
  function merge(b, p) {
    if (p === undefined || p === null) return b;
    if (Array.isArray(b)) {
      if (!Array.isArray(p)) return b;
      if (b.every(isPrim)) return p.slice();
      return b.map(function (x, i) { return merge(x, p[i]); });
    }
    if (b && typeof b === 'object') {
      if (typeof p !== 'object') return b;
      var o = {};
      Object.keys(b).forEach(function (k) { o[k] = merge(b[k], p[k]); });
      return o;
    }
    return typeof p === typeof b ? p : b;
  }

  // exact-match dictionary + "field_pt" siblings (e.g. bio_pt next to bio)
  function post(n, dict) {
    if (typeof n === 'string') return dict.hasOwnProperty(n) ? dict[n] : n;
    if (Array.isArray(n)) return n.map(function (x) { return post(x, dict); });
    if (n && typeof n === 'object') {
      var o = {};
      Object.keys(n).forEach(function (k) {
        if (/_pt$/.test(k)) return;
        var alt = n[k + '_pt'];
        o[k] = ((typeof alt === 'string' && alt !== '') || (Array.isArray(alt) && alt.length)) ? alt : post(n[k], dict);
      });
      return o;
    }
    return n;
  }

  function build(lang) {
    var out = JSON.parse(JSON.stringify(BASE));
    if (lang !== 'pt' || !PT) return out;
    out = merge(out, PT.patch || {});
    var team = out.team || {}, alumni = (team.alumni || {}).list || [];
    alumni.forEach(function (a) { if (PT.alumniRoles && PT.alumniRoles[a.role]) a.role = PT.alumniRoles[a.role]; });
    (team.members || []).concat(alumni).forEach(function (m) {
      var o = PT.byName && PT.byName[m.name];
      if (o) Object.keys(o).forEach(function (k) { m[k] = o[k]; });
    });
    out = post(out, PT.dict || {});  // last: "field_pt" values win over everything above
    return out;
  }

  function initial() {
    var q = /[?&]lang=(pt|en)/i.exec(location.search);
    if (q) return q[1].toLowerCase();
    try { var s = localStorage.getItem(KEY); if (s === 'pt' || s === 'en') return s; } catch (e) {}
    var nav = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
    return /^pt/i.test(nav[0] || '') ? 'pt' : 'en';
  }

  function apply(lang) {
    var fresh = build(lang);
    Object.keys(SITE).forEach(function (k) { delete SITE[k]; });
    Object.keys(fresh).forEach(function (k) { SITE[k] = fresh[k]; });
    api.lang = lang;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }

  var api = {
    lang: 'en',
    set: function (lang) {
      if (lang !== 'pt' && lang !== 'en') return;
      apply(lang);
      try { localStorage.setItem(KEY, lang); } catch (e) {}
    }
  };
  window.CDGI18N = api;
  apply(initial());
})();
