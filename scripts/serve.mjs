import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Servește `dist/` exact cum o face nginx în producție (vezi `deploy/nginx.conf`).
 *
 * De ce nu `vite preview`: acela are fallback de SPA și întoarce pagina principală
 * pentru ORICE adresă — deci `/blog` primea HTML-ul de la `/`, iar hidratarea pica
 * pe un ecran care în producție e perfect sănătos. Un server de test care minte
 * despre producție e mai rău decât niciunul.
 *
 * Regula, în ordine: fișierul cerut → directorul cu `index.html` → `404.html` cu cod 404.
 */

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.argv[2] ?? 4173);

const TIPURI = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const fisier = (p) => {
  try {
    return fs.statSync(p).isFile() ? p : null;
  } catch {
    return null;
  }
};

http
  .createServer((req, res) => {
    const cale = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

    // fără asta, „/../../etc/passwd” ar ieși din dist
    const tinta = path.join(root, path.normalize(cale).replace(/^(\.\.[/\\])+/, ''));
    if (!tinta.startsWith(root)) {
      res.writeHead(403).end('Interzis');
      return;
    }

    const gasit = fisier(tinta) ?? fisier(path.join(tinta, 'index.html'));
    const cod = gasit ? 200 : 404;
    const deServit = gasit ?? path.join(root, '404.html');

    if (!fisier(deServit)) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('404');
      return;
    }

    res.writeHead(cod, { 'content-type': TIPURI[path.extname(deServit)] ?? 'application/octet-stream' });
    fs.createReadStream(deServit).pipe(res);
  })
  .listen(port, () => {
    console.log(`dist/ servit ca în producție: http://localhost:${port}`);
  });
