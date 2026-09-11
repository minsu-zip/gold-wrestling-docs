# 스크린샷 · GIF 촬영 목록

사이트 홈의 데모 GIF 자리와 가이드 페이지 캡처를 채우기 위한 목록.
지금 들어가 있는 PNG는 FE `docs/pr-assets`의 PR 검토용 캡처를 360px(모바일)·720px(데스크탑)로 줄인 것이고, 아래 촬영이 끝나면 교체한다.

규격
- 모바일: 390×844 (iPhone 14 뷰포트), DPR 2로 찍고 360~390px 폭으로 리사이즈. 상태바 없이 앱 영역만.
- 데스크탑: 1280×800, 720px 폭으로 리사이즈.
- GIF: 모바일 390px 폭, 10~15초, 15fps, 2MB 이하. 시작·끝에 정지 프레임 1초.
- 데이터: MSW 목 데이터 사용(실명 없음). 시각은 `page.clock`으로 고정.
- 도구: `pnpm audit:capture`(정지 화면) 또는 Playwright `recordVideo` → ffmpeg로 GIF.

## 회원 화면 — 지금 촬영 가능

| # | 화면 | 시나리오 | 형식 | 저장 파일 | 상태 |
| --- | --- | --- | --- | --- | --- |
| M1 | 로그인 | 랜딩 → 카카오 버튼 노출 | PNG | public/shots/login-mobile.png | 임시본 있음 |
| M2 | 온보딩 | 이름·전화번호 입력 → 검증 오류 → 제출 | PNG ×2 | public/shots/onboarding-mobile.png | 미촬영 |
| M3 | 승인 대기 | PENDING 상태 안내 | PNG | public/shots/pending-mobile.png | 미촬영 |
| M4 | 홈 | 잔여 횟수 + 이번 주 예약 | PNG | public/shots/home-mobile.png | 임시본 있음 |
| M5 | 시간표 | 주 이동 → 슬롯 상태(예약 가능/마감/휴강/당일) | PNG | public/shots/schedule-mobile.png | 임시본 있음 |
| M6 | 예약 시트 | 슬롯 탭 → 시트 → 예약 확정 → 잔여 차감 반영 | PNG + GIF | public/shots/slot-sheet-mobile.png, demo-member-reserve.gif | 임시본 있음 / GIF 미촬영 |
| M7 | 내 예약 | 목록 → 취소 → 복구 확인 | GIF | demo-member-cancel.gif | 미촬영 |
| M8 | 이용권 | 보유 이용권 + 차감 이력(0.5 단위) | PNG | public/shots/passes-mobile.png | 임시본 있음 |
| M9 | 공지 | 목록 → 상세 | PNG | public/shots/notice-mobile.png | 미촬영 |
| M10 | 데스크탑 시간표 | 주간 그리드 | PNG 720 | public/shots/schedule-desktop.png | 미촬영 |

홈 데모 GIF(회원): M1 → M4 → M5 → M6 → M7을 한 흐름으로 15초. 파일명 `public/demo-member.gif`.
촬영 시점: **FE Phase 11(검증) 종료 후** 최종 화면으로. 히어로는 정지 캡처만으로 성립하므로 급하지 않다.

## 관리자 화면 — FE Phase 10 이후 촬영

Phase 10에서 명단 패널·출석 컨트롤·회원 관리 레이아웃이 바뀌므로 그 뒤에 찍는다.

**교체 필수.** 아래 파일은 현재 랜딩(Landing.vue 서비스 화면 · 관리자)에 걸려 있지만 전부 Phase 10 수정 전 화면이다.
Phase 7 감사에서 "런칭 전 필수" 판정을 받은 화면이 그대로 노출된 상태이므로 Phase 10 검증 통과 직후 같은 파일명으로 재촬영해 덮어쓴다.

| 파일 | 현재 출처 | 교체 시점 |
| --- | --- | --- |
| public/shots/admin-board-desktop.png | phase-05-exec-b 캡처 (2026-08) | Phase 10 후 |
| public/shots/admin-board-mobile.png | phase-05-exec-b 캡처 | Phase 10 후 |
| public/shots/admin-roster-desktop.png | phase-05-exec-c 캡처 | Phase 10 후 |
| public/shots/admin-approve-desktop.png | phase-03-m3 캡처 | Phase 10 후 |
| public/shots/admin-member-detail-desktop.png | phase-03-m3 캡처 | Phase 10 후 |
| public/shots/admin-activity-desktop.png | phase-05-exec-d 캡처 | Phase 10 후 |
| public/shots/admin-shell-mobile.png · admin-members-desktop.png · admin-reservations-desktop.png · admin-notice-desktop.png · admin-attendance.png | 미사용(예비) | 사용 시 재촬영 |

| # | 화면 | 시나리오 | 형식 | 저장 파일 | 상태 |
| --- | --- | --- | --- | --- | --- |
| A1 | 관리자 로그인 | ID/PW → 보드 착지 | PNG | public/shots/admin-login-mobile.png | Phase 10 후 |
| A2 | 승인 대기 목록 | 승인 / 거절(사유) | GIF | demo-admin-approve.gif | Phase 10 후 |
| A3 | 회원 목록·상세 | 검색 → 상세 → 이용권 등록 | PNG ×2 | public/shots/admin-member-*.png | Phase 10 후 |
| A4 | 이용권 가감 | 0.5 가감 + 사유 → 이력 반영 | PNG | public/shots/admin-adjust-mobile.png | Phase 10 후 |
| A5 | 주간 보드 데스크탑 | 그리드 + 명단 패널 | PNG 720 | public/shots/admin-board-desktop.png | 임시본 있음, 재촬영 |
| A6 | 주간 보드 모바일 | 일 리스트 + 명단 Sheet | PNG | public/shots/admin-board-mobile.png | 임시본 있음, 재촬영 |
| A7 | 출석 체크 | 3상태 전환 + 저녁반 회원 추가(0.5 차감) | GIF | demo-admin-attendance.gif | Phase 10 후 |
| A8 | 휴강 | 휴강 처리 → 예약 취소·알림 | GIF | demo-admin-cancel-class.gif | Phase 10 후 |
| A9 | 알림센터·활동 피드 | 종 팝오버 → 피드 | PNG 720 | public/shots/admin-activity-desktop.png | Phase 10 후 |
| A10 | 공지 | 작성 → 목록 | PNG | public/shots/admin-notice-mobile.png | Phase 10 후 |

홈 데모 GIF(관리자): A2 → A5 → A7을 한 흐름으로 15초. 파일명 `public/demo-admin.gif`.

## 촬영 후 할 일

1. `index.md`의 `.gw-demo` 블록을 두 GIF로 교체.
2. `guide/member.md`, `guide/admin.md`의 `.shots` 블록 파일명 확인.
3. `highlights/ui-audit.md`의 before/after는 Phase 11 재감사 캡처로 교체.
4. 이 파일의 상태 열 갱신.
