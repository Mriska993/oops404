import React, { useState } from 'react';
import { FAQ_DATA } from '../data/portfolioData';
import { SITE, whatsappLink, NAV_LINKS } from '../data/site';
import { Logo } from './Logo';

const BUDGETS = ['< 1.000 €', '1.000 – 2.500 €', '2.500 – 5.000 €', '5.000 € +', 'nu știu încă'];

/** FAQ + formular + footer, în ritmul editorial al template-ului. */
export const Contact: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(FAQ_DATA[0]?.id ?? null);

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [budget, setBudget] = useState('');
  const [brief, setBrief] = useState('');
  const [sent, setSent] = useState<null | 'mail' | 'wa'>(null);

  const compose = () =>
    `Nume: ${name || '-'}\nContact: ${contact || '-'}\nBuget: ${budget || '-'}\n\nProiect:\n${brief || '-'}`;

  const sendMail = (e: React.FormEvent) => {
    e.preventDefault();
    setSent('mail');
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `Proiect nou · ${name || 'cineva de pe site'}`
    )}&body=${encodeURIComponent(compose())}`;
  };

  return (
    <>
      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-line-soft py-24 sm:py-28">
        <div className="shell">
          <h2 className="reveal eyebrow mb-10">Întrebări frecvente</h2>

          <div className="border-t border-line-soft">
            {FAQ_DATA.map((item) => {
              const isOpen = openFaq === item.id;
              return (
                <div key={item.id} className="reveal border-b border-line-soft">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-5 py-6 text-left"
                  >
                    <span className="meta hidden w-28 shrink-0 pt-2 sm:block">{item.tag}</span>
                    <span
                      className={`display flex-1 text-[1.35rem] leading-tight transition-colors sm:text-[1.7rem] ${
                        isOpen ? 'text-white' : 'text-white/75'
                      }`}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`mt-2 shrink-0 text-lg transition-transform duration-500 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className="grid transition-all duration-500 ease-editorial"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-3xl pb-7 text-[0.93rem] leading-relaxed text-muted sm:pl-[8.25rem]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-20 border-t border-line-soft bg-alt py-24 sm:py-28">
        <div className="shell">
          <div className="reveal grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <span className="eyebrow">Hai să vorbim</span>
              <h2 className="display mt-3 text-[clamp(2.2rem,5.4vw,4rem)]">
                Spune-ne ce ai în cap.
                <br />
                <em>Restul rezolvăm noi.</em>
              </h2>
              <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted">
                Nu trebuie să ai un brief perfect. O idee vagă și două exemple de site-uri care îți
                plac sunt suficiente ca să pornim.
              </p>

              <div className="mt-10 border-t border-line-soft">
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center justify-between border-b border-line-soft py-5 transition-colors hover:text-white"
                >
                  <span className="meta">Email</span>
                  <span className="text-[0.95rem]">{SITE.email} ↗</span>
                </a>
                {SITE.phones.map((p) => (
                  <a
                    key={p.wa}
                    href={`https://wa.me/${p.wa}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between border-b border-line-soft py-5 transition-colors hover:text-white"
                  >
                    <span className="meta">Telefon · WhatsApp</span>
                    <span className="text-[0.95rem]">{p.display} ↗</span>
                  </a>
                ))}
              </div>
            </div>

            <form onSubmit={sendMail} className="space-y-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="meta mb-1 block">
                    Cum te cheamă
                  </label>
                  <input
                    id="c-name"
                    className="field"
                    placeholder="Ion Popescu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="c-contact" className="meta mb-1 block">
                    Email sau telefon
                  </label>
                  <input
                    id="c-contact"
                    className="field"
                    placeholder="ion@exemplu.ro"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <span className="meta mb-3 block">Buget aproximativ</span>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {BUDGETS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`tab ${budget === b ? 'is-active' : ''}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="c-brief" className="meta mb-1 block">
                  Ce vrei să construim
                </label>
                <textarea
                  id="c-brief"
                  className="field min-h-[120px] resize-y"
                  placeholder="Am nevoie de un site de prezentare pentru cabinetul meu. Îmi place cum arată X și Y..."
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="submit" className="btn btn--ember w-full sm:w-auto sm:flex-1">
                  Trimite pe email
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSent('wa');
                    window.open(whatsappLink(`Salut Oops404!\n\n${compose()}`), '_blank', 'noopener');
                  }}
                  className="btn w-full sm:w-auto"
                >
                  Sau pe WhatsApp
                </button>
              </div>

              <p className="meta">
                {sent === 'mail' && 'Se deschide aplicația ta de email cu mesajul completat.'}
                {sent === 'wa' && 'Se deschide WhatsApp cu mesajul completat.'}
                {!sent && 'Răspundem în maximum 24h. De obicei mult mai repede.'}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-line py-20">
        <div className="shell">
          <div className="reveal mb-20">
            <span className="eyebrow mb-4 block">Disponibili pentru proiecte noi</span>
            <a
              href={`mailto:${SITE.email}`}
              className="display block break-all text-[clamp(1.9rem,5.5vw,4.6rem)] text-white transition-opacity hover:opacity-70"
            >
              {SITE.email.toUpperCase()} ↗
            </a>
          </div>

          {/* lockup-ul complet, cu slogan */}
          <div className="reveal mb-10">
            <a href="#top" className="logo-link" aria-label="OOPS404 — sus">
              <Logo className="w-[440px] max-w-full" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line-soft pt-7">
            <span className="meta">
              © {new Date().getFullYear()} {SITE.name} · „{SITE.slogan}”
            </span>

            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.map((l) => (
                <a key={l.id} href={l.href} className="meta transition-colors hover:text-white">
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Fara retele sociale: exista doar conturi personale. */}
            <a href={`mailto:${SITE.email}`} className="meta transition-colors hover:text-white">
              {SITE.email}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
