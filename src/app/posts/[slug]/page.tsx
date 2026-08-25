import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/reading-progress";
import { ReadingModeToggle } from "@/components/reading-mode-toggle";
import { Toc } from "@/components/toc";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AuthorCard } from "@/components/author-card";
import { Giscus } from "@/components/giscus";
import {
  getAllPosts,
  getPostSlugs,
  getPostToc,
  getAdjacentPosts,
  getRelatedPosts,
} from "@/lib/posts";
import { formatDate } from "@/lib/post-utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) notFound();

  const { default: Content } = await import(
    `../../../../content/posts/${slug}.mdx`
  );
  const toc = getPostToc(slug);
  const { newer, older } = getAdjacentPosts(slug);
  const related = getRelatedPosts(slug);

  return (
    <>
      <ReadingProgress />
      <ReadingModeToggle />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12 xl:relative">
        <div className="animate-fade-up">
          <Breadcrumbs items={[{ label: "文章" }, { label: post.title }]} />

          <article>
            <header className="mt-6 mb-10 border-b border-zinc-200 pb-8 dark:border-zinc-800">
              <h1 className="text-3xl font-bold leading-tight tracking-tight">
                {post.title}
              </h1>
              <p className="mt-3 flex flex-wrap items-center gap-x-2 text-sm text-zinc-500 dark:text-zinc-500">
                <time>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.wordCount} 字</span>
                <span>·</span>
                <span>约 {post.readingMinutes} 分钟读完</span>
              </p>
              {post.tags.length > 0 && (
                <p className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 transition-colors hover:bg-blue-100 hover:text-blue-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-blue-950"
                    >
                      {tag}
                    </Link>
                  ))}
                </p>
              )}
            </header>

            <div className="prose prose-zinc max-w-none dark:prose-invert">
              <Content />
            </div>
          </article>

          <nav className="mt-14 grid gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-2 dark:border-zinc-800">
            {newer ? (
              <Link
                href={`/posts/${newer.slug}`}
                className="group rounded-xl border border-zinc-200 p-4 transition-all hover:-translate-y-0.5 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                <p className="text-xs text-zinc-500 dark:text-zinc-500">新的一篇</p>
                <p className="mt-1 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {newer.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {older && (
              <Link
                href={`/posts/${older.slug}`}
                className="group rounded-xl border border-zinc-200 p-4 text-right transition-all hover:-translate-y-0.5 hover:border-zinc-400 sm:justify-self-end sm:w-full dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                <p className="text-xs text-zinc-500 dark:text-zinc-500">旧的一篇</p>
                <p className="mt-1 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {older.title}
                </p>
              </Link>
            )}
          </nav>

          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
                相关推荐
              </h2>
              <ul className="grid gap-3 sm:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/posts/${item.slug}`}
                      className="card-3d block h-full rounded-xl border border-zinc-200 p-4 text-sm font-medium leading-6 transition-colors hover:border-blue-500/60 hover:text-blue-600 dark:border-zinc-800 dark:hover:border-blue-500/60 dark:hover:text-blue-400"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <AuthorCard />

          <section className="mt-14">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
              评论
            </h2>
            <Giscus />
          </section>
        </div>

        {toc.length > 0 && (
          <aside className="absolute top-24 -right-56 hidden w-52 xl:block">
            <div className="sticky top-24">
              <Toc items={toc} />
            </div>
          </aside>
        )}
      </main>
    </>
  );
}
