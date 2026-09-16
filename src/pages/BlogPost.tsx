import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatDate, getPost, relatedPosts } from '../lib/blog';
import { SITE } from '../data/site';
import { NotFound } from './NotFound';
import { useProseLinks } from '../lib/proseLinks';

/** Marchează în cuprins secțiunea din dreptul căreia citești. */
const useActiveHeading = (ids: string[]): string | null => {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const vizibile = entries.filter((e) => e.isIntersecting);
        if (vizibile.length > 0) setActive(vizibile[0].target.id);
      },
      // banda de sus a ecranului: titlul „curent” e cel de sub antet, nu cel din mijloc
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids.join('|')]);

  return active;
};

export const BlogPost: React.FC = () => {
  const { slug = '' } = useParams();
  const post = getPost(slug);

  // hook-urile stau înaintea oricărui `return` — altfel ordinea lor s-ar schimba
  // între un slug care există și unul care nu
  const active = useActiveHeading(post?.headings.map((h) => h.id) ?? []);
  const prose = useProseLinks<HTMLDivElement>();

  if (!post) return <NotFound />;

  const related = relatedPosts(post.slug);

  return (
    <div className="border-t border-line-soft">
      <article>
        {/* titlul */}
        <header className="py-16 sm:py-20">
          <div className="shell">
            <Link to="/blog" className="meta transition-colors hover:text-white">
              ← Blog
            </Link>

            <h1 className="display mt-6 max-w-4xl text-[clamp(2.2rem,5.5vw,4.2rem)]">{post.title}</h1>

            <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
              {post.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line-soft pt-5">
              <time className="meta" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              <span className="meta">{post.readingMinutes} min de citit</span>
              <span className="meta">{post.author}</span>
              {post.tags.map((t) => (
                <span key={t} className="meta text-dim">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </header>

        {post.cover && (
          <div className="shell mb-16">
            <img
              src={post.cover}
              alt={post.coverAlt}
              className="w-full border border-line-soft"
              width={1200}
              height={630}
            />
          </div>
        )}

        <div className="shell pb-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">
            <div
              ref={prose}
              className="prose-editorial"
              // conținutul vine din `src/content/blog/*.md`, scris de noi și trecut prin build
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {post.headings.length > 2 && (
              <aside className="order-first hidden lg:order-none lg:block">
                <div className="sticky top-28">
                  <h2 className="meta mb-4 border-b border-line-soft pb-3">Cuprins</h2>
                  <nav>
                    <ul className="space-y-2.5">
                      {post.headings.map((h) => (
                        <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
                          <a
                            href={`#${h.id}`}
                            className={`block text-[0.82rem] leading-snug transition-colors ${
                              active === h.id ? 'text-ember' : 'text-muted hover:text-white'
                            }`}
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>

      {/* îndemn, în tonul articolului: fără „contactați-ne acum” */}
      <section className="border-t border-line-soft bg-alt py-16">
        <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[0.95rem] leading-relaxed text-muted">
            Ai o întrebare la care articolul nu răspunde? Scrie-ne — răspundem noi, nu un formular
            automat.
          </p>
          <a href={`mailto:${SITE.email}`} className="btn btn--ember shrink-0">
            Scrie-ne
          </a>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line-soft py-20">
          <div className="shell">
            <h2 className="eyebrow mb-8">Citește și</h2>
            <div className="border-t border-line-soft">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  data-cursor="CITEȘTE"
                  className="row grid-cols-1 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <span className="min-w-0">
                    <span className="display block text-[1.4rem] leading-tight text-white sm:text-[1.8rem]">
                      {p.title}
                    </span>
                    <span className="mt-2 block max-w-2xl text-[0.88rem] leading-relaxed text-muted">
                      {p.description}
                    </span>
                  </span>
                  <span className="meta whitespace-nowrap">{p.readingMinutes} min</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
