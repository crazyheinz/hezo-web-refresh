

## Twee problemen met de GitHub Actions build

### Probleem 1: `localStorage is not defined`
De pre-render draait in Node.js, waar `localStorage` niet bestaat. Het Supabase client-bestand (`src/integrations/supabase/client.ts`) refereert direct naar `localStorage`, maar dat bestand mag niet bewerkt worden (auto-gegenereerd).

**Oplossing:** In `src/prerender.tsx`, vóór alle imports, een `localStorage` polyfill toevoegen voor de Node-omgeving:

```typescript
// Polyfill for Node.js prerender environment
if (typeof globalThis.localStorage === "undefined") {
  const store: Record<string, string> = {};
  globalThis.localStorage = {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    get length() { return Object.keys(store).length; },
    key: (i: number) => Object.keys(store)[i] ?? null,
  } as Storage;
}
```

### Probleem 2: `package-lock.json` out of sync
De screenshot toont dat `npm ci` faalt omdat `package-lock.json` niet overeenkomt met `package.json` (de nieuwe dependencies zoals `vite-prerender-plugin` ontbreken in de lockfile).

**Oplossing:** De `package-lock.json` moet geregenereerd worden. Dit gebeurt automatisch wanneer Lovable de dependencies installeert na de codewijziging.

### Bestanden die wijzigen

| Bestand | Wijziging |
|---|---|
| `src/prerender.tsx` | `localStorage` polyfill toevoegen bovenaan |

