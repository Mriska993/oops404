---
titlu: Viteza site-ului, pe înțelesul clientului
descriere: Ce înseamnă Core Web Vitals fără jargon, de ce site-ul tău e rapid la tine și lent la clienți, și ce poți verifica singur în cinci minute.
data: 2026-08-27
taguri: [performanță, SEO]
autor: OOPS404
---

Orice firmă care face site-uri îți spune că livrează „site-uri rapide”. Nimeni nu spune vreodată „site-uri lente”.

Articolul ăsta îți dă instrumentele ca să verifici singur, în cinci minute, fără să crezi pe cuvânt pe nimeni — inclusiv pe noi.

## De ce site-ul tău ți se pare rapid

Pentru că îl testezi în cele mai bune condiții posibile din lume.

Îl deschizi pe laptopul tău, pe wifi-ul de la birou, într-un browser care are deja totul salvat în memorie din ultimele cincizeci de vizite. E ca și cum ai testa dacă un restaurant e aglomerat mergând acolo marți la 15:30.

Clientul tău îl deschide prima oară în viața lui. Pe un telefon de acum patru ani. În mașină, pe date mobile, cu două liniuțe de semnal. Cu memoria plină. Fără nimic salvat.

**Ăla e site-ul tău.** Celălalt e o iluzie.

## Cele trei măsurători ale Google

Google a redus toată povestea la trei numere, pe care le numește Core Web Vitals. Le folosește ca semnal de clasare, deci contează și pentru vizitatori, și pentru poziția în rezultate.

### LCP — cât durează până apare ceva de citit

Măsoară în cât timp se desenează cel mai mare element din primul ecran: de obicei imaginea principală sau titlul mare.

- **Bun:** sub 2,5 secunde
- **Are nevoie de îmbunătățiri:** 2,5–4 secunde
- **Slab:** peste 4 secunde

E numărul care se traduce direct în „am așteptat prea mult și am ieșit”. Cauza obișnuită: o imagine uriașă, netăiată, pusă direct de pe telefon în pagină.

### INP — cât durează până site-ul te ascultă

Măsoară întârzierea dintre momentul în care apeși ceva și momentul în care pagina reacționează vizibil.

- **Bun:** sub 200 de milisecunde
- **Slab:** peste 500 de milisecunde

E senzația aia de „am apăsat și nu s-a întâmplat nimic, mai apăs o dată”. De obicei înseamnă prea mult JavaScript care rulează în fundal și ține browserul ocupat.

### CLS — cât îți sare pagina sub deget

Măsoară cât se mișcă lucrurile din pagină în timp ce se încarcă.

- **Bun:** sub 0,1
- **Slab:** peste 0,25

Ai pățit-o: începi să citești, apare o imagine deasupra, textul coboară, pierzi rândul. Sau vrei să apeși „acceptă” și apeși „abonează-te”. Cauza aproape mereu aceeași: imagini și reclame fără dimensiuni rezervate dinainte.

> Diferența dintre un site bun și unul enervant e, în proporție covârșitoare, diferența dintre a rezerva spațiul dinainte și a nu-l rezerva.

## Cum verifici singur, acum

### PageSpeed Insights

Intră pe [pagespeed.web.dev](https://pagespeed.web.dev), pune adresa site-ului tău și apasă. E gratuit, e de la Google, durează un minut.

Ce să te uiți:

1. **Selectează „Mobil”, nu „Desktop”.** Desktop-ul e mereu mai frumos și mai puțin relevant — majoritatea vizitatorilor vin de pe telefon.
2. **Caută secțiunea de date reale**, dacă apare. Se cheamă „Descoperiți experiența utilizatorilor dvs.” și arată ce au pățit oamenii reali în ultimele 28 de zile. E mai valoroasă decât scorul de laborator.
3. **Scorul colorat e o orientare, nu o notă.** Un 85 verde care se încarcă în 1,2 secunde e mai bun decât un 98 obținut prin scoaterea tuturor imaginilor.

### Testul telefonului vechi

Cel mai onest test nu are nevoie de nicio unealtă.

Ia telefonul cuiva din familie — cel vechi, ăla care „mai merge”. Închide wifi-ul. Deschide o filă incognito. Scrie adresa site-ului tău și numără în gând.

Dacă ai ajuns la patru, ai aflat tot ce trebuia.

## Cele patru lucruri care strică aproape mereu viteza

Din experiența noastră, ordinea e cam asta:

**1. Imaginile.** De departe cel mai frecvent. O poză făcută cu telefonul are 4–6 MB și 4000 de pixeli lățime. În pagină e afișată la 800. Browserul o descarcă întreagă, apoi o micșorează. Rezolvat corect — dimensiune potrivită, format modern, încărcare amânată pentru ce e sub ecran — aceeași poză ajunge la 60–150 KB. **De 40 de ori mai puțin, la aceeași calitate vizibilă.**

**2. Fonturile.** Trei familii de fonturi, fiecare cu patru grosimi, fiecare încărcată de pe alt server. Textul fie apare târziu, fie apare cu alt font și apoi sare. Două familii, două-trei grosimi, găzduite local: problema dispare.

**3. Script-urile de la alții.** Chat-ul, pixelul de Facebook, harta încorporată, bannerul de cookie-uri, instrumentul de heatmap. Fiecare pare mic. Puse cap la cap, sunt de obicei mai grele decât site-ul tău.

**4. Platforma însăși.** Un site construit din piese care încearcă să facă orice va încărca mereu piese pe care nu le folosești. Despre asta am scris separat, în [de ce nu lucrăm pe template-uri](/blog/de-ce-nu-lucram-pe-template).

## Ce poți cere concret

Dacă cineva îți face site-ul, astea sunt cererile rezonabile de pus în discuție de la început:

- imaginile livrate în format modern (WebP sau AVIF), la dimensiunea la care sunt afișate;
- lățimea și înălțimea declarate pentru fiecare imagine, ca pagina să nu sară;
- fonturile găzduite pe serverul tău, nu luate de pe servere străine;
- niciun script de la terți care nu are un motiv clar să existe;
- un raport PageSpeed pe mobil, făcut la final, arătat ca dovadă.

Ultima e cea mai importantă. Nu e o cerere agresivă — e echivalentul de a cere o probă de funcționare la recepția unei lucrări.

## Ce înseamnă în bani

Viteza nu e un capriciu de inginer. Se vede în trei locuri:

- **Oamenii care rămân.** Cineva care așteaptă cinci secunde ca să afle un preț de multe ori nu mai așteaptă. Nu îți scrie ca să-ți spună de ce; pur și simplu nu apare nicăieri în statistici.
- **Poziția în Google.** Core Web Vitals e unul dintre semnalele de clasare. Nu cel mai important — conținutul bun bate viteza — dar la conținut comparabil, decide.
- **Impresia.** Un site care se deschide instant comunică ceva despre cum lucrezi, înainte să fi citit cineva un cuvânt. Și unul care se târăște comunică la fel de clar altceva.

## Testează-ne și pe noi

Nu are rost să scriem toate astea și să nu ne supunem lor. Ia adresa site-ului ăstuia, pune-o în PageSpeed Insights, selectează „Mobil”.

Iar dacă găsești ceva care nu stă în picioare, scrie-ne. Preferăm să aflăm de la tine.
