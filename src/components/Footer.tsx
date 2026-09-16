import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, SITE } from '../data/site';
import { LEGAL_DOCS } from '../lib/legal';
import { redeschide } from '../lib/consent';
import { Logo } from './Logo';

/**
 * Subsolul e același pe toate paginile — de aceea a ieșit din `Contact.tsx`,
 * unde stătea lipit de formular și nu putea fi folosit pe blog sau pe paginile legale.
 */
export const Footer: React.FC = () => (
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
      <div className="reveal mb-14">
        <Link to="/" className="logo-link logo-link--mare" aria-label={`${SITE.name} — acasă`}>
          <Logo className="w-[440px] max-w-full" />
        </Link>
      </div>

      <div className="grid gap-10 border-t border-line-soft pt-10 sm:grid-cols-2 lg:grid-cols-4">
        <nav aria-label="Secțiuni">
          <h2 className="meta mb-4">Site</h2>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <Link to={l.href} className="text-[0.85rem] text-muted transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Citește">
          <h2 className="meta mb-4">Citește</h2>
          <ul className="space-y-2.5">
            <li>
              <Link to="/blog" className="text-[0.85rem] text-muted transition-colors hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <a href="/rss.xml" className="text-[0.85rem] text-muted transition-colors hover:text-white">
                RSS
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="meta mb-4">Legal</h2>
          <ul className="space-y-2.5">
            {LEGAL_DOCS.map((l) => (
              <li key={l.slug}>
                <Link
                  to={`/${l.slug}`}
                  className="text-[0.85rem] text-muted transition-colors hover:text-white"
                >
                  {l.menu}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={redeschide}
                className="text-left text-[0.85rem] text-muted transition-colors hover:text-white"
              >
                Setări cookie-uri
              </button>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="meta mb-4">Contact</h2>
          <ul className="space-y-2.5">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="break-all text-[0.85rem] text-muted transition-colors hover:text-white"
              >
                {SITE.email}
              </a>
            </li>
            {SITE.phones.map((p) => (
              <li key={p.wa}>
                <a
                  href={`https://wa.me/${p.wa}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.85rem] text-muted transition-colors hover:text-white"
                >
                  {p.display}
                </a>
              </li>
            ))}
            <li className="text-[0.85rem] text-dim">{SITE.location}</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-line-soft pt-7">
        <span className="meta">
          © {new Date().getFullYear()} {SITE.name} · „{SITE.slogan}”
        </span>
      </div>
    </div>
  </footer>
);
