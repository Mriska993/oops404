import React, { useMemo, useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectArt } from './ProjectArt';
import { SiteFrame } from './SiteFrame';

const FILTERS = [
  { id: 'all', label: 'Toate' },
  { id: 'web', label: 'Site-uri' },
  { id: 'app', label: 'Aplicații' },
];

export const Work: React.FC<{ onOpenProject: (p: Project) => void }> = ({ onOpenProject }) => {
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () => (filter === 'all' ? PROJECTS_DATA : PROJECTS_DATA.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="work" className="scroll-mt-20 border-t border-line-soft py-24 sm:py-28">
      <div className="shell">
        {/* controls */}
        <div className="reveal mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-line-soft pb-5">
          <span className="eyebrow">Proiecte proprii</span>
          <div className="flex flex-wrap gap-6">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`tab ${filter === f.id ? 'is-active' : ''}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* invitatia la hover — altfel derularea trece neobservata */}
        <p className="reveal mb-10 hidden text-[0.78rem] text-dim lg:block">
          Capturi reale ale site-urilor, luate de pe domeniile live. Ține cursorul pe o fereastră ca
          să o derulezi până jos; click deschide site-ul.
        </p>

        {/* doua ferestre pe rand pe desktop, una pe mobil */}
        <div className="grid gap-x-6 gap-y-12 lg:grid-cols-2">
          {visible.map((project, i) => (
            <article
              key={project.id}
              className="reveal min-w-0"
              style={{ transitionDelay: `${Math.min(i, 4) * 70}ms` }}
            >
              {/*
                Poza duce la site-ul real. Cat timp `liveUrl` lipseste din date,
                cade inapoi pe case study ca sa nu ramana un click mort.
              */}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="DESCHIDE ↗"
                  aria-label={`Deschide ${project.title} într-o filă nouă`}
                  className="block"
                >
                  <Preview project={project} index={i} />
                </a>
              ) : (
                <div onClick={() => onOpenProject(project)} data-cursor="CASE STUDY">
                  <Preview project={project} index={i} />
                </div>
              )}

              {/* legenda sub fereastra, ca la o plansa dintr-o revista */}
              <div className="mt-4 flex items-start justify-between gap-4 border-t border-line-soft pt-3">
                <div className="min-w-0">
                  <h3 className="display truncate text-[1.35rem] leading-tight text-white">
                    {project.title}
                  </h3>
                  <p className="meta mt-1">
                    {project.categoryLabel}
                    {project.status === 'in_progress' && ' · în lucru'}
                  </p>
                  <p className="mt-2 line-clamp-2 text-[0.82rem] text-muted">{project.tagline}</p>
                </div>

                <div className="flex shrink-0 items-baseline gap-4">
                  <button
                    onClick={() => onOpenProject(project)}
                    className="link-draw text-[0.72rem] font-bold uppercase tracking-wider2"
                  >
                    Case study
                  </button>
                  <span className="meta">{String(i + 1).padStart(2, '0')}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* nota despre ce urmează */}
        <p className="reveal mt-12 border-t border-line-soft pt-6 text-[0.85rem] text-muted">
          <span className="text-white">Toate {PROJECTS_DATA.length} sunt produse proprii</span>, construite de
          la zero — nu comenzi de la clienți. Le arătăm pentru că sunt dovada cea mai directă a ce
          știm să facem: le-am gândit, desenat, scris și lansat împreună.
        </p>
      </div>
    </section>
  );
};

/**
 * Cu o captura a site-ului live arata fereastra de browser care se deruleaza.
 * Fara ea (proiect nou, inca necapturat) ramane placa editoriala de dinainte.
 */
const Preview: React.FC<{ project: Project; index: number }> = ({ project, index }) =>
  project.shot ? (
    <SiteFrame project={project} />
  ) : (
    <div className="tile aspect-[21/9] w-full">
      <ProjectArt project={project} index={index} src={project.cover ?? project.image} />
      <div className="tile__overlay">
        <p className="text-[0.85rem] leading-relaxed text-white/80">{project.tagline}</p>
      </div>
    </div>
  );
