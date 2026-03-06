// === doc-view.js ===
// Doc 탭 뷰

(function(B) {
  'use strict';
  var S = B.state;

  B.docView.show = function() {
    B.dom.docView.classList.remove('hidden');
    if (!S.docInitialized) {
      B.docView.renderNav();
      // Show first item
      var firstCat = DOC_DATA.categories[0];
      if (firstCat && firstCat.items.length) {
        B.docView.showItem(firstCat.items[0].id);
        // Open first category
        var firstEl = B.dom.docNav.querySelector('.doc-cat');
        if (firstEl) firstEl.classList.add('open');
      }
      S.docInitialized = true;
    }
  };

  B.docView.renderNav = function(filter) {
    var q = (filter || '').toLowerCase().trim();
    var html = '';

    DOC_DATA.categories.forEach(function(cat) {
      // For glossary, render differently
      if (cat.id === 'glossary') {
        if (q && !cat.items.some(function(t) { return t.term.toLowerCase().includes(q) || t.full.toLowerCase().includes(q) || t.def.toLowerCase().includes(q); })) return;
        var open = q ? 'open' : '';
        html += '<div class="doc-cat ' + open + '" data-cat-id="' + cat.id + '">' +
          '<div class="doc-cat-header"><span class="doc-cat-arrow">&#9654;</span><span class="doc-cat-icon">' + B.utils.getIcon(cat.icon) + '</span>' + B.utils.esc(cat.title) + '</div>' +
          '<div class="doc-cat-items">' +
          '<div class="doc-nav-item" data-doc-id="glossary-page" data-cat-id="glossary">\uC6A9\uC5B4 \uC804\uCCB4 \uBCF4\uAE30</div>' +
          '</div>' +
          '</div>';
        return;
      }

      var items = cat.items;
      if (q) {
        items = items.filter(function(item) {
          var searchable = (item.title + ' ' + (item.tags || []).join(' ') + ' ' + (item.content || '')).toLowerCase();
          return searchable.includes(q);
        });
        if (items.length === 0) return;
      }

      var open2 = q ? 'open' : '';
      html += '<div class="doc-cat ' + open2 + '" data-cat-id="' + cat.id + '">' +
        '<div class="doc-cat-header"><span class="doc-cat-arrow">&#9654;</span><span class="doc-cat-icon">' + B.utils.getIcon(cat.icon) + '</span>' + B.utils.esc(cat.title) + ' <span style="color:var(--text3);font-weight:400;font-size:11px;margin-left:auto">' + items.length + '</span></div>' +
        '<div class="doc-cat-items">';
      items.forEach(function(item) {
        var active = item.id === S.currentDocId ? 'active' : '';
        html += '<div class="doc-nav-item ' + active + '" data-doc-id="' + item.id + '">' + (q ? B.search.highlightMatch(item.title, filter) : B.utils.esc(item.title)) + '</div>';
      });
      html += '</div></div>';
    });

    if (!html) {
      html = '<div style="padding:20px;text-align:center;color:var(--text3);font-size:13px">\uACB0\uACFC \uC5C6\uC74C</div>';
    }

    B.dom.docNav.innerHTML = html;

    // Bind events
    B.dom.docNav.querySelectorAll('.doc-cat-header').forEach(function(h) {
      h.addEventListener('click', function() {
        h.parentElement.classList.toggle('open');
      });
    });
    B.dom.docNav.querySelectorAll('.doc-nav-item').forEach(function(el) {
      el.addEventListener('click', function() {
        var docId = el.dataset.docId;
        if (docId === 'glossary-page') {
          B.docView.showGlossary();
        } else {
          B.docView.showItem(docId);
        }
      });
    });
  };

  B.docView.showItem = function(docId) {
    // Find item across all categories
    var item = null;
    for (var ci = 0; ci < DOC_DATA.categories.length; ci++) {
      var cat = DOC_DATA.categories[ci];
      if (cat.id === 'glossary') continue;
      item = cat.items.find(function(i) { return i.id === docId; });
      if (item) break;
    }
    if (!item) return;

    S.currentDocId = docId;

    // Clear search filter if active
    if (B.dom.docSearchInput.value) {
      B.dom.docSearchInput.value = '';
      B.docView.renderNav();
    }

    // Update nav active state
    B.dom.docNav.querySelectorAll('.doc-nav-item').forEach(function(el) {
      el.classList.toggle('active', el.dataset.docId === docId);
    });

    // Open parent category and scroll into view
    var parentNavItem = B.dom.docNav.querySelector('.doc-nav-item[data-doc-id="' + docId + '"]');
    if (parentNavItem) {
      var catEl = parentNavItem.closest('.doc-cat');
      if (catEl) catEl.classList.add('open');
      parentNavItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Render content
    var html = item.content || '';

    // Add related docs
    if (item.related && item.related.length) {
      html += '<div class="doc-related"><h4>\uAD00\uB828 \uBB38\uC11C</h4><div class="doc-related-links">';
      item.related.forEach(function(relId) {
        var relItem = B.docView.findItem(relId);
        if (relItem) {
          html += '<span class="doc-related-link" data-doc-id="' + relId + '">' + B.utils.esc(relItem.title) + '</span>';
        }
      });
      html += '</div></div>';
    }

    B.dom.docContentInner.innerHTML = html;
    B.dom.docContentInner.scrollTop = 0;
    document.getElementById('doc-content').scrollTop = 0;

    // Bind related links
    B.dom.docContentInner.querySelectorAll('.doc-related-link').forEach(function(el) {
      el.addEventListener('click', function() {
        B.docView.showItem(el.dataset.docId);
      });
    });

    // Bind file path links in <code> tags
    B.dom.docContentInner.querySelectorAll('code').forEach(function(codeEl) {
      var text = codeEl.textContent.trim();
      if (!/\.(md|yaml|yml|csv|json|xml)$/i.test(text)) return;
      if (codeEl.closest('pre')) return;

      var match = S.searchIndex.find(function(i) { return i.type === 'file' && i.id === text; })
        || S.searchIndex.find(function(i) { return i.type === 'file' && i.id.endsWith('/' + text.split('/').pop()); });

      if (match) {
        codeEl.classList.add('doc-file-link');
        codeEl.addEventListener('click', function(e) {
          e.stopPropagation();
          B.search.navigateToItem(match);
        });
      }
    });

    // Bind slash command links (/bmad-*) -> navigate to module tab
    B.dom.docContentInner.querySelectorAll('code').forEach(function(codeEl) {
      var text = codeEl.textContent.trim();
      if (!text.startsWith('/bmad-')) return;
      if (codeEl.closest('pre')) return;
      if (codeEl.classList.contains('doc-file-link')) return;

      var cmd = text.slice(1); // remove leading '/'
      var match = null;

      if (cmd.startsWith('bmad-agent-')) {
        var agentKey = cmd.replace('bmad-agent-', '');
        match = S.searchIndex.find(function(i) { return i.type === 'file' && i.subType === 'agent' && i.wfId === agentKey; });
        if (!match) {
          var namePart = agentKey.split('-').slice(1).join('-');
          match = S.searchIndex.find(function(i) {
            return i.type === 'file' && i.subType === 'agent' &&
              i.id.includes('/' + namePart);
          });
        }
      } else {
        var wfKey = cmd.replace('bmad-', '');
        wfKey = B.CMD_ALIAS[wfKey] || wfKey;
        match = S.searchIndex.find(function(i) { return i.type === 'file' && i.subType === 'workflow' && i.wfId === wfKey; });
        if (!match) {
          var coreKey = 'core-' + cmd.replace('bmad-', '');
          coreKey = B.CMD_ALIAS[coreKey] || coreKey;
          match = S.searchIndex.find(function(i) { return i.type === 'file' && i.subType === 'workflow' && i.wfId === coreKey; });
        }
      }

      if (match) {
        codeEl.classList.add('doc-cmd-link');
        codeEl.addEventListener('click', function(e) {
          e.stopPropagation();
          B.search.navigateToItem(match);
        });
      }
    });
  };

  B.docView.showGlossary = function() {
    S.currentDocId = 'glossary-page';
    B.dom.docNav.querySelectorAll('.doc-nav-item').forEach(function(el) {
      el.classList.toggle('active', el.dataset.docId === 'glossary-page');
    });

    var glossaryCat = DOC_DATA.categories.find(function(c) { return c.id === 'glossary'; });
    if (!glossaryCat) return;

    var html = '<h3>\uC6A9\uC5B4 \uBAA8\uC74C\uC9D1 (Glossary)</h3>';
    html += '<p>\uC6A9\uC5B4\uB97C \uD074\uB9AD\uD558\uBA74 \uAD00\uB828 \uBB38\uC11C\uB97C \uAC80\uC0C9\uD569\uB2C8\uB2E4.</p>';
    html += '<div class="glossary-grid">';
    glossaryCat.items.forEach(function(t) {
      html += '<div class="glossary-item" data-term="' + B.utils.esc(t.term) + '">' +
        '<span class="glossary-term">' + B.utils.esc(t.term) + '</span>' +
        '<span class="glossary-full">' + B.utils.esc(t.full) + '</span>' +
        '<span class="glossary-def">' + B.utils.esc(t.def) + '</span>' +
        '</div>';
    });
    html += '</div>';

    B.dom.docContentInner.innerHTML = html;
    document.getElementById('doc-content').scrollTop = 0;

    // Bind glossary items -> search
    B.dom.docContentInner.querySelectorAll('.glossary-item').forEach(function(el) {
      el.addEventListener('click', function() {
        var term = el.dataset.term;
        B.dom.docSearchInput.value = term;
        B.dom.docSearchInput.dispatchEvent(new Event('input'));
      });
    });
  };

  B.docView.findItem = function(docId) {
    for (var ci = 0; ci < DOC_DATA.categories.length; ci++) {
      var cat = DOC_DATA.categories[ci];
      if (cat.id === 'glossary') {
        var t = cat.items.find(function(i) { return i.id === docId; });
        if (t) return { title: t.term, id: t.id };
        continue;
      }
      var item = cat.items.find(function(i) { return i.id === docId; });
      if (item) return item;
    }
    return null;
  };

  // === Event Bindings ===
  B.docView.bindEvents = function() {
    B.dom.docSearchInput.addEventListener('input', function() {
      B.docView.renderNav(B.dom.docSearchInput.value);
    });
  };

})(window.BMAD);
