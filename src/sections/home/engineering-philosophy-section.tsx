import { Reveal } from "@/components/motion/reveal";
import { Target, Zap, Users } from "lucide-react";

const philosophyItems = [
  {
    icon: Target,
    label: "Clear",
    paragraph: "Good software should be understandable after the first release. I try to keep structure clear so future changes are not painful.",
  },
  {
    icon: Zap,
    label: "Practical",
    paragraph: "I prefer practical decisions over over-engineering. The goal is to solve the product problem and keep the system stable.",
  },
  {
    icon: Users,
    label: "User-Focused",
    paragraph: "Users should not have to think about the technical work behind a product. The experience should feel direct, fast, and reliable.",
  },
] as const;

export function EngineeringPhilosophySection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-white/60 px-[5vw] py-18 text-center md:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-secondary/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal>
          <span className="section-label mb-4 justify-center">Philosophy</span>
          <h2 className="mb-10 font-display text-[32px] font-bold leading-[1.12] md:mb-14 md:text-[44px] lg:text-[48px]">
            How I Work
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 text-left md:grid-cols-3">
          {philosophyItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                delay={index * 0.08}
                key={item.label}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-[0_18px_50px_rgba(23,23,23,0.05)] card-hover-lift"
              >
                {/* Top accent line on hover */}
                <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-500 group-hover:scale-x-100" />
                
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/8 transition duration-300 group-hover:bg-primary/14 group-hover:scale-105">
                  <Icon className="size-6 text-primary" />
                </div>
                <h4 className="mb-3 text-[20px] font-bold text-foreground">{item.label}</h4>
                <p className="text-base leading-[1.75] text-muted-foreground md:text-[17px]">{item.paragraph}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
