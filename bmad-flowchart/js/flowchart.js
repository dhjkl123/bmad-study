// === flowchart.js ===
// 레이아웃 계산 및 SVG 플로우차트 렌더링

(function(B) {
  'use strict';
  var S = B.state;

  B.flowchart.computeLayout = function() {
    var mods = BMAD_DATA.modules;
    var core = mods[0];
    var rest = mods.slice(1);

    var positions = { modules: {}, agents: {}, workflows: {} };

    var rowW = rest.length * B.MOD_W + (rest.length - 1) * B.GAP_X;

    var coreX = B.PAD + (rowW - B.MOD_W) / 2;
    var coreY = B.PAD;
    positions.modules[core.id] = { x: coreX, y: coreY, w: B.MOD_W, h: B.MOD_H, mod: core };

    var coreBottom = coreY + B.MOD_H;
    if (S.expanded[core.id]) {
      coreBottom = B.flowchart.placeChildren(core, coreX, coreY + B.MOD_H + 20, positions);
    }

    var row2Y = coreBottom + B.GAP_Y + 40;

    rest.forEach(function(mod, i) {
      var mx = B.PAD + i * (B.MOD_W + B.GAP_X);
      positions.modules[mod.id] = { x: mx, y: row2Y, w: B.MOD_W, h: B.MOD_H, mod: mod };
      if (S.expanded[mod.id]) {
        B.flowchart.placeChildren(mod, mx, row2Y + B.MOD_H + 20, positions);
      }
    });

    var maxX = 0, maxY = 0;
    Object.values(positions.modules).forEach(function(p) { maxX = Math.max(maxX, p.x + p.w); maxY = Math.max(maxY, p.y + p.h); });
    Object.values(positions.agents).forEach(function(p) { maxX = Math.max(maxX, p.x + p.w); maxY = Math.max(maxY, p.y + p.h); });
    Object.values(positions.workflows).forEach(function(p) { maxX = Math.max(maxX, p.x + p.w); maxY = Math.max(maxY, p.y + p.h); });

    positions.bounds = { w: maxX + B.PAD, h: maxY + B.PAD };
    S.layoutCache = positions;
    return positions;
  };

  B.flowchart.placeChildren = function(mod, startX, startY, positions) {
    var curY = startY;
    var agentX = startX + 20;

    mod.agents.forEach(function(agent) {
      positions.agents[agent.id] = { x: agentX, y: curY, w: B.AGT_W, h: B.AGT_H, agent: agent, modId: mod.id };
      curY += B.AGT_H + B.AGT_GAP;

      var wfX = agentX + 30;
      var wfIds = agent.workflows || [];
      wfIds.forEach(function(wfId) {
        var wf = mod.workflows.find(function(w) { return w.id === wfId; });
        if (!wf) {
          var coreWf = BMAD_DATA.modules[0].workflows.find(function(w) { return w.id === wfId; });
          if (coreWf) {
            positions.workflows[wfId + ':' + agent.id] = { x: wfX, y: curY, w: B.WF_W, h: B.WF_H, wf: coreWf, agentId: agent.id, modId: mod.id, cross: true };
            curY += B.WF_H + B.WF_GAP;
          }
          return;
        }
        positions.workflows[wfId + ':' + agent.id] = { x: wfX, y: curY, w: B.WF_W, h: B.WF_H, wf: wf, agentId: agent.id, modId: mod.id };
        curY += B.WF_H + B.WF_GAP;
      });

      curY += 6;
    });

    return curY;
  };

  B.flowchart.render = function() {
    B.dom.edgesLayer.innerHTML = '';
    B.dom.nodesLayer.innerHTML = '';

    var pos = B.flowchart.computeLayout();

    // 1) Dependency edges
    BMAD_DATA.dependencies.forEach(function(dep) {
      var from = pos.modules[dep.from];
      var to = pos.modules[dep.to];
      if (!from || !to) return;
      var x1 = from.x + from.w / 2;
      var y1 = from.y;
      var x2 = to.x + to.w / 2;
      var y2 = to.y + to.h;
      var path = B.utils.el('path', {
        class: 'edge-line edge-dep',
        d: 'M' + x1 + ',' + y1 + ' C' + x1 + ',' + (y1 - 40) + ' ' + x2 + ',' + (y2 + 40) + ' ' + x2 + ',' + y2,
        'data-from': dep.from,
        'data-to': dep.to
      });
      var title = B.utils.el('title');
      title.textContent = dep.label;
      path.appendChild(title);
      B.dom.edgesLayer.appendChild(path);
    });

    // 2) Module cards
    Object.entries(pos.modules).forEach(function(entry) {
      var id = entry[0], p = entry[1];
      var mod = p.mod;
      var isExp = S.expanded[id];
      var g = B.utils.el('g', { class: 'module-card', 'data-id': id, transform: 'translate(' + p.x + ',' + p.y + ')' });

      g.appendChild(B.utils.el('rect', {
        class: 'module-card-bg',
        width: B.MOD_W, height: B.MOD_H,
        fill: B.utils.hexToRgba(mod.color, 0.1),
        stroke: B.utils.hexToRgba(mod.color, 0.4)
      }));

      g.appendChild(B.utils.el('rect', {
        x: 0, y: 0, width: 4, height: B.MOD_H,
        fill: mod.color, rx: 2
      }));

      g.appendChild(B.utils.makeText(mod.shortName + ' - ' + mod.name, 16, 28, 'module-label', B.MOD_W - 40));

      var aCount = mod.agents.length;
      var wCount = mod.workflows.length;
      g.appendChild(B.utils.makeText(aCount + ' agents  \u00B7  ' + wCount + ' workflows', 16, 46, 'module-sub'));

      g.appendChild(B.utils.makeText(isExp ? '\u25B2' : '\u25BC', B.MOD_W - 20, 40, 'module-expand-icon'));

      g.addEventListener('click', (function(moduleId) {
        return function(e) {
          e.stopPropagation();
          S.expanded[moduleId] = !S.expanded[moduleId];
          B.flowchart.render();
        };
      })(id));

      g.addEventListener('contextmenu', (function(modRef) {
        return function(e) {
          e.preventDefault();
          B.detailPanel.show('module', modRef);
        };
      })(mod));

      B.dom.nodesLayer.appendChild(g);
    });

    // 3) Agent nodes
    Object.entries(pos.agents).forEach(function(entry) {
      var id = entry[0], p = entry[1];
      var agent = p.agent;
      var mod = BMAD_DATA.modules.find(function(m) { return m.id === p.modId; });
      var color = mod ? mod.color : '#666';

      var modPos = pos.modules[p.modId];
      if (modPos) {
        var line = B.utils.el('path', {
          class: 'edge-line edge-agent',
          stroke: B.utils.hexToRgba(color, 0.3),
          d: 'M' + (modPos.x + 20) + ',' + (modPos.y + B.MOD_H) + ' L' + (modPos.x + 20) + ',' + (p.y + B.AGT_H / 2) + ' L' + p.x + ',' + (p.y + B.AGT_H / 2)
        });
        B.dom.edgesLayer.appendChild(line);
      }

      var g = B.utils.el('g', { class: 'agent-node visible', 'data-id': id, transform: 'translate(' + p.x + ',' + p.y + ')' });

      g.appendChild(B.utils.el('rect', {
        class: 'agent-bg',
        width: B.AGT_W, height: B.AGT_H,
        stroke: B.utils.hexToRgba(color, 0.25)
      }));

      g.appendChild(B.utils.el('circle', { cx: 14, cy: B.AGT_H / 2, r: 4, fill: color, opacity: 0.7 }));
      g.appendChild(B.utils.makeText(agent.name, 26, 18, 'agent-label'));
      g.appendChild(B.utils.makeText(agent.fullName, 26, 32, 'agent-role'));

      var wfCount = (agent.workflows || []).length;
      if (wfCount > 0) {
        g.appendChild(B.utils.el('rect', {
          class: 'agent-wf-count-bg',
          x: B.AGT_W - 28, y: (B.AGT_H - 16) / 2,
          width: 22, height: 16,
          fill: B.utils.hexToRgba(color, 0.2),
          stroke: B.utils.hexToRgba(color, 0.3),
          'stroke-width': 0.5
        }));
        g.appendChild(B.utils.makeText(wfCount.toString(), B.AGT_W - 17, B.AGT_H / 2 + 4, 'agent-wf-count'));
        g.querySelector('.agent-wf-count').setAttribute('text-anchor', 'middle');
      }

      g.addEventListener('click', (function(agentRef, modRef) {
        return function(e) {
          e.stopPropagation();
          B.detailPanel.highlightAgent(agentRef.id);
          B.detailPanel.show('agent', agentRef, modRef);
        };
      })(agent, mod));

      B.dom.nodesLayer.appendChild(g);
    });

    // 4) Workflow nodes
    Object.entries(pos.workflows).forEach(function(entry) {
      var key = entry[0], p = entry[1];
      var wf = p.wf;
      var mod = BMAD_DATA.modules.find(function(m) { return m.id === p.modId; });
      var color = mod ? mod.color : '#666';
      var agentPos = pos.agents[p.agentId];

      if (agentPos) {
        var line = B.utils.el('path', {
          class: 'edge-line edge-wf',
          stroke: B.utils.hexToRgba(color, 0.2),
          d: 'M' + (agentPos.x + 30) + ',' + (agentPos.y + B.AGT_H) + ' L' + (agentPos.x + 30) + ',' + (p.y + B.WF_H / 2) + ' L' + p.x + ',' + (p.y + B.WF_H / 2)
        });
        B.dom.edgesLayer.appendChild(line);
      }

      var g = B.utils.el('g', { class: 'wf-node visible', 'data-id': key, transform: 'translate(' + p.x + ',' + p.y + ')' });

      g.appendChild(B.utils.el('rect', {
        class: 'wf-bg',
        width: B.WF_W, height: B.WF_H
      }));

      g.appendChild(B.utils.el('rect', {
        x: 0, y: 0, width: 2, height: B.WF_H,
        fill: p.cross ? '#10b981' : B.utils.hexToRgba(color, 0.5),
        rx: 1
      }));

      g.appendChild(B.utils.makeText(wf.name, 10, B.WF_H / 2 + 4, 'wf-label'));

      g.addEventListener('click', (function(wfRef, modRef) {
        return function(e) {
          e.stopPropagation();
          B.detailPanel.highlightWorkflow(wfRef.id);
          B.detailPanel.show('workflow', wfRef, modRef);
        };
      })(wf, mod));

      B.dom.nodesLayer.appendChild(g);
    });

    B.zoomPan.applyTransform();
  };

})(window.BMAD);
