import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import type { PostMeta, TocItem } from "@/lib/post-utils";

const postsDirectory = path.join(process.cwd(), "content", "posts");

function countWords(text: string): number {
  const cjk = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) ?? []).length;
  const words = (
    text.replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, " ").match(/[a-zA-Z0-9_]+/g) ??
    []
  ).length;
  return cjk + words;
}

function readRawPost(slug: string): { data: Record<string, unknown>; content: string } | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

function toPostMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date: typeof data.date === "string" ? data.date : "",
    description: typeof data.description === "string" ? data.description : "",
    tags: Array.isArray(data.tags)
      ? data.tags.filter((t): t is string => typeof t === "string")
      : [],
    featured: data.featured === true,
    wordCount: countWords(content),
    readingMinutes: Math.max(1, Math.round(countWords(content) / 400)),
  };
}

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = readRawPost(slug);
      if (!raw) throw new Error(`Failed to read post: ${slug}`);
      return toPostMeta(slug, raw.data, raw.content);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAdjacentPosts(slug: string): {
  newer: PostMeta | null;
  older: PostMeta | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { newer: null, older: null };
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const posts = getAllPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];
  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, limit)
    .map(({ post }) => post);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostToc(slug: string): TocItem[] {
  const raw = readRawPost(slug);
  if (!raw) return [];
  const withoutCode = raw.content.replace(/^```[\s\S]*?^```$/gm, "");
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(withoutCode)) !== null) {
    const level = match[1].length;
    const text = match[2]
      .replace(/[\\*`_~[\]()#]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) continue;
    items.push({ id: new GithubSlugger().slug(text), text, level });
  }
  return items;
}
