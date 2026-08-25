"use client";

import { useEffect, useRef } from "react";
import { socialLinks } from "@/lib/site";

export function Giscus() {
  const ref = useRef<HTMLDivElement>(null);

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  useEffect(() => {
    if (!repo || !repoId || !category || !categoryId || !ref.current) return;
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "zh-CN");
    ref.current.appendChild(script);
  }, [repo, repoId, category, categoryId]);

  if (!repo || !repoId || !category || !categoryId) {
    const github = socialLinks.find((l) => l.name === "GitHub")?.url ?? "https://github.com";
    return (
      <a
        href={`${github}/BoKewen/discussions`}
        className="text-sm text-zinc-500 transition-colors hover:text-foreground"
      >
        前往 GitHub Discussions 留言评论 →
      </a>
    );
  }

  return <div ref={ref} className="mt-2" />;
}
