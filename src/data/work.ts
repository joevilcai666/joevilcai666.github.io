// 职业经历数据 —— 替换成你的真实经历即可（每个字段提供中/英文）
import type { Localized } from './i18n';

export interface WorkEntry {
  period: string;
  role: Localized;
  org: Localized;
  current?: boolean;
  summary: Localized;
  highlights: Localized[];
  stack: string[];
}

export const WORK: WorkEntry[] = [
  {
    period: '2024 — 至今 / Present',
    role: { zh: 'AI 应用工程师', en: 'AI Application Engineer' },
    org: { zh: '某 AI 科技公司', en: 'An AI startup' },
    current: true,
    summary: {
      zh: '负责大模型记忆与智能体方向的产品研发，从零构建热路径记忆系统 MemLoom，并主导主流记忆方案（HMS / mem0 / EgoLife）的选型评测。',
      en: 'Building LLM memory and agent infrastructure from the ground up; created MemLoom, a hot-path memory system, and lead the evaluation of mainstream memory solutions (HMS / mem0 / EgoLife).',
    },
    highlights: [
      {
        zh: '设计热路径零 LLM 调用的记忆读写方案，将带记忆对话的额外延迟与成本压到接近零',
        en: 'Designed zero-LLM memory reads/writes on the hot path, cutting added latency and cost of memory-augmented conversations to near zero',
      },
      {
        zh: '建立记忆系统评测框架，覆盖召回率、时延、成本、可运维性四个维度',
        en: 'Built a memory evaluation framework covering recall, latency, cost and operability',
      },
      {
        zh: '沉淀团队内部的智能体记忆接入规范',
        en: 'Defined the team-wide agent memory integration spec',
      },
    ],
    stack: ['LLM Apps', 'RAG', 'Memory', 'Eval', 'Python'],
  },
  {
    period: '2022 — 2024',
    role: { zh: '软件工程师', en: 'Software Engineer' },
    org: { zh: '某互联网公司', en: 'An internet company' },
    summary: {
      zh: '参与核心业务系统的设计与研发，负责服务端架构优化与稳定性建设，开始接触 LLM 应用开发。',
      en: 'Designed and built core business systems; owned backend architecture and reliability, and got started with LLM application development.',
    },
    highlights: [
      {
        zh: '主导某核心服务的重构，接口平均响应时间下降明显',
        en: 'Led the refactoring of a core service, visibly cutting average API latency',
      },
      {
        zh: '搭建线上问题排查与监控告警体系',
        en: 'Built the on-call debugging and monitoring stack',
      },
    ],
    stack: ['Backend', 'System Design', 'Performance'],
  },
  {
    period: '2018 — 2022',
    role: { zh: '计算机科学 · 本科', en: 'B.Sc. in Computer Science' },
    org: { zh: '某大学', en: 'A university' },
    summary: {
      zh: '打下工程与算法基础，毕业设计方向为自然语言处理。',
      en: 'Grounding in engineering and algorithms; capstone in natural language processing.',
    },
    highlights: [],
    stack: [],
  },
];
