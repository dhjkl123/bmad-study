# BMM (Building Mood Maker) Workflows

## Agents

**Analyst** (`_bmad/bmm/agents/analyst.md`)
- **역할**: 전략적 비즈니스 분석가 및 요구사항 전문가. 시장 조사, 경쟁 분석, 요구사항 도출을 전문으로 합니다.
- **주요 기능**:
    - **Market Research**: [1-analysis/research/workflow-market-research.md](#market-research) 실행.
    - **Domain Research**: [1-analysis/research/workflow-domain-research.md](#domain-research) 실행.
    - **Technical Research**: [1-analysis/research/workflow-technical-research.md](#technical-research) 실행.
    - **Create Product Brief**: [1-analysis/create-product-brief/workflow.md](#create-product-brief) 실행.
    - **Brainstorm Project**: `_bmad/core/workflows/brainstorming/workflow.md` 실행.

**Architect** (`_bmad/bmm/agents/architect.md`)
- **역할**: 시스템 아키텍트 및 기술 설계 리더. 분산 시스템, 클라우드 인프라, API 설계를 담당합니다.
- **주요 기능**:
    - **Create Architecture**: [3-solutioning/create-architecture/workflow.md](#create-architecture) 실행.
    - **Implementation Readiness**: [3-solutioning/check-implementation-readiness/workflow.md](#check-implementation-readiness) 실행.

**Developer** (`_bmad/bmm/agents/dev.md`)
- **역할**: 시니어 소프트웨어 엔지니어. 승인된 스토리를 엄격한 표준에 따라 구현합니다.
- **주요 기능**:
    - **Dev Story**: [4-implementation/dev-story/workflow.yaml](#dev-story) 실행 (테스트 및 코드 구현).
    - **Code Review**: [4-implementation/code-review/workflow.yaml](#code-review) 실행.

**Product Manager (PM)** (`_bmad/bmm/agents/pm.md`)
- **역할**: 제품 관리자. 사용자 인터뷰와 요구사항 발견을 통해 협업적 PRD 작성을 주도합니다.
- **주요 기능**:
    - **Create PRD**: [2-plan-workflows/create-prd/workflow-create-prd.md](#create-prd) 실행.
    - **Validate PRD**: [2-plan-workflows/create-prd/workflow-validate-prd.md](#validate-prd) 실행.
    - **Edit PRD**: [2-plan-workflows/create-prd/workflow-edit-prd.md](#edit-prd) 실행.
    - **Create Epics and Stories**: [3-solutioning/create-epics-and-stories/workflow.md](#create-epics-and-stories) 실행.
    - **Implementation Readiness**: [3-solutioning/check-implementation-readiness/workflow.md](#check-implementation-readiness) 실행.
    - **Course Correction**: [4-implementation/correct-course/workflow.yaml](#correct-course) 실행.

**QA Engineer** (`_bmad/bmm/agents/qa.md`)
- **역할**: QA 엔지니어. 기존 기능에 대한 테스트를 신속하게 생성하고 자동화합니다.
- **주요 기능**:
    - **QA Automate**: [qa/automate/workflow.yaml](#qa-automate) 실행 (API 및 E2E 테스트 생성).

**Quick Flow Solo Dev** (`_bmad/bmm/agents/quick-flow-solo-dev.md`)
- **역할**: 엘리트 풀스택 개발자 (Quick Flow 전문가). 기술 사양 작성부터 구현까지 빠르고 효율적으로 처리합니다.
- **주요 기능**:
    - **Quick Spec**: [bmad-quick-flow/quick-spec/workflow.md](#quick-spec) 실행.
    - **Quick Dev**: [bmad-quick-flow/quick-dev/workflow.md](#quick-dev) 실행.
    - **Code Review**: [4-implementation/code-review/workflow.yaml](#code-review) 실행.

**Scrum Master (SM)** (`_bmad/bmm/agents/sm.md`)
- **역할**: 테크니컬 스크럼 마스터. 애자일 세레모니, 스토리 준비, 명확한 사용자 스토리 작성을 지원합니다.
- **주요 기능**:
    - **Sprint Planning**: [4-implementation/sprint-planning/workflow.yaml](#sprint-planning) 실행.
    - **Create Story**: [4-implementation/create-story/workflow.yaml](#create-story) 실행.
    - **Epic Retrospective**: [4-implementation/retrospective/workflow.yaml](#retrospective) 실행.
    - **Course Correction**: [4-implementation/correct-course/workflow.yaml](#correct-course) 실행.

**Technical Writer** (`_bmad/bmm/agents/tech-writer/tech-writer.md`)
- **역할**: 기술 문서 전문가 및 지식 큐레이터. 복잡한 개념을 명확한 문서로 변환합니다.
- **주요 기능**:
    - **Document Project**: [document-project/workflow.yaml](#document-project) 실행.
    - **Write Document**: 대화형 문서 작성 (Action 기반).
    - **Update Standards**: 문서 표준 업데이트 (Action 기반).
    - **Mermaid Generate**: 다이어그램 생성 (Action 기반).
    - **Validate Documentation**: 문서 검증 (Action 기반).
    - **Explain Concept**: 기술 개념 설명 (Action 기반).

**UX Designer** (`_bmad/bmm/agents/ux-designer.md`)
- **역할**: 사용자 경험(UX) 디자이너 및 UI 전문가. 직관적인 경험을 설계하고 사용자 조사를 수행합니다.
- **주요 기능**:
    - **Create UX**: [2-plan-workflows/create-ux-design/workflow.md](#create-ux-design) 실행.

## Workflows

### 1. 분석 (Analysis)

#### Market Research
(`_bmad/bmm/workflows/1-analysis/research/workflow-market-research.md`)
- **개요**: 웹 데이터와 검증된 소스를 사용하여 시장 규모, 성장, 경쟁 및 고객 통찰력을 포함하는 포괄적인 시장 조사를 수행합니다.
- **주요 내용**: 사용자와 대화하여 조사 주제와 목표를 명확히 하고, `research.template.md`를 사용하여 결과물을 생성합니다.
- **참조 파일**:
    - `_bmad/bmm/config.yaml`: 프로젝트 전역 설정 로드.
    - `research.template.md`: 시장 조사 결과물 생성을 위한 템플릿.
    - `market-steps/step-01-init.md`: 주제 선정 및 조사 범위 구체화 초기화 단계.

#### Technical Research
(`_bmad/bmm/workflows/1-analysis/research/workflow-technical-research.md`)
- **개요**: 기술 평가, 아키텍처 결정 및 구현 접근 방식을 다루는 기술 조사를 수행합니다.
- **주요 내용**: 기술적 주제(예: React vs Vue)를 선정하고 심층적인 기술 조사를 수행합니다.
- **참조 파일**:
    - `_bmad/bmm/config.yaml`: 설정 로드.
    - `research.template.md`: 기술 조사 결과물 템플릿.
    - `technical-steps/step-01-init.md`: 기술 조사 초기화 단계.

#### Domain Research
(`_bmad/bmm/workflows/1-analysis/research/workflow-domain-research.md`)
- **개요**: 산업 분석, 규제, 기술 동향 등을 포함하는 도메인 조사를 수행합니다.
- **주요 내용**: 특정 도메인/산업에 대한 깊이 있는 조사를 수행하여 비즈니스 이해도를 높입니다.
- **참조 파일**:
    - `_bmad/bmm/config.yaml`: 설정 로드.
    - `research.template.md`: 도메인 조사 결과물 템플릿.
    - `domain-steps/step-01-init.md`: 도메인 조사 초기화 단계.

#### Create Product Brief
(`_bmad/bmm/workflows/1-analysis/create-product-brief/workflow.md`)
- **개요**: 사용자와 협력하여 포괄적인 제품 브리프(Product Brief)를 작성합니다.
- **주요 내용**: 비즈니스 분석가(Business Analyst)로서 사용자의 아이디어를 구체적인 제품 브리프로 발전시킵니다.
- **참조 파일**:
    - `_bmad/bmm/config.yaml`: 설정 로드.
    - `steps/step-01-init.md`: 워크플로우 시작 단계.

### 2. 워크플로우 계획 (Plan Workflows)

#### Create PRD
(`_bmad/bmm/workflows/2-plan-workflows/create-prd/workflow-create-prd.md`)
- **개요**: 구조화된 워크플로우를 통해 포괄적인 PRD(제품 요구 사항 문서)를 작성합니다.
- **주요 내용**: PM Facilitator로서 새로운 PRD를 처음부터 작성하는 과정을 가이드합니다.
- **참조 파일**:
    - `_bmad/bmm/config.yaml`: 설정 로드.
    - `steps-c/step-01-init.md`: PRD 생성 초기화 단계.

#### Edit PRD
(`_bmad/bmm/workflows/2-plan-workflows/create-prd/workflow-edit-prd.md`)
- **개요**: 기존 PRD를 편집하고 개선하여 명확성, 완성도 및 품질을 높입니다.
- **주요 내용**: PRD 개선 전문가로서 기존 문서를 분석하고 수정합니다.
- **참조 파일**:
    - `_bmad/bmm/config.yaml`: 설정 로드.
    - `steps-e/step-e-01-discovery.md`: 수정 작업 시작 단계.

#### Validate PRD
(`_bmad/bmm/workflows/2-plan-workflows/create-prd/workflow-validate-prd.md`)
- **개요**: 기존 PRD를 BMAD 표준에 따라 검증하여 누락된 부분이나 모순을 찾습니다.
- **주요 내용**: 검증 아키텍트/QA 전문가로서 PRD의 완성도를 평가합니다.
- **참조 파일**:
    - `_bmad/bmm/config.yaml`: 설정 로드.
    - `steps-v/step-v-01-discovery.md`: 검증 작업 시작 단계.

#### Create UX Design
(`_bmad/bmm/workflows/2-plan-workflows/create-ux-design/workflow.md`)
- **개요**: UX 디자인 전문가와 협력하여 애플리케이션의 UX 패턴, 룩 앤 필을 계획합니다.
- **주요 내용**: 시각적 탐색과 의사결정을 통해 UX 사양서를 작성합니다.
- **참조 파일**:
    - `_bmad/bmm/config.yaml`: 설정 로드.
    - `ux-design-template.md`: UX 사양서 템플릿.
    - `steps/step-01-init.md`: 디자인 워크플로우 시작.

### 3. 솔루션 설계 (Solutioning)

#### Check Implementation Readiness
(`_bmad/bmm/workflows/3-solutioning/check-implementation-readiness/workflow.md`)
- **개요**: 구현 전 PRD, 아키텍처, 에픽/스토리의 완성도와 정렬을 확인하는 중요한 검증 단계입니다.
- **주요 내용**: 적대적(Adversarial) 검토 방식을 사용하여 계획의 빈틈을 찾아냅니다.
- **참조 파일**:
    - `_bmad/bmm/config.yaml`: 설정 로드.
    - `step-01-document-discovery.md`: 문서 분석 및 검증 시작.

#### Create Architecture
(`_bmad/bmm/workflows/3-solutioning/create-architecture/workflow.md`)
- **개요**: AI 에이전트 간의 일관성을 보장하기 위한 아키텍처 결정을 수행합니다.
- **주요 내용**: 적응형 대화를 통해 의사결정 중심의 아키텍처 문서를 생성합니다.
- **참조 파일**:
    - `_bmad/bmm/config.yaml`: 설정 로드.
    - `architecture-decision-template.md`: 아키텍처 결정 문서 템플릿.
    - `steps/step-01-init.md`: 아키텍처 설계 시작.

#### Create Epics and Stories
(`_bmad/bmm/workflows/3-solutioning/create-epics-and-stories/workflow.md`)
- **개요**: PRD와 아키텍처를 바탕으로 구현 가능한 에픽과 사용자 스토리를 생성합니다.
- **주요 내용**: 사용자 가치 중심의 포괄적인 스토리 목록과 인수 조건(Acceptance Criteria)을 작성합니다.
- **참조 파일**:
    - `_bmad/bmm/config.yaml`: 설정 로드.
    - `steps/step-01-validate-prerequisites.md`: 선행 조건 확인 및 생성 시작.

### 4. 구현 (Implementation)

#### Code Review
(`_bmad/bmm/workflows/4-implementation/code-review/workflow.yaml`)
- **개요**: 적대적 시니어 개발자 관점에서 코드 품질, 테스트 커버리지, 보안 등을 리뷰합니다.
- **주요 내용**: 단순히 "좋아 보임"을 넘어 3-10개의 구체적인 문제를 찾아내고 해결책을 제시합니다.
- **참조 파일**:
    - `config.yaml`: 설정 로드.
    - `instructions.xml`: 리뷰 가이드라인.
    - `checklist.md`: 리뷰 체크리스트.
    - `project-context.md`, `architecture*.md`, `epic*.md`: 문맥 파악용 참조.

#### Correct Course
(`_bmad/bmm/workflows/4-implementation/correct-course/workflow.yaml`)
- **개요**: 스프린트 도중 발생하는 중요한 변경 사항을 관리하고 영향도를 분석합니다.
- **주요 내용**: 변경 요청을 분석하고 해결책을 제안하여 구현 워크플로우로 라우팅합니다.
- **참조 파일**:
    - `config.yaml`: 설정 로드.
    - `instructions.md`: 과정 수정 가이드.
    - `checklist.md`: 검증 체크리스트.
    - `prd*.md`, `epic*.md`, `architecture*.md`: 영향도 분석용 참조.

#### Dev Story
(`_bmad/bmm/workflows/4-implementation/dev-story/workflow.yaml`)
- **개요**: 개별 스토리를 구현하고, 테스트를 작성하며, 인수 조건을 검증합니다.
- **주요 내용**: 실제 코드를 작성하고 테스트를 통과시키는 개발 실행 단계입니다.
- **참조 파일**:
    - `config.yaml`: 설정 로드.
    - `instructions.xml`: 개발 가이드라인.
    - `checklist.md`: 개발 완료 체크리스트.
    - `sprint-status.yaml`: 진행 상황 추적.

#### Sprint Planning
(`_bmad/bmm/workflows/4-implementation/sprint-planning/workflow.yaml`)
- **개요**: 구현을 위한 스프린트 상태 추적 파일(`sprint-status.yaml`)을 생성하고 관리합니다.
- **주요 내용**: 모든 에픽과 스토리를 추출하여 개발 수명 주기를 추적할 준비를 합니다.
- **참조 파일**:
    - `config.yaml`: 설정 로드.
    - `instructions.md`: 플래닝 가이드.
    - `sprint-status-template.yaml`: 상태 파일 템플릿.
    - `epic*.md`: 에픽 및 스토리 소스.

#### Sprint Status
(`_bmad/bmm/workflows/4-implementation/sprint-status/workflow.yaml`)
- **개요**: 현재 스프린트 상태를 요약하고 위험 요소를 드러내며 적절한 워크플로우로 안내합니다.
- **주요 내용**: `sprint-status.yaml`을 분석하여 다음에 무엇을 해야 할지 가이드합니다.
- **참조 파일**:
    - `config.yaml`: 설정 로드.
    - `instructions.md`: 상태 분석 가이드.
    - `sprint-status.yaml`: 스프린트 상태 소스.

#### Retrospective
(`_bmad/bmm/workflows/4-implementation/retrospective/workflow.yaml`)
- **개요**: 에픽 완료 후 성공 여부를 검토하고 교훈을 도출합니다.
- **주요 내용**: 완료된 에픽을 회고하고 다음 에픽을 위한 개선점을 찾습니다.
- **참조 파일**:
    - `instructions.md`: 회고 가이드.
    - `epic*.md`: 완료된 에픽.
    - `sprint-status.yaml`: 상태 확인.

#### Create Story
(`_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml`)
- **개요**: 에픽에서 다음 개발할 사용자 스토리를 구체화하고 개발 준비 상태로 만듭니다.
- **주요 내용**: `Ready for Dev` 상태의 상세한 스토리 파일을 생성합니다.
- **참조 파일**:
    - `template.md`: 스토리 템플릿.
    - `instructions.xml`: 스토리 생성 가이드.
    - `epics.md` / `epic*.md`: 소스 에픽.

### 퀵 플로우 (Quick Flow)

#### Quick Dev
(`_bmad/bmm/workflows/bmad-quick-flow/quick-dev/workflow.md`)
- **개요**: 기술 사양(Tech-Spec) 또는 직접적인 지시를 통해 빠르고 유연하게 개발을 수행합니다.
- **주요 내용**: 복잡한 절차 없이 빠르게 코드를 구현하는 풀스택 개발자 모드입니다.
- **참조 파일**:
    - `config.yaml`: 설정 로드.
    - `steps/step-01-mode-detection.md`: 모드 감지 및 시작.
    - `quick-spec/workflow.md`: 사양서 필요시 연동.

#### Quick Spec
(`_bmad/bmm/workflows/bmad-quick-flow/quick-spec/workflow.md`)
- **개요**: 대화형으로 기술 사양을 엔지니어링하여 구현 준비가 된 문서를 생성합니다.
- **주요 내용**: 코드를 조사하고 질문하여 완벽한 `Ready for Development` 사양서를 만듭니다.
- **참조 파일**:
    - `config.yaml`: 설정 로드.
    - `steps/step-01-understand.md`: 사양 작성 시작.

### 프로젝트 관리 (Project Management)

#### Document Project
(`_bmad/bmm/workflows/document-project/workflow.yaml`)
- **개요**: 브라운필드(기존) 프로젝트를 분석하여 참조 문서를 생성합니다.
- **주요 내용**: 코드베이스와 아키텍처를 스캔하여 AI 개발을 위한 지식 베이스를 구축합니다.
- **참조 파일**:
    - `config.yaml`: 설정 로드.
    - `documentation-requirements.csv`: 문서화 요구사항 정의.
    - `instructions.md`: 문서화 가이드.

#### Generate Project Context
(`_bmad/bmm/workflows/generate-project-context/workflow.md`)
- **개요**: AI 에이전트가 코드를 구현할 때 따라야 할 규칙과 패턴을 담은 `project-context.md`를 생성합니다.
- **주요 내용**: LLM 컨텍스트 효율성에 최적화된 핵심 규칙 파일을 만듭니다.
- **참조 파일**:
    - `config.yaml`: 설정 로드.
    - `project-context-template.md`: 컨텍스트 파일 템플릿.
    - `steps/step-01-discover.md`: 규칙 발견 및 생성 시작.

### QA

#### QA Automate
(`_bmad/bmm/workflows/qa/automate/workflow.yaml`)
- **개요**: 표준 테스트 패턴을 사용하여 기존 기능에 대한 테스트를 빠르게 생성합니다.
- **주요 내용**: 소스 코드를 분석하고 자동으로 테스트 케이스를 생성합니다.
- **참조 파일**:
    - `config.yaml`: 설정 로드.
    - `instructions.md`: 자동화 가이드.
    - `checklist.md`: 품질 체크리스트.
