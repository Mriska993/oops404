export interface Project {
  id: string;
  title: string;
  category: 'web' | 'app';
  categoryLabel: string;
  /** Propoziția-cheie, de obicei chiar headline-ul de pe site. */
  tagline: string;
  description: string;
  fullStory: string;
  /** Anul. Optional — daca nu il stim, celula nu se afiseaza deloc. */
  year?: string;
  tags: string[];
  features: string[];
  /** Cifre. Doar valori reale — dacă nu le ai, lasă câmpul gol. */
  metrics?: { label: string; value: string }[];
  /** Fonturile folosite, ex: 'Syne / Inter'. Optional — apare doar daca il completezi. */
  fontPairing?: string;
  liveUrl?: string;
  /** Captura reală a produsului, din public/work/. Apare in case study. */
  image?: string;
  /** Coperta generata, din public/work/covers/. Apare in grila. */
  cover?: string;
  status: 'live' | 'in_progress';
  /** Culoarea dominantă a proiectului, luată din capturi. */
  color: string;
  paletteSwatches: string[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  iconName: string;
}

export interface TeamMember {
  name: string;
  handle: string;
  role: string;
  bio: string;
  favoriteStack: string[];
  spotifyTrack: {
    title: string;
    artist: string;
    isPhonk: boolean;
  };
  coffeePerDay: string;
  quote: string;
  avatarText: string;
  avatarColor: string;
  socials: {
    github?: string;
    linkedin?: string;
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  tag: string;
}

export interface EstimatorOption {
  id: string;
  label: string;
  description: string;
  basePrice: number;
  durationWeeks: number;
}
