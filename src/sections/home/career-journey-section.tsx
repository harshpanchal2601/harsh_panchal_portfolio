import { Reveal } from "@/components/motion/reveal";

const journeySteps = [
  {
    year: "2022",
    title: "Getting the basics right",
    text: "Built a base through CA & IT coursework, programming fundamentals, databases, HTML, CSS, and JavaScript.",
  },
  {
    year: "2023",
    title: "Moving into full stack",
    text: "Started connecting frontend work with backend APIs, JavaScript frameworks, and practical application structure.",
  },
  {
    year: "2024",
    title: "Building real projects",
    text: "Worked on product interfaces, backend workflows, deployments, and the practical needs that come with client work.",
  },
  {
    year: "2025",
    title: "Production work",
    text: "Moved into production systems, AWS infrastructure, CI/CD, and team lead capacity at Shambhavi Technovation.",
  },
] as const;

export function CareerJourneySection() {
  return (
    <section className="border-y border-border bg-[#f5f2ec] px-[5vw] py-18 md:py-24 lg:py-28" id="journey">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mb-12 text-center font-display text-[32px] font-bold leading-[1.12] md:mb-16 md:text-[44px] lg:text-[48px]">
            Career Journey
          </h2>
        </Reveal>
        <div className="relative">
          <div className="journey-line absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 opacity-30 md:block" />
          <div className="space-y-12 md:space-y-20">
            {journeySteps.map((step, index) => (
              <Reveal
                className={`group relative flex flex-col items-start gap-5 rounded-xl transition duration-300 hover:translate-y-[-2px] md:flex-row md:items-center md:gap-12 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                key={step.year}
              >
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:text-right" : ""
                  }`}
                >
                  <span className="mb-2 block font-display text-[34px] font-bold leading-none text-primary md:text-[44px]">
                    {step.year}
                  </span>
                  <h3 className="mb-3 font-display text-[24px] font-bold leading-[1.2] md:text-[30px]">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
                <div className="absolute left-1/2 z-10 hidden size-4 -translate-x-1/2 rounded-full border-4 border-background bg-primary transition-shadow duration-300 group-hover:shadow-[0_0_0_8px_rgba(109,94,246,0.12)] md:block" />
                <div className="w-full md:w-1/2" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
