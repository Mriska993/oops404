import { Service, FAQItem, EstimatorOption } from '../types';

// Proiectele stau in projects.ts; le reexportam ca importurile existente sa mearga.
export { PROJECTS_DATA } from './projects';

export const SERVICES_DATA: Service[] = [
  {
    id: 'web-os',
    number: '01',
    title: 'Websites & Portfolios OS',
    tagline: 'Experiențe digitale cinematice, gândite să domine prima impresie.',
    description: 'Construim site-uri de prezentare și portofolii personalizate pixel-cu-pixel. Fiecare detaliu transmite autoritate, rafinament, viteză instantă și un aer premium.',
    deliverables: [
      'Design arhitectural unic (Mobile / Tablet / Desktop)',
      'Optimizare extremă SEO & Core Web Vitals (99/100)',
      'Animații cinematice fluide fără frame drops',
      'Sistem flexibil de administrare conținut'
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Motion'],
    iconName: 'Layout'
  },
  {
    id: 'app-os',
    number: '02',
    title: 'Full-Stack Apps & SaaS OS',
    tagline: 'De la o viziune schițată la o platformă scalabilă și sigură.',
    description: 'Dezvoltăm aplicații web complexe, dashboard-uri administrative, platforme cu autentificare securizată, baze de date optimizate și API-uri de mare viteză.',
    deliverables: [
      'Autentificare securizată (OAuth, Passkeys, Magic Links)',
      'Baze de date optimizate (PostgreSQL, Supabase, Redis)',
      'Dashboard-uri interactive de analiză și gestiune',
      'Arhitectură Cloud rezistentă la trafic mare'
    ],
    techStack: ['Node.js', 'PostgreSQL', 'Supabase', 'React', 'Docker'],
    iconName: 'Code2'
  },
  {
    id: 'commerce-os',
    number: '03',
    title: 'E-Commerce & Digital Store OS',
    tagline: 'Magazine online construite pentru conversii rapide, nu pentru frustrări.',
    description: 'Livrăm experiențe de cumpărare rapide pe orice ecran. Coș fluid, plăți securizate cu cardul sau Apple/Google Pay și sincronizare automată de comenzi.',
    deliverables: [
      'Checkout optimizat în 1-2 pași',
      'Integrare plăți (Stripe, Netopia, PayU, Apple Pay)',
      'Management produse, promoții, cupoane și stocuri',
      'Sincronizare cu firme de curierat (AWB automat)'
    ],
    techStack: ['Next.js', 'Stripe', 'Tailwind', 'Webhook Engine', 'Analytics'],
    iconName: 'ShoppingBag'
  },
  {
    id: 'experience-os',
    number: '04',
    title: 'UI/UX & Brand Direction OS',
    tagline: 'Transformăm un site lent sau învechit într-un magnet de clienți.',
    description: 'Audităm complet interfața ta actuală, identificăm unde pierzi vizitatori și reconstruim experiența digitală pentru un impact maxim.',
    deliverables: [
      'Audit UX detaliat & identificare blocaje conversie',
      'Design System modern & prototipuri interactive',
      'Refactorizare cod pentru încărcare ultra-rapidă',
      'Testare pe toate dispozitivele și browserele'
    ],
    techStack: ['Figma', 'Modern CSS', 'Performance Profiling', 'A/B Testing'],
    iconName: 'Sparkles'
  }
];

// TODO: înlocuiește numele, handle-urile, bio-urile și link-urile cu datele voastre reale.
// Echipa sta in team.ts.
export { TEAM_MEMBERS } from './team';

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'De ce sloganul "No clue, but somehow it works"?',
    answer: 'Este mottoul nostru asumat și modul sincer de a spune că în era tehnologiei moderne, nu pretindem că suntem o corporație rigidă cu răspunsuri din cărți învechite — ci doi ingineri care au curiozitatea, determinarea și abilitatea tehnică de a rezolva ABSOLUT orice provocare digitală până când produsul final funcționează impecabil.',
    tag: 'PHILOSOPHY'
  },
  {
    id: 'faq-2',
    question: 'Cât durează realizarea unui site sau a unei aplicații?',
    answer: 'Un site de prezentare sau portofoliu custom durează în general între 1 și 2 săptămâni. O aplicație web mai complexă sau un magazin online custom durează între 3 și 5 săptămâni. Lucrăm în sprinturi rapide și transparente cu preview-uri în timp real.',
    tag: 'TIMELINE'
  },
  {
    id: 'faq-3',
    question: 'Folosiți șabloane generice de WordPress?',
    answer: 'Zero șabloane prefabricate. Fiecare linie de cod este scrisă de noi cu tehnologii moderne (Next.js, React, Tailwind, TypeScript), personalizată pe brandul și cerințele tale.',
    tag: 'ENGINEERING'
  },
  {
    id: 'faq-4',
    question: 'Voi putea să editez conținutul singur după lansare?',
    answer: 'Da! Dacă ai nevoie să actualizezi texte, poze sau produse, îți configurăm un panou de administrare intuitiv sau un CMS simplu și îți facem un scurt video demonstrativ de 5 minute ca să te descurci fără nicio bătaie de cap.',
    tag: 'CONTROL'
  },
  {
    id: 'faq-5',
    question: 'Cum începem o colaborare?',
    answer: 'Ne trimiți un mesaj rapid pe WhatsApp sau prin formularul de mai jos, ne povestești în câteva cuvinte ce ai vrea să construiești, stabilim o scurtă discuție și îți facem o propunere clară cu etape și costuri.',
    tag: 'START'
  }
];

export const ESTIMATOR_PROJECT_TYPES: EstimatorOption[] = [
  {
    id: 'presentation',
    label: 'Site de Prezentare / Portofoliu',
    description: 'Design arhitectural unic, SEO & optimizare maximă',
    basePrice: 600,
    durationWeeks: 1.5,
  },
  {
    id: 'webapp',
    label: 'Aplicație Web / SaaS MVP',
    description: 'Bază de date, login utilizatori, panou de control, dashboard',
    basePrice: 1400,
    durationWeeks: 3.5,
  },
  {
    id: 'ecommerce',
    label: 'Magazin Online / E-Commerce',
    description: 'Catalog produse, coș de cumpărături, plăți card, AWB curier',
    basePrice: 1000,
    durationWeeks: 2.5,
  },
  {
    id: 'revamp',
    label: 'Redesign & Optimizare Site Existent',
    description: 'Upgrade vizual cinematic, viteză 10x, curățare cod',
    basePrice: 450,
    durationWeeks: 1,
  }
];

export const ESTIMATOR_ADDONS: { id: string; label: string; price: number; timeDays: number }[] = [
  { id: 'cms', label: 'Panou Admin / CMS pentru editare autonomă texte & poze', price: 150, timeDays: 3 },
  { id: 'auth', label: 'Autentificare avansată utilizatori & securitate', price: 200, timeDays: 4 },
  { id: 'payments', label: 'Integrare Plăți Online & Facturare Automată', price: 250, timeDays: 4 },
  { id: 'custom-animations', label: 'Efecte 3D & Animații interactive WOW', price: 180, timeDays: 3 },
  { id: 'seo-boost', label: 'Pachet SEO Avansat & Structurare Date Google', price: 120, timeDays: 2 }
];
