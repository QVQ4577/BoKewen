import Link from "next/link";
import { Avatar } from "@/components/post-list";
import { PostList } from "@/components/post-list";
import { getAllPosts, getFeaturedPosts, getAllTags } from "@/lib/posts";
import { authorName, authorBio } from "@/lib/site";

export default function Home() {
  const posts = getAllPosts();
  const featured = getFeaturedPosts().slice(0, 4);
  const tags = getAllTags();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
      <section className="animate-fade-up relative mb-14 overflow-hidden rounded-2xl border border-zinc-200 p-8 sm:p-10 dark:border-zinc-800">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 blur-3xl"
        />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Avatar size={88} />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              你好，我是 {authorName}
            </h1>
            <p className="mt-3 max-w-xl leading-7 text-zinc-600 dark:text-zinc-400">
              {authorBio}
              这里记录我的学习笔记、技术折腾与生活随想——写下来，是为了想得更清楚。
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="#posts"
                className="rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
              >
                开始阅读
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-zinc-300 px-5 py-1.5 text-sm transition-colors hover:border-foreground dark:border-zinc-700"
              >
                关于我
              </Link>
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="animate-fade-up mb-14" style={{ animationDelay: "80ms" }}>
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
            精选文章
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="card-3d group relative overflow-hidden rounded-xl border border-zinc-200 p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 transition-opacity group-hover:opacity-100"
                />
                <p className="text-xs font-medium uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  精选
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 leading-7 text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="animate-fade-up mb-14" style={{ animationDelay: "160ms" }}>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
          按标签浏览
        </h2>
        <div className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="rounded-full border border-zinc-200 px-3.5 py-1 text-sm text-zinc-600 transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              {tag}
              <span className="ml-1.5 text-xs text-zinc-400 dark:text-zinc-600">{count}</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="posts" className="animate-fade-up scroll-mt-20" style={{ animationDelay: "240ms" }}>
        <PostList posts={posts} />
      </section>
    </main>
  );
}
