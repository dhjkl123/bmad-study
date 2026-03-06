// === tab-controller.js ===
// 탭 전환 로직

(function(B) {
  'use strict';
  var S = B.state;

  B.tabs.switchTab = function(tabId) {
    S.activeTab = tabId;
    B.fileViewer.hide();

    // Update tab button states & clear inline borderBottomColor
    B.dom.tabBar.querySelectorAll('.tab-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
      btn.style.borderBottomColor = '';
    });

    // Update active tab indicator color
    var mod = BMAD_DATA.modules.find(function(m) { return m.id === tabId; });
    B.dom.tabBar.querySelectorAll('.tab-btn.active').forEach(function(btn) {
      btn.style.borderBottomColor = mod ? mod.color : '';
    });

    if (tabId === 'doc') {
      B.dom.canvasWrap.style.display = 'none';
      B.dom.moduleView.classList.add('hidden');
      document.getElementById('btn-fit').style.display = 'none';
      document.getElementById('btn-collapse').style.display = 'none';
      document.getElementById('doc-view').classList.remove('hidden');
      B.detailPanel.hide();
      B.docView.show();
    } else if (tabId === 'overview') {
      B.dom.canvasWrap.classList.remove('hidden');
      B.dom.canvasWrap.style.display = '';
      B.dom.moduleView.classList.add('hidden');
      document.getElementById('doc-view').classList.add('hidden');
      document.getElementById('btn-fit').style.display = '';
      document.getElementById('btn-collapse').style.display = '';
    } else {
      B.dom.canvasWrap.style.display = 'none';
      B.dom.moduleView.classList.remove('hidden');
      document.getElementById('doc-view').classList.add('hidden');
      document.getElementById('btn-fit').style.display = 'none';
      document.getElementById('btn-collapse').style.display = 'none';
      B.detailPanel.hide();
      B.moduleView.render(tabId);
    }
  };

  // 탭 바 click 이벤트는 app.js 초기화 후 바인딩하기 위해
  // 여기서는 함수만 등록하고, 이벤트는 app.js에서 바인딩
  B.tabs.bindEvents = function() {
    B.dom.tabBar.addEventListener('click', function(e) {
      var btn = e.target.closest('.tab-btn');
      if (!btn) return;
      B.tabs.switchTab(btn.dataset.tab);
      btn.blur();
    });
  };

})(window.BMAD);
