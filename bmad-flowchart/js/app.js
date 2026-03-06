// === app.js ===
// 진입점: DOM 참조 초기화 및 모든 모듈 부트스트랩

(function(B) {
  'use strict';
  var S = B.state;

  // DOM 참조 초기화
  B.dom.svg = document.getElementById('svg');
  B.dom.root = document.getElementById('root');
  B.dom.edgesLayer = document.getElementById('layer-edges');
  B.dom.nodesLayer = document.getElementById('layer-nodes');
  B.dom.detailPanel = document.getElementById('detail-panel');
  B.dom.canvasWrap = document.getElementById('canvas-wrap');
  B.dom.moduleView = document.getElementById('module-view');
  B.dom.tabBar = document.getElementById('tab-bar');
  B.dom.fileViewer = document.getElementById('file-viewer');
  B.dom.searchInput = document.getElementById('search-input');
  B.dom.searchResults = document.getElementById('search-results');
  B.dom.docView = document.getElementById('doc-view');
  B.dom.docNav = document.getElementById('doc-nav');
  B.dom.docContentInner = document.getElementById('doc-content-inner');
  B.dom.docSearchInput = document.getElementById('doc-search-input');

  // 이벤트 바인딩
  B.tabs.bindEvents();
  B.fileViewer.bindEvents();
  B.search.bindEvents();
  B.docView.bindEvents();
  B.zoomPan.bindEvents();

  // 검색 인덱스 빌드
  S.searchIndex = B.search.buildIndex();

  // 초기 렌더링
  B.flowchart.render();
  B.tabs.switchTab('doc');
  setTimeout(function() { B.zoomPan.fitToView(); }, 100);

  // =========================================================
  //  === Mobile Responsive ===
  // =========================================================

  // 1) Debounced window resize handler
  var mobileResizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(mobileResizeTimer);
    mobileResizeTimer = setTimeout(function() {
      if (S.activeTab === 'overview' && S.layoutCache) {
        B.zoomPan.fitToView();
      }
    }, 250);
  });

  // 2) Tab Bar auto-scroll (480px and below)
  B.dom.tabBar.addEventListener('click', function(e) {
    var btn = e.target.closest('.tab-btn');
    if (btn && window.innerWidth <= 480) {
      setTimeout(function() {
        B.dom.tabBar.scrollLeft = btn.offsetLeft - (B.dom.tabBar.clientWidth / 2) + (btn.clientWidth / 2);
      }, 100);
    }
  });

  // 3) Detail Panel swipe-down gesture (480px and below)
  B.dom.detailPanel.addEventListener('touchstart', function(e) {
    if (window.innerWidth <= 480) {
      S.detailSwipe.start = e.touches[0].clientY;
    }
  }, { passive: true });

  B.dom.detailPanel.addEventListener('touchmove', function(e) {
    if (window.innerWidth <= 480 && S.detailSwipe.start) {
      S.detailSwipe.distance = e.touches[0].clientY - S.detailSwipe.start;
      if (S.detailSwipe.distance > 50) {
        B.dom.detailPanel.style.opacity = Math.max(0.5, 1 - S.detailSwipe.distance / 200);
      }
    }
  }, { passive: true });

  B.dom.detailPanel.addEventListener('touchend', function() {
    if (S.detailSwipe.distance > 100) {
      B.detailPanel.hide();
    }
    B.dom.detailPanel.style.opacity = '';
    S.detailSwipe = { start: 0, distance: 0 };
  });

  // 4) Body overflow control (480px) - unified for detail panel + file viewer
  B.mobile.updateBodyOverflow = function() {
    if (window.innerWidth > 480) {
      document.body.style.overflow = '';
      return;
    }
    var detailOpen = !B.dom.detailPanel.classList.contains('hidden');
    var fvOpen = !B.dom.fileViewer.classList.contains('hidden');
    document.body.style.overflow = (detailOpen || fvOpen) ? 'hidden' : '';
  };

  var detailObserver = new MutationObserver(B.mobile.updateBodyOverflow);
  detailObserver.observe(B.dom.detailPanel, { attributes: true, attributeFilter: ['class'] });

  // 5) File Viewer scroll reset & body overflow control (480px and below)
  var fvObserver = new MutationObserver(function() {
    if (window.innerWidth <= 480 && !B.dom.fileViewer.classList.contains('hidden')) {
      var content = document.querySelector('.file-viewer-content');
      if (content) content.scrollTop = 0;
    }
    B.mobile.updateBodyOverflow();
  });
  fvObserver.observe(B.dom.fileViewer, { attributes: true, attributeFilter: ['class'] });

  // 6) Doc Sidebar slide-in toggle (480px and below)
  (function initDocSidebarToggle() {
    var docSidebar = document.querySelector('.doc-sidebar');
    var docViewEl = document.querySelector('.doc-view');
    if (!docSidebar || !docViewEl) return;

    var toggleBtn = document.createElement('button');
    toggleBtn.className = 'doc-sidebar-toggle';
    toggleBtn.textContent = '\u2261 \uBB38\uC11C \uBAA9\uB85D';
    toggleBtn.setAttribute('aria-label', '\uBB38\uC11C \uC0AC\uC774\uB4DC\uBC14 \uD1A0\uAE00');
    docViewEl.insertBefore(toggleBtn, docViewEl.firstChild);

    // Backdrop element
    var backdrop = document.createElement('div');
    backdrop.className = 'doc-sidebar-backdrop';
    docViewEl.appendChild(backdrop);

    function closeSidebar() {
      docSidebar.classList.remove('mobile-open');
      backdrop.classList.remove('visible');
    }
    function openSidebar() {
      docSidebar.classList.add('mobile-open');
      backdrop.classList.add('visible');
    }

    toggleBtn.addEventListener('click', function() {
      if (docSidebar.classList.contains('mobile-open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    backdrop.addEventListener('click', closeSidebar);

    // Close sidebar when a doc nav item is clicked on mobile
    docSidebar.addEventListener('click', function(e) {
      if (window.innerWidth <= 480 && e.target.closest('.doc-nav-item')) {
        closeSidebar();
      }
    });
  })();

})(window.BMAD);
