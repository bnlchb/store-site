export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.originalfit.ma";

export const BRAND = {
  name: "Originalfit",
  wordmark: "ORIGINALFIT",
  tagline: "Le style sport, à ton rythme.",
  description:
    "Sportswear sélectionné au Maroc. Choisis une inspiration, on vérifie le modèle, le prix et le délai avant toute commande.",
  instagramUrl: "https://www.instagram.com/originalfit.ma/",
  instagramDmUrl: "https://ig.me/m/originalfit.ma",
  location: "Maroc",
  year: 2026,
} as const;
