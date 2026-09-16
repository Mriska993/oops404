Capturi full-page ale site-urilor live, facute cu Chrome headless prin CDP.
Toate au exact 1200 x 3833 px (viewport 1440x900, taiate la 4600px inaltime).

Marimea identica e importanta: SiteFrame deruleaza imaginea cu un procent fix
(--shot-travel din index.css). Daca schimbi inaltimea unei capturi, ori o
reincadrezi la 3833px, ori recalculezi procentul.

Reface-le cand se schimba un site (vezi scriptul din istoricul sesiunii):
viewport 1440x900 -> scroll prin toata pagina (porneste reveal-urile)
-> inchide bannerul de cookies -> Page.captureScreenshot captureBeyondViewport
-> ffmpeg -vf scale=1200:-2 -c:v libwebp -quality 76
