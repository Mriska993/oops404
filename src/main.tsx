import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = document.getElementById('root')!;

const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

/**
 * Paginile vin deja desenate de la build (vezi `scripts/prerender.mjs`), așa că le
 * hidratăm în loc să le redesenăm — altfel primul cadru ar fi gol și am pierde exact
 * viteza pentru care s-a făcut prerenderul. `createRoot` rămâne pentru `npm run dev`,
 * unde nu există HTML prerandat.
 */
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, tree);
} else {
  ReactDOM.createRoot(root).render(tree);
}
