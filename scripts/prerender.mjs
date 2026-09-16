import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * Scrie câte un fișier HTML complet pentru fiecare rută, plus sitemap, RSS și robots.
 *
 * De ce: site-ul e un SPA, iar un SPA livrează un `<div id="root">` gol și lasă
 * JavaScript-ul să deseneze restul. Pentru pagina principală e o problemă mică; pentru
 * un blog e una mare — un articol pe care Googlebot îl vede gol e un articol care nu
 * există. Aici îl desenăm o dată, la build, și livrăm HTML adevărat. Browserul îl
 * hidratează după (vezi `src/main.tsx`), deci interactivitatea rămâne neatinsă.
 *
 * Rulează automat din `npm run build`.
 */

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

// pe Windows, `import()` cu o cale absolută eșuează („protocol 'd:'”) — trebuie file://
const { render, ALL_ROUTES, headFor, lastModFor, ORIGIN, POSTS, lipsuriLegale } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
);

const escapeHtml = (text) =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** `</script>` în interiorul unui JSON-LD ar închide blocul mai devreme. */
const safeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const headTags = (head) => {
  const image = `${ORIGIN}${head.image}`;
  const tags = [
    `<meta name="description" content="${escapeHtml(head.description)}" />`,
    `<meta name="robots" content="${head.noindex ? 'noindex, follow' : 'index, follow'}" />`,
    `<link rel="canonical" href="${head.canonical}" />`,
    `<meta property="og:type" content="${head.type}" />`,
    `<meta property="og:title" content="${escapeHtml(head.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(head.description)}" />`,
    `<meta property="og:url" content="${head.canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:locale" content="ro_RO" />`,
    `<meta property="og:site_name" content="OOPS404" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(head.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ];

  if (head.type === 'article') {
    if (head.publishedTime) {
      tags.push(`<meta property="article:published_time" content="${head.publishedTime}" />`);
    }
    if (head.modifiedTime) {
      tags.push(`<meta property="article:modified_time" content="${head.modifiedTime}" />`);
    }
  }

  for (const schema of head.jsonLd) {
    tags.push(`<script type="application/ld+json">${safeJson(schema)}</script>`);
  }

  return tags.join('\n    ');
};

const buildPage = (route) => {
  const head = headFor(route);
  const appHtml = render(route);

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(head.title)}</title>`)
    .replace('<!--app-head-->', headTags(head))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
};

const write = (relPath, contents) => {
  const full = path.join(dist, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
};

/* ---------- paginile ---------- */

const routes = ALL_ROUTES();
for (const route of routes) {
  const file = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}/index.html`;
  write(file, buildPage(route));
  console.log(`  ${route}`);
}

// 404-ul are nevoie de un fișier propriu: nginx îl servește prin `error_page 404`
write('404.html', buildPage('/pagina-inexistenta'));
console.log('  404.html');

/* ---------- sitemap ---------- */

const prioritate = (route) => (route === '/' ? '1.0' : route === '/blog' ? '0.8' : '0.6');

write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${ORIGIN}${route === '/' ? '/' : route}</loc>
    <lastmod>${lastModFor(route)}</lastmod>
    <priority>${prioritate(route)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`
);

/* ---------- RSS ---------- */

const escapeXml = (text) => escapeHtml(text).replace(/'/g, '&apos;');

write(
  'rss.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog OOPS404</title>
    <link>${ORIGIN}/blog</link>
    <description>Cum lucrăm, cât costă lucrurile și ce contează de fapt la un site.</description>
    <language>ro-RO</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${ORIGIN}/rss.xml" rel="self" type="application/rss+xml" />
${POSTS.map(
  (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${ORIGIN}/blog/${post.slug}</link>
      <guid isPermaLink="true">${ORIGIN}/blog/${post.slug}</guid>
      <pubDate>${new Date(`${post.date}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
${post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`
).join('\n')}
  </channel>
</rss>
`
);

/* ---------- robots ---------- */

write(
  'robots.txt',
  `User-agent: *
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`
);

console.log(`  sitemap.xml · rss.xml · robots.txt`);
console.log(`\nPrerender gata: ${routes.length + 1} pagini.`);

/* ---------- avertismente ---------- */

const lipsuri = lipsuriLegale();
if (lipsuri.length > 0) {
  console.warn(
    `\n⚠  Paginile legale au ${lipsuri.length} câmpuri necompletate în src/data/legal.ts:\n` +
      lipsuri.map((c) => `     ${c}`).join('\n') +
      `\n   Site-ul se construiește oricum, dar completează-le înainte de lansare.\n`
  );
}
