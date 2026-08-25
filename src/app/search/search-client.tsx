"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatDate } from "@/lib/post-utils";

interface SearchablePost {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
}

export function SearchClient({ posts }: { posts: SearchablePost[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [posts, query]);

  return (
    <div className="animate-fade-up">
      <h1 className="text-3xl font-bold tracking-tight">搜索</h1>
      <div className="relative mt-6">
        <svg
          className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入关键词，搜索标题、摘要或标签…"
          autoFocus
          className="w-full rounded-full border border-zinc-300 bg-transparent py-2.5 pr-4 pl-11 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-blue-500 dark:border-zinc-700 dark:placeholder:text-zinc-600"
        />
      </div>

      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">
        {query.trim()
          ? `找到 ${results.length} 篇相关文章`
          : "支持按文章标题、摘要、标签进行模糊匹配"}
      </p>

      <ul className="mt-6 flex flex-col gap-4">
        {results.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="group block rounded-xl border border-zinc-200 p-5 transition-all hover:-translate-y-0.5 hover:border-blue-500/60 dark:border-zinc-800 dark:hover:border-blue-500/60"
            >
              <h2 className="font-semibold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
                <time>{formatDate(post.date)}</time>
              </p>
              <p className="mt-2 line-clamp-2 leading-7 text-zinc-600 dark:text-zinc-400">
                {post.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
