

# Privacy pagina aanmaken

## Wat wordt er gemaakt

Een professioneel opgemaakte **Privacy pagina** op `/privacy` met:
- Het **Hezo logo** bovenaan
- De volledige tekst exact zoals aangeleverd
- Dezelfde stijl als de rest van de website
- Een **"Download als PDF" knop** zodat bezoekers de privacyverklaring kunnen downloaden (via de browser print-to-PDF functie)

## Over de PDF

Een echte PDF genereren vereist extra libraries. In plaats daarvan voeg ik een slimme **"Download als PDF" knop** toe die de browser print-functie opent met geoptimaliseerde print-styling. Dit geeft een nette PDF zonder extra dependencies.

## Technische aanpak

### Nieuw bestand: `src/pages/Privacy.tsx`
- Hero-sectie met Hezo logo en titel "Privacyverklaring"
- Alle 10 secties netjes opgemaakt met duidelijke koppen en lijsten
- Print-optimized CSS zodat de PDF er professioneel uitziet (logo zichtbaar, geen navigatie/footer)
- "Download als PDF" knop bovenaan
- SEO-component met `noIndex: true` (juridische pagina's hoeven niet in Google)

### Aangepast bestand: `src/App.tsx`
- Import van Privacy component
- Nieuwe route `/privacy` toevoegen

### Stijl
- Consistente typografie en spacing
- Secties gescheiden met subtiele lijnen
- Lijsten met bullet points voor leesbaarheid
- Print-stylesheet verbergt navigatie en footer, toont enkel de inhoud met logo
