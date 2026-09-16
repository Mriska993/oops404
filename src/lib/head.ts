import { useEffect } from 'react';
import { headFor } from './seo';
import { SITE } from '../data/site';

/** Ce punem noi în `<head>` poartă marcajul ăsta, ca să știm ce avem voie să ștergem. */
const MARKER = 'data-head';

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute(MARKER, '');
    document.head.appendChild(el);
  }
  el.content = content;
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    el.setAttribute(MARKER, '');
    document.head.appendChild(el);
  }
  el.href = href;
};

/**
 * Ține `<head>` la zi când se schimbă ruta.
 *
 * La prima încărcare, HTML-ul vine deja complet de la prerender — hook-ul doar
 * rescrie aceleași valori. Contează la navigările din browser, unde serverul nu
 * mai e implicat: fără el, ai citi un articol cu titlul paginii anterioare, iar
 * ce trimiți pe WhatsApp ar arăta greșit.
 */
export const useHead = (pathname: string): void => {
  useEffect(() => {
    const head = headFor(pathname);
    const url = head.canonical;

    document.title = head.title;

    setMeta('name', 'description', head.description);
    setMeta('name', 'robots', head.noindex ? 'noindex, follow' : 'index, follow');
    setLink('canonical', url);

    setMeta('property', 'og:type', head.type);
    setMeta('property', 'og:title', head.title);
    setMeta('property', 'og:description', head.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', `https://${SITE.domain}${head.image}`);
    setMeta('property', 'og:locale', 'ro_RO');
    setMeta('property', 'og:site_name', SITE.name);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', head.title);
    setMeta('name', 'twitter:description', head.description);
    setMeta('name', 'twitter:image', `https://${SITE.domain}${head.image}`);

    if (head.type === 'article') {
      if (head.publishedTime) setMeta('property', 'article:published_time', head.publishedTime);
      if (head.modifiedTime) setMeta('property', 'article:modified_time', head.modifiedTime);
    } else {
      document.head.querySelectorAll('meta[property^="article:"]').forEach((el) => el.remove());
    }

    // JSON-LD: îl rescriem de fiecare dată, altfel s-ar aduna schemele rutelor vizitate
    document.head.querySelectorAll(`script[type="application/ld+json"]`).forEach((el) => el.remove());
    for (const schema of head.jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute(MARKER, '');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [pathname]);
};
