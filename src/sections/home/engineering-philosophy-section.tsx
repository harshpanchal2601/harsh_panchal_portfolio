import { Reveal } from "@/components/motion/reveal";

const philosophyParagraphs = [
  "I believe great software is more than working code. It should be scalable, maintainable, and capable of evolving with business needs.",
  "My approach combines clean architecture, practical problem solving, and user-focused thinking to build systems that remain reliable in production environments.",
  "I enjoy building systems that solve real-world problems while remaining intuitive for users and efficient for teams to maintain.",
] as const;

export function EngineeringPhilosophySection() {
  return (
    <section className="relative overflow-hidden border-y border-border/20 bg-black px-[5vw] py-20 text-center md:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
        <span className="whitespace-nowrap text-[22vw] font-bold text-white">
          CODE IS ART
        </span>
      </div>
      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal>
          <h2 className="mb-12 font-display text-[38px] font-bold leading-[1.12] tracking-[-0.025em] md:mb-16 md:text-[60px]">
            The Philosophy
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-16 text-left md:grid-cols-3">
          {philosophyParagraphs.map((paragraph, index) => (
            <Reveal key={paragraph}>
              <h4 className="mb-4 text-xl font-bold text-primary">
                {index === 0
                  ? "Scalable"
                  : index === 1
                    ? "Maintainable"
                    : "User-Focused"}
              </h4>
              <p className="text-base leading-[1.75] text-muted-foreground md:text-lg">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
