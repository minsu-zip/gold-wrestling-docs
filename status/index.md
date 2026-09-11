---
title: 프로젝트 현황
---

# 프로젝트 현황

마일스톤이 끝날 때마다 갱신합니다. 마지막 갱신 2026-09-11.

| 영역 | 완료 | 진행 예정 |
| --- | --- | --- |
| BE | v1.0 Phase 1~6 (2026-09-01) | v1.1 배포·운영 Phase 7~10 |
| FE | v1.0 M1~M6 (2026-08-31) · v1.1 Phase 7~9 | v1.1 Phase 10~11 |
| 인프라 | 계정·도메인·인증서·빈 서버 | 서버 구성, 배포 파이프라인, 백업, 부하 실증 |

## 완료 <span class="st done">v1.0 + FE v1.1 일부</span>

**BE v1.0 · Phase 1~6.** 인증·회원(카카오 OAuth, JWT 회전), 이용권 원장(3종, 0.5 가감, 기간 수정, 등록 취소), 시간표·예약(즉시 차감·복구, 동시성 보장, 휴강), 2주 미사용 차감 배치, 출석·공지·알림·활동 피드. 요구사항 44/44, 테스트 883건.

**FE v1.0 · M1~M6.** 회원 플로우(로그인 → 온보딩 → 이용권 → 예약·취소·변경)와 관리자 플로우(승인 → 회원·이용권 → 주간 보드 → 대리 처리·출석·휴강 → 공지·알림) 전부 동작. 전 화면 반응형, E2E 108 양 프로젝트 통과, axe 0건. 요구사항 41/41.

**FE v1.1 · Phase 7~9.** 감사 인프라(전 화면 × 3 뷰포트 캡처·측정, 필수 59건), 규칙 명문화, 회원 화면 수정(CTA 하단 고정, 터치 타깃, Sheet 푸터, 브랜드 골드 주 액션 색).

## 진행 예정

| 항목 | 내용 | 상태 |
| --- | --- | --- |
| FE Phase 10 | 관리자 화면 수정. 명단 패널 Sheet 배치, 출석 컨트롤 터치 타깃, 데스크탑 표 밀도 유지 | <span class="st todo">예정</span> |
| FE Phase 11 | 검증. 전 화면 재캡처 대조, 필수 59건 항목별 확인, 실기기 체크리스트 | <span class="st todo">예정</span> |
| BE Phase 7 | 컨테이너화·서버 구성. Dockerfile, compose(app+postgres+Caddy), 메모리 예산, GHCR 게시 | <span class="st wip">6개 중 5개 완료</span> |
| BE Phase 8 | 배포 파이프라인. main push → CI → GHCR → SSH 배포 → health 게이트 | <span class="st todo">예정</span> |
| BE Phase 9 | 운영 안전장치. S3 백업, 복구 리허설, 로그 로테이션 | <span class="st todo">예정</span> |
| BE Phase 10 | k6로 초과 예약 0건 실증, 미사용 차감 cron 활성화 | <span class="st todo">예정</span> |

## 인프라 준비

| 항목 | 상태 |
| --- | --- |
| AWS 계정 · IAM · 도메인 goldwrestling.com · ACM 인증서 · EC2(빈 서버) · 카카오 운영 Redirect URI | <span class="st done">완료</span> |
| 서버 구성 · 배포 파이프라인 · DB 백업 · k6 | <span class="st todo">미착수</span> |

## 이월

- FE: 실 BE 스모크 E2E, E2E 시드 헬퍼 중복 제거는 배포 마일스톤에서.
- BE: 오류 응답 스키마, `/api/admin/me`, 예약 단건 조회 계약 요청 3건은 v1.1 백로그. FE는 임시 대응을 유지합니다.
- 미사용 차감 cron은 기본 꺼짐. 배포 후 3단계 절차로 켭니다.
