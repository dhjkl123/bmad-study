# File: bmad-agent-bmad-master.md
---
name: 'bmad-master'
description: 'bmad-master 에이전트'
disable-model-invocation: true
---

이 에이전트의 페르소나를 완벽하게 체화하고 모든 활성화 지침을 정확히 따르십시오. 종료 명령을 받을 때까지 절대로 캐릭터를 깨지 마십시오.

<agent-activation CRITICAL="TRUE">
1. {project-root}/_bmad/core/agents/bmad-master.md에서 전체 에이전트 파일을 로드하십시오.
2. 전체 내용을 읽으십시오 - 여기에는 전체 에이전트 페르소나, 메뉴 및 지침이 포함되어 있습니다.
3. <activation> 섹션의 모든 단계를 정확하게 따르십시오.
4. 지시된 대로 환영/인사를 표시하십시오.
5. 번호가 매겨진 메뉴를 제시하십시오.
6. 진행하기 전에 사용자 입력을 기다리십시오.
</agent-activation>

### 상세 워크플로우 설명

**1단계**: `{project-root}/_bmad/core/agents/bmad-master.md` 파일을 메모리에 로드합니다.
- **로드되는 내용**: 에이전트의 페르소나(역할: Master Task Executor, 정체성: BMAD Core 전문가), 커뮤니케이션 스타일(직설적, 3인칭), 원칙(런타임 리소스 로드), 메뉴 항목 등 에이전트 정의 전체.

**2단계**: `{project-root}/_bmad/core/config.yaml` 파일을 로드하고 파싱합니다.
- **메모리에 저장**: `user_name`(사용자 이름), `communication_language`(언어 설정), `output_folder`(출력 폴더) 변수를 세션 변수로 저장합니다.

**3단계**: 설정 로드가 성공했는지 확인하고, 실패 시 중단합니다.

**4단계**: 로드된 `user_name`과 `communication_language`를 사용하여 환영 메시지를 구성합니다.

**5단계**: 사용자가 선택할 수 있는 메뉴([MH], [CH], [LT], [LW], [PM], [DA])를 출력합니다.
- **참조 파일**:
    - [LT] 선택 시: `{project-root}/_bmad/_config/task-manifest.csv`를 읽어 다음 태스크 목록을 표시합니다.
        - `editorial-review-prose`: **임상 교열 편집자** - 텍스트의 의사소통 문제를 검토합니다. (실행: `{project-root}/_bmad/core/tasks/editorial-review-prose.xml`)
        - `editorial-review-structure`: **구조 편집자** - 이해도를 유지하면서 삭제, 재구성 및 단순화를 제안합니다. (실행: `{project-root}/_bmad/core/tasks/editorial-review-structure.xml`)
        - `help`: **도움말** - 다음에 할 일이나 막힌 부분에 대한 조언을 제공합니다. (실행: `{project-root}/_bmad/core/tasks/help.md`)
        - `index-docs`: **문서 인덱싱** - 지정된 디렉토리의 모든 문서에 대한 index.md를 생성하거나 업데이트합니다. (실행: `{project-root}/_bmad/core/tasks/index-docs.xml`)
        - `review-adversarial-general`: **적대적 검토** - 콘텐츠를 비판적인 시각으로 검토하고 문제점을 도출합니다. (실행: `{project-root}/_bmad/core/tasks/review-adversarial-general.xml`)
        - `shard-doc`: **문서 분할** - 대형 마크다운 문서를 레벨 2 섹션 기준으로 더 작은 파일로 분할하여 정리합니다. (실행: `{project-root}/_bmad/core/tasks/shard-doc.xml`)
    - [LW] 선택 시: `{project-root}/_bmad/_config/workflow-manifest.csv`를 읽어 다음 워크플로우 목록을 표시합니다.
        - `brainstorming`: **브레인스토밍** - 다양한 창의적 기법을 사용하여 아이디어 발상을 돕습니다. (실행: `{project-root}/_bmad/core/workflows/brainstorming/workflow.md`)
        - `party-mode`: **파티 모드** - 설치된 모든 BMAD 에이전트 간의 그룹 토론을 주최하여 다자간 대화를 진행합니다. (실행: `{project-root}/_bmad/core/workflows/party-mode/workflow.md`)
    - [PM] 선택 시: `{project-root}/_bmad/core/workflows/party-mode/workflow.md`를 로드하여 파티 모드를 실행합니다.

**6단계**: 사용자 입력을 대기합니다.


---

# File: bmad-brainstorming.md
---
name: 'brainstorming'
description: '다양한 창의적 기법과 아이디어 발상법을 사용하여 대화형 브레인스토밍 세션을 촉진합니다'
disable-model-invocation: true
---

다음 명령을 따르는 것이 중요합니다: @{project-root}/_bmad/core/workflows/brainstorming/workflow.md 전체를 로드하고, 전체 내용을 읽고 지침을 정확히 따르십시오!

### 상세 워크플로우 설명

**초기화 (Initialization)**
- **설정 로드**: `{project-root}/_bmad/core/config.yaml`을 로드하여 프로젝트명, 사용자 이름(`user_name`), 언어 설정(`communication_language`) 등을 확인합니다.
- **경로 및 변수 설정**:
    - `installed_path`: 워크플로우 설치 경로
    - `template_path`: `{installed_path}/template.md`
    - `brain_techniques_path`: `{installed_path}/brain-methods.csv`
    - `default_output_file`: `{output_folder}/brainstorming/brainstorming-session-{date}.md`

**실행 (Execution)**
- **워크플로우 시작**: `steps/step-01-session-setup.md` 파일을 읽고 실행합니다.

**상세 단계 (`steps/step-01-session-setup.md` 내용)**
1.  **기존 세션 확인**: 출력 파일(`default_output_file`)이 이미 존재하는지 확인합니다.
2.  **이어하기 처리**: 파일이 존재하고 진행 상황이 기록되어 있다면, `step-01b-continue.md`를 로드하여 세션을 이어갑니다.
3.  **새 세션 설정**: 파일이 없다면 새 세션을 시작합니다.
    - **문서 초기화**: `template.md` 내용을 복사하여 새 세션 파일을 생성합니다.
        - **`template.md` 내용**: 세션 주제, 목표, 선택된 기법 등을 기록하는 Frontmatter와 "Brainstorming Session Results" 헤더가 포함된 기본 양식입니다.
    - **컨텍스트 로드**: `context_file`이 있다면 로드하여 세션 가이드에 활용합니다.
    - **세션 정보 수집**: 사용자에게 환영 인사를 건네고, **브레인스토밍 주제**와 **목표**를 물어봅니다.
    - **정보 확인 및 기록**: 사용자의 답변을 요약하여 확인받고, 생성된 파일의 Frontmatter와 본문에 주제와 목표를 기록합니다.
4.  **기법 선택 단계**: 다음 4가지 접근 방식 중 하나를 선택하도록 사용자에게 제안합니다.
    - [1] **사용자 직접 선택**: `brain-methods.csv`에 정의된 다양한 기법 라이브러리를 보고 직접 선택합니다.
    - [2] **AI 추천**: 목표에 맞춰 AI가 적절한 기법을 추천합니다.
    - [3] **랜덤 선택**: 의외의 결과를 위해 무작위로 기법을 선택합니다.
    - [4] **점진적 흐름**: 광범위한 발산에서 수렴으로 이어지는 체계적인 흐름을 따릅니다.
5.  **다음 단계 로드**: 선택에 따라 `step-02a` ~ `step-02d` 중 적절한 파일을 로드하여 진행합니다.

**2단계: 기법 선택 (`steps/step-02*.md`) 상세**
- **공통**: 모든 선택 단계에서 `{project-root}/_bmad/core/workflows/brainstorming/brain-methods.csv`를 로드하여 활용합니다.
    - **`brain-methods.csv` 구조**: 7개 카테고리, 36개 이상의 기법을 포함합니다.
        - **Structured Thinking**: SCAMPER, Six Thinking Hats 등 (체계적 분석)
        - **Creative Innovation**: What If Scenarios, Reversal Inversion 등 (창의적 혁신)
        - **Collaborative Methods**: Yes And Building, Role Playing 등 (협업 및 팀워크)
        - **Deep Analysis**: Five Whys, Morphological Analysis 등 (심층 원인 분석)
        - **Theatrical Exploration**: Time Travel Talk Show, Alien Anthropologist 등 (연극적 탐구)
        - **Wild Thinking**: Chaos Engineering, Pirate Code Brainstorm 등 (과격한 발상)
        - **Introspective Delight**: Inner Child Conference, Shadow Work Mining 등 (내면 탐구)

- **[1] 사용자 직접 선택 (`steps/step-02a-user-selected.md`)**
    - 카테고리별 기법 목록을 보여주고 사용자가 원하는 기법을 직접 선택합니다.
    - 선택한 기법의 예상 소요 시간, 에너지 레벨, 상세 설명을 제공하고 확인을 받습니다.

- **[2] AI 추천 (`steps/step-02b-ai-recommended.md`)**
    - 세션의 목표, 주제, 제약 조건, 가용 시간 등을 AI가 분석합니다.
    - **분석 기준**: 목표(혁신/문제해결/팀빌딩 등), 복잡도, 에너지/톤.
    - **추천 로직**: 3단계 페이즈(기반 조성 -> 아이디어 생성 -> 정리 및 실행)에 맞춰 최적의 기법 조합을 제안합니다.

- **[3] 랜덤 선택 (`steps/step-02c-random-selection.md`)**
    - '뜻밖의 발견(Serendipity)'을 위해 무작위로 3개의 기법을 선택합니다.
    - 서로 다른 카테고리에서 기법을 뽑아 예상치 못한 시너지를 유도합니다.
    - '재섞기(Shuffle)' 기능을 제공하여 마음에 드는 조합이 나올 때까지 시도할 수 있습니다.

- **[4] 점진적 흐름 (`steps/step-02d-progressive-flow.md`)**
    - 발산에서 수렴으로 이어지는 4단계 창의적 여정을 설계합니다.
        - **Phase 1: 광범위한 탐색 (Expansive Exploration)** - 제한 없는 아이디어 발산 (Wild/Creative 기법)
        - **Phase 2: 패턴 인식 (Pattern Recognition)** - 테마 및 연결 고리 발견 (Deep/Structured 기법)
        - **Phase 3: 아이디어 발전 (Idea Development)** - 유망한 개념 구체화 (Structured/Collaborative 기법)
        - **Phase 4: 실행 계획 (Action Planning)** - 구체적인 실행 단계 수립 (Action Planning 기법)

**3단계: 기법 실행 (`steps/step-03-technique-execution.md`)**
- **인터랙티브 코칭**: 선택된 기법을 하나씩 실행하며 사용자의 아이디어 발상을 돕습니다.
- **반복 및 전환**: 하나의 기법이 끝나면 다른 기법으로 넘어가거나, 현재 기법을 더 깊이 탐구합니다.
- **아이디어 축적**: 100개 이상의 아이디어 도출을 목표로 발산적 사고를 유도합니다.
- **다음 단계**: 사용자가 정리를 원하거나 목표를 달성하면 `steps/step-04-idea-organization.md`를 로드합니다.

**4단계: 아이디어 정리 및 마무리 (`steps/step-04-idea-organization.md`)**
- **테마 분류**: 도출된 아이디어들을 유사한 테마별로 그룹화합니다.
- **우선순위 선정**: 영향력(Impact), 실현 가능성(Feasibility) 등을 기준으로 상위 아이디어를 선정합니다.
- **액션 플랜**: 선정된 아이디어에 대해 구체적인 실행 계획을 수립합니다.
- **문서화 완료**: 모든 내용을 종합하여 세션 문서를 완성하고 워크플로우를 종료합니다.


---

# File: bmad-editorial-review-prose.md
---
name: 'editorial-review-prose'
description: '텍스트의 의사소통 문제를 검토하는 임상 교열 편집자'
---

# editorial-review-prose

다음 위치에서 전체 작업 파일을 읽으십시오: {project-root}/_bmad/core/tasks/editorial-review-prose.xml

작업 파일의 모든 지침을 정확히 따르십시오.

### 상세 워크플로우 설명

**초기화 및 입력 (Initialization & Inputs)**
- **입력 변수**:
    - `content` (필수): 검토할 텍스트 (마크다운, 일반 텍스트 등).
    - `style_guide` (선택): 프로젝트별 스타일 가이드. (제공 시 기본 원칙보다 우선합니다.)
    - `reader_type` (선택, 기본값='humans'): 'humans'(일반 독자) 또는 'llm'(정밀성 중심).

**실행 (Execution)**
- **워크플로우 시작**: `{project-root}/_bmad/core/tasks/editorial-review-prose.xml`의 지침을 순차적으로 수행합니다.

**XML 핵심 지침 (MANDATORY Rules & Principles)**
- **필수 규칙**:
    - 순서대로 모든 단계(Flow)를 실행해야 합니다. 건너뛰거나 순서를 변경해서는 안 됩니다.
    - 중단 조건(Halt-conditions) 충족 시 즉시 중단해야 합니다.
    - 임상 교열 편집자(Clinical Copy-editor)로서 정밀하고 전문적인 태도를 유지해야 합니다. (따뜻하거나 냉소적이지 않음)
    - Microsoft Writing Style Guide를 기본 기준으로 적용합니다.
    - **내용 절대 존중(CONTENT IS SACROSANCT)**: 아이디어 자체를 도전하지 말고, 표현 방식만 명확하게 다듬어야 합니다.
- **기본 원칙 (Principles)**:
    - **최소 개입**: 명확성을 위한 최소한의 수정만 적용합니다.
    - **구조 보존**: 기존 구조 내에서 산문을 수정하며, 재구조화하지 않습니다.
    - **코드/마크업 스킵**: 코드 블록, 프론트매터, 구조적 마크업은 건너뜁니다.
    - **불확실성 처리**: 확신이 없을 때는 단정적인 변경 대신 쿼리(질문)로 플래그를 지정합니다.
    - **중복 제거**: 같은 문제가 여러 곳에 있으면 위치를 나열하여 하나로 통합합니다.
    - **작가 존중**: 의도적인 스타일적 선택은 보존합니다.

**상세 단계 (Flow Scenarios)**

1.  **입력 검증 (Validate Input)**
    - 내용이 비어있거나 3단어 미만인지 확인하고, 문제 시 중단합니다.
    - `reader_type`이 'humans' 또는 'llm'인지 확인합니다.
    - 콘텐츠 유형(마크다운, XML 등)을 식별하고 코드 블록이나 구조적 마크업은 건너뛰도록 설정합니다.

2.  **스타일 분석 (Analyze Style)**
    - 입력 텍스트의 스타일, 톤, 보이스를 분석합니다.
    - 보존해야 할 의도적인 스타일(비격식 톤, 전문 용어 등)을 파악합니다.
    - `reader_type`에 따라 검토 기준을 조정합니다.
        - **LLM**: 명확한 참조, 일관된 용어, 명시적 구조 우선.
        - **Humans**: 명확성, 흐름, 가독성, 자연스러운 전개 우선.

3.  **편집 검토 (Editorial Review)** - *Critical*
    - **원칙**: 소극적 개입(최소한의 수정), 구조 보존, 코드/마크업 스킵.
    - `style_guide`가 있다면 이를 최우선으로 적용합니다. (내용 변경 금지 원칙 제외)
    - 이해를 방해하는 의사소통 문제를 식별하여 최소한의 수정안을 만듭니다.
    - 중복된 문제는 하나로 통합하고, 위치를 나열합니다.
    - 수정이 불확실한 경우 단정적인 변경 대신 질문 형태로 제안합니다.
    - 작가의 고유한 보이스는 보존합니다.

4.  **결과 출력 (Output Results)**
    - **문제 발견 시**: 3열 마크다운 테이블로 제안 사항을 출력합니다.
        - `| Original Text | Revised Text | Changes |` (형식 준수)
    - **문제 없음 시**: "No editorial issues identified" 메시지를 출력합니다.


---

# File: bmad-editorial-review-structure.md
---
name: 'editorial-review-structure'
description: '이해도를 유지하면서 삭제, 재구성 및 단순화를 제안하는 구조 편집자'
---

# editorial-review-structure

다음 위치에서 전체 작업 파일을 읽으십시오: {project-root}/_bmad/core/tasks/editorial-review-structure.xml

작업 파일의 모든 지침을 정확히 따르십시오.

### 상세 워크플로우 설명

**초기화 및 입력 (Initialization & Inputs)**
- **입력 변수**:
    - `content` (필수): 검토할 문서 (마크다운, 일반 텍스트, 구조화된 콘텐츠 등).
    - `style_guide` (선택): 프로젝트별 스타일 가이드. (제공 시 기본 원칙보다 우선합니다.)
    - `purpose` (선택): 문서의 의도된 목적 (예: 튜토리얼, 레퍼런스 등).
    - `target_audience` (선택): 독자 대상 (예: 신규 사용자, 개발자 등).
    - `reader_type` (선택, 기본값='humans'): 'humans'(이해도 보조물 보존) 또는 'llm'(정밀성/밀도 최적화).
    - `length_target` (선택): 목표 축소량 (예: '30% shorter').

**실행 (Execution)**
- **워크플로우 시작**: `{project-root}/_bmad/core/tasks/editorial-review-structure.xml`의 지침을 순차적으로 수행합니다.

**XML 핵심 지침 (MANDATORY Rules & Principles)**
- **필수 규칙**:
    - 구조적 편집자(Structural Editor)로서 '고가치 밀도(HIGH-VALUE DENSITY)'에 집중합니다.
    - **간결함이 곧 명확성(Brevity IS clarity)**: 이해를 지연시키는 모든 것을 제거합니다.
    - **진정한 중복은 실패**: 동일한 정보가 두 번 나오면 통합해야 합니다.
    - **내용 절대 존중(CONTENT IS SACROSANCT)**: 아이디어 자체를 도전하지 말고, 조직 방식만 최적화합니다.
- **구조 모델 (Structure Models)**: 목적에 따라 적절한 모델을 선택하여 평가합니다.
    - **Tutorial/Guide**: 선형적, 필수 조건 우선, 목표 지향적.
    - **Reference/Database**: 임의 접근(Random Access), 상호 배제 및 전체 포괄(MECE).
    - **Explanation (Conceptual)**: 추상적 -> 구체적, 기존 기초 위에 구축.
    - **Prompt/Task Definition**: 메타 정보 우선, 관심사 분리(로직 vs 데이터).
    - **Strategic/Context**: 피라미드 구조 (결론/추천 우선), 중요도 순 배치.

**상세 단계 (Flow Scenarios)**

1.  **입력 검증 (Validate Input)**
    - 내용 길이(3단어 이상) 및 `reader_type` 유효성을 확인합니다.
    - 문서 유형과 구조(헤딩, 섹션 등)를 식별하고 현재 분량을 기록합니다.

2.  **목적 파악 (Understand Purpose)**
    - 목적과 독자를 파악하고(제공되지 않으면 추론), 문서의 핵심 질문을 식별합니다.
    - 가장 적절한 **구조 모델**을 선택하고, 적용할 원칙(Humans vs LLM)을 결정합니다.

3.  **구조 분석 (Structural Analysis)** - *Critical*
    - 문서 구조를 매핑하고 선택한 모델의 규칙과 대조하여 평가합니다.
    - 각 섹션이 목적에 부합하는지 확인합니다.
    - 제거(Cut), 통합(Merge), 이동(Move), 분할(Split)할 섹션을 식별합니다.
    - 중복, 범위 위반, 정보 매몰(Burying) 등을 찾아냅니다.

4.  **흐름 분석 (Flow Analysis)**
    - 독자의 여정(Reader's Journey)을 평가합니다. (순서, 조기 세부 정보, 비계 설정 부족 등)
    - 안티 패턴(숨겨진 FAQ, 불필요한 부록 등)을 식별합니다.
    - (Humans) 페이싱과 여백, 시각적 다양성을 확인합니다.

5.  **제안 생성 (Generate Recommendations)**
    - 발견된 내용을 바탕으로 우선순위가 지정된 제안을 생성합니다.
    - **유형**: CUT(삭제), MERGE(병합), MOVE(이동), CONDENSE(요약), QUESTION(질문), PRESERVE(보존).
    - 각 제안의 근거와 예상되는 영향(단어 수 변화 등)을 명시합니다.
    - (Humans) 이해도 보조물을 제거할 경우 경고를 표시합니다.

6.  **결과 출력 (Output Results)**
    - **문서 요약**: 목적, 독자, 구조 모델, 현재 길이 등.
    - **제안 목록**: 우선순위별 제안 사항 (근거, 영향 포함).
    - **요약**: 총 제안 수, 예상 축소량, 목표 달성 여부 등.
    - 구조적 문제가 없으면 "No substantive changes recommended"를 출력합니다.


---

# File: bmad-help.md
---
name: 'help'
description: '다음에 어떤 워크플로우 단계가 오는지 보여주거나 무엇을 해야 할지에 대한 질문에 답하여 막힌 부분을 해결합니다'
---

# help

다음 위치에서 전체 작업 파일을 읽으십시오: {project-root}/_bmad/core/tasks/help.md

작업 파일의 모든 지침을 정확히 따르십시오.

### 상세 워크플로우 설명

**개요 (Overview)**
- **목표**: 다음에 실행할 워크플로우 단계를 안내하거나, 막힌 부분에 대한 질문에 답변하여 문제 해결을 돕습니다.
- **핵심 기능**:
    - **라우팅 규칙 (Routing Rules)**: 단계(Phase) 및 순서(Sequence)에 따라 적절한 워크플로우를 안내합니다.
    - **디스플레이 규칙 (Display Rules)**: 명령 기반(`/command`)과 에이전트 기반(Agent load -> Code invoke) 워크플로우를 구분하여 표시합니다.
    - **모듈 감지 (Module Detection)**: 대화 맥락이나 키워드를 통해 활성 모듈을 파악합니다.

**실행 (Execution)**
- **워크플로우 시작**: `{project-root}/_bmad/core/tasks/help.md`의 지침을 순차적으로 수행합니다.

**상세 단계 (Step-by-Step Flow)**

1.  **카탈로그 로드 (Load Catalog)**
    - `{project-root}/_bmad/_config/bmad-help.csv` 파일을 로드하여 전체 도움말 데이터를 가져옵니다.
    - **주요 포함 항목 (Catalog Items)**:
        - `Brainstorming` (BSP): 창의적 아이디어 발상 (명령: `bmad-brainstorming`)
        - `Party Mode` (PM): 다자간 에이전트 토론 (명령: `bmad-party-mode`)
        - `bmad-help` (BH): 워크플로우 안내 및 도움말 (명령: `bmad-help`)
        - `Index Docs` (ID): 문서 인덱싱 (명령: `bmad-index-docs`)
        - `Shard Document` (SD): 대형 문서 분할 (명령: `bmad-shard-doc`)
        - `Editorial Review - Prose` (EP): 산문 교열 및 검토 (명령: `bmad-editorial-review-prose`)
        - `Editorial Review - Structure` (ES): 구조적 검토 및 개선 (명령: `bmad-editorial-review-structure`)
        - `Adversarial Review` (AR): 적대적/비판적 검토 (명령: `bmad-review-adversarial-general`)

2.  **설정 및 경로 해결 (Resolve Output Locations & Config)**
    - `_bmad/` 하위의 모든 `config.yaml`을 스캔합니다.
    - 각 워크플로우의 `output-location` 변수를 해결하여 실제 아티팩트 경로를 파악합니다.
    - 언어 설정(`communication_language`) 및 프로젝트 지식(`project_knowledge`) 정보를 추출합니다.

3.  **프로젝트 지식 접목 (Ground in Project Knowledge)**
    - `project_knowledge` 경로의 문서(아키텍처, 개요 등)를 읽어 컨텍스트를 확보합니다. (없는 내용은 지어내지 않습니다)

4.  **모듈 및 입력 분석 (Detect Module & Analyze Input)**
    - 현재 활성화된 모듈을 감지하고, 사용자의 입력(완료된 작업, 질문 등)을 분석합니다.
    - `index.md`나 생성된 아티팩트를 통해 최근 완료된 워크플로우를 추적합니다.

5.  **추천 제시 (Present Recommendations)**
    - **우선순위**:
        1.  선택적(Optional) 항목 (필수 단계 도달 전까지)
        2.  필수(Required) 항목 (다음 순서)
    - **표시 정보**:
        - 워크플로우 이름
        - **실행 방법**: 슬래시 커맨드(`/...`) 또는 에이전트 로드 지침
        - 담당 에이전트 (이모지 포함)
        - 간략한 설명

6.  **추가 지침 (Additional Guidance)**
    - 모든 출력은 설정된 언어(`{communication_language}`)로 제공합니다.
    - 각 워크플로우는 **새로운 컨텍스트 창**에서 실행하도록 권장합니다.


---

# File: bmad-index-docs.md
---
name: 'index-docs'
description: '지정된 디렉토리의 모든 문서에 대한 index.md를 생성하거나 업데이트합니다'
---

# index-docs

다음 위치에서 전체 작업 파일을 읽으십시오: {project-root}/_bmad/core/tasks/index-docs.xml

작업 파일의 모든 지침을 정확히 따르십시오.

### 상세 워크플로우 설명

**개요 (Overview)**
- **목표**: 지정된 디렉토리의 모든 문서에 대한 `index.md`를 생성하거나 업데이트합니다.
- **핵심 원칙**:
    - 파일 내용을 읽어 정확한 설명(3~10단어)을 작성합니다. (파일명만 보고 추측 금지)
    - 상대 경로(` ./`)를 사용하고 알파벳순으로 정렬합니다.
    - 숨김 파일은 제외합니다.

**실행 (Execution)**
- **워크플로우 시작**: `{project-root}/_bmad/core/tasks/index-docs.xml`의 지침을 순차적으로 수행합니다.

**상세 단계 (Step-by-Step Flow)**

1.  **디렉토리 스캔 (Scan Directory)**
    - 대상 위치의 모든 파일과 하위 디렉토리를 나열합니다.

2.  **콘텐츠 그룹화 (Group Content)**
    - 파일 유형(File), 목적(Purpose), 또는 하위 디렉토리(Subdirectory)별로 파일을 정리합니다.

3.  **설명 생성 (Generate Descriptions)**
    - 각 파일을 열어 실제 내용을 파악합니다.
    - 내용을 바탕으로 간결하지만 정보를 담은 설명(3~10단어)을 작성합니다.

4.  **인덱스 생성/업데이트 (Create/Update Index)**
    - 정리된 파일 목록과 설명을 바탕으로 `index.md`를 작성하거나 업데이트합니다.
    - **출력 형식 (Examples)**:
      ```markdown
      ## Files
      - **[filename.ext](./filename.ext)** - 파일에 대한 간략한 설명
      
      ## Subdirectories
      ### subfolder/
      - **[file1.ext](./subfolder/file1.ext)** - 하위 폴더 파일 설명
      ```


---

# File: bmad-party-mode.md
---
name: 'party-mode'
description: '설치된 모든 BMAD 에이전트 간의 그룹 토론을 조정하여 자연스러운 다중 에이전트 대화를 가능하게 합니다'
disable-model-invocation: true
---

다음 명령을 따르는 것이 중요합니다: @{project-root}/_bmad/core/workflows/party-mode/workflow.md 전체를 로드하고, 전체 내용을 읽고 지침을 정확히 따르십시오!

### 상세 워크플로우 설명

**개요 (Overview)**
- **목표**: 설치된 모든 BMAD 에이전트 간의 그룹 토론을 조율하여 자연스러운 다자간 대화를 진행합니다.
- **핵심 역할**: 파티 모드 진행자(Facilitator) 및 대화 오케스트레이터.

**초기화 (Initialization)**
- **설정 로드**: `{project-root}/_bmad/core/config.yaml`을 로드합니다.
- **매니페스트 처리**: `{project-root}/_bmad/_config/agent-manifest.csv`를 파싱하여 모든 에이전트의 페르소나(이름, 역할, 스타일 등)를 로드하고 통합 로스터를 구축합니다.

**실행 (Execution)**

1.  **파티 모드 활성화 (Activation)**
    - 환영 메시지를 출력하고 참여하는 에이전트 팀을 소개합니다. (다양한 2~3명 예시)
    - 사용자의 토론 주제 입력을 대기합니다.

2.  **대화 오케스트레이션 (`steps/step-02-discussion-orchestration.md`)**
    - **입력 분석 (Input Analysis)**: 사용자의 메시지에서 도메인 전문성, 복잡도 등을 분석합니다.
    - **지능형 에이전트 선택 (Agent Selection)**:
        - 주제에 가장 적합한 에이전트 2~3명을 선정합니다. (주요/보조/제3의 관점)
        - 특정 에이전트 호출 시 우선순위를 부여하고, 참여 균형을 고려합니다.
    - **응답 생성 (Response Generation)**:
        - 각 에이전트의 고유한 페르소나와 통신 스타일을 유지하며 응답을 생성합니다.
        - **상호 작용(Cross-Talk)**: 에이전트끼리 서로 이름을 부르거나, 의견에 덧붙이고, 질문하는 등 자연스러운 대화 흐름을 만듭니다.
    - **질문 처리 (Question Handling)**:
        - 사용자에게 직접 질문하는 경우, 해당 라운드를 즉시 종료하고 답변을 기다립니다.
    - **라운드 종료**: 모든 응답 후 `[E] Exit Party Mode` 메뉴를 표시합니다.

**종료 (Exit)**
- **트리거**: `*exit`, `goodbye`, `end party`, `quit` 등의 키워드나 메뉴 선택(`E`) 시 종료합니다.
- **절차**: `steps/step-03-graceful-exit.md`를 로드하여 에이전트들의 작별 인사와 함께 세션을 마무리합니다.


---

# File: bmad-review-adversarial-general.md
---
name: 'review-adversarial-general'
description: '콘텐츠를 냉소적으로 검토하고 결과를 도출합니다'
---

# review-adversarial-general

다음 위치에서 전체 작업 파일을 읽으십시오: {project-root}/_bmad/core/tasks/review-adversarial-general.xml

작업 파일의 모든 지침을 정확히 따르십시오.

### 상세 워크플로우 설명

**개요 (Overview)**
- **목표**: 냉소적인 관점에서 콘텐츠를 검토하여 문제점과 취약점을 발견합니다.
- **핵심 태도(Persona)**: "서투른 작업물을 참지 못하는 회의적인 검토자". 모든 것을 의심하고, 잘못된 것뿐만 아니라 누락된 것도 찾습니다. 단, 어조는 정밀하고 전문적이어야 합니다.

**초기화 및 입력 (Initialization & Inputs)**
- **입력 변수**:
    - `content` (필수): 검토할 콘텐츠 (diff, spec, 문서 등).
    - `also_consider` (선택): 일반적인 적대적 분석 외에 추가로 고려할 영역.

**실행 (Execution)**
- **워크플로우 시작**: `{project-root}/_bmad/core/tasks/review-adversarial-general.xml`의 지침을 순차적으로 수행합니다.

**상세 단계 (Step-by-Step Flow)**

1.  **콘텐츠 수신 (Receive Content)**
    - 콘텐츠 유형(diff, branch, 문서 등)을 식별합니다.
    - 내용이 비어있으면 중단합니다.

2.  **적대적 분석 (Adversarial Analysis)** - *Critical*
    - **지침**: 극도의 회의론을 가지고 검토합니다. 문제가 있다고 가정하고 접근합니다.
    - **목표**: 수정하거나 개선해야 할 이슈를 **최소 10개** 이상 찾습니다.

3.  **결과 제시 (Present Findings)**
    - 발견된 이슈를 설명 위주의 마크다운 목록으로 출력합니다.

**중단 조건 (Halt Conditions)**
- 발견된 이슈가 0개인 경우 (의심스러움: 재분석 또는 지도 요청).
- 콘텐츠가 비어있거나 읽을 수 없는 경우.


---

# File: bmad-shard-doc.md
---
name: 'shard-doc'
description: '대형 마크다운 문서를 레벨 2(기본값) 섹션을 기준으로 더 작고 조직화된 파일로 분할합니다'
---

# shard-doc

다음 위치에서 전체 작업 파일을 읽으십시오: {project-root}/_bmad/core/tasks/shard-doc.xml

작업 파일의 모든 지침을 정확히 따르십시오.

### 상세 워크플로우 설명

**개요 (Overview)**
- **목표**: 대형 마크다운 문서를 레벨 2 헤딩을 기준으로 더 작고 관리하기 쉬운 파일들로 분할(Shard)합니다.
- **핵심 도구**: `npx @kayvan/markdown-tree-parser`

**실행 (Execution)**
- **워크플로우 시작**: `{project-root}/_bmad/core/tasks/shard-doc.xml`의 지침을 순차적으로 수행합니다.

**상세 단계 (Step-by-Step Flow)**

1.  **소스 문서 확인 (Get Source Document)**
    - 사용자로부터 소스 문서 경로를 입력받고, 파일 존재 여부 및 마크다운 형식을 검증합니다.

2.  **대상 폴더 결정 (Get Destination Folder)**
    - 기본값: 소스 파일과 동일한 위치에, 소스 파일명(확장자 제외)과 같은 이름의 폴더.
    - 사용자에게 경로 확인 및 사용자 정의 경로 입력을 요청합니다.
    - 폴더 생성 가능 여부 및 권한을 확인합니다.

3.  **샤딩 실행 (Execute Sharding)**
    - 명령 실행: `npx @kayvan/markdown-tree-parser explode [source] [destination]`
    - 실행 결과를 캡처하고 오류를 확인합니다.

4.  **결과 검증 (Verify Output)**
    - 대상 폴더에 파일이 생성되었는지 확인합니다.
    - `index.md` 생성 여부 및 파일 개수를 확인합니다.

5.  **완료 보고 (Report Completion)**
    - 소스 경로, 대상 경로, 생성된 파일 수 등을 요약하여 출력합니다.

6.  **원본 문서 처리 (Handle Original Document)** - *Critical*
    - 원본과 분할본의 공존은 혼란을 야기하므로 원본 처리를 권장합니다.
    - **옵션**:
        - `[d] Delete`: 원본 삭제 (권장 - 분할본에서 재조립 가능)
        - `[m] Move to archive`: 백업/아카이브 폴더로 이동
        - `[k] Keep`: 원본 유지 (비권장 - 중복 및 동기화 문제 발생 경고 표시)

**중단 조건 (Halt Conditions)**
- `npx` 명령이 실패하거나 출력 파일이 없는 경우.


---

