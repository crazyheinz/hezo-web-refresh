

## Plan: Homepage herstructureren

### Nieuwe paginastructuur
Hero → USPSection ("Wat Hezo voor jou kan betekenen" + bullets + CTA) → MissionSection ("Je blijft volledig zelfstandig" + "Voor wie is Hezo?" met 4 kaarten) → Testimonials

### Wijzigingen

**1. `src/components/home/USPSection.tsx`** — Volledig herschrijven
- Verwijder de 4 dienst-kaarten (die staan al op de dienstenpagina)
- Nieuwe inhoud:
  - H2: "Wat Hezo voor jou kan betekenen"
  - 3 alinea's introductietekst (zoals voorgesteld)
  - "Met Hezo kan je rekenen op:" met 5 checkmark-bullets
  - CTA-knop "Plan een kennismakingsgesprek" → `/contact/`
- Framer Motion animaties behouden (fade-up, stagger)

**2. `src/components/home/MissionSection.tsx`** — Herschrijven
- Verwijder de 3 korte kaarten en de twee inleidende alinea's (herhaling van USPSection)
- Behoud het "Je blijft volledig zelfstandig" blok met 2x2 grid
- Daaronder nieuw: "Voor wie is Hezo?" met subtitel + 4 kaarten in 2x2 grid:
  1. Zelfstandig thuisverpleegkundige (Stethoscope icoon)
  2. Bijberoep (Clock icoon)
  3. Starter (Sprout icoon)
  4. Praktijk uitbreiden (Building2 icoon)
- Elke kaart bevat de volledige tekst zoals voorgesteld (niet ingekort)
- Kaarten met hover-animatie, elk een eigen kleur

**3. `src/pages/Home.tsx`** — Volgorde aanpassen
- Wijzig naar: Hero → USPSection → MissionSection → Testimonials

