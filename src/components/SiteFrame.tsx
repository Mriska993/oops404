import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';

/**
 * Pe telefon nu există hover, deci derularea trebuie pornită altfel: o pornim
 * când fereastra intră în ecran și o oprim când iese.
 *
 * Verificăm `hover: hover` înainte de orice: pe desktop derularea e deja legată
 * de cursor, iar dacă ar porni și singură, două animații s-ar bate pe aceeași
 * imagine. Cine a cerut mai puțină mișcare nu primește niciuna.
 */
const useDeruleazaInEcran = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [ruleaza, setRuleaza] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([intrare]) => setRuleaza(intrare.isIntersecting),
      // peste jumătate din fereastră în ecran: altfel ar porni cât e încă un colț
      { threshold: 0.55 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, ruleaza };
};

/**
 * Preview-ul unui proiect din grilă: captura reală a site-ului live, într-un cadru
 * de browser. Imaginea se derulează prin toată pagina — la hover pe desktop, singură
 * când intră în ecran pe telefon — iar bara din dreapta se mișcă întocmai ca un
 * scrollbar. Nu e o poză de atmosferă, e chiar site-ul.
 *
 * Capturile din `public/work/shots/` au TOATE 1200x3833 px; pe asta se bazează
 * `--shot-travel` din index.css, care diferă între telefon și desktop pentru că
 * diferă și înălțimea ferestrei. Vezi README-ul din folder înainte să înlocuiești una.
 */
export const SiteFrame: React.FC<{ project: Project }> = ({ project }) => {
  const host = project.liveUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '') ?? `${project.id}.ro`;
  const live = project.status === 'live';
  const { ref, ruleaza } = useDeruleazaInEcran();

  return (
    <div
      ref={ref}
      className={`frame ${ruleaza ? 'is-playing' : ''}`}
      style={{ ['--shot-tint' as string]: project.color }}
    >
      {/* bara de browser */}
      <div className="frame__bar">
        <span className="frame__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>

        <span className="frame__url">{host}</span>

        <span className={`frame__status ${live ? 'is-live' : ''}`}>{live ? 'Live' : 'În lucru'}</span>
      </div>

      {/* fereastra propriu-zisă */}
      <div className="frame__screen">
        <img
          src={project.shot}
          alt={`Site-ul ${project.title}, captură de pe ${host}`}
          loading="lazy"
          decoding="async"
          width={1200}
          height={3833}
          className="frame__shot"
        />

        {/* scrollbar-ul: coboară odată cu pagina, ca într-un browser adevărat */}
        <span className="frame__track" aria-hidden="true">
          <i className="frame__thumb" />
        </span>
      </div>
    </div>
  );
};
