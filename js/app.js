/* ============================================================
   CDG · app.js — routing, interactions, glue
   Hash routes (no reload, back/forward work, pages are linkable):
     #/home  #/research  #/groups  #/groups/leitao  #/publications  #/contact
   ============================================================ */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var current = null, currentSub = null, io = null, profileKey = null;


  /* ── reveal on scroll (re-armed on every page change) ── */
  function armReveal() {
    if (io) io.disconnect();
    io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.15 });
    document.querySelectorAll('.page.active .rv, .site-foot .rv').forEach(function (el) { if (!el.classList.contains('in')) io.observe(el); });
  }

  /* ── routing ── */
  function parse() { var m = (location.hash || '').replace(/^#\/?/, '').split('/'); return { page: m[0] || 'home', sub: m[1] || '' }; }
  function valid(p) { return SITE.nav.some(function (n) { return n.id === p; }); }
  function show(route) {
    var page = valid(route.page) ? route.page : 'home', changed = page !== current;
    document.querySelectorAll('.page').forEach(function (el) { el.classList.toggle('active', el.id === 'page-' + page); });
    document.querySelectorAll('.nav a').forEach(function (a) { var on = a.getAttribute('data-page') === page; a.classList.toggle('active', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    var label = SITE.nav.filter(function (n) { return n.id === page; })[0].label;
    document.title = (page === 'home' ? '' : label + ' · ') + SITE.general.pageTitle;
    document.body.setAttribute('data-page', page);
    closeMenu();
    var subChanged = route.sub !== currentSub; currentSub = route.sub;
    if (changed || (page === 'news' && subChanged)) window.scrollTo(0, 0);
    current = page;
    if (window.CDGScene) CDGScene.setMode(page);
    if (page === 'news') { var post = CDGRender.post(route.sub); if (post) document.title = post.title.replace(/[\[\]]/g, '') + ' · ' + SITE.general.pageTitle; }
    if (page === 'groups') { selectGroup(route.sub || profileKey || SITE.groups[0].key, !!route.sub); setTimeout(CDGNetwork.draw, 30); }
    armReveal();
    if (page === 'home') document.querySelectorAll('.hero .rv').forEach(function (el) { setTimeout(function () { el.classList.add('in'); }, 60); });
    if (window.CDGScene) setTimeout(CDGScene.remeasure, 80);
  }
  window.addEventListener('hashchange', function () { show(parse()); });

  /* ── header ── */
  function onScroll() { document.body.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var menuBtn = $('menuBtn'), navEl = $('nav');
  function closeMenu() { document.body.classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', function () { var o = document.body.classList.toggle('menu-open'); menuBtn.setAttribute('aria-expanded', String(o)); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); closeModal(); } });

  /* ── filters ── */
  function pills(id, apply) {
    var box = $(id); if (!box) return;
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.pill'); if (!b) return;
      box.querySelectorAll('.pill').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
      apply(b.getAttribute('data-f'));
    });
  }
  var resF = 'all', pubF = 'all';
  var PUB_PER_PAGE = 15, pubPage = 1;
  // filter (group + search) → paginate → hide empty year headings → update count and pager
  function pubApply(keepPage) {
    if (keepPage !== true) pubPage = 1;
    var q = ($('pubSearch').value || '').trim().toLowerCase(), match = [];
    document.querySelectorAll('#pubList .pub').forEach(function (c) {
      var okG = pubF === 'all' || c.getAttribute('data-groups').split(' ').indexOf(pubF) >= 0, okQ = !q || c.getAttribute('data-hay').indexOf(q) >= 0;
      if (okG && okQ) match.push(c); else c.hidden = true;
    });
    var pages = Math.max(1, Math.ceil(match.length / PUB_PER_PAGE));
    pubPage = Math.min(Math.max(1, pubPage), pages);
    match.forEach(function (c, i) { c.hidden = Math.floor(i / PUB_PER_PAGE) !== pubPage - 1; });
    document.querySelectorAll('#pubList .pub-year').forEach(function (h) {
      h.hidden = !document.querySelector('#pubList .pub[data-year="' + h.getAttribute('data-year') + '"]:not([hidden])');
    });
    $('pubEmpty').hidden = match.length > 0;
    $('pubCount').textContent = SITE.ui.pubCount.replace('{n}', match.length);
    renderPager(pages);
  }
  function renderPager(pages) {
    var box = $('pubPager'), u = SITE.ui; if (!box) return;
    if (pages < 2) { box.innerHTML = ''; box.hidden = true; return; }
    box.hidden = false;
    var nums = [], i;
    for (i = 1; i <= pages; i++) if (pages <= 9 || i === 1 || i === pages || Math.abs(i - pubPage) <= 1) nums.push(i); else if (nums[nums.length - 1] !== '…') nums.push('…');
    box.innerHTML = '<button class="pg pg-nav" data-p="' + (pubPage - 1) + '"' + (pubPage === 1 ? ' disabled' : '') + '><span aria-hidden="true">←</span> ' + u.prevPage + '</button>' +
      nums.map(function (n) { return n === '…' ? '<span class="pg-gap">…</span>' : '<button class="pg' + (n === pubPage ? ' on' : '') + '" data-p="' + n + '"' + (n === pubPage ? ' aria-current="page"' : '') + '>' + n + '</button>'; }).join('') +
      '<button class="pg pg-nav" data-p="' + (pubPage + 1) + '"' + (pubPage === pages ? ' disabled' : '') + '>' + u.nextPage + ' <span aria-hidden="true">→</span></button>';
  }


  /* ── groups: tabs + profile ── */
  function selectGroup(key, scrollTo) {
    if (!CDGRender.group(key)) key = SITE.groups[0].key;
    profileKey = key;
    document.querySelectorAll('#groupTabs .tab').forEach(function (t) { var on = t.getAttribute('data-g') === key; t.classList.toggle('on', on); t.setAttribute('aria-selected', String(on)); });
    CDGRender.profile(key);
    if (scrollTo) setTimeout(function () { var el = $('groupTabs'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: reduce ? 'auto' : 'smooth' }); }, 120);
  }
  var rz; window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { if (current === 'groups') CDGNetwork.draw(); }, 200); });

  // listeners on elements that render.js rebuilds (they are replaced when the language changes)
  function bindDynamic() {
    pills('resFilter', function (f) {
      resF = f;
      document.querySelectorAll('#resGrid .proj').forEach(function (c) { var ok = f === 'all' || c.getAttribute('data-groups').split(' ').indexOf(f) >= 0; c.hidden = !ok; });
    });
    pills('pubFilter', function (f) { pubF = f; pubApply(); });
    pills('newsFilter', function (f) {
      var n = 0;
      document.querySelectorAll('#newsList .npost').forEach(function (c) { var ok = f === 'all' || c.getAttribute('data-tags').split('|').indexOf(f) >= 0; c.hidden = !ok; if (ok) n++; });
      $('newsEmpty').hidden = n > 0;
    });
    $('pubSearch').addEventListener('input', pubApply);
    $('pubPager').addEventListener('click', function (e) {
      var b = e.target.closest('.pg[data-p]'); if (!b || b.disabled) return;
      pubPage = +b.getAttribute('data-p'); pubApply(true);
      var top = $('pubCount').getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
    });
    pubApply();
    $('groupTabs').addEventListener('click', function (e) { var t = e.target.closest('.tab'); if (t) { selectGroup(t.getAttribute('data-g')); history.replaceState(null, '', '#/groups/' + t.getAttribute('data-g')); } });
    $('netReset').addEventListener('click', function () { CDGNetwork.reset(); });
    $('contactForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var form = e.target, note = $('formNote'), u = SITE.ui, url = (SITE.contact.form || {}).endpoint;
      if (!url) { note.textContent = u.formNote; return; }   // no form service connected yet (see data.contact.js)
      var data = new FormData(form);
      if (!data.get('name') || !data.get('email') || !data.get('message')) { note.textContent = u.formMissing; return; }
      data.append('_subject', 'Chemical Discovery Group website — message from ' + data.get('name'));
      var btn = form.querySelector('button[type=submit]'); btn.disabled = true; note.textContent = u.formSending;
      fetch(url, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); form.reset(); note.textContent = u.formSent; })
        .catch(function () { note.textContent = u.formError; })
        .then(function () { btn.disabled = false; });
    });
  }

  /* ── language ── */
  function applyStatic() {
    var u = SITE.ui, lang = CDGI18N.lang;
    navEl.closest('nav').setAttribute('aria-label', u.navAria);
    menuBtn.textContent = u.menu.toUpperCase();
    $('modalClose').setAttribute('aria-label', u.close);
    document.querySelector('.logo').setAttribute('aria-label', u.homeAria);
    $('lang').setAttribute('aria-label', u.langAria);
    document.querySelectorAll('#lang [data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    var meta = document.querySelector('meta[name="description"]'); if (meta) meta.setAttribute('content', u.metaDescription);
  }
  function relang(lang) {
    CDGI18N.set(lang);
    resF = 'all'; pubF = 'all';
    CDGRender.all(); bindDynamic(); applyStatic();
    show(parse());
  }
  $('lang').addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang]');
    if (b && b.getAttribute('data-lang') !== CDGI18N.lang) relang(b.getAttribute('data-lang'));
  });

  /* ── modal ── */
  var lastFocus = null;
  function openModal(html) { lastFocus = document.activeElement; $('modalBody').innerHTML = html; $('modal').hidden = false; document.body.classList.add('modal-open'); $('modalClose').focus(); }
  function closeModal() { if ($('modal').hidden) return; $('modal').hidden = true; document.body.classList.remove('modal-open'); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  $('modalClose').addEventListener('click', closeModal);
  $('modal').addEventListener('click', function (e) { if (e.target === $('modal')) closeModal(); });
  window.CDGApp = {
    personModal: function (d) {
      var p = d.person, g = d.group, E = CDGRender.esc, ph = CDGRender.ph;
      var html = '<div class="pm" style="--g:' + (g ? g.color : '#8a96a8') + '">' + CDGRender.avatar(p, 'av-xl') +
        '<h3 id="modalTitle">' + E(p.name) + (p.degree ? ', ' + E(p.degree) : '') + '</h3><p class="role">' + E(p.role || d.sub || '') + (g ? ' · ' + E(g.name) : '') + '</p>' +
        (p.bio || p.shortBio || p.note ? '<p>' + ph(E(p.bio || p.shortBio || p.note)) + '</p>' : '');
      if (d.type === 'pi') html += '<a class="btn btn-primary" href="#/groups/' + g.key + '" data-close>' + CDGRender.esc(SITE.ui.viewFullProfile).toUpperCase() + ' <span aria-hidden="true">→</span></a>';
      openModal(html + '</div>');
    }
  };
  $('modalBody').addEventListener('click', function (e) { if (e.target.closest('[data-close]')) closeModal(); });

  /* ── boot ── */
  CDGRender.all(); bindDynamic(); applyStatic();
  show(parse());
  window.addEventListener('load', function () { if (window.CDGScene) CDGScene.remeasure(); });
})();
