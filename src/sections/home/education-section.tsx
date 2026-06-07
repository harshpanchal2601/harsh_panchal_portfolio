import { Reveal } from "@/components/motion/reveal";

export function EducationSection() {
  return (
    <section className="border-t border-border px-[5vw] py-18 md:py-24 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <span className="mb-10 block text-center text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Education
          </span>
        </Reveal>
        <div className="space-y-14 md:space-y-20">
          <div className="group flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h3 className="font-display text-[32px] font-bold leading-tight md:text-[44px] lg:text-[48px]">
                Bachelor of Science
                <br />
                CA & IT
              </h3>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                K. S. School of Business Management & Information Technology
              </p>
              <p className="mt-2 text-muted-foreground">Gujarat University</p>
            </div>
            <div className="text-left md:text-right">
              <span className="font-display text-[34px] font-bold leading-[1.2] text-muted-foreground transition-colors group-hover:text-primary md:text-[42px]">
                2025
              </span>
            </div>
          </div>
          <Reveal>
            <p className="max-w-3xl text-base leading-[1.75] text-muted-foreground md:text-lg">
              My coursework covered software development, web technologies,
              databases, and application development. Outside the classroom, I
              spent most of my time building projects, learning deployments, and
              improving my backend and JavaScript skills.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
