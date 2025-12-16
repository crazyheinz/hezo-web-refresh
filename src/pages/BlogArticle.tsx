import { useParams, Link, Navigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { blogArticles } from "./Blog";

// Full article content - add content for each article ID
const articleContent: Record<string, { content: React.ReactNode }> = {
  "zelfstandig-verpleegkundige-worden": {
    content: (
      <>
        <p className="lead">
          Als zelfstandig verpleegkundige combineer je je passie voor zorg met ondernemerschap. 
          Het biedt flexibiliteit, autonomie en de mogelijkheid om je eigen praktijk vorm te geven. 
          En je hoeft het niet alleen te doen — Hezo ondersteunt je bij elke stap.
        </p>

        <h2>Waarom kiezen voor zelfstandig ondernemen?</h2>
        <p>
          Steeds meer verpleegkundigen kiezen ervoor om zelfstandig te werken. De voordelen zijn talrijk:
        </p>
        <ul>
          <li>Flexibele werkuren die passen bij jouw leven</li>
          <li>Zelf bepalen hoeveel je werkt</li>
          <li>Directe relatie met je patiënten</li>
          <li>Hogere vergoeding per prestatie</li>
          <li>Persoonlijke en professionele groei</li>
        </ul>

        <h2>Stap 1: Zorg dat je aan de voorwaarden voldoet</h2>
        <p>
          Om als zelfstandig verpleegkundige te werken in België, moet je:
        </p>
        <ul>
          <li>Een erkend verpleegkundig diploma hebben</li>
          <li>Geregistreerd zijn bij de FOD Volksgezondheid</li>
          <li>Een RIZIV-nummer hebben</li>
          <li>Ingeschreven zijn bij een ondernemingsloket</li>
          <li>Aansluiten bij een sociaal verzekeringsfonds</li>
        </ul>

        <div className="my-6 p-5 bg-primary/5 border-l-4 border-primary rounded-r-lg">
          <p className="font-medium text-primary mb-2">Hezo helpt</p>
          <p className="text-muted-foreground text-base">
            Heb je vragen over je registratie, RIZIV-nummer of andere formaliteiten? 
            Hezo geeft je advies en wijst je de juiste richting.
          </p>
        </div>

        <h2>Stap 2: Kies je ondernemingsvorm</h2>
        <p>
          Je kunt kiezen om als eenmanszaak te starten of een vennootschap op te richten. 
          Elke vorm heeft voor- en nadelen op vlak van aansprakelijkheid, fiscaliteit en administratie.
        </p>

        <div className="my-6 p-5 bg-secondary/5 border-l-4 border-secondary rounded-r-lg">
          <p className="font-medium text-primary mb-2">💡 Tip</p>
          <p className="text-muted-foreground text-base mb-3">
            Een sociaal verzekeringsfonds zoals Xerius kan je gratis adviseren bij het opstarten als zelfstandige. 
            Zij helpen je met de keuze van je ondernemingsvorm, administratieve verplichtingen én bieden ondersteuning als boekhouder.
          </p>
          <a 
            href="https://www.xerius.be" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-secondary font-medium hover:underline"
          >
            Bezoek Xerius →
          </a>
        </div>

        <h2>Stap 3: Bouw je praktijk op</h2>
        <p>
          Een goede start is cruciaal. Denk aan:
        </p>
        <ul>
          <li>Patiëntentoestroom opbouwen via netwerken met huisartsen en andere zorgverleners</li>
          <li>Investeren in kwaliteitsvolle materialen</li>
          <li>Een betrouwbare software voor planning en facturatie</li>
          <li>Bijscholing om je expertise te blijven ontwikkelen</li>
        </ul>

        <div className="my-6 p-5 bg-primary/5 border-l-4 border-primary rounded-r-lg">
          <p className="font-medium text-primary mb-2">Hezo neemt dit uit handen</p>
          <p className="text-muted-foreground text-base">
            Bij Hezo hoef je dit niet alleen te doen. Wij kunnen je praktijk mee uitbouwen of zelfs volledig uit handen nemen:
          </p>
          <ul className="mt-3 space-y-2 text-muted-foreground text-base">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Patiëntentoestroom:</strong> Hezo zorgt voor voldoende patiënten, zodat jij je kunt focussen op zorg verlenen.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Software & facturatie:</strong> Wij regelen de planning, administratie en facturatie voor je.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Opleiding & bijscholing:</strong> Toegang tot trainingen en een netwerk van collega's.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Materialen:</strong> Voor de aankoop van materialen verwijzen we je door naar betrouwbare leveranciers.</span>
            </li>
          </ul>
        </div>

        <h2>Conclusie: ondernemen hoeft niet alleen</h2>
        <p>
          Als zelfstandig verpleegkundige behoud je je vrijheid en autonomie. 
          Maar bij Hezo sta je er nooit alleen voor. Van de eerste stap tot het dagelijks runnen van je praktijk — 
          wij ondersteunen, adviseren en nemen werk uit handen waar we kunnen. Zo houd jij tijd over voor wat écht telt: zorg voor je patiënten.
        </p>
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
        title={`${article.title} | Hezo Blog`}
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
            Terug naar blog
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
