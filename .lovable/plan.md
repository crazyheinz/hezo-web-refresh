

## Wat ik ga doen

**1. Em-dashes verwijderen uit het inkomensartikel**
In `BlogArticle.tsx` staan in het inkomen-artikel een paar lange streepjes ("—"). Vervangen door komma's of haakjes. Concreet:
- "bijvoorbeeld rond opstart, administratie of sociale bijdragen — dan kan je..." → vervangen door komma
- Andere "—" controleren in alle artikels en vervangen

**2. Tekst van het inkomensartikel minder versnipperd maken**
Het artikel heeft nu veel hele korte alinea's van 1 zin (bv. "Je bruto omzet is niet je uiteindelijke inkomen." als losse `<p>`). Dat oogt slordig en ChatGPT-achtig. Ik ga:
- Korte losse zinnen samenvoegen tot vloeiende alinea's van 2-4 zinnen
- "Belangrijk:" + bullets samenvoegen tot één duidelijk blok
- Bullets behouden waar ze écht een lijst zijn (kosten, premies, factoren), inleidende zinnen integreren in de vorige paragraaf
- Het bruto-omzet bedrag (€4.000-€8.000) in dezelfde paragraaf zetten als de uitleg, niet als losse regel

**3. Hero-afbeelding inkomensartikel opnieuw genereren in juiste stijl**
De huidige `blog-hero-inkomen.png` (42 KB, te klein/simpel) past niet bij de stijl van de referentie (image-153/154: Storyset/Amico vector — persoon met overdreven proporties, scattered geometric shapes in mosterdgeel/koraal/donkerblauw/lichtblauw, zachte beige achtergrond, plant, bureau-context).
- Nieuwe afbeelding genereren via Nano Banana Pro met expliciete prompt die matcht: vrouwelijke verpleegkundige aan bureau met laptop + rekenmachine/munten, scattered shapes (sterren, driehoeken, cirkels) in palette navy #1A2A52 / lichtblauw #326AAA / mosterdgeel / koraal / teal, beige achtergrond #F5EFE0, witte sneakers, overdreven proporties.
- Bestand vervangen op `src/assets/blog-hero-inkomen.png`

**4. Consistente afbeeldingsgrootte over álle blogartikels**
Alle 8 hero-afbeeldingen worden nu door `BlogHeroImage` in een `max-w-md aspect-[4/3]` container met `object-contain` gerenderd. Het probleem (zie screenshot 2: "Software" artikel toont een véél kleinere figuur dan inkomen) is dat `object-contain` de illustratie schaalt naar de bounding box, maar omdat sommige PNG's véél witruimte rond de figuur hebben en andere bijna volledig gevuld zijn, ziet de figuur er kleiner uit.

Oplossing in `BlogHeroImage.tsx`:
- Container vergroten naar `max-w-lg` zodat alle hero's prominenter zijn
- `object-contain` vervangen door `object-cover` met `aspect-[5/4]` — vult de container consistent op, sommige witruimte wordt bijgesneden, alle illustraties krijgen visueel dezelfde "gewicht"
- Of (alternatief, veiliger): `object-contain` houden maar achteraf de canvas-witruimte van de oudere PNG's croppen zodat de figuur de volle ruimte vult

Ik kies voor de **veiligere route**: `BlogHeroImage` houden zoals nu (max-w-md, contain) maar de oudere afbeeldingen die te véél witruimte hebben (software, balans, etc.) bijsnijden zodat de figuur in alle hero's even groot oogt. De nieuwe inkomen-afbeelding meteen goed afgekaderd genereren.

**5. Verificatie**
- Alle 8 blog hero's naast elkaar bekijken (QA-screenshot per artikel)
- Inkomensartikel doorlezen: vloeiende paragrafen, geen em-dashes, geen versnipperde 1-zin blokken

## Bestanden die wijzigen
- `src/pages/BlogArticle.tsx` — tekst herschrijven inkomen-artikel, em-dashes weg
- `src/assets/blog-hero-inkomen.png` — opnieuw genereren in juiste stijl
- Mogelijk croppen: `blog-hero-software.png`, `blog-hero-balans.png`, `blog-hero-meer-dan-spuitje.png` (degene met veel witruimte)
- Eventueel `BlogHeroImage.tsx` als de container moet groeien voor leesbaarheid

