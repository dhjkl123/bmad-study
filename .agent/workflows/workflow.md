---
name: document-workflow
description: Analyzes BMAD workflow definitions and documents them in all_workflows.md with detailed steps in Korean
---

# Document Workflow

**Goal:** Standardize and automate the process of analyzing BMAD workflow definitions (XML/MD) and adding detailed documentation (in Korean) to `all_workflows.md`.

**Your Role:** You are a Documentation Agent (Technical Writer). Your job is to read technical definitions, understand the logic and rules, and translate them into clear, structured documentation for users.

---

## WORKFLOW ARCHITECTURE

This workflow follows a **sequential analysis and documentation** process:

1.  **Analyze Input**: Identify the target workflow to document.
2.  **Analyze Definition**: Read the source Definition File (XML or MD) and any referenced files (Steps, CSVs).
3.  **Draft Content**: Synthesize the information into a structured Korean description.
4.  **Update Document**: Insert or update the description in `all_workflows.md`.

---

## EXECUTION

### Step 1: Input Analysis

-   **Input**: Workflow name (e.g., `bmad-shard-doc`, `party-mode`).
-   **Action**: Locate the definition file.
    -   Check `_bmad/core/tasks/{workflow-name}.xml`
    -   Check `_bmad/core/workflows/{workflow-name}/workflow.md`
    -   Check `_bmad/core/tasks/{workflow-name}.md`

### Step 2: Definition Analysis

-   **Read Definition File**: Use `view_file` to read the identified definition file.
-   **Analyze Structure**:
    -   **XML**: Extract `<objective>`, `<inputs>`, `<llm>` (Rules, Principles), `<flow>` (Steps), `<halt-conditions>`.
    -   **MD**: Extract **Goal**, **Architecture**, **Execution Steps**, **Exit Conditions**.
-   **Trace References**:
    -   If the definition refers to other files (e.g., `step-02.md`, `config.yaml`, `catalog.csv`), read them using `view_file`.
    -   **Goal**: Understand the *complete* picture, including specific logic hidden in referenced files.

### Step 3: Draft Content (Korean)

Create a detailed description in Korean using the following template:

```markdown
### 상세 워크플로우 설명

**개요 (Overview)**
- **목표**: {Target} (Objective in Korean)
- **핵심 역할/원칙**: {Role/Principles} (Persona, Key Rules)

**초기화 및 입력 (Initialization & Inputs)**
- **입력 변수**:
    - `{variable_name}`: {Description}
- **설정/매니페스트**: (If applicable)

**실행 (Execution)**
- **워크플로우 시작**: `{path/to/definition/file}`의 지침을 순차적으로 수행합니다.

**상세 단계 (Step-by-Step Flow)**

1.  **{Step Name}**
    - {Detailed Action 1}
    - {Detailed Action 2} (Include specific logical checks or branches)

2.  **{Step Name}**
    - ...

{N}. **{Step Name}**

**종료/중단 조건 (Halt/Exit Conditions)**
- {Condition 1}
- {Condition 2}
```

**Guidelines:**
-   **Language**: **Korean (한국어)**.
-   **Tone**: Professional, precise, and helpful.
-   **Detail Level**: sufficient for a user to understand *what* happens without reading the code/XML directly.
-   **Formatting**: Use Markdown lists, bold text for key terms, and code blocks for paths/commands.

### Step 4: Update Documentation

-   **Target File**: `all_workflows.md`.
-   **Action**:
    -   Find the section for the target workflow (e.g., `# {workflow-name}`).
    -   Append the drafted **Detailed Workflow Description** to the end of that section.
    -   If a description already exists, **update** it with the new detailed version.
-   **Verification**: Ensure the update is formatted correctly and doesn't break existing structure.

---

## EXIT

-   **Success**: The `all_workflows.md` file is updated with accurate, detailed steps for the target workflow.
-   **Output**: Inform the user that the documentation has been updated and summarize the key sections added.
