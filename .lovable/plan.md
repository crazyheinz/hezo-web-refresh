

## Hero-sectie: overlap fixen + animatie

Het probleem is dat op ~1100px breed de twee grid-kolommen te dicht op elkaar staan en de afbeelding over de tekst/knoppen valt. De fix is een combinatie van z-index layering en een vaste gap.

### Wijzigingen

**`src/components/home/HeroSection.tsx`**
- Tekstkolom: `relative z-10` toevoegen — tekst en knoppen staan altijd bovenop
- Afbeeldingkolom: `relative z-0` — altijd achter de tekst
- Grid gap vergroten: `lg:gap-10` → `lg:gap-16` voor vaste afstand tussen tekst en afbeelding
- Afbeelding verkleinen: `max-w-xl` → `max-w-md` zodat er meer ademruimte is
- `mb-12` → `mb-8` op beschrijvingstekst
- Afbeelding wrappen in `motion.div` (framer-motion) met zwevende animatie: `y: [0, -10, 0]`, 4s loop, easeInOut

**`src/components/home/MissionSection.tsx`**
- `py-20 sm:py-28` → `py-14 sm:py-20` voor minder witruimte tussen secties

