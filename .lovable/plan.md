

## Cross-linking audit: Home & Ons Aanbod naar Blog

### Huidige situatie

| Pagina/Sectie | Blog-link aanwezig? | Ontbrekende koppeling |
|---|---|---|
| **Home — MissionSection** | Ja: "zelfstandig worden" artikel | — |
| **Home — USPSection** | Nee | Geen enkele blog-link |
| **Home — HeroSection** | Nee | — (is ok, CTA-focus) |
| **Ons Aanbod — AdminSection** | Ja: "software" artikel | Mist link naar "administratie" artikel |
| **Ons Aanbod — InstroomSection** | Nee | Mist link naar "patienten" artikel |
| **Ons Aanbod — BegeleidingSection** | Nee | Mist link naar "zelfstandig worden" artikel |
| **Ons Aanbod — OpleidingSection** | Nee | Mist link naar "HBO5/graduaat" artikel |

### 5 blog-artikelen vs huidige links

1. `software-thuisverpleging` — gelinkt vanuit AdminSection ✅
2. `patienten-thuisverpleegkundige` — **nergens gelinkt** vanuit diensten/home
3. `administratie-thuisverpleging` — **nergens gelinkt** vanuit diensten/home
4. `zelfstandig-thuisverpleegkundige-worden` — gelinkt vanuit MissionSection ✅, maar niet vanuit BegeleidingSection
5. `hbo5-graduaat-basisverpleegkunde` — **nergens gelinkt** vanuit diensten/home

### Plan: maximale cross-linking

**1. InstroomSection** — Voeg onderaan een link toe naar het patienten-artikel:
> "Lees meer over patiënten vinden als thuisverpleegkundige →"

**2. AdminSection** — Voeg een extra link toe naar het administratie-artikel (naast de bestaande software-link):
> "Lees meer over administratie in de thuisverpleging →"

**3. BegeleidingSection** — Voeg in het "starter" blok een link toe naar het zelfstandig-worden-artikel:
> "Lees ons stappenplan: zelfstandig thuisverpleegkundige worden →"

**4. OpleidingSection** — Voeg in een van de blokken een link toe naar het HBO5-artikel:
> "Lees meer over de hervorming van HBO5 naar graduaat Basisverpleegkunde →"

**5. USPSection (homepage)** — Voeg aan elke kaart een subtiele "Lees meer"-link toe naar het meest relevante blogartikel:
- Administratie → `/blog/administratie-thuisverpleging/`
- Instroom → `/blog/patienten-thuisverpleegkundige/`
- Begeleiding → `/blog/zelfstandig-thuisverpleegkundige-worden/`
- Opleiding → `/blog/hbo5-graduaat-basisverpleegkunde/`

### Bestanden die wijzigen
- `src/components/diensten/InstroomSection.tsx`
- `src/components/diensten/AdminSection.tsx`
- `src/components/diensten/BegeleidingSection.tsx`
- `src/components/diensten/OpleidingSection.tsx`
- `src/components/home/USPSection.tsx`

