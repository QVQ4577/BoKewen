import Link from "next/link";
import { Avatar } from "@/components/post-list";
import { authorName, authorBio, socialLinks } from "@/lib/site";

export function AuthorCard() {
  return (
    <aside className="mt-14 flex items-center gap-5 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
      <Avatar size={64} />
      <div className="min-w-0">
        <p className="font-semibold">{authorName}</p>
        <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {authorBio}
        </p>
        <p className="mt-2 flex gap-4 text-sm">
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
          <Link
            href="/about"
            className="text-zinc-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            关于我 →
          </Link>
        </p>
      </div>
    </aside>
  );
}
