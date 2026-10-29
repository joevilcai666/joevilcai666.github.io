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
    role: { zh: '产品负责人', en: 'Product Lead' },
    org: { zh: '群忆智能科技（Shadoweave）', en: 'Shadoweave · Agent memory startup' },
    logo: '/logos/shadoweave.png',
    href: 'https://shadoweave.ai',
    current: true,
    summary: {
      zh: '在 Agent 记忆基础设施创业公司，从 0 到 1 搭建产品团队，负责产品战略，推进个人记忆产品与面向开发者的记忆服务。',
      en: 'Built a product team from scratch at an agent-memory startup, owning product strategy across personal memory and developer-facing memory services.',
    },
    highlights: [
      {
        zh: '招聘并管理 5 名产品团队成员，制定阶段目标和执行计划；负责官网、融资材料与产品对外表达。',
        en: 'Recruited and managed five product-team members, defined milestones and delivery plans, and led the website, fundraising materials, and product communication.',
      },
      {
        zh: '主导 Personal Memory Bank 从产品定义到 MVP 内测，设计飞书资料接入、记忆整理与 Agent 调用流程。',
        en: 'Led Personal Memory Bank from product definition to MVP testing, covering Feishu data import, memory organization, and agent access.',
      },
      {
        zh: '推进 HMS Elite 产品化与 B 端 SaaS 雏形，围绕 AI 角色、陪伴机器人和 AI 穿戴设备，与 50+ 家潜在客户开展需求沟通及试用/POC 探索；尚未完成正式客户接入。',
        en: 'Developed the product direction for HMS Elite and an early B2B SaaS offering. Explored needs and trials/POCs with 50+ prospective customers across AI characters, companion robots, and wearables; formal customer integrations were not yet complete.',
      },
      {
        zh: '制定记忆评测流程，组织 LoCoMo、LongMemEval、EgoLife 基准与竞品对比，用准确性、延迟、成本和错题分析确定迭代重点。',
        en: 'Defined memory-evaluation workflows and organized LoCoMo, LongMemEval, EgoLife, and competitor comparisons, using accuracy, latency, cost, and error analysis to set priorities.',
      },
    ],
    stack: ['Agent Memory', 'Product Strategy', 'Team Building', 'AI Evals'],
  },
  {
    period: '2025.12 — 2026.07',
    role: { zh: '产品负责人', en: 'Product Lead' },
    org: { zh: 'Anyway · Agent 支付创业公司', en: 'Anyway · Agent payments startup' },
    logo: '/logos/anyway.svg',
    href: 'https://anyway.sh',
    summary: {
      zh: '负责早期团队搭建与支付产品，帮助公司从 3 人扩展到 8 名全职成员，推动业务从 0 达到 10 万美元年化手续费收入，验证早期付费需求。',
      en: 'Built the early team and payment products, helping the company grow from three to eight full-time members and from zero to US$100,000 in annualized transaction-fee revenue, validating early willingness to pay.',
    },
    highlights: [
      {
        zh: '面向尚无海外主体的小团队和独立开发者，主导法币与加密货币多币种收款产品，构成公司主要收入来源。',
        en: 'Led multi-currency fiat and crypto collections for small teams and independent developers without an overseas entity, forming the main source of revenue.',
      },
      {
        zh: '主导个人 Agent 自动付款产品，通过钱包、支付授权和风控规则，让 Agent 在用户设定的边界内付款，并保留可追溯交易记录。',
        en: 'Led autonomous agent-payment design across wallets, payment authorization, and risk controls, with user-defined limits and traceable transaction records.',
      },
    ],
    stack: ['Agent Payments', 'Team Building', 'Early Commercialization'],
  },
  {
    period: '2023.08 — 2025.12',
    role: { zh: 'AI 产品经理', en: 'AI Product Manager' },
    org: { zh: 'Alva · AI 金融工具创业公司', en: 'Alva · AI fintech startup' },
    logo: '/logos/alva.png',
    href: 'https://alva.ai',
    summary: {
      zh: '从 0 到 1 打造「金融投研版 Cursor」，主导底层工具与数据架构的 Agent 化改造、AI 评测体系（AI Evals）搭建与 C 端体验设计，系统性解决 Agent 在专业领域「幻觉多、逻辑黑盒、数据不可追溯」的痛点。',
      en: 'Built a "Cursor for investment research" from 0 to 1 — agentic tooling and data infrastructure, an AI evaluation system (AI Evals), and consumer UX that tackled hallucination, black-box reasoning and untraceable data in professional finance.',
    },
    highlights: [
      {
        zh: '评估并接入 20+ 家外部数据 API，重构为 150+ 个标准化工具，覆盖美股、期权、加密货币等多市场数据',
        en: 'Evaluated and integrated 20+ external data APIs, refactored into 150+ standardized tools across equities, options and crypto markets',
      },
      {
        zh: '从 0 到 1 搭建 AI Evals 评测体系：覆盖数据准确性、多跳推理等 10+ 维度，用自动打分闭环反向优化提示词与工具设计',
        en: 'Built AI Evals from scratch across 10+ dimensions (data accuracy, multi-hop reasoning, and more), with an auto-scoring loop that fed back into prompts and tool design',
      },
      {
        zh: '主导资产详情页从 0 到 1 设计与生成内容「白盒化」，并在公司向「美股 + 加密策略工具」的三次转型中主导新旧功能迁移',
        en: 'Led the asset-detail page from 0 to 1 and white-box answer UX, and steered feature migration through three pivots toward a US-equities + crypto strategy tool',
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
      zh: '从 0 设计 AI Agent 美股分析师产品：结合数据 API、平台功能与提示词工程，让 Agent 自动收集分析市场数据并生成投研报告，吸引 5000+ 用户使用。',
      en: 'Designed an AI-agent equity-analyst product from 0 — combining data APIs, platform features and prompt engineering so the agent could gather and analyze market data and write research reports, attracting 5,000+ users.',
    },
    highlights: [
      {
        zh: '深度参与产品海外 0→1 增长：以用户访谈与数据分析（Google Analytics / Superset）驱动功能与内容迭代',
        en: 'Helped drive the product\u2019s 0→1 overseas growth, iterating on features and content through user interviews and analytics (Google Analytics / Superset)',
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
      zh: '公共政策硕士，修读数据分析证书：统计分析（R 语言）、大数据与机器学习、中级微观经济学。',
      en: 'Master\u2019s in public policy with a data-analytics certificate: statistical analysis (R), big data & machine learning, and intermediate microeconomics.',
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
      zh: 'GPA 3.95 / 4.00（专业第一），Magna Cum Laude 荣誉毕业生，入选校长嘉奖榜与院长嘉奖榜。',
      en: 'GPA 3.95/4.00 (top of class); Magna Cum Laude graduate with President\u2019s List and Dean\u2019s List honors.',
    },
    highlights: [],
    stack: [],
  },
];
