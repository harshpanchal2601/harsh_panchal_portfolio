import { Reveal } from "@/components/motion/reveal";

const philosophyParagraphs = [
  "I believe great software is more than working code. It should be scalable, maintainable, and capable of evolving with business needs.",
  "My approach combines clean architecture, practical problem solving, and user-focused thinking to build systems that remain reliable in production environments.",
  "I enjoy building systems that solve real-world problems while remaining intuitive for users and efficient for teams to maintain.",
] as const;

export function EngineeringPhilosophySection() {
  return (
    <section className="relative overflow-hidden bg-black px-[5vw] py-[160px] text-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
        <span className="whitespace-nowrap text-[30vw] font-bold text-white">
          CODE IS ART
        </span>
      </div>
      <div className="relative z-10 mx-auto max-w-4xl">
        <Reveal>
          <h2 className="mb-16 font-display text-[48px] font-bold leading-[1.2] tracking-[-0.02em] md:text-[80px]">
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
              <p className="text-lg leading-[1.8] text-muted-foreground">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
