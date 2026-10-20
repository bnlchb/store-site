/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  titleTemplate: "%s | Originalfit",
  defaultTitle: "Originalfit — Sportswear sélectionné au Maroc",

  description:
    "Sportswear sélectionné au Maroc. Choisis une inspiration, on vérifie le modèle pour toi. Prix, disponibilité et livraison confirmés par Originalfit avant toute commande.",

  canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://www.originalfit.ma",

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.originalfit.ma",
    siteName: "Originalfit",
    title: "Originalfit — Sportswear sélectionné au Maroc",
    description:
      "Sportswear sélectionné au Maroc. Choisis une inspiration, on vérifie le modèle pour toi.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.originalfit.ma"}/originalfit-og.jpj`,
        width: 1200,
        height: 630,
        alt: "Originalfit — Sportswear sélectionné au Maroc",
      },
    ],
  },

  twitter: {
    cardType: "summary_large_image",
  },

  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "Originalfit, sportswear Maroc, vêtements de sport Maroc, sélection sportswear, style sport, sneakers sport, hoodie sport, livraison Maroc",
    },
    {
      name: "author",
      content: "Originalfit",
    },
    {
      name: "geo.region",
      content: "MA",
    },
    {
      name: "geo.placename",
      content: "Maroc",
    },
  ],
};

module.exports = defaultSEOConfig;
