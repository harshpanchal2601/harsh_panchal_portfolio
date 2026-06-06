"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const marqueeItems = [
  "MERN STACK",
  "AWS ARCHITECTURE",
  "AI INTEGRATION",
  "UI/UX PRECISION",
] as const;

export function HeroSection() {
  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="mesh-gradient relative flex min-h-screen flex-col justify-center overflow-hidden px-[5vw] pt-24"
      >
        <motion.div
          className="relative z-10 max-w-[1200px]"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="mb-5 font-sans text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Harsh Panchal / Full Stack Engineer
          </p>
          <h1
            className="font-display text-[64px] font-bold leading-[0.95] tracking-[-0.055em] text-foreground md:text-[100px]"
            id="hero-heading"
          >
            Building digital <br />
            <span className="text-primary italic">experiences</span> <br />
            that feel alive.
          </h1>
          <div className="mt-12 flex flex-col items-start gap-8 md:flex-row md:items-center">
            <Link
              className="inline-flex items-center gap-3 rounded-full bg-[#6366f1] px-10 py-5 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(99,102,241,0.3)] active:scale-95"
              href="/#work"
            >
              View Projects
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <p className="max-w-[340px] text-lg leading-[1.8] tracking-[0.01em] text-muted-foreground">
              Full Stack Engineer specializing in scalable web applications,
              AWS infrastructure, and production-ready digital products.
            </p>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-0 right-0 flex h-full w-full items-end justify-end opacity-80 md:w-[60%] md:opacity-100">
          <Image
            alt="Harsh Panchal Professional Portrait"
            className="hero-image-mask h-auto w-full max-w-[800px] object-cover grayscale contrast-125"
            height={1440}
            priority
            src="/images/profile.png"
            width={1080}
          />
        </div>

        <div className="pointer-events-none absolute right-[10%] top-[20%] w-[30vw] animate-pulse opacity-40 mix-blend-screen">
          <div className="aspect-square rounded-[32%] bg-[radial-gradient(circle_at_28%_25%,rgba(192,193,255,0.45),transparent_28%),radial-gradient(circle_at_70%_58%,rgba(208,188,255,0.35),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.02))] blur-[0.2px]" />
        </div>
      </section>

      <div className="w-full overflow-hidden whitespace-nowrap py-20 select-none">
        <div className="animate-marquee flex gap-12">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              className="kinetic-text font-display text-[80px] font-bold leading-[1.1] tracking-[-0.04em] md:text-[120px]"
              key={`${item}-${index}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
