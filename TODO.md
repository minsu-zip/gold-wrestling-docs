# TODO — 다음에 이 레포를 열 때 챙길 것

마지막 갱신 2026-09-11. 완료하면 체크하고 날짜를 적는다.

## 서비스 배포 후

- [ ] **히어로 "상태" 행을 실제 링크로 교체** — `.vitepress/theme/Landing.vue` `.facts`의 "배포 준비 중 · goldwrestling.com 확보 · 실기기 검증 통과" → "운영 중 · [goldwrestling.com](https://goldwrestling.com)". FE(S3+CloudFront)와 BE(EC2, api.goldwrestling.com) 둘 다 올라간 뒤에.
- [ ] 배포 흐름도의 "계획" 표기 제거 — `Landing.vue` `.pipe .node.plan` 클래스와 `<span class="st wip">계획</span>`, `architecture.md`의 "계획" 배지.
- [ ] `status/index.md` 인프라 준비표·진행 예정표 갱신.
- [ ] k6 결과·실사용 수치가 나오면 "숫자로 보는 프로젝트"에 추가 (`Landing.vue` `.numbers`).

## FE Phase 10 (관리자 화면 수정) 완료 후

- [ ] **관리자 캡처 전부 재촬영·교체** — 현재 랜딩의 `public/shots/admin-*.png`는 Phase 10 수정 전 화면이다. 감사에서 "런칭 전 필수" 판정을 받은 화면이 소개 이미지로 걸려 있는 상태. 대상 파일과 규격은 `CAPTURE-LIST.md` 관리자 표 참조. 같은 파일명으로 덮어쓰면 `Landing.vue` 수정 없음.

## FE Phase 11 (검증) 완료 후

- [ ] **데모 GIF 2건 촬영** — 회원 예약 플로우 `public/demo-member.gif`, 관리자 플로우 `public/demo-admin.gif`. 규격·시나리오는 `CAPTURE-LIST.md`. 촬영 후 `Landing.vue` 히어로 아래에 배치(현재는 정지 캡처만으로 성립하므로 급하지 않음).
- [ ] 회원 캡처도 최종 화면으로 재촬영 (`login-mobile` 등 v1.1 Phase 9 이전 캡처 포함).
- [ ] `highlights/ui-audit.md`의 before/after를 Phase 11 재감사 캡처로 교체.

## 마일스톤마다

- [ ] `status/index.md` 갱신 (페이지 상단 "마지막 갱신" 날짜 포함).
- [ ] "숫자로 보는 프로젝트" 실측값 갱신 — 테스트 수(`pnpm test`, `./gradlew test`), 머지 PR 수(`gh pr list --state merged`), 결정 수(`grep -c '^## D-' docs/decisions.md`).
- [ ] 타임라인에 마일스톤 항목 추가.

## 완료

- [x] 2026-09-11 푸터에 GitHub 프로필(github.com/minsu-zip) 링크 추가.
- [x] 2026-09-11 계약 기반 협업 상세 페이지(`highlights/contract.md`) 복원, FE 파트 "openapi 계약" 항목에서 링크.
- [x] 2026-09-11 관리자 캡처 교체 대상을 `CAPTURE-LIST.md`에 표기.
