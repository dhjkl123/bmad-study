# Doc 탭 구현 계획서

## 1. 개요

BMAD Ecosystem 플로우차트 앱에 **Doc 탭**을 추가하여, 모듈/에이전트/워크플로우에 대한 구체적인 설명과 사용방법을 제공한다. 2컬럼 레이아웃(사이드바 + 콘텐츠)으로 구성하며, 전용 검색과 글로벌 검색 모두를 통해 원하는 내용을 즉시 찾아갈 수 있게 한다.

---

## 2. 수정 대상 파일

| 파일 | 변경 내용 |
|------|----------|
| `index.html` | doc 탭 버튼 + doc-view 컨테이너 추가 |
| `app.js` | switchTab 확장, doc 렌더링, doc 검색 로직 |
| `styles.css` | doc-view 관련 스타일 전체 |
| `doc-data.js` (신규) | 문서 데이터 |

---

## 3. 사이드바 메뉴 구조 (상세)

### 3.1 시작하기

#### 3.1.1 BMAD 개요
- BMAD(Brainstorming, Mood, Architecture, Design)가 무엇인지 한 문단 소개
- "AI 에이전트 기반 소프트웨어 개발 프레임워크"라는 핵심 정의
- 5개 모듈의 한줄 요약 테이블

#### 3.1.2 시스템 구조
- 5개 모듈 간의 관계도 (어떤 모듈이 어떤 모듈을 참조하는지)
  - CORE: 모든 모듈이 공유하는 유틸리티 (Brainstorming, Party Mode, 문서 편집)
  - BMB: BMAD 자체를 만드는 메타 레이어 (에이전트/모듈/워크플로우 생성)
  - BMM: 실제 소프트웨어를 만드는 개발 레이어 (분석→설계→구현→QA)
  - CIS: 창의적 사고를 지원하는 혁신 레이어 (브레인스토밍, 디자인씽킹)
  - TEA: 품질을 보장하는 테스트 레이어 (테스트 설계, 자동화, CI/CD)
- 모듈 간 워크플로우 공유 관계 설명 (예: CIS Carson → CORE Brainstorming 워크플로우 사용)

#### 3.1.3 빠른 시작 가이드
- 시나리오별 "어디서 시작하면 되는지" 안내
  - "새 프로젝트 시작" → BMM Analyst → Market/Domain Research
  - "빠르게 뭔가 만들기" → BMM Solo Dev → Quick Spec → Quick Dev
  - "테스트 체계 잡기" → TEA Murat → Test Framework → Test Design
  - "아이디어 발상" → CIS Carson → Brainstorming
  - "BMAD 확장/커스터마이징" → BMB Morgan → Create Module Brief

---

### 3.2 모듈 가이드

#### 3.2.1 CORE - 핵심 유틸리티
- **목적**: 모든 모듈이 공유하는 범용 도구 모음
- **에이전트**: Master 1개 (중앙 허브, 메뉴 기반 라우팅)
- **워크플로우 8개**:
  - Brainstorming: 36개 기법 기반 구조화된 브레인스토밍
  - Party Mode: 다중 AI 에이전트 가상 토론
  - Help: 워크플로우 카탈로그 검색
  - Index Docs: 디렉토리 문서 목차 자동 생성
  - Shard Doc: 대형 마크다운 파일 자동 분할
  - Editorial Prose: 문법/어조/가독성 교열
  - Editorial Structure: 문서 구조 재편/단순화
  - Adversarial Review: 적대적 관점 논리 결함 검출
- **설정**: `_bmad/core/config.yaml`
- **사용 패턴**: 다른 모듈의 에이전트가 CORE 워크플로우를 호출하는 방식

#### 3.2.2 BMB - 메타 프로그래밍
- **목적**: BMAD 시스템 자체를 만들고 확장하는 메타 레이어
- **에이전트 3개**:
  - Bond (Agent Builder): 에이전트 생성/편집/검증
  - Morgan (Module Builder): 모듈 생성/편집/검증
  - Wendy (Workflow Builder): 워크플로우 생성/편집/검증/재작업
- **워크플로우 12개**: 에이전트(3) + 모듈(4) + 워크플로우(5) 각각에 Create/Edit/Validate
- **핵심 개념**: 제품 브리프 → 모듈 생성 → 에이전트/워크플로우 구성의 파이프라인
- **설정**: `_bmad/bmb/config.yaml`

#### 3.2.3 BMM - 소프트웨어 개발
- **목적**: 소프트웨어 개발 수명주기(SDLC) 전체를 커버
- **에이전트 9개**:
  - Analyst: 시장/도메인/기술 조사, 제품 브리프
  - Architect: 시스템 아키텍처 설계, 구현 준비 검증
  - Developer: 스토리 기반 코드 구현, 코드 리뷰
  - PM: PRD 작성/검증/수정, 에픽 생성, 과정 수정
  - QA Engineer: 테스트 자동 생성
  - Solo Dev: Quick Flow 전담 (빠른 스펙→구현)
  - Scrum Master: 스프린트 계획, 스토리 생성, 회고
  - Tech Writer: 프로젝트 문서화, AI 컨텍스트 생성
  - UX Designer: UX 패턴/사양서 작성
- **워크플로우 카테고리**:
  - Analysis (4): Market/Domain/Technical Research, Product Brief
  - Planning (4): Create/Validate/Edit PRD, UX Design
  - Solutioning (3): Architecture, Readiness Check, Epics & Stories
  - Implementation (7): Dev Story, Code Review, Sprint Planning/Status, Create Story, Retrospective, Correct Course
  - Quick Flow (2): Quick Spec, Quick Dev
  - Project Mgmt (2): Document Project, Generate Context
  - QA (1): QA Automate
- **설정**: `_bmad/bmm/config.yaml`

#### 3.2.4 CIS - 창의적 혁신
- **목적**: 창의적 사고와 혁신 전략을 체계적으로 지원
- **에이전트 6개**:
  - Carson (Brainstorming Coach): "YES AND" 화법 퍼실리테이터
  - Dr. Quinn (Problem Solver): TRIZ/TOC/5 Whys 체계적 문제 해결
  - Maya (Design Thinking Coach): 공감→정의→아이디어→프로토타입→테스트 HCD
  - Victor (Innovation Strategist): JTBD/블루오션/BMC 혁신 전략
  - Caravaggio (Presentation Master): 시각 커뮤니케이션, 슬라이드 제작
  - Sophia (Storyteller): 영웅의 여정/픽사 스토리 서사 구성
- **워크플로우 4개**: Problem Solving, Design Thinking, Innovation Strategy, Storytelling
- **특이점**: Carson은 CORE의 Brainstorming 워크플로우를 직접 사용 (모듈 간 공유)
- **설정**: `_bmad/cis/config.yaml`

#### 3.2.5 TEA - 테스트 아키텍처
- **목적**: 테스트 전 생명주기를 커버하는 테스트 전문 모듈
- **에이전트 1개**: Murat (Master Test Architect) — 9개 워크플로우와 40개 지식 프래그먼트 보유
- **워크플로우 카테고리**:
  - Learning (1): Teach Me Testing — 7세션 인터랙티브 교육
  - Solutioning (3): Test Design, Test Framework, CI Setup
  - Implementation (4): ATDD, Test Automation, Test Review, NFR Assessment
  - Traceability (1): Trace
- **특징**: 병렬 서브프로세스 패턴을 적극 활용 (API/E2E 동시 생성)
- **설정**: `_bmad/tea/config.yaml`

---

### 3.3 에이전트 레퍼런스

#### 3.3.1 CORE 에이전트
- **Master** — BMAD Core의 중앙 허브. 설정 파일 로드 후 메뉴 기반 인터페이스로 8개 워크플로우를 동적 라우팅. 직접 작업하기보다 적절한 워크플로우로 안내하는 디스패처 역할.
  - 파일: `_bmad/core/agents/bmad-master.md`
  - 담당 워크플로우: Brainstorming, Party Mode, Help, Index Docs, Shard Doc, Editorial Prose, Editorial Structure, Adversarial Review

#### 3.3.2 BMB 에이전트
- **Bond (Agent Builder)** — 에이전트 아키텍처 전문가. 에이전트의 전체 생명주기(생성→편집→검증)를 관리. BMAD 규정 준수를 보장하며 품질 검증 보고서 제공.
  - 파일: `_bmad/bmb/agents/agent-builder.md`
  - 담당: Create Agent, Edit Agent, Validate Agent
- **Morgan (Module Builder)** — 모듈 아키텍처와 풀스택 시스템 설계 전문가. 제품 브리프 작성부터 완전한 모듈 생성까지 전체 파이프라인 지원.
  - 파일: `_bmad/bmb/agents/module-builder.md`
  - 담당: Create Module Brief, Create Module, Edit Module, Validate Module
- **Wendy (Workflow Builder)** — 워크플로우 아키텍처와 프로세스 설계 전문가. 신규 생성과 기존 콘텐츠 변환 두 경로 지원. 가장 다양한 워크플로우 관리 기능 보유.
  - 파일: `_bmad/bmb/agents/workflow-builder.md`
  - 담당: Create Workflow, Edit Workflow, Validate Workflow, Max Parallel Validate, Rework Workflow

#### 3.3.3 BMM 에이전트
- **Analyst (Strategic Analyst)** — 전략적 비즈니스 분석가. 시장/도메인/기술 조사 수행 후 인사이트 기반으로 요구사항 구체화 및 제품 브리프 작성 지원.
  - 파일: `_bmad/bmm/agents/analyst.md`
  - 담당: Market Research, Domain Research, Technical Research, Create Product Brief
- **Architect (System Architect)** — 분산 시스템/클라우드/API 설계 전문가. AI 에이전트 간 일관성을 보장하는 아키텍처 문서 작성. 구현 착수 전 정렬을 적대적으로 검증.
  - 파일: `_bmad/bmm/agents/architect.md`
  - 담당: Create Architecture, Check Readiness
- **Developer (Senior Engineer)** — 승인된 사용자 스토리를 엄격한 표준에 따라 구현. 적대적 시니어 개발자 관점으로 코드 심층 리뷰.
  - 파일: `_bmad/bmm/agents/dev.md`
  - 담당: Dev Story, Code Review
- **PM (Product Manager)** — PRD 작성/검증, 에픽/스토리 생성, 스프린트 중 변경 영향도 분석.
  - 파일: `_bmad/bmm/agents/pm.md`
  - 담당: Create PRD, Validate PRD, Edit PRD, Create Epics, Check Readiness, Correct Course
- **QA Engineer** — 기존 소스 코드 분석으로 API 및 E2E 테스트 자동 생성. 수동 작성 없이 빠른 테스트 커버리지 확보 특화.
  - 파일: `_bmad/bmm/agents/qa.md`
  - 담당: QA Automate
- **Solo Dev (Quick Flow Solo Dev)** — Quick Flow 전담 엘리트 풀스택 개발자. 대화형 기술 사양서 작성 후 즉시 구현까지 단독 처리.
  - 파일: `_bmad/bmm/agents/quick-flow-solo-dev.md`
  - 담당: Quick Spec, Quick Dev, Code Review
- **Scrum Master** — 스프린트 계획, 에픽→스토리 생성, 에픽 회고를 통한 애자일 세레모니 지원과 진행 추적.
  - 파일: `_bmad/bmm/agents/sm.md`
  - 담당: Sprint Planning, Create Story, Retrospective, Correct Course
- **Tech Writer (Technical Writer)** — 기존 코드베이스/아키텍처 분석으로 AI 개발용 참조 문서와 지식 베이스 구축.
  - 파일: `_bmad/bmm/agents/tech-writer/tech-writer.md`
  - 담당: Document Project, Generate Context
- **UX Designer** — 시각적 탐색과 협업적 의사결정으로 UX 패턴/룩앤필 정의. 구현 팀이 즉시 활용 가능한 UX 사양서 산출.
  - 파일: `_bmad/bmm/agents/ux-designer.md`
  - 담당: Create UX Design

#### 3.3.4 CIS 에이전트
- **Carson (Brainstorming Coach)** — 20년 경력 퍼실리테이터. "YES AND" 화법, 심리적 안전감 조성, 다양한 기법과 그룹 역학으로 창의적 세션 진행.
  - 파일: `_bmad/cis/agents/brainstorming-coach.md`
  - 담당: CORE Brainstorming (모듈 간 공유)
- **Dr. Quinn (Creative Problem Solver)** — 전직 항공우주 엔지니어. TRIZ/TOC/시스템 사고로 복잡한 난제 해결. 5 Whys/어골도로 근본 원인 규명.
  - 파일: `_bmad/cis/agents/creative-problem-solver.md`
  - 담당: Problem Solving
- **Maya (Design Thinking Coach)** — 포춘 500대/스타트업 HCD 전문가. 공감→정의→아이디어→프로토타입→테스트 전 과정 가이드.
  - 파일: `_bmad/cis/agents/design-thinking-coach.md`
  - 담당: Design Thinking
- **Victor (Innovation Strategist)** — 전직 맥킨지 컨설턴트. JTBD/블루오션/BMC로 시장 기회 발굴, 단기-중기-장기 실행 로드맵 수립.
  - 파일: `_bmad/cis/agents/innovation-strategist.md`
  - 담당: Innovation Strategy
- **Caravaggio (Presentation Master)** — TED/투자유치 프레젠테이션 분석 기반 시각 커뮤니케이션 전문가. 슬라이드/피치 데크/유튜브 자료 제작.
  - 파일: `_bmad/cis/agents/presentation-master.md`
  - 담당: 전용 워크플로우 없음 (직접 대화형 작업)
- **Sophia (Storyteller)** — 50년 경력 마스터 스토리텔러. 영웅의 여정/픽사 스토리 프레임워크로 감동적 서사 완성.
  - 파일: `_bmad/cis/agents/storyteller/storyteller.md`
  - 담당: Storytelling

#### 3.3.5 TEA 에이전트
- **Murat (Master Test Architect)** — 테스트 전 생명주기 마스터. 리스크 기반 테스팅/ATDD/API&UI 자동화/CI&CD 품질 게이트 전문. 9개 워크플로우 + 40개 지식 프래그먼트 보유.
  - 파일: `_bmad/tea/agents/tea.md`
  - 담당: Teach Me Testing, Test Framework, ATDD, Test Automation, Test Design, Trace, NFR Assessment, CI Setup, Test Review

---

### 3.4 워크플로우 가이드

#### 3.4.1 분석 (Analysis)
- **Market Research** — 타겟 시장의 규모, 경쟁 환경, 트렌드, 기회를 체계적으로 분석. 구조화된 리포트 생성.
  - 에이전트: Analyst (BMM)
  - 입력: 조사 범위, 타겟 시장 정의
  - 산출물: 시장 조사 리포트 (research.template.md)
  - 단계: 초기화 → 데이터 수집 → 분석 → 리포트 작성
- **Domain Research** — 특정 도메인/산업의 핵심 개념, 규제, 기술 동향, 주요 플레이어를 심층 분석.
  - 에이전트: Analyst (BMM)
  - 입력: 도메인 범위, 조사 대상 영역
  - 산출물: 도메인 조사 리포트
  - 단계: 초기화 → 영역별 조사 → 종합 분석
- **Technical Research** — 기술 스택, 프레임워크, 라이브러리의 장단점 비교 분석.
  - 에이전트: Analyst (BMM)
  - 입력: 평가 기준, 후보 기술 목록
  - 산출물: 기술 비교 리포트
  - 단계: 초기화 → 후보 평가 → 비교 분석
- **Create Product Brief** — 시장/도메인/기술 조사 결과를 종합하여 제품 비전, 목표 사용자, 핵심 기능, 성공 지표를 정의.
  - 에이전트: Analyst (BMM)
  - 입력: 조사 리포트들
  - 산출물: 제품 브리프 문서
  - 단계: 조사 종합 → 비전 수립 → 기능 정의 → 지표 설정

#### 3.4.2 기획 (Planning)
- **Create PRD** — 사용자 인터뷰와 요구사항 발견을 통해 기능 명세, 우선순위, 제약사항 포함 상세 PRD 작성.
  - 에이전트: PM (BMM)
  - 입력: 제품 브리프, 사용자 요구사항
  - 산출물: PRD 문서
  - 단계: 인터뷰 준비 → 요구사항 수집 → PRD 작성
- **Validate PRD** — 작성된 PRD의 완전성, 일관성, 실현 가능성을 적대적 관점으로 검증.
  - 에이전트: PM (BMM)
  - 입력: PRD 문서
  - 산출물: 검증 보고서, 수정 권고
- **Edit PRD** — 기존 PRD에 새로운 요구사항 추가 또는 기존 항목 수정. 변경 이력/영향도 추적.
  - 에이전트: PM (BMM)
  - 입력: 기존 PRD, 변경 요청
  - 산출물: 수정된 PRD, 변경 이력
- **Create UX Design** — 시각적 탐색과 협업적 의사결정으로 UI 패턴, 인터랙션, 룩앤필 정의.
  - 에이전트: UX Designer (BMM)
  - 입력: PRD, 디자인 범위
  - 산출물: UX 사양서 (ux-design-template.md)
  - 단계: 범위 정의 → 시각 탐색 → 패턴 선택 → 사양서 작성

#### 3.4.3 설계 (Solutioning)
- **Create Architecture** — 시스템 컴포넌트, API 경계, 데이터 모델, 인프라 설계. ADR(Architecture Decision Record) 포함.
  - 에이전트: Architect (BMM)
  - 입력: PRD, 기술 요구사항
  - 산출물: 아키텍처 문서, ADR
  - 단계: 요구사항 분석 → 컴포넌트 설계 → ADR 작성
- **Check Readiness** — PRD/아키텍처/에픽/스토리 문서의 정합성을 적대적으로 교차 검증. 구현 착수 가능 여부 판단.
  - 에이전트: Architect + PM (BMM)
  - 입력: PRD, 아키텍처, 에픽/스토리 문서
  - 산출물: 준비 상태 보고서 (Go/No-Go)
- **Create Epics & Stories** — PRD와 아키텍처 기반으로 구현 가능한 에픽/사용자 스토리 생성. 인수 조건과 의존성 정의.
  - 에이전트: PM (BMM)
  - 입력: PRD, 아키텍처 문서
  - 산출물: 에픽 목록, 사용자 스토리 (인수 조건 포함)

#### 3.4.4 구현 (Implementation)
- **Dev Story** — 승인된 사용자 스토리의 인수 조건 기반 코드 구현. 개발 완료 체크리스트와 스프린트 상태 업데이트.
  - 에이전트: Developer (BMM)
  - 입력: 승인된 사용자 스토리
  - 산출물: 구현 코드, 스프린트 상태 업데이트
- **Code Review** — 적대적 시니어 개발자 관점 심층 리뷰. 코드 품질, 보안, 테스트 커버리지, SOLID 원칙 검증.
  - 에이전트: Developer / Solo Dev (BMM)
  - 입력: 코드 변경사항
  - 산출물: 리뷰 피드백, 수정 요청
- **Sprint Planning** — 에픽에서 우선순위 높은 스토리 선별, 팀 용량 기반 스프린트 범위 확정.
  - 에이전트: Scrum Master (BMM)
  - 입력: 에픽, 팀 용량
  - 산출물: 스프린트 계획, 상태 추적 파일 (sprint-status.yaml)
- **Sprint Status** — 현재 스프린트 진행 상황 분석. 완료/진행/블로커 현황 요약, 리스크 보고.
  - 에이전트: (자동 분석)
  - 입력: sprint-status.yaml
  - 산출물: 상태 보고서
- **Create Story** — 에픽에서 개별 사용자 스토리 추출. 인수 조건, 기술 태스크, 의존성 구체화하여 DoR 상태로 전환.
  - 에이전트: Scrum Master (BMM)
  - 입력: 에픽
  - 산출물: 개발 준비 완료 사용자 스토리 (template.md)
- **Retrospective** — 완료된 에픽의 실행 과정 회고. 잘한 점/개선점/학습 사항 정리, 다음 에픽 액션 아이템 도출.
  - 에이전트: Scrum Master (BMM)
  - 입력: 완료 에픽, 스프린트 이력
  - 산출물: 회고 보고서, 액션 아이템
- **Correct Course** — 스프린트 중 변경 요청의 영향도 분석. PRD/아키텍처/에픽에 대한 파급 효과 평가 후 과정 수정.
  - 에이전트: PM + Scrum Master (BMM)
  - 입력: 변경 요청
  - 산출물: 영향도 분석 보고서, 수정된 계획

#### 3.4.5 Quick Flow
- **Quick Spec** — 대화형으로 기술 사양서를 신속 작성. 아이디어를 즉시 구현 가능한 기술 스펙으로 변환.
  - 에이전트: Solo Dev (BMM)
  - 입력: 아이디어 설명
  - 산출물: 기술 사양서
  - 단계: 아이디어 청취 → 요구사항 추출 → 스펙 작성
- **Quick Dev** — Quick Spec 기반 즉시 코드 구현. 모드 자동 감지로 최적 개발 경로 선택.
  - 에이전트: Solo Dev (BMM)
  - 입력: Quick Spec 문서
  - 산출물: 동작하는 코드
  - 단계: 모드 감지 → 구현 → 검증

#### 3.4.6 테스트 (Testing)
- **Teach Me Testing** — 7세션 인터랙티브 교육. 수준 평가→커리큘럼 선택→세션 수강→퀴즈→수료. 역할별 학습 경로 제공.
  - 에이전트: Murat (TEA)
  - 세션: 기초 / 테스트 설계 / API 테스트 / E2E 테스트 / CI/CD 통합 / 비기능 테스트 / 고급 주제
- **Test Design** — 리스크 매트릭스와 테스트 가능성 분석 기반 에픽/시스템 수준 테스트 설계. 커버리지 계획 수립.
  - 에이전트: Murat (TEA)
  - 입력: PRD, 아키텍처, 에픽/스토리
  - 산출물: 테스트 설계서, QA 핸드오프 문서
  - 단계: 모드 감지 → 컨텍스트 로드 → 리스크 분석 → 커버리지 계획 → 산출물 생성
- **Test Framework** — 기술 스택에 맞는 테스트 프레임워크 선택 및 프로덕션 수준 테스트 인프라 스캐폴딩.
  - 에이전트: Murat (TEA)
  - 입력: 프로젝트 기술 스택
  - 산출물: 테스트 디렉토리 구조, 설정 파일, 헬퍼/유틸리티
  - 단계: 사전 점검 → 프레임워크 선택 → 스캐폴딩 → 문서/스크립트 → 검증
- **ATDD** — 인수 조건 기반 의도적으로 실패하는 API/E2E 테스트 생성 (Red Phase). 병렬 서브프로세스로 동시 생성.
  - 에이전트: Murat (TEA)
  - 입력: 사용자 스토리 (인수 조건)
  - 산출물: 실패하는 API/E2E 테스트 코드
  - 단계: 사전 점검 → 생성 모드 결정 → 전략 수립 → API/E2E 병렬 생성 → 검증
- **Test Automation** — 기존 코드베이스의 커버리지 갭 식별 후 API/E2E 테스트 병렬 자동 생성.
  - 에이전트: Murat (TEA)
  - 입력: 코드베이스
  - 산출물: 자동 생성 테스트, 커버리지 보고서
  - 단계: 사전 점검 → 타겟 식별 → API/E2E 병렬 생성 → 검증
- **Test Review** — 기존 테스트의 결정론성/격리성/유지보수성/성능을 병렬 평가. 0-100 종합 점수와 개선 권고 리포트.
  - 에이전트: Murat (TEA)
  - 입력: 테스트 코드베이스
  - 산출물: 테스트 품질 리포트 (차원별 점수, 개선 권고)
  - 단계: 컨텍스트 로드 → 테스트 탐색 → 4차원 병렬 평가 → 리포트 생성
- **NFR Assessment** — 보안/성능/신뢰성/확장성 4개 차원 병렬 평가. 임계값 대비 달성도 점수화.
  - 에이전트: Murat (TEA)
  - 입력: 아키텍처 문서, NFR 요구사항
  - 산출물: NFR 평가 보고서
  - 단계: 컨텍스트 로드 → 임계값 정의 → 4차원 병렬 평가 → 보고서
- **CI Setup** — GitHub Actions, GitLab CI, Azure Pipelines, Jenkins, Harness 등 CI/CD 품질 게이트 파이프라인 생성.
  - 에이전트: Murat (TEA)
  - 입력: 프로젝트 CI/CD 현황
  - 산출물: 파이프라인 설정 파일, 품질 게이트 설정
  - 단계: 사전 점검 → 파이프라인 생성 → 품질 게이트 설정 → 검증
- **Trace** — 요구사항-설계-구현-테스트 간 추적성(Traceability) 매핑.
  - 에이전트: Murat (TEA)
  - 입력: PRD, 아키텍처, 코드, 테스트
  - 산출물: 추적성 매트릭스

#### 3.4.7 창의/혁신 (Creative)
- **Brainstorming** — 7카테고리 36개 이상 창의적 기법(SCAMPER, 6 Thinking Hats 등). 4단계 프로세스: 세션 설정→기법 선택→실행→정리.
  - 에이전트: Carson (CIS) / Master (CORE)
  - 입력: 브레인스토밍 주제
  - 산출물: 정리된 아이디어 문서 (template.md)
  - 기법 선택 경로: 사용자 선택 / AI 추천 / 랜덤 / 점진적 진행
- **Problem Solving** — TRIZ, TOC, 5 Whys, 어골도 등 체계적 방법론으로 근본 원인 규명. PDCA 기반 실행 계획 수립.
  - 에이전트: Dr. Quinn (CIS)
  - 입력: 문제 정의
  - 산출물: 문제 해결 보고서 (template.md), 실행 계획
- **Design Thinking** — 공감→정의→아이디어→프로토타입→테스트 5단계 HCD. CSV 기반 방법론 DB에서 단계별 최적 기법 선택.
  - 에이전트: Maya (CIS)
  - 입력: 디자인 챌린지
  - 산출물: 디자인 씽킹 결과물 (template.md)
- **Innovation Strategy** — JTBD, 블루오션, BMC 등으로 시장 기회 발굴. 단기/중기/장기 실행 로드맵 포함 혁신 전략 수립.
  - 에이전트: Victor (CIS)
  - 입력: 시장/제품 컨텍스트
  - 산출물: 혁신 전략 보고서 (template.md), 실행 로드맵
- **Storytelling** — 영웅의 여정, 픽사 스토리 등 프레임워크 기반 서사 구성. 감정 곡선 설계, 채널별 변형, 톤앤매너 가이드.
  - 에이전트: Sophia (CIS)
  - 입력: 스토리 소재/목적
  - 산출물: 스토리 문서 (template.md), 감정 곡선, 채널별 변형

#### 3.4.8 메타 빌드 (Meta Build)
- **Create Agent** — 8단계 가이드(브레인스토밍→발견→메타데이터→페르소나→커맨드→활성화→빌드→완료). 20개 데이터/템플릿 파일로 아키텍처 레퍼런스 제공.
  - 에이전트: Bond (BMB)
- **Edit Agent** — 기존 에이전트의 페르소나/커맨드 메뉴/활성화 로직 등을 무결성 유지하며 수정하는 9단계 워크플로우.
  - 에이전트: Bond (BMB)
- **Validate Agent** — 메타데이터/페르소나/메뉴/구조/사이드카 5개 카테고리 검증 후 품질 보고서 생성.
  - 에이전트: Bond (BMB)
- **Create Module Brief** — 14단계 대화형 프로세스로 모듈의 비전/정체성/사용자/가치/에이전트/워크플로우 구성을 정의하는 제품 브리프 작성.
  - 에이전트: Morgan (BMB)
- **Create Module** — 제품 브리프 기반 7단계: 폴더 구조/설정/에이전트/워크플로우 포함 완전한 모듈 생성.
  - 에이전트: Morgan (BMB)
- **Edit Module** — 기존 모듈의 구조/설정/에이전트/워크플로우를 일관성 유지하며 수정하는 5단계 워크플로우.
  - 에이전트: Morgan (BMB)
- **Validate Module** — 파일 구조/설정/에이전트/워크플로우 6개 카테고리로 BMAD 규격 준수 검증.
  - 에이전트: Morgan (BMB)
- **Create Workflow** — 신규 생성 또는 기존 콘텐츠 변환 두 경로. 발견→분류 과정을 거쳐 BMAD 규격 워크플로우 파일 생성.
  - 에이전트: Wendy (BMB)
- **Edit Workflow** — 기존 워크플로우 평가 후 BMAD 규격 유지하며 업데이트.
  - 에이전트: Wendy (BMB)
- **Validate Workflow** — 구조/스텝 연결/데이터 참조를 BMAD 표준에 따라 검증 후 결과 보고.
  - 에이전트: Wendy (BMB)
- **Max Parallel Validate** — 최대 병렬 실행 모드에서의 데이터 의존성과 충돌 검증.
  - 에이전트: Wendy (BMB)
- **Rework Workflow** — 레거시 워크플로우를 BMAD V6 규격에 맞게 구조 변환/재설계.
  - 에이전트: Wendy (BMB)

#### 3.4.9 유틸리티 (Utility)
- **Help** — BMAD 전체 워크플로우 카탈로그를 CSV 기반으로 검색. 적합한 워크플로우 안내.
  - 에이전트: Master (CORE)
- **Index Docs** — 지정 디렉토리 내 문서 스캔하여 index.md 자동 생성.
  - 에이전트: Master (CORE)
- **Shard Doc** — 대형 마크다운 문서를 H2 기준으로 개별 파일로 분할.
  - 에이전트: Master (CORE)
- **Editorial Prose** — 문법/어조/명확성/가독성 교정. 원문 의도 보존.
  - 에이전트: Master (CORE)
- **Editorial Structure** — 문서 전체 구조 분석. 불필요 섹션 제거, 재구성, 단순화 제안.
  - 에이전트: Master (CORE)
- **Adversarial Review** — 냉소적 시각으로 논리 결함/모순/누락 발견. 방어 불가능한 약점 사전 식별.
  - 에이전트: Master (CORE)
- **Document Project** — CSV 정의 기반 코드베이스/아키텍처/API 분석. AI 개발용 참조 문서/지식 베이스 자동 구축.
  - 에이전트: Tech Writer (BMM)
- **Generate Context** — 기술 스택/코딩 규약/아키텍처 결정 분석. AI 에이전트용 프로젝트 컨텍스트 파일 생성.
  - 에이전트: Tech Writer (BMM)

---

### 3.5 레시피 (사용 시나리오)

#### 3.5.1 새 프로젝트 시작하기
- **흐름**: Analyst → PM → Architect → Scrum Master → Developer
- **단계별 워크플로우**:
  1. Market/Domain/Technical Research (시장 조사)
  2. Create Product Brief (제품 브리프)
  3. Create PRD (상세 요구사항)
  4. Create UX Design (UX 사양서)
  5. Create Architecture (시스템 설계)
  6. Create Epics & Stories (에픽/스토리)
  7. Check Readiness (구현 준비 검증)
  8. Sprint Planning → Dev Story → Code Review (구현)
- **예상 산출물**: 조사 리포트 → PRD → UX 사양서 → 아키텍처 문서 → 에픽/스토리 → 동작하는 코드

#### 3.5.2 빠른 프로토타입 만들기 (Quick Flow)
- **흐름**: Solo Dev 단독 처리
- **단계별 워크플로우**:
  1. Quick Spec (대화형 사양서 작성)
  2. Quick Dev (즉시 구현)
  3. Code Review (선택적 품질 검증)
- **적합한 상황**: 해커톤, PoC, 빠른 검증이 필요한 아이디어

#### 3.5.3 테스트 체계 구축하기
- **흐름**: Murat 단독 처리
- **단계별 워크플로우**:
  1. Test Framework (테스트 인프라 구축)
  2. Test Design (테스트 전략/설계)
  3. ATDD (인수 테스트 Red Phase 생성)
  4. Test Automation (기존 코드 커버리지 확장)
  5. CI Setup (CI/CD 품질 게이트)
  6. Test Review (품질 평가)
- **예상 산출물**: 테스트 프레임워크 → 테스트 설계서 → 테스트 코드 → CI 파이프라인 → 품질 리포트

#### 3.5.4 새 BMAD 모듈 만들기
- **흐름**: Morgan → Bond → Wendy
- **단계별 워크플로우**:
  1. Create Module Brief (모듈 제품 브리프)
  2. Create Module (모듈 구조 생성)
  3. Create Agent x N (에이전트 생성)
  4. Create Workflow x N (워크플로우 생성)
  5. Validate Module (모듈 검증)
  6. Validate Agent x N / Validate Workflow x N (개별 검증)
- **예상 산출물**: 모듈 브리프 → 완전한 모듈 디렉토리 (설정/에이전트/워크플로우)

#### 3.5.5 브레인스토밍 & 혁신 전략
- **흐름**: Carson → Dr. Quinn → Maya → Victor → Sophia
- **단계별 워크플로우** (필요에 따라 선택적):
  1. Brainstorming (아이디어 발산)
  2. Problem Solving (문제 구조화/해결)
  3. Design Thinking (사용자 중심 설계)
  4. Innovation Strategy (시장 전략 수립)
  5. Storytelling (스토리 구성, 프레젠테이션 준비)
- **적합한 상황**: 신사업 기획, 제품 리뉴얼, 팀 워크숍

---

## 4. 검색 기능 설계

### 4.1 교차 검색 (Cross-Reference Search) — 핵심 요구사항

**"PRD"로 검색하면 관련된 모든 카테고리의 결과가 한 번에 나와야 한다.**

이를 위해 doc-data.js의 모든 문서 항목에 다음 필드를 포함:
- `title`: 문서 제목
- `content`: 본문 텍스트 (검색 대상)
- `tags`: 관련 키워드 배열 (예: `['PRD', 'PM', '요구사항', 'Planning']`)
- `related`: 관련 문서 ID 배열 (상호 링크용)

검색 시 **title + content + tags**를 모두 매칭하여, 카테고리와 무관하게 관련 결과를 전부 반환.

검색 결과 표시 형식:
```
검색: "PRD"
──────────────────────────────────────
[핵심 개념]  컨텍스트 체이닝         — "PRD는 아키텍트에게 제약을 알리고..."
[에이전트]   PM (John)              — "PRD 작성/검증/수정 담당"
[워크플로우] Create PRD              — "사용자 인터뷰로 상세 PRD 작성"
[워크플로우] Validate PRD            — "적대적 관점으로 PRD 검증"
[커맨드]     /bmad-bmm-create-prd    — "PRD 생성 슬래시 명령어"
[레시피]     새 프로젝트 시작하기      — "3단계: Create PRD"
[용어]       PRD                     — "Product Requirements Document"
```

### 4.2 Doc 전용 검색 (사이드바 상단)
- 입력 시 실시간 필터링
- 대상: 문서 제목 + 본문 + 태그 (교차 검색)
- 결과: 사이드바에 매칭 항목만 표시 (미매칭 카테고리 자동 접힘)
- 검색어 하이라이트
- 결과 항목에 [카테고리] 뱃지 표시

### 4.3 글로벌 검색 통합 (헤더)
- 기존 searchIndex에 type: 'doc' 항목 추가
- 검색 결과에서 "Doc" 뱃지 표시
- 클릭 시 Doc 탭 전환 + 해당 문서로 스크롤

### 4.4 문서 간 상호 링크
- 각 문서 하단에 "관련 문서" 섹션 자동 표시
- related 배열 + 같은 tag를 공유하는 문서를 자동 추출
- 클릭 시 해당 문서로 즉시 이동

---

## 5. 공식 문서(docs.bmad-method.org) 분석 및 반영 계획

### 5.1 공식 문서 구조 요약

공식 문서는 Diataxis 프레임워크(Tutorial/How-To/Explanation/Reference) 4분류를 따름:

```
Welcome
Roadmap
Tutorials
  Getting Started
How-To Guides
  Install BMad / Non-Interactive Installation / Upgrade to v6
  Get Answers About BMad / Quick Fixes / Established Projects
  Customize BMad / Project Context / Document Sharding
Explanation
  Quick Flow / Brainstorming / Why Solutioning Matters
  Preventing Agent Conflicts / Adversarial Review
  Advanced Elicitation / Party Mode / Project Context
  Established Projects FAQ
Reference
  Workflow Map / Agents / Commands / Modules / Testing Options
```

### 5.2 공식 문서에서 발견한 핵심 콘텐츠 (우리 Doc에 없는 것)

#### A. 핵심 개념 설명 (Explanation) — 신규 카테고리 추가 필요

| 주제 | 핵심 내용 | 반영 이유 |
|------|----------|----------|
| **Planning Track (3가지 경로)** | Quick Flow(1-15 스토리) / BMad Method(10-50+ 스토리) / Enterprise(30+ 스토리, 규정 준수). 프로젝트 규모에 따라 워크플로우 경로가 달라짐 | 사용자가 "어떤 경로를 선택해야 하는지" 판단하는 핵심 기준 |
| **컨텍스트 체이닝** | 각 Phase의 산출물이 다음 Phase의 입력이 됨. PRD→아키텍트, 아키텍처→개발자, 스토리→구현. "AI agents work best with clear, structured context" | BMAD가 왜 단계별로 문서를 만드는지 이해하는 핵심 원리 |
| **Solutioning이 중요한 이유** | Solutioning 없이 구현하면 에이전트 A는 REST, B는 GraphQL 사용→충돌. "구현 중 발견되는 정렬 문제는 Solutioning의 10배 비용" | 단계를 건너뛰고 싶은 유혹을 방지하는 실전 지식 |
| **에이전트 충돌 방지** | ADR(Architecture Decision Record)로 API 스타일/DB 설계/상태 관리 등 기술 결정을 명시화. 암묵적 결정→불일치 초래 | 다중 에이전트 환경의 실전 함정과 해결책 |
| **적대적 리뷰(Adversarial Review)** | "반드시 문제를 찾아야 하는" 리뷰. 확증편향 파괴. 단, AI의 허위 양성(오탐) 발생→인간이 검증 필요 | BMAD 곳곳에서 사용되는 핵심 패턴의 깊은 이해 |
| **Project Context** | `project-context.md`는 AI 에이전트의 "헌법". 기술 스택, 코딩 규약, 패턴을 문서화하여 에이전트 간 일관성 보장 | 실전에서 품질을 좌우하는 핵심 설정 |
| **Party Mode 심화** | 여러 에이전트를 한 대화에 소환. Master가 조율자 역할. 트레이드오프 의사결정/브레인스토밍/회고에 활용 | flowchart-data에는 간단히 나오지만 실전 활용법이 부족 |
| **Brainstorming 철학** | "아이디어를 끌어내고 생성하지 않는다". AI는 코치 역할. 5단계: 설정→접근법 선택→촉진→정리→실행 | 브레인스토밍의 올바른 사용법 이해 |

#### B. 실전 가이드 (How-To) — 레시피 섹션 보강 필요

| 주제 | 핵심 내용 | 반영 이유 |
|------|----------|----------|
| **설치 방법** | `npx bmad-method install` → 위치/AI도구/모듈 선택. 생성 구조: `_bmad/`, `_bmad-output/` | 가장 기본적인 시작점 |
| **커스터마이징** | `.customize.yaml`로 에이전트 이름/성격/메모리/메뉴 변경. 업데이트 후에도 보존 | 고급 사용자에게 필수 |
| **신규 채팅 원칙** | 각 워크플로우마다 반드시 새로운 대화 세션 시작. 컨텍스트 오염 방지 | 초보자가 가장 많이 실수하는 부분 |
| **Quick Flow 판단 기준** | 적합: 버그 수정, 리팩토링, 소규모 기능, 프로토타입. 부적합: 새 제품, 아키텍처 결정, 불명확 요구사항 | Quick Flow vs Full Method 선택 기준 |
| **기존 프로젝트 적용** | 이미 진행 중인 프로젝트에 BMAD를 도입하는 방법 | 현실적인 도입 시나리오 |
| **bmad-help 활용** | 프로젝트 상태 자동 검사, 다음 단계 추천, 모듈별 옵션 제시 | "막혔을 때" 첫 번째로 해야 할 것 |

#### C. 레퍼런스 보강

| 주제 | 핵심 내용 | 반영 이유 |
|------|----------|----------|
| **슬래시 명령어 목록** | `/bmad-agent-bmm-dev`, `/bmad-bmm-create-prd` 등 전체 명령어 + 명명 규칙 | 실제 사용 시 어떤 명령어를 치는지 |
| **명령어 명명 규칙** | `bmad-agent-<모듈>-<이름>` (에이전트), `bmad-<모듈>-<워크플로우>` (워크플로우), `bmad-<이름>` (태스크) | 패턴 이해하면 암기 불필요 |
| **IDE별 명령어 경로** | Claude Code: `.claude/commands/`, Cursor: `.cursor/commands/`, Windsurf: `.windsurf/workflows/` | 도구별 차이 이해 |
| **Quinn vs TEA 비교** | Quinn(내장, 빠른 생성, 소규모) vs TEA(설치 필요, 전략적, 엔터프라이즈). 선택 기준표 | 테스트 접근법 선택의 핵심 |
| **GDS (Game Dev Studio)** | 게임 개발 전용 모듈. GDD 생성, 21개 게임 유형, 엔진별 가이드 | 우리 flowchart-data에 없는 추가 모듈 정보 |
| **산출물(Output) 목록** | 각 워크플로우의 실제 파일 산출물: PRD.md, architecture.md, sprint-status.yaml, tech-spec-{slug}.md 등 | "이 워크플로우를 돌리면 뭐가 나오는지" 명확화 |

### 5.3 반영 계획: 최종 사이드바 메뉴 구조

```
시작하기
  ├─ BMAD 개요
  ├─ 시스템 구조 (5모듈 관계도)
  ├─ 설치 및 설정                        [신규]
  ├─ 빠른 시작 가이드
  └─ Planning Track 선택 가이드           [신규]

핵심 개념                                [신규 카테고리]
  ├─ 컨텍스트 체이닝
  ├─ Solutioning이 중요한 이유
  ├─ 에이전트 충돌 방지와 ADR
  ├─ 적대적 리뷰 (Adversarial Review)
  ├─ Project Context의 역할
  ├─ Party Mode 심화
  ├─ Brainstorming 철학
  └─ 신규 채팅 원칙

모듈 가이드
  ├─ CORE — 핵심 유틸리티
  ├─ BMB — 메타 프로그래밍
  ├─ BMM — 소프트웨어 개발
  ├─ CIS — 창의적 혁신
  ├─ TEA — 테스트 아키텍처
  └─ GDS — 게임 개발 스튜디오            [신규]

에이전트 레퍼런스
  ├─ CORE: Master
  ├─ BMB: Bond / Morgan / Wendy
  ├─ BMM: Analyst / Architect / Developer / PM / QA / Solo Dev / SM / Tech Writer / UX
  ├─ CIS: Carson / Dr.Quinn / Maya / Victor / Caravaggio / Sophia
  └─ TEA: Murat

워크플로우 가이드
  ├─ 분석 (4)
  ├─ 기획 (4)
  ├─ 설계 (3)
  ├─ 구현 (7)
  ├─ Quick Flow (2)
  ├─ 테스트 (9)
  ├─ 창의/혁신 (5)
  ├─ 메타 빌드 (12)
  └─ 유틸리티 (8)
  * 각 워크플로우에 슬래시 명령어 + 산출물 파일명 포함

커맨드 레퍼런스                           [신규 카테고리]
  ├─ 명령어 명명 규칙
  ├─ 에이전트 명령어 목록
  ├─ 워크플로우 명령어 목록
  ├─ 태스크/도구 명령어 목록
  └─ IDE별 명령어 경로

용어 모음집 (Glossary)                    [신규 카테고리]
  ├─ A-E: ADR, ATDD, BMB, BMM, CIS, DoR, E2E ...
  ├─ F-N: FR, GDS, HCD, JTBD, NFR ...
  ├─ O-S: PDCA, PRD, SCAMPER, SDLC, Sidecar, Solutioning ...
  └─ T-Z: TEA, TOC, TRIZ, UX ...
  * 각 용어: 한글 정의 + 영문 원문만 간결하게 표시
  * 용어 클릭 → 검색창에 해당 용어 자동 입력 → 교차 검색 결과 즉시 표시
  * 용어 페이지는 "검색의 진입점" 역할, 상세 내용은 검색 결과가 담당

레시피 (사용 시나리오)
  ├─ 새 프로젝트 시작하기
  ├─ 빠른 프로토타입 만들기 (Quick Flow)
  ├─ 테스트 체계 구축하기
  ├─ 새 BMAD 모듈 만들기
  ├─ 브레인스토밍 & 혁신 전략
  ├─ 기존 프로젝트에 BMAD 도입하기        [신규]
  ├─ 에이전트 커스터마이징                 [신규]
  └─ 막혔을 때: bmad-help 활용법          [신규]
```

### 5.4 변경 요약

| 구분 | 최초 계획 | 최종 |
|------|----------|------|
| 카테고리 수 | 5개 | **8개** (+핵심 개념, +커맨드 레퍼런스, +용어 모음집) |
| 시작하기 항목 | 3개 | **5개** (+설치, +Planning Track) |
| 모듈 가이드 | 5개 | **6개** (+GDS) |
| 레시피 항목 | 5개 | **8개** (+기존 프로젝트, +커스터마이징, +bmad-help) |
| 핵심 차별점 | 레퍼런스 위주 | **"왜" 설명 + 교차 검색 + 용어 사전** |

---

## 6. 구현 순서

1. `doc-data.js` — 문서 데이터 구조 작성 ✅
2. `index.html` — Doc 탭 버튼 + doc-view 컨테이너 추가 ✅
3. `styles.css` — 2컬럼 레이아웃 + 문서 스타일 ✅
4. `app.js` — switchTab 확장 + doc 렌더링 + 검색 로직 ✅
5. 글로벌 검색에 doc 항목 통합 ✅

---

## 7. 개선 사항 (Phase 2)

### 7-1. 관련 문서 클릭 시 사이드바 하이라이트 동기화

**문제**: `showDocItem()` 호출 시 사이드바의 `.doc-nav-item` active 상태를 업데이트하고, 해당 카테고리를 open하지만, **renderDocNav(filter)로 검색 중일 때** 기존 렌더링이 active를 반영하지 않거나 **스크롤이 따라가지 않는** 문제가 있다.

**수정 범위**: `app.js` — `showDocItem()` 함수

**수정 내용**:
1. active 클래스 토글 후, 해당 nav-item이 보이도록 `scrollIntoView()` 추가
2. 부모 카테고리가 닫혀있으면 자동 open
3. 검색 필터가 활성화된 상태에서 관련 문서 클릭 시 → 검색어 초기화 후 전체 nav를 다시 렌더, 해당 항목으로 이동

**코드 변경점**:
```js
// showDocItem() 내부 — nav active 업데이트 부분
// 1. 검색 필터 초기화
if (docSearchInput.value) {
  docSearchInput.value = '';
  renderDocNav();
}
// 2. active 토글 + 카테고리 open (기존 로직 유지)
// 3. scrollIntoView 추가
if (parentCat) {
  parentCat.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
```

---

### 7-2. 파일 참조(`code` 태그) 클릭 시 모듈 탭 파일로 이동

**문제**: Doc 콘텐츠에 파일 경로가 `<code>` 태그로 표시되지만, 클릭해도 아무 일도 일어나지 않는다.

#### 예시 시나리오

**예시 1 — 에이전트 파일 (성공)**
> Doc 탭 > 에이전트 레퍼런스 > "Amelia (Developer)" 문서를 보고 있다.
> 본문에 **파일:** `_bmad/bmm/agents/dev.md` 라는 코드가 있다.
> 이 경로는 flowchart-data.js의 BMM 모듈 Developer 에이전트의 `agentFile`과 일치한다.
> → 클릭하면:
>   1. **BMM 탭으로 자동 이동**
>   2. Developer 에이전트 카드가 active 하이라이트
>   3. 우측에 **에이전트 파일 뷰어가 자동으로 열림** (`showAgentViewer()` 호출)
>   4. dev.md의 역할 설명, 관련 워크플로우 목록 등을 바로 확인 가능

**예시 2 — 워크플로우 파일 (성공)**
> Doc 탭 > 워크플로우 가이드 > "Brainstorming" 문서를 보고 있다.
> 본문에 `_bmad/core/workflows/brainstorming/workflow.md`라는 코드가 있다고 하자.
> 이 경로는 flowchart-data.js의 CORE 모듈 Brainstorming 워크플로우의 `workflowFile`과 일치한다.
> → 클릭하면:
>   1. **CORE 탭으로 자동 이동**
>   2. Brainstorming 워크플로우 항목이 펼쳐지고 스크롤
>   3. 우측에 **워크플로우 파일 뷰어가 자동으로 열림** (`showFileViewer()` 호출, isWorkflowFile=true)
>   4. workflow.md의 단계별 설명, 스텝 네비게이션 등을 바로 확인 가능
>
> 참고: 현재 doc-data.js에는 워크플로우 파일 전체 경로가 직접 표기된 곳은 없지만,
> `buildSearchIndex()`에 `workflowFile`을 인덱싱해두면 향후 콘텐츠 추가 시에도 자동 대응된다.

**예시 3 — 워크플로우 내부 파일 (성공)**
> Doc 콘텐츠에 `brain-methods.csv`라는 코드가 있다고 하자.
> 이 파일은 flowchart-data.js의 CORE > Brainstorming 워크플로우 내부 파일로 이미 인덱싱되어 있다.
> (searchIndex에 `{ type: 'file', id: 'brain-methods.csv', wfId: 'brainstorming', modId: 'core' }`)
> → 클릭하면:
>   1. **CORE 탭으로 이동**
>   2. Brainstorming 워크플로우가 펼쳐지며 스크롤
>   3. 우측에 **파일 뷰어가 자동으로 열림** (`showFileViewer()` 호출)
>   4. brain-methods.csv의 36개 브레인스토밍 기법 데이터를 바로 확인 가능

**예시 4 — 모듈 설정 파일 (실패)**
> 모듈 가이드 > "CORE 모듈" 문서를 보고 있다.
> 본문에 `_bmad/core/config.yaml` 이 있다.
> config.yaml은 에이전트 파일도 워크플로우 파일도 아니고, 워크플로우 내부 파일로도 인덱싱되어 있지 않다.
> → 매칭 실패 → 일반 `<code>` 표시 유지 (클릭 불가).

**예시 5 — 산출물 파일 (실패)**
> 레시피 > "새 프로젝트 시작하기" 문서를 보고 있다.
> 본문에 `PRD.md`, `architecture.md` 등이 코드 태그로 있다.
> 이 파일들은 사용자가 BMAD로 생성하는 산출물이라 시스템 데이터에 존재하지 않는다.
> → 매칭 실패 → 일반 `<code>` 표시 유지 (클릭 불가).

#### 데이터 구조 분석

Doc 콘텐츠의 `<code>` 태그 파일 경로는 두 종류다:

| 구분 | Doc의 표기 예시 | searchIndex 매칭 |
|------|----------------|-----------------|
| 에이전트 파일 | `_bmad/bmm/agents/dev.md` | ❌ searchIndex에 없음 (agentFile은 file 타입으로 인덱싱 안 됨) |
| 워크플로우 파일 | `_bmad/core/workflows/brainstorming/workflow.md` | ❌ searchIndex에 없음 (workflowFile도 file 타입으로 인덱싱 안 됨) |
| 워크플로우 내부 파일 | `steps/step-01-session-setup.md`, `brain-methods.csv` | ✅ searchIndex에 `type:'file'`로 존재 (상대 경로) |
| 모듈 설정 파일 | `_bmad/core/config.yaml` | ❌ searchIndex에 없음 |
| 사용자 산출물 | `PRD.md`, `architecture.md` | ❌ searchIndex에 없음 |

현재 searchIndex의 `type:'file'` 항목은 **워크플로우 내부 파일**(step-*.md, template.md, *.csv 등)만 포함한다.
에이전트 파일(`agentFile`)과 워크플로우 파일(`workflowFile`)은 인덱싱되어 있지 않다.

#### 매칭 전략 (3단계 fallback)

1. **agent/workflow 직접 매칭** — `<code>` 텍스트를 BMAD_DATA에서 `agentFile` / `workflowFile`과 비교
   - 매칭 → 모듈 탭 이동 + 하이라이트 + **파일 뷰어 자동 열기**
2. **searchIndex file 매칭** — searchIndex에서 `type:'file'` 중 path 비교 (파일명 fallback 포함)
   - 매칭 → 모듈 탭 이동 + 워크플로우 펼침 + **파일 뷰어 자동 열기**
3. **매칭 실패** — 클릭 불가, 일반 `<code>` 유지

```
[<code> 텍스트 감지]
      │
      ▼
  확장자 검사 (.md/.yaml/.yml/.csv/.json/.xml)
      │ YES
      ▼
  <pre> 내부인가? → YES → 무시
      │ NO
      ▼
  BMAD_DATA에서 agentFile 매칭?
      │ YES → 모듈 탭 이동 + showAgentViewer()
      │ NO
      ▼
  BMAD_DATA에서 workflowFile 매칭?
      │ YES → 모듈 탭 이동 + 워크플로우 펼침 + showFileViewer(isWorkflow=true)
      │ NO
      ▼
  searchIndex에서 file.id 매칭? (정확 → 파일명 fallback)
      │ YES → 모듈 탭 이동 + 워크플로우 펼침 + showFileViewer()
      │ NO
      ▼
  [매칭 실패 — 일반 code 유지]
```

#### 수정 범위

- `app.js` — `buildSearchIndex()`에 agentFile/workflowFile도 인덱싱 추가 (subType 구분)
- `app.js` — `navigateToItem()` file 분기에 파일 뷰어 자동 열기 로직 추가
- `app.js` — `showDocItem()` 렌더링 후 `<code>` 태그 파일 링크 변환 로직
- `styles.css` — `doc-file-link` 클릭 가능 스타일

#### 코드 변경점

**1. buildSearchIndex() 확장** — 에이전트/워크플로우 파일도 인덱싱 (subType으로 구분):
```js
mod.agents.forEach(agent => {
  // 기존 agent push 유지
  if (agent.agentFile) {
    items.push({
      type: 'file',
      subType: 'agent',           // ← 에이전트 파일 구분용
      name: agent.agentFile.split('/').pop(),
      fullName: agent.fullName,
      id: agent.agentFile,
      modId: mod.id, modName: mod.shortName, color: mod.color,
      data: agent,                // ← agent 객체 전달 (showAgentViewer에 필요)
      wfId: agent.id, wfName: agent.name
    });
  }
});

mod.workflows.forEach(wf => {
  // 기존 workflow push 유지
  if (wf.workflowFile) {
    items.push({
      type: 'file',
      subType: 'workflow',        // ← 워크플로우 파일 구분용
      name: wf.workflowFile.split('/').pop(),
      fullName: wf.description || '',
      id: wf.workflowFile,
      modId: mod.id, modName: mod.shortName, color: mod.color,
      data: { path: wf.workflowFile, type: wf.workflowFile.split('.').pop() },
      wfId: wf.id, wfName: wf.name
    });
  }
  // 기존 file 인덱싱 유지
});
```

**2. navigateToItem() file 분기 수정** — 하이라이트 + 파일 뷰어 자동 열기:
```js
if (item.type === 'file') {
  switchTab(item.modId);
  requestAnimationFrame(() => {
    const mod = BMAD_DATA.modules.find(m => m.id === item.modId);

    // (A) 에이전트 파일 → 에이전트 뷰어 열기
    if (item.subType === 'agent') {
      showAgentViewer(item.data, mod);
      return;
    }

    // (B) 워크플로우/내부 파일 → 워크플로우 펼침 + 파일 뷰어 열기
    const wfItem = moduleView.querySelector(
      `.wf-list-item[data-wf-id="${CSS.escape(item.wfId)}"]`
    );
    if (wfItem) {
      const body = wfItem.querySelector('.wf-list-body');
      const toggle = wfItem.querySelector('.wf-list-toggle');
      if (body && !body.classList.contains('open')) {
        body.classList.add('open');
        if (toggle) toggle.classList.add('open');
      }
      wfItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      wfItem.style.boxShadow = `0 0 0 2px ${item.color}`;
      setTimeout(() => { wfItem.style.boxShadow = ''; }, 2000);
    }

    // 파일 뷰어 자동 열기
    if (item.subType === 'workflow') {
      // 워크플로우 정의 파일
      showFileViewer(item.data, item.wfId, true);
    } else {
      // 워크플로우 내부 파일
      showFileViewer(item.data, item.wfId, false);
    }
  });
  return;
}
```

**3. showDocItem() 내부 — 파일 링크 변환**:
```js
docContentInner.querySelectorAll('code').forEach(codeEl => {
  const text = codeEl.textContent.trim();
  if (!/\.(md|yaml|yml|csv|json|xml)$/i.test(text)) return;
  if (codeEl.closest('pre')) return; // <pre><code> 블록 내부 무시

  const match = searchIndex.find(i => i.type === 'file' && i.id === text)
    || searchIndex.find(i => i.type === 'file' && i.id.endsWith('/' + text.split('/').pop()));

  if (match) {
    codeEl.classList.add('doc-file-link');
    codeEl.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateToItem(match);
    });
  }
});
```

**4. CSS 추가** (`styles.css`):
```css
code.doc-file-link {
  cursor: pointer;
  border-bottom: 1px dashed var(--text3);
  transition: color 0.15s, border-color 0.15s;
}
code.doc-file-link:hover {
  color: #3b82f6;
  border-color: #3b82f6;
}
```

---

### 7-3. 슬래시 명령어(`/bmad-*`) 클릭 시 워크플로우/에이전트로 이동

**문제**: Doc 콘텐츠에 `/bmad-bmm-create-prd`, `/bmad-agent-bmm-dev` 같은 슬래시 명령어가 `<code>` 태그로 표시되지만, 클릭해도 아무 일도 일어나지 않는다.

#### 검토 결과: 가능

슬래시 명령어는 두 종류이며, 각각 flowchart-data.js의 데이터와 매칭 가능하다.

**유형 1 — 워크플로우 명령어** (`/bmad-<모듈>-<워크플로우>`)
> `/bmad-` 접두사를 제거하면 워크플로우 ID와 **정확히 일치**한다.

| Doc 명령어 | `/bmad-` 제거 | workflow ID | 일치 |
|---|---|---|---|
| `/bmad-bmm-create-prd` | `bmm-create-prd` | `bmm-create-prd` | ✅ |
| `/bmad-bmm-validate-prd` | `bmm-validate-prd` | `bmm-validate-prd` | ✅ |
| `/bmad-bmm-create-architecture` | `bmm-create-architecture` | `bmm-create-architecture` | ✅ |
| `/bmad-bmm-code-review` | `bmm-code-review` | `bmm-code-review` | ✅ |

**유형 2 — 에이전트 명령어** (`/bmad-agent-<모듈>-<이름>`)
> `/bmad-agent-` 접두사를 제거하면 에이전트 ID와 **대부분 일치**한다.

| Doc 명령어 | `/bmad-agent-` 제거 | agent ID | 일치 |
|---|---|---|---|
| `/bmad-agent-bmm-analyst` | `bmm-analyst` | `bmm-analyst` | ✅ |
| `/bmad-agent-bmm-architect` | `bmm-architect` | `bmm-architect` | ✅ |
| `/bmad-agent-bmm-dev` | `bmm-dev` | `bmm-developer` | ❌ |
| `/bmad-agent-bmm-pm` | `bmm-pm` | `bmm-pm` | ✅ |
| `/bmad-agent-bmm-quick-flow` | `bmm-quick-flow` | `bmm-solo` | ❌ |
| `/bmad-agent-bmm-sm` | `bmm-sm` | `bmm-sm` | ✅ |

에이전트 ID 불일치 케이스(2건)를 위해 **agentFile 파일명 fallback**을 사용한다:
- `bmm-dev` → agentFile 중 `dev.md` 포함하는 항목 매칭 ✅
- `bmm-quick-flow` → agentFile 중 `quick-flow` 포함하는 항목 매칭 ✅

**유형 3 — 태스크/도구 명령어** (`/bmad-<이름>`)
| Doc 명령어 | `/bmad-` 제거 | ID 매칭 |
|---|---|---|
| `/bmad-help` | `core-help` (core- 접두사 필요) | `core-help` ✅ |
| `/bmad-brainstorming` | `core-brainstorming` | `core-brainstorming` ✅ |
| `/bmad-party-mode` | `core-party-mode` | `core-party-mode` ✅ |
| `/bmad-shard-doc` | `core-shard-doc` | `core-shard-doc` ✅ |

태스크 명령어는 `/bmad-` 제거 후 `core-` 접두사를 붙여 매칭한다.

#### 예시 시나리오

**예시 1 — 워크플로우 명령어 (성공)**
> Doc 탭 > 워크플로우 가이드 > "Create PRD" 문서를 보고 있다.
> 본문에 **명령어:** `/bmad-bmm-create-prd` 라는 코드가 있다.
> `/bmad-` 제거 → `bmm-create-prd` → searchIndex에서 `type:'workflow'`, `id:'bmm-create-prd'` 매칭.
> → 클릭하면:
>   1. **Overview 탭으로 이동** (또는 현재 Overview면 유지)
>   2. BMM 모듈 펼침
>   3. Create PRD 워크플로우 노드로 줌+패닝
>   4. **디테일 패널 자동 열림** (`showDetail()` 호출)

**예시 2 — 에이전트 명령어 (성공)**
> Doc 탭 > 커맨드 레퍼런스 > "에이전트 명령어 목록" 문서를 보고 있다.
> 본문에 `/bmad-agent-bmm-dev` 라는 코드가 있다.
> `/bmad-agent-` 제거 → `bmm-dev` → agent ID로 직접 매칭 실패 →
> agentFile fallback: `dev.md` 포함하는 에이전트 검색 → `bmm-developer` 매칭.
> → 클릭하면:
>   1. **BMM 탭으로 이동**
>   2. Developer 에이전트 카드 하이라이트
>   3. **에이전트 뷰어 자동 열림**

**예시 3 — 태스크 명령어 (성공)**
> Doc 탭에서 `/bmad-help` 코드가 있다.
> `/bmad-` 제거 → `help` → 직접 매칭 실패 → `core-help` fallback 매칭.
> → 클릭하면 **Overview**에서 CORE 모듈 펼침 → Help 워크플로우로 이동.

**예시 4 — `<pre><code>` 블록 내부 (무시)**
> 레시피에 아래와 같은 코드 블록이 있다:
> ```
> [새 채팅] /bmad-bmm-create-prd → PRD.md 생성
> ```
> `<pre>` 내부의 `<code>`이므로 링크 변환 대상에서 제외된다.

#### 불일치 명령어 매핑 테이블 (11건)

직접 변환으로 매칭되지 않는 11개 명령어를 위한 명시적 alias:

```js
const CMD_ALIAS = {
  // 워크플로우 (6건)
  'bmm-automate': 'bmm-qa-automate',
  'bmm-check-implementation-readiness': 'bmm-check-readiness',
  'bmm-create-epics-and-stories': 'bmm-create-epics',
  'bmm-create-ux-design': 'bmm-create-ux',
  'bmm-generate-project-context': 'bmm-generate-context',
  'bmm-research': 'bmm-market-research',
  // 태스크 (3건) — core- 접두사 붙인 후에도 불일치
  'core-editorial-review-prose': 'core-editorial-prose',
  'core-editorial-review-structure': 'core-editorial-structure',
  'core-review-adversarial-general': 'core-review-adversarial'
};
```

에이전트 불일치 (2건)는 기존 agentFile fallback으로 해결:
- `bmm-dev` → agentFile에 `dev.md` 포함 → `bmm-developer` ✅
- `bmm-quick-flow` → agentFile에 `quick-flow` 포함 → `bmm-solo` ✅

#### 매칭 플로우

```
[<code> 텍스트가 /bmad- 로 시작하는가?]
      │ YES
      ▼
  <pre> 내부인가? → YES → 무시
      │ NO
      ▼
  /bmad-agent- 로 시작? (에이전트 명령어)
      │ YES
      │   ├── /bmad-agent- 제거 → agent ID로 searchIndex 매칭?
      │   │     YES → navigateToItem(agent)
      │   │     NO  → 파일명 fallback (agentFile에 키워드 포함?)
      │   │           YES → navigateToItem(agent file)
      │   │           NO  → 매칭 실패
      │ NO
      ▼
  /bmad- 제거 → wfKey
      │
      ▼
  CMD_ALIAS[wfKey] 존재? → YES → wfKey = alias 값
      │ NO (그대로)
      ▼
  searchIndex에서 workflow ID === wfKey?
      │ YES → navigateToItem(workflow)
      │ NO
      ▼
  core- 접두사 추가 → coreKey
      │
      ▼
  CMD_ALIAS[coreKey] 존재? → YES → coreKey = alias 값
      │ NO (그대로)
      ▼
  searchIndex에서 workflow ID === coreKey?
      │ YES → navigateToItem(workflow)
      │ NO
      ▼
  [매칭 실패 — 일반 code 유지]
```

#### 수정 범위

- `app.js` — `showDocItem()` 내부, 기존 파일 링크 변환 로직 뒤에 명령어 링크 변환 로직 추가
- `styles.css` — `doc-cmd-link` 클릭 가능 스타일 (파일 링크와 다른 색상으로 구분)

#### 코드 변경점

**1. CMD_ALIAS 정의** (IIFE 내부 상수):
```js
const CMD_ALIAS = {
  'bmm-automate': 'bmm-qa-automate',
  'bmm-check-implementation-readiness': 'bmm-check-readiness',
  'bmm-create-epics-and-stories': 'bmm-create-epics',
  'bmm-create-ux-design': 'bmm-create-ux',
  'bmm-generate-project-context': 'bmm-generate-context',
  'bmm-research': 'bmm-market-research',
  'core-editorial-review-prose': 'core-editorial-prose',
  'core-editorial-review-structure': 'core-editorial-structure',
  'core-review-adversarial-general': 'core-review-adversarial'
};
```

**2. showDocItem() — 명령어 링크 변환**:
```js
// Bind slash command links
docContentInner.querySelectorAll('code').forEach(codeEl => {
  const text = codeEl.textContent.trim();
  if (!text.startsWith('/bmad-')) return;
  if (codeEl.closest('pre')) return;
  if (codeEl.classList.contains('doc-file-link')) return;

  const cmd = text.slice(1); // remove leading '/'
  let match = null;

  if (cmd.startsWith('bmad-agent-')) {
    // Agent command
    const agentKey = cmd.replace('bmad-agent-', '');
    match = searchIndex.find(i => i.type === 'agent' && i.id === agentKey);
    if (!match) {
      const namePart = agentKey.split('-').slice(1).join('-');
      match = searchIndex.find(i =>
        i.type === 'file' && i.subType === 'agent' &&
        i.id.includes('/' + namePart)
      );
    }
  } else {
    // Workflow/task command
    let wfKey = cmd.replace('bmad-', '');
    wfKey = CMD_ALIAS[wfKey] || wfKey;
    match = searchIndex.find(i => i.type === 'workflow' && i.id === wfKey);
    if (!match) {
      let coreKey = 'core-' + cmd.replace('bmad-', '');
      coreKey = CMD_ALIAS[coreKey] || coreKey;
      match = searchIndex.find(i => i.type === 'workflow' && i.id === coreKey);
    }
  }

  if (match) {
    codeEl.classList.add('doc-cmd-link');
    codeEl.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateToItem(match);
    });
  }
});
```

**2. CSS 추가**:
```css
code.doc-cmd-link {
  cursor: pointer;
  border-bottom: 1px dashed var(--text3);
  transition: color 0.15s, border-color 0.15s;
}
code.doc-cmd-link:hover {
  color: #10b981;
  border-color: #10b981;
}
```

---

### 7-4. 모듈 탭 클릭 후 포커스가 남아있는 문제

**문제**: Overview, DOC 외 모듈 탭(CORE, BMB, BMM, CIS, TEA)을 클릭하면, 다른 탭으로 이동해도 이전 탭 버튼에 브라우저 기본 `:focus` 상태가 남아 계속 포커싱된 것처럼 보인다.

**원인**: `.tab-btn`에 `:focus` / `:focus-visible` 스타일이 정의되지 않아 브라우저 기본 포커스 링이 남거나, 클릭 후 `button` 요소의 focus 상태가 해제되지 않는다.

**수정 범위**: `styles.css` + `app.js`

**수정 내용**:

1. **CSS** — `.tab-btn:focus`에서 outline 제거 + `:focus-visible`로 키보드 접근성만 유지
```css
.tab-btn:focus { outline: none; }
.tab-btn:focus-visible { outline: 1px solid var(--text3); outline-offset: -1px; }
```

2. **JS** — `switchTab()` 호출 후 `document.activeElement.blur()`로 버튼 포커스 즉시 해제
```js
// switchTab 함수 맨 끝 또는 tabBar click 핸들러에서
btn.blur();
```

---

### 7-5. 모듈 탭에서 config.yaml 내용 확인

**문제**: 각 모듈 탭 상단에 `Config: _bmad/core/config.yaml` 텍스트가 표시되지만, 클릭해도 아무 일도 일어나지 않는다. config.yaml의 실제 내용을 파일 뷰어로 확인할 수 없다.

#### 검토 결과: 가능

| 항목 | 상태 |
|---|---|
| 실제 config.yaml 파일 존재 | ✅ 5개 모듈 모두 (`_bmad/*/config.yaml`) |
| 파일 크기 | ✅ 9~23줄로 매우 작음 (총 72줄) |
| YAML 렌더러 | ✅ `highlightYaml()` + `renderFileViewerContent()` 이미 지원 |
| 파일 뷰어 | ✅ `showFileViewer()` 그대로 사용 가능 |

#### 현재 상태

```js
// app.js renderModuleView() 내부 (line 132)
if (mod.configFile) {
  html += `<div class="module-config-file">Config: ${esc(mod.configFile)}</div>`;
}
```
- 텍스트만 표시, 클릭 이벤트 없음
- `FILE_CONTENT`에 config.yaml 콘텐츠 미등록

#### 수정 범위

- `flowchart-data.js` — `FILE_CONTENT`에 5개 config.yaml 내용 추가
- `app.js` — config.yaml 텍스트에 클릭 이벤트 추가

#### 수정 내용

**1. `flowchart-data.js` FILE_CONTENT에 config.yaml 등록**

키 형식: `"config::<모듈id>"` (기존 file 키와 충돌 방지)

```js
"config::core": {
  type: "yaml",
  summary: "CORE 모듈 설정 파일",
  content: `# CORE Module Configuration
# Generated by BMAD installer
# Version: 6.0.3

user_name: User
communication_language: 한글
document_output_language: 한글
output_folder: "{project-root}/_bmad-output"`
},
"config::bmb": {
  type: "yaml",
  summary: "BMB 모듈 설정 파일",
  content: `# BMB Module Configuration
# Generated by BMAD installer
# Version: 6.0.3

bmb_creations_output_folder: "{project-root}/_bmad-output/bmb-creations"

# Core Configuration Values
user_name: User
communication_language: 한글
document_output_language: 한글
output_folder: "{project-root}/_bmad-output"`
},
"config::bmm": {
  type: "yaml",
  summary: "BMM 모듈 설정 파일",
  content: `# BMM Module Configuration
# Generated by BMAD installer
# Version: 6.0.3

project_name: 새 폴더 (2)
user_skill_level: intermediate
planning_artifacts: "{project-root}/_bmad-output/planning-artifacts"
implementation_artifacts: "{project-root}/_bmad-output/implementation-artifacts"
project_knowledge: "{project-root}/docs"

# Core Configuration Values
user_name: User
communication_language: 한글
document_output_language: 한글
output_folder: "{project-root}/_bmad-output"`
},
"config::cis": {
  type: "yaml",
  summary: "CIS 모듈 설정 파일",
  content: `# CIS Module Configuration
# Generated by BMAD installer
# Version: 6.0.3

visual_tools: intermediate

# Core Configuration Values
user_name: User
communication_language: 한글
document_output_language: 한글
output_folder: "{project-root}/_bmad-output"`
},
"config::tea": {
  type: "yaml",
  summary: "TEA 모듈 설정 파일",
  content: `# TEA Module Configuration
# Generated by BMAD installer
# Version: 6.0.3

test_artifacts: "{project-root}/_bmad-output/test-artifacts"
tea_use_playwright_utils: true
tea_use_pactjs_utils: true
tea_pact_mcp: mcp
tea_browser_automation: auto
test_stack_type: auto
ci_platform: auto
test_framework: auto
risk_threshold: p1
test_design_output: _bmad-output/test-artifacts/test-design
test_review_output: _bmad-output/test-artifacts/test-reviews
trace_output: _bmad-output/test-artifacts/traceability

# Core Configuration Values
user_name: User
communication_language: 한글
document_output_language: 한글
output_folder: "{project-root}/_bmad-output"`
}
```

**2. `app.js` renderModuleView() — config.yaml에 클릭 이벤트 추가**

```js
// 기존
if (mod.configFile) {
  html += `<div class="module-config-file">Config: ${esc(mod.configFile)}</div>`;
}

// 변경
if (mod.configFile) {
  html += `<div class="module-config-file clickable" data-mod-id="${mod.id}" data-config-file="${esc(mod.configFile)}">
    ⚙ Config: ${esc(mod.configFile)}
  </div>`;
}
```

**3. `app.js` moduleView 클릭 핸들러 — config 클릭 처리 추가**

```js
// moduleView click delegation 내부에 추가
const configEl = e.target.closest('.module-config-file.clickable');
if (configEl) {
  const modId = configEl.dataset.modId;
  const configPath = configEl.dataset.configFile;
  const content = FILE_CONTENT['config::' + modId] || null;
  showFileViewer(
    { path: configPath, type: 'yaml', purpose: modId.toUpperCase() + ' 모듈 설정 파일' },
    'config-' + modId,
    false
  );
  return;
}
```

**4. `styles.css` — config 파일 클릭 가능 스타일**

```css
.module-config-file.clickable {
  cursor: pointer;
  transition: color 0.15s;
}
.module-config-file.clickable:hover {
  color: var(--text);
}
```

#### `getFileContent` 호환성

현재 `getFileContent(wfId, path)` → `FILE_CONTENT[wfId + '::' + path]` 형태.
config는 `showFileViewer()` 내부에서 `getFileContent('config-core', '_bmad/core/config.yaml')` → `FILE_CONTENT['config-core::_bmad/core/config.yaml']`로 찾게 된다.

따라서 FILE_CONTENT 키를 `"config-core::_bmad/core/config.yaml"` 형태로 등록하거나,
`"config::core"` 형태로 등록하고 `showFileViewer` 호출 전에 직접 content를 세팅하는 방식 중 선택.

→ **`"config-<modId>::<configFile경로>"` 형태로 통일**하면 기존 `getFileContent()` 흐름과 자연스럽게 호환된다.

```js
// FILE_CONTENT 키 최종 형식
"config-core::_bmad/core/config.yaml": { type: "yaml", ... },
"config-bmb::_bmad/bmb/config.yaml": { type: "yaml", ... },
"config-bmm::_bmad/bmm/config.yaml": { type: "yaml", ... },
"config-cis::_bmad/cis/config.yaml": { type: "yaml", ... },
"config-tea::_bmad/tea/config.yaml": { type: "yaml", ... },
```

---

### 7-6. 모듈 탭 전환 시 이전 탭 하이라이트(밑줄)가 남는 문제

**문제**: 모듈 탭(CORE, BMB, BMM 등)을 클릭한 후 다른 탭으로 이동하면, 이전 탭 버튼의 색상 밑줄(border-bottom)이 사라지지 않고 계속 남아있다.

**원인**: `switchTab()` 함수에서 active 탭의 `borderBottomColor`를 인라인 스타일(`btn.style.borderBottomColor = mod.color`)로 세팅한다. 다른 탭으로 전환 시 `.active` 클래스는 제거되지만, **인라인 `style.borderBottomColor`가 그대로 남아있다**. 인라인 스타일은 CSS 클래스보다 우선순위가 높아서, `.tab-btn { border-bottom: 2px solid transparent }` 가 적용되지 않는다.

**재현 흐름**:
1. BMM 탭 클릭 → BMM 버튼에 `style.borderBottomColor = '#f59e0b'` 인라인 세팅
2. CORE 탭 클릭 → BMM `.active` 클래스 제거됨, 하지만 인라인 `borderBottomColor = '#f59e0b'` 잔존
3. CSS `.tab-btn { border-bottom-color: transparent }` < 인라인 스타일 → 노란 밑줄 계속 표시

**수정 범위**: `app.js` — `switchTab()` 함수

**수정 내용**: 모든 탭 버튼을 순회할 때 인라인 `borderBottomColor`를 함께 초기화

```js
// 기존 (64~66줄)
tabBar.querySelectorAll('.tab-btn').forEach(btn => {
  btn.classList.toggle('active', btn.dataset.tab === tabId);
});

// 변경
tabBar.querySelectorAll('.tab-btn').forEach(btn => {
  btn.classList.toggle('active', btn.dataset.tab === tabId);
  btn.style.borderBottomColor = '';  // 인라인 스타일 초기화
});
```

이렇게 하면 68~72줄의 `tabBar.querySelectorAll('.tab-btn.active')` 루프에서 현재 active 탭에만 새로 색상을 세팅하므로, 이전 탭의 밑줄은 자연스럽게 사라진다.

---

### 7-7. 구현 순서

1. ~~`styles.css` — `.tab-btn:focus` / `:focus-visible` 스타일 추가 (7-4)~~ ✅
2. ~~`app.js` — `tabBar` 클릭 핸들러에 `btn.blur()` 추가 (7-4)~~ ✅
3. ~~`app.js` — `showDocItem()` 사이드바 동기화 개선 (7-1)~~ ✅
4. ~~`app.js` — `buildSearchIndex()`에 agentFile/workflowFile 인덱싱 + subType 추가 (7-2)~~ ✅
5. ~~`app.js` — `navigateToItem()` file 분기 수정: 하이라이트 + 파일 뷰어 자동 열기 (7-2)~~ ✅
6. ~~`app.js` — `showDocItem()` 파일 링크 감지 + 클릭 핸들러 (7-2)~~ ✅
7. ~~`styles.css` — `doc-file-link` 스타일 추가 (7-2)~~ ✅
8. ~~`app.js` — `CMD_ALIAS` 상수 + `showDocItem()` 슬래시 명령어 링크 변환 로직 추가 (7-3)~~ ✅
9. ~~`styles.css` — `doc-cmd-link` 스타일 추가 (7-3)~~ ✅
10. ~~`flowchart-data.js` — `FILE_CONTENT`에 5개 config.yaml 내용 등록 (7-5)~~ ✅
11. ~~`app.js` — `renderModuleView()`에서 config.yaml 클릭 가능하게 변경 (7-5)~~ ✅
12. ~~`app.js` — moduleView 클릭 핸들러에 config 클릭 처리 추가 (7-5)~~ ✅
13. ~~`styles.css` — `.module-config-file.clickable` 호버 스타일 추가 (7-5)~~ ✅
14. ~~`app.js` — `switchTab()`에서 탭 버튼 인라인 `borderBottomColor` 초기화 (7-6)~~ ✅
