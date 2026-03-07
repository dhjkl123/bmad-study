# 모듈 탭 UX 개선 계획

## 개요

모듈 탭(module-view) 내부 콘텐츠의 가독성 향상과 file-viewer 패널의 사용성 개선을 위한 계획.

## 1. 모듈 탭 폰트 크기 증가

### 목표

모듈 탭 내부 텍스트가 전반적으로 10~14px로 작아 읽기 힘든 문제를 해결한다. 디자인 톤을 유지하면서 1~2px씩 점진적으로 증가시킨다.

### 범위

module-view 내부 콘텐츠만 대상. file-viewer 내부 폰트(`.file-viewer-content` 12px, `.fv-code` 11px 등)는 이번 변경 범위에 포함하지 않는다. file-viewer는 리사이즈 기능 추가로 사용자가 직접 넓혀서 가독성을 확보할 수 있다.

### 대상 파일

- `bmad-flowchart/css/module-view.css` — 기본 폰트 크기 변경
- `bmad-flowchart/css/responsive.css` — 480px 브레이크포인트 오버라이드 동기화

### 변경 상세 (module-view.css)

| 요소 | 셀렉터 | 현재 | 변경 | 증가폭 | 비고 |
|------|--------|------|------|--------|------|
| 모듈 헤더 설명 | `.module-header-info p` | 13px | 14px | +1 | |
| 섹션 제목 | `.agents-section h3`, `.workflows-section h3` | 14px | 16px | +2 | 섹션 구분 강조 목적 |
| 에이전트 카드 이름 | `.agent-card-name` | 14px | 15px | +1 | |
| 에이전트 카드 풀네임 | `.agent-card-fullname` | 11px | 12px | +1 | |
| 에이전트 카드 역할 | `.agent-card-role` | 12px | 13px | +1 | |
| 에이전트 카드 설명 | `.agent-card-desc` | 11px | 13px | +2 | 본문 텍스트 중 가장 긴 콘텐츠로 가독성 영향이 가장 큼 |
| 에이전트 카드 파일 | `.agent-card-file` | 10px | 11px | +1 | |
| 워크플로우 이름 | `.wf-list-name` | 13px | 14px | +1 | |
| 워크플로우 설명 | `.wf-list-desc` | 11px | 12px | +1 | |
| 워크플로우 파일수 | `.wf-list-file-count` | 10px | 11px | +1 | |
| 워크플로우 파일경로 | `.wf-list-wffile` | 10px | 11px | +1 | |
| 파일 경로 | `.file-path` | 11px | 12px | +1 | |
| 파일 아이콘 | `.file-icon` | 11px | 12px | +1 | |
| 파일 용도 | `.file-purpose` | 10px | 11px | +1 | |

**`.file-node` 상속 관계 정리:**
- `.file-node`의 `font-size: 11px`는 제거하지 않고 12px로 변경한다.
- 자식 요소 `.file-path`(11px→12px)와 `.file-icon`(11px→12px)은 명시적 선언이 있으므로 상속 충돌 없이 각각 독립 적용된다.
- `.file-node`의 font-size는 토글 버튼 등 명시적 선언이 없는 자식 요소의 기본값 역할을 하므로 함께 변경한다.

### 변경 상세 (responsive.css — 480px 브레이크포인트)

480px에서 별도 오버라이드가 있는 항목만 동일 비율로 조정한다.

| 요소 | 셀렉터 | 현재 480px | 변경 480px | 증가폭 |
|------|--------|-----------|-----------|--------|
| 헤더 설명 | `.module-header-info p` | 12px | 13px | +1 |
| 카드 이름 | `.agent-card-name` | 13px | 14px | +1 |
| 카드 풀네임 | `.agent-card-fullname` | 10px | 11px | +1 |
| 카드 역할 | `.agent-card-role` | 11px | 12px | +1 |
| 카드 설명 | `.agent-card-desc` | 10px | 12px | +2 |
| WF 이름 | `.wf-list-name` | 12px | 13px | +1 |
| WF 설명 | `.wf-list-desc` | 10px | 11px | +1 |

480px에서 오버라이드가 없는 항목(섹션 h3, 카드 파일, WF 파일수/경로, 파일 트리 등)은 기본값 변경이 그대로 모바일에도 적용된다.

**768px 브레이크포인트:** 현재 768px 블록에는 module-view 폰트 크기 오버라이드가 없으므로 변경 불필요. 기본값이 그대로 적용된다.

### 변경하지 않는 항목

- 모듈 헤더 제목 h2 (20px) — 이미 충분한 크기
- 배지 (11px) — 보조 메타 정보
- 모듈 config 파일 경로 (11px) — 보조 정보
- WF 토글 아이콘 (10px) — UI 컨트롤 요소
- 크로스 배지 (10px) — 보조 라벨
- file-viewer 내부 폰트 — 리사이즈 기능으로 대체

## 2. File Viewer 드래그 리사이즈

### 목표

우측 file-viewer 패널(고정 420px)의 너비를 사용자가 좌측 가장자리 드래그로 조절할 수 있도록 한다.

### 대상 파일

| 파일 | 변경 내용 |
|------|----------|
| `bmad-flowchart/css/file-viewer.css` | CSS 변수 `--fv-width` 도입, 리사이즈 핸들 스타일 추가 |
| `bmad-flowchart/index.html` | file-viewer 내부에 리사이즈 핸들 DOM 요소 추가 |
| `bmad-flowchart/js/constants.js` | `state.fvWidth: 420` 초기값 추가 |
| `bmad-flowchart/js/file-viewer.js` | 드래그 리사이즈 로직 추가 |
| `bmad-flowchart/css/responsive.css` | 900px 이하에서 리사이즈 핸들 숨김 |

### CSS 변경 (file-viewer.css)

- `.file-viewer`의 `width: 420px`을 `width: var(--fv-width, 420px)`로 변경
- `.module-view.viewer-open`의 `margin-right: 420px`을 `margin-right: var(--fv-width, 420px)`로 변경
- **CSS 변수 `--fv-width`는 `document.documentElement`(:root)에 설정한다.** `.file-viewer`와 `.module-view`는 형제 요소이므로, :root에 설정해야 양쪽 모두 참조 가능하다.
- 리사이즈 핸들 `.file-viewer-resize` 스타일 추가:
  - 위치: `position: absolute; left: 0; top: 0; height: 100%`
  - 시각적 너비: 4px
  - **히트 영역 확장:** `::before` 가상 요소로 좌우 6px 확장하여 실제 클릭 영역 16px 확보
  - 커서: `col-resize`
  - hover 시 배경색 `rgba(255,255,255,0.15)`로 변경하여 인터랙션 힌트 제공
  - `z-index: 10` (file-viewer 내부에서 다른 콘텐츠 위에 위치)

### HTML 변경 (index.html)

file-viewer 내부 첫 번째 자식으로 리사이즈 핸들 추가:

```html
<div id="file-viewer" class="file-viewer hidden">
  <div class="file-viewer-resize"></div>
  <!-- 기존 내용 -->
</div>
```

### JS 변경 (file-viewer.js)

`bindEvents()` 내에 리사이즈 로직 추가:

#### 이벤트 등록 구조

- **mousedown** (리사이즈 핸들에 등록): 드래그 시작
  - `resizing` 플래그 설정
  - `.file-viewer`의 `transition`을 `none`으로 설정 (기존 `transition: transform 0.25s ease` 비활성화)
  - `document.body`에 `user-select: none` 스타일 추가 (텍스트 선택 방지)
  - `document.body`에 `cursor: col-resize` 설정 (커서 일관성)
- **mousemove** (`document`에 등록): 드래그 중 너비 계산
  - 새 너비: `window.innerWidth - e.clientX`
  - 제한: 최소 300px, 최대 `window.innerWidth * 0.7`
  - `document.documentElement.style.setProperty('--fv-width', newWidth + 'px')` 실시간 업데이트
  - `S.fvWidth = newWidth`로 상태 동기화
- **mouseup** (`document`에 등록): 드래그 종료
  - `resizing` 플래그 해제
  - `.file-viewer`의 `transition` 복원
  - `document.body`의 `user-select`, `cursor` 복원

#### 터치 이벤트 지원

- **touchstart** (리사이즈 핸들): mousedown과 동일 로직, `e.touches[0].clientX` 사용
- **touchmove** (`document`): mousemove와 동일 로직, `e.touches[0].clientX` 사용, `e.preventDefault()` 호출
- **touchend** (`document`): mouseup과 동일 로직

#### 너비 복원 동작

- `fileViewer.show()` 호출 시: `S.fvWidth` 값으로 `--fv-width` CSS 변수 설정 → 사용자가 조절한 너비 유지
- `fileViewer.hide()` 호출 시: CSS 변수 제거 불필요 (패널이 `translateX(100%)`로 숨겨짐)
- 탭 전환 시: `fileViewer.hide()`가 호출되므로 자동 처리. 다시 열면 `S.fvWidth` 기반 복원

#### window resize 대응

- `window`의 `resize` 이벤트에서 현재 `S.fvWidth`가 `window.innerWidth * 0.7`을 초과하면 최대값으로 클램프
- 900px 이하로 줄어들면: CSS에서 `width: 100%`가 `var(--fv-width)`를 오버라이드하므로 JS 개입 불필요. 핸들도 `display: none`으로 숨겨짐
- 900px 초과로 다시 넓어지면: `S.fvWidth` 값이 보존되어 있으므로 자연스럽게 복원

### 반응형 처리 (responsive.css)

- **900px 이하**: 리사이즈 핸들 `display: none`, `.file-viewer { width: 100% }` 유지
  - `width: 100%`가 `var(--fv-width)` 보다 specificity가 높으므로 CSS 변수를 별도 리셋하지 않아도 됨
- **768px**: 변경 없음 (현재 file-viewer 관련 스타일 없음)
- **480px**: 기존 `width: 100%` 동작 유지, 핸들 숨김 상속

### 제약 사항

- ES5 문법 엄수 (var, function 키워드 사용)
- IIFE 패턴 유지
- 최소 300px / 최대 70vw 너비 제한으로 레이아웃 깨짐 방지
- 리사이즈 핸들 히트 영역 최소 16px 확보 (접근성)

## 3. 텍스트 시인성 개선 (스크린샷 분석 기반)

스크린샷 촬영 + 디자인 전문가 분석으로 도출된 개선안. 다크 테마에서 설명 텍스트의 시인성이 부족한 근본 원인을 해결한다.

### 근본 원인

`--text3: #64748b`가 다크 배경(`--surface: #111128`) 대비 **3.2:1** 대비율로 WCAG AA 기준(4.5:1)을 미달한다. 이 색상이 에이전트 설명, 워크플로우 설명, 파일 경로 등 핵심 정보 텍스트 전반에 적용되어 있다.

### 대상 파일

- `bmad-flowchart/css/variables.css` — CSS 색상 변수 변경
- `bmad-flowchart/css/module-view.css` — 개별 요소 스타일 보완

### [P0] 색상 대비 개선 (WCAG AA 충족)

**대상 파일:** `variables.css`

| CSS 변수 | 현재값 | 변경값 | 대비율 변화 | 비고 |
|----------|--------|--------|------------|------|
| `--text3` | `#64748b` | `#8293a8` | 3.2:1 → **4.8:1** | AA 기준 충족 |
| `--text2` | `#94a3b8` | `#a0b3c6` | 5.4:1 → **6.5:1** | 여유 확보 (선택) |

**영향 범위:** `--text3`은 전역 변수이므로 module-view 외에도 Overview, Doc View, File Viewer 등 모든 뷰에 적용된다. 단, 모든 곳에서 동일하게 시인성이 개선되므로 부작용이 아닌 긍정적 효과다.

### [P1] 워크플로우 설명 보강

**대상 파일:** `module-view.css`

| 셀렉터 | 속성 | 현재값 | 변경값 | 근거 |
|--------|------|--------|--------|------|
| `.wf-list-desc` | `font-size` | 13px | **14px** | 본문 설명으로 최소 14px 필요 |
| `.wf-list-desc` | `line-height` | 미지정 (~1.2) | **1.5** | 행간 확보로 가독성 향상 |

### [P2] 시각적 계층 강화 — 에이전트 카드

**대상 파일:** `module-view.css`

현재 에이전트 카드 내에서 role(14px/400)과 desc(14px/400)의 크기가 동일하여 시각적 구분이 불충분하다. role을 라벨 스타일로 차별화하여 계층을 명확히 한다.

| 셀렉터 | 속성 | 현재값 | 변경값 | 근거 |
|--------|------|--------|--------|------|
| `.agent-card-role` | `font-size` | 14px | **13px** | role은 라벨, desc는 본문으로 분리 |
| `.agent-card-role` | `font-weight` | 400 (기본) | **500** | 작은 크기 보상 + 라벨 느낌 |
| `.agent-card-role` | `text-transform` | 없음 | **uppercase** | 라벨 스타일 부여 |
| `.agent-card-role` | `letter-spacing` | 없음 | **0.04em** | uppercase 시 자간 확보 |
| `.agent-card-desc` | `letter-spacing` | 없음 | **0.01em** | 다크 배경 한글 가독성 미세 개선 |

### [P3] 미세 자간 조정 (선택)

**대상 파일:** `module-view.css`

| 셀렉터 | 속성 | 현재값 | 변경값 | 근거 |
|--------|------|--------|--------|------|
| `.wf-list-desc` | `letter-spacing` | 없음 | **0.01em** | 다크 배경 텍스트 가독성 |

### 반응형 영향

- **P0 (색상 변수):** 전 해상도에 동일 적용. 반응형 별도 처리 불필요.
- **P1 (wf-list-desc 14px):** 480px에서 현재 `.wf-list-desc`가 12px(변경 전 11px)로 오버라이드 중. 480px 오버라이드도 12px → **13px**로 +1 동기화 필요.
- **P2 (agent-card-role):** 480px에서 현재 `.agent-card-role`이 13px(변경 전 12px)로 오버라이드 중. 새 기본값 13px와 동일하므로 480px 오버라이드를 **12px**로 변경하여 모바일에서도 계층 유지.
- **P3:** 반응형 영향 없음.

## 4. File Viewer 시인성 개선 (토의 합의 기반)

디자인 전문가와 비관적 검토자의 토의를 통해 합의된 개선안. 원안의 "--text3 → --text2 일괄 색상 전환" 전략을 폐기하고, **"색상 유지, 10px → 11px 선별 크기 상향"** 전략을 채택했다.

### 전략 변경 근거

| 폐기된 전략 | 폐기 이유 |
|------------|----------|
| --text3 → --text2 일괄 전환 | 3단계 시각 계층(--text/--text2/--text3)이 2단계로 붕괴 |
| .fv-nav-pill 색상 --text2 | hover 피드백 소멸 (기본=hover 동일 색상) |
| .fv-content-md p 12→13px | h4(12px)와 크기 역전, inline code(11px) 격차 확대 |
| blockquote --text3→--text2 | 인용문은 본문보다 약해야 하는 의도적 설계 |
| summary line-height 1.5→1.6 | 변경 근거 불충분 |
| 중간 톤 변수 신설 | 폰트 크기 조정으로 해결 가능, 불필요한 복잡성 |

### 핵심 판단

시인성 문제의 근본 원인은 `--text3` 색상(이미 4.8:1로 AA 충족)이 아니라, **10px이라는 극소 폰트 크기**에 있다. 색상은 유지하고 크기만 선별 상향한다.

### 대상 파일

- `bmad-flowchart/css/file-viewer.css` — 폰트 크기 상향 + 주석 색상 수정
- `bmad-flowchart/css/responsive.css` — 480px 연쇄 조정

### 변경 사항 (file-viewer.css — 4건)

| # | 셀렉터 | 속성 | 현재값 | 변경값 | 근거 |
|---|--------|------|--------|--------|------|
| 1 | `.file-viewer-path` | font-size | 10px | **11px** | 파일 경로는 파일 식별에 필요한 정보 |
| 2 | `.fv-nav-pill` | font-size | 10px | **11px** | 클릭 대상이므로 가독성 필요 |
| 3 | `.fv-nav-branch-purpose` | font-size | 10px | **11px** | 실제 내용을 담은 설명 텍스트 |
| 4 | `.fv-code .cmt` | color | `#5c6370` (하드코딩) | `var(--text3)` | 하드코딩 제거 + WCAG 대비율 2.8:1 → 4.5:1 개선 |

### 변경 사항 (responsive.css 480px — 2건)

| # | 셀렉터 | 속성 | 현재값 | 변경값 | 비고 |
|---|--------|------|--------|--------|------|
| 5 | `.file-viewer-path` | font-size | 9px | **10px** | 데스크톱 연쇄 조정 (+1px) |
| 6 | `.fv-nav-branch-purpose` | font-size | 9px | **10px** | 데스크톱 연쇄 조정 (+1px) |

`.fv-nav-pill`은 480px에서 현재 9px → **9px 유지** (nav-btn 10px과의 계층 구분 보존)

### 명시적으로 변경하지 않는 항목

| 항목 | 유지 이유 |
|------|----------|
| `.fv-nav-pills-label`, `.fv-step-group-label`, `.fv-nav-branch-hint` (10px/--text3) | 콘텐츠가 아닌 라벨/구분자 — 계층 보존 |
| `.fv-content-md p/h3/h4/blockquote/code` | h4 역전, code 격차 확대 방지 |
| `.fv-nav-position` | 위치 표시는 보조 정보 |
| `.file-viewer-summary` line-height | 변경 근거 불충분 |
| CSS 변수 (--text, --text2, --text3) | 섹션 3에서 이미 충분히 개선 완료 |

### 반응형 영향 정리

- **900px 이하:** file-viewer가 전체 화면으로 전환. 변경된 11px 값이 넓은 화면에서 적용되므로 시인성 더 향상. 부작용 없음.
- **768px:** file-viewer 관련 오버라이드 없음. 변경 불필요.
- **480px:** `.file-viewer-path`와 `.fv-nav-branch-purpose`만 9px→10px 동기화. `.fv-nav-pill`은 9px 유지 (nav-btn 10px과 계층 보존).

## 5. File Viewer 콘텐츠 영역 시인성 강화 (2차 토의 합의)

사용자 피드백: 모듈 탭 수준의 가독성을 file-viewer에서도 달성해야 한다. 섹션 4에서 네비게이션 요소(10px→11px)만 조정했으나, 콘텐츠 본문/마크다운 영역의 크기가 여전히 부족하다.

### 전략: 마크다운 타이포그래피 전체 비례 상향

이전 토의에서 기각되었던 본문 크기 상향의 부작용(h4 역전, code 격차)을 **h1~h4 전체를 균일 +2px, code/table +1px**로 해결한다.

### 대상 파일

- `bmad-flowchart/css/file-viewer.css` — 콘텐츠 영역 전체 크기 상향
- `bmad-flowchart/css/responsive.css` — 480px 연쇄 조정

### 변경 사항 (file-viewer.css — 12건)

#### 헤더/요약 영역

| # | 셀렉터 | 속성 | 현재값 | 변경값 | 증가폭 |
|---|--------|------|--------|--------|--------|
| 1 | `.file-viewer-title` | font-size | 13px | **14px** | +1 |
| 2 | `.file-viewer-summary` | font-size | 12px | **13px** | +1 |

#### 콘텐츠 본문 (base)

| # | 셀렉터 | 속성 | 현재값 | 변경값 | 증가폭 |
|---|--------|------|--------|--------|--------|
| 3 | `.file-viewer-content` | font-size | 12px | **14px** | +2 (p/ul/ol 상속) |

#### 마크다운 제목 계층 (균일 +2px)

| # | 셀렉터 | 속성 | 현재값 | 변경값 | 증가폭 |
|---|--------|------|--------|--------|--------|
| 4 | `.fv-content-md h1` | font-size | 18px | **20px** | +2 |
| 5 | `.fv-content-md h2` | font-size | 15px | **17px** | +2 |
| 6 | `.fv-content-md h3` | font-size | 13px | **15px** | +2 |
| 7 | `.fv-content-md h4` | font-size | 12px | **14px** | +2 |

#### 코드/테이블 (+1px)

| # | 셀렉터 | 속성 | 현재값 | 변경값 | 증가폭 |
|---|--------|------|--------|--------|--------|
| 8 | `.fv-content-md code` | font-size | 11px | **12px** | +1 |
| 9 | `.fv-code` | font-size | 11px | **12px** | +1 |
| 10 | `.fv-table` | font-size | 11px | **12px** | +1 |

#### 자간 추가

| # | 셀렉터 | 속성 | 현재값 | 변경값 | 비고 |
|---|--------|------|--------|--------|------|
| 11 | `.fv-content-md p` | letter-spacing | 없음 | **0.01em** | 다크 배경 가독성 |
| 12 | `.fv-content-md li` | letter-spacing | 없음 | **0.01em** | 동일 |

### 변경 사항 (responsive.css 480px — 9건)

| # | 셀렉터 | 속성 | 현재값 | 변경값 | 비고 |
|---|--------|------|--------|--------|------|
| 1 | `.file-viewer-title` | font-size | 12px | **13px** | +1 |
| 2 | `.file-viewer-summary` | font-size | 11px | **12px** | +1 |
| 3 | `.file-viewer-content` | font-size | 11px | **12px** | +1, line-height 1.5 유지 |
| 4 | `.fv-content-md h1` | font-size | 16px | **18px** | +2 |
| 5 | `.fv-content-md h2` | font-size | 13px | **15px** | +2 |
| 6 | `.fv-content-md h3` | font-size | 12px | **14px** | +2 |
| 7 | `.fv-content-md h4` | font-size | (없음) | **13px** | 신규 오버라이드 |
| 8 | `.fv-content-md p` | font-size | 11px | **삭제** | base 12px 상속으로 충분 |
| 9 | `.fv-table` | font-size | 10px | **11px** | +1 |

### 계층 검증

**데스크탑:** h1(20) > h2(17) > h3(15) > h4(14) = p(14) > code(12)
- h4=p는 h4의 font-weight:600으로 구분. 현재 구조(h4=p=12px)와 동일 패턴.

**480px:** h1(18) > h2(15) > h3(14) > h4(13) > p(12) > code(11)
- 모든 heading 간 최소 1px 차이. 역전 없음.

### 변경하지 않는 항목

- 네비게이션 요소(fv-nav-*, fv-step-*): 섹션 4에서 이미 조정 완료
- blockquote 색상: --text3 유지 (인용문 계층)
- line-height: 현행 유지 (.file-viewer-content 1.6, .fv-code 1.7)
- heading, code에 letter-spacing 미적용
