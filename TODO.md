# TODO — 다음에 이 레포를 열 때 챙길 것

마지막 갱신 2026-09-17. 완료하면 체크하고 날짜를 적는다.

## 서비스 배포 후

- [ ] **히어로 "상태" 행을 실제 링크로 교체** — `.vitepress/theme/Landing.vue` `.facts`의 "배포 준비 중 · goldwrestling.com 확보 · 실기기 검증 통과" → "운영 중 · [goldwrestling.com](https://goldwrestling.com)". FE(S3+CloudFront)와 BE(EC2, api.goldwrestling.com) 둘 다 올라간 뒤에.
- [ ] 배포 흐름도의 "계획" 표기 제거 — `Landing.vue` `.pipe .node.plan` 클래스와 `<span class="st wip">계획</span>`, `architecture.md`의 "계획" 배지.
- [ ] `status/index.md` 인프라 준비표·진행 예정표 갱신.
- [ ] **k6 결과·실사용 수치 (TBD)** — 초과 예약 0건과 p95, 실사용 회원·예약 수가 나오면 "숫자로 보는 프로젝트"에 추가 (`Landing.vue` `.numbers`).

## FE Phase 11 (검증) 완료 후

- [ ] **데모 GIF 2건 촬영** — 회원 예약 플로우 `public/demo-member.gif`, 관리자 플로우 `public/demo-admin.gif`. 규격·시나리오는 `CAPTURE-LIST.md`. 촬영 후 `Landing.vue` 히어로 아래에 배치(현재는 정지 캡처만으로 성립하므로 급하지 않음).
- [ ] **최종 재캡처 여부 판단** — Phase 11 실기기 확인(VERI-03, Phase 10에서 넘어온 7항목 포함)에서 화면이 바뀌면 2026-09-17에 찍은 회원 6장·관리자 6장과 before/after 두 쌍을 다시 찍는다. 바뀌지 않으면 그대로 둔다. README 대표 컷(`slot-sheet-mobile`, `admin-board-desktop`)도 같은 파일이라 함께 바뀐다.
- [ ] 랜딩 "UI 감사" 수치 문구와 `status/index.md`에서 "실기기 확인 7항목만 남았습니다"를 결과로 교체.

## 마일스톤마다

- [ ] `status/index.md` 갱신 (페이지 상단 "마지막 갱신" 날짜 포함).
- [ ] "숫자로 보는 프로젝트" 실측값 갱신 — 테스트 수(FE `pnpm test` + `pnpm exec playwright test --list`, BE `./gradlew test` 후 `build/test-results` 합계), 머지 PR 수(`gh pr list --state merged`), 커밋 수(`git rev-list --count dev`), 결정 수(`grep -c '^## D-' docs/decisions.md`). BE PR #40(D-195)이 머지되면 결정 수는 195.
- [ ] 타임라인에 마일스톤 항목 추가.

## 완료

- [x] 2026-09-17 회원 캡처 6장과 `admin-activity-desktop`을 실제 앱 화면으로 교체(`home-mobile` 플레이스홀더 해소), README를 한눈에 보는 구성으로 재작성.
- [x] 2026-09-17 관리자 캡처 5장을 FE Phase 10 이후 화면으로 재촬영·교체, before/after 두 쌍 재작업, 수치·현황·타임라인 갱신.
- [x] 2026-09-11 푸터 GitHub 프로필 링크, 계약 기반 협업 상세 페이지 복원.
