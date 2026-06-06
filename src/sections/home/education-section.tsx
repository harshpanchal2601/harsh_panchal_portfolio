import { Reveal } from "@/components/motion/reveal";

export function EducationSection() {
  return (
    <section className="border-t border-border/30 px-[5vw] py-[160px]">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <span className="mb-12 block text-center text-xs font-semibold uppercase tracking-widest text-primary">
            Academic Roots
          </span>
        </Reveal>
        <div className="space-y-24">
          <div className="group flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h3 className="font-display text-[48px] font-bold leading-tight tracking-[-0.02em] md:text-[64px]">
                Bachelor of Science
                <br />
                CA & IT
              </h3>
              <p className="mt-4 text-xl text-muted-foreground">
                K. S. School of Business Management & Information Technology
              </p>
              <p className="mt-2 text-muted-foreground">Gujarat University</p>
            </div>
            <div className="text-right">
              <span className="font-display text-[48px] font-bold leading-[1.2] tracking-[-0.02em] text-border transition-colors group-hover:text-primary">
                2025
              </span>
            </div>
          </div>
          <Reveal>
            <p className="max-w-3xl text-lg leading-[1.8] text-muted-foreground">
              Focused on software development, web technologies, databases, and
              practical application development. Alongside academic learning, I
              invested heavily in hands-on engineering experience through
              real-world projects, cloud deployments, backend architecture, and
              modern JavaScript ecosystems.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
