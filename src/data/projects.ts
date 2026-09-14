// 项目数据 —— 替换成你的真实项目（每个字段提供中/英文）
import type { Localized } from './i18n';

export interface Project {
  id: string;
  name: string;
  status: Localized;
  tagline: Localized;
  description: Localized;
  links?: { label: string; href: string }[];
  stack: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'memloom',
    name: 'MemLoom',
    status: { zh: '进行中', en: 'In progress' },
    tagline: { zh: '热路径零 LLM 的记忆系统', en: 'A memory system with zero LLM calls on the hot path' },
    description: {
      zh: '让智能体在对话之外「记得住、想得起、用得上」。把 LLM 从记忆读写的热路径上挪出去，用结构化的记忆操作换取接近零的额外延迟与成本；沉淀了完整的构建、迭代与实测报告。',
      en: 'Letting agents remember beyond a single conversation — recall, retrieve, and actually use. Moves LLMs off the memory read/write hot path, trading generative summarization for structured operations at near-zero added latency and cost; includes full build, iterate and benchmark reports.',
    },
    stack: ['Memory', 'LLM Apps', 'Eval'],
  },
  {
    id: 'memory-reviews',
    name: 'Memory System Reviews',
    status: { zh: '持续更新', en: 'Ongoing' },
    tagline: { zh: 'HMS · mem0 · EgoLife 全景对比', en: 'Side-by-side deep dives: HMS · mem0 · EgoLife' },
    description: {
      zh: '对主流大模型记忆方案做的产品决策级深度拆解：从召回质量、时延成本、可运维性到适用场景，用同一套框架横向评测，结论持续更新。',
      en: 'Product-decision-grade teardowns of mainstream LLM memory solutions: recall quality, latency and cost, operability, and fit — all benchmarked under one framework, with conclusions updated continuously.',
    },
    stack: ['Eval', 'Product', 'mem0', 'HMS'],
  },
  {
    id: 'letter',
    name: '回信 · Reply',
    status: { zh: '原型', en: 'Prototype' },
    tagline: { zh: '信纸美学的微信小程序', en: 'A WeChat mini-program with letter-paper aesthetics' },
    description: {
      zh: '一个慢节奏的书信小程序低保真原型：信纸米白、墨色文字、封蜡红作唯一强调色。探索「即时通讯时代的慢对话」这一命题。',
      en: 'A lo-fi prototype of a slow-paced letter mini-program: paper white, ink text, sealing-wax red as the only accent. An exploration of slow conversation in the age of instant messaging.',
    },
    stack: ['WeChat Mini Program', 'Prototyping', 'UI'],
  },
];
