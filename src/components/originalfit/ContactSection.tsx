"use client";

import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { useSelection } from "@/contexts/SelectionContext";
import { BRAND } from "@/lib/brand";
import { Reveal } from "./Reveal";

export function ContactSection() {
  const { count, openDrawer } = useSelection();

  return (
    <section
      id="contact"
      className="relative scroll-mt-[72px] overflow-hidden bg-volt text-ink"
    >
      <span
        className="pointer-events-none absolute -bottom-[12vw] right-[-3vw] select-none font-sans text-[48vw] font-black leading-none tracking-[-0.09em] text-ink/[0.055] lg:text-[34vw]"
        aria-hidden="true"
      >
        OF
      </span>

      <div className="relative mx-auto max-w-[1500px] px-5 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/55 sm:text-[10px]">
            <span>On reste en contact</span>
            <span>Instagram · DM</span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-8" delay={0.05}>
            <h2 className="text-[15vw] font-black leading-[0.82] tracking-[-0.07em] sm:text-[11vw] lg:text-[7.4vw]">
              <span className="block">Vu un modèle ?</span>
              <span className="block font-serif font-normal italic tracking-[-0.045em]">
                On le cherche.
              </span>
            </h2>
          </Reveal>

          <Reveal
            className="self-end lg:col-span-3 lg:col-start-10"
            delay={0.16}
          >
            <div className="border-t border-ink/30 pt-5">
              <p className="text-sm leading-relaxed text-ink/80 sm:text-[15px]">
                Envoie une photo ou choisis un style dans la sélection. Pour
                une réponse rapide, retrouve Originalfit sur Instagram.
              </p>

              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 flex w-full items-center justify-between gap-4 bg-ink px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                Écrire à Originalfit
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                />
              </a>

              {count > 0 && (
                <button
                  type="button"
                  onClick={openDrawer}
                  className="group mt-2 flex w-full items-center justify-between gap-4 border border-ink/30 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors hover:border-ink hover:bg-ink/5"
                >
                  <span className="inline-flex items-center gap-2">
                    <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.75} />
                    Voir ma sélection ({count})
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </button>
              )}

              <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/55">
                Questions · tailles · demandes
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 flex items-center gap-4 border-t border-ink/25 pt-4 lg:mt-24">
            <span className="h-1.5 w-1.5 bg-ink" />
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/55">
              Disponibilité, prix et livraison confirmés avant chaque commande.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
