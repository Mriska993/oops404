import { LEGAL } from '../data/legal';

/**
 * Consimțământul pentru statistici.
 *
 * Regula pe care se sprijină tot fișierul: **până la un „Accept” explicit, scriptul
 * Google nu ajunge deloc în pagină.** Nu e încărcat și dezactivat, nu e amânat —
 * pur și simplu nu există. Politica de cookie-uri invită vizitatorul să verifice
 * asta în fila Network, deci trebuie să fie adevărat.
 */

const CHEIE = 'oops404_consent';
const VERSIUNE = 1;

export type StareConsimtamant = 'acceptat' | 'refuzat' | 'neintrebat';

interface ConsimtamantSalvat {
  stare: 'acceptat' | 'refuzat';
  data: string;
  versiune: number;
}

type Ascultator = (stare: StareConsimtamant) => void;
const ascultatori = new Set<Ascultator>();

/** localStorage poate arunca (mod privat, storage blocat). Nicăieri nu merită o pagină albă. */
const citesteBrut = (): ConsimtamantSalvat | null => {
  if (typeof window === 'undefined') return null;
  try {
    const brut = window.localStorage.getItem(CHEIE);
    if (!brut) return null;
    const salvat = JSON.parse(brut) as ConsimtamantSalvat;
    if (salvat.versiune !== VERSIUNE) return null;

    const zile = (Date.now() - new Date(salvat.data).getTime()) / 86_400_000;
    if (zile > LEGAL.analytics.zileConsimtamant) return null;

    return salvat;
  } catch {
    return null;
  }
};

export const stareConsimtamant = (): StareConsimtamant => citesteBrut()?.stare ?? 'neintrebat';

const scrie = (stare: 'acceptat' | 'refuzat') => {
  try {
    window.localStorage.setItem(
      CHEIE,
      JSON.stringify({ stare, data: new Date().toISOString(), versiune: VERSIUNE })
    );
  } catch {
    /* fără memorie persistentă întrebăm din nou data viitoare — acceptabil */
  }
};

export const asculta = (fn: Ascultator): (() => void) => {
  ascultatori.add(fn);
  return () => ascultatori.delete(fn);
};

const anunta = (stare: StareConsimtamant) => ascultatori.forEach((fn) => fn(stare));

/* ---------- Google Analytics ---------- */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let incarcat = false;

const incarcaAnalytics = () => {
  const id = LEGAL.analytics.ga4Id;
  if (incarcat || !id || typeof document === 'undefined') return;
  incarcat = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag citește `arguments` ca atare; un rest parameter ar strica formatul
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  window.gtag('js', new Date());
  // trimitem noi fiecare afișare de pagină: într-un SPA, navigările nu sunt încărcări
  window.gtag('config', id, { send_page_view: false, anonymize_ip: true });
};

/** Șterge ce a apucat Google să pună, ca retragerea acordului să însemne ceva. */
const stergeCookieuriGoogle = () => {
  const id = LEGAL.analytics.ga4Id;
  if (id) (window as unknown as Record<string, boolean>)[`ga-disable-${id}`] = true;

  const gazda = window.location.hostname;
  const domenii = [gazda, `.${gazda}`, `.${gazda.split('.').slice(-2).join('.')}`];

  for (const cookie of document.cookie.split(';')) {
    const nume = cookie.split('=')[0]?.trim();
    if (!nume || !/^_ga|^_gid$|^_gat/.test(nume)) continue;

    for (const domeniu of domenii) {
      document.cookie = `${nume}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domeniu}`;
    }
    document.cookie = `${nume}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
};

export const accepta = (): void => {
  scrie('acceptat');
  incarcaAnalytics();
  trimitePagina(window.location.pathname + window.location.search);
  anunta('acceptat');
};

export const refuza = (): void => {
  scrie('refuzat');
  stergeCookieuriGoogle();
  anunta('refuzat');
};

/** Butonul „Setări cookie-uri” din subsol: uită alegerea și redeschide bannerul. */
export const redeschide = (): void => {
  try {
    window.localStorage.removeItem(CHEIE);
  } catch {
    /* ignorat intenționat */
  }
  anunta('neintrebat');
};

/** La pornire: dacă acordul e deja dat și încă valabil, pornim Analytics. */
export const initConsimtamant = (): void => {
  if (stareConsimtamant() === 'acceptat') incarcaAnalytics();
};

/** O afișare de pagină. Nu face nimic dacă n-avem acord — gtag nici nu există. */
export const trimitePagina = (cale: string): void => {
  if (!incarcat || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: cale,
    page_location: window.location.href,
    page_title: document.title,
  });
};
