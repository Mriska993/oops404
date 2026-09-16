import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { POSTS, TAGS, formatDate } from '../lib/blog';
import { slugify } from '../lib/markdown';

/**
 * Lista de articole.
 *
 * Filtrarea pe tag-uri se face aici, în pagină, fără rute separate: cu un blog de
 * dimensiunea ăsta, o adresă per tag ar însemna zece pagini cu câte două articole —
 * exact tipul de conținut subțire pe care Google îl ignoră oricum.
 */
export const BlogIndex: React.FC = () => {
  const [tag, setTag] = useState<string | null>(null);

  const visible = useMemo(
    () => (tag ? POSTS.filter((p) => p.tags.some((t) => slugify(t) === tag)) : POSTS),
    [tag]
  );

  return (
    <div className="border-t border-line-soft">
      <section className="py-20 sm:py-24">
        <div className="shell">
          <span className="eyebrow">Blog</span>
          <h1 className="display mt-3 max-w-3xl text-[clamp(2.4rem,6vw,4.6rem)]">
            Cum lucrăm, <em>pe bune</em>.
          </h1>
          <p className="mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-muted">
            Scriem despre ce ne întreabă clienții oricum: cât costă, cât durează, de ce contează
            viteza și când nu ai nevoie de noi. Fără limbaj de agenție și fără articole scrise ca să
            existe articole.
          </p>

          {TAGS.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-line-soft pt-6">
              <button onClick={() => setTag(null)} className={`tab ${tag === null ? 'is-active' : ''}`}>
                Toate [{POSTS.length}]
              </button>
              {TAGS.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => setTag(t.slug)}
                  className={`tab ${tag === t.slug ? 'is-active' : ''}`}
                >
                  {t.label} [{t.count}]
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="pb-24 sm:pb-28">
        <div className="shell">
          <div className="border-t border-line-soft">
            {visible.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                data-cursor="CITEȘTE"
                className="row reveal grid-cols-1 lg:grid-cols-[8rem_1fr_6rem] lg:items-baseline lg:gap-8"
              >
                <span className="meta">{formatDate(post.date)}</span>

                <span className="min-w-0">
                  <span className="display block text-[1.7rem] leading-tight text-white sm:text-[2.2rem]">
                    {post.title}
                  </span>
                  <span className="mt-3 block max-w-2xl text-[0.9rem] leading-relaxed text-muted">
                    {post.description}
                  </span>
                  {post.tags.length > 0 && (
                    <span className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                      {post.tags.map((t) => (
                        <span key={t} className="meta">
                          {t}
                        </span>
                      ))}
                    </span>
                  )}
                </span>

                <span className="meta whitespace-nowrap lg:text-right">
                  {post.readingMinutes} min
                  <span className="mt-1 block text-dim">{String(i + 1).padStart(2, '0')}</span>
                </span>
              </Link>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="py-16 text-[0.95rem] text-muted">
              Niciun articol cu tag-ul ăsta încă.{' '}
              <button onClick={() => setTag(null)} className="link-draw text-white">
                Vezi tot
              </button>
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogIndex;
