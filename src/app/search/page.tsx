import type { Metadata } from "next";
import { SearchClient } from "@/app/search/search-client";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "搜索",
};

export default function SearchPage() {
  const posts = getAllPosts();
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <SearchClient
        posts={posts.map((p) => ({
          slug: p.slug,
          title: p.title,
          description: p.description,
          tags: p.tags,
          date: p.date,
        }))}
      />
    </main>
  );
}
