import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostSlugs, formatDate } from "@/lib/posts";

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

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
        <Link
          href="/"
          className="text-sm text-zinc-500 transition-colors hover:text-foreground"
        >
          ← 返回首页
        </Link>

        <article>
          <header className="mt-8 mb-10 border-b border-zinc-200 pb-8 dark:border-zinc-800">
            <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
            <time className="mt-3 block text-sm text-zinc-500 dark:text-zinc-500">
              {formatDate(post.date)}
            </time>
          </header>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <Content />
          </div>
        </article>
      </main>
    </div>
  );
}
