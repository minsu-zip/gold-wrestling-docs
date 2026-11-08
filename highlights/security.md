---
title: 보안 점검 후속
---

# 보안 점검 후속

첫 운영 배포 뒤 실제 회원 데이터가 쌓이기 시작하면서, 공격자 관점으로 FE·BE·인프라를 한 번에 점검했습니다. 결과는 Critical 0 · High 2 · Medium 12였고, 그날 안에 결정 기록과 함께 고쳐 배포했습니다.

## 문제

- refresh 토큰이 응답 본문으로 내려가 브라우저 저장소에 있었습니다. XSS 한 번이면 14일짜리 세션이 통째로 나갑니다.
- 관리자 로그인에 시도 횟수 제한이 없었습니다.
- 관리자 계정을 만들거나 끄는 화면이 없어, 계정 관리를 DB 직접 수정에 기대고 있었습니다.
- 컨테이너가 EC2 메타데이터(IMDS)에 닿을 수 있었고, CI 액션은 태그로만 고정돼 있었습니다.

## 결정

| 영역 | 결정 |
| --- | --- |
| 세션 | refresh 토큰은 HttpOnly 쿠키 `gw_refresh`(Secure · SameSite=Lax · `Path=/api/auth`)로만. access 토큰은 FE 메모리에만. `/refresh`·`/logout`은 본문 없이 쿠키로 (D-229, D-234) |
| 로그인 제한 | 15분 창에서 관리자 ID 5회 · IP 20회 · 카카오 IP 30회 초과 시 429 `LOGIN_RATE_LIMITED` + `Retry-After`. 판정을 bcrypt 비교보다 먼저 해 비용이 큰 연산을 공격자에게 내주지 않음 (D-230) |
| 관리자 계정 | 생성 · 활성/비활성 · 비밀번호 변경 API와 화면. 비활성화·비밀번호 변경 시 그 관리자의 refresh 토큰 전부 폐기 (D-231) |
| 입력·로그 | 잔여 횟수 상한 999.9, 카카오 프로필 URL은 https만 저장, 로그 개행 제거 (D-232) |
| 인프라 | 컨테이너 `read_only` · `cap_drop ALL` · `no-new-privileges`, 컨테이너 → IMDS 차단, ufw · fail2ban · sshd 비밀번호 로그인 금지 (D-233, D-237) |
| CI | 모든 액션 커밋 SHA 고정, 리뷰 봇은 `persist-credentials: false`와 읽기 도구만 (D-233) |
| 헤더 | FE는 CloudFront에서 CSP enforce, BE는 Caddy에서 HSTS·보안 헤더 (D-235) |

기각한 것: 로그인 성공 이벤트의 탭 간 전파(동시 갱신 창만 넓어짐), 관리자 확인 API 없이 토큰 클레임을 보안 경계로 쓰는 것(클레임은 라우팅 힌트일 뿐이고 권한은 BE `hasRole`이 강제).

## FE에서 생긴 문제

토큰을 메모리로 옮기자 새 문제가 생겼습니다.

- **새로고침하면 로그아웃.** 앱 시작 시 `AuthBootstrap`이 쿠키로 세션을 복원한 뒤에 라우터를 띄워, 가드가 복원 전 상태를 보지 않게 했습니다.
- **탭 두 개의 동시 갱신.** BE는 회전된 refresh 토큰의 재사용을 탈취로 보고 그 사용자의 세션을 전부 폐기합니다. 탭 안에서는 진행 중인 갱신 Promise 하나를 공유하고, 탭 사이에는 `navigator.locks.request('gw-auth-refresh')`로 직렬화해 기다린 쪽이 방금 회전된 쿠키를 그대로 쓰게 했습니다.
- **쿠키가 안 실림.** app과 api는 같은 사이트지만 다른 오리진이라 fetch 기본값(`same-origin`)으로는 쿠키가 가지 않습니다. 모든 요청에 `credentials: 'include'`를 넣었습니다.

## 검증

- 로그인 제한은 실패 기록이 예외와 함께 롤백되지 않도록 `noRollbackFor`를 걸고, 프록시 뒤 실제 IP로 판정하는지 통합 테스트로 확인했습니다.
- 배포 후 운영 응답 헤더를 `curl`로 확인했습니다. CSP enforce, HSTS 1줄, `X-Frame-Options: DENY`, `nosniff`, `Permissions-Policy`.
- CSP를 enforce로 바꾼 다음 날 모바일에서만 카카오 로그인이 스피너에서 멈췄습니다. 카카오톡 간편 로그인은 페이지를 옮기지 않고 카카오 인가 서버를 XHR로 폴링하는데, 이 요청이 `connect-src` 위반으로 매번 막혔습니다. PC는 최상위 이동 경로라 영향이 없었고 데스크톱 E2E로도 잡히지 않았습니다. 와일드카드 대신 실제로 쓰는 호스트 하나(`kauth.kakao.com`)만 허용해 복구하고, CSP나 SDK를 바꿀 때 모바일 실기기 로그인을 확인 항목에 넣었습니다 (D-250).
- 수정이 만든 회귀 두 건도 같은 날 잡았습니다. 프록시 헤더 신뢰로 HSTS가 두 줄이 된 것(D-235), 리뷰 봇 설정의 YAML 주석 때문에 인자가 통째로 버려져 모든 PR에서 코멘트 0건이 된 것(D-236).

근거: [decisions.md](https://github.com/minsu-zip/gold-wrestling-be/blob/main/docs/decisions.md) D-229~D-237 · D-250, BE PR #65 · #66 · #68 · #69, FE PR #81
