// 站点全局配置 —— 改这里就能换掉全站的个人信息
export const SITE = {
  enName: 'Joe',
  fullName: 'Joe Cai',
  title: 'Joe Cai',
  description: 'Joe Cai 的个人网站：关于产品、创业与创造的想法，以及正在做的产品与开源 Skills。',
  // 社交链接（按需增删）
  elsewhere: [
    { label: 'GitHub', href: 'https://github.com/joevilcai666' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jichun46/' },
    { label: 'Email', href: 'mailto:jichun.cai@outlook.com' },
    // { label: 'X', href: 'https://x.com/...' },
    // { label: '知乎', href: 'https://www.zhihu.com/people/...' },
  ],
} as const;

// 拼接 base 路径（base 为 '/' 时避免出现 // 双斜杠）
export const withBase = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  return base === '/' ? path : `${base}${path}`;
};
