#!/usr/bin/env bash
#
# Scriptul de deploy pentru Ploi.
# Se opreste la prima eroare: un deploy pe jumatate e mai rau decat unul care nu a pornit.
set -euo pipefail

cd /home/ploi/oops404.ro

git pull origin main

# `npm ci` respecta package-lock.json exact, spre deosebire de `npm install`.
npm ci

# Build-ul ruleaza `tsc` inainte de `vite build`: daca tipurile nu trec,
# deploy-ul se opreste aici si site-ul vechi ramane in aer.
npm run build

echo "Deploy gata: $(date '+%F %T')"
