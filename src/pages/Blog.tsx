import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Blog articles data - add new articles here
export const blogArticles = [
  {
    id: "thuisverpleging-wat-is-het",
    title: "Wat is thuisverpleging en voor wie is het bedoeld?",
    excerpt: "Thuisverpleging biedt professionele zorg aan huis voor mensen die door ziekte, ouderdom of een beperking ondersteuning nodig hebben. Ontdek wat thuisverpleging inhoudt en wie er baat bij heeft.",
    date: "2025-01-15",
    category: "Thuisverpleging",
    readTime: "5 min"
  },
  {
    id: "zelfstandig-verpleegkundige-worden",
    title: "Zelfstandig verpleegkundige worden: stappen en tips",
    excerpt: "Droom je ervan om als zelfstandig verpleegkundige te werken? We bespreken de belangrijkste stappen, van opleiding tot praktijk opstarten, en geven praktische tips voor een succesvolle start.",
    date: "2025-01-10",
    category: "Carrière",
    readTime: "7 min"
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("nl-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const Blog = () => {
  return (
    <>
      <SEO
        title="Blog | Hezo - Inzichten over thuisverpleging"
        description="Lees onze artikelen over thuisverpleging, zelfstandig ondernemen als verpleegkundige, en tips voor een succesvolle carrière in de zorgsector."
        path="/blog/"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Hezo Blog",
          "description": "Artikelen over thuisverpleging en zelfstandig ondernemen als verpleegkundige",
          "url": "https://www.hezo.be/blog/",
          "publisher": {
            "@type": "Organization",
            "name": "Hezo",
            "url": "https://www.hezo.be"
          }
        }}
      />

      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-secondary font-medium text-sm uppercase tracking-wider mb-3 block">
                Kenniscentrum
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Blog
              </h1>
              <p className="text-lg text-muted-foreground">
                Inzichten, tips en nieuws over thuisverpleging en zelfstandig ondernemen in de zorgsector.
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogArticles.map((article) => (
                <Card key={article.id} className="group hover:shadow-lg transition-shadow duration-300 border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-primary mb-3 group-hover:text-secondary transition-colors">
                      <Link to={`/blog/${article.id}/`}>
                        {article.title}
                      </Link>
                    </h2>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(article.date)}</span>
                      </div>
                      
                      <Link 
                        to={`/blog/${article.id}/`}
                        className="inline-flex items-center gap-1 text-secondary font-medium hover:gap-2 transition-all"
                      >
                        Lees meer
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
