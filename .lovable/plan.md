

## Opleidingen: chronologisch sorteren + zoekbalk

### Huidige situatie
De 6 opleidingen staan hardcoded als losse `<Card>` componenten in `Opleidingen.tsx`. Ze zijn niet gesorteerd op datum en er is geen zoekfunctionaliteit.

Opleidingen met datums:
1. Poortkatheters — 23 maart 2026
2. BLS/AED — 11 mei 2026
3. Palliatieve Zorg: zorgplanning — 21 april 2026
4. Katz schaal — 27 april 2026
5. Palliatieve Zorg: pijn — 20 mei 2026
6. Verzekeringsinstellingen — 21 mei 2026

Chronologische volgorde: 1 → 3 → 4 → 2 → 5 → 6

### Plan

**1. Opleidingsdata naar een array extraheren**
- Maak een `opleidingen` array met objecten (titel, datum als `Date`, tijd, locatie, maxDeelnemers, beschrijving, lesgever, type, badges, etc.)
- Sorteer op datum (vroegste eerst)

**2. Zoekbalk toevoegen**
- `useState` voor zoekterm
- Input veld met zoek-icoon boven de lijst, zoekt op titel, beschrijving en lesgever
- Filter de gesorteerde array op basis van de zoekterm
- Toon "Geen opleidingen gevonden" als er geen resultaten zijn

**3. Kaarten dynamisch renderen**
- `.map()` over de gefilterde + gesorteerde array
- Hergebruik exact dezelfde Card-structuur als nu

### Bestanden die wijzigen
- `src/pages/Opleidingen.tsx` — refactor naar data-driven + zoekbalk

