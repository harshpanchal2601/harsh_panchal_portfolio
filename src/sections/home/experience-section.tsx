"use client";

import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";

const responsibilities = [
  "Creating REST APIs and backend services that support real product workflows.",
  "Handling AWS deployment work across services such as EC2, S3, RDS, Lambda, DynamoDB, DNS, and hosting.",
  "Setting up CI/CD workflows and release automation with GitHub Actions.",
  "Working in a team lead capacity for planning, coordination, and delivery.",
];

const stackFocus = [
  "AWS EC2, S3, RDS, Lambda",
  "GitHub Actions CI/CD",
  "Node.js Backend",
  "DynamoDB",
  "DNS & Hosting",
];

export function ExperienceSection() {
  useRevealOnScroll();

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="experience">
      <div className="mb-16">
        <span className="inline-block px-3 py-1 bg-primary/5 text-primary font-label-md text-label-sm uppercase tracking-widest mb-6 border border-primary/10 reveal-on-scroll">
          Experience
        </span>
        <h2 className="font-headline-lg text-headline-lg mb-4 reveal-on-scroll" style={{ transitionDelay: "80ms" }}>
          Work Experience
        </h2>
        <p className="font-body-md text-body-md text-[#44474d] max-w-lg reveal-on-scroll" style={{ transitionDelay: "150ms" }}>
          Real-world production work building scalable systems and leading delivery across teams.
        </p>
      </div>

      {/* Experience Card */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
        <div className="bg-white border border-stone-border rounded-2xl premium-shadow overflow-hidden">
          {/* Header */}
          <div className="bg-primary-container px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-primary mb-1">Full Stack Developer</h3>
              <p className="font-label-md text-label-md text-on-primary/80">Shambhavi Technovation</p>
            </div>
            <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="font-label-sm text-label-sm text-on-primary">May 2025 – Present</span>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            <p className="font-body-md text-body-md text-[#44474d] mb-8 leading-relaxed">
              Full Stack Developer working on production applications, AWS deployment, REST APIs, CI/CD, and delivery coordination. Building and improving production applications across frontend, backend, and deployment work.
            </p>

            {/* Responsibilities */}
            <div className="mb-8">
              <h4 className="font-label-md text-label-md uppercase tracking-widest text-primary/60 mb-4">Key Responsibilities</h4>
              <div className="space-y-3">
                {responsibilities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl border border-stone-border/60 hover:border-primary/20 hover:bg-primary/2 transition-colors reveal-on-scroll"
                    style={{ transitionDelay: `${300 + i * 80}ms` }}
                  >
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">check_circle</span>
                    <p className="font-body-md text-body-md text-[#44474d] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack Focus */}
            <div>
              <h4 className="font-label-md text-label-md uppercase tracking-widest text-primary/60 mb-4">Stack Focus</h4>
              <div className="flex flex-wrap gap-2">
                {stackFocus.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-primary/5 text-primary font-label-sm text-[11px] uppercase tracking-widest border border-primary/15 rounded-full hover:bg-primary/10 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side stat card */}
        <div className="lg:w-60 flex flex-col gap-4 reveal-on-scroll" style={{ transitionDelay: "400ms" }}>
          <div className="bg-white border border-stone-border rounded-xl premium-shadow p-6 text-center">
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-on-primary text-[20px]">rocket_launch</span>
            </div>
            <p className="font-headline-md text-headline-md font-bold text-primary">Current</p>
            <p className="font-label-sm text-label-sm text-[#44474d]/70 mt-1">Position</p>
          </div>
          <div className="bg-white border border-stone-border rounded-xl premium-shadow p-6 text-center">
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-on-primary text-[20px]">cloud</span>
            </div>
            <p className="font-headline-md text-headline-md font-bold text-primary">AWS</p>
            <p className="font-label-sm text-label-sm text-[#44474d]/70 mt-1">Cloud & DevOps</p>
          </div>
          <div className="bg-white border border-stone-border rounded-xl premium-shadow p-6 text-center">
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-on-primary text-[20px]">groups</span>
            </div>
            <p className="font-headline-md text-headline-md font-bold text-primary">Lead</p>
            <p className="font-label-sm text-label-sm text-[#44474d]/70 mt-1">Team Capacity</p>
          </div>
        </div>
      </div>
    </section>
  );
}
