import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SEO from "@/components/SEO";
import hezoLogo from "@/assets/hezo-logo.png";

const Cookies = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Cookiebeleid | Hezo"
        description="Cookiebeleid van Hezo vzw – informatie over het gebruik van cookies op onze website."
        path="/cookies"
        noIndex={true}
      />

      <style>{`
        @media print {
          nav, footer, .no-print { display: none !important; }
          .print-logo { display: block !important; }
          body { font-size: 12pt; }
          .cookie-content { max-width: 100% !important; padding: 0 !important; }
        }
      `}</style>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl cookie-content">
          <div className="mb-8 flex items-center justify-between">
            <img src={hezoLogo} alt="Hezo" className="h-16 w-auto hidden print:block" />
            <Button onClick={handlePrint} variant="outline" className="no-print gap-2 ml-auto">
              <Download className="h-4 w-4" />
              Download als PDF
            </Button>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Cookiebeleid – Hezo vzw
          </h1>

          <Separator className="my-8" />

          {/* 1. Wat zijn cookies? */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Wat zijn cookies?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies zijn kleine tekstbestanden die door een website op uw computer, tablet of smartphone worden geplaatst wanneer u de website bezoekt. Ze worden veel gebruikt om websites goed te laten functioneren en om informatie te verstrekken aan de eigenaar van de website.
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 2. Welke cookies gebruiken wij? */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Welke cookies gebruiken wij?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hezo vzw maakt op haar website <span className="font-medium text-foreground">uitsluitend gebruik van strikt noodzakelijke (functionele) cookies</span>. Deze cookies zijn essentieel voor de goede werking van de website en kunnen niet worden uitgeschakeld.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Wij gebruiken <span className="font-medium text-foreground">geen</span>:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
              <li>Analytische cookies (bv. Google Analytics)</li>
              <li>Tracking- of advertentiecookies</li>
              <li>Cookies van sociale media</li>
              <li>Cookies van derden voor commerciële doeleinden</li>
            </ul>
          </section>

          <Separator className="mb-8" />

          {/* 3. Overzicht functionele cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Overzicht van onze functionele cookies</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 font-semibold text-foreground border-b border-border">Cookie</th>
                    <th className="text-left p-3 font-semibold text-foreground border-b border-border">Doel</th>
                    <th className="text-left p-3 font-semibold text-foreground border-b border-border">Bewaartermijn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 text-muted-foreground border-b border-border">Sessiecookies</td>
                    <td className="p-3 text-muted-foreground border-b border-border">Noodzakelijk voor de technische werking van de website (bv. sessiebeheer)</td>
                    <td className="p-3 text-muted-foreground border-b border-border">Duur van de sessie</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <Separator className="mb-8" />

          {/* 4. Cookies beheren */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Cookies beheren</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              U kunt cookies steeds beheren of verwijderen via de instellingen van uw browser. Houd er wel rekening mee dat het blokkeren van functionele cookies de werking van de website kan beïnvloeden.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Meer informatie over het beheren van cookies vindt u op{" "}
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
                www.allaboutcookies.org
              </a>.
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 5. Wijzigingen */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Wijzigingen</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hezo vzw kan dit cookiebeleid aanpassen. De meest recente versie is steeds beschikbaar op{" "}
              <a href="https://www.hezo.be/cookies" className="text-secondary hover:underline">www.hezo.be/cookies</a>.
            </p>
          </section>

          <Separator className="mb-8" />

          {/* 7. Contact */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Voor vragen over dit cookiebeleid kan u ons contacteren via:{" "}
              <a href="mailto:privacy@hezo.be" className="text-secondary hover:underline">privacy@hezo.be</a>
            </p>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Cookies;
