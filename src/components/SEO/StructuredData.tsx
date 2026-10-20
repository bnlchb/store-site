import { BRAND, SITE_URL } from "@/lib/brand";

export function StructuredData() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: BRAND.name,
        alternateName: BRAND.wordmark,
        url: SITE_URL,
        logo: `${SITE_URL}/originalfit-mark.svg`,
        description:
          "Sélection sportswear au Maroc. Originalfit vérifie le modèle, le prix et le délai avant chaque commande.",
        areaServed: {
          "@type": "Country",
          name: "Morocco",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          areaServed: "MA",
          availableLanguage: ["fr", "ar", "en"],
        },
        sameAs: [BRAND.instagramUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND.wordmark,
        description:
          "Sportswear sélectionné au Maroc. Choisis une inspiration, on vérifie le modèle pour toi.",
        inLanguage: "fr-MA",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Originalfit — Sportswear sélectionné au Maroc",
        description:
          "Originalfit, une sélection sportswear pensée pour accompagner tes journées. Prix et disponibilité confirmés sur demande.",
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#organization`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/originalfit-og.png`,
          width: 1200,
          height: 630,
        },
        inLanguage: "fr-MA",
      },
      {
        "@type": "Store",
        "@id": `${SITE_URL}/#store`,
        name: "Originalfit",
        description:
          "Sélection sportswear au Maroc — prix et disponibilité confirmés sur demande.",
        url: SITE_URL,
        image: `${SITE_URL}/originalfit-og.png`,
        address: {
          "@type": "PostalAddress",
          addressCountry: "MA",
          addressRegion: "Maroc",
        },
        areaServed: {
          "@type": "Country",
          name: "Morocco",
        },
        priceRange: "Sur demande",
        currenciesAccepted: "MAD",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
