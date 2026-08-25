"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/post-utils";
import { formatDate } from "@/lib/post-utils";

type ViewMode = "list" | "grid";

export function PostList({ posts }: { posts: PostMeta[] }) {
  const [view, setView] = useState<ViewMode>("list");

  function switchView(next: ViewMode) {
    setView(next);
    try {
      localStorage.setItem("post-view", next);
    } catch {}
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
          全部文章（{posts.length}）
        </h2>
        <div className="flex items-center gap-1 rounded-full border border-zinc-200 p-1 dark:border-zinc-800">
          {(["list", "grid"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => switchView(mode)}
              aria-label={mode === "list" ? "列表视图" : "网格视图"}
              className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                view === mode
                  ? "bg-foreground text-background"
                  : "text-zinc-400 hover:text-foreground"
              }`}
            >
              {mode === "list" ? (
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      <ul
        className={
          view === "grid"
            ? "grid gap-4 sm:grid-cols-2"
            : "flex flex-col gap-4"
        }
      >
        {posts.map((post) => (
          <li
            key={post.slug}
            className="card-3d group rounded-xl border border-zinc-200 p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
          >
            <Link href={`/posts/${post.slug}`} className="block">
              <h3
                className={`font-semibold leading-snug transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 ${
                  view === "grid" ? "line-clamp-2" : ""
                }`}
              >
                {post.title}
              </h3>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-zinc-500 dark:text-zinc-500">
                <time>{formatDate(post.date)}</time>
                <span>·</span>
                <span>约 {post.readingMinutes} 分钟</span>
              </p>
              {view === "list" && post.description && (
                <p className="mt-2 line-clamp-2 leading-7 text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </p>
              )}
              {post.tags.length > 0 && (
                <p className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-blue-950"
                    >
                      {tag}
                    </span>
                  ))}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Avatar({ size = 80 }: { size?: number }) {
  return (
    <Image
      src="/avatar.svg"
      alt="BoKewen 头像"
      width={size}
      height={size}
      priority
      className="rounded-full ring-2 ring-white/60 shadow-lg dark:ring-white/10"
    />
  );
}
