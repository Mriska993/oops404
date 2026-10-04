import React from 'react';

/**
 * Logoul OOPS404 — exact cel din „LOGO UPDATE.pdf”, randat 1:1 cu fundal transparent
 * în public/brand/logo.png + logo.webp. Nu îl redesenăm și nu îl recolorăm.
 */
export const Logo: React.FC<{ className?: string; title?: string }> = ({
  className,
  title = 'OOPS404 — No clue, but somehow it works.',
}) => (
  <picture>
    {/* 960px ajunge pentru header (se afișează la ~250px); 2400px doar când e lat, în subsol */}
    <source srcSet="/brand/logo-960.webp 960w, /brand/logo.webp 2400w" sizes="(min-width: 640px) 440px, 320px" type="image/webp" />
    <img
      src="/brand/logo.png"
      alt={title}
      width={2400}
      height={752}
      decoding="async"
      className={className}
      draggable={false}
    />
  </picture>
);
