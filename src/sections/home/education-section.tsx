import { Reveal } from "@/components/motion/reveal";
import { GraduationCap } from "lucide-react";

export function EducationSection() {
  return (
    <section className="border-t border-border px-[5vw] py-18 md:py-24 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <span className="section-label mb-10 block">Education</span>
        </Reveal>
        <div className="space-y-14 md:space-y-20">
          <Reveal>
            <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-8 shadow-[0_18px_50px_rgba(23,23,23,0.05)] transition duration-300 hover:border-primary/25 hover:shadow-[0_28px_70px_rgba(109,94,246,0.1)] md:p-10">
              {/* Accent top border animation */}
              <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-700 group-hover:scale-x-100" />
              
              <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/8 text-primary">
                    <GraduationCap className="size-6" />
                  </div>
                  <h3 className="font-display text-[28px] font-bold leading-tight md:text-[38px]">
                    Bachelor of Science
                    <br />
                    CA &amp; IT
                  </h3>
                  <p className="mt-3 text-lg font-medium text-muted-foreground">
                    K. S. School of Business Management &amp; Information Technology
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Gujarat University</p>
                </div>
                <div className="shrink-0 rounded-xl border border-primary/20 bg-primary/8 px-6 py-4 text-center">
                  <span className="block font-display text-[38px] font-bold leading-none text-primary">2025</span>
                  <span className="mt-1 block text-xs font-semibold uppercase tracking-widest text-primary/60">Graduated</span>
                </div>
              </div>
              
              <p className="mt-8 max-w-3xl text-base leading-[1.75] text-muted-foreground md:text-lg">
                My coursework covered software development, web technologies, databases, and application development. Outside the classroom, I spent most of my time building projects, learning deployments, and improving my backend and JavaScript skills.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
