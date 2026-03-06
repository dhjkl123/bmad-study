// === step-nav.js ===
// 스텝 내비게이션

(function(B) {
  'use strict';

  B.stepNav.getStepList = function(wfId) {
    var wf = B.fileViewer.findWorkflowById(wfId);
    if (!wf) return [];
    var steps = [];
    function collect(files) {
      for (var i = 0; i < files.length; i++) {
        var f = files[i];
        if (B.fileViewer.isStepFile(f.path)) steps.push(f);
        if (f.children) collect(f.children);
      }
    }
    collect(wf.files || []);
    return steps;
  };

  B.stepNav.getAllFiles = function(wfId) {
    var wf = B.fileViewer.findWorkflowById(wfId);
    if (!wf) return [];
    var all = [];
    function collect(files, depth) {
      for (var i = 0; i < files.length; i++) {
        var f = files[i];
        var copy = {};
        for (var k in f) { if (f.hasOwnProperty(k)) copy[k] = f[k]; }
        copy._depth = depth;
        all.push(copy);
        if (f.children) collect(f.children, depth + 1);
      }
    }
    collect(wf.files || [], 0);
    return all;
  };

  B.stepNav.extractStepNumber = function(path) {
    var name = path.split('/').pop();
    var m = name.match(/(\d+)/);
    return m ? m[1] : null;
  };

  B.stepNav.getStepGroups = function(wfId) {
    var wf = B.fileViewer.findWorkflowById(wfId);
    if (!wf) return [];
    var groups = [];
    var current = null;
    (wf.files || []).forEach(function(f) {
      if (!B.fileViewer.isStepFile(f.path)) return;
      var num = B.stepNav.extractStepNumber(f.path);
      var subs = [];
      if (f.children) {
        f.children.forEach(function(c) {
          if (B.fileViewer.isStepFile(c.path)) subs.push(c);
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
  };

  B.stepNav.findInGroups = function(groups, path) {
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
  };

  B.stepNav.getGroupPills = function(group) {
    var pills = [];
    group.members.forEach(function(m) {
      pills.push(m.file);
      m.subs.forEach(function(s) { pills.push(s); });
    });
    return pills;
  };

  B.stepNav.renderBranchOptions = function(wfId, group) {
    var html = '<div class="fv-nav-branch-options">';
    group.members.forEach(function(m) {
      var label = m.file.path.split('/').pop();
      var purpose = m.file.purpose || '';
      if (purpose.length > 50) purpose = purpose.substring(0, 50) + '\u2026';
      html += '<button class="fv-nav-branch-btn" data-wf-id="' + B.utils.esc(wfId) + '" data-file-path="' + B.utils.esc(m.file.path) + '">' +
        '<span class="fv-nav-branch-name">' + B.utils.esc(label) + '</span>' +
        (purpose ? '<span class="fv-nav-branch-purpose">' + B.utils.esc(purpose) + '</span>' : '') +
        '<span class="nav-arrow">\u2192</span></button>';
    });
    html += '</div>';
    return html;
  };

  B.stepNav.render = function(wfId, currentPath, isWorkflowFile) {
    var navEl = document.getElementById('fv-step-nav');
    var wf = B.fileViewer.findWorkflowById(wfId);
    if (!wf) { navEl.style.display = 'none'; return; }

    var groups = B.stepNav.getStepGroups(wfId);

    // --- Workflow definition file ---
    if (isWorkflowFile) {
      if (groups.length === 0) { navEl.style.display = 'none'; return; }
      var first = groups[0];
      var html = '<div class="fv-nav-row">';
      html += '<span class="fv-nav-position">\uD83D\uDCC4 \uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC815\uC758</span>';
      if (first.members.length > 1) {
        html += '<span class="fv-nav-branch-hint">' + first.members.length + '\uAC1C \uBD84\uAE30 \u2193</span>';
        html += '</div>';
        html += B.stepNav.renderBranchOptions(wfId, first);
      } else {
        html += '<button class="fv-nav-btn" data-wf-id="' + B.utils.esc(wfId) + '" data-file-path="' + B.utils.esc(first.members[0].file.path) + '">' +
          '<span class="nav-label">\uCCAB \uBC88\uC9F8 \uB2E8\uACC4\uB85C</span><span class="nav-arrow">\u2192</span></button>';
        html += '</div>';
      }
      navEl.innerHTML = html;
      navEl.style.display = '';
      return;
    }

    // --- Step file ---
    if (B.fileViewer.isStepFile(currentPath)) {
      var pos = B.stepNav.findInGroups(groups, currentPath);
      if (!pos) { navEl.style.display = 'none'; return; }
      var gi = pos.gi;
      var currentGroup = groups[gi];
      var prevGroup = gi > 0 ? groups[gi - 1] : null;
      var nextGroup = gi < groups.length - 1 ? groups[gi + 1] : null;
      var pills = B.stepNav.getGroupPills(currentGroup);
      var showPills = pills.length > 1;
      var isBranch = currentGroup.members.length > 1;

      var html2 = '<div class="fv-nav-row">';

      // PREV
      if (prevGroup) {
        var prevFile = prevGroup.members[0].file;
        html2 += '<button class="fv-nav-btn" data-wf-id="' + B.utils.esc(wfId) + '" data-file-path="' + B.utils.esc(prevFile.path) + '">' +
          '<span class="nav-arrow">\u2190</span><span class="nav-label">' + B.utils.esc(prevFile.path.split('/').pop()) + '</span></button>';
      } else {
        html2 += '<button class="fv-nav-btn" data-wf-id="' + B.utils.esc(wfId) + '" data-file-path="__workflow__">' +
          '<span class="nav-arrow">\u2190</span><span class="nav-label">\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC815\uC758</span></button>';
      }

      // CENTER
      html2 += '<div class="fv-nav-center"><span class="fv-nav-position">' + (gi + 1) + ' / ' + groups.length + '</span>';
      if (groups.length <= 14) {
        html2 += '<div class="fv-nav-dots">';
        groups.forEach(function(g, i) {
          html2 += '<span class="fv-nav-dot' + (i === gi ? ' active' : '') + (g.members.length > 1 ? ' branch' : '') + '"></span>';
        });
        html2 += '</div>';
      }
      html2 += '</div>';

      // NEXT
      if (nextGroup) {
        if (nextGroup.members.length > 1) {
          html2 += '<span class="fv-nav-branch-hint">' + nextGroup.members.length + '\uAC1C \uBD84\uAE30 \u2193</span>';
        } else {
          var nextFile = nextGroup.members[0].file;
          html2 += '<button class="fv-nav-btn" data-wf-id="' + B.utils.esc(wfId) + '" data-file-path="' + B.utils.esc(nextFile.path) + '">' +
            '<span class="nav-label">' + B.utils.esc(nextFile.path.split('/').pop()) + '</span><span class="nav-arrow">\u2192</span></button>';
        }
      } else {
        html2 += '<span></span>';
      }

      html2 += '</div>';

      // Sibling pills
      if (showPills) {
        html2 += '<div class="fv-nav-pills">';
        if (isBranch) html2 += '<span class="fv-nav-pills-label">\uBD84\uAE30</span>';
        pills.forEach(function(f) {
          var active = f.path === currentPath;
          var shortName = f.path.split('/').pop().replace(/\.\w+$/, '');
          html2 += '<button class="fv-nav-pill' + (active ? ' active' : '') + '" ' +
            'data-wf-id="' + B.utils.esc(wfId) + '" data-file-path="' + B.utils.esc(f.path) + '">' + B.utils.esc(shortName) + '</button>';
        });
        html2 += '</div>';
      }

      // Next branch options
      if (nextGroup && nextGroup.members.length > 1) {
        html2 += B.stepNav.renderBranchOptions(wfId, nextGroup);
      }

      navEl.innerHTML = html2;
      navEl.style.display = '';
      return;
    }

    // --- Non-step file ---
    navEl.innerHTML = '<div class="fv-nav-row"><button class="fv-nav-btn" data-wf-id="' + B.utils.esc(wfId) + '" data-file-path="__workflow__">' +
      '<span class="nav-arrow">\u2190</span><span class="nav-label">\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC815\uC758\uB85C \uB3CC\uC544\uAC00\uAE30</span></button></div>';
    navEl.style.display = '';
  };

  B.stepNav.renderItemHtml = function(wfId, file, num, isBranchMember, isSub) {
    var cls = 'fv-step-item' + (isBranchMember ? ' branch-member' : '') + (isSub ? ' child' : '');
    var badge;
    if (num) {
      badge = '<span class="fv-step-num is-step">' + num + '</span>';
    } else if (isBranchMember) {
      badge = '<span class="fv-step-num branch-arrow">\u25B8</span>';
    } else {
      badge = '<span class="fv-step-num">\u00B7</span>';
    }
    return '<div class="' + cls + '" data-wf-id="' + B.utils.esc(wfId) + '" data-file-path="' + B.utils.esc(file.path) + '">' +
      badge +
      '<span class="fv-step-name">' + B.utils.esc(file.path.split('/').pop()) + '</span>' +
      (file.purpose ? '<span class="fv-step-purpose">' + B.utils.esc(file.purpose) + '</span>' : '') +
      '</div>';
  };

  B.stepNav.renderWorkflowStepList = function(wfId, contentEl) {
    var allFiles = B.stepNav.getAllFiles(wfId);
    if (allFiles.length === 0) return;

    var groups = B.stepNav.getStepGroups(wfId);
    var nonStepFiles = allFiles.filter(function(f) { return !B.fileViewer.isStepFile(f.path); });

    var html = '<div class="fv-workflow-steps"><div class="fv-workflow-steps-title">\uD30C\uC77C \uBAA9\uB85D</div>';

    var groupNum = 0;
    groups.forEach(function(g) {
      groupNum++;
      var isBranch2 = g.members.length > 1;
      if (isBranch2) {
        html += '<div class="fv-step-group-label"><span class="fv-step-num is-step">' + groupNum + '</span><span>\uBD84\uAE30 ' + g.members.length + '\uAC1C</span></div>';
        g.members.forEach(function(m) {
          html += B.stepNav.renderItemHtml(wfId, m.file, null, true, false);
          m.subs.forEach(function(s) { html += B.stepNav.renderItemHtml(wfId, s, null, false, true); });
        });
      } else {
        var m2 = g.members[0];
        html += B.stepNav.renderItemHtml(wfId, m2.file, groupNum, false, false);
        m2.subs.forEach(function(s) { html += B.stepNav.renderItemHtml(wfId, s, null, false, true); });
      }
    });

    if (nonStepFiles.length > 0) {
      html += '<div class="fv-step-group-label" style="margin-top:10px"><span class="fv-step-num">\u2022</span><span>\uCC38\uC870 \uD30C\uC77C</span></div>';
      nonStepFiles.forEach(function(f) {
        html += '<div class="fv-step-item' + (f._depth > 0 ? ' child' : '') + '" data-wf-id="' + B.utils.esc(wfId) + '" data-file-path="' + B.utils.esc(f.path) + '">' +
          '<span class="fv-step-num">\u00B7</span>' +
          '<span class="fv-step-name">' + B.utils.esc(f.path.split('/').pop()) + '</span>' +
          (f.purpose ? '<span class="fv-step-purpose">' + B.utils.esc(f.purpose) + '</span>' : '') +
          '</div>';
      });
    }

    html += '</div>';
    contentEl.insertAdjacentHTML('beforeend', html);
  };

})(window.BMAD);
