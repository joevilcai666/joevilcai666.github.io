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
  homeGreeting: string;
  homeDir: string;
  homeFind: string;
  homeWork: string;
  homeProjects: string;
  homeBlog: string;
  workEyebrow: string;
  workTitle: string;
  workSub: string;
  projectsEyebrow: string;
  projectsTitle: string;
  projectsSub: string;
  blogEyebrow: string;
  blogTitle: string;
  blogSub: string;
  postEyebrow: string;
  postBack: string;
  postRss: string;
  translatedTag: string; // 「译」标记
}> = {
  zh: {
    langToggle: 'English',
    htmlLang: 'zh-CN',
    description: '蔡骥淳（Joe）的个人网站 —— AI 工程师，关注大模型记忆系统与智能体基础设施。博客、项目与职业经历。',
    homeGreeting: "Hi, I'm Joe",
    homeDir: '指引',
    homeFind: '找到我',
    homeWork: '职业经历',
    homeProjects: '项目',
    homeBlog: '博客',
    workEyebrow: 'work',
    workTitle: '职业经历',
    workSub: '做过的岗位、负责过的事、走过的路。',
    projectsEyebrow: 'lab',
    projectsTitle: '项目',
    projectsSub: '在做的、做过的，以及还在纸上打磨的。',
    blogEyebrow: 'writing',
    blogTitle: '博客',
    blogSub: '技术笔记与翻译，写给自己，也写给同样在琢磨这些问题的人。',
    postEyebrow: 'post',
    postBack: '← 回到博客',
    postRss: '订阅 RSS',
    translatedTag: '译',
  },
  en: {
    langToggle: '中文',
    htmlLang: 'en',
    description: 'Joe Cai (Cai Jichun) — AI engineer working on LLM memory systems and agent infrastructure. Blog, projects and career.',
    homeGreeting: "Hi, I'm Joe",
    homeDir: 'Explore',
    homeFind: 'Find me',
    homeWork: 'Work',
    homeProjects: 'Projects',
    homeBlog: 'Blog',
    workEyebrow: 'work',
    workTitle: 'Work',
    workSub: 'The roles I held, the things I owned, the road so far.',
    projectsEyebrow: 'lab',
    projectsTitle: 'Projects',
    projectsSub: 'Things in flight, things done, and things still on paper.',
    blogEyebrow: 'writing',
    blogTitle: 'Blog',
    blogSub: 'Technical notes and translations — written for myself, and for anyone puzzling over the same questions.',
    postEyebrow: 'post',
    postBack: '← All posts',
    postRss: 'Subscribe via RSS',
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
