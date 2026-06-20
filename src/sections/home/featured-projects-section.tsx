import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import {
  primaryProjectPreviews,
  secondaryProjectPreviews,
} from "@/data/projects";
import { InteractiveProjectShowcase } from "@/components/shared/interactive-project-showcase";

export function FeaturedProjectsSection() {
  return (
    <section
      className="border-t border-border px-[5vw] py-18 md:py-24 lg:py-28"
      id="work"
    >
      <div className="mx-auto max-w-7xl space-y-16 md:space-y-22">
        {primaryProjectPreviews.map((project, index) => (
          <Reveal
              className={`group grid items-center gap-8 md:grid-cols-12 md:gap-12 ${
              index === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
            key={project.slug}
          >
            <InteractiveProjectShowcase project={project} />

            <div className="flex w-full flex-col items-start md:col-span-5">
              <span className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Project 0{index + 1}
              </span>
              <h3 className="mb-4 font-display text-[32px] font-bold leading-[1.12] md:text-[42px]">
                {project.title}
              </h3>
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {project.role}
              </p>
              <div className="mb-6 border-l border-primary/50 pl-5">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Problem
                </span>
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  {project.challenge}
                </p>
              </div>
              <p className="mb-7 text-base leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
              <div className="mb-8 flex flex-wrap gap-3">
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
                className="group/link inline-flex items-center gap-2 text-base font-bold text-foreground transition-colors hover:text-primary focus-visible:text-primary md:text-lg"
                href={project.href}
              >
                View Work
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform group-hover/link:translate-x-2"
                  size={20}
                />
              </Link>
            </div>
          </Reveal>
        ))}

        <div className="grid gap-6 md:grid-cols-2">
          {secondaryProjectPreviews.map((project, index) => (
            <Reveal
              className="group rounded-xl border border-border bg-white p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_64px_rgba(109,94,246,0.12)]"
              key={project.slug}
            >
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Project 0{index + 3}
              </span>
              <h3 className="mb-3 font-display text-[28px] font-bold leading-[1.15] md:text-[32px]">
                {project.title}
              </h3>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {project.role}
              </p>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                {project.challenge}
              </p>
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
