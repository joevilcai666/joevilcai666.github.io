// 项目数据 —— Origin IM / Craft / Prose（信息来自 joevilcai666 的仓库文档）
import type { Localized } from './i18n';

export interface Project {
  id: string;
  name: string;
  status: Localized;
  tagline: Localized;
  description: Localized;
  links?: { label: string; href: string }[];
  stack: string[];
  accent: string; // 卡片字母标的品牌色
}

export const PROJECTS: Project[] = [
  {
    id: 'origin-im',
    accent: '#3d7bd6',
    name: 'Origin IM',
    status: { zh: '规格已确认', en: 'Spec approved' },
    tagline: { zh: 'iMessage 里的私人 AI 管家', en: 'A proactive AI butler living in iMessage' },
    description: {
      zh: '工作、健康、随手想法和长期托付，在同一个 iMessage 对话中自然连续；网页端用于连接数据、查看完整成果与使用长期工具。产品与 v4 交互设计已获确认，进入研发阶段。',
      en: 'Work, health, quick thoughts and long-horizon commitments flow through one continuous iMessage conversation; a companion web app connects data, shows full results and hosts long-term tools. Product and v4 interaction design approved; now entering engineering.',
    },
    stack: ['iMessage', 'AI Agent', '0→1'],
  },
  {
    id: 'craft',
    accent: '#e0862a',
    name: 'Craft',
    status: { zh: '开发中', en: 'In development' },
    tagline: { zh: '本地优先的阅读与写作工具', en: 'Local-first reading & writing' },
    description: {
      zh: '帮你读懂资料、理清思路、用自己的话写出想法。Mac 优先、本地优先：本地读写、笔记、搜索与导出免费，付费只覆盖跨设备同步与托管 AI。',
      en: 'Understand what you read, think it through, and write in your own words. Mac-first and local-first: reading, writing, notes, search and export are free; only cross-device sync and hosted AI are paid.',
    },
    stack: ['macOS', 'Local-first', 'Reading / Writing'],
  },
  {
    id: 'prose',
    accent: '#8a6fd1',
    name: 'Prose',
    status: { zh: '首版规划中', en: 'First version planned' },
    tagline: { zh: '面向产品负责人的文字规则编辑器', en: 'Plain-language rules for software' },
    description: {
      zh: '让不写代码的产品负责人持续读懂、修改并验证软件。独立 macOS App，用代码编辑器式交互维护 Markdown 功能规则，保留可纠正的理解与运行证据；首版完整支持 Craft 的导出旅程。',
      en: 'Lets product leads who don\'t write code keep reading, modifying and verifying real software. A standalone macOS app with code-editor-style interaction over Markdown feature rules, keeping correctable understanding and run evidence; first version fully supports Craft\'s export journeys.',
    },
    stack: ['macOS', 'Rules as Code', 'Code-OSS'],
  },
];
