// Blog article data — single source of truth for routes and content
export interface BlogArticleData {
  id: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogArticles: BlogArticleData[] = [
  {
    id: "administratie-thuisverpleging",
    title: "Administratie in de thuisverpleging: wat komt erbij kijken?",
    excerpt: "Administratie in de thuisverpleging kost tijd. Ontdek wat erbij komt kijken en hoe je als zelfstandige verpleegkundige efficiënter werkt.",
    metaTitle: "Administratie thuisverpleging: wat komt erbij kijken? | Hezo",
    date: "2026-03-22",
    category: "Administratie",
    readTime: "7 min"
  },
  {
    id: "zelfstandig-thuisverpleegkundige-worden",
    title: "Zelfstandig thuisverpleegkundige worden: stappenplan & ondersteuning",
    excerpt: "Ontdek hoe je zelfstandig thuisverpleegkundige wordt in België. Stappenplan, voorwaarden, RIZIV-nummer en ondersteuning van Hezo bij elke stap.",
    metaTitle: "Zelfstandig thuisverpleegkundige worden | Stappenplan",
    date: "2026-03-01",
    category: "Starten als zelfstandige",
    readTime: "12 min"
  },
  {
    id: "hbo5-graduaat-basisverpleegkunde",
    title: "Van HBO5 naar graduaat Basisverpleegkunde: wat betekent de hervorming voor (thuis)verpleegkundigen?",
    excerpt: "Graduaat Basisverpleegkunde vervangt HBO5: ontdek de twee verpleegkundige opleidingen in Vlaanderen en hun impact op thuisverpleging.",
    metaTitle: "Graduaat Basisverpleegkunde vs HBO5: de hervorming uitgelegd",
    date: "2026-01-14",
    category: "Opleiding",
    readTime: "8 min"
  },
];
