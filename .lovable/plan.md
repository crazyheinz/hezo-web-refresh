

## Wat ik ga doen

### 1. Slotblok inkomensartikel softer maken (`BlogArticle.tsx`)
- `cta: null` voor het inkomensartikel → "Benieuwd wat jij concreet kan verdienen?" blok + beide knoppen volledig weg.
- Laatste alinea vervangen door:
  > Daarnaast kiezen sommige verpleegkundigen ervoor om samen te werken, bijvoorbeeld om ondersteuning te krijgen bij patiënteninstroom, administratie of software, zodat ze efficiënter kunnen werken en zich meer kunnen focussen op zorg.
  >
  > Ontdek hoe dat concreet kan werken via [Hezo](/wat-we-doen/).

### 2. Bloglandingspagina (`Blog.tsx`) verbeteren
- **Hero-thumbnail per kaart**: bestaande `blog-hero-*.png` hergebruiken. Map artikel-ID → afbeelding. Bovenaan elke `Card` in `aspect-[4/3]` container met `object-cover`, lichte achtergrond (`bg-light-blue/5`), subtiele hover-zoom (`group-hover:scale-105`).
- **Featured artikel bovenaan**: eerste artikel in de huidige array groter renderen (2-koloms full-width: afbeelding links, titel/excerpt/CTA rechts). Overige 7 in 3-koloms grid eronder.
- **UX/SEO-tweaks**: `loading="lazy"`, `alt`=titel, hover border-kleur `border-secondary/30`.
- **Geen sortering** toevoegen — volgorde blijft zoals in `blogArticles` array.

### Bestanden
- `src/pages/BlogArticle.tsx`
- `src/pages/Blog.tsx`

