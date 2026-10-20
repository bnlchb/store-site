import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    number: "01",
    title: "Choisis ton style",
    description:
      "Ajoute à ta sélection les inspirations et tailles qui t’intéressent.",
  },
  {
    number: "02",
    title: "Demande les détails",
    description:
      "Contacte Originalfit pour vérifier le modèle, le prix, le délai et la livraison.",
  },
  {
    number: "03",
    title: "Confirme si tu veux",
    description:
      "Tu passes commande directement avec la boutique une fois les détails confirmés.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="comment-ca-marche"
      className="relative scroll-mt-[72px] overflow-hidden bg-paper"
    >
      <span
        className="pointer-events-none absolute -bottom-24 -right-6 select-none font-sans text-[38vw] font-black leading-none tracking-[-0.08em] text-ink/[0.035] lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2"
        aria-hidden="true"
      >
        03
      </span>

      <div className="relative mx-auto max-w-[1500px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50 sm:text-[10px]">
                <span className="h-1.5 w-1.5 bg-volt ring-1 ring-ink" />
                Simple et transparent
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-5 text-[15vw] font-black leading-[0.86] tracking-[-0.06em] sm:text-[10vw] lg:text-[5.5vw]">
                Comment
                <br />
                ça marche.
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted sm:text-[15px]">
                Tu décides après avoir reçu les informations de la boutique.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 border border-ink/15 px-3 py-2">
                <span className="h-2 w-2 bg-volt ring-1 ring-ink" />
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/60">
                  Aucun paiement avant confirmation
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border-t border-ink/20">
              {STEPS.map((step, index) => (
                <Reveal key={step.number} delay={0.08 + index * 0.08}>
                  <div className="group relative border-b border-ink/20">
                    <div className="absolute inset-0 origin-left scale-x-0 bg-volt/30 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    <div className="relative grid grid-cols-[44px_1fr_36px] items-start gap-4 py-6 sm:grid-cols-[64px_1fr_44px] sm:py-8">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
                        Étape {step.number}
                      </span>
                      <div>
                        <h3 className="text-xl font-black tracking-[-0.025em] sm:text-2xl">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                          {step.description}
                        </p>
                      </div>
                      <span className="flex h-9 w-9 items-center justify-center border border-ink/20 transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={1.5}
                        />
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
