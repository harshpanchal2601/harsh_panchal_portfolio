import { Reveal } from "@/components/motion/reveal";

const journeySteps = [
  {
    year: "2022",
    title: "Academic Foundation",
    text: "Built the computer science base through CA & IT coursework, programming fundamentals, databases, and web technologies.",
  },
  {
    year: "2023",
    title: "Full Stack Learning",
    text: "Moved from fundamentals into modern frontend, backend APIs, JavaScript ecosystems, and practical application structure.",
  },
  {
    year: "2024",
    title: "Real Project Building",
    text: "Converted learning into shipped project work across product interfaces, backend workflows, deployments, and client needs.",
  },
  {
    year: "2025",
    title: "Production & Leadership",
    text: "Stepped into production systems, AWS infrastructure, CI/CD, and team-level ownership at Shambhavi Technovation.",
  },
] as const;

export function CareerJourneySection() {
  return (
    <section className="border-y border-border/20 bg-[#323537]/30 px-[5vw] py-20 md:py-28 lg:py-32" id="journey">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mb-14 text-center font-display text-[38px] font-bold leading-[1.12] tracking-[-0.025em] md:mb-20 md:text-[60px]">
            A Non-Linear Evolution
          </h2>
        </Reveal>
        <div className="relative">
          <div className="journey-line absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 opacity-30 md:block" />
          <div className="space-y-12 md:space-y-20">
            {journeySteps.map((step, index) => (
              <Reveal
                className={`relative flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-12 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                key={step.year}
              >
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:text-right" : ""
                  }`}
                >
                  <span className="mb-2 block font-display text-[44px] font-bold leading-none tracking-[-0.03em] text-primary md:text-[56px]">
                    {step.year}
                  </span>
                  <h3 className="mb-3 font-display text-[28px] font-bold leading-[1.2] tracking-[-0.02em] md:text-[32px]">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
                <div className="absolute left-1/2 z-10 hidden size-4 -translate-x-1/2 rounded-full border-4 border-background bg-primary md:block" />
                <div className="w-full md:w-1/2" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
