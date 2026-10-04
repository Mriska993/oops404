import React from 'react';
import { SITE } from '../data/site';
import { TEAM_MEMBERS } from '../data/portfolioData';

export const Hero: React.FC = () => (
  <section id="top" className="pb-24 pt-14 sm:pt-20">
    <div className="shell">
      {/* meta row */}
      <div className="reveal mb-7 flex flex-wrap justify-between gap-3">
        <span className="meta">{SITE.tagline}</span>
        <span className="meta">{SITE.volume}</span>
      </div>

      {/* titlu */}
      <h1 className="reveal display mb-8 max-w-5xl text-[clamp(2.3rem,6vw,5.1rem)]">
        Facem site-uri și aplicații pe care oamenii <em className="whitespace-nowrap">le simt</em>,
        nu doar le văd.
      </h1>

      {/* subtitlu + slogan, pe două coloane ca într-o revistă */}
      <div className="reveal rule-gilt mb-12 grid gap-8 pt-7 md:grid-cols-[1.4fr_1fr]">
        <p className="max-w-2xl text-[0.98rem] leading-relaxed text-muted">
          Un site bun se simte, nu doar se vede: se încarcă repede, găsești ce cauți fără să te
          chinui, iar la final îți vine să le scrii oamenilor care l-au făcut.{' '}
          <span className="text-white">
            Pentru asta lucrăm, în fiecare proiect. Suntem doi, scriem tot codul cu mâna noastră, iar
            când ne scrii, îți răspunde unul dintre noi.
          </span>
        </p>

        <div className="md:text-right">
          <span className="eyebrow block">Motto</span>
          <p className="display mt-2 text-[1.5rem] leading-tight text-white">„{SITE.slogan}”</p>
        </div>
      </div>

      {/*
        Portretul nostru, pe tot cadrul. 16:9 (nu 21:9 ca in template) pentru ca
        la 21:9 nu incap ambele fete fara sa taie barbia.
      */}
      <figure className="tile reveal aspect-[16/9] w-full">
        <img
          src="/work/duo.webp"
          alt="Ana-Maria și George, cei doi fondatori Oops404"
          className="tile__art size-full object-cover"
        />
      </figure>

      {/* legenda de sub imagine, ca într-o revistă */}
      <div className="reveal mt-4 flex flex-wrap items-baseline justify-between gap-3 border-t border-line-soft pt-4">
        <span className="meta">
          {TEAM_MEMBERS.map((m) => m.name).join(' & ')} · {SITE.location}
        </span>
        <a href="#duo" className="link-draw text-[0.78rem] font-bold uppercase tracking-wider2">
          Fă cunoștință cu noi ↓
        </a>
      </div>
    </div>
  </section>
);
