import { ArrowRight, Cloud, GraduationCap, Rocket, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CareerJourneySection } from "@/sections/home/career-journey-section";
import { EducationSection } from "@/sections/home/education-section";
import { ExperienceTimelineSection } from "@/sections/home/experience-timeline-section";

const milestones = [
  {
    title: "Foundation",
    detail: "Coursework, programming fundamentals, databases, and early web development.",
    icon: GraduationCap,
  },
  {
    title: "Junior Full Stack Work",
    detail: "Operational products, internal workflows, and applied product delivery.",
    icon: Rocket,
  },
  {
    title: "Cloud And AWS",
    detail: "Infrastructure, deployments, CI/CD, and production systems ownership.",
    icon: Cloud,
  },
  {
    title: "Team Lead Capacity",
    detail: "Planning, coordination, and helping delivery move cleanly across teams.",
    icon: Users,
  },
] as const;

export function CareerPathSection() {
  return (
    <section className="border-t border-border px-[5vw] py-16 md:py-24" id="journey">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 md:mb-14">
          <div className="max-w-3xl">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Career Path
            </span>
            <h2 className="font-display text-[32px] font-bold leading-[1.12] text-foreground md:text-[44px] lg:text-[48px]">
              From fundamentals to production systems, cloud ownership, and delivery leadership.
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-muted-foreground md:text-lg">
              This path groups education, early full stack work, production delivery,
              AWS infrastructure, and team lead capacity into one clearer progression.
            </p>
          </div>
        </Reveal>

        <div className="mb-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;

            return (
              <Reveal delay={index * 0.04} key={milestone.title}>
                <div className="group flex h-full flex-col rounded-xl border border-border bg-white p-5 shadow-[0_18px_50px_rgba(23,23,23,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_64px_rgba(109,94,246,0.1)]">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    {index < milestones.length - 1 ? (
                      <ArrowRight
                        aria-hidden="true"
                        className="hidden size-4 text-primary/70 xl:block"
                      />
                    ) : null}
                  </div>
                  <h3 className="mb-3 font-display text-[22px] font-bold leading-[1.2] text-foreground">
                    {milestone.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {milestone.detail}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div className="space-y-0">
        <ExperienceTimelineSection />
        <CareerJourneySection />
        <EducationSection />
      </div>
    </section>
  );
}
