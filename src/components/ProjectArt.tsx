import React from 'react';
import { Project } from '../types';

/**
 * Vizualul unui proiect.
 *
 * Dacă proiectul are `image` (pui fișierul în `public/work/`), se folosește captura reală
 * — asta e varianta bună, template-ul trăiește din imagini pe tot cadrul.
 *
 * Fără ea desenăm un mockup de site în SVG: se scalează în orice raport (slice),
 * arată bine alb-negru în repaus și color la hover, exact ca fotografiile din template.
 */
export const ProjectArt: React.FC<{ project: Project; index: number; src?: string }> = ({
  project,
  index,
  src,
}) => {
  if (src) {
    return (
      <img
        src={src}
        alt={project.title}
        loading="lazy"
        className="tile__art size-full object-cover object-top"
      />
    );
  }

  const light = index % 2 === 0;

  const page = light ? '#EFEDE7' : '#101014';
  const ink = light ? '#14140F' : '#F4F2ED';
  const soft = light ? 'rgba(20,20,15,0.13)' : 'rgba(244,242,237,0.16)';
  const chrome = light ? '#DEDBD3' : '#1B1B21';
  const accent = project.color;

  const url = project.liveUrl?.replace('https://', '') ?? `${project.id}.ro`;
  const words = project.title.toUpperCase().split(' ');

  return (
    <svg
      className="tile__art"
      viewBox="0 0 1200 750"
      preserveAspectRatio="xMinYMin slice"
      role="img"
      aria-label={`Mockup ${project.title}`}
    >
      {/* pagina */}
      <rect width="1200" height="750" fill={page} />

      {/* bara de browser */}
      <rect width="1200" height="54" fill={chrome} />
      <circle cx="30" cy="27" r="6" fill={soft} />
      <circle cx="52" cy="27" r="6" fill={soft} />
      <circle cx="74" cy="27" r="6" fill={soft} />
      <rect x="104" y="14" width="330" height="26" rx="13" fill={page} opacity="0.75" />
      <text x="122" y="32" fill={ink} opacity="0.55" fontFamily="Syne, sans-serif" fontSize="14" fontWeight="600">
        {url}
      </text>

      {/* nav-ul site-ului mockup */}
      <rect x="0" y="54" width="1200" height="1" fill={soft} />
      <text x="60" y="104" fill={ink} fontFamily="Syne, sans-serif" fontSize="17" fontWeight="800" letterSpacing="2">
        {project.title.toUpperCase()}
      </text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={880 + i * 86} y={94} width="62" height="9" rx="4" fill={ink} opacity="0.22" />
      ))}

      {/* titlu mare */}
      {words.slice(0, 2).map((w, i) => (
        <text
          key={w + i}
          x="60"
          y={250 + i * 96}
          fill={ink}
          fontFamily="Marcellus, Georgia, serif"
          fontSize="96"
        >
          {w}
        </text>
      ))}

      {/* paragraf */}
      {[520, 430, 470].map((w, i) => (
        <rect key={i} x="60" y={390 + i * 22} width={w} height="9" rx="4" fill={ink} opacity="0.2" />
      ))}

      {/* buton de accent */}
      <rect x="60" y="480" width="192" height="50" fill={accent} />
      <rect x="276" y="480" width="150" height="50" fill="none" stroke={ink} strokeOpacity="0.3" />

      {/* bloc vizual mare, în dreapta */}
      <rect x="700" y="150" width="440" height="330" fill={accent} opacity={light ? 0.9 : 0.75} />
      <rect x="740" y="190" width="360" height="250" fill="none" stroke={page} strokeOpacity="0.45" />

      {/* rând de carduri jos */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={60 + i * 366} y="600" width="330" height="110" fill={ink} opacity="0.07" />
          <rect x={90 + i * 366} y="632" width="150" height="9" rx="4" fill={ink} opacity="0.28" />
          <rect x={90 + i * 366} y="656" width="230" height="8" rx="4" fill={ink} opacity="0.16" />
          <rect x={90 + i * 366} y="676" width="190" height="8" rx="4" fill={ink} opacity="0.16" />
        </g>
      ))}

      {/* indexul proiectului, discret */}
      <text
        x="1150"
        y="730"
        textAnchor="end"
        fill={ink}
        opacity="0.28"
        fontFamily="Marcellus, Georgia, serif"
        fontSize="64"
      >
        {String(index + 1).padStart(2, '0')}
      </text>
    </svg>
  );
};
