# BMAD Flowchart 프로젝트 구조 리팩토링 계획

## 현재 상태 분석

### 문제점

| 파일 | 줄 수 | 문제 |
|------|-------|------|
| `app.js` | 2,348줄 | 모든 로직이 단일 IIFE에 집중. 70개+ 함수가 한 파일에 혼재 |
| `styles.css` | 1,804줄 | 15개+ 컴포넌트 스타일과 4개 미디어쿼리가 단일 파일 |
| `flowchart-data.js` | 12,543줄 | 553KB 단일 데이터 파일. 수정/관리 어려움 |
| `doc-data.js` | 1,068줄 | HTML 콘텐츠가 JS 문자열 리터럴로 하드코딩 |
| 기획 문서 3개 | - | 프로젝트 루트에 산재 |

### 현재 구조 (플랫)

```
bmad-flowchart/
├── index.html
├── app.js              ← 2,348줄 (모든 로직)
├── styles.css          ← 1,804줄 (모든 스타일)
├── flowchart-data.js   ← 12,543줄 (모든 데이터)
├── doc-data.js         ← 1,068줄
├── update_bmm.py
├── DOC-TAB-PLAN.md
├── MOBILE-RESPONSIVE-PLAN.md
├── MOBILE_RESPONSIVE_SPEC.md
└── CLAUDE.md
```

---

## 목표 구조

```
bmad-flowchart/
├── index.html
├── CLAUDE.md
│
├── css/
│   ├── variables.css         ← CSS 변수, 리셋
│   ├── layout.css            ← Header, Tab Bar, Canvas 레이아웃
│   ├── components.css        ← Detail Panel, Zoom Controls, Search
│   ├── module-view.css       ← Module View, Agent Cards, Workflow List
│   ├── doc-view.css          ← Doc View (사이드바, 콘텐츠)
│   ├── file-viewer.css       ← File Viewer, Step Navigation
│   └── responsive.css        ← 모든 미디어쿼리 통합
│
├── js/
│   ├── app.js                ← 진입점 (초기화, 이벤트 바인딩)
│   ├── constants.js          ← 상수, DOM 참조, 상태 변수
│   ├── utils.js              ← el(), esc(), hexToRgba() 등 유틸리티
│   ├── tab-controller.js     ← switchTab(), 탭 전환 로직
│   ├── module-view.js        ← renderModuleView(), Agent Card, Workflow List
│   ├── flowchart.js          ← computeLayout(), render(), SVG 렌더링
│   ├── file-viewer.js        ← showFileViewer(), 파일 콘텐츠 렌더링, 파서
│   ├── agent-viewer.js       ← showAgentViewer(), 에이전트 상세 뷰
│   ├── step-nav.js           ← renderStepNavigation(), 브랜치 네비게이션
│   ├── search.js             ← buildSearchIndex(), doSearch(), 검색 UI
│   ├── doc-view.js           ← showDocView(), 문서 네비게이션, 렌더링
│   ├── detail-panel.js       ← showDetail(), hideDetail(), 하이라이트
│   └── zoom-pan.js           ← zoom/pan 상태, 이벤트, fitToView()
│
├── data/
│   ├── modules/
│   │   ├── core.js           ← CORE 모듈 데이터
│   │   ├── bmb.js            ← BMB 모듈 데이터
│   │   ├── bmm.js            ← BMM 모듈 데이터 (가장 큰 모듈)
│   │   ├── cis.js            ← CIS 모듈 데이터
│   │   └── tea.js            ← TEA 모듈 데이터
│   ├── data-loader.js        ← 모듈 데이터를 BMAD_DATA로 조합
│   └── doc-data.js           ← DOC_DATA (유지 또는 추후 분리)
│
└── scripts/
    └── update_bmm.py         ← 유틸리티 스크립트

# 상위 디렉토리 (bmad-study/)
bmad-study/
├── bmad-flowchart/           ← 앱 코드만 보관
├── docs/                     ← 개발 산출물 (앱 코드와 분리)
│   ├── plans/                ← 기획/계획 문서
│   │   ├── DOC-TAB-PLAN.md
│   │   ├── MOBILE-RESPONSIVE-PLAN.md
│   │   ├── MOBILE_RESPONSIVE_SPEC.md
│   │   └── RESTRUCTURE-PLAN.md
│   └── specs/                ← 사양/명세 문서 (추후 생성 시)
└── ...
```

---

## 단계별 실행 계획

### Phase 1: 디렉토리 생성 및 문서 이동 (안전, 비파괴적)

**작업 내용:**
1. `bmad-flowchart/` 하위에 `css/`, `js/`, `data/`, `data/modules/`, `scripts/` 디렉토리 생성
2. 상위에 `bmad-study/docs/plans/` 디렉토리 생성
3. 기획/계획 문서를 `bmad-study/docs/plans/`로 이동
   - `DOC-TAB-PLAN.md`, `MOBILE-RESPONSIVE-PLAN.md`, `MOBILE_RESPONSIVE_SPEC.md`, `RESTRUCTURE-PLAN.md`
4. `update_bmm.py`를 `scripts/`로 이동

**위험도:** 낮음 — 기능 코드에 영향 없음

---

### Phase 2: CSS 분리

**작업 내용:**

| 파일 | 원본 줄 범위 | 내용 |
|------|-------------|------|
| `css/variables.css` | 1~28행 | `:root` 변수, 리셋 |
| `css/layout.css` | 30~155행 | Header, Search, Tab Bar, Canvas |
| `css/components.css` | 156~354행 | Zoom Controls, SVG Nodes, Detail Panel |
| `css/module-view.css` | 355~558행 | Module View, Agent Cards, Workflow List |
| `css/file-viewer.css` | 559~981행 | File Viewer, Step Nav, Workflow Step List |
| `css/doc-view.css` | 982~1393행 | Content Links, Agent Links, Doc View, 애니메이션 |
| `css/responsive.css` | 1395~1804행 | 전체 미디어쿼리 |

**index.html 변경:**
```html
<!-- 기존 -->
<link rel="stylesheet" href="styles.css">

<!-- 변경 -->
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/module-view.css">
<link rel="stylesheet" href="css/file-viewer.css">
<link rel="stylesheet" href="css/doc-view.css">
<link rel="stylesheet" href="css/responsive.css">
```

**위험도:** 낮음 — CSS 순서만 유지하면 동작 동일

---

### Phase 3: JS 모듈 분리

**핵심 전략: 전역 네임스페이스 패턴**

빌드 도구 없이 모듈을 분리하므로, `window.BMAD` 네임스페이스 객체를 사용한다.

```js
// constants.js — 가장 먼저 로드
window.BMAD = {
  // 상수
  MOD_W: 240, MOD_H: 72,
  // ...
  // 상태
  state: { expanded: {}, zoom: 1, panX: 0, panY: 0, activeTab: 'doc' },
  // DOM 참조 (DOMContentLoaded 후 초기화)
  dom: {},
  // 모듈별 함수 등록용
  utils: {},
  tabs: {},
  flowchart: {},
  // ...
};
```

```js
// utils.js
(function(B) {
  B.utils.el = function(tag, attrs) { ... };
  B.utils.esc = function(s) { ... };
})(window.BMAD);
```

```js
// app.js — 마지막에 로드, 초기화 및 이벤트 바인딩
(function(B) {
  B.dom.svg = document.getElementById('svg');
  // ... 이벤트 리스너 등록
  // ... 초기 렌더링
})(window.BMAD);
```

**함수 → 파일 매핑:**

| 파일 | 함수들 |
|------|--------|
| `constants.js` | 상수, 상태, CMD_ALIAS |
| `utils.js` | `el()`, `esc()`, `hexToRgba()`, `makeText()`, `countFiles()`, `countFilesDeep()`, `fileTypeIcon()`, `fileTypeIconText()`, `getIcon()` |
| `tab-controller.js` | `switchTab()`, 탭 이벤트 |
| `module-view.js` | `renderModuleView()`, `renderAgentCard()`, `renderWorkflowItem()`, `handleModuleViewClick()`, `renderFileTree()` |
| `flowchart.js` | `computeLayout()`, `placeChildren()`, `render()` |
| `file-viewer.js` | `showFileViewer()`, `hideFileViewer()`, `renderFileViewerContent()`, `parseMd()`, `parseMdTable()`, `highlightYaml()`, `highlightXml()`, `highlightGroovy()`, `csvToTable()`, `getFileContent()`, `resolveContentLinks()` |
| `agent-viewer.js` | `showAgentViewer()`, `renderAgentWorkflowList()`, `resolveAgentLinks()` |
| `step-nav.js` | `renderStepNavigation()`, `renderStepItemHtml()`, `renderBranchOptions()`, `renderWorkflowStepList()`, `getWorkflowStepList()`, `getWorkflowAllFiles()`, `getWorkflowStepGroups()`, `extractStepNumber()`, `findInGroups()`, `getGroupPills()` |
| `search.js` | `buildSearchIndex()`, `doSearch()`, `highlightMatch()`, `navigateToItem()`, `updateSelectedUI()` |
| `doc-view.js` | `showDocView()`, `renderDocNav()`, `showDocItem()`, `showGlossaryPage()`, `findDocItem()` |
| `detail-panel.js` | `showDetail()`, `hideDetail()`, `clearHighlight()`, `highlightAgent()`, `highlightWorkflow()` |
| `zoom-pan.js` | `applyTransform()`, `zoomAt()`, `fitToView()`, `updateBodyOverflow()`, 마우스/터치 이벤트 |
| `app.js` | DOM 초기화, 이벤트 바인딩, `switchTab('doc')` 호출 |

**index.html 스크립트 순서:**
```html
<script src="data/modules/core.js"></script>
<script src="data/modules/bmb.js"></script>
<script src="data/modules/bmm.js"></script>
<script src="data/modules/cis.js"></script>
<script src="data/modules/tea.js"></script>
<script src="data/data-loader.js"></script>
<script src="data/doc-data.js"></script>

<script src="js/constants.js"></script>
<script src="js/utils.js"></script>
<script src="js/tab-controller.js"></script>
<script src="js/module-view.js"></script>
<script src="js/flowchart.js"></script>
<script src="js/file-viewer.js"></script>
<script src="js/agent-viewer.js"></script>
<script src="js/step-nav.js"></script>
<script src="js/search.js"></script>
<script src="js/doc-view.js"></script>
<script src="js/detail-panel.js"></script>
<script src="js/zoom-pan.js"></script>
<script src="js/app.js"></script>
```

**위험도:** 중간 — 함수 간 의존성 해결 필요. IIFE 스코프 변수를 네임스페이스로 전환 필수

---

### Phase 4: 데이터 파일 분리

**작업 내용:**

`flowchart-data.js`의 `BMAD_DATA.modules` 배열을 5개 파일로 분리:

```js
// data/modules/core.js
window.BMAD_MODULES = window.BMAD_MODULES || [];
window.BMAD_MODULES.push({
  id: 'core',
  name: 'BMAD Core',
  // ...
});
```

```js
// data/data-loader.js
const BMAD_DATA = {
  modules: window.BMAD_MODULES
};
```

**위험도:** 낮음 — 데이터 구조는 동일하게 유지

---

## 실행 순서 요약

| 순서 | Phase | 예상 작업량 | 의존성 |
|------|-------|-----------|--------|
| 1 | Phase 1: 디렉토리 + 문서 이동 | 소 | 없음 |
| 2 | Phase 4: 데이터 분리 | 소~중 | 없음 |
| 3 | Phase 2: CSS 분리 | 소 | 없음 |
| 4 | Phase 3: JS 분리 | 대 | Phase 1,2,4 완료 후 |

> Phase 4를 Phase 3보다 먼저 하는 이유: 데이터 파일은 독립적이라 안전하게 분리 가능하고, JS 분리 시 데이터 로딩 패턴이 이미 확정되어 있어야 작업이 수월함.

---

## 테스트 계획

각 Phase 완료 후 아래 체크리스트를 브라우저에서 수동 검증한다.
리팩토링 전 원본 상태를 기준(baseline)으로 비교한다.

### 사전 준비: Baseline 스크린샷

리팩토링 시작 전, 아래 화면을 캡처하여 `docs/plans/baseline/` 에 저장한다.

1. Doc 탭 초기 화면
2. Overview 탭 플로우차트
3. CORE 모듈 탭
4. BMM 모듈 탭 (가장 큰 모듈)
5. 파일 뷰어 열린 상태
6. 검색 결과 드롭다운
7. 480px 모바일 뷰 (DevTools)

---

### 디자인 검증 체크리스트 (모든 Phase 공통)

CSS 분리·JS 분리 후 시각적 결과물이 원본과 동일한지 확인하는 항목.
DevTools의 Computed 탭이나 직접 픽셀 비교로 확인한다.

#### 1. 전역 테마 & 컬러

- [ ] 배경색 `#0b0b1a` (body)
- [ ] 표면색 `#111128` (header, tab-bar, panels)
- [ ] 텍스트 컬러 3단계: `#e2e8f0` / `#94a3b8` / `#64748b`
- [ ] 모듈별 액센트 컬러 5종: CORE `#10b981` / BMB `#8b5cf6` / BMM `#f59e0b` / CIS `#06b6d4` / TEA `#ef4444`
- [ ] 보더 색상 `rgba(255,255,255,0.07)` — 경계선이 너무 진하거나 안 보이지 않는지

#### 2. Header (52px)

- [ ] 높이 52px 유지
- [ ] 로고 "BMAD" 글자 `#10b981` (core 색), 나머지 흰색
- [ ] 로고 폰트 `16px`, `font-weight: 600`, `letter-spacing: 0.5px`
- [ ] stat-dot 3개: 초록/보라/노랑 원형(7px), 우측 텍스트 `12px` `#94a3b8`
- [ ] 검색 input: `220px` 너비, `border-radius: 8px`, 배경 `#1a1a3a`
- [ ] 검색 focus 시 보더 밝아짐 (`rgba(255,255,255,0.2)`)
- [ ] Fit/Collapse 버튼: `border-radius: 6px`, hover 시 배경/텍스트 변화

#### 3. 검색 드롭다운

- [ ] 너비 `320px`, `border-radius: 10px`
- [ ] `box-shadow: 0 8px 32px rgba(0,0,0,0.5)` 그림자
- [ ] 검색 결과 항목: 좌측 dot(8px) + 텍스트, hover 시 배경 `#1a1a3a`
- [ ] 검색 하이라이트 `mark` 태그: `#10b981` 색상, 배경 없음
- [ ] 검색 메타 텍스트 `10px` `#64748b`

#### 4. Tab Bar (40px)

- [ ] 높이 `40px`, 배경 `#111128`, 하단 보더
- [ ] 탭 버튼: `12px`, `font-weight: 500`, 비활성 `#64748b`, 활성 `#e2e8f0`
- [ ] 활성 탭 하단 `2px solid` 보더 (해당 모듈 색상)
- [ ] 각 탭 dot: `6px` 원형, 해당 모듈 색상
- [ ] 탭 hover 시 텍스트 `#94a3b8`로 변화

#### 5. SVG 플로우차트 노드 (Overview)

- [ ] **모듈 카드**: `rx:12`, `stroke-width: 1.5`, hover 시 `brightness(1.3)`
- [ ] 모듈 라벨: `13px` `font-weight: 600` 흰색
- [ ] 모듈 서브텍스트: `10px` `#64748b`
- [ ] 모듈 배지: `rx:8` 둥근 사각, `9px` 텍스트
- [ ] **에이전트 노드**: `rx:8`, 배경 `#111128`, `stroke-width: 1`, hover `brightness(1.2)`
- [ ] 에이전트 라벨: `11px` `font-weight: 500`
- [ ] 에이전트 WF count 배지: `rx:6`, `8px` 텍스트
- [ ] **워크플로우 노드**: `rx:6`, 배경 `rgba(255,255,255,0.03)`, 보더 `0.5px`
- [ ] 워크플로우 라벨: `10px` `#94a3b8`
- [ ] **엣지 라인**: `stroke-width: 1.2`, 색상 `#334155`, `opacity: 0.5`
- [ ] 점선 엣지: `dasharray: 6 4`, 화살표 마커 표시
- [ ] 하이라이트 상태: 비선택 노드 `opacity: 0.35`, 선택 노드 보더 강화

#### 6. Detail Panel

- [ ] 우상단 `320px`, `border-radius: 14px`
- [ ] `backdrop-filter: blur(16px)` 글래스 효과
- [ ] 배경 `rgba(17,17,40,0.75)` 반투명
- [ ] fadeIn 애니메이션 (`translateY(-6px)` → `0`)
- [ ] dot `10px` 원형, 제목 `16px` `font-weight: 600`
- [ ] 설명 `13px` `#94a3b8`, 줄 간격 `1.6`
- [ ] 태그: `border-radius: 6px`, `11px`, 배경 `rgba(255,255,255,0.06)`

#### 7. Zoom Controls

- [ ] 우하단 `absolute`, 세로 배치
- [ ] 버튼 `34px × 34px`, `border-radius: 8px`, 배경 `#111128`
- [ ] hover 시 배경 `#1a1a3a`
- [ ] 줌 퍼센트: `11px` `#64748b`
- [ ] 1:1 리셋 버튼: `11px`, 상단 `margin-top: 2px`

#### 8. Module View

- [ ] 패딩 `24px 32px 60px`, 배경 `#0b0b1a`
- [ ] 모듈 헤더: 좌측 컬러 바 `5px × 48px` `border-radius: 3px`
- [ ] 제목 `20px` `font-weight: 600`, 설명 `13px` `#94a3b8`
- [ ] 배지: `11px`, 배경 `#1a1a3a`, `border-radius: 6px`
- [ ] config 파일 경로: `11px` monospace 폰트 `#64748b`
- [ ] **에이전트 카드**: `border-radius: 10px`, 패딩 `16px`, 배경 `#111128`
- [ ] 카드 hover 시 보더 `rgba(255,255,255,0.15)` 밝아짐
- [ ] 카드 내 dot `8px`, 이름 `14px` `font-weight: 600`
- [ ] 카드 그리드: `minmax(320px, 1fr)`, 간격 `12px`
- [ ] **워크플로우 리스트**: `border-radius: 8px`, 배경 `#111128`
- [ ] 리스트 헤더: 좌측 액센트 바 `3px × 20px`
- [ ] 이름 `13px` `font-weight: 500`, 설명 `11px` `#64748b`
- [ ] 파일 카운트 배지: `10px`, `border-radius: 10px`, 배경 `#1a1a3a`
- [ ] 토글 아이콘: 열림 시 `rotate(180deg)` 전환

#### 9. File Tree

- [ ] 중첩 들여쓰기 `padding-left: 18px`
- [ ] 파일 타입별 컬러: md `#10b981` / yaml `#f59e0b` / xml `#06b6d4` / csv `#8b5cf6` / groovy `#ef4444`
- [ ] 아이콘 `11px`, 경로 monospace `11px`
- [ ] 설명 `10px` `#64748b`
- [ ] 토글 버튼 `14px × 14px`, hover 시 배경 변화

#### 10. File Viewer (420px 패널)

- [ ] 우측 고정 `420px`, 전체 높이, `box-shadow: -4px 0 24px rgba(0,0,0,0.4)`
- [ ] 슬라이드 애니메이션: `translateX(0)` ↔ `translateX(100%)`, `0.25s ease`
- [ ] 헤더: 닫기 `22px`, 아이콘 `18px`, 제목 `13px` `font-weight: 600`
- [ ] 파일 경로 `10px` monospace `#64748b`
- [ ] 타입 배지: MD 초록 / YAML 노랑 / XML 시안 / CSV 보라 / Groovy 빨강 (각 15% 투명도 배경)
- [ ] 요약 영역: `12px` `#94a3b8`, 하단 보더
- [ ] **마크다운 렌더링**: h1 `18px` / h2 `15px`(하단 보더) / h3 `13px` / h4 `12px`
- [ ] 인라인 코드: 배경 `#1a1a3a`, `border-radius: 3px`, 색상 `#e2b86b`
- [ ] 코드 블록: `border-radius: 6px`, 패딩 `12px`
- [ ] 인용구: 좌측 `3px` `#10b981` 보더
- [ ] **구문 하이라이팅**: keyword `#c678dd` / key `#e06c75` / value `#98c379` / tag `#e06c75` / attr `#d19a66` / comment `#5c6370` 이탤릭
- [ ] **CSV 테이블**: `thead` sticky, th 배경 `#111128`, hover 행 `rgba(255,255,255,0.03)`
- [ ] 열림 시 Module View에 `margin-right: 420px` 적용

#### 11. Step Navigation Bar

- [ ] 행 높이 `min-height: 40px`, 패딩 `8px 16px`
- [ ] 이전/다음 버튼: `border-radius: 6px`, `11px`, `max-width: 160px`
- [ ] 버튼 hover: 배경 `rgba(255,255,255,0.08)`, 보더 밝아짐
- [ ] 위치 표시 `11px` `#64748b`, `letter-spacing: 0.5px`
- [ ] dot 인디케이터: `6px` 원형, 활성 `#10b981`, 브랜치 `10px` `border-radius: 3px`
- [ ] 브랜치 옵션 버튼: hover 시 `rgba(16,185,129,0.08)` 배경, 보더 `rgba(16,185,129,0.3)`
- [ ] pill 태그: `border-radius: 12px`, 활성 `#10b981` 색상 + 초록 배경/보더

#### 12. Workflow Step List (File Viewer 내부)

- [ ] 상단 구분선 + `margin-top: 20px`
- [ ] 제목 좌측 `3px × 14px` 초록 바 장식
- [ ] 스텝 넘버: `20px × 20px` 원형, 스텝은 초록 배경/보더, 비스텝은 회색
- [ ] 스텝명 monospace `11px`, 용도 `10px` `#64748b`
- [ ] 브랜치 멤버 `padding-left: 28px`, 자식 `36px` 들여쓰기

#### 13. Doc View

- [ ] 사이드바 `300px` 고정, 배경 `#111128`, 우측 보더
- [ ] 검색 input: `border-radius: 8px`, `12px`
- [ ] 카테고리 헤더: `12px` `font-weight: 600` `#64748b`, uppercase
- [ ] 네비 아이템: `13px`, hover 배경 `#1a1a3a`, 활성 시 좌측 `#10b981` 보더
- [ ] 콘텐츠 영역: 패딩 `32px 40px`, `max-width: 800px`
- [ ] 콘텐츠 h3 `22px`, h4 `14px`, p `14px` `#94a3b8` `line-height: 1.7`
- [ ] 테이블: `border-radius: 8px`, th 배경 `#1a1a3a`, td 패딩 `10px 14px`
- [ ] 관련 문서 태그: `border-radius: 16px`, hover 시 배경/보더 변화
- [ ] 다이어그램 pre: monospace `12px`, 배경 `#1a1a3a`, `border-radius: 8px`

#### 14. 트랜지션 & 애니메이션

- [ ] 탭 전환 시 `border-color 0.15s` 부드러운 전환
- [ ] 노드 확장 시 `opacity 0.25s ease` 페이드인
- [ ] File Viewer 슬라이드 `transform 0.25s ease`
- [ ] Detail Panel fadeIn `0.2s ease` (위로 6px 슬라이드)
- [ ] 480px Detail Panel `slideUp 0.3s ease` (아래에서 올라옴)
- [ ] 토글 아이콘 `rotate 0.2s` 회전
- [ ] 480px Doc 사이드바 `translateX 0.3s ease` 슬라이드

#### 15. 반응형 디자인 비교 (DevTools 리사이즈)

각 브레이크포인트에서 Baseline 스크린샷과 비교.

**900px:**
- [ ] File Viewer 전체 너비 (`width: 100%`, `position: fixed`)
- [ ] 에이전트 카드 그리드 `minmax(240px, 1fr)`
- [ ] Doc 사이드바 `240px`
- [ ] 줌 버튼 `33px`

**768px:**
- [ ] Header stats 숨김 (`display: none`)
- [ ] 검색 input `150px`
- [ ] 탭 버튼 `11px`, `padding: 6px 12px`
- [ ] 탭 바 가로 스크롤, 스크롤바 숨김
- [ ] Detail Panel 중앙 정렬 `width: calc(100% - 32px)`
- [ ] Module View 패딩 `20px`
- [ ] 에이전트 카드 1열 (`grid-template-columns: 1fr`)
- [ ] Doc 콘텐츠 패딩 `24px 28px`, `max-width: 700px`

**480px:**
- [ ] 로고 `13px`, 검색 `120px`
- [ ] Fit/Collapse 버튼 `min-height/min-width: 44px` (터치 타겟)
- [ ] 탭 버튼 `10px`, `min-height: 44px`, dot `5px`
- [ ] 줌 버튼 `44px × 44px`
- [ ] Detail Panel: 하단 바텀시트, `border-radius: 16px 16px 0 0`, `max-height: 70%`, 그림자
- [ ] Module View 패딩 `16px 12px`, 헤더 세로 배치, 액센트 바 가로 `3px`
- [ ] 에이전트 카드 패딩 `12px`, 이름 `13px`, 역할 `11px`
- [ ] Doc 사이드바: `translateX(-100%)` 숨김, 토글 버튼 표시, backdrop `rgba(0,0,0,0.4)`
- [ ] Doc 사이드바 열림 시 `translateX(0)` 슬라이드
- [ ] File Viewer 전체 화면 (`100vw × 100vh`)
- [ ] Step Nav 버튼 `max-width: calc(50% - 3px)`, dots `5px`, pill `9px`

---

### Phase 1 테스트 (디렉토리 + 문서 이동)

이 Phase는 앱 코드를 건드리지 않으므로 간단 확인만 수행.

- [ ] `index.html`을 브라우저에서 열었을 때 기존과 동일하게 로드되는가
- [ ] 콘솔에 404 에러 없는가
- [ ] 이동된 문서 파일이 `docs/plans/`에 존재하는가

---

### Phase 2 테스트 (CSS 분리)

**콘솔 확인:**
- [ ] 모든 CSS 파일이 200 OK로 로드되는가 (Network 탭)
- [ ] 콘솔에 CSS 관련 경고/에러 없는가

**시각 비교 (Baseline 대조):**

| 항목 | 확인 내용 |
|------|----------|
| Header | 로고, 통계, 검색, 버튼 위치/색상 동일 |
| Tab Bar | 탭 버튼 간격, 활성 색상, dot 표시 동일 |
| Overview 탭 | SVG 노드 색상, 테두리, 그림자, 텍스트 동일 |
| Module View | 에이전트 카드 그리드, 배지, 워크플로우 리스트 동일 |
| Doc View | 사이드바 너비, 콘텐츠 패딩, 폰트 크기 동일 |
| File Viewer | 패널 너비(420px), 헤더, 코드 하이라이팅 동일 |
| Detail Panel | 위치, 애니메이션, 닫기 버튼 동일 |
| Zoom Controls | 우하단 위치, 버튼 크기 동일 |

**반응형 확인 (DevTools):**
- [ ] 900px — File Viewer 전체 너비
- [ ] 768px — Header stats 숨김, Agent Cards 1열
- [ ] 480px — Detail Panel 바텀시트, Doc 사이드바 토글

---

### Phase 3 테스트 (JS 모듈 분리) — 가장 중요

**콘솔 확인:**
- [ ] 모든 JS 파일이 200 OK로 로드되는가
- [ ] 콘솔에 `ReferenceError`, `TypeError` 없는가
- [ ] `BMAD_DATA.modules.length === 5` 확인
- [ ] `DOC_DATA.categories.length` 확인

**탭 전환 테스트:**

| 동작 | 확인 내용 |
|------|----------|
| 초기 로드 | Doc 탭이 기본 활성, doc-view 표시 |
| Overview 클릭 | SVG 플로우차트 렌더링, Fit/Collapse 버튼 표시 |
| CORE 클릭 | Module View에 1 Agent, 8 Workflows 표시 |
| BMB 클릭 | 3 Agents, 12 Workflows 표시 |
| BMM 클릭 | 9 Agents, 23 Workflows 표시 |
| CIS 클릭 | 6 Agents, 4 Workflows 표시 |
| TEA 클릭 | 1 Agent, 9 Workflows 표시 |
| Doc 클릭 | Doc 사이드바 + 콘텐츠 표시 |

**플로우차트 (Overview 탭):**
- [ ] 노드 클릭 → 확장/축소 동작
- [ ] 노드 클릭 → Detail Panel 표시
- [ ] Fit 버튼 → 전체 뷰 맞춤
- [ ] Collapse 버튼 → 모든 노드 축소
- [ ] 마우스 드래그 → 캔버스 팬
- [ ] 마우스 휠 → 줌 인/아웃
- [ ] 줌 레벨 퍼센트 표시 갱신

**Module View (각 모듈 탭):**
- [ ] 에이전트 카드 클릭 → 에이전트 뷰어 슬라이드인
- [ ] 에이전트 뷰어 내 워크플로우 링크 클릭 → 해당 워크플로우로 이동
- [ ] 워크플로우 행 클릭 → 파일 트리 토글
- [ ] 파일 트리 내 파일 클릭 → File Viewer 열림
- [ ] File Viewer 닫기 버튼 동작

**File Viewer:**
- [ ] `.md` 파일 — 마크다운 렌더링 (헤딩, 리스트, 테이블)
- [ ] `.yaml` 파일 — 구문 하이라이팅
- [ ] `.xml` 파일 — 구문 하이라이팅
- [ ] `.csv` 파일 — 테이블 렌더링
- [ ] Step Navigation — 이전/다음 스텝 이동
- [ ] Branch 선택지 — 분기 옵션 표시 및 클릭

**검색:**
- [ ] 검색어 입력 → 드롭다운에 Agent/Workflow 결과 표시
- [ ] 결과 클릭 → 해당 항목으로 이동 (탭 전환 포함)
- [ ] 검색 결과 하이라이팅 표시
- [ ] ESC 키 → 검색 닫기

**Doc View:**
- [ ] 사이드바 카테고리 펼침/접기
- [ ] 문서 항목 클릭 → 콘텐츠 영역에 표시
- [ ] 문서 내 관련 문서 링크 클릭 → 해당 문서로 이동
- [ ] 문서 검색 입력 → 필터링 동작
- [ ] 용어집 페이지 표시

---

### Phase 4 테스트 (데이터 파일 분리)

**데이터 무결성:**
- [ ] 콘솔에서 `BMAD_DATA.modules.length === 5` 확인
- [ ] 각 모듈의 `agents` 배열 길이 확인: CORE(1), BMB(3), BMM(9), CIS(6), TEA(1)
- [ ] 각 모듈의 `workflows` 배열 길이 확인: CORE(8), BMB(12), BMM(23), CIS(4), TEA(9)
- [ ] Header 통계 표시: "5 Modules", "20 Agents", "56 Workflows"

**기능 확인:**
- [ ] 모든 탭 전환 정상
- [ ] 검색 인덱스 정상 구축 (검색 결과 수 동일)
- [ ] 파일 뷰어에서 파일 내용 정상 표시

---

### 최종 통합 테스트

모든 Phase 완료 후 전체 기능을 한 번 더 확인.

- [ ] 위 Phase 2~4 테스트 전체 재실행
- [ ] 크롬, 파이어폭스에서 각각 확인
- [ ] 모바일 시뮬레이션 (480px) 전체 기능 확인
- [ ] 페이지 로드 시간이 리팩토링 전과 비슷한가 (Network 탭의 총 로드 시간)
- [ ] Baseline 스크린샷과 비교하여 시각적 차이 없는가

---

## 주의사항

1. **빌드 도구 미사용** — ES Modules(`import/export`)는 로컬 파일 실행(`file://`) 시 CORS 에러 발생. 전역 네임스페이스 패턴 유지
2. **기존 동작 보존** — 각 Phase 완료 후 브라우저 테스트로 기능 확인
3. **flowchart-data.js 원본 보존** — 분리 전 백업. BMM 모듈이 전체의 70%+ 차지
4. **styles.css 원본 보존** — CSS 분리 후에도 원본 파일은 git 히스토리로 추적 가능
5. **점진적 적용** — 한 번에 모든 Phase를 진행하지 말고, Phase별로 커밋 & 테스트
