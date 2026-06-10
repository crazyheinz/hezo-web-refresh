// Vacatures dataset - één source of truth voor de overzichts- en detailpagina's.
// Elke actieve vacature krijgt een eigen route /vacatures/:slug/ met eigen SEO meta.

export interface Vacature {
  id: string; // slug, gebruikt in URL
  title: string;
  tagline: string;
  active: boolean;
  locality: string; // Stad voor JobPosting JSON-LD en URL-tag
  region: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  responsibilities: string[];
  profile: string[];
  offer: string[];
  baseSalary: { min: number; max: number; unit: "MONTH" | "HOUR" };
  datePosted: string;
  validThrough: string;
}

export const vacatures: Vacature[] = [
  {
    id: "zelfstandig-antwerpen-zuid-berchem",
    title: "Zelfstandig thuisverpleegkundige - Antwerpen Zuid - Berchem",
    tagline: "Zorg met impact. Werk met vrijheid. Groei met ondersteuning.",
    active: true,
    locality: "Antwerpen",
    region: "Antwerpen Zuid - Berchem",
    metaTitle: "Vacature zelfstandig thuisverpleegkundige Antwerpen Zuid - Berchem | Hezo",
    metaDescription:
      "Werken als zelfstandig thuisverpleegkundige in Antwerpen Zuid of Berchem? Behoud je autonomie en krijg ondersteuning, vaste rondes en inkomensgarantie via Hezo.",
    description:
      "Ben jij een zelfstandig verpleegkundige (of wil je dat worden) en zoek je een werkcontext waar je écht kan focussen op zorg, waar je kan bijleren en groeien op persoonlijk en professioneel vlak? Binnen de praktijk Hezo Antwerpen werk je in een betrokken en hecht team waar kwaliteit, respect en samenwerking centraal staan. Tegelijk behoud je jouw autonomie als zelfstandige, met een duidelijke structuur en ondersteuning op de achtergrond. Als zelfstandig thuisverpleegkundige sta je in voor de dagelijkse zorg bij patiënten in jouw regio. Je werkt zelfstandig je ronde af, maar staat er nooit alleen voor.",
    responsibilities: [
      "Hygiënische zorg (wassen, kleden, mobiliseren)",
      "Toedienen van medicatie (oraal, subcutaan, intramusculair, …)",
      "Wondzorg (van eenvoudig tot complex, inclusief compressie en VAC)",
      "Plaatsen en opvolgen van sondes, katheters en infusen",
      "Bloedafnames en andere verpleegtechnische handelingen",
      "Opvolging van parameters (bloeddruk, glycemie, saturatie, …)",
      "Pijnobservatie en aangepaste interventies",
      "Luisteren naar de patiënt",
      "Zorgen voor de patiënt in zijn autonomie en eigenheid, met het nodige respect",
    ],
    profile: [
      "Je beschikt over een diploma verpleegkunde (HBO5, Bachelor of Master)",
      "Je hebt een geldig RIZIV-nummer",
      "Je beschikt over eigen vervoer",
      "Je werkt graag zelfstandig en neemt verantwoordelijkheid",
      "Je bent patiëntgericht, empathisch en professioneel",
      "Je gelooft in samenwerking en wil meebouwen aan de toekomst van thuisverpleging",
    ],
    offer: [
      "Werkbaar evenwicht met duidelijke planning, voorspelbare rondes en beperkte avond- en weekendbelasting",
      "Mogelijkheid om je engagement af te stemmen op jouw situatie, met werkzekerheid",
      "Administratieve ontzorging (facturatie, opvolging, …) en ondersteuning in kwaliteit, rapportage en communicatie",
      "Gratis opleidingen, begeleiding bij opstart en verdere groei",
      "Aantrekkelijk ereloon volgens RIZIV en zeer scherpe praktijkcommissie – vanaf 1 jaar ervaring 8% afdracht",
      "Snelle en correcte uitbetaling met volledige financiële transparantie",
      "Behoud van alle premies (telematica, opleiding, etc.)",
      "Inkomensgarantie tot €200 per werkdag – brengt de ronde je geen €200 op, dan passen wij het verschil bij",
      "Je maakt deel uit van een groter geheel, zonder je zelfstandigheid te verliezen",
      "Bereikbare collega's met een gezamenlijke focus op de patiënt",
      "Ruimte voor initiatief, innovatie en verbetering van zorg",
    ],
    baseSalary: { min: 4000, max: 7000, unit: "MONTH" },
    datePosted: "2026-04-01",
    validThrough: "2026-12-31",
  },
  {
    id: "zelfstandig-gent",
    title: "Zelfstandig thuisverpleegkundige - Gent",
    tagline: "Zorg met impact. Werk met vrijheid. Groei met ondersteuning.",
    active: false,
    locality: "Gent",
    region: "Gent",
    metaTitle: "Vacature zelfstandig thuisverpleegkundige Gent | Hezo",
    metaDescription:
      "Werken als zelfstandig thuisverpleegkundige in Gent? Behoud je autonomie en krijg ondersteuning, vaste rondes en inkomensgarantie via Hezo.",
    description:
      "Ben jij een zelfstandig verpleegkundige (of wil je dat worden) en zoek je een werkcontext waar je écht kan focussen op zorg, waar je kan bijleren en groeien op persoonlijk en professioneel vlak? Binnen de praktijk Hezo Gent werk je in een betrokken en hecht team waar kwaliteit, respect en samenwerking centraal staan. Tegelijk behoud je jouw autonomie als zelfstandige, met een duidelijke structuur en ondersteuning op de achtergrond. Als zelfstandig thuisverpleegkundige sta je in voor de dagelijkse zorg bij patiënten in jouw regio. Je werkt zelfstandig je ronde af, maar staat er nooit alleen voor.",
    responsibilities: [
      "Hygiënische zorg (wassen, kleden, mobiliseren)",
      "Toedienen van medicatie (oraal, subcutaan, intramusculair, …)",
      "Wondzorg (van eenvoudig tot complex, inclusief compressie en VAC)",
      "Plaatsen en opvolgen van sondes, katheters en infusen",
      "Bloedafnames en andere verpleegtechnische handelingen",
      "Opvolging van parameters (bloeddruk, glycemie, saturatie, …)",
      "Pijnobservatie en aangepaste interventies",
      "Luisteren naar de patiënt",
      "Zorgen voor de patiënt in zijn autonomie en eigenheid, met het nodige respect",
    ],
    profile: [
      "Je beschikt over een diploma verpleegkunde (HBO5, Bachelor of Master)",
      "Je hebt een geldig RIZIV-nummer",
      "Je beschikt over eigen vervoer",
      "Je werkt graag zelfstandig en neemt verantwoordelijkheid",
      "Je bent patiëntgericht, empathisch en professioneel",
      "Je gelooft in samenwerking en wil meebouwen aan de toekomst van thuisverpleging",
    ],
    offer: [
      "Werkbaar evenwicht met duidelijke planning, voorspelbare rondes en beperkte avond- en weekendbelasting",
      "Mogelijkheid om je engagement af te stemmen op jouw situatie, met werkzekerheid",
      "Administratieve ontzorging (facturatie, opvolging, …) en ondersteuning in kwaliteit, rapportage en communicatie",
      "Gratis opleidingen, begeleiding bij opstart en verdere groei",
      "Aantrekkelijk ereloon volgens RIZIV en zeer scherpe praktijkcommissie – vanaf 1 jaar ervaring 8% afdracht",
      "Snelle en correcte uitbetaling met volledige financiële transparantie",
      "Behoud van alle premies (telematica, opleiding, etc.)",
      "Inkomensgarantie tot €200 per werkdag – brengt de ronde je geen €200 op, dan passen wij het verschil bij",
      "Je maakt deel uit van een groter geheel, zonder je zelfstandigheid te verliezen",
      "Bereikbare collega's met een gezamenlijke focus op de patiënt",
      "Ruimte voor initiatief, innovatie en verbetering van zorg",
    ],
    baseSalary: { min: 4000, max: 7000, unit: "MONTH" },
    datePosted: "2026-04-01",
    validThrough: "2026-12-31",
  },
  {
    id: "regiomanager",
    title: "Zelfstandig Verantwoordelijke Thuisverpleging - Gent",
    tagline:
      "Wil jij mee een nieuw netwerk voor zelfstandige thuisverpleging uitbouwen én verantwoordelijke verpleegkundige worden van jouw eigen zorgregio?",
    active: true,
    locality: "Gent",
    region: "Gent",
    metaTitle: "Vacature zelfstandig verantwoordelijke thuisverpleging Gent | Hezo",
    metaDescription:
      "Bouw mee aan het Hezo-netwerk in Gent. Combineer zorgexpertise met organisatie: begeleid zelfstandige thuisverpleegkundigen en groei in een sterke regio.",
    description:
      "Bij Hezo bouw je als Zelfstandig Verantwoordelijke Verpleegkundige aan een sterk lokaal netwerk van verpleegkundigen en zorgpartners. Je combineert organisatie en inhoudelijke zorgexpertise: je ondersteunt zelfstandige thuisverpleegkundigen, bewaakt de kwaliteit van zorg én helpt Hezo groeien in jouw regio. Hier ben je niet alleen een planner, maar ook een vertrouwenspersoon voor je team én een strategische partner in de verdere uitbouw van het Hezo-netwerk.",
    responsibilities: [
      "Je bewaakt de continuïteit en kwaliteit van de zorg in jouw regio",
      "Je organiseert de planning en opvolging van zorgvragen binnen je team",
      "Je zorgt voor overleg tussen teamleden en andere betrokkenen",
      "Je bouwt het team verder uit: je zoekt en selecteert nieuwe collega's die passen binnen het Hezo-verhaal en begeleidt starters in hun eerste stappen als zelfstandige",
      "Je blijft dicht bij de patiënt staan, voert waar nodig de noodzakelijke zorgen uit en maakt afspraken met hen over de zorg",
      "Je bouwt mee aan de zorg van de toekomst door mee te innoveren en kritisch te kijken naar de huidige processen",
      "Je bouwt een sterk regionaal netwerk uit met andere zorgverstrekkers en zorgt ervoor dat het team een betrouwbare zorgpartner wordt in jouw regio",
      "Je capteert signalen uit het werkveld en vertaalt die naar concrete verbetervoorstellen",
      "Je koppelt terug aan het bestuursteam van Hezo, deelt je visie en helpt mee de strategische koers en groei te bepalen",
      "Je denkt mee over nieuwe diensten, samenwerkingen en digitale oplossingen die de organisatie sterker maken",
      "Je bouwt mee aan een cultuur van samenwerking, vertrouwen en open communicatie",
    ],
    profile: [
      "Je beschikt over een diploma Verpleegkunde (HBO5, Bachelor of Master)",
      "Je bent woonachtig in of rond Gent of omgeving",
      "Je beschikt over een rijbewijs en eigen vervoer, zodat je je flexibel binnen de regio kan verplaatsen",
      "Je hebt ervaring in de thuisverpleging",
      "Je benadert elke patiënt met authenticiteit en vertrouwen, en weet menselijke nabijheid te combineren met professionele zorg",
      "Je bent leergierig en volgt regelmatig bijscholingen",
      "Je communiceert vlot, bent inspirerend en oplossingsgericht",
      "Je werkt zelfstandig en gestructureerd en durft beslissingen nemen",
      "Je verbindt graag collega's en bewaakt kwaliteit binnen je team",
      "Je wil het verschil maken voor zowel patiënten als zorgverleners en wil de zorg van de toekomst mee vorm geven",
    ],
    offer: [
      "Een uitdagende, veelzijdige functie met impact op zorg en organisatie",
      "Een rol met autonomie en impact",
      "Een hecht, betrokken team en ondersteuning in administratie en operationele opvolging",
      "Begeleiding bij het uitbouwen van rondes en patiëntenbestand",
      "Ondersteuning bij het aantrekken van nieuwe teamleden en het opzetten van een duurzaam regiomodel",
      "Coaching en opleiding op maat om te groeien op persoonlijk en professioneel vlak",
      "Transparante en correcte uitbetaling",
      "Een aantrekkelijk ereloon op basis van prestaties + een managementvergoeding",
    ],
    baseSalary: { min: 5000, max: 8500, unit: "MONTH" },
    datePosted: "2026-04-01",
    validThrough: "2026-12-31",
  },
  {
    id: "verantwoordelijke-antwerpen",
    title: "Zelfstandig Verantwoordelijke Thuisverpleging - Antwerpen",
    tagline:
      "Wil jij mee een nieuw netwerk voor zelfstandige thuisverpleging uitbouwen én verantwoordelijke verpleegkundige worden van jouw eigen zorgregio?",
    active: true,
    locality: "Antwerpen",
    region: "Antwerpen",
    metaTitle: "Vacature zelfstandig verantwoordelijke thuisverpleging Antwerpen | Hezo",
    metaDescription:
      "Bouw mee aan het Hezo-netwerk in Antwerpen. Combineer zorgexpertise met organisatie: begeleid zelfstandige thuisverpleegkundigen in jouw regio.",
    description:
      "Bij Hezo bouw je als Zelfstandig Verantwoordelijke Verpleegkundige aan een sterk lokaal netwerk van verpleegkundigen en zorgpartners. Je combineert organisatie en inhoudelijke zorgexpertise: je ondersteunt zelfstandige thuisverpleegkundigen, bewaakt de kwaliteit van zorg én helpt Hezo groeien in jouw regio. Hier ben je niet alleen een planner, maar ook een vertrouwenspersoon voor je team én een strategische partner in de verdere uitbouw van het Hezo-netwerk.",
    responsibilities: [
      "Je bewaakt de continuïteit en kwaliteit van de zorg in jouw regio",
      "Je organiseert de planning en opvolging van zorgvragen binnen je team",
      "Je zorgt voor overleg tussen teamleden en andere betrokkenen",
      "Je bouwt het team verder uit: je zoekt en selecteert nieuwe collega's die passen binnen het Hezo-verhaal en begeleidt starters in hun eerste stappen als zelfstandige",
      "Je blijft dicht bij de patiënt staan, voert waar nodig de noodzakelijke zorgen uit en maakt afspraken met hen over de zorg",
      "Je bouwt mee aan de zorg van de toekomst door mee te innoveren en kritisch te kijken naar de huidige processen",
      "Je bouwt een sterk regionaal netwerk uit met andere zorgverstrekkers en zorgt ervoor dat het team een betrouwbare zorgpartner wordt in jouw regio",
      "Je capteert signalen uit het werkveld en vertaalt die naar concrete verbetervoorstellen",
      "Je koppelt terug aan het bestuursteam van Hezo, deelt je visie en helpt mee de strategische koers en groei te bepalen",
      "Je denkt mee over nieuwe diensten, samenwerkingen en digitale oplossingen die de organisatie sterker maken",
      "Je bouwt mee aan een cultuur van samenwerking, vertrouwen en open communicatie",
    ],
    profile: [
      "Je beschikt over een diploma Verpleegkunde (HBO5, Bachelor of Master)",
      "Je bent woonachtig in of rond Antwerpen of omgeving",
      "Je beschikt over een rijbewijs en eigen vervoer, zodat je je flexibel binnen de regio kan verplaatsen",
      "Je hebt ervaring in de thuisverpleging",
      "Je benadert elke patiënt met authenticiteit en vertrouwen, en weet menselijke nabijheid te combineren met professionele zorg",
      "Je bent leergierig en volgt regelmatig bijscholingen",
      "Je communiceert vlot, bent inspirerend en oplossingsgericht",
      "Je werkt zelfstandig en gestructureerd en durft beslissingen nemen",
      "Je verbindt graag collega's en bewaakt kwaliteit binnen je team",
      "Je wil het verschil maken voor zowel patiënten als zorgverleners en wil de zorg van de toekomst mee vorm geven",
    ],
    offer: [
      "Een uitdagende, veelzijdige functie met impact op zorg en organisatie",
      "Een rol met autonomie en impact",
      "Een hecht, betrokken team en ondersteuning in administratie en operationele opvolging",
      "Begeleiding bij het uitbouwen van rondes en patiëntenbestand",
      "Ondersteuning bij het aantrekken van nieuwe teamleden en het opzetten van een duurzaam regiomodel",
      "Coaching en opleiding op maat om te groeien op persoonlijk en professioneel vlak",
      "Transparante en correcte uitbetaling",
      "Een aantrekkelijk ereloon op basis van prestaties + een managementvergoeding",
    ],
    baseSalary: { min: 5000, max: 8500, unit: "MONTH" },
    datePosted: "2026-04-01",
    validThrough: "2026-12-31",
  },
  {
    id: "verantwoordelijke-west-vlaanderen",
    title: "Zelfstandig Verantwoordelijke Thuisverpleging - Regio West-Vlaanderen",
    tagline:
      "Wil jij mee een nieuw netwerk voor zelfstandige thuisverpleging uitbouwen én verantwoordelijke verpleegkundige worden van jouw eigen zorgregio?",
    active: true,
    locality: "Brugge",
    region: "West-Vlaanderen",
    metaTitle: "Vacature zelfstandig verantwoordelijke thuisverpleging West-Vlaanderen | Hezo",
    metaDescription:
      "Bouw mee aan het Hezo-netwerk in West-Vlaanderen. Combineer zorgexpertise met organisatie: begeleid zelfstandige thuisverpleegkundigen in jouw regio.",
    description:
      "Bij Hezo bouw je als Zelfstandig Verantwoordelijke Verpleegkundige aan een sterk lokaal netwerk van verpleegkundigen en zorgpartners. Je combineert organisatie en inhoudelijke zorgexpertise: je ondersteunt zelfstandige thuisverpleegkundigen, bewaakt de kwaliteit van zorg én helpt Hezo groeien in jouw regio. Hier ben je niet alleen een planner, maar ook een vertrouwenspersoon voor je team én een strategische partner in de verdere uitbouw van het Hezo-netwerk.",
    responsibilities: [
      "Je bewaakt de continuïteit en kwaliteit van de zorg in jouw regio",
      "Je organiseert de planning en opvolging van zorgvragen binnen je team",
      "Je zorgt voor overleg tussen teamleden en andere betrokkenen",
      "Je bouwt het team verder uit: je zoekt en selecteert nieuwe collega's die passen binnen het Hezo-verhaal en begeleidt starters in hun eerste stappen als zelfstandige",
      "Je blijft dicht bij de patiënt staan, voert waar nodig de noodzakelijke zorgen uit en maakt afspraken met hen over de zorg",
      "Je bouwt mee aan de zorg van de toekomst door mee te innoveren en kritisch te kijken naar de huidige processen",
      "Je bouwt een sterk regionaal netwerk uit met andere zorgverstrekkers en zorgt ervoor dat het team een betrouwbare zorgpartner wordt in jouw regio",
      "Je capteert signalen uit het werkveld en vertaalt die naar concrete verbetervoorstellen",
      "Je koppelt terug aan het bestuursteam van Hezo, deelt je visie en helpt mee de strategische koers en groei te bepalen",
      "Je denkt mee over nieuwe diensten, samenwerkingen en digitale oplossingen die de organisatie sterker maken",
      "Je bouwt mee aan een cultuur van samenwerking, vertrouwen en open communicatie",
    ],
    profile: [
      "Je beschikt over een diploma Verpleegkunde (HBO5, Bachelor of Master)",
      "Je bent woonachtig in West-Vlaanderen",
      "Je beschikt over een rijbewijs en eigen vervoer, zodat je je flexibel binnen de regio kan verplaatsen",
      "Je hebt ervaring in de thuisverpleging",
      "Je benadert elke patiënt met authenticiteit en vertrouwen, en weet menselijke nabijheid te combineren met professionele zorg",
      "Je bent leergierig en volgt regelmatig bijscholingen",
      "Je communiceert vlot, bent inspirerend en oplossingsgericht",
      "Je werkt zelfstandig en gestructureerd en durft beslissingen nemen",
      "Je verbindt graag collega's en bewaakt kwaliteit binnen je team",
      "Je wil het verschil maken voor zowel patiënten als zorgverleners en wil de zorg van de toekomst mee vorm geven",
    ],
    offer: [
      "Een uitdagende, veelzijdige functie met impact op zorg en organisatie",
      "Een rol met autonomie en impact",
      "Een hecht, betrokken team en ondersteuning in administratie en operationele opvolging",
      "Begeleiding bij het uitbouwen van rondes en patiëntenbestand",
      "Ondersteuning bij het aantrekken van nieuwe teamleden en het opzetten van een duurzaam regiomodel",
      "Coaching en opleiding op maat om te groeien op persoonlijk en professioneel vlak",
      "Transparante en correcte uitbetaling",
      "Een aantrekkelijk ereloon op basis van prestaties + een managementvergoeding",
    ],
    baseSalary: { min: 5000, max: 8500, unit: "MONTH" },
    datePosted: "2026-04-01",
    validThrough: "2026-12-31",
  },
  {
    id: "administratief-coordinator",
    title: "Zorgondersteunend Administratief Coördinator",
    tagline: "Wil jij meebouwen aan een vernieuwend netwerk voor zelfstandige thuisverpleging?",
    active: true,
    locality: "Gent",
    region: "Gent",
    metaTitle: "Vacature administratief coördinator thuisverpleging | Hezo",
    metaDescription:
      "Word administratief coördinator bij Hezo. Combineer administratie, kwaliteit en procesoptimalisatie in een groeiend netwerk voor zelfstandige thuisverpleging.",
    description:
      "Bij Hezo krijg je als administratief zorgcoördinator een centrale rol. Je combineert administratieve taken met het ontwikkelen en optimaliseren van processen, en zet jouw (verpleegkundige) expertise in om het Hezo team én aangesloten verpleegkundigen te ondersteunen bij hun vragen. In deze rol ben je een onmisbare schakel binnen een startende organisatie in volle groei. Naarmate de organisatie groeit zal ook jouw rol evolueren in functie van jouw talenten en kwaliteiten.",
    responsibilities: [
      "Je beheert de facturatieflow en controleert binnenkomende prestatiegegevens van de aangesloten verpleegkundigen",
      "Je volgt betalingen op, signaleert fouten en bewaakt deadlines",
      "Je zorgt voor een correcte uitbetaling van de geleverde prestaties",
      "Je bent het aanspreekpunt voor administratieve vragen van collega's en zelfstandige verpleegkundigen",
      "Je ondersteunt in documentenbeheer, afsprakenbeheer en interne communicatie",
      "Je beheert en actualiseert het klanten-systeem en bewaakt dat data volledig en correct is",
      "Je verzamelt kwaliteitsdata en zet die om in heldere, bruikbare rapporten",
      "Je signaleert kwaliteitsafwijkingen en ondersteunt verbeteracties",
      "Je analyseert bestaande processen en brengt verbeterpunten in kaart",
      "Je zet bestaande processen om in duidelijke werkinstructies en handleidingen die efficiëntie en uniformiteit garanderen",
    ],
    profile: [
      "Je hebt kennis van en bent vertrouwd met alle aspecten van (thuis)verpleging",
      "Je hebt aantoonbare ervaring in officemanagement en/of kwaliteitsopvolging",
      "Je bent communicatief sterk en bent vlot in de omgang",
      "Je werkt gestructureerd en nauwkeurig",
      "Je haalt energie uit efficiëntie, duidelijkheid en gestroomlijnde processen en begrijpt dat sterke administratie een fundament is voor goede ondersteuning van zorgverstrekkers",
      "Je bent digitaal vaardig en vindt snel je weg in nieuwe systemen, Excel en rapporteringstools",
    ],
    offer: [
      "Flexibiliteit in je takenpakket op basis van je expertise",
      "Werknemersvorm, verloning en tewerkstellingsgraad zijn te bespreken - deze functie kan uitgevoerd worden als loontrekkende of zelfstandige",
      "Een functie met betekenis in een groeiend zorgplatform",
      "Een rol met veel autonomie en impact",
      "Een warm en gedreven team dat inzet op samenwerking, groei en innovatie",
      "Hybride werken: 3 dagen thuiswerk per week en 2 dagen op het kantoor in Gent",
      "Coaching en opleiding op maat om te groeien op persoonlijk en professioneel vlak",
      "Opleidings- en groeikansen, inclusief sectorgerichte kennisontwikkeling",
    ],
    baseSalary: { min: 3500, max: 5000, unit: "MONTH" },
    datePosted: "2026-04-01",
    validThrough: "2026-12-31",
  },
  {
    id: "praktijkcoach",
    title: "Praktijkcoach",
    tagline: "Word jij de motor achter sterke zelfstandige verpleegkundigen?",
    active: true,
    locality: "Gent",
    region: "Vlaanderen",
    metaTitle: "Vacature praktijkcoach thuisverpleging | Werken bij Hezo",
    metaDescription:
      "Word praktijkcoach bij Hezo en begeleid zelfstandige thuisverpleegkundigen in heel Vlaanderen. Coachen, verbinden en mee bouwen aan de zorg van de toekomst.",
    description:
      "Hezo, het netwerk van zelfstandige verpleegkundigen met ondersteuning van Helan - Welzijnsgroep, groeit snel. Daarom zoeken we een praktijkcoach die onze praktijkcoördinatoren en startende zelfstandigen begeleidt, inspireert en ondersteunt.",
    responsibilities: [
      "Je bent het eerste en vaste aanspreekpunt voor onze aangesloten verpleegkundigen en bouwt een vertrouwensrelatie op",
      "Met jouw ervaring en coachende stijl help je hen groeien - persoonlijk, professioneel en strategisch",
      "Je luistert, adviseert en brengt mensen samen",
      "Je volgt de evoluties in de zorgsector op de voet en vertaalt ze naar concrete tips en oplossingen",
      "Je capteert signalen uit het werkveld en vertaalt die naar suggesties voor de organisatie",
      "Je werkt actief mee aan interne projecten rond opleiding, kwaliteit en innovatie",
    ],
    profile: [
      "Je hebt een diploma verpleegkunde en ervaring als zelfstandige thuisverpleegkundige",
      "Je bent nieuwsgierig, communicatief en oplossingsgericht",
      "Je kent de regelgeving (nomenclatuur, kwaliteitswet, boekhouding) of wil die snel leren",
      "Je werkt zelfstandig, maar voelt je thuis in een team dat samen vooruit wil",
      "Je houdt van coachen en verbinden - mensen voelen zich op hun gemak bij jou",
    ],
    offer: [
      "Een betekenisvolle rol in een vernieuwend project binnen Helan – Welzijnsgroep",
      "Veel autonomie en ruimte om mee te bouwen aan de toekomst van Hezo",
      "Vorming en groeikansen - ook voor jezelf",
      "Een warm, mensgericht team waar samenwerking centraal staat",
      "Marktconforme verloning en voordelen via Helan",
    ],
    baseSalary: { min: 4000, max: 6000, unit: "MONTH" },
    datePosted: "2026-04-01",
    validThrough: "2026-12-31",
  },
];

export const activeVacatures = vacatures.filter((v) => v.active);

export function getVacatureBySlug(slug: string): Vacature | undefined {
  return vacatures.find((v) => v.id === slug);
}
