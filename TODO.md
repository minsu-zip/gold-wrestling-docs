# TODO — 다음에 이 레포를 열 때 챙길 것

마지막 갱신 2026-11-04. 완료하면 체크하고 날짜를 적는다.

## BE Phase 10 (k6 · cron) 완료 후

- [ ] **k6 결과 추가** — 초과 예약 0건과 p95를 "숫자로 보는 프로젝트"(`Landing.vue` `.numbers`)와 `highlights/concurrency.md` 검증 절에 넣는다. 지금은 "Phase 10에 남아 있음"으로 적혀 있다(랜딩 numbers-sub, BE 배포 note, `highlights/deploy.md` 남은 것, `architecture.md` 부하 실증 행, `status/index.md`).
- [ ] 미사용 차감 cron 활성화 반영 — `highlights/idempotent-batch.md` 검증 절 마지막 줄, `status/index.md` 이월.
- [ ] 타임라인 "예정" 항목 교체.

## 실기기 판정 후

- [ ] 보류 11건 판정 결과로 랜딩 numbers 59 카드, UI 검사 블록, `highlights/ui-audit.md`, `status/index.md` 문구 교체.

## 나중에

- [ ] **데모 GIF 2건 촬영** — 회원 예약 플로우 `public/demo-member.gif`, 관리자 플로우 `public/demo-admin.gif`. 규격·시나리오는 `CAPTURE-LIST.md`.
- [ ] 실사용 수치(회원 수·예약 수) — 공개해도 되는 범위를 정한 뒤 추가.
- [ ] 승인 대기·거절 화면(체육관 문의 버튼) 캡처 — 감사 하네스 B 캡처가 현재 실패하므로 FE 쪽 확인 필요.

## 마일스톤마다

- [ ] `status/index.md` 갱신 (페이지 상단 "마지막 갱신" 날짜 포함).
- [ ] "숫자로 보는 프로젝트" 실측값 갱신 — 기준은 두 레포 main.
  - FE 테스트: `pnpm exec vitest run --project=unit`, `--project=storybook`, `pnpm exec playwright test --list`
  - BE 테스트: `./gradlew test` 후 `build/test-results` 합계
  - 머지 PR 수: `gh pr list --state merged --limit 500 --json number --jq length`
  - 커밋 수: `git rev-list --count origin/main`
  - 결정 수: `grep -c '^## D-' docs/decisions.md`
- [ ] 타임라인에 마일스톤 항목 추가.

## 완료

- [x] 2026-11-04 출시 이후 반영 — 히어로 "운영 중"·실링크, 배포 흐름 "계획" 표기 제거, 수치·타임라인·현황·아키텍처 갱신, 하이라이트 2편(배포·운영, 보안 점검 후속) 추가, FE·BE 트러블슈팅 갱신, 회원 6장·관리자 6장 FE main(`e868920`) 기준 재촬영.
- [x] 2026-10-18 FE Phase 11 검증 마감(실기기 게이트는 D-198로 이월).
- [x] 2026-09-17 회원 캡처 6장과 `admin-activity-desktop`을 실제 앱 화면으로 교체, README를 한눈에 보는 구성으로 재작성.
- [x] 2026-09-17 관리자 캡처 5장을 FE Phase 10 이후 화면으로 재촬영·교체, before/after 두 쌍 재작업.
- [x] 2026-09-11 푸터 GitHub 프로필 링크, 계약 기반 협업 상세 페이지 복원.
