"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/post-utils";

export function Toc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="文章目录" className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
        目录
      </p>
      <ul className="space-y-2 border-l border-zinc-200 dark:border-zinc-800">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block transition-colors ${
                item.level === 3 ? "pl-6" : "pl-4"
              } ${
                activeId === item.id
                  ? "border-l-2 border-blue-500 -ml-px font-medium text-blue-600 dark:text-blue-400"
                  : "text-zinc-500 hover:text-foreground dark:text-zinc-500"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
