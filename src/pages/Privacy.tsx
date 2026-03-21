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

      <style>{`
        @media print {
          nav, footer, .no-print { display: none !important; }
          .print-logo { display: block !important; }
          body { font-size: 12pt; }
          .privacy-content { max-width: 100% !important; padding: 0 !important; }
        }
      `}</style>

      <section className="pt-32 pb-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl privacy-content">
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

          <Separator className="my-8" />

          {/* 1. Inleiding */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Inleiding</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hezo vzw hecht veel belang aan de bescherming van uw persoonsgegevens en verwerkt deze in overeenstemming met de geldende privacywetgeving, waaronder de Algemene Verordening Gegevensbescherming (GDPR/AVG).
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              In deze privacyverklaring leggen we uit welke gegevens we verwerken, waarom we dat doen en hoe we ervoor zorgen dat uw gegevens veilig blijven.
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 2. Verwerkingsverantwoordelijke */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Verwerkingsverantwoordelijke</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hezo vzw ondersteunt zelfstandige thuisverpleegkundigen in hun dagelijkse praktijk. Onze diensten omvatten onder meer administratieve begeleiding, facturatie, ondersteuning bij patiënteninstroom, juridische hulp, opleidingen en digitale ondersteuning.
            </p>
            <p className="font-medium text-foreground mb-2">Contactgegevens van de verwerkingsverantwoordelijke:</p>
            <div className="text-muted-foreground leading-relaxed space-y-1">
              <p className="font-medium text-foreground">Hezo vzw</p>
              <p>Boomsesteenweg 5</p>
              <p>2610 Antwerpen</p>
              <p>Ondernemingsnummer: BE 1012.835.594</p>
              <p className="mt-3">
                E-mail: <a href="mailto:privacy@hezo.be" className="text-secondary hover:underline">privacy@hezo.be</a>
              </p>
            </div>
          </section>

          <Separator className="mb-8" />

          {/* 3. Welke persoonsgegevens */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Welke persoonsgegevens verwerken wij en waarom?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hezo vzw verwerkt enkel persoonsgegevens die noodzakelijk zijn voor haar opdracht. Dit kunnen zijn:
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">Gegevens van patiënten:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Identificatiegegevens (naam, adres, geboortedatum …)</li>
                <li>Contactgegevens</li>
                <li>Gegevens over de zorgvraag, zorgnoden en medische informatie die noodzakelijk is voor het toewijzen van een verpleegkundige</li>
                <li>Administratieve gegevens in functie van facturatie of terugbetaling</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">Gegevens van zelfstandige verpleegkundigen:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Identificatie- en contactgegevens</li>
                <li>Professionele gegevens (RIZIV-nummer, ondernemingsnummer, specialisaties)</li>
                <li>Administratieve gegevens m.b.t. opstart, facturatie en samenwerkingsverband</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">Gegevens van verwijzers en partners:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Contactgegevens van huisartsen, ziekenhuizen, mutualiteiten en welzijnsorganisaties</li>
                <li>Gegevens die nodig zijn om zorgvragen correct door te geven en op te volgen</li>
                <li>Gegevens die noodzakelijk zijn voor kwaliteitsopvolging, interne rapportering en evaluatie van de samenwerking</li>
              </ul>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Hezo vzw verwerkt persoonsgegevens uitsluitend voor de volgende doeleinden:
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">Ondersteuning van zelfstandige verpleegkundigen:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Administratieve opstart en begeleiding</li>
                <li>Ondersteuning bij zelfstandigenstatuut en juridische vragen</li>
                <li>Organisatie van opleidingen</li>
                <li>Digitale en administratieve ondersteuning</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">Zorgmatching en patiënteninstroom:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Ontvangen van zorgvragen via het ziekenfonds Helan en andere partners</li>
                <li>Zorgvragen koppelen aan geschikte zelfstandige thuisverpleegkundigen</li>
                <li>Samenwerking en informatie-uitwisseling met huisartsen, ziekenhuizen en lokale welzijnsorganisaties</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">Administratie en facturatie:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Verwerking van gegevens voor facturatie, terugbetalingen en dossieropvolging</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">Wettelijke verplichtingen:</h3>
              <p className="text-muted-foreground leading-relaxed ml-2">
                Het naleven van regelgeving rond gezondheidszorg, sociale zekerheid en fiscaliteit
              </p>
            </div>
          </section>

          <Separator className="mb-8" />

          {/* 4. Wettelijke basis */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Wat is de wettelijke basis voor de verwerking van uw gegevens?</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Wij verwerken persoonsgegevens op basis van:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
              <li>Uitvoering van een overeenkomst met de zelfstandige verpleegkundigen</li>
              <li>Wettelijke verplichtingen, o.a. in het kader van gezondheidszorg en facturatie</li>
              <li>Gerechtvaardigd belang, zoals interne administratie en direct marketing</li>
              <li>Toestemming, indien wettelijk vereist (bijv. bepaalde communicatie of doorsturingen)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Gezondheidsgegevens worden enkel verwerkt wanneer dit noodzakelijk is voor de zorgverlening en volgens de uitzonderingen voorzien in de GDPR en gezondheidswetgeving.
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 5. Informatiebronnen */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Wat zijn onze informatiebronnen?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hezo vzw verwerkt persoonsgegevens die op een zorgvuldige en rechtmatige manier worden verkregen. We gebruiken enkel informatiebronnen die noodzakelijk zijn voor de uitvoering van onze opdracht en binnen een wettelijk kader vallen.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Wij verzamelen persoonsgegevens via:
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">5.1. Helan onafhankelijk Ziekenfonds</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                De meeste zorgvragen komen binnen via het ziekenfonds Helan. In dat kader ontvangen we:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>identificatie- en contactgegevens van patiënten</li>
                <li>gegevens die noodzakelijk zijn om een zorgvraag correct te beoordelen</li>
                <li>administratieve of medische informatie die essentieel is voor de toewijzing van een verpleegkundige</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Deze gegevens worden aangeleverd door Helan in het kader van samenwerking rond patiënteninstroom en zorgcoördinatie.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">5.2. Zelfstandige thuisverpleegkundigen binnen Hezo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Informatie over hun beschikbaarheid, specialisaties of zorgdomeinen helpt bij een correcte matching met binnenkomende zorgvragen. Dit omvat ook administratieve gegevens die door de verpleegkundigen zelf worden aangeleverd.
              </p>
            </div>
          </section>

          <Separator className="mb-8" />

          {/* 6. Delen */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Aan wie kunnen uw gegevens meegedeeld worden?</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Hezo vzw deelt persoonsgegevens uitsluitend met partijen die noodzakelijk zijn voor de uitvoering van onze taken, zoals:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
              <li>Ziekenfonds Helan, voor patiënteninstroom en administratieve verwerking</li>
              <li>Zelfstandige thuisverpleegkundigen binnen het netwerk van Hezo</li>
              <li>Huisartsen, ziekenhuizen en welzijnsorganisaties die betrokken zijn bij de zorgvraag</li>
              <li>Dienstverleners die ons ondersteunen (bv. IT-leveranciers), steeds met verwerkersovereenkomst</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Gegevens worden niet doorgegeven aan derde partijen voor commerciële doeleinden.
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 7. Bewaartermijnen */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Bewaartermijnen</h2>
            <p className="text-muted-foreground leading-relaxed">
              Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk voor de doeleinden waarvoor ze worden verzameld.
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 8. Doorgifte */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Doorgifte buiten de EER</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Hezo vzw geeft geen persoonsgegevens door aan landen buiten de Europese Unie (EU) of de Europese Economische Ruimte (EER). Alle gegevens worden verwerkt en opgeslagen binnen de EU, bij dienstverleners die onderworpen zijn aan de GDPR-wetgeving en passende beveiligingsmaatregelen nemen.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Indien dit in de toekomst toch noodzakelijk zou worden, zal Hezo vzw dit enkel doen wanneer een passend beschermingsniveau gegarandeerd kan worden (bv. via standaardcontractbepalingen), en zullen betrokkenen hierover vooraf transparant worden geïnformeerd.
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 9. Beveiliging */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Beveiliging</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Hezo vzw neemt passende technische en organisatorische maatregelen, waaronder toegangsbeheer, versleuteling waar passend, logging en beveiligde hostingomgevingen, om uw persoonsgegevens te beschermen tegen:
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

          {/* 10. Uw rechten */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Uw rechten</h2>
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
              U kan uw rechten uitoefenen via: <a href="mailto:privacy@hezo.be" className="text-secondary hover:underline">privacy@hezo.be</a>
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Wij kunnen u vragen om uw identiteit te verifiëren alvorens uw verzoek te behandelen. Wij reageren op uw verzoek binnen één maand na ontvangst, conform de GDPR.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Daarnaast kan u steeds klacht indienen bij de Belgische Gegevensbeschermingsautoriteit:{" "}
              <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
                www.gegevensbeschermingsautoriteit.be
              </a>
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 11. Geautomatiseerde besluitvorming */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">11. Geautomatiseerde besluitvorming</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hezo vzw maakt geen gebruik van geautomatiseerde besluitvorming of profilering.
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 12. Contact */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">12. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hezo vzw kan deze privacyverklaring steeds aanpassen. De meest recente versie is steeds beschikbaar op{" "}
              <a href="https://www.hezo.be/privacy" className="text-secondary hover:underline">www.hezo.be</a>.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Voor vragen over deze privacyverklaring of over uw gegevens kan u ons contacteren via:{" "}
              <a href="mailto:privacy@hezo.be" className="text-secondary hover:underline">privacy@hezo.be</a>
            </p>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
