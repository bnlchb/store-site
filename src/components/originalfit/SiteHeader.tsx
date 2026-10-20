"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import { useSelection } from "@/contexts/SelectionContext";
import { BRAND } from "@/lib/brand";
import { SelectionDrawer } from "./SelectionDrawer";

const NAV_LINKS = [
  { label: "À propos", href: "/#apropos" },
  { label: "Styles", href: "/#styles" },
  { label: "Comment ça marche", href: "/#comment-ca-marche" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count, openDrawer } = useSelection();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <a
        href="#styles"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Aller aux styles
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[70] h-[72px] border-b transition-all duration-300 ${
          scrolled
            ? "border-ink/15 bg-bone/92 backdrop-blur-md"
            : "border-transparent bg-bone"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between gap-4 px-5 lg:px-10">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Originalfit — accueil">
            <span className="h-2.5 w-2.5 bg-ink transition-colors duration-300 group-hover:bg-volt group-hover:ring-1 group-hover:ring-ink" />
            <span className="font-sans text-[17px] font-black tracking-[-0.045em] sm:text-[19px]">
              ORIGINALFIT
            </span>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-muted sm:inline">
              / MA
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openDrawer}
              className="group flex items-center gap-2 border border-ink/20 bg-transparent px-3 py-2 text-[10px] font-bold uppercase tracking-[0.13em] transition-colors hover:border-ink hover:bg-ink hover:text-paper sm:px-4"
            >
              <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span className="hidden xs:inline sm:inline">Ma sélection</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 font-mono text-[10px] text-volt transition-colors group-hover:bg-volt group-hover:text-ink">
                {count}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center border border-ink/20 transition-colors hover:bg-ink hover:text-paper lg:hidden"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-4 w-4" strokeWidth={1.75} />
              ) : (
                <Menu className="h-4 w-4" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-[72px] z-[65] flex flex-col bg-ink text-paper lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <nav className="flex flex-1 flex-col px-5 pt-8" aria-label="Navigation mobile">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + index * 0.06, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center justify-between border-b border-paper/15 py-5"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] text-paper/40">
                        0{index + 1}
                      </span>
                      <span className="text-[8vw] font-black leading-none tracking-[-0.05em] sm:text-4xl">
                        {link.label}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-paper/50 transition-colors group-hover:text-volt"
                      strokeWidth={1.5}
                    />
                  </Link>
                </motion.div>
              ))}

              <motion.button
                type="button"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.35 }}
                onClick={() => {
                  setMobileOpen(false);
                  openDrawer();
                }}
                className="mt-8 flex items-center justify-between bg-volt px-4 py-4 text-left text-ink"
              >
                <span className="text-sm font-black uppercase tracking-[0.08em]">
                  Ma sélection ({count})
                </span>
                <ShoppingBag className="h-4 w-4" strokeWidth={2} />
              </motion.button>
            </nav>

            <div className="flex items-center justify-between border-t border-paper/15 px-5 py-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/45">
                Sportswear · Maroc
              </p>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-paper/70 hover:text-volt"
              >
                Instagram
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SelectionDrawer />
    </>
  );
}
