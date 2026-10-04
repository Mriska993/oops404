import React from 'react';
import { SERVICES_DATA } from '../data/portfolioData';

/** Tabelul editorial din template („RECOGNITION"), refolosit pentru servicii. */
export const Services: React.FC = () => (
  <section id="services" className="scroll-mt-20 border-t border-line-soft bg-alt py-24 sm:py-28">
    <div className="shell">
      <div className="reveal mb-12 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
        <div>
          <span className="eyebrow">Ce facem</span>
          <h2 className="display mt-3 text-[clamp(2.2rem,5.4vw,4rem)]">
            Patru lucruri,
            <br />
            făcute <em>cu drag</em>.
          </h2>
        </div>
        <p className="text-[0.98rem] leading-relaxed text-muted">
          Nu facem de toate pentru toți. Facem exact astea patru, cu drag și cu încăpățânare, până
          ies așa cum le-am promis.{' '}
          <span className="text-white">Dacă ce ai nevoie nu e în listă, spune-ne oricum: știm pe cine să-ți recomandăm.</span>
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
              <p className="display italic mt-2 text-[1.05rem] leading-snug text-muted">{s.tagline}</p>
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

              <div className="mt-5 flex flex-wrap gap-2">
                {s.techStack.map((t) => (
                  <span key={t} className="sticker !text-[0.72rem] !font-semibold !text-muted">
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
