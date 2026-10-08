/* ============================================================
   CDG · render.js
   Builds every page's markup from the global SITE object
   (data/*.js). No content lives here — only structure.
   ============================================================ */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };

  /* ── helpers ── */
  function U() { return SITE.ui || {}; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  // [bracketed text] is a placeholder waiting for real content: make it visible as such
  function ph(html) { return String(html == null ? '' : html).replace(/\[([^\]]+)\]/g, '<span class="ph" title="' + esc(U().placeholderTip) + '">[$1]</span>'); }
  function group(key) { return (SITE.groups || []).filter(function (g) { return g.key === key; })[0]; }
  function gstyle(g) { return g ? ' style="--g:' + g.color + ';--gs:' + g.colorSoft + '"' : ''; }
  function dots(keys) { return '<span class="gdots">' + (keys || []).map(function (k) { var g = group(k); return g ? '<i style="background:' + g.color + '" title="' + esc(g.name) + '"></i>' : ''; }).join('') + '</span>'; }
  function btn(b) {
    return '<a class="btn btn-' + (b.style === 'primary' ? 'primary' : 'ghost') + '" href="#/' + b.page + '">' + esc(b.label).toUpperCase() +
      (b.arrow ? ' <span class="arr" aria-hidden="true">→</span>' : '') + '</a>';
  }
  function head(tag, heading, intro, cls) {
    return '<header class="sec-head ' + (cls || '') + '">' + (tag ? '<p class="eyebrow rv">' + esc(tag) + '</p>' : '') +
      '<h2 class="rv d1">' + heading + '</h2>' + (intro ? '<p class="intro rv d2">' + ph(intro) + '</p>' : '') + '</header>';
  }
  function avatar(p, cls) {
    var ini = esc(p.initials || (p.name || '?').split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2));
    if (p.photo) return '<span class="av ' + (cls || '') + '"><img src="' + esc(encodeURI(p.photo)) + '" alt="" loading="lazy" onerror="this.parentNode.classList.add(\'noimg\');this.remove()"><b>' + ini + '</b></span>';
    return '<span class="av noimg ' + (cls || '') + '"><b>' + ini + '</b></span>';
  }
  var ICONS = {
    proteomics: '<path d="M3 21h18M5 21V11M8 21V5M11 21v-8M14 21V8M17 21v-5M20 21v-3"/>',
    network: '<circle cx="6" cy="7" r="2.4"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="17" r="2.8"/><path d="M8 8.3l2.6 6.4M16.5 7.6l-3.4 7M8.4 7l7.6-.8"/>',
    compute: '<path d="M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9z"/><circle cx="12" cy="12" r="3.6"/>',
    assay: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="7.5" cy="9.5" r="1.4"/><circle cx="12" cy="9.5" r="1.4"/><circle cx="16.5" cy="9.5" r="1.4"/><circle cx="7.5" cy="14.5" r="1.4"/><circle cx="12" cy="14.5" r="1.4"/><circle cx="16.5" cy="14.5" r="1.4"/>',
    pin: '<path d="M12 21s-7-6.4-7-11.5A7 7 0 0 1 19 9.5C19 14.6 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/>',
    at: '<circle cx="12" cy="12" r="3.8"/><path d="M15.8 12v1.6a2.6 2.6 0 0 0 5.2 0V12a9 9 0 1 0-3.6 7.2"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>'
  };
  function icon(k) { return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[k] || ICONS.flask) + '</svg>'; }

  /* ── nav + footer ── */
  function renderNav() {
    $('nav').innerHTML = SITE.nav.map(function (n) { return '<li><a href="#/' + n.id + '" data-page="' + n.id + '">' + esc(n.label).toUpperCase() + '</a></li>'; }).join('');
  }
  function renderFooter() {
    var f = SITE.footer;
    $('footer').innerHTML = '<div class="foot"><div><h2 class="rv">' + f.heading + '</h2><p class="rv d1">' + ph(f.text) + '</p></div>' +
      '<a class="btn btn-ghost rv d2" href="#/' + f.button.page + '">' + esc(f.button.label).toUpperCase() + ' <span aria-hidden="true">→</span></a></div>' +
      '<div class="foot-row"><p class="fine">' + esc(f.fine).toUpperCase() + '</p><ul class="foot-nav">' +
      SITE.nav.map(function (n) { return '<li><a href="#/' + n.id + '">' + esc(n.label) + '</a></li>'; }).join('') + '</ul></div>';
  }

  /* ── HOME ── */
  function groupCard(g) {
    var pi = g.pi;
    return '<article class="gcard"' + gstyle(g) + '>' +
      '<div class="gcard-top">' + avatar(pi, 'av-md') + '<div><h3>' + esc(g.name) + '</h3><p class="who">' + esc(pi.name) + (pi.degree ? ', ' + esc(pi.degree) : '') + '</p></div></div>' +
      '<p class="tagline">' + ph(g.tagline) + '</p>' +
      '<ul class="tags">' + g.focusAreas.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
      '<a class="more" href="#/groups/' + g.key + '">' + esc(U().viewGroup) + ' <span aria-hidden="true">→</span></a></article>';
  }
  function renderHome() {
    var h = SITE.hero;
    $('hero').innerHTML =
      '<p class="eyebrow rv d1">' + h.label.map(esc).join(' <i>·</i> ') + '</p>' +
      '<h1 class="rv d1">' + h.titleHtml + '</h1>' +
      '<p class="lead rv d3">' + ph(h.paragraph) + '</p>' +
      '<div class="ctas rv d4">' + h.buttons.map(btn).join('') + '</div>';
    var s = SITE.pathway;
    $('showcase').innerHTML = head(s.tag, s.heading, s.intro) + '<div class="gcards rv d3">' + s.steps.map(function (st) {
      var g = group(st.group);
      return '<article class="gcard"' + gstyle(g) + '><div class="gcard-top">' + icon(st.icon) + '<h3>' + esc(st.title) + '</h3></div>' +
        '<p class="tagline">' + ph(st.text) + '</p><ul class="tags">' + st.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
        '<a class="more" href="#/' + s.link.page + '">' + esc(s.link.label) + ' <span aria-hidden="true">→</span></a></article>';
    }).join('') + '</div>';
    var a = SITE.approachIntro;
    $('approach').innerHTML = '<h2 class="stmt rv">' + esc(a.statement) + '</h2><h2 class="stmt sub rv d2">' + esc(a.statementSub) + '</h2>' +
      '<div class="approach"><p class="eyebrow center rv">' + esc(a.tag) + '</p><h3 class="approach-h rv d1">' + esc(a.heading) + '</h3><div class="acards">' +
      SITE.approachCards.map(function (c, i) { return '<article class="acard rv d' + (i + 1) + '">' + icon(c.icon) + '<h4>' + esc(c.title) + '</h4><p>' + ph(c.text) + '</p></article>'; }).join('') +
      '</div></div>';
    var m = SITE.moleculeSection;
    $('molecule').innerHTML = '<p class="eyebrow rv">' + esc(m.tag) + '</p><h2 class="rv d1">' + m.heading + '</h2><p class="rv d2">' + ph(m.text) + '</p>' +
      '<div class="ctas rv d3">' + m.buttons.map(btn).join('') + '</div>';
  }

  /* ── RESEARCH ── */
  function filterPills(id, allLabel) {
    return '<div class="pills" role="group" aria-label="' + esc(U().filterByGroup) + '" id="' + id + '"><button class="pill on" data-f="all">' + esc(allLabel || U().all) + '</button>' +
      SITE.groups.map(function (g) { return '<button class="pill"' + gstyle(g) + ' data-f="' + g.key + '"><i></i>' + esc(g.shortName) + '</button>'; }).join('') + '</div>';
  }
  function renderResearch() {
    var r = SITE.research;
    $('research').innerHTML = head(r.tag, r.heading, r.intro) + '<div class="rv d3">' + filterPills('resFilter') + '</div>' +
      '<div class="grid" id="resGrid">' + r.projects.map(function (p) {
        var g = group(p.groups[0]);
        return '<article class="card proj" data-groups="' + p.groups.join(' ') + '"' + gstyle(p.groups.length > 1 ? null : g) + '>' +
          '<div class="card-top">' + dots(p.groups) + (p.groups.length > 1 ? '<span class="cross">' + esc(U().crossGroup) + '</span>' : '<span class="cross">' + esc(g ? g.shortName : '') + '</span>') + '</div>' +
          '<h3>' + ph(esc(p.title)) + '</h3><p>' + ph(p.text) + '</p><ul class="tags">' + p.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></article>';
      }).join('') + '</div>';
  }

  /* ── GROUPS ── */
  function renderGroups() {
    var gp = SITE.groupsPage;
    var aff = (SITE.affiliated || []).map(function (a) { return '<li>' + avatar(a, 'av-sm') + '<div><b>' + esc(a.name) + '</b> · ' + esc(a.role) + '<br><span>' + ph(a.note) + '</span></div></li>'; }).join('');
    $('groups').innerHTML = head(gp.tag, gp.heading, gp.intro) +
      '<div class="netpanel rv d3"><div class="netbar"><span class="eyebrow">' + esc(U().people) + '</span><span class="hint">' + esc(gp.networkHint) + '</span><button class="reset" id="netReset">' + esc(U().resetView) + '</button></div>' +
      '<div id="peopleNet" class="net"></div></div>' +
      (aff ? '<ul class="affil rv">' + aff + '</ul>' : '') +
      '<div class="tabs rv" role="tablist" id="groupTabs">' + SITE.groups.map(function (g, i) {
        return '<button role="tab" class="tab' + (i === 0 ? ' on' : '') + '"' + gstyle(g) + ' data-g="' + g.key + '" aria-selected="' + (i === 0) + '">' + avatar(g.pi, 'av-xs') + '<span>' + esc(g.name) + '</span></button>';
      }).join('') + '</div><div id="profile" class="profile" role="tabpanel"></div>';
  }
  function renderProfile(key) {
    var g = group(key) || SITE.groups[0], pi = g.pi, c = pi.contact || {};
    var members = (SITE.team.members || []).filter(function (m) { return m.group === g.key && m.level !== 'staff'; });
    var staff = (SITE.team.members || []).filter(function (m) { return m.level === 'staff'; });
    var roster = SITE.teamLevels.filter(function (l) { return l.key !== 'staff'; }).map(function (l) {
      var list = members.filter(function (m) { return m.level === l.key; }); if (!list.length) return '';
      return '<div class="lvl"><h4>' + esc(l.label) + '</h4><ul class="people">' + list.map(person).join('') + '</ul></div>';
    }).join('');
    var alumni = ((SITE.team.alumni || {}).list || []).filter(function (a) { return a.group === g.key; });
    // anything missing or still a [placeholder] is simply left out of the profile
    function real(v) { return v && !/^\[/.test(v) && !/^0000-0000-0000-0000$/.test(v); }
    function list(a) { return (a || []).filter(real); }
    var links = [];
    if (real(c.email) && /@/.test(c.email)) links.push('<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a>');
    if (real(c.orcid)) links.push('<a href="https://orcid.org/' + esc(c.orcid) + '" target="_blank" rel="noopener">ORCID ' + esc(c.orcid) + '</a>');
    if (real(c.lattes)) links.push('<a href="' + esc(c.lattes) + '" target="_blank" rel="noopener">' + esc(U().lattes) + '</a>');
    if (real(c.scholarUrl)) links.push('<a href="' + esc(c.scholarUrl) + '" target="_blank" rel="noopener">' + esc(c.scholarLabel || U().scholarDefault) + '</a>');
    var phil = list(pi.researchPhilosophy), bio = list(pi.biography), hl = list(pi.academicHighlights);
    $('profile').setAttribute('style', '--g:' + g.color + ';--gs:' + g.colorSoft);
    $('profile').innerHTML =
      '<div class="pf-side">' + avatar(pi, 'av-xl') + '<h3>' + esc(pi.name) + (pi.degree ? ', ' + esc(pi.degree) : '') + '</h3><p class="role">' + esc(pi.role) + ' · ' + esc(g.name) + '</p>' +
      (links.length ? '<ul class="contact-mini">' + links.map(function (l) { return '<li>' + l + '</li>'; }).join('') + '</ul>' : '') +
      '</div>' +
      '<div class="pf-main"><p class="tagline big">' + ph(g.tagline) + '</p><ul class="tags">' + g.focusAreas.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
      (phil.length ? '<h4>' + esc(U().researchPhilosophy) + '</h4>' + phil.map(function (p) { return '<p>' + p + '</p>'; }).join('') : '') +
      (bio.length ? '<h4>' + esc(U().biography) + '</h4>' + bio.map(function (p) { return '<p>' + p + '</p>'; }).join('') : '') +
      (hl.length ? '<h4>' + esc(U().academicHighlights) + '</h4><ul class="hl-list">' + hl.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' : '') + '</div>' +
      '<div class="pf-team"><h4 class="team-h">' + esc(U().team) + '</h4>' + (roster || '<p class="empty">' + esc(U().noMembers) + '</p>') +
      (staff.length ? '<div class="lvl shared"><h4>' + esc(U().staffShared) + '</h4><ul class="people">' + staff.map(person).join('') + '</ul></div>' : '') +
      '<h4 class="team-h">' + esc((SITE.team.alumni || {}).heading || 'Alumni') + '</h4>' +
      (alumni.length ? '<ul class="alumni">' + alumni.map(function (a) { return '<li>' + avatar(a, 'av-sm') + '<div><b>' + esc(a.name) + '</b>' + [a.role, a.years].filter(Boolean).map(function (x) { return ' · ' + ph(esc(x)); }).join('') + (a.now ? '<span>' + ph(esc(a.now)) + '</span>' : '') + '</div></li>'; }).join('') + '</ul>' : '<p class="empty">' + esc(U().noAlumni) + '</p>') + '</div>';
  }
  function person(m) { return '<li class="person" data-name="' + esc(m.name) + '">' + avatar(m, 'av-sm') + '<div><b>' + esc(m.name) + '</b><span>' + esc(m.role) + '</span>' + (m.bio ? '<p>' + ph(esc(m.bio)) + '</p>' : '') + '</div></li>'; }

  /* ── PUBLICATIONS ── */
  function renderPublications() {
    var p = SITE.publications, lastYear = null, types = { review: U().typeReview, chapter: U().typeChapter, proceedings: U().typeProceedings };
    var items = (p.items || []).slice().sort(function (a, b) { return b.year - a.year; });
    $('publications').innerHTML = head(p.tag, p.heading, p.intro) +
      '<div class="pubbar rv d3">' + filterPills('pubFilter') + '<label class="search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>' +
      '<input id="pubSearch" type="search" placeholder="' + esc(p.searchPlaceholder) + '" aria-label="' + esc(U().searchLabel) + '"></label></div>' +
      '<p class="pubcount" id="pubCount" aria-live="polite"></p>' +
      '<ol class="pubs" id="pubList">' + items.map(function (it) {
        var authors = ph(esc(it.authors)).replace(/\{\{HIGHLIGHT\}\}/g, '<span class="me">').replace(/\{\{\/HIGHLIGHT\}\}/g, '</span>');
        var journal = it.journal || it.journalName || '';
        var hay = (it.year + ' ' + journal + ' ' + it.title + ' ' + it.authors).toLowerCase().replace(/\{\{\/?highlight\}\}|<[^>]+>/g, '');
        var doi = !it.doi ? '' : /^\[/.test(it.doi) ? ph(esc(it.doi)) : '<a href="https://doi.org/' + esc(it.doi) + '" target="_blank" rel="noopener">doi:' + esc(it.doi) + '</a>';
        var yr = it.year !== lastYear ? '<li class="pub-year" data-year="' + it.year + '"><span>' + it.year + '</span></li>' : '';
        lastYear = it.year;
        return yr + '<li class="pub" data-year="' + it.year + '" data-groups="' + it.groups.join(' ') + '" data-hay="' + esc(hay) + '">' +
          '<div class="pub-meta">' + dots(it.groups) + (types[it.type] ? '<span class="badge badge-type">' + esc(types[it.type]) + '</span>' : '') + '</div>' +
          '<h3>' + ph(esc(it.title)) + '</h3><p class="authors">' + authors + '</p>' +
          '<p class="cite">' + (journal ? '<em>' + ph(esc(journal)) + '</em>' : '') + (it.citation ? ' ' + esc(it.citation) : '') + '</p>' +
          (doi ? '<p class="doi">' + doi + '</p>' : '') + '</li>';
      }).join('') + '</ol><p class="empty" id="pubEmpty" hidden>' + esc(U().noPubs) + '</p><nav class="pager" id="pubPager" aria-label="' + esc(U().pagesAria) + '" hidden></nav>';
  }

  /* ── CONTACT ── */
  function renderContact() {
    var c = SITE.contact;
    $('contact').innerHTML = head(c.tag, c.heading, c.intro) + '<div class="contact-grid">' +
      '<div class="rv d2"><ul class="rows">' + c.rows.filter(function (r) { return r.html; }).map(function (r) { return '<li>' + icon(r.icon) + '<div><h4>' + esc(r.label) + '</h4><p>' + ph(r.html) + '</p></div></li>'; }).join('') + '</ul>' +
      '<h4 class="fund-h">' + esc(c.funding.heading) + '</h4><ul class="badges">' + c.funding.badges.map(function (b) { return '<li>' + ph(esc(b)) + '</li>'; }).join('') + '</ul></div>' +
      '<form class="form card rv d3" id="contactForm" novalidate><h3>' + esc(c.form.heading) + '</h3>' + c.form.fields.map(function (f, i) {
        var id = 'cf' + i, nm = ' name="' + esc(f.name || ('field' + i)) + '"', ctl = f.type === 'textarea' ? '<textarea id="' + id + '"' + nm + ' rows="5" placeholder="' + esc(f.placeholder) + '"></textarea>' :
          (f.isGroup ? '<select id="' + id + '"' + nm + '><option value="">' + esc(U().notSure) + '</option>' + SITE.groups.map(function (g) { return '<option>' + esc(g.name) + '</option>'; }).join('') + '</select>' :
           '<input id="' + id + '"' + nm + ' type="' + esc(f.type) + '" placeholder="' + esc(f.placeholder) + '">');
        return '<label for="' + id + '">' + esc(f.label) + '</label>' + ctl;
      }).join('') + '<button class="btn btn-primary" type="submit">' + esc(c.form.submitLabel).toUpperCase() + '</button><p class="form-note" id="formNote" aria-live="polite"></p></form></div>';
  }


  /* ── NEWS ── */
  function lang() { return (window.CDGI18N && CDGI18N.lang) || 'en'; }
  function fmtDate(iso) {
    var d = new Date(iso + 'T12:00:00');
    if (isNaN(d.getTime())) return String(iso || '');
    return d.toLocaleDateString(lang() === 'pt' ? 'pt-BR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function posts() { return ((SITE.news || {}).posts || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; }); }
  function postMeta(p) {
    return '<span class="nmeta"><time datetime="' + esc(p.date) + '">' + esc(fmtDate(p.date)) + '</time>' +
      (p.tags || []).map(function (t) { return '<span class="ntag">' + ph(esc(t)) + '</span>'; }).join('') + '</span>';
  }
  function headline(p) { return '<li><a href="#/news/' + esc(p.slug) + '">' + postMeta(p) + '<b>' + ph(esc(p.title)) + '</b></a></li>'; }
  function renderHomeNews() {
    var n = SITE.news, box = $('homeNews'); if (!box) return;
    var list = posts().slice(0, 3);
    box.parentNode.hidden = !(n && list.length);
    if (!n || !list.length) return;
    box.innerHTML = '<div class="eyebrow rv">' + esc(n.homeTag || n.tag) + '</div><ul class="hnews rv d1">' + list.map(headline).join('') + '</ul>' +
      '<a class="nlink rv d2" href="#/news">' + esc(U().allNews) + ' <span aria-hidden="true">→</span></a>';
  }
  function renderNews() {
    var n = SITE.news || { posts: [] }, all = posts(), tags = [];
    all.forEach(function (p) { (p.tags || []).forEach(function (t) { if (tags.indexOf(t) < 0) tags.push(t); }); });
    $('news').innerHTML = '<div id="newsIndex">' + head(n.tag, esc(n.heading || ''), n.intro) +
      (tags.length > 1 ? '<div class="pills rv d3" role="group" aria-label="' + esc(U().filterByTag) + '" id="newsFilter"><button class="pill on" data-f="all">' + esc(U().all) + '</button>' +
        tags.map(function (t) { return '<button class="pill" data-f="' + esc(t) + '">' + ph(esc(t)) + '</button>'; }).join('') + '</div>' : '') +
      '<div class="grid nlist" id="newsList">' + all.map(function (p) {
        return '<article class="card npost" data-tags="' + esc((p.tags || []).join('|')) + '"><a href="#/news/' + esc(p.slug) + '">' +
          (p.image ? '<img class="ncover" src="' + esc(encodeURI(p.image)) + '" alt="" loading="lazy">' : '') +
          postMeta(p) + '<h3>' + ph(esc(p.title)) + '</h3>' + (p.summary ? '<p>' + ph(esc(p.summary)) + '</p>' : '') +
          '<span class="nread">' + esc(U().readMore) + ' <span aria-hidden="true">→</span></span></a></article>';
      }).join('') + '</div><p class="empty" id="newsEmpty" hidden>' + esc(U().noNews) + '</p></div>' +
      '<article class="npage" id="newsPost" hidden></article>';
  }
  // show one post (returns it), or the list when slug is empty/unknown (returns null)
  function renderPost(slug) {
    var idx = $('newsIndex'), art = $('newsPost'); if (!idx || !art) return null;
    var all = posts(), p = slug ? all.filter(function (x) { return x.slug === slug; })[0] : null;
    if (!p) { idx.hidden = false; art.hidden = true; art.innerHTML = ''; return null; }
    var others = all.filter(function (x) { return x !== p; }).slice(0, 3);
    art.innerHTML = '<a class="nlink nback" href="#/news"><span aria-hidden="true">←</span> ' + esc(U().backToNews) + '</a>' +
      postMeta(p) + '<h2>' + ph(esc(p.title)) + '</h2>' + (p.summary ? '<p class="nlead">' + ph(esc(p.summary)) + '</p>' : '') +
      (p.image ? '<img class="nimg" src="' + esc(encodeURI(p.image)) + '" alt="">' : '') +
      '<div class="nbody">' + (p.body || []).map(function (t) { return '<p>' + ph(t) + '</p>'; }).join('') + '</div>' +
      (others.length ? '<h4 class="nmore-h">' + esc(U().moreNews) + '</h4><ul class="hnews">' + others.map(headline).join('') + '</ul>' : '');
    idx.hidden = true; art.hidden = false;
    return p;
  }

  window.CDGRender = { all: function () { renderNav(); renderHome(); renderHomeNews(); renderResearch(); renderGroups(); renderPublications(); renderNews(); renderContact(); renderFooter(); }, profile: renderProfile, post: renderPost, group: group, avatar: avatar, esc: esc, ph: ph };
})();
