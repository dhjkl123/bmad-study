// BMAD Module: core
window.BMAD_MODULES = window.BMAD_MODULES || [];
window.BMAD_MODULES.push(
{
  id: 'core',
  name: 'BMAD Core',
  shortName: 'CORE',
  description: 'BMAD 시스템의 핵심 기능 - 브레인스토밍, 파티 모드, 유틸리티 태스크',
  color: '#10b981',
  colorRgb: '16, 185, 129',
  configFile: '_bmad/core/config.yaml',
  agents: [
    {
      id: 'core-master',
      name: 'Master',
      fullName: 'bmad-master',
      role: 'Master Task Executor',
      description: 'BMAD Core의 중앙 허브 에이전트. 설정 파일을 로드하고 메뉴 기반 인터페이스로 브레인스토밍, 파티 모드, 문서 편집/분할/인덱싱, 적대적 검토 등 8개 워크플로우를 동적으로 라우팅한다.',
      agentFile: '_bmad/core/agents/bmad-master.md',
      workflows: ['core-brainstorming', 'core-party-mode', 'core-help', 'core-index-docs', 'core-shard-doc', 'core-editorial-prose', 'core-editorial-structure', 'core-review-adversarial']
    }
  ],
  workflows: [
    {
      id: 'core-brainstorming', name: 'Brainstorming',
      description: '7가지 카테고리 36개 이상의 창의적 기법(SCAMPER, 6 Thinking Hats 등)을 사용하여 구조화된 브레인스토밍 세션을 진행한다. 세션 설정→기법 선택→실행→정리의 4단계 프로세스로 아이디어를 발상하고 조직화한다.',
      workflowFile: '_bmad/core/workflows/brainstorming/workflow.md',
      files: [
        { path: 'steps/step-01-session-setup.md', type: 'md', purpose: '세션 모드(단독/그룹) 선택과 주제 설정, 브레인스토밍 규칙 안내를 수행하는 시작 단계',
          children: [
            { path: 'steps/step-01b-continue.md', type: 'md', purpose: '이전에 중단된 브레인스토밍 세션을 이어서 진행하기 위한 컨텍스트 복원 단계' }
          ]
        },
        { path: 'steps/step-02a-user-selected.md', type: 'md', purpose: '사용자가 36개 기법 목록에서 직접 원하는 브레인스토밍 기법을 선택하는 경로' },
        { path: 'steps/step-02b-ai-recommended.md', type: 'md', purpose: 'AI가 주제 분석 후 최적의 브레인스토밍 기법을 추천하는 경로' },
        { path: 'steps/step-02c-random-selection.md', type: 'md', purpose: '무작위로 브레인스토밍 기법을 선택하여 예상치 못한 접근법을 시도하는 경로' },
        { path: 'steps/step-02d-progressive-flow.md', type: 'md', purpose: '쉬운 기법에서 복잡한 기법으로 단계적으로 진행하는 가이드 경로' },
        { path: 'steps/step-03-technique-execution.md', type: 'md', purpose: '선택된 브레인스토밍 기법의 구체적 실행 절차와 퍼실리테이션 가이드' },
        { path: 'steps/step-04-idea-organization.md', type: 'md', purpose: '발산된 아이디어를 카테고리별로 분류하고 우선순위를 매겨 실행 가능한 형태로 정리' },
        { path: 'template.md', type: 'md', purpose: '브레인스토밍 세션 결과물을 구조화된 형식으로 기록하는 마크다운 템플릿' },
        { path: 'brain-methods.csv', type: 'csv', purpose: '7개 카테고리(발산, 수렴, 시각적 등) 36개 이상 기법의 이름, 설명, 참가자 수, 소요 시간 데이터베이스' }
      ]
    },
    {
      id: 'core-party-mode', name: 'Party Mode',
      description: '여러 AI 에이전트를 동시에 소환하여 가상 그룹 토론을 진행하는 오케스트레이션 모드. 토론 규칙 설정, 발언 순서 관리, 합의점 도출 등을 자동으로 조율하며 우아한 종료 프로세스를 지원한다.',
      workflowFile: '_bmad/core/workflows/party-mode/workflow.md',
      files: [
        { path: 'steps/step-02-discussion-orchestration.md', type: 'md', purpose: '다중 에이전트 간 발언 순서, 토론 규칙, 합의 도출 메커니즘을 관리하는 오케스트레이션 로직' },
        { path: 'steps/step-03-graceful-exit.md', type: 'md', purpose: '토론 세션의 결론 도출, 합의점 요약, 후속 액션 정리를 수행하는 종료 프로세스' }
      ]
    },
    {
      id: 'core-help', name: 'Help',
      description: 'BMAD 시스템의 전체 워크플로우 카탈로그를 CSV 기반으로 관리하며, 사용자가 적합한 워크플로우를 찾을 수 있도록 카테고리별 안내와 실행 가이드를 제공한다.',
      workflowFile: '_bmad/core/tasks/help.md',
      files: [
        { path: '_bmad/_config/bmad-help.csv', type: 'csv', purpose: 'BMAD 전체 워크플로우의 이름, 설명, 소속 모듈, 실행 방법을 정리한 CSV 카탈로그' }
      ]
    },
    {
      id: 'core-index-docs', name: 'Index Docs',
      description: '지정된 디렉토리 내 모든 문서 파일을 스캔하여 목차 형태의 index.md를 자동 생성한다. XML 기반 태스크로 파일 구조와 설명을 체계적으로 정리한다.',
      workflowFile: '_bmad/core/tasks/index-docs.xml',
      files: []
    },
    {
      id: 'core-shard-doc', name: 'Shard Doc',
      description: '대형 마크다운 문서를 H2 기준으로 개별 파일로 자동 분할(Sharding)하는 XML 기반 유틸리티. 원본 구조를 보존하면서 관리 가능한 크기의 파일로 나눈다.',
      workflowFile: '_bmad/core/tasks/shard-doc.xml',
      files: []
    },
    {
      id: 'core-editorial-prose', name: 'Editorial Prose',
      description: '임상적 정밀도로 문서의 문법, 어조, 명확성, 가독성을 교정하는 XML 기반 교열 태스크. 원문의 의도를 보존하면서 표현을 개선한다.',
      workflowFile: '_bmad/core/tasks/editorial-review-prose.xml',
      files: []
    },
    {
      id: 'core-editorial-structure', name: 'Editorial Structure',
      description: '문서의 전체 구조를 분석하여 불필요한 섹션 제거, 재구성, 단순화를 제안하는 XML 기반 구조 편집 태스크. 이해도를 유지하면서 분량을 줄인다.',
      workflowFile: '_bmad/core/tasks/editorial-review-structure.xml',
      files: []
    },
    {
      id: 'core-review-adversarial', name: 'Adversarial Review',
      description: '냉소적 시각으로 문서나 계획의 논리적 결함, 모순, 누락을 찾아내는 적대적 검토 태스크. 방어할 수 없는 약점을 사전에 발견하여 품질을 강화한다.',
      workflowFile: '_bmad/core/tasks/review-adversarial-general.xml',
      files: []
    }
  ]
}
);
