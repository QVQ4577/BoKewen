import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/post-utils";

export const metadata: Metadata = {
  title: "归档",
};

export default function ArchivesPage() {
  const posts = getAllPosts();
  const years = [...new Set(posts.map((p) => p.date.slice(0, 4)))];

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <div className="animate-fade-up">
        <Breadcrumbs items={[{ label: "归档" }]} />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">归档</h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
          共 {posts.length} 篇文章
        </p>

        <div className="mt-10 space-y-12">
          {years.map((year) => (
            <section key={year}>
              <h2 className="mb-6 text-xl font-bold text-zinc-400 dark:text-zinc-600">
                {year}
              </h2>
              <ul className="relative space-y-6 border-l border-zinc-200 pl-6 dark:border-zinc-800">
                {posts
                  .filter((p) => p.date.startsWith(year))
                  .map((post) => (
                    <li key={post.slug} className="relative">
                      <span
                        aria-hidden
                        className="absolute top-1.5 -left-[1.72rem] h-2 w-2 rounded-full border border-zinc-300 bg-background dark:border-zinc-700"
                      />
                      <Link href={`/posts/${post.slug}`} className="group block">
                        <time className="text-sm text-zinc-500 dark:text-zinc-500">
                          {formatDate(post.date)}
                        </time>
                        <p className="font-medium transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {post.title}
                        </p>
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
