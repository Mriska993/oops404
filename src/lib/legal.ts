import { LEGAL, completatSau } from '../data/legal';
import { SITE } from '../data/site';
import { TEAM_MEMBERS } from '../data/team';
import { formatDate } from './blog';
import { parseFrontmatter, renderMarkdown, type Heading } from './markdown';

export interface LegalDoc {
  slug: string;
  title: string;
  description: string;
  /** Eticheta scurtă din subsol. */
  menu: string;
  order: number;
  updated: string;
  html: string;
  headings: Heading[];
}

const FILES = import.meta.glob('../content/legal/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/**
 * Valorile pe care le poate folosi un document legal ca `{{denumire}}`.
 * Ce nu e completat în `src/data/legal.ts` apare vizibil ca „[de completat]”,
 * ca să sară în ochi la recitire în loc să lase o frază ciuntită.
 */
const VALORI: Record<string, string> = {
  brand: SITE.name,
  // Pana la infiintarea firmei, operatorul de date sunt chiar ei doi: GDPR cere
  // ca operatorul sa fie identificabil, iar numele lor sunt oricum pe site.
  operatori: TEAM_MEMBERS.map((m) => m.name).join(" și "),
  domeniu: SITE.domain,
  site: `https://${SITE.domain}`,
  email: SITE.email,
  emailConfidentialitate: LEGAL.emailConfidentialitate,
  telefon: SITE.phones[0].display,
  actualizat: formatDate(LEGAL.actualizat),
  denumire: completatSau(LEGAL.firma.denumire),
  cui: completatSau(LEGAL.firma.cui),
  regCom: completatSau(LEGAL.firma.regCom),
  sediu: completatSau(LEGAL.firma.sediu),
  hostingFurnizor: completatSau(LEGAL.hosting.furnizor, '[furnizorul de găzduire]'),
  hostingTara: LEGAL.hosting.tara,
};

const CONDITII: Record<string, boolean> = {
  inregistrata: LEGAL.inregistrata,
  vindeOnline: LEGAL.vindeOnline,
  analytics: Boolean(LEGAL.analytics.ga4Id),
};

/**
 * Șabloane cât să nu fie nevoie de două variante ale aceluiași document:
 *   {{cheie}}              — înlocuiește cu valoarea
 *   {{#conditie}}…{{/…}}   — păstrează blocul doar dacă e adevărată
 *   {{^conditie}}…{{/…}}   — păstrează blocul doar dacă e falsă
 */
const aplicaSablonul = (text: string): string =>
  text
    .replace(/\{\{#(\w+)\}\}\r?\n?([\s\S]*?)\{\{\/\1\}\}\r?\n?/g, (_, cheie, bloc) =>
      CONDITII[cheie] ? bloc : ''
    )
    .replace(/\{\{\^(\w+)\}\}\r?\n?([\s\S]*?)\{\{\/\1\}\}\r?\n?/g, (_, cheie, bloc) =>
      CONDITII[cheie] ? '' : bloc
    )
    .replace(/\{\{(\w+)\}\}/g, (intreg, cheie) => VALORI[cheie] ?? intreg);

export const LEGAL_DOCS: LegalDoc[] = Object.entries(FILES)
  .map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw);
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const { html, headings } = renderMarkdown(aplicaSablonul(body));

    return {
      slug,
      title: (meta.titlu as string) ?? slug,
      menu: (meta.meniu as string) ?? (meta.titlu as string) ?? slug,
      order: Number(meta.ordine ?? 99),
      description: (meta.descriere as string) ?? '',
      updated: formatDate(LEGAL.actualizat),
      html,
      headings,
    };
  })
  .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));

export const getLegalDoc = (slug: string): LegalDoc | undefined =>
  LEGAL_DOCS.find((doc) => doc.slug === slug);
