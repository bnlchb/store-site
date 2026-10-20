"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import { useSelection } from "@/contexts/SelectionContext";
import {
  FILTERS,
  INSPIRATIONS,
  type Inspiration,
} from "@/lib/inspirations";
import { ProductArt } from "./ProductArt";
import { Reveal } from "./Reveal";

interface ToastState {
  id: number;
  message: string;
}

function StyleCard({
  style,
  index,
  onAdd,
}: {
  style: Inspiration;
  index: number;
  onAdd: (style: Inspiration, size: string) => void;
}) {
  const { hasItem } = useSelection();
  const [size, setSize] = useState(style.sizes[0]);
  const alreadyAdded = hasItem(style.id, size);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col border border-ink/15 bg-paper"
    >
      <div
        className="relative aspect-[4/5] overflow-hidden"
        style={{ backgroundColor: style.tone }}
        aria-label={`Visuel d’inspiration : ${style.name}`}
      >
        <div className="of-grid absolute inset-0 opacity-30" />

        <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 border border-ink/15 bg-paper/90 px-2.5 py-1 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-ink" />
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink">
            {style.badge}
          </span>
        </div>

        <span className="absolute right-4 top-4 z-10 font-mono text-[10px] tracking-[0.14em] text-ink/45">
          0{index + 1}
        </span>

        <div className="absolute inset-x-6 bottom-10 top-14 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.045]">
          <ProductArt kind={style.kind} className="h-auto w-full" />
        </div>

        <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-2">
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/55">
            Visuel d’inspiration
          </span>
          <span className="flex h-7 w-7 items-center justify-center border border-ink/20 bg-paper/70 transition-colors group-hover:bg-ink group-hover:text-paper">
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
          {style.category} · visuel d'inspiration
        </p>

        <div className="mt-2 flex items-start justify-between gap-3">
          <h3 className="text-[22px] font-black leading-none tracking-[-0.035em]">
            {style.name}
          </h3>
          <span className="shrink-0 pt-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-ink/55">
            Prix sur demande
          </span>
        </div>

        <div className="mt-5">
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
            Taille souhaitée
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {style.sizes.map((sizeOption) => {
              const selected = sizeOption === size;
              return (
                <button
                  key={sizeOption}
                  type="button"
                  onClick={() => setSize(sizeOption)}
                  aria-pressed={selected}
                  className={`flex h-7 min-w-8 items-center justify-center border px-2 font-mono text-[10px] transition-colors ${
                    selected
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/20 bg-transparent text-ink hover:border-ink"
                  }`}
                >
                  {sizeOption}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onAdd(style, size)}
          className={`mt-4 flex w-full items-center justify-between gap-3 border px-3.5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
            alreadyAdded
              ? "border-ink/20 bg-transparent text-muted"
              : "border-ink bg-ink text-paper hover:bg-volt hover:text-ink"
          }`}
        >
          <span className="inline-flex items-center gap-2">
            {alreadyAdded ? (
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            ) : (
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            )}
            {alreadyAdded ? "Dans ta sélection" : "Ajouter"}
          </span>
          <span className="font-mono text-[9px] font-normal normal-case tracking-normal opacity-60">
            {size}
          </span>
        </button>

        <p className="mt-2.5 text-[10px] leading-snug text-muted">
          Disponibilité à confirmer avec Originalfit
        </p>
      </div>
    </motion.article>
  );
}

export function StylesSection() {
  const { addItem, openDrawer } = useSelection();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Tout");
  const [toast, setToast] = useState<ToastState | null>(null);

  const filteredStyles = useMemo(
    () =>
      INSPIRATIONS.filter(
        (style) => filter === "Tout" || style.filter === filter
      ),
    [filter]
  );

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleAdd = (style: Inspiration, size: string) => {
    const result = addItem(style, size);
    setToast({
      id: Date.now(),
      message:
        result === "added"
          ? `${style.name} — taille ${size} ajouté à ta sélection.`
          : `${style.name} — taille ${size} est déjà dans ta sélection.`,
    });
  };

  return (
    <section id="styles" className="scroll-mt-[72px] bg-bone">
      <div className="mx-auto max-w-[1500px] px-5 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50 sm:text-[10px]">
            <span>02 — Styles à découvrir</span>
            <span className="hidden sm:inline">Prix et disponibilité sur demande</span>
          </div>
        </Reveal>

        <div className="mt-8 grid items-end gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7" delay={0.05}>
            <h2 className="text-[14vw] font-black leading-[0.84] tracking-[-0.065em] sm:text-[10vw] lg:text-[6.6vw]">
              Le prochain{" "}
              <span className="font-serif font-normal italic tracking-[-0.04em]">
                fit.
              </span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-[15px]">
              Parcours les inspirations et ajoute ce que tu aimerais trouver.
              Prix et disponibilité confirmés sur demande.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-ink/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer les styles">
            {FILTERS.map((filterOption) => {
              const active = filterOption === filter;
              return (
                <button
                  key={filterOption}
                  type="button"
                  onClick={() => setFilter(filterOption)}
                  aria-pressed={active}
                  className={`relative px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? "bg-ink text-paper"
                      : "border border-ink/15 text-ink/60 hover:border-ink hover:text-ink"
                  }`}
                >
                  {filterOption}
                </button>
              );
            })}
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/45">
            {String(filteredStyles.length).padStart(2, "0")} inspiration
            {filteredStyles.length > 1 ? "s" : ""}
          </p>
        </div>

        <motion.div
          layout
          className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredStyles.map((style, index) => (
              <StyleCard
                key={style.id}
                style={style}
                index={INSPIRATIONS.findIndex((item) => item.id === style.id)}
                onAdd={handleAdd}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-10 flex items-start gap-3 border-t border-ink/15 pt-5">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-ink" />
          <p className="max-w-4xl font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-ink/45">
            Les photos sont des visuels d’inspiration, pas des références en
            stock. Les modèles exacts et les tarifs sont confirmés avant
            validation.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.28 }}
            className="fixed bottom-5 left-1/2 z-[60] flex w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 items-center justify-between gap-4 border border-ink bg-paper px-4 py-3 shadow-[0_18px_50px_rgba(17,17,16,0.18)] sm:left-6 sm:translate-x-0"
            role="status"
            aria-live="polite"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-volt text-ink">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <p className="truncate text-xs font-semibold">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={openDrawer}
              className="shrink-0 border-b border-ink text-[9px] font-bold uppercase tracking-[0.12em] hover:text-muted"
            >
              Voir
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
