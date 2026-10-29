import type { Localized } from './i18n';

export interface SkillProject {
  id: string;
  name: string;
  /** Name declared by SKILL.md; repository names may use a different suffix. */
  skillName: string;
  tagline: Localized;
  description: Localized;
  href: string;
  attribution: Localized;
  install: string;
  release?: string;
  license: string;
  /** An illustrative document preview, not a screenshot or a measured result. */
  preview: {
    filename: string;
    heading: Localized;
    steps: Localized[];
  };
}

/** Public packages published by Joe. Descriptions cover intended use, not measured user outcomes. */
export const SKILLS: SkillProject[] = [
  {
    id: 'writing-doc',
    name: 'writing-doc',
    skillName: 'writing-doc',
    tagline: { zh: '把文档写到读者能理解、能行动', en: 'Documentation readers can understand and use' },
    description: {
      zh: '为 README、操作指南和技术说明提供写作与审阅方法。从读者要完成的任务出发，先给答案，保留必要事实、步骤和验证方法，删掉没有帮助的铺垫。',
      en: 'A writing and review skill for READMEs, guides, and technical explanations. Start with the reader’s task, put the answer first, preserve essential facts and checks, and remove unhelpful filler.',
    },
    href: 'https://github.com/joevilcai666/writing-doc-skill',
    attribution: { zh: 'Joe 发布 · 开源 Skill', en: 'Published by Joe · Open-source skill' },
    install: 'npx skills add joevilcai666/writing-doc-skill --skill writing-doc',
    release: 'v0.1.0',
    license: 'MIT',
    preview: {
      filename: 'README.md',
      heading: { zh: '写给需要答案的人', en: 'Write for the reader' },
      steps: [
        { zh: '从读者的任务出发', en: 'Start with the reader’s task' },
        { zh: '先给答案', en: 'Put the answer first' },
        { zh: '让下一步清楚可行', en: 'Make the next step clear' },
      ],
    },
  },
  {
    id: 'how-it-works',
    name: 'how-it-works',
    skillName: 'how-it-works',
    tagline: { zh: '让产品负责人看懂代码背后的真实产品', en: 'Make the current product understandable from its code' },
    description: {
      zh: '读取代码与已有运行证据，生成并维护 HOW_IT_WORKS.md。用流程图解释用户请求如何变成结果，区分代码实现、本地测试、真实运行和用户验收，让产品说明跟上变化。',
      en: 'Create and maintain HOW_IT_WORKS.md from code and available runtime evidence. Use diagrams to trace a request to its result, and distinguish implementation, local tests, real operation, and user acceptance.',
    },
    href: 'https://github.com/joevilcai666/how-it-works-skill',
    attribution: { zh: 'Joe 发布 · 开源 Skill', en: 'Published by Joe · Open-source skill' },
    install: 'npx skills add joevilcai666/how-it-works-skill --skill how-it-works',
    release: 'v0.1.1',
    license: 'MIT',
    preview: {
      filename: 'HOW_IT_WORKS.md',
      heading: { zh: '这个产品如何工作', en: 'How this product works' },
      steps: [
        { zh: '读取代码与运行证据', en: 'Read the code and evidence' },
        { zh: '解释当前真实流程', en: 'Explain the actual flow' },
        { zh: '区分实现与验证', en: 'Separate implementation from proof' },
      ],
    },
  },
  {
    id: 'product-prototype',
    name: 'product-prototype',
    skillName: 'product-prototype',
    tagline: { zh: '把产品想法做成可以体验的原型', en: 'Turn a product idea into an interactive prototype' },
    description: {
      zh: '围绕同一个核心任务，默认探索三种有实质差异的设计方向。连接关键交互，在本地预览中比较、检查和迭代，先体验产品，再决定如何实现。',
      en: 'Explore three meaningfully different design directions around the same core task. Connect key interactions, then compare, inspect, and refine them in a local preview before committing to implementation.',
    },
    href: 'https://github.com/joevilcai666/product-prototype-skill',
    attribution: { zh: 'Joe 发布 · 开源 Skill', en: 'Published by Joe · Open-source skill' },
    install: 'git clone https://github.com/joevilcai666/product-prototype-skill.git ~/.agents/skills/product-prototype',
    license: 'MIT',
    preview: {
      filename: 'prototype.html',
      heading: { zh: '先体验，再决定', en: 'Try it before you decide' },
      steps: [
        { zh: '围绕同一核心任务', en: 'Start with one core task' },
        { zh: '比较三种设计方向', en: 'Compare three design directions' },
        { zh: '在本地检查与迭代', en: 'Inspect and refine locally' },
      ],
    },
  },
  {
    id: 'google-ads',
    name: 'google-ads',
    skillName: 'google-ads-setup',
    tagline: { zh: '把广告账户配置变成可执行的流程', en: 'A repeatable workflow for Google Ads setup' },
    description: {
      zh: '把 Google Ads API 接入、MCC 子账户、账单配置和状态核验整理成 Agent 可遵循的流程，结合 API 读取与浏览器操作。目前是公开实验项目，仍需账户授权与必要的人工确认。',
      en: 'Guide an agent through Google Ads API access, MCC subaccounts, billing setup, and account checks, combining API reads with browser actions. A public experiment that still needs account authorization and human confirmation where required.',
    },
    href: 'https://github.com/joevilcai666/google-ads-skill',
    attribution: { zh: 'Joe 发布 · 实验性 Skill', en: 'Published by Joe · Experimental skill' },
    install: 'git clone https://github.com/joevilcai666/google-ads-skill.git ~/.agents/skills/google-ads-setup',
    license: 'MIT',
    preview: {
      filename: 'SKILL.md',
      heading: { zh: '逐步准备广告账户', en: 'Prepare an ad account, step by step' },
      steps: [
        { zh: '检查 API 与账户权限', en: 'Check API and account access' },
        { zh: '准备子账户与账单配置', en: 'Prepare account and billing setup' },
        { zh: '逐项核验账户状态', en: 'Verify the account state' },
      ],
    },
  },
];
