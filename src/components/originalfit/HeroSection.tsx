"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { ProductArt } from "./ProductArt";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease, delay },
        };

  return (
    <section className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-bone">
      <div className="of-grid pointer-events-none absolute inset-0 opacity-[0.55]" />
      <div className="pointer-events-none absolute -right-24 top-32 h-[420px] w-[420px] rounded-full border border-ink/10" />
      <div className="pointer-events-none absolute -right-10 top-48 h-[280px] w-[280px] rounded-full border border-ink/10" />

      <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-[1500px] flex-col px-5 pb-6 pt-6 lg:px-10 lg:pb-8">
        <motion.div
          {...reveal(0.05)}
          className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 sm:text-[10px]"
        >
          <span>Sportswear sélectionné au Maroc</span>
          <span className="hidden sm:inline">Sélection 2026 — Maroc</span>
        </motion.div>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-12 lg:gap-8 lg:py-8">
          <div className="lg:col-span-8">
            <motion.h1
              {...reveal(0.1)}
              className="font-sans text-[19vw] font-black leading-[0.79] tracking-[-0.075em] sm:text-[18vw] lg:text-[13.2vw]"
            >
              <span className="block">Original</span>
              <span className="mt-1 block lg:pl-[8vw]">
                <span className="font-serif font-normal italic tracking-[-0.05em]">
                  Fit
                </span>
                <span className="text-volt [-webkit-text-stroke:2px_#111110]">
                  .
                </span>
              </span>
            </motion.h1>

            <motion.div
              {...reveal(0.24)}
              className="mt-9 grid max-w-3xl gap-7 border-t border-ink/20 pt-6 sm:grid-cols-[1.05fr_0.95fr] sm:gap-10 lg:mt-10"
            >
              <div>
                <p className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                  {BRAND.tagline}
                </p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted sm:text-[15px]">
                  Choisis une inspiration. On vérifie le modèle pour toi.
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 sm:items-end sm:justify-center">
                <Link
                  href="/#styles"
                  className="group inline-flex w-full items-center justify-between gap-6 bg-ink px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-volt hover:text-ink sm:w-auto"
                >
                  Découvrir les styles
                  <ArrowDownRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    strokeWidth={1.75}
                  />
                </Link>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border-b border-ink/40 pb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink hover:text-muted"
                >
                  Instagram
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            {...reveal(0.32)}
            className="mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:col-span-4 lg:ml-auto lg:mr-0"
          >
            <div className="relative">
              <div
                className="absolute -inset-2.5 translate-x-2 translate-y-2.5 bg-volt"
                aria-hidden="true"
              />
              <div className="relative border border-ink bg-ink p-3 text-paper">
                <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-paper/55">
                  <span>OF—001 / Inspiration</span>
                  <span>Range 01</span>
                </div>
                <div className="mt-3 overflow-hidden bg-volt">
                  <ProductArt kind="sneaker" className="h-auto w-full" />
                </div>
                <div className="mt-3 flex items-end justify-between border-t border-paper/15 pt-3">
                  <div>
                    <p className="text-sm font-bold tracking-[-0.01em]">
                      Sneakers sport
                    </p>
                    <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-paper/45">
                      Style sport
                    </p>
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center bg-volt text-ink">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 -rotate-3 border border-ink bg-paper px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em]">
                Prix sur demande
              </div>

              <div className="absolute -right-10 top-1/2 hidden h-[92px] w-[92px] -translate-y-1/2 items-center justify-center rounded-full border border-ink/25 bg-bone/90 xl:flex">
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 h-full w-full animate-spin-slow"
                  aria-hidden="true"
                >
                  <defs>
                    <path
                      id="hero-badge-path"
                      d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text
                    fill="#111110"
                    fontSize="7.2"
                    fontFamily="monospace"
                    letterSpacing="1.9"
                  >
                    <textPath href="#hero-badge-path">
                      ORIGINALFIT · SELECTED IN MOROCCO ·
                    </textPath>
                  </text>
                </svg>
                <span className="font-mono text-[9px] font-bold tracking-[0.16em]">
                  OF
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          {...reveal(0.45)}
          className="flex items-center justify-between gap-4 border-t border-ink/20 pt-4"
        >
          <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/60 sm:text-[9px]">
            <span className="h-1.5 w-1.5 bg-ink" />
            Authentic sportswear · Delivery Morocco
          </div>

          <div className="hidden min-w-0 flex-1 overflow-hidden px-10 md:block">
            <div className="marquee-track flex w-max items-center gap-8 font-mono text-[8px] uppercase tracking-[0.22em] text-ink/35">
              {Array.from({ length: 2 }).map((_, group) => (
                <span key={group} className="flex items-center gap-8 whitespace-nowrap">
                  <span>Originalfit</span>
                  <span className="h-1 w-1 rounded-full bg-volt ring-1 ring-ink/30" />
                  <span>Selected in Morocco</span>
                  <span className="h-1 w-1 rounded-full bg-volt ring-1 ring-ink/30" />
                  <span>Prix sur demande</span>
                  <span className="h-1 w-1 rounded-full bg-volt ring-1 ring-ink/30" />
                  <span>Originalfit</span>
                  <span className="h-1 w-1 rounded-full bg-volt ring-1 ring-ink/30" />
                </span>
              ))}
            </div>
          </div>

          <a
            href="#apropos"
            className="group inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/60 transition-colors hover:text-ink sm:text-[9px]"
          >
            Faire défiler
            <span className="flex h-6 w-6 items-center justify-center border border-ink/20 transition-colors group-hover:border-ink">
              <ArrowDown className="h-3 w-3 animate-bounce" strokeWidth={1.75} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
