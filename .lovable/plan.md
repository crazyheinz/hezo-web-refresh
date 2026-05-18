# Afwerking SEO-groeiplan Hezo

## 1. Database migratie goedkeuren
De `lead_magnets` tabel migratie staat klaar — ik vraag goedkeuring zodra we starten zodat het lead-formulier op `/startersgids/` werkt.

## 2. Cornerstone blog uitbreiden
Artikel `zelfstandig-thuisverpleegkundige-worden` uitbreiden naar ~2.500 woorden:
- RIZIV-conventie + nomenclatuur basics
- Sociaal statuut (Xerius/Acerta), btw-vrijstelling medische prestaties
- Stappenplan opstart (KBO, RIZIV-nummer, verzekering BA, software)
- Inkomen & kosten realistisch (link naar `/inkomen-simulator/`)
- FAQ-blok (8 vragen) met `FAQPage` JSON-LD schema
- Sticky CTA naar startersgids + simulator
- Bestand: `src/data/blogArticles.ts` (content) + check `src/pages/BlogArticle.tsx` voor FAQ schema injectie

## 3. Vacatures JobPosting verrijken
In `src/pages/Vacatures.tsx` per vacature de bestaande JSON-LD uitbreiden met:
- `identifier` (Hezo + vacature slug)
- `datePosted` + `validThrough` (90 dagen)
- `baseSalary` (MonetaryAmount, range per regio)
- `qualifications`, `responsibilities`, `jobBenefits`
- `directApply: true` met anchor naar sollicitatieformulier
- `employmentType: ["FULL_TIME","PART_TIME","CONTRACTOR"]`

## 4. Navigatie & interne links
- Header: link naar `/inkomen-simulator/` onder "Voor zelfstandigen" (of CTA-knop)
- Footer: links naar `/startersgids/`, `/inkomen-simulator/`, `/thuisverpleging/gent/`, `/thuisverpleging/antwerpen/`
- Op homepage een subtiele CTA-strook naar simulator
- Op `/wat-we-doen/` en cornerstone blog: cross-links naar regio-pagina's

## 5. Sitemap, prerender & robots
- Verifiëren dat `scripts/generate-sitemap.mjs` Gent + Antwerpen + simulator + startersgids bevat
- `src/prerender.tsx` lijst checken
- `public/sitemap.xml` regenereren

## 6. Edge function deploy + visuele check
- `request-lead-magnet` deployen
- Preview check: startersgids formulier, simulator berekening, regio pagina's Gent & Antwerpen, vacature JSON-LD via view-source

## Technische details
- FAQ schema: `@type: FAQPage` met `mainEntity` array van `Question`/`Answer`
- Vacatures baseSalary: `{ "@type": "MonetaryAmount", "currency": "EUR", "value": { "@type": "QuantitativeValue", "minValue": 3500, "maxValue": 5500, "unitText": "MONTH" } }`
- Geen wijziging aan bestaande tekst-content buiten cornerstone artikel (memory: literal preservation)
- Alle nieuwe content in NL, "thuisverpleegkundigen", geen emojis/em-dashes
