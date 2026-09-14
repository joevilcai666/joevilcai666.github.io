// 项目数据 —— 替换成你的真实项目
export interface Project {
  id: string;
  name: string;
  status: '进行中' | '原型' | '持续更新';
  tagline: string;
  description: string;
  links?: { label: string; href: string }[];
  stack: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'memloom',
    name: 'MemLoom',
    status: '进行中',
    tagline: '热路径零 LLM 的记忆系统',
    description:
      '让智能体在对话之外「记得住、想得起、用得上」。把 LLM 从记忆读写的热路径上挪出去，用结构化的记忆操作换取接近零的额外延迟与成本；沉淀了完整的构建、迭代与实测报告。',
    stack: ['记忆系统', 'LLM 应用', '评测'],
  },
  {
    id: 'memory-reviews',
    name: '记忆系统评测系列',
    status: '持续更新',
    tagline: 'HMS · mem0 · EgoLife 全景对比',
    description:
      '对主流大模型记忆方案做的产品决策级深度拆解：从召回质量、时延成本、可运维性到适用场景，用同一套框架横向评测，结论持续更新。',
    stack: ['评测', '产品决策', 'mem0', 'HMS'],
  },
  {
    id: 'letter',
    name: '回信',
    status: '原型',
    tagline: '信纸美学的微信小程序',
    description:
      '一个慢节奏的书信小程序低保真原型：信纸米白、墨色文字、封蜡红作唯一强调色。探索「即时通讯时代的慢对话」这一命题。',
    stack: ['微信小程序', '原型设计', 'UI'],
  },
];
