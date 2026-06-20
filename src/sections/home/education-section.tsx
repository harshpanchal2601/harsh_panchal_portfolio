import { Reveal } from "@/components/motion/reveal";
import { GraduationCap } from "lucide-react";

export function EducationSection() {
  return (
    <section className="border-t border-border px-[5vw] py-10 md:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="premium-card-hover group relative overflow-hidden rounded-2xl border border-border bg-white/72 p-5 shadow-[0_18px_50px_rgba(23,23,23,0.045)] md:p-6">
            <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-700 group-hover:scale-x-100" />
            <div className="grid gap-5 md:grid-cols-[0.36fr_1fr_0.22fr] md:items-center">
              <div>
                <span className="section-label mb-4 block">Education</span>
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/8 text-primary">
                  <GraduationCap className="size-6" />
                </div>
              </div>
              <div>
                <h3 className="font-display text-[27px] font-semibold leading-tight md:text-[32px]">
                  Bachelor of Science, CA &amp; IT
                </h3>
                <p className="mt-3 text-base font-medium leading-relaxed text-muted-foreground md:text-[17px]">
                  K. S. School of Business Management &amp; Information Technology / Gujarat University
                </p>
                <p className="mt-3 max-w-3xl text-base leading-[1.7] text-muted-foreground">
                  Coursework covered software development, web technologies, databases, and application development, supported by project work and deployment practice.
                </p>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/8 px-6 py-4 text-center md:justify-self-end">
                <span className="block font-display text-[32px] font-bold leading-none text-primary">2025</span>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-widest text-primary/60">Graduated</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
