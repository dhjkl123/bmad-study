// BMAD Module: bmm
window.BMAD_MODULES = window.BMAD_MODULES || [];
window.BMAD_MODULES.push(
{
  id: 'bmm',
  name: 'Building Mood Maker',
  shortName: 'BMM',
  description: '소프트웨어 개발 수명 주기 전체 - 분석, 설계, 구현, QA',
  color: '#f59e0b',
  colorRgb: '245, 158, 11',
  configFile: '_bmad/bmm/config.yaml',
  agents: [
    {
      id: 'bmm-analyst', name: 'Analyst', fullName: 'Strategic Analyst',
      role: '전략적 비즈니스 분석가',
      description: '전략적 비즈니스 분석가로서 시장·도메인·기술 조사를 수행하고, 수집된 인사이트를 바탕으로 요구사항을 구체화하며 제품 브리프 작성을 지원한다.',
      agentFile: '_bmad/bmm/agents/analyst.md',
      workflows: ['bmm-market-research', 'bmm-domain-research', 'bmm-technical-research', 'bmm-create-product-brief']
    },
    {
      id: 'bmm-architect', name: 'Architect', fullName: 'System Architect',
      role: '시스템 아키텍트',
      description: '분산 시스템·클라우드 인프라·API 설계 전문가. AI 에이전트 간 일관성을 보장하는 아키텍처 문서를 작성하고, 구현 착수 전 PRD·에픽·스토리의 정렬을 적대적 방식으로 검증한다.',
      agentFile: '_bmad/bmm/agents/architect.md',
      workflows: ['bmm-create-architecture', 'bmm-check-readiness']
    },
    {
      id: 'bmm-developer', name: 'Developer', fullName: 'Senior Engineer',
      role: '시니어 소프트웨어 엔지니어',
      description: '승인된 사용자 스토리를 엄격한 표준에 따라 구현하고 인수 조건을 검증한다. 코드 품질·보안·테스트 커버리지를 적대적 시니어 개발자 관점으로 심층 리뷰한다.',
      agentFile: '_bmad/bmm/agents/dev.md',
      workflows: ['bmm-dev-story', 'bmm-code-review']
    },
    {
      id: 'bmm-pm', name: 'PM', fullName: 'Product Manager',
      role: '제품 관리자',
      description: '사용자 인터뷰와 요구사항 발견을 통해 PRD를 작성·검증하고, PRD와 아키텍처 기반으로 구현 가능한 에픽·스토리를 생성한다. 스프린트 중 변경 요청의 영향도를 분석하여 과정을 수정한다.',
      agentFile: '_bmad/bmm/agents/pm.md',
      workflows: ['bmm-create-prd', 'bmm-validate-prd', 'bmm-edit-prd', 'bmm-create-epics', 'bmm-check-readiness', 'bmm-correct-course']
    },
    {
      id: 'bmm-qa', name: 'QA Engineer', fullName: 'QA Engineer',
      role: 'QA 엔지니어',
      description: '기존 기능의 소스 코드를 분석하여 표준 테스트 패턴 기반의 API 및 E2E 테스트를 신속하게 자동 생성한다. 수동 작성 없이 빠르게 테스트 커버리지를 확보하는 데 특화되어 있다.',
      agentFile: '_bmad/bmm/agents/qa.md',
      workflows: ['bmm-qa-automate']
    },
    {
      id: 'bmm-solo', name: 'Solo Dev', fullName: 'Quick Flow Solo Dev',
      role: '엘리트 풀스택 개발자',
      description: 'Quick Flow 전담 엘리트 풀스택 개발자. 대화형으로 기술 사양서를 작성하고 즉시 구현까지 연결하며, 아이디어에서 동작하는 코드까지를 빠르고 효율적으로 단독 처리한다.',
      agentFile: '_bmad/bmm/agents/quick-flow-solo-dev.md',
      workflows: ['bmm-quick-spec', 'bmm-quick-dev', 'bmm-code-review']
    },
    {
      id: 'bmm-sm', name: 'Scrum Master', fullName: 'Scrum Master',
      role: '테크니컬 스크럼 마스터',
      description: '테크니컬 스크럼 마스터로서 스프린트 계획, 에픽에서 개발 준비 완료 스토리 생성, 에픽 회고를 통해 팀의 애자일 세레모니를 지원하고 진행 상황을 추적 관리한다.',
      agentFile: '_bmad/bmm/agents/sm.md',
      workflows: ['bmm-sprint-planning', 'bmm-create-story', 'bmm-retrospective', 'bmm-correct-course']
    },
    {
      id: 'bmm-writer', name: 'Tech Writer', fullName: 'Technical Writer',
      role: '기술 문서 전문가',
      description: '기존 코드베이스와 아키텍처를 분석하여 AI 개발에 필요한 참조 문서와 지식 베이스를 구축한다. 다이어그램 생성, 문서 검증, 기술 개념 설명 등 다양한 문서화 작업을 대화형으로 수행한다.',
      agentFile: '_bmad/bmm/agents/tech-writer/tech-writer.md',
      workflows: ['bmm-document-project', 'bmm-generate-context']
    },
    {
      id: 'bmm-ux', name: 'UX Designer', fullName: 'UX Designer',
      role: 'UX 디자이너',
      description: '시각적 탐색과 협업적 의사결정을 통해 애플리케이션의 UX 패턴과 룩 앤 필을 정의하는 UX 전문가. 구현 팀이 즉시 활용할 수 있는 UX 사양서를 최종 산출물로 작성한다.',
      agentFile: '_bmad/bmm/agents/ux-designer.md',
      workflows: ['bmm-create-ux']
    }
  ],
  workflows: [
    // --- Analysis ---
    {
      id: 'bmm-market-research', name: 'Market Research',
      description: '타겟 시장의 규모, 경쟁 환경, 트렌드, 기회를 체계적으로 분석하는 포괄적 시장 조사 워크플로우. 조사 결과물 템플릿을 기반으로 구조화된 리포트를 생성한다.', category: 'Analysis',
      workflowFile: '_bmad/bmm/workflows/1-analysis/research/workflow-market-research.md',
      files: [
        { path: 'research.template.md', type: 'md', purpose: '시장 규모, 경쟁사, 트렌드, 기회 영역을 구조화하여 기록하는 조사 결과물 마크다운 템플릿' },
        { path: 'market-steps/step-01-init.md', type: 'md', purpose: '조사 범위와 타겟 시장을 정의하고 데이터 수집 전략을 수립하는 초기화 단계' }
      ]
    },
    {
      id: 'bmm-domain-research', name: 'Domain Research',
      description: '특정 도메인/산업의 핵심 개념, 규제, 기술 동향, 주요 플레이어를 심층 분석하는 워크플로우. 도메인 전문 지식을 체계적으로 수집하여 제품 설계의 기반을 마련한다.', category: 'Analysis',
      workflowFile: '_bmad/bmm/workflows/1-analysis/research/workflow-domain-research.md',
      files: [
        { path: 'research.template.md', type: 'md', purpose: '도메인 핵심 개념, 규제 환경, 기술 동향, 주요 플레이어를 정리하는 도메인 조사 마크다운 템플릿' },
        { path: 'domain-steps/step-01-init.md', type: 'md', purpose: '도메인 범위를 설정하고 조사 대상 영역(규제, 기술, 시장)을 정의하는 초기화 단계' }
      ]
    },
    {
      id: 'bmm-technical-research', name: 'Technical Research',
      description: '기술 스택, 프레임워크, 라이브러리의 장단점을 비교 분석하고 프로젝트에 적합한 기술 선택을 지원하는 기술 조사 워크플로우.', category: 'Analysis',
      workflowFile: '_bmad/bmm/workflows/1-analysis/research/workflow-technical-research.md',
      files: [
        { path: 'research.template.md', type: 'md', purpose: '기술 스택, 프레임워크, 라이브러리의 장단점 비교를 구조화하는 기술 조사 마크다운 템플릿' },
        { path: 'technical-steps/step-01-init.md', type: 'md', purpose: '기술 조사 목적과 평가 기준을 설정하고 후보 기술 목록을 초기 구성하는 단계' }
      ]
    },
    {
      id: 'bmm-create-product-brief', name: 'Create Product Brief',
      description: '시장/도메인/기술 조사 결과를 종합하여 제품의 비전, 목표 사용자, 핵심 기능, 성공 지표를 정의하는 제품 브리프를 작성한다.', category: 'Analysis',
      workflowFile: '_bmad/bmm/workflows/1-analysis/create-product-brief/workflow.md',
      files: [
        { path: 'steps/step-01-init.md', type: 'md', purpose: '조사 결과를 종합하여 제품 비전, 목표 사용자, 핵심 기능 후보를 정의하는 브리프 작성 시작 단계' }
      ]
    },
    // --- Planning ---
    {
      id: 'bmm-create-prd', name: 'Create PRD',
      description: '사용자 인터뷰와 요구사항 발견을 통해 기능 명세, 우선순위, 제약사항을 포함한 상세 PRD를 작성한다.', category: 'Planning',
      workflowFile: '_bmad/bmm/workflows/2-plan-workflows/create-prd/workflow-create-prd.md',
      files: [
        { path: 'steps-c/step-01-init.md', type: 'md', purpose: '사용자 인터뷰 준비와 요구사항 수집 프레임워크를 설정하는 PRD 작성 초기화 단계' }
      ]
    },
    {
      id: 'bmm-validate-prd', name: 'Validate PRD',
      description: '작성된 PRD의 완전성, 일관성, 실현 가능성을 적대적 관점에서 검증하고 누락된 요구사항이나 모순을 식별한다.', category: 'Planning',
      workflowFile: '_bmad/bmm/workflows/2-plan-workflows/create-prd/workflow-validate-prd.md',
      files: [
        { path: 'steps-v/step-v-01-discovery.md', type: 'md', purpose: 'PRD의 완전성, 일관성, 실현 가능성을 적대적 관점에서 점검하는 검증 발견 단계' }
      ]
    },
    {
      id: 'bmm-edit-prd', name: 'Edit PRD',
      description: '기존 PRD에 새로운 요구사항을 추가하거나 기존 항목을 수정하며, 변경 이력과 영향도를 추적한다.', category: 'Planning',
      workflowFile: '_bmad/bmm/workflows/2-plan-workflows/create-prd/workflow-edit-prd.md',
      files: [
        { path: 'steps-e/step-e-01-discovery.md', type: 'md', purpose: '기존 PRD를 로드하고 변경이 필요한 요구사항 영역을 식별하는 수정 발견 단계' }
      ]
    },
    {
      id: 'bmm-create-ux', name: 'Create UX Design',
      description: '시각적 탐색과 협업적 의사결정을 통해 UI 패턴, 인터랙션, 룩앤필을 정의하는 UX 사양서를 작성한다. 구현 팀이 즉시 활용 가능한 형태로 산출한다.', category: 'Planning',
      workflowFile: '_bmad/bmm/workflows/2-plan-workflows/create-ux-design/workflow.md',
      files: [
        { path: 'ux-design-template.md', type: 'md', purpose: 'UI 패턴, 인터랙션 규칙, 컬러/타이포그래피 가이드를 포함한 UX 사양서 마크다운 템플릿' },
        { path: 'steps/step-01-init.md', type: 'md', purpose: '디자인 범위와 대상 화면을 정의하고 시각적 탐색을 시작하는 UX 설계 초기화 단계' }
      ]
    },
    // --- Solutioning ---
    {
      id: 'bmm-create-architecture', name: 'Create Architecture',
      description: '시스템 컴포넌트, API 경계, 데이터 모델, 인프라 구성을 설계하고 아키텍처 결정 기록(ADR)을 포함한 기술 문서를 작성한다.', category: 'Solutioning',
      workflowFile: '_bmad/bmm/workflows/3-solutioning/create-architecture/workflow.md',
      files: [
        { path: 'architecture-decision-template.md', type: 'md', purpose: '컨텍스트, 선택지, 결정 근거, 트레이드오프를 기록하는 ADR(Architecture Decision Record) 템플릿' },
        { path: 'steps/step-01-init.md', type: 'md', purpose: 'PRD와 기술 요구사항을 분석하여 시스템 컴포넌트와 경계를 정의하는 아키텍처 설계 시작 단계' }
      ]
    },
    {
      id: 'bmm-check-readiness', name: 'Check Readiness',
      description: 'PRD, 아키텍처, 에픽/스토리 문서의 정합성을 적대적 방식으로 교차 검증하여 구현 착수 가능 여부를 판단한다.', category: 'Solutioning',
      workflowFile: '_bmad/bmm/workflows/3-solutioning/check-implementation-readiness/workflow.md',
      files: [
        { path: 'step-01-document-discovery.md', type: 'md', purpose: 'PRD, 아키텍처, 에픽/스토리 문서를 로드하고 교차 참조하여 구현 준비 상태를 적대적으로 검증' }
      ]
    },
    {
      id: 'bmm-create-epics', name: 'Create Epics & Stories',
      description: 'PRD와 아키텍처 문서를 기반으로 구현 가능한 에픽과 사용자 스토리를 생성하고, 인수 조건과 의존성을 정의한다.', category: 'Solutioning',
      workflowFile: '_bmad/bmm/workflows/3-solutioning/create-epics-and-stories/workflow.md',
      files: [
        { path: 'steps/step-01-validate-prerequisites.md', type: 'md', purpose: 'PRD와 아키텍처 문서의 존재와 완전성을 확인하고 에픽/스토리 생성을 위한 선행 조건을 검증' }
      ]
    },
    // --- Implementation ---
    {
      id: 'bmm-code-review', name: 'Code Review',
      description: '적대적 시니어 개발자 관점에서 코드 품질, 보안 취약점, 테스트 커버리지, SOLID 원칙 준수를 심층 리뷰한다.', category: 'Implementation',
      workflowFile: '_bmad/bmm/workflows/4-implementation/code-review/workflow.yaml',
      files: [
        { path: 'instructions.xml', type: 'xml', purpose: '코드 품질, 보안 취약점, SOLID 원칙, 테스트 커버리지 등 심층 리뷰 규칙을 정의한 XML 가이드라인' },
        { path: 'checklist.md', type: 'md', purpose: '아키텍처 정합성, 에러 핸들링, 성능, 접근성 등 항목별 리뷰 체크리스트' }
      ]
    },
    {
      id: 'bmm-correct-course', name: 'Correct Course',
      description: '스프린트 중 발생하는 변경 요청의 영향도를 분석하고, PRD/아키텍처/에픽에 미치는 파급 효과를 평가하여 과정을 수정한다.', category: 'Implementation',
      workflowFile: '_bmad/bmm/workflows/4-implementation/correct-course/workflow.yaml',
      files: [
        { path: 'instructions.md', type: 'md', purpose: '변경 요청의 영향 범위 분석, PRD/아키텍처 수정 절차, 리스크 평가 방법을 정의한 과정 수정 가이드' },
        { path: 'checklist.md', type: 'md', purpose: '변경 사항이 기존 에픽/스토리/테스트에 미치는 파급 효과를 점검하는 검증 체크리스트' }
      ]
    },
    {
      id: 'bmm-dev-story', name: 'Dev Story',
      description: '승인된 사용자 스토리의 인수 조건을 기반으로 코드를 구현하고, 개발 완료 체크리스트와 스프린트 상태를 업데이트한다.', category: 'Implementation',
      workflowFile: '_bmad/bmm/workflows/4-implementation/dev-story/workflow.yaml',
      files: [
        { path: 'instructions.xml', type: 'xml', purpose: '인수 조건 기반 구현, 코딩 표준, 브랜치 전략, 커밋 규약을 정의한 XML 개발 가이드라인' },
        { path: 'checklist.md', type: 'md', purpose: '코드 완성도, 테스트 통과, 문서 업데이트, PR 준비 등 스토리 완료 기준 체크리스트' },
        { path: 'sprint-status.yaml', type: 'yaml', purpose: '현재 스프린트의 스토리별 상태(대기/진행/완료/블로커)를 추적하는 YAML 상태 파일' }
      ]
    },
    {
      id: 'bmm-sprint-planning', name: 'Sprint Planning',
      description: '에픽에서 우선순위가 높은 스토리를 선별하고 팀 용량에 맞춰 스프린트 범위를 확정하며, 상태 추적 파일을 초기화한다.', category: 'Implementation',
      workflowFile: '_bmad/bmm/workflows/4-implementation/sprint-planning/workflow.yaml',
      files: [
        { path: 'instructions.md', type: 'md', purpose: '에픽에서 스토리 선별, 팀 용량 산정, 스프린트 목표 수립 절차를 정의한 플래닝 가이드' },
        { path: 'sprint-status-template.yaml', type: 'yaml', purpose: '스프린트 메타데이터, 스토리 목록, 진행 상태를 초기화하는 YAML 상태 파일 템플릿' }
      ]
    },
    {
      id: 'bmm-sprint-status', name: 'Sprint Status',
      description: '현재 스프린트의 진행 상황을 분석하여 완료/진행/블로커 현황을 요약하고, 리스크와 조치 사항을 보고한다.', category: 'Implementation',
      workflowFile: '_bmad/bmm/workflows/4-implementation/sprint-status/workflow.yaml',
      files: [
        { path: 'instructions.md', type: 'md', purpose: '스프린트 진행률, 완료/진행/블로커 현황 분석과 리스크 보고 절차를 정의한 상태 분석 가이드' }
      ]
    },
    {
      id: 'bmm-retrospective', name: 'Retrospective',
      description: '완료된 에픽의 실행 과정을 돌아보며 잘한 점, 개선점, 학습 사항을 정리하고 다음 에픽에 반영할 액션 아이템을 도출한다.', category: 'Implementation',
      workflowFile: '_bmad/bmm/workflows/4-implementation/retrospective/workflow.yaml',
      files: [
        { path: 'instructions.md', type: 'md', purpose: '잘한 점, 개선점, 학습 사항을 구조적으로 정리하고 다음 에픽 액션 아이템을 도출하는 회고 진행 가이드' }
      ]
    },
    {
      id: 'bmm-create-story', name: 'Create Story',
      description: '에픽에서 개별 사용자 스토리를 추출하고, 인수 조건, 기술 태스크, 의존성을 구체화하여 개발 준비 완료(DoR) 상태로 만든다.', category: 'Implementation',
      workflowFile: '_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml',
      files: [
        { path: 'template.md', type: 'md', purpose: '사용자 스토리의 설명, 인수 조건, 기술 태스크, 의존성을 구조화하는 마크다운 템플릿' },
        { path: 'instructions.xml', type: 'xml', purpose: '에픽에서 스토리 추출, 인수 조건 작성, DoR(개발 준비 완료) 기준을 정의한 XML 가이드' }
      ]
    },
    // --- Quick Flow ---
    {
      id: 'bmm-quick-spec', name: 'Quick Spec',
      description: '대화형으로 기술 사양서를 신속하게 작성하는 Quick Flow 전용 워크플로우. 아이디어를 즉시 구현 가능한 기술 스펙으로 변환한다.', category: 'Quick Flow',
      workflowFile: '_bmad/bmm/workflows/bmad-quick-flow/quick-spec/workflow.md',
      files: [
        { path: 'steps/step-01-understand.md', type: 'md', purpose: '사용자의 아이디어를 대화형으로 청취하고 기술적 요구사항으로 변환하는 Quick Spec 시작 단계' }
      ]
    },
    {
      id: 'bmm-quick-dev', name: 'Quick Dev',
      description: '작성된 Quick Spec을 기반으로 즉시 코드를 구현하는 Quick Flow 전용 워크플로우. 모드를 자동 감지하여 최적의 개발 경로를 선택한다.', category: 'Quick Flow',
      workflowFile: '_bmad/bmm/workflows/bmad-quick-flow/quick-dev/workflow.md',
      files: [
        { path: 'steps/step-01-mode-detection.md', type: 'md', purpose: 'Quick Spec 유무를 감지하고 신규 구현/기존 확장 모드를 자동 선택하는 개발 시작 단계' }
      ]
    },
    // --- Project Mgmt ---
    {
      id: 'bmm-document-project', name: 'Document Project',
      description: 'CSV 정의 기반으로 프로젝트의 코드베이스, 아키텍처, API를 분석하여 AI 개발에 필요한 참조 문서와 지식 베이스를 자동 구축한다.', category: 'Project Mgmt',
      workflowFile: '_bmad/bmm/workflows/document-project/workflow.yaml',
      files: [
        { path: 'documentation-requirements.csv', type: 'csv', purpose: '생성할 문서 유형, 대상 경로, 포맷, 우선순위를 정의하는 CSV 요구사항 데이터베이스' },
        { path: 'instructions.md', type: 'md', purpose: '코드베이스 분석, API 문서 추출, 아키텍처 다이어그램 생성 절차를 정의한 문서화 가이드' }
      ]
    },
    {
      id: 'bmm-generate-context', name: 'Generate Context',
      description: '프로젝트의 기술 스택, 코딩 규약, 아키텍처 결정을 분석하여 AI 에이전트가 참조할 수 있는 프로젝트 컨텍스트 파일을 생성한다.', category: 'Project Mgmt',
      workflowFile: '_bmad/bmm/workflows/generate-project-context/workflow.md',
      files: [
        { path: 'project-context-template.md', type: 'md', purpose: '기술 스택, 코딩 규약, 아키텍처 결정, 프로젝트 구조를 기록하는 AI 컨텍스트 마크다운 템플릿' },
        { path: 'steps/step-01-discover.md', type: 'md', purpose: '프로젝트 소스를 스캔하여 사용 기술, 패턴, 코딩 규칙을 자동 발견하는 컨텍스트 수집 단계' }
      ]
    },
    // --- QA ---
    {
      id: 'bmm-qa-automate', name: 'QA Automate',
      description: '기존 소스 코드를 분석하여 표준 테스트 패턴 기반의 API 및 E2E 테스트를 자동 생성한다. 수동 작성 없이 빠르게 테스트 커버리지를 확보한다.', category: 'QA',
      workflowFile: '_bmad/bmm/workflows/qa/automate/workflow.yaml',
      files: [
        { path: 'instructions.md', type: 'md', purpose: '소스 코드 분석, 표준 테스트 패턴 적용, API/E2E 테스트 자동 생성 절차를 정의한 QA 자동화 가이드' },
        { path: 'checklist.md', type: 'md', purpose: '테스트 커버리지, 결정론성, 격리성, 실행 속도 등 자동 생성 테스트의 품질 검증 체크리스트' }
      ]
    }
  ]
}
);
