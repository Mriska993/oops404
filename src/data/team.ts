import { TeamMember } from '../types';

/**
 * Cei doi. Amândoi lucrează full-stack — nu există „ăla de front" și „ăla de back".
 * Diferă doar unde petrec mai mult timp.
 * Ce e marcat TODO încă nu e confirmat de ei.
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Badea Ana-Maria',
    handle: '', // TODO: handle social, dacă vrei să apară
    role: 'Full-stack · Design',
    bio: 'Scrie cod pe tot stack-ul, dar partea de design e a ei: identitate, layout, tipografie, tot ce face diferența dintre „încă un site" și ceva ce ții minte. Vine din vizualizare 3D și arhitectură, și se vede: construiește un ecran ca pe o cameră în care îți place să stai.',
    favoriteStack: ['TypeScript', 'React', 'Node.js', 'Figma', '3D & Arch Viz'],
    spotifyTrack: {
      title: '', // TODO
      artist: '',
      isPhonk: false,
    },
    coffeePerDay: '', // TODO
    quote: 'Codul îl face să funcționeze. Detaliile îl fac imposibil de uitat.',
    avatarText: '01',
    avatarColor: '#E8503A',
    socials: {
      // TODO: link-urile reale
    },
  },
  {
    name: 'Done George',
    handle: '', // TODO: handle social, dacă vrei să apară
    role: 'Full-stack · Debugging',
    bio: 'Scrie cod pe tot stack-ul, dar el e cel care sparge lucrurile înainte să le spargă utilizatorii: arhitectură, baze de date, servere, și bug-ul ăla pe care nimeni nu reușește să-l reproducă, dar pe care el îl găsește.',
    favoriteStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
    spotifyTrack: {
      title: '', // TODO
      artist: '',
      isPhonk: false,
    },
    coffeePerDay: '', // TODO
    quote: 'Cel mai bun bug e cel care n-a ajuns niciodată în producție.',
    avatarText: '02',
    avatarColor: '#12A05C',
    socials: {
      // TODO: link-urile reale
    },
  },
];
