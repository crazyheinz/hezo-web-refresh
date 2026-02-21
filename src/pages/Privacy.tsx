import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SEO from "@/components/SEO";
import hezoLogo from "@/assets/hezo-logo.png";

const Privacy = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Privacyverklaring | Hezo"
        description="Privacyverklaring van Hezo vzw – hoe wij omgaan met uw persoonsgegevens conform de GDPR."
        path="/privacy"
        noIndex={true}
      />

      {/* Print-only styles */}
      <style>{`
        @media print {
          nav, footer, .no-print { display: none !important; }
          .print-logo { display: block !important; }
          body { font-size: 12pt; }
          .privacy-content { max-width: 100% !important; padding: 0 !important; }
        }
      `}</style>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl privacy-content">
          {/* Logo (always visible, prominent in print) */}
          <div className="mb-8 flex items-center justify-between">
            <img src={hezoLogo} alt="Hezo" className="h-16 w-auto hidden print:block" />
            <Button onClick={handlePrint} variant="outline" className="no-print gap-2 ml-auto">
              <Download className="h-4 w-4" />
              Download als PDF
            </Button>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Privacyverklaring – Hezo vzw
          </h1>
          <p className="text-muted-foreground mb-8">Versie 21 februari 2026</p>

          <Separator className="mb-8" />

          {/* 1. Inleiding */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Inleiding</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hezo vzw hecht veel belang aan de bescherming van uw persoonsgegevens en verwerkt deze in overeenstemming met de geldende privacywetgeving, waaronder de Algemene Verordening Gegevensbescherming (GDPR/AVG).
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Deze privacyverklaring informeert u over welke persoonsgegevens wij verwerken via www.hezo.be, voor welke doeleinden en op basis van welke rechtsgrond.
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 2. Verwerkingsverantwoordelijke */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Verwerkingsverantwoordelijke</h2>
            <div className="text-muted-foreground leading-relaxed space-y-1">
              <p className="font-medium text-foreground">Hezo vzw</p>
              <p>Boomsesteenweg 5</p>
              <p>2610 Antwerpen</p>
              <p>Ondernemingsnummer: BE 1012.835.594</p>
              <p className="mt-3">
                E-mail: <a href="mailto:info@hezo.be" className="text-secondary hover:underline">info@hezo.be</a>
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Hezo vzw treedt op als verwerkingsverantwoordelijke voor de persoonsgegevens die via deze website worden verzameld.
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 3. Welke persoonsgegevens */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Welke persoonsgegevens verwerken wij en waarom?</h2>

            {/* 3.1 */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">3.1 Contactformulier</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Wanneer u het contactformulier op onze website invult, verwerken wij:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Naam</li>
                <li>E-mailadres</li>
                <li>Telefoonnummer (optioneel)</li>
                <li>Uw bericht</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                <span className="font-medium text-foreground">Doel van verwerking:</span> Beantwoorden van uw vraag of verzoek.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-1">
                <span className="font-medium text-foreground">Rechtsgrond:</span> Gerechtvaardigd belang (beantwoorden van contactaanvragen).
              </p>
              <p className="text-muted-foreground leading-relaxed mt-1">
                <span className="font-medium text-foreground">Opslag:</span> De gegevens worden niet opgeslagen in een database, maar enkel doorgestuurd via e-mail naar info@hezo.be.
              </p>
            </div>

            {/* 3.2 */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">3.2 Sollicitatieformulier</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Wanneer u solliciteert via onze website, verwerken wij:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Naam</li>
                <li>E-mailadres</li>
                <li>Telefoonnummer (optioneel)</li>
                <li>Motivatie</li>
                <li>CV (bestand)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                <span className="font-medium text-foreground">Doel van verwerking:</span> Beoordeling van uw kandidatuur in het kader van een mogelijke samenwerking of aanwerving.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-1">
                <span className="font-medium text-foreground">Rechtsgrond:</span> Toestemming en/of het nemen van precontractuele maatregelen op uw verzoek.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-1">
                <span className="font-medium text-foreground">Opslag en bewaartermijn:</span> De gegevens worden opgeslagen in een beveiligde database. CV-bestanden worden opgeslagen in bestandsopslag. Alle sollicitatiegegevens worden automatisch verwijderd na 60 dagen.
              </p>
            </div>

            {/* 3.3 */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">3.3 Webinarregistratie en -deelname</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Wanneer u zich inschrijft voor een webinar, verwerken wij:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Naam</li>
                <li>E-mailadres</li>
                <li>Unieke toegangstoken</li>
                <li>Kijkgegevens (bijvoorbeeld deelnamegegevens)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                <span className="font-medium text-foreground">Doel van verwerking:</span> Organisatie en opvolging van webinars.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-1">
                <span className="font-medium text-foreground">Rechtsgrond:</span> Toestemming.
              </p>
            </div>
          </section>

          <Separator className="mb-8" />

          {/* 4. Bewaartermijnen */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Bewaartermijnen</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk voor de doeleinden waarvoor ze worden verzameld.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
              <li>Contactaanvragen: maximaal 6 maanden</li>
              <li>Sollicitaties: automatisch verwijderd na 60 dagen</li>
              <li>Webinargegevens: maximaal 12 maanden (tenzij anders wettelijk vereist)</li>
            </ul>
          </section>

          <Separator className="mb-8" />

          {/* 5. Delen */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Delen van persoonsgegevens</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Uw persoonsgegevens worden niet verkocht aan derden.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Indien noodzakelijk voor de uitvoering van onze dienstverlening kunnen gegevens gedeeld worden met:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
              <li>IT- en hostingpartners</li>
              <li>E-mail- of webinarplatformleveranciers</li>
              <li>Technische ontwikkelpartners</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Met deze partijen worden verwerkersovereenkomsten afgesloten conform de GDPR.
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 6. Doorgifte */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Doorgifte buiten de EER</h2>
            <p className="text-muted-foreground leading-relaxed">
              Indien persoonsgegevens worden verwerkt door partijen buiten de Europese Economische Ruimte, gebeurt dit uitsluitend met passende waarborgen conform de GDPR (bijvoorbeeld via standaardcontractbepalingen).
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 7. Beveiliging */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Beveiliging</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Hezo vzw neemt passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
              <li>ongeoorloofde toegang</li>
              <li>verlies</li>
              <li>misbruik</li>
              <li>wijziging of vernietiging</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              De toegang tot persoonsgegevens is beperkt tot bevoegde personen.
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 8. Uw rechten */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Uw rechten</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">U heeft het recht om:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
              <li>Inzage te krijgen in uw persoonsgegevens</li>
              <li>Onjuiste gegevens te laten verbeteren</li>
              <li>Uw gegevens te laten wissen</li>
              <li>De verwerking te beperken</li>
              <li>Bezwaar te maken tegen verwerking</li>
              <li>Uw gegevens over te dragen (dataportabiliteit)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              U kan uw rechten uitoefenen via: <a href="mailto:info@hezo.be" className="text-secondary hover:underline">info@hezo.be</a>
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Daarnaast kan u klacht indienen bij de Belgische Gegevensbeschermingsautoriteit:{" "}
              <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
                www.gegevensbeschermingsautoriteit.be
              </a>
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 9. Geautomatiseerde besluitvorming */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Geautomatiseerde besluitvorming</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hezo vzw maakt geen gebruik van geautomatiseerde besluitvorming of profilering.
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 10. Wijzigingen */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Wijzigingen</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hezo vzw kan deze privacyverklaring aanpassen. De meest recente versie is steeds beschikbaar op{" "}
              <a href="https://www.hezo.be/privacy" className="text-secondary hover:underline">www.hezo.be</a>.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
