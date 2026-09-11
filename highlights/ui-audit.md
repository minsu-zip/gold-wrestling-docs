---
title: UI 감사 파이프라인
---

# Playwright 실측 UI 감사 파이프라인

기능이 다 동작한 뒤 모바일 UX를 국내 서비스 관례 수준으로 끌어올리는 작업을 시작했습니다. "보기에 좋다/나쁘다"로는 AI 에이전트에게 작업을 시킬 수 없어, 측정 가능한 기준을 먼저 만들었습니다.

## 문제

- 터치 타깃 44px, 하단 고정 CTA, 본문 14px 같은 기준은 알지만 어느 화면의 어느 요소가 어긋나는지는 아무도 세지 않았습니다.
- 감각으로 고치면 회귀를 못 잡습니다. "전 화면 여백 회귀 0건"을 말하려면 기준선이 있어야 합니다.
- 캡처가 비결정적이면(시각, 랜덤 데이터) 대조가 무의미합니다.

## 결정

전 화면을 3개 뷰포트로 캡처하고 DOM을 측정해 리포트를 만들고, 승인을 거친 뒤에만 화면 수정을 시작합니다.

| 구성 | 내용 |
| --- | --- |
| 캡처 | 전 화면 × 360/768/1280을 MSW 워커 위에서 순회 (D-155) |
| 결정론 | 시각은 `page.clock`으로 고정, 목 데이터 수정 0건 (D-156) |
| 측정 | 요소를 계층 5개로 분류해 계층별 최소 크기·간격 판정 (D-157, D-160) |
| 심각도 | 런칭 전 필수 59건(근본 원인 43건) · 권장 68건 · 백로그 |
| 게이트 | 실기기 확인 → 리포트 반영 → PR 머지. 승인본을 바꾸는 유일한 통로는 결정 기록 (D-158, D-167) |
| 기준선 | PNG는 커밋하지 않고 측정값 JSON이 대조 기준 (D-154) |

승인된 리포트는 디자인 시스템 규칙으로 옮겼습니다. 하단 고정 CTA 패턴, 터치 타깃 계층, safe-area 소유자(화면당 1곳) 같은 것들이고, 이후 AI 세션은 이 규칙을 읽고 화면을 고칩니다.

## 결과

<div class="shots wide">
  <figure><img src="/shots/weeknav-before.png" alt="주 이동 수정 전"><figcaption><b>주 이동 · 수정 전</b> 화살표 32px. 공용 컴포넌트라 관리자 보드에도 같은 위반</figcaption></figure>
  <figure><img src="/shots/weeknav-after.png" alt="주 이동 수정 후"><figcaption><b>수정 후</b> 44px. 재감사에서 관리자 보드 항목이 함께 닫힘</figcaption></figure>
</div>
<div class="shots">
  <figure><img src="/shots/sheet-before.png" alt="시트 수정 전"><figcaption><b>Sheet 푸터 · 수정 전</b> 버튼이 콘텐츠와 함께 스크롤</figcaption></figure>
  <figure><img src="/shots/sheet-after.png" alt="시트 수정 후"><figcaption><b>수정 후</b> sticky + safe-area. 한 곳 수정으로 5화면 해소 (D-182)</figcaption></figure>
  <figure><img src="/shots/login-mobile.png" alt="로그인"><figcaption><b>로그인</b> 카카오 CTA 하단 고정 (D-180)</figcaption></figure>
</div>

## 검증

- 재감사는 전수 재실행 후 승인본과 요소 단위로 대조합니다. 바뀌어야 할 것을 재실행 전에 표로 선언하고, 상이 항목을 전부 매핑하거나 회귀 후보로 분류합니다 (D-184).
- Phase 9 결과: 선언 매핑 21건, 파급 2건, 회귀 후보 1건. 필수 0건 화면 4개는 불변.
- 에뮬레이션이 못 잡는 항목(safe-area 이중 계상, iOS 키보드 위 CTA)은 실기기 체크리스트로 사람이 판정합니다.

근거: [decisions.md](https://github.com/minsu-zip/gold-wrestling-be/blob/dev/docs/decisions.md) D-154~D-158 · D-167 · D-184, FE `.planning/phases/07-audit-infra/07-REPORT.md`
