import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { GoogleAnalytics } from "@/components/SEO/GoogleAnalytics";
import { StructuredData } from "@/components/SEO/StructuredData";
import { BRAND, SITE_URL } from "@/lib/brand";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const description =
  "Sportswear sélectionné au Maroc. Choisis une inspiration, on vérifie le modèle pour toi. Prix, disponibilité et livraison confirmés par Originalfit avant toute commande.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Originalfit — Sportswear sélectionné au Maroc",
    template: "%s | Originalfit",
  },
  description,
  keywords: [
    "Originalfit",
    "sportswear Maroc",
    "vêtements de sport Maroc",
    "sélection sportswear",
    "style sport",
    "sneakers sport",
    "t-shirt training",
    "hoodie sport",
    "livraison Maroc",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/originalfit-mark.svg",
    shortcut: "/originalfit-mark.svg",
    apple: "/originalfit-mark.svg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: BRAND.wordmark,
    title: "Originalfit — Sportswear sélectionné au Maroc",
    description,
    images: [
      {
        url: "/originalfit-og.jpj",
        width: 1200,
        height: 630,
        alt: "Originalfit — Sportswear sélectionné au Maroc",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Originalfit — Sportswear sélectionné au Maroc",
    description,
    images: ["/originalfit-og.jpj"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#F2EFE6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <StructuredData />
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <CurrencyProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </CurrencyProvider>
      </body>
    </html>
  );
}
