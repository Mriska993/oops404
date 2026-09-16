---
titlu: Politica de confidențialitate
descriere: Ce date ajung la noi când intri pe oops404.ro, de ce, cât le ținem și cum ceri să dispară. Fără limbaj de umplutură.
meniu: Confidențialitate
ordine: 2
---

Ultima actualizare: **{{actualizat}}**

Documentul ăsta explică ce se întâmplă cu datele tale când intri pe {{domeniu}}. L-am scris ca să fie citit, nu ca să bifeze o casetă: dacă ceva sună vag, scrie-ne și îl rescriem mai clar.

Pe scurt, înainte de detalii: **site-ul ăsta nu are conturi, nu are coș de cumpărături și nu are o bază de date cu vizitatori.** Formularul de contact nu trimite nimic către un server de-al nostru — deschide aplicația ta de email cu mesajul deja completat, iar tu decizi dacă apeși „trimite”. Serverul nu ține nici măcar un jurnal al vizitelor — e oprit din configurație. Singurul lucru care se adună automat, și doar **dacă accepți**, sunt statisticile Google Analytics.

## Cine răspunde de datele tale

{{^inregistrata}}
{{brand}} este, la data acestui document, un proiect al celor doi oameni care îl construiesc — nu o persoană juridică înregistrată.

Până la înființarea firmei, operatorii datelor prelucrate prin acest site sunt, personal, **{{operatori}}**, care pot fi contactați la adresa de mai jos. Spunem asta explicit pentru că legea cere ca cineva cu nume să răspundă de datele tale; „echipa {{brand}}” n-ar fi un răspuns.

Când {{brand}} devine societate înregistrată, actualizăm această secțiune cu denumirea, sediul și codul de identificare fiscală, iar data de la începutul paginii se schimbă.
{{/inregistrata}}
{{#inregistrata}}
Operatorul datelor este **{{denumire}}**, cu sediul în {{sediu}}, înregistrată la Registrul Comerțului sub nr. {{regCom}}, cod unic de înregistrare {{cui}}.
{{/inregistrata}}

Pentru orice întrebare legată de datele tale personale sau pentru oricare dintre drepturile de mai jos, scrie la **{{emailConfidentialitate}}**. Răspundem în cel mult 30 de zile, de obicei în aceeași zi.

Nu avem un responsabil cu protecția datelor (DPO) desemnat și nici nu suntem obligați să avem: nu prelucrăm date la scară largă și nu facem monitorizare sistematică.

## Ce date se adună și de ce

### Logurile serverului

Majoritatea serverelor web notează fiecare cerere: adresa IP, momentul, pagina cerută, browserul. **Al nostru nu.** Jurnalul de acces e oprit din configurație, așa că vizitele obișnuite nu lasă nicio urmă pe server.

Rămâne activ doar jurnalul de erori. Acolo ajunge ceva abia când chiar se strică ceva — o pagină care nu se poate livra, o cerere malformată — iar înregistrarea poate include adresa IP de la care a venit cererea.

- **De ce:** ca să vedem ce s-a rupt și să putem repara. E singurul motiv.
- **Temeiul legal:** interesul nostru legitim de a avea un site care funcționează — art. 6 alin. (1) lit. (f) GDPR.
- **Cât îl ținem:** exact cât îl ține rotirea automată a serverului — înregistrările vechi se suprascriu singure. Nu îl arhivăm, nu îl copiem și nu îl scoatem de pe server.
- **Nu îl folosim** ca să construim profiluri și nu îl legăm de altceva. Nici n-am avea ce: nu există un jurnal de vizite cu care să-l punem cap la cap.

### Formularul de contact și butoanele de WhatsApp

Formularul din pagina de contact merită explicat exact, pentru că funcționează altfel decât te-ai aștepta.

Ce scrii în el — numele, adresa de email sau telefonul, bugetul aproximativ și descrierea proiectului — **rămâne în browserul tău**. Când apeși „Trimite pe email”, site-ul deschide aplicația ta de email cu un mesaj precompletat. Când apeși „Sau pe WhatsApp”, deschide WhatsApp cu același text. În ambele cazuri, tu ești cel care trimite mesajul, din contul tău.

Asta înseamnă că:

- nu există un server al nostru care primește ce ai tastat;
- dacă te răzgândești înainte să apeși „trimite” în aplicația ta, nu a ajuns nimic la noi;
- datele ajung la noi abia în momentul în care primim efectiv emailul sau mesajul.

Din clipa aia, le prelucrăm ca să-ți răspundem și, dacă mergem mai departe, ca să pregătim o ofertă:

- **Temeiul legal:** demersuri la cererea ta înainte de încheierea unui contract — art. 6 alin. (1) lit. (b) GDPR.
- **Cât le ținem:** corespondența legată de un proiect care nu s-a concretizat se șterge după 12 luni. Dacă ajungem să lucrăm împreună, ținem ce ne cere legea contabilă și fiscală pentru documentele aferente.
- **Cu cine ajung:** cu furnizorul de email, respectiv cu WhatsApp (Meta), pentru că prin ei circulă mesajul. Fiecare are propria politică de confidențialitate, pe care nu o controlăm.

### Estimatorul de buget

Calculatorul de preț lucrează în întregime în browserul tău. Nu trimite nimic nicăieri și nu reține ce ai bifat. Dacă închizi pagina, dispare.

### Google Analytics

{{#analytics}}
Dacă îți dai acordul din bannerul de cookie-uri, încărcăm Google Analytics 4 ca să vedem câți oameni intră pe site, ce pagini citesc și de unde vin. Ne interesează cifre agregate — care articol de blog e citit, nu cine îl citește.

- **Ce se adună:** un identificator aleatoriu al browserului tău, paginile vizitate, durata, tipul de dispozitiv, o localizare aproximativă dedusă din IP și sursa vizitei.
- **Temeiul legal:** consimțământul tău — art. 6 alin. (1) lit. (a) GDPR. Până la accept, scriptul nu se încarcă deloc; nu e doar „dezactivat”, pur și simplu nu ajunge în pagină.
- **Cât ține:** consimțământul îl ținem minte 6 luni, apoi te întrebăm din nou. Datele din Analytics se păstrează conform setării din contul nostru Google.
- **Cum te răzgândești:** butonul „Setări cookie-uri” din subsolul oricărei pagini redeschide bannerul. Retragerea e la fel de simplă ca acceptul.

Detaliile despre fiecare cookie sunt în [politica de cookie-uri]({{site}}/cookies).
{{/analytics}}
{{^analytics}}
Momentan nu avem instalat niciun instrument de statistici. Dacă adăugăm unul, apare mai întâi un banner care îți cere acordul, iar secțiunea asta se completează înainte ca scriptul să ruleze vreodată.
{{/analytics}}

### Fonturile

Site-ul folosește fonturile Bodoni Moda și Syne, **găzduite pe serverul nostru**. Nu se încarcă de la Google și de nicăieri din afară.

Detaliul ăsta merită explicat, pentru că foarte multe site-uri îl ratează: un font luat de pe serverele Google înseamnă că adresa ta IP ajunge la Google la fiecare pagină, înainte de orice banner și de orice acord, doar ca să se vadă literele cum trebuie. E o transmitere reală de date personale către un terț. Noi am descărcat fișierele o dată și le servim de la noi, deci **terțul nu mai există**.

## Cui îi dăm datele mai departe

Nu vindem date. Nu le dăm nimănui pentru marketing. Ajung la alții doar atât cât e nevoie ca site-ul să existe:

| Cine | Pentru ce | Unde |
| --- | --- | --- |
| {{hostingFurnizor}} | găzduirea site-ului și jurnalul de erori | {{hostingTara}} |
| Google Ireland Ltd. | **doar dacă accepți** statisticile: Google Analytics | UE, cu transferuri în SUA |
| Meta Platforms Ireland Ltd. | doar dacă ne scrii pe WhatsApp | UE, cu transferuri în SUA |

Putem fi obligați să dăm date și autorităților, dacă o cer în condițiile legii. N-am avut până acum o astfel de cerere.

### Transferuri în afara Uniunii Europene

Google și Meta procesează date și în Statele Unite. Transferul se face în baza Cadrului transatlantic privind confidențialitatea datelor (EU–US Data Privacy Framework), la care ambele sunt certificate, și a clauzelor contractuale standard aprobate de Comisia Europeană.

## Ce poți cere

Legea îți dă niște drepturi concrete asupra datelor tale, iar noi nu îți cerem motive ca să le exerciți:

- **Acces** — să-ți spunem ce date avem despre tine și să-ți dăm o copie.
- **Rectificare** — să corectăm ce e greșit sau incomplet.
- **Ștergere** — să scoatem datele, când nu mai avem un motiv legal să le ținem.
- **Restricționare** — să le ținem, dar să nu le folosim, cât timp lămurim ceva.
- **Portabilitate** — să primești datele într-un format pe care îl poți duce altundeva.
- **Opoziție** — să te opui prelucrărilor bazate pe interesul nostru legitim.
- **Retragerea consimțământului** — oricând, la fel de ușor cum l-ai dat. Retragerea nu afectează ce s-a întâmplat legal înainte de ea.

Scrie la **{{emailConfidentialitate}}** și rezolvăm. Nu percepem niciun cost.

Dacă ți se pare că am greșit și nu ajungem la o înțelegere, te poți plânge la **Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal** (ANSPDCP), B-dul G-ral. Gheorghe Magheru 28-30, București, [dataprotection.ro](https://www.dataprotection.ro). Ne-ar plăcea să încerci întâi cu noi.

## Copii

Site-ul se adresează persoanelor și firmelor care caută servicii de dezvoltare web. Nu ne adresăm copiilor sub 16 ani și nu colectăm cu bună știință date de la ei.

## Cum ținem datele în siguranță

Site-ul se încarcă exclusiv prin HTTPS. Serverul e actualizat și accesul la el e limitat la persoanele care îl administrează. Nu ținem o bază de date cu vizitatori și nici un jurnal al vizitelor, ceea ce e cea mai bună protecție posibilă: **ce nu există nu poate fi furat.**

Niciun sistem nu e perfect. Dacă totuși se întâmplă o breșă care îți poate afecta drepturile, anunțăm autoritatea în 72 de ore și te anunțăm și pe tine, direct, dacă riscul e ridicat.

## Decizii automate

Nu luăm decizii automate cu efecte asupra ta și nu facem profilare.

## Când se schimbă ceva

Dacă modificăm politica, schimbăm data de la începutul paginii. La modificări importante — un instrument nou, un alt temei legal — anunțăm vizibil pe site înainte să intre în vigoare. Versiunile vechi rămân în istoricul repository-ului, deci se poate verifica ce scria înainte.
