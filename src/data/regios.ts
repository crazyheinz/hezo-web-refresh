// Regio-specifieke landingspagina's voor SEO (lokale queries)
export interface RegioData {
  slug: string;
  naam: string;
  type: "stad" | "provincie";
  metaTitle: string;
  metaDescription: string;
  intro: string;
  voorPatienten: string;
  voorVerpleegkundigen: string;
  vacatureLink?: { titel: string; href: string };
  gemeentes: string[];
  postalArea: string;
}

export const regios: Record<string, RegioData> = {
  antwerpen: {
    slug: "antwerpen",
    naam: "Antwerpen",
    type: "stad",
    metaTitle: "Thuisverpleging Antwerpen | Zelfstandige thuisverpleegkundigen - Hezo",
    metaDescription:
      "Thuisverpleging in Antwerpen door zelfstandige thuisverpleegkundigen van het Hezo-netwerk. Hygienische zorg, wondzorg, medicatie en meer aan huis.",
    intro:
      "Hezo is actief in en rond Antwerpen met een groeiend netwerk van zelfstandige thuisverpleegkundigen. " +
      "Onze verpleegkundigen kennen de stad, kennen de wijken en bouwen een vertrouwensband op met patienten en families. " +
      "Of het nu gaat om dagelijkse wondzorg in Berchem, insuline-injecties in Borgerhout of palliatieve zorg op het Zuid: " +
      "we zorgen voor continuiteit en kwaliteit.",
    voorPatienten:
      "Heb je in Antwerpen thuisverpleging nodig na een ziekenhuisopname of voor langdurige opvolging? " +
      "Een zelfstandige thuisverpleegkundige van Hezo komt bij jou thuis voor hygienische zorg, wondzorg, " +
      "medicatietoediening, opvolging van diabetes, bloedafnames en palliatieve zorg. We werken via terugbetaling " +
      "door je mutualiteit, met de RIZIV-nomenclatuur. Bel of mail Hezo Antwerpen en we contacteren je voor een eerste afspraak.",
    voorVerpleegkundigen:
      "Werk je als zelfstandige verpleegkundige in Antwerpen en zoek je meer ondersteuning, een vol patientenbestand " +
      "of betere administratieve omkadering? Bij Hezo behoud je je volledige autonomie als zelfstandige, maar krijg je " +
      "een sterk netwerk rond je: administratieve ontzorging, vaste patienteninstroom, gratis opleidingen en een hecht team " +
      "in de regio. Onze praktijk in Antwerpen Zuid - Berchem heeft regelmatig openstaande plekken voor nieuwe collega's.",
    vacatureLink: {
      titel: "Zelfstandig thuisverpleegkundige Antwerpen Zuid - Berchem",
      href: "/vacatures/#zelfstandig-antwerpen-zuid-berchem",
    },
    gemeentes: [
      "Antwerpen-Stad", "Berchem", "Borgerhout", "Deurne", "Merksem", "Wilrijk",
      "Hoboken", "Ekeren", "Edegem", "Mortsel", "Schoten", "Brasschaat",
    ],
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
      "Onze focus: continuiteit van zorg, vaste verpleegkundigen die hun patienten kennen, en korte communicatielijnen " +
      "met huisartsen, ziekenhuizen en mantelzorgers.",
    voorPatienten:
      "Zoek je thuisverpleging in Gent of de deelgemeenten? Een zelfstandige verpleegkundige van Hezo komt bij jou thuis " +
      "voor de zorg die je nodig hebt: wondzorg, medicatie, hygienische zorg, post-operatieve opvolging, palliatieve zorg. " +
      "We werken samen met huisartsen en ziekenhuizen in de regio Gent en regelen de aanvraag bij je mutualiteit. " +
      "Contacteer ons via info@hezo.be of bel +32 9 265 17 20.",
    voorVerpleegkundigen:
      "Ben je verpleegkundige in Gent en wil je zelfstandig starten of overstappen naar een sterker netwerk? " +
      "Hezo, het netwerk van zelfstandige thuisverpleegkundigen in samenwerking met Helan Welzijnsgroep, " +
      "biedt je administratieve ondersteuning, gratis opleidingen, vaste patienteninstroom en een hecht team. " +
      "We hebben in Gent actieve vacatures voor zelfstandig verantwoordelijke verpleegkundigen die mee een regio willen uitbouwen.",
    vacatureLink: {
      titel: "Zelfstandig Verantwoordelijke Thuisverpleging Gent",
      href: "/vacatures/#regiomanager",
    },
    gemeentes: [
      "Gent-Centrum", "Ledeberg", "Gentbrugge", "Sint-Amandsberg", "Drongen",
      "Mariakerke", "Wondelgem", "Oostakker", "Sint-Denijs-Westrem", "Zwijnaarde",
      "Merelbeke", "Destelbergen", "Lochristi", "De Pinte", "Evergem",
    ],
    postalArea: "9000-9052",
  },
};

export const regioList = Object.values(regios);
