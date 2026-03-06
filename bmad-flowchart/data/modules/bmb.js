// BMAD Module: bmb
window.BMAD_MODULES = window.BMAD_MODULES || [];
window.BMAD_MODULES.push(
{
  id: 'bmb',
  name: 'Building Module Builder',
  shortName: 'BMB',
  description: 'BMAD 자체를 메타 프로그래밍 - 에이전트/모듈/워크플로우 생성, 편집, 검증',
  color: '#8b5cf6',
  colorRgb: '139, 92, 246',
  configFile: '_bmad/bmb/config.yaml',
  agents: [
    {
      id: 'bmb-bond',
      name: 'Bond',
      fullName: 'Agent Builder',
      role: 'Agent Architecture Specialist',
      description: 'BMAD 규정 준수를 보장하는 에이전트 아키텍처 전문가. 에이전트의 전체 생명주기(생성→편집→검증)를 관리하며, 무결성을 유지한 수정과 품질 검증 보고서를 제공한다.',
      agentFile: '_bmad/bmb/agents/agent-builder.md',
      workflows: ['bmb-create-agent', 'bmb-edit-agent', 'bmb-validate-agent']
    },
    {
      id: 'bmb-morgan',
      name: 'Morgan',
      fullName: 'Module Builder',
      role: 'Module Architecture Specialist',
      description: '모듈 아키텍처와 풀스택 시스템 설계 전문가. 제품 브리프 작성부터 에이전트·워크플로우·폴더 구조를 포함한 완전한 BMAD 모듈 생성, 일관성 유지 편집, 규정 준수 검증까지 전체 개발 파이프라인을 지원한다.',
      agentFile: '_bmad/bmb/agents/module-builder.md',
      workflows: ['bmb-create-module-brief', 'bmb-create-module', 'bmb-edit-module', 'bmb-validate-module']
    },
    {
      id: 'bmb-wendy',
      name: 'Wendy',
      fullName: 'Workflow Builder',
      role: 'Workflow Architecture Specialist',
      description: '워크플로우 아키텍처와 프로세스 설계 전문가. 신규 생성과 기존 콘텐츠 변환 두 경로를 지원하며, 최대 병렬 모드 검증과 레거시 워크플로우 V6 재작업 등 가장 다양한 워크플로우 관리 기능을 보유한다.',
      agentFile: '_bmad/bmb/agents/workflow-builder.md',
      workflows: ['bmb-create-workflow', 'bmb-edit-workflow', 'bmb-validate-workflow', 'bmb-validate-max-parallel', 'bmb-rework-workflow']
    }
  ],
  workflows: [
    // --- Agent workflows ---
    {
      id: 'bmb-create-agent', name: 'Create Agent',
      description: '8단계 가이드(브레인스토밍→발견→메타데이터→페르소나→커맨드→활성화→빌드→완료)를 통해 BMAD 규격에 맞는 완전한 에이전트를 처음부터 생성한다. 20개의 데이터/템플릿 파일로 아키텍처 가이드를 제공한다.',
      workflowFile: '_bmad/bmb/workflows/agent/workflow-create-agent.md',
      files: [
        { path: 'steps-c/step-01-brainstorm.md', type: 'md', purpose: '에이전트 컨셉을 잡기 위한 선택적 브레인스토밍 단계. Core 모듈의 브레인스토밍 워크플로우와 연계' },
        { path: 'steps-c/step-02-discovery.md', type: 'md', purpose: '에이전트의 목적, 역할, 기능 범위를 정의하는 요구사항 발견 단계' },
        { path: 'steps-c/step-03-sidecar-metadata.md', type: 'md', purpose: '에이전트의 YAML 사이드카 파일에 포함될 메타데이터(버전, 의존성, 설정)를 정의' },
        { path: 'steps-c/step-04-persona.md', type: 'md', purpose: '에이전트의 인격, 어조, 커뮤니케이션 스타일, 전문성을 설계하는 단계' },
        { path: 'steps-c/step-05-commands-menu.md', type: 'md', purpose: '에이전트가 사용자에게 제공할 명령어 메뉴 구조와 라우팅을 설계' },
        { path: 'steps-c/step-06-activation.md', type: 'md', purpose: '에이전트 시작 시 실행되는 초기화 로직과 환영 메시지를 정의' },
        { path: 'steps-c/step-07-build-agent.md', type: 'md', purpose: '설계된 모든 요소를 통합하여 최종 에이전트 마크다운 파일을 생성' },
        { path: 'steps-c/step-08-celebrate.md', type: 'md', purpose: '에이전트 생성 완료 후 결과 요약과 다음 단계 안내' },
        { path: 'data/agent-architecture.md', type: 'md', purpose: 'BMAD 에이전트의 필수 구조(메타데이터, 페르소나, 메뉴, 워크플로우) 아키텍처 레퍼런스' },
        { path: 'data/agent-compilation.md', type: 'md', purpose: '분산된 에이전트 구성 요소를 단일 실행 파일로 컴파일하는 절차 가이드' },
        { path: 'data/agent-menu-patterns.md', type: 'md', purpose: '에이전트 커맨드 메뉴의 일반적 패턴과 라우팅 구조 레퍼런스' },
        { path: 'data/agent-metadata.md', type: 'md', purpose: '에이전트 사이드카 YAML의 필수/선택 필드와 작성 규약 가이드' },
        { path: 'data/agent-validation.md', type: 'md', purpose: '에이전트 품질 검증을 위한 체크리스트와 기준 레퍼런스' },
        { path: 'data/brainstorm-context.md', type: 'md', purpose: '에이전트 설계 시 Core 브레인스토밍 워크플로우에 전달할 도메인 컨텍스트' },
        { path: 'data/critical-actions.md', type: 'md', purpose: '에이전트 생성 중 반드시 준수해야 할 필수 규칙과 제약사항' },
        { path: 'data/persona-properties.md', type: 'md', purpose: '에이전트 페르소나에 포함 가능한 속성(톤, 전문성, 말투) 카탈로그' },
        { path: 'data/principles-crafting.md', type: 'md', purpose: '에이전트 핵심 원칙(Principles)을 효과적으로 작성하는 방법론' },
        { path: 'data/understanding-agent-types.md', type: 'md', purpose: 'BMAD 에이전트의 유형(Task, Workflow, Specialist 등)별 특성과 선택 기준' },
        { path: 'templates/agent-plan.template.md', type: 'md', purpose: '에이전트 설계 계획서를 구조화된 형식으로 작성하는 마크다운 템플릿' },
        { path: 'templates/agent-template.md', type: 'md', purpose: '새 에이전트 파일의 기본 골격(섹션 구조, 플레이스홀더)이 포함된 스타터 템플릿' }
      ]
    },
    {
      id: 'bmb-edit-agent', name: 'Edit Agent',
      description: '기존 에이전트를 로드하여 페르소나, 커맨드 메뉴, 활성화 로직 등을 무결성을 유지하면서 수정하는 9단계 편집 워크플로우.',
      workflowFile: '_bmad/bmb/workflows/agent/workflow-edit-agent.md',
      files: [
        { path: 'steps-e/e-01-load-existing.md', type: 'md', purpose: '수정 대상 에이전트 파일과 사이드카를 읽어들이고 현재 상태를 분석' },
        { path: 'steps-e/e-02-discover-edits.md', type: 'md', purpose: '사용자와 대화하여 변경이 필요한 영역(페르소나, 메뉴, 활성화 등)을 식별' },
        { path: 'steps-e/e-03-placeholder.md', type: 'md', purpose: '수정 계획을 수립하고 변경 영향도를 사전 평가하는 준비 단계' },
        { path: 'steps-e/e-04-sidecar-metadata.md', type: 'md', purpose: '에이전트 사이드카 YAML의 메타데이터 수정 및 버전 업데이트' },
        { path: 'steps-e/e-05-persona.md', type: 'md', purpose: '에이전트의 인격, 어조, 전문성 영역을 수정' },
        { path: 'steps-e/e-06-commands-menu.md', type: 'md', purpose: '에이전트 명령어 메뉴 구조의 추가, 수정, 삭제 처리' },
        { path: 'steps-e/e-07-activation.md', type: 'md', purpose: '에이전트 초기화 로직과 환영 메시지 업데이트' },
        { path: 'steps-e/e-08-edit-agent.md', type: 'md', purpose: '변경 사항을 에이전트 파일에 반영하고 무결성을 확인' },
        { path: 'steps-e/e-09-celebrate.md', type: 'md', purpose: '수정 완료 후 변경 이력 요약과 검증 안내' }
      ]
    },
    {
      id: 'bmb-validate-agent', name: 'Validate Agent',
      description: '에이전트의 메타데이터, 페르소나, 메뉴, 구조, 사이드카 파일을 5개 카테고리로 나눠 검증하고 품질 보고서를 생성하는 워크플로우.',
      workflowFile: '_bmad/bmb/workflows/agent/workflow-validate-agent.md',
      files: [
        { path: 'steps-v/v-01-load-review.md', type: 'md', purpose: '검증 대상 에이전트와 관련 파일을 로드하여 전체 구조를 사전 검토' },
        { path: 'steps-v/v-02a-validate-metadata.md', type: 'md', purpose: '사이드카 YAML의 필수 필드, 버전 형식, 의존성 참조 유효성 검증' },
        { path: 'steps-v/v-02b-validate-persona.md', type: 'md', purpose: '페르소나 섹션의 완전성, 일관성, BMAD 표준 준수 검증' },
        { path: 'steps-v/v-02c-validate-menu.md', type: 'md', purpose: '커맨드 메뉴의 라우팅 경로, 워크플로우 참조 유효성 검증' },
        { path: 'steps-v/v-02d-validate-structure.md', type: 'md', purpose: '에이전트 파일의 섹션 구조, 마크다운 형식, 필수 요소 존재 검증' },
        { path: 'steps-v/v-02e-validate-sidecar.md', type: 'md', purpose: '에이전트 파일과 사이드카 YAML 간의 일관성 교차 검증' },
        { path: 'steps-v/v-03-summary.md', type: 'md', purpose: '5개 카테고리 검증 결과를 종합한 품질 보고서 생성' }
      ]
    },
    // --- Module workflows ---
    {
      id: 'bmb-create-module-brief', name: 'Create Module Brief',
      description: '14단계 대화형 프로세스로 모듈의 비전, 정체성, 사용자, 가치 제안, 에이전트/워크플로우 구성을 정의하는 제품 브리프를 작성한다.',
      workflowFile: '_bmad/bmb/workflows/module/workflow-create-module-brief.md',
      files: [
        { path: 'steps-b/step-01-welcome.md', type: 'md', purpose: '브리프 작성 세션 시작과 빠른 모드/상세 모드 선택 안내' },
        { path: 'steps-b/step-02-spark.md', type: 'md', purpose: '모듈의 핵심 아이디어와 해결하려는 문제를 구체화하는 발상 단계' },
        { path: 'steps-b/step-03-module-type.md', type: 'md', purpose: '모듈 유형(도구, 프레임워크, 확장) 결정과 기술 범위 설정' },
        { path: 'steps-b/step-04-vision.md', type: 'md', purpose: '모듈의 장기 비전과 성공 기준을 정의' },
        { path: 'steps-b/step-05-identity.md', type: 'md', purpose: '모듈 이름, 약어, 브랜딩 요소를 결정' },
        { path: 'steps-b/step-06-users.md', type: 'md', purpose: '모듈의 주요 사용자 페르소나와 사용 시나리오 정의' },
        { path: 'steps-b/step-07-value.md', type: 'md', purpose: '모듈이 제공하는 핵심 가치 제안(Value Proposition) 수립' },
        { path: 'steps-b/step-08-agents.md', type: 'md', purpose: '모듈에 포함될 에이전트 구성과 역할 분담 설계' },
        { path: 'steps-b/step-09-workflows.md', type: 'md', purpose: '모듈의 주요 워크플로우 목록과 흐름 설계' },
        { path: 'steps-b/step-10-tools.md', type: 'md', purpose: '모듈이 사용하거나 제공할 도구/유틸리티 정의' },
        { path: 'steps-b/step-11-scenarios.md', type: 'md', purpose: '실제 사용 시나리오와 예시를 통한 검증' },
        { path: 'steps-b/step-12-creative.md', type: 'md', purpose: '모듈의 차별화된 창의적 요소와 혁신 포인트 설계' },
        { path: 'steps-b/step-13-review.md', type: 'md', purpose: '작성된 브리프 전체를 검토하고 누락 사항 확인' },
        { path: 'steps-b/step-14-finalize.md', type: 'md', purpose: '브리프를 최종 확정하고 모듈 생성 워크플로우로 인계' }
      ]
    },
    {
      id: 'bmb-create-module', name: 'Create Module',
      description: '제품 브리프를 기반으로 폴더 구조, 설정 파일, 에이전트, 워크플로우를 포함한 완전한 BMAD 모듈을 7단계에 걸쳐 생성한다.',
      workflowFile: '_bmad/bmb/workflows/module/workflow-create-module.md',
      files: [
        { path: 'steps-c/step-01-load-brief.md', type: 'md', purpose: '제품 브리프 파일을 로드하고 모듈 생성 요구사항을 파싱',
          children: [
            { path: 'steps-c/step-01b-continue.md', type: 'md', purpose: '중단된 모듈 생성 작업의 컨텍스트를 복원하여 이어서 진행' }
          ]
        },
        { path: 'steps-c/step-02-structure.md', type: 'md', purpose: '모듈의 디렉토리 구조, 파일 배치, 네이밍 규약을 설계' },
        { path: 'steps-c/step-03-config.md', type: 'md', purpose: '모듈 config.yaml 파일의 에이전트/워크플로우 매핑을 생성' },
        { path: 'steps-c/step-04-agents.md', type: 'md', purpose: '브리프에 정의된 에이전트들의 초기 파일을 일괄 생성' },
        { path: 'steps-c/step-05-workflows.md', type: 'md', purpose: '브리프에 정의된 워크플로우들의 초기 파일을 일괄 생성' },
        { path: 'steps-c/step-06-docs.md', type: 'md', purpose: '모듈의 README, 사용 가이드, API 문서를 자동 생성' },
        { path: 'steps-c/step-07-complete.md', type: 'md', purpose: '생성된 모듈의 구조 요약과 후속 검증/편집 안내' },
        { path: 'data/agent-architecture.md', type: 'md', purpose: 'BMAD 에이전트 아키텍처의 필수 구조와 패턴 레퍼런스' },
        { path: 'data/agent-spec-template.md', type: 'md', purpose: '모듈 내 에이전트 사양서를 작성하기 위한 구조화된 템플릿' },
        { path: 'data/module-standards.md', type: 'md', purpose: 'BMAD 모듈의 필수 요소, 네이밍, 구조 표준 레퍼런스' },
        { path: 'data/module-yaml-conventions.md', type: 'md', purpose: 'config.yaml 작성 시 준수해야 할 키 네이밍, 값 형식, 참조 규약' }
      ]
    },
    {
      id: 'bmb-edit-module', name: 'Edit Module',
      description: '기존 모듈의 구조, 설정, 에이전트, 워크플로우를 일관성을 유지하면서 수정하는 5단계 편집 워크플로우.',
      workflowFile: '_bmad/bmb/workflows/module/workflow-edit-module.md',
      files: [
        { path: 'steps-e/step-01-load-target.md', type: 'md', purpose: '수정 대상 모듈의 전체 구조(설정, 에이전트, 워크플로우)를 로드하여 분석' },
        { path: 'steps-e/step-02-select-edit.md', type: 'md', purpose: '수정이 필요한 영역을 사용자와 대화하여 식별하고 범위를 확정' },
        { path: 'steps-e/step-03-apply-edit.md', type: 'md', purpose: '선택된 영역에 변경사항을 적용하며 모듈 일관성을 유지' },
        { path: 'steps-e/step-04-review.md', type: 'md', purpose: '변경사항이 모듈 전체에 미치는 영향을 검토하고 부작용 확인' },
        { path: 'steps-e/step-05-confirm.md', type: 'md', purpose: '최종 변경사항을 확인하고 수정 이력을 기록' }
      ]
    },
    {
      id: 'bmb-validate-module', name: 'Validate Module',
      description: '모듈의 파일 구조, 설정 파일, 에이전트, 워크플로우를 6개 카테고리로 나눠 BMAD 규격 준수 여부를 검증한다.',
      workflowFile: '_bmad/bmb/workflows/module/workflow-validate-module.md',
      files: [
        { path: 'steps-v/step-01-load-target.md', type: 'md', purpose: '검증 대상 모듈의 전체 파일 트리와 설정을 로드' },
        { path: 'steps-v/step-02-file-structure.md', type: 'md', purpose: '모듈의 디렉토리/파일 구조가 BMAD 표준에 부합하는지 검증' },
        { path: 'steps-v/step-03-config.md', type: 'md', purpose: 'config.yaml의 에이전트/워크플로우 매핑 유효성과 참조 무결성 검증' },
        { path: 'steps-v/step-04-agents.md', type: 'md', purpose: '모듈 내 모든 에이전트 파일의 구조와 규격 준수 검증' },
        { path: 'steps-v/step-05-workflows.md', type: 'md', purpose: '모듈 내 모든 워크플로우의 스텝 연결과 파일 참조 검증' },
        { path: 'steps-v/step-06-summary.md', type: 'md', purpose: '6개 카테고리 검증 결과를 종합한 모듈 품질 보고서 생성' }
      ]
    },
    // --- Workflow workflows ---
    {
      id: 'bmb-create-workflow', name: 'Create Workflow',
      description: '신규 생성 또는 기존 콘텐츠 변환 두 경로를 지원하는 워크플로우 생성기. 발견→분류 과정을 거쳐 BMAD 워크플로우 규격에 맞는 파일을 생성한다.',
      workflowFile: '_bmad/bmb/workflows/workflow/workflow-create-workflow.md',
      files: [
        { path: 'steps-c/step-00-conversion.md', type: 'md', purpose: '기존 콘텐츠를 워크플로우로 변환할지 새로 생성할지 경로를 선택' },
        { path: 'steps-c/step-01-discovery.md', type: 'md', purpose: '워크플로우의 목적, 입력/출력, 실행 주체를 정의하는 요구사항 발견' },
        { path: 'steps-c/step-02-classification.md', type: 'md', purpose: '워크플로우 유형(단일 태스크, 다단계, 병렬 등)을 분류하고 구조 결정' }
      ]
    },
    {
      id: 'bmb-edit-workflow', name: 'Edit Workflow',
      description: '기존 워크플로우를 평가하고 수정 사항을 발견하여 BMAD 규격을 유지하면서 업데이트하는 편집 워크플로우.',
      workflowFile: '_bmad/bmb/workflows/workflow/workflow-edit-workflow.md',
      files: [
        { path: 'steps-e/step-e-01-assess-workflow.md', type: 'md', purpose: '기존 워크플로우의 구조, 스텝, 데이터 흐름을 분석하여 현재 상태 평가' },
        { path: 'steps-e/step-e-02-discover-edits.md', type: 'md', purpose: '변경이 필요한 스텝, 데이터 참조, 분기 로직을 식별' }
      ]
    },
    {
      id: 'bmb-validate-workflow', name: 'Validate Workflow',
      description: '워크플로우의 구조, 스텝 연결, 데이터 참조를 BMAD 표준에 따라 검증하고 결과를 보고한다.',
      workflowFile: '_bmad/bmb/workflows/workflow/workflow-validate-workflow.md',
      files: [
        { path: 'steps-v/step-01-validate.md', type: 'md', purpose: '워크플로우의 스텝 연결, 데이터 참조, 분기 조건을 BMAD 표준에 따라 전면 검증' }
      ]
    },
    {
      id: 'bmb-validate-max-parallel', name: 'Max Parallel Validate',
      description: '워크플로우가 최대 병렬 실행(Max Parallel) 모드에서 올바르게 동작하는지 검증한다. 병렬 스텝 간 데이터 의존성과 충돌을 점검한다.',
      workflowFile: '_bmad/bmb/workflows/workflow/workflow-validate-max-parallel-workflow.md',
      files: [
        { path: 'steps-v/step-01-validate-max-mode.md', type: 'md', purpose: '워크플로우의 병렬 스텝 간 데이터 의존성, 리소스 충돌, 실행 순서 제약을 검증하고 최대 병렬 모드 적합성을 판단' }
      ]
    },
    {
      id: 'bmb-rework-workflow', name: 'Rework Workflow',
      description: '레거시 워크플로우를 BMAD V6 규격에 맞게 재작업(Rework)한다. 구조 변환, 스텝 재설계, 호환성 확보를 수행한다.',
      workflowFile: '_bmad/bmb/workflows/workflow/workflow-rework-workflow.md',
      files: []
    }
  ]
}
);
