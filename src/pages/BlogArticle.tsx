import { useParams, Link, Navigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { blogArticles } from "./Blog";
import TableOfContents from "@/components/blog/TableOfContents";
import BlogHeroImage from "@/components/blog/BlogHeroImage";
import blogHeroSoftware from "@/assets/blog-hero-software.png";
import blogHeroPatienten from "@/assets/blog-hero-patienten.png";
import blogHeroAdministratie from "@/assets/blog-hero-administratie.png";
import blogHeroZelfstandig from "@/assets/blog-hero-zelfstandig.png";
import blogHeroHbo5 from "@/assets/blog-hero-hbo5.png";
import blogHeroBalans from "@/assets/blog-hero-balans.png";

// Full article content - add content for each article ID
const articleContent: Record<string, {
  content: React.ReactNode;
  cta?: React.ReactNode;
  heroImage?: string;
  headings: { id: string; label: string }[];
}> = {
  "werk-privebalans-thuisverpleegkundige": {
    heroImage: blogHeroBalans,
    headings: [
      { id: "waarom-moeilijk", label: "Waarom werk-privébalans zo moeilijk is" },
      { id: "niet-de-zorg", label: "Het probleem zit niet in de zorg zelf" },
      { id: "herkenbare-patronen", label: "Herkenbare patronen" },
      { id: "concrete-strategieen", label: "Concrete strategieën" },
      { id: "samenwerking-continuiteit", label: "Samenwerking en continuïteit" },
      { id: "grenzen-stellen", label: "Grenzen stellen als zelfstandige" },
    ],
    content: (
      <>
        <p className="lead">
          De werkdruk in de thuisverpleging neemt toe. Patiënten worden sneller ontslagen uit het ziekenhuis, zorg wordt complexer en de administratieve lasten blijven groeien.
        </p>
        <p>
          Voor zelfstandige thuisverpleegkundigen betekent dit vaak lange dagen, weinig voorspelbaarheid en een moeilijke balans tussen werk en privé. Toch ligt de oplossing niet in minder werken, maar in anders organiseren.
        </p>

        <h2 id="waarom-moeilijk">Waarom werk-privébalans zo moeilijk is in de thuisverpleging</h2>
        <p>Veel verpleegkundigen starten zelfstandig met de verwachting meer vrijheid te hebben. In de praktijk ervaren velen het tegenovergestelde.</p>
        <p>De oorzaken zijn specifiek voor het beroep:</p>
        <ul>
          <li><strong>Vroege ochtenden, onregelmatige uren:</strong> insuline-rondes starten vaak om 7u, avondrondes eindigen laat. Weekends zijn zelden volledig vrij.</li>
          <li><strong>Onvoorspelbare zorgvragen:</strong> een patiënt die valt, een wondzorg die verslechtert, een ontslag uit het ziekenhuis op vrijdagavond — je agenda wordt voortdurend verstoord.</li>
          <li><strong>Geen duidelijk "einde" van de werkdag:</strong> na je laatste patiënt volgen er nog <Link to="/blog/administratie-thuisverpleging/" className="text-secondary hover:underline">registraties, facturatie en administratie</Link>.</li>
          <li><strong>Emotionele belasting:</strong> palliatieve zorg, eenzame ouderen, moeilijke familiesituaties — dat neem je mee naar huis, ook als je dat niet wil.</li>
        </ul>

        <h2 id="niet-de-zorg">Het probleem zit vaak niet in de zorg zelf</h2>
        <p>Wat veel verpleegkundigen herkennen: de zorgmomenten zelf geven energie. Het is alles errond dat energie vreet.</p>
        <ul>
          <li>Avonden besteden aan het uitzoeken van <Link to="/blog/software-thuisverpleging/" className="text-secondary hover:underline">software</Link> die niet doet wat je verwacht</li>
          <li>Weekenden waarop je facturen probeert te corrigeren</li>
          <li>Telefoontjes van patiënten of hun familie op je vrije dag</li>
          <li>Het gevoel dat je altijd "aan" staat</li>
        </ul>
        <p>
          Uit onderzoek van het Federaal Kenniscentrum voor de Gezondheidszorg (KCE) blijkt dat de administratieve last een van de belangrijkste redenen is waarom verpleegkundigen het beroep verlaten. Het is dus niet de zorg die mensen doet afhaken, maar de randvoorwaarden.
        </p>

        <h2 id="herkenbare-patronen">Herkenbare patronen bij zelfstandige thuisverpleegkundigen</h2>
        <p>Bepaalde patronen komen opvallend vaak terug:</p>
        <ul>
          <li><strong>"Ik doe het vanavond wel"</strong> — administratie uitstellen tot &apos;s avonds zorgt voor een structureel slaaptekort.</li>
          <li><strong>"Ik kan die patiënt niet weigeren"</strong> — steeds meer zorgvragen aannemen zonder je ronde aan te passen leidt tot overbelasting.</li>
          <li><strong>"Ik regel het zelf wel"</strong> — alles alleen willen doen (administratie, planning, vervanging, materiaal) maakt het onhoudbaar op lange termijn.</li>
          <li><strong>"Ik neem volgende maand wel vakantie"</strong> — uitstelgedrag rond rust, omdat er altijd wel een reden is om door te gaan.</li>
        </ul>
        <p>
          Deze patronen zijn begrijpelijk. Thuisverpleegkundigen zijn betrokken mensen die moeilijk nee zeggen. Maar ze zijn niet houdbaar.
        </p>

        <h2 id="concrete-strategieen">Concrete strategieën voor meer balans</h2>

        <h3>1. Scheid registratie van vrije tijd</h3>
        <p>
          Registreer je prestaties onmiddellijk na elk zorgmoment — niet &apos;s avonds. Dat kost 2 minuten per patiënt, maar bespaart je een uur facturatiewerk aan het einde van de dag. De meeste <Link to="/blog/software-thuisverpleging/" className="text-secondary hover:underline">softwarepakketten</Link> hebben een mobiele app waarmee je dit onderweg kan doen.
        </p>

        <h3>2. Plan vaste blokken voor administratie</h3>
        <p>
          Blokkeer wekelijks een vast moment voor facturatie en administratieve opvolging. Bijvoorbeeld elke woensdag tussen 14u en 16u. Behandel dat blok als een afspraak die je niet verzet.
        </p>

        <h3>3. Stel grenzen rond bereikbaarheid</h3>
        <p>
          Gebruik een apart werknummer of zet je telefoon op "niet storen" buiten werkuren. Communiceer aan patiënten en hun familie wanneer je bereikbaar bent — de meeste mensen respecteren dat als je het duidelijk maakt.
        </p>

        <h3>4. Organiseer vervanging structureel</h3>
        <p>
          Veel zelfstandige verpleegkundigen hebben geen vervangingsregeling. Dat betekent dat vakantie of ziekte altijd stress oplevert. Spreek met een collega af om elkaars patiënten op te vangen wanneer nodig.
        </p>

        <h3>5. Optimaliseer je ronde</h3>
        <p>
          Een efficiënte ronde bespaart niet alleen brandstof, maar ook tijd en energie. Groepeer patiënten per wijk, vermijd onnodige omwegen en durf "nee" te zeggen tegen een patiënt die geografisch niet in je ronde past.
        </p>

        <h2 id="samenwerking-continuiteit">Samenwerking als sleutel tot continuïteit</h2>
        <p>
          Alleen werken als zelfstandige thuisverpleegkundige is perfect mogelijk, maar het brengt risico's mee voor je balans. Wie samenwerkt — in welke vorm dan ook — kan:
        </p>
        <ul>
          <li>Weekends en feestdagen verdelen</li>
          <li>Bij ziekte of vakantie op iemand terugvallen</li>
          <li>Ervaringen en kennis uitwisselen</li>
          <li>Administratieve taken verdelen of uitbesteden</li>
        </ul>
        <p>
          Samenwerken hoeft niet te betekenen dat je je autonomie opgeeft. Het kan net het verschil maken tussen duurzaam werken en na een paar jaar opgebrand zijn.
        </p>

        <h2 id="grenzen-stellen">Grenzen stellen als zelfstandige: het is professioneel, niet egoïstisch</h2>
        <p>
          Veel thuisverpleegkundigen voelen schuld wanneer ze grenzen stellen. "Mijn patiënt heeft me nodig" is een gedachte die weinig ruimte laat voor eigen noden.
        </p>
        <p>
          Maar de realiteit is: een verpleegkundige die uitgeput is, levert slechtere zorg. Grenzen stellen is geen gebrek aan betrokkenheid — het is een voorwaarde om goede zorg vol te houden.
        </p>

        <div className="my-8 p-6 bg-green/10 border-l-4 border-green rounded-r-lg">
          <p className="text-primary text-lg font-medium mb-0">
            Werk-privébalans in de thuisverpleging is geen evidentie. Maar het is ook geen toeval. Het is het resultaat van hoe je je werk organiseert — en welke keuzes je durft maken.
          </p>
        </div>
      </>
    ),
    cta: (
      <div className="mt-12 p-8 bg-muted rounded-2xl">
        <h3 className="text-xl font-semibold text-primary mb-2">
          Meer ruimte voor evenwicht?
        </h3>
        <p className="text-muted-foreground mb-4">
          Hezo ondersteunt zelfstandige thuisverpleegkundigen zodat je meer tijd overhoudt voor wat echt telt.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/onze-diensten/"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
          >
            Ontdek onze diensten
          </Link>
          <Link
            to="/contact/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Neem contact op
          </Link>
        </div>
      </div>
    ),
  },
  "software-thuisverpleging": {
    heroImage: blogHeroSoftware,
    headings: [
      { id: "waarvoor-software", label: "Waarvoor gebruik je software?" },
      { id: "gehomologeerde-pakketten", label: "Gehomologeerde softwarepakketten" },
      { id: "mycarenet", label: "MyCareNet en eHealth" },
      { id: "registratie-facturatie", label: "Van registratie tot facturatie" },
      { id: "veelgemaakte-fouten", label: "Veelgemaakte fouten" },
      { id: "juiste-software-kiezen", label: "Hoe kies je de juiste software?" },
    ],
    content: (
      <>
        <p className="lead">
          Als zelfstandige thuisverpleegkundige werk je dagelijks met software — voor registratie, facturatie, planning en communicatie. De juiste software maakt het verschil tussen vlot werken en uren verliezen aan correcties.
        </p>
        <p>
          Toch is het aanbod onoverzichtelijk en weten veel verpleegkundigen niet precies waarop ze moeten letten. Dit artikel geeft je een concreet overzicht.
        </p>

        <h2 id="waarvoor-software">Waarvoor gebruik je software in de thuisverpleging?</h2>
        <p>Software in de thuisverpleging is niet één programma, maar een geheel van tools die samenwerken. De belangrijkste functies:</p>
        <ul>
          <li><strong>Registratie van prestaties:</strong> elke verpleegkundige handeling moet geregistreerd worden met de juiste RIZIV-nomenclatuurcode. Dit vormt de basis voor je facturatie.</li>
          <li><strong>Facturatie via derdebetalersregeling:</strong> de meeste prestaties worden rechtstreeks gefactureerd aan het ziekenfonds van de patiënt, niet aan de patiënt zelf.</li>
          <li><strong>Patiëntendossiers:</strong> zorgplannen, voorschriften, contactgegevens en medische gegevens bijhouden.</li>
          <li><strong>Planning en routebeheer:</strong> patiëntenrondes efficiënt organiseren, rekening houdend met regio en tijdstippen.</li>
          <li><strong>Communicatie:</strong> elektronische uitwisseling van gegevens met artsen, ziekenhuizen en mutualiteiten.</li>
        </ul>

        <h2 id="gehomologeerde-pakketten">Gehomologeerde softwarepakketten: wat betekent dat?</h2>
        <p>
          Niet zomaar elk programma mag gebruikt worden voor facturatie in de thuisverpleging. Software moet <strong>gehomologeerd</strong> zijn door het RIZIV. Dat betekent dat het pakket voldoet aan wettelijke vereisten rond elektronische facturatie, gegevensuitwisseling en beveiliging.
        </p>
        <p>Enkele bekende gehomologeerde pakketten in Vlaanderen:</p>
        <ul>
          <li><strong>Babelway (vroeger CareConnect)</strong> — veel gebruikt, uitgebreide functies voor planning en facturatie</li>
          <li><strong>Nona</strong> — populair bij kleinere praktijken, gebruiksvriendelijke interface</li>
          <li><strong>Soft4Care</strong> — modulair opgebouwd, geschikt voor grotere samenwerkingen</li>
          <li><strong>KiMo</strong> — gericht op thuisverpleging met geïntegreerde mobiele app</li>
        </ul>
        <p>
          De lijst van gehomologeerde pakketten wordt bijgehouden door het RIZIV en is publiek raadpleegbaar. Het is belangrijk om te kiezen uit deze lijst — anders kan je niet correct factureren.
        </p>

        <h2 id="mycarenet">MyCareNet en het eHealth-platform</h2>
        <p>
          MyCareNet is het digitale platform waarmee je als verpleegkundige communiceert met de ziekenfondsen. Via MyCareNet verloopt:
        </p>
        <ul>
          <li><strong>Facturatie:</strong> facturen worden elektronisch ingediend bij het ziekenfonds van de patiënt</li>
          <li><strong>Raadpleging verzekerbaarheid:</strong> je kan checken of een patiënt in orde is met zijn/haar mutualiteit</li>
          <li><strong>Akkoorden en machtigingen:</strong> bepaalde zorgen vereisen voorafgaande goedkeuring</li>
        </ul>
        <p>
          Daarnaast werkt de thuisverpleging met het <strong>eHealth-platform</strong> voor veilige gegevensuitwisseling. Via de <strong>eHealthBox</strong> ontvang je elektronische voorschriften van artsen en kan je communiceren met andere zorgverleners.
        </p>
        <p>
          Je softwarepakket moet geïntegreerd zijn met MyCareNet en het eHealth-platform. Zonder die koppeling kan je niet factureren en geen digitale voorschriften ontvangen.
        </p>

        <h2 id="registratie-facturatie">Van registratie tot facturatie: hoe werkt het concreet?</h2>
        <p>Het facturatieproces in de thuisverpleging volgt een vaste flow:</p>
        <ol>
          <li><strong>Arts schrijft zorg voor</strong> — via papieren of elektronisch voorschrift</li>
          <li><strong>Je registreert de prestatie</strong> — met de juiste nomenclatuurcode (bv. toiletzorg, wondzorg, insuline-injectie)</li>
          <li><strong>Software genereert de factuur</strong> — op basis van de geregistreerde codes en het ziekenfonds van de patiënt</li>
          <li><strong>Factuur wordt verstuurd via MyCareNet</strong> — elektronisch naar het ziekenfonds</li>
          <li><strong>Ziekenfonds betaalt uit</strong> — meestal binnen 30 dagen</li>
        </ol>
        <p>
          Bij de <strong>derdebetalersregeling</strong> betaalt de patiënt niets of enkel het remgeld. Het ziekenfonds vergoedt het grootste deel rechtstreeks aan jou. Dit is de standaard in de thuisverpleging. Lees meer over het volledige <Link to="/blog/administratie-thuisverpleging/" className="text-secondary hover:underline">administratie- en facturatieproces</Link>.
        </p>

        <h2 id="veelgemaakte-fouten">Veelgemaakte fouten bij software en registratie</h2>
        <p>In de praktijk gaan veel verpleegkundigen — zeker bij de opstart — de mist in met registratie en facturatie:</p>
        <ul>
          <li><strong>Verkeerde nomenclatuurcode:</strong> een toilet met bijkomende technische prestatie vereist een andere code dan een gewone toilet. Een verkeerde code betekent een geweigerde factuur.</li>
          <li><strong>Ontbrekend of verlopen voorschrift:</strong> zonder geldig voorschrift mag je bepaalde prestaties niet aanrekenen.</li>
          <li><strong>Niet-tijdig factureren:</strong> facturen moeten binnen een bepaalde termijn ingediend worden. Te laat = niet meer terugbetaald.</li>
          <li><strong>Software niet up-to-date:</strong> nomenclatuurwijzigingen worden regelmatig doorgevoerd. Als je software niet bijgewerkt is, factureer je mogelijk met verouderde codes.</li>
          <li><strong>Geen backup van gegevens:</strong> bij een crash of diefstal van je toestel ben je alles kwijt als je geen cloud-backup hebt ingesteld.</li>
        </ul>

        <h2 id="juiste-software-kiezen">Hoe kies je de juiste software?</h2>
        <p>Er is geen "beste" pakket — het hangt af van je situatie. Waar je op moet letten:</p>
        <ul>
          <li><strong>Werkt het op jouw toestel?</strong> Sommige pakketten werken enkel op Windows, andere ook op tablet of smartphone.</li>
          <li><strong>Is de helpdesk bereikbaar?</strong> Als je &apos;s avonds factureert en er gaat iets mis, wil je iemand kunnen bereiken.</li>
          <li><strong>Hoe verloopt de overstap?</strong> Migreren van het ene pakket naar het andere is niet altijd eenvoudig. Vraag vooraf hoe dataoverdracht werkt.</li>
          <li><strong>Wat kost het?</strong> De meeste pakketten werken met een maandelijks abonnement (vaak tussen €50 en €150/maand). Let op verborgen kosten voor updates of extra modules.</li>
          <li><strong>Is er een proefperiode?</strong> Test het pakket in je dagelijkse praktijk voordat je je vastlegt.</li>
        </ul>
        <p>
          Vraag ook aan collega-verpleegkundigen in je regio welk pakket zij gebruiken. Praktijkervaring is vaak waardevoller dan een mooie website.
        </p>
      </>
    ),
    cta: (
      <div className="mt-12 p-8 bg-muted rounded-2xl">
        <h3 className="text-xl font-semibold text-primary mb-2">
          Hulp nodig bij software of facturatie?
        </h3>
        <p className="text-muted-foreground mb-4">
          Hezo ondersteunt zelfstandige thuisverpleegkundigen bij het opzetten en correct gebruiken van hun software.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/onze-diensten/"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
          >
            Bekijk onze diensten
          </Link>
          <Link
            to="/contact/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Neem contact op
          </Link>
        </div>
      </div>
    ),
  },
  "patienten-thuisverpleegkundige": {
    heroImage: blogHeroPatienten,
    headings: [
      { id: "hoe-komen-patienten", label: "Hoe komen patiënten bij jou terecht?" },
      { id: "huisartsen-benaderen", label: "Huisartsen benaderen: hoe doe je dat?" },
      { id: "ontslagmanagement", label: "Ontslagmanagement vanuit het ziekenhuis" },
      { id: "stabiele-instroom", label: "Een stabiele instroom opbouwen" },
      { id: "valkuilen", label: "Veelvoorkomende valkuilen" },
      { id: "regio-zichtbaarheid", label: "Zichtbaarheid in je regio" },
    ],
    content: (
      <>
        <p className="lead">
          Goede zorg leveren is één ding. Maar als zelfstandige thuisverpleegkundige heb je ook patiënten nodig. Zeker bij de opstart is dat een van de grootste uitdagingen — en het wordt zelden besproken tijdens de opleiding.
        </p>

        <h2 id="hoe-komen-patienten">Hoe komen patiënten bij een thuisverpleegkundige terecht?</h2>
        <p>Patiënten kiezen zelden zelf een thuisverpleegkundige. In de praktijk verlopen doorverwijzingen bijna altijd via tussenpersonen:</p>
        <ul>
          <li><strong>Huisartsen</strong> schrijven thuisverpleging voor en verwijzen door naar verpleegkundigen die ze kennen en vertrouwen.</li>
          <li><strong>Ziekenhuizen</strong> organiseren de thuiszorg bij ontslag via hun dienst ontslagmanagement of sociale dienst.</li>
          <li><strong>Thuiszorgcoördinatoren</strong> en maatschappelijk werkers koppelen zorgvragen aan beschikbare verpleegkundigen.</li>
          <li><strong>Bestaande patiënten of hun familie</strong> bevelen je aan bij buren, kennissen of andere patiënten in de buurt.</li>
          <li><strong>Apotheken en kinesisten</strong> in je regio komen regelmatig in contact met mensen die thuisverpleging nodig hebben.</li>
        </ul>
        <p>
          Het systeem werkt dus grotendeels op <strong>vertrouwen en netwerk</strong>. Wie jou niet kent, verwijst niet door.
        </p>

        <h2 id="huisartsen-benaderen">Huisartsen benaderen: hoe doe je dat concreet?</h2>
        <p>
          Huisartsen zijn veruit je belangrijkste bron van doorverwijzingen. Maar hoe leg je dat eerste contact?
        </p>
        <ul>
          <li><strong>Ga langs in de praktijk</strong> — niet bellen of mailen, maar persoonlijk voorstellen. Neem een kort visitekaartje of flyer mee met je naam, contactgegevens, regio en beschikbaarheid.</li>
          <li><strong>Kies het juiste moment:</strong> ga niet tijdens het spreekuur langs. Vraag aan de receptie wanneer de arts even tijd heeft, of laat je gegevens achter.</li>
          <li><strong>Wees concreet:</strong> vertel welke zorg je aanbiedt (wondzorg, diabeteszorg, palliatieve zorg, toiletten…), in welke regio je werkt en wanneer je beschikbaar bent.</li>
          <li><strong>Volg op:</strong> een eerste bezoek is een begin. Onderhoud het contact door regelmatig kort langs te gaan of een update te geven over gedeelde patiënten.</li>
        </ul>
        <p>
          Eén goede huisarts die je vertrouwt, kan voor een constante stroom van zorgvragen zorgen. Maar dat vertrouwen bouw je op door <strong>betrouwbaar, bereikbaar en professioneel</strong> te zijn — niet door één keer je kaartje af te geven.
        </p>

        <h2 id="ontslagmanagement">Ontslagmanagement vanuit het ziekenhuis</h2>
        <p>
          Wanneer een patiënt het ziekenhuis verlaat en thuis verpleegkundige zorg nodig heeft, organiseert de <strong>dienst ontslagmanagement</strong> of de sociale dienst de verdere opvolging. Die dienst zoekt een thuisverpleegkundige in de regio van de patiënt.
        </p>
        <p>Hoe zorg je dat zij aan jou denken?</p>
        <ul>
          <li>Neem contact op met de diensten ontslagmanagement van ziekenhuizen in je regio.</li>
          <li>Geef duidelijk je beschikbaarheid, regio en specialisaties door.</li>
          <li>Reageer snel wanneer je een zorgvraag ontvangt — snelheid telt enorm in dit proces.</li>
          <li>Geef feedback na opstart van de zorg, zodat het ziekenhuis weet dat de patiënt goed opgevangen wordt.</li>
        </ul>
        <p>
          Ziekenhuizen werken vaak met vaste lijsten van verpleegkundigen. Eenmaal je op die lijst staat en betrouwbaar blijkt, krijg je regelmatig zorgvragen.
        </p>

        <h2 id="stabiele-instroom">Een stabiele instroom opbouwen: het duurt even</h2>
        <p>
          De realiteit is dat het opbouwen van een voldoende groot patiëntenbestand <strong>minstens 6 tot 12 maanden</strong> duurt. In het begin heb je mogelijk dagen met weinig of geen rondes, afgewisseld met drukkere periodes.
        </p>
        <p>Wat helpt bij het opbouwen:</p>
        <ul>
          <li><strong>Consequent netwerken:</strong> niet één keer, maar structureel contact onderhouden met doorverwijzers.</li>
          <li><strong>Breed starten:</strong> accepteer in het begin ook patiënten die wat verder weg wonen of minder courante zorg nodig hebben. Je kan je ronde later optimaliseren.</li>
          <li><strong>Beschikbaar zijn:</strong> wie snel reageert op een zorgvraag, krijgt de patiënt. Wie een dag later terugbelt, niet.</li>
          <li><strong>Weekendwerk niet uitsluiten:</strong> veel starters bouwen sneller op door ook in het weekend beschikbaar te zijn.</li>
        </ul>

        <h2 id="valkuilen">Veelvoorkomende valkuilen</h2>
        <ul>
          <li><strong>Te passief wachten:</strong> patiënten komen niet vanzelf. Je moet actief investeren in je netwerk, zeker in de eerste jaren.</li>
          <li><strong>Enkel focussen op één doorverwijzer:</strong> als die arts met pensioen gaat of je uit het oog verliest, droogt je instroom op.</li>
          <li><strong>Niet reageren op weekend- of avondvragen:</strong> veel zorgvragen ontstaan bij een ontslag op vrijdag. Wie dan niet beschikbaar is, mist die patiënt.</li>
          <li><strong>Geen opvolging doen:</strong> een goede relatie met doorverwijzers vraagt onderhoud. Een jaarlijks bezoekje is niet genoeg.</li>
          <li><strong>Onderschatten hoeveel tijd het kost:</strong> netwerken en opvolging doen kost tijd bovenop je <Link to="/blog/administratie-thuisverpleging/" className="text-secondary hover:underline">administratie</Link> en zorgmomenten.</li>
        </ul>

        <h2 id="regio-zichtbaarheid">Zichtbaarheid in je regio</h2>
        <p>
          Naast directe contacten met artsen en ziekenhuizen kan je ook breder zichtbaar worden in je werkgebied:
        </p>
        <ul>
          <li><strong>Lokale zorgnetwerken:</strong> in veel regio&apos;s bestaan overlegmomenten tussen huisartsen, thuisverpleegkundigen, kinesisten en apothekers. Neem eraan deel.</li>
          <li><strong>Multidisciplinair overleg (MDO):</strong> bij complexe patiënten wordt soms een MDO georganiseerd. Daar leer je andere zorgverleners kennen.</li>
          <li><strong>Palliatieve netwerken:</strong> als je palliatieve zorg aanbiedt, sluit je aan bij het palliatief netwerk van je regio. Dat levert niet alleen kennis op, maar ook doorverwijzingen.</li>
          <li><strong>Mond-aan-mondreclame:</strong> onderschat dit niet. Tevreden patiënten vertellen het aan hun huisarts, buren en familie.</li>
        </ul>
      </>
    ),
    cta: (
      <div className="mt-12 p-8 bg-muted rounded-2xl">
        <h3 className="text-xl font-semibold text-primary mb-2">
          Ondersteuning bij je patiënteninstroom?
        </h3>
        <p className="text-muted-foreground mb-4">
          Hezo helpt zelfstandige thuisverpleegkundigen met een stabiele instroom van zorgvragen, afgestemd op je regio en beschikbaarheid.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/onze-diensten/"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
          >
            Bekijk onze diensten
          </Link>
          <Link
            to="/contact/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Neem contact op
          </Link>
        </div>
      </div>
    ),
  },
  "administratie-thuisverpleging": {
    heroImage: blogHeroAdministratie,
    headings: [
      { id: "wat-omvat-administratie", label: "Wat omvat administratie concreet?" },
      { id: "nomenclatuur", label: "Nomenclatuur en RIZIV-codes" },
      { id: "facturatieproces", label: "Het facturatieproces stap voor stap" },
      { id: "derdebetalersregeling", label: "De derdebetalersregeling uitgelegd" },
      { id: "veelgemaakte-fouten", label: "Veelgemaakte fouten" },
      { id: "efficienter-organiseren", label: "Praktische tips" },
    ],
    content: (
      <>
        <p className="lead">
          Administratie is een van de meest onderschatte aspecten van werken als zelfstandige thuisverpleegkundige. Veel starters zijn verrast door hoeveel tijd het in beslag neemt — en hoe complex het kan zijn.
        </p>
        <p>
          Dit artikel geeft je een concreet overzicht van wat er allemaal bij komt kijken, van nomenclatuur tot facturatie, en hoe je veelgemaakte fouten vermijdt.
        </p>

        <h2 id="wat-omvat-administratie">Wat omvat administratie in de thuisverpleging concreet?</h2>
        <p>Administratie in de thuisverpleging is veel breder dan "papierwerk". Het omvat onder andere:</p>
        <ul>
          <li><strong>Registratie van prestaties:</strong> elke handeling die je uitvoert, moet geregistreerd worden met de juiste code uit de RIZIV-nomenclatuur.</li>
          <li><strong>Facturatie:</strong> het opmaken en elektronisch versturen van facturen naar de ziekenfondsen via MyCareNet.</li>
          <li><strong>Voorschriften beheren:</strong> bijhouden welke voorschriften geldig zijn, wanneer ze verlopen en of er vernieuwing nodig is.</li>
          <li><strong>Patiëntendossiers:</strong> zorgplannen opstellen, aanpassen en bijhouden conform de wettelijke vereisten.</li>
          <li><strong>Communicatie met ziekenfondsen:</strong> opvolging van betalingen, weigeringen, correcties en bezwaren.</li>
          <li><strong>Financiële administratie:</strong> inkomsten en uitgaven bijhouden, btw-aangiftes (bij vennootschap), kwartaalaangiftes bij het sociaal verzekeringsfonds.</li>
          <li><strong>Wettelijke verplichtingen:</strong> jaarlijkse activiteitenverslagen, RIZIV-mededelingen opvolgen, accreditering bijhouden.</li>
        </ul>

        <h2 id="nomenclatuur">Nomenclatuur en RIZIV-codes: de basis begrijpen</h2>
        <p>
          De <strong>nomenclatuur van de verpleegkundige verstrekkingen</strong> is de officiële lijst die bepaalt welke prestaties je mag aanrekenen en aan welk tarief. Het is de ruggengraat van je facturatie.
        </p>
        <p>De nomenclatuur is opgedeeld in categorieën:</p>
        <ul>
          <li><strong>Toiletten (W-waarden):</strong> basisverpleegkundige hygiënische verzorging. De vergoeding hangt af van de afhankelijkheidsgraad van de patiënt, bepaald via de Katz-schaal.</li>
          <li><strong>Technische prestaties:</strong> wondzorg, injecties, sondevoeding, stomazorg, bloedafname en meer.</li>
          <li><strong>Forfaits:</strong> vaste vergoedingen voor bepaalde zorgsituaties, bv. palliatief forfait of forfait chronisch zieken.</li>
          <li><strong>Specifieke verstrekkingen:</strong> bv. insuline-injecties, compressietherapie, complexe wondzorg.</li>
        </ul>
        <p>
          De <strong>Katz-schaal</strong> is bijzonder belangrijk: die bepaalt de afhankelijkheidscategorie van een patiënt (A, B, C of Cd) en dus hoeveel je vergoed krijgt per toilet. Een verkeerde inschatting heeft directe impact op je inkomsten.
        </p>

        <h2 id="facturatieproces">Het facturatieproces stap voor stap</h2>
        <ol>
          <li><strong>Voorschrift ontvangen:</strong> een arts schrijft thuisverpleging voor. Dit kan op papier of elektronisch via eHealthBox.</li>
          <li><strong>Verzekerbaarheid checken:</strong> via <Link to="/blog/software-thuisverpleging/" className="text-secondary hover:underline">MyCareNet</Link> controleer je of de patiënt in orde is met zijn/haar ziekenfonds.</li>
          <li><strong>Prestaties registreren:</strong> na elk zorgmoment registreer je de uitgevoerde handeling met de juiste nomenclatuurcode in je software.</li>
          <li><strong>Factuur genereren:</strong> je software bundelt de geregistreerde prestaties en maakt een elektronische factuur aan.</li>
          <li><strong>Factuur indienen via MyCareNet:</strong> de factuur wordt digitaal verstuurd naar het ziekenfonds.</li>
          <li><strong>Betaling opvolgen:</strong> het ziekenfonds verwerkt de factuur en betaalt uit, meestal binnen 30 dagen. Bij weigeringen of fouten krijg je een feedbackbericht.</li>
        </ol>

        <h2 id="derdebetalersregeling">De derdebetalersregeling: hoe werkt het?</h2>
        <p>
          In de thuisverpleging is de <strong>derdebetalersregeling</strong> de standaard. Dat betekent dat je als verpleegkundige rechtstreeks vergoed wordt door het ziekenfonds, en dat de patiënt niets of enkel een beperkt remgeld betaalt.
        </p>
        <p>Concreet:</p>
        <ul>
          <li>Je factureert aan het ziekenfonds, niet aan de patiënt.</li>
          <li>Het ziekenfonds betaalt het RIZIV-tarief aan jou.</li>
          <li>De patiënt betaalt het wettelijk persoonlijk aandeel (remgeld), tenzij die recht heeft op een verhoogde tegemoetkoming.</li>
          <li>Bij patiënten met verhoogde tegemoetkoming (OMNIO/BIM-statuut) is het remgeld lager of onbestaand.</li>
        </ul>
        <p>
          Het correct toepassen van de derdebetalersregeling vereist dat je voor elke patiënt de verzekerbaarheid controleert en het juiste tarief toepast.
        </p>

        <h2 id="veelgemaakte-fouten">Veelgemaakte fouten bij administratie en facturatie</h2>
        <ul>
          <li><strong>Verkeerde Katz-score:</strong> als de afhankelijkheidsgraad niet correct bepaald is, factureer je te veel of te weinig. Bij controle kan dit leiden tot terugvorderingen.</li>
          <li><strong>Verlopen voorschrift:</strong> een voorschrift heeft een beperkte geldigheidsduur. Factureren zonder geldig voorschrift betekent dat het ziekenfonds de factuur weigert.</li>
          <li><strong>Dubbele facturatie:</strong> per ongeluk twee keer dezelfde prestatie registreren komt vaker voor dan je denkt, zeker bij drukke dagen.</li>
          <li><strong>Te laat factureren:</strong> hoe langer je wacht, hoe groter de kans op fouten en hoe later je betaald wordt. Factureer liefst wekelijks of tweewekelijks.</li>
          <li><strong>Feedbackberichten negeren:</strong> wanneer een factuur geweigerd wordt door het ziekenfonds, krijg je een feedbackbericht. Veel verpleegkundigen laten die liggen, waardoor geld verloren gaat.</li>
          <li><strong>Geen scheiding werk/privé in financiën:</strong> gebruik een aparte bankrekening voor je praktijk. Dat maakt je boekhouding overzichtelijker en voorkomt problemen bij controle.</li>
        </ul>

        <h2 id="efficienter-organiseren">Praktische tips om efficiënter te werken</h2>
        <ul>
          <li><strong>Registreer onmiddellijk:</strong> doe je registratie meteen na het zorgmoment, niet &apos;s avonds. Je onthoudt de details beter en het hoopt niet op.</li>
          <li><strong>Factureer regelmatig:</strong> stel een vast moment in per week om te factureren. Dat voorkomt een berg aan het einde van de maand.</li>
          <li><strong>Houd je voorschriften bij:</strong> maak een systeem (digitaal of fysiek) om te weten welke voorschriften verlopen en wanneer je vernieuwing moet vragen aan de arts.</li>
          <li><strong>Controleer je feedbackberichten:</strong> neem wekelijks de feedbackberichten van de ziekenfondsen door en corrigeer geweigerde facturen zo snel mogelijk.</li>
          <li><strong>Werk samen met een boekhouder:</strong> zeker als je met een vennootschap werkt, is een boekhouder die ervaring heeft met zorgberoepen een aanrader.</li>
        </ul>
      </>
    ),
    cta: (
      <div className="mt-12 p-8 bg-muted rounded-2xl">
        <h3 className="text-xl font-semibold text-primary mb-2">
          Administratie uit handen geven?
        </h3>
        <p className="text-muted-foreground mb-4">
          Hezo ondersteunt zelfstandige thuisverpleegkundigen bij administratie, facturatie en dagelijkse opvolging.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/onze-diensten/"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
          >
            Bekijk onze diensten
          </Link>
          <Link
            to="/contact/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Neem contact op
          </Link>
        </div>
      </div>
    ),
  },
  "software-thuisverpleging": {
    heroImage: blogHeroSoftware,
    headings: [
      { id: "waarvoor-software", label: "Waarvoor gebruik je software?" },
      { id: "welke-software", label: "Welke software bestaat er?" },
      { id: "waar-loopt-het-moeilijk", label: "Waar loopt het vaak moeilijk?" },
      { id: "meer-dan-tool", label: "Waarom software meer is dan een tool" },
      { id: "juiste-software-kiezen", label: "Hoe kies je de juiste software?" },
      { id: "hezo-ondersteuning", label: "Hoe Hezo je ondersteunt" },
    ],
    content: (
      <>
        <p className="lead">
          Als zelfstandige thuisverpleegkundige werk je dagelijks met software. Niet alleen voor <Link to="/blog/administratie-thuisverpleging/" className="text-secondary hover:underline">administratie en facturatie</Link>, maar ook voor registratie, planning en opvolging van zorg.
        </p>
        <p>
          De juiste software maakt je werk efficiënter. Maar in de praktijk merken veel verpleegkundigen dat het kiezen en correct gebruiken ervan niet zo eenvoudig is.
        </p>

        <h2 id="waarvoor-software">Waarvoor gebruik je software in de thuisverpleging?</h2>
        <p>Software speelt een centrale rol in je dagelijkse werking als zelfstandige verpleegkundige.</p>
        <p>Je gebruikt het onder andere voor:</p>
        <ul>
          <li>registratie van prestaties</li>
          <li>facturatie en opvolging</li>
          <li>bijhouden van patiëntendossiers</li>
          <li>communicatie en administratie</li>
          <li>planning en organisatie van zorgmomenten</li>
        </ul>
        <p>Zonder correcte registratie en verwerking kan zorg niet correct gefactureerd worden.</p>

        <h2 id="welke-software">Welke software bestaat er?</h2>
        <p>Er bestaan verschillende softwarepakketten voor thuisverpleegkundigen. Deze moeten voldoen aan bepaalde normen en gehomologeerd zijn om correct te kunnen werken binnen het systeem van de thuisverpleging.</p>
        <p>De verschillen zitten vaak in:</p>
        <ul>
          <li>gebruiksgemak</li>
          <li>snelheid en stabiliteit</li>
          <li>ondersteuning en helpdesk</li>
          <li>mogelijkheden rond rapportering en opvolging</li>
        </ul>
        <p>Wat voor de ene verpleegkundige goed werkt, is niet altijd ideaal voor een andere situatie.</p>

         <h2 id="waar-loopt-het-moeilijk">Waar loopt het vaak moeilijk?</h2>
        <p>Veel zelfstandige verpleegkundigen botsen op gelijkaardige problemen:</p>
        <ul>
          <li>software is niet altijd intuïtief</li>
          <li>fouten in registratie zijn moeilijk op te sporen</li>
          <li>facturatie verloopt niet altijd vlot</li>
          <li>je weet niet altijd waar een probleem zit</li>
          <li>contact met helpdesks kost tijd</li>
          <li>je moet zelf uitzoeken hoe alles werkt</li>
        </ul>
        <p>Daardoor gaat er veel tijd verloren aan uitzoeken en corrigeren, in plaats van zorg.</p>

        <h2 id="meer-dan-tool">Waarom software meer is dan een tool</h2>
        <p>Software in de thuisverpleging is geen losstaand element. Het hangt samen met:</p>
        <ul>
          <li>administratie</li>
          <li>facturatie</li>
          <li>regelgeving</li>
          <li>correcte registratie</li>
        </ul>
        <p>Een kleine fout in software kan impact hebben op je facturatie of opvolging. Daarom is het belangrijk dat alles correct ingesteld en gebruikt wordt.</p>

        <h2 id="juiste-software-kiezen">Hoe kies je de juiste software?</h2>
        <p>Bij het kiezen van software is het belangrijk om niet alleen naar functies te kijken, maar ook naar:</p>
        <ul>
          <li>hoe goed het aansluit bij jouw manier van werken</li>
          <li>hoe vlot je ermee kan werken in de praktijk</li>
          <li>welke ondersteuning beschikbaar is</li>
          <li>hoe eenvoudig problemen opgelost kunnen worden</li>
        </ul>
        <p>Veel verpleegkundigen starten met een pakket, maar merken later dat het niet optimaal aansluit bij hun noden.</p>

         <h2 id="hezo-ondersteuning">Hoe Hezo je ondersteunt</h2>
        <p>Hezo ondersteunt zelfstandige thuisverpleegkundigen bij het kiezen, opzetten en gebruiken van software.</p>
        <p>Of je nu alleen werkt of in een praktijk, we zorgen ervoor dat:</p>
        <ul>
          <li>je software correct ingesteld staat</li>
          <li>alles werkt zoals het moet voor registratie en facturatie</li>
          <li>je minder tijd verliest aan uitzoeken en fouten</li>
          <li>je ondersteuning krijgt wanneer er vragen of problemen zijn</li>
        </ul>
        <p>We vertrekken niet vanuit één specifieke software, maar kijken wat het best past bij jouw situatie.</p>
        <p>
          Bekijk ook <Link to="/onze-diensten/#administratie" className="text-secondary hover:underline">hoe Hezo je ondersteunt bij software en administratie</Link> en ontdek hoe we je helpen bij <Link to="/blog/patienten-thuisverpleegkundige/" className="text-secondary hover:underline">patiënteninstroom</Link>.
        </p>
      </>
    ),
    cta: (
      <div className="mt-12 p-8 bg-muted rounded-2xl">
        <h3 className="text-xl font-semibold text-primary mb-2">
          Minder tijd verliezen aan software?
        </h3>
        <p className="text-muted-foreground mb-4">
          Ontdek hoe Hezo je helpt om software, administratie en praktijkvoering beter op elkaar af te stemmen.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/onze-diensten/"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
          >
            Bekijk onze diensten
          </Link>
          <Link
            to="/zo-sluit-je-aan/"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Sluit je aan bij Hezo
          </Link>
        </div>
      </div>
    ),
  },
  "patienten-thuisverpleegkundige": {
    heroImage: blogHeroPatienten,
    headings: [
      { id: "hoe-komen-patienten", label: "Hoe komen patiënten bij een thuisverpleegkundige?" },
      { id: "niet-vanzelf", label: "Waarom patiënten vinden niet vanzelf gaat" },
      { id: "impact-praktijk", label: "De impact op je praktijk" },
      { id: "stabiele-instroom", label: "Hoe bouw je een stabiele patiënteninstroom op?" },
      { id: "waar-moeilijk", label: "Waar loopt het vaak moeilijk?" },
      { id: "combineren-administratie", label: "Waarom combineren met administratie moeilijk is" },
      { id: "hezo-ondersteuning-patienten", label: "Hoe Hezo je hierin ondersteunt" },
    ],
    content: (
      <>
        <p className="lead">
          Als zelfstandige thuisverpleegkundige is het niet alleen belangrijk om goede zorg te leveren, maar ook om voldoende patiënten te hebben.
        </p>
        <p>
          Zeker als zelfstandige thuisverpleegkundige is patiënten vinden een belangrijk onderdeel van je praktijk.
        </p>
        <p>
          Zeker bij de opstart, of wanneer je je praktijk wil uitbreiden, komt vaak dezelfde vraag naar boven: hoe kom je aan patiënten?
        </p>
        <p>
          Nieuwe zorgvragen komen niet vanzelf binnen. Ze komen via verschillende kanalen, en het vraagt tijd en opvolging om een stabiele instroom op te bouwen.
        </p>

        <h2 id="hoe-komen-patienten">Hoe komen patiënten bij een thuisverpleegkundige terecht?</h2>
        <p>In de praktijk ontstaan zorgvragen via verschillende wegen.</p>
        <p>De meest voorkomende zijn:</p>
        <ul>
          <li>doorverwijzingen van huisartsen</li>
          <li>ontslag uit het ziekenhuis</li>
          <li>contacten met andere zorgverleners</li>
          <li>bestaande patiënten die anderen doorverwijzen</li>
          <li>lokale netwerken en samenwerkingen</li>
        </ul>
        <p>Als zelfstandige verpleegkundige bouw je dit netwerk meestal zelf op, stap voor stap.</p>

        <h2 id="niet-vanzelf">Waarom patiënten vinden niet vanzelf gaat</h2>
        <p>Veel zelfstandige verpleegkundigen merken dat patiënteninstroom minder evident is dan verwacht.</p>
        <p>Je moet:</p>
        <ul>
          <li>contacten onderhouden met huisartsen en ziekenhuizen</li>
          <li>bereikbaar en beschikbaar zijn voor nieuwe zorgvragen</li>
          <li>snel reageren op aanvragen</li>
          <li>zelf actief opvolgen</li>
        </ul>
        <p>Dat vraagt tijd en energie, bovenop je zorg, <Link to="/blog/administratie-thuisverpleging/" className="text-secondary hover:underline">administratie</Link> en planning.</p>

        <h2 id="impact-praktijk">De impact op je praktijk</h2>
        <p>Wanneer patiënteninstroom niet stabiel is, heeft dat directe gevolgen:</p>
        <ul>
          <li>je planning is moeilijk te vullen</li>
          <li>je inkomsten zijn minder voorspelbaar</li>
          <li>groei van je praktijk blijft beperkt</li>
          <li>je ervaart onzekerheid</li>
        </ul>
        <p>Zeker bij de opstart of uitbreiding van je activiteit kan dit zwaar doorwegen.</p>

        <h2 id="stabiele-instroom">Hoe bouw je een stabiele patiënteninstroom op?</h2>
        <p>Een stabiele instroom van patiënten ontstaat meestal niet vanzelf. Het is het resultaat van een aantal concrete acties die je consequent uitvoert.</p>
        <p>In de praktijk betekent dat vaak:</p>
        <ul>
          <li>regelmatig contact houden met huisartsen in je regio</li>
          <li>je beschikbaarheid duidelijk communiceren</li>
          <li>snel reageren op nieuwe zorgvragen</li>
          <li>afspraken correct opvolgen</li>
          <li>zichtbaar blijven binnen je lokale netwerk</li>
        </ul>
        <p>Veel verpleegkundigen starten bijvoorbeeld met een aantal huisartsenpraktijken, maar merken dat het onderhouden van die contacten tijd vraagt. Als je dat niet actief doet, vallen zorgvragen snel stil.</p>

        <h2 id="waar-moeilijk">Waar loopt het vaak moeilijk?</h2>
        <p>In de praktijk merken veel zelfstandige verpleegkundigen dat patiënteninstroom moeilijk te sturen is.</p>
        <p>Typische situaties:</p>
        <ul>
          <li>je krijgt plots veel aanvragen, maar daarna een rustige periode</li>
          <li>je weet niet goed waar nieuwe patiënten vandaan komen</li>
          <li>contacten met huisartsen verwateren</li>
          <li>je hebt weinig tijd om actief netwerk op te bouwen</li>
          <li>je reageert te laat op nieuwe zorgvragen</li>
        </ul>
        <p>Dat maakt je planning onvoorspelbaar en zorgt voor onzekerheid.</p>

        <h2 id="combineren-administratie">Waarom het combineren met administratie moeilijk is</h2>
        <p>Wat het extra lastig maakt, is dat patiënteninstroom nooit op zichzelf staat.</p>
        <p>Je moet dit combineren met:</p>
        <ul>
          <li>zorgmomenten</li>
          <li><Link to="/blog/administratie-thuisverpleging/" className="text-secondary hover:underline">administratie en facturatie</Link></li>
          <li>software en registratie</li>
          <li>planning</li>
        </ul>
        <p>Daardoor komt het onderhouden van je netwerk of opvolgen van nieuwe zorgvragen vaak op de tweede plaats.</p>

        <h2 id="hezo-ondersteuning-patienten">Hoe Hezo je hierin ondersteunt</h2>
        <p>Hezo helpt zelfstandige thuisverpleegkundigen om <Link to="/onze-diensten/#instroom" className="text-secondary hover:underline">patiënteninstroom</Link> minder afhankelijk te maken van toevallige contacten.</p>
        <p>In plaats van zelf continu op zoek te moeten gaan naar nieuwe patiënten, krijg je toegang tot zorgvragen en ondersteuning in de opvolging ervan.</p>
        <p>Concreet betekent dat:</p>
        <ul>
          <li>toegang tot nieuwe zorgvragen</li>
          <li>snellere en duidelijkere opvolging</li>
          <li>minder tijdverlies aan organisatie</li>
          <li>een stabielere instroom van patiënten</li>
        </ul>
        <p>Daardoor wordt je planning voorspelbaarder en hoef je minder zelf te investeren in netwerk en opvolging.</p>
      </>
    ),
    cta: (
      <div className="mt-12 p-8 bg-muted rounded-2xl">
        <h3 className="text-xl font-semibold text-primary mb-2">
          Op zoek naar meer patiënten en ondersteuning?
        </h3>
        <p className="text-muted-foreground mb-4">
          Ontdek hoe Hezo je kan helpen om je praktijk verder uit te bouwen en je werk overzichtelijk te houden.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/onze-diensten/"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
          >
            Bekijk onze diensten
          </Link>
          <Link
            to="/zo-sluit-je-aan/"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Sluit je aan bij Hezo
          </Link>
        </div>
      </div>
    ),
  },
  "administratie-thuisverpleging": {
    heroImage: blogHeroAdministratie,
    headings: [
      { id: "wat-omvat-administratie", label: "Wat omvat administratie in de thuisverpleging?" },
      { id: "waarom-zoveel-tijd", label: "Waarom administratie zoveel tijd vraagt" },
      { id: "impact-werk", label: "De impact op je werk als verpleegkundige" },
      { id: "efficienter-organiseren", label: "Hoe organiseer je administratie efficiënter?" },
      { id: "hezo-ondersteuning-admin", label: "Hoe Hezo je ondersteunt" },
    ],
    content: (
      <>
        <p className="lead">
          Als zelfstandige thuisverpleegkundige ben je vooral bezig met zorg. Toch neemt administratie in de thuisverpleging vaak een groot deel van je werk in.
        </p>
        <p>
          Prestaties registreren, factureren, dossiers bijhouden, software gebruiken, vragen uitzoeken… het hoort er allemaal bij. Maar het vraagt tijd en energie, bovenop je zorgmomenten.
        </p>
        <p>
          Of je nu alleen werkt of in een samenwerking: de administratieve kant van thuisverpleging is voor iedereen herkenbaar.
        </p>

        <h2 id="wat-omvat-administratie">Wat omvat administratie in de thuisverpleging?</h2>
        <p>
          Administratie in de thuisverpleging is meer dan enkel papierwerk. Het gaat om alles wat nodig is om je zorg correct te registreren, op te volgen en te factureren.
        </p>
        <p>In de praktijk betekent dat:</p>
        <ul>
          <li>prestaties registreren volgens de juiste codes</li>
          <li>facturatie opstellen en opvolgen</li>
          <li>communicatie met mutualiteiten</li>
          <li>opvolging van betalingen</li>
          <li>planning en organisatie van zorgmomenten</li>
          <li>werken met software voor registratie en facturatie</li>
          <li>fouten of onduidelijkheden uitzoeken in dossiers</li>
          <li>contact opnemen met softwareleveranciers of helpdesks</li>
        </ul>
        <p>Voor veel verpleegkundigen is dit een dagelijkse realiteit naast hun zorgactiviteiten.</p>

        <h2 id="waarom-zoveel-tijd">Waarom administratie zoveel tijd vraagt</h2>
        <p>Veel zelfstandige thuisverpleegkundigen onderschatten hoeveel tijd administratie effectief inneemt.</p>
        <p>Je merkt bijvoorbeeld dat:</p>
        <ul>
          <li>administratie zich opstapelt doorheen de dag</li>
          <li>je &apos;s avonds nog dossiers of facturatie afwerkt</li>
          <li>software en systemen niet altijd intuïtief werken</li>
          <li>je regelmatig moet uitzoeken hoe iets precies zit</li>
        </ul>
        <p>Het is geen éénmalige taak, maar een constante stroom van opvolging en verwerking.</p>

        <h2 id="impact-werk">De impact op je werk als verpleegkundige</h2>
        <p>Wanneer administratie te veel tijd vraagt, heeft dat gevolgen voor je dagelijkse werking.</p>
        <ul>
          <li>je hebt minder tijd voor patiënten</li>
          <li>je werkdag wordt langer</li>
          <li>je verliest overzicht</li>
          <li>je hebt minder ruimte om je praktijk verder uit te bouwen</li>
        </ul>
        <p>Dat zorgt voor druk, terwijl je net gekozen hebt voor zelfstandigheid om meer autonomie te hebben in je werk.</p>

        <h2 id="efficienter-organiseren">Hoe organiseer je administratie efficiënter?</h2>
        <p>Administratie volledig vermijden is niet mogelijk, maar je kan wel efficiënter werken.</p>
        <p>Veel zelfstandige thuisverpleegkundigen kiezen ervoor om hun administratie anders te organiseren of zich te laten ondersteunen, zodat:</p>
        <ul>
          <li>taken minder tijd in beslag nemen</li>
          <li>processen duidelijker worden</li>
          <li>software vlotter gebruikt wordt</li>
          <li>er meer structuur komt in hun werk</li>
        </ul>

        <h2 id="hezo-ondersteuning-admin">Hoe Hezo je ondersteunt</h2>
        <p>Hezo ondersteunt zelfstandige thuisverpleegkundigen bij <Link to="/onze-diensten/" className="text-secondary hover:underline">administratie, facturatie en praktijkvoering</Link>.</p>
        <p>Of je nu alleen werkt of in een samenwerking, we helpen je om:</p>
        <ul>
          <li>je administratie beter te organiseren</li>
          <li>facturatie correct en efficiënter te laten verlopen</li>
          <li>meer structuur te brengen in je dagelijkse werking</li>
          <li>vlotter om te gaan met software en registratie</li>
          <li>minder tijd te verliezen aan praktische opvolging</li>
        </ul>
        <p>Daarnaast ondersteunen we ook de verdere uitbouw van je praktijk, onder andere via een stabiele instroom van zorgvragen.</p>
      </>
    ),
    cta: (
      <div className="mt-12 p-8 bg-muted rounded-2xl">
        <h3 className="text-xl font-semibold text-primary mb-2">
          Meer grip op je administratie?
        </h3>
        <p className="text-muted-foreground mb-4">
          Ontdek hoe Hezo je kan ondersteunen in je dagelijkse werking als zelfstandige thuisverpleegkundige.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/onze-diensten/"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
          >
            Bekijk onze diensten
          </Link>
          <Link
            to="/zo-sluit-je-aan/"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Sluit je aan bij Hezo
          </Link>
        </div>
      </div>
    ),
  },
  "zelfstandig-thuisverpleegkundige-worden": {
    heroImage: blogHeroZelfstandig,
    headings: [
      { id: "waarom-zelfstandig", label: "Waarom kiezen voor zelfstandig werken?" },
      { id: "stappenplan", label: "Zelfstandig worden in 4 stappen" },
      { id: "veelgestelde-vragen", label: "Veelgestelde vragen" },
    ],
    content: (
      <>
        <p className="lead">
          Als zelfstandig thuisverpleegkundige combineer je zorg met ondernemerschap. Je bepaalt zelf je agenda en patiënten, maar krijgt ook te maken met administratie, regelgeving en instroom. Hezo ondersteunt je bij elke stap, van oriëntatie tot een duurzaam uitgebouwde praktijk.
        </p>

        <h2 id="waarom-zelfstandig">Waarom kiezen voor zelfstandig werken als thuisverpleegkundige?</h2>
        <ul>
          <li>Meer autonomie over je agenda, regio en werkritme</li>
          <li>Directe relatie met je patiënten</li>
          <li>Hogere vergoeding per prestatie binnen de RIZIV-kaders</li>
          <li>Flexibiliteit om werk en privé beter te combineren</li>
          <li>Ruimte voor professionele en persoonlijke groei</li>
        </ul>
        <p><em>Zelfstandig werken biedt veel vrijheid, mits je goed voorbereid start.</em></p>

        <h2 id="stappenplan">Zelfstandig thuisverpleegkundige worden in 4 duidelijke stappen</h2>

        <h3>Stap 1: Check of je aan de voorwaarden voldoet</h3>
        <p>Om als zelfstandig thuisverpleegkundige te starten in België heb je nodig:</p>
        <ul>
          <li>Een erkend verpleegkundig diploma</li>
          <li>Erkenning door de FOD Volksgezondheid</li>
          <li>Een RIZIV-nummer</li>
          <li>Inschrijving bij een ondernemingsloket</li>
          <li>Aansluiting bij een sociaal verzekeringsfonds</li>
        </ul>

        <div className="my-6 p-5 bg-light-blue/10 border-l-4 border-light-blue rounded-r-lg">
          <p className="text-muted-foreground text-base mb-0">
            <strong>Hezo helpt:</strong> Heb je vragen over erkenning, RIZIV of formaliteiten? Hezo helpt je begrijpen wat voor jou van toepassing is, nog vóór je effectief start.
          </p>
        </div>

        <h4>Wat is een RIZIV-nummer en hoe vraag je dit aan?</h4>
        <p>Om te werken als zelfstandig thuisverpleegkundige heb je een RIZIV-nummer nodig. Dit nummer laat je toe om verpleegkundige prestaties correct aan te rekenen binnen de ziekteverzekering.</p>
        <p><strong>Stap 1 – Erkenning door de FOD Volksgezondheid (visum)</strong></p>
        <p>Voor je een RIZIV-nummer kan aanvragen, moet je erkend zijn als verpleegkundige door de FOD Volksgezondheid. Ben je afgestudeerd aan een erkende Belgische of Europese opleiding? Dan wordt dit vaak automatisch toegekend. In andere gevallen moet je dit zelf aanvragen.</p>
        <p><strong>Stap 2 – Inschrijving bij het RIZIV</strong></p>
        <p>Na erkenning schrijf je je in bij het RIZIV via het officiële inschrijvingsformulier.</p>
        <p><strong>Stap 3 – Ontvang je RIZIV-nummer</strong></p>
        <p>Na goedkeuring ontvang je je persoonlijke RIZIV-nummer en kan je prestaties aanrekenen.</p>

        <h3>Stap 2: Kies je ondernemingsvorm en ondersteuning</h3>
        <p>Voor je effectief start, kies je een ondernemingsvorm. Dit bepaalt je aansprakelijkheid, fiscaliteit en administratie.</p>
        <ul>
          <li><strong>Eenmanszaak</strong> – meest gekozen bij opstart, eenvoudiger en sneller</li>
          <li><strong>Vennootschap</strong> – interessant bij samenwerking of hogere omzet</li>
        </ul>
        <p>De juiste keuze hangt af van omzet, samenwerking en toekomstplannen. Hezo helpt je deze keuze begrijpen vóór je officieel start.</p>

        <h4>Heb ik een boekhouder nodig?</h4>
        <p>Als zelfstandig thuisverpleegkundige ben je niet verplicht om met een boekhouder te werken, maar in de praktijk kiezen veel starters daar wél voor. Een boekhouder kan helpen bij de keuze tussen eenmanszaak of vennootschap, correcte btw- en fiscale aangiftes, en inzicht in inkomsten en kosten.</p>

        <h3>Stap 3: Regel je opstart als zelfstandige</h3>
        <p>Ben je klaar om effectief te starten? Dan kan je je administratieve opstart officieel regelen.</p>
        <div className="my-6 p-5 bg-coral/10 border-l-4 border-coral rounded-r-lg">
          <p className="text-muted-foreground text-base mb-2"><strong>Start je eenmanszaak via onze partner Xerius</strong></p>
          <a
            href="https://www.xerius.be/viaxerius/nl/Opstart%20Eenmanszaak?utm_source=hezo&utm_medium=referral&utm_campaign=2026_hezo_helan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-coral text-coral-foreground px-6 py-3 rounded-lg font-medium hover:bg-coral/90 transition-colors"
          >
            Start je eenmanszaak bij Xerius
          </a>
        </div>

        <h3>Stap 4: Bouw je praktijk duurzaam uit</h3>
        <p>Na de administratieve opstart begint het echte werk: je praktijk uitbouwen en duurzaam draaiende houden. Bij Hezo kies je zelf hoeveel ondersteuning je daarbij wenst.</p>
        <ul>
          <li><strong>Patiënteninstroom:</strong> gespreide instroom afgestemd op jouw beschikbaarheid en regio</li>
          <li><strong>Planning, software en facturatie:</strong> ondersteuning bij agendabeheer en administratie</li>
          <li><strong>Opleiding en professionele ontwikkeling:</strong> toegang tot bijscholing en een netwerk van collega's</li>
          <li><strong>Praktische ondersteuning:</strong> advies over materialen, organisatie en praktische vragen</li>
        </ul>

        <div className="my-6 p-5 bg-green/10 border-l-4 border-green rounded-r-lg">
          <p className="text-muted-foreground text-base mb-2"><strong>Ondernemen hoef je niet alleen te doen</strong></p>
          <p className="text-muted-foreground text-base mb-0">
            Bij Hezo behoud je je vrijheid en autonomie. Tegelijk sta je er nooit alleen voor.{" "}
            <Link to="/onze-diensten/" className="text-secondary hover:underline">Ontdek alles wat we doen →</Link>
          </p>
        </div>

        <h2 id="veelgestelde-vragen">Veelgestelde vragen</h2>

        <h3>Heb ik altijd een RIZIV-nummer nodig?</h3>
        <p>Ja, als je prestaties wil aanrekenen in de thuisverpleging is een RIZIV-nummer verplicht.</p>

        <h3>Wat als ik ziek word als zelfstandige?</h3>
        <p>Als zelfstandige heb je bij ziekte recht op een uitkering via je sociaal verzekeringsfonds, op voorwaarde dat je in orde bent met je sociale bijdragen. De uitkering start vanaf de 8ste dag arbeidsongeschiktheid. Veel zelfstandige verpleegkundigen kiezen voor een aanvullende verzekering (gewaarborgd inkomen) voor betere bescherming.</p>

        <h3>Heb ik een boekhouder nodig als zelfstandig thuisverpleegkundige?</h3>
        <p>Je bent niet verplicht, maar in de praktijk kiezen veel starters daar wél voor — zeker in de eerste jaren. Een boekhouder kan helpen bij de keuze tussen eenmanszaak of vennootschap, correcte fiscale aangiftes en inzicht in kosten.</p>
      </>
    ),
  },
  "hbo5-graduaat-basisverpleegkunde": {
    heroImage: blogHeroHbo5,
    headings: [
      { id: "waarom-hervormd", label: "Waarom werd de HBO5-opleiding hervormd?" },
      { id: "welke-opleidingen", label: "Welke opleidingen bestaan er in Vlaanderen?" },
      { id: "verschil-graduaat-bachelor", label: "Verschil tussen graduaat en bachelor" },
      { id: "overgangsmaatregelen", label: "Overgangsmaatregelen in 2026" },
      { id: "impact-thuisverpleging", label: "Wat betekent dit voor de thuisverpleging?" },
      { id: "toekomstige-verpleegkundigen", label: "Voor (toekomstige) verpleegkundigen" },
      { id: "conclusie", label: "Conclusie" },
    ],
    content: (
      <>
        <p className="lead">
          De opleiding tot verpleegkundige in Vlaanderen is de voorbije jaren grondig hervormd.
          De vroegere HBO5-opleiding Verpleegkunde werd stapsgewijs omgevormd tot het graduaat Basisverpleegkunde. 
          Die hervorming is intussen geen toekomstmuziek meer: in 2026 zijn de gevolgen ervan duidelijk voelbaar in het werkveld, 
          en zeker ook binnen de thuisverpleging.
        </p>

        <p>
          Maar wat houdt die hervorming precies in? Welke opleidingen bestaan er? 
          En wat betekent dit concreet voor verpleegkundigen die (willen) werken in de thuiszorg?
        </p>

        <h2 id="waarom-hervormd">Waarom werd de HBO5-opleiding hervormd?</h2>
        <p>
          De hervorming van HBO5 naar het graduaat Basisverpleegkunde was geen louter Vlaamse keuze. 
          Ze was noodzakelijk om te voldoen aan de Europese richtlijnen voor verpleegkundige opleidingen, 
          die minimale eisen opleggen rond:
        </p>
        <ul>
          <li>opleidingsduur en -niveau</li>
          <li>competenties en verantwoordelijkheden</li>
          <li>klinische stage-uren</li>
        </ul>

        <p>
          De vroegere HBO5-opleiding voldeed hier niet langer volledig aan. 
          Tegelijk evolueerde de zorgcontext sterk: patiënten worden sneller ontslagen uit het ziekenhuis, 
          zorg wordt complexer en verschuift steeds vaker naar de thuisomgeving.
        </p>

        <p>De hervorming had daarom drie duidelijke doelstellingen:</p>
        <ul>
          <li>de opleiding beter afstemmen op de realiteit van het werkveld</li>
          <li>een helder onderscheid maken tussen verschillende verpleegkundige profielen</li>
          <li>het beroep toekomstbestendiger en aantrekkelijker maken</li>
        </ul>

        <h2 id="welke-opleidingen">Welke verpleegkundige opleidingen bestaan er in Vlaanderen?</h2>
        <p>Anno 2026 zijn er twee hoofdopleidingen voor wie verpleegkundige wil worden.</p>

        <div className="my-6 p-5 bg-light-blue/10 border-l-4 border-light-blue rounded-r-lg">
          <h3 className="font-semibold text-primary mb-3">1. Graduaat Basisverpleegkunde</h3>
          <ul className="text-muted-foreground text-base space-y-1 mb-0">
            <li><strong>Duur:</strong> 3 jaar</li>
            <li><strong>Niveau:</strong> Vlaams kwalificatieniveau 5</li>
            <li><strong>Organisatie:</strong> secundaire scholen in samenwerking met hogescholen</li>
            <li><strong>Focus:</strong> sterk praktijkgericht</li>
            <li><strong>Opleidingsomvang:</strong> ± 3.800 uur, waarvan ongeveer de helft stage</li>
          </ul>
          <p className="text-muted-foreground text-base mt-3 mb-0">
            Afgestudeerden behalen de titel <strong>gegradueerde basisverpleegkundige</strong>.
          </p>
        </div>

        <div className="my-6 p-5 bg-coral/10 border-l-4 border-coral rounded-r-lg">
          <h3 className="font-semibold text-primary mb-3">2. Professionele Bachelor Verpleegkunde</h3>
          <ul className="text-muted-foreground text-base space-y-1 mb-0">
            <li><strong>Duur:</strong> 4 jaar</li>
            <li><strong>Niveau:</strong> Vlaams kwalificatieniveau 6</li>
            <li><strong>Organisatie:</strong> hogescholen</li>
            <li><strong>Focus:</strong> combinatie van theorie, praktijk en klinisch redeneren</li>
          </ul>
          <p className="text-muted-foreground text-base mt-3 mb-0">
            Afgestudeerden behalen de titel <strong>verpleegkundige verantwoordelijk voor algemene zorg</strong>.
          </p>
        </div>

        <h2 id="verschil-graduaat-bachelor">Wat is het concrete verschil tussen graduaat en bachelor?</h2>
        <p>
          Hoewel beide opleidingen opleiden tot verpleegkundige functies, zijn er duidelijke verschillen.
        </p>

        <h3>Niveau en verantwoordelijkheden</h3>
        <ul>
          <li><strong>Basisverpleegkundigen (graduaat)</strong> werken autonoom binnen meer afgebakende en minder complexe zorgsituaties.</li>
          <li><strong>Bachelorverpleegkundigen</strong> dragen eindverantwoordelijkheid in complexere zorgcontexten, nemen vaker coördinerende taken op en hebben een bredere klinische verantwoordelijkheid.</li>
        </ul>

        <h3>Opleidingsfocus</h3>
        <ul>
          <li>Het <strong>graduaat</strong> is uitgesproken praktijkgericht, met veel stages en directe inzetbaarheid.</li>
          <li>De <strong>bacheloropleiding</strong> legt meer nadruk op klinisch redeneren, coördinatie, kwaliteit en verantwoordelijkheid.</li>
        </ul>

        <h3>Doorgroeimogelijkheden</h3>
        <p>
          Gegradueerde basisverpleegkundigen kunnen via brug- of vervolgtrajecten alsnog doorgroeien naar het bachelorniveau.
        </p>

        <h2 id="overgangsmaatregelen">Overgangsmaatregelen: wat geldt er in 2026?</h2>
        <p>
          Voor studenten die gestart zijn in de schooljaren 2023-2024 of 2024-2025 gelden overgangsmaatregelen. 
          Zij volgen een aangepast programma dat nog gebaseerd is op de vroegere HBO5-structuur, 
          maar inhoudelijk afgestemd is op het nieuwe profiel van basisverpleegkundige.
        </p>

        <div className="my-6 p-5 bg-yellow/10 border-l-4 border-yellow rounded-r-lg">
          <p className="font-medium text-primary mb-2">Belangrijk</p>
          <p className="text-muted-foreground text-base mb-0">
            In 2026 zijn deze overgangsmaatregelen nog steeds van kracht en lopen ze tot en met het schooljaar 2026-2027.
            Studenten die vóór of in het schooljaar 2022-2023 met HBO5 zijn gestart, kunnen hun opleiding afwerken onder de oude regeling.
          </p>
        </div>

        <h2 id="impact-thuisverpleging">Wat betekent dit specifiek voor de thuisverpleging?</h2>
        <p>De hervorming heeft een directe impact op de organisatie van thuiszorg.</p>

        <h3>Twee duidelijke verpleegkundige profielen</h3>
        <p>Thuisverplegingsteams bestaan steeds vaker uit een mix van profielen:</p>
        <ul>
          <li><strong>basisverpleegkundigen</strong> die sterk ingezet worden in directe, geplande zorg</li>
          <li><strong>bachelorverpleegkundigen</strong> die instaan voor complexere zorgsituaties, coördinatie en opvolging</li>
        </ul>
        <p>Dit vraagt een duidelijke taakafbakening, goede samenwerking en heldere afspraken binnen teams.</p>

        <h3>Toenemende complexiteit van thuiszorg</h3>
        <p>De zorg die thuis wordt verleend, is vaak complexer dan vroeger:</p>
        <ul>
          <li>vroegtijdige ziekenhuisontslagen</li>
          <li>chronische en multimorbide patiënten</li>
          <li>technische handelingen in de thuissituatie</li>
        </ul>
        <p>Dat maakt een doordachte inzet van competenties essentieel.</p>

        <h3>Meer nood aan ondersteuning en structuur</h3>
        <p>Voor verpleegkundigen in de thuiszorg betekent dit ook:</p>
        <ul>
          <li>meer nood aan duidelijke richtlijnen en kwaliteitskaders</li>
          <li>ondersteuning bij <Link to="/onze-diensten/" className="text-secondary hover:underline" onClick={() => window.scrollTo(0, 0)}>administratie, planning en organisatie</Link></li>
          <li>ruimte om zich te focussen op zorg, niet op randtaken</li>
        </ul>

        <h2 id="toekomstige-verpleegkundigen">Wat betekent dit voor (toekomstige) verpleegkundigen?</h2>
        <p>Voor wie studeert of al actief is als verpleegkundige, is het belangrijk om:</p>
        <ul>
          <li>goed te begrijpen welk profiel je hebt en welke bevoegdheden daarbij horen</li>
          <li>bewust te kiezen voor een werkomgeving die past bij je opleiding en ambities</li>
          <li>te weten dat doorgroeien mogelijk blijft, maar niet automatisch is</li>
        </ul>
        <p>
          Zeker in de thuisverpleging biedt dit kansen: wie zijn rol goed kent en ondersteund wordt, 
          kan zich duurzaam en met voldoening inzetten. Overweeg je om <Link to="/blog/zelfstandig-thuisverpleegkundige-worden/" className="text-secondary hover:underline" onClick={() => window.scrollTo(0, 0)}>zelfstandig thuisverpleegkundige te worden</Link>? 
          Dan is het essentieel om deze profielen goed te begrijpen.
        </p>

        <h2 id="conclusie">Conclusie</h2>
        <p>
          De hervorming van HBO5 naar het graduaat Basisverpleegkunde is in 2026 geen overgangsfase meer, 
          maar een nieuwe realiteit. Vlaanderen telt duidelijk onderscheiden verpleegkundige profielen, 
          elk met hun eigen sterktes en verantwoordelijkheden.
        </p>
        <p>Voor de thuisverpleging betekent dit:</p>
        <ul>
          <li>meer diversiteit in teams</li>
          <li>meer nood aan afstemming en ondersteuning</li>
          <li>maar ook kansen om zorg beter te organiseren rond competenties</li>
        </ul>

        <div className="my-8 p-6 bg-green/10 border-l-4 border-green rounded-r-lg">
          <p className="text-primary text-lg font-medium mb-0">
            Goede zorg begint bij duidelijke rollen, correcte informatie en een context die verpleegkundigen toelaat 
            te doen waar ze sterk in zijn: zorg verlenen, dicht bij de patiënt.
          </p>
        </div>
      </>
    ),
  },
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("nl-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const BlogArticle = () => {
  const { articleId } = useParams<{ articleId: string }>();
  
  const article = blogArticles.find((a) => a.id === articleId);
  const content = articleId ? articleContent[articleId] : null;

  if (!article || !content) {
    return <Navigate to="/blog/" replace />;
  }

  return (
    <>
      <SEO
        title={article.metaTitle}
        description={article.excerpt}
        path={`/blog/${article.id}/`}
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "@id": `https://www.hezo.be/blog/${article.id}/#article`,
              "headline": article.title,
              "description": article.excerpt,
              "datePublished": article.date,
              "dateModified": article.date,
              "inLanguage": "nl-BE",
              "isPartOf": {
                "@id": "https://www.hezo.be/blog/#blog"
              },
              "author": {
                "@type": "Organization",
                "name": "Hezo",
                "url": "https://www.hezo.be"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Hezo",
                "url": "https://www.hezo.be",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.hezo.be/favicon.png"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://www.hezo.be/blog/${article.id}/`
              }
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.hezo.be/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": "https://www.hezo.be/blog/"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": article.title
                }
              ]
            }
          ]
        }}
      />

      <div className="pt-24 pb-16">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Back link */}
          <Link 
            to="/blog/"
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar Blog
          </Link>

          {/* Two-column header: meta+title left, hero image right */}
          <header className="mb-12">
            <div className={`grid ${content.heroImage ? 'lg:grid-cols-2' : ''} gap-12 lg:gap-16 items-center`}>
              <div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-medium">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(article.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {article.readTime}
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight">
                  {article.title}
                </h1>
              </div>

              {content.heroImage && (
                <div className="flex justify-center">
                  <BlogHeroImage src={content.heroImage} alt={article.title} />
                </div>
              )}
            </div>
          </header>

          {/* Mobile TOC (shown above content on small screens) */}
          {content.headings.length > 0 && (
            <div className="lg:hidden mb-8">
              <TableOfContents headings={content.headings} />
            </div>
          )}

          {/* Two-column content: article left, sticky TOC right */}
          <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
            <div>
              {/* Article content */}
              <div className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-semibold prose-headings:scroll-mt-24 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-secondary">
                {content.content}
              </div>

              {/* CTA */}
              {content.cta || (
                <div className="mt-12 p-8 bg-muted rounded-2xl">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Meer weten over Hezo?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Ontdek hoe wij zelfstandige verpleegkundigen ondersteunen of neem contact met ons op.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      to="/onze-diensten/"
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                    >
                      Ons aanbod
                    </Link>
                    <Link 
                      to="/contact/"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky TOC sidebar */}
            {content.headings.length > 0 && (
              <aside className="hidden lg:block">
                <div className="lg:sticky lg:top-28">
                  <TableOfContents headings={content.headings} />
                </div>
              </aside>
            )}
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogArticle;
