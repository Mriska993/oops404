---
titlu: De ce nu lucrăm pe template-uri
descriere: Un template costă 60 de euro și pare o afacere. Explicăm unde se duc banii pe care îi economisești și când, totuși, ai dreptate să alegi unul.
data: 2026-09-16
taguri: [engineering, business]
autor: OOPS404
---

Întrebarea vine la aproape fiecare discuție, de obicei în minutul șapte: *„Dar n-ar fi mai simplu să luăm un template de 60 de euro?”*

Răspunsul cinstit e că uneori da. Mai jos e și când, și de ce în restul cazurilor nu.

## Ce cumperi când cumperi un template

Un template e un site terminat pentru altcineva. E gândit să arate bine în captura din magazin, unde are exact pozele, exact textele și exact numărul de servicii pentru care a fost desenat.

Tu ai altceva. Ai patru servicii, nu șase. Ai un logo care nu intră în spațiul prevăzut. Ai o listă de prețuri pe care template-ul nu o are deloc. Și așa începe partea nespusă: nu instalezi un template, **îl negociezi**.

Negocierea asta are un cost și el nu apare în preț. Apare în orele în care cauți de ce nu se schimbă o culoare, în plugin-ul pe care îl instalezi ca să faci ceva ce ar fi trebuit să fie o linie de cod, și în compromisul pe care îl faci până la urmă: „lasă, merge și cu trei servicii”.

> Cel mai scump lucru la un template nu e prețul lui. E lista de lucruri pe care ajungi să nu le mai faci, pentru că template-ul nu le poate face.

## Unde se duce greutatea

Un template comercial trebuie să se vândă de zece mii de ori. Ca să reușească, trebuie să încapă în zece mii de situații diferite. Deci vine cu tot: un constructor vizual de pagini, șase variante de antet, un slider, o galerie, un magazin, un sistem de rezervări, animații pe care nu le vei folosi niciodată.

Nimic din ce nu folosești nu dispare. Codul rămâne în pagină și se încarcă la fiecare vizită.

În practică asta înseamnă un site care pornește de la câteva megaocteți de JavaScript și CSS înainte să fi scris tu un cuvânt. Pe fibră, în Chrome, pe laptopul tău, nu se vede. Pe un telefon de acum patru ani, pe 4G, la marginea orașului — se vede foarte bine.

Iar Google măsoară exact varianta a doua, nu prima.

## Trei numere care contează

Google se uită la trei lucruri când decide dacă site-ul tău e o experiență bună. Le cheamă Core Web Vitals și pragurile sunt publice:

| Ce măsoară | Pragul „bun” | În românește |
| --- | --- | --- |
| LCP | sub 2,5 secunde | cât durează până apare lucrul principal din ecran |
| INP | sub 200 de milisecunde | cât durează până site-ul reacționează când apeși ceva |
| CLS | sub 0,1 | cât îți sare conținutul sub deget în timp ce se încarcă |

Un template supraîncărcat pică de obicei la primul și la al treilea. La primul pentru că are prea multe de descărcat înainte să deseneze ceva. La al treilea pentru că imaginile și reclamele intră în pagină pe rând și împing textul în jos — ai pățit-o și tu, ai vrut să apeși un buton și ai apăsat altceva.

Diferența nu e teoretică. Un om care așteaptă patru secunde pe telefon ca să afle prețul unui serviciu de multe ori nu mai așteaptă. Nu îți scrie ca să-ți spună. Pur și simplu nu apare în statistici niciodată.

## Ce facem noi în loc

Scriem doar ce ai nevoie. Sună ca un slogan, dar e literal: dacă site-ul tău are un antet, o pagină de servicii, un formular și un blog, atunci în cod există un antet, o pagină de servicii, un formular și un blog. Nu există un constructor de pagini, pentru că nu construiește nimeni pagini după lansare. Nu există un slider, dacă n-ai nevoie de un slider.

Rezultatul e un site care se încarcă în mai puțin de o secundă pentru că **nu are ce să încarce**. Nu e o optimizare, e o absență.

```
Template comercial tipic       Site scris de la zero
─────────────────────────      ─────────────────────
~2,4 MB JavaScript             ~60 KB JavaScript
14 plugin-uri                  0 plugin-uri
4 baze de cod de întreținut    1
actualizări săptămânale        când vrei tu
```

Al treilea rând e cel de care se vorbește cel mai puțin și doare cel mai tare. Un site pe template are patru lucruri care se pot strica independent: platforma, tema, plugin-urile și integrarea dintre ele. Fiecare se actualizează după propriul calendar. Câteodată o actualizare de securitate strică aspectul. Câteodată o actualizare de temă strică un plugin. Cineva trebuie să se ocupe.

## Și securitatea

Un site construit din piese populare e o țintă populară. Nu pentru că cineva te vrea pe tine — ci pentru că scanează automat tot internetul după acea versiune de plugin cu o vulnerabilitate cunoscută, iar tu te nimerești în listă.

Un site static, scris de mână, nu are panou de administrare, nu are bază de date expusă și nu are plugin-uri. Nu e invulnerabil — nimic nu e — dar suprafața de atac e cu un ordin de mărime mai mică. **Ce nu există nu poate fi spart.**

## Când un template e alegerea corectă

Nu suntem religioși în privința asta. Ia un template dacă:

- **Testezi o idee.** Vrei să vezi dacă produsul are căutare înainte să investești în el. Perfect rațional.
- **Bugetul e sub o mie de euro și ai nevoie de ceva mâine.** Un template prost e mai bun decât niciun site.
- **Conținutul se schimbă zilnic și tu îl scrii.** Un blog personal cu trei articole pe săptămână nu are nevoie de noi.
- **Site-ul nu e canalul prin care vin clienții.** Dacă toți clienții vin din recomandări și site-ul e doar o carte de vizită, un template e suficient.

Îți vom spune noi asta, dacă e cazul tău. Am trimis oameni către soluții mai ieftine și n-am regretat niciodată.

## Când nu e

Situația se schimbă când site-ul chiar aduce bani. Când e prima impresie pentru un client care compară trei firme. Când o secundă în plus la încărcare înseamnă oameni pierduți care nu se întorc. Când brandul trebuie să arate ca al tău, nu ca al celui care a cumpărat același template.

Atunci diferența dintre 60 de euro și câteva mii nu mai e o cheltuială. E raportul dintre a fi găsit și a nu fi.

## Ce te costă de fapt

Ca să fie cinstit până la capăt, un template nu costă 60 de euro. Costă 60 de euro plus:

- orele în care îl adaptezi sau plătești pe cineva să-l adapteze;
- un abonament anual la temă și la plugin-urile premium din care e făcută;
- întreținerea, pentru că actualizările nu se opresc;
- ce pierzi din trafic dacă rămâne lent;
- și, la un moment dat, refacerea lui — pentru că template-urile îmbătrânesc vizibil în doi-trei ani.

Pune-le cap la cap pe cinci ani și compară cu un site scris o dată, bine. De multe ori nu mai e nicio diferență. Uneori template-ul iese mai scump.

Scrie-ne cu ce ai în cap și îți spunem sincer în care dintre cele două situații ești. Inclusiv dacă răspunsul e „nu ai nevoie de noi”.
