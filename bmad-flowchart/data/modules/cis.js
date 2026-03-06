// BMAD Module: cis
window.BMAD_MODULES = window.BMAD_MODULES || [];
window.BMAD_MODULES.push(
{
  id: 'cis',
  name: 'Creative Innovation Strategy',
  shortName: 'CIS',
  description: '창의적 혁신 - 문제 해결, 디자인 씽킹, 혁신 전략, 스토리텔링',
  color: '#06b6d4',
  colorRgb: '6, 182, 212',
  configFile: '_bmad/cis/config.yaml',
  agents: [
    {
      id: 'cis-carson', name: 'Carson', fullName: 'Brainstorming Coach',
      role: '마스터 브레인스토밍 퍼실리테이터',
      description: '20년 경력의 브레인스토밍 퍼실리테이터. "YES AND" 화법과 심리적 안전감 조성을 통해 창의적 아이디어 발상을 이끌며, 다양한 기법과 그룹 역학으로 세션을 구조적으로 진행한다.',
      agentFile: '_bmad/cis/agents/brainstorming-coach.md',
      workflows: ['core-brainstorming']
    },
    {
      id: 'cis-quinn', name: 'Dr. Quinn', fullName: 'Creative Problem Solver',
      role: '체계적 문제 해결 전문가',
      description: '전직 항공우주 엔지니어 출신 문제 해결 전문가. TRIZ·제약 이론(TOC)·시스템 사고로 복잡한 난제를 해결하며, 5 Whys·어골도로 근본 원인을 규명하고 PDCA 기반 실행 계획을 수립한다.',
      agentFile: '_bmad/cis/agents/creative-problem-solver.md',
      workflows: ['cis-problem-solving']
    },
    {
      id: 'cis-maya', name: 'Maya', fullName: 'Design Thinking Coach',
      role: '디자인 씽킹 마에스트로',
      description: '포춘 500대 기업과 스타트업을 아우른 인간 중심 디자인(HCD) 전문가. 공감→정의→아이디어→프로토타입→테스트의 전 과정을 가이드하며, 반복적 설계로 실질적 해결책을 창출한다.',
      agentFile: '_bmad/cis/agents/design-thinking-coach.md',
      workflows: ['cis-design-thinking']
    },
    {
      id: 'cis-victor', name: 'Victor', fullName: 'Innovation Strategist',
      role: '파괴적 혁신 예언가',
      description: '전직 맥킨지 컨설턴트 출신의 파괴적 혁신 전략가. JTBD·블루오션·비즈니스 모델 캔버스로 시장 기회를 발굴하고, 시장 분석부터 단기·중기·장기 실행 로드맵까지 전략의 전 단계를 커버한다.',
      agentFile: '_bmad/cis/agents/innovation-strategist.md',
      workflows: ['cis-innovation-strategy']
    },
    {
      id: 'cis-caravaggio', name: 'Caravaggio', fullName: 'Presentation Master',
      role: '시각 커뮤니케이션 전문가',
      description: 'TED·투자 유치 프레젠테이션 수천 건을 분석한 시각 커뮤니케이션 전문가. 시각적 위계와 청중 심리학을 바탕으로 슬라이드 데크·피치 데크·유튜브 설명 자료를 전문 제작한다.',
      agentFile: '_bmad/cis/agents/presentation-master.md',
      workflows: []
    },
    {
      id: 'cis-sophia', name: 'Sophia', fullName: 'Storyteller',
      role: '마스터 스토리텔러',
      description: '50년 경력의 마스터 스토리텔러. 영웅의 여정·픽사 스토리 등 프레임워크로 감동적인 서사를 완성하며, 감정 곡선 설계부터 채널별 변형 버전과 톤앤매너 가이드까지 제공한다.',
      agentFile: '_bmad/cis/agents/storyteller/storyteller.md',
      workflows: ['cis-storytelling']
    }
  ],
  workflows: [
    {
      id: 'cis-problem-solving', name: 'Problem Solving',
      description: 'TRIZ, 제약 이론(TOC), 5 Whys, 어골도 등 체계적 방법론으로 복잡한 문제의 근본 원인을 규명하고, PDCA 기반의 실행 계획을 수립한다.',
      workflowFile: '_bmad/cis/workflows/problem-solving/workflow.yaml',
      files: [
        { path: 'instructions.md', type: 'md', purpose: 'TRIZ, 5 Whys, 어골도, TOC 등 방법론 선택과 PDCA 실행 계획 수립 절차를 정의한 문제 해결 가이드' },
        { path: 'template.md', type: 'md', purpose: '문제 정의, 근본 원인 분석, 해결안 평가, 실행 계획을 구조화하는 결과물 마크다운 템플릿' },
        { path: 'solving-methods.csv', type: 'csv', purpose: '카테고리별 문제 해결 방법론(TRIZ, 5 Whys, 시스템 사고 등)의 이름, 적용 상황, 절차를 정리한 CSV DB' }
      ]
    },
    {
      id: 'cis-design-thinking', name: 'Design Thinking',
      description: '공감→정의→아이디어→프로토타입→테스트의 5단계 인간 중심 설계(HCD) 프로세스를 가이드한다. CSV 기반 방법론 DB에서 각 단계별 최적 기법을 선택한다.',
      workflowFile: '_bmad/cis/workflows/design-thinking/workflow.yaml',
      files: [
        { path: 'instructions.md', type: 'md', purpose: '공감→정의→아이디어→프로토타입→테스트 5단계별 진행 방법과 기법 선택을 정의한 HCD 가이드' },
        { path: 'template.md', type: 'md', purpose: '페르소나, 문제 정의문, 아이디어 맵, 프로토타입 계획을 기록하는 디자인 씽킹 결과물 템플릿' },
        { path: 'design-methods.csv', type: 'csv', purpose: '5단계별 적용 가능한 디자인 기법(인터뷰, 어피니티 맵, 프로토타이핑 등)의 명칭, 설명, 소요 시간 DB' }
      ]
    },
    {
      id: 'cis-innovation-strategy', name: 'Innovation Strategy',
      description: 'JTBD, 블루오션 전략, 비즈니스 모델 캔버스 등 프레임워크로 시장 기회를 발굴하고, 단기·중기·장기 실행 로드맵을 포함한 혁신 전략을 수립한다.',
      workflowFile: '_bmad/cis/workflows/innovation-strategy/workflow.yaml',
      files: [
        { path: 'instructions.md', type: 'md', purpose: 'JTBD, 블루오션, BMC 등 프레임워크 선택과 단기·중기·장기 로드맵 수립 절차를 정의한 혁신 전략 가이드' },
        { path: 'template.md', type: 'md', purpose: '시장 기회 분석, 가치 제안, 비즈니스 모델, 실행 로드맵을 구조화하는 혁신 전략 결과물 템플릿' },
        { path: 'innovation-frameworks.csv', type: 'csv', purpose: 'JTBD, 블루오션, BMC, 린 스타트업 등 혁신 프레임워크의 명칭, 적용 상황, 핵심 도구를 정리한 CSV DB' }
      ]
    },
    {
      id: 'cis-storytelling', name: 'Storytelling',
      description: '영웅의 여정, 픽사 스토리 등 검증된 서사 프레임워크로 감동적인 스토리를 구성한다. 감정 곡선 설계, 채널별 변형 버전, 톤앤매너 가이드를 포함한다.',
      workflowFile: '_bmad/cis/workflows/storytelling/workflow.yaml',
      files: [
        { path: 'instructions.md', type: 'md', purpose: '영웅의 여정, 픽사 스토리 등 프레임워크 선택과 감정 곡선 설계 절차를 정의한 스토리텔링 가이드' },
        { path: 'template.md', type: 'md', purpose: '서사 구조, 캐릭터 아크, 감정 곡선, 채널별 변형 버전을 기록하는 스토리텔링 결과물 템플릿' },
        { path: 'story-types.csv', type: 'csv', purpose: '영웅의 여정, 3막 구조, 픽사 스토리 등 서사 프레임워크의 명칭, 구조, 적용 사례를 정리한 CSV DB' }
      ]
    }
  ]
}
);
