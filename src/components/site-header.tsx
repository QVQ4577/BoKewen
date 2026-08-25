import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { RandomPostButton } from "@/components/random-post-button";
import { getPostSlugs } from "@/lib/posts";

export function SiteHeader() {
  const slugs = getPostSlugs();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-background/70 backdrop-blur-md dark:border-zinc-800">
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight transition-opacity hover:opacity-70"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-sm text-white">
            B
          </span>
          BoKewen
        </Link>
        <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/" className="transition-colors hover:text-foreground">
            首页
          </Link>
          <Link href="/archives" className="transition-colors hover:text-foreground">
            归档
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground">
            关于
          </Link>
          <RandomPostButton slugs={slugs} />
          <Link
            href="/search"
            aria-label="搜索文章"
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-800"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
