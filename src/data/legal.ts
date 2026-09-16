import { SITE } from './site';

/**
 * ⚠️ FIȘIERUL ĂSTA TREBUIE COMPLETAT ÎNAINTE DE LANSARE.
 *
 * Tot ce apare în paginile legale vine de aici. Textele sunt scrise pentru situația
 * de acum: OOPS404 nu e încă persoană juridică înregistrată, iar site-ul nu vinde
 * nimic online — e un site de prezentare cu formular de contact.
 *
 * Când înregistrați firma:
 *   1. pune `inregistrata: true` și completează blocul `firma`
 *   2. verifică `src/content/legal/termeni.md` — secțiunile marcate cu
 *      „DUPĂ ÎNREGISTRARE” se activează singure, dar merită recitite
 *   3. dacă începeți să vindeți online către consumatori (abonamente, pachete
 *      cumpărate direct de pe site), devin obligatorii ANPC + SOL și dreptul de
 *      retragere în 14 zile — pune `vindeOnline: true` și recitește tot
 *
 * Nimic din ce e aici nu ține loc de consultanță juridică. Textele acoperă onest
 * ce face site-ul acum; înainte de lansare pune-le în fața unui avocat.
 */

export const LEGAL = {
  /** Data de la care se aplică versiunea curentă a documentelor. */
  actualizat: '2026-09-16',

  /** Devine `true` când OOPS404 e SRL/PFA înregistrat. */
  inregistrata: false,

  /** `true` doar dacă se poate cumpăra ceva direct de pe site (card, abonament). */
  vindeOnline: false,

  firma: {
    // TODO: denumirea exactă din certificatul de înregistrare, ex. „OOPS404 STUDIO S.R.L.”
    denumire: 'OOPS404',
    // TODO: CUI / CIF
    cui: '',
    // TODO: nr. de ordine în registrul comerțului, ex. J40/1234/2027
    regCom: '',
    // TODO: sediul social, complet
    sediu: '',
    // TODO: IBAN + banca, dacă vrei să apară în Termeni
    iban: '',
    banca: '',
  },

  /**
   * Adresa pentru cereri GDPR. Momentan e aceeași cu cea de contact.
   * TODO: mutată pe domeniul propriu odată cu restul (vezi TODO-ul din site.ts).
   */
  emailConfidentialitate: SITE.email,

  /**
   * Cine ne găzduiește site-ul. Apare în politica de confidențialitate ca
   * împuternicit — logurile de acces conțin IP-uri.
   * TODO: completează furnizorul real și țara serverului.
   */
  hosting: {
    furnizor: '',
    tara: 'România',
  },

  /**
   * Google Analytics 4. Fără ID, scriptul nu se încarcă niciodată — util în
   * dezvoltare și un fallback sigur dacă cineva uită să-l pună.
   * TODO: pune ID-ul real, format G-XXXXXXXXXX.
   */
  analytics: {
    ga4Id: '',
    /** Cât ține consimțământul înainte să întrebăm din nou. Recomandarea CNIL: 6 luni. */
    zileConsimtamant: 182,
  },
} as const;

/** Un placeholder necompletat nu trebuie să ajungă pe site ca text gol. */
export const completatSau = (value: string, placeholder = '[de completat]'): string =>
  value.trim() || placeholder;

/** Ce lipsește din blocurile de mai sus. Îl folosește scriptul de build ca să avertizeze. */
export const lipsuriLegale = (): string[] => {
  const lipsuri: string[] = [];

  if (LEGAL.inregistrata) {
    if (!LEGAL.firma.cui) lipsuri.push('LEGAL.firma.cui');
    if (!LEGAL.firma.regCom) lipsuri.push('LEGAL.firma.regCom');
    if (!LEGAL.firma.sediu) lipsuri.push('LEGAL.firma.sediu');
  }
  if (!LEGAL.hosting.furnizor) lipsuri.push('LEGAL.hosting.furnizor');
  if (!LEGAL.analytics.ga4Id) lipsuri.push('LEGAL.analytics.ga4Id');

  return lipsuri;
};
