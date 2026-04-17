
Kleine tekstaanpassing op `/onze-diensten` (BegeleidingSection).

**Probleem**: De grote sectietitel is al "Begeleiding bij je start als zelfstandig verpleegkundige". De kleinere kaarttitel eronder heet "Begeleiding bij de start" — dat is correct maar voelt als een herhaling van dezelfde formulering.

**Mijn advies**: niet exact dezelfde lange titel hergebruiken in de subkaart, want dan staat tweemaal letterlijk dezelfde zin op één scherm. Beter: maak de kaarttitel iets specifieker zodat hij de **inhoud van de kaart** dekt (administratieve opstart, Xerius, software, checklists).

**Voorgestelde wijziging in `src/components/diensten/BegeleidingSection.tsx`**:
- Kaarttitel "Begeleiding bij de start" → **"Praktische opstart als zelfstandige"**

Dat houdt de hiërarchie helder:
- H2 (sectie): "Begeleiding bij je start als zelfstandig verpleegkundige" (overkoepelend)
- H3 (kaart 1): "Ondersteuning voor zelfstandige verpleegkundigen" (lopende ondersteuning)
- H3 (kaart 2): "Praktische opstart als zelfstandige" (concrete opstartstappen)
- H3 (kaart 3): "Begeleiding bij het opstarten of uitbouwen van een praktijk"

Als je liever toch de letterlijke verlenging wilt zoals je voorstelt, dan pas ik enkel de kaarttitel aan en niet de H2 (die staat er al zo).
