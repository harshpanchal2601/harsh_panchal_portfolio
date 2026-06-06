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
        className="mesh-gradient relative isolate flex min-h-[100svh] flex-col overflow-hidden px-[5vw] pt-24 pb-8 md:min-h-screen md:justify-center md:pb-0"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[62%] bg-gradient-to-t from-background via-background/70 to-transparent md:hidden"
        />

        <motion.div
          className="relative z-10 flex w-full max-w-[1180px] flex-1 flex-col justify-end pb-8 md:min-h-[720px] md:justify-center md:pb-0"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="mb-4 max-w-[280px] font-sans text-xs font-semibold uppercase tracking-[0.24em] text-primary sm:max-w-none md:mb-5 md:text-sm md:tracking-[0.3em]">
            Harsh Panchal / Full Stack Engineer
          </p>
          <h1
            className="max-w-[760px] font-display text-[clamp(44px,12vw,52px)] font-bold leading-[0.98] tracking-[-0.045em] text-foreground sm:text-[64px] md:text-[84px] lg:text-[92px]"
            id="hero-heading"
          >
            Building digital <br />
            <span className="text-primary italic">experiences</span> <br />
            that feel alive.
          </h1>
          <div className="mt-7 flex max-w-[720px] flex-col items-start gap-5 md:mt-10 md:flex-row md:items-center md:gap-8">
            <Link
              className="inline-flex max-w-full items-center justify-center gap-3 rounded-full bg-[#6366f1] px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(99,102,241,0.3)] active:scale-95 md:px-10 md:py-5"
              href="/#work"
            >
              View Projects
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <p className="max-w-[360px] text-base leading-[1.7] tracking-[0.01em] text-muted-foreground md:text-lg md:leading-[1.8]">
              Full Stack Engineer specializing in scalable web applications,
              AWS infrastructure, and production-ready digital products.
            </p>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-[1] flex h-full w-full justify-center md:bottom-0 md:right-0 md:inset-auto md:mt-0 md:h-full md:w-[48%] md:items-start md:justify-end lg:w-[52%]">
          <Image
            alt="Harsh Panchal Professional Portrait"
            className="h-full w-full object-cover object-[center_top] md:h-full md:max-h-[92vh] md:w-auto md:max-w-[640px] md:object-contain md:object-[center_top] lg:max-w-[700px]"
            height={1440}
            priority
            src="/images/profile.png"
            width={1080}
          />
        </div>

        <div className="pointer-events-none absolute right-[8%] top-[22%] z-0 hidden w-[28vw] animate-pulse opacity-15 md:block">
          <div className="aspect-square rounded-[32%] bg-[radial-gradient(circle_at_28%_25%,rgba(192,193,255,0.28),transparent_28%),radial-gradient(circle_at_70%_58%,rgba(208,188,255,0.22),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02))]" />
        </div>
      </section>

      <div className="w-full overflow-hidden whitespace-nowrap py-10 select-none md:py-16">
        <div className="animate-marquee flex gap-8 md:gap-12">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              className="kinetic-text font-display text-[44px] font-bold leading-[1.1] tracking-[-0.03em] md:text-[96px]"
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
