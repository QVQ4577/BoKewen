"use client";

import { useEffect, useRef, useState } from "react";

export function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { codeToHtml } = await import("shiki");
        const html = await codeToHtml(code.replace(/\n$/, ""), {
          lang: lang || "text",
          themes: { light: "github-light", dark: "github-dark" },
          defaultColor: "light",
        });
        if (!cancelled && ref.current) ref.current.innerHTML = html;
      } catch {
        setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
        <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
          {lang || "text"}
        </span>
        <button
          type="button"
          onClick={copy}
          className="rounded-md px-2 py-1 text-xs text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-800"
        >
          {copied ? "已复制" : "复制"}
        </button>
      </div>
      {failed ? (
        <pre className="overflow-x-auto p-4 font-mono text-sm">
          <code>{code}</code>
        </pre>
      ) : (
        <div
          ref={ref}
          className="code-shiki overflow-x-auto p-4 text-sm [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:font-mono"
        >
          <pre className="!m-0 overflow-x-auto p-0 font-mono text-sm">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
