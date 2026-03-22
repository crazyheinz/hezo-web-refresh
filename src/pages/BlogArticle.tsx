import { useParams, Link, Navigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { blogArticles } from "./Blog";

// Full article content - add content for each article ID
const articleContent: Record<string, { content: React.ReactNode; cta?: React.ReactNode }> = {
  "patienten-thuisverpleegkundige": {
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

        <h2>Hoe komen patiënten bij een thuisverpleegkundige terecht?</h2>
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

        <h2>Waarom patiënten vinden niet vanzelf gaat</h2>
        <p>Veel zelfstandige verpleegkundigen merken dat patiënteninstroom minder evident is dan verwacht.</p>
        <p>Je moet:</p>
        <ul>
          <li>contacten onderhouden met huisartsen en ziekenhuizen</li>
          <li>bereikbaar en beschikbaar zijn voor nieuwe zorgvragen</li>
          <li>snel reageren op aanvragen</li>
          <li>zelf actief opvolgen</li>
        </ul>
        <p>Dat vraagt tijd en energie, bovenop je zorg, <Link to="/blog/administratie-thuisverpleging/" className="text-secondary hover:underline">administratie</Link> en planning.</p>

        <h2>De impact op je praktijk</h2>
        <p>Wanneer patiënteninstroom niet stabiel is, heeft dat directe gevolgen:</p>
        <ul>
          <li>je planning is moeilijk te vullen</li>
          <li>je inkomsten zijn minder voorspelbaar</li>
          <li>groei van je praktijk blijft beperkt</li>
          <li>je ervaart onzekerheid</li>
        </ul>
        <p>Zeker bij de opstart of uitbreiding van je activiteit kan dit zwaar doorwegen.</p>

        <h2>Hoe bouw je een stabiele patiënteninstroom op?</h2>
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

        <h2>Waar loopt het vaak moeilijk?</h2>
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

        <h2>Waarom het combineren met administratie moeilijk is</h2>
        <p>Wat het extra lastig maakt, is dat patiënteninstroom nooit op zichzelf staat.</p>
        <p>Je moet dit combineren met:</p>
        <ul>
          <li>zorgmomenten</li>
          <li><Link to="/blog/administratie-thuisverpleging/" className="text-secondary hover:underline">administratie en facturatie</Link></li>
          <li>software en registratie</li>
          <li>planning</li>
        </ul>
        <p>Daardoor komt het onderhouden van je netwerk of opvolgen van nieuwe zorgvragen vaak op de tweede plaats.</p>

        <h2>Hoe Hezo je hierin ondersteunt</h2>
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

        <h2>Wat omvat administratie in de thuisverpleging?</h2>
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

        <h2>Waarom administratie zoveel tijd vraagt</h2>
        <p>Veel zelfstandige thuisverpleegkundigen onderschatten hoeveel tijd administratie effectief inneemt.</p>
        <p>Je merkt bijvoorbeeld dat:</p>
        <ul>
          <li>administratie zich opstapelt doorheen de dag</li>
          <li>je &apos;s avonds nog dossiers of facturatie afwerkt</li>
          <li>software en systemen niet altijd intuïtief werken</li>
          <li>je regelmatig moet uitzoeken hoe iets precies zit</li>
        </ul>
        <p>Het is geen éénmalige taak, maar een constante stroom van opvolging en verwerking.</p>

        <h2>De impact op je werk als verpleegkundige</h2>
        <p>Wanneer administratie te veel tijd vraagt, heeft dat gevolgen voor je dagelijkse werking.</p>
        <ul>
          <li>je hebt minder tijd voor patiënten</li>
          <li>je werkdag wordt langer</li>
          <li>je verliest overzicht</li>
          <li>je hebt minder ruimte om je praktijk verder uit te bouwen</li>
        </ul>
        <p>Dat zorgt voor druk, terwijl je net gekozen hebt voor zelfstandigheid om meer autonomie te hebben in je werk.</p>

        <h2>Hoe organiseer je administratie efficiënter?</h2>
        <p>Administratie volledig vermijden is niet mogelijk, maar je kan wel efficiënter werken.</p>
        <p>Veel zelfstandige thuisverpleegkundigen kiezen ervoor om hun administratie anders te organiseren of zich te laten ondersteunen, zodat:</p>
        <ul>
          <li>taken minder tijd in beslag nemen</li>
          <li>processen duidelijker worden</li>
          <li>software vlotter gebruikt wordt</li>
          <li>er meer structuur komt in hun werk</li>
        </ul>

        <h2>Hoe Hezo je ondersteunt</h2>
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
    content: (
      <>
        <p className="lead">
          Als zelfstandig thuisverpleegkundige combineer je zorg met ondernemerschap. Je bepaalt zelf je agenda en patiënten, maar krijgt ook te maken met administratie, regelgeving en instroom. Hezo ondersteunt je bij elke stap, van oriëntatie tot een duurzaam uitgebouwde praktijk.
        </p>

        <h2>Waarom kiezen voor zelfstandig werken als thuisverpleegkundige?</h2>
        <ul>
          <li>Meer autonomie over je agenda, regio en werkritme</li>
          <li>Directe relatie met je patiënten</li>
          <li>Hogere vergoeding per prestatie binnen de RIZIV-kaders</li>
          <li>Flexibiliteit om werk en privé beter te combineren</li>
          <li>Ruimte voor professionele en persoonlijke groei</li>
        </ul>
        <p><em>Zelfstandig werken biedt veel vrijheid, mits je goed voorbereid start.</em></p>

        <h2>Zelfstandig thuisverpleegkundige worden in 4 duidelijke stappen</h2>

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

        <h2>Veelgestelde vragen</h2>

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

        <h2>Waarom werd de HBO5-opleiding hervormd?</h2>
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

        <h2>Welke verpleegkundige opleidingen bestaan er in Vlaanderen?</h2>
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

        <h2>Wat is het concrete verschil tussen graduaat en bachelor?</h2>
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

        <h2>Overgangsmaatregelen: wat geldt er in 2026?</h2>
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

        <h2>Wat betekent dit specifiek voor de thuisverpleging?</h2>
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

        <h2>Wat betekent dit voor (toekomstige) verpleegkundigen?</h2>
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

        <h2>Conclusie</h2>
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
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* Back link */}
          <Link 
            to="/blog/"
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar Blog
          </Link>

          {/* Article header */}
          <header className="mb-8">
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
          </header>

          {/* Article content */}
          <div className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-semibold prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-secondary">
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
        </article>
      </div>
    </>
  );
};

export default BlogArticle;
