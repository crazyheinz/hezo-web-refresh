import { useParams, Link, Navigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { blogArticles } from "./Blog";

// Full article content - add content for each article ID
const articleContent: Record<string, { content: React.ReactNode }> = {
  "thuisverpleging-wat-is-het": {
    content: (
      <>
        <p className="lead">
          Thuisverpleging is een vorm van gezondheidszorg waarbij verpleegkundigen medische zorgen verlenen bij de patiënt thuis. 
          Dit kan variëren van eenvoudige handelingen zoals het toedienen van medicatie tot complexe medische behandelingen.
        </p>

        <h2>Wat houdt thuisverpleging precies in?</h2>
        <p>
          Thuisverpleging omvat een breed scala aan verpleegkundige handelingen die bij u thuis worden uitgevoerd. 
          Een thuisverpleegkundige kan helpen bij:
        </p>
        <ul>
          <li>Wondverzorging en verbandwissels</li>
          <li>Toedienen van injecties en medicatie</li>
          <li>Bloedafnames en controles</li>
          <li>Stomazorg</li>
          <li>Diabeteszorg en glycemiecontroles</li>
          <li>Hygiënische verzorging</li>
          <li>Palliatieve zorg</li>
        </ul>

        <h2>Voor wie is thuisverpleging bedoeld?</h2>
        <p>
          Thuisverpleging is geschikt voor iedereen die tijdelijk of langdurig verpleegkundige zorg nodig heeft, 
          maar deze liever in de vertrouwde thuisomgeving ontvangt. Dit kan zijn:
        </p>
        <ul>
          <li>Ouderen die ondersteuning nodig hebben bij dagelijkse verzorging</li>
          <li>Patiënten die herstellen na een operatie of ziekenhuisopname</li>
          <li>Mensen met chronische aandoeningen zoals diabetes of COPD</li>
          <li>Personen met een beperking die hulp nodig hebben</li>
          <li>Patiënten in palliatieve zorg</li>
        </ul>

        <h2>Wordt thuisverpleging terugbetaald?</h2>
        <p>
          Ja, thuisverpleging wordt grotendeels terugbetaald door het RIZIV (Rijksinstituut voor Ziekte- en Invaliditeitsverzekering). 
          Het bedrag dat je zelf moet betalen hangt af van je verzekeringsstatus. 
          Bij Hezo zorgen wij voor de volledige administratieve afhandeling, zodat jij je geen zorgen hoeft te maken.
        </p>
      </>
    ),
  },
  "zelfstandig-verpleegkundige-worden": {
    content: (
      <>
        <p className="lead">
          Als zelfstandig verpleegkundige combineer je je passie voor zorg met ondernemerschap. 
          Het biedt flexibiliteit, autonomie en de mogelijkheid om je eigen praktijk vorm te geven.
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
          <li>Netwerken met huisartsen en andere zorgverleners</li>
          <li>Investeren in kwaliteitsvolle materialen</li>
          <li>Een betrouwbare software voor planning en facturatie</li>
          <li>Bijscholing om je expertise te blijven ontwikkelen</li>
        </ul>

        <h2>Ondersteuning van Hezo</h2>
        <p>
          Bij Hezo ondersteunen we zelfstandige verpleegkundigen op alle vlakken. 
          Van administratie en facturatie tot opleiding en netwerken met collega's. 
          Je behoudt je vrijheid als ondernemer, maar staat er nooit alleen voor.
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
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
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
