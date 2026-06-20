"use client";

import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";

const journeyItems = [
  {
    year: "2022",
    title: "Getting the basics right",
    description:
      "Built a base through CA & IT coursework, programming fundamentals, databases, HTML, CSS, and JavaScript.",
    isCurrent: false,
  },
  {
    year: "2023",
    title: "Moving into full stack",
    description:
      "Started connecting frontend work with backend APIs, JavaScript frameworks, and practical application structure.",
    isCurrent: false,
  },
  {
    year: "2024",
    title: "Building real projects",
    description:
      "Worked on product interfaces, backend workflows, deployments, and the practical needs that come with client work.",
    isCurrent: false,
  },
  {
    year: "2025",
    title: "Production work",
    description:
      "Moved into production systems, AWS infrastructure, CI/CD, and team lead capacity at Shambhavi Technovation.",
    isCurrent: true,
  },
];

export function CareerJourneySection() {
  useRevealOnScroll();

  return (
    <section className="py-section-gap bg-white overflow-hidden" id="journey">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* Left — Timeline */}
        <div>
          <span className="inline-block px-3 py-1 bg-primary/5 text-primary font-label-md text-label-sm uppercase tracking-widest mb-6 border border-primary/10 reveal-on-scroll">
            Career Journey
          </span>
          <h2 className="font-headline-lg text-headline-lg mb-4 reveal-on-scroll" style={{ transitionDelay: "80ms" }}>
            The Professional Journey
          </h2>
          <p className="font-body-md text-body-lg text-[#44474d] mb-12 reveal-on-scroll" style={{ transitionDelay: "150ms" }}>
            Tracing the path from fundamentals to full-stack production engineering — a timeline defined by constant learning and real-world delivery.
          </p>

          <div className="space-y-10 relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary via-secondary to-stone-border" />

            {journeyItems.map((item, i) => (
              <div
                key={item.year}
                className="relative pl-12 reveal-on-scroll"
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                {/* Dot */}
                <div
                  className={`absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    item.isCurrent
                      ? "bg-primary border-primary shadow-[0_0_12px_rgba(11,31,58,0.4)]"
                      : "bg-white border-stone-border"
                  }`}
                >
                  {item.isCurrent && (
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  )}
                </div>

                <div className={`p-5 rounded-xl border transition-all duration-300 ${item.isCurrent ? "border-primary/30 bg-primary/3" : "border-stone-border bg-white hover:border-primary/20"} premium-shadow`}>
                  <span className={`font-label-md text-label-sm uppercase tracking-widest mb-1 block ${item.isCurrent ? "text-primary" : "text-[#44474d] opacity-60"}`}>
                    {item.year}{item.isCurrent ? " — Present" : ""}
                  </span>
                  <h4 className="font-headline-md text-headline-md mb-2">{item.title}</h4>
                  <p className="font-body-md text-body-md text-[#44474d] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — HP Icon + Orbital Animation (unchanged) */}
        <div className="flex items-center justify-center reveal-on-scroll" style={{ transitionDelay: "500ms" }}>
          <div className="relative w-full aspect-square max-w-lg">
            <div className="absolute inset-0 border border-stone-border rounded-full opacity-20 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-20 border border-stone-border rounded-full opacity-40 animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-40 border border-stone-border rounded-full opacity-60" />

            {/* HP center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary-container rounded-full flex items-center justify-center text-on-primary z-20 premium-shadow">
              <span className="font-headline-md text-headline-md font-bold">HP</span>
            </div>

            {/* Orbiting tech icons */}
            <div className="absolute inset-0 orbit-container z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                <div className="counter-orbit w-12 h-12 bg-white rounded-lg premium-shadow flex items-center justify-center border border-stone-border">
                  <span className="material-symbols-outlined text-primary">data_object</span>
                </div>
              </div>
              <div className="absolute top-1/2 right-0 translate-x-4 -translate-y-1/2">
                <div className="counter-orbit w-12 h-12 bg-white rounded-lg premium-shadow flex items-center justify-center border border-stone-border">
                  <span className="material-symbols-outlined text-primary">cloud_done</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
                <div className="counter-orbit w-12 h-12 bg-white rounded-lg premium-shadow flex items-center justify-center border border-stone-border">
                  <span className="material-symbols-outlined text-primary">javascript</span>
                </div>
              </div>
              <div className="absolute top-1/2 left-0 -translate-x-4 -translate-y-1/2">
                <div className="counter-orbit w-12 h-12 bg-white rounded-lg premium-shadow flex items-center justify-center border border-stone-border">
                  <span className="material-symbols-outlined text-primary">terminal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
