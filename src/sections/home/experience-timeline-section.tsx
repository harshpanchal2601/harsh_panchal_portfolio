import { Reveal } from "@/components/motion/reveal";

const responsibilities = [
  "Designing and developing scalable web applications using modern JavaScript frameworks.",
  "Building RESTful APIs and backend services for production environments.",
  "Managing AWS infrastructure including EC2, S3, RDS, Lambda, DynamoDB, DNS hosting, and deployment workflows.",
  "Implementing CI/CD pipelines and deployment automation using GitHub Actions.",
  "Contributing to system architecture decisions and technical planning.",
  "Acting in a team lead capacity for project execution and development coordination.",
] as const;

export function ExperienceTimelineSection() {
  return (
    <section className="relative overflow-hidden border-t border-border/20 px-[5vw] py-20 md:py-28 lg:py-32" id="experience">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 rounded-full bg-primary/5 blur-[120px]" />
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 md:mb-18 md:flex-row md:items-baseline">
          <Reveal>
            <div>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Leadership & Impact
              </span>
              <h2 className="font-display text-[38px] font-bold leading-[1.15] tracking-[-0.025em] md:text-[56px]">
                Shambhavi Technovation
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="text-left md:text-right">
              <span className="font-display text-[26px] font-bold leading-[1.2] tracking-[-0.02em] text-primary md:text-[32px]">
                May 2025 - Present
              </span>
              <p className="font-medium text-muted-foreground">
                Full Stack Developer
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <p className="mb-10 font-display text-[26px] font-bold leading-tight text-foreground md:text-[36px]">
                Contributing to large-scale products, leading technical
                initiatives, and building{" "}
                <span className="text-primary italic">
                  modern, cloud-native architectures
                </span>{" "}
                on AWS.
              </p>
            </Reveal>
            <div className="space-y-7 md:space-y-10">
              {responsibilities.slice(0, 4).map((responsibility) => (
                <Reveal className="group flex gap-5 md:gap-8" key={responsibility}>
                  <div className="mt-2 h-24 w-1 bg-border transition-colors group-hover:bg-primary" />
                  <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {responsibility}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="flex flex-col gap-4 md:col-span-4">
            <div className="glass-panel rounded-lg p-8">
              <span className="mb-2 block font-bold text-primary">
                Stack Focus
              </span>
              <ul className="space-y-2 text-muted-foreground">
                <li>AWS EC2, S3, RDS, Lambda</li>
                <li>GitHub Actions CI/CD</li>
                <li>Node.js Backend</li>
                <li>REST API Architecture</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
