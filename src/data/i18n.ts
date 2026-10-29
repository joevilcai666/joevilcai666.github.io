// 中英双语文案与路由工具
// 中文在根路径（/、/work、/projects、/blog），英文在 /en/ 前缀下
export type Lang = 'zh' | 'en';

export interface Localized {
  zh: string;
  en: string;
}

export const t = (item: Localized, lang: Lang): string => item[lang];

// ---------- 界面文案 ----------
export const UI: Record<Lang, {
  langToggle: string; // 切到另一种语言的链接文字
  langSwitchLabel: string;
  emailLabel: string;
  contactLabel: string;
  navigationLabel: string;
  present: string;
  htmlLang: string;
  description: string;
  tagline: string; // 名字下方的 mono 副题
  aboutTitle: string;
  portfolioTitle: string;
  writingTitle: string;
  workTitle: string;
  workRange: string;
  workSub: string;
  projectsTitle: string;
  blogTitle: string;
  blogSub: string;
  blogEmpty: string;
  backLabel: string; // 内页左上角返回链接
  more: string; // 「更多」链接
  postEyebrow: string;
  postBack: string;
  postRss: string;
  translatedTag: string; // 「译」标记
}> = {
  zh: {
    langToggle: 'EN',
    langSwitchLabel: '切换到英文',
    emailLabel: '邮件',
    contactLabel: '社交与联系',
    navigationLabel: '内容导航',
    present: '至今',
    htmlLang: 'zh-CN',
    description: 'Joe Cai 的个人网站：关于产品、创业与创造的想法，以及正在做的产品与开源 Skills。',
    tagline: 'AI Agent 方向产品负责人 / product lead',
    aboutTitle: '关于',
    portfolioTitle: '项目',
    writingTitle: '写作',
    workTitle: '职业经历',
    workRange: '2019 — 至今',
    workSub: '做过的岗位、负责过的事、走过的路。',
    projectsTitle: '项目',
    blogTitle: '博客',
    blogSub: '关于产品、创业，以及人与环境的思考。',
    blogEmpty: '还没有文章。',
    backLabel: '← 返回',
    more: '全部文章 →',
    postEyebrow: 'post',
    postBack: '← 回到博客',
    postRss: 'RSS',
    translatedTag: '译',
  },
  en: {
    langToggle: '中文',
    langSwitchLabel: 'Switch to Chinese',
    emailLabel: 'Email',
    contactLabel: 'Connect',
    navigationLabel: 'Content navigation',
    present: 'Present',
    htmlLang: 'en',
    description: 'Joe Cai’s thoughts on products, startups, and making things, alongside current products and open-source skills.',
    tagline: 'building products for the agent age',
    aboutTitle: 'About',
    portfolioTitle: 'Projects',
    writingTitle: 'Writing',
    workTitle: 'Work',
    workRange: '2019 — Present',
    workSub: 'The roles I held, the things I owned, the road so far.',
    projectsTitle: 'Projects',
    blogTitle: 'Blog',
    blogSub: 'Thoughts on products, startups, people, and the environments we create.',
    blogEmpty: 'No posts yet.',
    backLabel: '← Back',
    more: 'All posts →',
    postEyebrow: 'post',
    postBack: '← All posts',
    postRss: 'RSS',
    translatedTag: 'Translation',
  },
};

// ---------- 语言路由 ----------
// 判断路径是否为英文版
const isEnPath = (p: string) => p === '/en' || p.startsWith('/en/');

// 给定当前路径与语言，返回另一语言版本的路径
// 保留当前页面与文章 slug，切换至对应翻译。
export const counterpartPath = (path: string, lang: Lang): string => {
  const zhPath = isEnPath(path)
    ? path === '/en' || path === '/en/'
      ? '/'
      : path.slice(3) || '/'
    : path;

  return lang === 'zh' ? `/en${zhPath === '/' ? '/' : zhPath}` : zhPath;
};

// 该路径是否存在对侧语言版本（用于 hreflang）
export const hasCounterpart = (path: string): boolean => {
  const zhPath = isEnPath(path)
    ? path === '/en' || path === '/en/'
      ? '/'
      : path.slice(3) || '/'
    : path;
  const normalized = zhPath.replace(/\/+$/, '') || '/';
  return ['/', '/work', '/projects', '/blog'].includes(normalized)
    || /^\/(blog|projects)\/[^/]+$/.test(normalized);
};
