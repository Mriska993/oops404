import React, { useCallback, useEffect } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectArt } from './ProjectArt';

interface Props {
  project: Project | null;
  onChange: (p: Project) => void;
  onClose: () => void;
}

/** Lightbox-ul din template, adaptat ca studiu de caz: săgeți, contor, tastatură. */
export const CaseStudy: React.FC<Props> = ({ project, onChange, onClose }) => {
  const index = project ? PROJECTS_DATA.findIndex((p) => p.id === project.id) : -1;

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index < 0) return;
      const next = (index + dir + PROJECTS_DATA.length) % PROJECTS_DATA.length;
      onChange(PROJECTS_DATA[next]);
    },
    [index, onChange]
  );

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose, step]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-bg/97 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`Case study ${project.title}`}
    >
      {/* bara de sus */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg/90 px-[4%] py-4 backdrop-blur-xl">
        <span className="meta">
          {String(index + 1).padStart(2, '0')} / {String(PROJECTS_DATA.length).padStart(2, '0')}
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={() => step(-1)}
            aria-label="Proiectul anterior"
            className="grid size-10 place-items-center border border-line text-white transition-colors hover:bg-white hover:text-black"
          >
            ←
          </button>
          <button
            onClick={() => step(1)}
            aria-label="Proiectul următor"
            className="grid size-10 place-items-center border border-line text-white transition-colors hover:bg-white hover:text-black"
          >
            →
          </button>
          <button
            onClick={onClose}
            aria-label="Închide"
            className="grid size-10 place-items-center border border-line text-white transition-colors hover:bg-white hover:text-black"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="shell py-12">
        {/* titlu */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line-soft pb-6">
          <div>
            <span className="eyebrow">{project.categoryLabel}</span>
            <h2 className="display mt-2 text-[clamp(2.4rem,6vw,4.6rem)]">{project.title}</h2>
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="link-draw text-[0.8rem] font-bold uppercase tracking-wider2"
            >
              {project.liveUrl.replace('https://', '')} ↗
            </a>
          )}
        </div>

        {/* vizual */}
        <div className="tile mb-10 aspect-[2.17/1] w-full">
          <ProjectArt project={project} index={index} src={project.shot ?? project.image ?? project.cover} />
        </div>

        {/* meta */}
        <div className="mb-12 grid gap-y-6 border-y border-line-soft py-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ...(project.year ? [{ k: 'An', v: project.year }] : []),
            { k: 'Status', v: project.status === 'live' ? 'Live' : 'În lucru' },
            ...(project.fontPairing ? [{ k: 'Tipografie', v: project.fontPairing }] : []),
          ].map((m) => (
            <div key={m.k}>
              <div className="meta mb-1.5">{m.k}</div>
              <div className="text-[0.95rem] text-white">{m.v}</div>
            </div>
          ))}
        </div>

        {/* poveste + ce am construit */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <h3 className="eyebrow mb-4">Contextul</h3>
            <p className="display text-[1.35rem] leading-snug text-white">{project.tagline}</p>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{project.fullStory}</p>

            {project.metrics && (
              <div className="mt-9 grid grid-cols-3 gap-4 border-t border-line-soft pt-6">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="display text-[1.9rem] leading-none text-white">{m.value}</div>
                    <div className="meta mt-2">{m.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="eyebrow mb-4">Ce am construit</h3>
            <ul>
              {project.features.map((f) => (
                <li
                  key={f}
                  className="border-b border-line-soft py-3.5 text-[0.92rem] leading-relaxed text-muted"
                >
                  {f}
                </li>
              ))}
            </ul>

            <h3 className="eyebrow mb-3 mt-9">Stack</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {project.tags.map((t) => (
                <span key={t} className="text-[0.78rem] font-semibold uppercase tracking-wider2 text-muted">
                  {t}
                </span>
              ))}
            </div>

            <h3 className="eyebrow mb-3 mt-9">Paletă</h3>
            <div className="flex gap-2">
              {project.paletteSwatches.map((c) => (
                <div key={c} className="h-12 flex-1 border border-line" style={{ background: c }} title={c} />
              ))}
            </div>
          </div>
        </div>

        {/* navigare jos */}
        <div className="mt-14 flex items-center justify-between border-t border-line-soft pt-6">
          <button onClick={() => step(-1)} className="link-draw text-[0.8rem] font-bold uppercase tracking-wider2">
            ← {PROJECTS_DATA[(index - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length].title}
          </button>
          <button onClick={() => step(1)} className="link-draw text-[0.8rem] font-bold uppercase tracking-wider2">
            {PROJECTS_DATA[(index + 1) % PROJECTS_DATA.length].title} →
          </button>
        </div>
      </div>
    </div>
  );
};
