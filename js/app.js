/* ============================================================
   CDG · app.js — routing, interactions, glue
   Hash routes (no reload, back/forward work, pages are linkable):
     #/home  #/research  #/groups  #/groups/leitao  #/publications  #/contact
   ============================================================ */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var current = null, io = null, profileKey = null;

  CDGRender.all();

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
    if (changed) { window.scrollTo(0, 0); current = page; }
    if (window.CDGScene) CDGScene.setMode(page);
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
  var resF = 'all';
  pills('resFilter', function (f) {
    resF = f;
    document.querySelectorAll('#resGrid .proj').forEach(function (c) { var ok = f === 'all' || c.getAttribute('data-groups').split(' ').indexOf(f) >= 0; c.hidden = !ok; });
  });
  var pubF = 'all';
  function pubApply() {
    var q = ($('pubSearch').value || '').trim().toLowerCase(), n = 0;
    document.querySelectorAll('#pubList .pub').forEach(function (c) {
      var okG = pubF === 'all' || c.getAttribute('data-groups').split(' ').indexOf(pubF) >= 0, okQ = !q || c.getAttribute('data-hay').indexOf(q) >= 0;
      c.hidden = !(okG && okQ); if (!c.hidden) n++;
    });
    $('pubEmpty').hidden = n > 0;
  }
  pills('pubFilter', function (f) { pubF = f; pubApply(); });
  $('pubSearch').addEventListener('input', pubApply);

  /* ── groups: tabs + profile ── */
  function selectGroup(key, scrollTo) {
    if (!CDGRender.group(key)) key = SITE.groups[0].key;
    profileKey = key;
    document.querySelectorAll('#groupTabs .tab').forEach(function (t) { var on = t.getAttribute('data-g') === key; t.classList.toggle('on', on); t.setAttribute('aria-selected', String(on)); });
    CDGRender.profile(key);
    document.querySelectorAll('#profile .rv, #profile *').length; // profile content is not reveal-gated
    if (scrollTo) setTimeout(function () { var el = $('groupTabs'); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: reduce ? 'auto' : 'smooth' }); }, 120);
  }
  $('groupTabs').addEventListener('click', function (e) { var t = e.target.closest('.tab'); if (t) { selectGroup(t.getAttribute('data-g')); history.replaceState(null, '', '#/groups/' + t.getAttribute('data-g')); } });
  $('netReset').addEventListener('click', function () { CDGNetwork.reset(); });
  var rz; window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { if (current === 'groups') CDGNetwork.draw(); }, 200); });

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
      if (d.type === 'pi') html += '<a class="btn btn-primary" href="#/groups/' + g.key + '" data-close>VIEW FULL PROFILE <span aria-hidden="true">→</span></a>';
      openModal(html + '</div>');
    }
  };
  $('modalBody').addEventListener('click', function (e) { if (e.target.closest('[data-close]')) closeModal(); });

  /* ── contact form (presentational until a form service is connected) ── */
  $('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    $('formNote').textContent = 'This form is not connected yet — please email the group directly using the addresses on the left.';
  });

  /* ── boot ── */
  show(parse());
  window.addEventListener('load', function () { if (window.CDGScene) CDGScene.remeasure(); });
})();
