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
        <p className="text-[0.98rem] leading-relaxed text-muted">
          Nu suntem o agenție cu 40 de angajați și un account manager care traduce greșit ce ai spus.
          Suntem noi doi, și vorbești cu noi de la primul mesaj până mult după lansare.{' '}
          <span className="text-white">
            Amândoi scriem cod pe tot stack-ul. Diferă doar unde ne place să petrecem mai mult timp.
          </span>
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {TEAM_MEMBERS.map((m, i) => (
          <article key={m.name} className="card reveal p-7 sm:p-9" style={{ transitionDelay: `${i * 90}ms` }}>
            <div className="flex items-start justify-between gap-4 border-b border-line-soft pb-6">
              <div>
                <span className="meta">{m.avatarText}</span>
                <h3 className="display mt-2 text-[2rem] leading-none">{m.name}</h3>
                <p className="mt-3 flex flex-wrap gap-2">
                  {m.role.split(' · ').map((r) => (
                    <span key={r} className="sticker !text-[0.72rem]">
                      {r}
                    </span>
                  ))}
                </p>
              </div>

            </div>

            <p className="mt-6 text-[0.93rem] leading-relaxed text-muted">{m.bio}</p>

            <p className="display italic mt-6 text-[1.35rem] leading-snug text-white">„{m.quote}”</p>

            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 border-t border-line-soft pt-5 text-[0.78rem] font-semibold text-dim">
              {m.favoriteStack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="reveal mt-5 grid gap-5 sm:grid-cols-3">
        {[
          { e: '📞', t: 'Vorbim direct', d: 'Ai numărul nostru, nu al unui call center.' },
          { e: '✎', t: 'Cod, nu template', d: 'Zero teme cumpărate, zero plugin-uri lipite.' },
          { e: '☕', t: 'Rămânem după', d: 'Nu dispărem a doua zi după lansare.' },
        ].map((p) => (
          <div key={p.t} className="card p-6">
            <span aria-hidden className="text-[1.3rem]">{p.e}</span>
            <h4 className="display mt-3 text-[1.3rem] text-white">{p.t}</h4>
            <p className="mt-1.5 text-[0.88rem] leading-relaxed text-muted">{p.d}</p>
          </div>
        ))}
      </div>

      <p className="reveal mt-8 text-center meta">{SITE.location}</p>
    </div>
  </section>
);
