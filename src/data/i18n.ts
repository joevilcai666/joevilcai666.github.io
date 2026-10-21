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
  projectsSub: string;
  blogTitle: string;
  blogSub: string;
  backLabel: string; // 内页左上角返回链接
  more: string; // 「更多」链接
  postEyebrow: string;
  postBack: string;
  postRss: string;
  translatedTag: string; // 「译」标记
}> = {
  zh: {
    langToggle: 'EN',
    htmlLang: 'zh-CN',
    description: '蔡骥淳（Joe）的个人网站 —— AI Agent 方向产品负责人，专注 Agent 基础设施与商业化落地。博客、项目与职业经历。',
    tagline: 'AI Agent 方向产品负责人 / product lead',
    aboutTitle: '关于',
    portfolioTitle: '项目',
    writingTitle: '写作',
    workTitle: '职业经历',
    workRange: '2019 — 至今',
    workSub: '做过的岗位、负责过的事、走过的路。',
    projectsTitle: '项目',
    projectsSub: '在做的、做过的，以及还在纸上打磨的。',
    blogTitle: '博客',
    blogSub: '技术笔记与翻译，写给自己，也写给同样在琢磨这些问题的人。',
    backLabel: '← 返回',
    more: '全部文章 →',
    postEyebrow: 'post',
    postBack: '← 回到博客',
    postRss: 'RSS',
    translatedTag: '译',
  },
  en: {
    langToggle: '中',
    htmlLang: 'en',
    description: 'Joe Cai (Cai Jichun) — product lead for AI agent infrastructure and commercialization. Blog, projects and career.',
    tagline: 'building products for the agent age',
    aboutTitle: 'About',
    portfolioTitle: 'Projects',
    writingTitle: 'Writing',
    workTitle: 'Work',
    workRange: '2019 — Present',
    workSub: 'The roles I held, the things I owned, the road so far.',
    projectsTitle: 'Projects',
    projectsSub: 'Things in flight, things done, and things still on paper.',
    blogTitle: 'Blog',
    blogSub: 'Technical notes and translations — written for myself, and for anyone puzzling over the same questions.',
    backLabel: '← Back',
    more: 'All posts →',
    postEyebrow: 'post',
    postBack: '← All posts',
    postRss: 'RSS',
    translatedTag: '译',
  },
};

// ---------- 语言路由 ----------
// 判断路径是否为英文版
const isEnPath = (p: string) => p === '/en' || p.startsWith('/en/');

// 给定当前路径与语言，返回另一语言版本的路径
// 博客文章只有中文版，对侧统一落到博客索引页
export const counterpartPath = (path: string, lang: Lang): string => {
  const zhPath = isEnPath(path)
    ? path === '/en' || path === '/en/'
      ? '/'
      : path.slice(3) || '/'
    : path;

  // 文章页（/blog/<slug>/）没有英文版，对侧指向博客列表
  const zhTarget = /^\/blog\/.+/.test(zhPath) ? '/blog/' : zhPath;
  return lang === 'zh' ? `/en${zhTarget === '/' ? '/' : zhTarget}` : zhTarget;
};

// 该路径是否存在对侧语言版本（用于 hreflang）
export const hasCounterpart = (path: string): boolean => {
  const zhPath = isEnPath(path)
    ? path === '/en' || path === '/en/'
      ? '/'
      : path.slice(3) || '/'
    : path;
  return ['/', '/work', '/projects', '/blog', '/blog/'].includes(zhPath);
};
