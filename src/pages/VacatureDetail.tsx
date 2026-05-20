import { useParams, Link, Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Briefcase, CheckCircle2, MapPin, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import ApplicationForm from "@/components/vacatures/ApplicationForm";
import { getVacatureBySlug, activeVacatures } from "@/data/vacatures";

const VacatureDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const job = slug ? getVacatureBySlug(slug) : undefined;

  if (!job || !job.active) {
    return <Navigate to="/vacatures/" replace />;
  }

  const jobUrl = `https://www.hezo.be/vacatures/${job.id}/`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hezo.be/" },
          { "@type": "ListItem", "position": 2, "name": "Vacatures", "item": "https://www.hezo.be/vacatures/" },
          { "@type": "ListItem", "position": 3, "name": job.title, "item": jobUrl },
        ],
      },
      {
        "@type": "JobPosting",
        "@id": jobUrl,
        "identifier": {
          "@type": "PropertyValue",
          "name": "Hezo",
          "value": job.id,
        },
        "title": job.title,
        "description": `<p>${job.description}</p><h3>Verantwoordelijkheden</h3><ul>${job.responsibilities
          .map((r) => `<li>${r}</li>`)
          .join("")}</ul><h3>Profiel</h3><ul>${job.profile.map((p) => `<li>${p}</li>`).join("")}</ul><h3>Wat bieden we</h3><ul>${job.offer
          .map((o) => `<li>${o}</li>`)
          .join("")}</ul>`,
        "datePosted": job.datePosted,
        "validThrough": job.validThrough,
        "employmentType": ["CONTRACTOR", "FULL_TIME", "PART_TIME"],
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Hezo",
          "sameAs": "https://www.hezo.be",
          "logo": "https://www.hezo.be/favicon.png",
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": job.locality,
            "addressRegion": "Vlaanderen",
            "addressCountry": "BE",
          },
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "EUR",
          "value": {
            "@type": "QuantitativeValue",
            "minValue": job.baseSalary.min,
            "maxValue": job.baseSalary.max,
            "unitText": job.baseSalary.unit,
          },
        },
        "qualifications": job.profile.join(" "),
        "responsibilities": job.responsibilities.join(" "),
        "jobBenefits": job.offer.join(" "),
        "industry": "Healthcare",
        "occupationalCategory": "29-1141 Registered Nurses",
        "directApply": true,
        "url": jobUrl,
        "applicantLocationRequirements": { "@type": "Country", "name": "BE" },
      },
    ],
  };

  // Andere openstaande vacatures voor cross-linking
  const otherJobs = activeVacatures.filter((v) => v.id !== job.id).slice(0, 3);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEO
        title={job.metaTitle}
        description={job.metaDescription}
        path={`/vacatures/${job.id}/`}
        structuredData={structuredData}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/vacatures/"
            className="inline-flex items-center gap-2 text-secondary hover:underline mb-8 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Alle vacatures
          </Link>

          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                Zelfstandig
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.region}
              </span>
            </div>
            <p className="text-xl text-muted-foreground">{job.tagline}</p>
          </div>

          <Card className="border-secondary/20 shadow-sm mb-10">
            <CardContent className="space-y-6 pt-6">
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>

              <Accordion type="multiple" defaultValue={["responsibilities", "profile", "offer"]} className="w-full">
                <AccordionItem value="responsibilities">
                  <AccordionTrigger className="text-lg font-semibold">
                    Wat doe je als {job.title}?
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {job.responsibilities.map((item, idx) => (
                        <li key={idx} className="flex items-start text-muted-foreground">
                          <CheckCircle2 className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="profile">
                  <AccordionTrigger className="text-lg font-semibold">Wie ben jij?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {job.profile.map((item, idx) => (
                        <li key={idx} className="flex items-start text-muted-foreground">
                          <CheckCircle2 className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="offer">
                  <AccordionTrigger className="text-lg font-semibold">Wat mag je verwachten?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {job.offer.map((item, idx) => (
                        <li key={idx} className="flex items-start text-muted-foreground">
                          <CheckCircle2 className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button
                size="lg"
                onClick={() =>
                  document.getElementById("sollicitatie")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="w-full sm:w-auto"
              >
                Solliciteer voor deze functie
              </Button>
            </CardContent>
          </Card>

          <ApplicationForm jobId={job.id} jobTitle={job.title} />

          {otherJobs.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Andere openstaande vacatures</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherJobs.map((other) => (
                  <Link key={other.id} to={`/vacatures/${other.id}/`} className="block">
                    <Card className="border-secondary/20 hover:shadow-md transition-shadow h-full">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-2 line-clamp-2">{other.title}</h3>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {other.region}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VacatureDetail;
