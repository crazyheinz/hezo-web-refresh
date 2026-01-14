import { useParams, Link, Navigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { blogArticles } from "./Blog";

// Full article content - add content for each article ID
const articleContent: Record<string, { content: React.ReactNode }> = {
  "hbo5-graduaat-basisverpleegkunde": {
    content: (
      <>
        <p className="lead italic text-muted-foreground mb-8">
          Geüpdatet: januari 2026
        </p>

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
          <li>ondersteuning bij <Link to="/wat-we-doen/" className="text-secondary hover:underline">administratie, planning en organisatie</Link></li>
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
          kan zich duurzaam en met voldoening inzetten. Overweeg je om <Link to="/zelfstandig-worden/" className="text-secondary hover:underline">zelfstandig thuisverpleegkundige te worden</Link>? 
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
          "@type": "Article",
          "headline": article.title,
          "description": article.excerpt,
          "datePublished": article.date,
          "author": {
            "@type": "Organization",
            "name": "Hezo"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Hezo",
            "url": "https://www.hezo.be"
          }
        }}
      />

      <div className="pt-24 pb-16">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              {article.title}
            </h1>
          </header>

          {/* Article content */}
          <div className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-semibold prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-secondary">
            {content.content}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-muted rounded-2xl">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Meer weten over Hezo?
            </h3>
            <p className="text-muted-foreground mb-4">
              Ontdek hoe wij zelfstandige verpleegkundigen ondersteunen of neem contact met ons op.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/wat-we-doen/"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              >
                Wat we doen
              </Link>
              <Link 
                to="/contact/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogArticle;
