
# Bevestigingsmail voor contactformulier

## Context
- Het "Sluit aan" formulier bestaat niet apart — `/zo-sluit-je-aan/` linkt naar `/contact/`. Eén fix dekt dus beide.
- Opleidingen + sollicitaties krijgen al een bevestiging.
- Contact (`type: "contact"`) krijgt nu enkel een interne notificatie naar `info@hezo.be`, geen mail naar de aanvrager.

## Wijziging
Eén bestand: `supabase/functions/send-contact/index.ts`

Toevoegen na het versturen van de notificatiemail: een tweede Resend-call **enkel als `submissionType === "contact"`** en `data.email` aanwezig is.

### Inhoud van de bevestigingsmail

- **Van:** `Hezo <info@hezo.be>` (zelfde patroon als opleiding-bevestiging)
- **Aan:** de aanvrager
- **Onderwerp:** `We hebben je bericht goed ontvangen — Hezo`
- **Body** (zelfde HTML-stijl als opleiding-confirmatie, met Hezo blue `#1a365d`):

> Bedankt voor je bericht, {Naam}!
>
> We hebben je vraag goed ontvangen. Een van onze medewerkers neemt **binnen 1 à 2 werkdagen** contact met je op via e-mail of telefoon.
>
> **Een samenvatting van wat je ons stuurde:**
> - Naam: {naam}
> - E-mail: {email}
> - Telefoon: {telefoon of "niet opgegeven"}
> - Bericht: {bericht}
>
> Heb je in tussentijd een dringende vraag? Bel ons gerust op **09 265 17 20** of mail naar info@hezo.be.
>
> Met vriendelijke groeten,
> **Het Hezo Team**

### Foutafhandeling
- Try/catch rond de bevestiging (zoals bij opleiding) — bevestiging mag de hoofdflow niet breken
- Errors loggen maar 200 blijven teruggeven
- Alle user input via `escapeHtml`

## Wat NIET in scope
- Domein-verificatie in Resend (apart traject — bevestiging zal pas effectief versturen na verificatie)
- Inhaalmail naar de 12 mensen met `email_sent: false`
- UI-wijzigingen in `Contact.tsx`

## Test
Na deploy: één testbericht via `/contact/` indienen en bevestigen dat:
1. `info@hezo.be` notificatie ontvangt
2. Het opgegeven mailadres een bevestiging ontvangt
3. Logs in `send-contact` tonen "Contact confirmation email sent"
