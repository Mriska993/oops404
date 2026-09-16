Capturi full-page ale site-urilor live, facute cu Chrome headless prin CDP.
Toate au exact 1200 x 3833 px (viewport 1440x900, taiate la 4600px inaltime).

MARIMEA IDENTICA E OBLIGATORIE.
SiteFrame deruleaza imaginea cu procente fixe, calculate din raportul dintre
inaltimea capturii si inaltimea ferestrei. Sunt doua seturi in index.css, pentru
ca fereastra e mai inalta pe telefon:

  desktop (fereastra 16/10)  --shot-travel: -80.43%   --thumb-size: 19.57%
  telefon (fereastra 4/5)    --shot-travel: -60.87%   --thumb-size: 39.13%

Daca schimbi inaltimea unei capturi, ori o reincadrezi la 3833px, ori recalculezi
ambele seturi dupa formula din comentariul de langa ele.

Cum se refac, cand se schimba un site:
  viewport 1440x900
  -> scroll prin toata pagina (porneste animatiile de reveal)
  -> inchide bannerul de cookies
  -> Page.captureScreenshot cu captureBeyondViewport, clip 1440x4600
  -> ffmpeg -vf scale=1200:-2 -c:v libwebp -quality 76
