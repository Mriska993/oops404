import { renderToString } from 'react-dom/server';
// în react-router v7 `StaticRouter` a urcat în pachetul de bază (era în `react-router-dom/server`)
import { StaticRouter } from 'react-router';
import App from './App';

export { ALL_ROUTES, headFor, lastModFor, ORIGIN } from './lib/seo';
export { POSTS } from './lib/blog';
export { lipsuriLegale } from './data/legal';

/**
 * Punctul de intrare pentru prerender. Rulează în Node, la build, o singură dată
 * per rută; rezultatul devine HTML-ul livrat vizitatorului (și robotului Google)
 * înainte să pornească vreun JavaScript.
 */
export const render = (url: string): string =>
  renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
