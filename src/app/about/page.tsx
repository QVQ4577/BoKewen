import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-14">
      <h1 className="text-3xl font-bold tracking-tight">关于我</h1>

      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        <p>
          你好，我是 <strong>BoKewen</strong>，欢迎来到我的个人博客。
        </p>
        <p>
          这里主要记录我的学习笔记、技术折腾和日常思考。博客使用
          Next.js + MDX + Tailwind CSS 搭建，部署在 Vercel 上。
        </p>
        <h2>关于本站</h2>
        <ul>
          <li>文章源码托管在 GitHub，全部开源</li>
          <li>支持深色模式、标签分类与 RSS 订阅</li>
          <li>每次推送代码自动重新发布</li>
        </ul>
        <h2>联系我</h2>
        <p>可以通过 GitHub（QVQ4577）找到我。</p>
      </div>
    </main>
  );
}
