// 职业经历数据（中/英双语）
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
    period: '2025.12 — 至今 / Present',
    role: { zh: '产品负责人', en: 'Product Lead' },
    org: { zh: 'Anyway · Agent 支付创业公司', en: 'Anyway · Agent payments startup' },
    current: true,
    summary: {
      zh: '从 0 到 1 主导构建「Agent 时代的支付网络」：围绕 Traces / Products / Orders / Wallets 打通 Agent 的「行为记录 → 商品定义 → 订单结算 → 多轨支付」全链路，让每一个 Agent 都能安全、可审计地收款、付款、对账与验收。',
      en: 'Building the payment network for the agent age from 0 to 1 — a full pipeline across Traces / Products / Orders / Wallets that lets every agent accept, send, reconcile and verify payments safely and auditably.',
    },
    highlights: [
      {
        zh: '提出「Traces as the new Receipt」：把 Agent 执行过程结构化为可验证的支付凭证，在 Stripe ACP、Google AP2、Coinbase x402 等协议分裂的竞争中确立差异化定位',
        en: 'Proposed "Traces as the new Receipt" — structuring agent execution into verifiable payment receipts, a differentiated position amid fragmented protocols (Stripe ACP / Google AP2 / Coinbase x402)',
      },
      {
        zh: '主导收款与钱包产品：Payment Link 支持 One-time / Subscription / Usage-based 计费与 AI 定价；Agent Wallet 落地 Stripe Connect 法币 + USDC on Base 稳定币双轨，PolicyGuard 让 Agent 在受控边界内自主付款',
        en: 'Owned monetization and wallet products: Payment Links with one-time / subscription / usage-based billing and AI pricing; Agent Wallet with dual-rail Stripe Connect + USDC on Base settlement, plus PolicyGuard controls for autonomous agent payments',
      },
      {
        zh: '定义 Freemium + Subscription + Take rate 三段式收入模型，以及 GMV、A2A 调用笔数、Trace 覆盖率、验收成功率等北极星指标',
        en: 'Defined the freemium + subscription + take-rate revenue model and north-star metrics (GMV, A2A calls, trace coverage, acceptance rate)',
      },
    ],
    stack: ['Agent Payments', 'Product Strategy', '0→1', 'Fintech'],
  },
  {
    period: '2023.08 — 2025.12',
    role: { zh: 'AI 产品经理', en: 'AI Product Manager' },
    org: { zh: 'Alva · AI 金融工具创业公司', en: 'Alva · AI fintech startup' },
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
    summary: {
      zh: 'GPA 3.95 / 4.00（专业第一），Magna Cum Laude 荣誉毕业生，入选校长嘉奖榜与院长嘉奖榜。',
      en: 'GPA 3.95/4.00 (top of class); Magna Cum Laude graduate with President\u2019s List and Dean\u2019s List honors.',
    },
    highlights: [],
    stack: [],
  },
];
