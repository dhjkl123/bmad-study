# Mobile Responsive Media Query - Team Plan

## 개요

`bmad-flowchart` 프로젝트에 모바일 맞춤 미디어쿼리를 추가하기 위한 팀 구성 및 작업 계획서.

### 대상 파일

- `styles.css` — 메인 스타일시트 (1395줄)
- `index.html` — HTML 구조
- `app.js` — 인터랙션 로직

### 현재 반응형 상태

- `@media (max-width: 900px)` — File Viewer 전체 너비
- `@media (max-width: 600px)` — Header stats 숨김, Detail Panel 전체 너비, Agent Cards 1열, Tab 축소

---

## 팀 구성

| 팀원 | 역할 | 타입 | 담당 영역 |
|------|------|------|-----------|
| **analyst** | 탐색 & 설계 | Read-only (Explore) | 코드 분석, 브레이크포인트 설계, 컴포넌트별 변경 명세서 작성 |
| **css-dev** | CSS 개발자 | Full-capability | Header, Tab Bar, Canvas, Zoom Controls, Detail Panel 미디어쿼리 구현 |
| **view-dev** | View 개발자 | Full-capability | Module View, Doc View, File Viewer 미디어쿼리 구현 |
| **reviewer** | QA 리뷰어 | Read-only (Explore) | 최종 결과물 검수 및 이슈 리포트 |

---

## BMAD 스킬 활용 지침

### 핵심 원칙

> BMAD 스킬은 해당 스킬이 도움이 될 수 있는 **모든 상황**에서 적극적으로 사용한다.
> 아래 표는 최소 활용 시점이며, 필요하다고 판단되면 어떤 단계에서든 사용 가능한 BMAD 스킬을 자유롭게 활용할 것.

### 스킬 목록 및 용도

| 스킬 | 용도 |
|------|------|
| `/bmad-help` | 워크플로우 단계 안내, 막힐 때 방향 제시 |
| `/bmad-review-adversarial-general` | 결과물을 비판적으로 리뷰하여 허점/누락 도출 |
| `/bmad-editorial-review-structure` | 코드 구조의 중복/복잡성을 잡아내고 단순화 제안 |
| `/bmad-editorial-review-prose` | 주석/문서의 커뮤니케이션 품질 리뷰 |
| `/bmad-index-docs` | 문서 인덱스 생성/갱신 (필요 시) |
| `/bmad-shard-doc` | 큰 문서 분할 정리 (필요 시) |

### Phase별 스킬 활용 매핑

| Phase | 팀원 | 스킬 | 시점 |
|-------|------|------|------|
| 1. 분석 | analyst | `/bmad-help` | 작업 시작 전 워크플로우 방향 확인 |
| 2. 구현 | css-dev | `/bmad-help` | 구현 중 막힐 때 방향 확인 |
| 2. 구현 | view-dev | `/bmad-help` | 구현 중 막힐 때 방향 확인 |
| 3. 리뷰 | reviewer | `/bmad-review-adversarial-general` | 전체 구현 결과의 허점/누락 비판적 리뷰 |
| 3. 리뷰 | reviewer | `/bmad-editorial-review-structure` | CSS 구조 중복/복잡성/개선점 점검 |
| 3. 리뷰 | reviewer | `/bmad-editorial-review-prose` | 주석 및 코드 내 텍스트 품질 리뷰 |
| 4. 수정 | css-dev / view-dev | `/bmad-help` | 피드백 반영 시 방향 확인 |

---

## 작업 흐름

### Phase 1: 분석

**담당:** analyst

1. `/bmad-help`로 워크플로우 방향 확인
2. `styles.css`, `index.html`, `app.js` 분석
3. 모바일 브레이크포인트 전략 수립 (예: 480px, 768px)
4. 컴포넌트별 변경 명세서 작성
   - Header: 로고, 검색, 통계, 버튼 레이아웃
   - Tab Bar: 탭 스크롤/축소 전략
   - Canvas: SVG 뷰포트, 줌 컨트롤 위치
   - Detail Panel: 모바일 전체 화면 전환
   - Module View: 에이전트 카드 그리드, 워크플로우 리스트
   - Doc View: 사이드바(300px) → 모바일 처리 방안
   - File Viewer: 420px 패널 → 모바일 전체 화면

### Phase 2: 구현 (병렬)

**css-dev 담당:**

- Header 영역 미디어쿼리
  - 로고 + 검색 + 버튼 모바일 배치
  - 통계 숨김/축소
- Tab Bar 영역 미디어쿼리
  - 가로 스크롤 or 축소 처리
- Canvas 영역 미디어쿼리
  - 줌 컨트롤 위치/크기 조정
  - Detail Panel 모바일 레이아웃

**view-dev 담당:**

- Module View 미디어쿼리
  - 에이전트 카드 1열 전환
  - 워크플로우 리스트 패딩/여백 조정
  - 파일 트리 가독성 확보
- Doc View 미디어쿼리
  - 사이드바 토글/오버레이 전환
  - 콘텐츠 영역 패딩 조정
- File Viewer 미디어쿼리
  - 전체 화면 전환
  - Step Navigation 모바일 최적화

### Phase 3: 리뷰

**담당:** reviewer

1. `/bmad-review-adversarial-general` — 전체 구현 비판적 리뷰
   - 누락된 컴포넌트 확인
   - 브레이크포인트 간 레이아웃 깨짐 확인
   - 터치 타겟 크기 (최소 44px) 검증
   - 스크롤/오버플로우 이슈 점검
2. `/bmad-editorial-review-structure` — CSS 구조 점검
   - 미디어쿼리 중복 제거
   - 선언 순서 및 그룹핑 일관성
   - 불필요한 `!important` 사용 여부
3. `/bmad-editorial-review-prose` — 주석/텍스트 리뷰
   - 미디어쿼리 섹션 주석 명확성
4. 발견된 이슈를 태스크로 등록

### Phase 4: 수정

**담당:** css-dev / view-dev

- reviewer가 등록한 이슈 태스크 처리
- 막히면 `/bmad-help`로 방향 확인
- 수정 완료 후 최종 확인

---

## 주요 컴포넌트 목록

| 컴포넌트 | CSS 클래스 | 현재 너비/특성 |
|----------|-----------|---------------|
| Header | `.header` | flex, 고정 52px 높이 |
| Search | `.search-wrap`, `.search-input` | 220px input, 320px 결과 드롭다운 |
| Tab Bar | `.tab-bar`, `.tab-btn` | flex, 40px 높이 |
| Canvas | `.canvas-wrap`, `#svg` | 100% 너비, calc 높이 |
| Zoom Controls | `.zoom-controls` | 우하단 absolute, 34px 버튼 |
| Detail Panel | `.detail-panel` | 우상단 320px, absolute |
| Module View | `.module-view` | padding 24px 32px |
| Agent Cards | `.agent-cards` | grid, minmax(320px, 1fr) |
| Workflow List | `.wf-list`, `.wf-list-item` | flex column |
| Doc Sidebar | `.doc-sidebar` | 300px 고정 |
| Doc Content | `.doc-content` | flex: 1, padding 32px 40px |
| File Viewer | `.file-viewer` | fixed, 420px 우측 패널 |
| Step Nav | `.fv-step-nav` | flex column, 내부 버튼/dots |
