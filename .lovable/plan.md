
# Fix: Scroll naar bovenkant bij navigatie

## Probleem
Wanneer je naar de webinar pagina navigeert via een magic link, wordt de pagina niet naar boven gescrold. Hierdoor is de titel ("test") half afgesneden en moet je eerst naar beneden scrollen om de volledige content te zien.

## Oorzaak
React Router behoudt standaard de scroll positie bij navigatie. Er is momenteel geen component die de pagina automatisch naar boven scrollt wanneer je naar een nieuwe route navigeert.

## Oplossing
Een `ScrollToTop` component toevoegen die bij elke route-wijziging automatisch naar boven scrollt.

---

## Technische Details

### Stap 1: ScrollToTop component aanmaken
Een nieuw bestand `src/components/ScrollToTop.tsx` met de volgende functionaliteit:
- Luistert naar wijzigingen in de URL pathname via `useLocation()` van React Router
- Scrollt automatisch naar `top: 0` wanneer de route verandert
- Gebruikt `behavior: "instant"` voor directe scroll (geen animatie)

### Stap 2: Component toevoegen aan App.tsx
De `ScrollToTop` component wordt toegevoegd direct binnen de `BrowserRouter`, zodat het bij elke route-wijziging wordt getriggerd. Dit lost het probleem op voor alle pagina's in de applicatie, niet alleen de webinar pagina.
