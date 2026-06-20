"use client";

import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { motion, useScroll, useSpring } from "framer-motion";

const journeySteps = [
  {
    year: "2022",
    title: "Getting the basics right",
    text: "Built a base through CA & IT coursework, programming fundamentals, databases, HTML, CSS, and JavaScript.",
  },
  {
    year: "2023",
    title: "Moving into full stack",
    text: "Started connecting frontend work with backend APIs, JavaScript frameworks, and practical application structure.",
  },
  {
    year: "2024",
    title: "Building real projects",
    text: "Worked on product interfaces, backend workflows, deployments, and the practical needs that come with client work.",
  },
  {
    year: "2025",
    title: "Production work",
    text: "Moved into production systems, AWS infrastructure, CI/CD, and team lead capacity at Shambhavi Technovation.",
  },
] as const;

export function CareerJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef}
      className="border-y border-border bg-[#f5f2ec] px-[5vw] py-18 md:py-24 lg:py-28 overflow-hidden" 
      id="journey"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mb-12 text-center font-display text-[32px] font-bold leading-[1.12] md:mb-16 md:text-[44px] lg:text-[48px]">
            Career Journey
          </h2>
        </Reveal>
        <div className="relative">
          {/* Vertical timeline base track (light grey) */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-0.5 -translate-x-1/2 bg-foreground/10 md:block z-0" />
          
          {/* Active dynamic scroll-filled progress line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-1/2 top-0 bottom-0 hidden w-0.5 -translate-x-1/2 bg-primary origin-top md:block z-0"
          />

          <div className="space-y-12 md:space-y-20">
            {journeySteps.map((step, index) => (
              <Reveal
                className={`group relative flex flex-col items-start gap-5 rounded-xl transition duration-300 hover:translate-y-[-2px] md:flex-row md:items-center md:gap-12 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                key={step.year}
              >
                {/* Year Content Card */}
                <div
                  className={`w-full md:w-1/2 z-10 ${
                    index % 2 === 0 ? "md:text-right" : ""
                  }`}
                >
                  <span className="mb-2 block font-display text-[34px] font-bold leading-none text-primary md:text-[44px]">
                    {step.year}
                  </span>
                  <h3 className="mb-3 font-display text-[24px] font-bold leading-[1.2] md:text-[30px]">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>

                {/* Animated year checkpoint node circle */}
                <motion.div
                  initial={{ scale: 0.8, backgroundColor: "#B8B2A8" }}
                  whileInView={{ scale: 1.15, backgroundColor: "#6d5ef6" }}
                  viewport={{ once: false, amount: 0.95, margin: "-12% 0px -12% 0px" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute left-1/2 z-10 hidden size-5 -translate-x-1/2 rounded-full border-4 border-[#f5f2ec] transition-shadow duration-300 group-hover:shadow-[0_0_0_8px_rgba(109,94,246,0.18)] md:block cursor-pointer"
                />

                <div className="w-full md:w-1/2" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
