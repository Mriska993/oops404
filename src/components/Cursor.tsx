import React, { useEffect, useRef, useState } from 'react';

/**
 * Cursorul din template: o bulină în mix-blend-mode difference care se deschide
 * și afișează o etichetă când treci peste ceva clickabil.
 */
export const Cursor: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let frame = 0;
    let x = -100;
    let y = -100;

    const paint = () => {
      if (ref.current) ref.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      frame = 0;
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);

      const el = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cursor], a, button');
      setLabel(el ? el.dataset.cursor ?? '' : null);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={`cursor-dot ${label !== null ? 'is-open' : ''}`}>
      <span className="cursor-dot__label">{label}</span>
    </div>
  );
};
