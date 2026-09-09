import React from 'react';
import { whatsappLink } from '../data/site';

const STEPS = [
  {
    n: '01',
    title: 'Vorbim ca oamenii',
    time: '30 min',
    text: 'Ne spui ce vrei să construiești, chiar dacă ideea e încă la stadiul de „ceva de genul...”. Punem întrebări, tăiem ce nu are sens, îți spunem sincer dacă merită sau nu.',
    out: 'Brief clar + estimare de preț și timp',
  },
  {
    n: '02',
    title: 'Îți arătăm cum arată',
    time: '2–4 zile',
    text: 'Primești un design real, nu un PDF cu wireframe-uri gri. Îl vezi în browser, pe telefon, îl critici, îl schimbăm. Nu trecem mai departe până nu îți place.',
    out: 'Design interactiv + link de preview',
  },
  {
    n: '03',
    title: 'Construim la vedere',
    time: '1–4 săptămâni',
    text: 'Cod scris de la zero, în sprinturi. Ai un link de staging pe care vezi progresul în fiecare zi. Fără surprize la final, fără „mai durează o săptămână”.',
    out: 'Produs funcțional, testat pe toate ecranele',
  },
  {
    n: '04',
    title: 'Lansăm și rămânem',
    time: 'ongoing',
    text: 'Punem totul pe servere rapide, configurăm domeniul, SEO, analytics. Îți facem un video de 5 minute cum administrezi tot. Și rămânem disponibili după.',
    out: 'Site live + acces complet + suport',
  },
];

/**
 * Secțiune inversată, pe hârtie. Rupe pagina în două și scoate site-ul
 * din senzația de bloc întunecat continuu.
 */
export const Process: React.FC = () => (
  <section id="process" className="on-paper scroll-mt-20 bg-paper py-24 text-ink sm:py-28">
    <div className="shell">
      <div className="reveal mb-14 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
        <div>
          <span className="eyebrow">Cum lucrăm</span>
          <h2 className="display mt-3 text-[clamp(2.2rem,5.4vw,4rem)] text-ink">
            De la „am o idee”
            <br />
            la <em>„e live”</em>.
          </h2>
        </div>
        <p className="text-[0.95rem] leading-relaxed text-black/60">
          Fără contracte de 40 de pagini, fără ședințe de status care nu duc nicăieri. Patru pași,
          fiecare cu un rezultat pe care îl poți vedea și atinge.
        </p>
      </div>

      <div className="border-t border-black/15">
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            className="reveal grid gap-3 border-b border-black/15 py-8 md:grid-cols-[110px_1fr_1.1fr] md:gap-8"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div>
              <span className="text-[0.72rem] font-bold uppercase tracking-widest2 text-black/40">
                {s.n}
              </span>
            </div>

            <div>
              <h3 className="display text-[1.7rem] leading-tight text-ink">{s.title}</h3>
              <span className="mt-1.5 inline-block text-[0.72rem] font-bold uppercase tracking-wider2 text-black/45">
                {s.time}
              </span>
            </div>

            <div>
              <p className="text-[0.93rem] leading-relaxed text-black/65">{s.text}</p>
              <p className="mt-3 text-[0.83rem] font-semibold text-ink">
                <span className="text-ember">→</span> {s.out}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="reveal mt-12 flex flex-wrap items-center gap-4">
        <a href="#budget" className="btn btn--ink">
          Calculează bugetul
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="text-[0.8rem] font-bold uppercase tracking-wider2 text-black/55 underline-offset-4 hover:underline"
        >
          sau scrie-ne direct pe WhatsApp
        </a>
      </div>
    </div>
  </section>
);
