import { Reveal } from "./Reveal";

const PRINCIPLES = [
  { number: "01", label: "Choisis un style" },
  { number: "02", label: "On vérifie" },
  { number: "03", label: "Tu confirmes" },
];

export function AboutSection() {
  return (
    <section
      id="apropos"
      className="relative scroll-mt-[72px] overflow-hidden bg-ink text-paper"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#F7F4EC_1px,transparent_1px),linear-gradient(to_bottom,#F7F4EC_1px,transparent_1px)] [background-size:88px_88px]" />
      <div className="relative mx-auto max-w-[1500px] px-5 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/45 sm:text-[10px]">
            <span>01 — L’esprit Originalfit</span>
            <span>Manifeste</span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-8" delay={0.05}>
            <h2 className="text-[16vw] font-black leading-[0.82] tracking-[-0.065em] sm:text-[13vw] lg:text-[7.9vw]">
              <span className="block">Du sport.</span>
              <span className="text-outline-light block">Du style.</span>
              <span className="block font-serif font-normal italic tracking-[-0.04em] text-volt">
                À ta façon.
              </span>
            </h2>
          </Reveal>

          <Reveal
            className="self-end lg:col-span-3 lg:col-start-10"
            delay={0.18}
          >
            <div className="border-t border-paper/25 pt-5">
              <p className="text-base leading-relaxed text-paper/85 sm:text-lg">
                Originalfit, c’est une sélection sportswear pensée pour
                accompagner tes journées — de l’entraînement aux moments off.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-paper/55">
                Tu n’as pas besoin de savoir si une pièce est déjà disponible :
                envoie-nous le style qui te plaît, et l’équipe te confirme les
                options, le prix et le délai avant toute commande.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="h-2 w-2 bg-volt" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/45">
                  Sélection, pas stock
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 grid border-t border-paper/20 sm:grid-cols-3 lg:mt-24">
            {PRINCIPLES.map((principle, index) => (
              <div
                key={principle.number}
                className={`group flex items-baseline gap-4 border-b border-paper/20 py-6 sm:border-b-0 sm:py-8 ${
                  index < PRINCIPLES.length - 1
                    ? "sm:border-r sm:border-paper/20 sm:pr-6"
                    : ""
                } ${index > 0 ? "sm:pl-6" : ""}`}
              >
                <span className="font-mono text-[10px] text-volt">
                  {principle.number}
                </span>
                <span className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                  {principle.label}
                </span>
                <span className="ml-auto font-mono text-[10px] text-paper/25 transition-colors group-hover:text-paper/60">
                  ↗
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
