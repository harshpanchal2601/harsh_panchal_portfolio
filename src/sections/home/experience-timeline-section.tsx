import { Reveal } from "@/components/motion/reveal";
import { Briefcase, MapPin } from "lucide-react";

const responsibilities = [
  "Building and improving production applications across frontend, backend, and deployment work.",
  "Creating REST APIs and backend services that support real product workflows.",
  "Handling AWS deployment work across services such as EC2, S3, RDS, Lambda, DynamoDB, DNS, and hosting.",
  "Setting up CI/CD workflows and release automation with GitHub Actions.",
  "Working in a team lead capacity for planning, coordination, and delivery.",
] as const;

const stackChips = ["AWS", "Node.js", "React", "CI/CD", "REST APIs", "EC2", "S3"] as const;

export function ExperienceTimelineSection() {
  return (
    <section className="relative overflow-hidden border-t border-border px-[5vw] py-18 md:py-24 lg:py-28" id="experience">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-primary/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <span className="section-label mb-4 block">Experience</span>
              <h2 className="font-display text-[32px] font-bold leading-[1.12] md:text-[44px] lg:text-[48px]">
                Shambhavi Technovation
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Briefcase className="size-3.5 text-primary" />Full Stack Developer</span>
                <span className="text-border">·</span>
                <span className="flex items-center gap-1.5"><MapPin className="size-3.5 text-primary" />Ahmedabad, India</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-xl border border-primary/20 bg-primary/8 px-5 py-3 text-left md:text-right">
              <span className="block font-display text-[22px] font-bold leading-[1.2] text-primary md:text-[26px]">
                May 2025 – Present
              </span>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-primary/70">Current Role</p>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal>
              <p className="mb-10 font-display text-[24px] font-bold leading-tight text-foreground md:text-[32px]">
                Full Stack Developer working on production applications, AWS deployment, REST APIs, CI/CD, and delivery coordination.
              </p>
            </Reveal>
            <div className="space-y-4">
              {responsibilities.map((responsibility, i) => (
                <Reveal
                  delay={i * 0.06}
                  className="group flex gap-5 rounded-xl border border-transparent p-4 transition duration-300 hover:border-border hover:bg-white hover:shadow-[0_8px_24px_rgba(23,23,23,0.04)] md:gap-6"
                  key={responsibility}
                >
                  <div className="mt-2.5 h-auto min-h-10 w-[3px] flex-shrink-0 rounded-full bg-border transition-colors duration-300 group-hover:bg-primary" />
                  <p className="text-base leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {responsibility}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1} className="flex flex-col gap-4 md:col-span-4">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)]">
              <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">Stack Focus</span>
              <div className="flex flex-wrap gap-2">
                {stackChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground transition duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
