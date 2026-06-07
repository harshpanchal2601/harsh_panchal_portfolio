"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Cloud, Code2, Database, GitBranch } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";

const marqueeItems = [
  "MERN",
  "MEAN",
  "NEXT.JS",
  "AWS",
  "CI/CD",
] as const;

const badges = ["MERN", "MEAN", "Next.js", "AWS", "CI/CD"] as const;

function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const nodes = [
    { label: "API", className: "left-[7%] top-[27%]", icon: Code2, drift: -8 },
    { label: "AWS", className: "right-[8%] top-[18%]", icon: Cloud, drift: 7 },
    { label: "Data", className: "left-[18%] bottom-[15%]", icon: Database, drift: 6 },
    { label: "CI/CD", className: "right-[14%] bottom-[20%]", icon: GitBranch, drift: -6 },
  ] as const;
  const cards = [
    { title: "Cloud", meta: "EC2 / S3", className: "left-[4%] top-[10%]" },
    { title: "Release", meta: "Actions", className: "right-[1%] top-[48%]" },
    { title: "API", meta: "Node.js", className: "left-[33%] bottom-[2%]" },
  ] as const;

  return (
    <motion.div
      aria-hidden="true"
      animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
      className="relative mx-auto aspect-square w-full max-w-[350px] sm:max-w-[520px]"
      transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
    >
      <div className="absolute inset-2 rounded-[2rem] bg-[radial-gradient(circle_at_48%_40%,rgba(255,255,255,0.98),rgba(109,94,246,0.18)_34%,rgba(215,199,163,0.22)_57%,transparent_74%)] blur-sm" />
      <div className="absolute inset-10 rounded-full border border-foreground/10 bg-white/38 shadow-[0_34px_110px_rgba(23,23,23,0.11)]" />
      <div className="absolute inset-12 rounded-full bg-[linear-gradient(rgba(23,23,23,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(23,23,23,0.055)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(circle,black_0%,transparent_68%)]" />
      <div className="absolute inset-18 rounded-full border border-foreground/10 sm:inset-20" />
      <motion.div
        animate={reduceMotion ? undefined : { rotate: 360 }}
        className="absolute inset-16 rounded-full border border-dashed border-primary/35 sm:inset-18"
        transition={{ duration: 42, ease: "linear", repeat: Infinity }}
      />
      <motion.div
        animate={reduceMotion ? undefined : { rotate: -360 }}
        className="absolute inset-24 rounded-full border border-primary/15 sm:inset-28"
        transition={{ duration: 58, ease: "linear", repeat: Infinity }}
      />
      <div className="absolute left-1/2 top-1/2 grid size-30 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border border-foreground/10 bg-white/92 shadow-[0_24px_70px_rgba(23,23,23,0.1)] backdrop-blur-md sm:size-36">
        <div className="text-center">
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            System
          </span>
          <span className="mt-1 block font-display text-2xl font-bold text-foreground">
            Cloud
          </span>
        </div>
      </div>
      {cards.map((card, index) => (
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, index % 2 ? 7 : -7, 0] }}
          className={`absolute ${card.className} rounded-xl border border-foreground/10 bg-white/82 px-4 py-3 shadow-[0_18px_55px_rgba(23,23,23,0.08)] backdrop-blur-md`}
          key={card.title}
          transition={{ duration: 5 + index, ease: "easeInOut", repeat: Infinity }}
        >
          <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {card.title}
          </span>
          <span className="mt-1 block text-sm font-semibold text-muted-foreground">
            {card.meta}
          </span>
        </motion.div>
      ))}
      {nodes.map((node, index) => {
        const Icon = node.icon;

        return (
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, node.drift, 0] }}
            className={`absolute ${node.className} flex items-center gap-2 rounded-full border border-foreground/10 bg-white/90 px-3 py-2.5 text-xs font-semibold text-foreground shadow-[0_18px_50px_rgba(23,23,23,0.09)] backdrop-blur-md sm:px-4 sm:py-3 sm:text-sm`}
            key={node.label}
            transition={{
              duration: 4 + index,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <Icon className="size-4 text-primary" />
            {node.label}
          </motion.div>
        );
      })}
      <div className="absolute left-[14%] top-[44%] h-px w-[70%] rotate-[-15deg] bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
      <div className="absolute left-[17%] top-[56%] h-px w-[66%] rotate-[21deg] bg-gradient-to-r from-transparent via-secondary to-transparent" />
      <div className="absolute left-[28%] top-[22%] h-px w-[48%] rotate-[58deg] bg-gradient-to-r from-transparent via-foreground/12 to-transparent" />
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="mesh-gradient relative isolate max-w-full overflow-hidden px-[5vw] pt-16 pb-12 md:pt-24 md:pb-20"
      >
        <div className="mx-auto grid min-h-[calc(100svh-6rem)] w-full max-w-7xl items-center gap-10 overflow-hidden md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:overflow-visible">
          <StaggerContainer className="relative z-10 min-w-0 max-w-[340px] sm:max-w-full">
            <StaggerItem>
              <p className="mb-4 text-sm font-semibold text-primary md:text-base">
                Harsh Panchal
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Full Stack Developer
              </p>
            </StaggerItem>
            <StaggerItem>
              <h1
                className="max-w-4xl text-wrap font-display text-[34px] font-bold leading-[1.08] text-foreground sm:text-[42px] md:text-[64px] lg:text-[72px]"
                id="hero-heading"
              >
                <span className="block sm:inline">I build web</span>{" "}
                <span className="block sm:inline">products that move</span>{" "}
                <span className="block sm:inline">from idea to</span>{" "}
                <span className="block sm:inline">production.</span>
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-6 max-w-[340px] text-base leading-[1.75] text-muted-foreground sm:max-w-2xl md:text-lg">
                I work across frontend, backend, and cloud deployment, building
                scalable applications with Next.js, Node.js, Angular, MongoDB, and
                AWS.
              </p>
            </StaggerItem>
            <StaggerItem className="mt-8 flex w-full max-w-[340px] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
              <Link
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-[0_18px_44px_rgba(109,94,246,0.22)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-accent hover:shadow-[0_22px_54px_rgba(109,94,246,0.28)] active:translate-y-0 active:scale-[0.98] sm:w-auto"
                href="/#work"
              >
                View Work
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                className="inline-flex w-full items-center justify-center rounded-full border border-border bg-white px-7 py-3.5 font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/40 hover:text-primary hover:shadow-[0_16px_40px_rgba(23,23,23,0.08)] active:translate-y-0 active:scale-[0.98] sm:w-auto"
                href="/contact"
              >
                Lets Connect
              </Link>
              <a
                className="inline-flex w-full items-center justify-center rounded-full border border-border bg-white px-7 py-3.5 font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/40 hover:text-primary hover:shadow-[0_16px_40px_rgba(23,23,23,0.08)] active:translate-y-0 active:scale-[0.98] sm:w-auto"
                href="/Harsh-Panchal-Resume.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                Download Resume
              </a>
            </StaggerItem>
            <StaggerItem className="mt-8 flex max-w-[340px] flex-wrap gap-2.5 sm:max-w-none">
              {badges.map((badge, index) => (
                <span
                  className="rounded-full border border-border bg-white px-3.5 py-2 text-sm font-medium text-muted-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/8 hover:text-primary"
                  style={{ transitionDelay: `${index * 18}ms` }}
                  key={badge}
                >
                  {badge}
                </span>
              ))}
            </StaggerItem>
          </StaggerContainer>

          <div className="relative z-10 min-w-0 overflow-hidden pb-4 md:overflow-visible md:pb-0">
            <HeroVisual />
          </div>
        </div>
      </section>

      <div className="w-full overflow-hidden border-y border-border bg-white/50 py-7 whitespace-nowrap select-none md:py-10">
        <div className="animate-marquee flex gap-8 md:gap-10">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              className="kinetic-text font-display text-[34px] font-bold leading-[1.1] md:text-[64px]"
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
