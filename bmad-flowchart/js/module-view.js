// === module-view.js ===
// 모듈 뷰 렌더링

(function(B) {
  'use strict';
  var S = B.state;

  B.moduleView.render = function(modId) {
    var mod = BMAD_DATA.modules.find(function(m) { return m.id === modId; });
    if (!mod) return;

    var color = mod.color;
    var html = '';

    // Module header
    html += '<div class="module-header">' +
      '<div class="module-header-accent" style="background:' + color + '"></div>' +
      '<div class="module-header-info">' +
      '<h2>' + B.utils.esc(mod.shortName) + ' - ' + B.utils.esc(mod.name) + '</h2>' +
      '<p>' + B.utils.esc(mod.description) + '</p>' +
      '</div>' +
      '<div class="module-header-badge">' +
      '<span class="badge"><span class="tab-dot" style="background:' + color + '"></span>' + mod.agents.length + ' Agents</span>' +
      '<span class="badge">' + mod.workflows.length + ' Workflows</span>' +
      '<span class="badge">' + B.utils.countFiles(mod) + ' Files</span>' +
      '</div>' +
      '</div>';

    // Config file
    if (mod.configFile) {
      html += '<div class="module-config-file clickable" data-mod-id="' + mod.id + '" data-config-file="' + B.utils.esc(mod.configFile) + '">\u2699 Config: ' + B.utils.esc(mod.configFile) + '</div>';
    }

    // Agents section
    html += '<div class="agents-section"><h3>Agents</h3><div class="agent-cards">';
    mod.agents.forEach(function(agent) {
      html += B.moduleView.renderAgentCard(agent, mod);
    });
    html += '</div></div>';

    // Workflows section
    html += '<div class="workflows-section"><h3>Workflows (' + mod.workflows.length + ')</h3><div class="wf-list">';
    mod.workflows.forEach(function(wf) {
      html += B.moduleView.renderWorkflowItem(wf, mod);
    });
    html += '</div></div>';

    B.dom.moduleView.innerHTML = html;

    // Bind workflow expand/collapse events (event delegation)
    B.dom.moduleView.addEventListener('click', B.moduleView.handleClick);
  };

  B.moduleView.renderAgentCard = function(agent, mod) {
    var wfNames = (agent.workflows || []).map(function(wfId) {
      for (var mi = 0; mi < BMAD_DATA.modules.length; mi++) {
        var m = BMAD_DATA.modules[mi];
        var found = m.workflows.find(function(w) { return w.id === wfId; });
        if (found) {
          var cross = m.id !== mod.id;
          return '<span class="detail-tag">' + B.utils.esc(found.name) + (cross ? ' <span class="wf-cross-badge">(from ' + m.shortName + ')</span>' : '') + '</span>';
        }
      }
      return '<span class="detail-tag">' + B.utils.esc(wfId) + '</span>';
    }).join('');

    return '<div class="agent-card clickable" data-agent-id="' + B.utils.esc(agent.id) + '">' +
      '<div class="agent-card-top">' +
      '<span class="agent-card-dot" style="background:' + mod.color + '"></span>' +
      '<span class="agent-card-name">' + B.utils.esc(agent.name) + '</span>' +
      '<span class="agent-card-fullname">' + B.utils.esc(agent.fullName) + '</span>' +
      '</div>' +
      '<div class="agent-card-role">' + B.utils.esc(agent.role || '') + '</div>' +
      '<div class="agent-card-desc">' + B.utils.esc(agent.description || '') + '</div>' +
      (agent.agentFile ? '<div class="agent-card-file">\uD83D\uDCC4 ' + B.utils.esc(agent.agentFile) + '</div>' : '') +
      (wfNames ? '<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:4px">' + wfNames + '</div>' : '') +
      '</div>';
  };

  B.moduleView.renderWorkflowItem = function(wf, mod) {
    var files = wf.files || [];
    var fileCount = B.utils.countFilesDeep(files);
    var hasFiles = fileCount > 0;
    var wfFileExt = (wf.workflowFile || '').split('.').pop();

    return '<div class="wf-list-item" data-wf-id="' + B.utils.esc(wf.id) + '">' +
      '<div class="wf-list-header">' +
      '<div class="wf-list-accent" style="background:' + mod.color + '"></div>' +
      '<div class="wf-list-name">' + B.utils.esc(wf.name) + '</div>' +
      '<div class="wf-list-desc">' + B.utils.esc(wf.description || '') + '</div>' +
      (hasFiles ? '<span class="wf-list-file-count">' + fileCount + ' files</span>' : '') +
      (hasFiles || wf.workflowFile ? '<span class="wf-list-toggle">&#9660;</span>' : '') +
      '</div>' +
      (hasFiles || wf.workflowFile ? '<div class="wf-list-body"' + (!hasFiles ? ' style="display:none"' : '') + '>' +
        (wf.workflowFile ? '<div class="wf-list-wffile clickable" data-wf-id="' + B.utils.esc(wf.id) + '" data-wf-file="' + B.utils.esc(wf.workflowFile) + '">' + B.utils.fileTypeIcon(wfFileExt) + ' ' + B.utils.esc(wf.workflowFile) + '</div>' : '') +
        B.moduleView.renderFileTree(files, wf.id) +
        '</div>' : '') +
      '</div>';
  };

  B.moduleView.handleClick = function(e) {
    // Config file click
    var configEl = e.target.closest('.module-config-file.clickable');
    if (configEl) {
      var modId = configEl.dataset.modId;
      var configPath = configEl.dataset.configFile;
      B.fileViewer.show(
        { path: configPath, type: 'yaml', purpose: modId.toUpperCase() + ' \uBAA8\uB4C8 \uC124\uC815 \uD30C\uC77C' },
        'config-' + modId,
        false
      );
      return;
    }

    // Workflow expand/collapse
    var header = e.target.closest('.wf-list-header');
    if (header) {
      var item = header.closest('.wf-list-item');
      var body = item.querySelector('.wf-list-body');
      var toggle = item.querySelector('.wf-list-toggle');
      if (body) {
        body.classList.toggle('open');
        if (toggle) toggle.classList.toggle('open');
      }
      return;
    }

    // File tree toggle (children drill-down)
    var toggleBtn = e.target.closest('.file-node-toggle');
    if (toggleBtn) {
      var subtree = toggleBtn.parentElement.querySelector('.file-tree');
      if (subtree) {
        var isOpen = subtree.style.display !== 'none';
        subtree.style.display = isOpen ? 'none' : '';
        toggleBtn.textContent = isOpen ? '\u25B6' : '\u25BC';
      }
      return;
    }

    // Workflow file click
    var wfFileNode = e.target.closest('.wf-list-wffile.clickable');
    if (wfFileNode) {
      var wfId = wfFileNode.dataset.wfId;
      var wfFilePath = wfFileNode.dataset.wfFile;
      if (wfId && wfFilePath) {
        var ext = wfFilePath.split('.').pop();
        B.fileViewer.show({ path: wfFilePath, type: ext }, wfId, true);
      }
      return;
    }

    // Agent card click
    var agentCard = e.target.closest('.agent-card.clickable');
    if (agentCard) {
      var agentId = agentCard.dataset.agentId;
      var result = B.fileViewer.findAgentById(agentId);
      if (result) B.agentViewer.show(result.agent, result.mod);
      return;
    }

    // File node click
    var fileNode = e.target.closest('.file-node.clickable');
    if (fileNode) {
      var wfId2 = fileNode.dataset.wfId;
      var filePath = (fileNode.dataset.filePath || '').replace(wfId2 + '::', '');
      var fileData = B.fileViewer.findFileInData(wfId2, filePath);
      if (fileData) {
        B.fileViewer.show(fileData, wfId2);
      }
      return;
    }
  };

  B.moduleView.renderFileTree = function(files, workflowId) {
    if (!files || files.length === 0) return '';

    var html = '<ul class="file-tree">';
    files.forEach(function(f) {
      var ext = f.type || f.path.split('.').pop();
      var hasChildren = f.children && f.children.length > 0;
      var typeClass = 'file-' + ext;
      var dataAttrs = workflowId ? ' data-wf-id="' + B.utils.esc(workflowId) + '" data-file-path="' + B.utils.esc(workflowId + '::' + f.path) + '"' : '';
      var clickClass = workflowId ? ' clickable' : '';

      html += '<li>' +
        '<div class="file-node ' + typeClass + clickClass + '"' + dataAttrs + '>' +
        (hasChildren ? '<span class="file-node-toggle">\u25BC</span>' : '<span style="width:14px;display:inline-block"></span>') +
        '<span class="file-icon">' + B.utils.fileTypeIcon(ext) + '</span>' +
        '<span class="file-path">' + B.utils.esc(f.path) + '</span>' +
        (f.purpose ? '<span class="file-purpose">- ' + B.utils.esc(f.purpose) + '</span>' : '') +
        '</div>' +
        (hasChildren ? B.moduleView.renderFileTree(f.children, workflowId) : '') +
        '</li>';
    });
    html += '</ul>';
    return html;
  };

})(window.BMAD);
