import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { LEGAL_DOCS, getLegalDoc } from '../lib/legal';
import { NotFound } from './NotFound';
import { useProseLinks } from '../lib/proseLinks';

/** Toate documentele legale folosesc aceeași pagină; conținutul vine din `src/content/legal/`. */
export const LegalPage: React.FC<{ slug?: string }> = ({ slug: fixed }) => {
  const params = useParams();
  const slug = fixed ?? params.slug ?? '';
  const doc = getLegalDoc(slug);
  const prose = useProseLinks<HTMLDivElement>();

  if (!doc) return <NotFound />;

  return (
    <div className="border-t border-line-soft">
      <header className="py-16 sm:py-20">
        <div className="shell">
          <span className="eyebrow">Legal</span>
          <h1 className="display mt-3 max-w-3xl text-[clamp(2.2rem,5.5vw,4rem)]">{doc.title}</h1>
          {doc.description && (
            <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-muted">{doc.description}</p>
          )}
        </div>
      </header>

      <div className="shell pb-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">
          <div ref={prose} className="prose-editorial" dangerouslySetInnerHTML={{ __html: doc.html }} />

          <aside className="order-first hidden lg:order-none lg:block">
            <div className="sticky top-28 space-y-10">
              {doc.headings.length > 2 && (
                <nav>
                  <h2 className="meta mb-4 border-b border-line-soft pb-3">Cuprins</h2>
                  <ul className="space-y-2.5">
                    {doc.headings.map((h) => (
                      <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
                        <a
                          href={`#${h.id}`}
                          className="block text-[0.82rem] leading-snug text-muted transition-colors hover:text-white"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <nav>
                <h2 className="meta mb-4 border-b border-line-soft pb-3">Celelalte documente</h2>
                <ul className="space-y-2.5">
                  {LEGAL_DOCS.filter((d) => d.slug !== doc.slug).map((d) => (
                    <li key={d.slug}>
                      <Link
                        to={`/${d.slug}`}
                        className="block text-[0.82rem] leading-snug text-muted transition-colors hover:text-white"
                      >
                        {d.menu}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
