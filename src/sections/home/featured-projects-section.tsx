import Link from "next/link";
import { ArrowRight, BadgeCheck, Layers, Target } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import {
  primaryProjectPreviews,
  secondaryProjectPreviews,
} from "@/data/projects";
import { InteractiveProjectShowcase } from "@/components/shared/interactive-project-showcase";

export function FeaturedProjectsSection() {
  return (
    <section
      className="relative overflow-hidden border-t border-border px-[5vw] py-12 md:py-16 lg:py-18"
      id="work"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-secondary/20 to-transparent" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-10 md:space-y-14">
        <Reveal className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <span className="section-label mb-4 block">Selected Work</span>
            <h2 className="font-display text-[32px] font-semibold leading-[1.12] text-foreground md:text-[36px] lg:text-[38px]">
              Proof of work, not just project cards.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-[1.75] text-muted-foreground md:ml-auto md:text-[17px]">
            The strongest projects get live surfaces and delivery context first. Smaller builds stay compact so the page keeps momentum.
          </p>
        </Reveal>

        {primaryProjectPreviews.map((project, index) => (
          <Reveal
              className={`premium-card-hover group grid items-center gap-7 rounded-2xl border border-border bg-white/58 p-3 shadow-[0_22px_70px_rgba(23,23,23,0.05)] backdrop-blur-sm md:grid-cols-12 md:gap-10 md:p-5 ${
              index === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
            key={project.slug}
          >
            <InteractiveProjectShowcase project={project} />

            <div className="flex w-full flex-col items-start px-1 pb-3 md:col-span-5 md:px-0 md:pb-0">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-primary/20 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Featured Build 0{index + 1}
                </span>
                <span className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                  Live proof
                </span>
              </div>
              <h3 className="mb-4 font-display text-[30px] font-semibold leading-[1.14] md:text-[34px]">
                {project.title}
              </h3>
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {project.role}
              </p>
              <div className="mb-5 grid w-full gap-3">
                <div className="rounded-xl border border-border bg-white/72 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    <Target className="size-3.5" />
                    Problem
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {project.challenge}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-white/72 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    <BadgeCheck className="size-3.5" />
                    Build Scope
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                </div>
              </div>
              <div className="mb-7 flex flex-wrap gap-3">
                {project.tech.slice(0, 5).map((technology) => (
                  <span
                  className="rounded-full border border-border/80 px-3 py-1 text-xs text-muted-foreground transition duration-300 hover:border-primary/35 hover:bg-primary/8 hover:text-primary"
                    key={technology}
                  >
                    {technology}
                  </span>
                ))}
              </div>
              <Link
                className="group/link inline-flex items-center gap-2 text-base font-bold text-foreground transition-colors hover:text-primary focus-visible:text-primary md:text-[17px]"
                href={project.href}
              >
                Open Case
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform group-hover/link:translate-x-2"
                  size={20}
                />
              </Link>
            </div>
          </Reveal>
        ))}

        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <span className="section-label mb-3 block">Additional Builds</span>
            <h3 className="font-display text-[26px] font-semibold leading-tight text-foreground md:text-[30px]">
              Smaller systems, same delivery mindset.
            </h3>
          </div>
        </Reveal>

        <div className="-mx-[5vw] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[5vw] pb-3 [scrollbar-width:none] [-ms-overflow-style:none] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {secondaryProjectPreviews.map((project, index) => (
            <Reveal
              className="premium-card-hover group min-h-[300px] w-[84vw] max-w-[360px] shrink-0 snap-center rounded-xl border border-border bg-white/82 p-6 shadow-[0_16px_44px_rgba(23,23,23,0.045)] md:min-h-0 md:w-auto md:max-w-none"
              key={project.slug}
            >
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Build 0{index + 3}
              </span>
              <h3 className="mb-3 font-display text-[26px] font-semibold leading-[1.15] md:text-[30px]">
                {project.title}
              </h3>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {project.role}
              </p>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                {project.challenge}
              </p>
              <div className="mb-5 flex items-center gap-2 rounded-xl border border-border bg-white/60 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                <Layers className="size-3.5" />
                Compact build proof
              </div>
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tech.slice(0, 4).map((technology) => (
                  <span
                    className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground transition duration-300 hover:border-primary/35 hover:bg-primary/8 hover:text-primary"
                    key={technology}
                  >
                    {technology}
                  </span>
                ))}
              </div>
              <Link
                className="group/link inline-flex items-center gap-2 font-bold text-foreground transition-colors hover:text-primary focus-visible:text-primary"
                href={project.href}
              >
                View Work
                <ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover/link:translate-x-1.5" size={18} />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
