// Polyfill localStorage for Node.js prerender environment
if (typeof globalThis.localStorage === "undefined") {
  const store: Record<string, string> = {};
  (globalThis as any).localStorage = {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    get length() { return Object.keys(store).length; },
    key: (i: number) => Object.keys(store)[i] ?? null,
  } as Storage;
}

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import AppContent from "./AppContent";
import { blogArticles } from "./data/blogArticles";

// All indexable marketing routes
const staticRoutes = [
  "/",
  "/onze-diensten/",
  "/zo-sluit-je-aan/",
  "/opleidingen/",
  "/vacatures/",
  "/blog/",
  "/contact/",
  "/privacy/",
  "/cookies/",
];

// Auto-generate blog routes from data
const blogRoutes = blogArticles.map((a) => `/blog/${a.id}/`);
const allRoutes = [...staticRoutes, ...blogRoutes];

export async function prerender(data: { url: string }) {
  const helmetContext: { helmet?: any } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={data.url}>
        <AppContent />
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  // Collect head elements from react-helmet-async
  const headElements = new Set<string>();
  if (helmet) {
    const title = helmet.title?.toString();
    const meta = helmet.meta?.toString();
    const link = helmet.link?.toString();
    const script = helmet.script?.toString();
    if (title) headElements.add(title);
    if (meta) headElements.add(meta);
    if (link) headElements.add(link);
    if (script) headElements.add(script);
  }

  return {
    html,
    head: {
      elements: headElements,
    },
    // Return all routes so the plugin knows which pages to prerender
    links: new Set(allRoutes),
  };
}
