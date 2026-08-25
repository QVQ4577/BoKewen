export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  featured: boolean;
  wordCount: number;
  readingMinutes: number;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function formatDate(date: string): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
