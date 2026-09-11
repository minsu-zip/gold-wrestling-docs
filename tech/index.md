---
title: 기술 문서 개요
---

# 기술 문서

두 레포의 `docs/`가 정본이다. 이 섹션은 그 문서를 이관하거나 요약한 것이고, 마일스톤마다 다시 동기화한다.

| 페이지 | 무엇이 있나 | 원본 |
| --- | --- | --- |
| [아키텍처](/tech/architecture) | 현재 구조 다이어그램, 배포 목표 구성(계획) | 이 사이트에서 작성 |
| [도메인 정책](/tech/policies) | 이용권 3종, 시간표, 예약·차감·상태·출석·휴강 규칙. 코드가 이 문서와 다르면 코드가 틀린 것 | `gold-wrestling-be/docs/policies.md` |
| [용어집](/tech/glossary) | 엔티티·상태·사유 코드 용어 | `gold-wrestling-be/docs/glossary.md` |
| [에러 코드](/tech/error-codes) | FE가 분기하는 `code` 값의 유일한 계약 | `gold-wrestling-be/docs/error-codes.md` |
| [의사결정 기록](/tech/decisions) | D-001~D-186 전체. 결정·이유·기각 대안 | `gold-wrestling-be/docs/decisions.md` |
| [핵심 결정 20선](/tech/key-decisions) | 186건 중 골라 읽을 20건. 선별 중 | 이 사이트에서 작성 |
| [품질](/tech/quality) | 테스트 3층, CI, 계약 감사, 접근성, 감사 파이프라인 | 두 레포 CI·.planning |

## 하이라이트

기술 하이라이트는 전부 같은 틀로 쓴다. 어떤 문제가 있었고, 왜 그 결정을 했고, 어떻게 검증했는지. 근거는 결정 번호와 테스트, 수치로 잇는다.

- [동시성 제어](/highlights/concurrency) · D-021, D-098
- [상태 기반 멱등 배치](/highlights/idempotent-batch) · D-105, D-106, D-117, D-119
- [계약 기반 FE·BE 협업](/highlights/contract) · D-029, BE-REQ 프로세스, D-148~D-150
- [UI 감사 파이프라인](/highlights/ui-audit) · D-154~D-158, D-167, D-184
