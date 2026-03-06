# BMAD Study

BMAD(Build More Architect Dreams) 에코시스템을 학습하고, 이를 시각화하는 인터랙티브 웹 앱을 개발하는 프로젝트.

## 구조

```
bmad-study/
├── bmad-flowchart/     # 싱글페이지 시각화 웹앱 (순수 HTML/CSS/JS)
├── docs/
│   ├── plans/          # 진행 중인 기획/계획 문서
│   ├── specs/          # 상세 명세 문서
│   ├── study/          # BMAD 모듈별 분석 노트
│   └── archive/        # 완료된 계획 문서
├── _bmad/              # BMAD 프레임워크 (수정 금지)
└── .agent/             # BMAD 에이전트 워크플로우 (수정 금지)
```

## 웹앱 (bmad-flowchart)

5개 모듈(CORE, BMB, BMM, CIS, TEA), 20개 에이전트, 56개 워크플로우의 구조와 관계를 인터랙티브하게 탐색할 수 있는 싱글페이지 앱.

- 빌드 도구 없이 `index.html`을 브라우저에서 직접 열어 실행
- 상세 내용은 `bmad-flowchart/CLAUDE.md` 참조
