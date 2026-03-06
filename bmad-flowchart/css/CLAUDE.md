# CSS 구조

CSS 변수 기반 다크 테마. 파일 순서대로 `index.html`에서 로드 (순서 변경 시 스타일 깨짐 주의).

## 파일별 역할

| 파일 | 내용 |
|------|------|
| `variables.css` | `:root` CSS 변수, 리셋, body 기본 스타일 |
| `layout.css` | Header(52px), Search, Tab Bar(40px), Canvas 레이아웃 |
| `components.css` | Zoom Controls, SVG 노드 스타일, Detail Panel |
| `module-view.css` | Module View, Agent Cards 그리드, Workflow List, File Tree |
| `file-viewer.css` | File Viewer(420px 패널), Step Nav, Workflow Step List, 구문 하이라이팅 |
| `doc-view.css` | Doc View 사이드바(300px), 콘텐츠 영역, Content/Agent Links, 애니메이션 |
| `responsive.css` | 모든 미디어쿼리 통합 (900px / 768px / 480px) |

## 작성 규칙

### 색상

하드코딩 금지. 반드시 CSS 변수 사용.

```css
/* O */ background: var(--surface);
/* O */ color: var(--text2);
/* O */ border: 1px solid var(--border);
/* X */ background: #111128;
/* X */ color: #94a3b8;
```

모듈 고유 색상이 필요하면 JS에서 인라인 `style`로 주입 (데이터 기반 동적 색상).

### 네이밍

BEM 아님. 컴포넌트-요소 패턴의 케밥 케이스.

```
.{컴포넌트}-{요소}       → .module-header-info, .agent-card-role
.{컴포넌트}              → .file-viewer, .detail-panel
.{상태}                  → .hidden, .active, .open, .viewer-open
```

실제 예시:
```
.module-header           컴포넌트
.module-header-accent    컴포넌트-요소
.module-header-info      컴포넌트-요소
.module-view.hidden      컴포넌트.상태
.module-view.viewer-open 컴포넌트.상태
```

### 포매팅

```css
/* 파일/영역 구분 — 반드시 이 형식 */
/* === 섹션명 === */

/* 속성이 3개 이하인 단순 선언은 한 줄 가능 */
.logo-accent { color: var(--core); }
.module-view.hidden { display: none; }

/* 속성이 많으면 블록으로 */
.search-input {
  width: 220px;
  padding: 6px 12px;
  background: var(--elevated);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-size: 12px;
  outline: none;
  transition: border-color 0.15s;
}
```

### 트랜지션

개별 속성 지정 (`all` 사용 지양). 기본 duration은 `0.15s~0.25s`.

```css
/* O */ transition: border-color 0.15s;
/* O */ transition: transform 0.25s ease;
/* X */ transition: all 0.3s;
```

### 미디어쿼리

`responsive.css`에만 작성. 개별 CSS 파일에 `@media` 넣지 않음.
큰 브레이크포인트 → 작은 브레이크포인트 순서 (cascading override).

```css
/* 900px → 768px → 480px 순서 */
@media (max-width: 900px) { ... }
@media (max-width: 768px) { ... }
@media (max-width: 480px) { ... }
```

### 새 컴포넌트 추가 시

해당 뷰의 CSS 파일에 작성:
- Overview 탭 관련 → `components.css`
- Module View 관련 → `module-view.css`
- File Viewer 관련 → `file-viewer.css`
- Doc View 관련 → `doc-view.css`
- 반응형 조정 → `responsive.css`에 추가

### z-index 체계

| 값 | 용도 |
|----|------|
| 50 | Zoom Controls |
| 100 | Header |
| 150 | File Viewer |
| 200 | Search Results, 모바일 File Viewer |
| 1000 | Doc Sidebar 토글 버튼 (480px) |
| 1001 | Doc Sidebar backdrop (480px) |
| 1002 | Doc Sidebar 본체 (480px) |

## 디자인 토큰

### 색상 변수

| 변수 | 값 | 용도 |
|------|-----|------|
| `--bg` | `#0b0b1a` | 페이지 배경 |
| `--surface` | `#111128` | Header, Panel, Card 배경 |
| `--elevated` | `#1a1a3a` | Input, Hover 배경 |
| `--text` | `#e2e8f0` | 기본 텍스트 |
| `--text2` | `#94a3b8` | 보조 텍스트 |
| `--text3` | `#64748b` | 비활성 텍스트 |
| `--border` | `rgba(255,255,255,0.07)` | 경계선 |
| `--glass` | `rgba(17,17,40,0.75)` | Detail Panel 반투명 배경 |
| `--core` | `#10b981` | CORE 모듈 |
| `--bmb` | `#8b5cf6` | BMB 모듈 |
| `--bmm` | `#f59e0b` | BMM 모듈 |
| `--cis` | `#06b6d4` | CIS 모듈 |
| `--tea` | `#ef4444` | TEA 모듈 |

### 크기 변수

| 변수 | 값 | 용도 |
|------|-----|------|
| `--header-h` | `52px` | Header 높이 |
| `--tab-h` | (코드 내 40px) | Tab Bar 높이 |
