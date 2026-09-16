import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, SITE } from '../data/site';
import { Logo } from './Logo';

export const Header: React.FC<{ onOpenTerminal: () => void }> = ({ onOpenTerminal }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-xl">
      <div className="shell flex items-center justify-between py-5">
        {/* logo */}
        <Link to="/" className="logo-link" aria-label="OOPS404 — acasă">
          <Logo className="h-11 w-auto sm:h-12" />
        </Link>

        {/* nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.id}
              to={l.href}
              className="text-[0.75rem] font-bold uppercase tracking-wider2 text-muted transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={onOpenTerminal}
            data-cursor="RUN"
            className="text-[0.75rem] font-bold uppercase tracking-wider2 text-muted transition-colors hover:text-white"
          >
            Terminal
          </button>
        </nav>

        {/* status */}
        <div className="hidden items-center gap-2.5 md:flex">
          <span className="size-1.5 rounded-full bg-signal" />
          <span className="meta">{SITE.availability}</span>
        </div>

        {/* burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Închide meniul' : 'Deschide meniul'}
          aria-expanded={open}
          className="flex flex-col gap-[5px] lg:hidden"
        >
          <span
            className={`block h-px w-6 bg-white transition-transform duration-300 ${
              open ? 'translate-y-[6px] rotate-45' : ''
            }`}
          />
          <span className={`block h-px w-6 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span
            className={`block h-px w-6 bg-white transition-transform duration-300 ${
              open ? '-translate-y-[6px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* meniu mobil */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[73px] z-40 overflow-y-auto bg-bg lg:hidden">
          <div className="shell py-8">
            {NAV_LINKS.map((l, i) => (
              <Link
                key={l.id}
                to={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-line-soft py-5"
              >
                <span className="display text-[2rem]">{l.label}</span>
                <span className="meta">0{i + 1}</span>
              </Link>
            ))}

            <button
              onClick={() => {
                setOpen(false);
                onOpenTerminal();
              }}
              className="flex w-full items-baseline justify-between border-b border-line-soft py-5"
            >
              <span className="display text-[2rem]">Terminal</span>
              <span className="meta">0{NAV_LINKS.length + 1}</span>
            </button>

            <a href={`mailto:${SITE.email}`} className="btn btn--ember mt-10 w-full">
              Scrie-ne
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
