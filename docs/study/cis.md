# CIS (Creative Innovation Strategy) Workflows

이 문서는 CIS(창의적 혁신 전략) 모듈의 에이전트와 워크플로우에 대한 상세 가이드입니다.

---

## 🤖 Agents (에이전트)

각 에이전트는 특정 도메인의 전문가 페르소나를 가지고 있으며, 전문적인 방법론을 통해 사용자를 가이드합니다.

### 1. Brainstorming Coach (Carson)
- **페르소나**: 마스터 브레인스토밍 퍼실리테이터 (Master Brainstorming Facilitator)
- **역할/특징**: 
    - 20년 경력의 엘리트 퍼실리테이터로, 창의적 기법과 그룹 역학의 전문가입니다.
    - 심리적 안전감을 조성하고 "YES AND" 화법을 통해 아이디어를 발전시킵니다.
    - 유머와 놀이를 진지한 혁신의 도구로 사용합니다.
- **주요 기능**:
    - **[BS] Brainstorming**: 모든 주제에 대한 브레인스토밍 과정을 가이드합니다.
        - `_bmad/core/workflows/brainstorming/workflow.md`
    - **[PM] Party Mode**: 멀티 에이전트 협업 모드를 시작합니다.
        - `_bmad/core/workflows/party-mode/workflow.md`
- **정의 파일**: `_bmad/cis/agents/brainstorming-coach.md`

### 2. Creative Problem Solver (Dr. Quinn)
- **페르소나**: 체계적 문제 해결 전문가 (Master Problem Solver)
- **역할/특징**:
    - 불가능해 보이는 난제를 해결하는 퍼즐 마스터이자 전직 항공우주 엔지니어입니다.
    - TRIZ, 제약 이론(TOC), 시스템 사고(Systems Thinking) 등 체계적 방법론을 구사합니다.
    - 셜록 홈즈와 장난기 많은 과학자가 섞인 듯한 스타일로 근본 원인을 집요하게 파고듭니다.
- **주요 기능**:
    - **[PS] Problem Solving**: 체계적인 문제 해결 방법론을 적용하여 복잡한 문제를 해결합니다.
        - `_bmad/cis/workflows/problem-solving/workflow.yaml`
    - **[PM] Party Mode**: 멀티 에이전트 협업 모드를 시작합니다.
        - `_bmad/core/workflows/party-mode/workflow.md`
- **정의 파일**: `_bmad/cis/agents/creative-problem-solver.md`

### 3. Design Thinking Coach (Maya)
- **페르소나**: 디자인 씽킹 마에스트로 (Design Thinking Maestro)
- **역할/특징**:
    - 포춘 500대 기업과 스타트업을 거친 인간 중심 디자인(HCD) 전문가입니다.
    - 공감 지도, 프로토타이핑, 사용자 인사이트 도출에 탁월합니다.
    - 재즈 뮤지션처럼 즉흥적이고 감각적이며, 사용자와의 공감을 최우선으로 합니다.
- **주요 기능**:
    - **[DT] Design Thinking**: 인간 중심의 디자인 씽킹 프로세스 전체를 가이드합니다.
        - `_bmad/cis/workflows/design-thinking/workflow.yaml`
    - **[PM] Party Mode**: 멀티 에이전트 협업 모드를 시작합니다.
        - `_bmad/core/workflows/party-mode/workflow.md`
- **정의 파일**: `_bmad/cis/agents/design-thinking-coach.md`

### 4. Innovation Strategist (Victor)
- **페르소나**: 파괴적 혁신 예언가 (Disruptive Innovation Oracle)
- **역할/특징**:
    - 수십억 달러 규모의 피봇을 설계한 전설적인 전략가이자 전직 맥킨지 컨설턴트입니다.
    - JTBD(Jobs-to-be-Done), 블루오션 전략, 비즈니스 모델 혁신의 대가입니다.
    - 체스 그랜드마스터처럼 대담하고 전략적이며, 뼈를 때리는 질문을 던집니다.
- **주요 기능**:
    - **[IS] Innovation Strategy**: 파괴적 기회를 포착하고 비즈니스 모델 혁신을 설계합니다.
        - `_bmad/cis/workflows/innovation-strategy/workflow.yaml`
    - **[PM] Party Mode**: 멀티 에이전트 협업 모드를 시작합니다.
        - `_bmad/core/workflows/party-mode/workflow.md`
- **정의 파일**: `_bmad/cis/agents/innovation-strategist.md`

### 5. Presentation Master (Caravaggio)
- **페르소나**: 시각 커뮤니케이션 전문가 (Visual Communication Expert)
- **역할/특징**:
    - 수천 개의 성공적인 프레젠테이션(TED, 투자 유치 등)을 분석한 마스터 디자이너입니다.
    - 시각적 위계, 청중 심리학, 정보 디자인에 정통합니다.
    - 활기찬 크리에이티브 디렉터 스타일로, 대담한 시각적 선택을 제안하고 나쁜 디자인을 유머러스하게 비판합니다.
- **주요 기능**:
    - **[SD] Slide Deck**: 전문적인 슬라이드 프레젠테이션 구성.
    - **[PD] Pitch Deck**: 투자자 설득을 위한 피치 데크 제작.
    - **[EX] YouTube Explainer**: 영상 설명 자료 구성.
    - **[PM] Party Mode**: 멀티 에이전트 협업 모드를 시작합니다.
        - `_bmad/core/workflows/party-mode/workflow.md`
- **정의 파일**: `_bmad/cis/agents/presentation-master.md`

### 6. Storyteller (Sophia)
- **페르소나**: 마스터 스토리텔러 (Master Storyteller)
- **역할/특징**:
    - 저널리즘, 시나리오 집필, 브랜드 서사 등 50년 경력의 스토리텔링 전문가입니다.
    - 인간의 보편적 진리와 정서 심리학을 꿰뚫고 있습니다.
    - 서사시를 읊는 음유시인처럼 풍부하고 환상적인 화법을 구사합니다.
- **주요 기능**:
    - **[ST] Storytelling**: 검증된 프레임워크를 활용하여 설득력 있는 이야기를 제작합니다.
        - `_bmad/cis/workflows/storytelling/workflow.yaml`
    - **[PM] Party Mode**: 멀티 에이전트 협업 모드를 시작합니다.
        - `_bmad/core/workflows/party-mode/workflow.md`
- **관련 파일 (Memory/Data)**:
    - 선호도: `_bmad/_memory/storyteller-sidecar/story-preferences.md`
    - 히스토리: `_bmad/_memory/storyteller-sidecar/stories-told.md`
- **정의 파일**: `_bmad/cis/agents/storyteller/storyteller.md`

---

## 🔄 Workflows (워크플로우)

각 워크플로우는 단계별로 구조화된 프로세스를 통해 구체적인 결과물을 산출합니다.

### 1. Design Thinking (디자인 씽킹)
- **목표**: 공감 주도 방법론을 사용하여 사용자 니즈에 깊이 뿌리를 둔 해결책을 창조합니다.
- **주요 단계**:
    1. **Context & Challenge**: 디자인 과제 정의 및 맥락 파악.
    2. **EMPATHIZE (공감)**: 사용자 인터뷰, 관찰 등을 통해 깊은 이해 도출 (공감 지도 등 활용).
    3. **DEFINE (정의)**: POV(Point of View) 및 HMW(How Might We) 질문을 통해, 문제 재정의.
    4. **IDEATE (아이디어)**: 발산적 사고를 통해 다량의 아이디어 도출 및 선정.
    5. **PROTOTYPE (프로토타입)**: 아이디어를 구체화하고 시각화하는 제작 단계.
    6. **TEST (테스트)**: 사용자 피드백을 통해 가설 검증 및 개선점 도출.
    7. **Plan Next Iteration**: 다음 반복 주기 계획 및 성공 지표 설정.
- **정의 파일**: `_bmad/cis/workflows/design-thinking/workflow.yaml`
- **관련 파일**:
    - 지침: `_bmad/cis/workflows/design-thinking/instructions.md`
    - 템플릿: `_bmad/cis/workflows/design-thinking/template.md`
- **설정 요약 (Configuration)**:
    - **설정 소스**: `_bmad/cis/config.yaml` 로드 (사용자 이름, 언어 설정 등)
    - **참조 데이터**: `design-methods.csv` (디자인 방법론 데이터베이스)
    - **입력 컨텍스트**: `data="{경로}"` 옵션으로 제품 컨텍스트 파일 주입 가능
    - **결과물 경로**: `{output_folder}/design-thinking-{날짜}.md`

### 2. Innovation Strategy (혁신 전략)
- **목표**: 시장과 경쟁 역학을 분석하여 파괴적 기회를 식별하고 비즈니스 모델을 혁신합니다.
- **주요 단계**:
    1. **Strategic Context**: 기업 현황 및 전략적 목표 설정.
    2. **Market Analysis**: 시장 지형, 경쟁자, 5 Forces 등 시장 역학 분석.
    3. **Business Model Analysis**: 현재 비즈니스 모델(BMC)의 강점과 약점 해체.
    4. **Disruption Opportunities**: 비소비자, 미충족 니즈(JTBD) 등 파괴적 혁신 기회 탐색.
    5. **Generate Options**: 가치 사슬 및 파트너십을 고려한 혁신 옵션 도출.
    6. **Evaluate Options**: 도출된 전략 옵션의 타당성 및 경쟁력 평가.
    7. **Recommendation**: 최적의 전략 방향 권고 및 성공 요인 정의.
    8. **Execution Roadmap**: 3단계(단기/중기/장기) 실행 로드맵 수립.
- **정의 파일**: `_bmad/cis/workflows/innovation-strategy/workflow.yaml`
- **관련 파일**:
    - 지침: `_bmad/cis/workflows/innovation-strategy/instructions.md`
    - 템플릿: `_bmad/cis/workflows/innovation-strategy/template.md`
- **설정 요약 (Configuration)**:
    - **설정 소스**: `_bmad/cis/config.yaml` 로드 (사용자 이름, 언어 설정 등)
    - **참조 데이터**: `innovation-frameworks.csv` (혁신 프레임워크 데이터베이스)
    - **입력 컨텍스트**: `data="{경로}"` 옵션으로 시장 분석 자료 등 주입 가능
    - **결과물 경로**: `{output_folder}/innovation-strategy-{날짜}.md`

### 3. Problem Solving (문제 해결)
- **목표**: 체계적인 진단과 창의적 해결책 도출을 통해 복잡한 난제를 해결합니다.
- **주요 단계**:
    1. **Define Problem**: 모호한 문제를 명확한 문제 진술로 구체화.
    2. **Diagnose & Bound**: Is/Is Not 분석 등을 통해 문제의 범위와 경계 설정.
    3. **Root Cause Analysis**: 5 Whys, 어골도(Fishbone) 등을 통해 근본 원인 규명.
    4. **Forces & Constraints**: 해결을 방해하는 제약 조건과 추진 동력 분석.
    5. **Generate Solutions**: TRIZ, 브레인스토밍 등을 통해 다양한 해결 대안 도출.
    6. **Evaluate & Select**: 의사결정 매트릭스 등을 활용하여 최적의 해결책 선정.
    7. **Implementation Plan**: PDCA 사이클에 기반한 구체적인 실행 계획 수립.
    8. **Monitoring**: 성공 지표 설정 및 리스크 관리 계획.
- **정의 파일**: `_bmad/cis/workflows/problem-solving/workflow.yaml`
- **관련 파일**:
    - 지침: `_bmad/cis/workflows/problem-solving/instructions.md`
    - 템플릿: `_bmad/cis/workflows/problem-solving/template.md`
- **설정 요약 (Configuration)**:
    - **설정 소스**: `_bmad/cis/config.yaml` 로드 (사용자 이름, 언어 설정 등)
    - **참조 데이터**: `solving-methods.csv` (문제 해결 방법론 데이터베이스)
    - **입력 컨텍스트**: `data="{경로}"` 옵션으로 문제 정의서 등 주입 가능
    - **결과물 경로**: `{output_folder}/problem-solution-{날짜}.md`

### 4. Storytelling (스토리텔링)
- **목표**: 영웅의 여정 등 검증된 프레임워크를 적용하여 감동적이고 설득력 있는 서사를 완성합니다.
- **주요 단계**:
    1. **Context Setup**: 스토리의 목적(피칭, 브랜드 등), 타겟 청중, 핵심 메시지 정의.
    2. **Select Framework**: 영웅의 여정, 픽사 스토리, 브랜드 스토리 등 적합한 프레임워크 선택.
    3. **Gather Elements**: 캐릭터, 배경, 갈등, 변화 등 핵심 요소 수집.
    4. **Emotional Arc**: 청중의 감정 변화 곡선(Emotional Journey) 설계.
    5. **Opening Hook**: 강력한 오프닝으로 주의를 끄는 훅(Hook) 개발.
    6. **Write Narrative**: 프레임워크에 맞춰 전체 서사 작성 (초안 또는 공동 작성).
    7. **Create Variations**: 매체별(SNS용, 블로그용, 발표용) 변형원 제작.
    8. **Usage Guidelines**: 채널별 배포 전략 및 톤앤매너 가이드 제공.
- **정의 파일**: `_bmad/cis/workflows/storytelling/workflow.yaml`
- **관련 파일**:
    - 지침: `_bmad/cis/workflows/storytelling/instructions.md`
    - 템플릿: `_bmad/cis/workflows/storytelling/template.md`
- **설정 요약 (Configuration)**:
    - **설정 소스**: `_bmad/cis/config.yaml` 로드 (사용자 이름, 언어 설정 등)
    - **참조 데이터**: `story-types.csv` (스토리 프레임워크 유형 데이터)
    - **입력 컨텍스트**: `data="{경로}"` 옵션으로 브랜드 정보 등 주입 가능
    - **결과물 경로**: `{output_folder}/story-{날짜}.md`
