// === detail-panel.js ===
// 디테일 패널 (Overview 탭 클릭 시 표시)

(function(B) {
  'use strict';
  var S = B.state;

  B.detailPanel.clearHighlight = function() {
    B.dom.nodesLayer.querySelectorAll('.dim').forEach(function(n) { n.classList.remove('dim'); });
    B.dom.nodesLayer.querySelectorAll('.highlighted').forEach(function(n) { n.classList.remove('highlighted'); });
    B.dom.edgesLayer.querySelectorAll('.dim').forEach(function(n) { n.classList.remove('dim'); });
    B.dom.edgesLayer.querySelectorAll('.edge-highlight').forEach(function(n) { n.classList.remove('edge-highlight'); });
  };

  B.detailPanel.highlightAgent = function(agentId) {
    B.detailPanel.clearHighlight();
    var relatedWfKeys = new Set();
    Object.entries(S.layoutCache.workflows).forEach(function(entry) {
      if (entry[1].agentId === agentId) relatedWfKeys.add(entry[0]);
    });

    B.dom.nodesLayer.querySelectorAll('.agent-node, .wf-node').forEach(function(n) { n.classList.add('dim'); });
    B.dom.edgesLayer.querySelectorAll('.edge-line').forEach(function(n) { n.classList.add('dim'); });

    var agentEl = B.dom.nodesLayer.querySelector('.agent-node[data-id="' + agentId + '"]');
    if (agentEl) { agentEl.classList.remove('dim'); agentEl.classList.add('highlighted'); }

    relatedWfKeys.forEach(function(key) {
      var wfEl = B.dom.nodesLayer.querySelector('.wf-node[data-id="' + CSS.escape(key) + '"]');
      if (wfEl) { wfEl.classList.remove('dim'); wfEl.classList.add('highlighted'); }
    });

    B.dom.edgesLayer.querySelectorAll('.edge-wf').forEach(function(line) {
      var d = line.getAttribute('d') || '';
      var agentPos = S.layoutCache.agents[agentId];
      if (agentPos && d.includes((agentPos.x + 30) + ',' + (agentPos.y + B.AGT_H))) {
        line.classList.remove('dim');
        line.classList.add('edge-highlight');
      }
    });

    B.dom.nodesLayer.querySelectorAll('.module-card').forEach(function(n) { n.classList.remove('dim'); });
  };

  B.detailPanel.highlightWorkflow = function(wfId) {
    B.detailPanel.clearHighlight();
    var relatedAgentIds = new Set();
    var relatedWfKeys = new Set();
    BMAD_DATA.modules.forEach(function(mod) {
      mod.agents.forEach(function(agent) {
        if ((agent.workflows || []).includes(wfId)) {
          relatedAgentIds.add(agent.id);
        }
      });
    });
    Object.entries(S.layoutCache.workflows).forEach(function(entry) {
      if (entry[0].startsWith(wfId + ':')) relatedWfKeys.add(entry[0]);
    });

    B.dom.nodesLayer.querySelectorAll('.agent-node, .wf-node').forEach(function(n) { n.classList.add('dim'); });
    B.dom.edgesLayer.querySelectorAll('.edge-line').forEach(function(n) { n.classList.add('dim'); });

    relatedWfKeys.forEach(function(key) {
      var wfEl = B.dom.nodesLayer.querySelector('.wf-node[data-id="' + CSS.escape(key) + '"]');
      if (wfEl) { wfEl.classList.remove('dim'); wfEl.classList.add('highlighted'); }
    });

    relatedAgentIds.forEach(function(aid) {
      var agentEl = B.dom.nodesLayer.querySelector('.agent-node[data-id="' + aid + '"]');
      if (agentEl) { agentEl.classList.remove('dim'); agentEl.classList.add('highlighted'); }
    });

    B.dom.nodesLayer.querySelectorAll('.module-card').forEach(function(n) { n.classList.remove('dim'); });
  };

  B.detailPanel.show = function(type, item, mod) {
    var dp = B.dom.detailPanel;
    dp.classList.remove('hidden');

    var color = mod ? mod.color : (item.color || '#10b981');
    document.getElementById('detail-dot').style.background = color;
    document.getElementById('detail-title').textContent = item.name || item.shortName;

    var typeLabel = '';
    if (type === 'module') typeLabel = 'Module';
    else if (type === 'agent') typeLabel = 'Agent \u00B7 ' + mod.shortName;
    else typeLabel = 'Workflow \u00B7 ' + (mod ? mod.shortName : '');
    document.getElementById('detail-type').textContent = typeLabel;

    document.getElementById('detail-desc').textContent = item.description || '';

    var extras = document.getElementById('detail-extras');
    extras.innerHTML = '';

    if (type === 'module') {
      extras.innerHTML =
        '<span class="detail-tag">' + item.agents.length + ' Agents</span>' +
        '<span class="detail-tag">' + item.workflows.length + ' Workflows</span>';
    } else if (type === 'agent') {
      var wfNames = (item.workflows || []).map(function(wfId) {
        var allMods = BMAD_DATA.modules;
        for (var mi = 0; mi < allMods.length; mi++) {
          var found = allMods[mi].workflows.find(function(w) { return w.id === wfId; });
          if (found) return found.name;
        }
        return wfId;
      });
      extras.innerHTML = wfNames.map(function(n) { return '<span class="detail-tag">' + B.utils.esc(n) + '</span>'; }).join('');
    } else if (type === 'workflow') {
      var users = [];
      BMAD_DATA.modules.forEach(function(m) {
        m.agents.forEach(function(a) {
          if ((a.workflows || []).includes(item.id)) {
            users.push(a.name + ' (' + m.shortName + ')');
          }
        });
      });
      if (users.length > 0) {
        extras.innerHTML = '<span class="detail-tag" style="font-size:10px;color:var(--text3)">Used by:</span>' +
          users.map(function(u) { return '<span class="detail-tag">' + B.utils.esc(u) + '</span>'; }).join('');
      }
      if (item.category) {
        extras.innerHTML += '<span class="detail-tag" style="border-color:' + color + '">' + item.category + '</span>';
      }
    }
  };

  B.detailPanel.hide = function() {
    B.dom.detailPanel.classList.add('hidden');
    B.detailPanel.clearHighlight();
  };

})(window.BMAD);
