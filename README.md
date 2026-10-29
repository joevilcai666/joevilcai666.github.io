# Joe Cai 的个人网站

双语个人网站，展示产品、公开 AI Skills、职业经历和三篇随笔。使用 Astro 生成静态页面，首页通过 React 和 Motion 提供正文胶囊展开、连接线和内容聚焦。支持浅色、深色和减少动态效果。

产品当前行为、验证范围与限制见 [HOW_IT_WORKS.md](HOW_IT_WORKS.md)。产品与设计约定见 [PRODUCT.md](PRODUCT.md) 和 [DESIGN.md](DESIGN.md)。

## 本地开发

使用 Node 24 和 npm。

```bash
npm ci
npm run dev
npm test
npx tsc --noEmit
npm run preview
```

开发地址为 `http://127.0.0.1:4321/`。`npm test` 构建网站并运行双语页面、项目、博客与 RSS 的检查。`npm run preview` 预览 `dist/` 中的构建产物。

## 发布

- 源码仓库：`joevilcai666/joevilcai666.github.io`，分支 `main`。
- 正式地址：<https://joevilcai666.github.io/>。
- 推送 `main` 后，现有发布流程由本机自托管 runner 构建。其注册范围是上述仓库，目录为 `~/actions-runner/website-runner`。
- `.github/workflows/deploy.yml` 执行 `npm ci` 和 `npm run build`，将静态产物发布到 `gh-pages`。GitHub Pages 从该分支根目录提供网站。
- 发布验证须在准确提交上运行本地检查，并核对正式地址的实际内容。runner 服务运行、GitHub Actions 状态或计费信息都不能代替验证。

不要在日常源码推送中手动强推 `main`。正式站点尚未显示新版时，分别检查本机 runner 的实际工作、`gh-pages` 内容和公开页面缓存。

## 内容位置

| 内容 | 文件 |
| --- | --- |
| 首页自述与胶囊交互 | `src/components/HomeExperience.tsx` |
| 项目与双语介绍 | `src/data/projects.ts` |
| AI Skills 与 GitHub 链接 | `src/data/skills.ts` |
| 职业经历 | `src/data/work.ts` |
| 全站信息与双语文案 | `src/data/site.ts`、`src/data/i18n.ts` |
| 中文文章与英文对应稿 | `src/content/blog/`、`src/content/blog-en/` |
| 页面主题与排版 | `src/styles/portfolio.css` |
| 页面、详情和文章布局 | `src/pages/`、`src/components/bodies/`、`src/layouts/` |
| 项目封面与 Health 交互演示 | `public/projects/`、`public/prototypes/origin-health/` |

首页、列表与详情共用项目数据。新文章以同名文件提供中英文版本；标记 `draft: true` 的文章不发布。文章日期为作者选择的展示日期。

Health 演示来自认可的中文原型，英文详情也使用同一演示。演示只保存独立的本地状态，不连接真实健康、AI、支付或用户账户。第三方许可随静态资源保留。

本机研究记录、浏览器检查截图、会话日志和早期临时原型不是网站发布内容。IMA 凭据位于仓库外，访客不会连接 IMA。
