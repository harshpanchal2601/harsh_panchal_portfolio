import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import {
  primaryProjectPreviews,
  secondaryProjectPreviews,
} from "@/data/projects";

const projectVisuals = [
  "bg-[radial-gradient(circle_at_22%_20%,rgba(192,193,255,0.34),transparent_28%),radial-gradient(circle_at_70%_65%,rgba(208,188,255,0.22),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]",
  "bg-[radial-gradient(circle_at_68%_24%,rgba(173,198,255,0.28),transparent_28%),radial-gradient(circle_at_26%_70%,rgba(192,193,255,0.20),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02))]",
] as const;

export function FeaturedProjectsSection() {
  return (
    <section
      className="border-t border-border/20 px-[5vw] py-20 md:py-28 lg:py-32"
      id="work"
    >
      <div className="mx-auto max-w-7xl space-y-20 md:space-y-28">
        {primaryProjectPreviews.map((project, index) => (
          <Reveal
            className={`group grid items-center gap-8 md:grid-cols-12 md:gap-12 ${
              index === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
            key={project.slug}
          >
            <Link
              className="relative block w-full cursor-pointer overflow-hidden rounded-lg border border-border/40 md:col-span-7"
              href={project.href}
            >
              <div className="absolute inset-0 z-10 flex items-end justify-start bg-black/0 p-5 transition-colors duration-700 group-hover:bg-black/10 md:p-8">
                <span className="inline-flex translate-y-4 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  View Project Details
                  <ArrowRight aria-hidden="true" size={16} />
                </span>
              </div>
              <div
                className={`h-[360px] w-full transition-transform duration-1000 group-hover:scale-[1.02] md:h-[560px] ${
                  projectVisuals[index]
                }`}
              >
                <div className="grid h-full place-items-center p-5 md:p-10">
                  <div className="w-full max-w-[520px] border border-border/50 bg-background/25 p-5 backdrop-blur-sm md:p-8">
                    <div className="mb-6 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                      <span>Primary Build</span>
                      <span>0{index + 1}</span>
                    </div>
                    <p className="font-display text-[34px] font-bold leading-tight tracking-[-0.03em] md:text-[48px]">
                      {project.title}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {project.role}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <div className="flex w-full flex-col items-start md:col-span-5">
              <span className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Case Study 0{index + 1}
              </span>
              <h3 className="mb-4 font-display text-[36px] font-bold leading-[1.12] tracking-[-0.025em] md:text-[48px]">
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
                    className="rounded-full border border-border/80 px-3 py-1 text-xs text-muted-foreground"
                    key={technology}
                  >
                    {technology}
                  </span>
                ))}
              </div>
              <Link
                className="group/link inline-flex items-center gap-2 text-base font-bold text-foreground transition-colors hover:text-primary md:text-lg"
                href={project.href}
              >
                Explore Story
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
              className="border-t border-border/40 pt-8"
              key={project.slug}
            >
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Additional Work 0{index + 3}
              </span>
              <h3 className="mb-3 font-display text-[30px] font-bold leading-[1.15] tracking-[-0.02em] md:text-[34px]">
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
                    className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground"
                    key={technology}
                  >
                    {technology}
                  </span>
                ))}
              </div>
              <Link
                className="inline-flex items-center gap-2 font-bold text-foreground transition-colors hover:text-primary"
                href={project.href}
              >
                View Case Study
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
