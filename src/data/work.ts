// 职业经历数据（中/英双语）
import type { Localized } from './i18n';

export interface WorkEntry {
  period: string;
  role: Localized;
  org: Localized;
  /** 公司/机构小图标（public 下的路径） */
  logo: string;
  /** 公司链接（没有公开站点的可不填） */
  href?: string;
  current?: boolean;
  summary: Localized;
  highlights: Localized[];
  stack: string[];
}

export const WORK: WorkEntry[] = [
  {
    period: '2026.07 — 至今 / Present',
    role: { zh: 'AI 产品负责人', en: 'AI Product Lead' },
    org: { zh: '群忆智能科技（Shadoweave）', en: 'Shadoweave · Agent memory startup' },
    logo: '/logos/shadoweave.png',
    href: 'https://shadoweave.ai',
    current: true,
    summary: {
      zh: '负责 Agent 记忆产品战略，围绕 HMS 框架推进个人记忆产品和企业记忆服务，搭建并管理 5 人产品团队。',
      en: 'Lead product strategy for agent memory, develop personal and enterprise memory products around the HMS framework, and build and manage a five-person product team.',
    },
    highlights: [
      {
        zh: '将 HMS 记忆能力拆解为 Personal Memory Bank 与 B 端记忆服务两条产品线，明确目标客群、场景优先级和阶段路线图，统筹产品定义与交付。',
        en: 'Defined two product lines, Personal Memory Bank and B2B memory services, with target users, scenario priorities, and phased roadmaps. Led product definition and delivery.',
      },
      {
        zh: '对接 AI 角色、陪伴机器人和 AI 穿戴设备领域的 50+ 家潜在客户，开展需求访谈与试用/POC 探索，将偏好记忆、跨会话连续性和记忆迁移需求转化为产品优先级；负责官网、融资 BP 及新智元、量子位 PR 的产品价值表达。',
        en: 'Conducted needs interviews and explored trials/POCs with 50+ prospective customers in AI characters, companion robots, and wearables. Used findings on preference memory, cross-session continuity, and memory migration to set product priorities. Led product messaging for the website, fundraising deck, and PR with Xinzhiyuan and QbitAI.',
      },
      {
        zh: '主导 HMS Elite 产品定义，把偏好更新、历史信息冲突和来源追溯转化为记忆能力需求；结合混合检索、Memory Graph 与上下文编排，设计 Agent 获取当前任务相关记忆的方式。',
        en: 'Led HMS Elite product definition, translating preference updates, conflicting historical information, and source tracing into memory requirements. Designed task-relevant memory access for agents using hybrid retrieval, Memory Graph, and context orchestration.',
      },
      {
        zh: '主导 Personal Memory Bank 产品定义与 MVP 内测，设计飞书数据接入、结构化记忆整理和 Agent 调用流程；推进 HMS Elite 产品化及 B 端 SaaS 雏形，定义从记忆接入到调用的开发者体验。',
        en: 'Led Personal Memory Bank from definition to MVP testing, including Feishu data import, structured memory organization, and agent access. Advanced HMS Elite productization and an early B2B SaaS offering, defining the developer experience from memory ingestion to retrieval.',
      },
      {
        zh: '建立记忆系统评测 SOP，组织 LoCoMo、LongMemEval、EgoLife 基准测试与竞品对比，结合准确性、延迟、成本和错题分析，确定产品迭代与技术优化的优先级。',
        en: 'Established a memory-evaluation SOP covering LoCoMo, LongMemEval, EgoLife, and competitor comparisons. Used accuracy, latency, cost, and error analysis to prioritize product iterations and technical improvements.',
      },
    ],
    stack: ['Agent Memory', 'Product Strategy', 'Team Building', 'AI Evals'],
  },
  {
    period: '2025.12 — 2026.07',
    role: { zh: 'AI 产品负责人', en: 'AI Product Lead' },
    org: { zh: 'Anyway · Agent 支付创业公司', en: 'Anyway · Agent payments startup' },
    logo: '/logos/anyway.svg',
    href: 'https://anyway.sh',
    summary: {
      zh: '负责多币种收款与 Agent 自动付款两条产品线，推动业务从 0 达到 10 万美元年化手续费收入，完成早期付费需求验证。',
      en: 'Led multi-currency collections and autonomous agent-payment products, helping the business grow from zero to US$100,000 in annualized transaction-fee revenue and validate early willingness to pay.',
    },
    highlights: [
      {
        zh: '围绕出海小团队与独立开发者的收款需求，规划 B 端多币种收款与 C 端 Agentic Payment 双产品线；以法币和加密货币收款形成主要收入来源，并探索 Agent 付费调用外部服务的机会。',
        en: 'Planned B2B multi-currency collections and consumer Agentic Payment products for small teams expanding overseas and independent developers. Fiat and crypto collections became the main revenue source, alongside exploration of paid external services for agents.',
      },
      {
        zh: '研究 Stripe、Paddle、Creem 等支付产品与 Agent 钱包方案，针对海外主体、开户和收款门槛，主导收款、钱包及交易管理流程设计；客户包括 3 家年流水达百万美元规模的公司。',
        en: 'Researched Stripe, Paddle, Creem, and agent-wallet solutions. Designed collections, wallet, and transaction-management flows around barriers to overseas entity setup, account opening, and payment collection. Customers included three companies with annual transaction volume at the million-dollar scale.',
      },
      {
        zh: '主导 Agent Wallet 与自动付款方案，围绕付费 API 调用设计支付授权、预算、单笔限额、规则校验和交易追溯，将支付控制嵌入 Agent 工具执行流程。',
        en: 'Led Agent Wallet and autonomous-payment design for paid API calls, covering payment authorization, budgets, per-transaction limits, rule checks, and transaction tracing. Embedded payment controls in agent tool execution.',
      },
      {
        zh: '负责早期团队搭建，推动公司从 3 人扩展至 8 名全职成员；统筹双产品线的需求拆解、版本优先级和交付，协调研发与设计推进从方案到可用产品。',
        en: 'Built the early team, helping the company grow from three to eight full-time members. Coordinated requirements, release priorities, engineering, and design across both product lines, from proposals to usable products.',
      },
    ],
    stack: ['Agent Payments', 'Product Strategy', 'Team Building', 'Early Commercialization'],
  },
  {
    period: '2023.08 — 2025.12',
    role: { zh: 'AI 产品经理', en: 'AI Product Manager' },
    org: { zh: 'Alva · AI 金融工具创业公司', en: 'Alva · AI fintech startup' },
    logo: '/logos/alva.png',
    href: 'https://alva.ai',
    summary: {
      zh: '负责面向海外市场的量化投研 Agent 产品，任职期间产品 DAU 超过 10 万，工作涵盖 Agent 工具、评测和用户体验。',
      en: 'Worked on a quantitative investment-research agent for overseas markets, covering agent tools, evaluations, and user experience. The product exceeded 100,000 daily active users during my tenure.',
    },
    highlights: [
      {
        zh: '围绕美股、期权与加密资产投研，评估并接入 20+ 家数据 API，整理为 150+ 个 Agent 可调用的标准化工具，连接实时数据、投研分析与策略生成。',
        en: 'Evaluated and integrated 20+ data APIs into 150+ standardized tools for agents, connecting real-time data, research, and strategy generation across US equities, options, and crypto assets.',
      },
      {
        zh: '从 0 到 1 建立覆盖数据准确性、多跳推理等 10+ 维度的 Agent 评测体系，通过自动评分与错误分析，推动提示词和工具设计迭代。',
        en: 'Built an agent-evaluation system from scratch across 10+ dimensions, including data accuracy and multi-hop reasoning. Used automated scoring and error analysis to improve prompts and tool design.',
      },
      {
        zh: '在三次产品方向迭代中负责功能迁移，推动产品从加密信息搜索向美股与加密策略工具演进；主导资产详情页、生成步骤与数据来源展示，让用户理解分析依据和生成过程。',
        en: 'Led feature migration through three product-direction changes, from crypto information search toward US-equity and crypto strategy tools. Owned asset-detail pages and the display of generation steps and data sources so users could understand the analysis.',
      },
    ],
    stack: ['AI Evals', 'Agent Tools', 'Data Infra', 'Product Design'],
  },
  {
    period: '2023.04 — 2023.08',
    role: { zh: 'AI 产品实习生', en: 'AI Product Intern' },
    org: { zh: '杭州心识宇宙科技', en: 'Universe of Mind, Hangzhou' },
    logo: '/logos/mindverse.png',
    href: 'https://home.second.me',
    summary: {
      zh: '从 0 到 1 设计 AI 美股分析师，整合行情数据、新闻与报告生成，产品吸引 5,000+ 用户使用。',
      en: 'Designed an AI US-equity analyst from scratch, combining market data, news, and report generation. The product attracted 5,000+ users.',
    },
    highlights: [
      {
        zh: '参与海外用户访谈和增长迭代，根据用户反馈改进产品。',
        en: 'Participated in overseas user interviews and growth iterations, using user feedback to improve the product.',
      },
    ],
    stack: ['AI Agent', 'Prompt Design', 'Growth'],
  },
  {
    period: '2022.09 — 2024.06',
    role: { zh: '公共政策 · 硕士', en: 'Master of Public Policy' },
    org: { zh: '芝加哥大学', en: 'University of Chicago' },
    logo: '/logos/uchicago.png',
    summary: {
      zh: '公共政策硕士，修读数据分析证书；课程涵盖统计分析、机器学习与微观经济学。',
      en: 'Master of Public Policy with a data-analytics certificate. Coursework covered statistical analysis, machine learning, and microeconomics.',
    },
    highlights: [],
    stack: [],
  },
  {
    period: '2018.08 — 2021.12',
    role: { zh: '体育管理 · 本科', en: 'B.Sc. in Sport Administration' },
    org: { zh: '迈阿密大学', en: 'University of Miami' },
    logo: '/logos/miami.png',
    summary: {
      zh: 'GPA 3.95/4.00，专业第一；Magna Cum Laude 荣誉毕业。',
      en: 'GPA 3.95/4.00, top of the class; graduated Magna Cum Laude.',
    },
    highlights: [],
    stack: [],
  },
];
