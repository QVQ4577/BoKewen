"use client";

import { useEffect, useState } from "react";

export function ReadingModeToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setOn(document.documentElement.classList.contains("reading-mode"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("reading-mode");
    document.documentElement.classList.toggle("reading-mode", next);
    try {
      localStorage.setItem("reading-mode", next ? "on" : "off");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={on ? "退出阅读模式" : "阅读模式：暖黄背景 + 大字号"}
      aria-label="切换阅读模式"
      className={`fixed right-6 bottom-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border shadow-lg transition-all hover:-translate-y-0.5 ${
        on
          ? "border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-400"
          : "border-zinc-200 bg-background text-zinc-500 hover:text-foreground dark:border-zinc-800 dark:hover:text-foreground"
      }`}
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6.5A4.5 4.5 0 0 0 8 4H3v14h5.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1 3.5-3.5H21V4h-5a4.5 4.5 0 0 0-4 2.5z" />
        <path d="M12 6.5v15" />
      </svg>
    </button>
  );
}
