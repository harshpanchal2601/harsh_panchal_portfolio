import { Reveal } from "@/components/motion/reveal";

const responsibilities = [
  "Building and improving production applications across frontend, backend, and deployment work.",
  "Creating REST APIs and backend services that support real product workflows.",
  "Handling AWS deployment work across services such as EC2, S3, RDS, Lambda, DynamoDB, DNS, and hosting.",
  "Setting up CI/CD workflows and release automation with GitHub Actions.",
  "Working in a team lead capacity for planning, coordination, and delivery.",
] as const;

export function ExperienceTimelineSection() {
  return (
    <section className="relative overflow-hidden border-t border-border px-[5vw] py-18 md:py-24 lg:py-28" id="experience">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 rounded-full bg-primary/8 blur-[120px]" />
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Experience
              </span>
              <h2 className="font-display text-[32px] font-bold leading-[1.12] md:text-[44px] lg:text-[48px]">
                Shambhavi Technovation
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="text-left md:text-right">
              <span className="font-display text-[24px] font-bold leading-[1.2] text-primary md:text-[28px]">
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
              <p className="mb-10 font-display text-[24px] font-bold leading-tight text-foreground md:text-[34px]">
                Full Stack Developer working on production applications, AWS
                deployment, REST APIs, CI/CD, and delivery coordination.
              </p>
            </Reveal>
            <div className="space-y-5">
              {responsibilities.map((responsibility) => (
                <Reveal className="group flex gap-5 rounded-xl py-1 transition duration-300 hover:translate-x-1 md:gap-8" key={responsibility}>
                  <div className="mt-2 h-auto min-h-14 w-1 rounded-full bg-border transition-colors group-hover:bg-primary" />
                  <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {responsibility}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="flex flex-col gap-4 md:col-span-4">
            <div className="glass-panel rounded-xl p-7">
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
