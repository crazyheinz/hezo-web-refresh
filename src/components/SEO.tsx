import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  type?: string;
  image?: string;
  structuredData?: object;
}

const SEO = ({ 
  title, 
  description, 
  path = "", 
  type = "website",
  image = "https://www.hezo.be/og-image.png",
  structuredData
}: SEOProps) => {
  const siteUrl = "https://www.hezo.be";
  const fullUrl = `${siteUrl}${path}`;
  const siteName = "Hezo";

  // Default Organization structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Hezo",
    "url": siteUrl,
    "logo": `${siteUrl}/favicon.png`,
    "description": "Hezo ondersteunt zelfstandige thuisverpleegkundigen met administratie, facturatie, patiëntenstroom en begeleiding.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+32 9 265 17 20",
      "email": "info@hezo.be",
      "contactType": "customer service",
      "availableLanguage": ["Dutch", "nl"]
    },
    "sameAs": []
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="nl_BE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || organizationSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
