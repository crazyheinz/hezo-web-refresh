# Handleiding: Website Beheer (hezo.be)

## Snel Overzicht

Deze website wordt beheerd via **Lovable** (een AI-gebaseerde website builder) en de code staat op **GitHub**. Wijzigingen worden automatisch gepubliceerd naar www.hezo.be.

---

## 1. Toegang via Lovable (Aanbevolen)

De makkelijkste manier om de website te bewerken:

1. Ga naar: https://lovable.dev/projects/a96ce8fe-4af9-40f6-ac0c-9214f80fd048
2. Log in met het Lovable account
3. Gebruik de chat om wijzigingen te vragen (bijv. "Pas de tekst op de homepage aan")
4. Klik op **Publish** (rechtsboven) om live te zetten

### Voordelen Lovable:
- Geen programmeerkennis nodig
- AI helpt bij wijzigingen
- Directe preview van aanpassingen

---

## 2. Toegang via GitHub (Voor Developers)

### Repository Locatie
De code staat in een GitHub repository gekoppeld aan het Lovable project.

### Lokaal Ontwikkelen

```bash
# 1. Clone de repository
git clone <GITHUB_REPO_URL>

# 2. Ga naar de project folder
cd <PROJECT_FOLDER>

# 3. Installeer dependencies (Node.js vereist)
npm install

# 4. Start lokale development server
npm run dev
```

De website draait dan op: http://localhost:8080

### Wijzigingen Maken
1. Bewerk de bestanden in je code editor (bijv. VS Code)
2. Commit en push naar GitHub:
   ```bash
   git add .
   git commit -m "Beschrijving van wijziging"
   git push
   ```
3. GitHub Actions deployt automatisch naar www.hezo.be

---

## 3. Belangrijke Bestanden

| Bestand/Map | Doel |
|-------------|------|
| `src/pages/` | Pagina's van de website |
| `src/components/` | Herbruikbare componenten |
| `src/index.css` | Styling en kleuren |
| `public/` | Statische bestanden (favicon, images) |

---

## 4. Technologie Stack

- **React** - Frontend framework
- **TypeScript** - Programmeertaal
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Supabase** - Backend (database, functies)
- **GitHub Pages** - Hosting

---

## 5. Backend (Lovable Cloud)

De website heeft een backend voor:
- Contact formulieren
- Webinar beheer (/webinar-admin)
- Sollicitaties

Toegang tot backend data:
1. Open Lovable project
2. Klik op **Cloud** tab (linkerzijde)
3. Bekijk database tabellen en data

---

## 6. Deployment

Deployment gebeurt **automatisch** via GitHub Actions:
- Push naar `main` branch → automatische deploy naar www.hezo.be
- Duurt meestal 2-5 minuten

### Handmatig Publiceren via Lovable:
1. Open project in Lovable
2. Klik **Publish** (rechtsboven)
3. Klik **Update** om live te zetten

---

## 7. Belangrijke URLs

| Wat | URL |
|-----|-----|
| Live website | https://www.hezo.be |
| Lovable project | https://lovable.dev/projects/a96ce8fe-4af9-40f6-ac0c-9214f80fd048 |
| Webinar admin | https://www.hezo.be/webinar-admin |

---

## 8. Problemen Oplossen

### Website werkt niet?
1. Check of GitHub Actions succesvol was (groene vink in GitHub)
2. Wacht 5 minuten en ververs de browser cache (Ctrl+F5)

### Lovable login kwijt?
- Neem contact op met Lovable support: https://lovable.dev

### Code editor vragen?
- Gebruik Visual Studio Code (gratis): https://code.visualstudio.com

---

## 9. Contact & Support

- **Lovable documentatie**: https://docs.lovable.dev
- **Lovable Discord community**: https://discord.gg/lovable

---

*Laatste update: Februari 2026*
