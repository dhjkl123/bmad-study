# TEA (Test Engineering Architecture) Workflows

TEA는 리스크 기반 테스팅, 테스트 자동화, CI/CD 품질 게이트 구축을 위한 테스트 아키텍처 전문 모듈입니다. 테스트 설계부터 프레임워크 구축, ATDD, 자동화 확장, 코드 리뷰, NFR 평가, 추적성 매트릭스까지 테스트 생명주기 전체를 다룹니다.

---

## Agents

### TEA (Murat)
- **파일**: `_bmad/tea/agents/tea.md`
- **이름**: **Murat** (Master Test Architect and Quality Advisor)
- **역할**: 마스터 테스트 아키텍트. 리스크 기반 테스팅, 픽스처 아키텍처, ATDD, API/UI 자동화, CI/CD 거버넌스, 확장 가능한 품질 게이트를 전문으로 합니다.
- **커뮤니케이션 스타일**: 데이터와 직관을 결합하며, "Strong opinions, weakly held"를 모토로 리스크 계산과 영향 평가로 소통합니다.
- **핵심 원칙**:
    - 리스크 기반 테스팅 - 영향도에 따라 깊이를 조절
    - 데이터 기반 품질 게이트
    - 사용 패턴(API, UI 또는 둘 다)을 반영하는 테스트
    - 테스트 불안정성(Flakiness)은 핵심 기술 부채
    - 낮은 수준의 테스트 우선 (Unit > Integration > E2E)
    - API 테스트는 일급 시민
- **지원 기술 스택**: Playwright, Cypress, pytest, JUnit, Go test, xUnit, RSpec / GitHub Actions, GitLab CI, Jenkins, Azure DevOps, Harness CI
- **주요 기능 (메뉴)**:
    - `[TMT] Teach Me Testing`: 테스팅 기초부터 고급까지 7개 세션의 인터랙티브 학습 (`teach-me-testing/workflow.md`)
    - `[TF] Test Framework`: 프로덕션 수준 테스트 프레임워크 초기화 (`framework/workflow.yaml`)
    - `[AT] ATDD`: 개발 전 실패하는 수용 테스트 생성 - TDD Red Phase (`atdd/workflow.yaml`)
    - `[TA] Test Automation`: 테스트 커버리지 확장 (`automate/workflow.yaml`)
    - `[TD] Test Design`: 시스템/에픽 수준 리스크 평가 및 커버리지 전략 (`test-design/workflow.yaml`)
    - `[TR] Trace Requirements`: 요구사항-테스트 추적성 매트릭스 및 품질 게이트 결정 (`trace/workflow.yaml`)
    - `[NR] Non-Functional Requirements`: NFR 평가 및 권고 (`nfr-assess/workflow.yaml`)
    - `[CI] Continuous Integration`: CI/CD 품질 파이프라인 구축 (`ci/workflow.yaml`)
    - `[RV] Review Tests`: 지식 베이스 기반 테스트 품질 검토 (`test-review/workflow.yaml`)
    - `[PM] Party Mode`: 멀티 에이전트 협업 모드 시작
    - `[DA] Dismiss Agent`: 에이전트 종료

---

## Knowledge Base

TEA 에이전트는 `_bmad/tea/testarch/knowledge/` 디렉토리에 40개의 지식 프래그먼트를 보유하며, `tea-index.csv`를 통해 태그 기반으로 필요한 지식만 JIT(Just-In-Time) 로드합니다.

### 프래그먼트 공통 구조

| 섹션 | 내용 |
|------|------|
| **Title** | 프래그먼트 이름 |
| **Principle** | 핵심 원칙 (1-3문장) |
| **Rationale** | 이 원칙이 왜 중요한지 설명 |
| **Pattern Examples** | 코드 예시 포함 구현 패턴 |
| **Integration Points** | 다른 프래그먼트 및 워크플로우와의 연결 |
| **Checklist** | 실행 가능한 점검 항목 |

### 티어별 요약

| 티어 | 수량 | 용도 | 로드 시점 |
|------|------|------|-----------|
| **Core** | 14개 | 모든 테스트 아키텍처 결정의 기반 | 대부분의 워크플로우에서 기본 로드 |
| **Extended** | 16개 | 특정 기술·패턴의 심층 가이드 | 관련 워크플로우 단계에서 JIT 로드 |
| **Specialized** | 10개 | Pact, LaunchDarkly, 이메일 인증 등 전문 영역 | 해당 기술 사용 시에만 로드 |

### 주제별 분류

| 주제 | 프래그먼트 |
|------|-----------|
| **테스트 전략·거버넌스** | `risk-governance`, `probability-impact`, `test-quality`, `test-levels`, `test-priorities`, `selective-testing`, `nfr-criteria`, `adr-quality-readiness-checklist` |
| **테스트 안정성·디버깅** | `network-first`, `test-healing-patterns`, `selector-resilience`, `timing-debugging`, `error-handling`, `visual-debugging` |
| **픽스처·데이터 아키텍처** | `fixture-architecture`, `data-factories`, `fixtures-composition` |
| **Playwright Utils** | `overview`, `api-request`, `auth-session`, `network-recorder`, `intercept-network-call`, `recurse`, `log`, `file-utils`, `burn-in`, `network-error-monitor`, `playwright-cli` |
| **CI/CD·자동화** | `ci-burn-in`, `burn-in`, `selective-testing` |
| **컴포넌트·UI 테스팅** | `component-tdd`, `playwright-config`, `selector-resilience`, `feature-flags` |
| **API·계약 테스팅** | `api-request`, `api-testing-patterns`, `contract-testing`, `pactjs-utils-overview`, `pactjs-utils-consumer-helpers`, `pactjs-utils-provider-verifier`, `pactjs-utils-request-filter`, `pact-mcp` |
| **특수 인증·보안** | `auth-session`, `email-auth` |

### Core Tier (14개)

핵심 프래그먼트. 대부분의 워크플로우에서 기본적으로 참조됩니다.

#### 1. Fixture Architecture Playbook
- **파일**: `fixture-architecture.md` | **태그**: `fixtures`, `architecture`, `playwright`, `cypress`
- **원칙**: 테스트 헬퍼를 순수 함수로 먼저 작성한 뒤, 프레임워크별 픽스처로 감싼다. 상속 대신 `mergeTests`(Playwright) 또는 레이어드 커맨드(Cypress)로 기능을 조합한다. 각 픽스처는 하나의 독립된 관심사(인증, API, 로그, 네트워크)만 해결해야 한다.

#### 2. Network-First Safeguards
- **파일**: `network-first.md` | **태그**: `network`, `stability`, `playwright`, `cypress`, `ui`
- **원칙**: 네트워크 인터셉션은 **네비게이션이나 사용자 액션보다 먼저** 등록해야 한다. 인터셉션 프로미스를 저장하고 트리거 단계 직후 즉시 await한다. 암시적 대기를 네트워크 응답, 스피너 소멸, 이벤트 훅 등 결정적 신호 기반으로 교체한다.

#### 3. Data Factories and API-First Setup
- **파일**: `data-factories.md` | **태그**: `data`, `factories`, `setup`, `api`, `backend`, `seeding`
- **원칙**: 오버라이드를 받아 완전한 객체를 반환하는 팩토리 함수(`createUser(overrides)`)를 선호한다. UI 방문 전에 API, 태스크, 직접 DB 헬퍼로 테스트 상태를 시딩한다. UI는 검증 전용이지, 설정용이 아니다.

#### 4. Risk Governance and Gatekeeping
- **파일**: `risk-governance.md` | **태그**: `risk`, `governance`, `gates`
- **원칙**: 리스크 거버넌스는 주관적인 "배포해도 되나?" 논쟁을 객관적이고 데이터 기반의 결정으로 전환한다. 리스크를 스코어링(확률 × 영향)하고, 카테고리(TECH, SEC, PERF 등)로 분류하며, 완화 소유권을 추적하여 속도와 안전성의 균형을 잡는 투명한 품질 게이트를 생성한다.

#### 5. Probability and Impact Scale
- **파일**: `probability-impact.md` | **태그**: `risk`, `scoring`, `scale`
- **원칙**: 리스크 스코어링은 **확률 × 영향** 매트릭스(1-9 척도)를 사용하여 테스팅 노력의 우선순위를 결정한다. 높은 점수(6-9)는 즉각적인 조치, 낮은 점수(1-3)는 문서화만 필요하다.

#### 6. Test Quality Definition of Done
- **파일**: `test-quality.md` | **태그**: `quality`, `definition-of-done`, `tests`
- **원칙**: 테스트는 결정적, 격리적, 명시적, 집중적, 빠르게 실행되어야 한다. 모든 테스트는 1.5분 이내 실행, 300줄 미만, 하드 대기와 조건문 금지, 단언문은 테스트 본문에 가시적이어야 하며, 병렬 실행을 위해 자체 정리해야 한다.

#### 7. Test Levels Framework
- **파일**: `test-levels-framework.md` | **태그**: `testing`, `levels`, `selection`, `api`, `backend`, `ui`
- **원칙**: 다양한 시나리오에 적합한 테스트 수준(유닛, 통합, E2E)을 결정하기 위한 포괄적 가이드. 가능하면 낮은 수준의 테스트를 우선한다.

#### 8. Test Priorities Matrix
- **파일**: `test-priorities-matrix.md` | **태그**: `testing`, `prioritization`, `risk`
- **원칙**: 리스크, 중요도, 비즈니스 영향을 기반으로 테스트 시나리오의 우선순위를 결정하는 가이드. P0(크리티컬)부터 P3(낮음)까지 분류하고, 커버리지 타겟과 실행 순서를 정의한다.

#### 9. Test Healing Patterns
- **파일**: `test-healing-patterns.md` | **태그**: `healing`, `debugging`, `patterns`
- **원칙**: 일반적인 테스트 실패는 예측 가능한 패턴을 따른다 (오래된 셀렉터, 레이스 컨디션, 동적 데이터 단언, 네트워크 오류, 하드 대기). **자동 힐링**은 실패 시그니처를 식별하고 패턴 기반 수정을 적용한다.

#### 10. Selector Resilience
- **파일**: `selector-resilience.md` | **태그**: `selectors`, `locators`, `debugging`, `ui`
- **원칙**: 견고한 셀렉터는 엄격한 계층을 따른다: **data-testid > ARIA 역할 > 텍스트 콘텐츠 > CSS/ID** (최후의 수단). 셀렉터는 UI 변경(스타일링, 레이아웃, 콘텐츠 업데이트)에 내성을 갖고 유지보수를 위해 사람이 읽을 수 있어야 한다.

#### 11. Playwright Utils Overview
- **파일**: `overview.md` | **태그**: `playwright-utils`, `fixtures`, `api`, `backend`, `ui`
- **원칙**: `@seontechnologies/playwright-utils`의 프로덕션 수준 픽스처 기반 유틸리티를 사용한다. 테스트 헬퍼를 순수 함수로 먼저 작성하고 프레임워크별 픽스처로 감싼다. **순수 API 테스팅(브라우저 없음)과 UI 테스팅 모두에서 동일하게 작동한다.**

#### 12. API Request Utility
- **파일**: `api-request.md` | **태그**: `api`, `backend`, `service-testing`, `api-testing`, `playwright-utils`, `openapi`, `codegen`, `operation`
- **원칙**: 내장 스키마 검증과 서버 오류 자동 재시도를 갖춘 타입 안전 HTTP 클라이언트를 사용한다. URL 해석, 헤더 관리, 응답 파싱, 단일 라인 응답 검증을 처리한다. **브라우저 없이 작동** — 순수 API/서비스 테스팅에 이상적이다.

#### 13. Auth Session Utility
- **파일**: `auth-session.md` | **태그**: `auth`, `playwright-utils`, `api`, `backend`, `jwt`, `token`
- **원칙**: 인증 토큰을 디스크에 영속화하고 테스트 실행 간에 재사용한다. 다중 사용자 식별자, 임시 인증, 병렬 실행을 위한 워커별 계정을 지원한다. 한 번 토큰을 가져와 어디서나 사용한다. **API 전용 테스트와 브라우저 테스트 모두에서 작동한다.**

#### 14. Playwright CLI — Browser Automation for Coding Agents
- **파일**: `playwright-cli.md` | **태그**: `cli`, `browser`, `agent`, `automation`, `snapshot`
- **원칙**: AI 에이전트가 웹페이지를 확인할 때(스냅샷, 셀렉터 획득, 스크린샷 캡처) 수천 토큰의 DOM 트리와 도구 스키마를 컨텍스트 윈도우에 로드할 필요가 없다. Playwright CLI는 간단한 셸 명령으로 브라우저와 대화할 수 있는 경량 방식을 제공하여 추론과 코드 생성을 위한 컨텍스트 윈도우를 확보한다.

### Extended Tier (16개)

확장 프래그먼트. 특정 워크플로우 단계에서 필요에 따라 로드됩니다.

#### 15. Component Test-Driven Development Loop
- **파일**: `component-tdd.md` | **태그**: `component-testing`, `tdd`, `ui`
- **원칙**: 모든 UI 변경은 실패하는 컴포넌트 테스트로 시작한다. Red-Green-Refactor 사이클을 따른다: 실패하는 테스트 작성(red) → 최소 코드로 통과(green) → 구현 개선(refactor). 컴포넌트 테스트는 100줄 미만, 테스트마다 새로운 프로바이더로 격리, 기능과 함께 접근성도 검증한다.

#### 16. Playwright Configuration Guardrails
- **파일**: `playwright-config.md` | **태그**: `playwright`, `config`, `env`
- **원칙**: 중앙 맵(`envConfigMap`)으로 환경 설정을 로드하고, 타임아웃을 표준화(액션 15초, 네비게이션 30초, expect 10초, 테스트 60초)하며, HTML + JUnit 리포터를 출력하고, `test-results/`에 아티팩트를 저장한다. `.env.example`, `.nvmrc`, 브라우저 의존성을 버전 관리하여 로컬과 CI 실행을 일치시킨다.

#### 17. CI Pipeline and Burn-In Strategy
- **파일**: `ci-burn-in.md` | **태그**: `ci`, `automation`, `flakiness`
- **원칙**: CI 파이프라인은 테스트를 안정적으로, 빠르게 실행하고 명확한 피드백을 제공해야 한다. 번인 테스팅(변경된 테스트를 여러 번 실행)은 머지 전에 불안정성을 걸러낸다. 잡을 전략적으로 스테이징한다: 설치/캐시 한 번, 변경 스펙 먼저 실행(빠른 피드백), 전체 스위트는 샤딩으로 분할(fail-fast 비활성화로 증거 보존).

#### 18. Selective and Targeted Test Execution
- **파일**: `selective-testing.md` | **태그**: `risk-based`, `selection`, `strategy`
- **원칙**: 필요한 테스트만, 필요할 때 실행한다. 태그/grep으로 리스크 우선순위에 따라 스위트를 분할하고, 스펙 패턴이나 git diff로 영향 영역에 집중하며, 우선순위 메타데이터(P0-P3)와 변경 감지를 결합하여 프리커밋 vs CI 실행을 최적화한다.

#### 19. Error Handling and Resilience Checks
- **파일**: `error-handling.md` | **태그**: `resilience`, `error-handling`, `stability`, `api`, `backend`
- **원칙**: 예상되는 실패를 명시적으로 처리한다: 네트워크 오류를 인터셉트하고, UI 폴백(에러 메시지, 재시도)을 단언하며, 범위 지정 예외 처리로 알려진 오류를 무시하면서 회귀를 포착한다. 순차적 실패(500 → 타임아웃 → 성공)를 강제하여 재시도/백오프 로직을 테스트하고 텔레메트리 로깅을 검증한다.

#### 20. Timing Debugging and Race Condition Fixes
- **파일**: `timing-debugging.md` | **태그**: `timing`, `async`, `debugging`
- **원칙**: 레이스 컨디션은 테스트가 비동기 타이밍(네트워크, 애니메이션, 상태 업데이트)에 대해 가정할 때 발생한다. **결정적 대기**는 임의 타임아웃 대신 관찰 가능한 이벤트(네트워크 응답, 엘리먼트 상태 변화)를 명시적으로 기다려 불안정성을 제거한다.

#### 21. Non-Functional Requirements (NFR) Criteria
- **파일**: `nfr-criteria.md` | **태그**: `nfr`, `assessment`, `quality`
- **원칙**: 비기능 요구사항(보안, 성능, 신뢰성, 유지보수성)은 체크리스트가 아닌 **자동화된 테스트로 검증**한다. NFR 평가는 측정 가능한 임계값에 연결된 객관적 합격/불합격 기준을 사용한다. 모호한 요구사항은 명확해질 때까지 CONCERNS로 분류한다.

#### 22. ADR Quality Readiness Checklist
- **파일**: `adr-quality-readiness-checklist.md` | **태그**: `nfr`, `testability`, `adr`, `quality`, `assessment`, `checklist`
- **원칙**: 아키텍처 리뷰(Phase 3)와 NFR 평가 시 시스템 테스트 가능성과 NFR 준수를 평가하기 위한 표준화된 8개 카테고리, 29개 기준의 프레임워크.

#### 23. Network Recorder Utility
- **파일**: `network-recorder.md` | **태그**: `network`, `playwright-utils`, `ui`, `har`
- **원칙**: 테스트 실행 중 네트워크 트래픽을 HAR 파일로 녹화하고, 오프라인 테스팅을 위해 디스크에서 재생한다. 프론트엔드 테스트를 백엔드 서비스로부터 완전히 격리하여 실행할 수 있으며, 지능형 상태 기반 CRUD 감지로 현실적인 API 동작을 재현한다.

#### 24. Intercept Network Call Utility
- **파일**: `intercept-network-call.md` | **태그**: `network`, `playwright-utils`, `ui`
- **원칙**: 단일 선언적 호출로 네트워크 요청을 인터셉트하여 Promise를 반환한다. JSON 응답을 자동 파싱하고, spy(관찰)와 stub(모킹) 패턴을 모두 지원하며, URL 필터링을 위한 강력한 glob 패턴 매칭을 사용한다.

#### 25. Recurse (Polling) Utility
- **파일**: `recurse.md` | **태그**: `polling`, `playwright-utils`, `api`, `backend`, `async`, `eventual-consistency`
- **원칙**: Playwright의 `expect.poll`로 Cypress 스타일 폴링을 사용하여 비동기 조건을 기다린다. 설정 가능한 타임아웃, 인터벌, 로깅, 향상된 오류 분류와 함께 폴링 후 콜백을 제공한다. **백엔드 테스팅에 이상적**: API 엔드포인트의 작업 완료 폴링, 데이터베이스 최종 일관성, 메시지 큐 처리, 캐시 전파.

#### 26. Log Utility
- **파일**: `log.md` | **태그**: `logging`, `playwright-utils`, `api`, `ui`
- **원칙**: Playwright의 테스트 리포트와 통합되는 구조화된 로깅을 사용한다. 객체 로깅, 테스트 스텝 데코레이션, 다중 로그 레벨(info, step, success, warning, error, debug)을 지원한다.

#### 27. File Utilities
- **파일**: `file-utils.md` | **태그**: `files`, `playwright-utils`, `api`, `backend`, `ui`
- **원칙**: CSV, XLSX, PDF, ZIP 파일을 자동 파싱, 타입 안전 결과, 다운로드 처리로 읽고 검증한다. 내장 포맷 지원과 검증 헬퍼로 Playwright 테스트의 파일 작업을 단순화한다.

#### 28. Burn-in Test Runner
- **파일**: `burn-in.md` | **태그**: `ci`, `playwright-utils`
- **원칙**: git diff 분석으로 영향받은 테스트만 실행하는 스마트 테스트 선택을 사용한다. 관련 없는 변경(설정, 타입, 문서)을 필터링하고, 백분율 기반 실행으로 테스트 볼륨을 제어한다. 신뢰성을 유지하면서 불필요한 CI 실행을 줄인다.

#### 29. Network Error Monitor
- **파일**: `network-error-monitor.md` | **태그**: `monitoring`, `playwright-utils`, `ui`
- **원칙**: 테스트 실행 중 HTTP 4xx/5xx 오류가 발생하면 자동으로 감지하고 테스트를 실패시킨다. 테스트를 위한 Sentry처럼 작동 — UI가 단언을 통과하더라도 숨겨진 백엔드 실패를 포착한다.

#### 30. Fixtures Composition with mergeTests
- **파일**: `fixtures-composition.md` | **태그**: `fixtures`, `playwright-utils`
- **원칙**: `mergeTests`를 사용하여 여러 Playwright 픽스처를 결합, 모든 기능을 갖춘 통합 테스트 객체를 생성한다. playwright-utils 픽스처와 프로젝트 커스텀 픽스처를 머지하여 조합 가능한 테스트 인프라를 구축한다.

### Specialized Tier (10개)

전문 프래그먼트. 특정 기술이나 패턴이 필요할 때만 로드됩니다.

#### 31. Feature Flag Governance
- **파일**: `feature-flags.md` | **태그**: `feature-flags`, `governance`, `launchdarkly`
- **원칙**: 피처 플래그는 제어된 롤아웃과 A/B 테스팅을 가능하게 하지만 규율 있는 테스팅 거버넌스가 필요하다. 플래그 정의를 frozen enum으로 중앙화하고, 활성/비활성 상태 모두 테스트하며, 각 스펙 후 타겟팅을 정리하고, 포괄적인 플래그 생명주기 체크리스트를 유지한다.

#### 32. Contract Testing Essentials (Pact)
- **파일**: `contract-testing.md` | **태그**: `contract-testing`, `pact`, `api`, `backend`, `microservices`, `service-contract`
- **원칙**: 계약 테스팅은 통합 E2E 테스트 없이 컨슈머와 프로바이더 서비스 간 API 계약을 검증한다. 컨슈머 계약을 통합 스펙과 함께 저장하고, 계약을 의미론적으로 버전 관리하며, 매 CI 실행마다 발행한다. 머지 전 프로바이더 검증으로 브레이킹 체인지를 즉시 표면화한다.

#### 33. Email-Based Authentication Testing
- **파일**: `email-auth.md` | **태그**: `email-authentication`, `security`, `workflow`
- **원칙**: 이메일 기반 인증(매직 링크, 일회용 코드, 비밀번호 없는 로그인)은 Mailosaur나 Ethereal 같은 이메일 캡처 서비스를 통한 특수 테스팅이 필요하다. HTML 파싱으로 매직 링크를 추출하고, 브라우저 스토리지를 보존하며, 이메일 페이로드를 캐시하고, 부정적 케이스(만료/재사용 링크)를 커버한다.

#### 34. Visual Debugging and Developer Ergonomics
- **파일**: `visual-debugging.md` | **태그**: `debugging`, `dx`, `tooling`, `ui`
- **원칙**: 빠른 피드백 루프와 투명한 디버깅 아티팩트는 테스트 신뢰성과 개발자 신뢰도 유지에 핵심이다. 시각적 디버깅 도구(트레이스 뷰어, 스크린샷, 비디오, HAR 파일)는 불투명한 테스트 실패를 실행 가능한 인사이트로 바꿔, 분류 시간을 수 시간에서 수 분으로 단축한다.

#### 35. API Testing Patterns
- **파일**: `api-testing-patterns.md` | **태그**: `api`, `backend`, `service-testing`, `api-testing`, `microservices`, `graphql`, `no-browser`
- **원칙**: 브라우저 오버헤드 없이 API와 백엔드 서비스를 직접 테스트한다. Playwright의 `request` 컨텍스트로 HTTP 작업, `apiRequest` 유틸리티로 향상된 기능, `recurse`로 비동기 작업을 수행한다. 순수 API 테스트는 더 빠르고, 더 안정적이며, 서비스 레이어 로직에 더 나은 커버리지를 제공한다.

#### 36. Pact.js Utils Overview
- **파일**: `pactjs-utils-overview.md` | **태그**: `pactjs-utils`, `contract-testing`, `pact`, `api`, `backend`, `microservices`
- **원칙**: `@seontechnologies/pactjs-utils`의 프로덕션 수준 유틸리티로 컨슈머 주도 계약 테스팅의 보일러플레이트를 제거한다. `@pact-foundation/pact`를 타입 안전 헬퍼로 감싸, 프로바이더 상태 생성, 검증기 설정, 요청 필터 주입을 제공한다 — HTTP와 메시지(async/Kafka) 계약 모두에서 작동한다.

#### 37. Pact.js Utils Consumer Helpers
- **파일**: `pactjs-utils-consumer-helpers.md` | **태그**: `pactjs-utils`, `consumer`, `contract-testing`, `pact`, `api`
- **원칙**: `createProviderState`와 `toJsonMap`을 사용하여 컨슈머 계약 테스트를 위한 타입 안전 프로바이더 상태 튜플을 생성한다. 수동 `JsonMap` 캐스팅을 제거하고, 모든 컨슈머 pact 인터랙션에서 일관된 파라미터 직렬화를 보장한다.

#### 38. Pact.js Utils Provider Verifier
- **파일**: `pactjs-utils-provider-verifier.md` | **태그**: `pactjs-utils`, `provider`, `contract-testing`, `pact`, `api`, `backend`, `ci`
- **원칙**: `buildVerifierOptions`, `buildMessageVerifierOptions` 등을 사용하여 단일 호출로 프로바이더 검증 설정을 완성한다. 로컬/원격 흐름 감지, 브로커 URL 해석, 컨슈머 버전 셀렉터 전략, CI 인식 버전 태깅을 처리한다.

#### 39. Pact.js Utils Request Filter
- **파일**: `pactjs-utils-request-filter.md` | **태그**: `pactjs-utils`, `auth`, `contract-testing`, `pact`
- **원칙**: `createRequestFilter`와 `noOpRequestFilter`를 사용하여 프로바이더 검증 시 인증 헤더를 주입한다. 플러그형 토큰 생성기 패턴으로 이중 Bearer 버그를 방지하고 인증 관심사를 검증 로직에서 분리한다.

#### 40. Pact MCP Server (SmartBear)
- **파일**: `pact-mcp.md` | **태그**: `pact`, `mcp`, `pactflow`, `contract-testing`, `broker`
- **원칙**: SmartBear MCP 서버를 사용하여 계약 테스팅 워크플로우 중 AI 에이전트와 PactFlow/Pact Broker의 상호작용을 활성화한다. MCP 서버는 pact 테스트 생성, 프로바이더 상태 가져오기, 테스트 품질 리뷰, 배포 안전성 확인 도구를 제공한다 — 모두 Model Context Protocol을 통해 접근 가능하다.

---

## Workflows

### 0. 학습 (Learning)

#### Teach Me Testing (TEA Academy)
(`_bmad/tea/workflows/testarch/teach-me-testing/workflow.md`)
- **개요**: 7개의 점진적 세션을 통해 테스팅 기초부터 고급 실무까지 가르치는 인터랙티브 학습 워크플로우입니다. 세션 간 상태가 유지되며 자기 주도 학습이 가능합니다.
- **주요 내용**: 역할별 맞춤 커리큘럼, 퀴즈, 수료증 발급을 포함합니다.
- **실행 흐름**:
    1. **구성 로드**: `config.yaml` 로드.
    2. **모드 결정**: Create(학습) / Validate(검증) / Edit(수정) 선택.
    3. **Create 모드 진입**: `steps-c/step-01-init.md` 실행.
        - **Step 1: Init** (`step-01-init.md`): 학습 환경 초기화, 진행 파일 확인.
        - **Step 1b: Continue** (`step-01b-continue.md`): 기존 진행 상황 재개.
        - **Step 2: Assess** (`step-02-assess.md`): 학습자 수준 평가.
        - **Step 3: Session Menu** (`step-03-session-menu.md`): 세션 선택.
        - **Step 4: Session 1-7** (`step-04-session-01.md` ~ `step-04-session-07.md`): 7개 세션 실행.
        - **Step 5: Completion** (`step-05-completion.md`): 수료 처리.
- **참조 데이터**:
    - `data/curriculum.yaml`: 커리큘럼 정의.
    - `data/quiz-questions.yaml`: 퀴즈 문항.
    - `data/role-paths.yaml`: 역할별 학습 경로.
    - `data/session-content-map.yaml`: 세션 콘텐츠 매핑.
    - `data/tea-resources-index.yaml`: TEA 리소스 인덱스.
    - `templates/certificate-template.md`: 수료증 템플릿.
    - `templates/progress-template.yaml`: 진행 상태 템플릿.
    - `templates/session-notes-template.md`: 세션 노트 템플릿.

---

### 3. 솔루션 설계 (Solutioning)

#### Test Design
(`_bmad/tea/workflows/testarch/test-design/workflow.yaml`)
- **개요**: 리스크 평가와 커버리지 전략을 포함하는 포괄적인 테스트 설계를 수행합니다. 시스템 수준과 에픽 수준 두 가지 모드를 지원합니다.
- **모드**:
    - **System-Level Mode (Phase 3)**: 아키텍처 테스트 가능성 리뷰. 두 개의 문서 생성 (아키텍처용 + QA팀용 + 핸드오프 문서).
    - **Epic-Level Mode (Phase 4)**: 에픽별 리스크 평가 기반 테스트 계획.
- **실행 흐름**:
    1. **구성 로드**: `config.yaml` 로드.
    2. **Create 모드 진입**: `steps-c/step-01-detect-mode.md` 실행.
        - **Step 1: Detect Mode** (`step-01-detect-mode.md`): 시스템/에픽 모드 자동 감지.
        - **Step 1b: Resume** (`step-01b-resume.md`): 중단된 작업 재개.
        - **Step 2: Load Context** (`step-02-load-context.md`): PRD, 에픽, 아키텍처 문서 로드.
        - **Step 3: Risk & Testability** (`step-03-risk-and-testability.md`): 리스크 평가 및 테스트 가능성 분석.
        - **Step 4: Coverage Plan** (`step-04-coverage-plan.md`): 커버리지 계획 수립.
        - **Step 5: Generate Output** (`step-05-generate-output.md`): 최종 문서 생성.
- **참조 파일**:
    - `instructions.md`: 워크플로우 가이드라인.
    - `checklist.md`: 품질 체크리스트.
    - `test-design-template.md`: 에픽 수준 테스트 설계 템플릿.
    - `test-design-architecture-template.md`: 시스템 수준 아키텍처 템플릿.
    - `test-design-qa-template.md`: 시스템 수준 QA 템플릿.
    - `test-design-handoff-template.md`: TEA→BMAD 핸드오프 문서 템플릿.
- **결과물**: `{test_artifacts}/test-design-*.md`

#### Test Framework
(`_bmad/tea/workflows/testarch/framework/workflow.yaml`)
- **개요**: Playwright 또는 Cypress 기반의 프로덕션 수준 테스트 프레임워크를 초기화합니다. 픽스처, 헬퍼, 설정, 모범 사례를 포함합니다.
- **실행 흐름**:
    1. **구성 로드**: `config.yaml` 로드.
    2. **Create 모드 진입**: `steps-c/step-01-preflight.md` 실행.
        - **Step 1: Preflight** (`step-01-preflight.md`): 기존 프레임워크 감지 및 환경 확인.
        - **Step 1b: Resume** (`step-01b-resume.md`): 중단 재개.
        - **Step 2: Select Framework** (`step-02-select-framework.md`): 프레임워크 선택 (auto/Playwright/Cypress).
        - **Step 3: Scaffold Framework** (`step-03-scaffold-framework.md`): 프레임워크 스캐폴딩.
        - **Step 4: Docs & Scripts** (`step-04-docs-and-scripts.md`): 문서 및 스크립트 생성.
        - **Step 5: Validate & Summary** (`step-05-validate-and-summary.md`): 검증 및 요약.
- **참조 파일**:
    - `instructions.md`: 워크플로우 가이드라인.
    - `checklist.md`: 품질 체크리스트.
- **결과물**: `{test_dir}/README.md` 및 프레임워크 설정 파일

#### CI Setup
(`_bmad/tea/workflows/testarch/ci/workflow.yaml`)
- **개요**: 테스트 실행, 번인 루프(Flaky 감지), 병렬 샤딩, 아티팩트 수집, 알림이 포함된 프로덕션 수준 CI/CD 품질 파이프라인을 구축합니다.
- **지원 플랫폼**: GitHub Actions, GitLab CI, Jenkins, Azure DevOps, Harness CI
- **실행 흐름**:
    1. **구성 로드**: `config.yaml` 로드.
    2. **Create 모드 진입**: `steps-c/step-01-preflight.md` 실행.
        - **Step 1: Preflight** (`step-01-preflight.md`): CI 플랫폼 감지 및 환경 확인.
        - **Step 1b: Resume** (`step-01b-resume.md`): 중단 재개.
        - **Step 2: Generate Pipeline** (`step-02-generate-pipeline.md`): 플랫폼별 파이프라인 생성.
        - **Step 3: Configure Quality Gates** (`step-03-configure-quality-gates.md`): 품질 게이트 설정.
        - **Step 4: Validate & Summary** (`step-04-validate-and-summary.md`): 검증 및 요약.
- **참조 파일**:
    - `instructions.md`: 워크플로우 가이드라인.
    - `checklist.md`: 품질 체크리스트.
    - `github-actions-template.yaml`: GitHub Actions 템플릿.
    - `gitlab-ci-template.yaml`: GitLab CI 템플릿.
    - `azure-pipelines-template.yaml`: Azure Pipelines 템플릿.
    - `jenkins-pipeline-template.groovy`: Jenkins 파이프라인 템플릿.
    - `harness-pipeline-template.yaml`: Harness 파이프라인 템플릿.
- **결과물**: CI 설정 파일 (플랫폼별 경로)

---

### 4. 구현 (Implementation)

#### ATDD (Acceptance Test-Driven Development)
(`_bmad/tea/workflows/testarch/atdd/workflow.yaml`)
- **개요**: 구현 전에 실패하는 수용 테스트를 생성합니다 (TDD Red Phase). E2E/API/Component 수준의 테스트와 구현 체크리스트를 함께 생성합니다.
- **실행 흐름**:
    1. **구성 로드**: `config.yaml` 로드.
    2. **Create 모드 진입**: `steps-c/step-01-preflight-and-context.md` 실행.
        - **Step 1: Preflight & Context** (`step-01-preflight-and-context.md`): 스토리 로드 및 프레임워크 확인.
        - **Step 1b: Resume** (`step-01b-resume.md`): 중단 재개.
        - **Step 2: Generation Mode** (`step-02-generation-mode.md`): 테스트 생성 모드 결정.
        - **Step 3: Test Strategy** (`step-03-test-strategy.md`): 테스트 전략 수립.
        - **Step 4: Generate Tests** (`step-04-generate-tests.md`): 테스트 생성 (병렬 서브프로세스 포함).
            - **Step 4a**: API 실패 테스트 생성 (`step-04a-subprocess-api-failing.md`).
            - **Step 4b**: E2E 실패 테스트 생성 (`step-04b-subprocess-e2e-failing.md`).
            - **Step 4c**: 결과 집계 (`step-04c-aggregate.md`).
        - **Step 5: Validate & Complete** (`step-05-validate-and-complete.md`): 검증 및 완료.
- **참조 파일**:
    - `instructions.md`: 워크플로우 가이드라인.
    - `checklist.md`: 품질 체크리스트.
    - `atdd-checklist-template.md`: ATDD 체크리스트 템플릿.
- **결과물**: `{test_artifacts}/atdd-checklist-{story_id}.md`

#### Test Automation
(`_bmad/tea/workflows/testarch/automate/workflow.yaml`)
- **개요**: 우선순위가 지정된 API/E2E 테스트, 픽스처 및 DoD 요약을 생성하여 테스트 자동화 커버리지를 확장합니다.
- **모드**:
    - **BMad-Integrated**: 스토리/PRD/테스트 설계 아티팩트 활용.
    - **Standalone**: BMad 아티팩트 없이 기존 코드베이스만 분석.
- **실행 흐름**:
    1. **구성 로드**: `config.yaml` 로드.
    2. **Create 모드 진입**: `steps-c/step-01-preflight-and-context.md` 실행.
        - **Step 1: Preflight & Context** (`step-01-preflight-and-context.md`): 컨텍스트 수집.
        - **Step 1b: Resume** (`step-01b-resume.md`): 중단 재개.
        - **Step 2: Identify Targets** (`step-02-identify-targets.md`): 테스트 대상 식별.
        - **Step 3: Generate Tests** (`step-03-generate-tests.md`): 테스트 생성 (병렬 서브프로세스 포함).
            - **Step 3a**: API 테스트 생성 (`step-03a-subprocess-api.md`).
            - **Step 3b**: 백엔드/E2E 테스트 생성 (`step-03b-subprocess-backend.md`, `step-03b-subprocess-e2e.md`).
            - **Step 3c**: 결과 집계 (`step-03c-aggregate.md`).
        - **Step 4: Validate & Summarize** (`step-04-validate-and-summarize.md`): 검증 및 요약.
- **참조 파일**:
    - `instructions.md`: 워크플로우 가이드라인.
    - `checklist.md`: 품질 체크리스트.
- **결과물**: `{test_artifacts}/automation-summary.md`

#### Test Review
(`_bmad/tea/workflows/testarch/test-review/workflow.yaml`)
- **개요**: TEA 지식 베이스와 모범 사례를 기반으로 테스트 품질을 리뷰하여 0-100 품질 점수와 실행 가능한 발견 사항을 산출합니다.
- **범위**: 단일 파일, 디렉토리, 또는 전체 테스트 스위트 선택 가능.
- **실행 흐름**:
    1. **구성 로드**: `config.yaml` 로드.
    2. **Create 모드 진입**: `steps-c/step-01-load-context.md` 실행.
        - **Step 1: Load Context** (`step-01-load-context.md`): 테스트 컨텍스트 로드.
        - **Step 1b: Resume** (`step-01b-resume.md`): 중단 재개.
        - **Step 2: Discover Tests** (`step-02-discover-tests.md`): 테스트 파일 발견.
        - **Step 3: Quality Evaluation** (`step-03-quality-evaluation.md`): 품질 평가 (병렬 서브프로세스 포함).
            - **Step 3a**: 결정론적 평가 (`step-03a-subprocess-determinism.md`).
            - **Step 3b**: 격리성 평가 (`step-03b-subprocess-isolation.md`).
            - **Step 3c**: 유지보수성 평가 (`step-03c-subprocess-maintainability.md`).
            - **Step 3e**: 성능 평가 (`step-03e-subprocess-performance.md`).
            - **Step 3f**: 점수 집계 (`step-03f-aggregate-scores.md`).
        - **Step 4: Generate Report** (`step-04-generate-report.md`): 리뷰 보고서 생성.
- **참조 파일**:
    - `instructions.md`: 워크플로우 가이드라인.
    - `checklist.md`: 품질 체크리스트.
    - `test-review-template.md`: 리뷰 보고서 템플릿.
- **결과물**: `{test_artifacts}/test-review.md`

#### NFR Assessment
(`_bmad/tea/workflows/testarch/nfr-assess/workflow.yaml`)
- **개요**: 성능, 보안, 신뢰성, 유지보수성 등 비기능 요구사항(NFR)을 증거 기반으로 평가하며, 결정적 PASS/CONCERNS/FAIL 결과를 산출합니다.
- **실행 흐름**:
    1. **구성 로드**: `config.yaml` 로드.
    2. **Create 모드 진입**: `steps-c/step-01-load-context.md` 실행.
        - **Step 1: Load Context** (`step-01-load-context.md`): 컨텍스트 로드.
        - **Step 1b: Resume** (`step-01b-resume.md`): 중단 재개.
        - **Step 2: Define Thresholds** (`step-02-define-thresholds.md`): 임계값 정의.
        - **Step 3: Gather Evidence** (`step-03-gather-evidence.md`): 증거 수집.
        - **Step 4: Evaluate & Score** (`step-04-evaluate-and-score.md`): 평가 및 점수화 (병렬 서브프로세스 포함).
            - **Step 4a**: 보안 평가 (`step-04a-subprocess-security.md`).
            - **Step 4b**: 성능 평가 (`step-04b-subprocess-performance.md`).
            - **Step 4c**: 신뢰성 평가 (`step-04c-subprocess-reliability.md`).
            - **Step 4d**: 확장성 평가 (`step-04d-subprocess-scalability.md`).
            - **Step 4e**: NFR 집계 (`step-04e-aggregate-nfr.md`).
        - **Step 5: Generate Report** (`step-05-generate-report.md`): NFR 보고서 생성.
- **참조 파일**:
    - `instructions.md`: 워크플로우 가이드라인.
    - `checklist.md`: 품질 체크리스트.
    - `nfr-report-template.md`: NFR 보고서 템플릿.
- **결과물**: `{test_artifacts}/nfr-assessment.md`

#### Traceability
(`_bmad/tea/workflows/testarch/trace/workflow.yaml`)
- **개요**: 요구사항-테스트 추적성 매트릭스를 생성하고, 커버리지 갭을 분석하며, 품질 게이트 결정(PASS/CONCERNS/FAIL/WAIVED)을 수행합니다.
- **게이트 유형**: Story, Epic, Release, Hotfix 중 선택 가능.
- **실행 흐름**:
    1. **구성 로드**: `config.yaml` 로드.
    2. **Create 모드 진입**: `steps-c/step-01-load-context.md` 실행.
        - **Step 1: Load Context** (`step-01-load-context.md`): 요구사항 및 테스트 컨텍스트 로드.
        - **Step 1b: Resume** (`step-01b-resume.md`): 중단 재개.
        - **Step 2: Discover Tests** (`step-02-discover-tests.md`): 테스트 파일 발견.
        - **Step 3: Map Criteria** (`step-03-map-criteria.md`): 요구사항-테스트 매핑.
        - **Step 4: Analyze Gaps** (`step-04-analyze-gaps.md`): 커버리지 갭 분석.
        - **Step 5: Gate Decision** (`step-05-gate-decision.md`): 품질 게이트 결정.
- **참조 파일**:
    - `instructions.md`: 워크플로우 가이드라인.
    - `checklist.md`: 품질 체크리스트.
    - `trace-template.md`: 추적성 매트릭스 템플릿.
- **결과물**: `{test_artifacts}/traceability-matrix.md`

---

## 공통 워크플로우 구조

모든 TEA 워크플로우는 **Step-File Architecture**를 따르며, 3가지 모드(Tri-Modal Structure)를 지원합니다:

| 모드 | 폴더 | 용도 |
|------|------|------|
| **Create** | `steps-c/` | 새로운 아티팩트 생성 |
| **Edit** | `steps-e/` | 기존 아티팩트 수정 (`step-01-assess.md` → `step-02-apply-edit.md`) |
| **Validate** | `steps-v/` | 아티팩트 검증 (`step-01-validate.md`) |

### Step-File Architecture 핵심 원칙
- **Micro-file Design**: 각 스텝은 독립적인 명령 파일
- **Just-In-Time Loading**: 현재 스텝만 메모리에 로드
- **Sequential Enforcement**: 순서대로 실행, 건너뛰기 불가
- **State Tracking**: 각 스텝 완료 후 상태 저장
- **Continuable**: `step-01b-resume.md`를 통해 중단된 작업 재개 가능

### 설정 (Configuration)
- **설정 소스**: `_bmad/tea/config.yaml`
- **주요 변수**: `user_name`, `communication_language`, `output_folder`, `test_artifacts`
- **TEA 전용 설정**: `tea_use_playwright_utils`, `tea_use_pactjs_utils`, `tea_pact_mcp`, `tea_browser_automation`, `test_stack_type`, `ci_platform`, `test_framework`, `risk_threshold`
- **결과물 경로**: `{project-root}/_bmad-output/test-artifacts/`
