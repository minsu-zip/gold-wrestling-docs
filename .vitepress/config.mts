import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    lang: 'ko-KR',
    title: '골드레슬링',
    description: '체육관 회원·예약 서비스. FE 개발자가 AI 에이전트 워크플로를 설계·운영해 만든 풀스택 프로젝트의 문서와 기록.',
    base: '/gold-wrestling-docs/',
    cleanUrls: true,
    lastUpdated: true,
    srcExclude: ['README.md', 'CAPTURE-LIST.md'],
    head: [
      ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css' }],
      ['meta', { name: 'theme-color', content: '#edb417' }],
      ['meta', { property: 'og:title', content: '골드레슬링 프로젝트' }],
      ['meta', { property: 'og:description', content: '체육관 회원·예약 서비스. 요구사항·정책·아키텍처·검증 게이트를 운영하고 구현은 AI 에이전트가 수행한 풀스택 프로젝트.' }],
    ],
    themeConfig: {
      siteTitle: '골드레슬링',
      nav: [
        { text: '현황', link: '/status/' },
        { text: '기술 문서', link: '/tech/' },
        { text: 'AI 협업 워크플로', link: '/ai-workflow/' },
        { text: '사용 가이드', link: '/guide/member' },
      ],
      sidebar: [
        { text: '홈', link: '/' },
        { text: '프로젝트 현황', link: '/status/' },
        {
          text: '기술 문서',
          items: [
            { text: '개요', link: '/tech/' },
            { text: '아키텍처', link: '/tech/architecture' },
            { text: '도메인 정책', link: '/tech/policies' },
            { text: '용어집', link: '/tech/glossary' },
            { text: '에러 코드', link: '/tech/error-codes' },
            { text: '의사결정 기록 (전체)', link: '/tech/decisions' },
            { text: '핵심 결정 20선', link: '/tech/key-decisions' },
            { text: '품질', link: '/tech/quality' },
            {
              text: '하이라이트',
              collapsed: false,
              items: [
                { text: '동시성 제어', link: '/highlights/concurrency' },
                { text: '상태 기반 멱등 배치', link: '/highlights/idempotent-batch' },
                { text: '계약 기반 FE·BE 협업', link: '/highlights/contract' },
                { text: 'UI 감사 파이프라인', link: '/highlights/ui-audit' },
              ],
            },
          ],
        },
        { text: 'AI 협업 워크플로', link: '/ai-workflow/' },
        {
          text: '사용 가이드',
          items: [
            { text: '회원', link: '/guide/member' },
            { text: '관리자', link: '/guide/admin' },
            { text: 'FAQ', link: '/guide/faq' },
          ],
        },
      ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/minsu-zip/gold-wrestling-fe', ariaLabel: 'FE 레포' },
      ],
      outline: { label: '이 페이지', level: [2, 3] },
      docFooter: { prev: '이전', next: '다음' },
      lastUpdated: { text: '마지막 수정' },
      sidebarMenuLabel: '메뉴',
      returnToTopLabel: '맨 위로',
      darkModeSwitchLabel: '테마',
      search: { provider: 'local', options: { translations: { button: { buttonText: '검색', buttonAriaLabel: '검색' }, modal: { noResultsText: '결과 없음', resetButtonTitle: '지우기', footer: { selectText: '선택', navigateText: '이동', closeText: '닫기' } } } } },
      footer: {
        message: '두 레포의 docs/와 .planning/이 정본이고, 이 사이트는 그 요약이다.',
        copyright: 'gold-wrestling · minsu-zip',
      },
    },
    mermaid: {},
    mermaidPlugin: { class: 'mermaid' },
  })
)
