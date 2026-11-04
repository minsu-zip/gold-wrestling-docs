import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    lang: 'ko-KR',
    title: '골드레슬링',
    description: '레슬링 체육관의 회원·이용권·예약을 한 곳에서 관리하는 웹 서비스(운영 중). 요구사항·정책·아키텍처·검증 게이트·배포를 운영하고 구현은 AI 에이전트와 협업한 프로젝트 기록.',
    base: '/gold-wrestling-docs/',
    cleanUrls: true,
    srcExclude: ['README.md', 'CAPTURE-LIST.md', 'TODO.md'],
    head: [
      ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css' }],
      ['meta', { name: 'theme-color', content: '#edb417' }],
      ['meta', { property: 'og:title', content: '골드레슬링' }],
      ['meta', { property: 'og:description', content: '레슬링 체육관의 회원·이용권·예약을 한 곳에서 관리하는 웹 서비스' }],
    ],
    themeConfig: {
      siteTitle: '골드레슬링',
      nav: [
        { text: '현황', link: '/status/' },
        { text: '하이라이트', link: '/highlights/concurrency' },
        { text: '아키텍처', link: '/architecture' },
        { text: 'AI 협업 워크플로', link: '/ai-workflow/' },
      ],
      sidebar: [
        { text: '홈', link: '/' },
        { text: '프로젝트 현황', link: '/status/' },
        {
          text: '하이라이트',
          items: [
            { text: '동시성 제어', link: '/highlights/concurrency' },
            { text: '상태 기반 멱등 배치', link: '/highlights/idempotent-batch' },
            { text: '계약 기반 FE·BE 협업', link: '/highlights/contract' },
            { text: 'UI 감사 파이프라인', link: '/highlights/ui-audit' },
            { text: '배포·운영 파이프라인', link: '/highlights/deploy' },
            { text: '보안 점검 후속', link: '/highlights/security' },
          ],
        },
        { text: '아키텍처', link: '/architecture' },
        { text: 'AI 협업 워크플로', link: '/ai-workflow/' },
      ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/minsu-zip/gold-wrestling-fe', ariaLabel: 'GitHub' },
      ],
      outline: false,
      docFooter: { prev: '이전', next: '다음' },
      sidebarMenuLabel: '메뉴',
      returnToTopLabel: '맨 위로',
      darkModeSwitchLabel: '테마',
      footer: {
        message: '이 사이트의 수치와 결정 기록은 gold-wrestling-fe · gold-wrestling-be 레포의 문서를 기준으로 합니다.',
        copyright: '© 2026 minsu-zip',
      },
    },
    mermaid: {
      theme: 'base',
      flowchart: { htmlLabels: true, useMaxWidth: true, nodeSpacing: 40, rankSpacing: 48, curve: 'linear' },
      themeVariables: {
        fontFamily: 'Pretendard Variable, Pretendard, -apple-system, sans-serif',
        fontSize: '13px',
        primaryColor: '#fcfbf8', primaryBorderColor: '#1a1814', primaryTextColor: '#1a1814',
        secondaryColor: '#fcfbf8', tertiaryColor: '#f5f3ee',
        lineColor: '#8b857a', edgeLabelBackground: '#fcfbf8',
        clusterBkg: '#f5f3ee', clusterBorder: '#e4e0d6', titleColor: '#5a554c',
      },
    },
    mermaidPlugin: { class: 'mermaid' },
    // pnpm은 mermaid의 하위 의존성을 최상위에 두지 않아, 플러그인이 넣는 optimizeDeps.include의 맨 이름을
    // dev 서버가 찾지 못한다. 그러면 CJS인 dayjs가 사전 번들되지 않아 dev에서 페이지가 하얗게 뜬다(빌드는 무관).
    // `상위 > 하위` 경로로 다시 지정해 준다.
    vite: {
      optimizeDeps: {
        include: [
          'mermaid > dayjs',
          'mermaid > @braintree/sanitize-url',
          'mermaid > cytoscape',
          'mermaid > cytoscape-cose-bilkent',
          'mermaid > elkjs/lib/elk.bundled.js',
        ],
      },
    },
  })
)
