

## Sitemap, SEO & verify-script bijwerken voor alle nieuwe pagina's

### Wat ontbreekt

De 3 nieuwste blogartikelen staan niet in de sitemap en niet in het verify-script:
- `/blog/software-thuisverpleging/`
- `/blog/patienten-thuisverpleegkundige/`
- `/blog/administratie-thuisverpleging/`

### Plan

**1. `public/sitemap.xml`** — 3 URL's toevoegen (lastmod 2026-03-22, priority 0.7)

**2. `scripts/verify-prerender.mjs`** — dezelfde 3 routes toevoegen aan de `routes`-array

**3. Automatiseren voor de toekomst** — een build-script (`scripts/generate-sitemap.mjs`) maken dat:
- De statische routes hardcoded bevat
- Alle blogartikelen uit `src/data/blogArticles.ts` dynamisch inleest
- `public/sitemap.xml` automatisch genereert met correcte lastmod-datums
- Wordt aangeroepen als `prebuild`-stap in `package.json`

Zo hoef je nooit meer handmatig de sitemap bij te werken wanneer er een nieuw artikel of pagina wordt toegevoegd.

