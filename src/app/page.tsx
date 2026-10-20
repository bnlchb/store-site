import type { Metadata } from "next";
import { AboutSection } from "@/components/originalfit/AboutSection";
import { ContactSection } from "@/components/originalfit/ContactSection";
import { HeroSection } from "@/components/originalfit/HeroSection";
import { HowItWorksSection } from "@/components/originalfit/HowItWorksSection";
import { StylesSection } from "@/components/originalfit/StylesSection";

export const metadata: Metadata = {
  title: "Originalfit — Sportswear sélectionné au Maroc",
  description:
    "Originalfit, une sélection sportswear pensée pour accompagner tes journées. Choisis une inspiration, on vérifie le modèle, le prix et le délai avant toute commande. Livraison au Maroc.",
  keywords: [
    "Originalfit",
    "sportswear Maroc",
    "vêtements de sport Maroc",
    "sélection sportswear",
    "style sport",
    "sneakers Maroc",
    "hoodie Maroc",
    "livraison Maroc",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StylesSection />
      <HowItWorksSection />
      <ContactSection />
    </>
  );
}
