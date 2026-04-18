import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { blogArticles } from "@/data/blogArticles";
import blogHeroSoftware from "@/assets/blog-hero-software.png";
import blogHeroPatienten from "@/assets/blog-hero-patienten.png";
import blogHeroAdministratie from "@/assets/blog-hero-administratie.png";
import blogHeroZelfstandig from "@/assets/blog-hero-zelfstandig.png";
import blogHeroHbo5 from "@/assets/blog-hero-hbo5.png";
import blogHeroBalans from "@/assets/blog-hero-balans.png";
import blogHeroMeerDanSpuitje from "@/assets/blog-hero-meer-dan-spuitje.png";
import blogHeroInkomen from "@/assets/blog-hero-inkomen.png";

// Re-export for backward compatibility
export type { BlogArticleData as BlogArticle } from "@/data/blogArticles";
export { blogArticles } from "@/data/blogArticles";

const heroImages: Record<string, string> = {
  "inkomen-zelfstandige-thuisverpleegkundige": blogHeroInkomen,
  "thuisverpleging-meer-dan-spuitje": blogHeroMeerDanSpuitje,
  "werk-privebalans-thuisverpleegkundige": blogHeroBalans,
  "software-thuisverpleging": blogHeroSoftware,
  "patienten-thuisverpleegkundige": blogHeroPatienten,
  "administratie-thuisverpleging": blogHeroAdministratie,
  "zelfstandig-thuisverpleegkundige-worden": blogHeroZelfstandig,
  "hbo5-graduaat-basisverpleegkunde": blogHeroHbo5,
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("nl-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const Blog = () => {
  const [featured, ...rest] = blogArticles;

  return (
    <>
      <SEO
        title="Blog | Tips voor zelfstandige thuisverpleegkundigen"
        description="Praktische tips over facturatie, tarificatie, starten als zelfstandige en meer. Lees onze artikelen voor thuisverpleegkundigen →"
        path="/blog/"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Blog",
              "@id": "https://www.hezo.be/blog/#blog",
              "name": "Hezo Blog",
              "description": "Praktische kennis en inzichten voor zelfstandige thuisverpleegkundigen. Artikelen over ondernemen, facturatie, verzekeringen, opleiding en professionele groei in de thuiszorg.",
              "url": "https://www.hezo.be/blog/",
              "inLanguage": "nl-BE",
              "publisher": {
                "@type": "Organization",
                "name": "Hezo",
                "url": "https://www.hezo.be"
              },
              "blogPost": blogArticles.map(article => ({
                "@type": "BlogPosting",
                "headline": article.title,
                "description": article.excerpt,
                "datePublished": article.date,
                "url": `https://www.hezo.be/blog/${article.id}/`,
                "author": {
                  "@type": "Organization",
                  "name": "Hezo"
                }
              }))
            },
            {
              "@type": "CollectionPage",
              "name": "Hezo Blog - Kenniscentrum voor Thuisverpleegkundigen",
              "description": "Verzameling van artikelen en inzichten voor zelfstandige thuisverpleegkundigen over ondernemen, facturatie, opleidingen en professionele groei.",
              "url": "https://www.hezo.be/blog/",
              "isPartOf": {
                "@type": "WebSite",
                "name": "Hezo",
                "url": "https://www.hezo.be"
              }
            }
          ]
        }}
      />

      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Blog</h1>
              <p className="text-lg text-muted-foreground">
                Praktische kennis en tips voor zelfstandige thuisverpleegkundigen.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {featured && (
          <section className="pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="group overflow-hidden border-border/50 hover:border-secondary/30 hover:shadow-lg transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  <Link
                    to={`/blog/${featured.id}/`}
                    className="block bg-light-blue/5 overflow-hidden aspect-[4/3] md:aspect-auto"
                  >
                    {heroImages[featured.id] && (
                      <img
                        src={heroImages[featured.id]}
                        alt={featured.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </Link>
                  <CardContent className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium">
                        {featured.category}
                      </span>
                      <span>•</span>
                      <span>{featured.readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4 group-hover:text-secondary transition-colors">
                      <Link to={`/blog/${featured.id}/`}>{featured.title}</Link>
                    </h2>
                    <p className="text-muted-foreground mb-6">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(featured.date)}</span>
                      </div>
                      <Link
                        to={`/blog/${featured.id}/`}
                        className="inline-flex items-center gap-1 text-secondary font-medium hover:gap-2 transition-all"
                      >
                        Lees meer
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <Card
                  key={article.id}
                  className="group overflow-hidden hover:shadow-lg hover:border-secondary/30 transition-all duration-300 border-border/50 flex flex-col"
                >
                  <Link
                    to={`/blog/${article.id}/`}
                    className="block bg-light-blue/5 overflow-hidden aspect-[4/3]"
                  >
                    {heroImages[article.id] && (
                      <img
                        src={heroImages[article.id]}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </Link>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="text-xl font-semibold text-primary mb-3 group-hover:text-secondary transition-colors">
                      <Link to={`/blog/${article.id}/`}>{article.title}</Link>
                    </h2>

                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">{article.excerpt}</p>

                    <div className="flex items-center justify-between mt-auto">
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
