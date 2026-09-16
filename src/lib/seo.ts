import { POSTS, formatDate, getPost } from './blog';
import { LEGAL_DOCS, getLegalDoc } from './legal';
import { SITE } from '../data/site';

export const ORIGIN = `https://${SITE.domain}`;

export interface Head {
  title: string;
  description: string;
  canonical: string;
  /** Imagine pentru share. Relativă la origine. */
  image: string;
  type: 'website' | 'article';
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd: object[];
}

const DEFAULT_IMAGE = '/brand/logo.png';

const org = {
  '@type': 'Organization',
  '@id': `${ORIGIN}/#organizatie`,
  name: SITE.name,
  url: ORIGIN,
  slogan: SITE.slogan,
  email: SITE.email,
  telephone: SITE.phones.map((p) => p.display),
  logo: `${ORIGIN}${DEFAULT_IMAGE}`,
  areaServed: 'RO',
};

const breadcrumbs = (trail: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${ORIGIN}${item.path}`,
  })),
});

/**
 * Sursa unică pentru tot ce intră în `<head>`. O folosesc și componentele în browser
 * (prin `useHead`), și scriptul de prerender care scrie fișierele HTML statice — altfel
 * ar exista două adevăruri despre același titlu și unul dintre ele ar rămâne în urmă.
 */
export const headFor = (pathname: string): Head => {
  const path = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  if (path === '/') {
    return {
      title: `${SITE.name} — ${SITE.slogan}`,
      description:
        'Studio de web & aplicații custom. Site-uri de prezentare, platforme și magazine online scrise linie cu linie. Fără template-uri.',
      canonical: `${ORIGIN}/`,
      image: DEFAULT_IMAGE,
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@graph': [
            org,
            {
              '@type': 'WebSite',
              '@id': `${ORIGIN}/#site`,
              url: ORIGIN,
              name: SITE.name,
              inLanguage: 'ro-RO',
              publisher: { '@id': `${ORIGIN}/#organizatie` },
            },
          ],
        },
      ],
    };
  }

  if (path === '/blog') {
    return {
      title: `Blog — ${SITE.name}`,
      description:
        'Cum lucrăm, cât costă lucrurile și ce contează de fapt la un site. Articole scrise de doi developeri, fără limbaj de agenție.',
      canonical: `${ORIGIN}/blog`,
      image: DEFAULT_IMAGE,
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          '@id': `${ORIGIN}/blog#blog`,
          name: `Blog ${SITE.name}`,
          url: `${ORIGIN}/blog`,
          inLanguage: 'ro-RO',
          publisher: { '@id': `${ORIGIN}/#organizatie` },
          blogPost: POSTS.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            url: `${ORIGIN}/blog/${post.slug}`,
            datePublished: post.date,
          })),
        },
        breadcrumbs([
          { name: 'Acasă', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]),
      ],
    };
  }

  if (path.startsWith('/blog/')) {
    const post = getPost(path.slice('/blog/'.length));
    if (post) {
      const url = `${ORIGIN}/blog/${post.slug}`;
      return {
        title: `${post.title} — ${SITE.name}`,
        description: post.description,
        canonical: url,
        image: post.cover ?? DEFAULT_IMAGE,
        type: 'article',
        publishedTime: post.date,
        modifiedTime: post.updated ?? post.date,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': `${url}#articol`,
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            inLanguage: 'ro-RO',
            url,
            mainEntityOfPage: url,
            wordCount: post.body.trim().split(/\s+/).length,
            keywords: post.tags.join(', '),
            author: { '@type': 'Organization', name: post.author, url: ORIGIN },
            publisher: { '@id': `${ORIGIN}/#organizatie` },
            ...(post.cover ? { image: `${ORIGIN}${post.cover}` } : {}),
          },
          breadcrumbs([
            { name: 'Acasă', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ],
      };
    }
  }

  const legal = getLegalDoc(path.slice(1));
  if (legal) {
    return {
      title: `${legal.title} — ${SITE.name}`,
      description: legal.description,
      canonical: `${ORIGIN}/${legal.slug}`,
      image: DEFAULT_IMAGE,
      type: 'website',
      jsonLd: [
        breadcrumbs([
          { name: 'Acasă', path: '/' },
          { name: legal.title, path: `/${legal.slug}` },
        ]),
      ],
    };
  }

  return {
    title: `Pagina nu există — ${SITE.name}`,
    description: 'Adresa asta nu duce nicăieri. Ceea ce, pentru un studio numit OOPS404, e aproape o declarație de intenții.',
    canonical: `${ORIGIN}${path}`,
    image: DEFAULT_IMAGE,
    type: 'website',
    noindex: true,
    jsonLd: [],
  };
};

/** Toate adresele care primesc un fișier HTML propriu la build. */
export const ALL_ROUTES = (): string[] => [
  '/',
  '/blog',
  ...POSTS.map((post) => `/blog/${post.slug}`),
  ...LEGAL_DOCS.map((doc) => `/${doc.slug}`),
];

/** Pentru sitemap: ultima dată la care s-a schimbat pagina. */
export const lastModFor = (path: string): string => {
  if (path.startsWith('/blog/')) {
    const post = POSTS.find((p) => `/blog/${p.slug}` === path);
    if (post) return post.updated ?? post.date;
  }
  if (path === '/blog') return POSTS[0]?.date ?? new Date().toISOString().slice(0, 10);
  return new Date().toISOString().slice(0, 10);
};

export { formatDate };
