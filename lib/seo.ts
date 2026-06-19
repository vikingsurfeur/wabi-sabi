import { site } from "@/content/site";

// JSON-LD Organization pour le référencement (schema.org).
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    slogan: site.tagline,
    description: site.uvp,
  };
}
