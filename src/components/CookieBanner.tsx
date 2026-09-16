import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LEGAL } from '../data/legal';
import { accepta, asculta, refuza, stareConsimtamant } from '../lib/consent';

/**
 * Bannerul de consimțământ.
 *
 * Două reguli care nu se negociază, pentru că sunt chiar cerințele GDPR:
 *  1. „Refuz” arată la fel de vizibil ca „Accept”. Fără buton gri lângă unul portocaliu,
 *     fără „refuz” ascuns sub un link „setări avansate”.
 *  2. Închiderea bannerului (Escape, click pe X) NU e consimțământ. E refuz tăcut:
 *     nu se încarcă nimic, dar nici nu ținem minte, deci întrebăm data viitoare.
 */
export const CookieBanner: React.FC = () => {
  const [vizibil, setVizibil] = useState(false);

  useEffect(() => {
    // pe server nu există localStorage; decidem abia în browser, după hidratare
    if (stareConsimtamant() === 'neintrebat') setVizibil(true);
    return asculta((stare) => setVizibil(stare === 'neintrebat'));
  }, []);

  useEffect(() => {
    if (!vizibil) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setVizibil(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [vizibil]);

  // fără ID de Analytics nu avem ce cere: n-are rost să întrebăm degeaba
  if (!LEGAL.analytics.ga4Id || !vizibil) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consimtamant-titlu"
      className="fixed inset-x-0 bottom-0 z-[120] border-t border-line bg-bg/95 backdrop-blur-xl"
    >
      <div className="shell flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <h2 id="consimtamant-titlu" className="eyebrow mb-2">
            Statistici
          </h2>
          <p className="text-[0.9rem] leading-relaxed text-muted">
            Ne-ar ajuta să știm ce articole sunt citite. Dacă ești de acord, încărcăm Google
            Analytics — <span className="text-white">până atunci nu se încarcă deloc</span>, nu doar
            „dezactivat”. Nu avem reclame și nu urmărim pe nimeni în altă parte.{' '}
            <Link to="/cookies" className="link-draw text-white">
              Detaliile, aici
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          {/* aceeași greutate vizuală pentru ambele: alegerea trebuie să fie liberă */}
          <button onClick={refuza} className="btn w-full sm:w-auto">
            Refuz
          </button>
          <button onClick={accepta} className="btn btn--ember w-full sm:w-auto">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
