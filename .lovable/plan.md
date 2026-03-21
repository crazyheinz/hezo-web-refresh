

## Hero-afbeelding vervangen op de homepage

De huidige foto (`src/assets/home-nursing.jpg`) wordt vervangen door de geüploade illustratie. De afbeelding krijgt een `max-width` zodat ze niet gigantisch wordt op brede schermen.

### Wijzigingen

1. **Afbeelding kopiëren** naar `src/assets/home-hero-illustration.png`

2. **`src/components/home/HeroSection.tsx`** aanpassen:
   - Import wijzigen naar de nieuwe afbeelding
   - `max-w-lg` (of `max-w-xl`) toevoegen aan de `<img>` zodat de illustratie op ultrawide schermen niet uit proportie loopt
   - Alt-tekst aanpassen naar iets passends bij de illustratie

