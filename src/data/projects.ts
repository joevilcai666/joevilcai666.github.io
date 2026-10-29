// 个人项目；Origin 的官网与原型素材来自 origin.town。origin-im 保留为旧链接标识。
import type { Localized } from './i18n';

export interface Project {
  id: string;
  name: string;
  preview: string;
  previews?: string[];
  prototype?: string;
  tagline: Localized;
  description: Localized;
  links?: { label: string; href: string }[];
  stack: string[];
  accent: string; // 卡片字母标的品牌色
}

export const PROJECTS: Project[] = [
  {
    id: 'origin-im',
    preview: '/projects/origin-im-prototype.png',
    accent: '#3d7bd6',
    name: 'Origin AI',
    tagline: { zh: 'iMessage 里的私人 AI 助手', en: 'A personal AI assistant in iMessage' },
    description: {
      zh: '很多日常小事本身不难，却要一直记着、追着办，我不想把精力耗在这里。我在做 Origin AI，希望和我一样被杂事打断的人，能在 iMessage 里交代一件事，去忙自己的事，再回来查看结果。',
      en: 'Small everyday tasks can take more attention to remember and follow up on than they take to do. I am building Origin AI for people like me who want to hand something over in iMessage, get on with their day, and come back to the result.',
    },
    links: [{label: 'origin.town', href: 'https://www.origin.town'}],
    stack: ['iMessage', 'AI Agent', '0→1'],
  },
  {
    id: 'origin-health',
    name: 'Origin Health',
    preview: '/projects/origin-health-home.png',
    previews: ['/projects/origin-health-home.png', '/projects/origin-health-growth.png'],
    prototype: '/prototypes/origin-health/index.html',
    accent: '#4a7159',
    tagline: { zh: '找到适合自己的健康节奏', en: 'A healthier life, in your own way' },
    description: {
      zh: '想把身体照顾好，却不知道每天该怎么吃、怎么练、怎么睡。Origin Health 帮你把这些事安排进生活，记录每天的变化，没时间或状态不好时也能调整计划。',
      en: 'You want to take better care of yourself, but need help deciding what to eat, how to exercise, and when to sleep. Origin Health helps you plan your day, keep a record, and adjust when time or energy runs short.',
    },
    links: [{label: 'origin.town', href: 'https://www.origin.town/health/'}],
    stack: ['Health', 'Daily habits', 'Social'],
  },
  {
    id: 'craft',
    preview: '/projects/craft-prototype.png',
    accent: '#e0862a',
    name: 'Craft',
    tagline: { zh: '能对着原文提问的阅读与写作工具', en: 'Read, ask questions, and write with your sources close by' },
    description: {
      zh: '我喜欢阅读，遇到不理解的地方想问明白，有了想法也想接着写下来。Craft 是为这样的读者做的：对着原文提问、做笔记，写作时随时回看材料。',
      en: 'I like to read, ask about what I do not understand, and write down the ideas that come to me. Craft is for readers who want to do the same: ask questions about a passage, take notes, and return to the source as they write.',
    },
    stack: ['macOS', 'Local-first', 'Reading / Writing'],
  },
  {
    id: 'prose',
    preview: '/projects/prose-prototype.png',
    accent: '#8a6fd1',
    name: 'Prose',
    tagline: { zh: '用文字读懂、修改和检查软件', en: 'Understand, change, and check software through writing' },
    description: {
      zh: '和编程 agent 做产品时，我花了不少时间反复解释需求、排查问题。所以我在做 Prose，让不写代码的产品负责人能用文字描述产品的工作方式，核对 AI 的理解，并检查修改后的实际结果。',
      en: 'When I work on products with coding agents, I spend a lot of time explaining requirements again and working through problems. I am building Prose so product leads who do not write code can describe how their software should work, review the AI\'s understanding, and check the actual result of a change.',
    },
    stack: ['macOS', 'Rules as Code', 'Code-OSS'],
  },
];
