
**Probleem op `/zo-sluit-je-aan`**

In de huidige pagina staat de simulatie-zin praktisch twee keer:

1. **Stap 2 (Kennismakingsgesprek)** — "We maken een simulatie op maat, gebaseerd op jouw omzet en situatie. Zo zie je meteen je netto-impact, in duidelijke cijfers zonder verrassingen."
2. **Kosten-sectie (onderaan)** — "Tijdens het vrijblijvend kennismakingsgesprek maken we een simulatie op maat, gebaseerd op jouw omzet en situatie. Zo zie je meteen je netto-impact, in duidelijke cijfers zonder verrassingen."

Daarnaast komt "financiële impact" / "netto-impact" twee keer voor in de Kosten-sectie zelf (eerst in een blauw kader, dan opnieuw in de simulatie-paragraaf).

**Terminologie**: "netto-impact" → "financiële impact" (overal consistent).

---

**Voorgestelde nieuwe structuur (logischer + conversiegericht)**

Ik herorganiseer de pagina rond een duidelijke gebruikersreis: *wat krijg ik → wat kost het → hoe weet ik mijn cijfers → hoe start ik*. De simulatie wordt één centraal verhaal, niet verspreid.

**Wijzigingen per sectie:**

1. **Stap 2 (Kennismakingsgesprek)** — vereenvoudigen, simulatie-detail eruit halen:
   > "Tijdens een vrijblijvend persoonlijk gesprek bekijken we hoe Hezo jou het best kan ondersteunen. We bespreken jouw situatie, beantwoorden je vragen en lichten de samenwerking volledig toe."

2. **Kosten-sectie herstructureren** in een duidelijke flow met 3 onderdelen:
   
   **a) Wat je krijgt** (de 4 voordelen — blijven, ongewijzigd):
   - Transparante fee, gratis software, behoud van premies, extra patiënten.
   
   **b) Financiële impact (één blok, niet meer dubbel)**:
   > "Dankzij het behoud van je premies, de gratis software en de extra patiënten blijft de financiële impact beperkt. Bij sommige praktijken kan de samenwerking zelfs nagenoeg break-even zijn."
   
   **c) Persoonlijke simulatie (één keer, als logische volgende stap)**:
   > "Wil je weten wat dit concreet voor jou betekent? Tijdens het vrijblijvend kennismakingsgesprek maken we een simulatie op maat, gebaseerd op jouw omzet en situatie. Zo krijg je vooraf een duidelijk beeld van de financiële impact, in concrete cijfers zonder verrassingen."
   
   **d) Verwijzing naar volledig aanbod** (blijft, ongewijzigd).

3. **Term "netto-impact" → "financiële impact"** overal vervangen (ook elders in de file indien aanwezig).

4. **Contactpagina** kort checken of dezelfde dubbele formulering daar ook voorkomt; zo ja, idem opschonen.

---

**Bestanden**
- `src/pages/ZoSluitJeAan.tsx` — Stap 2 inkorten, Kosten-sectie herstructureren, terminologie aanpassen.
- `src/pages/Contact.tsx` — controle + eventueel kleine tekstcorrectie als dezelfde zin er staat.

**Geen** wijzigingen aan layout, kleuren, componenten of routing — puur tekstuele herstructurering binnen bestaande secties.
