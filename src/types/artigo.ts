export type Artigo = {
  _id: string;
  title: string;
  slug: string;
  author: string;
  date: string; // ISO date string, e.g. "2025-10-01"
  excerpt: string;
  content: string;
};
