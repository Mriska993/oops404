/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta template-ului studio-prism, ridicată puțin ca să nu fie o gaură neagră.
        // Negru cald, de cafea, nu gri rece: aceleași valori ca --bg/--alt/... din index.css
        bg: '#141110',
        alt: '#1A1614',
        surface: '#231E1A',
        paper: '#F6F0E6',
        line: 'rgba(255,236,220,0.14)',
        'line-soft': 'rgba(255,236,220,0.08)',
        white: '#FBF8F3',
        muted: '#A89E94',
        dim: '#7C7269',
        signal: '#22C55E',
        // Din logo: portocaliul-roșu de pe „s", roșul liniilor „404", cărămiziul din mijlocul gradientului.
        ember: '#E4501F',
        'ember-soft': '#F0733F',
        r404: '#EE2E24',
        rust: '#7A4A35',
        ink: '#1B1917',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        // razele „moi" ale site-ului; aceleași valori ca --r-* din index.css
        soft: '14px',
        card: '24px',
        hero: '32px',
      },
      letterSpacing: {
        wider2: '0.12em',
        widest2: '0.2em',
        widest3: '0.3em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
