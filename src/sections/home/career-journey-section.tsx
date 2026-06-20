"use client";

import { useEffect, useRef, useState } from "react";
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
  const [activeStep, setActiveStep] = useState(0);
  const [typedTitle, setTypedTitle] = useState("");
  const [typedText, setTypedText] = useState("");
  const active = journeySteps[activeStep];

  useEffect(() => {
    const output = `${active.title}\n${active.text}`;
    let index = -1;
    const timer = window.setInterval(() => {
      index += 1;
      const current = output.slice(0, index);
      const [title = "", text = ""] = current.split("\n");

      setTypedTitle(title);
      setTypedText(text);

      if (index >= output.length) {
        window.clearInterval(timer);
      }
    }, 18);

    return () => window.clearInterval(timer);
  }, [active]);
  
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
      className="overflow-hidden border-y border-border bg-[#f5f2ec] px-[5vw] py-12 md:py-16 lg:py-18" 
      id="journey"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mb-8 text-center font-display text-[32px] font-semibold leading-[1.14] md:mb-10 md:text-[36px] lg:text-[38px]">
            Career Journey
          </h2>
        </Reveal>
        <Reveal className="md:hidden">
          <div className="overflow-hidden rounded-2xl border border-border bg-[#101827] shadow-[0_24px_70px_rgba(16,24,39,0.18)]">
            <div className="flex h-11 items-center justify-between border-b border-white/10 bg-white/8 px-4">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f56]" />
                <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="size-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                journey.sh
              </span>
            </div>

            <div className="space-y-5 p-5 font-mono">
              <div className="flex flex-wrap gap-2">
                {journeySteps.map((step, index) => (
                  <button
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-bold transition duration-300 ${
                      activeStep === index
                        ? "border-primary bg-primary text-white shadow-[0_10px_28px_rgba(109,94,246,0.35)]"
                        : "border-white/10 bg-white/5 text-white/65 hover:border-primary/45 hover:text-white"
                    }`}
                    key={step.year}
                    onClick={() => setActiveStep(index)}
                    type="button"
                  >
                    run {step.year}
                  </button>
                ))}
              </div>

              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-white/10 bg-black/18 p-4"
                initial={{ opacity: 0, y: 8 }}
                key={active.year}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <p className="mb-3 text-[11px] font-bold text-emerald-300">
                  <span className="text-primary">harsh@portfolio</span>
                  <span className="text-white/35">:~$ </span>
                  load_step --year {active.year}
                </p>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
                  Output
                </p>
                <h3 className="mb-3 font-display text-[24px] font-bold leading-[1.12] text-white">
                  {typedTitle}
                  {typedTitle.length < active.title.length ? (
                    <span className="ml-1 inline-block h-6 w-2 translate-y-1 bg-primary" />
                  ) : null}
                </h3>
                <p className="min-h-[96px] text-sm leading-relaxed text-white/68">
                  {typedText}
                  {typedTitle.length >= active.title.length && typedText.length < active.text.length ? (
                    <span className="ml-1 inline-block h-4 w-1.5 translate-y-0.5 bg-emerald-300" />
                  ) : null}
                </p>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    animate={{ width: `${((activeStep + 1) / journeySteps.length) * 100}%` }}
                    className="h-full rounded-full bg-primary"
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>

        <div className="relative hidden md:block">
          {/* Vertical timeline base track (light grey) */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-0.5 -translate-x-1/2 bg-foreground/10 md:block z-0" />
          
          {/* Active dynamic scroll-filled progress line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-1/2 top-0 bottom-0 hidden w-0.5 -translate-x-1/2 bg-primary origin-top md:block z-0"
          />

          <div className="space-y-16">
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
                  <span className="mb-2 block font-display text-[32px] font-bold leading-none text-primary md:text-[36px]">
                    {step.year}
                  </span>
                  <h3 className="mb-3 font-display text-[23px] font-semibold leading-[1.2] md:text-[25px]">
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
