import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-6xl font-bold tracking-tight text-zinc-300 dark:text-zinc-700">
        404
      </p>
      <h1 className="mt-4 text-xl font-semibold">页面不存在</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        你访问的页面可能已被移动或删除。
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-foreground px-5 py-2 text-sm text-background transition-opacity hover:opacity-80"
      >
        返回首页
      </Link>
    </main>
  );
}
