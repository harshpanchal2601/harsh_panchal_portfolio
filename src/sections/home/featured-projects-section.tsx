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
      className="space-y-[160px] px-[5vw] py-[160px]"
      id="work"
    >
      {primaryProjectPreviews.map((project, index) => (
        <Reveal
          className={`group flex flex-col items-center gap-8 md:flex-row ${
            index === 1 ? "md:flex-row-reverse" : ""
          }`}
          key={project.slug}
        >
          <Link
            className={`relative w-full cursor-pointer overflow-hidden rounded-lg ${
              index === 0 ? "md:w-[60%]" : "md:w-[50%]"
            }`}
            href={project.href}
          >
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
              <span className="translate-y-10 rounded-full bg-white px-8 py-4 font-bold text-black transition-transform duration-500 group-hover:translate-y-0">
                View Project Details
              </span>
            </div>
            <div
              className={`h-[600px] w-full scale-100 transition-all duration-1000 group-hover:scale-105 ${
                projectVisuals[index]
              } ${index === 0 ? "grayscale group-hover:grayscale-0" : ""}`}
            >
              <div className="grid h-full place-items-center">
                <div className="w-[72%] border border-border/60 bg-background/20 p-8 backdrop-blur-sm">
                  <div className="mb-8 h-px bg-primary/70" />
                  <p className="font-display text-[48px] font-bold tracking-[-0.03em]">
                    {project.title}
                  </p>
                  <p className="mt-4 text-muted-foreground">{project.role}</p>
                </div>
              </div>
            </div>
          </Link>

          <div
            className={`flex w-full flex-col items-start ${
              index === 0 ? "md:w-[40%] md:pl-8" : "md:mr-[10%] md:w-[40%]"
            }`}
          >
            <span className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Case Study 0{index + 1}
            </span>
            <h3 className="mb-6 font-display text-[48px] font-bold leading-[1.2] tracking-[-0.02em]">
              {project.title}
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
            <div className="mb-8 flex flex-wrap gap-4">
              {project.tech.slice(0, 3).map((technology) => (
                <span
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  key={technology}
                >
                  {technology}
                </span>
              ))}
            </div>
            <Link
              className="group/link flex items-center gap-2 text-xl font-bold text-foreground transition-colors hover:text-primary"
              href={project.href}
            >
              Explore Story
              <ArrowRight
                aria-hidden="true"
                className="transition-transform group-hover/link:translate-x-2"
              />
            </Link>
          </div>
        </Reveal>
      ))}

      <div className="grid gap-12 md:grid-cols-2">
        {secondaryProjectPreviews.map((project, index) => (
          <Reveal className="border-t border-border/40 pt-8" key={project.slug}>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Additional Work 0{index + 3}
            </span>
            <h3 className="mb-5 font-display text-[32px] font-bold leading-[1.2] tracking-[-0.02em]">
              {project.title}
            </h3>
            <p className="mb-6 text-muted-foreground">{project.summary}</p>
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
    </section>
  );
}
