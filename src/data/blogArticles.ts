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
    id: "inkomen-zelfstandige-thuisverpleegkundige",
    title: "Wat verdien je als zelfstandige thuisverpleegkundige in België?",
    excerpt: "Hoeveel verdien je als zelfstandige thuisverpleegkundige in België? Ontdek je bruto omzet, kosten en netto inkomen helder uitgelegd.",
    metaTitle: "Inkomen zelfstandige thuisverpleegkundige België | Hezo",
    date: "2026-04-18",
    category: "Inkomen",
    readTime: "8 min"
  },
  {
    id: "thuisverpleging-meer-dan-spuitje",
    title: "Waarom thuisverpleging veel meer is dan \"een spuitje zetten\"",
    excerpt: "Thuisverpleging is veel meer dan technische handelingen. Ontdek wat het beroep écht inhoudt en waarom het bredere beeld zo belangrijk is.",
    metaTitle: "Thuisverpleging: meer dan een spuitje zetten | Hezo",
    date: "2026-04-17",
    category: "Visie",
    readTime: "6 min"
  },
  {
    id: "werk-privebalans-thuisverpleegkundige",
    title: "Werk-privébalans als zelfstandige thuisverpleegkundige: waarom het vaak misloopt (en hoe het anders kan)",
    excerpt: "Werk-privébalans in de thuisverpleging is niet evident. Ontdek waarom het vaak misloopt en hoe je meer rust en structuur creëert.",
    metaTitle: "Werk-privébalans thuisverpleegkundige | Hezo",
    date: "2026-03-24",
    category: "Welzijn",
    readTime: "9 min"
  },
  {
    id: "software-thuisverpleging",
    title: "Software in de thuisverpleging: wat heb je nodig als zelfstandige verpleegkundige?",
    excerpt: "Welke software heb je nodig in de thuisverpleging? Ontdek hoe registratie, facturatie en tools werken en waar je op moet letten.",
    metaTitle: "Software thuisverpleging: wat heb je nodig? | Hezo",
    date: "2026-03-22",
    category: "Software",
    readTime: "7 min"
  },
  {
    id: "patienten-thuisverpleegkundige",
    title: "Patiënten vinden als thuisverpleegkundige: hoe werkt het?",
    excerpt: "Hoe kom je als zelfstandige thuisverpleegkundige aan patiënten? Ontdek hoe zorgvragen ontstaan en hoe je een stabiele instroom opbouwt.",
    metaTitle: "Patiënten vinden als thuisverpleegkundige: hoe werkt het? | Hezo",
    date: "2026-03-22",
    category: "Patiënteninstroom",
    readTime: "8 min"
  },
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
