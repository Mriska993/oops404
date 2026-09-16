---
titlu: Politica de cookie-uri
descriere: Ce se stochează în browserul tău când intri pe oops404.ro, cât ține, și cum accepți sau refuzi — cu lista completă, nu cu generalități.
meniu: Cookie-uri
ordine: 3
---

Ultima actualizare: **{{actualizat}}**

Un cookie e un fișier mic pe care un site îl pune în browserul tău ca să-și amintească ceva. Tehnologiile înrudite — `localStorage`, `sessionStorage` — fac cam același lucru, iar regulile sunt aceleași, așa că le tratăm la fel aici.

**{{brand}} nu pune niciun cookie de care să nu ai nevoie, până nu spui tu că e în regulă.** Dacă închizi bannerul fără să accepți, nu se încarcă nimic în plus. Nu există „refuzul e mai greu decât acceptul” pe site-ul ăsta.

## Ce se stochează fără să te întrebăm

Sunt lucruri strict necesare ca site-ul să funcționeze sau ca alegerea ta să fie respectată. Pentru ele legea nu cere consimțământ — dar merită să știi că există.

| Nume | Ce face | Tip | Cât ține |
| --- | --- | --- | --- |
| `oops404_consent` | ține minte dacă ai acceptat sau ai refuzat statisticile, ca să nu te întrebăm la fiecare pagină | localStorage | 6 luni, apoi întrebăm din nou |

Atât. Nu avem cookie de sesiune, pentru că nu există conturi. Nu avem coș de cumpărături. Nu avem cookie de limbă, pentru că site-ul e într-o singură limbă.

{{#analytics}}
## Ce se încarcă doar dacă accepți

Dacă apeși „Accept” în banner, încărcăm Google Analytics 4. Ne arată câți oameni citesc blogul și ce subiecte prind — cifre agregate, nu oameni cu nume.

| Nume | Cine îl pune | Ce face | Cât ține |
| --- | --- | --- | --- |
| `_ga` | Google | dă browserului tău un număr aleatoriu, ca vizitele repetate să fie numărate ca una singură | 2 ani |
| `_ga_<ID>` | Google | ține starea sesiunii curente pentru proprietatea noastră de Analytics | 2 ani |
| `_gid` | Google | același rol, pe termen scurt; nu apare în toate configurările | 24 de ore |

Până apeși „Accept”, scriptul Google **nu ajunge în pagină**. Nu e încărcat-și-dezactivat, nu e amânat: pur și simplu nu există. Poți verifica singur în fila Network din consola browserului — chiar te încurajăm.

Ce face Google cu datele, după ce ajung la el, scrie în [politica lor de confidențialitate](https://policies.google.com/privacy) și în [explicația despre cum folosesc datele din site-urile partenere](https://policies.google.com/technologies/partner-sites).
{{/analytics}}
{{^analytics}}
## Ce s-ar încărca dacă ai accepta

Momentan, nimic: nu avem instalat niciun instrument de statistici sau de publicitate. Bannerul și secțiunea asta rămân pregătite pentru ziua în care adăugăm unul — iar atunci lista de mai jos va fi completată înainte ca scriptul să ruleze prima oară.
{{/analytics}}

## Ce nu găsești pe site-ul ăsta

Ca să fie clar prin eliminare:

- **Fără cookie-uri de publicitate.** Nu avem Meta Pixel, nu avem Google Ads, nu avem TikTok Pixel, nu retargetăm pe nimeni.
- **Fără butoane de social media** care urmăresc din umbră. Nu avem nici conturi de brand.
- **Fără hărți, videoclipuri sau chat-uri încorporate** de la terți.
- **Fără fingerprinting** și fără nicio încercare de a te recunoaște fără cookie-uri.

- **Fără fonturi de pe servere străine.** Sunt găzduite la noi, tocmai ca să nu plece adresa ta IP către Google la fiecare pagină. Explicăm de ce contează în [politica de confidențialitate]({{site}}/confidentialitate).

Dacă nu accepți statisticile, browserul tău **nu face nicio cerere în afara domeniului {{domeniu}}** cât timp ești pe site. Poți verifica în fila Network din consolă.

## Cum te răzgândești

Ai două căi, amândouă bune:

**Pe site.** Butonul **„Setări cookie-uri”** din subsolul oricărei pagini redeschide bannerul. Alegi altfel, se aplică imediat. Dacă retragi acordul, ștergem preferința și nu mai încărcăm scriptul la următoarea pagină; cookie-urile deja puse de Google le poți șterge din browser, cu pașii de mai jos.

**Din browser.** Poți bloca sau șterge cookie-uri oricând, pentru orice site:

- [Chrome](https://support.google.com/chrome/answer/95647)
- [Firefox](https://support.mozilla.org/ro/kb/cookie-urile)
- [Safari](https://support.apple.com/ro-ro/guide/safari/sfri11471/mac)
- [Edge](https://support.microsoft.com/ro-ro/microsoft-edge)

Dacă ștergi tot, dispare și preferința ta salvată — așa că te vom întreba din nou la următoarea vizită. Nu e o pedeapsă, e doar cum funcționează.

**Blochează refuzul la sursă.** Google oferă o [extensie care oprește Analytics pe toate site-urile](https://tools.google.com/dlpage/gaoptout), indiferent ce spune fiecare banner în parte.

## Ce se strică dacă refuzi

Nimic. Site-ul arată și funcționează identic. Singura diferență e că noi nu vedem că ai trecut pe aici.

## Când se schimbă ceva

Dacă adăugăm sau scoatem un instrument, actualizăm tabelele de mai sus și data de la începutul paginii, iar bannerul îți cere din nou acordul înainte să ruleze ceva nou.
