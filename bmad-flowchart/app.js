(function () {
  'use strict';

  // === Constants ===
  const MOD_W = 240, MOD_H = 72;
  const AGT_W = 170, AGT_H = 44;
  const WF_W = 146, WF_H = 28;
  const GAP_X = 80, GAP_Y = 50;
  const AGT_GAP = 12, WF_GAP = 6;
  const PAD = 80;

  // === State ===
  const expanded = {};            // moduleId -> bool
  let zoom = 1, panX = 0, panY = 0;
  let dragging = false, dragStartX = 0, dragStartY = 0, panStartX = 0, panStartY = 0;
  let layoutCache = null;
  let activeTab = 'overview';     // 'overview' | module id

  // === DOM ===
  const svg = document.getElementById('svg');
  const root = document.getElementById('root');
  const edgesLayer = document.getElementById('layer-edges');
  const nodesLayer = document.getElementById('layer-nodes');
  const detailPanel = document.getElementById('detail-panel');
  const canvasWrap = document.getElementById('canvas-wrap');
  const moduleView = document.getElementById('module-view');
  const tabBar = document.getElementById('tab-bar');
  const fileViewer = document.getElementById('file-viewer');

  // === SVG Helpers ===
  function el(tag, attrs) {
    const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
    return e;
  }

  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // =========================================================
  //  TAB CONTROLLER (Step 3)
  // =========================================================
  function switchTab(tabId) {
    activeTab = tabId;
    hideFileViewer();

    // Update tab button states
    tabBar.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Update active tab indicator color
    const mod = BMAD_DATA.modules.find(m => m.id === tabId);
    tabBar.querySelectorAll('.tab-btn.active').forEach(btn => {
      btn.style.borderBottomColor = mod ? mod.color : '';
    });

    if (tabId === 'overview') {
      canvasWrap.classList.remove('hidden');
      canvasWrap.style.display = '';
      moduleView.classList.add('hidden');
      document.getElementById('btn-fit').style.display = '';
      document.getElementById('btn-collapse').style.display = '';
    } else {
      canvasWrap.style.display = 'none';
      moduleView.classList.remove('hidden');
      document.getElementById('btn-fit').style.display = 'none';
      document.getElementById('btn-collapse').style.display = 'none';
      hideDetail();
      renderModuleView(tabId);
    }
  }

  tabBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    switchTab(btn.dataset.tab);
  });

  // =========================================================
  //  MODULE VIEW RENDERER (Step 4)
  // =========================================================
  function renderModuleView(modId) {
    const mod = BMAD_DATA.modules.find(m => m.id === modId);
    if (!mod) return;

    const color = mod.color;
    let html = '';

    // Module header
    html += `<div class="module-header">
      <div class="module-header-accent" style="background:${color}"></div>
      <div class="module-header-info">
        <h2>${esc(mod.shortName)} - ${esc(mod.name)}</h2>
        <p>${esc(mod.description)}</p>
      </div>
      <div class="module-header-badge">
        <span class="badge"><span class="tab-dot" style="background:${color}"></span>${mod.agents.length} Agents</span>
        <span class="badge">${mod.workflows.length} Workflows</span>
        <span class="badge">${countFiles(mod)} Files</span>
      </div>
    </div>`;

    // Config file
    if (mod.configFile) {
      html += `<div class="module-config-file">Config: ${esc(mod.configFile)}</div>`;
    }

    // Agents section
    html += `<div class="agents-section"><h3>Agents</h3><div class="agent-cards">`;
    mod.agents.forEach(agent => {
      html += renderAgentCard(agent, mod);
    });
    html += `</div></div>`;

    // Workflows section
    html += `<div class="workflows-section"><h3>Workflows (${mod.workflows.length})</h3><div class="wf-list">`;
    mod.workflows.forEach(wf => {
      html += renderWorkflowItem(wf, mod);
    });
    html += `</div></div>`;

    moduleView.innerHTML = html;

    // Bind workflow expand/collapse events (event delegation)
    moduleView.addEventListener('click', handleModuleViewClick);
  }

  function renderAgentCard(agent, mod) {
    const wfNames = (agent.workflows || []).map(wfId => {
      for (const m of BMAD_DATA.modules) {
        const found = m.workflows.find(w => w.id === wfId);
        if (found) {
          const cross = m.id !== mod.id;
          return `<span class="detail-tag">${esc(found.name)}${cross ? ' <span class="wf-cross-badge">(from ' + m.shortName + ')</span>' : ''}</span>`;
        }
      }
      return `<span class="detail-tag">${esc(wfId)}</span>`;
    }).join('');

    return `<div class="agent-card clickable" data-agent-id="${esc(agent.id)}">
      <div class="agent-card-top">
        <span class="agent-card-dot" style="background:${mod.color}"></span>
        <span class="agent-card-name">${esc(agent.name)}</span>
        <span class="agent-card-fullname">${esc(agent.fullName)}</span>
      </div>
      <div class="agent-card-role">${esc(agent.role || '')}</div>
      <div class="agent-card-desc">${esc(agent.description || '')}</div>
      ${agent.agentFile ? `<div class="agent-card-file">\uD83D\uDCC4 ${esc(agent.agentFile)}</div>` : ''}
      ${wfNames ? `<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:4px">${wfNames}</div>` : ''}
    </div>`;
  }

  function renderWorkflowItem(wf, mod) {
    const files = wf.files || [];
    const fileCount = countFilesDeep(files);
    const hasFiles = fileCount > 0;
    const wfFileExt = (wf.workflowFile || '').split('.').pop();

    return `<div class="wf-list-item" data-wf-id="${esc(wf.id)}">
      <div class="wf-list-header">
        <div class="wf-list-accent" style="background:${mod.color}"></div>
        <div class="wf-list-name">${esc(wf.name)}</div>
        <div class="wf-list-desc">${esc(wf.description || '')}</div>
        ${hasFiles ? `<span class="wf-list-file-count">${fileCount} files</span>` : ''}
        ${hasFiles || wf.workflowFile ? '<span class="wf-list-toggle">&#9660;</span>' : ''}
      </div>
      ${hasFiles || wf.workflowFile ? `<div class="wf-list-body${!hasFiles ? '' : ''}"${!hasFiles ? ' style="display:none"' : ''}>
        ${wf.workflowFile ? `<div class="wf-list-wffile clickable" data-wf-id="${esc(wf.id)}" data-wf-file="${esc(wf.workflowFile)}">${fileTypeIcon(wfFileExt)} ${esc(wf.workflowFile)}</div>` : ''}
        ${renderFileTree(files, wf.id)}
      </div>` : ''}
    </div>`;
  }

  function handleModuleViewClick(e) {
    // Workflow expand/collapse
    const header = e.target.closest('.wf-list-header');
    if (header) {
      const item = header.closest('.wf-list-item');
      const body = item.querySelector('.wf-list-body');
      const toggle = item.querySelector('.wf-list-toggle');
      if (body) {
        body.classList.toggle('open');
        if (toggle) toggle.classList.toggle('open');
      }
      return;
    }

    // File tree toggle (children drill-down)
    const toggleBtn = e.target.closest('.file-node-toggle');
    if (toggleBtn) {
      const subtree = toggleBtn.parentElement.querySelector('.file-tree');
      if (subtree) {
        const isOpen = subtree.style.display !== 'none';
        subtree.style.display = isOpen ? 'none' : '';
        toggleBtn.textContent = isOpen ? '▶' : '▼';
      }
      return;
    }

    // Workflow file click → open viewer for the workflow definition file
    const wfFileNode = e.target.closest('.wf-list-wffile.clickable');
    if (wfFileNode) {
      const wfId = wfFileNode.dataset.wfId;
      const wfFilePath = wfFileNode.dataset.wfFile;
      if (wfId && wfFilePath) {
        const ext = wfFilePath.split('.').pop();
        showFileViewer({ path: wfFilePath, type: ext }, wfId, true);
      }
      return;
    }

    // Agent card click → open agent viewer
    const agentCard = e.target.closest('.agent-card.clickable');
    if (agentCard) {
      const agentId = agentCard.dataset.agentId;
      const result = findAgentById(agentId);
      if (result) showAgentViewer(result.agent, result.mod);
      return;
    }

    // File node click → open viewer
    const fileNode = e.target.closest('.file-node.clickable');
    if (fileNode) {
      const wfId = fileNode.dataset.wfId;
      const filePath = (fileNode.dataset.filePath || '').replace(wfId + '::', '');
      // Find the file data from BMAD_DATA
      const fileData = findFileInData(wfId, filePath);
      if (fileData) {
        showFileViewer(fileData, wfId);
      }
      return;
    }
  }

  function findAgentById(agentId) {
    for (var m = 0; m < BMAD_DATA.modules.length; m++) {
      var mod = BMAD_DATA.modules[m];
      for (var a = 0; a < mod.agents.length; a++) {
        if (mod.agents[a].id === agentId) return { agent: mod.agents[a], mod: mod };
      }
    }
    return null;
  }

  function findFileInData(wfId, filePath) {
    for (const mod of BMAD_DATA.modules) {
      const wf = mod.workflows.find(w => w.id === wfId);
      if (!wf) continue;
      const found = findFileRecursive(wf.files || [], filePath);
      if (found) return found;
    }
    return null;
  }

  // === Navigation Helpers ===
  function isStepFile(path) {
    // Match paths under any *steps* directory:
    // steps/, steps-c/, steps-e/, steps-v/, steps-b/, market-steps/, domain-steps/, etc.
    return /(?:^|\/)[\w-]*steps[\w-]*\//.test(path);
  }

  function findWorkflowById(wfId) {
    for (const mod of BMAD_DATA.modules) {
      const wf = mod.workflows.find(w => w.id === wfId);
      if (wf) return wf;
    }
    return null;
  }

  function getWorkflowStepList(wfId) {
    const wf = findWorkflowById(wfId);
    if (!wf) return [];
    const steps = [];
    function collect(files) {
      for (const f of files) {
        if (isStepFile(f.path)) steps.push(f);
        if (f.children) collect(f.children);
      }
    }
    collect(wf.files || []);
    return steps;
  }

  function getWorkflowAllFiles(wfId) {
    const wf = findWorkflowById(wfId);
    if (!wf) return [];
    const all = [];
    function collect(files, depth) {
      for (const f of files) {
        all.push({ ...f, _depth: depth });
        if (f.children) collect(f.children, depth + 1);
      }
    }
    collect(wf.files || [], 0);
    return all;
  }

  function extractStepNumber(path) {
    var name = path.split('/').pop();
    var m = name.match(/(\d+)/);
    return m ? m[1] : null;
  }

  // Group top-level step files by base step number.
  // Siblings with same number (02a, 02b, 02c) = branch group.
  // Children (step-01b under step-01) = subs, not branches.
  function getWorkflowStepGroups(wfId) {
    var wf = findWorkflowById(wfId);
    if (!wf) return [];
    var groups = [];
    var current = null;
    (wf.files || []).forEach(function(f) {
      if (!isStepFile(f.path)) return;
      var num = extractStepNumber(f.path);
      var subs = [];
      if (f.children) {
        f.children.forEach(function(c) {
          if (isStepFile(c.path)) subs.push(c);
        });
      }
      if (current && current.num === num) {
        current.members.push({ file: f, subs: subs });
      } else {
        current = { num: num, members: [{ file: f, subs: subs }] };
        groups.push(current);
      }
    });
    return groups;
  }

  function findInGroups(groups, path) {
    for (var gi = 0; gi < groups.length; gi++) {
      var g = groups[gi];
      for (var mi = 0; mi < g.members.length; mi++) {
        if (g.members[mi].file.path === path) return { gi: gi, mi: mi, isSub: false };
        for (var si = 0; si < g.members[mi].subs.length; si++) {
          if (g.members[mi].subs[si].path === path) return { gi: gi, mi: mi, isSub: true };
        }
      }
    }
    return null;
  }

  function getGroupPills(group) {
    var pills = [];
    group.members.forEach(function(m) {
      pills.push(m.file);
      m.subs.forEach(function(s) { pills.push(s); });
    });
    return pills;
  }

  function findFileRecursive(files, targetPath) {
    for (const f of files) {
      if (f.path === targetPath) return f;
      if (f.children) {
        const found = findFileRecursive(f.children, targetPath);
        if (found) return found;
      }
    }
    return null;
  }

  // =========================================================
  //  FILE TREE RENDERER (Step 5)
  // =========================================================
  function renderFileTree(files, workflowId) {
    if (!files || files.length === 0) return '';

    let html = '<ul class="file-tree">';
    files.forEach(f => {
      const ext = f.type || f.path.split('.').pop();
      const hasChildren = f.children && f.children.length > 0;
      const typeClass = 'file-' + ext;
      const dataAttrs = workflowId ? ` data-wf-id="${esc(workflowId)}" data-file-path="${esc(workflowId + '::' + f.path)}"` : '';
      const clickClass = workflowId ? ' clickable' : '';

      html += `<li>
        <div class="file-node ${typeClass}${clickClass}"${dataAttrs}>
          ${hasChildren ? '<span class="file-node-toggle">▼</span>' : '<span style="width:14px;display:inline-block"></span>'}
          <span class="file-icon">${fileTypeIcon(ext)}</span>
          <span class="file-path">${esc(f.path)}</span>
          ${f.purpose ? `<span class="file-purpose">- ${esc(f.purpose)}</span>` : ''}
        </div>
        ${hasChildren ? renderFileTree(f.children, workflowId) : ''}
      </li>`;
    });
    html += '</ul>';
    return html;
  }

  function fileTypeIcon(ext) {
    switch (ext) {
      case 'md': return '&#128196;';     // document
      case 'yaml': case 'yml': return '&#9881;'; // gear
      case 'xml': return '&#128204;';    // tag
      case 'csv': return '&#128202;';    // chart
      case 'groovy': return '&#9874;';   // hammer
      default: return '&#128196;';
    }
  }

  function countFiles(mod) {
    let total = 0;
    (mod.workflows || []).forEach(wf => {
      total += countFilesDeep(wf.files || []);
    });
    return total;
  }

  function countFilesDeep(files) {
    let count = 0;
    (files || []).forEach(f => {
      count++;
      if (f.children) count += countFilesDeep(f.children);
    });
    return count;
  }

  // =========================================================
  //  FILE VIEWER (Step 3 - new)
  // =========================================================
  function getFileContent(wfId, path) {
    if (typeof FILE_CONTENT === 'undefined') return null;
    return FILE_CONTENT[wfId + '::' + path] || null;
  }

  function parseMdTable(block) {
    var lines = block.split('\n').filter(function(l) { return l.trim(); });
    if (lines.length < 2) return block;
    var parseRow = function(line) {
      return line.replace(/^\|/, '').replace(/\|$/, '').split('|').map(function(c) { return c.trim(); });
    };
    var headers = parseRow(lines[0]);
    // lines[1] is separator (|---|---|)
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
  }

  function parseMd(text) {
    let html = esc(text);
    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Tables (must be before headers to avoid --- conflict)
    html = html.replace(/(^\|.+\|[ ]*\n\|[\s\-:|]+\|[ ]*\n(?:\|.+\|[ ]*\n?)+)/gm, function(match) {
      return parseMdTable(match);
    });
    // Headers
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    // Bold & italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Blockquote
    html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');
    // Horizontal rule
    html = html.replace(/^---$/gm, '<hr>');
    // Unordered list
    html = html.replace(/^- (.+)$/gm, '<li class="ul">$1</li>');
    html = html.replace(/(<li class="ul">.*<\/li>\n?)+/g, function(m) { return '<ul>' + m.replace(/ class="ul"/g, '') + '</ul>'; });
    // Ordered list
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="ol">$1</li>');
    html = html.replace(/(<li class="ol">.*<\/li>\n?)+/g, function(m) { return '<ol>' + m.replace(/ class="ol"/g, '') + '</ol>'; });
    // Paragraphs - wrap remaining text lines
    html = html.replace(/^(?!<[hupblo]|<li|<hr|<code|<pre|<blockquote|<table|<t[hdr])(.+)$/gm, '<p>$1</p>');
    // Clean up double breaks
    html = html.replace(/\n{2,}/g, '\n');
    return html;
  }

  function highlightYaml(text) {
    return esc(text)
      .replace(/^(\s*)(#.*)$/gm, '$1<span class="cmt">$2</span>')
      .replace(/^(\s*)([\w\-_.]+)(\s*:\s*)/gm, '$1<span class="key">$2</span>$3')
      .replace(/:\s*(&quot;[^&]*&quot;|&#39;[^&]*&#39;)/g, ': <span class="str">$1</span>')
      .replace(/:\s*(true|false|null|yes|no)\b/gi, ': <span class="kw">$1</span>')
      .replace(/:\s*(\d+\.?\d*)\s*$/gm, ': <span class="num">$1</span>');
  }

  function highlightXml(text) {
    return esc(text)
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="cmt">$1</span>')
      .replace(/(&lt;\/?)([\w\-:]+)/g, '$1<span class="tag">$2</span>')
      .replace(/([\w\-:]+)(=)(&quot;[^&]*&quot;)/g, '<span class="attr">$1</span>$2<span class="str">$3</span>');
  }

  function highlightGroovy(text) {
    const keywords = ['def','if','else','for','while','return','import','package','class','try','catch','finally','new','throw','throws','static','void','boolean','int','string','node','stage','steps','pipeline','agent','environment','post','when','script','sh','echo','input','timeout','parallel'];
    let html = esc(text);
    html = html.replace(/(\/\/.*)$/gm, '<span class="cmt">$1</span>');
    html = html.replace(/(&quot;[^&]*&quot;|&#39;[^&]*&#39;)/g, '<span class="str">$1</span>');
    const kwPattern = new RegExp('\\b(' + keywords.join('|') + ')\\b', 'g');
    html = html.replace(kwPattern, '<span class="kw">$1</span>');
    return html;
  }

  function csvToTable(text) {
    const lines = text.trim().split('\n');
    if (lines.length === 0) return '<p>빈 CSV</p>';
    let html = '<table class="fv-table"><thead><tr>';
    const headers = lines[0].split(',');
    headers.forEach(h => { html += '<th>' + esc(h.trim()) + '</th>'; });
    html += '</tr></thead><tbody>';
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const cols = lines[i].split(',');
      html += '<tr>';
      cols.forEach(c => { html += '<td>' + esc(c.trim()) + '</td>'; });
      html += '</tr>';
    }
    html += '</tbody></table>';
    return html;
  }

  function renderFileViewerContent(type, content) {
    switch (type) {
      case 'md':
        return '<div class="fv-content-md">' + parseMd(content) + '</div>';
      case 'yaml': case 'yml':
        return '<div class="fv-code">' + highlightYaml(content) + '</div>';
      case 'xml':
        return '<div class="fv-code">' + highlightXml(content) + '</div>';
      case 'groovy':
        return '<div class="fv-code">' + highlightGroovy(content) + '</div>';
      case 'csv':
        return csvToTable(content);
      default:
        return '<div class="fv-code">' + esc(content) + '</div>';
    }
  }

  function showFileViewer(fileData, wfId, isWorkflowFile) {
    const ext = fileData.type || fileData.path.split('.').pop();
    const fileName = fileData.path.split('/').pop();
    const content = getFileContent(wfId, fileData.path);

    document.getElementById('fv-icon').textContent = fileTypeIconText(ext);
    document.getElementById('fv-title').textContent = fileName;
    document.getElementById('fv-path').textContent = fileData.path;

    const badge = document.getElementById('fv-type-badge');
    badge.textContent = ext;
    badge.className = 'file-viewer-type-badge fv-badge-' + ext;

    const summary = document.getElementById('fv-summary');
    summary.textContent = (content && content.summary) || fileData.purpose || '';

    const contentEl = document.getElementById('fv-content');
    if (content && content.content) {
      contentEl.innerHTML = renderFileViewerContent(content.type || ext, content.content);
    } else {
      contentEl.innerHTML = '<div class="fv-no-content">콘텐츠가 아직 등록되지 않았습니다.<br><br>파일: ' + esc(fileData.path) + '</div>';
    }

    // Mark active file
    moduleView.querySelectorAll('.file-node.active, .wf-list-wffile.active').forEach(n => n.classList.remove('active'));
    const activeNode = moduleView.querySelector(`.file-node[data-file-path="${CSS.escape(wfId + '::' + fileData.path)}"]`);
    if (activeNode) activeNode.classList.add('active');
    const activeWfFile = moduleView.querySelector(`.wf-list-wffile[data-wf-file="${CSS.escape(fileData.path)}"]`);
    if (activeWfFile) activeWfFile.classList.add('active');

    fileViewer.classList.remove('hidden');
    moduleView.classList.add('viewer-open');

    // Navigation features
    renderStepNavigation(wfId, fileData.path, isWorkflowFile);
    if (isWorkflowFile) renderWorkflowStepList(wfId, contentEl);
    resolveContentLinks(contentEl, wfId);
    contentEl.scrollTop = 0;
  }

  // =========================================================
  //  AGENT VIEWER
  // =========================================================
  function showAgentViewer(agent, mod) {
    var agentFile = agent.agentFile;
    var ext = agentFile.split('.').pop();
    var fileName = agentFile.split('/').pop();
    var content = FILE_CONTENT['agent::' + agent.id] || null;

    document.getElementById('fv-icon').textContent = fileTypeIconText(ext);
    document.getElementById('fv-title').textContent = agent.name + ' \u2014 ' + fileName;
    document.getElementById('fv-path').textContent = agentFile;

    var badge = document.getElementById('fv-type-badge');
    badge.textContent = 'agent';
    badge.className = 'file-viewer-type-badge fv-badge-agent';

    var summary = document.getElementById('fv-summary');
    summary.textContent = agent.role || agent.description || '';

    var contentEl = document.getElementById('fv-content');
    if (content && content.content) {
      contentEl.innerHTML = renderFileViewerContent(content.type || ext, content.content);
    } else {
      contentEl.innerHTML = '<div class="fv-no-content">\uCF58\uD150\uCE20\uAC00 \uC544\uC9C1 \uB4F1\uB85D\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.<br><br>\uD30C\uC77C: ' + esc(agentFile) + '</div>';
    }

    // Hide step nav (agent has no steps)
    document.getElementById('fv-step-nav').style.display = 'none';

    // Mark active
    moduleView.querySelectorAll('.file-node.active, .wf-list-wffile.active, .agent-card.active').forEach(function(n) { n.classList.remove('active'); });
    var activeEl = moduleView.querySelector('.agent-card[data-agent-id="' + CSS.escape(agent.id) + '"]');
    if (activeEl) activeEl.classList.add('active');

    fileViewer.classList.remove('hidden');
    moduleView.classList.add('viewer-open');

    // Related workflows
    renderAgentWorkflowList(agent, mod, contentEl);
    // Resolve file references in agent content
    resolveAgentLinks(contentEl, agent);

    contentEl.scrollTop = 0;
  }

  function renderAgentWorkflowList(agent, mod, contentEl) {
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
      html += '<div class="fv-agent-wf-item" data-wf-id="' + esc(wfId) + '">' +
        '<span class="fv-agent-wf-dot" style="background:' + wfMod.color + '"></span>' +
        '<span class="fv-agent-wf-name">' + esc(wfData.name) + '</span>' +
        (cross ? '<span class="fv-agent-wf-cross">(' + esc(wfMod.shortName) + ')</span>' : '') +
        (desc ? '<span class="fv-agent-wf-desc">' + esc(desc) + '</span>' : '') +
        '</div>';
    });
    html += '</div>';
    contentEl.insertAdjacentHTML('beforeend', html);
  }

  function resolveAgentLinks(contentEl, agent) {
    // Build path → wfId mapping from all workflows
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
      // Skip nodes inside already-resolved links
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
            var span = document.createElement('span');
            span.className = 'fv-agent-link';
            span.textContent = p.text;
            span.dataset.agentId = agentId;
            frag.appendChild(span);
          } else {
            frag.appendChild(document.createTextNode(p.text));
          }
        } else {
          frag.appendChild(document.createTextNode(p.text));
        }
      });
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  function hideFileViewer() {
    fileViewer.classList.add('hidden');
    moduleView.classList.remove('viewer-open');
    moduleView.querySelectorAll('.file-node.active, .agent-card.active').forEach(n => n.classList.remove('active'));
    document.getElementById('fv-step-nav').style.display = 'none';
  }

  // === Step Navigation (branch-aware) ===
  function renderBranchOptions(wfId, group) {
    var html = '<div class="fv-nav-branch-options">';
    group.members.forEach(function(m) {
      var label = m.file.path.split('/').pop();
      var purpose = m.file.purpose || '';
      if (purpose.length > 50) purpose = purpose.substring(0, 50) + '\u2026';
      html += '<button class="fv-nav-branch-btn" data-wf-id="' + esc(wfId) + '" data-file-path="' + esc(m.file.path) + '">' +
        '<span class="fv-nav-branch-name">' + esc(label) + '</span>' +
        (purpose ? '<span class="fv-nav-branch-purpose">' + esc(purpose) + '</span>' : '') +
        '<span class="nav-arrow">\u2192</span></button>';
    });
    html += '</div>';
    return html;
  }

  function renderStepNavigation(wfId, currentPath, isWorkflowFile) {
    var navEl = document.getElementById('fv-step-nav');
    var wf = findWorkflowById(wfId);
    if (!wf) { navEl.style.display = 'none'; return; }

    var groups = getWorkflowStepGroups(wfId);

    // --- Workflow definition file ---
    if (isWorkflowFile) {
      if (groups.length === 0) { navEl.style.display = 'none'; return; }
      var first = groups[0];
      var html = '<div class="fv-nav-row">';
      html += '<span class="fv-nav-position">\uD83D\uDCC4 워크플로우 정의</span>';
      if (first.members.length > 1) {
        html += '<span class="fv-nav-branch-hint">' + first.members.length + '개 분기 \u2193</span>';
        html += '</div>';
        html += renderBranchOptions(wfId, first);
      } else {
        html += '<button class="fv-nav-btn" data-wf-id="' + esc(wfId) + '" data-file-path="' + esc(first.members[0].file.path) + '">' +
          '<span class="nav-label">첫 번째 단계로</span><span class="nav-arrow">\u2192</span></button>';
        html += '</div>';
      }
      navEl.innerHTML = html;
      navEl.style.display = '';
      return;
    }

    // --- Step file ---
    if (isStepFile(currentPath)) {
      var pos = findInGroups(groups, currentPath);
      if (!pos) { navEl.style.display = 'none'; return; }
      var gi = pos.gi;
      var currentGroup = groups[gi];
      var prevGroup = gi > 0 ? groups[gi - 1] : null;
      var nextGroup = gi < groups.length - 1 ? groups[gi + 1] : null;
      var pills = getGroupPills(currentGroup);
      var showPills = pills.length > 1;
      var isBranch = currentGroup.members.length > 1;

      var html = '<div class="fv-nav-row">';

      // PREV
      if (prevGroup) {
        var prevFile = prevGroup.members[0].file;
        html += '<button class="fv-nav-btn" data-wf-id="' + esc(wfId) + '" data-file-path="' + esc(prevFile.path) + '">' +
          '<span class="nav-arrow">\u2190</span><span class="nav-label">' + esc(prevFile.path.split('/').pop()) + '</span></button>';
      } else {
        html += '<button class="fv-nav-btn" data-wf-id="' + esc(wfId) + '" data-file-path="__workflow__">' +
          '<span class="nav-arrow">\u2190</span><span class="nav-label">워크플로우 정의</span></button>';
      }

      // CENTER (position + dots, counted by group)
      html += '<div class="fv-nav-center"><span class="fv-nav-position">' + (gi + 1) + ' / ' + groups.length + '</span>';
      if (groups.length <= 14) {
        html += '<div class="fv-nav-dots">';
        groups.forEach(function(g, i) {
          html += '<span class="fv-nav-dot' + (i === gi ? ' active' : '') + (g.members.length > 1 ? ' branch' : '') + '"></span>';
        });
        html += '</div>';
      }
      html += '</div>';

      // NEXT
      if (nextGroup) {
        if (nextGroup.members.length > 1) {
          html += '<span class="fv-nav-branch-hint">' + nextGroup.members.length + '개 분기 \u2193</span>';
        } else {
          var nextFile = nextGroup.members[0].file;
          html += '<button class="fv-nav-btn" data-wf-id="' + esc(wfId) + '" data-file-path="' + esc(nextFile.path) + '">' +
            '<span class="nav-label">' + esc(nextFile.path.split('/').pop()) + '</span><span class="nav-arrow">\u2192</span></button>';
        }
      } else {
        html += '<span></span>';
      }

      html += '</div>'; // close fv-nav-row

      // Sibling pills (when on branch step or sub-step)
      if (showPills) {
        html += '<div class="fv-nav-pills">';
        if (isBranch) html += '<span class="fv-nav-pills-label">분기</span>';
        pills.forEach(function(f) {
          var active = f.path === currentPath;
          var shortName = f.path.split('/').pop().replace(/\.\w+$/, '');
          html += '<button class="fv-nav-pill' + (active ? ' active' : '') + '" ' +
            'data-wf-id="' + esc(wfId) + '" data-file-path="' + esc(f.path) + '">' + esc(shortName) + '</button>';
        });
        html += '</div>';
      }

      // Next branch options (expanded below)
      if (nextGroup && nextGroup.members.length > 1) {
        html += renderBranchOptions(wfId, nextGroup);
      }

      navEl.innerHTML = html;
      navEl.style.display = '';
      return;
    }

    // --- Non-step file ---
    navEl.innerHTML = '<div class="fv-nav-row"><button class="fv-nav-btn" data-wf-id="' + esc(wfId) + '" data-file-path="__workflow__">' +
      '<span class="nav-arrow">\u2190</span><span class="nav-label">워크플로우 정의로 돌아가기</span></button></div>';
    navEl.style.display = '';
  }

  function renderStepItemHtml(wfId, file, num, isBranchMember, isSub) {
    var cls = 'fv-step-item' + (isBranchMember ? ' branch-member' : '') + (isSub ? ' child' : '');
    var badge;
    if (num) {
      badge = '<span class="fv-step-num is-step">' + num + '</span>';
    } else if (isBranchMember) {
      badge = '<span class="fv-step-num branch-arrow">\u25B8</span>';
    } else {
      badge = '<span class="fv-step-num">\u00B7</span>';
    }
    return '<div class="' + cls + '" data-wf-id="' + esc(wfId) + '" data-file-path="' + esc(file.path) + '">' +
      badge +
      '<span class="fv-step-name">' + esc(file.path.split('/').pop()) + '</span>' +
      (file.purpose ? '<span class="fv-step-purpose">' + esc(file.purpose) + '</span>' : '') +
      '</div>';
  }

  function renderWorkflowStepList(wfId, contentEl) {
    var allFiles = getWorkflowAllFiles(wfId);
    if (allFiles.length === 0) return;

    var groups = getWorkflowStepGroups(wfId);
    var nonStepFiles = allFiles.filter(function(f) { return !isStepFile(f.path); });

    var html = '<div class="fv-workflow-steps"><div class="fv-workflow-steps-title">파일 목록</div>';

    var groupNum = 0;
    groups.forEach(function(g) {
      groupNum++;
      var isBranch = g.members.length > 1;
      if (isBranch) {
        html += '<div class="fv-step-group-label"><span class="fv-step-num is-step">' + groupNum + '</span><span>분기 ' + g.members.length + '개</span></div>';
        g.members.forEach(function(m) {
          html += renderStepItemHtml(wfId, m.file, null, true, false);
          m.subs.forEach(function(s) { html += renderStepItemHtml(wfId, s, null, false, true); });
        });
      } else {
        var m = g.members[0];
        html += renderStepItemHtml(wfId, m.file, groupNum, false, false);
        m.subs.forEach(function(s) { html += renderStepItemHtml(wfId, s, null, false, true); });
      }
    });

    if (nonStepFiles.length > 0) {
      html += '<div class="fv-step-group-label" style="margin-top:10px"><span class="fv-step-num">\u2022</span><span>참조 파일</span></div>';
      nonStepFiles.forEach(function(f) {
        html += '<div class="fv-step-item' + (f._depth > 0 ? ' child' : '') + '" data-wf-id="' + esc(wfId) + '" data-file-path="' + esc(f.path) + '">' +
          '<span class="fv-step-num">\u00B7</span>' +
          '<span class="fv-step-name">' + esc(f.path.split('/').pop()) + '</span>' +
          (f.purpose ? '<span class="fv-step-purpose">' + esc(f.purpose) + '</span>' : '') +
          '</div>';
      });
    }

    html += '</div>';
    contentEl.insertAdjacentHTML('beforeend', html);
  }

  function resolveContentLinks(contentEl, wfId) {
    const allFiles = getWorkflowAllFiles(wfId);
    if (allFiles.length === 0) return;

    // Build a set of filenames for matching
    // Exclude generic names that appear across many workflows (noisy links)
    const GENERIC_NAMES = { 'instructions.md': 1, 'instructions.xml': 1, 'checklist.md': 1, 'template.md': 1, 'research.template.md': 1 };
    const fileMap = {};
    allFiles.forEach(function(f) {
      const name = f.path.split('/').pop();
      if (!GENERIC_NAMES[name]) fileMap[name] = f.path;
    });
    const fileNames = Object.keys(fileMap).filter(function(n) { return n.length > 4; }); // skip very short names
    if (fileNames.length === 0) return;

    // Escape special regex chars and build pattern
    const escaped = fileNames.map(function(n) { return n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); });
    const pattern = new RegExp('(' + escaped.join('|') + ')', 'g');

    // Walk text nodes
    const walker = document.createTreeWalker(contentEl, NodeFilter.SHOW_TEXT, null, false);
    const nodesToReplace = [];
    var node;
    while (node = walker.nextNode()) {
      // Skip nodes inside pre, code, and already-resolved links
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
  }

  function fileTypeIconText(ext) {
    switch (ext) {
      case 'md': return '\uD83D\uDCC4';
      case 'yaml': case 'yml': return '\u2699';
      case 'xml': return '\uD83D\uDCCC';
      case 'csv': return '\uD83D\uDCCA';
      case 'groovy': return '\u2692';
      default: return '\uD83D\uDCC4';
    }
  }

  // Close button
  document.getElementById('file-viewer-close').addEventListener('click', hideFileViewer);

  // Navigation click delegation within file viewer
  fileViewer.addEventListener('click', function(e) {
    // Helper: navigate to a file by wfId + path
    function navTo(el) {
      var wfId = el.dataset.wfId;
      var filePath = el.dataset.filePath;
      if (!wfId || !filePath) return;
      if (filePath === '__workflow__') {
        var wf = findWorkflowById(wfId);
        if (wf && wf.workflowFile) {
          var ext = wf.workflowFile.split('.').pop();
          showFileViewer({ path: wf.workflowFile, type: ext }, wfId, true);
        }
      } else {
        var fileData = findFileInData(wfId, filePath);
        if (fileData) showFileViewer(fileData, wfId);
      }
    }

    // Nav button (prev/next/back)
    var navBtn = e.target.closest('.fv-nav-btn');
    if (navBtn) { navTo(navBtn); return; }

    // Branch option button
    var branchBtn = e.target.closest('.fv-nav-branch-btn');
    if (branchBtn) { navTo(branchBtn); return; }

    // Branch/sub pill
    var pill = e.target.closest('.fv-nav-pill');
    if (pill) { navTo(pill); return; }

    // Step item (from workflow step list)
    var stepItem = e.target.closest('.fv-step-item');
    if (stepItem) { navTo(stepItem); return; }

    // Content file link
    var fileLink = e.target.closest('.fv-file-link');
    if (fileLink) { navTo(fileLink); return; }

    // Agent workflow item → open workflow definition file
    var agentWfItem = e.target.closest('.fv-agent-wf-item');
    if (agentWfItem) {
      var wfId = agentWfItem.dataset.wfId;
      var wf = findWorkflowById(wfId);
      if (wf && wf.workflowFile) {
        var ext = wf.workflowFile.split('.').pop();
        showFileViewer({ path: wf.workflowFile, type: ext }, wfId, true);
      }
      return;
    }

    // Agent link → navigate to referenced workflow or agent
    var agentLink = e.target.closest('.fv-agent-link');
    if (agentLink) {
      // Agent reference
      if (agentLink.dataset.agentId) {
        var result = findAgentById(agentLink.dataset.agentId);
        if (result) showAgentViewer(result.agent, result.mod);
        return;
      }
      // Workflow/file reference
      var wfId = agentLink.dataset.wfId;
      var filePath = agentLink.dataset.filePath;
      if (wfId && filePath) {
        if (agentLink.dataset.isWf === '1') {
          showFileViewer({ path: filePath, type: filePath.split('.').pop() }, wfId, true);
        } else {
          var fileData = findFileInData(wfId, filePath);
          if (fileData) showFileViewer(fileData, wfId);
        }
      }
      return;
    }
  });

  // =========================================================
  //  LAYOUT ENGINE (original)
  // =========================================================
  function computeLayout() {
    const mods = BMAD_DATA.modules;
    const core = mods[0];
    const rest = mods.slice(1);

    const positions = { modules: {}, agents: {}, workflows: {} };

    const rowW = rest.length * MOD_W + (rest.length - 1) * GAP_X;

    const coreX = PAD + (rowW - MOD_W) / 2;
    const coreY = PAD;
    positions.modules[core.id] = { x: coreX, y: coreY, w: MOD_W, h: MOD_H, mod: core };

    let coreBottom = coreY + MOD_H;
    if (expanded[core.id]) {
      coreBottom = placeChildren(core, coreX, coreY + MOD_H + 20, positions);
    }

    const row2Y = coreBottom + GAP_Y + 40;

    rest.forEach((mod, i) => {
      const mx = PAD + i * (MOD_W + GAP_X);
      positions.modules[mod.id] = { x: mx, y: row2Y, w: MOD_W, h: MOD_H, mod: mod };
      if (expanded[mod.id]) {
        placeChildren(mod, mx, row2Y + MOD_H + 20, positions);
      }
    });

    let maxX = 0, maxY = 0;
    Object.values(positions.modules).forEach(p => { maxX = Math.max(maxX, p.x + p.w); maxY = Math.max(maxY, p.y + p.h); });
    Object.values(positions.agents).forEach(p => { maxX = Math.max(maxX, p.x + p.w); maxY = Math.max(maxY, p.y + p.h); });
    Object.values(positions.workflows).forEach(p => { maxX = Math.max(maxX, p.x + p.w); maxY = Math.max(maxY, p.y + p.h); });

    positions.bounds = { w: maxX + PAD, h: maxY + PAD };
    layoutCache = positions;
    return positions;
  }

  function placeChildren(mod, startX, startY, positions) {
    let curY = startY;
    const agentX = startX + 20;

    mod.agents.forEach(agent => {
      positions.agents[agent.id] = { x: agentX, y: curY, w: AGT_W, h: AGT_H, agent, modId: mod.id };
      curY += AGT_H + AGT_GAP;

      const wfX = agentX + 30;
      const wfIds = agent.workflows || [];
      wfIds.forEach(wfId => {
        const wf = mod.workflows.find(w => w.id === wfId);
        if (!wf) {
          const coreWf = BMAD_DATA.modules[0].workflows.find(w => w.id === wfId);
          if (coreWf) {
            positions.workflows[wfId + ':' + agent.id] = { x: wfX, y: curY, w: WF_W, h: WF_H, wf: coreWf, agentId: agent.id, modId: mod.id, cross: true };
            curY += WF_H + WF_GAP;
          }
          return;
        }
        positions.workflows[wfId + ':' + agent.id] = { x: wfX, y: curY, w: WF_W, h: WF_H, wf, agentId: agent.id, modId: mod.id };
        curY += WF_H + WF_GAP;
      });

      curY += 6;
    });

    return curY;
  }

  // =========================================================
  //  RENDER (original SVG)
  // =========================================================
  function render() {
    edgesLayer.innerHTML = '';
    nodesLayer.innerHTML = '';

    const pos = computeLayout();

    // 1) Dependency edges
    BMAD_DATA.dependencies.forEach(dep => {
      const from = pos.modules[dep.from];
      const to = pos.modules[dep.to];
      if (!from || !to) return;
      const x1 = from.x + from.w / 2;
      const y1 = from.y;
      const x2 = to.x + to.w / 2;
      const y2 = to.y + to.h;
      const path = el('path', {
        class: 'edge-line edge-dep',
        d: `M${x1},${y1} C${x1},${y1 - 40} ${x2},${y2 + 40} ${x2},${y2}`,
        'data-from': dep.from,
        'data-to': dep.to
      });
      const title = el('title');
      title.textContent = dep.label;
      path.appendChild(title);
      edgesLayer.appendChild(path);
    });

    // 2) Module cards
    Object.entries(pos.modules).forEach(([id, p]) => {
      const mod = p.mod;
      const isExp = expanded[id];
      const g = el('g', { class: 'module-card', 'data-id': id, transform: `translate(${p.x},${p.y})` });

      g.appendChild(el('rect', {
        class: 'module-card-bg',
        width: MOD_W, height: MOD_H,
        fill: hexToRgba(mod.color, 0.1),
        stroke: hexToRgba(mod.color, 0.4)
      }));

      g.appendChild(el('rect', {
        x: 0, y: 0, width: 4, height: MOD_H,
        fill: mod.color, rx: 2
      }));

      g.appendChild(makeText(mod.shortName + ' - ' + mod.name, 16, 28, 'module-label', MOD_W - 40));

      const aCount = mod.agents.length;
      const wCount = mod.workflows.length;
      g.appendChild(makeText(`${aCount} agents  ·  ${wCount} workflows`, 16, 46, 'module-sub'));

      g.appendChild(makeText(isExp ? '▲' : '▼', MOD_W - 20, 40, 'module-expand-icon'));

      g.addEventListener('click', (e) => {
        e.stopPropagation();
        expanded[id] = !expanded[id];
        render();
      });

      g.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showDetail('module', mod);
      });

      nodesLayer.appendChild(g);
    });

    // 3) Agent nodes
    Object.entries(pos.agents).forEach(([id, p]) => {
      const agent = p.agent;
      const mod = BMAD_DATA.modules.find(m => m.id === p.modId);
      const color = mod ? mod.color : '#666';

      const modPos = pos.modules[p.modId];
      if (modPos) {
        const line = el('path', {
          class: 'edge-line edge-agent',
          stroke: hexToRgba(color, 0.3),
          d: `M${modPos.x + 20},${modPos.y + MOD_H} L${modPos.x + 20},${p.y + AGT_H / 2} L${p.x},${p.y + AGT_H / 2}`
        });
        edgesLayer.appendChild(line);
      }

      const g = el('g', { class: 'agent-node visible', 'data-id': id, transform: `translate(${p.x},${p.y})` });

      g.appendChild(el('rect', {
        class: 'agent-bg',
        width: AGT_W, height: AGT_H,
        stroke: hexToRgba(color, 0.25)
      }));

      g.appendChild(el('circle', { cx: 14, cy: AGT_H / 2, r: 4, fill: color, opacity: 0.7 }));
      g.appendChild(makeText(agent.name, 26, 18, 'agent-label'));
      g.appendChild(makeText(agent.fullName, 26, 32, 'agent-role'));

      const wfCount = (agent.workflows || []).length;
      if (wfCount > 0) {
        g.appendChild(el('rect', {
          class: 'agent-wf-count-bg',
          x: AGT_W - 28, y: (AGT_H - 16) / 2,
          width: 22, height: 16,
          fill: hexToRgba(color, 0.2),
          stroke: hexToRgba(color, 0.3),
          'stroke-width': 0.5
        }));
        g.appendChild(makeText(wfCount.toString(), AGT_W - 17, AGT_H / 2 + 4, 'agent-wf-count'));
        g.querySelector('.agent-wf-count').setAttribute('text-anchor', 'middle');
      }

      g.addEventListener('click', (e) => {
        e.stopPropagation();
        highlightAgent(agent.id);
        showDetail('agent', agent, mod);
      });

      nodesLayer.appendChild(g);
    });

    // 4) Workflow nodes
    Object.entries(pos.workflows).forEach(([key, p]) => {
      const wf = p.wf;
      const mod = BMAD_DATA.modules.find(m => m.id === p.modId);
      const color = mod ? mod.color : '#666';
      const agentPos = pos.agents[p.agentId];

      if (agentPos) {
        const line = el('path', {
          class: 'edge-line edge-wf',
          stroke: hexToRgba(color, 0.2),
          d: `M${agentPos.x + 30},${agentPos.y + AGT_H} L${agentPos.x + 30},${p.y + WF_H / 2} L${p.x},${p.y + WF_H / 2}`
        });
        edgesLayer.appendChild(line);
      }

      const g = el('g', { class: 'wf-node visible', 'data-id': key, transform: `translate(${p.x},${p.y})` });

      g.appendChild(el('rect', {
        class: 'wf-bg',
        width: WF_W, height: WF_H
      }));

      g.appendChild(el('rect', {
        x: 0, y: 0, width: 2, height: WF_H,
        fill: p.cross ? '#10b981' : hexToRgba(color, 0.5),
        rx: 1
      }));

      g.appendChild(makeText(wf.name, 10, WF_H / 2 + 4, 'wf-label'));

      g.addEventListener('click', (e) => {
        e.stopPropagation();
        highlightWorkflow(wf.id);
        showDetail('workflow', wf, mod);
      });

      nodesLayer.appendChild(g);
    });

    applyTransform();
  }

  // === Text Helper ===
  function makeText(str, x, y, cls, maxWidth) {
    const t = el('text', { x, y, class: cls });
    t.textContent = str;
    if (maxWidth) {
      requestAnimationFrame(() => {
        while (t.getComputedTextLength && t.getComputedTextLength() > maxWidth && t.textContent.length > 3) {
          t.textContent = t.textContent.slice(0, -4) + '...';
        }
      });
    }
    return t;
  }

  // === Color Helpers ===
  function hexToRgba(hex, a) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  // =========================================================
  //  HIGHLIGHT (original)
  // =========================================================
  function clearHighlight() {
    nodesLayer.querySelectorAll('.dim').forEach(n => n.classList.remove('dim'));
    nodesLayer.querySelectorAll('.highlighted').forEach(n => n.classList.remove('highlighted'));
    edgesLayer.querySelectorAll('.dim').forEach(n => n.classList.remove('dim'));
    edgesLayer.querySelectorAll('.edge-highlight').forEach(n => n.classList.remove('edge-highlight'));
  }

  function highlightAgent(agentId) {
    clearHighlight();
    const relatedWfKeys = new Set();
    Object.entries(layoutCache.workflows).forEach(([key, p]) => {
      if (p.agentId === agentId) relatedWfKeys.add(key);
    });

    nodesLayer.querySelectorAll('.agent-node, .wf-node').forEach(n => n.classList.add('dim'));
    edgesLayer.querySelectorAll('.edge-line').forEach(n => n.classList.add('dim'));

    const agentEl = nodesLayer.querySelector(`.agent-node[data-id="${agentId}"]`);
    if (agentEl) { agentEl.classList.remove('dim'); agentEl.classList.add('highlighted'); }

    relatedWfKeys.forEach(key => {
      const wfEl = nodesLayer.querySelector(`.wf-node[data-id="${CSS.escape(key)}"]`);
      if (wfEl) { wfEl.classList.remove('dim'); wfEl.classList.add('highlighted'); }
    });

    edgesLayer.querySelectorAll('.edge-wf').forEach(line => {
      const d = line.getAttribute('d') || '';
      const agentPos = layoutCache.agents[agentId];
      if (agentPos && d.includes(`${agentPos.x + 30},${agentPos.y + AGT_H}`)) {
        line.classList.remove('dim');
        line.classList.add('edge-highlight');
      }
    });

    nodesLayer.querySelectorAll('.module-card').forEach(n => n.classList.remove('dim'));
  }

  function highlightWorkflow(wfId) {
    clearHighlight();
    const relatedAgentIds = new Set();
    const relatedWfKeys = new Set();
    BMAD_DATA.modules.forEach(mod => {
      mod.agents.forEach(agent => {
        if ((agent.workflows || []).includes(wfId)) {
          relatedAgentIds.add(agent.id);
        }
      });
    });
    Object.entries(layoutCache.workflows).forEach(([key, p]) => {
      if (key.startsWith(wfId + ':')) relatedWfKeys.add(key);
    });

    nodesLayer.querySelectorAll('.agent-node, .wf-node').forEach(n => n.classList.add('dim'));
    edgesLayer.querySelectorAll('.edge-line').forEach(n => n.classList.add('dim'));

    relatedWfKeys.forEach(key => {
      const wfEl = nodesLayer.querySelector(`.wf-node[data-id="${CSS.escape(key)}"]`);
      if (wfEl) { wfEl.classList.remove('dim'); wfEl.classList.add('highlighted'); }
    });

    relatedAgentIds.forEach(aid => {
      const agentEl = nodesLayer.querySelector(`.agent-node[data-id="${aid}"]`);
      if (agentEl) { agentEl.classList.remove('dim'); agentEl.classList.add('highlighted'); }
    });

    nodesLayer.querySelectorAll('.module-card').forEach(n => n.classList.remove('dim'));
  }

  // =========================================================
  //  DETAIL PANEL (original)
  // =========================================================
  function showDetail(type, item, mod) {
    const dp = detailPanel;
    dp.classList.remove('hidden');

    const color = mod ? mod.color : (item.color || '#10b981');
    document.getElementById('detail-dot').style.background = color;
    document.getElementById('detail-title').textContent = item.name || item.shortName;

    let typeLabel = '';
    if (type === 'module') typeLabel = 'Module';
    else if (type === 'agent') typeLabel = `Agent · ${mod.shortName}`;
    else typeLabel = `Workflow · ${mod ? mod.shortName : ''}`;
    document.getElementById('detail-type').textContent = typeLabel;

    document.getElementById('detail-desc').textContent = item.description || '';

    const extras = document.getElementById('detail-extras');
    extras.innerHTML = '';

    if (type === 'module') {
      extras.innerHTML = `
        <span class="detail-tag">${item.agents.length} Agents</span>
        <span class="detail-tag">${item.workflows.length} Workflows</span>
      `;
    } else if (type === 'agent') {
      const wfNames = (item.workflows || []).map(wfId => {
        const allMods = BMAD_DATA.modules;
        for (const m of allMods) {
          const found = m.workflows.find(w => w.id === wfId);
          if (found) return found.name;
        }
        return wfId;
      });
      extras.innerHTML = wfNames.map(n => `<span class="detail-tag">${esc(n)}</span>`).join('');
    } else if (type === 'workflow') {
      const users = [];
      BMAD_DATA.modules.forEach(m => {
        m.agents.forEach(a => {
          if ((a.workflows || []).includes(item.id)) {
            users.push(a.name + ' (' + m.shortName + ')');
          }
        });
      });
      if (users.length > 0) {
        extras.innerHTML = '<span class="detail-tag" style="font-size:10px;color:var(--text3)">Used by:</span>' +
          users.map(u => `<span class="detail-tag">${esc(u)}</span>`).join('');
      }
      if (item.category) {
        extras.innerHTML += `<span class="detail-tag" style="border-color:${color}">${item.category}</span>`;
      }
    }
  }

  function hideDetail() {
    detailPanel.classList.add('hidden');
    clearHighlight();
  }

  // =========================================================
  //  ZOOM & PAN (original)
  // =========================================================
  function applyTransform() {
    root.setAttribute('transform', `translate(${panX},${panY}) scale(${zoom})`);
    document.getElementById('zoom-level').textContent = Math.round(zoom * 100) + '%';
  }

  function zoomAt(factor, cx, cy) {
    const newZoom = Math.min(3, Math.max(0.15, zoom * factor));
    const scale = newZoom / zoom;
    panX = cx - scale * (cx - panX);
    panY = cy - scale * (cy - panY);
    zoom = newZoom;
    applyTransform();
  }

  function fitToView() {
    if (!layoutCache) return;
    const b = layoutCache.bounds;
    const vw = canvasWrap.clientWidth;
    const vh = canvasWrap.clientHeight;
    const scale = Math.min(vw / b.w, vh / b.h, 1.5) * 0.9;
    zoom = scale;
    panX = (vw - b.w * scale) / 2;
    panY = (vh - b.h * scale) / 2;
    applyTransform();
  }

  // Mouse wheel zoom
  canvasWrap.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = canvasWrap.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    zoomAt(factor, cx, cy);
  }, { passive: false });

  // Pan via drag
  canvasWrap.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    dragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    panStartX = panX;
    panStartY = panY;
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    panX = panStartX + (e.clientX - dragStartX);
    panY = panStartY + (e.clientY - dragStartY);
    applyTransform();
  });
  window.addEventListener('mouseup', () => { dragging = false; });

  // Touch support
  let touchStartDist = 0, touchStartZoom = 1;
  canvasWrap.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      dragging = true;
      dragStartX = e.touches[0].clientX;
      dragStartY = e.touches[0].clientY;
      panStartX = panX;
      panStartY = panY;
    } else if (e.touches.length === 2) {
      dragging = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartDist = Math.hypot(dx, dy);
      touchStartZoom = zoom;
    }
  }, { passive: true });
  canvasWrap.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (e.touches.length === 1 && dragging) {
      panX = panStartX + (e.touches[0].clientX - dragStartX);
      panY = panStartY + (e.touches[0].clientY - dragStartY);
      applyTransform();
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const newZoom = Math.min(3, Math.max(0.15, touchStartZoom * (dist / touchStartDist)));
      const rect = canvasWrap.getBoundingClientRect();
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
      const scale = newZoom / zoom;
      panX = cx - scale * (cx - panX);
      panY = cy - scale * (cy - panY);
      zoom = newZoom;
      applyTransform();
    }
  }, { passive: false });
  canvasWrap.addEventListener('touchend', () => { dragging = false; });

  // === Button Handlers ===
  document.getElementById('zoom-in').addEventListener('click', () => {
    const rect = canvasWrap.getBoundingClientRect();
    zoomAt(1.25, rect.width / 2, rect.height / 2);
  });
  document.getElementById('zoom-out').addEventListener('click', () => {
    const rect = canvasWrap.getBoundingClientRect();
    zoomAt(0.8, rect.width / 2, rect.height / 2);
  });
  document.getElementById('zoom-reset').addEventListener('click', () => {
    zoom = 1; panX = 0; panY = 0;
    applyTransform();
  });
  document.getElementById('btn-fit').addEventListener('click', fitToView);
  document.getElementById('btn-collapse').addEventListener('click', () => {
    Object.keys(expanded).forEach(k => expanded[k] = false);
    render();
    setTimeout(fitToView, 50);
  });

  // Close detail panel on background click
  canvasWrap.addEventListener('click', (e) => {
    if (e.target === svg || e.target === canvasWrap) hideDetail();
  });
  document.getElementById('detail-close').addEventListener('click', hideDetail);

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { hideDetail(); hideFileViewer(); }
  });

  // =========================================================
  //  SEARCH (extended with file type)  (Step 6)
  // =========================================================
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  function buildSearchIndex() {
    const items = [];
    BMAD_DATA.modules.forEach(mod => {
      mod.agents.forEach(agent => {
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
      });
      mod.workflows.forEach(wf => {
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

        // Index files within workflows
        const indexFiles = (files, wfRef) => {
          (files || []).forEach(f => {
            const fileName = f.path.split('/').pop();
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
    return items;
  }

  const searchIndex = buildSearchIndex();

  function highlightMatch(text, query) {
    if (!query) return esc(text);
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return esc(text);
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + query.length);
    const after = text.slice(idx + query.length);
    return esc(before) + '<mark>' + esc(match) + '</mark>' + esc(after);
  }

  let currentMatches = [];
  let selectedIdx = -1;

  function updateSelectedUI() {
    searchResults.querySelectorAll('.search-item').forEach((el, i) => {
      el.classList.toggle('active', i === selectedIdx);
    });
    const active = searchResults.querySelector('.search-item.active');
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  function doSearch(query) {
    query = query.trim();
    if (!query) {
      searchResults.classList.add('hidden');
      currentMatches = [];
      selectedIdx = -1;
      return;
    }

    const q = query.toLowerCase();
    currentMatches = searchIndex.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.fullName.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q)
    ).slice(0, 20);
    selectedIdx = -1;

    if (currentMatches.length === 0) {
      searchResults.innerHTML = '<div class="search-empty">결과 없음</div>';
    } else {
      searchResults.innerHTML = currentMatches.map((item, i) => {
        let typeLabel = item.type === 'agent' ? 'Agent' : item.type === 'workflow' ? 'Workflow' : 'File';
        let metaExtra = '';
        if (item.type === 'file') {
          metaExtra = ` · ${item.wfName}`;
        } else if (item.fullName && item.fullName !== item.name) {
          metaExtra = ' · ' + esc(item.fullName);
        }
        return `<div class="search-item" data-idx="${i}">
          <span class="search-dot" style="background:${item.color}"></span>
          <div class="search-info">
            <div class="search-name">${highlightMatch(item.name, query)}</div>
            <div class="search-meta">${typeLabel} · ${item.modName}${metaExtra}</div>
          </div>
        </div>`;
      }).join('');

      searchResults.querySelectorAll('.search-item').forEach(el => {
        el.addEventListener('click', () => {
          const idx = parseInt(el.dataset.idx);
          navigateToItem(currentMatches[idx]);
          searchResults.classList.add('hidden');
          searchInput.value = '';
          currentMatches = [];
          selectedIdx = -1;
        });
      });
    }

    searchResults.classList.remove('hidden');
  }

  function navigateToItem(item) {
    if (item.type === 'file') {
      // Switch to the module tab, then expand the parent workflow
      switchTab(item.modId);
      requestAnimationFrame(() => {
        // Find and expand the workflow containing this file
        const wfItem = moduleView.querySelector(`.wf-list-item[data-wf-id="${CSS.escape(item.wfId)}"]`);
        if (wfItem) {
          const body = wfItem.querySelector('.wf-list-body');
          const toggle = wfItem.querySelector('.wf-list-toggle');
          if (body && !body.classList.contains('open')) {
            body.classList.add('open');
            if (toggle) toggle.classList.add('open');
          }
          wfItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Brief highlight effect
          wfItem.style.boxShadow = `0 0 0 2px ${item.color}`;
          setTimeout(() => { wfItem.style.boxShadow = ''; }, 2000);
        }
      });
      return;
    }

    if (activeTab !== 'overview') {
      switchTab('overview');
    }

    // Expand the parent module
    if (!expanded[item.modId]) {
      expanded[item.modId] = true;
      render();
    }

    requestAnimationFrame(() => {
      if (!layoutCache) return;

      let targetPos = null;
      const mod = BMAD_DATA.modules.find(m => m.id === item.modId);

      if (item.type === 'agent') {
        targetPos = layoutCache.agents[item.id];
      } else {
        for (const [key, pos] of Object.entries(layoutCache.workflows)) {
          if (key.startsWith(item.id + ':')) {
            targetPos = pos;
            break;
          }
        }
      }

      if (targetPos) {
        const vw = canvasWrap.clientWidth;
        const vh = canvasWrap.clientHeight;
        const cx = targetPos.x + targetPos.w / 2;
        const cy = targetPos.y + targetPos.h / 2;
        zoom = 1.2;
        panX = vw / 2 - cx * zoom;
        panY = vh / 2 - cy * zoom;
        applyTransform();

        if (item.type === 'agent') {
          highlightAgent(item.id);
          showDetail('agent', item.data, mod);
        } else {
          highlightWorkflow(item.id);
          showDetail('workflow', item.data, mod);
        }
      }
    });
  }

  searchInput.addEventListener('input', () => doSearch(searchInput.value));

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchResults.classList.add('hidden');
      searchInput.blur();
      return;
    }
    if (currentMatches.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIdx = selectedIdx < currentMatches.length - 1 ? selectedIdx + 1 : 0;
      updateSelectedUI();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIdx = selectedIdx > 0 ? selectedIdx - 1 : currentMatches.length - 1;
      updateSelectedUI();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIdx >= 0 && selectedIdx < currentMatches.length) {
        navigateToItem(currentMatches[selectedIdx]);
        searchResults.classList.add('hidden');
        searchInput.value = '';
        currentMatches = [];
        selectedIdx = -1;
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (!document.getElementById('search-wrap').contains(e.target)) {
      searchResults.classList.add('hidden');
    }
  });

  // Ctrl+K shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // =========================================================
  //  INIT
  // =========================================================
  render();
  setTimeout(fitToView, 100);

})();
