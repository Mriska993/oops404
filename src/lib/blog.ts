import { excerpt, parseFrontmatter, readingMinutes, renderMarkdown, slugify, type Heading } from './markdown';

export interface Post {
  slug: string;
  title: string;
  description: string;
  /** ISO, așa cum e scrisă în frontmatter: 2026-09-16. */
  date: string;
  /** Data ultimei modificări, dacă articolul a fost actualizat. */
  updated?: string;
  tags: string[];
  cover?: string;
  coverAlt?: string;
  author: string;
  readingMinutes: number;
  /** Articolele cu `ciorna: da` există în repo, dar nu ajung pe site. */
  draft: boolean;
  body: string;
}

export interface RenderedPost extends Post {
  html: string;
  headings: Heading[];
}

/**
 * Fiecare `.md` din `src/content/blog/` devine un articol; numele fișierului e slug-ul,
 * deci și adresa: `de-ce-nu-folosim-wordpress.md` → `/blog/de-ce-nu-folosim-wordpress`.
 *
 * `eager: true` le include în bundle la build. Sunt câteva zeci de KB de text —
 * dacă blogul crește peste ~50 de articole, mută încărcarea pe lazy.
 */
const FILES = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const isTrue = (value: unknown) =>
  typeof value === 'string' && ['da', 'true', 'yes', '1'].includes(value.toLowerCase());

const toPost = (path: string, raw: string): Post => {
  const { meta, body } = parseFrontmatter(raw);
  const slug = path.split('/').pop()!.replace(/\.md$/, '');

  const title = (meta.titlu as string) ?? slug;

  return {
    slug,
    title,
    description: (meta.descriere as string) ?? excerpt(body),
    date: (meta.data as string) ?? '',
    updated: meta.actualizat as string | undefined,
    tags: Array.isArray(meta.taguri) ? meta.taguri : [],
    cover: meta.coperta as string | undefined,
    coverAlt: (meta.coperta_alt as string) ?? title,
    author: (meta.autor as string) ?? 'OOPS404',
    readingMinutes: readingMinutes(body),
    draft: isTrue(meta.ciorna),
    body,
  };
};

/** Cele mai noi primele. Ciornele nu apar nicăieri pe site. */
export const POSTS: Post[] = Object.entries(FILES)
  .map(([path, raw]) => toPost(path, raw))
  .filter((post) => !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string): RenderedPost | undefined => {
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return undefined;

  const { html, headings } = renderMarkdown(post.body);
  return { ...post, html, headings };
};

/** Tag-urile existente, cu numărul de articole, ordonate după cât de folosite sunt. */
export const TAGS: { label: string; slug: string; count: number }[] = Object.values(
  POSTS.reduce<Record<string, { label: string; slug: string; count: number }>>((acc, post) => {
    for (const tag of post.tags) {
      const slug = slugify(tag);
      acc[slug] = acc[slug] ?? { label: tag, slug, count: 0 };
      acc[slug].count += 1;
    }
    return acc;
  }, {})
).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

/**
 * Articole înrudite: întâi cele care împart cele mai multe tag-uri, apoi cele recente.
 * Fără rezultate slabe — dacă nu are nimic în comun, mai bine arătăm ce e nou.
 */
export const relatedPosts = (slug: string, limit = 2): Post[] => {
  const current = POSTS.find((p) => p.slug === slug);
  if (!current) return POSTS.slice(0, limit);

  return POSTS.filter((p) => p.slug !== slug)
    .map((p) => ({ post: p, shared: p.tags.filter((t) => current.tags.includes(t)).length }))
    .sort((a, b) => b.shared - a.shared || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map((entry) => entry.post);
};

const LUNI = [
  'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
  'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie',
];

/** „2026-09-16” → „16 septembrie 2026”. Fără Intl: trebuie să dea la fel și la prerender. */
export const formatDate = (iso: string): string => {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return iso;
  return `${day} ${LUNI[month - 1]} ${year}`;
};
