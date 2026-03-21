

## Pre-rendering met je 6 extra eisen

### Wat we gaan doen

Build-time pre-rendering toevoegen zodat elke marketingpagina als volledige statische HTML wordt gegenereerd. Googlebot krijgt direct alle content, meta-tags en structured data — zonder JavaScript nodig te hebben.

---

### Stap 1: Installatie en Vite-configuratie

- `vite-plugin-prerender` + `puppeteer` als dev-dependencies toevoegen
- Plugin configureren in `vite.config.ts`

**Eis 1 — Alle indexeerbare marketingroutes prerenderen:**
```
/
/onze-diensten/
/zo-sluit-je-aan/
/opleidingen/
/vacatures/
/blog/
/blog/zelfstandig-thuisverpleegkundige-worden/
/blog/hbo5-graduaat-basisverpleegkunde/
/contact/
/privacy/
/cookies/
```
Niet-indexeerbare routes (`/webinar-admin`, `/webinar/:token`) worden overgeslagen.

**Eis 3 — Blogroutes automatisch genereren:**
De route-lijst voor de prerender-plugin wordt automatisch opgebouwd uit de `blogArticles` array in `Blog.tsx`. Wanneer je een nieuw blogartikel toevoegt, wordt het automatisch mee geprerenderd — geen manuele aanpassing nodig.

```typescript
// vite.config.ts
import { blogArticles } from './src/pages/Blog';

const staticRoutes = ['/', '/onze-diensten/', '/zo-sluit-je-aan/', ...];
const blogRoutes = blogArticles.map(a => `/blog/${a.id}/`);
const allRoutes = [...staticRoutes, ...blogRoutes];
```

---

### Stap 2: Render-event correct dispatchen

**Eis 2 — Event pas als pagina echt klaar is:**

In `main.tsx` dispatchen we het `render-event` pas nadat React volledig gehydrateerd is, met een `requestIdleCallback` (of fallback `setTimeout`) zodat Helmet ook klaar is met het injecteren van meta-tags:

```typescript
createRoot(document.getElementById("root")!).render(<App />);

const signal = () => document.dispatchEvent(new Event('render-event'));
if ('requestIdleCallback' in window) {
  requestIdleCallback(signal);
} else {
  setTimeout(signal, 200);
}
```

---

### Stap 3: Post-process en visuele controle

**Eis 4 — Visuele controle van gegenereerde HTML:**

Een post-build script (`scripts/verify-prerender.ts`) dat:
1. Elke gegenereerde `dist/.../index.html` opent
2. Controleert of de `<title>` tag gevuld is (niet de default fallback)
3. Controleert of `<meta name="description">` aanwezig en niet leeg is
4. Controleert of `<script type="application/ld+json">` (structured data) aanwezig is
5. Controleert of `<link rel="canonical">` aanwezig is
6. Controleert of de `<body>` meer dan 500 karakters aan tekstinhoud bevat (geen lege shell)
7. Print een rapport per route: PASS/FAIL met details

Dit script draait automatisch na de build in het CI-workflow.

---

### Stap 4: SEO-tags per pagina bevestigen

**Eis 5 — canonical, title, meta description en structured data per pagina:**

Elke pagina heeft al een `<SEO>` component met deze 4 elementen. Het verificatiescript uit stap 3 valideert dat ze daadwerkelijk in de geprerenderde HTML terechtkomen. Eventuele ontbrekende tags worden in het rapport gemeld.

---

### Stap 5: Deploy-workflow aanpassen

- De handmatige `mkdir` + `cp` stap in `.github/workflows/deploy.yml` wordt verwijderd — de prerender-plugin genereert de juiste directorystructuur automatisch
- Het verificatiescript wordt als extra build-stap toegevoegd
- De `sitemap.xml` wordt automatisch gekopieerd naar `dist/`

**Eis 6 — Sitemap opnieuw indienen:**

Na deploy moet je in Google Search Console handmatig de sitemap opnieuw indienen (`https://www.hezo.be/sitemap.xml`). Dit kan niet geautomatiseerd worden — ik herinner je eraan zodra de deploy klaar is.

---

### Bestanden die wijzigen

| Bestand | Wijziging |
|---|---|
| `package.json` | Dependencies toevoegen |
| `vite.config.ts` | Prerender-plugin configureren met auto-routes |
| `src/main.tsx` | Render-event dispatch toevoegen |
| `.github/workflows/deploy.yml` | Handmatige route-kopie verwijderen, verificatiescript toevoegen |
| `scripts/verify-prerender.ts` | Nieuw — controleert gegenereerde HTML |

### Wat niet wijzigt

- Alle pagina-componenten en hun SEO-tags blijven ongewijzigd
- De `blogArticles` array blijft de single source of truth
- Visuele weergave en interactiviteit blijven identiek

