

De gebruiker wil opleidingen kunnen beheren (toevoegen/wijzigen/deactiveren) zonder een volwaardig auth-systeem. In dit project bestaat al exact dit patroon voor webinars: `WebinarAdmin` + `webinar-admin` edge function + `WEBINAR_ADMIN_PASSWORD` secret. Ik volg datzelfde patroon.

## Plan: Admin opleidingenbeheer met wachtwoord

### Aanpak
Eén verborgen pagina `/opleidingen-admin` met een wachtwoordveld. Een edge function controleert het wachtwoord tegen een secret en voert via service role de mutaties uit. Geen accounts, geen login flow, geen e-mails.

### Database (migratie)
Nieuwe tabel `trainings` — de hardgecodeerde lijst in `Opleidingen.tsx` verhuist hierheen:
- `id`, `titel`, `datum` (date), `tijd`, `locatie` (nullable), `max_deelnemers`, `beschrijving`, `lesgever`, `type` ('webinar' | 'fysiek'), `opname_beschikbaar`, `is_active` (default true), `created_at`, `updated_at`

RLS:
- Public SELECT enkel waar `is_active = true` (publieke pagina kan lezen)
- Geen public INSERT/UPDATE/DELETE — alle mutaties verlopen via edge function met service role

Migratie seedt de 6 bestaande opleidingen zodat de publieke pagina niets verliest.

### Edge function: `trainings-admin`
- `verify_jwt = false`, CORS headers
- Body: `{ password, action: 'list_all' | 'create' | 'update' | 'toggle_active' | 'delete', payload }`
- Wachtwoordcheck tegen secret, Zod-validatie van payload
- Gebruikt `SUPABASE_SERVICE_ROLE_KEY` voor mutaties
- `list_all` geeft ook gedeactiveerde opleidingen terug (alleen voor admin)

### Frontend
- **`src/pages/Opleidingen.tsx`** — laadt opleidingen uit Supabase i.p.v. hardgecodeerde array; behoudt zoekbalk en uitklap-UI
- **`src/pages/OpleidingenAdmin.tsx`** (nieuw) — wachtwoordveld → tabel met alle opleidingen (incl. gedeactiveerd) → knoppen "Bewerken", "Deactiveren/Activeren", "Verwijderen" + dialog "Nieuwe opleiding toevoegen" met formulier voor alle velden
- **`src/AppContent.tsx`** — route `/opleidingen-admin` toevoegen (niet in navigatie, niet in sitemap, net zoals `/webinar-admin`)

### Secret
Vraag vooraf: wachtwoord apart of hergebruiken?

| Optie | Gevolg |
|---|---|
| **Apart wachtwoord** | Nieuw secret `TRAININGS_ADMIN_PASSWORD`, je kiest een eigen waarde |
| **Hergebruik webinar-wachtwoord** | Bestaand `WEBINAR_ADMIN_PASSWORD` wordt ook gebruikt — één wachtwoord voor beide admin-pagina's |

Laat me weten welke je verkiest, dan implementeer ik het meteen.

