"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function RandomPostButton({ slugs }: { slugs: string[] }) {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);

  function wander() {
    if (slugs.length === 0) return;
    setSpinning(true);
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    router.push(`/posts/${slug}`);
    setTimeout(() => setSpinning(false), 600);
  }

  return (
    <button
      type="button"
      onClick={wander}
      title="随机漫步：去一篇随机文章"
      aria-label="随机漫步"
      className={`flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-all hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-800 ${
        spinning ? "rotate-180 transition-transform duration-500" : ""
      }`}
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    </button>
  );
}
