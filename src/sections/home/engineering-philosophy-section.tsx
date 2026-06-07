import { Reveal } from "@/components/motion/reveal";

const philosophyParagraphs = [
  "Good software should be understandable after the first release. I try to keep structure clear so future changes are not painful.",
  "I prefer practical decisions over over-engineering. The goal is to solve the product problem and keep the system stable.",
  "Users should not have to think about the technical work behind a product. The experience should feel direct, fast, and reliable.",
] as const;

export function EngineeringPhilosophySection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-white/60 px-[5vw] py-18 text-center md:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-secondary/20 to-transparent" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal>
          <h2 className="mb-10 font-display text-[32px] font-bold leading-[1.12] md:mb-12 md:text-[44px] lg:text-[48px]">
            How I Work
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 text-left md:grid-cols-3">
          {philosophyParagraphs.map((paragraph, index) => (
            <Reveal className="rounded-xl border border-border bg-white p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_64px_rgba(109,94,246,0.1)]" key={paragraph}>
              <h4 className="mb-4 text-xl font-bold text-primary">
                {index === 0
                  ? "Clear"
                  : index === 1
                    ? "Practical"
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
