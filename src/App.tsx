import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Cursor } from './components/Cursor';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { TerminalModal } from './components/Terminal';

import { Home } from './pages/Home';
import { BlogIndex } from './pages/BlogIndex';
import { BlogPost } from './pages/BlogPost';
import { LegalPage } from './pages/LegalPage';
import { NotFound } from './pages/NotFound';

import { LEGAL_DOCS } from './lib/legal';
import { useHead } from './lib/head';
import { initConsimtamant, trimitePagina } from './lib/consent';
import { useKonami, useRevealObserver } from './utils/hooks';

/**
 * Derularea la schimbarea rutei.
 *
 * Fără asta, un click pe un articol te lasă la mijlocul paginii anterioare. Cazul
 * cu `hash` contează pentru link-urile de tip `/#work` din antet: venind de pe blog,
 * trebuie mai întâi să ajungem pe pagina principală și abia apoi la secțiune.
 */
const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // elementul există abia după ce React a desenat noua rută
      const tinta = document.getElementById(hash.slice(1));
      if (tinta) {
        tinta.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const [terminal, setTerminal] = useState(false);

  useRevealObserver();
  useKonami(useCallback(() => setTerminal(true), []));
  useHead(pathname);

  useEffect(() => {
    initConsimtamant();
  }, []);

  // o afișare de pagină per navigare; nu face nimic fără acord
  useEffect(() => {
    trimitePagina(pathname);
  }, [pathname]);

  return (
    <>
      <Cursor />

      <a
        href="#continut"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black"
      >
        Sari la conținut
      </a>

      <Header onOpenTerminal={() => setTerminal(true)} />

      <main id="continut">{children}</main>

      <Footer />

      <CookieBanner />
      <TerminalModal isOpen={terminal} onClose={() => setTerminal(false)} />
    </>
  );
};

export const App: React.FC = () => (
  <>
    <ScrollManager />
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        {/* câte o rută pentru fiecare document din `src/content/legal/` */}
        {LEGAL_DOCS.map((doc) => (
          <Route key={doc.slug} path={`/${doc.slug}`} element={<LegalPage slug={doc.slug} />} />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </>
);

export default App;
