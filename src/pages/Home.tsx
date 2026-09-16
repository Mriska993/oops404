import React, { useState } from 'react';

import { Hero } from '../components/Hero';
import { Work } from '../components/Work';
import { Services } from '../components/Services';
import { Process } from '../components/Process';
import { Duo } from '../components/Duo';
import { Budget } from '../components/Budget';
import { Contact } from '../components/Contact';
import { CaseStudy } from '../components/CaseStudy';
import { LatestPosts } from '../components/LatestPosts';

import { Project } from '../types';

/** Pagina principală: exact ce era înainte în `App`, plus un capăt de pod către blog. */
export const Home: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <Hero />
      <Work onOpenProject={setSelected} />
      <Services />
      <Process />
      <Duo />
      <Budget />
      <LatestPosts />
      <Contact />

      <CaseStudy project={selected} onChange={setSelected} onClose={() => setSelected(null)} />
    </>
  );
};

export default Home;
