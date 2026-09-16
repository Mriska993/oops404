import { Project } from '../types';

/**
 * TOATE sunt proiecte proprii, nu lucrări comandate de clienți. Lucrăm amândoi la fiecare,
 * de aceea nu există un câmp „autor".
 * Scris după capturile reale din public/work/ — nu completa cu presupuneri.
 */
export const PROJECTS_DATA: Project[] = [
  {
    id: 'rham',
    title: 'RHAM',
    category: 'app',
    categoryLabel: 'Creative OS / SaaS',
    tagline: 'Build beyond limits.',
    description:
      'Creative Operating System care transformă o singură idee în branduri, site-uri și campanii. Workspace complet: proiecte, brand kit, generare de conținut și librărie de template-uri.',
    fullStory:
      'Produs propriu, încă în construcție. Landing de prezentare plus aplicația din spate: workspace cu proiecte recente, brand kit derivat din identitate, unelte AI de conținut, librărie de template-uri, analytics și export în SVG, PNG și PDF.',
    year: '2026',
    tags: ['Workspace', 'Brand Kit', 'AI Content', 'Templates', 'Analytics', 'Export SVG/PNG/PDF'],
    features: [
      'Workspace cu proiecte recente și status de sistem',
      'Brand Kit derivat din identitatea proiectului',
      'Unelte AI pentru generare de conținut',
      'Librărie de template-uri și export SVG / PNG / PDF',
    ],
    // Archivo = titluri mari/hero, Geist = interfata, Geist Mono = numere si etichete.
    // Accente: Instrument Serif (editorial), Allura (o singura linie, in subsol).
    // Auto-gazduite prin next/font, ca titlurile sa nu sara la incarcare.
    fontPairing: 'Archivo / Geist / Geist Mono',
    liveUrl: 'https://rham.ro',
    image: '/work/rham.webp',
    cover: '/work/covers/rham.webp',
    shot: '/work/shots/rham.webp',
    status: 'in_progress',
    color: '#E11020',
    paletteSwatches: ['#E11020', '#FF4A4A', '#160A0C', '#070405', '#8A8A93'],
  },
  {
    id: 'ana-maria-badea',
    title: 'Ana Maria Badea',
    category: 'web',
    categoryLabel: 'Portofoliu personal',
    tagline:
      'Multidisciplinary designer working where 3D & architectural visualization meets graphic design & branding.',
    description:
      'Portofoliul personal al Anei-Maria, ca designer multidisciplinar care lucrează la intersecția dintre vizualizare 3D și arhitecturală și design grafic și branding.',
    fullStory:
      'Construit în jurul lucrărilor proprii: tipografie editorială cu serif de display și variantă outline, contrast puternic pe fundal închis și un accent coral care conduce ochiul. Structura: About, Services, Work și un CTA direct de contact.',
    year: '2026',
    tags: ['Portofoliu', '3D & Arch Viz', 'Branding', 'Graphic Design', 'Editorial UI'],
    features: [
      'Tipografie editorială cu serif de display și variantă outline',
      'Galerie de lucrări 3D și vizualizări arhitecturale',
      'Secțiuni About / Services / Work',
      'Badge de disponibilitate și contact direct',
    ],
    // Runiga = titluri hero/proiecte, Space Grotesk = titluri secundare + nav, Inter = body.
    // Accente: Nevera (etichete ALL-CAPS), Zaslia (logo), Priestacy (caligrafic, footer).
    fontPairing: 'Runiga / Space Grotesk / Inter',
    liveUrl: 'https://anamariabadea.com',
    image: '/work/ana-maria-badea.webp',
    cover: '/work/covers/badea.webp',
    shot: '/work/shots/badea.webp',
    status: 'live',
    color: '#E8503A',
    paletteSwatches: ['#E8503A', '#F0EFEA', '#171B1E', '#0B0E10', '#8A9095'],
  },
  {
    id: 'omnichat',
    title: 'OmniChat',
    category: 'app',
    categoryLabel: 'SaaS / Asistent AI pentru vânzări',
    tagline: 'Asistentul AI care răspunde clienților tăi automat, 24/7.',
    description:
      'OmniChat preia conversațiile de pe site, WhatsApp și Facebook — fără să angajezi pe nimeni. Setup în 15 minute.',
    fullStory:
      'Produs propriu, construit de la zero: landing de conversie plus aplicația din spate. Unifică trei canale de mesagerie, răspunde automat, are demo live și un program pilot cu număr limitat de locuri. Gândit pentru antreprenorii români.',
    tags: ['Asistent AI', 'WhatsApp', 'Facebook', 'Live Chat', 'Onboarding', 'Billing'],
    features: [
      'Unifică site, WhatsApp și Facebook într-o singură căsuță',
      'Răspunsuri automate, non-stop',
      'Setup complet în 15 minute',
      'Demo live și program pilot pentru primii clienți',
    ],
    // Cifrele afișate chiar pe site-ul produsului.
    metrics: [
      { label: 'Timp de răspuns', value: '<2s' },
      { label: 'Canale unificate', value: '3' },
      { label: 'Setup complet', value: '15 min' },
    ],
    // TODO: fontPairing dupa rebranding
    liveUrl: 'https://omnichat.ro',
    image: '/work/omnichat.webp',
    cover: '/work/covers/omnichat.webp',
    shot: '/work/shots/omnichat.webp',
    status: 'live',
    color: '#12A05C',
    paletteSwatches: ['#12A05C', '#D8F3E5', '#0F1B2A', '#FFFFFF', '#6B7A8C'],
  },
  {
    id: 'depozio',
    title: 'Depozio',
    category: 'app',
    categoryLabel: 'SaaS / WMS pentru eCommerce',
    tagline: 'Software WMS pentru eCommerce. Depozitul tău, sub control total.',
    description:
      'Primești comenzile, le pickezi cu scanner-ul fără greșeli, generezi AWB-ul automat la Sameday și GLS și știi în orice clipă ce stoc ai. Totul într-o singură platformă.',
    fullStory:
      'Produs propriu, WMS gândit pentru eCommerce-ul din România. Panou de comenzi cu stări (nouă, în picking, ambalată, expediată), picking cu scanner, generare automată de AWB către Sameday și GLS și stoc în timp real.',
    tags: ['WMS', 'Picking cu scanner', 'AWB Sameday & GLS', 'Stoc real-time', 'Dashboard'],
    features: [
      'Panou de comenzi cu stări: nouă, în picking, ambalată, expediată',
      'Picking cu scanner, fără greșeli',
      'Generare automată de AWB la Sameday și GLS',
      'Stoc în timp real, într-o singură platformă',
    ],
    metrics: [
      { label: 'Generare AWB', value: '1,2 s' },
      { label: 'Trial', value: '14 zile' },
      { label: 'Implementare', value: 'zile' },
    ],
    // TODO: fontPairing dupa rebranding
    liveUrl: 'https://depozio.ro',
    image: '/work/depozio.webp',
    cover: '/work/covers/depozio.webp',
    shot: '/work/shots/depozio.webp',
    status: 'live',
    color: '#0E7A5F',
    paletteSwatches: ['#0E7A5F', '#D6EFE4', '#0B1220', '#FFFFFF', '#64748B'],
  },
  {
    id: '3bobite',
    title: '3bobite',
    category: 'web',
    categoryLabel: 'Carnet de sănătate pentru animale',
    tagline: 'Carnetul de sănătate al animalului tău, la tine în buzunar.',
    description:
      'Carnetul de sănătate al câinelui sau pisicii tale, ținut de tine: vaccinuri, deparazitări, greutate, documente și o pagină de urgență pe care orice veterinar o deschide de pe un cod QR. Gratuit, fără reclame, în română.',
    fullStory:
      'Produs propriu, în beta. Vaccinurile și deparazitările au dată de expirare și reminder pe email cu două săptămâni înainte; greutatea se vede în grafic; analizele, rețetele și biletele de externare se țin fotografiate sau ca PDF. Pagina de urgență stă pe zgardă, sub un cod QR: se deschide fără cont și fără aplicație, cu ce trebuie să vadă un veterinar în primele 30 de secunde — microcip, grupă sanguină, alergii, tratament în curs. Gândit și pentru clinici și pentru donatori de sânge.',
    year: '2026',
    tags: ['Carnet de sănătate', 'Vaccinuri', 'Deparazitări', 'Pagină de urgență QR', 'Documente', 'Blog'],
    features: [
      'Vaccinuri și deparazitări cu dată de expirare și reminder pe email',
      'Greutatea în grafic, cu fiecare cântărire',
      'Documente fotografiate sau PDF: analize, rețete, bilete de externare',
      'Pagină de urgență pe cod QR, fără cont și fără aplicație, cu copie offline',
    ],
    // Cifrele afișate chiar pe site-ul produsului.
    metrics: [
      { label: 'Cost', value: 'gratuit' },
      { label: 'Reclame', value: '0' },
      { label: 'Urgență de pe QR', value: '30 s' },
    ],
    // Fraunces = titluri, Atkinson Hyperlegible = text.
    fontPairing: 'Fraunces / Atkinson Hyperlegible',
    liveUrl: 'https://3bobite.ro',
    image: '/work/3bobite.webp',
    shot: '/work/shots/3bobite.webp',
    status: 'in_progress',
    // Culorile luate de pe site (fundal crem, bleumarin) și din logo (coral).
    color: '#1F2A44',
    paletteSwatches: ['#1F2A44', '#F3ECDA', '#FE5C4D', '#FFFFFF', '#6B7A8C'],
  },
  {
    id: 'notata',
    title: 'notata',
    category: 'app',
    categoryLabel: 'SaaS / Comenzi la masă pentru HoReCa',
    tagline: 'O masă bună începe cu un „imediat”.',
    description:
      'notata leagă masa, clientul, ospătarul și bucătăria într-un singur flux. Clientul scanează codul QR de pe masă, comandă din browser — fără să instaleze nimic — iar comanda ajunge direct pe ecranul bucătăriei.',
    fullStory:
      'Produs propriu: sistem românesc de comandă la masă prin cod QR pentru restaurante, pizzerii și terase. O comandă trece prin trei ecrane sincronizate — telefonul clientului, ecranul bucătăriei și harta meselor a ospătarului — plus un panou de administrare cu meniu foto, mese și rapoarte. Nu se leagă la casa de marcat și nu cere hardware de cumpărat: plata și bonul fiscal rămân la ospătar. Lansat cu un program pilot în care localurile intră fără cost, cu meniul și QR-urile configurate de noi.',
    tags: ['Comandă prin QR', 'Meniu digital', 'KDS bucătărie', 'Harta meselor', 'Rapoarte', 'HoReCa'],
    features: [
      'Meniu digital cu fotografii, opțiuni, alergeni și preferințe („fără ceapă”)',
      'Comandă de la masă prin cod QR, direct în browser, fără aplicație',
      'Ecran de bucătărie live: de preparat / în lucru / gata, cu timp pe tichet',
      'Harta meselor pentru ospătar și panou cu comenzi, vânzări și mese deschise',
    ],
    // Cifrele afisate chiar pe site-ul produsului.
    metrics: [
      { label: 'Aplicații de instalat', value: '0' },
      { label: 'Ecrane sincronizate', value: '3' },
      { label: 'Preț de fondator', value: '149 lei/lună' },
    ],
    // Fonturi de sistem, fara webfonts: Georgia pentru titluri, stiva de UI pentru restul.
    fontPairing: 'Georgia / Segoe UI',
    liveUrl: 'https://notata.ro',
    cover: '/work/covers/notata.webp',
    shot: '/work/shots/notata.webp',
    status: 'live',
    color: '#D76543',
    paletteSwatches: ['#D76543', '#EDAE49', '#627762', '#F6F2E9', '#1F2421'],
  },
];
