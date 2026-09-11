---
layout: home
title: 골드레슬링
titleTemplate: 체육관 회원·예약 서비스

hero:
  name: 골드레슬링
  text: 체육관 회원·예약 서비스
  tagline: 요구사항을 정하고, 도메인 정책과 아키텍처를 결정하고, 검증 게이트를 운영했다. 코드는 AI 에이전트가 썼다. 이 사이트는 그 결정과 검증의 기록이다.
  actions:
    - theme: brand
      text: 프로젝트 현황
      link: /status/
    - theme: alt
      text: AI 협업 워크플로
      link: /ai-workflow/
    - theme: alt
      text: 기술 문서
      link: /tech/

features:
  - title: 동시성 제어
    details: 정원 마지막 자리와 1:1 슬롯의 동시 예약에서 초과 예약 0건. 애플리케이션 조건문 대신 DB 제약과 조건부 갱신으로 막고, JVM 동시성 테스트로 증명했다.
    link: /highlights/concurrency
    linkText: 문제 → 결정 → 검증
  - title: 상태 기반 멱등 배치
    details: 2주 미사용 차감 배치는 "있어야 할 차감 수 − 실제 이력 수"만 채운다. 중복 실행과 며칠 밀린 실행이 같은 메커니즘으로 안전하다.
    link: /highlights/idempotent-batch
    linkText: 문제 → 결정 → 검증
  - title: 계약 기반 FE·BE 협업
    details: openapi.yaml 하나가 계약. FE는 생성 타입만 쓰고, 없는 API는 구현 대신 BE 변경 요청 문서에 적는다. 계약 밖 호출 0건.
    link: /highlights/contract
    linkText: 문제 → 결정 → 검증
  - title: Playwright 실측 UI 감사
    details: 전 화면을 3개 뷰포트로 캡처해 터치 타깃·CTA 위치·타이포를 측정했다. 런칭 전 필수 59건을 도출하고 디자인 시스템 규칙으로 명문화했다.
    link: /highlights/ui-audit
    linkText: 문제 → 결정 → 검증
  - title: AI 워크플로 설계
    details: discuss → plan → execute → verify 리듬, 두 레포를 정렬하는 docs/ 단일 진실, 승인 게이트. 이 프로젝트가 만들어진 방식 자체가 결과물이다.
    link: /ai-workflow/
    linkText: 워크플로 보기
---

<div class="gw-section">

<ul class="gw-badges">
  <li class="role">역할 · 요구사항 정의 / 도메인 정책 / 아키텍처·기술 선택 / 검증 게이트 운영</li>
  <li>2026-07-27 시작 · v1.0 2026-09-01 · 진행 중</li>
  <li>1인 프로젝트 + AI 에이전트 (GSD + Claude Code)</li>
</ul>
<ul class="gw-badges">
  <li>Kotlin</li><li>Spring Boot 4.1</li><li>PostgreSQL 18</li><li>Flyway</li><li>JPA</li>
  <li>React 19</li><li>TypeScript</li><li>Vite</li><li>TanStack Query</li><li>Tailwind 4</li><li>shadcn/ui</li>
  <li>Storybook 10</li><li>Vitest</li><li>Playwright</li><li>MSW</li>
  <li>Docker</li><li>Caddy</li><li>GitHub Actions</li><li>AWS</li>
</ul>

<div class="gw-demo">
  <strong>데모 GIF 자리</strong>
  회원 플로우 (카카오 로그인 → 잔여 확인 → 시간표 예약 → 취소) · 관리자 플로우 (승인 → 주간 보드 → 출석)
  <br><small>촬영 목록은 레포의 CAPTURE-LIST.md. 회원 화면은 지금, 관리자 화면은 FE Phase 10 이후 촬영.</small>
</div>

## 문제, 해결, 성과

<div class="gw-flow">
  <div>
    <h3>문제</h3>
    <ul>
      <li>레슬링 체육관 한 곳(송파점)이 회원 이용권·잔여 횟수·예약을 수기로 관리한다.</li>
      <li>이용권이 3종이고 차감 단위에 0.5회가 있어 "지금 몇 회 남았는지"가 자주 어긋난다.</li>
      <li>정원 10명 수업과 1:1 레슨에서 마지막 자리 경쟁이 생긴다.</li>
    </ul>
  </div>
  <div>
    <h3>해결</h3>
    <ul>
      <li>차감·예약·상태 규칙을 먼저 문서(policies.md)로 확정하고, 코드가 문서와 다르면 코드가 틀린 것으로 정했다.</li>
      <li>잔여 = 이력 합계라는 불변식을 append-only 원장으로 구현하게 했다.</li>
      <li>FE·BE는 openapi.yaml 계약으로만 만나고, 화면은 MSW 목 계층 위에서 서버 없이 검증한다.</li>
    </ul>
  </div>
  <div>
    <h3>성과</h3>
    <ul>
      <li>v1.0 요구사항 BE 44건 + FE 41건 전부 충족, 전 페이즈 검증 통과.</li>
      <li>초과 예약 0건을 동시성 통합테스트로 증명. 부하 조건 실증(k6)은 배포 후 기록.</li>
      <li>결정 186건이 이유·기각 대안과 함께 남아 있다.</li>
    </ul>
  </div>
</div>

## 수치

<div class="gw-nums">
  <div><b>85</b><span>v1.0 요구사항 충족</span><small>BE 44/44 · FE 41/41</small></div>
  <div><b>186</b><span>의사결정 기록</span><small>decisions.md D-001~D-186</small></div>
  <div><b>883</b><span>BE 테스트</span><small>Kotlin · Testcontainers, v1.0 마감 기준</small></div>
  <div><b>1,588</b><span>FE 테스트</span><small>unit 982 · stories 498 · e2e 108</small></div>
  <div><b>91</b><span>머지된 PR</span><small>FE 55 · BE 36 (2026-09-11)</small></div>
  <div><b>1,329</b><span>커밋</span><small>FE 718 · BE 611, dev 기준</small></div>
  <div><b>41</b><span>API 경로</span><small>openapi.yaml · Flyway V1~V12</small></div>
  <div><b>TBD</b><span>k6 · 실사용 수치</span><small>배포 후 기록</small></div>
</div>

<p style="margin-top:14px">테스트·PR·커밋 수는 2026-09-11에 레포에서 센 값이다. 요구사항·결정 수는 각 레포 .planning과 docs/decisions.md 기준. 실사용 수치는 배포 뒤에 채운다.</p>

</div>
