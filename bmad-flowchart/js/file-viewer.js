// === file-viewer.js ===
// 파일 뷰어 기능

(function(B) {
  'use strict';
  var S = B.state;

  // === Navigation Helpers ===
  B.fileViewer.findAgentById = function(agentId) {
    for (var m = 0; m < BMAD_DATA.modules.length; m++) {
      var mod = BMAD_DATA.modules[m];
      for (var a = 0; a < mod.agents.length; a++) {
        if (mod.agents[a].id === agentId) return { agent: mod.agents[a], mod: mod };
      }
    }
    return null;
  };

  B.fileViewer.findFileInData = function(wfId, filePath) {
    for (var mi = 0; mi < BMAD_DATA.modules.length; mi++) {
      var mod = BMAD_DATA.modules[mi];
      var wf = mod.workflows.find(function(w) { return w.id === wfId; });
      if (!wf) continue;
      var found = B.fileViewer.findFileRecursive(wf.files || [], filePath);
      if (found) return found;
    }
    return null;
  };

  B.fileViewer.isStepFile = function(path) {
    return /(?:^|\/)[\w-]*steps[\w-]*\//.test(path);
  };

  B.fileViewer.findWorkflowById = function(wfId) {
    for (var mi = 0; mi < BMAD_DATA.modules.length; mi++) {
      var mod = BMAD_DATA.modules[mi];
      var wf = mod.workflows.find(function(w) { return w.id === wfId; });
      if (wf) return wf;
    }
    return null;
  };

  B.fileViewer.findFileRecursive = function(files, targetPath) {
    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      if (f.path === targetPath) return f;
      if (f.children) {
        var found = B.fileViewer.findFileRecursive(f.children, targetPath);
        if (found) return found;
      }
    }
    return null;
  };

  B.fileViewer.getContent = function(wfId, path) {
    if (typeof FILE_CONTENT === 'undefined') return null;
    return FILE_CONTENT[wfId + '::' + path] || null;
  };

  // === Parsing / Highlighting ===
  B.fileViewer.parseMdTable = function(block) {
    var lines = block.split('\n').filter(function(l) { return l.trim(); });
    if (lines.length < 2) return block;
    var parseRow = function(line) {
      return line.replace(/^\|/, '').replace(/\|$/, '').split('|').map(function(c) { return c.trim(); });
    };
    var headers = parseRow(lines[0]);
    var html = '<table class="fv-table"><thead><tr>';
    headers.forEach(function(h) { html += '<th>' + h + '</th>'; });
    html += '</tr></thead><tbody>';
    for (var i = 2; i < lines.length; i++) {
      var cols = parseRow(lines[i]);
      html += '<tr>';
      cols.forEach(function(c) { html += '<td>' + c + '</td>'; });
      html += '</tr>';
    }
    html += '</tbody></table>';
    return html;
  };

  B.fileViewer.parseMd = function(text) {
    var html = B.utils.esc(text);
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/(^\|.+\|[ ]*\n\|[\s\-:|]+\|[ ]*\n(?:\|.+\|[ ]*\n?)+)/gm, function(match) {
      return B.fileViewer.parseMdTable(match);
    });
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');
    html = html.replace(/^---$/gm, '<hr>');
    html = html.replace(/^- (.+)$/gm, '<li class="ul">$1</li>');
    html = html.replace(/(<li class="ul">.*<\/li>\n?)+/g, function(m) { return '<ul>' + m.replace(/ class="ul"/g, '') + '</ul>'; });
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="ol">$1</li>');
    html = html.replace(/(<li class="ol">.*<\/li>\n?)+/g, function(m) { return '<ol>' + m.replace(/ class="ol"/g, '') + '</ol>'; });
    html = html.replace(/^(?!<[hupblo]|<li|<hr|<code|<pre|<blockquote|<table|<t[hdr])(.+)$/gm, '<p>$1</p>');
    html = html.replace(/\n{2,}/g, '\n');
    return html;
  };

  B.fileViewer.highlightYaml = function(text) {
    return B.utils.esc(text)
      .replace(/^(\s*)(#.*)$/gm, '$1<span class="cmt">$2</span>')
      .replace(/^(\s*)([\w\-_.]+)(\s*:\s*)/gm, '$1<span class="key">$2</span>$3')
      .replace(/:\s*(&quot;[^&]*&quot;|&#39;[^&]*&#39;)/g, ': <span class="str">$1</span>')
      .replace(/:\s*(true|false|null|yes|no)\b/gi, ': <span class="kw">$1</span>')
      .replace(/:\s*(\d+\.?\d*)\s*$/gm, ': <span class="num">$1</span>');
  };

  B.fileViewer.highlightXml = function(text) {
    return B.utils.esc(text)
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="cmt">$1</span>')
      .replace(/(&lt;\/?)([\w\-:]+)/g, '$1<span class="tag">$2</span>')
      .replace(/([\w\-:]+)(=)(&quot;[^&]*&quot;)/g, '<span class="attr">$1</span>$2<span class="str">$3</span>');
  };

  B.fileViewer.highlightGroovy = function(text) {
    var keywords = ['def','if','else','for','while','return','import','package','class','try','catch','finally','new','throw','throws','static','void','boolean','int','string','node','stage','steps','pipeline','agent','environment','post','when','script','sh','echo','input','timeout','parallel'];
    var html = B.utils.esc(text);
    html = html.replace(/(\/\/.*)$/gm, '<span class="cmt">$1</span>');
    html = html.replace(/(&quot;[^&]*&quot;|&#39;[^&]*&#39;)/g, '<span class="str">$1</span>');
    var kwPattern = new RegExp('\\b(' + keywords.join('|') + ')\\b', 'g');
    html = html.replace(kwPattern, '<span class="kw">$1</span>');
    return html;
  };

  B.fileViewer.csvToTable = function(text) {
    var lines = text.trim().split('\n');
    if (lines.length === 0) return '<p>\uBE48 CSV</p>';
    var html = '<table class="fv-table"><thead><tr>';
    var headers = lines[0].split(',');
    headers.forEach(function(h) { html += '<th>' + B.utils.esc(h.trim()) + '</th>'; });
    html += '</tr></thead><tbody>';
    for (var i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      var cols = lines[i].split(',');
      html += '<tr>';
      cols.forEach(function(c) { html += '<td>' + B.utils.esc(c.trim()) + '</td>'; });
      html += '</tr>';
    }
    html += '</tbody></table>';
    return html;
  };

  B.fileViewer.renderContent = function(type, content) {
    switch (type) {
      case 'md':
        return '<div class="fv-content-md">' + B.fileViewer.parseMd(content) + '</div>';
      case 'yaml': case 'yml':
        return '<div class="fv-code">' + B.fileViewer.highlightYaml(content) + '</div>';
      case 'xml':
        return '<div class="fv-code">' + B.fileViewer.highlightXml(content) + '</div>';
      case 'groovy':
        return '<div class="fv-code">' + B.fileViewer.highlightGroovy(content) + '</div>';
      case 'csv':
        return B.fileViewer.csvToTable(content);
      default:
        return '<div class="fv-code">' + B.utils.esc(content) + '</div>';
    }
  };

  B.fileViewer.show = function(fileData, wfId, isWorkflowFile) {
    var ext = fileData.type || fileData.path.split('.').pop();
    var fileName = fileData.path.split('/').pop();
    var content = B.fileViewer.getContent(wfId, fileData.path);

    document.getElementById('fv-icon').textContent = B.utils.fileTypeIconText(ext);
    document.getElementById('fv-title').textContent = fileName;
    document.getElementById('fv-path').textContent = fileData.path;

    var badge = document.getElementById('fv-type-badge');
    badge.textContent = ext;
    badge.className = 'file-viewer-type-badge fv-badge-' + ext;

    var summary = document.getElementById('fv-summary');
    summary.textContent = (content && content.summary) || fileData.purpose || '';

    var contentEl = document.getElementById('fv-content');
    if (content && content.content) {
      contentEl.innerHTML = B.fileViewer.renderContent(content.type || ext, content.content);
    } else {
      contentEl.innerHTML = '<div class="fv-no-content">\uCF58\uD150\uCE20\uAC00 \uC544\uC9C1 \uB4F1\uB85D\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.<br><br>\uD30C\uC77C: ' + B.utils.esc(fileData.path) + '</div>';
    }

    // Mark active file
    B.dom.moduleView.querySelectorAll('.file-node.active, .wf-list-wffile.active').forEach(function(n) { n.classList.remove('active'); });
    var activeNode = B.dom.moduleView.querySelector('.file-node[data-file-path="' + CSS.escape(wfId + '::' + fileData.path) + '"]');
    if (activeNode) activeNode.classList.add('active');
    var activeWfFile = B.dom.moduleView.querySelector('.wf-list-wffile[data-wf-file="' + CSS.escape(fileData.path) + '"]');
    if (activeWfFile) activeWfFile.classList.add('active');

    B.dom.fileViewer.classList.remove('hidden');
    B.dom.moduleView.classList.add('viewer-open');

    // Navigation features
    B.stepNav.render(wfId, fileData.path, isWorkflowFile);
    if (isWorkflowFile) B.stepNav.renderWorkflowStepList(wfId, contentEl);
    B.fileViewer.resolveLinks(contentEl, wfId);
    contentEl.scrollTop = 0;
  };

  B.fileViewer.hide = function() {
    B.dom.fileViewer.classList.add('hidden');
    B.dom.moduleView.classList.remove('viewer-open');
    B.dom.moduleView.querySelectorAll('.file-node.active, .agent-card.active').forEach(function(n) { n.classList.remove('active'); });
    document.getElementById('fv-step-nav').style.display = 'none';
  };

  B.fileViewer.resolveLinks = function(contentEl, wfId) {
    var allFiles = B.stepNav.getAllFiles(wfId);
    if (allFiles.length === 0) return;

    var GENERIC_NAMES = { 'instructions.md': 1, 'instructions.xml': 1, 'checklist.md': 1, 'template.md': 1, 'research.template.md': 1 };
    var fileMap = {};
    allFiles.forEach(function(f) {
      var name = f.path.split('/').pop();
      if (!GENERIC_NAMES[name]) fileMap[name] = f.path;
    });
    var fileNames = Object.keys(fileMap).filter(function(n) { return n.length > 4; });
    if (fileNames.length === 0) return;

    var escaped = fileNames.map(function(n) { return n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); });
    var pattern = new RegExp('(' + escaped.join('|') + ')', 'g');

    var walker = document.createTreeWalker(contentEl, NodeFilter.SHOW_TEXT, null, false);
    var nodesToReplace = [];
    var node;
    while (node = walker.nextNode()) {
      var parent = node.parentElement;
      if (parent && (parent.closest('pre') || parent.closest('code') || parent.classList.contains('fv-file-link') ||
          parent.closest('.fv-workflow-steps') || parent.closest('.fv-step-nav'))) continue;
      if (pattern.test(node.textContent)) {
        nodesToReplace.push(node);
      }
      pattern.lastIndex = 0;
    }

    nodesToReplace.forEach(function(textNode) {
      var text = textNode.textContent;
      var parts = text.split(pattern);
      if (parts.length <= 1) return;

      var frag = document.createDocumentFragment();
      parts.forEach(function(part) {
        if (fileMap[part]) {
          var span = document.createElement('span');
          span.className = 'fv-file-link';
          span.textContent = part;
          span.dataset.wfId = wfId;
          span.dataset.filePath = fileMap[part];
          frag.appendChild(span);
        } else {
          frag.appendChild(document.createTextNode(part));
        }
      });
      textNode.parentNode.replaceChild(frag, textNode);
    });
  };

  // === Event Bindings ===
  B.fileViewer.bindEvents = function() {
    // Close button
    document.getElementById('file-viewer-close').addEventListener('click', B.fileViewer.hide);

    // Navigation click delegation within file viewer
    B.dom.fileViewer.addEventListener('click', function(e) {
      function navTo(el) {
        var wfId = el.dataset.wfId;
        var filePath = el.dataset.filePath;
        if (!wfId || !filePath) return;
        if (filePath === '__workflow__') {
          var wf = B.fileViewer.findWorkflowById(wfId);
          if (wf && wf.workflowFile) {
            var ext = wf.workflowFile.split('.').pop();
            B.fileViewer.show({ path: wf.workflowFile, type: ext }, wfId, true);
          }
        } else {
          var fileData = B.fileViewer.findFileInData(wfId, filePath);
          if (fileData) B.fileViewer.show(fileData, wfId);
        }
      }

      var navBtn = e.target.closest('.fv-nav-btn');
      if (navBtn) { navTo(navBtn); return; }

      var branchBtn = e.target.closest('.fv-nav-branch-btn');
      if (branchBtn) { navTo(branchBtn); return; }

      var pill = e.target.closest('.fv-nav-pill');
      if (pill) { navTo(pill); return; }

      var stepItem = e.target.closest('.fv-step-item');
      if (stepItem) { navTo(stepItem); return; }

      var fileLink = e.target.closest('.fv-file-link');
      if (fileLink) { navTo(fileLink); return; }

      var agentWfItem = e.target.closest('.fv-agent-wf-item');
      if (agentWfItem) {
        var wfId2 = agentWfItem.dataset.wfId;
        var wf2 = B.fileViewer.findWorkflowById(wfId2);
        if (wf2 && wf2.workflowFile) {
          var ext2 = wf2.workflowFile.split('.').pop();
          B.fileViewer.show({ path: wf2.workflowFile, type: ext2 }, wfId2, true);
        }
        return;
      }

      var agentLink = e.target.closest('.fv-agent-link');
      if (agentLink) {
        if (agentLink.dataset.agentId) {
          var result = B.fileViewer.findAgentById(agentLink.dataset.agentId);
          if (result) B.agentViewer.show(result.agent, result.mod);
          return;
        }
        var wfId3 = agentLink.dataset.wfId;
        var filePath3 = agentLink.dataset.filePath;
        if (wfId3 && filePath3) {
          if (agentLink.dataset.isWf === '1') {
            B.fileViewer.show({ path: filePath3, type: filePath3.split('.').pop() }, wfId3, true);
          } else {
            var fileData3 = B.fileViewer.findFileInData(wfId3, filePath3);
            if (fileData3) B.fileViewer.show(fileData3, wfId3);
          }
        }
        return;
      }
    });
  };

})(window.BMAD);
