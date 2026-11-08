<script setup>
import { onMounted } from 'vue'
import { withBase } from 'vitepress'

// 같은 파일명으로 캡처를 교체하면 이 값을 올린다 — 브라우저·CDN 캐시가 옛 이미지를 붙잡지 않게 한다
const SHOTS_VERSION = '20261108'
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
        <p>2026년 10월 24일 첫 운영 배포 뒤 실제 체육관에서 쓰고 있고, 세 차례 QA와 보안 점검에서 나온 결함·요청을 반영해 실사용 수준으로 다듬었습니다.</p>
        <p class="role-line">요구사항 정의와 도메인 정책, 아키텍처·기술 선택, 검증 기준과 승인 절차 운영을 맡았고, 코드 구현은 AI 에이전트(GSD + Claude Code)와 협업했습니다. <a :href="withBase('/ai-workflow/')">협업 방식 보기</a></p>
      </div>
      <dl class="facts">
        <div><dt>역할</dt><dd>요구사항 · 도메인 정책 · 아키텍처 · 검증 기준과 승인 · 배포·운영</dd></div>
        <div><dt>기간</dt><dd>2026.07 – 운영 중 (v1.0 2026.09.01 · 첫 배포 2026.10.24)</dd></div>
        <div><dt>상태</dt><dd>운영 중 · <a href="https://app.goldwrestling.com">app.goldwrestling.com</a> · API <code>api.goldwrestling.com</code></dd></div>
        <div><dt>개발 방식</dt><dd>1인 + AI 에이전트(GSD 워크플로 + Claude Code) · 자동 커밋 금지 · 페이즈마다 사람이 검증·승인 · FE·BE 레포 분리</dd></div>
        <div><dt>스택</dt><dd>React 19 · TypeScript · Vite · TanStack Query · Tailwind 4 · Storybook · Playwright / Kotlin · Spring Boot 4.1 · PostgreSQL 18 / Docker · Caddy · AWS</dd></div>
      </dl>

      <!-- 평가자 동선: 실서비스는 카카오 가입 + 관리자 승인 뒤에만 쓸 수 있어, 로그인 없이 열리는 공개 가이드가
           기능 전체를 실제 화면으로 볼 수 있는 유일한 입구다 (BE D-247). 주소는 운영 도메인 그대로 노출한다 -->
      <section class="tour" aria-labelledby="h-tour">
        <div class="tour-head">
          <h2 id="h-tour">로그인 없이 기능 둘러보기</h2>
          <p>실제 서비스는 카카오 가입과 관리자 승인을 거쳐야 쓸 수 있습니다. 아래 이용 가이드는 로그인 없이 열리고, 회원·관리자 기능을 실제 화면 캡처(가상 데이터)와 함께 단계별로 보여 줍니다.</p>
        </div>
        <div class="tour-links">
          <a class="tour-card" href="https://app.goldwrestling.com/guide/member" target="_blank" rel="noopener">
            <span class="tour-who">회원</span>
            <strong>회원 이용 가이드 <span class="arrow" aria-hidden="true">↗</span></strong>
            <span class="tour-what">카카오 가입 · 승인 대기 · 수업 예약 · 당일 전 취소·변경 · 이용권과 0.5회 차감 이력 · 공지</span>
            <span class="tour-meta">8개 섹션 · 모바일 화면 11장</span>
            <code class="tour-url">app.goldwrestling.com/guide/member</code>
          </a>
          <a class="tour-card" href="https://app.goldwrestling.com/guide/admin" target="_blank" rel="noopener">
            <span class="tour-who">관리자</span>
            <strong>관리자 사용 가이드 <span class="arrow" aria-hidden="true">↗</span></strong>
            <span class="tour-what">가입 승인 · 주간 보드 · 출석 체크 · 휴강 · 이용권 등록·충전·가감 · 대리 취소 · 공지 · 알림</span>
            <span class="tour-meta">12개 섹션 · 데스크탑 화면 12장 · 자주 받는 회원 문의</span>
            <code class="tour-url">app.goldwrestling.com/guide/admin</code>
          </a>
        </div>
      </section>
    </header>

    <section class="numbers reveal" aria-labelledby="h-num">
      <h2 id="h-num">숫자로 보는 프로젝트</h2>
      <p class="numbers-sub">2026년 11월 8일 기준으로 두 레포 main에서 직접 센 값입니다. k6 부하 테스트 수치는 BE Phase 10에서 추가합니다.</p>
      <dl>
        <div><dd>256</dd><dt>기록된 의사결정<small>왜 그렇게 했고 무엇을 기각했는지를 D-번호로 남긴 결정의 수입니다.</small></dt></div>
        <div><dd>3,532</dd><dt>자동화 테스트<small>백엔드 1,065건, 프론트엔드 2,467건(단위 1,648 · 스토리 렌더 679 · E2E 140). 전부 통과.</small></dt></div>
        <div><dd>186</dd><dt>머지된 PR<small>프론트엔드 99건, 백엔드 87건. 두 레포 main 커밋은 1,746건이고, 모든 변경은 PR·CI·리뷰 봇을 거쳐 들어갔습니다.</small></dt></div>
        <div><dd>8.5분</dd><dt>main 머지부터 운영 반영까지<small>백엔드는 CI 통과 → 이미지 빌드 → SSH 배포 → health 게이트까지 자동입니다. 롤백은 실연에서 73초가 걸렸습니다.</small></dt></div>
        <div><dd>0</dd><dt>초과 예약<small>정원 마지막 자리에 동시 요청을 보내는 테스트에서 정원을 넘긴 예약이 없었습니다.</small></dt></div>
        <div><dd>59</dd><dt>UI 감사로 찾은 필수 수정 항목<small>전 화면을 세 가지 화면 폭으로 캡처해 터치 크기·버튼 위치·글자 크기를 측정했습니다. 최종 검증에서 48건 해소, 11건은 실기기 판정 보류, 미해소 0건입니다.</small></dt></div>
      </dl>
    </section>

    <!-- ===================== 프론트엔드 ===================== -->
    <section class="part reveal" aria-labelledby="h-fe">
      <div class="part-head">
        <p class="eyebrow">Part 1</p>
        <h2 id="h-fe">프론트엔드</h2>
        <p class="part-sub">React 19 · TypeScript 6 · Vite 8 · TanStack Query 5 · Tailwind 4 + shadcn/ui · Storybook 10 · Vitest 4 · Playwright · MSW · Node 24 · pnpm 12</p>
      </div>

      <div class="block">
        <h3>서비스 화면</h3>
        <div class="role">
          <div class="desc">
            <h4>회원</h4>
            <p>카카오 계정으로 가입하고 이름·전화번호를 입력하면 관리자 승인 뒤 이용할 수 있습니다. 잔여 횟수와 차감 이력을 언제든 확인할 수 있습니다.</p>
            <ul>
              <li>보유 이용권(회비·횟수권·1:1 레슨권)과 0.5회 단위 차감 이력. 이력 행마다 수업 일시와 "관리자 예약·취소" 표시</li>
              <li>주간 시간표에서 예약·취소·변경. 셀은 수업 상태만 보여주고, 예약할 수 없는 이유는 시트에서 한 문장으로 안내</li>
              <li>홈에서 다음 예약·잔여·최근 공지를 한눈에. 휴강·대리 취소된 예약은 "취소된 예약 안내"로 따로 알림</li>
              <li>승인 대기·거절·비활성 화면에서 체육관 전화 걸기·카카오톡 ID 복사로 바로 문의</li>
            </ul>
            <a class="guide-link" href="https://app.goldwrestling.com/guide/member" target="_blank" rel="noopener">회원 이용 가이드 열기 <span aria-hidden="true">↗</span><code>app.goldwrestling.com/guide/member</code></a>
          </div>
          <div class="gallery m">
            <figure><img :src="shot('login-mobile.png')" alt="로그인" loading="lazy"><figcaption>로그인</figcaption></figure>
            <figure><img :src="shot('home-mobile.png')" alt="홈" loading="lazy"><figcaption>홈 · 다음 예약·잔여·공지</figcaption></figure>
            <figure><img :src="shot('schedule-mobile.png')" alt="예약" loading="lazy"><figcaption>시간표 · 다가오는 예약</figcaption></figure>
            <figure><img :src="shot('slot-sheet-mobile.png')" alt="예약 시트" loading="lazy"><figcaption>예약 시트 · 불가 사유</figcaption></figure>
            <figure><img :src="shot('passes-mobile.png')" alt="이용권" loading="lazy"><figcaption>이용권 · 수업 일시별 이력</figcaption></figure>
            <figure><img :src="shot('profile-mobile.png')" alt="내 정보" loading="lazy"><figcaption>내 정보 · 카카오 프로필</figcaption></figure>
          </div>
        </div>
        <div class="role">
          <div class="desc">
            <h4>관리자</h4>
            <p>데스크탑에서는 요일×시간 그리드, 모바일에서는 하루 단위 리스트로 같은 보드를 봅니다. 결제는 오프라인이라 이용권은 관리자가 등록합니다.</p>
            <ul>
              <li>가입 승인·거절, 회원 검색, 상태 변경(활성·휴회·비활성). 승인 대기는 회원 목록과 분리해 승인 대기 메뉴에서만</li>
              <li>이용권 등록, 횟수 충전(횟수권은 종류별 한 장), 0.5 단위 가감(1:1 레슨권은 정수), 기간 수정·변경 이력, 등록 취소. 막히면 걸린 예약 목록을 함께 안내</li>
              <li>주간 보드에서 명단 확인(보유 이용권 뱃지, 이름 → 회원 상세, 명단 복사), 대리 취소·변경, 출석 체크(출석 골드·불참 빨강 + 요약), 저녁반 0.5회 차감(이용권 없음·잔여 부족을 나눠 등록·충전으로 안내), 휴강</li>
              <li>알림을 누르면 해당 회원 상세나 그 수업의 명단 패널이 바로 열림. 공지 작성, 활동 피드, 예약 검색</li>
              <li>관리자 계정 생성·비활성화·비밀번호 변경</li>
            </ul>
            <a class="guide-link" href="https://app.goldwrestling.com/guide/admin" target="_blank" rel="noopener">관리자 사용 가이드 열기 <span aria-hidden="true">↗</span><code>app.goldwrestling.com/guide/admin</code></a>
          </div>
          <div class="gallery d">
            <figure><img :src="shot('admin-board-desktop.png')" alt="주간 보드" loading="lazy"><figcaption>주간 보드 (데스크탑)</figcaption></figure>
            <figure><img :src="shot('admin-roster-desktop.png')" alt="명단 패널" loading="lazy"><figcaption>명단 패널 · 보유 이용권·출석 3상태</figcaption></figure>
            <figure><img :src="shot('admin-members-desktop.png')" alt="회원 목록" loading="lazy"><figcaption>회원 목록 · 가입 신청일순</figcaption></figure>
            <figure><img :src="shot('admin-member-detail-desktop.png')" alt="회원 상세" loading="lazy"><figcaption>회원 상세 · 이용권·기간 변경 이력</figcaption></figure>
            <figure><img :src="shot('admin-activity-desktop.png')" alt="활동 피드" loading="lazy"><figcaption>활동 피드</figcaption></figure>
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
              <li>세션은 보안 점검 뒤 재설계했습니다. access 토큰은 메모리에만, refresh 토큰은 HttpOnly 쿠키로 두고, 앱 시작 시 쿠키로 세션을 복원한 뒤에 라우터를 띄웁니다. <a :href="withBase('/highlights/security')">보안 점검 후속 자세히</a></li>
              <li>API 클라이언트는 openapi-fetch 싱글턴. <code>openapi.yaml</code>에서 생성한 타입만 쓰고 수기 타입은 금지합니다. 오류는 응답의 <code>code</code>로만 분기합니다. <a :href="withBase('/highlights/contract')">계약 기반 협업 방식 자세히</a></li>
              <li>예약 가능 여부 12사유, 0.5회 표시, 월요일 주 경계 같은 판정은 순수 함수(<code>rules.ts</code>)로 분리해 컴포넌트는 결과만 그립니다.</li>
              <li>MSW 목 계층 하나를 Storybook·Vitest·dev 서버가 공유합니다. 서버 없이 Empty·Loading·Error 전 상태를 확인합니다.</li>
              <li>디자인 토큰과 shadcn/ui 위에 터치 타깃·safe-area·타이포 규칙을 design-system 스킬로 명문화했습니다.</li>
            </ul>
          </div>
          <div>
            <h4>테스트 3층</h4>
            <ul class="plain">
              <li>Vitest 1,564건. 순수 함수 판정의 경계값을 고정합니다.</li>
              <li>Storybook 649 스토리를 실제 Chromium에서 렌더해 회귀를 잡습니다.</li>
              <li>Playwright 60 시나리오를 데스크탑 Chromium과 모바일 Safari 양쪽에서 돌립니다(120건).</li>
              <li>axe 위반 0건, 주 액션 색 대비 10.5:1을 테스트로 고정했습니다.</li>
                </ul>
          </div>
        </div>
        <h4 class="pipe-title">CI와 배포 흐름</h4>
        <div class="pipe" role="img" aria-label="PR부터 CloudFront까지의 배포 흐름">
          <div class="node"><b>PR → dev → main</b><span>릴리스 PR</span></div>
          <div class="node"><b>CI</b><span>lint · typecheck · unit · storybook · e2e</span></div>
          <div class="node"><b>Deploy</b><span>workflow_run · CI가 검증한 커밋만</span></div>
          <div class="node"><b>S3 sync 2단계</b><span>OIDC · assets 먼저, index.html 마지막</span></div>
          <div class="node"><b>CloudFront</b><span>app.goldwrestling.com · 실주소 대조</span></div>
        </div>
        <p class="note">2026-10-24 첫 배포 이후 릴리스 5회. 운영 주소의 엔트리 청크가 방금 빌드와 같은지 대조하고 나서야 배포를 성공으로 칩니다. <a :href="withBase('/highlights/deploy')">배포·운영 자세히</a></p>
      </div>

      <div class="block">
        <h3>트러블슈팅</h3>
        <dl class="issues">
          <div>
            <dt>탭 두 개가 동시에 토큰을 갱신하면 모든 세션이 끊김</dt>
            <dd>BE는 이미 회전된 refresh 토큰이 다시 쓰이면 탈취로 보고 그 사용자의 세션을 전부 폐기합니다. 토큰을 메모리로 옮기자 탭마다 따로 갱신하게 되어, 두 탭이 같은 순간 401을 받으면 사용자가 로그아웃됐습니다. 탭 안에서는 진행 중인 갱신 Promise 하나를 공유하고, 탭 사이에는 <code>navigator.locks</code>로 갱신을 직렬화해 기다린 쪽이 방금 회전된 쿠키를 그대로 쓰게 했습니다. 로그아웃만 탭 간에 전파하고 로그인은 전파하지 않아 동시 갱신 창을 줄였습니다. (D-076, D-234)</dd>
          </div>
          <div>
            <dt>배포 직후 열려 있던 탭에서 화면이 깨짐</dt>
            <dd>옛 <code>index.html</code>이 이미 지워진 청크를 요청하면 비공개 버킷이 403을 주고, CloudFront가 SPA 폴백으로 HTML을 돌려줘 모듈 파싱 오류가 납니다. 해시 붙은 assets를 먼저 1년 immutable로 올리고 <code>index.html</code>은 no-cache로 마지막에 올리며, 옛 청크는 지우지 않고 30일 수명 규칙으로 정리합니다. 무효화는 <code>/*</code> 하나로 끝까지 기다리고, 운영 주소의 엔트리 청크가 방금 빌드와 같은지 대조합니다. (D-207)</dd>
          </div>
          <div>
            <dt>모바일 시트의 확인 버튼이 콘텐츠와 함께 스크롤됨</dt>
            <dd>긴 폼을 Sheet로 열면 저장 버튼이 아래로 밀리고 홈 인디케이터에 가렸습니다. 공통 컴포넌트 ResponsiveDialog 한 곳에서 푸터를 sticky로 고정하고 safe-area를 더해 5개 화면이 한 번에 해소됐습니다. safe-area는 화면당 한 곳만 더하도록 정해 두 번 더해지는 것을 막았습니다. (D-164, D-182)</dd>
          </div>
          <div>
            <dt>내 예약 목록에 지난 예약이 앞을 채움</dt>
            <dd>계약에 기간 필터가 없고 정렬이 오름차순이라 다가오는 예약이 뒤 페이지로 밀렸습니다. 없는 API를 추측해 만들지 않고, 마지막 페이지를 받아 항목 수가 상한 미만이면 직전 페이지를 합치는 방식으로 계약 안에서 우회했습니다. BE에 기간 필터를 요청해 해소된 뒤에는 queryFn 한 곳만 교체했습니다. (BE-REQ-004, D-150)</dd>
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
              <li>회원 화면(Phase 9)과 관리자 화면(Phase 10)을 고친 뒤, 최종 검증(Phase 11)에서 필수 59건을 행 단위로 판정했습니다. 48건 해소, 11건은 실기기 판정 보류, 미해소 0건입니다. 보류분은 "실패"가 아니라 "미확인"으로 남기고 운영 환경에서 판정합니다 (D-198).</li>
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
        <p class="part-sub">Kotlin · Spring Boot 4.1 · JPA · PostgreSQL 18 · Flyway · Testcontainers · Docker · Caddy · GHCR · AWS(EC2 · S3 · IAM OIDC)</p>
      </div>

      <div class="block">
        <h3>기술 스택과 원칙</h3>
        <ul class="plain two">
          <li>Kotlin + Spring Boot 4.1 + JPA, PostgreSQL 18. 테이블 변경은 Flyway 마이그레이션 파일로만 하고 코드가 임의로 스키마를 바꾸지 못하게 했습니다.</li>
          <li>기능별 패키지(회원 · 이용권 · 시간표 · 예약 · 출석 · 공지 · 알림 · 배치). 프론트엔드 폴더와 같은 이름을 씁니다.</li>
          <li>로그인은 카카오(회원)·ID/PW(관리자), 세션은 JWT. 액세스 토큰 30분은 응답 본문으로, 리프레시 토큰 14일은 HttpOnly 쿠키로만 주고 한 번 쓰면 새로 발급합니다.</li>
          <li>로그인 시도는 15분 창에서 관리자 ID 5회·IP 20회를 넘으면 429와 <code>Retry-After</code>로 막습니다. 판정은 bcrypt 비교보다 먼저 합니다.</li>
          <li>오류 응답에는 항상 <code>code</code> 값이 실려 오고, 프론트엔드는 이 값으로만 분기합니다. 값 목록은 문서 한 장(error-codes.md)이 관리합니다.</li>
          <li>API 명세는 서버 코드에서 생성해 <code>openapi.yaml</code>(46경로)로 커밋합니다. 프론트엔드는 이 파일에서 타입을 만들어 씁니다.</li>
          <li>테스트 1,065건. 가짜 DB가 아니라 실제 PostgreSQL 컨테이너 위에서 돌립니다.</li>
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
          <div class="node contract"><b>openapi.yaml</b><span>46 경로 · 유일한 계약</span></div>
          <div class="node"><b>BE</b><span>Spring Boot 4.1 · Kotlin</span></div>
          <div class="node"><b>PostgreSQL 18</b><span>Flyway V1~V18 · 배치도 같은 DB</span></div>
          <div class="node side"><b>카카오 OAuth</b><span>인증 수단으로만</span></div>
        </div>
        <h4 class="pipe-title">배포 흐름 <span class="st done">운영 중</span></h4>
        <div class="pipe" role="img" aria-label="GitHub Actions에서 EC2까지의 배포 흐름">
          <div class="node"><b>main push → CI</b><span>ktlint · build · 통합 테스트</span></div>
          <div class="node"><b>GHCR</b><span>workflow_run · amd64 + arm64 · SHA 태그</span></div>
          <div class="node"><b>EC2 t3.micro</b><span>OIDC로 22번 임시 개방 · scp → SSH</span></div>
          <div class="node"><b>health 게이트</b><span>180초 안 UP + 실행 이미지 대조</span></div>
          <div class="node"><b>S3 백업</b><span>매일 03:00 pg_dump · 복구 리허설 완료</span></div>
        </div>
        <p class="note">컨테이너 세 개(Caddy · app · postgres)를 RAM 908MB 서버에 메모리 예산표대로 올렸습니다. 부하 중 app 369MiB/550M, OOM 0건. main 머지부터 반영까지 약 8.5분, 수동 롤백 73초, 복구 리허설 RTO 약 1분 40초를 실측했습니다. k6 부하 실증과 미사용 차감 cron 활성화는 Phase 10에서 진행합니다. <a :href="withBase('/highlights/deploy')">배포·운영 자세히</a></p>
      </div>

      <div class="block">
        <h3>트러블슈팅</h3>
        <dl class="issues">
          <div>
            <dt>첫 실서버 기동에서 앱이 7번 연속 크래시함</dt>
            <dd><code>.env</code>의 <code>KEY=</code>는 "값 없음"이 아니라 빈 문자열로 주입되는데, Spring의 <code>${KEY:기본값}</code>은 키가 아예 없을 때만 기본값을 씁니다. 빈 문자열이 숫자·날짜·Duration 바인딩에서 터졌습니다. compose에서 <code>${KEY:-기본값}</code>으로 흡수하고, 리뷰에서 같은 구조의 JWT 만료 키 2개를 더 찾아낸 뒤 "바인딩 타입" 기준으로 빈 값이 가능한 키 17개를 전수 점검했습니다. (Phase 7, CR-01)</dd>
          </div>
          <div>
            <dt>원격 배포 스크립트가 성공 코드를 내고 중간에 멈춤</dt>
            <dd>첫 자동 배포에서 <code>ssh 'bash -s' &lt; deploy-remote.sh</code>가 rc 0으로 끝났는데 컨테이너는 바뀌지 않았습니다. 스크립트 안의 <code>docker compose run</code>이 아직 읽히지 않은 스크립트 줄을 stdin에서 먹어버린 것이었습니다. 본문을 <code>main()</code>으로 감싸 마지막 줄에서 호출하고, 출력에 <code>=== deployed ===</code>가 있어야 통과하게 했습니다. health 게이트가 "실행 이미지 불일치"로 막아 운영 영향은 없었습니다. (D-205)</dd>
          </div>
          <div>
            <dt>방화벽 규칙을 영속화하려다 방화벽이 사라짐</dt>
            <dd>컨테이너에서 EC2 메타데이터(IMDS)로 가는 길을 막는 iptables 규칙을 재부팅 뒤에도 남기려고 iptables-persistent를 설치하자, 충돌 패키지인 ufw를 apt가 조용히 제거했습니다. 규칙은 systemd oneshot 서비스로 넣는 방식으로 바꿔 ufw와 함께 유지되게 했습니다. (D-237)</dd>
          </div>
        </dl>
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
        <li><time>2026.10.05</time><span>BE 실 EC2 수동 배포. api.goldwrestling.com HTTPS, 1GB 서버 메모리 실측 (Phase 7)</span></li>
        <li><time>2026.10.18</time><span>BE 첫 자동 배포 (Phase 8). FE 최종 검증 마감 (Phase 11)</span></li>
        <li><time>2026.10.24</time><span><b>첫 운영 배포.</b> app.goldwrestling.com — S3 + CloudFront, 실제 체육관에서 사용 시작</span></li>
        <li><time>2026.10.30</time><span>운영 안전장치 — 매일 S3 백업, 복구 리허설 RTO 약 1분 40초 (Phase 9). 수동 QA 1~3차 시작</span></li>
        <li><time>2026.11.03</time><span>보안 점검 후속 — refresh HttpOnly 쿠키, 로그인 시도 제한, 관리자 계정 관리, 서버 하드닝</span></li>
        <li><time>2026.11.06</time><span>오픈 전 운영 테스트 피드백 — 승인 대기를 회원 목록에서 분리, 1:1 레슨권 정수 단위, 출석 명단 보유 이용권·명단 복사</span></li>
        <li class="next"><time>예정</time><span>BE Phase 10 — k6로 초과 예약 0건·p95 실증, 미사용 차감 cron 활성화. 실기기 보류 11건 판정</span></li>
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
        <a :href="withBase('/highlights/deploy')">배포·운영 파이프라인</a>
        <a :href="withBase('/highlights/security')">보안 점검 후속</a>
        <a :href="withBase('/ai-workflow/')">AI 협업 워크플로</a>
        <a href="https://github.com/minsu-zip/gold-wrestling-be/blob/main/docs/decisions.md">의사결정 기록 256건 (GitHub)</a>
      </div>
    </footer>
  </main>
</template>
