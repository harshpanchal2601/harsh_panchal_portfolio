"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Cloud, Database, GitBranch, Layers, LucideIcon, Server } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

interface SkillNode {
  title: string;
  short: string;
  Icon: LucideIcon;
  summary: string;
  stack: readonly string[];
  proof: string;
  usedIn: string;
}

const skillNodes: readonly SkillNode[] = [
  {
    title: "Frontend",
    short: "UI",
    Icon: Layers,
    summary: "Angular, Next.js, React, and TypeScript interfaces.",
    stack: ["Angular", "Next.js", "React", "TypeScript"],
    proof: "Responsive product screens, clean layout systems, state handling, and user-facing workflows.",
    usedIn: "Dashboards, admin tools, landing experiences, project previews.",
  },
  {
    title: "Backend",
    short: "API",
    Icon: Server,
    summary: "Node.js services, REST APIs, and application logic.",
    stack: ["Node.js", "Express", "REST APIs", "Auth"],
    proof: "Backend services that connect product actions, data, validation, and deployment needs.",
    usedIn: "ERP flows, HR operations, booking systems, AI platform services.",
  },
  {
    title: "Database",
    short: "Data",
    Icon: Database,
    summary: "MongoDB and SQL-backed product data flows.",
    stack: ["MongoDB", "SQL", "Models", "Queries"],
    proof: "Schemas and data operations built around real workflows instead of demo-only structures.",
    usedIn: "Users, inventory, bookings, content, analytics, workflow state.",
  },
  {
    title: "AI",
    short: "AI",
    Icon: BrainCircuit,
    summary: "Practical AI features where they improve the product.",
    stack: ["Automation", "Assistants", "Prompts", "UX"],
    proof: "AI used for useful support such as search, content help, workflow speed, and user assistance.",
    usedIn: "AI assistants, content workflows, automation helpers.",
  },
  {
    title: "Cloud",
    short: "AWS",
    Icon: Cloud,
    summary: "AWS deployment and production infrastructure.",
    stack: ["AWS", "EC2", "S3", "Lambda"],
    proof: "Deployment work across hosting, storage, DNS, server runtime, and managed AWS services.",
    usedIn: "Production hosting, storage, DNS, server runtimes, service setup.",
  },
  {
    title: "DevOps",
    short: "Ship",
    Icon: GitBranch,
    summary: "CI/CD and release workflows.",
    stack: ["GitHub Actions", "CI/CD", "Logs", "Deploys"],
    proof: "Release flows that make builds, checks, and deployment more repeatable.",
    usedIn: "Build pipelines, deploy checks, release logs, production updates.",
  },
] as const;

export function TechnicalExpertiseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = skillNodes[activeIndex];
  const ActiveIcon = active.Icon;

  return (
    <section className="relative overflow-hidden border-y border-border bg-white/55 px-[5vw] py-12 md:py-16 lg:py-18" id="skills">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-primary/8 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="mb-8 grid gap-5 md:grid-cols-[0.86fr_1.14fr] md:items-end">
          <div>
            <span className="section-label mb-4 block">Technical Focus</span>
            <h2 className="font-display text-[32px] font-semibold leading-[1.12] text-foreground md:text-[36px] lg:text-[38px]">
              Skills connected like a product system.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-[1.75] text-muted-foreground md:ml-auto md:text-[17px]">
            My strongest stack is Angular, Next.js, Node.js, MongoDB, AWS, and CI/CD. I also use AI when it improves a real workflow.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="premium-card-hover grid gap-5 overflow-hidden rounded-2xl border border-border bg-white/78 p-4 shadow-[0_26px_80px_rgba(23,23,23,0.07)] backdrop-blur-md md:grid-cols-[1.1fr_0.9fr] md:p-6">
            <div className="relative min-h-[300px] rounded-xl border border-border/70 bg-[linear-gradient(rgba(23,23,23,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(23,23,23,0.035)_1px,transparent_1px)] bg-[size:32px_32px] p-4">
              <div className="pointer-events-none absolute left-[16%] right-[14%] top-[34%] h-px rotate-[8deg] bg-gradient-to-r from-transparent via-primary/24 to-transparent" />
              <div className="pointer-events-none absolute left-[14%] right-[16%] top-[66%] h-px rotate-[-10deg] bg-gradient-to-r from-transparent via-secondary to-transparent" />
              <div className="grid h-full grid-cols-2 gap-3 sm:grid-cols-3">
                {skillNodes.map((node, index) => {
                  const Icon = node.Icon;
                  const isActive = activeIndex === index;

                  return (
                    <motion.button
                      className={`premium-card-hover relative z-10 flex min-h-[118px] flex-col items-start justify-between rounded-xl border bg-white/88 p-4 text-left shadow-[0_14px_34px_rgba(23,23,23,0.05)] transition duration-300 ${
                        isActive
                          ? "border-primary/40 text-primary shadow-[0_20px_52px_rgba(109,94,246,0.14)]"
                          : "border-border text-foreground hover:border-primary/25 hover:text-primary"
                      }`}
                      drag
                      dragConstraints={{ left: -12, right: 12, top: -10, bottom: 10 }}
                      dragElastic={0.18}
                      dragMomentum={false}
                      key={node.title}
                      onClick={() => setActiveIndex(index)}
                      onDragStart={() => setActiveIndex(index)}
                      type="button"
                      whileDrag={{ scale: 1.03, zIndex: 20 }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={`grid size-10 place-items-center rounded-xl border ${isActive ? "border-primary/20 bg-primary/8" : "border-border bg-white"}`}>
                        <Icon className="size-5" />
                      </span>
                      <span>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          {node.short}
                        </span>
                        <span className="mt-1 block font-display text-[20px] font-semibold leading-tight text-foreground">
                          {node.title}
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="premium-card-hover rounded-xl border border-primary/15 bg-white p-5 shadow-[0_18px_52px_rgba(23,23,23,0.06)] md:p-6"
              initial={false}
              key={active.title}
              transition={{ duration: 0.22 }}
            >
              <div className="mb-4 flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/8 text-primary">
                  <ActiveIcon className="size-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Selected Node</p>
                  <h3 className="font-display text-[26px] font-semibold leading-[1.12] text-foreground">
                    {active.title}
                  </h3>
                </div>
              </div>
              <p className="text-base font-semibold leading-relaxed text-foreground">{active.summary}</p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{active.proof}</p>
              <div className="mt-5 rounded-xl border border-border bg-[#fbfaf8] p-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Where it shows up</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{active.usedIn}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {active.stack.map((item) => (
                  <span
                    className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
