# JS 구조

빌드 도구 없이 `file://`로 실행하므로 ES Modules 미사용. `window.BMAD` 전역 네임스페이스 패턴.

## 네임스페이스 구조

`constants.js`에서 `window.BMAD` 초기화 → 각 파일이 IIFE로 함수 등록 → `app.js`에서 부트스트랩.

```
window.BMAD
├── state        → 상태 (activeTab, expanded, zoom, panX, panY 등)
├── dom          → DOM 참조 (app.js에서 초기화)
├── utils        → el(), esc(), hexToRgba(), makeText(), fileTypeIcon() 등
├── tabs         → switchTab(), bindEvents()
├── flowchart    → computeLayout(), render()
├── moduleView   → render(), handleClick()
├── fileViewer   → show(), hide(), renderContent(), bindEvents()
├── agentViewer  → show(), renderWorkflowList()
├── stepNav      → render(), renderBranchOptions()
├── search       → buildIndex(), doSearch(), bindEvents()
├── docView      → show(), renderNav(), showItem(), bindEvents()
├── detailPanel  → show(), hide(), highlightAgent(), highlightWorkflow()
├── zoomPan      → applyTransform(), zoomAt(), fitToView(), bindEvents()
└── mobile       → updateBodyOverflow()
```

## 파일 로딩 순서 (의존성 필수)

`constants.js` → `utils.js` → 나머지 모듈 (순서 무관) → `app.js` (진입점, 반드시 마지막)

## 작성 규칙

### 새 파일 템플릿

```js
// === 파일명.js ===
// 한줄 설명

(function(B) {
  'use strict';
  var S = B.state;

  B.모듈명.함수명 = function(param) {
    // ...
  };

  B.모듈명.bindEvents = function() {
    // 이벤트 리스너 등록
  };

})(window.BMAD);
```

### 새 모듈 추가 시 체크리스트

1. `constants.js`에 네임스페이스 슬롯 추가: `모듈명: {},`
2. `js/모듈명.js` 파일 생성 (위 템플릿 사용)
3. `index.html`에 `<script src="js/모듈명.js">` 추가 (`app.js` 앞에)
4. `bindEvents()`가 있으면 `app.js`에 `B.모듈명.bindEvents();` 호출 추가

### 문법 — ES5 엄수

```js
/* O — var 사용 */
var mod = BMAD_DATA.modules.find(function(m) { return m.id === modId; });

/* X — let/const/화살표 함수 사용 안 함 */
const mod = BMAD_DATA.modules.find(m => m.id === modId);
```

| 패턴 | 사용 | 미사용 |
|------|------|--------|
| 변수 선언 | `var` | `let`, `const` |
| 함수 | `function(x) {}` | `(x) => {}` |
| 문자열 | `'...' + val + '...'` | 템플릿 리터럴 `` `...${val}...` `` |
| 배열 순회 | `arr.forEach(function(item) { })` | `for...of` |
| 객체 순회 | `Object.entries(obj).forEach(function(entry) { })` | `for...in` (허용하지만 비권장) |

### HTML 문자열 조합

innerHTML로 렌더링. 반드시 `B.utils.esc()`로 이스케이프.

```js
/* O — 사용자 데이터는 esc() 필수 */
html += '<h2>' + B.utils.esc(mod.name) + '</h2>';
html += '<span style="background:' + color + '">' + count + '</span>';

/* X — esc() 없이 직접 삽입 (XSS 위험) */
html += '<h2>' + mod.name + '</h2>';
```

고정 문자열(HTML 태그, CSS 클래스명, 숫자)은 esc() 불필요. 데이터에서 온 문자열만 esc().

### SVG 요소 생성

DOM API 사용. innerHTML 아님.

```js
var rect = B.utils.el('rect', { x: 0, y: 0, width: 100, height: 50, rx: 12 });
var text = B.utils.el('text', { x: 50, y: 25, 'text-anchor': 'middle' });
text.textContent = B.utils.esc(label);
group.appendChild(rect);
group.appendChild(text);
```

### DOM 참조

`B.dom.요소명` 사용. `document.getElementById` 직접 호출 지양.

```js
/* O */ B.dom.moduleView.classList.add('hidden');
/* △ — B.dom에 없는 경우만 허용 */ document.getElementById('btn-fit').style.display = 'none';
```

새로 자주 쓰는 DOM 요소가 있으면 `app.js`의 DOM 초기화 블록에 `B.dom.xxx = document.getElementById('xxx');` 추가.

### 이벤트 바인딩

각 모듈의 `bindEvents()` 함수에서 등록. `app.js`에서 일괄 호출.

```js
// module-view.js 등 — 이벤트 위임 패턴 사용
B.moduleView.bindEvents = function() {
  B.dom.moduleView.addEventListener('click', function(e) {
    var card = e.target.closest('.agent-card');
    if (card) { /* ... */ }
  });
};
```

### 뷰 표시/숨김

`hidden` 클래스 토글. CSS에서 `.hidden { display: none; }` 처리.

```js
B.dom.moduleView.classList.add('hidden');    // 숨김
B.dom.moduleView.classList.remove('hidden'); // 표시
```

## 탭 전환 흐름

`B.tabs.switchTab(tabId)` 호출 시:

```
switchTab(tabId)
├── S.activeTab = tabId
├── B.fileViewer.hide()                    ← 파일 뷰어 닫기
├── 탭 버튼 active 상태 + borderColor 업데이트
│
├── tabId === 'doc'
│   ├── canvas, module-view 숨김
│   ├── doc-view 표시
│   ├── B.detailPanel.hide()
│   └── B.docView.show()                  ← 최초 1회만 renderNav() + showItem()
│
├── tabId === 'overview'
│   ├── canvas 표시, module-view/doc-view 숨김
│   └── Fit/Collapse 버튼 표시
│
└── tabId === 모듈ID (core/bmb/bmm/cis/tea)
    ├── module-view 표시, canvas/doc-view 숨김
    ├── B.detailPanel.hide()
    └── B.moduleView.render(tabId)         ← 매번 innerHTML 재렌더링
```

## 파일 뷰어 열기 흐름

```
사용자 클릭 (Module View 내 파일)
└── B.fileViewer.show(wfId, filePath, modColor)
    ├── 파일 데이터 검색 (BMAD_DATA에서 wfId → workflow → files 재귀 탐색)
    ├── 파일 타입별 렌더링
    │   ├── .md  → parseMd() (자체 마크다운 파서)
    │   ├── .yaml → highlightYaml()
    │   ├── .xml → highlightXml()
    │   ├── .csv → csvToTable()
    │   └── .groovy → highlightGroovy()
    ├── Step Navigation 렌더링 (스텝 파일인 경우)
    └── Workflow Step List 렌더링
```
