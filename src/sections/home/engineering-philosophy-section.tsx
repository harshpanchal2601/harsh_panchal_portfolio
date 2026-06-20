import { Reveal } from "@/components/motion/reveal";
import { Target, Zap, Users } from "lucide-react";

const philosophyItems = [
  {
    icon: Target,
    label: "Ship Stable",
    paragraph: "I care about releases that keep working after launch: clear flows, predictable behavior, and fewer fragile surprises.",
  },
  {
    icon: Zap,
    label: "Build Practical",
    paragraph: "I choose tools and patterns that fit the product problem, the team, and the timeline instead of adding complexity for show.",
  },
  {
    icon: Users,
    label: "Make It Obvious",
    paragraph: "Users and teams should understand the workflow quickly. Good interfaces and APIs reduce confusion for everyone.",
  },
] as const;

export function EngineeringPhilosophySection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-white/60 px-[5vw] py-10 text-center md:py-14 lg:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-secondary/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <span className="section-label mb-4 justify-center">Philosophy</span>
          <h2 className="mb-7 font-display text-[32px] font-semibold leading-[1.14] md:mb-8 md:text-[36px] lg:text-[38px]">
            How I Work
          </h2>
        </Reveal>

        <div className="grid overflow-hidden rounded-2xl border border-border bg-white/70 text-left shadow-[0_18px_58px_rgba(23,23,23,0.045)] md:grid-cols-3">
          {philosophyItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                delay={index * 0.08}
                key={item.label}
                className="premium-card-hover group relative border-b border-border p-5 transition duration-300 hover:bg-white md:border-b-0 md:border-r md:p-6 md:last:border-r-0"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-500 group-hover:scale-x-100" />
                
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-primary/15 bg-white transition duration-300 group-hover:scale-105 group-hover:border-primary/25">
                    <Icon className="size-5 text-primary" />
                  </span>
                  <h4 className="text-[20px] font-bold text-foreground">{item.label}</h4>
                </div>
                <p className="text-base leading-[1.7] text-muted-foreground">{item.paragraph}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
