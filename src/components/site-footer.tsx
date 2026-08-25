import Link from "next/link";
import { siteTitle, siteDescription, socialLinks, friendLinks } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="font-bold">{siteTitle}</p>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {siteDescription}
          </p>
          <p className="mt-4 flex gap-4 text-sm">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                {link.name}
              </a>
            ))}
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-semibold">导航</p>
          <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
            <li><Link href="/" className="transition-colors hover:text-foreground">首页</Link></li>
            <li><Link href="/archives" className="transition-colors hover:text-foreground">归档</Link></li>
            <li><Link href="/search" className="transition-colors hover:text-foreground">搜索</Link></li>
            <li><Link href="/about" className="transition-colors hover:text-foreground">关于</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-semibold">订阅本站</p>
          <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>
              <a href="/feed.xml" className="transition-colors hover:text-foreground">
                RSS 订阅
              </a>
            </li>
            <li>在阅读器中添加本站地址即可第一时间收到更新</li>
          </ul>
          {friendLinks.length > 0 && (
            <>
              <p className="mb-3 mt-6 font-semibold">友情链接</p>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                {friendLinks.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-zinc-200 py-6 dark:border-zinc-800">
        <p className="mx-auto max-w-5xl px-6 text-sm text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} BoKewen · Powered by Next.js
        </p>
      </div>
    </footer>
  );
}
