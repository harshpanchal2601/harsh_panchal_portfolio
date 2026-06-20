"use client";

import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";

const coursework = [
  "Software Development",
  "Web Technologies",
  "Database Systems",
  "Application Development",
  "Programming Fundamentals",
  "Information Technology",
];

export function EducationSection() {
  useRevealOnScroll();

  return (
    <section className="py-section-gap bg-white px-margin-mobile md:px-margin-desktop" id="education">
      <div className="max-w-container-max mx-auto">
        <div className="mb-16">
          <span className="inline-block px-3 py-1 bg-primary/5 text-primary font-label-md text-label-sm uppercase tracking-widest mb-6 border border-primary/10 reveal-on-scroll">
            Education
          </span>
          <h2 className="font-headline-lg text-headline-lg mb-4 reveal-on-scroll" style={{ transitionDelay: "80ms" }}>
            Academic Background
          </h2>
          <p className="font-body-md text-body-md text-[#44474d] max-w-lg reveal-on-scroll" style={{ transitionDelay: "150ms" }}>
            A foundation built through structured coursework and self-driven project work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Degree Card */}
          <div
            className="bg-white border border-stone-border rounded-2xl premium-shadow overflow-hidden reveal-on-scroll"
            style={{ transitionDelay: "200ms" }}
          >
            <div className="bg-primary-container px-8 py-6">
              <span className="inline-block font-label-sm text-label-sm uppercase tracking-widest text-on-primary/70 mb-2">Bachelor of Science</span>
              <h3 className="font-headline-md text-headline-md text-on-primary mb-1">CA &amp; IT</h3>
              <p className="font-label-md text-label-md text-on-primary/80">Computer Applications &amp; Information Technology</p>
            </div>
            <div className="px-8 py-8 space-y-6">
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary/60">Institution</span>
                <p className="font-headline-md text-headline-md">K. S. School of Business Management &amp; Information Technology</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary/60">University</span>
                <p className="font-body-md text-body-md text-[#44474d]">Gujarat University</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary/60">Year</span>
                <span className="px-3 py-1 bg-primary/5 border border-primary/15 rounded-full font-label-md text-primary text-[12px] uppercase tracking-widest">2025</span>
              </div>
            </div>
          </div>

          {/* Right — Description + Coursework */}
          <div className="space-y-8">
            <div className="p-6 bg-white border border-stone-border rounded-xl premium-shadow reveal-on-scroll" style={{ transitionDelay: "300ms" }}>
              <span className="material-symbols-outlined text-primary text-[24px] mb-3 block">auto_stories</span>
              <p className="font-body-md text-body-md text-[#44474d] leading-relaxed">
                My coursework covered software development, web technologies, databases, and application development. Outside the classroom, I spent most of my time building projects, learning deployments, and improving my backend and JavaScript skills.
              </p>
            </div>
            <div className="p-6 bg-white border border-stone-border rounded-xl premium-shadow reveal-on-scroll" style={{ transitionDelay: "380ms" }}>
              <h4 className="font-label-md text-label-md uppercase tracking-widest text-primary/60 mb-4">Coursework Highlights</h4>
              <div className="flex flex-wrap gap-2">
                {coursework.map((item) => (
                  <span key={item} className="px-3 py-1.5 bg-primary/5 text-primary font-label-sm text-[11px] uppercase tracking-widest border border-primary/15 rounded-full hover:bg-primary/10 transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 bg-white border border-stone-border rounded-xl premium-shadow reveal-on-scroll" style={{ transitionDelay: "460ms" }}>
              <span className="material-symbols-outlined text-primary text-[24px] mb-3 block">code</span>
              <p className="font-label-md text-label-md uppercase tracking-widest text-primary/60 mb-2">Self-Directed Learning</p>
              <p className="font-body-md text-body-md text-[#44474d] leading-relaxed">
                Alongside academics, actively practiced deployments, backend systems, and JavaScript — converting classroom theory into real, shipped products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
