import { Marked } from 'marked';

/**
 * Markdown-ul din `src/content/`. Textele sunt scrise de noi și trec prin build,
 * nu vin de la utilizatori — de aceea nu e nevoie de sanitizare. Dacă vreodată
 * ajunge aici conținut din afară (comentarii, un CMS deschis), treci-l printr-un
 * sanitizer înainte de `dangerouslySetInnerHTML`.
 */

/** Diacriticele românești, ca slug-urile să iasă curate: „Cât costă” → „cat-costa”. */
export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[șş]/g, 's')
    .replace(/[țţ]/g, 't')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export interface Frontmatter {
  [key: string]: string | string[];
}

export interface ParsedDoc {
  meta: Frontmatter;
  body: string;
}

/**
 * Frontmatter minimal, cât ne trebuie: `cheie: valoare` și `cheie: [a, b, c]`.
 * Nu e YAML complet și nici nu vrem să fie — formatul e al nostru, îl ținem simplu.
 */
export const parseFrontmatter = (raw: string): ParsedDoc => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { meta: {}, body: raw };

  const meta: Frontmatter = {};

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;

    const sep = line.indexOf(':');
    if (sep === -1) continue;

    const key = line.slice(0, sep).trim();
    let value = line.slice(sep + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      meta[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => unquote(item.trim()))
        .filter(Boolean);
      continue;
    }

    value = unquote(value);
    if (value) meta[key] = value;
  }

  return { meta, body: raw.slice(match[0].length) };
};

const unquote = (value: string): string =>
  (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))
    ? value.slice(1, -1)
    : value;

export interface Heading {
  id: string;
  text: string;
  level: number;
}

const stripTags = (html: string) => html.replace(/<[^>]*>/g, '');

/**
 * Randează Markdown-ul și scoate, în același timp, lista de titluri (pentru cuprins).
 * Titlurile primesc `id`, ca să poți da link direct către o secțiune.
 */
export const renderMarkdown = (body: string): { html: string; headings: Heading[] } => {
  const headings: Heading[] = [];
  const used = new Set<string>();

  const marked = new Marked({ gfm: true, breaks: false });

  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = stripTags(this.parser.parseInline(tokens));

        let id = slugify(text);
        // două secțiuni cu același nume ar da același id, iar ancora ar duce mereu la prima
        let n = 2;
        while (used.has(id)) id = `${slugify(text)}-${n++}`;
        used.add(id);

        if (depth >= 2 && depth <= 3) headings.push({ id, text, level: depth });

        return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href) && !href.includes('oops404.ro');
        const attrs = external ? ' target="_blank" rel="noreferrer noopener"' : '';
        return `<a href="${href}"${title ? ` title="${title}"` : ''}${attrs}>${text}</a>`;
      },
    },
  });

  return { html: marked.parse(body) as string, headings };
};

/** ~220 cuvinte pe minut, rotunjit în sus. Minimum un minut, ca să nu scrie „0 min”. */
export const readingMinutes = (body: string): number =>
  Math.max(1, Math.round(body.trim().split(/\s+/).length / 220));

/** Prima frază sau două, pentru cazul în care lipsește `descriere` din frontmatter. */
export const excerpt = (body: string, max = 180): string => {
  const plain = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (plain.length <= max) return plain;
  const cut = plain.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};
