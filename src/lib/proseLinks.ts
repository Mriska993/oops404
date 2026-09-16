import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Link-urile dintr-un articol vin din Markdown, deci sunt `<a href>` obișnuite:
 * un click către `/blog/alt-articol` ar reîncărca tot site-ul. Hook-ul le prinde
 * pe cele interne și le trece prin router, ca să se comporte ca restul navigării.
 *
 * Rămân neatinse: ancorele din pagină (`#cuprins`), link-urile externe, `mailto:`
 * și `tel:`, plus orice click cu modificator — cineva care face Ctrl+click vrea
 * o filă nouă, nu o navigare.
 */
export const useProseLinks = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const link = (e.target as HTMLElement)?.closest('a');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;

      e.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    };

    container.addEventListener('click', onClick);
    return () => container.removeEventListener('click', onClick);
  }, [navigate]);

  return ref;
};
