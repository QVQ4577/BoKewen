import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostsByTag,
  getAllTags,
} from "@/lib/posts";
import { formatDate } from "@/lib/post-utils";

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: PageProps<"/tags/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  return { title: `标签：${tag}` };
}

export default async function TagPage({ params }: PageProps<"/tags/[tag]">) {
  const { tag } = await params;
  const candidates = new Set<string>([tag]);
  try {
    candidates.add(decodeURIComponent(tag));
  } catch {}
  const matched = [...candidates].find((t) =>
    getAllTags().some((known) => known.tag === t)
  );
  if (!matched) notFound();

  const posts = getPostsByTag(matched);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-14">
      <h1 className="text-2xl font-bold tracking-tight">
        标签：<span className="text-blue-600 dark:text-blue-400">{tag}</span>
        <span className="ml-2 text-sm font-normal text-zinc-500 dark:text-zinc-500">
          {posts.length} 篇
        </span>
      </h1>

      <ul className="mt-8 flex flex-col gap-5">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="group block">
              <h2 className="font-semibold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
                <time>{formatDate(post.date)}</time>
                <span className="mx-2">·</span>
                {post.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <Link
          href="/"
          className="text-sm text-zinc-500 transition-colors hover:text-foreground"
        >
          ← 返回首页
        </Link>
      </div>
    </main>
  );
}
