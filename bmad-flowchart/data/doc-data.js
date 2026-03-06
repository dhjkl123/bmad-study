// BMAD Doc Tab Data
// 8 Categories, Cross-Reference Search via tags

const DOC_DATA = {
  categories: [

    // ========================================================
    // 1. 시작하기
    // ========================================================
    {
      id: 'getting-started',
      title: '시작하기',
      icon: 'rocket',
      items: [
        {
          id: 'gs-overview',
          title: 'BMAD 개요',
          tags: ['BMAD', 'Build More Architect Dreams', '개요', '소개', '프레임워크', 'AI 에이전트'],
          content: `<h3>BMAD란?</h3>
<p><strong>BMAD (Build More Architect Dreams)</strong>는 AI 에이전트 기반 소프트웨어 개발 프레임워크입니다. 아이디어 구상부터 구현까지 전 과정을 전문화된 AI 에이전트가 지원하며, 버그 수정부터 엔터프라이즈 플랫폼 구축까지 다양한 프로젝트 복잡도에 대응합니다.</p>

<h3>핵심 특징</h3>
<ul>
<li><strong>전문화된 AI 에이전트</strong> — 20개 에이전트가 각자의 역할(PM, 아키텍트, 개발자 등)을 수행</li>
<li><strong>적응형 워크플로우</strong> — 프로젝트 복잡도에 맞춰 Quick Flow / BMad Method / Enterprise 경로를 선택</li>
<li><strong>컨텍스트 체이닝</strong> — 각 단계의 산출물이 다음 단계의 입력이 되어 일관성 보장</li>
<li><strong>AI IDE 통합</strong> — Claude Code, Cursor, GitHub Copilot 등과 호환</li>
</ul>

<h3>5개 모듈 요약</h3>
<table>
<tr><th>모듈</th><th>목적</th><th>에이전트</th><th>워크플로우</th></tr>
<tr><td><strong>CORE</strong></td><td>핵심 유틸리티 (브레인스토밍, 문서 편집)</td><td>1</td><td>8</td></tr>
<tr><td><strong>BMB</strong></td><td>메타 프로그래밍 (에이전트/모듈/워크플로우 생성)</td><td>3</td><td>12</td></tr>
<tr><td><strong>BMM</strong></td><td>소프트웨어 개발 수명주기 전체</td><td>9</td><td>23</td></tr>
<tr><td><strong>CIS</strong></td><td>창의적 혁신 (디자인 씽킹, 혁신 전략)</td><td>6</td><td>4</td></tr>
<tr><td><strong>TEA</strong></td><td>테스트 아키텍처 (설계, 자동화, CI/CD)</td><td>1</td><td>9</td></tr>
</table>`,
          related: ['gs-structure', 'gs-planning-track']
        },
        {
          id: 'gs-structure',
          title: '시스템 구조',
          tags: ['시스템 구조', '모듈 관계', 'CORE', 'BMB', 'BMM', 'CIS', 'TEA', '아키텍처'],
          content: `<h3>5개 모듈 관계도</h3>
<p>BMAD의 5개 모듈은 각각 독립적이지만 상호 연결됩니다.</p>

<div class="doc-diagram">
<pre>
    ┌─────────────────────────────────────┐
    │              CORE                    │
    │  (브레인스토밍, 문서편집, 유틸리티)      │
    └────┬──────────┬──────────┬──────────┘
         │          │          │
    ┌────▼────┐ ┌──▼───┐ ┌──▼───┐
    │  BMM    │ │ CIS  │ │ TEA  │
    │ 개발    │ │ 혁신  │ │테스트│
    └────┬────┘ └──────┘ └──────┘
         │
    ┌────▼────┐
    │  BMB    │
    │메타빌드 │
    └─────────┘
</pre>
</div>

<h3>모듈별 역할</h3>
<ul>
<li><strong>CORE</strong> — 모든 모듈이 공유하는 유틸리티. CIS의 Carson은 CORE의 Brainstorming 워크플로우를 직접 사용</li>
<li><strong>BMB</strong> — BMAD 자체를 만드는 메타 레이어. 에이전트/모듈/워크플로우를 생성·편집·검증</li>
<li><strong>BMM</strong> — 실제 소프트웨어를 만드는 개발 레이어. 분석→기획→설계→구현→QA 전체 SDLC 커버</li>
<li><strong>CIS</strong> — 창의적 사고를 체계적으로 지원. 브레인스토밍, 디자인씽킹, 혁신 전략</li>
<li><strong>TEA</strong> — 테스트 전 생명주기. 설계, 자동화, CI/CD 품질 게이트</li>
</ul>

<h3>모듈 간 워크플로우 공유</h3>
<ul>
<li>CIS Carson → CORE Brainstorming 워크플로우 사용</li>
<li>BMM Architect + PM → 공동으로 Check Readiness 수행</li>
<li>BMM Developer + Solo Dev → 공동으로 Code Review 수행</li>
</ul>`,
          related: ['gs-overview', 'mod-core', 'mod-bmb', 'mod-bmm', 'mod-cis', 'mod-tea']
        },
        {
          id: 'gs-install',
          title: '설치 및 설정',
          tags: ['설치', 'install', 'npx', 'Node.js', '설정', 'config', '_bmad', '_bmad-output'],
          content: `<h3>사전 요구사항</h3>
<ul>
<li>Node.js 20+</li>
<li>Git (권장)</li>
<li>AI IDE: Claude Code, Cursor, Windsurf 등</li>
</ul>

<h3>설치</h3>
<pre><code>npx bmad-method install</code></pre>

<h3>설치 과정 (5단계)</h3>
<ol>
<li><strong>설치 실행</strong> — 터미널에서 명령어 실행</li>
<li><strong>위치 선택</strong> — BMad 파일 설치 위치 지정</li>
<li><strong>AI 도구 선택</strong> — Claude Code / Cursor / 기타 선택 → IDE별 프롬프트 파일 자동 배치</li>
<li><strong>모듈 선택</strong> — 필요한 모듈 선택 (대부분 BMM만으로 충분)</li>
<li><strong>가이드 완료</strong> — 나머지 지시사항 따르기</li>
</ol>

<h3>생성되는 디렉토리 구조</h3>
<pre><code>your-project/
├── _bmad/              ← 에이전트, 워크플로우, 설정
│   ├── core/           ← 필수 핵심 모듈
│   ├── bmm/            ← 선택한 모듈
│   │   └── config.yaml
│   └── ...
├── _bmad-output/       ← 생성된 산출물 (PRD.md 등)
├── .claude/            ← Claude Code 명령어
└── .cursor/            ← Cursor 명령어</code></pre>

<h3>설치 확인</h3>
<pre><code>/bmad-help</code></pre>
<p>설치 상태 확인, 사용 가능 기능, 다음 단계 추천을 제공합니다.</p>`,
          related: ['gs-quickstart', 'cmd-naming', 'recipe-existing-project']
        },
        {
          id: 'gs-quickstart',
          title: '빠른 시작 가이드',
          tags: ['빠른 시작', 'Getting Started', '시작', '첫 프로젝트', 'Phase', '단계'],
          content: `<h3>4단계 프로세스</h3>
<table>
<tr><th>Phase</th><th>이름</th><th>설명</th><th>필수 여부</th></tr>
<tr><td>1</td><td>분석 (Analysis)</td><td>브레인스토밍, 리서치</td><td>선택</td></tr>
<tr><td>2</td><td>계획 (Planning)</td><td>PRD / Quick Spec 작성</td><td><strong>필수</strong></td></tr>
<tr><td>3</td><td>설계 (Solutioning)</td><td>아키텍처, 에픽/스토리</td><td>Method/Enterprise만</td></tr>
<tr><td>4</td><td>구현 (Implementation)</td><td>스토리별 개발</td><td><strong>필수</strong></td></tr>
</table>

<h3>시나리오별 시작점</h3>
<ul>
<li><strong>새 프로젝트</strong> → Analyst 에이전트 → Market/Domain Research → Product Brief</li>
<li><strong>빠른 프로토타입</strong> → Solo Dev → Quick Spec → Quick Dev</li>
<li><strong>테스트 체계</strong> → Murat(TEA) → Test Framework → Test Design</li>
<li><strong>아이디어 발상</strong> → Carson(CIS) → Brainstorming</li>
<li><strong>BMAD 확장</strong> → Morgan(BMB) → Create Module Brief</li>
</ul>

<h3>핵심 원칙</h3>
<ul>
<li><strong>항상 신규 채팅 시작</strong> — 각 워크플로우마다 새로운 대화 세션 필수</li>
<li><strong>bmad-help 우선 활용</strong> — 막혔을 때 <code>/bmad-help</code> 실행</li>
<li><strong>산출물 체이닝</strong> — 이전 단계 산출물이 다음 단계 입력</li>
</ul>`,
          related: ['gs-planning-track', 'concept-context-chaining', 'concept-new-chat']
        },
        {
          id: 'gs-planning-track',
          title: 'Planning Track 선택 가이드',
          tags: ['Planning Track', 'Quick Flow', 'BMad Method', 'Enterprise', '프로젝트 규모', '선택 기준', '스토리'],
          content: `<h3>3가지 Planning Track</h3>
<table>
<tr><th>Track</th><th>규모</th><th>적합한 프로젝트</th><th>Phase 3 (Solutioning)</th></tr>
<tr><td><strong>Quick Flow</strong></td><td>1-15 스토리</td><td>버그 수정, 소규모 기능, 리팩토링, 프로토타입</td><td>건너뜀</td></tr>
<tr><td><strong>BMad Method</strong></td><td>10-50+ 스토리</td><td>제품, 플랫폼, 복잡한 기능</td><td><strong>필수</strong></td></tr>
<tr><td><strong>Enterprise</strong></td><td>30+ 스토리</td><td>규정 준수, 멀티테넌트 시스템</td><td><strong>필수</strong></td></tr>
</table>

<h3>선택 기준</h3>
<p><strong>Quick Flow를 선택하세요:</strong></p>
<ul>
<li>한 명의 개발자가 전체 범위를 파악할 수 있는 작업</li>
<li>범위가 명확하고 아키텍처 결정이 불필요</li>
<li>기존 코드 패턴을 따르는 작업</li>
</ul>

<p><strong>BMad Method를 선택하세요:</strong></p>
<ul>
<li>여러 컴포넌트/팀에 걸친 기능</li>
<li>DB 스키마, API 설계 등 아키텍처 결정 필요</li>
<li>요구사항이 불명확하거나 논쟁의 여지가 있음</li>
</ul>

<p><strong>Quick Flow에서 에스컬레이션:</strong> 작업 중 범위가 커지면 자동으로 BMad Method 전환을 제안합니다. 기존 작업 손실 없이 전환 가능.</p>`,
          related: ['gs-quickstart', 'wf-quick-spec', 'wf-quick-dev', 'concept-solutioning']
        }
      ]
    },

    // ========================================================
    // 2. 핵심 개념
    // ========================================================
    {
      id: 'concepts',
      title: '핵심 개념',
      icon: 'lightbulb',
      items: [
        {
          id: 'concept-context-chaining',
          title: '컨텍스트 체이닝',
          tags: ['컨텍스트', 'Context Chaining', '산출물', '입력', 'Phase', 'PRD', '아키텍처', '스토리', '맥락'],
          content: `<h3>핵심 원리</h3>
<p><em>"AI agents work best with clear, structured context"</em></p>
<p>BMAD의 각 Phase 산출물은 다음 Phase의 입력이 됩니다. 이것이 BMAD가 단계별로 문서를 만드는 근본 이유입니다.</p>

<h3>체이닝 흐름</h3>
<pre><code>Research → Product Brief → PRD → Architecture → Epics/Stories → Code
   │            │            │          │              │
   └── 시장 인사이트  └── 비전/목표  └── 기능 명세  └── 기술 결정  └── 구현 컨텍스트</code></pre>

<ul>
<li><strong>PRD</strong>는 아키텍트에게 중요한 제약을 알림</li>
<li><strong>아키텍처</strong>는 개발 에이전트에게 따를 패턴을 제시</li>
<li><strong>스토리 파일</strong>은 구현을 위한 집중된 완전한 맥락을 제공</li>
</ul>

<h3>왜 중요한가?</h3>
<p>컨텍스트 없이 에이전트에게 "로그인 기능 만들어줘"라고 하면, 에이전트는 일반적인 패턴을 사용합니다. 하지만 PRD→아키텍처→스토리를 거쳐 전달하면, <strong>프로젝트의 기술 스택, 인증 방식, 코딩 규약</strong>까지 반영된 코드를 생성합니다.</p>`,
          related: ['concept-solutioning', 'concept-project-context', 'gs-quickstart']
        },
        {
          id: 'concept-solutioning',
          title: 'Solutioning이 중요한 이유',
          tags: ['Solutioning', '설계', 'Phase 3', 'Architecture', 'ADR', '에이전트 충돌', '비용', '10배'],
          content: `<h3>Solutioning이란?</h3>
<p>Phase 3 (Solutioning)은 <strong>"무엇을 만들 것인가"(Planning)를 "어떻게 만들 것인가"(기술 설계)로 번역</strong>하는 단계입니다.</p>

<h3>Solutioning 없이 구현하면?</h3>
<div class="doc-warning">
<p>Agent A는 REST API를 사용하고, Agent B는 GraphQL을 사용 → <strong>API 설계 불일치, 통합 불가</strong></p>
</div>

<h3>Planning vs Solutioning</h3>
<table>
<tr><th></th><th>Planning (Phase 2)</th><th>Solutioning (Phase 3)</th></tr>
<tr><td>초점</td><td>What & Why</td><td>How</td></tr>
<tr><td>산출물</td><td>요구사항 (FR/NFR)</td><td>아키텍처 + Epic</td></tr>
<tr><td>담당자</td><td>PM</td><td>Architect → PM</td></tr>
<tr><td>대상</td><td>이해관계자</td><td>개발자</td></tr>
</table>

<h3>비용 법칙</h3>
<p><strong>"구현 중 발견되는 정렬 문제는 Solutioning 단계의 10배 비용"</strong></p>
<p>Solutioning에서 30분이면 해결할 충돌이, 구현 후에는 코드 재작성, 테스트 수정, 롤백으로 이어집니다.</p>

<h3>적용 기준</h3>
<ul>
<li><strong>Quick Flow</strong> — 스킵 가능 (단일 개발자, 소규모)</li>
<li><strong>BMad Method / Enterprise</strong> — 여러 에픽을 다른 에이전트가 구현할 수 있다면 <strong>필수</strong></li>
</ul>`,
          related: ['concept-agent-conflict', 'concept-context-chaining', 'gs-planning-track', 'wf-create-architecture']
        },
        {
          id: 'concept-agent-conflict',
          title: '에이전트 충돌 방지와 ADR',
          tags: ['에이전트 충돌', 'ADR', 'Architecture Decision Record', 'REST', 'GraphQL', '일관성', '기술 결정', 'API'],
          content: `<h3>충돌이 발생하는 이유</h3>
<p>다중 AI 에이전트가 시스템의 다른 부분을 구현할 때, 명시적 결정 없이는 각자 다른 기술을 선택합니다.</p>

<h3>주요 충돌 유형</h3>
<table>
<tr><th>유형</th><th>예시</th><th>해결</th></tr>
<tr><td>API 스타일</td><td>Agent A: REST, Agent B: GraphQL</td><td>ADR로 단일 통신 방식 지정</td></tr>
<tr><td>DB 네이밍</td><td>snake_case vs camelCase</td><td>표준 문서로 네이밍 규칙 명시</td></tr>
<tr><td>상태 관리</td><td>Redux vs React Context</td><td>ADR로 일관된 접근법 정의</td></tr>
</table>

<h3>ADR (Architecture Decision Record)</h3>
<p>기술 결정을 구조적으로 기록하는 문서:</p>
<ul>
<li><strong>Context</strong> — 결정이 필요한 배경</li>
<li><strong>Options</strong> — 검토한 선택지들</li>
<li><strong>Decision</strong> — 선택한 결정</li>
<li><strong>Consequences</strong> — 근거와 트레이드오프</li>
</ul>

<h3>권장 ADR 주제</h3>
<p>API 스타일, 데이터베이스, 인증 방식, 상태 관리, 스타일링, 테스트 프레임워크</p>

<h3>피해야 할 반패턴</h3>
<ul>
<li><strong>암묵적 결정</strong> — 진행 중 결정 → 불일치 초래</li>
<li><strong>과도한 문서화</strong> — 모든 사소한 선택 기록 → 마비</li>
<li><strong>오래된 아키텍처</strong> — 업데이트 안 된 문서 → 구식 패턴</li>
</ul>`,
          related: ['concept-solutioning', 'concept-project-context', 'wf-create-architecture']
        },
        {
          id: 'concept-adversarial-review',
          title: '적대적 리뷰 (Adversarial Review)',
          tags: ['적대적 리뷰', 'Adversarial Review', '확증편향', '코드 리뷰', '검증', '품질', '오탐'],
          content: `<h3>핵심 규칙</h3>
<p><strong>"반드시 문제를 찾아야 한다."</strong> "괜찮아 보인다"는 결론은 허용되지 않습니다.</p>

<h3>왜 효과적인가?</h3>
<p>일반 리뷰는 확증편향에 빠져 "잘 되어 보인다"고 넘어가기 쉽습니다. 적대적 리뷰는:</p>
<ul>
<li><strong>철저성 강제</strong> — 충분히 깊이 검토할 때까지 승인 불가</li>
<li><strong>누락 항목 발견</strong> — "여기엔 뭐가 없나?" 자동 질문</li>
<li><strong>구체적 발견</strong> — 모호한 우려가 아닌 실행 가능한 피드백</li>
</ul>

<h3>BMAD에서의 활용</h3>
<ul>
<li>Code Review — 적대적 시니어 개발자 관점</li>
<li>Check Readiness — PRD/아키텍처/에픽 교차 검증</li>
<li>Validate PRD — PRD 완전성/일관성 검증</li>
<li>Adversarial Review (CORE) — 범용 논리 결함 검출</li>
</ul>

<h3>중요한 한계</h3>
<div class="doc-warning">
<p>AI가 "문제를 찾으라"는 지시를 받으면 <strong>실제 없는 문제도 만들어냅니다</strong> (허위 양성/오탐). 반드시 인간이 각 발견사항을 검증하고, 실질적인 것만 수정하세요.</p>
</div>

<p>두 번째 반복 리뷰는 추가 문제를 발견하지만, 반복할수록 실질적 감소(diminishing returns)가 발생합니다.</p>`,
          related: ['wf-code-review', 'wf-check-readiness', 'wf-adversarial-review']
        },
        {
          id: 'concept-project-context',
          title: 'Project Context의 역할',
          tags: ['Project Context', 'project-context.md', '헌법', '코딩 규약', '기술 스택', '일관성', '컨벤션'],
          content: `<h3>정의</h3>
<p><code>project-context.md</code>는 AI 에이전트를 위한 프로젝트 구현 가이드, 즉 <strong>"헌법"</strong> 역할을 합니다.</p>

<h3>왜 필요한가?</h3>
<table>
<tr><th>컨텍스트 없을 때</th><th>컨텍스트 있을 때</th></tr>
<tr><td>일반적 패턴 사용</td><td>확립된 컨벤션 준수</td></tr>
<tr><td>스토리 간 스타일 불일치</td><td>일관된 구현</td></tr>
<tr><td>프로젝트 제약조건 누락</td><td>모든 기술 요구사항 존중</td></tr>
</table>

<h3>포함 내용</h3>
<ul>
<li><strong>기술 스택 & 버전</strong> — Node.js 20.x, TypeScript 5.3, React 18.2 등</li>
<li><strong>코드 구조 규칙</strong> — 컴포넌트 위치, 유틸리티 경로, API 클라이언트 패턴</li>
<li><strong>테스트 패턴</strong> — 단위/통합/E2E 각각의 규칙</li>
<li><strong>프레임워크 특화 규칙</strong> — 에러 핸들링, 기능 플래그, 라우팅 패턴</li>
</ul>

<h3>자동 로드하는 워크플로우</h3>
<p>create-architecture, create-story, dev-story, code-review, quick-dev</p>

<h3>생성 방법</h3>
<pre><code>/bmad-bmm-generate-project-context</code></pre>
<p>또는 아키텍처 생성 완료 시 자동 생성 가능.</p>`,
          related: ['concept-context-chaining', 'concept-agent-conflict', 'wf-generate-context', 'agent-tech-writer']
        },
        {
          id: 'concept-party-mode',
          title: 'Party Mode 심화',
          tags: ['Party Mode', '파티 모드', '다중 에이전트', 'Master', '토론', '의사결정', '브레인스토밍'],
          content: `<h3>개념</h3>
<p><code>/bmad-party-mode</code> 실행 시 <strong>전체 AI 팀을 한 방에 소환</strong>합니다. PM, 아키텍트, 개발자, UX 디자이너 등 필요한 역할의 에이전트가 참여합니다.</p>

<h3>작동 방식</h3>
<ul>
<li><strong>BMad Master</strong>가 조율자 역할</li>
<li>각 메시지에 관련된 에이전트를 선택하여 응답</li>
<li>에이전트들이 캐릭터에 맞춰 상호 동의, 이견 제시, 아이디어 발전</li>
<li>사용자가 후속 질문, 이의 제기, 논의 방향 전환 가능</li>
</ul>

<h3>활용 시나리오</h3>
<ul>
<li><strong>주요 의사결정</strong> — 트레이드오프가 있는 기술/제품 결정</li>
<li><strong>브레인스토밍</strong> — 다양한 관점에서 아이디어 발전</li>
<li><strong>사후 분석</strong> — 장애/실패 원인 다각도 분석</li>
<li><strong>스프린트 회고</strong> — 여러 역할의 관점에서 회고</li>
</ul>

<h3>예시: 아키텍처 결정</h3>
<p>"모놀리식 vs 마이크로서비스?"라는 질문에 Architect는 기술 관점, PM은 일정 관점, Developer는 구현 복잡도 관점에서 각각 의견을 제시합니다.</p>`,
          related: ['agent-master', 'concept-adversarial-review']
        },
        {
          id: 'concept-brainstorming',
          title: 'Brainstorming 철학',
          tags: ['Brainstorming', '브레인스토밍', '아이디어', 'Carson', 'YES AND', 'SCAMPER', '창의적', '코치'],
          content: `<h3>핵심 철학</h3>
<p><strong>"당신의 아이디어를 끌어내고 — 생성하지 않는다"</strong></p>
<p>AI는 창의적 촉진자/코치 역할을 합니다. 증명된 기법을 활용해 최고의 사고가 나올 수 있는 환경을 조성하지만, 모든 아이디어는 사용자로부터 나옵니다.</p>

<h3>5단계 프로세스</h3>
<ol>
<li><strong>설정</strong> — 주제, 목표, 제약조건 정의</li>
<li><strong>접근법 선택</strong> — 자체 선택 / AI 추천 / 무작위 / 점진적 진행</li>
<li><strong>촉진</strong> — 탐색적 질문과 협력적 코칭으로 진행</li>
<li><strong>정리</strong> — 아이디어를 테마별로 분류 및 우선순위 결정</li>
<li><strong>실행</strong> — 상위 아이디어에 다음 단계 및 성공 지표 적용</li>
</ol>

<h3>36개 이상의 기법</h3>
<p>7개 카테고리 (발산, 수렴, 시각적 등)에서 SCAMPER, 6 Thinking Hats, Reverse Brainstorming 등 36개 이상의 검증된 기법을 사용합니다.</p>

<h3>활용 사례</h3>
<ul>
<li>창의적 막힘 극복</li>
<li>제품 또는 기능 아이디어 생성</li>
<li>문제를 새로운 관점에서 탐색</li>
<li>개념을 실행 계획으로 발전</li>
</ul>`,
          related: ['agent-carson', 'wf-brainstorming', 'agent-master']
        },
        {
          id: 'concept-new-chat',
          title: '신규 채팅 원칙',
          tags: ['신규 채팅', '새 세션', '컨텍스트 오염', '워크플로우', '원칙', '초보자', '실수'],
          content: `<h3>규칙</h3>
<p><strong>각 워크플로우마다 반드시 새로운 대화 세션을 시작하세요.</strong></p>

<h3>왜?</h3>
<p>AI 대화는 이전 맥락을 누적합니다. 한 세션에서 PRD 작성 후 이어서 아키텍처를 설계하면:</p>
<ul>
<li>PRD 작성 중의 중간 논의가 아키텍처 결정에 <strong>노이즈</strong>로 작용</li>
<li>컨텍스트 윈도우가 소진되어 <strong>이전 결정을 잊음</strong></li>
<li>역할 전환(PM→Architect)이 불완전하여 <strong>일관성 저하</strong></li>
</ul>

<h3>올바른 패턴</h3>
<pre><code>[새 채팅] /bmad-bmm-create-prd        → PRD.md 생성
[새 채팅] /bmad-bmm-create-architecture → architecture.md 생성
[새 채팅] /bmad-bmm-create-epics       → Epic 파일 생성
[새 채팅] /bmad-bmm-create-story       → story-login.md 생성
[새 채팅] /bmad-bmm-dev-story          → 코드 구현</code></pre>

<h3>예외</h3>
<p>다단계 워크플로우(예: Create Agent의 8단계)는 한 세션에서 연속 진행합니다. "워크플로우 하나 = 세션 하나"가 원칙입니다.</p>`,
          related: ['gs-quickstart', 'concept-context-chaining']
        }
      ]
    },

    // ========================================================
    // 3. 모듈 가이드
    // ========================================================
    {
      id: 'modules',
      title: '모듈 가이드',
      icon: 'cube',
      items: [
        {
          id: 'mod-core',
          title: 'CORE — 핵심 유틸리티',
          tags: ['CORE', 'Master', '브레인스토밍', 'Party Mode', 'Help', 'Index Docs', 'Shard Doc', 'Editorial', 'Adversarial Review', '유틸리티'],
          content: `<h3>목적</h3>
<p>모든 모듈이 공유하는 범용 도구 모음. 다른 모듈의 에이전트가 CORE 워크플로우를 호출하는 방식으로 사용됩니다.</p>

<h3>에이전트: Master (1개)</h3>
<p>BMAD Core의 중앙 허브. 설정 파일 로드 후 메뉴 기반 인터페이스로 8개 워크플로우를 동적 라우팅합니다.</p>

<h3>워크플로우 (8개)</h3>
<table>
<tr><th>워크플로우</th><th>설명</th></tr>
<tr><td>Brainstorming</td><td>36개 기법 기반 구조화된 브레인스토밍</td></tr>
<tr><td>Party Mode</td><td>다중 AI 에이전트 가상 토론</td></tr>
<tr><td>Help</td><td>워크플로우 카탈로그 CSV 기반 검색</td></tr>
<tr><td>Index Docs</td><td>디렉토리 문서 목차 자동 생성</td></tr>
<tr><td>Shard Doc</td><td>대형 마크다운 H2 기준 파일 분할</td></tr>
<tr><td>Editorial Prose</td><td>문법/어조/가독성 교열</td></tr>
<tr><td>Editorial Structure</td><td>문서 구조 재편/단순화</td></tr>
<tr><td>Adversarial Review</td><td>적대적 관점 논리 결함 검출</td></tr>
</table>

<h3>설정</h3>
<p><code>_bmad/core/config.yaml</code></p>`,
          related: ['agent-master', 'gs-structure']
        },
        {
          id: 'mod-bmb',
          title: 'BMB — 메타 프로그래밍',
          tags: ['BMB', 'Building Module Builder', 'Bond', 'Morgan', 'Wendy', '에이전트 생성', '모듈 생성', '워크플로우 생성', '메타', '빌더'],
          content: `<h3>목적</h3>
<p>BMAD 시스템 자체를 만들고 확장하는 메타 레이어. 커스텀 에이전트, 워크플로우, 도메인 특화 모듈을 생성합니다.</p>

<h3>에이전트 (3개)</h3>
<table>
<tr><th>에이전트</th><th>역할</th><th>담당</th></tr>
<tr><td><strong>Bond</strong> (Agent Builder)</td><td>에이전트 아키텍처 전문가</td><td>Create/Edit/Validate Agent</td></tr>
<tr><td><strong>Morgan</strong> (Module Builder)</td><td>모듈 아키텍처 전문가</td><td>Create Module Brief/Module, Edit/Validate Module</td></tr>
<tr><td><strong>Wendy</strong> (Workflow Builder)</td><td>워크플로우 프로세스 전문가</td><td>Create/Edit/Validate/Rework Workflow, Max Parallel</td></tr>
</table>

<h3>워크플로우 (12개)</h3>
<p>에이전트(3) + 모듈(4) + 워크플로우(5) 각각에 Create/Edit/Validate 조합</p>

<h3>핵심 파이프라인</h3>
<pre><code>Create Module Brief → Create Module → Create Agent × N → Create Workflow × N → Validate</code></pre>

<h3>설정</h3>
<p><code>_bmad/bmb/config.yaml</code></p>
<p>npm: <code>bmad-builder</code></p>`,
          related: ['agent-bond', 'agent-morgan', 'agent-wendy', 'recipe-new-module']
        },
        {
          id: 'mod-bmm',
          title: 'BMM — 소프트웨어 개발',
          tags: ['BMM', 'Building Mood Maker', 'SDLC', '소프트웨어 개발', 'Analyst', 'Architect', 'Developer', 'PM', 'QA', 'Solo Dev', 'Scrum Master', 'Tech Writer', 'UX Designer'],
          content: `<h3>목적</h3>
<p>소프트웨어 개발 수명주기(SDLC) 전체를 커버하는 핵심 개발 모듈.</p>

<h3>에이전트 (9개)</h3>
<table>
<tr><th>에이전트</th><th>역할</th></tr>
<tr><td>Analyst (Mary)</td><td>시장/도메인/기술 조사, 제품 브리프</td></tr>
<tr><td>Architect (Winston)</td><td>시스템 아키텍처, 구현 준비 검증</td></tr>
<tr><td>Developer (Amelia)</td><td>스토리 구현, 코드 리뷰</td></tr>
<tr><td>PM (John)</td><td>PRD 작성/검증/수정, 에픽 생성</td></tr>
<tr><td>QA Engineer (Quinn)</td><td>테스트 자동 생성</td></tr>
<tr><td>Solo Dev (Barry)</td><td>Quick Flow 전담</td></tr>
<tr><td>Scrum Master (Bob)</td><td>스프린트 계획, 스토리, 회고</td></tr>
<tr><td>Tech Writer (Paige)</td><td>프로젝트 문서화, AI 컨텍스트</td></tr>
<tr><td>UX Designer (Sally)</td><td>UX 패턴/사양서</td></tr>
</table>

<h3>워크플로우 카테고리 (23개)</h3>
<ul>
<li><strong>Analysis</strong> (4): Market/Domain/Technical Research, Product Brief</li>
<li><strong>Planning</strong> (4): Create/Validate/Edit PRD, UX Design</li>
<li><strong>Solutioning</strong> (3): Architecture, Readiness Check, Epics & Stories</li>
<li><strong>Implementation</strong> (7): Dev Story, Code Review, Sprint Planning/Status, Create Story, Retrospective, Correct Course</li>
<li><strong>Quick Flow</strong> (2): Quick Spec, Quick Dev</li>
<li><strong>Project Mgmt</strong> (2): Document Project, Generate Context</li>
<li><strong>QA</strong> (1): QA Automate</li>
</ul>

<h3>설정</h3>
<p><code>_bmad/bmm/config.yaml</code></p>`,
          related: ['gs-quickstart', 'gs-planning-track']
        },
        {
          id: 'mod-cis',
          title: 'CIS — 창의적 혁신',
          tags: ['CIS', 'Creative Intelligence Suite', 'Carson', 'Quinn', 'Maya', 'Victor', 'Caravaggio', 'Sophia', '창의', '혁신', '디자인 씽킹', 'SCAMPER'],
          content: `<h3>목적</h3>
<p>창의적 사고와 혁신 전략을 체계적으로 지원하는 모듈.</p>

<h3>에이전트 (6개)</h3>
<table>
<tr><th>에이전트</th><th>역할</th></tr>
<tr><td>Carson</td><td>"YES AND" 화법 브레인스토밍 퍼실리테이터</td></tr>
<tr><td>Dr. Quinn</td><td>TRIZ/TOC/5 Whys 체계적 문제 해결</td></tr>
<tr><td>Maya</td><td>HCD 디자인 씽킹 코치</td></tr>
<tr><td>Victor</td><td>JTBD/블루오션/BMC 혁신 전략가</td></tr>
<tr><td>Caravaggio</td><td>시각 커뮤니케이션/프레젠테이션</td></tr>
<tr><td>Sophia</td><td>영웅의 여정/픽사 스토리 스토리텔러</td></tr>
</table>

<h3>워크플로우 (4개)</h3>
<p>Problem Solving, Design Thinking, Innovation Strategy, Storytelling</p>

<h3>특이점</h3>
<p>Carson은 CORE의 Brainstorming 워크플로우를 직접 사용 (모듈 간 공유).</p>
<p>Caravaggio는 전용 워크플로우 없이 직접 대화형 작업을 수행합니다.</p>

<h3>설정</h3>
<p><code>_bmad/cis/config.yaml</code></p>
<p>npm: <code>bmad-creative-intelligence-suite</code></p>`,
          related: ['concept-brainstorming', 'agent-carson', 'agent-maya', 'agent-victor']
        },
        {
          id: 'mod-tea',
          title: 'TEA — 테스트 아키텍처',
          tags: ['TEA', 'Test Engineering Architecture', 'Murat', '테스트', 'ATDD', 'CI/CD', '품질 게이트', '자동화', 'NFR'],
          content: `<h3>목적</h3>
<p>테스트 전 생명주기를 커버하는 엔터프라이즈급 테스트 전문 모듈.</p>

<h3>에이전트: Murat (1개)</h3>
<p>Master Test Architect — 9개 워크플로우 + 40개 지식 프래그먼트 보유. 리스크 기반 테스팅, ATDD, API/UI 자동화, CI/CD 품질 게이트를 전문으로 합니다.</p>

<h3>워크플로우 (9개)</h3>
<table>
<tr><th>카테고리</th><th>워크플로우</th></tr>
<tr><td>Learning</td><td>Teach Me Testing (7세션 교육)</td></tr>
<tr><td>Solutioning</td><td>Test Design, Test Framework, CI Setup</td></tr>
<tr><td>Implementation</td><td>ATDD, Test Automation, Test Review, NFR Assessment</td></tr>
<tr><td>Traceability</td><td>Trace</td></tr>
</table>

<h3>Quinn(BMM) vs TEA 비교</h3>
<table>
<tr><th></th><th>Quinn (BMM 내장)</th><th>TEA</th></tr>
<tr><td>설치</td><td>불필요</td><td>별도 설치</td></tr>
<tr><td>적합</td><td>소~중규모</td><td>대규모/엔터프라이즈</td></tr>
<tr><td>접근</td><td>빠른 생성, 반복</td><td>계획 먼저, 추적성</td></tr>
<tr><td>범위</td><td>API, E2E</td><td>API, E2E, ATDD, NFR 등</td></tr>
</table>

<h3>특징</h3>
<p>병렬 서브프로세스 패턴을 적극 활용 (API/E2E 동시 생성).</p>

<h3>설정</h3>
<p><code>_bmad/tea/config.yaml</code></p>
<p>npm: <code>bmad-method-test-architecture-enterprise</code></p>`,
          related: ['agent-murat', 'recipe-test-system']
        },
        {
          id: 'mod-gds',
          title: 'GDS — 게임 개발 스튜디오',
          tags: ['GDS', 'Game Dev Studio', '게임', 'Unity', 'Unreal', 'Godot', 'GDD', '게임 디자인'],
          content: `<h3>목적</h3>
<p>Unity, Unreal, Godot, 커스텀 엔진용 게임 개발 워크플로우를 제공하는 모듈.</p>

<h3>주요 기능</h3>
<ul>
<li><strong>Game Design Document (GDD)</strong> 생성 워크플로우</li>
<li><strong>Quick Dev 모드</strong> — 빠른 프로토타이핑</li>
<li><strong>내러티브 디자인</strong> — 캐릭터, 대사, 월드빌딩</li>
<li><strong>21개 이상 게임 유형</strong> 및 엔진별 아키텍처 가이드</li>
</ul>

<h3>설정</h3>
<p>코드: <code>gds</code></p>
<p>npm: <code>bmad-game-dev-studio</code></p>

<p><em>참고: GDS는 공식 확장 모듈로, 기본 설치에는 포함되지 않습니다. <code>npx bmad-method install</code> 시 모듈 선택 단계에서 추가할 수 있습니다.</em></p>`,
          related: ['mod-bmm', 'gs-install']
        }
      ]
    },

    // ========================================================
    // 4. 에이전트 레퍼런스
    // ========================================================
    {
      id: 'agents',
      title: '에이전트 레퍼런스',
      icon: 'user',
      items: [
        {
          id: 'agent-master',
          title: 'Master (CORE)',
          tags: ['Master', 'CORE', 'bmad-master', '중앙 허브', '라우팅', '디스패처', '메뉴'],
          content: `<h3>Master — BMAD Core 중앙 허브</h3>
<p>설정 파일 로드 후 메뉴 기반 인터페이스로 8개 워크플로우를 동적 라우팅하는 디스패처.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/core/agents/bmad-master.md</code></li>
<li><strong>모듈:</strong> CORE</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Brainstorming, Party Mode, Help, Index Docs, Shard Doc, Editorial Prose, Editorial Structure, Adversarial Review</p>`,
          related: ['mod-core', 'concept-party-mode']
        },
        {
          id: 'agent-bond',
          title: 'Bond — Agent Builder (BMB)',
          tags: ['Bond', 'Agent Builder', 'BMB', '에이전트 생성', '에이전트 편집', '에이전트 검증', '아키텍처'],
          content: `<h3>Bond — 에이전트 아키텍처 전문가</h3>
<p>에이전트의 전체 생명주기(생성→편집→검증)를 관리. BMAD 규정 준수를 보장하며 품질 검증 보고서를 제공합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/bmb/agents/agent-builder.md</code></li>
<li><strong>모듈:</strong> BMB</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Create Agent, Edit Agent, Validate Agent</p>`,
          related: ['mod-bmb', 'wf-create-agent', 'wf-edit-agent', 'wf-validate-agent']
        },
        {
          id: 'agent-morgan',
          title: 'Morgan — Module Builder (BMB)',
          tags: ['Morgan', 'Module Builder', 'BMB', '모듈 생성', '모듈 편집', '모듈 검증', '제품 브리프'],
          content: `<h3>Morgan — 모듈 아키텍처 전문가</h3>
<p>제품 브리프 작성부터 에이전트/워크플로우/폴더 구조를 포함한 완전한 모듈 생성까지 전체 파이프라인을 지원합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/bmb/agents/module-builder.md</code></li>
<li><strong>모듈:</strong> BMB</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Create Module Brief, Create Module, Edit Module, Validate Module</p>`,
          related: ['mod-bmb', 'recipe-new-module']
        },
        {
          id: 'agent-wendy',
          title: 'Wendy — Workflow Builder (BMB)',
          tags: ['Wendy', 'Workflow Builder', 'BMB', '워크플로우 생성', '워크플로우 편집', '워크플로우 검증', 'Rework', 'Max Parallel'],
          content: `<h3>Wendy — 워크플로우 프로세스 설계 전문가</h3>
<p>신규 생성과 기존 콘텐츠 변환 두 경로를 지원. 최대 병렬 모드 검증과 레거시 V6 재작업까지 가장 다양한 워크플로우 관리 기능을 보유합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/bmb/agents/workflow-builder.md</code></li>
<li><strong>모듈:</strong> BMB</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Create Workflow, Edit Workflow, Validate Workflow, Max Parallel Validate, Rework Workflow</p>`,
          related: ['mod-bmb']
        },
        {
          id: 'agent-analyst',
          title: 'Analyst — Mary (BMM)',
          tags: ['Analyst', 'Mary', 'BMM', '분석', '시장 조사', '도메인 조사', '기술 조사', '제품 브리프', 'Research'],
          content: `<h3>Analyst (Mary) — 전략적 비즈니스 분석가</h3>
<p>시장/도메인/기술 조사를 수행하고, 인사이트 기반으로 요구사항을 구체화하며 제품 브리프 작성을 지원합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/bmm/agents/analyst.md</code></li>
<li><strong>명령어:</strong> <code>/bmad-agent-bmm-analyst</code></li>
<li><strong>트리거:</strong> BP, RS, CB, DP</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Market Research, Domain Research, Technical Research, Create Product Brief</p>`,
          related: ['mod-bmm', 'wf-market-research', 'wf-create-product-brief']
        },
        {
          id: 'agent-architect',
          title: 'Architect — Winston (BMM)',
          tags: ['Architect', 'Winston', 'BMM', '아키텍처', '시스템 설계', 'ADR', '분산 시스템', 'API', 'Check Readiness'],
          content: `<h3>Architect (Winston) — 시스템 아키텍트</h3>
<p>분산 시스템/클라우드/API 설계 전문가. AI 에이전트 간 일관성을 보장하는 아키텍처 문서를 작성하고, 구현 착수 전 정렬을 적대적으로 검증합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/bmm/agents/architect.md</code></li>
<li><strong>명령어:</strong> <code>/bmad-agent-bmm-architect</code></li>
<li><strong>트리거:</strong> CA, IR</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Create Architecture, Check Readiness</p>`,
          related: ['mod-bmm', 'wf-create-architecture', 'wf-check-readiness', 'concept-agent-conflict']
        },
        {
          id: 'agent-developer',
          title: 'Developer — Amelia (BMM)',
          tags: ['Developer', 'Amelia', 'BMM', '개발자', '구현', '코드 리뷰', '시니어', 'SOLID', 'Dev Story'],
          content: `<h3>Developer (Amelia) — 시니어 소프트웨어 엔지니어</h3>
<p>승인된 사용자 스토리를 엄격한 표준에 따라 구현하고, 적대적 시니어 개발자 관점으로 코드를 심층 리뷰합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/bmm/agents/dev.md</code></li>
<li><strong>명령어:</strong> <code>/bmad-agent-bmm-dev</code></li>
<li><strong>트리거:</strong> DS, CR</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Dev Story, Code Review</p>`,
          related: ['mod-bmm', 'wf-dev-story', 'wf-code-review']
        },
        {
          id: 'agent-pm',
          title: 'PM — John (BMM)',
          tags: ['PM', 'Product Manager', 'John', 'BMM', 'PRD', '요구사항', '에픽', '스토리', 'Correct Course'],
          content: `<h3>PM (John) — 제품 관리자</h3>
<p>사용자 인터뷰와 요구사항 발견을 통해 PRD를 작성/검증하고, 에픽/스토리를 생성하며, 스프린트 중 변경 영향도를 분석합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/bmm/agents/pm.md</code></li>
<li><strong>명령어:</strong> <code>/bmad-agent-bmm-pm</code></li>
<li><strong>트리거:</strong> CP, VP, EP, CE, IR, CC</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Create PRD, Validate PRD, Edit PRD, Create Epics, Check Readiness, Correct Course</p>`,
          related: ['mod-bmm', 'wf-create-prd', 'wf-validate-prd', 'wf-create-epics']
        },
        {
          id: 'agent-qa',
          title: 'QA Engineer — Quinn (BMM)',
          tags: ['QA', 'QA Engineer', 'Quinn', 'BMM', '테스트', '자동화', 'API 테스트', 'E2E', 'Jest', 'Playwright'],
          content: `<h3>QA Engineer (Quinn) — 테스트 자동화 전문가</h3>
<p>기존 소스 코드를 분석하여 표준 테스트 패턴 기반의 API 및 E2E 테스트를 자동 생성합니다. 수동 작성 없이 빠른 테스트 커버리지 확보에 특화.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/bmm/agents/qa.md</code></li>
<li><strong>트리거:</strong> QA</li>
</ul>
<h4>담당 워크플로우</h4>
<p>QA Automate</p>
<h4>Quinn vs TEA</h4>
<p>Quinn은 경량 테스트 자동화 에이전트이고, 전체 Test Architect(TEA)는 별도 모듈입니다. 소규모 프로젝트는 Quinn, 엔터프라이즈급은 TEA를 사용하세요.</p>`,
          related: ['mod-bmm', 'mod-tea', 'agent-murat']
        },
        {
          id: 'agent-solo-dev',
          title: 'Solo Dev — Barry (BMM)',
          tags: ['Solo Dev', 'Barry', 'BMM', 'Quick Flow', 'Quick Spec', 'Quick Dev', '풀스택', '프로토타입'],
          content: `<h3>Solo Dev (Barry) — Quick Flow 전담 엘리트 풀스택 개발자</h3>
<p>대화형으로 기술 사양서를 작성하고 즉시 구현까지 연결. 아이디어에서 동작하는 코드까지를 빠르고 효율적으로 단독 처리합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/bmm/agents/quick-flow-solo-dev.md</code></li>
<li><strong>명령어:</strong> <code>/bmad-agent-bmm-quick-flow</code></li>
<li><strong>트리거:</strong> QS, QD, CR</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Quick Spec, Quick Dev, Code Review</p>

<h4>범위 검출 기능</h4>
<p>작업이 예상보다 크면 자동으로 BMad Method 에스컬레이션을 제안합니다.</p>`,
          related: ['mod-bmm', 'wf-quick-spec', 'wf-quick-dev', 'gs-planning-track']
        },
        {
          id: 'agent-sm',
          title: 'Scrum Master — Bob (BMM)',
          tags: ['Scrum Master', 'Bob', 'BMM', '스프린트', '애자일', '스토리 생성', '회고', 'Sprint Planning'],
          content: `<h3>Scrum Master (Bob) — 테크니컬 스크럼 마스터</h3>
<p>스프린트 계획, 에픽→스토리 생성, 에픽 회고를 통해 팀의 애자일 세레모니를 지원하고 진행 상황을 추적합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/bmm/agents/sm.md</code></li>
<li><strong>명령어:</strong> <code>/bmad-agent-bmm-sm</code></li>
<li><strong>트리거:</strong> SP, CS, ER, CC</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Sprint Planning, Create Story, Retrospective, Correct Course</p>`,
          related: ['mod-bmm', 'wf-sprint-planning', 'wf-create-story', 'wf-retrospective']
        },
        {
          id: 'agent-tech-writer',
          title: 'Tech Writer — Paige (BMM)',
          tags: ['Tech Writer', 'Technical Writer', 'Paige', 'BMM', '문서화', 'Document Project', 'Generate Context', '지식 베이스'],
          content: `<h3>Tech Writer (Paige) — 기술 문서 전문가</h3>
<p>기존 코드베이스와 아키텍처를 분석하여 AI 개발에 필요한 참조 문서와 지식 베이스를 구축합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/bmm/agents/tech-writer/tech-writer.md</code></li>
<li><strong>트리거:</strong> DP, WD, US, MG, VD, EC</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Document Project, Generate Context</p>`,
          related: ['mod-bmm', 'concept-project-context', 'wf-generate-context']
        },
        {
          id: 'agent-ux',
          title: 'UX Designer — Sally (BMM)',
          tags: ['UX Designer', 'Sally', 'BMM', 'UX', 'UI', '디자인', '사양서', '룩앤필'],
          content: `<h3>UX Designer (Sally) — UX 전문가</h3>
<p>시각적 탐색과 협업적 의사결정을 통해 UX 패턴과 룩앤필을 정의. 구현 팀이 즉시 활용할 수 있는 UX 사양서를 산출합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/bmm/agents/ux-designer.md</code></li>
<li><strong>트리거:</strong> CU</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Create UX Design</p>`,
          related: ['mod-bmm', 'wf-create-ux']
        },
        {
          id: 'agent-carson',
          title: 'Carson — Brainstorming Coach (CIS)',
          tags: ['Carson', 'Brainstorming Coach', 'CIS', '브레인스토밍', 'YES AND', '퍼실리테이터', '심리적 안전감'],
          content: `<h3>Carson — 마스터 브레인스토밍 퍼실리테이터</h3>
<p>20년 경력. "YES AND" 화법과 심리적 안전감 조성을 통해 창의적 아이디어 발상을 이끕니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/cis/agents/brainstorming-coach.md</code></li>
<li><strong>모듈:</strong> CIS</li>
</ul>
<h4>담당 워크플로우</h4>
<p>CORE Brainstorming (모듈 간 공유)</p>`,
          related: ['mod-cis', 'concept-brainstorming', 'wf-brainstorming']
        },
        {
          id: 'agent-quinn-cis',
          title: 'Dr. Quinn — Problem Solver (CIS)',
          tags: ['Dr. Quinn', 'Problem Solver', 'CIS', 'TRIZ', 'TOC', '5 Whys', '어골도', '근본 원인', '시스템 사고'],
          content: `<h3>Dr. Quinn — 체계적 문제 해결 전문가</h3>
<p>전직 항공우주 엔지니어. TRIZ/TOC/시스템 사고로 복잡한 난제를 해결하며, 5 Whys/어골도로 근본 원인을 규명합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/cis/agents/creative-problem-solver.md</code></li>
<li><strong>모듈:</strong> CIS</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Problem Solving</p>`,
          related: ['mod-cis', 'wf-problem-solving']
        },
        {
          id: 'agent-maya',
          title: 'Maya — Design Thinking Coach (CIS)',
          tags: ['Maya', 'Design Thinking', 'CIS', 'HCD', '인간 중심 디자인', '공감', '프로토타입', '디자인 씽킹'],
          content: `<h3>Maya — 디자인 씽킹 마에스트로</h3>
<p>포춘 500대/스타트업 HCD 전문가. 공감→정의→아이디어→프로토타입→테스트 전 과정을 가이드합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/cis/agents/design-thinking-coach.md</code></li>
<li><strong>모듈:</strong> CIS</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Design Thinking</p>`,
          related: ['mod-cis', 'wf-design-thinking']
        },
        {
          id: 'agent-victor',
          title: 'Victor — Innovation Strategist (CIS)',
          tags: ['Victor', 'Innovation Strategist', 'CIS', 'JTBD', '블루오션', 'BMC', '비즈니스 모델', '로드맵', '혁신'],
          content: `<h3>Victor — 파괴적 혁신 예언가</h3>
<p>전직 맥킨지 컨설턴트. JTBD/블루오션/BMC로 시장 기회를 발굴하고 단기-중기-장기 실행 로드맵을 수립합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/cis/agents/innovation-strategist.md</code></li>
<li><strong>모듈:</strong> CIS</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Innovation Strategy</p>`,
          related: ['mod-cis', 'wf-innovation-strategy']
        },
        {
          id: 'agent-caravaggio',
          title: 'Caravaggio — Presentation Master (CIS)',
          tags: ['Caravaggio', 'Presentation Master', 'CIS', '프레젠테이션', '슬라이드', '피치 데크', 'TED', '시각 커뮤니케이션'],
          content: `<h3>Caravaggio — 시각 커뮤니케이션 전문가</h3>
<p>TED/투자유치 프레젠테이션 수천 건 분석 기반. 시각적 위계와 청중 심리학으로 슬라이드/피치 데크/유튜브 자료를 제작합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/cis/agents/presentation-master.md</code></li>
<li><strong>모듈:</strong> CIS</li>
</ul>
<h4>담당 워크플로우</h4>
<p>전용 워크플로우 없음 (직접 대화형 작업)</p>`,
          related: ['mod-cis']
        },
        {
          id: 'agent-sophia',
          title: 'Sophia — Storyteller (CIS)',
          tags: ['Sophia', 'Storyteller', 'CIS', '스토리텔링', '영웅의 여정', '픽사', '서사', '감정 곡선'],
          content: `<h3>Sophia — 마스터 스토리텔러</h3>
<p>50년 경력. 영웅의 여정/픽사 스토리 프레임워크로 감동적 서사를 완성하며, 감정 곡선 설계부터 채널별 변형까지 제공합니다.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/cis/agents/storyteller/storyteller.md</code></li>
<li><strong>모듈:</strong> CIS</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Storytelling</p>`,
          related: ['mod-cis', 'wf-storytelling']
        },
        {
          id: 'agent-murat',
          title: 'Murat — Master Test Architect (TEA)',
          tags: ['Murat', 'Master Test Architect', 'TEA', '테스트', 'ATDD', 'CI/CD', '리스크 기반', '품질', '자동화'],
          content: `<h3>Murat — 마스터 테스트 아키텍트</h3>
<p>테스트 전 생명주기를 커버. 리스크 기반 테스팅/ATDD/API&UI 자동화/CI&CD 품질 게이트 전문. 9개 워크플로우 + 40개 지식 프래그먼트 보유.</p>
<ul>
<li><strong>파일:</strong> <code>_bmad/tea/agents/tea.md</code></li>
<li><strong>모듈:</strong> TEA</li>
</ul>
<h4>담당 워크플로우</h4>
<p>Teach Me Testing, Test Framework, ATDD, Test Automation, Test Design, Trace, NFR Assessment, CI Setup, Test Review</p>`,
          related: ['mod-tea', 'recipe-test-system']
        }
      ]
    },

    // ========================================================
    // 5. 워크플로우 가이드 (다음 파트에서 계속)
    // ========================================================
    {
      id: 'workflows',
      title: '워크플로우 가이드',
      icon: 'flow',
      items: [
        // --- 분석 ---
        { id:'wf-market-research', title:'Market Research', tags:['Market Research','시장 조사','Analyst','BMM','Analysis','리서치','경쟁','트렌드'], content:`<h3>Market Research</h3><p>타겟 시장의 규모, 경쟁 환경, 트렌드, 기회를 체계적으로 분석합니다.</p><ul><li><strong>에이전트:</strong> Analyst (Mary)</li><li><strong>명령어:</strong> <code>/bmad-bmm-research</code></li><li><strong>산출물:</strong> research.template.md</li><li><strong>단계:</strong> 초기화 → 데이터 수집 → 분석 → 리포트 작성</li></ul>`, related:['agent-analyst','wf-domain-research','wf-technical-research'] },
        { id:'wf-domain-research', title:'Domain Research', tags:['Domain Research','도메인 조사','Analyst','BMM','Analysis','규제','산업'], content:`<h3>Domain Research</h3><p>특정 도메인/산업의 핵심 개념, 규제, 기술 동향, 주요 플레이어를 심층 분석합니다.</p><ul><li><strong>에이전트:</strong> Analyst (Mary)</li><li><strong>명령어:</strong> <code>/bmad-bmm-research</code></li><li><strong>산출물:</strong> research.template.md</li></ul>`, related:['agent-analyst','wf-market-research'] },
        { id:'wf-technical-research', title:'Technical Research', tags:['Technical Research','기술 조사','Analyst','BMM','Analysis','기술 스택','프레임워크','비교'], content:`<h3>Technical Research</h3><p>기술 스택, 프레임워크, 라이브러리의 장단점을 비교 분석합니다.</p><ul><li><strong>에이전트:</strong> Analyst (Mary)</li><li><strong>명령어:</strong> <code>/bmad-bmm-research</code></li><li><strong>산출물:</strong> research.template.md</li></ul>`, related:['agent-analyst','wf-market-research'] },
        { id:'wf-create-product-brief', title:'Create Product Brief', tags:['Product Brief','제품 브리프','Analyst','BMM','Analysis','비전','목표','성공 지표'], content:`<h3>Create Product Brief</h3><p>시장/도메인/기술 조사 결과를 종합하여 제품의 비전, 목표 사용자, 핵심 기능, 성공 지표를 정의합니다.</p><ul><li><strong>에이전트:</strong> Analyst (Mary)</li><li><strong>명령어:</strong> <code>/bmad-bmm-create-product-brief</code></li><li><strong>산출물:</strong> product-brief.md</li></ul>`, related:['agent-analyst','wf-create-prd'] },
        // --- 기획 ---
        { id:'wf-create-prd', title:'Create PRD', tags:['PRD','Product Requirements Document','요구사항','PM','BMM','Planning','기능 명세','우선순위','인터뷰'], content:`<h3>Create PRD</h3><p>사용자 인터뷰와 요구사항 발견을 통해 기능 명세, 우선순위, 제약사항을 포함한 상세 PRD를 작성합니다.</p><ul><li><strong>에이전트:</strong> PM (John)</li><li><strong>명령어:</strong> <code>/bmad-bmm-create-prd</code></li><li><strong>산출물:</strong> PRD.md</li><li><strong>단계:</strong> 인터뷰 준비 → 요구사항 수집 → PRD 작성</li></ul>`, related:['agent-pm','wf-validate-prd','wf-edit-prd','concept-context-chaining'] },
        { id:'wf-validate-prd', title:'Validate PRD', tags:['Validate PRD','PRD 검증','PM','BMM','Planning','적대적','완전성','일관성'], content:`<h3>Validate PRD</h3><p>작성된 PRD의 완전성, 일관성, 실현 가능성을 적대적 관점으로 검증합니다.</p><ul><li><strong>에이전트:</strong> PM (John)</li><li><strong>명령어:</strong> <code>/bmad-bmm-validate-prd</code></li><li><strong>산출물:</strong> 검증 보고서, 수정 권고</li></ul>`, related:['agent-pm','wf-create-prd','concept-adversarial-review'] },
        { id:'wf-edit-prd', title:'Edit PRD', tags:['Edit PRD','PRD 수정','PM','BMM','Planning','변경 이력','영향도'], content:`<h3>Edit PRD</h3><p>기존 PRD에 새로운 요구사항을 추가하거나 기존 항목을 수정합니다. 변경 이력과 영향도를 추적합니다.</p><ul><li><strong>에이전트:</strong> PM (John)</li><li><strong>명령어:</strong> <code>/bmad-bmm-edit-prd</code></li><li><strong>산출물:</strong> 수정된 PRD, 변경 이력</li></ul>`, related:['agent-pm','wf-create-prd'] },
        { id:'wf-create-ux', title:'Create UX Design', tags:['UX Design','UX','UI','사양서','BMM','Planning','룩앤필','인터랙션','UX Designer'], content:`<h3>Create UX Design</h3><p>시각적 탐색과 협업적 의사결정으로 UI 패턴, 인터랙션, 룩앤필을 정의합니다.</p><ul><li><strong>에이전트:</strong> UX Designer (Sally)</li><li><strong>명령어:</strong> <code>/bmad-bmm-create-ux-design</code></li><li><strong>산출물:</strong> ux-spec.md</li></ul>`, related:['agent-ux','wf-create-prd'] },
        // --- 설계 ---
        { id:'wf-create-architecture', title:'Create Architecture', tags:['Architecture','아키텍처','Architect','BMM','Solutioning','ADR','API','데이터 모델','인프라','시스템 설계'], content:`<h3>Create Architecture</h3><p>시스템 컴포넌트, API 경계, 데이터 모델, 인프라를 설계하고 ADR을 작성합니다.</p><ul><li><strong>에이전트:</strong> Architect (Winston)</li><li><strong>명령어:</strong> <code>/bmad-bmm-create-architecture</code></li><li><strong>산출물:</strong> architecture.md + ADRs</li></ul>`, related:['agent-architect','concept-solutioning','concept-agent-conflict','wf-check-readiness'] },
        { id:'wf-check-readiness', title:'Check Readiness', tags:['Check Readiness','구현 준비','Implementation Readiness','Architect','PM','BMM','Solutioning','Go/No-Go','정합성'], content:`<h3>Check Readiness</h3><p>PRD/아키텍처/에픽/스토리 문서의 정합성을 적대적으로 교차 검증하여 구현 착수 가능 여부를 판단합니다.</p><ul><li><strong>에이전트:</strong> Architect + PM</li><li><strong>명령어:</strong> <code>/bmad-bmm-check-implementation-readiness</code></li><li><strong>산출물:</strong> PASS / CONCERNS / FAIL 판정</li></ul>`, related:['agent-architect','agent-pm','concept-adversarial-review'] },
        { id:'wf-create-epics', title:'Create Epics & Stories', tags:['Epics','Stories','에픽','스토리','PM','BMM','Solutioning','인수 조건','의존성'], content:`<h3>Create Epics & Stories</h3><p>PRD와 아키텍처 기반으로 구현 가능한 에픽과 사용자 스토리를 생성합니다.</p><ul><li><strong>에이전트:</strong> PM (John)</li><li><strong>명령어:</strong> <code>/bmad-bmm-create-epics-and-stories</code></li><li><strong>산출물:</strong> Epic 파일들</li></ul>`, related:['agent-pm','wf-create-architecture','wf-create-story'] },
        // --- 구현 ---
        { id:'wf-dev-story', title:'Dev Story', tags:['Dev Story','구현','Developer','BMM','Implementation','인수 조건','코드','스프린트'], content:`<h3>Dev Story</h3><p>승인된 사용자 스토리의 인수 조건 기반 코드 구현. 스프린트 상태를 업데이트합니다.</p><ul><li><strong>에이전트:</strong> Developer (Amelia)</li><li><strong>명령어:</strong> <code>/bmad-bmm-dev-story</code></li><li><strong>산출물:</strong> 코드 + 테스트, sprint-status.yaml 업데이트</li></ul>`, related:['agent-developer','wf-code-review','wf-create-story'] },
        { id:'wf-code-review', title:'Code Review', tags:['Code Review','코드 리뷰','Developer','Solo Dev','BMM','Implementation','SOLID','보안','품질'], content:`<h3>Code Review</h3><p>적대적 시니어 개발자 관점에서 코드 품질, 보안, 테스트 커버리지, SOLID 원칙을 심층 리뷰합니다.</p><ul><li><strong>에이전트:</strong> Developer (Amelia) / Solo Dev (Barry)</li><li><strong>명령어:</strong> <code>/bmad-bmm-code-review</code></li><li><strong>산출물:</strong> 승인 또는 수정 요청</li></ul>`, related:['agent-developer','agent-solo-dev','concept-adversarial-review'] },
        { id:'wf-sprint-planning', title:'Sprint Planning', tags:['Sprint Planning','스프린트 계획','Scrum Master','BMM','Implementation','용량','우선순위'], content:`<h3>Sprint Planning</h3><p>에픽에서 우선순위 높은 스토리를 선별하고 팀 용량 기반 스프린트 범위를 확정합니다.</p><ul><li><strong>에이전트:</strong> Scrum Master (Bob)</li><li><strong>명령어:</strong> <code>/bmad-bmm-sprint-planning</code></li><li><strong>산출물:</strong> sprint-status.yaml</li></ul>`, related:['agent-sm','wf-create-story'] },
        { id:'wf-sprint-status', title:'Sprint Status', tags:['Sprint Status','스프린트 상태','BMM','Implementation','진행률','블로커','리스크'], content:`<h3>Sprint Status</h3><p>현재 스프린트 진행 상황을 분석하여 완료/진행/블로커 현황을 보고합니다.</p><ul><li><strong>명령어:</strong> <code>/bmad-bmm-sprint-status</code></li><li><strong>산출물:</strong> 상태 보고서</li></ul>`, related:['wf-sprint-planning'] },
        { id:'wf-create-story', title:'Create Story', tags:['Create Story','스토리 생성','Scrum Master','BMM','Implementation','DoR','인수 조건','태스크'], content:`<h3>Create Story</h3><p>에픽에서 개별 스토리를 추출하고 인수 조건, 기술 태스크, 의존성을 구체화하여 DoR 상태로 만듭니다.</p><ul><li><strong>에이전트:</strong> Scrum Master (Bob)</li><li><strong>명령어:</strong> <code>/bmad-bmm-create-story</code></li><li><strong>산출물:</strong> story-{slug}.md</li></ul>`, related:['agent-sm','wf-dev-story','wf-create-epics'] },
        { id:'wf-retrospective', title:'Retrospective', tags:['Retrospective','회고','Scrum Master','BMM','Implementation','잘한 점','개선점','액션 아이템'], content:`<h3>Retrospective</h3><p>완료된 에픽의 실행 과정을 회고합니다. 잘한 점/개선점/학습 사항 정리, 다음 에픽 액션 아이템을 도출합니다.</p><ul><li><strong>에이전트:</strong> Scrum Master (Bob)</li><li><strong>명령어:</strong> <code>/bmad-bmm-retrospective</code></li></ul>`, related:['agent-sm'] },
        { id:'wf-correct-course', title:'Correct Course', tags:['Correct Course','과정 수정','PM','Scrum Master','BMM','Implementation','변경 요청','영향도','파급 효과'], content:`<h3>Correct Course</h3><p>스프린트 중 변경 요청의 영향도를 분석하고 PRD/아키텍처/에픽에 대한 파급 효과를 평가합니다.</p><ul><li><strong>에이전트:</strong> PM + Scrum Master</li><li><strong>명령어:</strong> <code>/bmad-bmm-correct-course</code></li></ul>`, related:['agent-pm','agent-sm'] },
        // --- Quick Flow ---
        { id:'wf-quick-spec', title:'Quick Spec', tags:['Quick Spec','Quick Flow','Solo Dev','BMM','기술 사양서','tech-spec','아이디어','대화형'], content:`<h3>Quick Spec</h3><p>대화형으로 기술 사양서를 신속 작성합니다. 4단계: 이해→조사→생성→검토.</p><ul><li><strong>에이전트:</strong> Solo Dev (Barry)</li><li><strong>명령어:</strong> <code>/bmad-bmm-quick-spec</code></li><li><strong>산출물:</strong> tech-spec-{slug}.md</li></ul>`, related:['agent-solo-dev','wf-quick-dev','gs-planning-track'] },
        { id:'wf-quick-dev', title:'Quick Dev', tags:['Quick Dev','Quick Flow','Solo Dev','BMM','구현','자동 감지','코드'], content:`<h3>Quick Dev</h3><p>Quick Spec 기반 즉시 코드 구현. 기술 사양 모드와 직접 모드를 자동 감지합니다. 구현 후 자체 적대적 코드 리뷰를 진행합니다.</p><ul><li><strong>에이전트:</strong> Solo Dev (Barry)</li><li><strong>명령어:</strong> <code>/bmad-bmm-quick-dev</code></li><li><strong>산출물:</strong> 코드 + 테스트</li></ul>`, related:['agent-solo-dev','wf-quick-spec'] },
        // --- 테스트 ---
        { id:'wf-teach-testing', title:'Teach Me Testing', tags:['Teach Me Testing','교육','TEA','Murat','7세션','커리큘럼','퀴즈','학습'], content:`<h3>Teach Me Testing</h3><p>7세션 인터랙티브 교육. 수준 평가→커리큘럼 선택→세션 수강→퀴즈→수료.</p><ul><li><strong>에이전트:</strong> Murat (TEA)</li><li><strong>세션:</strong> 기초, 테스트 설계, API 테스트, E2E 테스트, CI/CD, 비기능 테스트, 고급 주제</li></ul>`, related:['agent-murat','mod-tea'] },
        { id:'wf-test-design', title:'Test Design', tags:['Test Design','테스트 설계','TEA','Murat','리스크 매트릭스','커버리지','QA 핸드오프'], content:`<h3>Test Design</h3><p>리스크 매트릭스와 테스트 가능성 분석 기반 에픽/시스템 수준 테스트 설계. 커버리지 계획을 수립합니다.</p><ul><li><strong>에이전트:</strong> Murat (TEA)</li><li><strong>산출물:</strong> 테스트 설계서, QA 핸드오프 문서</li></ul>`, related:['agent-murat','wf-test-framework'] },
        { id:'wf-test-framework', title:'Test Framework', tags:['Test Framework','테스트 프레임워크','TEA','Murat','Jest','Vitest','Playwright','스캐폴딩'], content:`<h3>Test Framework</h3><p>기술 스택에 맞는 테스트 프레임워크를 선택하고 프로덕션 수준 인프라를 스캐폴딩합니다.</p><ul><li><strong>에이전트:</strong> Murat (TEA)</li><li><strong>산출물:</strong> 테스트 디렉토리 구조, 설정 파일, 헬퍼/유틸리티</li></ul>`, related:['agent-murat','wf-test-design'] },
        { id:'wf-atdd', title:'ATDD', tags:['ATDD','인수 테스트','Red Phase','TEA','Murat','병렬','API 테스트','E2E 테스트'], content:`<h3>ATDD (Red Phase)</h3><p>인수 조건 기반 의도적으로 실패하는 API/E2E 테스트 생성. 병렬 서브프로세스로 동시 생성합니다.</p><ul><li><strong>에이전트:</strong> Murat (TEA)</li><li><strong>산출물:</strong> 실패하는 API/E2E 테스트 코드</li></ul>`, related:['agent-murat'] },
        { id:'wf-test-automation', title:'Test Automation', tags:['Test Automation','테스트 자동화','TEA','Murat','커버리지 갭','병렬'], content:`<h3>Test Automation</h3><p>기존 코드베이스의 커버리지 갭을 식별하고 API/E2E 테스트를 병렬 자동 생성합니다.</p><ul><li><strong>에이전트:</strong> Murat (TEA)</li><li><strong>산출물:</strong> 자동 생성 테스트, 커버리지 보고서</li></ul>`, related:['agent-murat','agent-qa'] },
        { id:'wf-test-review', title:'Test Review', tags:['Test Review','테스트 리뷰','TEA','Murat','결정론성','격리성','유지보수성','성능','품질 점수'], content:`<h3>Test Review</h3><p>기존 테스트의 4개 차원(결정론성/격리성/유지보수성/성능)을 병렬 평가. 0-100 종합 점수와 개선 권고 리포트를 생성합니다.</p><ul><li><strong>에이전트:</strong> Murat (TEA)</li><li><strong>산출물:</strong> 테스트 품질 리포트</li></ul>`, related:['agent-murat'] },
        { id:'wf-nfr-assess', title:'NFR Assessment', tags:['NFR','Non-Functional','비기능','TEA','Murat','보안','성능','신뢰성','확장성'], content:`<h3>NFR Assessment</h3><p>보안/성능/신뢰성/확장성 4개 차원 병렬 평가. 임계값 대비 달성도를 점수화합니다.</p><ul><li><strong>에이전트:</strong> Murat (TEA)</li><li><strong>산출물:</strong> NFR 평가 보고서</li></ul>`, related:['agent-murat'] },
        { id:'wf-ci-setup', title:'CI Setup', tags:['CI Setup','CI/CD','GitHub Actions','GitLab CI','Jenkins','Azure Pipelines','TEA','Murat','파이프라인','품질 게이트'], content:`<h3>CI Setup</h3><p>GitHub Actions, GitLab CI, Azure Pipelines, Jenkins, Harness 등 CI/CD 품질 게이트 파이프라인을 생성합니다.</p><ul><li><strong>에이전트:</strong> Murat (TEA)</li><li><strong>산출물:</strong> 파이프라인 설정 파일</li></ul>`, related:['agent-murat'] },
        { id:'wf-trace', title:'Trace', tags:['Trace','추적성','Traceability','TEA','Murat','요구사항','매트릭스'], content:`<h3>Trace</h3><p>요구사항-설계-구현-테스트 간 추적성(Traceability) 매핑을 생성합니다.</p><ul><li><strong>에이전트:</strong> Murat (TEA)</li><li><strong>산출물:</strong> 추적성 매트릭스</li></ul>`, related:['agent-murat'] },
        // --- 창의/혁신 ---
        { id:'wf-brainstorming', title:'Brainstorming', tags:['Brainstorming','브레인스토밍','CORE','Carson','CIS','SCAMPER','6 Thinking Hats','36개 기법','아이디어'], content:`<h3>Brainstorming</h3><p>7카테고리 36개 이상 창의적 기법. 4단계: 세션 설정→기법 선택→실행→정리.</p><ul><li><strong>에이전트:</strong> Carson (CIS) / Master (CORE)</li><li><strong>명령어:</strong> <code>/bmad-brainstorming</code></li><li><strong>산출물:</strong> brainstorming-report.md</li><li><strong>기법 선택:</strong> 사용자 선택 / AI 추천 / 랜덤 / 점진적 진행</li></ul>`, related:['agent-carson','agent-master','concept-brainstorming'] },
        { id:'wf-problem-solving', title:'Problem Solving', tags:['Problem Solving','문제 해결','CIS','Dr. Quinn','TRIZ','TOC','5 Whys','어골도','PDCA','근본 원인'], content:`<h3>Problem Solving</h3><p>TRIZ, TOC, 5 Whys, 어골도 등 체계적 방법론으로 근본 원인을 규명하고 PDCA 기반 실행 계획을 수립합니다.</p><ul><li><strong>에이전트:</strong> Dr. Quinn (CIS)</li><li><strong>산출물:</strong> 문제 해결 보고서, 실행 계획</li></ul>`, related:['agent-quinn-cis'] },
        { id:'wf-design-thinking', title:'Design Thinking', tags:['Design Thinking','디자인 씽킹','CIS','Maya','HCD','공감','프로토타입','5단계'], content:`<h3>Design Thinking</h3><p>공감→정의→아이디어→프로토타입→테스트 5단계 HCD. CSV 기반 방법론 DB에서 단계별 최적 기법을 선택합니다.</p><ul><li><strong>에이전트:</strong> Maya (CIS)</li><li><strong>산출물:</strong> 디자인 씽킹 결과물</li></ul>`, related:['agent-maya'] },
        { id:'wf-innovation-strategy', title:'Innovation Strategy', tags:['Innovation Strategy','혁신 전략','CIS','Victor','JTBD','블루오션','BMC','로드맵'], content:`<h3>Innovation Strategy</h3><p>JTBD, 블루오션, BMC 등으로 시장 기회를 발굴하고 단기/중기/장기 실행 로드맵을 수립합니다.</p><ul><li><strong>에이전트:</strong> Victor (CIS)</li><li><strong>산출물:</strong> 혁신 전략 보고서, 실행 로드맵</li></ul>`, related:['agent-victor'] },
        { id:'wf-storytelling', title:'Storytelling', tags:['Storytelling','스토리텔링','CIS','Sophia','영웅의 여정','픽사','감정 곡선','서사'], content:`<h3>Storytelling</h3><p>영웅의 여정, 픽사 스토리 등 프레임워크 기반 서사 구성. 감정 곡선 설계, 채널별 변형을 제공합니다.</p><ul><li><strong>에이전트:</strong> Sophia (CIS)</li><li><strong>산출물:</strong> 스토리 문서, 감정 곡선, 채널별 변형</li></ul>`, related:['agent-sophia'] },
        // --- 메타 빌드 ---
        { id:'wf-create-agent', title:'Create Agent', tags:['Create Agent','에이전트 생성','BMB','Bond','8단계','페르소나','커맨드','활성화'], content:`<h3>Create Agent</h3><p>8단계 가이드: 브레인스토밍→발견→메타데이터→페르소나→커맨드→활성화→빌드→완료. 20개 데이터/템플릿 파일로 레퍼런스 제공.</p><ul><li><strong>에이전트:</strong> Bond (BMB)</li></ul>`, related:['agent-bond','wf-edit-agent','wf-validate-agent'] },
        { id:'wf-edit-agent', title:'Edit Agent', tags:['Edit Agent','에이전트 편집','BMB','Bond','무결성','수정'], content:`<h3>Edit Agent</h3><p>기존 에이전트를 무결성 유지하며 수정하는 9단계 편집 워크플로우.</p><ul><li><strong>에이전트:</strong> Bond (BMB)</li></ul>`, related:['agent-bond'] },
        { id:'wf-validate-agent', title:'Validate Agent', tags:['Validate Agent','에이전트 검증','BMB','Bond','품질 보고서','5개 카테고리'], content:`<h3>Validate Agent</h3><p>메타데이터/페르소나/메뉴/구조/사이드카 5개 카테고리 검증 후 품질 보고서를 생성합니다.</p><ul><li><strong>에이전트:</strong> Bond (BMB)</li></ul>`, related:['agent-bond'] },
        { id:'wf-create-module-brief', title:'Create Module Brief', tags:['Module Brief','모듈 브리프','BMB','Morgan','14단계','비전','정체성'], content:`<h3>Create Module Brief</h3><p>14단계 대화형 프로세스로 모듈의 비전/정체성/사용자/가치/에이전트/워크플로우 구성을 정의합니다.</p><ul><li><strong>에이전트:</strong> Morgan (BMB)</li></ul>`, related:['agent-morgan','wf-create-module'] },
        { id:'wf-create-module', title:'Create Module', tags:['Create Module','모듈 생성','BMB','Morgan','7단계','폴더 구조','설정'], content:`<h3>Create Module</h3><p>제품 브리프 기반 7단계: 폴더 구조/설정/에이전트/워크플로우 포함 완전한 모듈을 생성합니다.</p><ul><li><strong>에이전트:</strong> Morgan (BMB)</li></ul>`, related:['agent-morgan','wf-create-module-brief'] },
        { id:'wf-edit-module', title:'Edit Module', tags:['Edit Module','모듈 편집','BMB','Morgan','일관성'], content:`<h3>Edit Module</h3><p>기존 모듈을 일관성 유지하며 수정하는 5단계 워크플로우.</p><ul><li><strong>에이전트:</strong> Morgan (BMB)</li></ul>`, related:['agent-morgan'] },
        { id:'wf-validate-module', title:'Validate Module', tags:['Validate Module','모듈 검증','BMB','Morgan','6개 카테고리','BMAD 규격'], content:`<h3>Validate Module</h3><p>파일 구조/설정/에이전트/워크플로우 6개 카테고리로 BMAD 규격 준수를 검증합니다.</p><ul><li><strong>에이전트:</strong> Morgan (BMB)</li></ul>`, related:['agent-morgan'] },
        { id:'wf-create-workflow', title:'Create Workflow', tags:['Create Workflow','워크플로우 생성','BMB','Wendy','신규','변환'], content:`<h3>Create Workflow</h3><p>신규 생성 또는 기존 콘텐츠 변환 두 경로를 지원합니다.</p><ul><li><strong>에이전트:</strong> Wendy (BMB)</li></ul>`, related:['agent-wendy'] },
        { id:'wf-edit-workflow', title:'Edit Workflow', tags:['Edit Workflow','워크플로우 편집','BMB','Wendy'], content:`<h3>Edit Workflow</h3><p>기존 워크플로우를 BMAD 규격 유지하며 업데이트합니다.</p><ul><li><strong>에이전트:</strong> Wendy (BMB)</li></ul>`, related:['agent-wendy'] },
        { id:'wf-validate-workflow', title:'Validate Workflow', tags:['Validate Workflow','워크플로우 검증','BMB','Wendy'], content:`<h3>Validate Workflow</h3><p>구조/스텝 연결/데이터 참조를 BMAD 표준에 따라 검증합니다.</p><ul><li><strong>에이전트:</strong> Wendy (BMB)</li></ul>`, related:['agent-wendy'] },
        { id:'wf-max-parallel', title:'Max Parallel Validate', tags:['Max Parallel','병렬 검증','BMB','Wendy','데이터 의존성'], content:`<h3>Max Parallel Validate</h3><p>최대 병렬 실행 모드에서의 데이터 의존성과 충돌을 검증합니다.</p><ul><li><strong>에이전트:</strong> Wendy (BMB)</li></ul>`, related:['agent-wendy'] },
        { id:'wf-rework-workflow', title:'Rework Workflow', tags:['Rework','레거시','V6','BMB','Wendy','재작업'], content:`<h3>Rework Workflow</h3><p>레거시 워크플로우를 BMAD V6 규격에 맞게 구조 변환/재설계합니다.</p><ul><li><strong>에이전트:</strong> Wendy (BMB)</li></ul>`, related:['agent-wendy'] },
        // --- 유틸리티 ---
        { id:'wf-help', title:'Help', tags:['Help','도움말','CORE','Master','카탈로그','CSV','워크플로우 검색'], content:`<h3>Help</h3><p>BMAD 전체 워크플로우 카탈로그를 CSV 기반으로 검색하여 적합한 워크플로우를 안내합니다.</p><ul><li><strong>에이전트:</strong> Master (CORE)</li><li><strong>명령어:</strong> <code>/bmad-help</code></li></ul>`, related:['agent-master','recipe-bmad-help'] },
        { id:'wf-index-docs', title:'Index Docs', tags:['Index Docs','문서 목차','CORE','Master','index.md','디렉토리'], content:`<h3>Index Docs</h3><p>지정 디렉토리 내 문서를 스캔하여 index.md를 자동 생성합니다.</p><ul><li><strong>명령어:</strong> <code>/bmad-index-docs</code></li></ul>`, related:['agent-master'] },
        { id:'wf-shard-doc', title:'Shard Doc', tags:['Shard Doc','문서 분할','CORE','Master','마크다운','H2'], content:`<h3>Shard Doc</h3><p>대형 마크다운 문서를 H2 기준으로 개별 파일로 분할합니다.</p><ul><li><strong>명령어:</strong> <code>/bmad-shard-doc</code></li></ul>`, related:['agent-master'] },
        { id:'wf-editorial-prose', title:'Editorial Prose', tags:['Editorial Prose','교열','CORE','Master','문법','어조','가독성'], content:`<h3>Editorial Prose</h3><p>문법/어조/명확성/가독성을 임상적 정밀도로 교정합니다. 원문 의도를 보존합니다.</p><ul><li><strong>명령어:</strong> <code>/bmad-editorial-review-prose</code></li></ul>`, related:['agent-master'] },
        { id:'wf-editorial-structure', title:'Editorial Structure', tags:['Editorial Structure','구조 편집','CORE','Master','재구성','단순화'], content:`<h3>Editorial Structure</h3><p>문서 전체 구조를 분석하여 불필요 섹션 제거, 재구성, 단순화를 제안합니다.</p><ul><li><strong>명령어:</strong> <code>/bmad-editorial-review-structure</code></li></ul>`, related:['agent-master'] },
        { id:'wf-adversarial-review', title:'Adversarial Review', tags:['Adversarial Review','적대적 리뷰','CORE','Master','논리 결함','모순','누락'], content:`<h3>Adversarial Review</h3><p>냉소적 시각으로 문서나 계획의 논리적 결함, 모순, 누락을 찾아냅니다.</p><ul><li><strong>명령어:</strong> <code>/bmad-review-adversarial-general</code></li></ul>`, related:['agent-master','concept-adversarial-review'] },
        { id:'wf-document-project', title:'Document Project', tags:['Document Project','프로젝트 문서화','BMM','Tech Writer','지식 베이스','CSV'], content:`<h3>Document Project</h3><p>CSV 정의 기반으로 코드베이스/아키텍처/API를 분석하여 AI 개발용 문서를 자동 구축합니다.</p><ul><li><strong>에이전트:</strong> Tech Writer (Paige)</li></ul>`, related:['agent-tech-writer'] },
        { id:'wf-generate-context', title:'Generate Context', tags:['Generate Context','프로젝트 컨텍스트','BMM','Tech Writer','project-context.md','코딩 규약'], content:`<h3>Generate Context</h3><p>기술 스택/코딩 규약/아키텍처 결정을 분석하여 AI 에이전트용 프로젝트 컨텍스트를 생성합니다.</p><ul><li><strong>에이전트:</strong> Tech Writer (Paige)</li><li><strong>명령어:</strong> <code>/bmad-bmm-generate-project-context</code></li><li><strong>산출물:</strong> project-context.md</li></ul>`, related:['agent-tech-writer','concept-project-context'] },
        { id:'wf-qa-automate', title:'QA Automate', tags:['QA Automate','테스트 자동화','BMM','QA Engineer','Quinn','API 테스트','E2E'], content:`<h3>QA Automate</h3><p>기존 소스 코드를 분석하여 표준 테스트 패턴 기반의 API 및 E2E 테스트를 자동 생성합니다.</p><ul><li><strong>에이전트:</strong> QA Engineer (Quinn)</li><li><strong>명령어:</strong> <code>/bmad-bmm-automate</code></li></ul>`, related:['agent-qa','mod-tea'] }
      ]
    },

    // ========================================================
    // 6. 커맨드 레퍼런스 (다음 파트에서 계속)
    // ========================================================
    {
      id: 'commands',
      title: '커맨드 레퍼런스',
      icon: 'terminal',
      items: [
        { id:'cmd-naming', title:'명령어 명명 규칙', tags:['명령어','명명 규칙','슬래시','커맨드','패턴'], content:`<h3>명명 규칙</h3><p>BMAD 슬래시 명령어는 3가지 패턴을 따릅니다.</p><table><tr><th>유형</th><th>패턴</th><th>예시</th></tr><tr><td>에이전트</td><td><code>bmad-agent-&lt;모듈&gt;-&lt;이름&gt;</code></td><td>/bmad-agent-bmm-dev</td></tr><tr><td>워크플로우</td><td><code>bmad-&lt;모듈&gt;-&lt;워크플로우&gt;</code></td><td>/bmad-bmm-create-prd</td></tr><tr><td>태스크/도구</td><td><code>bmad-&lt;이름&gt;</code></td><td>/bmad-help</td></tr></table><h3>모듈 코드</h3><ul><li><strong>bmm</strong> — Agile (소프트웨어 개발)</li><li><strong>bmb</strong> — Builder (메타 프로그래밍)</li><li><strong>tea</strong> — Test Architect</li><li><strong>cis</strong> — Creative Intelligence</li><li><strong>gds</strong> — Game Dev Studio</li></ul>`, related:['gs-install'] },
        { id:'cmd-agents', title:'에이전트 명령어 목록', tags:['에이전트 명령어','슬래시','Agent Command','로드'], content:`<h3>에이전트 명령어</h3><p>특정 역할을 가진 AI 페르소나를 로드합니다.</p><table><tr><th>명령어</th><th>에이전트</th><th>역할</th></tr><tr><td><code>/bmad-agent-bmm-dev</code></td><td>Amelia (Developer)</td><td>스토리 구현, 코드 리뷰</td></tr><tr><td><code>/bmad-agent-bmm-pm</code></td><td>John (PM)</td><td>PRD, 에픽, 과정 수정</td></tr><tr><td><code>/bmad-agent-bmm-architect</code></td><td>Winston (Architect)</td><td>아키텍처 설계</td></tr><tr><td><code>/bmad-agent-bmm-sm</code></td><td>Bob (Scrum Master)</td><td>스프린트, 스토리</td></tr><tr><td><code>/bmad-agent-bmm-analyst</code></td><td>Mary (Analyst)</td><td>리서치, 브리프</td></tr><tr><td><code>/bmad-agent-bmm-quick-flow</code></td><td>Barry (Solo Dev)</td><td>Quick Flow</td></tr></table>`, related:['cmd-naming'] },
        { id:'cmd-workflows', title:'워크플로우 명령어 목록', tags:['워크플로우 명령어','슬래시','Workflow Command'], content:`<h3>워크플로우 명령어</h3><table><tr><th>명령어</th><th>목적</th></tr><tr><td><code>/bmad-bmm-create-prd</code></td><td>PRD 생성</td></tr><tr><td><code>/bmad-bmm-validate-prd</code></td><td>PRD 검증</td></tr><tr><td><code>/bmad-bmm-create-architecture</code></td><td>아키텍처 설계</td></tr><tr><td><code>/bmad-bmm-create-epics-and-stories</code></td><td>에픽/스토리 생성</td></tr><tr><td><code>/bmad-bmm-check-implementation-readiness</code></td><td>구현 준비 검증</td></tr><tr><td><code>/bmad-bmm-create-story</code></td><td>스토리 생성</td></tr><tr><td><code>/bmad-bmm-dev-story</code></td><td>스토리 구현</td></tr><tr><td><code>/bmad-bmm-code-review</code></td><td>코드 리뷰</td></tr><tr><td><code>/bmad-bmm-quick-spec</code></td><td>Quick Spec</td></tr><tr><td><code>/bmad-bmm-quick-dev</code></td><td>Quick Dev</td></tr><tr><td><code>/bmad-bmm-sprint-planning</code></td><td>스프린트 계획</td></tr><tr><td><code>/bmad-bmm-correct-course</code></td><td>과정 수정</td></tr><tr><td><code>/bmad-bmm-retrospective</code></td><td>회고</td></tr><tr><td><code>/bmad-bmm-automate</code></td><td>QA 자동화</td></tr><tr><td><code>/bmad-bmm-create-ux-design</code></td><td>UX 디자인</td></tr><tr><td><code>/bmad-bmm-generate-project-context</code></td><td>프로젝트 컨텍스트</td></tr></table>`, related:['cmd-naming'] },
        { id:'cmd-tasks', title:'태스크/도구 명령어 목록', tags:['태스크 명령어','도구','슬래시','Task Command','help','shard','index','editorial'], content:`<h3>태스크/도구 명령어</h3><table><tr><th>명령어</th><th>목적</th></tr><tr><td><code>/bmad-help</code></td><td>지능형 가이드 (다음 단계 추천)</td></tr><tr><td><code>/bmad-brainstorming</code></td><td>브레인스토밍 세션</td></tr><tr><td><code>/bmad-party-mode</code></td><td>다중 에이전트 토론</td></tr><tr><td><code>/bmad-shard-doc</code></td><td>마크다운 파일 분할</td></tr><tr><td><code>/bmad-index-docs</code></td><td>문서 색인화</td></tr><tr><td><code>/bmad-editorial-review-prose</code></td><td>문장 교열</td></tr><tr><td><code>/bmad-editorial-review-structure</code></td><td>구조 편집</td></tr><tr><td><code>/bmad-review-adversarial-general</code></td><td>적대적 리뷰</td></tr></table>`, related:['cmd-naming'] },
        { id:'cmd-ide-paths', title:'IDE별 명령어 경로', tags:['IDE','Claude Code','Cursor','Windsurf','명령어 경로','.claude','.cursor'], content:`<h3>IDE별 명령어 저장 경로</h3><table><tr><th>IDE</th><th>경로</th></tr><tr><td>Claude Code</td><td><code>.claude/commands/</code></td></tr><tr><td>Cursor</td><td><code>.cursor/commands/</code></td></tr><tr><td>Windsurf</td><td><code>.windsurf/workflows/</code></td></tr><tr><td>Kiro</td><td><code>.kiro/</code> (스티어링 파일)</td></tr></table><p>설치 시 선택한 AI 도구에 맞춰 자동으로 파일이 배치됩니다.</p>`, related:['cmd-naming','gs-install'] }
      ]
    },

    // ========================================================
    // 7. 용어 모음집
    // ========================================================
    {
      id: 'glossary',
      title: '용어 모음집',
      icon: 'book',
      items: [
        { id: 'term-adr', term: 'ADR', full: 'Architecture Decision Record', def: '아키텍처 결정을 구조적으로 기록하는 문서 (배경, 선택지, 결정, 근거)' },
        { id: 'term-atdd', term: 'ATDD', full: 'Acceptance Test-Driven Development', def: '인수 조건을 먼저 테스트로 작성한 뒤 구현하는 개발 방법론' },
        { id: 'term-bmad', term: 'BMAD', full: 'Build More Architect Dreams', def: 'AI 에이전트 기반 소프트웨어 개발 프레임워크' },
        { id: 'term-bmb', term: 'BMB', full: 'Building Module Builder', def: 'BMAD 시스템 자체를 만드는 메타 프로그래밍 모듈' },
        { id: 'term-bmc', term: 'BMC', full: 'Business Model Canvas', def: '비즈니스 모델의 9개 핵심 요소를 한 장에 정리하는 전략 도구' },
        { id: 'term-bmm', term: 'BMM', full: 'Building Mood Maker', def: '소프트웨어 개발 수명주기 전체를 커버하는 BMAD 핵심 모듈' },
        { id: 'term-ci-cd', term: 'CI/CD', full: 'Continuous Integration / Continuous Delivery', def: '코드 변경을 자동으로 빌드, 테스트, 배포하는 파이프라인' },
        { id: 'term-cis', term: 'CIS', full: 'Creative Intelligence Suite', def: '창의적 혁신을 지원하는 BMAD 모듈 (디자인씽킹, 혁신전략 등)' },
        { id: 'term-dor', term: 'DoR', full: 'Definition of Ready', def: '사용자 스토리가 개발 착수 가능한 상태인지의 기준' },
        { id: 'term-e2e', term: 'E2E', full: 'End-to-End', def: '사용자 시나리오 전체를 처음부터 끝까지 검증하는 테스트' },
        { id: 'term-fr', term: 'FR', full: 'Functional Requirement', def: '시스템이 수행해야 하는 기능적 요구사항' },
        { id: 'term-gdd', term: 'GDD', full: 'Game Design Document', def: '게임의 메커니즘, 스토리, 아트 등을 정의하는 설계 문서' },
        { id: 'term-gds', term: 'GDS', full: 'Game Dev Studio', def: '게임 개발 전용 BMAD 확장 모듈' },
        { id: 'term-hcd', term: 'HCD', full: 'Human-Centered Design', def: '사용자 공감을 기반으로 한 인간 중심 디자인 방법론' },
        { id: 'term-jtbd', term: 'JTBD', full: 'Jobs To Be Done', def: '고객이 "해결하려는 작업" 관점에서 제품을 분석하는 프레임워크' },
        { id: 'term-nfr', term: 'NFR', full: 'Non-Functional Requirement', def: '성능, 보안, 확장성 등 비기능적 요구사항' },
        { id: 'term-pdca', term: 'PDCA', full: 'Plan-Do-Check-Act', def: '계획→실행→확인→조치의 지속적 개선 사이클' },
        { id: 'term-prd', term: 'PRD', full: 'Product Requirements Document', def: '제품의 기능 명세, 우선순위, 제약사항을 정의하는 요구사항 문서' },
        { id: 'term-scamper', term: 'SCAMPER', full: 'Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse', def: '7가지 변형 질문으로 아이디어를 발전시키는 브레인스토밍 기법' },
        { id: 'term-sdlc', term: 'SDLC', full: 'Software Development Life Cycle', def: '소프트웨어 개발 수명주기 (분석→설계→구현→테스트→배포)' },
        { id: 'term-sidecar', term: 'Sidecar', full: 'Sidecar YAML', def: '에이전트의 메타데이터(버전, 의존성, 설정)를 담는 YAML 파일' },
        { id: 'term-solutioning', term: 'Solutioning', full: 'Solutioning (Phase 3)', def: '"무엇을 만들 것인가"를 "어떻게 만들 것인가"로 번역하는 기술 설계 단계' },
        { id: 'term-tea', term: 'TEA', full: 'Test Engineering Architecture', def: '엔터프라이즈급 테스트 전략/자동화를 지원하는 BMAD 모듈' },
        { id: 'term-toc', term: 'TOC', full: 'Theory of Constraints', def: '시스템의 제약(병목)을 찾아 개선하는 경영 방법론' },
        { id: 'term-triz', term: 'TRIZ', full: 'Theory of Inventive Problem Solving', def: '40가지 발명 원리를 활용한 체계적 문제 해결 방법론' }
      ]
    },

    // ========================================================
    // 8. 레시피 (다음 파트에서 계속)
    // ========================================================
    {
      id: 'recipes',
      title: '레시피',
      icon: 'recipe',
      items: [
        { id:'recipe-new-project', title:'새 프로젝트 시작하기', tags:['새 프로젝트','시작','Analyst','PM','Architect','Scrum Master','Developer','전체 흐름','SDLC'], content:`<h3>새 프로젝트 시작하기</h3><h4>에이전트 흐름</h4><p>Analyst → PM → UX Designer → Architect → Scrum Master → Developer</p><h4>단계별 워크플로우</h4><ol><li><strong>Market/Domain/Technical Research</strong> — 시장 조사 (선택)</li><li><strong>Create Product Brief</strong> — 제품 브리프</li><li><strong>Create PRD</strong> — 상세 요구사항</li><li><strong>Create UX Design</strong> — UX 사양서 (선택)</li><li><strong>Create Architecture</strong> — 시스템 설계 + ADR</li><li><strong>Create Epics & Stories</strong> — 에픽/스토리 생성</li><li><strong>Check Readiness</strong> — 구현 준비 검증 (Go/No-Go)</li><li><strong>Sprint Planning → Create Story → Dev Story → Code Review</strong> — 구현 반복</li></ol><h4>산출물 체인</h4><pre><code>research → product-brief.md → PRD.md → ux-spec.md → architecture.md → epics/ → story-*.md → code</code></pre><div class="doc-tip"><p>각 워크플로우마다 반드시 새 채팅 세션을 시작하세요!</p></div>`, related:['gs-quickstart','concept-context-chaining','concept-new-chat'] },
        { id:'recipe-quick-flow', title:'빠른 프로토타입 만들기 (Quick Flow)', tags:['Quick Flow','프로토타입','Solo Dev','Barry','빠른','해커톤','PoC'], content:`<h3>빠른 프로토타입 (Quick Flow)</h3><h4>에이전트</h4><p>Solo Dev (Barry) 단독 처리</p><h4>워크플로우</h4><ol><li><strong>Quick Spec</strong> — 대화형 사양서 작성 (이해→조사→생성→검토)</li><li><strong>Quick Dev</strong> — 즉시 구현 (새 채팅에서)</li><li><strong>Code Review</strong> — 선택적 품질 검증</li></ol><h4>적합한 상황</h4><ul><li>버그 수정, 리팩토링, 소규모 기능</li><li>해커톤, PoC, 빠른 검증</li><li>한 명이 전체 범위를 파악 가능한 작업</li></ul><h4>에스컬레이션</h4><p>작업이 예상보다 커지면 Barry가 자동으로 BMad Method 전환을 제안합니다.</p>`, related:['agent-solo-dev','wf-quick-spec','wf-quick-dev','gs-planning-track'] },
        { id:'recipe-test-system', title:'테스트 체계 구축하기', tags:['테스트','TEA','Murat','프레임워크','ATDD','자동화','CI/CD','Quinn','품질'], content:`<h3>테스트 체계 구축</h3><h4>에이전트</h4><p>Murat (TEA) 단독 처리. 소규모는 Quinn (BMM)으로 대체 가능.</p><h4>워크플로우</h4><ol><li><strong>Test Framework</strong> — 테스트 인프라 스캐폴딩</li><li><strong>Test Design</strong> — 리스크 기반 테스트 전략</li><li><strong>ATDD</strong> — 인수 테스트 Red Phase 생성</li><li><strong>Test Automation</strong> — 기존 코드 커버리지 확장</li><li><strong>CI Setup</strong> — CI/CD 품질 게이트</li><li><strong>Test Review</strong> — 품질 평가 (0-100 점수)</li></ol><h4>Quinn vs TEA 선택</h4><table><tr><th></th><th>Quinn</th><th>TEA</th></tr><tr><td>규모</td><td>소~중</td><td>대/엔터프라이즈</td></tr><tr><td>설치</td><td>불필요</td><td>별도 설치</td></tr><tr><td>추적성</td><td>없음</td><td>있음</td></tr></table>`, related:['agent-murat','agent-qa','mod-tea'] },
        { id:'recipe-new-module', title:'새 BMAD 모듈 만들기', tags:['새 모듈','BMB','Morgan','Bond','Wendy','모듈 생성','에이전트 생성','워크플로우 생성'], content:`<h3>새 BMAD 모듈 만들기</h3><h4>에이전트 흐름</h4><p>Morgan → Bond → Wendy</p><h4>워크플로우</h4><ol><li><strong>Create Module Brief</strong> — 14단계 대화형 모듈 브리프</li><li><strong>Create Module</strong> — 폴더 구조/설정 생성</li><li><strong>Create Agent × N</strong> — 에이전트 생성</li><li><strong>Create Workflow × N</strong> — 워크플로우 생성</li><li><strong>Validate Module</strong> — 모듈 검증</li><li><strong>Validate Agent / Validate Workflow</strong> — 개별 검증</li></ol><h4>산출물</h4><p>모듈 브리프 → 완전한 모듈 디렉토리 (config.yaml + agents/ + workflows/)</p>`, related:['agent-morgan','agent-bond','agent-wendy','mod-bmb'] },
        { id:'recipe-brainstorm', title:'브레인스토밍 & 혁신 전략', tags:['브레인스토밍','혁신','CIS','Carson','Dr. Quinn','Maya','Victor','Sophia','워크숍'], content:`<h3>브레인스토밍 & 혁신 전략</h3><h4>에이전트 흐름 (필요에 따라 선택)</h4><p>Carson → Dr. Quinn → Maya → Victor → Sophia</p><h4>워크플로우</h4><ol><li><strong>Brainstorming</strong> — 아이디어 발산 (36개 기법)</li><li><strong>Problem Solving</strong> — 문제 구조화/해결 (TRIZ, 5 Whys)</li><li><strong>Design Thinking</strong> — 사용자 중심 설계 (5단계 HCD)</li><li><strong>Innovation Strategy</strong> — 시장 전략 수립 (JTBD, 블루오션)</li><li><strong>Storytelling</strong> — 스토리 구성, 프레젠테이션 준비</li></ol><h4>적합한 상황</h4><p>신사업 기획, 제품 리뉴얼, 팀 워크숍</p>`, related:['agent-carson','concept-brainstorming','mod-cis'] },
        { id:'recipe-existing-project', title:'기존 프로젝트에 BMAD 도입하기', tags:['기존 프로젝트','도입','마이그레이션','Established Projects','Generate Context'], content:`<h3>기존 프로젝트에 BMAD 도입</h3><h4>단계</h4><ol><li><strong>설치</strong> — <code>npx bmad-method install</code></li><li><strong>Generate Context</strong> — <code>/bmad-bmm-generate-project-context</code>로 기존 패턴 발견</li><li><strong>bmad-help</strong> — <code>/bmad-help</code>로 현재 상태 확인</li><li><strong>점진적 적용</strong> — 새 기능부터 BMAD 워크플로우 적용</li></ol><h4>팁</h4><ul><li>기존 코드를 한 번에 BMAD 방식으로 변환하지 마세요</li><li>새 기능/에픽부터 PRD → Architecture → Dev Story 흐름을 시작하세요</li><li><code>project-context.md</code>를 먼저 생성하면 에이전트가 기존 패턴을 존중합니다</li></ul>`, related:['gs-install','concept-project-context','wf-generate-context'] },
        { id:'recipe-customize', title:'에이전트 커스터마이징', tags:['커스터마이징','customize.yaml','에이전트 수정','페르소나','메모리','메뉴','이름 변경'], content:`<h3>에이전트 커스터마이징</h3><h4>.customize.yaml 파일</h4><p><code>_bmad/_config/agents/</code> 디렉토리에 각 에이전트별 커스터마이징 파일이 있습니다.</p><h4>수정 가능 항목</h4><table><tr><th>섹션</th><th>동작</th><th>용도</th></tr><tr><td>agent.metadata</td><td>대체</td><td>에이전트 표시명 변경</td></tr><tr><td>persona</td><td>대체</td><td>역할, 정체성, 소통 스타일</td></tr><tr><td>memories</td><td>추가</td><td>지속적 맥락 정보</td></tr><tr><td>menu</td><td>추가</td><td>커스텀 메뉴 항목</td></tr><tr><td>critical_actions</td><td>추가</td><td>시작 시 명령어</td></tr><tr><td>prompts</td><td>추가</td><td>재사용 프롬프트</td></tr></table><h4>적용</h4><pre><code>npx bmad-method install → "Recompile Agents" 선택</code></pre><p>업데이트 후에도 커스터마이징 내용은 보존됩니다.</p>`, related:['gs-install'] },
        { id:'recipe-bmad-help', title:'막혔을 때: bmad-help 활용법', tags:['bmad-help','도움말','막힘','다음 단계','상태 확인','가이드'], content:`<h3>막혔을 때: bmad-help</h3><h4>사용법</h4><pre><code>/bmad-help              ← 전체 상태 확인 + 다음 단계 추천
/bmad-help [질문]       ← 특정 질문에 대한 답변</code></pre><h4>bmad-help가 하는 일</h4><ul><li><strong>프로젝트 검사</strong> — 완료된 산출물 확인 (PRD.md 존재? architecture.md 존재?)</li><li><strong>모듈 확인</strong> — 설치된 모듈 기반 사용 가능 옵션 제시</li><li><strong>다음 단계 추천</strong> — "PRD는 있지만 아키텍처가 없네요 → Create Architecture를 추천합니다"</li></ul><h4>활용 시기</h4><ul><li>처음 설치 후 뭘 해야 할지 모를 때</li><li>워크플로우 완료 후 다음이 뭔지 모를 때</li><li>어떤 에이전트/워크플로우를 써야 할지 모를 때</li></ul>`, related:['wf-help','gs-quickstart'] }
      ]
    }
  ]
};
