# OOPS404 — site-ul studioului

React + Vite + Tailwind. Pagina principală e un one-pager; blogul și documentele
legale sunt rute separate. Tot site-ul se generează ca **HTML static la build**, nu
se desenează în browser — vezi [SEO și prerender](#seo-și-prerender).

```
npm install
npm run dev       # dezvoltare, http://localhost:5174
npm run build     # tot lanțul: tipuri → bundle → SSR → HTML static
npm run preview   # servește dist/ exact ca nginx în producție
```

---

## Cum adaugi un articol pe blog

1. Fă un fișier nou în `src/content/blog/`. **Numele fișierului e adresa:**
   `de-ce-nu-lucram-pe-template.md` → `oops404.ro/blog/de-ce-nu-lucram-pe-template`.
   Fără diacritice și fără spații în nume.

2. Începe cu blocul de informații, între două linii de `---`:

   ```markdown
   ---
   titlu: Cât costă de fapt un site în 2026
   descriere: Apare în Google și când dai link pe WhatsApp. Una-două propoziții.
   data: 2026-09-16
   taguri: [business, prețuri]
   autor: OOPS404
   ---

   Textul, în Markdown normal.
   ```

   | Câmp | Obligatoriu | Ce face |
   | --- | --- | --- |
   | `titlu` | da | titlul articolului și al paginii |
   | `descriere` | da | descrierea din Google și din preview-ul de pe WhatsApp |
   | `data` | da | `AAAA-LL-ZZ`. Ordinea pe blog se face după ea |
   | `taguri` | nu | filtrele de pe `/blog`. Scrie-le cu diacritice |
   | `autor` | nu | implicit `OOPS404` |
   | `coperta` | nu | ex. `/blog/poza.webp`, pusă în `public/blog/` |
   | `actualizat` | nu | `AAAA-LL-ZZ`, dacă rescrii un articol vechi |
   | `ciorna` | nu | `ciorna: da` → rămâne în repo, nu ajunge pe site |

3. Scrie. Merg titluri (`##`, `###`), liste, tabele, citate (`>`), blocuri de cod,
   imagini și link-uri. Titlurile de nivel `##` și `###` intră automat în cuprinsul
   din dreapta.

4. `git push`. Ploi face restul.

**Ce se întâmplă singur:** cuprinsul, timpul de citit, articolele înrudite (după
tag-uri comune), intrarea în `sitemap.xml` și în `rss.xml`, datele structurate
pentru Google și cardul de share.

**Link-urile interne** (`/blog/alt-articol`, `/#budget`) se comportă ca restul
site-ului, fără reîncărcare de pagină. Cele externe se deschid în filă nouă singure.

---

## Paginile legale

Textele sunt în `src/content/legal/` (`termeni.md`, `confidentialitate.md`,
`cookies.md`). Datele concrete — denumire firmă, CUI, hosting, ID de Analytics —
stau **într-un singur loc**: `src/data/legal.ts`.

Documentele au bucăți care apar sau dispar singure, după ce e completat acolo:

```markdown
{{#inregistrata}}  ...textul pentru firmă înregistrată...  {{/inregistrata}}
{{^inregistrata}}  ...textul de acum, până există firma... {{/inregistrata}}
{{denumire}}, {{cui}}, {{sediu}}, {{email}}, {{actualizat}}
```

Așa că **nu rescrii documentele când se înființează firma** — pui
`inregistrata: true` și completezi blocul `firma`.

Ce e necompletat apare în pagină ca `[de completat]`, iar build-ul scrie o
avertizare cu lista exactă. Nu oprește deploy-ul, ca să nu blocheze o corectură
urgentă, dar nu trece neobservat.

> Textele acoperă onest ce face site-ul acum. Nu țin loc de consultanță juridică —
> înainte de lansare pune-le în fața unui avocat.

### Fonturile sunt găzduite local

Bodoni Moda și Syne stau în `public/fonts/`, nu pe serverele Google. Un `<link>`
către `fonts.googleapis.com` trimite adresa IP a fiecărui vizitator către Google
înainte de orice consimțământ, doar ca să se încarce literele — o transmitere de
date personale către un terț pentru care nu există temei. Găzduite la noi, terțul
nu mai există.

Ca efect secundar: dacă vizitatorul nu acceptă statisticile, browserul lui **nu
face nicio cerere în afara domeniului nostru**. E o afirmație pe care o poate
verifica, și e scrisă ca atare în politica de cookie-uri.

Când schimbi fonturile, editează familiile în `scripts/fetch-fonts.mjs` și rulează:

```bash
node scripts/fetch-fonts.mjs
```

Descarcă fișierele și regenerează `src/styles/fonts.css`. Ia doar subseturile
`latin` și `latin-ext` — al doilea e obligatoriu pentru ă, ș și ț.

### Cookie-uri și Analytics

Google Analytics se încarcă **doar după „Accept”** în banner. Fără
`LEGAL.analytics.ga4Id` completat, nici bannerul nu apare și nici scriptul nu
există — ceea ce e și fallback-ul sigur dacă cineva uită să pună ID-ul.

Butonul „Setări cookie-uri” din subsol redeschide bannerul oricând. Refuzul e la
fel de vizibil ca acceptul, pentru că așa cere GDPR.

---

## SEO și prerender

Site-ul e un SPA, dar **nu livrează un `<div>` gol**. La fiecare build,
`scripts/prerender.mjs` randează fiecare rută în Node și scrie HTML complet:

```
dist/index.html                  dist/termeni/index.html
dist/blog/index.html             dist/confidentialitate/index.html
dist/blog/<articol>/index.html   dist/cookies/index.html
dist/404.html                    dist/sitemap.xml · rss.xml · robots.txt
```

Browserul hidratează HTML-ul primit (`src/main.tsx`), deci interactivitatea rămâne
neatinsă, dar primul cadru e deja desenat — și Googlebot vede articolul, nu un
container gol.

Titlurile, descrierile, `og:`-urile și datele structurate vin dintr-o **singură**
funcție, `headFor()` din `src/lib/seo.ts`, folosită și de prerender, și de browser
la navigare. Nu există două adevăruri despre același titlu.

### De ce `npm run preview` nu e `vite preview`

`vite preview` are fallback de SPA: întoarce pagina principală pentru *orice*
adresă, deci `/blog` primea HTML-ul de la `/` și hidratarea pica pe un ecran care
în producție e perfect sănătos. `scripts/serve.mjs` se poartă ca nginx: fișier →
director cu `index.html` → `404.html` cu cod 404. (`npm run preview:vite` a rămas,
dacă îl vrei pentru altceva.)

### Depanare

Erorile de hidratare apar minificate („Minified React error #418”). Pentru
mesajul complet:

```bash
npx vite build -c vite.config.debug.ts
npx vite build -c vite.config.debug.ts --ssr src/entry-server.tsx --outDir dist-ssr
node scripts/prerender.mjs
```

---

## Deploy

`git push origin main` → Ploi rulează `deploy.sh`.

Un singur lucru se face **o dată, pe server**:
**[`deploy/nginx.conf`](deploy/nginx.conf)** → Ploi, *Manage Site → Nginx Configuration*.

Partea critică e `try_files $uri $uri/ =404`: un `try_files ... /index.html` clasic de
SPA ar servi pagina principală pentru toate adresele, iar Google ar indexa pagina
principală în locul fiecărui articol. Fișierul conține și anteturile de securitate.

### Ce mai trebuie completat înainte de lansare

Build-ul scrie lista la fiecare deploy. Momentan:

| Unde | Ce | De ce contează |
| --- | --- | --- |
| `src/data/legal.ts` → `hosting.furnizor` | numele furnizorului de găzduire | apare în politică ca împuternicit; acum scrie `[furnizorul de găzduire]` |
| `src/data/legal.ts` → `analytics.ga4Id` | ID-ul GA4 (`G-…`) | fără el nu apare nici bannerul, nici Analytics |
| `src/data/site.ts` → `email` | o adresă pe `oops404.ro` | acum e `contact@depozio.ro`, adresa altui brand — inclusiv pentru cererile GDPR |
