# BMB (Building Module Builder) Workflows

BMB는 BMAD 자체를 메타 프로그래밍하도록 설계된 에이전트 및 워크플로우 제품군입니다. BMAD Core 표준에 따라 에이전트, 모듈 및 워크플로우를 생성, 편집 및 검증하는 도구를 제공합니다.

## Agents

### `bmad-agent-bmb-agent-builder`
**파일**: `_bmad/bmb/agents/agent-builder.md`
**이름**: **Bond** (Agent Building Expert)
**개요**: 새로운 에이전트 생성을 돕는 전문가입니다.
**역할**: Agent Architecture Specialist + BMAD Compliance Expert
**주요 기능 (메뉴)**:
- `[CA] Create Agent`: 새로운 BMAD 에이전트 생성 ([`workflow-create-agent.md`](#bmad-bmb-create-agent))
- `[EA] Edit Agent`: 기존 에이전트 수정 ([`workflow-edit-agent.md`](#bmad-bmb-edit-agent))
- `[VA] Validate Agent`: 에이전트 검증 ([`workflow-validate-agent.md`](#bmad-bmb-validate-agent))
- `[PM] Party Mode`: 파티 모드 시작
- `[DA] Dismiss`: 에이전트 종료

### `bmad-agent-bmb-module-builder`
**파일**: `_bmad/bmb/agents/module-builder.md`
**이름**: **Morgan** (Module Creation Master)
**개요**: 새로운 모듈 생성을 돕는 전문가입니다.
**역할**: Module Architecture Specialist + Full-Stack Systems Designer
**주요 기능 (메뉴)**:
- `[PB] Product Brief`: 모듈 개발을 위한 제품 브리프 작성 ([`workflow-create-module-brief.md`](#bmad-bmb-create-module-brief))
- `[CM] Create Module`: 완전한 BMAD 모듈 생성 ([`workflow-create-module.md`](#bmad-bmb-create-module))
- `[EM] Edit Module`: 모듈 수정 ([`workflow-edit-module.md`](#bmad-bmb-edit-module))
- `[VM] Validate Module`: 모듈 검증 ([`workflow-validate-module.md`](#bmad-bmb-validate-module))
- `[PM] Party Mode`: 파티 모드 시작
- `[DA] Dismiss`: 에이전트 종료

### `bmad-agent-bmb-workflow-builder`
**파일**: `_bmad/bmb/agents/workflow-builder.md`
**이름**: **Wendy** (Workflow Building Master)
**개요**: 새로운 워크플로우 생성을 돕는 전문가입니다.
**역할**: Workflow Architecture Specialist + Process Design Expert
**주요 기능 (메뉴)**:
- `[CW] Create Workflow`: 새로운 워크플로우 생성 ([`workflow-create-workflow.md`](#bmad-bmb-create-workflow))
- `[EW] Edit Workflow`: 워크플로우 수정 ([`workflow-edit-workflow.md`](#bmad-bmb-edit-workflow))
- `[VW] Validate Workflow`: 워크플로우 검증 ([`workflow-validate-workflow.md`](#bmad-bmb-validate-workflow))
- `[MV] Max Parallel Validation`: 최대 병렬 모드로 검증 ([`workflow-validate-max-parallel-workflow.md`](#bmad-bmb-validate-max-parallel-workflow))
- `[RW] Rework Workflow`: V6 호환 버전으로 재작업 ([`workflow-rework-workflow.md`](#bmad-bmb-rework-workflow))
- `[PM] Party Mode`: 파티 모드 시작
- `[DA] Dismiss`: 에이전트 종료

## Workflows

### Agent Workflows

#### `bmad-bmb-create-agent`
**파일**: `_bmad/bmb/workflows/agent/workflow-create-agent.md`
**개요**: 모범 사례와 규정을 준수하여 새로운 BMAD 에이전트를 생성합니다.
**역할**: Agent Architect
**실행 흐름**:
1. **구성 로드**: `config.yaml` 로드.
2. **생성 모드 진입**: `steps-c/step-01-brainstorm.md` 실행.
   - **Step 1: Brainstorming (Optional)** (`step-01-brainstorm.md`)
     - 사용자에게 브레인스토밍 기회 제공.
     - (Yes) 브레인스토밍 워크플로우 실행 -> (No) 바로 발견(Discovery) 단계로 이동.
     - 다음 단계: `step-02-discovery.md`.

#### `bmad-bmb-edit-agent`
**파일**: `_bmad/bmb/workflows/agent/workflow-edit-agent.md`
**개요**: 기존 BMAD 에이전트의 무결성을 유지하며 수정합니다.
**실행 흐름**:
1. **구성 로드**: `config.yaml` 로드.
2. **수정 모드 진입**: 해당 에이전트 파일 경로 요청 후 `steps-e/e-01-load-existing.md` 실행.
   - **Step 1: Load Existing Agent** (`e-01-load-existing.md`)
     - 에이전트 파일 로드 및 파싱 (Metadata, Persona, Commands 등 분석).
     - 수정 계획(Edit Plan) 문서 생성.
     - 다음 단계: `e-02-discover-edits.md`.

#### `bmad-bmb-validate-agent`
**파일**: `_bmad/bmb/workflows/agent/workflow-validate-agent.md`
**개요**: 기존 BMAD 에이전트를 검증하고 개선 제안을 제공합니다.
**실행 흐름**:
1. ** 구성 로드**: `config.yaml` 로드.
2. **검증 모드 진입**: 에이전트 파일 경로 요청 후 `steps-v/v-01-load-review.md` 실행.
   - **Step 1: Load Agent for Review** (`v-01-load-review.md`)
     - 에이전트 파일 로드 및 요약 표시.
     - 검증 보고서(Validation Report) 초기화.
     - 다음 단계: `v-02a-validate-metadata.md`.

---

### Module Workflows

#### `bmad-bmb-create-module-brief`
**파일**: `_bmad/bmb/workflows/module/workflow-create-module-brief.md`
**개요**: BMAD 모듈 개발을 위한 제품 브리프(Vision Document)를 작성합니다.
**실행 흐름**:
1. **구성 로드**: `config.yaml` 로드.
2. **브리프 모드 진입**: `steps-b/step-01-welcome.md` 실행.
   - **Step 1: Welcome & Mode Selection** (`step-01-welcome.md`)
     - 협업 모드 선택 (Interactive/Express/YOLO).
     - 초기 아이디어 수집.
     - 다음 단계: `step-02-spark.md`.

#### `bmad-bmb-create-module`
**파일**: `_bmad/bmb/workflows/module/workflow-create-module.md`
**개요**: 브리프를 바탕으로 에이전트, 워크플로우, 폴더 구조를 포함한 완전한 BMAD 모듈을 생성합니다.
**실행 흐름**:
1. **구성 로드**: `config.yaml` 로드.
2. **생성 모드 진입**: 브리프 경로 요청 후 `steps-c/step-01-load-brief.md` 실행.
   - **Step 1: Load Brief** (`step-01-load-brief.md`)
     - 모듈 브리프 로드 또는 사용자 작성 내용 입력.
     - 브리프 완전성 검증 (누락 시 Advanced Elicitation 사용).
     - 빌드 추적 파일 생성.
     - 다음 단계: `step-02-structure.md`.

#### `bmad-bmb-edit-module`
**파일**: `_bmad/bmb/workflows/module/workflow-edit-module.md`
**개요**: 기존 BMAD 모듈을 일관성을 유지하며 수정합니다.
**실행 흐름**:
1. **구성 로드**: `config.yaml` 로드.
2. **수정 모드 진입**: 모듈 경료 요청 후 `steps-e/step-01-load-target.md` 실행.
   *참고: 워크플로우 파일에는 `step-01-assess.md`로 언급되어 있으나 실제 파일은 `step-01-load-target.md`로 확인됨.*

#### `bmad-bmb-validate-module`
**파일**: `_bmad/bmb/workflows/module/workflow-validate-module.md`
**개요**: BMAD 모듈의 규정 준수 여부를 검증합니다.
**실행 흐름**:
1. **구성 로드**: `config.yaml` 로드.
2. **검증 모드 진입**: 모듈 경로 요청 후 `steps-v/step-01-load-target.md` 실행.
   *참고: 워크플로우 파일에는 `step-01-validate.md`로 참조되어 있으나, 실제 디렉토리에는 `step-01-load-target.md`가 존재함.*
   - **Step 1: Load Target** (`steps-v/step-01-load-target.md`)
     - 검증 대상 선택 (Brief/Module/Agents/Workflows/Full).
     - 대상 로드 및 검증 보고서 초기화.
     - 다음 단계: `step-02-file-structure.md`.

#### `bmad-bmb-module-help-generate`
**파일**: `_bmad/bmb/workflows/module/module-help-generate.md`
**개요**: 모듈의 모든 기능(워크플로우, 에이전트, 커맨드)을 중앙 레지스트리인 `module-help.csv` 파일로 생성/업데이트합니다.
**실행 흐름**:
1. 타겟 모듈 식별 및 `module.yaml` 로드.
2. 기존 `module-help.csv` 확인 (존재 시 업데이트/검증).
3. 워크플로우 및 에이전트 디렉토리 스캔.
4. 단계(Phasing) 전략 결정 (Anytime vs Phased).
5. CSV 콘텐츠 생성 및 `module-help.csv` 작성.

---

### Workflow Workflows

#### `bmad-bmb-create-workflow`
**파일**: `_bmad/bmb/workflows/workflow/workflow-create-workflow.md`
**개요**: 적절한 구조와 모범 사례를 갖춘 새로운 BMAD 워크플로우를 생성합니다.
**실행 흐름**:
1. **구성 로드**: `config.yaml` 로드.
2. **생성 모드 선택**: 처음부터 만들기(From Scratch) vs 변환하기(Convert).
3. **라우팅**:
   - **From Scratch**: `steps-c/step-01-discovery.md` 실행.
     - **Step 1: Discovery** (`step-01-discovery.md`)
       - 사용자 아이디어 청취 및 이해.
       - 예시 제공 및 구현 계획 초안 작성.
       - 다음 단계: `step-02-classification.md`.
   - **Convert**: `steps-c/step-00-conversion.md` 실행.

#### `bmad-bmb-edit-workflow`
**파일**: `_bmad/bmb/workflows/workflow/workflow-edit-workflow.md`
**개요**: 기존 BMAD 워크플로우의 무결성을 유지하며 수정합니다.
**실행 흐름**:
1. **구성 로드**: `config.yaml` 로드.
2. **수정 모드 진입**: 워크플로우 경로 요청 후 `steps-e/step-e-01-assess-workflow.md` 실행.
   - **Step 1: Assess Workflow** (`step-e-01-assess-workflow.md`)
     - 워크플로우 로드 및 규정 준수(Step-file architecture) 확인.
     - 비준수 시 변환(Convert) 프로세스로 유도.
     - 검증 보고서 존재 여부 확인.
     - 수정 계획(Edit Plan) 생성.
     - 다음 단계: `step-e-02-discover-edits.md`.

#### `bmad-bmb-rework-workflow`
**파일**: `_bmad/bmb/workflows/workflow/workflow-rework-workflow.md`
**개요**: 기존 워크플로우를 V6 호환 버전으로 재작업합니다.
**상태**: **주의 필요** - 참조된 `steps-r/step-01-assess-rework.md` 파일 및 `steps-r` 디렉토리가 식별되지 않음.

#### `bmad-bmb-validate-workflow`
**파일**: `_bmad/bmb/workflows/workflow/workflow-validate-workflow.md`
**개요**: BMAD 워크플로우의 모범 사례 준수 여부를 검증합니다.
**실행 흐름**:
1. **구성 로드**: `config.yaml` 로드.
2. **검증 모드 진입**: 워크플로우 경로 요청 후 `steps-v/step-01-validate.md` 실행.

#### `bmad-bmb-validate-max-parallel-workflow`
**파일**: `_bmad/bmb/workflows/workflow/workflow-validate-max-parallel-workflow.md`
**개요**: 병렬 처리를 지원하는 도구를 사용하여 워크플로우를 최대 병렬 모드로 검증합니다.
**실행 흐름**:
1. **구성 로드**: `config.yaml` 로드.
2. **검증 모드 진입**: 워크플로우 경로 요청 후 `steps-v/step-01-validate-max-mode.md` 실행.
