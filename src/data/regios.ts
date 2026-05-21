// Regio-specifieke landingspagina's voor SEO (lokale queries)
export interface RegioData {
  slug: string;
  naam: string;
  type: "stad" | "provincie";
  metaTitle: string;
  metaDescription: string;
  intro: string;
  voorVerpleegkundigen: string;
  vacatureLink?: { titel: string; href: string };
  postalArea: string;
}

export const regios: Record<string, RegioData> = {
  antwerpen: {
    slug: "antwerpen",
    naam: "Antwerpen",
    type: "stad",
    metaTitle: "Thuisverpleging Antwerpen | Zelfstandige thuisverpleegkundigen - Hezo",
    metaDescription:
      "Thuisverpleging in Antwerpen door zelfstandige thuisverpleegkundigen van het Hezo-netwerk. Hygiënische zorg, wondzorg, medicatie en meer aan huis.",
    intro:
      "Hezo is actief in en rond Antwerpen met een groeiend netwerk van zelfstandige thuisverpleegkundigen. " +
      "Onze verpleegkundigen kennen de stad, kennen de wijken en bouwen een vertrouwensband op met patiënten en families. " +
      "Of het nu gaat om dagelijkse wondzorg in Berchem, insuline-injecties in Borgerhout of palliatieve zorg op het Zuid: " +
      "we zorgen voor continuïteit en kwaliteit.",
    voorVerpleegkundigen:
      "Werk je als zelfstandige verpleegkundige in Antwerpen en zoek je meer ondersteuning, een vol patiëntenbestand " +
      "of betere administratieve omkadering? Bij Hezo behoud je je volledige autonomie als zelfstandige, maar krijg je " +
      "een sterk netwerk rond je: administratieve ontzorging, vaste patiënteninstroom, gratis opleidingen en een hecht team " +
      "in de regio. Onze praktijk in Antwerpen Zuid - Berchem heeft regelmatig openstaande plekken voor nieuwe collega's.",
    vacatureLink: {
      titel: "Zelfstandig thuisverpleegkundige Antwerpen Zuid - Berchem",
      href: "/vacatures/zelfstandig-antwerpen-zuid-berchem/",
    },
    postalArea: "2000-2660",
  },
  gent: {
    slug: "gent",
    naam: "Gent",
    type: "stad",
    metaTitle: "Thuisverpleging Gent | Zelfstandige thuisverpleegkundigen - Hezo",
    metaDescription:
      "Thuisverpleging in Gent door zelfstandige thuisverpleegkundigen van Hezo. Persoonlijke zorg aan huis, vaste verpleegkundige, in samenwerking met Helan.",
    intro:
      "Hezo is in Gent en omgeving actief met een netwerk van zelfstandige thuisverpleegkundigen. " +
      "Vanuit ons hoofdkantoor in Gent ondersteunen we verpleegkundigen die zorg leveren in de stad, de deelgemeenten en de regio rond Gent. " +
      "Onze focus: continuïteit van zorg, vaste verpleegkundigen die hun patiënten kennen, en korte communicatielijnen " +
      "met huisartsen, ziekenhuizen en mantelzorgers.",
    voorVerpleegkundigen:
      "Ben je verpleegkundige in Gent en wil je zelfstandig starten of overstappen naar een sterker netwerk? " +
      "Hezo, het netwerk van zelfstandige thuisverpleegkundigen in samenwerking met Helan Welzijnsgroep, " +
      "biedt je administratieve ondersteuning, gratis opleidingen, vaste patiënteninstroom en een hecht team. " +
      "We hebben in Gent actieve vacatures voor zowel zelfstandige thuisverpleegkundigen als voor een verantwoordelijke verpleegkundige die mee een regio wil uitbouwen.",
    vacatureLink: {
      titel: "Zelfstandig thuisverpleegkundige Gent",
      href: "/vacatures/zelfstandig-gent/",
    },
    postalArea: "9000-9052",
  },
  "west-vlaanderen": {
    slug: "west-vlaanderen",
    naam: "West-Vlaanderen",
    type: "provincie",
    metaTitle: "Thuisverpleging West-Vlaanderen | Zelfstandige thuisverpleegkundigen - Hezo",
    metaDescription:
      "Hezo bouwt aan een netwerk van zelfstandige thuisverpleegkundigen in West-Vlaanderen. We zoeken een zelfstandig verantwoordelijke verpleegkundige om de regio mee uit te bouwen.",
    intro:
      "Hezo breidt uit naar West-Vlaanderen. We bouwen een netwerk van zelfstandige thuisverpleegkundigen " +
      "uit in de regio rond Brugge, Kortrijk, Roeselare, Oostende en de bredere provincie. " +
      "Onze focus blijft dezelfde: continuïteit van zorg, vaste verpleegkundigen die hun patiënten kennen " +
      "en korte communicatielijnen met huisartsen, ziekenhuizen en mantelzorgers.",
    voorVerpleegkundigen:
      "Ben je ervaren verpleegkundige in West-Vlaanderen en wil je mee een nieuwe regio uitbouwen? " +
      "Hezo zoekt een zelfstandig verantwoordelijke thuisverpleegkundige om in West-Vlaanderen een lokaal team " +
      "op te starten en te begeleiden. Je combineert zorgexpertise met organisatie, bouwt een patiëntenbestand op " +
      "en wordt het vaste aanspreekpunt voor aangesloten verpleegkundigen in de regio. Je krijgt ondersteuning " +
      "vanuit het volledige Hezo-netwerk: administratie, software, opleidingen en coaching.",
    vacatureLink: {
      titel: "Zelfstandig Verantwoordelijke Thuisverpleging West-Vlaanderen",
      href: "/vacatures/verantwoordelijke-west-vlaanderen/",
    },
    postalArea: "8000-8970",
  },
};

export const regioList = Object.values(regios);
