// === agent-viewer.js ===
// 에이전트 뷰어 기능

(function(B) {
  'use strict';

  B.agentViewer.show = function(agent, mod) {
    var agentFile = agent.agentFile;
    var ext = agentFile.split('.').pop();
    var fileName = agentFile.split('/').pop();
    var content = FILE_CONTENT['agent::' + agent.id] || null;

    document.getElementById('fv-icon').textContent = B.utils.fileTypeIconText(ext);
    document.getElementById('fv-title').textContent = agent.name + ' \u2014 ' + fileName;
    document.getElementById('fv-path').textContent = agentFile;

    var badge = document.getElementById('fv-type-badge');
    badge.textContent = 'agent';
    badge.className = 'file-viewer-type-badge fv-badge-agent';

    var summary = document.getElementById('fv-summary');
    summary.textContent = agent.role || agent.description || '';

    var contentEl = document.getElementById('fv-content');
    if (content && content.content) {
      contentEl.innerHTML = B.fileViewer.renderContent(content.type || ext, content.content);
    } else {
      contentEl.innerHTML = '<div class="fv-no-content">\uCF58\uD150\uCE20\uAC00 \uC544\uC9C1 \uB4F1\uB85D\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.<br><br>\uD30C\uC77C: ' + B.utils.esc(agentFile) + '</div>';
    }

    // Hide step nav (agent has no steps)
    document.getElementById('fv-step-nav').style.display = 'none';

    // Mark active
    B.dom.moduleView.querySelectorAll('.file-node.active, .wf-list-wffile.active, .agent-card.active').forEach(function(n) { n.classList.remove('active'); });
    var activeEl = B.dom.moduleView.querySelector('.agent-card[data-agent-id="' + CSS.escape(agent.id) + '"]');
    if (activeEl) activeEl.classList.add('active');

    B.dom.fileViewer.classList.remove('hidden');
    B.dom.moduleView.classList.add('viewer-open');

    // Related workflows
    B.agentViewer.renderWorkflowList(agent, mod, contentEl);
    // Resolve file references in agent content
    B.agentViewer.resolveLinks(contentEl, agent);

    contentEl.scrollTop = 0;
  };

  B.agentViewer.renderWorkflowList = function(agent, mod, contentEl) {
    var wfs = agent.workflows || [];
    if (wfs.length === 0) return;

    var html = '<div class="fv-agent-workflows"><div class="fv-agent-wf-title">\uAD00\uB828 \uC6CC\uD06C\uD50C\uB85C\uC6B0</div>';
    wfs.forEach(function(wfId) {
      var wfData = null, wfMod = null;
      for (var m = 0; m < BMAD_DATA.modules.length; m++) {
        var found = BMAD_DATA.modules[m].workflows.find(function(w) { return w.id === wfId; });
        if (found) { wfData = found; wfMod = BMAD_DATA.modules[m]; break; }
      }
      if (!wfData) return;
      var cross = wfMod.id !== mod.id;
      var desc = wfData.description || '';
      if (desc.length > 80) desc = desc.substring(0, 80) + '\u2026';
      html += '<div class="fv-agent-wf-item" data-wf-id="' + B.utils.esc(wfId) + '">' +
        '<span class="fv-agent-wf-dot" style="background:' + wfMod.color + '"></span>' +
        '<span class="fv-agent-wf-name">' + B.utils.esc(wfData.name) + '</span>' +
        (cross ? '<span class="fv-agent-wf-cross">(' + B.utils.esc(wfMod.shortName) + ')</span>' : '') +
        (desc ? '<span class="fv-agent-wf-desc">' + B.utils.esc(desc) + '</span>' : '') +
        '</div>';
    });
    html += '</div>';
    contentEl.insertAdjacentHTML('beforeend', html);
  };

  B.agentViewer.resolveLinks = function(contentEl, agent) {
    // Build path -> wfId mapping from all workflows
    var pathMap = {};
    BMAD_DATA.modules.forEach(function(mod) {
      mod.workflows.forEach(function(wf) {
        if (wf.workflowFile) pathMap[wf.workflowFile] = { wfId: wf.id, path: wf.workflowFile, isWf: true };
        var addFiles = function(files) {
          (files || []).forEach(function(f) {
            pathMap[f.path] = { wfId: wf.id, path: f.path, isWf: false };
            if (f.children) addFiles(f.children);
          });
        };
        addFiles(wf.files);
      });
    });

    // Also map agent files
    var agentPathMap = {};
    BMAD_DATA.modules.forEach(function(mod) {
      mod.agents.forEach(function(a) {
        if (a.agentFile) agentPathMap[a.agentFile] = a.id;
      });
    });

    // Pattern to match {project-root}/_bmad/... paths
    var pathPattern = /\{project-root\}\/((_bmad\/[^\s"'<>]+?\.(md|yaml|yml|xml|csv)))/g;

    var walker = document.createTreeWalker(contentEl, NodeFilter.SHOW_TEXT, null, false);
    var nodesToReplace = [];
    var node;
    while (node = walker.nextNode()) {
      var parent = node.parentElement;
      if (parent && (parent.classList.contains('fv-agent-link') || parent.classList.contains('fv-file-link') ||
          parent.closest('.fv-agent-workflows'))) continue;
      if (pathPattern.test(node.textContent)) {
        nodesToReplace.push(node);
      }
      pathPattern.lastIndex = 0;
    }

    nodesToReplace.forEach(function(textNode) {
      var text = textNode.textContent;
      var parts = [];
      var lastIdx = 0;
      var match;
      pathPattern.lastIndex = 0;
      while ((match = pathPattern.exec(text)) !== null) {
        if (match.index > lastIdx) parts.push({ text: text.substring(lastIdx, match.index) });
        parts.push({ text: match[0], resolvedPath: match[1] });
        lastIdx = pathPattern.lastIndex;
      }
      if (lastIdx < text.length) parts.push({ text: text.substring(lastIdx) });
      if (parts.length <= 1) return;

      var frag = document.createDocumentFragment();
      parts.forEach(function(p) {
        if (p.resolvedPath) {
          var wfInfo = pathMap[p.resolvedPath];
          var agentId = agentPathMap[p.resolvedPath];
          if (wfInfo) {
            var span = document.createElement('span');
            span.className = 'fv-agent-link';
            span.textContent = p.text;
            span.dataset.wfId = wfInfo.wfId;
            span.dataset.filePath = wfInfo.path;
            span.dataset.isWf = wfInfo.isWf ? '1' : '';
            frag.appendChild(span);
          } else if (agentId) {
            var span2 = document.createElement('span');
            span2.className = 'fv-agent-link';
            span2.textContent = p.text;
            span2.dataset.agentId = agentId;
            frag.appendChild(span2);
          } else {
            frag.appendChild(document.createTextNode(p.text));
          }
        } else {
          frag.appendChild(document.createTextNode(p.text));
        }
      });
      textNode.parentNode.replaceChild(frag, textNode);
    });
  };

})(window.BMAD);
