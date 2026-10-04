import React from 'react';
import { SITE } from '../data/site';
import { PROJECTS_DATA, TEAM_MEMBERS } from '../data/portfolioData';

/**
 * Prima impresie. Nu vinde „web development", vinde senzația: ca mirosul de cafea
 * proaspătă care te trage de pe stradă în cafenea. Titlul e o propoziție spusă
 * unui om, nu o listă de servicii; stickerele spun în trei cuvinte ce ar fi
 * altfel un paragraf; bula de pe poză arată că în spatele site-ului sunt doi
 * oameni care răspund.
 */
export const Hero: React.FC = () => (
  <section id="top" className="relative overflow-hidden pb-24 pt-12 sm:pt-20">
    {/* lumina caldă care respiră în spatele titlului */}
    <div aria-hidden className="glow glow--hero" />

    <div className="shell relative">
      {/* stickere: ce ai afla oricum, dar mai târziu */}
      <div className="reveal mb-8 flex flex-wrap items-center gap-2.5">
        <span className="sticker sticker--ember">☕ {SITE.availability}</span>
        <span className="sticker">✦ {PROJECTS_DATA.length} produse proprii, lansate</span>
        <span className="sticker">✎ cod scris de mână, fără template-uri</span>
      </div>

      {/* titlu */}
      <h1 className="reveal display mb-8 max-w-5xl text-[clamp(2.5rem,6.2vw,5.4rem)]">
        Facem site-uri și aplicații pe care oamenii <em className="whitespace-nowrap">le simt</em>,
        nu doar le văd.
      </h1>

      {/* povestea, pe scurt + cele două drumuri */}
      <div className="reveal mb-12 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <p className="max-w-2xl text-[1.05rem] leading-relaxed text-muted">
          Știi cafeneaua aia al cărei miros te trage de pe stradă înăuntru? Asta facem noi pentru
          afacerea ta, pe internet: un site pe care îl deschizi și zici „hmm, îmi place de ei”.{' '}
          <span className="text-white">
            Suntem doi oameni care scriu fiecare linie de cod cu mâna lor, și vorbești direct cu noi.
          </span>
        </p>

        <div className="flex flex-wrap gap-3 md:justify-end">
          <a href="#contact" className="btn btn--ember">
            Hai să vorbim
          </a>
          <a href="#work" className="btn">
            Vezi ce am construit
          </a>
        </div>
      </div>

      {/*
        Portretul nostru, pe tot cadrul, în culoare: oamenii cumpără de la oameni.
        16:9 (nu 21:9 ca în template) pentru că la 21:9 nu încap ambele fețe fără
        să taie bărbia.
      */}
      <figure className="photo reveal relative aspect-[16/9] w-full">
        <img
          src="/work/duo.webp"
          alt="Ana-Maria și George, cei doi fondatori Oops404"
          className="photo__img size-full object-cover"
        />
        <figcaption className="bubble bubble--float absolute bottom-4 left-4 sm:bottom-7 sm:left-7">
          <span className="bubble__dot" aria-hidden />
          <span className="truncate">
            {TEAM_MEMBERS.map((m) => m.name.split(' ').pop()).join(' & ')} · răspundem în aceeași zi
          </span>
        </figcaption>
      </figure>

      {/* sloganul, ca o notă scrisă sub poză */}
      <div className="reveal mt-6 flex flex-wrap items-baseline justify-between gap-3">
        <p className="display text-[1.4rem] text-white sm:text-[1.7rem]">„{SITE.slogan}”</p>
        <a href="#duo" className="link-draw text-[0.88rem] font-semibold">
          Fă cunoștință cu noi ↓
        </a>
      </div>
    </div>
  </section>
);
