import { site } from "@/content/site";

// JSON-LD Organization pour le référencement (schema.org).
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phoneE164,
    slogan: site.tagline,
    description: site.uvp,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: site.phoneE164,
      areaServed: "FR",
      availableLanguage: "French",
    },
  };
}
