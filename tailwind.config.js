/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta template-ului studio-prism, ridicată puțin ca să nu fie o gaură neagră.
        bg: '#0E0E11',
        alt: '#16161A',
        surface: '#1C1C21',
        paper: '#F4F2ED',
        line: 'rgba(255,255,255,0.13)',
        'line-soft': 'rgba(255,255,255,0.07)',
        white: '#FAFAFA',
        muted: '#8E8E99',
        dim: '#6A6A75',
        signal: '#22C55E',
        // Din logo: portocaliul-roșu de pe „s", roșul liniilor „404", cărămiziul din mijlocul gradientului.
        ember: '#E4501F',
        'ember-soft': '#F0733F',
        r404: '#EE2E24',
        rust: '#7A4A35',
        ink: '#1B1917',
      },
      fontFamily: {
        display: ['Bodoni Moda', 'Georgia', 'serif'],
        sans: ['Syne', 'system-ui', 'sans-serif'],
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
