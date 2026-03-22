

## Blog-artikelen breder, dynamischer en met inhoudsopgave

### Probleem
- Blogartikelen gebruiken `max-w-3xl` (~768px) terwijl Home en Ons Aanbod `max-w-5xl`/`max-w-7xl` gebruiken — te smal
- Artikelen zijn lange tekstvlakken zonder visuele afwisseling
- Geen "Op deze pagina"-blok (inhoudsopgave) zoals Helan dat doet voor lange artikelen

### Plan

#### 1. Breedte vergroten
Verander de article container van `max-w-3xl` naar `max-w-4xl` zodat het beter aansluit bij de rest van de site, maar nog steeds leesbaar blijft voor lange tekst.

#### 2. Inhoudsopgave ("Op deze pagina") toevoegen
Per artikel automatisch een inhoudsopgave genereren op basis van de h2-koppen. Dit wordt een gestileerd blok (lichtgrijze achtergrond, afgeronde hoeken) bovenaan het artikel, na de header, met anchor-links naar elke sectie. Vergelijkbaar met het Helan-voorbeeld.

Technisch:
- Aan `articleContent` een `headings: string[]`-array toevoegen per artikel
- Een `TableOfContents`-component renderen die anchor-links toont
- De h2's in de content voorzien van id-attributen

#### 3. Illustraties toevoegen per sectie
Per artikel op strategische plekken illustraties of decoratieve elementen invoegen om de wand van tekst te doorbreken:
- Een hero-achtige illustratie bovenaan elk artikel (in de stijl van de home-hero met floating animatie)
- Tussendoor gekleurde highlight-blokken (bijv. tips, kernpunten) met een accent-achtergrond en icoon

Technisch:
- `articleContent` uitbreiden met een optioneel `heroImage`-veld
- Highlight-blokken als apart component met een icoon + gekleurde achtergrond
- Hergebruik van de bestaande brand-kleuren (secondary/10, green/10, coral/10)

#### 4. Bestanden die wijzigen
- `src/pages/BlogArticle.tsx` — layout breder, inhoudsopgave-component, hero-afbeelding, id's op h2-koppen
- Eventueel nieuwe illustraties toevoegen aan `src/assets/` (of bestaande hergebruiken)

