"use client";

import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";

export function EngineeringPhilosophySection() {
  useRevealOnScroll();

  return (
    <section className="py-section-gap bg-primary-container text-on-primary" id="process">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-headline-lg text-headline-lg mb-4 reveal-on-scroll">Methodology</h2>
          <p className="opacity-70 max-w-xl mx-auto reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
            A rigorous four-stage process to transform concepts into world-class digital realities.
          </p>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Flow Lines (Desktop Only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0"></div>
          
          {/* Step 1 */}
          <div className="relative z-10 text-center reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-container mx-auto mb-6 premium-shadow">
              <span className="material-symbols-outlined text-3xl">search</span>
            </div>
            <h4 className="font-headline-md text-headline-md mb-3 reveal-on-scroll" style={{ transitionDelay: "300ms" }}>Discover</h4>
            <p className="text-sm opacity-60 leading-relaxed reveal-on-scroll" style={{ transitionDelay: "400ms" }}>
              Defining project scope, user needs, and technical constraints.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="relative z-10 text-center reveal-on-scroll" style={{ transitionDelay: "300ms" }}>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-container mx-auto mb-6 premium-shadow">
              <span className="material-symbols-outlined text-3xl">architecture</span>
            </div>
            <h4 className="font-headline-md text-headline-md mb-3 reveal-on-scroll" style={{ transitionDelay: "400ms" }}>Design</h4>
            <p className="text-sm opacity-60 leading-relaxed reveal-on-scroll" style={{ transitionDelay: "500ms" }}>
              Visualizing the interface and system architecture for optimal scale.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="relative z-10 text-center reveal-on-scroll" style={{ transitionDelay: "400ms" }}>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-container mx-auto mb-6 premium-shadow">
              <span className="material-symbols-outlined text-3xl">code</span>
            </div>
            <h4 className="font-headline-md text-headline-md mb-3 reveal-on-scroll" style={{ transitionDelay: "500ms" }}>Develop</h4>
            <p className="text-sm opacity-60 leading-relaxed reveal-on-scroll" style={{ transitionDelay: "600ms" }}>
              Clean, performant, and maintainable implementation of the vision.
            </p>
          </div>
          
          {/* Step 4 */}
          <div className="relative z-10 text-center reveal-on-scroll" style={{ transitionDelay: "500ms" }}>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-container mx-auto mb-6 premium-shadow">
              <span className="material-symbols-outlined text-3xl">rocket</span>
            </div>
            <h4 className="font-headline-md text-headline-md mb-3 reveal-on-scroll" style={{ transitionDelay: "600ms" }}>Deploy</h4>
            <p className="text-sm opacity-60 leading-relaxed reveal-on-scroll" style={{ transitionDelay: "700ms" }}>
              Continuous integration and deployment with zero downtime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
