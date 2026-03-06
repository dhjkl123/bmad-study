// BMAD Module: tea
window.BMAD_MODULES = window.BMAD_MODULES || [];
window.BMAD_MODULES.push(
{
  id: 'tea',
  name: 'Test Engineering Architecture',
  shortName: 'TEA',
  description: '테스트 아키텍처 - 리스크 기반 테스팅, 프레임워크 구축, CI/CD 품질 게이트',
  color: '#ef4444',
  colorRgb: '239, 68, 68',
  configFile: '_bmad/tea/config.yaml',
  agents: [
    {
      id: 'tea-murat', name: 'Murat', fullName: 'Master Test Architect',
      role: '마스터 테스트 아키텍트',
      description: '테스트 전 생명주기를 커버하는 마스터 테스트 아키텍트. 리스크 기반 테스팅·ATDD·API/UI 자동화·CI/CD 품질 게이트를 전문으로 하며, 9개 워크플로우와 40개 지식 프래그먼트로 테스트 설계부터 품질 검증까지 지원한다.',
      agentFile: '_bmad/tea/agents/tea.md',
      workflows: ['tea-teach-testing', 'tea-test-framework', 'tea-atdd', 'tea-test-automation', 'tea-test-design', 'tea-trace', 'tea-nfr-assess', 'tea-ci-setup', 'tea-test-review']
    }
  ],
  workflows: [
    // --- Learning ---
    {
      id: 'tea-teach-testing', name: 'Teach Me Testing',
      description: '7개 세션으로 구성된 인터랙티브 테스팅 교육 과정. 수준 평가→커리큘럼 선택→세션 수강→퀴즈→수료의 구조로, 역할별 학습 경로와 진행 상태 추적을 지원한다.',
      workflowFile: '_bmad/tea/workflows/testarch/teach-me-testing/workflow.md',
      files: [
        { path: 'steps-c/step-01-init.md', type: 'md', purpose: '학습자의 역할과 경험을 파악하고 학습 모드(신규/이어하기)를 결정하는 교육 시작 단계',
          children: [
            { path: 'steps-c/step-01b-continue.md', type: 'md', purpose: '이전 학습 진행 상태를 로드하여 마지막 세션부터 이어서 학습을 재개하는 단계' }
          ]
        },
        { path: 'steps-c/step-02-assess.md', type: 'md', purpose: '퀴즈 기반으로 학습자의 현재 테스팅 지식 수준을 평가하고 적합한 커리큘럼을 추천' },
        { path: 'steps-c/step-03-session-menu.md', type: 'md', purpose: '7개 세션 목록을 표시하고 학습자가 원하는 세션을 선택하는 메뉴 화면' },
        { path: 'steps-c/step-04-session-01.md', type: 'md', purpose: '세션 1: 테스트 기초 — 테스트 피라미드, 테스트 유형, 기본 개념을 학습',
          children: [
            { path: 'steps-c/step-04-session-02.md', type: 'md', purpose: '세션 2: 테스트 설계 — 리스크 기반 테스팅, 테스트 케이스 작성법을 학습' },
            { path: 'steps-c/step-04-session-03.md', type: 'md', purpose: '세션 3: API 테스트 — REST API 테스트 전략, 모킹, 검증 기법을 학습' },
            { path: 'steps-c/step-04-session-04.md', type: 'md', purpose: '세션 4: E2E 테스트 — UI 자동화, 페이지 객체 패턴, 안정성 전략을 학습' },
            { path: 'steps-c/step-04-session-05.md', type: 'md', purpose: '세션 5: CI/CD 통합 — 품질 게이트, 파이프라인 설정, 보고 체계를 학습' },
            { path: 'steps-c/step-04-session-06.md', type: 'md', purpose: '세션 6: 비기능 테스트 — 성능, 보안, 신뢰성 테스트 방법론을 학습' },
            { path: 'steps-c/step-04-session-07.md', type: 'md', purpose: '세션 7: 고급 주제 — ATDD, 추적성, 테스트 아키텍처 설계를 학습' }
          ]
        },
        { path: 'steps-c/step-05-completion.md', type: 'md', purpose: '전체 세션 이수 여부를 확인하고 수료증을 발급하며 추가 학습 자료를 안내' },
        { path: 'data/curriculum.yaml', type: 'yaml', purpose: '7개 세션의 제목, 학습 목표, 소요 시간, 선수 조건을 정의하는 YAML 커리큘럼 구조' },
        { path: 'data/quiz-questions.yaml', type: 'yaml', purpose: '세션별 평가용 퀴즈 문항, 보기, 정답, 해설을 포함하는 YAML 문제 데이터베이스' },
        { path: 'data/role-paths.yaml', type: 'yaml', purpose: 'QA 엔지니어, 개발자, 팀 리드 등 역할별 추천 세션 순서와 깊이를 정의하는 학습 경로' },
        { path: 'data/session-content-map.yaml', type: 'yaml', purpose: '각 세션에서 참조하는 TEA 지식 프래그먼트와 외부 리소스의 매핑 정의' },
        { path: 'data/tea-resources-index.yaml', type: 'yaml', purpose: 'TEA 모듈의 전체 지식 프래그먼트, 템플릿, 도구 파일을 카테고리별로 색인한 리소스 인덱스' },
        { path: 'templates/certificate-template.md', type: 'md', purpose: '학습자명, 완료 세션, 달성 점수를 포함하는 교육 수료증 마크다운 템플릿' },
        { path: 'templates/progress-template.yaml', type: 'yaml', purpose: '세션별 완료 상태, 퀴즈 점수, 학습 일시를 추적하는 YAML 진행 상태 파일 템플릿' },
        { path: 'templates/session-notes-template.md', type: 'md', purpose: '세션 학습 내용, 핵심 요약, 실습 결과를 기록하는 세션 노트 마크다운 템플릿' }
      ]
    },
    // --- Solutioning ---
    {
      id: 'tea-test-design', name: 'Test Design',
      description: '리스크 매트릭스와 테스트 가능성 분석을 기반으로 에픽/시스템 수준의 테스트 설계를 수행한다. 커버리지 계획을 수립하고 테스트 설계 문서, QA 핸드오프 문서를 생성한다.',
      workflowFile: '_bmad/tea/workflows/testarch/test-design/workflow.yaml',
      files: [
        { path: 'steps-c/step-01-detect-mode.md', type: 'md', purpose: '에픽 수준/시스템 수준 테스트 설계 모드를 자동 감지하고 적합한 경로를 선택',
          children: [
            { path: 'steps-c/step-01b-resume.md', type: 'md', purpose: '이전에 중단된 테스트 설계 세션의 진행 상태를 복원하여 재개' }
          ]
        },
        { path: 'steps-c/step-02-load-context.md', type: 'md', purpose: 'PRD, 아키텍처, 에픽/스토리 문서를 로드하여 테스트 대상 시스템을 파악' },
        { path: 'steps-c/step-03-risk-and-testability.md', type: 'md', purpose: '기능별 리스크 매트릭스를 작성하고 테스트 가능성을 분석하여 우선순위를 결정' },
        { path: 'steps-c/step-04-coverage-plan.md', type: 'md', purpose: '리스크 기반으로 테스트 유형, 범위, 커버리지 목표를 포함한 테스트 계획을 수립' },
        { path: 'steps-c/step-05-generate-output.md', type: 'md', purpose: '모드별 산출물(에픽 테스트 설계서, 아키텍처 문서, QA 핸드오프)을 생성' },
        { path: 'instructions.md', type: 'md', purpose: '리스크 분석, 커버리지 계획, 산출물 작성 절차를 정의한 테스트 설계 워크플로우 가이드' },
        { path: 'checklist.md', type: 'md', purpose: '테스트 설계 완전성, 리스크 커버리지, 문서 정합성을 점검하는 품질 체크리스트' },
        { path: 'test-design-template.md', type: 'md', purpose: '에픽 수준의 테스트 시나리오, 케이스, 데이터 요구사항을 구조화하는 설계 문서 템플릿' },
        { path: 'test-design-architecture-template.md', type: 'md', purpose: '시스템 전체의 테스트 전략, 환경 구성, 자동화 아키텍처를 정의하는 문서 템플릿' },
        { path: 'test-design-qa-template.md', type: 'md', purpose: '시스템 수준 QA 계획, 진입/종료 기준, 결함 관리 프로세스를 정의하는 문서 템플릿' },
        { path: 'test-design-handoff-template.md', type: 'md', purpose: 'TEA 테스트 설계 결과를 BMM 개발팀에 인계할 때 사용하는 핸드오프 문서 템플릿' }
      ]
    },
    {
      id: 'tea-test-framework', name: 'Test Framework',
      description: '프로젝트의 기술 스택에 맞는 테스트 프레임워크를 선택하고, 디렉토리 구조, 설정 파일, 헬퍼/유틸리티를 스캐폴딩하여 프로덕션 수준의 테스트 인프라를 구축한다.',
      workflowFile: '_bmad/tea/workflows/testarch/framework/workflow.yaml',
      files: [
        { path: 'steps-c/step-01-preflight.md', type: 'md', purpose: '프로젝트의 기술 스택, 기존 테스트 환경, 패키지 매니저를 자동 감지하는 사전 점검',
          children: [
            { path: 'steps-c/step-01b-resume.md', type: 'md', purpose: '이전에 중단된 프레임워크 구축 세션의 상태를 복원하여 재개' }
          ]
        },
        { path: 'steps-c/step-02-select-framework.md', type: 'md', purpose: '기술 스택에 맞는 테스트 프레임워크(Jest, Vitest, Playwright 등)를 비교하고 선택' },
        { path: 'steps-c/step-03-scaffold-framework.md', type: 'md', purpose: '선택된 프레임워크의 디렉토리 구조, 설정 파일, 헬퍼/유틸리티를 자동 생성' },
        { path: 'steps-c/step-04-docs-and-scripts.md', type: 'md', purpose: '테스트 실행 스크립트(npm scripts), README, 가이드 문서를 생성' },
        { path: 'steps-c/step-05-validate-and-summary.md', type: 'md', purpose: '생성된 프레임워크의 동작을 검증하고 최종 구성 요약 보고서를 작성' },
        { path: 'instructions.md', type: 'md', purpose: '프레임워크 선택 기준, 스캐폴딩 규칙, 디렉토리 구조 패턴을 정의한 워크플로우 가이드' },
        { path: 'checklist.md', type: 'md', purpose: '설정 파일 유효성, 스크립트 동작, 디렉토리 구조 표준 준수를 점검하는 품질 체크리스트' }
      ]
    },
    {
      id: 'tea-ci-setup', name: 'CI Setup',
      description: 'GitHub Actions, GitLab CI, Azure Pipelines, Jenkins, Harness 등 주요 CI/CD 플랫폼별 품질 게이트 파이프라인 템플릿을 생성하고 설정한다.',
      workflowFile: '_bmad/tea/workflows/testarch/ci/workflow.yaml',
      files: [
        { path: 'steps-c/step-01-preflight.md', type: 'md', purpose: '프로젝트의 CI/CD 현황, VCS 플랫폼, 테스트 프레임워크를 자동 감지하는 사전 점검',
          children: [
            { path: 'steps-c/step-01b-resume.md', type: 'md', purpose: '이전에 중단된 CI 설정 세션의 상태를 복원하여 재개' }
          ]
        },
        { path: 'steps-c/step-02-generate-pipeline.md', type: 'md', purpose: '선택된 CI 플랫폼의 파이프라인 설정 파일을 템플릿 기반으로 자동 생성' },
        { path: 'steps-c/step-03-configure-quality-gates.md', type: 'md', purpose: '커버리지 임계값, 린트 규칙, 보안 스캔 등 품질 게이트 조건을 설정' },
        { path: 'steps-c/step-04-validate-and-summary.md', type: 'md', purpose: '생성된 파이프라인의 문법과 로직을 검증하고 최종 구성 요약을 작성' },
        { path: 'instructions.md', type: 'md', purpose: 'CI 플랫폼 선택 기준, 파이프라인 구조, 품질 게이트 설정 절차를 정의한 워크플로우 가이드' },
        { path: 'checklist.md', type: 'md', purpose: '파이프라인 문법, 시크릿 관리, 캐시 설정, 알림 연동을 점검하는 품질 체크리스트' },
        { path: 'github-actions-template.yaml', type: 'yaml', purpose: 'GitHub Actions 워크플로우 YAML — 빌드, 테스트, 커버리지, 배포 스테이지 포함' },
        { path: 'gitlab-ci-template.yaml', type: 'yaml', purpose: 'GitLab CI/CD 파이프라인 YAML — 스테이지, 작업, 아티팩트, 캐시 설정 포함' },
        { path: 'azure-pipelines-template.yaml', type: 'yaml', purpose: 'Azure Pipelines YAML — 에이전트 풀, 태스크 그룹, 환경 변수 설정 포함' },
        { path: 'jenkins-pipeline-template.groovy', type: 'groovy', purpose: 'Jenkins Declarative Pipeline Groovy — 스테이지, 에이전트, post 액션 정의' },
        { path: 'harness-pipeline-template.yaml', type: 'yaml', purpose: 'Harness CI/CD 파이프라인 YAML — 서비스, 환경, 인프라 정의 포함' }
      ]
    },
    // --- Implementation ---
    {
      id: 'tea-atdd', name: 'ATDD',
      description: '사용자 스토리의 인수 조건을 기반으로 의도적으로 실패하는 API/E2E 테스트를 생성하는 ATDD Red Phase. 병렬 서브프로세스로 API와 E2E 테스트를 동시 생성한다.',
      workflowFile: '_bmad/tea/workflows/testarch/atdd/workflow.yaml',
      files: [
        { path: 'steps-c/step-01-preflight-and-context.md', type: 'md', purpose: '스토리의 인수 조건을 로드하고 테스트 프레임워크 환경을 확인하는 사전 점검',
          children: [
            { path: 'steps-c/step-01b-resume.md', type: 'md', purpose: '이전에 중단된 ATDD 세션의 생성 상태를 복원하여 재개' }
          ]
        },
        { path: 'steps-c/step-02-generation-mode.md', type: 'md', purpose: '단일 스토리/에픽 전체 모드를 결정하고 병렬 생성 범위를 설정' },
        { path: 'steps-c/step-03-test-strategy.md', type: 'md', purpose: '인수 조건별 테스트 유형(API/E2E)을 매핑하고 실패 시나리오를 설계' },
        { path: 'steps-c/step-04-generate-tests.md', type: 'md', purpose: 'API와 E2E 테스트를 병렬 서브프로세스로 동시 생성하는 메인 실행 단계',
          children: [
            { path: 'steps-c/step-04a-subprocess-api-failing.md', type: 'md', purpose: '인수 조건 기반 의도적으로 실패하는 API 테스트 코드를 생성하는 서브프로세스' },
            { path: 'steps-c/step-04b-subprocess-e2e-failing.md', type: 'md', purpose: '인수 조건 기반 의도적으로 실패하는 E2E 테스트 코드를 생성하는 서브프로세스' },
            { path: 'steps-c/step-04c-aggregate.md', type: 'md', purpose: 'API와 E2E 서브프로세스 결과를 취합하고 중복/충돌을 해소' }
          ]
        },
        { path: 'steps-c/step-05-validate-and-complete.md', type: 'md', purpose: '생성된 Red Phase 테스트의 실패 확인, 커버리지 검증, 최종 보고서 작성' },
        { path: 'instructions.md', type: 'md', purpose: 'ATDD Red Phase 규칙, 인수 조건→테스트 매핑 방법, 병렬 생성 절차를 정의한 워크플로우 가이드' },
        { path: 'checklist.md', type: 'md', purpose: '테스트 실패 확인, 인수 조건 커버리지, 코드 품질을 점검하는 ATDD 품질 체크리스트' },
        { path: 'atdd-checklist-template.md', type: 'md', purpose: '인수 조건별 테스트 매핑 상태와 Red/Green 전환을 추적하는 ATDD 진행 체크리스트 템플릿' }
      ]
    },
    {
      id: 'tea-test-automation', name: 'Test Automation',
      description: '기존 코드베이스의 테스트 커버리지 갭을 식별하고, API/E2E 테스트를 병렬 서브프로세스로 자동 생성하여 커버리지를 확장한다.',
      workflowFile: '_bmad/tea/workflows/testarch/automate/workflow.yaml',
      files: [
        { path: 'steps-c/step-01-preflight-and-context.md', type: 'md', purpose: '코드베이스 구조, 기존 테스트 현황, 커버리지 갭을 파악하는 사전 점검 및 컨텍스트 수집',
          children: [
            { path: 'steps-c/step-01b-resume.md', type: 'md', purpose: '이전에 중단된 자동화 세션의 생성 상태를 복원하여 재개' }
          ]
        },
        { path: 'steps-c/step-02-identify-targets.md', type: 'md', purpose: '커버리지 갭 분석 결과로 테스트 자동화가 필요한 엔드포인트/화면을 식별' },
        { path: 'steps-c/step-03-generate-tests.md', type: 'md', purpose: 'API와 E2E 테스트를 병렬 서브프로세스로 동시 생성하는 메인 실행 단계',
          children: [
            { path: 'steps-c/step-03a-subprocess-api.md', type: 'md', purpose: '식별된 엔드포인트에 대한 API 테스트 코드를 자동 생성하는 서브프로세스' },
            { path: 'steps-c/step-03b-subprocess-e2e.md', type: 'md', purpose: '식별된 화면/플로우에 대한 E2E 테스트 코드를 자동 생성하는 서브프로세스' },
            { path: 'steps-c/step-03c-aggregate.md', type: 'md', purpose: 'API와 E2E 서브프로세스 결과를 취합하고 커버리지 향상도를 산출' }
          ]
        },
        { path: 'steps-c/step-04-validate-and-summarize.md', type: 'md', purpose: '생성된 테스트의 실행 결과를 검증하고 커버리지 달성 요약 보고서를 작성' },
        { path: 'instructions.md', type: 'md', purpose: '커버리지 갭 분석, 테스트 타겟 선정, 병렬 생성 절차를 정의한 자동화 워크플로우 가이드' },
        { path: 'checklist.md', type: 'md', purpose: '테스트 통과율, 결정론성, 격리성, 실행 속도를 점검하는 자동화 품질 체크리스트' }
      ]
    },
    {
      id: 'tea-test-review', name: 'Test Review',
      description: '기존 테스트의 결정론성, 격리성, 유지보수성, 성능을 병렬 서브프로세스로 평가하고, 0-100 종합 점수와 개선 권고가 포함된 품질 리포트를 생성한다.',
      workflowFile: '_bmad/tea/workflows/testarch/test-review/workflow.yaml',
      files: [
        { path: 'steps-c/step-01-load-context.md', type: 'md', purpose: '프로젝트의 테스트 디렉토리, 프레임워크 설정, 실행 환경을 로드하는 컨텍스트 수집',
          children: [
            { path: 'steps-c/step-01b-resume.md', type: 'md', purpose: '이전에 중단된 테스트 리뷰 세션의 평가 진행 상태를 복원하여 재개' }
          ]
        },
        { path: 'steps-c/step-02-discover-tests.md', type: 'md', purpose: '프로젝트 내 모든 테스트 파일을 탐색하고 유형(단위/API/E2E)별로 분류' },
        { path: 'steps-c/step-03-quality-evaluation.md', type: 'md', purpose: '4개 품질 차원을 병렬 서브프로세스로 동시 평가하는 메인 실행 단계',
          children: [
            { path: 'steps-c/step-03a-subprocess-determinism.md', type: 'md', purpose: '테스트의 결정론성(동일 입력→동일 결과) 여부와 플레이키 테스트를 분석하는 서브프로세스' },
            { path: 'steps-c/step-03b-subprocess-isolation.md', type: 'md', purpose: '테스트 간 격리성(독립 실행 가능, 상태 공유 없음)을 검증하는 서브프로세스' },
            { path: 'steps-c/step-03c-subprocess-maintainability.md', type: 'md', purpose: '테스트 코드의 가독성, 중복, 추상화 수준을 평가하는 유지보수성 서브프로세스' },
            { path: 'steps-c/step-03e-subprocess-performance.md', type: 'md', purpose: '테스트 실행 시간, 병목, 리소스 사용을 분석하는 성능 평가 서브프로세스' },
            { path: 'steps-c/step-03f-aggregate-scores.md', type: 'md', purpose: '4개 차원의 점수를 가중 합산하여 0-100 종합 품질 점수를 산출' }
          ]
        },
        { path: 'steps-c/step-04-generate-report.md', type: 'md', purpose: '차원별 점수, 문제점, 개선 권고를 포함한 테스트 품질 종합 리포트를 생성' },
        { path: 'instructions.md', type: 'md', purpose: '테스트 탐색, 4차원 평가 기준, 점수 산정 방법을 정의한 테스트 리뷰 워크플로우 가이드' },
        { path: 'checklist.md', type: 'md', purpose: '리뷰 범위 완전성, 평가 기준 적용, 보고서 형식을 점검하는 품질 체크리스트' },
        { path: 'test-review-template.md', type: 'md', purpose: '차원별 점수표, 문제 목록, 개선 로드맵을 구조화하는 테스트 리뷰 보고서 템플릿' }
      ]
    },
    {
      id: 'tea-nfr-assess', name: 'NFR Assessment',
      description: '보안, 성능, 신뢰성, 확장성을 4개 병렬 서브프로세스로 평가하고, 임계값 대비 달성도를 점수화한 NFR 보고서를 생성한다.',
      workflowFile: '_bmad/tea/workflows/testarch/nfr-assess/workflow.yaml',
      files: [
        { path: 'steps-c/step-01-load-context.md', type: 'md', purpose: '아키텍처 문서와 NFR 요구사항을 로드하고 평가 범위를 결정하는 컨텍스트 수집',
          children: [
            { path: 'steps-c/step-01b-resume.md', type: 'md', purpose: '이전에 중단된 NFR 평가 세션의 진행 상태를 복원하여 재개' }
          ]
        },
        { path: 'steps-c/step-02-define-thresholds.md', type: 'md', purpose: '보안, 성능, 신뢰성, 확장성 각 차원의 합격/불합격 임계값을 정의' },
        { path: 'steps-c/step-03-gather-evidence.md', type: 'md', purpose: '코드 분석, 설정 파일, 아키텍처 패턴에서 NFR 관련 증거를 수집' },
        { path: 'steps-c/step-04-evaluate-and-score.md', type: 'md', purpose: '4개 NFR 차원을 병렬 서브프로세스로 동시 평가하는 메인 실행 단계',
          children: [
            { path: 'steps-c/step-04a-subprocess-security.md', type: 'md', purpose: 'OWASP Top 10, 인증/인가, 데이터 암호화를 평가하는 보안 서브프로세스' },
            { path: 'steps-c/step-04b-subprocess-performance.md', type: 'md', purpose: '응답 시간, 처리량, 리소스 사용 효율을 평가하는 성능 서브프로세스' },
            { path: 'steps-c/step-04c-subprocess-reliability.md', type: 'md', purpose: '장애 복구, 에러 핸들링, 데이터 정합성을 평가하는 신뢰성 서브프로세스' },
            { path: 'steps-c/step-04d-subprocess-scalability.md', type: 'md', purpose: '수평/수직 확장, 병목 지점, 부하 분산을 평가하는 확장성 서브프로세스' },
            { path: 'steps-c/step-04e-aggregate-nfr.md', type: 'md', purpose: '4개 차원의 점수를 임계값 대비 달성도로 산출하고 합격/불합격을 결정' }
          ]
        },
        { path: 'steps-c/step-05-generate-report.md', type: 'md', purpose: '차원별 달성도, 미달 항목, 개선 권고를 포함한 NFR 종합 보고서를 생성' },
        { path: 'instructions.md', type: 'md', purpose: 'NFR 평가 기준, 증거 수집 방법, 점수 산정 규칙을 정의한 워크플로우 가이드' },
        { path: 'checklist.md', type: 'md', purpose: '평가 범위 완전성, 증거 충분성, 보고서 정확성을 점검하는 품질 체크리스트' },
        { path: 'nfr-report-template.md', type: 'md', purpose: '차원별 점수표, 증거 목록, 임계값 비교, 개선 로드맵을 구조화하는 NFR 보고서 템플릿' }
      ]
    },
    {
      id: 'tea-trace', name: 'Traceability',
      description: '요구사항(인수 조건)과 테스트 케이스 간의 매핑을 생성하고, 커버리지 갭을 분석하여 품질 게이트 통과/실패 결정을 내린다.',
      workflowFile: '_bmad/tea/workflows/testarch/trace/workflow.yaml',
      files: [
        { path: 'steps-c/step-01-load-context.md', type: 'md', purpose: '에픽/스토리의 인수 조건과 테스트 파일 목록을 로드하는 컨텍스트 수집',
          children: [
            { path: 'steps-c/step-01b-resume.md', type: 'md', purpose: '이전에 중단된 추적성 분석 세션의 매핑 상태를 복원하여 재개' }
          ]
        },
        { path: 'steps-c/step-02-discover-tests.md', type: 'md', purpose: '프로젝트 내 테스트 파일을 탐색하고 각 테스트의 검증 대상을 식별' },
        { path: 'steps-c/step-03-map-criteria.md', type: 'md', purpose: '인수 조건과 테스트 케이스를 1:N으로 매핑하여 추적성 매트릭스를 생성' },
        { path: 'steps-c/step-04-analyze-gaps.md', type: 'md', purpose: '매핑되지 않은 인수 조건(커버리지 갭)을 식별하고 위험도를 평가' },
        { path: 'steps-c/step-05-gate-decision.md', type: 'md', purpose: '커버리지 달성률과 임계값을 비교하여 품질 게이트 통과/실패를 결정' },
        { path: 'instructions.md', type: 'md', purpose: '인수 조건 추출, 테스트 매핑, 갭 분석, 게이트 기준을 정의한 추적성 워크플로우 가이드' },
        { path: 'checklist.md', type: 'md', purpose: '매핑 완전성, 갭 분석 정확성, 게이트 기준 적용을 점검하는 품질 체크리스트' },
        { path: 'trace-template.md', type: 'md', purpose: '인수 조건↔테스트 매핑표, 커버리지율, 갭 목록을 구조화하는 추적성 매트릭스 템플릿' }
      ]
    }
  ]
}
);
