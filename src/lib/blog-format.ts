export type Category = { id: string; name: string; slug: string };

export type PostCardDTO = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  readTimeMinutes: number;
  publishedAt: string;
  readCount: number;
  category: { name: string; slug: string };
};

export function formatReadCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k reads`;
  }
  return `${count} reads`;
}

export function formatArticleDate(iso: string): string {
  return new Date(iso)
    .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    .toUpperCase();
}
