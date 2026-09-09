import React from 'react';
import { TEAM_MEMBERS } from '../data/portfolioData';
import { SITE } from '../data/site';

export const Duo: React.FC = () => (
  <section id="duo" className="scroll-mt-20 border-t border-line-soft py-24 sm:py-28">
    <div className="shell">
      <div className="reveal mb-12 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
        <div>
          <span className="eyebrow">Cine suntem</span>
          <h2 className="display mt-3 text-[clamp(2.2rem,5.4vw,4rem)]">
            Doi oameni.
            <br />
            <em>Zero intermediari.</em>
          </h2>
        </div>
        <p className="text-[0.95rem] leading-relaxed text-muted">
          Nu suntem o agenție cu 40 de angajați și un account manager care traduce greșit ce ai spus.
          Suntem noi doi, și vorbești direct cu noi de la primul mesaj până după lansare.{' '}
          <span className="text-white">
            Amândoi lucrăm full-stack — diferă doar unde ne place să petrecem mai mult timp.
          </span>
        </p>
      </div>

      <div className="grid gap-px border border-line bg-line md:grid-cols-2">
        {TEAM_MEMBERS.map((m, i) => (
          <article key={m.name} className="reveal bg-bg p-7 sm:p-9" style={{ transitionDelay: `${i * 90}ms` }}>
            <div className="flex items-start justify-between gap-4 border-b border-line-soft pb-6">
              <div>
                <span className="meta">{m.avatarText}</span>
                <h3 className="display mt-2 text-[2rem] leading-none">{m.name}</h3>
                <p className="mt-2 text-[0.8rem] font-bold uppercase tracking-wider2 text-muted">
                  {m.role}
                </p>
              </div>

            </div>

            <p className="mt-6 text-[0.93rem] leading-relaxed text-muted">{m.bio}</p>

            <p className="display italic mt-6 text-[1.35rem] leading-snug text-white">„{m.quote}”</p>

            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 border-t border-line-soft pt-5">
              {m.favoriteStack.map((t) => (
                <span key={t} className="text-[0.72rem] font-bold uppercase tracking-wider2 text-dim">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="reveal mt-5 grid gap-px border border-line bg-line sm:grid-cols-3">
        {[
          { t: 'Vorbim direct', d: 'Ai numărul nostru, nu al unui call center.' },
          { t: 'Cod, nu template', d: 'Zero teme cumpărate, zero plugin-uri lipite.' },
          { t: 'Rămânem după', d: 'Nu dispărem a doua zi după lansare.' },
        ].map((p) => (
          <div key={p.t} className="bg-bg p-6">
            <h4 className="display text-[1.25rem] text-white">{p.t}</h4>
            <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted">{p.d}</p>
          </div>
        ))}
      </div>

      <p className="reveal mt-8 text-center meta">{SITE.location}</p>
    </div>
  </section>
);
