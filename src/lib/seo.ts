import { POSTS, formatDate, getPost } from './blog';
import { LEGAL_DOCS, getLegalDoc } from './legal';
import { SITE } from '../data/site';
import { TEAM_MEMBERS } from '../data/team';
import { SERVICES_DATA, FAQ_DATA, ESTIMATOR_PROJECT_TYPES } from '../data/portfolioData';
import { PROJECTS_DATA } from '../data/projects';

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

/* 1200x630, cât cer Facebook/LinkedIn/WhatsApp: logoul pe fundalul site-ului */
const DEFAULT_IMAGE = '/brand/og.png';
const LOGO = '/brand/logo.png';

/* ce intră în primul paragraf din orice descriere a studioului */
export const DESCRIERE_STUDIO =
  'OOPS404 e un studio din România format din doi developeri, Badea Ana-Maria și Done George, care fac site-uri de prezentare, aplicații web și magazine online scrise de la zero, fără template-uri. Clientul vorbește direct cu cei care construiesc, de la primul mesaj până după lansare.';

/*
  Organizația, descrisă cât mai complet: oameni, servicii, prețuri de pornire,
  zonă. E ce citesc Google și motoarele cu AI ca să înțeleagă cine suntem,
  nu doar ce scrie în titlu.
*/
const org = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${ORIGIN}/#organizatie`,
  name: SITE.name,
  alternateName: 'Oops404 Studio',
  url: ORIGIN,
  slogan: SITE.slogan,
  description: DESCRIERE_STUDIO,
  email: SITE.email,
  telephone: SITE.phones.map((p) => p.display),
  logo: { '@type': 'ImageObject', url: `${ORIGIN}${LOGO}`, width: 2400, height: 752 },
  image: `${ORIGIN}${DEFAULT_IMAGE}`,
  foundingDate: '2026',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: TEAM_MEMBERS.length },
  founder: TEAM_MEMBERS.map((m) => ({
    '@type': 'Person',
    name: m.name,
    jobTitle: m.role,
    worksFor: { '@id': `${ORIGIN}/#organizatie` },
  })),
  address: { '@type': 'PostalAddress', addressCountry: 'RO' },
  areaServed: [
    { '@type': 'Country', name: 'România' },
    { '@type': 'Place', name: 'Remote, oriunde în Europa' },
  ],
  knowsLanguage: ['ro', 'en'],
  knowsAbout: [
    'dezvoltare web',
    'site-uri de prezentare',
    'aplicații web',
    'magazine online',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'UI/UX design',
    'SEO tehnic',
  ],
  priceRange: `de la ${Math.min(...ESTIMATOR_PROJECT_TYPES.map((t) => t.basePrice))} €`,
  currenciesAccepted: 'EUR, RON',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: SITE.email,
    telephone: SITE.phones[0].display,
    availableLanguage: ['Romanian', 'English'],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicii',
    itemListElement: SERVICES_DATA.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.title,
        description: s.description,
        provider: { '@id': `${ORIGIN}/#organizatie` },
        areaServed: 'RO',
      },
    })),
  },
};

/* Întrebările frecvente, ca schemă: răspunsurile apar exact așa pe pagină. */
const faq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${ORIGIN}/#faq`,
  mainEntity: FAQ_DATA.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

/* Produsele proprii: fiecare e un site/app real, cu adresa lui. */
const portofoliu = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${ORIGIN}/#portofoliu`,
  name: 'Produse construite de OOPS404',
  itemListElement: PROJECTS_DATA.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': p.category === 'app' ? 'SoftwareApplication' : 'WebSite',
      name: p.title,
      description: p.description,
      ...(p.liveUrl ? { url: p.liveUrl } : {}),
      creator: { '@id': `${ORIGIN}/#organizatie` },
      ...(p.category === 'app' ? { applicationCategory: 'BusinessApplication', operatingSystem: 'Web' } : {}),
    },
  })),
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
      // titlul spune ce facem și unde; sloganul rămâne în descriere și în schemă
      title: `${SITE.name} — Site-uri și aplicații web făcute de la zero, în România`,
      description:
        'Doi developeri din România care fac site-uri de prezentare, aplicații web și magazine online scrise linie cu linie, fără template-uri. Vorbești direct cu cei care construiesc, de la primul mesaj până după lansare.',
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
              description: DESCRIERE_STUDIO,
              inLanguage: 'ro-RO',
              publisher: { '@id': `${ORIGIN}/#organizatie` },
            },
            {
              '@type': 'WebPage',
              '@id': `${ORIGIN}/#pagina`,
              url: `${ORIGIN}/`,
              name: `${SITE.name} — Site-uri și aplicații web făcute de la zero`,
              isPartOf: { '@id': `${ORIGIN}/#site` },
              about: { '@id': `${ORIGIN}/#organizatie` },
              primaryImageOfPage: `${ORIGIN}${DEFAULT_IMAGE}`,
              inLanguage: 'ro-RO',
            },
          ],
        },
        faq,
        portofoliu,
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

/**
 * /llms.txt — rezumatul site-ului pentru motoarele cu AI (ChatGPT, Claude,
 * Perplexity, Google AI). Convenția llmstxt.org: Markdown scurt, cu ce facem,
 * cât costă, cine suntem și unde sunt paginile importante. Aceleași date ca pe
 * site, deci nu poate rămâne în urmă.
 */
export const llmsText = (): string => {
  const servicii = SERVICES_DATA.map((s) => `- **${s.title}** — ${s.tagline} ${s.description}`).join('\n');
  const preturi = ESTIMATOR_PROJECT_TYPES.map(
    (t) => `- ${t.label}: de la ${t.basePrice} €, aproximativ ${t.durationWeeks} săptămâni (${t.description})`
  ).join('\n');
  const intrebari = FAQ_DATA.map((f) => `- **${f.question}** ${f.answer}`).join('\n');
  const produse = PROJECTS_DATA.map(
    (p) => `- **${p.title}**${p.liveUrl ? ` (${p.liveUrl})` : ''} — ${p.categoryLabel}. ${p.description}`
  ).join('\n');
  const articole = POSTS.map((p) => `- [${p.title}](${ORIGIN}/blog/${p.slug}): ${p.description}`).join('\n');
  const oameni = TEAM_MEMBERS.map((m) => `- **${m.name}** (${m.role}): ${m.bio}`).join('\n');

  return `# ${SITE.name}

> ${DESCRIERE_STUDIO}

Slogan: „${SITE.slogan}”. Site: ${ORIGIN}. Contact: ${SITE.email}, WhatsApp ${SITE.phones
    .map((p) => p.display)
    .join(' / ')}. Locație: ${SITE.location}. Limbi: română, engleză.

## Ce facem

${servicii}

## Cât costă (puncte de pornire, în euro, fără TVA)

${preturi}

Estimatorul de pe site (${ORIGIN}/#budget) afișează un interval pentru fiecare combinație. Nu e o ofertă, e punctul de plecare.

## Cum lucrăm

1. Vorbim ca oamenii (30 min): brief clar + estimare de preț și timp.
2. Îți arătăm cum arată (2–4 zile): design interactiv, cu link de preview, pe telefon.
3. Construim la vedere (1–4 săptămâni): link de staging pe care vezi progresul zilnic.
4. Lansăm și rămânem: site live, acces complet, video de 5 minute cu administrarea, suport după.

## Cine suntem

${oameni}

## Produse proprii (toate construite de la zero, nu comenzi de la clienți)

${produse}

## Întrebări frecvente

${intrebari}

## Articole

${articole}

## Pagini

- [Acasă](${ORIGIN}/)
- [Blog](${ORIGIN}/blog)
- [Termeni](${ORIGIN}/termeni)
- [Confidențialitate](${ORIGIN}/confidentialitate)
- [Cookie-uri](${ORIGIN}/cookies)
- [Sitemap](${ORIGIN}/sitemap.xml)
`;
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
