/* ============================================================
   CDG · network.js — the interactive people network (D3 v7, vendored)
   Built automatically from SITE.groups, SITE.team and SITE.affiliated:
     CDG → each PI (equal weight) → degree levels → people
     CDG → shared technicians · CDG → affiliated researchers
   Click a person/PI for details · click a level to fold/unfold ·
   click CDG to reset · drag nodes · scroll/pinch to zoom.
   ============================================================ */
(function () {
  'use strict';
  var sim = null, collapsed = {}, zoomBeh = null, svgSel = null, NEUTRAL = '#8a96a8';

  function build() {
    var nodes = [], links = [], root = { id: 'root', type: 'root', label: SITE.general.shortName, r: 34, color: '#eef2f6' };
    nodes.push(root);
    SITE.groups.forEach(function (g) {
      var pi = { id: 'pi-' + g.key, type: 'pi', label: g.pi.name, sub: g.name, r: 30, color: g.color, person: g.pi, group: g };
      nodes.push(pi); links.push({ source: 'root', target: pi.id, color: g.color, w: 2 });
      SITE.teamLevels.forEach(function (l) {
        if (l.key === 'staff') return;
        var mem = SITE.team.members.filter(function (m) { return m.group === g.key && m.level === l.key; });
        if (!mem.length) return;
        var cid = 'lv-' + g.key + '-' + l.key;
        nodes.push({ id: cid, type: 'level', label: l.label, r: 13, color: g.color, count: mem.length });
        links.push({ source: pi.id, target: cid, color: g.color, w: 1.4 });
        if (collapsed[cid]) return;
        mem.forEach(function (m, i) { var id = cid + '-' + i; nodes.push({ id: id, type: 'person', label: m.name, sub: m.role, r: 17, color: g.color, person: m, group: g }); links.push({ source: cid, target: id, color: g.color, w: 1 }); });
      });
    });
    var staff = SITE.team.members.filter(function (m) { return m.level === 'staff'; });
    if (staff.length) {
      nodes.push({ id: 'lv-staff', type: 'level', label: ((SITE.teamLevels || []).filter(function (l) { return l.key === 'staff'; })[0] || { label: 'Staff' }).label, r: 13, color: NEUTRAL, count: staff.length });
      links.push({ source: 'root', target: 'lv-staff', color: NEUTRAL, w: 1.2 });
      if (!collapsed['lv-staff']) staff.forEach(function (m, i) { var id = 'st-' + i; nodes.push({ id: id, type: 'person', label: m.name, sub: m.role + ' · ' + SITE.ui.sharedTag, r: 17, color: NEUTRAL, person: m }); links.push({ source: 'lv-staff', target: id, color: NEUTRAL, w: 1 }); });
    }
    (SITE.affiliated || []).forEach(function (a) {
      nodes.push({ id: 'af-' + a.key, type: 'person', label: a.name, sub: a.role, r: 17, color: NEUTRAL, person: a, dashed: true });
      links.push({ source: 'root', target: 'af-' + a.key, color: NEUTRAL, w: 1, dash: true });
    });
    return { nodes: nodes, links: links };
  }

  function initials(p) { return p.initials || (p.name || '?').split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2); }

  function draw() {
    var host = document.getElementById('peopleNet');
    if (!host) return;
    if (!window.d3) { host.innerHTML = '<p class="empty">Network diagram unavailable — the D3 library failed to load.</p>'; return; }
    var d3 = window.d3, W = host.clientWidth || 900, H = Math.max(420, Math.min(560, W * 0.55));
    host.innerHTML = '';
    var data = build(), prev = {};
    if (sim) sim.nodes().forEach(function (n) { prev[n.id] = n; });
    data.nodes.forEach(function (n) { var p = prev[n.id]; if (p) { n.x = p.x; n.y = p.y; } });
    var svg = d3.select(host).append('svg').attr('viewBox', [-W / 2, -H / 2, W, H]).attr('width', '100%').attr('height', H).attr('role', 'img')
      .attr('aria-label', SITE.ui.networkAria);
    svgSel = svg;
    var defs = svg.append('defs'), gAll = svg.append('g');
    zoomBeh = d3.zoom().scaleExtent([0.4, 2.6]).on('zoom', function (ev) { gAll.attr('transform', ev.transform); });
    svg.call(zoomBeh).on('dblclick.zoom', null);

    var link = gAll.append('g').selectAll('line').data(data.links).join('line')
      .attr('stroke', function (d) { return d.color; }).attr('stroke-opacity', 0.42).attr('stroke-width', function (d) { return d.w; })
      .attr('stroke-dasharray', function (d) { return d.dash ? '3 4' : null; });
    var node = gAll.append('g').selectAll('g').data(data.nodes, function (d) { return d.id; }).join('g')
      .attr('class', function (d) { return 'nn nn-' + d.type; }).attr('tabindex', 0).attr('role', 'button')
      .attr('aria-label', function (d) { return d.label + (d.sub ? ', ' + d.sub : ''); });

    node.append('circle').attr('class', 'halo').attr('r', function (d) { return d.r + 5; }).attr('fill', function (d) { return d.color; }).attr('opacity', function (d) { return d.type === 'pi' ? 0.16 : 0; });
    node.append('circle').attr('r', function (d) { return d.r; })
      .attr('fill', function (d) { return d.type === 'level' ? '#08111f' : '#0e1a2d'; })
      .attr('stroke', function (d) { return d.color; }).attr('stroke-width', function (d) { return d.type === 'root' ? 1.2 : d.type === 'pi' ? 2 : 1.2; })
      .attr('stroke-dasharray', function (d) { return d.dashed ? '3 3' : null; });
    // initials under a photo (the photo covers them when it loads)
    node.filter(function (d) { return d.person; }).append('text').attr('class', 'ini').attr('text-anchor', 'middle').attr('dy', '0.36em')
      .attr('fill', function (d) { return d.color; }).attr('font-size', function (d) { return d.r * 0.62; }).text(function (d) { return initials(d.person); });
    node.filter(function (d) { return d.person && d.person.photo; }).each(function (d) {
      var cid = 'clip-' + d.id.replace(/[^a-z0-9-]/gi, '');
      defs.append('clipPath').attr('id', cid).append('circle').attr('r', d.r - 1.5);
      d3.select(this).append('image').attr('href', encodeURI(d.person.photo)).attr('x', -d.r).attr('y', -d.r).attr('width', d.r * 2).attr('height', d.r * 2)
        .attr('preserveAspectRatio', 'xMidYMid slice').attr('clip-path', 'url(#' + cid + ')').on('error', function () { this.remove(); });
    });
    node.filter(function (d) { return d.type === 'root'; }).append('text').attr('class', 'root-t').attr('text-anchor', 'middle').attr('dy', '0.35em').text(function (d) { return d.label; });
    node.filter(function (d) { return d.type === 'level'; }).append('text').attr('class', 'cnt').attr('text-anchor', 'middle').attr('dy', '0.35em').attr('fill', function (d) { return d.color; }).text(function (d) { return collapsed[d.id] ? '+' + d.count : d.count; });
    node.filter(function (d) { return d.type !== 'root'; }).append('text').attr('class', function (d) { return 'lbl lbl-' + d.type; }).attr('text-anchor', 'middle')
      .attr('y', function (d) { return d.r + 15; }).text(function (d) { return d.type === 'level' ? d.label.toUpperCase() : d.label; });
    node.filter(function (d) { return d.type === 'pi'; }).append('text').attr('class', 'lbl lbl-sub').attr('text-anchor', 'middle').attr('y', function (d) { return d.r + 29; })
      .attr('fill', function (d) { return d.color; }).text(function (d) { return d.sub; });

    function activate(ev, d) {
      if (ev.defaultPrevented) return;
      if (d.type === 'root') { collapsed = {}; draw(); resetView(); return; }
      if (d.type === 'level') { collapsed[d.id] = !collapsed[d.id]; draw(); return; }
      if (window.CDGApp) window.CDGApp.personModal(d);
    }
    node.on('click', activate).on('keydown', function (ev, d) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); activate(ev, d); } })
      .on('mouseenter', function (ev, d) {
        var keep = {}; keep[d.id] = 1; data.links.forEach(function (l) { if (l.source.id === d.id) keep[l.target.id] = 1; if (l.target.id === d.id) keep[l.source.id] = 1; });
        node.attr('opacity', function (n) { return keep[n.id] ? 1 : 0.35; }); link.attr('stroke-opacity', function (l) { return (l.source.id === d.id || l.target.id === d.id) ? 0.85 : 0.12; });
      })
      .on('mouseleave', function () { node.attr('opacity', 1); link.attr('stroke-opacity', 0.42); });

    node.call(d3.drag()
      .on('start', function (ev, d) { if (!ev.active) sim.alphaTarget(0.25).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag', function (ev, d) { d.fx = ev.x; d.fy = ev.y; })
      .on('end', function (ev, d) { if (!ev.active) sim.alphaTarget(0); if (d.type !== 'root') { d.fx = null; d.fy = null; } }));

    var root = data.nodes[0]; root.fx = 0; root.fy = 0;
    // the two PIs pulled to mirrored positions — equal weight, left and right
    var piX = {}; SITE.groups.forEach(function (g, i) { piX['pi-' + g.key] = (i === 0 ? -1 : 1) * Math.min(W * 0.26, 260); });
    sim = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(function (d) { return d.id; }).distance(function (l) { return l.target.type === 'pi' ? Math.min(W * 0.24, 230) : l.target.type === 'level' ? 78 : 58; }).strength(0.7))
      .force('charge', d3.forceManyBody().strength(function (d) { return d.type === 'pi' ? -700 : d.type === 'level' ? -260 : -180; }))
      .force('collide', d3.forceCollide().radius(function (d) { return d.r + 18; }))
      .force('x', d3.forceX(function (d) { return piX[d.id] !== undefined ? piX[d.id] : 0; }).strength(function (d) { return piX[d.id] !== undefined ? 0.3 : 0.02; }))
      .force('y', d3.forceY(0).strength(0.05))
      .on('tick', function () {
        link.attr('x1', function (d) { return d.source.x; }).attr('y1', function (d) { return d.source.y; }).attr('x2', function (d) { return d.target.x; }).attr('y2', function (d) { return d.target.y; });
        node.attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; });
      });
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { sim.stop(); for (var i = 0; i < 300; i++) sim.tick(); sim.on('tick')(); }
  }
  function resetView() { if (svgSel && zoomBeh) svgSel.transition().duration(600).call(zoomBeh.transform, window.d3.zoomIdentity); }

  window.CDGNetwork = { draw: draw, reset: function () { collapsed = {}; draw(); resetView(); } };
})();
