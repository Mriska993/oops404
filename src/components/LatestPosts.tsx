import React from 'react';
import { Link } from 'react-router-dom';
import { POSTS, formatDate } from '../lib/blog';

/** Ultimele articole, pe pagina principală. Dacă blogul e gol, secțiunea nu apare deloc. */
export const LatestPosts: React.FC = () => {
  const latest = POSTS.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section id="blog" className="scroll-mt-20 border-t border-line-soft py-24 sm:py-28">
      <div className="shell">
        <div className="reveal mb-10 flex flex-wrap items-baseline justify-between gap-4 border-b border-line-soft pb-5">
          <span className="eyebrow">De pe blog</span>
          <Link to="/blog" className="link-draw text-[0.72rem] font-bold uppercase tracking-wider2">
            Toate articolele ↗
          </Link>
        </div>

        <div className="border-t border-line-soft">
          {latest.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              data-cursor="CITEȘTE"
              className="row reveal grid-cols-1 sm:grid-cols-[6rem_1fr_auto] sm:items-baseline sm:gap-6"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="meta">{formatDate(post.date).replace(/ \d{4}$/, '')}</span>

              <span className="min-w-0">
                <span className="display block text-[1.5rem] leading-tight text-white sm:text-[1.9rem]">
                  {post.title}
                </span>
                <span className="mt-2 block max-w-2xl text-[0.88rem] leading-relaxed text-muted">
                  {post.description}
                </span>
              </span>

              <span className="meta whitespace-nowrap">{post.readingMinutes} min</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
