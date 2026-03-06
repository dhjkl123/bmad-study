# BMAD Flowchart - CLAUDE.md

## 프로젝트 개요

BMAD 에코시스템을 시각화하는 싱글페이지 웹앱.
5개 모듈(CORE, BMB, BMM, CIS, TEA), 20개 에이전트, 56개 워크플로우를 인터랙티브하게 탐색.

## 기술 스택

- 순수 HTML/CSS/JS (프레임워크 없음, 빌드 도구 없음)
- `file://`로 직접 실행 — `index.html`을 브라우저에서 열어 확인
- SVG 기반 플로우차트, 다크 테마

## 뷰 모드 (탭 전환)

| 탭 | 뷰 | 설명 |
|---|---|---|
| Overview | `canvas-wrap` | SVG 플로우차트 (모듈 → 에이전트 → 워크플로우 계층) |
| CORE/BMB/BMM/CIS/TEA | `module-view` | 개별 모듈 상세 (에이전트 카드, 워크플로우 리스트, 파일 트리) |
| DOC | `doc-view` | 좌측 사이드바 + 우측 콘텐츠 문서 뷰어 |
| (공통) | `file-viewer` | 우측 420px 슬라이드 패널 - 파일 상세 보기 |

## 하위 폴더별 상세

- `css/CLAUDE.md` — CSS 구조, 컬러 변수, 반응형 브레이크포인트
- `js/CLAUDE.md` — JS 네임스페이스 패턴, 로딩 순서, 코딩 규칙
- `data/CLAUDE.md` — 데이터 로딩 패턴, 전역 변수, 데이터 구조
