import React, { useMemo, useState } from 'react';
import { ESTIMATOR_PROJECT_TYPES, ESTIMATOR_ADDONS } from '../data/portfolioData';
import { whatsappLink } from '../data/site';

const fmt = (n: number) => new Intl.NumberFormat('ro-RO').format(Math.round(n));

export const Budget: React.FC = () => {
  const [typeId, setTypeId] = useState<string | null>(null);
  const [addons, setAddons] = useState<string[]>([]);

  const type = ESTIMATOR_PROJECT_TYPES.find((t) => t.id === typeId) ?? null;

  const result = useMemo(() => {
    if (!type) return null;
    const picked = ESTIMATOR_ADDONS.filter((a) => addons.includes(a.id));
    const base = type.basePrice + picked.reduce((s, a) => s + a.price, 0);
    const weeks = type.durationWeeks + picked.reduce((s, a) => s + a.timeDays, 0) / 5;
    return {
      min: base,
      max: Math.round(base * 1.35),
      weeksMin: Math.max(1, Math.round(weeks)),
      weeksMax: Math.max(2, Math.round(weeks * 1.4)),
    };
  }, [type, addons]);

  const toggle = (id: string) =>
    setAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  const message = type
    ? `Salut Oops404! Am folosit calculatorul de pe site.\n\nTip proiect: ${type.label}\n${
        addons.length
          ? `Extra: ${ESTIMATOR_ADDONS.filter((a) => addons.includes(a.id))
              .map((a) => a.label)
              .join(', ')}\n`
          : ''
      }Estimare afisata: ${result ? `${fmt(result.min)}-${fmt(result.max)} EUR` : ''}\n\nPutem vorbi?`
    : undefined;

  return (
    <section id="budget" className="scroll-mt-20 border-t border-line-soft bg-alt py-24 sm:py-28">
      <div className="shell">
        <div className="reveal mb-12 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <span className="eyebrow">Buget</span>
            <h2 className="display mt-3 text-[clamp(2.2rem,5.4vw,4rem)]">
              Cât costă, pe scurt și
              <br />
              <em>fără să ne suni.</em>
            </h2>
          </div>
          <p className="text-[0.95rem] leading-relaxed text-muted">
            Bifează ce ai nevoie și vezi imediat un interval real. Nu e o ofertă finală — e punctul
            de plecare onest, ca să știi dacă avem ce discuta.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <div>
            {/* tip proiect */}
            <span className="eyebrow">01 — Ce construim</span>
            <div className="mt-4 border-t border-line-soft">
              {ESTIMATOR_PROJECT_TYPES.map((t) => {
                const on = typeId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTypeId(t.id)}
                    className={`flex w-full items-center gap-5 border-b border-line-soft py-5 text-left transition-colors ${
                      on ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <span
                      className={`size-3 shrink-0 rounded-full border transition-colors ${
                        on ? 'border-white bg-white' : 'border-white/30'
                      }`}
                    />
                    <span className="flex-1">
                      <span className={`block text-[1.05rem] ${on ? 'text-white' : 'text-white/85'}`}>
                        {t.label}
                      </span>
                      <span className="mt-0.5 block text-[0.82rem] text-muted">{t.description}</span>
                    </span>
                    <span className="shrink-0 text-[0.8rem] font-bold uppercase tracking-wider2 text-muted">
                      de la {fmt(t.basePrice)} €
                    </span>
                  </button>
                );
              })}
            </div>

            {/* extra */}
            <span className={`eyebrow mt-10 block ${typeId ? '' : 'opacity-40'}`}>
              02 — Ai nevoie și de
            </span>
            <div className={`mt-4 border-t border-line-soft ${typeId ? '' : 'opacity-40'}`}>
              {ESTIMATOR_ADDONS.map((a) => {
                const on = addons.includes(a.id);
                return (
                  <button
                    key={a.id}
                    disabled={!typeId}
                    onClick={() => toggle(a.id)}
                    className={`flex w-full items-center gap-5 border-b border-line-soft py-4 text-left transition-colors disabled:cursor-not-allowed ${
                      on ? 'bg-white/[0.04]' : 'enabled:hover:bg-white/[0.02]'
                    }`}
                  >
                    <span
                      className={`grid size-3.5 shrink-0 place-items-center border text-[8px] text-black transition-colors ${
                        on ? 'border-white bg-white' : 'border-white/30'
                      }`}
                    >
                      {on ? '✓' : ''}
                    </span>
                    <span className="flex-1 text-[0.92rem] text-white/85">{a.label}</span>
                    <span className="shrink-0 text-[0.8rem] font-bold tracking-wider2 text-muted">
                      +{fmt(a.price)} €
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* rezultat */}
          <aside className="lg:sticky lg:top-24">
            <div className="border border-line p-7">
              <span className="eyebrow">Estimare</span>

              {result ? (
                <>
                  <div className="display mt-4 text-[clamp(2.2rem,6vw,3.2rem)] leading-none text-white">
                    {fmt(result.min)}–{fmt(result.max)}
                    <span className="ml-2 text-[0.45em] align-middle">EUR</span>
                  </div>
                  <div className="meta mt-3">
                    ~{result.weeksMin}–{result.weeksMax} săptămâni
                  </div>

                  <div className="mt-7 border-t border-line-soft pt-5">
                    <div className="flex items-baseline justify-between gap-3 py-1 text-[0.85rem]">
                      <span className="text-muted">{type?.label}</span>
                      <span className="shrink-0 text-white">{fmt(type!.basePrice)} €</span>
                    </div>
                    {ESTIMATOR_ADDONS.filter((a) => addons.includes(a.id)).map((a) => (
                      <div
                        key={a.id}
                        className="flex items-baseline justify-between gap-3 py-1 text-[0.85rem]"
                      >
                        <span className="text-muted">{a.label}</span>
                        <span className="shrink-0 text-white">+{fmt(a.price)} €</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="display mt-4 text-[1.4rem] leading-snug text-muted">
                  Alege un tip de proiect ca să vezi cifrele.
                </p>
              )}

              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noreferrer"
                className={`btn btn--ember mt-7 w-full ${type ? '' : 'pointer-events-none opacity-30'}`}
              >
                Trimite pe WhatsApp
              </a>

              <p className="meta mt-4 text-center">Fără obligații · răspundem în aceeași zi</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
