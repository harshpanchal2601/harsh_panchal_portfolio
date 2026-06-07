import { Reveal } from "@/components/motion/reveal";
import Image from "next/image";

const aboutParagraphs = [
  "I started with the basics: HTML, CSS, and JavaScript, and kept building from there. Over time, I moved into full-stack development, cloud deployments, and real production systems.",
  "Today I work across frontend, backend, and infrastructure. I like building products that are easy to use, stable in production, and clear enough for a team to keep improving.",
  "Most of my work sits around Next.js, Angular, Node.js, MongoDB, REST APIs, AWS, and CI/CD workflows.",
] as const;

export function AboutSection() {
  return (
    <section className="relative border-t border-border px-[5vw] py-18 md:py-24 lg:py-28" id="about">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-12">
        <Reveal className="group relative md:col-span-5">
          <div className="absolute -inset-3 rounded-2xl bg-secondary/30 opacity-70 blur-2xl" />
          <Image
            alt="Harsh Profile"
            className="relative w-full rounded-xl border border-border bg-white object-cover shadow-[0_28px_80px_rgba(23,23,23,0.1)]"
            height={1440}
            src="/images/profile.png"
            width={1080}
          />
        </Reveal>

        <Reveal className="md:col-span-7 md:pl-12 lg:pl-18">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            About
          </span>
          <h2 className="mb-6 font-display text-[32px] font-bold leading-[1.12] text-foreground md:text-[44px] lg:text-[48px]">
            I care about useful software, clean execution, and shipping the
            work properly.
          </h2>
          <div className="max-w-2xl space-y-5 text-base leading-[1.75] text-muted-foreground md:text-lg">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
