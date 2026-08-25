import Link from "next/link";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="面包屑" className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-500">
      <Link href="/" className="transition-colors hover:text-foreground">
        首页
      </Link>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
          <span>/</span>
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-700 dark:text-zinc-300">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
