import React, { useCallback, useState } from 'react';

import { Cursor } from './components/Cursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Duo } from './components/Duo';
import { Budget } from './components/Budget';
import { Contact } from './components/Contact';
import { CaseStudy } from './components/CaseStudy';
import { TerminalModal } from './components/Terminal';

import { Project } from './types';
import { useKonami, useRevealObserver } from './utils/hooks';

export const App: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [terminal, setTerminal] = useState(false);

  useRevealObserver();
  useKonami(useCallback(() => setTerminal(true), []));

  return (
    <>
      <Cursor />

      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black"
      >
        Sari la conținut
      </a>

      <Header onOpenTerminal={() => setTerminal(true)} />

      <main>
        <Hero />
        <Work onOpenProject={setSelected} />
        <Services />
        <Process />
        <Duo />
        <Budget />
        <Contact />
      </main>

      <CaseStudy project={selected} onChange={setSelected} onClose={() => setSelected(null)} />
      <TerminalModal isOpen={terminal} onClose={() => setTerminal(false)} />
    </>
  );
};

export default App;
