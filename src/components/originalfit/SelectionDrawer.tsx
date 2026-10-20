"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useSelection } from "@/contexts/SelectionContext";
import { BRAND } from "@/lib/brand";
import { ProductArt } from "./ProductArt";

export function SelectionDrawer() {
  const {
    items,
    count,
    isOpen,
    closeDrawer,
    removeItem,
    clearSelection,
  } = useSelection();
  const [copied, setCopied] = useState(false);

  const handleSend = async () => {
    const summary = [
      "Ma sélection Originalfit :",
      ...items.map((item) => `- ${item.name} — taille ${item.size}`),
      "",
      "Pouvez-vous me confirmer la disponibilité, le prix et le délai ?",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3500);
    } catch {
      // Clipboard access can be blocked — Instagram still opens.
    }

    window.open(BRAND.instagramDmUrl, "_blank", "noopener,noreferrer");
  };

  const goToStyles = () => {
    closeDrawer();
    window.setTimeout(() => {
      document.getElementById("styles")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80]">
          <motion.button
            type="button"
            aria-label="Fermer la sélection"
            className="absolute inset-0 h-full w-full cursor-default bg-ink/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="selection-title"
            className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col border-l border-ink/15 bg-paper shadow-[-24px_0_60px_rgba(17,17,16,0.12)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-ink/15 px-5 py-4 sm:px-7">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  Originalfit
                </p>
                <h2
                  id="selection-title"
                  className="mt-1 text-xl font-black tracking-[-0.03em]"
                >
                  Ma sélection{" "}
                  <span className="ml-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-ink px-1.5 font-mono text-[11px] text-volt">
                    {count}
                  </span>
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="flex h-10 w-10 items-center justify-center border border-ink/20 transition-colors hover:bg-ink hover:text-paper"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-7">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-ink/15 bg-bone">
                    <ShoppingBag className="h-8 w-8" strokeWidth={1.25} />
                  </div>
                  <p className="mt-6 text-xl font-black tracking-[-0.02em]">
                    Ta sélection est vide.
                  </p>
                  <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-muted">
                    Parcours les inspirations et ajoute les pièces que tu
                    aimerais trouver.
                  </p>
                  <button
                    type="button"
                    onClick={goToStyles}
                    className="mt-6 inline-flex items-center gap-2 bg-ink px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-volt hover:text-ink"
                  >
                    Découvrir les styles
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-ink/10">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.key}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 24 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 py-5"
                      >
                        <div
                          className="h-[76px] w-[76px] shrink-0 overflow-hidden border border-ink/10"
                          style={{ backgroundColor: item.tone }}
                        >
                          <ProductArt
                            kind={item.kind}
                            className="h-full w-full scale-110"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                            {item.category}
                          </p>
                          <p className="mt-1 text-sm font-bold tracking-[-0.01em]">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-muted">
                            Taille souhaitée :{" "}
                            <span className="font-semibold text-ink">
                              {item.size}
                            </span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          className="self-start p-2 text-muted transition-colors hover:text-ink"
                          aria-label={`Retirer ${item.name}, taille ${item.size}`}
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            <div className="border-t border-ink/15 bg-bone/60 px-5 py-5 sm:px-7">
              {items.length > 0 && (
                <>
                  <p className="text-xs leading-relaxed text-muted">
                    La sélection est envoyée à Originalfit pour vérification.
                    Prix, disponibilité et délai sont confirmés avant toute
                    commande.
                  </p>
                  <button
                    type="button"
                    onClick={handleSend}
                    className="mt-4 flex w-full items-center justify-between gap-3 bg-ink px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-volt hover:text-ink"
                  >
                    <span>Envoyer ma sélection sur Instagram</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={2} />
                  </button>
                  {copied && (
                    <p className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-ink">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      Sélection copiée — colle-la dans ton message Instagram.
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goToStyles}
                      className="text-[11px] font-bold uppercase tracking-[0.14em] underline decoration-1 underline-offset-4 hover:text-muted"
                    >
                      Continuer la sélection
                    </button>
                    <button
                      type="button"
                      onClick={clearSelection}
                      className="text-[11px] text-muted underline decoration-1 underline-offset-4 hover:text-ink"
                    >
                      Tout retirer
                    </button>
                  </div>
                </>
              )}
              {items.length === 0 && (
                <p className="text-center text-[11px] leading-relaxed text-muted">
                  Prix et disponibilité confirmés sur demande.
                </p>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
