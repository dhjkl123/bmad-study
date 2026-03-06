# Data 구조

## 로딩 패턴

`modules/*.js`에서 `window.BMAD_MODULES` 배열에 push → `data-loader.js`에서 `BMAD_DATA`로 조합.

## 파일별 역할

| 파일 | 전역 변수 | 내용 |
|------|-----------|------|
| `modules/core.js` | `BMAD_MODULES` (push) | CORE 모듈 데이터 |
| `modules/bmb.js` | `BMAD_MODULES` (push) | BMB 모듈 데이터 |
| `modules/bmm.js` | `BMAD_MODULES` (push) | BMM 모듈 데이터 (전체의 70%+, 대용량) |
| `modules/cis.js` | `BMAD_MODULES` (push) | CIS 모듈 데이터 |
| `modules/tea.js` | `BMAD_MODULES` (push) | TEA 모듈 데이터 |
| `data-loader.js` | `BMAD_DATA` | 모듈 데이터를 `{ modules: BMAD_MODULES }`로 조합 |
| `doc-data.js` | `DOC_DATA` | Doc 탭 카테고리/문서 콘텐츠 |

## 작성 규칙

### 모듈 데이터 (modules/*.js) 템플릿

```js
// BMAD Module: {모듈id}
window.BMAD_MODULES = window.BMAD_MODULES || [];
window.BMAD_MODULES.push(
{
  id: '{모듈id}',           // 탭 전환, 검색에서 식별자로 사용
  name: '{정식 명칭}',
  shortName: '{약칭}',      // 탭 버튼, 헤더에 표시
  description: '{설명}',
  color: '#{hex}',          // 모듈 테마 색상
  colorRgb: 'r, g, b',     // rgba()용 (투명도 조합 시)
  configFile: '{경로}',     // 설정 파일 경로 (없으면 생략)
  agents: [ /* ... */ ],
  workflows: [ /* ... */ ]
}
);
```

### 네이밍 규칙

| 항목 | 패턴 | 예시 |
|------|------|------|
| 모듈 id | `{모듈약칭 소문자}` | `core`, `bmb`, `bmm` |
| 에이전트 id | `{모듈id}-{에이전트명}` | `core-master`, `bmm-architect` |
| 워크플로우 id | `{모듈id}-{워크플로우명}` | `core-brainstorming`, `bmm-create-prd` |

JS 코드에서 이 id로 데이터를 검색하므로 (`find(function(m) { return m.id === modId; })`), 유일해야 함.

### agents[] 항목 구조

```js
{
  id: 'bmm-architect',
  name: 'Architect',                    // 카드에 표시되는 짧은 이름
  fullName: 'bmad-bmm-architect',       // 검색 인덱스, 파일 참조용
  role: 'System Architect',             // 에이전트 역할 설명
  description: '...',                   // 상세 설명
  agentFile: '_bmad/bmm/agents/architect.md',  // 에이전트 정의 파일 경로
  workflows: ['bmm-create-architecture', ...]  // 관련 워크플로우 id 목록
}
```

### workflows[] 항목 구조

```js
{
  id: 'core-brainstorming',
  name: 'Brainstorming',
  description: '...',
  workflowFile: '_bmad/core/workflows/brainstorming/workflow.md',
  files: [
    {
      path: 'steps/step-01-session-setup.md',   // 워크플로우 루트 기준 상대경로
      type: 'md',                                // md | yaml | xml | csv | groovy
      purpose: '세션 설정 단계',                   // File Viewer에서 요약으로 표시
      children: [                                 // 분기/하위 스텝 (선택)
        { path: 'steps/step-01b-continue.md', type: 'md', purpose: '...' }
      ]
    },
    { path: 'template.md', type: 'md', purpose: '결과물 템플릿' }
  ]
}
```

`files[]`는 트리 구조. `children`으로 중첩 가능. File Viewer의 Step Navigation은 `path`에 `steps/` 포함 여부로 스텝 파일을 판별.

### doc-data.js 구조

```js
window.DOC_DATA = {
  categories: [
    {
      id: 'overview',
      title: '카테고리 제목',
      icon: 'info',            // 아이콘 키 (B.utils.getIcon에서 매핑)
      items: [
        {
          id: 'unique-item-id',
          label: '문서 제목',
          tags: ['tag1', 'tag2'],
          content: '<h3>...</h3><p>...</p>',   // HTML 문자열
          related: ['other-item-id']            // 관련 문서 id (선택)
        }
      ]
    }
  ]
};
```

`content`는 미리 렌더링된 HTML. 마크다운이 아님.

## 주의사항

- `modules/bmm.js` 직접 수정보다 `scripts/update_bmm.py` 같은 스크립트 활용 권장
- 새 모듈 추가 시: `modules/{id}.js` 생성 → `index.html`에 `<script>` 추가 (`data-loader.js` 앞에)
