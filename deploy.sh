#!/usr/bin/env bash
#
# Scriptul de deploy pentru Ploi.
# Se opreste la prima eroare: un deploy pe jumatate e mai rau decat unul care nu a pornit.
set -euo pipefail

cd /home/ploi/oops404.ro

git pull origin main

# `npm ci` respecta package-lock.json exact, spre deosebire de `npm install`.
npm ci

# Build-ul are patru pasi, in ordine:
#   tsc                     verifica tipurile; daca pica, deploy-ul se opreste
#                           aici si site-ul vechi ramane in aer
#   vite build              bundle-ul pentru browser -> dist/
#   vite build --ssr        acelasi cod, compilat pentru Node -> dist-ssr/
#   scripts/prerender.mjs   randeaza fiecare ruta si scrie HTML static in dist/,
#                           plus sitemap.xml, rss.xml si robots.txt
npm run build

# dist-ssr/ e folosit doar in timpul build-ului; nu are ce cauta pe server dupa.
rm -rf dist-ssr

# Reaminteste ce nu e completat in paginile legale (scriptul de prerender scrie
# avertismentul mai sus, dar in log-urile de deploy se pierde usor).
echo
grep -n "TODO" src/data/legal.ts || true

echo "Deploy gata: $(date '+%F %T')"
