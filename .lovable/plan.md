## Nieuwe vacature toevoegen

Een nieuwe vacature "Zelfstandig thuisverpleegkundige – regio Antwerpen Zuid - Berchem" toevoegen aan `src/pages/Vacatures.tsx`, met dezelfde structuur en opmaak als de bestaande vacatures.

### Wijzigingen

**1. Nieuwe job entry in `allJobs` array (`src/pages/Vacatures.tsx`)**

Toevoegen als eerste item (zodat het bovenaan verschijnt), met:
- `id`: `"zelfstandig-antwerpen-zuid-berchem"`
- `title`: `"Zelfstandig thuisverpleegkundige - Antwerpen Zuid - Berchem"` (locatie achter " - " zodat de bestaande MapPin-locatie-extractie werkt)
- `tagline`: `"Zorg met impact. Werk met vrijheid. Groei met ondersteuning."`
- `active`: `true`
- `description`: introtekst (de twee paragrafen na de tagline, samengevoegd)
- `responsibilities`: de 8 bullets uit sectie 1.1 (Hygiënische zorg, medicatie, wondzorg, sondes/katheters/infusen, bloedafnames, parameters, pijnobservatie, luisteren, respect voor autonomie)
- `profile`: de 6 bullets uit sectie 1.2 (diploma, RIZIV, eigen vervoer, zelfstandig werken, patiëntgericht, samenwerken)
- `offer`: alle bullets uit sectie 1.3, gegroepeerd onder hun sub-koppen via cursieve sectietitels in de tekst, bv:
  - "Werkbaar evenwicht: duidelijke planning en voorspelbare rondes"
  - "Werkbaar evenwicht: beperkte avond- en weekendbelasting"
  - etc.
  
  (De bestaande structuur ondersteunt geen sub-koppen, dus de sub-rubrieken "Werkbaar evenwicht", "Sterke ondersteuning", "Transparante en correcte vergoeding met inkomensgarantie", "Een aangename werkomgeving die meedenkt" worden als prefix in elke bullet meegenomen. Alternatief: pak ze als platte lijst zonder prefixen — bevestig keuze indien nodig.)

**2. JobPosting structured data (regels 305-329)**

De ternary voor `addressLocality` uitbreiden zodat de nieuwe id `"zelfstandig-antwerpen-zuid-berchem"` `"Antwerpen Zuid - Berchem"` als locality krijgt. Geen verdere SEO-wijzigingen nodig (FAQ blijft ongewijzigd).

### Geen wijzigingen aan

- Het sollicitatieformulier (werkt generiek op `selectedJob`).
- Sitemap (vacatures-detailpagina's bestaan niet als aparte routes).
- Edge functions.

### Open vraag

Wens je de "Wat mag je verwachten?"-bullets met de sub-kop prefixen (bv. "Werkbaar evenwicht: …") of als één platte lijst zonder prefixen?
