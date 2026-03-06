# BMAD Flowchart 모바일 반응형 미디어쿼리 명세서

## 1. 분석 개요

### 현재 구조
- **총 줄 수**: HTML 105줄, CSS 1395줄, JS 2229줄
- **기존 미디어쿼리**: `@media (max-width: 900px)`, `@media (max-width: 600px)`
- **터치 이벤트**: 이미 구현됨 (dragStart, touchMove, pinch zoom)
- **반응형 고려사항**: 파일 뷰어 420px, 문서 사이드바 300px 등 고정 너비 요소들

### 제안하는 브레이크포인트
1. **480px** - 스마트폰(세로)
2. **768px** - 태블릿(세로) / 현재 600px 통합
3. **900px** - 기존값 유지 (태블릿 가로)
4. **1200px** - 데스크톱 소형

---

## 2. 주요 컴포넌트별 모바일 명세

### 2.1 Header (.header)

#### 현재 상태
- 높이: `52px` (--header-h)
- 내용: 로고(16px), 통계(12px), 검색(220px), 버튼(2개)
- 레이아웃: flex row, space-between

#### 모바일 480px 이하
```css
@media (max-width: 480px) {
  .header {
    padding: 0 12px;  /* 20px → 12px */
    flex-wrap: wrap;   /* 또는 2줄 레이아웃 */
    height: auto;
    min-height: 52px;
  }

  .logo {
    font-size: 13px;   /* 16px → 13px */
    flex: 1;
  }

  .header-stats {
    display: none;     /* 이미 600px에서 숨김 */
  }

  .search-wrap {
    order: 3;
    width: 100%;       /* full width */
    margin-top: 8px;
  }

  .search-input {
    width: 100%;       /* 220px → 100% */
    padding: 6px 10px; /* 축소 */
    font-size: 12px;   /* 12px 유지 */
  }

  .header-actions {
    gap: 4px;          /* 8px → 4px */
  }

  .btn {
    padding: 4px 8px;  /* 5px 12px → 4px 8px */
    font-size: 11px;   /* 12px → 11px */
  }
}
```

#### 모바일 768px 이하 (태블릿 세로)
```css
@media (max-width: 768px) {
  .header {
    flex-wrap: nowrap;  /* 복원 */
    height: 52px;
  }

  .header-stats {
    display: none;      /* 계속 숨김 */
  }

  .search-input {
    width: 150px;       /* 220px → 150px */
    font-size: 12px;
  }

  .logo {
    font-size: 15px;    /* 16px → 15px */
  }
}
```

---

### 2.2 Tab Bar (.tab-bar, .tab-btn)

#### 현재 상태
- 높이: `40px` (--tab-h)
- 7개 탭: Overview, CORE, BMB, BMM, CIS, TEA, DOC
- 버튼 패딩: `6px 16px`, 글자: `12px`

#### 모바일 480px 이하
```css
@media (max-width: 480px) {
  .tab-bar {
    padding: 0 8px;          /* 0 20px → 0 8px */
    gap: 1px;                /* 2px → 1px */
    overflow-x: auto;        /* 스크롤 활성화 */
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
  }

  .tab-btn {
    padding: 6px 8px;        /* 6px 16px → 6px 8px */
    font-size: 10px;         /* 12px → 10px */
    white-space: nowrap;     /* 기존값 유지 */
    flex-shrink: 0;          /* 축소 방지 */
  }

  .tab-dot {
    width: 5px;              /* 6px → 5px */
    height: 5px;
  }
}
```

#### 모바일 768px 이하
```css
@media (max-width: 768px) {
  .tab-bar {
    padding: 0 12px;         /* 0 20px → 0 12px */
    gap: 2px;                /* 1px → 2px */
    overflow-x: auto;        /* 계속 스크롤 */
  }

  .tab-btn {
    padding: 6px 12px;       /* 6px 8px → 6px 12px */
    font-size: 11px;         /* 10px → 11px */
  }
}
```

**JavaScript 보강 (선택사항)**
```javascript
// Tab bar 자동 스크롤 (활성 탭 중앙 정렬)
tabBar.addEventListener('click', (e) => {
  const btn = e.target.closest('.tab-btn');
  if (btn && window.innerWidth <= 480) {
    setTimeout(() => {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, 0);
  }
});
```

---

### 2.3 Canvas (.canvas-wrap, #svg)

#### 현재 상태
- 높이: `calc(100vh - var(--header-h) - var(--tab-h))`
- SVG 뷰포트 처리: 기본 `width: 100%; height: 100%`
- 패닝/줌: 마우스(drag, wheel) + 터치(drag, pinch) 지원

#### 모바일 480px 이하
```css
@media (max-width: 480px) {
  .canvas-wrap {
    height: calc(100vh - var(--header-h) - var(--tab-h) - 4px);  /* 경계 1px */
  }

  #svg {
    width: 100%;
    height: 100%;
    /* SVG 브라우저 렌더링 최적화 */
    shape-rendering: crispEdges;
  }
}
```

**JavaScript 보강 (필수)**
- 리사이징 시 SVG 재계산
```javascript
window.addEventListener('resize', debounce(() => {
  if (layoutCache) {
    fitToView();  /* 기존 함수 재사용 */
  }
}, 250));

function debounce(fn, ms) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}
```

---

### 2.4 Zoom Controls (.zoom-controls)

#### 현재 상태
- 위치: 우측 하단 `bottom: 20px; right: 20px;`
- 버튼: `34x34px`, 글자: `16px`
- 3개 버튼(+, 표시, -) + 1개(1:1)

#### 모바일 480px 이하
```css
@media (max-width: 480px) {
  .zoom-controls {
    bottom: 12px;            /* 20px → 12px */
    right: 12px;             /* 20px → 12px */
    gap: 2px;                /* 4px → 2px */
  }

  .zoom-btn {
    width: 32px;             /* 34px → 32px */
    height: 32px;
    font-size: 14px;         /* 16px → 14px */
  }

  .zoom-level {
    font-size: 10px;         /* 11px → 10px */
  }
}
```

#### 모바일 768px 이상 (태블릿)
```css
@media (min-width: 769px) and (max-width: 900px) {
  .zoom-controls {
    bottom: 16px;            /* 기본값에서 약간 축소 */
    right: 16px;
  }

  .zoom-btn {
    width: 33px;
    height: 33px;
  }
}
```

---

### 2.5 Detail Panel (.detail-panel)

#### 현재 상태
- 위치: 절대 우상단 `top: 16px; right: 16px;`
- 너비: `320px`, max-height: `calc(100% - 32px)`
- 배경: glassmorphism blur

#### 모바일 480px 이하
```css
@media (max-width: 480px) {
  .detail-panel {
    position: fixed;         /* absolute → fixed */
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;             /* 320px → 100% */
    max-height: 70%;         /* calc(100% - 32px) → 70% */
    border-radius: 16px 16px 0 0;  /* 상단만 둥글게 */
    padding: 20px;           /* 24px → 20px */
    overflow-y: auto;
    box-shadow: 0 -4px 24px rgba(0,0,0,0.6);  /* 상단 그림자 */
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  .detail-title {
    font-size: 15px;         /* 16px → 15px */
  }

  .detail-desc {
    font-size: 12px;         /* 13px → 12px */
  }
}
```

#### 모바일 768px 이하
```css
@media (max-width: 768px) {
  .detail-panel {
    width: calc(100% - 32px);  /* 320px → 100% - 32px */
    max-height: calc(100% - 32px);
    position: absolute;        /* fixed → absolute */
    bottom: auto;
    left: 16px;
    border-radius: 14px;       /* 완전 둥글게 */
  }
}
```

---

### 2.6 Module View (.module-view)

#### 현재 상태
- 높이: `calc(100vh - var(--header-h) - var(--tab-h))`
- 패딩: `24px 32px 60px`
- 에이전트 카드: `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))`
- 워크플로우 리스트: 일반 flex column

#### 모바일 480px 이하
```css
@media (max-width: 480px) {
  .module-view {
    padding: 16px 12px 60px;  /* 24px 32px 60px → 16px 12px 60px */
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .module-header {
    flex-direction: column;    /* row → column */
    align-items: flex-start;   /* center → flex-start */
    gap: 12px;                 /* 16px → 12px */
    margin-bottom: 20px;       /* 28px → 20px */
  }

  .module-header-accent {
    width: 100%;               /* 5px → 100% */
    height: 3px;               /* 48px → 3px */
  }

  .module-header-info h2 {
    font-size: 18px;           /* 20px → 18px */
  }

  .module-header-info p {
    font-size: 12px;           /* 13px → 12px */
  }

  .module-header-badge {
    margin-left: 0;            /* auto → 0 */
    flex-wrap: wrap;
    gap: 6px;                  /* 8px → 6px */
  }

  .module-header-badge .badge {
    font-size: 10px;           /* 11px → 10px */
    padding: 3px 8px;          /* 4px 10px → 3px 8px */
  }

  .agent-cards {
    grid-template-columns: 1fr;  /* repeat(auto-fill, minmax(320px, 1fr)) → 1fr */
    gap: 10px;                   /* 12px → 10px */
  }

  .agent-card {
    padding: 12px;             /* 16px → 12px */
  }

  .agent-card-name {
    font-size: 13px;           /* 14px → 13px */
  }

  .agent-card-fullname {
    font-size: 10px;           /* 11px → 10px */
  }

  .agent-card-role {
    font-size: 11px;           /* 12px → 11px */
  }

  .agent-card-desc {
    font-size: 10px;           /* 11px → 10px */
  }

  .wf-list {
    gap: 3px;                  /* 4px → 3px */
  }

  .wf-list-header {
    padding: 8px 10px;         /* 10px 14px → 8px 10px */
    font-size: 12px;           /* 13px → 12px */
  }

  .wf-list-name {
    font-size: 12px;           /* 13px → 12px */
  }

  .wf-list-desc {
    font-size: 10px;           /* 11px → 10px */
    flex: 1;                   /* flex: 2 → flex: 1 (모바일에서 공간 절약) */
  }

  .wf-list-toggle {
    font-size: 9px;            /* 10px → 9px */
  }
}
```

#### 모바일 768px 이하
```css
@media (max-width: 768px) {
  .module-view {
    padding: 20px 20px 60px;   /* 16px 12px → 20px 20px */
  }

  .module-header {
    flex-direction: row;       /* column → row */
    align-items: center;
  }

  .module-header-accent {
    width: 5px;                /* 100% → 5px */
    height: 36px;              /* 3px → 36px */
  }

  .agent-cards {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));  /* 1fr → minmax(240px, 1fr) */
  }

  .module-header-badge {
    margin-left: auto;
  }
}
```

**파일 뷰어 오픈 상태 (모바일)**
```css
@media (max-width: 900px) {
  .file-viewer {
    width: 100%;      /* 420px → 100% (기존) */
    position: fixed;  /* absolute → fixed */
    z-index: 200;     /* 200으로 상향 */
  }

  .module-view.viewer-open {
    margin-right: 0;  /* 420px → 0 (기존) */
    overflow: hidden; /* 추가: 스크롤 방지 */
  }
}
```

---

### 2.7 Doc View (.doc-view, .doc-sidebar, .doc-content)

#### 현재 상태
- Flex row, 높이: `calc(100vh - var(--header-h) - 40px)`
- 사이드바: 고정 `300px` 너비
- 컨텐츠: flex 1, overflow-y auto
- 검색: 12px 패딩

#### 모바일 480px 이하
```css
@media (max-width: 480px) {
  .doc-view {
    flex-direction: column;    /* row → column */
    height: auto;
  }

  .doc-sidebar {
    width: 100%;               /* 300px → 100% */
    min-width: none;           /* 300px → none */
    border-right: none;        /* 우측 보더 제거 */
    border-bottom: 1px solid var(--border);  /* 하단 보더 추가 */
    max-height: 40vh;          /* 최대 높이 40% */
    overflow-y: auto;
  }

  .doc-search-wrap {
    padding: 10px;             /* 12px → 10px */
  }

  .doc-search-input {
    padding: 6px 10px;         /* 8px 12px → 6px 10px */
    font-size: 12px;           /* 13px → 12px */
  }

  .doc-nav {
    padding: 6px 0;            /* 8px 0 → 6px 0 */
  }

  .doc-cat-header {
    padding: 6px 12px;         /* 8px 16px → 6px 12px */
    font-size: 11px;           /* 12px → 11px */
  }

  .doc-nav-item {
    padding: 5px 12px 5px 32px;  /* 6px 16px 6px 40px → 5px 12px 5px 32px */
    font-size: 12px;           /* 13px → 12px */
  }

  .doc-content {
    padding: 16px 12px;        /* 32px 40px → 16px 12px */
    flex: 1;
  }

  .doc-content-inner {
    max-width: 100%;           /* 800px → 100% */
  }

  .doc-content-inner h3 {
    font-size: 18px;           /* 20px → 18px */
  }

  .doc-content-inner h4 {
    font-size: 13px;           /* 15px → 13px */
  }

  .doc-content-inner p {
    font-size: 13px;           /* 14px → 13px */
  }
}
```

#### 모바일 768px 이하
```css
@media (max-width: 768px) {
  .doc-view {
    flex-direction: row;       /* column → row (태블릿 가로) */
  }

  .doc-sidebar {
    width: 240px;              /* 100% → 240px */
    max-height: none;          /* 제거 */
    border-right: 1px solid var(--border);
    border-bottom: none;
  }

  .doc-content {
    padding: 24px 28px;        /* 16px 12px → 24px 28px */
  }

  .doc-content-inner {
    max-width: 700px;          /* 100% → 700px */
  }
}
```

---

### 2.8 File Viewer (.file-viewer)

#### 현재 상태
- 위치: fixed, 우측 `right: 0`
- 너비: 고정 `420px`
- 높이: 전체 `100vh`
- 이동: `translateX(0)` / `translateX(100%)`

#### 모바일 480px 이하
```css
@media (max-width: 480px) {
  .file-viewer {
    width: 100%;               /* 420px → 100% */
    right: 0;
    left: 0;
    height: 100vh;
    z-index: 200;              /* 150 → 200 */
  }

  .file-viewer-header {
    padding: 12px 14px;        /* 14px 16px → 12px 14px */
    gap: 8px;                  /* 10px → 8px */
  }

  .file-viewer-close {
    font-size: 20px;           /* 22px → 20px */
    padding: 0 2px;            /* 0 4px → 0 2px */
  }

  .file-viewer-icon {
    font-size: 16px;           /* 18px → 16px */
  }

  .file-viewer-title {
    font-size: 12px;           /* 13px → 12px */
  }

  .file-viewer-path {
    font-size: 9px;            /* 10px → 9px */
  }

  .file-viewer-summary {
    padding: 8px 14px;         /* 10px 16px → 8px 14px */
    font-size: 11px;           /* 12px → 11px */
  }

  .file-viewer-content {
    padding: 12px;             /* 16px → 12px */
    font-size: 11px;           /* 12px → 11px */
    line-height: 1.5;          /* 1.6 → 1.5 */
  }

  /* 마크다운 렌더링 축소 */
  .fv-content-md h1 {
    font-size: 16px;           /* 18px → 16px */
  }

  .fv-content-md h2 {
    font-size: 13px;           /* 15px → 13px */
  }

  .fv-content-md h3 {
    font-size: 12px;           /* 13px → 12px */
  }

  .fv-content-md p {
    font-size: 11px;           /* 13px → 11px */
  }

  /* 테이블 스크롤 */
  .fv-table {
    font-size: 10px;           /* 11px → 10px */
  }

  .fv-table th, .fv-table td {
    padding: 4px 6px;          /* 8/6 → 4/6 */
  }
}
```

#### 모바일 768px 이상 (태블릿)
```css
@media (min-width: 769px) and (max-width: 900px) {
  .file-viewer {
    width: 100%;               /* 420px → 100% */
  }

  .file-viewer-content {
    padding: 14px;             /* 12px → 14px */
    font-size: 12px;           /* 11px → 12px */
  }
}
```

---

### 2.9 Step Navigation Bar (.fv-step-nav)

#### 현재 상태
- Flex column, 하단 보더
- `flex-shrink: 0`
- nav-row: `padding: 8px 16px`, `min-height: 40px`
- nav-btn, nav-branch-btn: flex inline

#### 모바일 480px 이하
```css
@media (max-width: 480px) {
  .fv-step-nav {
    display: flex;
    flex-direction: column;
  }

  .fv-nav-row {
    padding: 6px 12px;         /* 8px 16px → 6px 12px */
    min-height: 36px;          /* 40px → 36px */
    gap: 6px;                  /* 8px → 6px */
    flex-wrap: wrap;           /* 버튼이 여러 줄 */
  }

  .fv-nav-btn {
    padding: 3px 8px;          /* 4px 10px → 3px 8px */
    font-size: 10px;           /* 11px → 10px */
    max-width: calc(50% - 3px); /* 160px → 50% width */
    flex-shrink: 1;
  }

  .fv-nav-position {
    font-size: 10px;           /* 11px → 10px */
    flex-shrink: 0;
  }

  .fv-nav-center {
    order: 3;                  /* 줄 끝으로 이동 */
    width: 100%;
    padding: 0 12px;
    margin-top: 4px;
  }

  .fv-nav-dots {
    gap: 3px;                  /* 4px → 3px */
  }

  .fv-nav-dot {
    width: 5px;                /* 6px → 5px */
    height: 5px;
  }

  /* 분기 옵션 버튼 */
  .fv-nav-branch-options {
    padding: 0 12px 6px;       /* 0 16px 8px → 0 12px 6px */
    gap: 1px;                  /* 2px → 1px */
  }

  .fv-nav-branch-btn {
    padding: 4px 8px;          /* 5px 10px → 4px 8px */
    font-size: 10px;           /* 11px → 10px */
  }

  .fv-nav-branch-name {
    font-size: 10px;           /* 11px → 10px */
  }

  .fv-nav-branch-purpose {
    font-size: 9px;            /* 10px → 9px */
  }

  /* 약정 pills */
  .fv-nav-pills {
    padding: 3px 12px 6px;     /* 4px 16px 8px → 3px 12px 6px */
    gap: 3px;                  /* 4px → 3px */
  }

  .fv-nav-pills-label {
    font-size: 9px;            /* 10px → 9px */
  }

  .fv-nav-pill {
    padding: 1px 6px;          /* 2px 8px → 1px 6px */
    font-size: 9px;            /* 10px → 9px */
  }
}
```

#### 모바일 768px 이상
```css
@media (min-width: 769px) and (max-width: 900px) {
  .fv-nav-row {
    padding: 7px 14px;         /* 6px 12px → 7px 14px */
    min-height: 38px;          /* 36px → 38px */
  }

  .fv-nav-btn {
    max-width: 140px;          /* calc(50% - 3px) → 140px */
  }

  .fv-nav-branch-options {
    padding: 0 14px 7px;       /* 0 12px 6px → 0 14px 7px */
  }
}
```

---

## 3. JavaScript 모바일 관련 추가 구현

### 3.1 필수 구현 사항

#### 1) 윈도우 리사이징 감지
```javascript
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const isSmall = window.innerWidth <= 480;
    const isMedium = window.innerWidth <= 768;

    // UI 상태 업데이트 필요시 처리
    if (activeTab === 'overview') {
      fitToView();  // SVG 재계산
    }
  }, 250);
});
```

#### 2) Tab Bar 자동 스크롤 (480px 이하)
```javascript
const originalSwitchTab = switchTab;
switchTab = function(tabId) {
  originalSwitchTab.call(this, tabId);

  if (window.innerWidth <= 480) {
    const btn = tabBar.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (btn) {
      setTimeout(() => {
        tabBar.scrollLeft = btn.offsetLeft - (tabBar.clientWidth / 2) + (btn.clientWidth / 2);
      }, 100);
    }
  }
};
```

#### 3) 문서 사이드바 토글 (480px 이하)
```javascript
// 모바일에서는 사이드바를 슬라이드하거나 오버레이로 표시
if (window.innerWidth <= 480) {
  const docSidebar = document.querySelector('.doc-sidebar');
  const docContent = document.querySelector('.doc-content');

  // 사이드바 toggle 버튼 추가 (선택)
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'doc-sidebar-toggle';
  toggleBtn.innerHTML = '≡';
  toggleBtn.style.position = 'absolute';
  toggleBtn.style.top = '12px';
  toggleBtn.style.left = '12px';
  toggleBtn.style.zIndex = '201';
  toggleBtn.style.display = 'none';

  docSidebar.insertBefore(toggleBtn, docSidebar.firstChild);

  toggleBtn.addEventListener('click', () => {
    docSidebar.classList.toggle('mobile-open');
  });

  docContent.addEventListener('click', () => {
    docSidebar.classList.remove('mobile-open');
  });
}

// CSS 추가
`
@media (max-width: 480px) {
  .doc-sidebar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 240px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 150;
  }

  .doc-sidebar.mobile-open {
    transform: translateX(0);
  }
}
`
```

#### 4) Detail Panel 상향식 슬라이드 (480px 이하)
- CSS: 이미 @keyframes slideUp 정의됨
- JS 추가: 제스처 닫기 (스와이프 다운)

```javascript
let touchStartY = 0;
detailPanel.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

detailPanel.addEventListener('touchmove', (e) => {
  if (window.innerWidth > 480) return;
  const delta = e.touches[0].clientY - touchStartY;
  if (delta > 100) {  // 100px 이상 드래그
    hideDetail();
  }
}, { passive: true });
```

#### 5) File Viewer 최적화 (480px 이하)
```javascript
// 파일 뷰어 열기 시 스크롤 위치 초기화
const originalShowFileViewer = showFileViewer;
showFileViewer = function(fileData, wfId, isWorkflowFile) {
  originalShowFileViewer.call(this, fileData, wfId, isWorkflowFile);

  const content = document.querySelector('.file-viewer-content');
  if (content && window.innerWidth <= 480) {
    content.scrollTop = 0;
    // 모바일에서는 body 스크롤 방지
    document.body.style.overflow = 'hidden';
  }
};

document.getElementById('file-viewer-close').addEventListener('click', () => {
  document.body.style.overflow = '';
});
```

### 3.2 선택적 개선 사항

#### 1) 모바일 제스처 향상
```javascript
// Detail panel 스와이프 닫기 (향상된 버전)
let detailSwipe = { start: 0, distance: 0 };

detailPanel.addEventListener('touchstart', (e) => {
  if (window.innerWidth <= 480) {
    detailSwipe.start = e.touches[0].clientY;
  }
}, { passive: true });

detailPanel.addEventListener('touchmove', (e) => {
  if (window.innerWidth <= 480 && detailSwipe.start) {
    detailSwipe.distance = e.touches[0].clientY - detailSwipe.start;
    if (detailSwipe.distance > 50) {
      detailPanel.style.opacity = Math.max(0.5, 1 - detailSwipe.distance / 200);
    }
  }
}, { passive: true });

detailPanel.addEventListener('touchend', (e) => {
  if (detailSwipe.distance > 100) {
    hideDetail();
  }
  detailPanel.style.opacity = '';
  detailSwipe = { start: 0, distance: 0 };
});
```

#### 2) 접근성: 모바일 포커스 관리
```javascript
// 모바일에서 detail panel 열기 시 포커스 관리
const originalShowDetail = showDetail;
showDetail = function(type, data, mod) {
  originalShowDetail.call(this, type, data, mod);
  if (window.innerWidth <= 480) {
    detailPanel.setAttribute('role', 'dialog');
    detailPanel.setAttribute('aria-label', `${data.name} 상세 정보`);
    document.getElementById('detail-close').focus();
  }
};
```

#### 3) 무한 스크롤 콘텐츠 최적화
```javascript
// Module View에서 에이전트 카드 lazy load (필요시)
const observerOptions = {
  root: moduleView,
  rootMargin: '50px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 카드 렌더링 또는 이미지 로드 처리
      entry.target.classList.add('loaded');
    }
  });
}, observerOptions);

if (window.innerWidth <= 768) {
  document.querySelectorAll('.agent-card').forEach(card => {
    observer.observe(card);
  });
}
```

---

## 4. 기존 미디어쿼리와의 통합

### 기존 코드 (1395줄, 735-745줄)
```css
@media (max-width: 900px) {
  .file-viewer { width: 100%; }
  .module-view.viewer-open { margin-right: 0; }
}

@media (max-width: 600px) {
  .header-stats { display: none; }
  .detail-panel { width: calc(100% - 32px); }
  .agent-cards { grid-template-columns: 1fr; }
  .tab-btn { padding: 6px 10px; font-size: 11px; }
}
```

### 개선된 통합
```css
/* === Responsive Design === */

/* 타블릿 가로 (900px 이상 기본 스타일) */
/* No changes needed */

/* 타블릿 세로 / 소형 데스크톱 (768px ~ 900px) */
@media (max-width: 900px) {
  .file-viewer {
    width: 100%;
  }

  .module-view.viewer-open {
    margin-right: 0;
  }

  .doc-sidebar {
    width: 240px;
  }

  .agent-cards {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

/* 모바일 / 태블릿 세로 (600px ~ 768px) */
@media (max-width: 768px) {
  .header-stats {
    display: none;
  }

  .logo {
    font-size: 15px;
  }

  .search-input {
    width: 150px;
  }

  .tab-btn {
    padding: 6px 10px;
    font-size: 11px;
  }

  .detail-panel {
    width: calc(100% - 32px);
  }

  .agent-cards {
    grid-template-columns: 1fr;
  }

  .doc-sidebar {
    width: 240px;
  }

  .module-view {
    padding: 20px 20px 60px;
  }
}

/* 스마트폰 (480px 이하) */
@media (max-width: 480px) {
  .header {
    padding: 0 12px;
  }

  .logo {
    font-size: 13px;
  }

  .header-stats {
    display: none;
  }

  .search-input {
    width: 100%;
  }

  .tab-bar {
    padding: 0 8px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .tab-btn {
    padding: 6px 8px;
    font-size: 10px;
    flex-shrink: 0;
  }

  .detail-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-height: 70%;
    border-radius: 16px 16px 0 0;
  }

  .agent-cards {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .module-view {
    padding: 16px 12px 60px;
  }

  .file-viewer {
    width: 100%;
  }

  .doc-view {
    flex-direction: column;
  }

  .doc-sidebar {
    width: 100%;
    max-height: 40vh;
    border-right: none;
    border-bottom: 1px solid var(--border);
  }

  .doc-content {
    padding: 16px 12px;
  }
}
```

---

## 5. 우선순위 및 구현 순서

### Phase 2-A (상단 영역): 높은 우선순위
1. **Header** (.header, .logo, .search-input)
2. **Tab Bar** (.tab-bar, .tab-btn) - 스크롤 활성화
3. **Canvas** (#svg) - 리사이징 처리
4. **Zoom Controls** (.zoom-controls) - 크기/위치 축소
5. **Detail Panel** (.detail-panel) - 모바일 전체화면 슬라이드

### Phase 2-B (하단 영역): 중간 우선순위
1. **Module View** (.module-view, .agent-cards, .wf-list)
2. **Doc View** (.doc-view, .doc-sidebar, .doc-content) - 토글 구현
3. **File Viewer** (.file-viewer) - 풀스크린 처리

### 공통 구현
- **Step Nav** (.fv-step-nav) - 레이아웃 재정렬
- **JavaScript**: 리사이징 감지, 스크롤 처리, 토글 기능
- **테스트**: 480px, 768px, 900px 브레이크포인트 검증

---

## 6. 테스트 체크리스트

### 모바일 480px 이하
- [ ] 헤더 검색이 풀너비 (2줄 레이아웃 또는 1줄 축소)
- [ ] 탭 바가 수평 스크롤 가능
- [ ] 디테일 패널이 하단에서 슬라이드 업
- [ ] 모듈 뷰 에이전트 카드가 단일 컬럼
- [ ] 파일 뷰어가 전체 화면
- [ ] 문서 사이드바가 상단 또는 토글 방식

### 태블릿 768px 이하
- [ ] 헤더가 한 줄 (검색 150px)
- [ ] 탭 바가 스크롤 가능하지만 덜 좁음
- [ ] 문서 사이드바가 240px 너비
- [ ] 에이전트 카드가 240px 최소 너비 grid

### 태블릿/데스크톱 900px 이상
- [ ] 기존 스타일 유지
- [ ] 문서 사이드바가 300px

---

## 7. CSS 파일 조직 제안

### 현재 styles.css 구조 (1395줄)
1. 행 1-354: 기본 스타일, Header, Tab, Canvas
2. 행 355-714: Module View, Agent Cards, File Tree, File Viewer
3. 행 715-745: 기존 반응형 (2개 쿼리)
4. 행 746-1395: Step Nav, Doc View, Content 스타일

### 개선안
```css
/* === Responsive Design === */

/* 최하단에 모든 미디어쿼리를 집중화 */

/* 1) @media (max-width: 900px) - 통합 기존 + 신규 */
@media (max-width: 900px) {
  /* 기존 코드 유지 + 신규 추가 */
}

/* 2) @media (max-width: 768px) - 신규 추가 */
@media (max-width: 768px) {
  /* 타블릿 세로 스타일 */
}

/* 3) @media (max-width: 480px) - 신규 추가 */
@media (max-width: 480px) {
  /* 모바일 스타일 */
}
```

**파일 크기**: CSS는 현재 1395줄에서 약 1600~1700줄로 증가할 것으로 예상 (반응형 추가 약 300줄)

---

## 8. 성능 최적화 팁

1. **이미지/동영상**: 모바일에서는 원본 크기를 클라이언트 폭에 맞춤
2. **SVG 렌더링**: `shape-rendering: crispEdges;` 추가로 모바일 렌더링 최적화
3. **터치 반응성**: `passive: true` 리스너 사용으로 스크롤 성능 향상
4. **미디어쿼리 분기**: 모바일 전용 JS는 윈도우 크기 기반으로 조건부 로드

---

## 9. 호환성 주의사항

### 브라우저
- iOS Safari: `touch-action: none;` 미지원 일부 – `-webkit-` prefix 사용
- Android Chrome: 대부분 최신 미디어쿼리 지원
- IE11: 미디어쿼리 지원하나, flexbox 동작 차이 가능

### 미디어 쿼리 순서
```css
/* Best Practice */
@media (max-width: 480px) { ... }   /* 모바일 먼저 */
@media (max-width: 768px) { ... }
@media (max-width: 900px) { ... }
@media (min-width: 901px) { ... }   /* 데스크톱 */
```

---

## 10. 추가 리소스

### 참고 문서
- [MDN Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- [Apple HIG - Mobile Design](https://developer.apple.com/design/human-interface-guidelines/ios/overview/themes/)
- [Material Design - Responsive Layout](https://material.io/design/platform-guidance/android-bars.html)

### 브레이크포인트 기준
| 기기 | 너비 | 레이아웃 |
|------|------|---------|
| 스마트폰 | 320-480px | 단일 컬럼 |
| 태블릿 세로 | 481-768px | 1.5-2 컬럼 |
| 태블릿 가로 | 769-900px | 2-3 컬럼 |
| 데스크톱 | 901px+ | 3+ 컬럼 |

---

이 명세서는 **css-dev**와 **view-dev** 팀이 구현할 때 직접 참조할 수 있도록 구체적인 CSS 속성값과 JavaScript 코드를 포함하고 있습니다.

각 컴포넌트별로 명확한 변환 규칙을 제시하므로, 단계적 구현과 테스트가 용이할 것입니다.
