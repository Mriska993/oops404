import React from 'react';
import { Link } from 'react-router-dom';
import { POSTS } from '../lib/blog';

/** Pentru un studio numit OOPS404, pagina asta e practic o pagină de portofoliu. */
export const NotFound: React.FC = () => (
  <section className="border-t border-line-soft py-24 sm:py-32">
    <div className="shell">
      <span className="eyebrow">Eroare 404</span>

      <h1 className="display mt-4 text-[clamp(3rem,12vw,8rem)] leading-none">
        Nu <em>există</em>.
      </h1>

      <p className="mt-8 max-w-xl text-[1rem] leading-relaxed text-muted">
        Adresa asta nu duce nicăieri. Ori s-a schimbat, ori a fost scrisă greșit, ori am stricat noi
        ceva — a treia variantă e cea mai probabilă și ne-ar prinde bine să aflăm.
      </p>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link to="/" className="btn btn--ember">
          Înapoi acasă
        </Link>
        <Link to="/blog" className="btn">
          Vezi blogul
        </Link>
      </div>

      {POSTS.length > 0 && (
        <div className="mt-16 border-t border-line-soft pt-8">
          <h2 className="meta mb-5">Cât ești aici</h2>
          <ul className="space-y-3">
            {POSTS.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="display text-[1.3rem] leading-tight text-white transition-opacity hover:opacity-70"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </section>
);

export default NotFound;
