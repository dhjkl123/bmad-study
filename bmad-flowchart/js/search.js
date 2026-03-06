// === search.js ===
// 검색 기능

(function(B) {
  'use strict';
  var S = B.state;

  B.search.buildIndex = function() {
    var items = [];
    BMAD_DATA.modules.forEach(function(mod) {
      mod.agents.forEach(function(agent) {
        items.push({
          type: 'agent',
          name: agent.name,
          fullName: agent.fullName,
          id: agent.id,
          modId: mod.id,
          modName: mod.shortName,
          color: mod.color,
          data: agent
        });
        // Index agent file
        if (agent.agentFile) {
          items.push({
            type: 'file',
            subType: 'agent',
            name: agent.agentFile.split('/').pop(),
            fullName: agent.fullName,
            id: agent.agentFile,
            modId: mod.id,
            modName: mod.shortName,
            color: mod.color,
            data: agent,
            wfId: agent.id,
            wfName: agent.name
          });
        }
      });
      mod.workflows.forEach(function(wf) {
        items.push({
          type: 'workflow',
          name: wf.name,
          fullName: wf.description || '',
          id: wf.id,
          modId: mod.id,
          modName: mod.shortName,
          color: mod.color,
          data: wf
        });
        // Index workflow definition file
        if (wf.workflowFile) {
          items.push({
            type: 'file',
            subType: 'workflow',
            name: wf.workflowFile.split('/').pop(),
            fullName: wf.description || '',
            id: wf.workflowFile,
            modId: mod.id,
            modName: mod.shortName,
            color: mod.color,
            data: { path: wf.workflowFile, type: wf.workflowFile.split('.').pop() },
            wfId: wf.id,
            wfName: wf.name
          });
        }

        // Index files within workflows
        var indexFiles = function(files, wfRef) {
          (files || []).forEach(function(f) {
            var fileName = f.path.split('/').pop();
            items.push({
              type: 'file',
              name: fileName,
              fullName: f.purpose || '',
              id: f.path,
              modId: mod.id,
              modName: mod.shortName,
              color: mod.color,
              data: f,
              wfId: wfRef.id,
              wfName: wfRef.name
            });
            if (f.children) indexFiles(f.children, wfRef);
          });
        };
        indexFiles(wf.files, wf);
      });
    });
    // Add doc items to search index
    if (typeof DOC_DATA !== 'undefined') {
      DOC_DATA.categories.forEach(function(cat) {
        if (cat.id === 'glossary') return;
        cat.items.forEach(function(item) {
          items.push({
            type: 'doc',
            id: item.id,
            name: item.title,
            fullName: cat.title + ' > ' + item.title,
            color: '#3b82f6',
            modId: 'doc',
            modName: 'Doc'
          });
        });
      });
    }

    return items;
  };

  B.search.highlightMatch = function(text, query) {
    if (!query) return B.utils.esc(text);
    var idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return B.utils.esc(text);
    var before = text.slice(0, idx);
    var match = text.slice(idx, idx + query.length);
    var after = text.slice(idx + query.length);
    return B.utils.esc(before) + '<mark>' + B.utils.esc(match) + '</mark>' + B.utils.esc(after);
  };

  B.search.updateSelectedUI = function() {
    B.dom.searchResults.querySelectorAll('.search-item').forEach(function(el, i) {
      el.classList.toggle('active', i === S.selectedIdx);
    });
    var active = B.dom.searchResults.querySelector('.search-item.active');
    if (active) active.scrollIntoView({ block: 'nearest' });
  };

  B.search.doSearch = function(query) {
    query = query.trim();
    if (!query) {
      B.dom.searchResults.classList.add('hidden');
      S.currentMatches = [];
      S.selectedIdx = -1;
      return;
    }

    var q = query.toLowerCase();
    S.currentMatches = S.searchIndex.filter(function(item) {
      return item.name.toLowerCase().includes(q) ||
        item.fullName.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q);
    }).slice(0, 20);
    S.selectedIdx = -1;

    if (S.currentMatches.length === 0) {
      B.dom.searchResults.innerHTML = '<div class="search-empty">\uACB0\uACFC \uC5C6\uC74C</div>';
    } else {
      B.dom.searchResults.innerHTML = S.currentMatches.map(function(item, i) {
        var typeLabel = item.type === 'agent' ? 'Agent' : item.type === 'workflow' ? 'Workflow' : item.type === 'doc' ? 'Doc' : 'File';
        var metaExtra = '';
        if (item.type === 'file') {
          metaExtra = ' \u00B7 ' + item.wfName;
        } else if (item.fullName && item.fullName !== item.name) {
          metaExtra = ' \u00B7 ' + B.utils.esc(item.fullName);
        }
        return '<div class="search-item" data-idx="' + i + '">' +
          '<span class="search-dot" style="background:' + item.color + '"></span>' +
          '<div class="search-info">' +
          '<div class="search-name">' + B.search.highlightMatch(item.name, query) + '</div>' +
          '<div class="search-meta">' + typeLabel + ' \u00B7 ' + item.modName + metaExtra + '</div>' +
          '</div>' +
          '</div>';
      }).join('');

      B.dom.searchResults.querySelectorAll('.search-item').forEach(function(el) {
        el.addEventListener('click', function() {
          var idx = parseInt(el.dataset.idx);
          B.search.navigateToItem(S.currentMatches[idx]);
          B.dom.searchResults.classList.add('hidden');
          B.dom.searchInput.value = '';
          S.currentMatches = [];
          S.selectedIdx = -1;
        });
      });
    }

    B.dom.searchResults.classList.remove('hidden');
  };

  B.search.navigateToItem = function(item) {
    if (item.type === 'doc') {
      B.tabs.switchTab('doc');
      requestAnimationFrame(function() { B.docView.showItem(item.id); });
      return;
    }

    if (item.type === 'file') {
      B.tabs.switchTab(item.modId);
      requestAnimationFrame(function() {
        var mod = BMAD_DATA.modules.find(function(m) { return m.id === item.modId; });

        // Agent file
        if (item.subType === 'agent') {
          if (mod) B.agentViewer.show(item.data, mod);
          return;
        }

        // Workflow/internal file
        var wfItem = B.dom.moduleView.querySelector('.wf-list-item[data-wf-id="' + CSS.escape(item.wfId) + '"]');
        if (wfItem) {
          var body = wfItem.querySelector('.wf-list-body');
          var toggle = wfItem.querySelector('.wf-list-toggle');
          if (body && !body.classList.contains('open')) {
            body.classList.add('open');
            if (toggle) toggle.classList.add('open');
          }
          wfItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
          wfItem.style.boxShadow = '0 0 0 2px ' + item.color;
          setTimeout(function() { wfItem.style.boxShadow = ''; }, 2000);
        }

        if (item.subType === 'workflow') {
          B.fileViewer.show(item.data, item.wfId, true);
        } else {
          B.fileViewer.show(item.data, item.wfId, false);
        }
      });
      return;
    }

    if (S.activeTab !== 'overview') {
      B.tabs.switchTab('overview');
    }

    // Expand the parent module
    if (!S.expanded[item.modId]) {
      S.expanded[item.modId] = true;
      B.flowchart.render();
    }

    requestAnimationFrame(function() {
      if (!S.layoutCache) return;

      var targetPos = null;
      var mod = BMAD_DATA.modules.find(function(m) { return m.id === item.modId; });

      if (item.type === 'agent') {
        targetPos = S.layoutCache.agents[item.id];
      } else {
        var entries = Object.entries(S.layoutCache.workflows);
        for (var i = 0; i < entries.length; i++) {
          if (entries[i][0].startsWith(item.id + ':')) {
            targetPos = entries[i][1];
            break;
          }
        }
      }

      if (targetPos) {
        var vw = B.dom.canvasWrap.clientWidth;
        var vh = B.dom.canvasWrap.clientHeight;
        var cx = targetPos.x + targetPos.w / 2;
        var cy = targetPos.y + targetPos.h / 2;
        S.zoom = 1.2;
        S.panX = vw / 2 - cx * S.zoom;
        S.panY = vh / 2 - cy * S.zoom;
        B.zoomPan.applyTransform();

        if (item.type === 'agent') {
          B.detailPanel.highlightAgent(item.id);
          B.detailPanel.show('agent', item.data, mod);
        } else {
          B.detailPanel.highlightWorkflow(item.id);
          B.detailPanel.show('workflow', item.data, mod);
        }
      }
    });
  };

  // === Event Bindings ===
  B.search.bindEvents = function() {
    B.dom.searchInput.addEventListener('input', function() { B.search.doSearch(B.dom.searchInput.value); });

    B.dom.searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        B.dom.searchResults.classList.add('hidden');
        B.dom.searchInput.blur();
        return;
      }
      if (S.currentMatches.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        S.selectedIdx = S.selectedIdx < S.currentMatches.length - 1 ? S.selectedIdx + 1 : 0;
        B.search.updateSelectedUI();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        S.selectedIdx = S.selectedIdx > 0 ? S.selectedIdx - 1 : S.currentMatches.length - 1;
        B.search.updateSelectedUI();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (S.selectedIdx >= 0 && S.selectedIdx < S.currentMatches.length) {
          B.search.navigateToItem(S.currentMatches[S.selectedIdx]);
          B.dom.searchResults.classList.add('hidden');
          B.dom.searchInput.value = '';
          S.currentMatches = [];
          S.selectedIdx = -1;
        }
      }
    });

    document.addEventListener('click', function(e) {
      if (!document.getElementById('search-wrap').contains(e.target)) {
        B.dom.searchResults.classList.add('hidden');
      }
    });

    // Ctrl+K shortcut
    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        B.dom.searchInput.focus();
      }
    });
  };

})(window.BMAD);
