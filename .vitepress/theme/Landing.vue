<script setup>
import { onMounted } from 'vue'
import { withBase } from 'vitepress'

// 같은 파일명으로 캡처를 교체하면 이 값을 올린다 — 브라우저·CDN 캐시가 옛 이미지를 붙잡지 않게 한다
const SHOTS_VERSION = '20260917'
const shot = (name) => `${withBase(`/shots/${name}`)}?v=${SHOTS_VERSION}`

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !('IntersectionObserver' in window)) return
  document.documentElement.classList.add('js-reveal')
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
  document.querySelectorAll('.gw .reveal').forEach((el) => io.observe(el))
})
</script>

<template>
  <main class="gw">
    <header class="hero">
      <p class="eyebrow">골드레슬링 · 2026</p>
      <h1>레슬링 체육관의 회원·이용권·예약을<br>한 곳에서 관리하는 <em>웹 서비스</em></h1>
      <div class="lede">
        <p class="why">실제 운영 중인 레슬링 체육관이 회원 이용권·잔여 횟수·예약을 수기로 관리하던 문제에서 출발했습니다.</p>
        <p>회원은 카카오 로그인 뒤 보유 이용권과 잔여 횟수를 확인하고, 주간 시간표에서 수업을 예약·취소·변경하며, 공지와 알림을 받습니다.</p>
        <p>관리자는 가입 승인, 이용권 등록·가감, 주간 보드에서의 대리 처리, 출석 체크, 휴강, 공지를 한 화면 체계에서 처리합니다.</p>
        <p class="role-line">요구사항 정의와 도메인 정책, 아키텍처·기술 선택, 검증 기준과 승인 절차 운영을 맡았고, 코드 구현은 AI 에이전트(GSD + Claude Code)와 협업했습니다. <a :href="withBase('/ai-workflow/')">협업 방식 보기</a></p>
      </div>
      <dl class="facts">
        <div><dt>역할</dt><dd>요구사항 · 도메인 정책 · 아키텍처 · 검증 기준과 승인</dd></div>
        <div><dt>기간</dt><dd>2026.07 – 진행 중 (v1.0 2026.09.01)</dd></div>
        <div><dt>상태</dt><dd>배포 준비 중 · goldwrestling.com 확보 · 실기기 검증 통과</dd></div>
        <div><dt>개발 방식</dt><dd>1인 + AI 에이전트(GSD 워크플로 + Claude Code) · 자동 커밋 금지 · 페이즈마다 사람이 검증·승인 · FE·BE 레포 분리</dd></div>
        <div><dt>스택</dt><dd>React 19 · TypeScript · Vite · TanStack Query · Tailwind 4 · Storybook · Playwright / Kotlin · Spring Boot 4.1 · PostgreSQL 18 / Docker · Caddy · AWS</dd></div>
      </dl>
    </header>

    <section class="numbers reveal" aria-labelledby="h-num">
      <h2 id="h-num">숫자로 보는 프로젝트</h2>
      <p class="numbers-sub">2026년 9월 17일 기준으로 두 레포에서 직접 센 값입니다. 부하 테스트와 실사용 수치는 배포 뒤에 추가합니다.</p>
      <dl>
        <div><dd>85</dd><dt>요구사항 전부 충족<small>v1.0에서 정의한 요구사항 85건(백엔드 44 · 프론트엔드 41)이 모두 검증을 통과했습니다.</small></dt></div>
        <div><dd>194</dd><dt>기록된 의사결정<small>왜 그렇게 했고 무엇을 기각했는지를 D-번호로 남긴 결정의 수입니다.</small></dt></div>
        <div><dd>2,558</dd><dt>자동화 테스트<small>백엔드 885건, 프론트엔드 1,673건(단위 1,047 · 스토리 렌더 518 · E2E 108).</small></dt></div>
        <div><dd>100</dd><dt>머지된 PR<small>프론트엔드 62건, 백엔드 38건. 두 레포 dev 브랜치 커밋은 1,373건이고, 모든 변경은 PR과 CI를 거쳐 들어갔습니다.</small></dt></div>
        <div><dd>0</dd><dt>초과 예약<small>정원 마지막 자리에 동시 요청을 보내는 테스트에서 정원을 넘긴 예약이 없었습니다.</small></dt></div>
        <div><dd>59</dd><dt>UI 감사로 찾은 필수 수정 항목<small>전 화면을 세 가지 화면 폭으로 캡처해 터치 크기·버튼 위치·글자 크기를 측정한 결과입니다. 회원·관리자 화면 모두 수정을 마쳤고 재감사에서 전부 통과했습니다. 실기기 확인 7항목만 남았습니다.</small></dt></div>
      </dl>
    </section>

    <!-- ===================== 프론트엔드 ===================== -->
    <section class="part reveal" aria-labelledby="h-fe">
      <div class="part-head">
        <p class="eyebrow">Part 1</p>
        <h2 id="h-fe">프론트엔드</h2>
        <p class="part-sub">React 19 · TypeScript · Vite · TanStack Query · Tailwind 4 + shadcn/ui · Storybook · Vitest · Playwright · MSW · pnpm</p>
      </div>

      <div class="block">
        <h3>서비스 화면</h3>
        <div class="role">
          <div class="desc">
            <h4>회원</h4>
            <p>카카오 계정으로 가입하고 이름·전화번호를 입력하면 관리자 승인 뒤 이용할 수 있습니다. 잔여 횟수와 차감 이력을 언제든 확인할 수 있습니다.</p>
            <ul>
              <li>보유 이용권(회비·횟수권·1:1 레슨권)과 0.5회 단위 차감 이력</li>
              <li>주간 시간표에서 예약·취소·변경. 당일 취소 불가, 정원·잔여 부족은 사유와 함께 안내</li>
              <li>내 예약 목록, 공지, 휴강·승인 알림</li>
            </ul>
          </div>
          <div class="gallery m">
            <figure><img :src="shot('login-mobile.png')" alt="로그인" loading="lazy"><figcaption>로그인</figcaption></figure>
            <figure><img :src="shot('home-mobile.png')" alt="홈" loading="lazy"><figcaption>홈 · 잔여와 이번 주</figcaption></figure>
            <figure><img :src="shot('schedule-mobile.png')" alt="시간표" loading="lazy"><figcaption>주간 시간표</figcaption></figure>
            <figure><img :src="shot('slot-sheet-mobile.png')" alt="예약" loading="lazy"><figcaption>예약 시트</figcaption></figure>
            <figure><img :src="shot('passes-mobile.png')" alt="이용권" loading="lazy"><figcaption>이용권·차감 이력</figcaption></figure>
            <figure><img :src="shot('my-reservations-mobile.png')" alt="내 예약" loading="lazy"><figcaption>내 예약</figcaption></figure>
          </div>
        </div>
        <div class="role">
          <div class="desc">
            <h4>관리자</h4>
            <p>데스크탑에서는 요일×시간 그리드, 모바일에서는 하루 단위 리스트로 같은 보드를 봅니다. 결제는 오프라인이라 이용권은 관리자가 등록합니다.</p>
            <ul>
              <li>가입 승인·거절, 회원 검색, 상태 변경(활성·휴회·비활성)</li>
              <li>이용권 등록, 0.5 단위 가감, 기간 수정, 등록 취소. 모든 변경이 이력으로 남음</li>
              <li>주간 보드에서 명단 확인, 대리 취소·변경, 출석 체크, 저녁반 0.5회 차감, 휴강</li>
              <li>공지 작성, 알림센터, 활동 피드, 예약 검색</li>
            </ul>
          </div>
          <div class="gallery d">
            <figure><img :src="shot('admin-board-desktop.png')" alt="주간 보드" loading="lazy"><figcaption>주간 보드 (데스크탑)</figcaption></figure>
            <figure><img :src="shot('admin-roster-desktop.png')" alt="명단 패널" loading="lazy"><figcaption>명단 패널 · 대리 처리</figcaption></figure>
            <figure><img :src="shot('admin-approve-desktop.png')" alt="가입 승인" loading="lazy"><figcaption>가입 승인</figcaption></figure>
            <figure><img :src="shot('admin-member-detail-desktop.png')" alt="회원 상세" loading="lazy"><figcaption>회원 상세 · 이용권</figcaption></figure>
            <figure><img :src="shot('admin-activity-desktop.png')" alt="활동 피드" loading="lazy"><figcaption>알림 · 활동 피드</figcaption></figure>
            <figure><img :src="shot('admin-board-mobile.png')" alt="주간 보드 모바일" loading="lazy" class="tall"><figcaption>주간 보드 (모바일)</figcaption></figure>
          </div>
        </div>
      </div>

      <div class="block">
        <h3>아키텍처와 배포</h3>
        <div class="cols2">
          <div>
            <h4>앱 구조</h4>
            <ul class="plain">
              <li>도메인별 <code>features/</code>(api · rules · format · components) 묶음. <code>pages/</code>는 조합만 합니다.</li>
              <li>서버 상태는 TanStack Query만 소유하고, 클라이언트 전역 상태는 Zustand로 인증 세션만 둡니다. 서버 데이터를 스토어에 복제하지 않습니다.</li>
              <li>API 클라이언트는 openapi-fetch 싱글턴. <code>openapi.yaml</code>에서 생성한 타입만 쓰고 수기 타입은 금지합니다. 오류는 응답의 <code>code</code>로만 분기합니다. <a :href="withBase('/highlights/contract')">계약 기반 협업 방식 자세히</a></li>
              <li>예약 가능 여부 12사유, 0.5회 표시, 월요일 주 경계 같은 판정은 순수 함수(<code>rules.ts</code>)로 분리해 컴포넌트는 결과만 그립니다.</li>
              <li>MSW 목 계층 하나를 Storybook·Vitest·dev 서버가 공유합니다. 서버 없이 Empty·Loading·Error 전 상태를 확인합니다.</li>
              <li>디자인 토큰과 shadcn/ui 위에 터치 타깃·safe-area·타이포 규칙을 design-system 스킬로 명문화했습니다.</li>
            </ul>
          </div>
          <div>
            <h4>테스트 3층</h4>
            <ul class="plain">
              <li>Vitest 1,047건. 순수 함수 판정의 경계값을 고정합니다.</li>
              <li>Storybook 518 스토리를 실제 Chromium에서 렌더해 회귀를 잡습니다.</li>
              <li>Playwright 108 시나리오를 데스크탑 Chromium과 모바일 Safari 양쪽에서 돌립니다.</li>
              <li>axe 위반 0건, 주 액션 색 대비 10.5:1을 테스트로 고정했습니다.</li>
            </ul>
          </div>
        </div>
        <h4 class="pipe-title">CI와 배포 흐름</h4>
        <div class="pipe" role="img" aria-label="PR부터 CloudFront까지의 배포 흐름">
          <div class="node"><b>PR → dev</b><span>feature/phase-N 브랜치</span></div>
          <div class="node"><b>CI / quality</b><span>lint · typecheck · unit · storybook</span></div>
          <div class="node"><b>CI / e2e</b><span>Playwright 양 프로젝트</span></div>
          <div class="node"><b>main</b><span>required status check</span></div>
          <div class="node plan"><b>빌드 → S3 sync</b><span>GitHub Actions · 계획</span></div>
          <div class="node plan"><b>CloudFront</b><span>goldwrestling.com · 계획</span></div>
        </div>
        <p class="note">PR마다 규칙 위반(수기 API 타입, 계약 밖 호출, lockfile 혼입)을 코멘트하는 리뷰 워크플로가 함께 돕니다. S3·CloudFront 배포는 BE 배포와 같은 시기에 진행합니다.</p>
      </div>

      <div class="block">
        <h3>트러블슈팅</h3>
        <dl class="issues">
          <div>
            <dt>모바일 시트의 확인 버튼이 콘텐츠와 함께 스크롤됨</dt>
            <dd>긴 폼을 Sheet로 열면 저장 버튼이 아래로 밀리고 홈 인디케이터에 가렸습니다. 공통 컴포넌트 ResponsiveDialog 한 곳에서 푸터를 sticky로 고정하고 safe-area를 더해 5개 화면이 한 번에 해소됐습니다. safe-area는 화면당 한 곳만 더하도록 정해 두 번 더해지는 것을 막았습니다. (D-164, D-182)</dd>
          </div>
          <div>
            <dt>내 예약 목록에 지난 예약이 앞을 채움</dt>
            <dd>계약에 기간 필터가 없고 정렬이 오름차순이라 다가오는 예약이 뒤 페이지로 밀렸습니다. 없는 API를 추측해 만들지 않고, 마지막 페이지를 받아 항목 수가 상한 미만이면 직전 페이지를 합치는 방식으로 계약 안에서 우회했습니다. BE에 기간 필터를 요청해 해소된 뒤에는 queryFn 한 곳만 교체했습니다. (BE-REQ-004, D-150)</dd>
          </div>
          <div>
            <dt>액세스 토큰 만료 시 요청이 동시에 여러 개 실패함</dt>
            <dd>401이 나면 refresh를 한 번만 돌리고 대기 중인 요청을 같은 결과로 재시도하도록 API 클라이언트를 싱글턴으로 묶었습니다. 오류 메시지는 code → 메시지 중앙 맵으로 관리해 화면마다 문자열을 비교하지 않습니다. (D-076)</dd>
          </div>
          <div>
            <dt>첫 실행에서만 스토리·E2E가 간헐적으로 실패함</dt>
            <dd>스토리의 대기 조건이 waitFor 밖에 있거나 E2E 시드가 요청 완료 전에 단언해 첫 실행에서만 깨졌습니다. 대기 조건을 처음부터 waitFor 안에 두는 규약을 세우고, E2E 시드 헬퍼의 중복은 배포 마일스톤에서 정리하기로 기록했습니다.</dd>
          </div>
        </dl>
      </div>

      <div class="block">
        <h3>UI 검사</h3>
        <div class="cols2 audit">
          <div>
            <p>기능이 다 동작한 뒤 모바일 UX를 카카오·토스 같은 국내 앱의 관례에 맞추는 작업을 시작하면서, "보기 좋게"가 아니라 측정 가능한 기준을 먼저 만들었습니다.</p>
            <ul class="plain">
              <li>전 화면을 360·768·1280 세 뷰포트로 Playwright가 캡처하고, 터치 타깃·CTA 위치·타이포·인접 간격을 DOM에서 측정합니다.</li>
              <li>시각은 <code>page.clock</code>으로 고정해 매번 같은 화면이 찍힙니다.</li>
              <li>결과는 런칭 전 필수 59건 · 권장 68건으로 분류하고, 실기기 확인을 거쳐 승인한 뒤에만 수정 기준이 됩니다.</li>
              <li>승인된 규칙은 디자인 시스템 규칙 파일로 옮겨 이후 작업이 읽습니다. 재감사는 승인본과 요소 단위로 대조해 회귀를 가려냅니다.</li>
              <li>회원 화면(Phase 9)에 이어 관리자 화면(Phase 10)까지 수정을 마쳤고, 필수 59건이 재감사에서 항목별로 통과했습니다. 에뮬레이션이 못 잡는 실기기 7항목은 마지막 검증 단계에서 사람이 판정합니다.</li>
            </ul>
            <a :href="withBase('/highlights/ui-audit')">감사 파이프라인 자세히</a>
          </div>
          <div class="pair">
            <figure><img :src="shot('sheet-before.png')" alt="긴 공지 폼 시트, 수정 전. 등록 버튼이 화면 아래로 밀려 보이지 않는다" loading="lazy"><figcaption>수정 전 · 긴 폼에서 등록 버튼이 화면 밖으로 밀림</figcaption></figure>
            <figure><img :src="shot('sheet-after.png')" alt="같은 폼·같은 스크롤 위치, 수정 후. 닫기와 등록 버튼이 하단에 고정돼 있다" loading="lazy"><figcaption>수정 후 · 같은 스크롤 위치, 버튼 하단 고정</figcaption></figure>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 백엔드 ===================== -->
    <section class="part reveal" aria-labelledby="h-be">
      <div class="part-head">
        <p class="eyebrow">Part 2</p>
        <h2 id="h-be">백엔드</h2>
        <p class="part-sub">Kotlin · Spring Boot 4.1 · JPA · PostgreSQL 18 · Flyway · Testcontainers · Docker · Caddy · GHCR</p>
      </div>

      <div class="block">
        <h3>기술 스택과 원칙</h3>
        <ul class="plain two">
          <li>Kotlin + Spring Boot 4.1 + JPA, PostgreSQL 18. 테이블 변경은 Flyway 마이그레이션 파일로만 하고 코드가 임의로 스키마를 바꾸지 못하게 했습니다.</li>
          <li>기능별 패키지(회원 · 이용권 · 시간표 · 예약 · 출석 · 공지 · 알림 · 배치). 프론트엔드 폴더와 같은 이름을 씁니다.</li>
          <li>로그인은 카카오, 세션은 JWT. 액세스 토큰 30분, 리프레시 토큰 14일이고 리프레시 토큰은 한 번 쓰면 새로 발급합니다.</li>
          <li>오류 응답에는 항상 <code>code</code> 값이 실려 오고, 프론트엔드는 이 값으로만 분기합니다. 값 목록은 문서 한 장(error-codes.md)이 관리합니다.</li>
          <li>API 명세는 서버 코드에서 생성해 <code>openapi.yaml</code>로 커밋합니다. 프론트엔드는 이 파일에서 타입을 만들어 씁니다.</li>
          <li>테스트 885건. 가짜 DB가 아니라 실제 PostgreSQL 컨테이너 위에서 돌립니다.</li>
        </ul>
      </div>

      <div class="block">
        <h3>핵심 설계</h3>

        <article class="core">
          <div class="visual">
            <svg viewBox="0 0 320 150" role="img" aria-label="두 요청이 같은 자리를 두고 DB 조건부 갱신을 통과하는 도식">
              <g class="req"><rect x="8" y="22" width="88" height="30"/><text x="52" y="41">회원 A 예약</text></g>
              <g class="req"><rect x="8" y="98" width="88" height="30"/><text x="52" y="117">회원 B 예약</text></g>
              <path class="arrow" d="M96 37 H150 V70 H180"/><path class="arrow" d="M96 113 H150 V80 H180"/>
              <g class="db"><rect x="180" y="52" width="132" height="46"/><text x="246" y="70">잔여 1 · 조건부 UPDATE</text><text x="246" y="87" class="sub">WHERE remaining > 0</text></g>
              <text x="246" y="128" class="ok">성공 1 · 거부 1 · 초과 0</text>
            </svg>
          </div>
          <div class="text">
            <h4>동시 예약 처리 — 마지막 한 자리에 두 명이 동시에 예약해도 한 명만 성공</h4>
            <p>"남은 자리를 조회하고, 있으면 저장"하는 방식은 조회와 저장 사이에 다른 요청이 끼어들어 두 명 다 성공할 수 있습니다. 그래서 확인과 차감을 DB의 UPDATE 한 문장으로 합쳤습니다. 남은 자리가 0보다 클 때만 갱신되므로 두 번째 요청은 갱신된 행이 없어 거부됩니다. 1:1 레슨은 한 타임에 한 명이라는 유니크 제약을 DB에 걸어 코드 경로가 몇 개든 마지막 방어선이 되게 했습니다. 실제 PostgreSQL 위에서 여러 스레드를 동시에 풀어 정원 수만큼만 성공하는지 테스트로 확인했습니다. (D-021, D-098)</p>
            <a :href="withBase('/highlights/concurrency')">자세히</a>
          </div>
        </article>

        <article class="core">
          <div class="visual">
            <div class="formula">
              <span class="line"><b>있어야 할 차감 수</b> = ⌊경과일 / 14⌋</span>
              <span class="line"><b>부족분</b> = 있어야 할 차감 수 − 실제 INACTIVITY 이력 수</span>
              <span class="line small">중복 실행 → 부족분 0 → 아무것도 하지 않음<br>3일 밀린 실행 → 부족분 증가 → 몰아서 차감</span>
            </div>
          </div>
          <div class="text">
            <h4>2주 미사용 차감 — 여러 번 실행돼도 안전한 배치, 자동 실행은 기본 꺼짐</h4>
            <p>횟수권을 2주 동안 안 쓰면 1회를 차감하는 규칙을 매일 새벽 배치로 돌립니다. 문제는 "언제부터 2주인가"였습니다. 출석 기록만 보면 관리자가 체크를 빠뜨린 회원이 억울하게 차감되므로, 출석일·예약한 수업일·이용권 등록일·충전일 등 활동 기록 중 가장 최근 날짜를 기준으로 삼았습니다. 배치는 "지금까지 차감됐어야 할 횟수"에서 "실제 차감된 횟수"를 뺀 만큼만 차감하므로, 같은 날 두 번 돌거나 며칠 멈췄다 돌아도 결과가 같습니다. 자동 실행은 배포 시 꺼져 있고, 운영에서 수동으로 한 번 돌려 결과를 확인한 뒤 켭니다. 저녁반 0.5회 차감은 자동화하지 않고 출석 체크 때 관리자가 처리합니다. (D-105, D-106, D-121, D-151)</p>
            <a :href="withBase('/highlights/idempotent-batch')">자세히</a>
          </div>
        </article>

        <article class="core">
          <div class="visual">
            <table class="ledger" aria-label="차감·복구 기록 예시">
              <thead><tr><th>사유</th><th>수량</th><th>주체</th></tr></thead>
              <tbody>
                <tr><td>INITIAL_GRANT</td><td>+10</td><td>관리자</td></tr>
                <tr><td>RESERVE</td><td>−1</td><td>회원</td></tr>
                <tr><td>CANCEL_REFUND</td><td>+1</td><td>회원</td></tr>
                <tr><td>EVENING_HALF</td><td>−0.5</td><td>관리자</td></tr>
                <tr><td>INACTIVITY</td><td>−1</td><td>배치</td></tr>
              </tbody>
              <tfoot><tr><td>잔여 횟수</td><td>8.5</td><td>기록의 합</td></tr></tfoot>
            </table>
          </div>
          <div class="text">
            <h4>잔여 횟수 계산 — 남은 횟수를 따로 저장하지 않고, 차감·복구 기록을 더해서 구합니다</h4>
            <p>통장 잔액을 거래 내역의 합으로 구하는 것과 같은 방식입니다. "남은 횟수" 칸을 두고 고쳐 쓰면 어디서 어긋났는지 추적할 수 없어서, 이용권 등록·예약 차감·취소 복구·관리자 가감·미사용 차감을 전부 사유와 주체, 시각이 있는 기록으로 남기고 잔여는 그 합계로만 계산합니다. 예약을 취소해도 기록을 지우지 않고 "취소됨" 상태와 복구 기록을 추가합니다. 덕분에 회원이 "왜 8.5회예요?"라고 물으면 관리자 화면에서 그대로 보여줄 수 있습니다. (D-016, D-055, D-090)</p>
          </div>
        </article>
      </div>

      <div class="block">
        <h3>아키텍처와 배포</h3>
        <div class="pipe" role="img" aria-label="FE, 계약, BE, DB로 이어지는 구조">
          <div class="node"><b>FE</b><span>React · CSR</span></div>
          <div class="node contract"><b>openapi.yaml</b><span>41 경로 · 유일한 계약</span></div>
          <div class="node"><b>BE</b><span>Spring Boot 4.1 · Kotlin</span></div>
          <div class="node"><b>PostgreSQL 18</b><span>Flyway · 배치도 같은 DB</span></div>
          <div class="node side"><b>카카오 OAuth</b><span>인증 수단으로만</span></div>
        </div>
        <h4 class="pipe-title">배포 흐름 <span class="st wip">계획</span></h4>
        <div class="pipe" role="img" aria-label="GitHub Actions에서 EC2까지의 배포 흐름">
          <div class="node"><b>main push</b><span>ktlint · build · 통합 테스트</span></div>
          <div class="node"><b>GHCR</b><span>멀티스테이지 · amd64 + arm64</span></div>
          <div class="node plan"><b>EC2 · RAM 1GB</b><span>SSH compose pull → up</span></div>
          <div class="node plan"><b>Caddy → app → postgres</b><span>자동 HTTPS · 상태 확인 주소만 외부 공개</span></div>
          <div class="node plan"><b>S3 백업</b><span>매일 pg_dump · 복구 리허설</span></div>
        </div>
        <p class="note">AWS 계정·도메인(goldwrestling.com)·ACM·EC2·카카오 운영 URI까지 준비돼 있고, 서버 구성과 파이프라인은 BE v1.1에서 진행합니다. 배포 뒤 k6로 초과 예약 0건과 p95를 실측합니다. <a :href="withBase('/architecture')">아키텍처 자세히</a></p>
      </div>
    </section>

    <section class="timeline reveal" aria-labelledby="h-tl">
      <h2 id="h-tl">타임라인</h2>
      <ol>
        <li><time>2026.07.27</time><span>프로젝트 시작. 요구사항·도메인 정책·용어 문서 확정</span></li>
        <li><time>2026.08.04</time><span>FE 로드맵 확정. API 계약이 나올 때까지 예약·운영 화면은 대기</span></li>
        <li><time>2026.08.31</time><span>FE v1.0 마감. 요구사항 41/41, E2E 108 양 프로젝트 통과</span></li>
        <li><time>2026.09.01</time><span>BE v1.0 완료. 요구사항 44/44, 테스트 883건</span></li>
        <li><time>2026.09.08</time><span>UI 감사 리포트 승인. 필수 59건 · 권장 68건</span></li>
        <li><time>2026.09.11</time><span>FE 회원 화면 수정 검증 통과 (Phase 9)</span></li>
        <li><time>2026.09.17</time><span>FE 관리자 화면 수정 기계 검증 통과 (Phase 10). 필수 항목 전건 해소, 실기기 7항목은 Phase 11로 이관</span></li>
        <li class="next"><time>예정</time><span>FE 최종 검증·실기기 확인 (Phase 11), BE 배포·운영 (Phase 7~10), k6 실증</span></li>
      </ol>
    </section>

    <footer class="foot reveal">
      <div>
        <p class="kicker">레포</p>
        <a href="https://github.com/minsu-zip/gold-wrestling-fe">gold-wrestling-fe</a>
        <a href="https://github.com/minsu-zip/gold-wrestling-be">gold-wrestling-be</a>
        <a href="https://github.com/minsu-zip/gold-wrestling-docs">gold-wrestling-docs</a>
      </div>
      <div>
        <p class="kicker">연락</p>
        <a href="https://github.com/minsu-zip">github.com/minsu-zip</a>
      </div>
      <div>
        <p class="kicker">더 읽기</p>
        <a :href="withBase('/status/')">프로젝트 현황</a>
        <a :href="withBase('/architecture')">아키텍처</a>
        <a :href="withBase('/ai-workflow/')">AI 협업 워크플로</a>
        <a href="https://github.com/minsu-zip/gold-wrestling-be/blob/dev/docs/decisions.md">의사결정 기록 194건 (GitHub)</a>
      </div>
    </footer>
  </main>
</template>
