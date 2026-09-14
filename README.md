# 蔡骥淳 · Joe 的个人网站

极简个人网站：博客、项目、职业经历。基于 [Astro](https://astro.build) 构建，部署在 GitHub Pages。

设计：纸·墨·封蜡 —— 暖纸白底、墨色文字、封蜡红唯一强调色，「骥」字印章为站标；自动适配深色模式；字体自托管（国内外访问均不受第三方 CDN 影响）。

## 本地开发

```bash
npm install
npm run dev       # 开发服务器 http://localhost:4321
npm run build     # 构建到 dist/
npm run preview   # 本地预览构建产物
```

## 部署架构（当前已上线）

- **仓库**：`joevilcai666/joevilcai666.github.io`（用户站点，网址 `https://joevilcai666.github.io/`）
- **构建**：推送到 `main` 后，由**本机自托管 runner**（`~/actions-runner/website-runner`，launchd 常驻服务
  `com.github.actions-runner.website`）执行 `.github/workflows/deploy.yml`：
  `npm ci` → `npm run build` → 将 `dist/` 强推到 `gh-pages` 分支
- **发布**：GitHub Pages 从 `gh-pages` 分支根目录发布
- **不使用** GitHub 托管的 Actions 虚拟机，构建完全跑在自己的 Mac 上

### Runner 运维

```bash
# 状态 / 日志
launchctl list | grep actions-runner
tail -f ~/actions-runner/website-runner/launchd.log

# 重启 / 停止
launchctl kickstart -k gui/$(id -u)/com.github.actions-runner.website
launchctl unload ~/Library/LaunchAgents/com.github.actions-runner.website.plist

# 换机器或重装：重新注册
cd ~/actions-runner/website-runner && ./config.sh --url https://github.com/joevilcai666/joevilcai666.github.io --token <注册令牌>
```

### 从零重新部署（换仓库/换账号时）

1. 修改 `astro.config.mjs` 的 `site` 和 `base`（用户仓库 base 用 `'/'`，项目仓库用 `'/<仓库名>'`）。
2. 推送到仓库 `main` 分支（workflow 会自动产出 `gh-pages` 分支）。
3. 仓库 **Settings → Pages → Build and deployment → Source** 选 **Deploy from a branch**，
   Branch 选 **gh-pages / (root)**。
   注：GitHub CLI 的 OAuth 令牌没有 Pages 设置的写权限（API 会 404），这一步只能在网页设置里完成。

### 使用自定义域名（推荐，国内访问更稳）

1. 买一个域名（阿里云/腾讯云/Cloudflare 等）。
2. 仓库 **Settings → Pages → Custom domain** 填入域名，或在本项目 `public/` 下新建 `CNAME` 文件写入域名。
3. 到域名服务商添加 CNAME 记录指向 `<用户名>.github.io`。
4. 把 `astro.config.mjs` 的 `site` 改成自定义域名。

## 如何更新内容

| 要改什么 | 改哪里 |
| --- | --- |
| 名字、简介、社交链接 | `src/data/site.ts` + `src/pages/index.astro` |
| 职业经历 | `src/data/work.ts` |
| 项目 | `src/data/projects.ts` |
| 发博客 | 在 `src/content/blog/` 新建 `.md` 文件（frontmatter 见下方） |
| 颜色 / 字体 / 版式 | `src/styles/global.css` 顶部的 CSS 变量 |

博客文章 frontmatter 模板：

```markdown
---
title: '文章标题'
description: '一句话摘要（用于 SEO 和 RSS）'
pubDate: 2026-09-14
tags: ['标签1', '标签2']
kind: '原创'    # 原创 | 翻译（翻译会在列表中显示「译」标）
draft: false    # true 则不发布
---

正文（Markdown）……
```

## 项目结构

```
personal-website/
├── astro.config.mjs        # 站点地址与 base 路径
├── .github/workflows/      # GitHub Pages 自动部署
├── public/                 # favicon、静态资源
└── src/
    ├── content/blog/       # 博客文章（Markdown）
    ├── data/               # 个人信息、经历、项目数据
    ├── components/         # 「骥」印章组件
    ├── layouts/            # 全局布局（页头/页脚/SEO）
    ├── pages/              # 首页 / work / projects / blog / rss
    └── styles/global.css   # 设计系统（纸·墨·封蜡）
```
