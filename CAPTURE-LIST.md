# 스크린샷 · GIF 촬영 목록

사이트 홈(`Landing.vue`)과 `highlights/ui-audit.md`에 쓰는 캡처·데모 GIF 목록. 마지막 갱신 2026-09-17.
회원 화면 PNG는 아직 FE `docs/pr-assets`의 PR 검토용 캡처를 줄인 임시본이다. 관리자 5장과 before/after 두 쌍은 2026-09-17에 FE dev(`b3fed8b`) 실제 앱(pnpm dev + MSW)으로 재촬영했다.

규격
- 모바일: 390×844 (iPhone 14 뷰포트), DPR 2로 찍고 360~390px 폭으로 리사이즈. 상태바 없이 앱 영역만.
- 데스크탑: 1280×800, 720px 폭으로 리사이즈.
- GIF: 모바일 390px 폭, 10~15초, 15fps, 2MB 이하. 시작·끝에 정지 프레임 1초.
- 데이터: MSW 목 데이터 사용(실명 없음). 시각은 `page.clock`으로 고정.
- 도구: `pnpm audit:capture`(정지 화면) 또는 Playwright `recordVideo` → ffmpeg로 GIF.
- 방문 순서는 FE 감사 하네스(`e2e/audit/harness.ts`)와 같다: `clock.install(기준시각−1분)` → 인증 시드 → 뷰포트 → `goto` → 스켈레톤 0 대기 → (오버레이 열기) → `clock.pauseAt(2026-03-11T01:00:00Z)`. 기준 시각은 수요일 오전 10:00 KST.
- 교체 후에는 캐시 버전을 올린다: `Landing.vue`의 `SHOTS_VERSION`, 마크다운에 직접 쓴 `<img>`는 `?v=YYYYMMDD`.

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

## 관리자 화면

랜딩(Landing.vue 서비스 화면 · 관리자)에 걸린 6장 중 5장을 Phase 10 기계 검증 통과(2026-09-17) 직후 같은 파일명으로 재촬영했다. 데스크탑 1280×800·모바일 390×844를 DPR 2로 찍어 720px·360px 폭으로 줄였다. 실기기 확인(Phase 11 VERI-03)에서 화면이 다시 바뀌면 한 번 더 찍는다.

| 파일 | 촬영 조건 | 상태 |
| --- | --- | --- |
| public/shots/admin-board-desktop.png | `/admin` 1280 | 완료(2026-09-17) |
| public/shots/admin-board-mobile.png | `/admin` 390, 월요일 선택 | 완료(2026-09-17) |
| public/shots/admin-roster-desktop.png | `/admin` 1280 → 목요일 19:00 셀(`수업 4/10`) 명단 패널. 저녁반·예약제·1:1이 한 패널에 있는 셀 | 완료(2026-09-17) |
| public/shots/admin-approve-desktop.png | `/admin/members?status=PENDING&onboardingCompleted=true` 1280. MSW 기본 핸들러가 `status` 필터를 무시하므로 서비스 워커를 막고 픽스처에서 PENDING만 거른 응답을 스텁(하네스 B 방식) | 완료(2026-09-17) |
| public/shots/admin-member-detail-desktop.png | `/admin/members/1` 1280 | 완료(2026-09-17) |
| public/shots/admin-activity-desktop.png | phase-05-exec-d 스토리 캡처(셸 없음). 랜딩에 걸려 있음 | 미교체 — 다음 촬영 때 `/admin/activity` 1280으로 |
| public/shots/admin-shell-mobile.png · admin-members-desktop.png · admin-reservations-desktop.png · admin-notice-desktop.png · admin-attendance.png | 미사용(예비) | 사용 시 재촬영 |

| # | 화면 | 시나리오 | 형식 | 저장 파일 | 상태 |
| --- | --- | --- | --- | --- | --- |
| A1 | 관리자 로그인 | ID/PW → 보드 착지 | PNG | public/shots/admin-login-mobile.png | Phase 10 후 |
| A2 | 승인 대기 목록 | 승인 / 거절(사유) | GIF | demo-admin-approve.gif | Phase 10 후 |
| A3 | 회원 목록·상세 | 검색 → 상세 → 이용권 등록 | PNG ×2 | public/shots/admin-member-*.png | 상세 완료(2026-09-17) · 목록 미촬영 |
| A4 | 이용권 가감 | 0.5 가감 + 사유 → 이력 반영 | PNG | public/shots/admin-adjust-mobile.png | Phase 10 후 |
| A5 | 주간 보드 데스크탑 | 그리드 + 명단 패널 | PNG 720 | public/shots/admin-board-desktop.png · admin-roster-desktop.png | 완료(2026-09-17) |
| A6 | 주간 보드 모바일 | 일 리스트 + 명단 Sheet | PNG | public/shots/admin-board-mobile.png | 일 리스트 완료(2026-09-17) · 명단 Sheet 미촬영 |
| A7 | 출석 체크 | 3상태 전환 + 저녁반 회원 추가(0.5 차감) | GIF | demo-admin-attendance.gif | Phase 10 후 |
| A8 | 휴강 | 휴강 처리 → 예약 취소·알림 | GIF | demo-admin-cancel-class.gif | Phase 10 후 |
| A9 | 알림센터·활동 피드 | 종 팝오버 → 피드 | PNG 720 | public/shots/admin-activity-desktop.png | Phase 10 후 |
| A10 | 공지 | 작성 → 목록 | PNG | public/shots/admin-notice-mobile.png | Phase 10 후 |

홈 데모 GIF(관리자): A2 → A5 → A7을 한 흐름으로 15초. 파일명 `public/demo-admin.gif`.

## before/after 쌍 (`highlights/ui-audit.md` · 랜딩 UI 검사)

판정 기준은 "설명 없이 두 장만 보고 차이를 알 수 있는가"다. before는 FE 레포에서 수정 전 커밋(`7171331`, Phase 9 코드 머지 직전 dev)을 임시 워크트리로 체크아웃해 같은 목 데이터·같은 고정 시각으로 찍는다.

| 파일 | 촬영 조건 | 판정 | 상태 |
| --- | --- | --- | --- |
| sheet-before.png · sheet-after.png | `/admin/notices` 360×844 → `공지 등록` → 본문 25줄 입력(시트가 85vh 상한을 넘김) → **스크롤 맨 위**. 끝까지 스크롤하면 두 버전의 버튼 위치가 같아 구별되지 않는다. 기본 데이터로는 어느 시트도 넘치지 않아 차이가 나지 않는다 | 통과 — before는 버튼이 안 보이고 after는 하단 고정 | 완료(2026-09-17) |
| weeknav-before.png · weeknav-after.png | `/reservations` 360, 주 이동 영역 크롭(DPR 3). 실측 32×32 → 36×36 | 원본만으로는 불통과(4px 차이) → 실측 테두리와 `기준 36px 미달/통과` 라벨을 캡처 위에 표시해 통과 | 완료(2026-09-17) |

## 촬영 후 할 일

1. 같은 파일명으로 `public/shots/`에 덮어쓰고 `Landing.vue`의 `SHOTS_VERSION`과 마크다운 `<img>`의 `?v=`를 올린다.
2. 데모 GIF 2건은 `Landing.vue` 히어로 아래에 배치한다.
3. `highlights/ui-audit.md`의 before/after는 Phase 11 재감사에서 화면이 바뀌면 다시 찍는다.
4. 이 파일의 상태 열과 `TODO.md`를 갱신한다.
