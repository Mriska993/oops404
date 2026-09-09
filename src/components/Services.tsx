import React from 'react';
import { SERVICES_DATA } from '../data/portfolioData';

/** Tabelul editorial din template („RECOGNITION"), refolosit pentru servicii. */
export const Services: React.FC = () => (
  <section id="services" className="scroll-mt-20 border-t border-line-soft bg-alt py-24 sm:py-28">
    <div className="shell">
      <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="eyebrow">Ce facem</h2>
        <p className="max-w-md text-[0.88rem] text-muted">
          Nu facem de toate pentru toți. Facem exact astea patru, dar le facem bine.
        </p>
      </div>

      <div className="border-t border-line-soft">
        {SERVICES_DATA.map((s, i) => (
          <div key={s.id} className="row reveal group" style={{ transitionDelay: `${i * 70}ms` }}>
            <span className="meta">{s.number}</span>

            <div>
              <h3 className="display text-[1.6rem] leading-tight text-white sm:text-[1.9rem]">
                {s.title}
              </h3>
              <p className="mt-1.5 text-[0.85rem] text-muted">{s.tagline}</p>
            </div>

            <div>
              <p className="text-[0.92rem] leading-relaxed text-muted">{s.description}</p>

              <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex gap-2 text-[0.83rem] leading-snug text-muted">
                    <span className="text-white/40">/</span>
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                {s.techStack.map((t) => (
                  <span
                    key={t}
                    className="text-[0.7rem] font-bold uppercase tracking-wider2 text-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
