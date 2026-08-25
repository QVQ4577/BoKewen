# BoKewen

基于 Next.js + MDX + Tailwind CSS 的个人博客。

## 写文章

在 `content/posts` 下新建 `文章名.mdx`，文件名即访问路径（`/posts/文章名`）：

```mdx
---
title: "文章标题"
date: "2026-08-25"
description: "一句话摘要"
---

正文用 Markdown 语法书写。
```

## 本地开发

```bash
npm install
npm run dev        # 开发模式，http://localhost:3000
npm run build      # 生产构建（静态生成）
```

## 部署

推送代码到 GitHub 后，在 Vercel / Cloudflare Pages / EdgeOne Pages 导入仓库即可自动部署，无需额外配置。
