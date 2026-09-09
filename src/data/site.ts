import { PROJECTS_DATA } from './portfolioData';

/**
 * Datele reale ale studioului. Ce e marcat TODO încă nu e stabilit.
 */
export const SITE = {
  name: 'OOPS404',
  domain: 'oops404.ro',
  slogan: 'No clue, but somehow it works.',
  tagline: 'Web & App Development',
  volume: 'Volumul 2026',
  availability: 'Disponibili · 2 sloturi',

  // TODO: o adresă pe domeniul Oops404. Asta e adresa Depozio, alt brand.
  email: 'contact@depozio.ro',

  /** Ambele numere. TODO: dacă vrei să apară cui aparține fiecare, spune-mi. */
  phones: [
    { display: '+40 761 355 449', wa: '40761355449' },
    { display: '+40 771 072 316', wa: '40771072316' },
  ],

  location: 'România · remote-first',
} as const;

/** WhatsApp pe primul număr. */
export const whatsappLink = (msg = 'Salut Oops404! As vrea sa vorbim despre un proiect.') =>
  `https://wa.me/${SITE.phones[0].wa}?text=${encodeURIComponent(msg)}`;

export const NAV_LINKS = [
  { label: `Work [0${PROJECTS_DATA.length}]`, href: '#work', id: 'work' },
  { label: 'Ce facem', href: '#services', id: 'services' },
  { label: 'Proces', href: '#process', id: 'process' },
  { label: 'Duo', href: '#duo', id: 'duo' },
  { label: 'Buget', href: '#budget', id: 'budget' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];
