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
      <h1 className="reveal display mb-8 text-[clamp(2.15rem,6vw,5.1rem)]">
        CONSTRUIM <em className="whitespace-nowrap">SITE-URI</em>
        <br />
        ȘI APLICAȚII CARE
        <br />
        CHIAR FUNCȚIONEAZĂ.
      </h1>

      {/* subtitlu + slogan, pe două coloane ca într-o revistă */}
      <div className="reveal mb-12 grid gap-8 border-t border-line-soft pt-7 md:grid-cols-[1.4fr_1fr]">
        <p className="max-w-2xl text-[0.98rem] leading-relaxed text-muted">
          Suntem doi developeri. Scriem fiecare linie de cod de la zero — fără template-uri, fără
          plugin-uri lipite cu scotch, fără account manageri prin mijloc.{' '}
          <span className="text-white">Vorbești direct cu oamenii care construiesc.</span>
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
          alt="Cei doi fondatori Oops404"
          className="tile__art size-full object-cover"
        />
      </figure>

      {/* legenda de sub imagine, ca într-o revistă */}
      <div className="reveal mt-4 flex flex-wrap items-baseline justify-between gap-3 border-t border-line-soft pt-4">
        <span className="meta">
          {TEAM_MEMBERS.map((m) => m.name).join(' & ')} · {SITE.location}
        </span>
        <a href="#duo" className="link-draw text-[0.78rem] font-bold uppercase tracking-wider2">
          Fă cunoștință ↓
        </a>
      </div>
    </div>
  </section>
);
