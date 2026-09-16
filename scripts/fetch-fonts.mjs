import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Aduce fonturile de la Google o singură dată, ca fișiere, și scrie `@font-face`-urile
 * locale. Se rulează manual, când schimbi fonturile:
 *
 *     node scripts/fetch-fonts.mjs
 *
 * De ce nu le lăsăm pe serverele Google: un `<link>` către fonts.googleapis.com
 * trimite adresa IP a fiecărui vizitator către Google, înainte de orice consimțământ,
 * doar ca să se vadă literele cum trebuie. E o transmitere de date personale către
 * un terț, pentru care nu avem temei — și pentru care o instanță germană a dat deja
 * verdict (LG München I, 3 O 17493/20, 2022). Găzduite local, problema dispare
 * complet: nu mai există un terț.
 *
 * Bonus care nu strică: dispar două conexiuni DNS+TLS de la începutul încărcării.
 */

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dirFonturi = path.join(root, 'public', 'fonts');
const fisierCss = path.join(root, 'src', 'styles', 'fonts.css');

const URL_GOOGLE =
  'https://fonts.googleapis.com/css2' +
  '?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700' +
  // interval, nu greutăți separate: Syne e font variabil, deci un singur fișier
  // acoperă tot de la 400 la 800, iar browserul interpolează între ele
  '&family=Syne:wght@400..800' +
  '&display=swap';

/**
 * Doar subseturile de care avem nevoie. `latin` acoperă alfabetul de bază, â și î
 * (U+00E2, U+00EE), ghilimelele „” și €; `latin-ext` aduce ă, ș și ț (U+0103, U+0219,
 * U+021B). Fără al doilea, jumătate din diacriticele românești ar cădea pe un font
 * de rezervă — se vede imediat într-un cuvânt ca „înțelesul”.
 *
 * Restul (math, symbols, cyrillic, greek) nu apar nicăieri pe site.
 */
const SUBSETURI = new Set(['latin', 'latin-ext']);

// fără un user-agent de browser modern, Google întoarce ttf/woff în loc de woff2
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

console.log('Cer CSS-ul de la Google Fonts...');
const css = await (await fetch(URL_GOOGLE, { headers: { 'user-agent': UA } })).text();

/**
 * CSS-ul vine ca serie de „comentariu cu numele subsetului + @font-face”.
 * Comentariul e singurul loc din care afli ce subset e blocul — nu există în reguli.
 */
const blocuri = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g)];
if (blocuri.length === 0) throw new Error('nu am putut citi CSS-ul de la Google');

fs.mkdirSync(dirFonturi, { recursive: true });
fs.mkdirSync(path.dirname(fisierCss), { recursive: true });

const pastrate = [];
const scrise = new Set();

for (const [, subset, regula] of blocuri) {
  if (!SUBSETURI.has(subset)) continue;

  const familie = /font-family:\s*'([^']+)'/.exec(regula)?.[1];
  const stil = /font-style:\s*(\w+)/.exec(regula)?.[1] ?? 'normal';
  const greutate = /font-weight:\s*([\d\s]+)/.exec(regula)?.[1].trim() ?? '400';
  const sursa = /url\((https:[^)]+)\)/.exec(regula)?.[1];
  if (!familie || !sursa) continue;

  const nume = `${slug(familie)}-${stil}-${subset}.woff2`;
  const caleLocala = path.join(dirFonturi, nume);

  if (!scrise.has(nume)) {
    const raspuns = await fetch(sursa, { headers: { 'user-agent': UA } });
    if (!raspuns.ok) throw new Error(`nu am putut descărca ${nume}: ${raspuns.status}`);
    const octeti = Buffer.from(await raspuns.arrayBuffer());
    fs.writeFileSync(caleLocala, octeti);
    scrise.add(nume);
    console.log(`  ${nume.padEnd(38)} ${(octeti.length / 1024).toFixed(1)} KB`);
  }

  pastrate.push({
    familie,
    stil,
    greutate,
    subset,
    nume,
    unicodeRange: /unicode-range:\s*([^;]+);/.exec(regula)?.[1].trim(),
  });
}

const continut = `/*
  GENERAT DE scripts/fetch-fonts.mjs — nu edita direct.
  Rulează scriptul din nou după ce schimbi fonturile în el.

  Fișierele stau în public/fonts/ și se servesc de pe domeniul nostru. Nicio cerere
  către Google: adresa IP a vizitatorului nu mai pleacă nicăieri doar ca să se
  încarce literele. Vezi comentariul lung din script pentru de ce contează.

  Sursa: ${URL_GOOGLE}
  Adus la: ${new Date().toISOString().slice(0, 10)}
  Licență: SIL Open Font License 1.1 (ambele familii)
*/

${pastrate
  .map(
    ({ familie, stil, greutate, subset, nume, unicodeRange }) => `/* ${familie} · ${stil} · ${subset} */
@font-face {
  font-family: '${familie}';
  font-style: ${stil};
  font-weight: ${greutate};
  font-display: swap;
  src: url('/fonts/${nume}') format('woff2');${unicodeRange ? `\n  unicode-range: ${unicodeRange};` : ''}
}`
  )
  .join('\n\n')}
`;

fs.writeFileSync(fisierCss, continut);

console.log(`\n${scrise.size} fișiere în public/fonts/`);
console.log(`${pastrate.length} reguli @font-face în src/styles/fonts.css`);
