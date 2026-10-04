import { Service, FAQItem, EstimatorOption } from '../types';

// Proiectele stau in projects.ts; le reexportam ca importurile existente sa mearga.
export { PROJECTS_DATA } from './projects';

export const SERVICES_DATA: Service[] = [
  {
    id: 'web-os',
    number: '01',
    title: 'Site-uri care spun o poveste',
    tagline: 'Ai trei secunde până își face omul o părere. Le folosim bine.',
    description: 'Site-uri de prezentare și portofolii desenate de la zero, pornind de la ce ai tu de spus, nu de la un șablon. Sunt rapide și aerisite, cu fiecare detaliu la locul lui, așa încât omul care intră să rămână, să citească și să-ți scrie.',
    deliverables: [
      'Design unic, gândit întâi pentru telefon, apoi pentru restul ecranelor',
      'Se încarcă instant și îl găsește Google (Core Web Vitals pe verde)',
      'Animații fine, care nu sacadează și nu obosesc',
      'Un panou simplu din care îți schimbi singur textele și pozele'
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Motion'],
    iconName: 'Layout'
  },
  {
    id: 'app-os',
    number: '02',
    title: 'Aplicații care țin o afacere în picioare',
    tagline: 'De la o schiță pe șervețel la ceva pe care te bazezi în fiecare zi.',
    description: 'Aplicații web, panouri de administrare, platforme cu conturi, plăți și rapoarte, construite să crească odată cu tine, cu un cod scris destul de clar încât peste doi ani să-l înțeleagă oricine.',
    deliverables: [
      'Conturi și autentificare sigură: parolă, Google, link pe email sau passkey',
      'Baze de date care rămân rapide și când ai de zece ori mai mulți utilizatori',
      'Panouri de administrare în care vezi dintr-o privire ce contează',
      'Servere care nu cad exact când ți-e lumea mai dragă'
    ],
    techStack: ['Node.js', 'PostgreSQL', 'Supabase', 'React', 'Docker'],
    iconName: 'Code2'
  },
  {
    id: 'commerce-os',
    number: '03',
    title: 'Magazine online în care e plăcut să cumperi',
    tagline: 'Coș simplu, plată fără emoții, comenzi care ajung singure la curier.',
    description: 'Magazine rapide pe orice ecran, cu un checkout simplu și plăți sigure cu cardul, Apple Pay sau Google Pay, în care tu te ocupi de produse și de clienți, iar restul merge singur.',
    deliverables: [
      'Checkout în 1-2 pași, fără cont obligatoriu',
      'Plăți cu cardul, Apple Pay și Google Pay (Stripe, Netopia, PayU)',
      'Produse, promoții, cupoane și stocuri, toate dintr-un singur loc',
      'AWB-ul la curier se generează singur când intră comanda'
    ],
    techStack: ['Next.js', 'Stripe', 'Tailwind', 'Webhook Engine', 'Analytics'],
    iconName: 'ShoppingBag'
  },
  {
    id: 'experience-os',
    number: '04',
    title: 'Site-ul tău, adus la zi',
    tagline: 'Ai deja un site, dar nu-ți mai place de el? Te înțelegem. Îl refacem.',
    description: 'Ne uităm cu atenție la ce ai acum, aflăm unde pierzi oamenii și refacem ce trebuie, mai clar, mai rapid și mai al tău, fără să o iei de la zero dacă nu e nevoie și fără să-ți pierzi locul din Google.',
    deliverables: [
      'Audit sincer: unde se blochează oamenii și de ce pleacă',
      'Design nou, cu prototip pe care îl testezi înainte să scriem cod',
      'Viteză: cod curățat, imagini optimizate, scor verde în Google',
      'Testat pe telefoane, tablete și browsere adevărate, nu doar în simulator'
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
    answer: 'Pentru că e adevărat, și pentru că ne place să râdem de noi. Nu suntem o corporație cu răspunsuri gata scrise. Suntem doi oameni curioși și încăpățânați, care nu se lasă până când lucrul pe care l-au promis chiar funcționează. Sloganul e felul nostru de a spune: nu știm încă totul, dar nu ne lăsăm până merge.',
    tag: 'Despre noi'
  },
  {
    id: 'faq-2',
    question: 'Cât durează realizarea unui site sau a unei aplicații?',
    answer: 'Un site de prezentare sau un portofoliu durează, de obicei, între 1 și 2 săptămâni. O aplicație web sau un magazin online, între 3 și 5 săptămâni. Lucrăm în pași mici și vizibili: ai un link pe care vezi progresul în fiecare zi, nu o surpriză la final.',
    tag: 'Timp'
  },
  {
    id: 'faq-3',
    question: 'Folosiți șabloane generice de WordPress?',
    answer: 'Nu. Fiecare linie de cod e scrisă de noi, pentru tine. Un șablon arată ca alte zece mii de site-uri și se strică exact când ai nevoie de el. Ce construim noi e al tău, îl înțelegem până la ultimul detaliu și îl putem schimba oricând.',
    tag: 'Cod'
  },
  {
    id: 'faq-4',
    question: 'Voi putea să editez conținutul singur după lansare?',
    answer: 'Da. Dacă vrei să schimbi texte, poze sau produse, îți pregătim un panou de administrare simplu și îți facem un video de 5 minute în care îți arătăm tot. Și dacă te blochezi, ne scrii. Nu dispărem după lansare.',
    tag: 'După'
  },
  {
    id: 'faq-5',
    question: 'Cum începem o colaborare?',
    answer: 'Ne scrii pe WhatsApp sau prin formularul de mai jos, cum i-ai povesti unui prieten: ce faci, ce te deranjează acum, ce ți-ar plăcea să ai. Vorbim o jumătate de oră, apoi primești o propunere clară, cu pași și costuri. Fără obligații.',
    tag: 'Start'
  }
];

export const ESTIMATOR_PROJECT_TYPES: EstimatorOption[] = [
  {
    id: 'presentation',
    label: 'Site de prezentare sau portofoliu',
    description: 'Design făcut pentru tine, rapid, găsit ușor pe Google',
    basePrice: 600,
    durationWeeks: 1.5,
  },
  {
    id: 'webapp',
    label: 'Aplicație web sau platformă',
    description: 'Conturi, bază de date, panou de administrare, rapoarte',
    basePrice: 1400,
    durationWeeks: 3.5,
  },
  {
    id: 'ecommerce',
    label: 'Magazin online',
    description: 'Catalog, coș, plată cu cardul, AWB la curier',
    basePrice: 1000,
    durationWeeks: 2.5,
  },
  {
    id: 'revamp',
    label: 'Redesign pentru site-ul actual',
    description: 'Aspect nou, viteză mai bună, cod curățat',
    basePrice: 450,
    durationWeeks: 1,
  }
];

export const ESTIMATOR_ADDONS: { id: string; label: string; price: number; timeDays: number }[] = [
  { id: 'cms', label: 'Panou de administrare, ca să-ți schimbi singur textele și pozele', price: 150, timeDays: 3 },
  { id: 'auth', label: 'Conturi de utilizator și autentificare sigură', price: 200, timeDays: 4 },
  { id: 'payments', label: 'Plăți online și facturare automată', price: 250, timeDays: 4 },
  { id: 'custom-animations', label: 'Animații și efecte care fac site-ul memorabil', price: 180, timeDays: 3 },
  { id: 'seo-boost', label: 'Pachet SEO, ca să te găsească Google mai ușor', price: 120, timeDays: 2 }
];
