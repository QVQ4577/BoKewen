import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
        <header className="mb-14">
          <h1 className="text-3xl font-bold tracking-tight">BoKewen</h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            记录学习与生活，用 Next.js + MDX 搭建。
          </p>
        </header>

        <section>
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
            文章
          </h2>
          <ul className="flex flex-col gap-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/posts/${post.slug}`} className="group block">
                  <h3 className="text-xl font-semibold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {post.title}
                  </h3>
                  <time className="mt-1 block text-sm text-zinc-500 dark:text-zinc-500">
                    {formatDate(post.date)}
                  </time>
                  <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-400">
                    {post.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
        <p className="mx-auto max-w-2xl px-6 text-sm text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} BoKewen · Powered by Next.js
        </p>
      </footer>
    </div>
  );
}
