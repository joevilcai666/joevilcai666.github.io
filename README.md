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

## 部署到 GitHub Pages（约 3 分钟）

1. **在 GitHub 上创建仓库**，把本项目推送上去：

   ```bash
   cd personal-website
   git init
   git add -A
   git commit -m "init: my personal website"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```

2. **修改 `astro.config.mjs`**：
   - `site`：改为 `https://<你的用户名>.github.io`
   - `base`：
     - 仓库叫 `personal-website`（或任意名）→ 保持 `'/personal-website'`（与仓库名一致）
     - 仓库叫 `<用户名>.github.io` → 改为 `'/'`

3. **开启 Pages（GitHub Actions 方式）**：
   仓库 **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**。

4. 推送到 `main` 分支即自动部署（`.github/workflows/deploy.yml` 已配好），
   访问 `https://<用户名>.github.io/<仓库名>/` 查看。

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
