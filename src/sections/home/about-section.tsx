"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

const stats = [
  { value: "2025", label: "Current Role" },
  { value: "4", label: "Featured Builds" },
  { value: "AWS", label: "CI/CD Focus" },
] as const;

const aboutParagraphs = [
  "My path started with CA and IT coursework, programming fundamentals, databases, HTML, CSS, and JavaScript before moving into practical full-stack application work.",
  "I have worked on internal systems and product builds across ERP, HR operations, booking and CRM workflows, AI product infrastructure, REST APIs, and production deployment.",
  "Today I work as a Full Stack Developer at Shambhavi Technovation, focusing on frontend, backend, AWS deployment, CI/CD workflows, and delivery coordination.",
] as const;

export function AboutSection() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  return (
    <section className="relative border-t border-border px-[5vw] py-18 md:py-24 lg:py-28 overflow-hidden" id="about">
      {/* Background accent */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 rounded-full bg-secondary/20 blur-[100px]" />
      
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-12">
        <Reveal className="group relative md:col-span-5">
          <motion.div
            className="relative cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateX: hovered ? tilt.y : 0, rotateY: hovered ? tilt.x : 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
          >
            {/* Decorative glow behind photo */}
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/30 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            <Image
              alt="Harsh Profile"
              className="relative w-full rounded-xl border border-white/60 bg-white object-cover shadow-[0_28px_80px_rgba(23,23,23,0.1)] transition-shadow duration-500 group-hover:shadow-[0_40px_100px_rgba(109,94,246,0.18)]"
              height={1440}
              src="/images/profile.png"
              width={1080}
            />
            {/* Floating badge */}
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute -right-4 -top-4 z-20 rounded-xl border border-white/80 bg-white/90 px-4 py-2.5 shadow-[0_16px_44px_rgba(109,94,246,0.14)] backdrop-blur-md"
              >
                <span className="block text-xs font-bold text-primary">Full Stack Dev</span>
                <span className="block text-[10px] text-muted-foreground">Available for work</span>
              </motion.div>
            )}
          </motion.div>
        </Reveal>

        <Reveal className="md:col-span-7 md:pl-12 lg:pl-18">
          <span className="section-label mb-4 block">About</span>
          <h2 className="mb-6 font-display text-[32px] font-bold leading-[1.12] text-foreground md:text-[44px] lg:text-[48px]">
            I care about useful software, clean execution, and shipping the work properly.
          </h2>
          <div className="mb-8 max-w-2xl space-y-5 text-base leading-[1.75] text-muted-foreground md:text-lg">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-white/70 px-4 py-4 text-center shadow-[0_8px_24px_rgba(23,23,23,0.04)] backdrop-blur-sm transition duration-300 hover:border-primary/30 hover:shadow-[0_12px_34px_rgba(109,94,246,0.12)]"
              >
                <span className="block font-display text-[28px] font-bold text-gradient-primary leading-none">{stat.value}</span>
                <span className="mt-1.5 block text-xs font-semibold text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
