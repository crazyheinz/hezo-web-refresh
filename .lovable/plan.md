## Doel

De inkomensimulator herwerken zodat hij realistisch, geloofwaardig en begeleidend aanvoelt — geen "verdien-veel-geld" calculator, maar een hulpmiddel dat richting een vrijblijvend gesprek leidt.

## Wijzigingen in `src/pages/InkomenSimulator.tsx`

### 1. UI vereenvoudigen
- Volledige sectie "Zorgmix" met 3 sliders verwijderen.
- Achterliggend vast gebruiken: 65% basiszorg / hygiëne, 35% technische zorg (zowel voor- als namiddag).
- State `mixBasis`, `mixToilet`, `mixTech` schrappen.

### 2. Realistischere RIZIV-tarieven
- Tarieven herijken zodat 5 dagen × (15 vm + 20 nm) ≈ €8.000–€8.500 bruto/maand:
  - Basiszorg/hygiëne: ~€18 per bezoek
  - Technische zorg: ~€30 per bezoek
  - Gemiddelde komt zo op ~€22 per bezoek.
- Toilet/ADL als aparte categorie laten vallen (zit in "basiszorg").

### 3. Resultaat minder absoluut presenteren
- Grote hero-kaart toont voortaan **Bruto omzet RIZIV / maand** (i.p.v. netto).
- Netto wordt secundair getoond als "Indicatief beschikbaar inkomen" met expliciete waarschuwing dat dit sterk verschilt per situatie (eenmanszaak vs vennootschap, fiscale situatie, kosten, sociale bijdragen, persoonlijke optimalisatie).
- Label "Netto / maand" vervangen door "Indicatief beschikbaar inkomen".

### 4. Eenmanszaak vs vennootschap
- Subtiel infoblok onder het resultaat: korte uitleg dat voltijds werken via een vennootschap fiscaal vaak interessanter wordt, en dat sociale bijdragen/belastingen verschillen per structuur. Geen detail over dividenden/VVPRbis.
- Link naar contact voor advies.

### 5. Praktijkcommissie herpositioneren
- Hernoemen naar **"Bijdrage aan de praktijk"** (label) met ondertekst: "voor ondersteuning, administratie, software, patiënteninstroom, begeleiding, opleidingen en praktijkwerking".
- Slider-bereik: 0–20% (i.p.v. 0–15%).
- Helptekst expliciet maken dat dit géén Hezo-specifiek bedrag is en dat het sterk verschilt per praktijk.

### 6. Vaste kosten herijken
- Auto: €450 → **€700** (brandstof, onderhoud, verzekering, afschrijving — brandstof alleen al ±€500 bij niet-elektrische wagen).
- Telecom: €35 → **€90**.
- Materiaal: behouden (€120).
- Bijscholing: behouden (€25).
- RIZIV-premies: huidige (telematica €800 + bijscholing €500) → totaal **€1.200/jaar = €100/maand**, weergegeven als één regel "RIZIV-premies (telematica + bijscholing)".

### 7. Minder schijnprecisie
- Sliders met grovere stappen waar logisch (commissie in stappen van 1 blijft, maar geen halve procenten).
- Netto-cijfer afronden op €50 i.p.v. €1, en presenteren als "ongeveer €x.xxx".
- Tekst: "indicatieve simulatie" prominenter.

### 8. CTA-blok herwerken
- Verwijderen: "Realistisch in jouw regio?"-blok.
- Vervangen door een advieskaart: **"Vragen bij deze simulatie?"** met tekst over hulp bij opstart, software, administratie en patiënteninstroom, en knop "Plan een vrijblijvend gesprek".
- Tweede blok (Startersgids) behouden, lichtjes herformuleren naar begeleidend i.p.v. salesy.
- Regio mag subtiel vermeld worden in begeleidende tekst, niet als hoofdboodschap.

### 9. Disclaimer
- Disclaimer-blok zichtbaarder maken: bredere kaart met icoon (Info), iets meer contrast (border + muted achtergrond), en uitgebreidere opsomming van factoren die het resultaat beïnvloeden: regio, patiëntenmix, verplaatsingen, fiscale structuur, praktijk, werkritme, anciënniteit, kosten, sociale bijdragen.
- Boven het resultaat ook een korte badge: "Vereenvoudigde simulatie — geen boekhoudkundig advies".

### 10. SEO / meta
- Title en description licht aanpassen naar minder "verdien"-toon: "Inkomen zelfstandige thuisverpleegkundige inschatten — Hezo".

## Buiten scope
- Geen wijzigingen aan andere pagina's (Startersgids, blog, vacatures).
- Geen backend-aanpassingen.
- Geen nieuwe routes.

## Bestand dat wijzigt
- `src/pages/InkomenSimulator.tsx` (enige bestand)
