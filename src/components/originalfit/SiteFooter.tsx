import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Reveal } from "./Reveal";

const FOOTER_LINKS = [
  { label: "Styles", href: "/#styles" },
  { label: "Comment ça marche", href: "/#comment-ca-marche" },
  { label: "Contact", href: "/#contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[1500px] px-5 pb-8 pt-20 lg:px-10 lg:pt-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-8">
            <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-volt sm:text-[10px]">
              <span className="h-1.5 w-1.5 bg-volt" />
              Ton prochain fit
            </div>
            <h2 className="mt-5 text-[16vw] font-black leading-[0.8] tracking-[-0.07em] sm:text-[12vw] lg:text-[8.8vw]">
              commence
              <br />
              <span className="font-serif font-normal italic tracking-[-0.045em] text-volt">
                ici.
              </span>
            </h2>
          </Reveal>

          <Reveal
            className="flex flex-col justify-end lg:col-span-3 lg:col-start-10"
            delay={0.12}
          >
            <p className="max-w-xs text-sm leading-relaxed text-paper/55">
              Prix, disponibilité et modalités de livraison sont communiqués
              par Originalfit avant chaque commande.
            </p>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 flex items-center justify-between gap-4 bg-volt px-4 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-paper"
            >
              Nous contacter sur Instagram
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.9}
              />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 overflow-hidden border-y border-paper/15 py-3 lg:mt-24">
          <div className="marquee-track flex w-max items-center gap-8 font-mono text-[8px] uppercase tracking-[0.24em] text-paper/35">
            {Array.from({ length: 2 }).map((_, group) => (
              <span
                key={group}
                className="flex items-center gap-8 whitespace-nowrap"
              >
                <span>Originalfit</span>
                <span className="h-1 w-1 rounded-full bg-volt" />
                <span>Sportswear sélectionné au Maroc</span>
                <span className="h-1 w-1 rounded-full bg-volt" />
                <span>Prix sur demande</span>
                <span className="h-1 w-1 rounded-full bg-volt" />
                <span>Delivery Morocco</span>
                <span className="h-1 w-1 rounded-full bg-volt" />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Link
              href="/"
              className="inline-flex items-baseline gap-2 font-sans text-3xl font-black tracking-[-0.055em] sm:text-4xl"
            >
              ORIGINALFIT
              <span className="h-2 w-2 bg-volt" />
            </Link>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/40">
              Sportswear · Maroc
            </p>
          </div>

          <nav
            className="flex flex-col gap-2.5 lg:col-span-4"
            aria-label="Liens de pied de page"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/60 transition-colors hover:text-volt"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/60 transition-colors hover:text-volt"
            >
              Instagram
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
            </a>
          </nav>

          <div className="flex flex-col gap-2 lg:col-span-2 lg:items-end">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper/35">
              © {BRAND.year} {BRAND.name}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper/25">
              Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
