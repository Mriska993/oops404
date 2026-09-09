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
    <source srcSet="/brand/logo.webp" type="image/webp" />
    <img
      src="/brand/logo.png"
      alt={title}
      decoding="async"
      className={className}
      draggable={false}
    />
  </picture>
);
