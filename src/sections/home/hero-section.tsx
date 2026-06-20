"use client";

import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { useMagneticEffect } from "@/hooks/use-magnetic-effect";
import { ThreeJsBackground } from "@/components/motion/three-js-background";

export function HeroSection() {
  useRevealOnScroll();
  useMagneticEffect();

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left — Text + Particle BG */}
        <div className="relative min-h-[500px]">
          <ThreeJsBackground />
          <div className="relative z-10 py-10">
            <span className="inline-block px-3 py-1 bg-primary/5 text-primary font-label-md text-label-sm uppercase tracking-widest mb-6 border border-primary/10 reveal-on-scroll">
              Full Stack Developer
            </span>
            <h1 className="font-display text-display mb-6 reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
              HARSH PANCHAL
            </h1>
            <p className="font-body-md text-body-lg text-[#44474d] mb-10 max-w-lg reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
              Building thoughtful digital products through design, engineering, and innovation. Merging technical rigor with aesthetic precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                className="bg-primary-container text-on-primary px-8 py-4 rounded-full font-label-md text-label-md magnetic-btn flex items-center gap-2 group reveal-on-scroll"
                href="/#work"
                style={{ transitionDelay: "300ms" }}
              >
                View Projects
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <Link
                className="bg-transparent border border-outline-variant text-primary px-8 py-4 rounded-full font-label-md text-label-md hover:bg-white transition-all magnetic-btn reveal-on-scroll"
                href="/#contact"
                style={{ transitionDelay: "400ms" }}
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Right — Profile Photo (stable, no tilt) */}
        <div className="flex justify-center lg:justify-end reveal-on-scroll" style={{ transitionDelay: "500ms" }}>
          <div className="relative p-3 bg-white border border-stone-border rounded-xl premium-shadow w-full max-w-md">
            <img
              alt="Harsh Panchal portrait"
              className="w-full aspect-square object-cover object-bottom rounded-lg"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKE8cBcnAOJzdWS2Ldo9Mcm30yMzno3JpTWP5ZMgjvBYNV4jomZEqy-4qDdMyqLTw5BZ-U_QD1R5Qjc9_SqFxcNAYzOQSMHyxyOUzBdq2ySVE0_M1eajTw_u1Xzi3mhV7vyf4hkBPMpXDEn4JufBDJLzoDpYpDUGKIrVlhN331haHjrwDfYZoJTqUwD2ccmpwqjTMwQPvwV77mB6uM8SFQxFufktnDF7HuvdNAQ57shGtEYARBpzgv5neThNY__HJ-BRcYhJ6qNA"
            />
            <div
              className="absolute -bottom-6 -left-6 bg-white border border-stone-border p-5 rounded-lg premium-shadow reveal-on-scroll"
              style={{ transitionDelay: "700ms" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="font-label-md text-label-md">Available for new opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
