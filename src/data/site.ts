// 站点全局配置 —— 改这里就能换掉全站的个人信息
export const SITE = {
  cnName: '蔡骥淳',
  enName: 'Joe',
  fullName: '蔡骥淳 Joe Cai',
  title: 'Joe Cai',
  description: '蔡骥淳（Joe）的个人网站 —— AI 工程师，关注大模型记忆系统与智能体基础设施。博客、项目与职业经历。',
  // 社交链接（按需增删）
  elsewhere: [
    { label: 'GitHub', href: 'https://github.com/jichuncai' },
    { label: 'Email', href: 'mailto:joe@example.com' },
    // { label: 'X', href: 'https://x.com/...' },
    // { label: '知乎', href: 'https://www.zhihu.com/people/...' },
  ],
} as const;

// 拼接 base 路径（base 为 '/' 时避免出现 // 双斜杠）
export const withBase = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  return base === '/' ? path : `${base}${path}`;
};
