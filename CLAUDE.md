# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

BMAD(Build More Architect Dreams) 에코시스템을 학습하고, 이를 시각화하는 인터랙티브 싱글페이지 웹앱을 개발하는 프로젝트.

## 실행 방법

빌드 도구 없음. `bmad-flowchart/index.html`을 브라우저에서 직접 열어 실행.

## 저장소 구조

- `bmad-flowchart/` — 웹앱 코드 (순수 HTML/CSS/JS, 프레임워크 없음)
- `docs/plans/` — 진행 중인 기획/계획 문서
- `docs/specs/` — 상세 명세 문서
- `docs/study/` — BMAD 모듈별 분석 노트
- `docs/archive/` — 완료된 계획 문서
- `_bmad/`, `.agent/` — BMAD 프레임워크 파일 (**수정 금지**)

## 웹앱 (bmad-flowchart/)

순수 HTML/CSS/JS 싱글페이지 앱. 아키텍처, 코딩 규칙 등 상세는 `bmad-flowchart/CLAUDE.md` 참조.

## 주의사항

- `_bmad/`, `.agent/` 디렉토리는 BMAD 프레임워크 소유 — 수정 금지
- 커밋 메시지 한글 사용
