---
title: 품질
---

# 품질

"위반 0건"은 항상 검사 범위와 한계를 같이 적는다. 범위 없는 0건은 의미가 없다.

## 테스트 3층

| 층 | FE | BE |
| --- | --- | --- |
| 단위 | Vitest 982건. 도메인 판정은 순수 함수(`features/*/rules.ts`)로 분리해 경계값을 고정 | JUnit 883건(v1.0 마감 기준). 원장 불변식, 배치 부족분 계산, 기준일 max |
| 컴포넌트·통합 | Storybook 498 스토리를 실제 Chromium에서 렌더(addon-vitest). Empty·Loading·Error와 도메인 상태 전부 | Testcontainers PostgreSQL 통합 테스트. 동시성은 `ExecutorService` + `CountDownLatch` |
| E2E | Playwright 108 시나리오, desktop-chromium + mobile-safari 양 프로젝트 | (없음, 실기동 human-verify로 대체) |

FE 세 층이 MSW 핸들러 하나를 공유한다. Storybook, Vitest, dev 서버가 같은 목을 보므로 서버 없이 전 상태를 확인할 수 있다.

## 계약 감사

- 앱 코드, MSW 핸들러, E2E 스텁 세 표면에서 `openapi.yaml` 밖 호출을 센다. 2026-09-01 기준 0건.
- MSW `onUnhandledRequest: 'error'`로 계약 밖 요청이 테스트에서 즉시 실패한다 (D-143).
- 없는 API는 구현하지 않고 `.planning/BE-CHANGE-REQUESTS.md`에 적는다. 6건 중 3건 해소, 3건 v1.1 백로그.

## CI

| 레포 | 워크플로 | 내용 |
| --- | --- | --- |
| FE | `CI / quality` | lint, typecheck, unit, storybook 렌더 |
| FE | `CI / e2e` | Playwright 양 프로젝트 |
| BE | `CI / build` | ktlintCheck + build (Testcontainers 통합 테스트 포함) |
| 둘 다 | `claude-pr-review` | PR마다 규칙 위반 리뷰 코멘트 |

체크 이름을 매트릭스로 쪼개지 않는다. required status check가 이름으로 등록되기 때문이다 (FE D-08).

## 접근성

- axe 위반 0건 + 수동 포커스 이동 미결 0건 (FE M6 06-A11Y-REPORT).
- 주 액션 색 골드 `#edb417` 위 다크 텍스트 10.5:1. oklch→sRGB 변환을 포함한 대비 테스트로 고정 (D-186, `src/lib/contrast.test.ts`).

## UI 감사

전 화면을 360/768/1280 세 뷰포트로 캡처해 터치 타깃, CTA 위치, 타이포, 인접 간격을 측정한다. 리포트는 사용자 승인을 거쳐야 수정 작업이 시작된다. 자세한 내용은 [UI 감사 파이프라인](/highlights/ui-audit).

## 아직 없는 것

- k6 부하테스트. 초과 예약 0건은 JVM 동시성 테스트로만 증명됐다. HTTP 레벨 실증은 BE Phase 10.
- 실 BE를 붙인 스모크 E2E. 현재 E2E는 MSW 위에서 돈다.
- 실기기 확인. 에뮬레이션이 못 잡는 safe-area 이중 계상, iOS 키보드 위 CTA는 FE Phase 11에서 사람이 확인한다.
