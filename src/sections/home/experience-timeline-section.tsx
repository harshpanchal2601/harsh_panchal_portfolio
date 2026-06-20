"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Cloud, Code2, GitBranch, MapPin, Server, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

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

const responsibilities = [
  { label: "Product", Icon: Code2, text: "Building and improving production applications across frontend, backend, and deployment work." },
  { label: "REST APIs", Icon: Server, text: "Creating backend services that support real product workflows." },
  { label: "AWS", Icon: Cloud, text: "Handling deployment work across EC2, S3, RDS, Lambda, DynamoDB, DNS, and hosting." },
  { label: "CI/CD", Icon: GitBranch, text: "Setting up GitHub Actions based release and deployment workflows." },
  { label: "Team", Icon: Users, text: "Working in a team lead capacity for planning, coordination, and delivery." },
] as const;

const stackChips = ["AWS", "Node.js", "Angular", "Next.js", "CI/CD", "REST APIs", "EC2", "S3"] as const;
const productionSignals = [
  { value: "Production", label: "Application Work" },
  { value: "AWS", label: "Deployment" },
  { value: "REST", label: "API Delivery" },
] as const;

export function ExperienceTimelineSection() {
  const [activeYear, setActiveYear] = useState(journeySteps.length - 1);
  const [typedTitle, setTypedTitle] = useState("");
  const [typedText, setTypedText] = useState("");
  const active = journeySteps[activeYear];

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
    }, 16);

    return () => window.clearInterval(timer);
  }, [active]);

  return (
    <section className="relative overflow-hidden border-t border-border px-[5vw] py-10 md:py-14 lg:py-16" id="experience">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/8 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="mb-6 grid gap-4 md:grid-cols-[0.92fr_1.08fr] md:items-end">
          <div>
            <span className="section-label mb-4 block">Experience</span>
            <h2 className="font-display text-[32px] font-semibold leading-[1.12] md:text-[36px] lg:text-[38px]">
              Career operating timeline.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-[1.75] text-muted-foreground md:ml-auto md:text-[17px]">
            From fundamentals to production work, this section connects the journey with the current role at Shambhavi Technovation.
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal>
            <div className="premium-card-hover h-full rounded-2xl border border-border bg-white/82 p-5 shadow-[0_22px_70px_rgba(23,23,23,0.06)] md:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Current Role</p>
                  <h3 className="mt-2 font-display text-[28px] font-semibold leading-tight text-foreground md:text-[32px]">
                    Shambhavi Technovation
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Briefcase className="size-3.5 text-primary" />Full Stack Developer</span>
                    <span className="text-border">/</span>
                    <span className="flex items-center gap-1.5"><MapPin className="size-3.5 text-primary" />Ahmedabad, India</span>
                  </div>
                </div>
                <div className="shrink-0 rounded-xl border border-primary/20 bg-primary/8 px-4 py-3">
                  <span className="block font-display text-[22px] font-bold leading-none text-primary">May 2025 - Present</span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-primary/70">Production role</span>
                </div>
              </div>

              <p className="mt-6 max-w-2xl font-display text-[22px] font-semibold leading-tight text-foreground md:text-[24px]">
                Full Stack Developer working on production applications, AWS deployment, REST APIs, CI/CD, and delivery coordination.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {productionSignals.map((signal) => (
                  <div className="rounded-xl border border-border bg-[#fbfaf8] px-3 py-3 text-center" key={signal.label}>
                    <span className="block font-display text-[18px] font-bold leading-none text-primary md:text-[20px]">
                      {signal.value}
                    </span>
                    <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {signal.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {responsibilities.map(({ label, Icon, text }) => (
                  <div className="premium-card-hover rounded-xl border border-border bg-white/70 p-4" key={label}>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="grid size-9 place-items-center rounded-lg bg-primary/8 text-primary">
                        <Icon className="size-4" />
                      </span>
                      <span className="text-sm font-bold text-foreground">{label}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {stackChips.map((chip) => (
                  <span className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground" key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="premium-card-hover overflow-hidden rounded-2xl border border-primary/15 bg-white/82 shadow-[0_26px_80px_rgba(23,23,23,0.07)] backdrop-blur-md">
              <div className="flex h-11 items-center justify-between border-b border-border bg-white/72 px-4">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="size-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">career.sh</span>
              </div>

              <div className="p-5 font-mono md:p-5">
                <div className="mb-4 flex flex-wrap gap-2">
                  {journeySteps.map((step, index) => (
                    <button
                      className={`rounded-full border px-3 py-1.5 text-[11px] font-bold transition duration-300 ${
                        activeYear === index
                          ? "border-primary bg-primary text-white shadow-[0_10px_28px_rgba(109,94,246,0.24)]"
                          : "border-border bg-white text-muted-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                      }`}
                      key={step.year}
                      onClick={() => setActiveYear(index)}
                      type="button"
                    >
                      run {step.year}
                    </button>
                  ))}
                </div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-border bg-[#f8f6f2] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] md:p-5"
                  initial={false}
                  key={active.year}
                  transition={{ duration: 0.22 }}
                >
                  <p className="mb-3 text-[11px] font-bold text-emerald-600">
                    <span className="text-primary">harsh@portfolio</span>
                    <span className="text-muted-foreground">:~$ </span>
                    load_step --year {active.year}
                  </p>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary/55">Output</p>
                  <h3 className="mb-3 min-h-8 font-display text-[24px] font-bold leading-[1.12] text-foreground">
                    {typedTitle}
                    {typedTitle.length < active.title.length ? (
                      <span className="ml-1 inline-block h-6 w-2 translate-y-1 bg-primary" />
                    ) : null}
                  </h3>
                  <p className="min-h-[96px] text-sm leading-relaxed text-muted-foreground">
                    {typedText}
                    {typedTitle.length >= active.title.length && typedText.length < active.text.length ? (
                      <span className="ml-1 inline-block h-4 w-1.5 translate-y-0.5 bg-emerald-500" />
                    ) : null}
                  </p>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-primary/10">
                    <motion.div
                      animate={{ width: `${((activeYear + 1) / journeySteps.length) * 100}%` }}
                      className="h-full rounded-full bg-primary"
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
                <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                  {journeySteps.map((step, index) => (
                    <button
                      className={`rounded-lg border px-2 py-2 text-[10px] font-bold transition duration-300 ${
                        activeYear === index
                          ? "border-primary/35 bg-primary/8 text-primary"
                          : "border-border bg-white/70 text-muted-foreground hover:border-primary/30 hover:text-primary"
                      }`}
                      key={`marker-${step.year}`}
                      onClick={() => setActiveYear(index)}
                      type="button"
                    >
                      {step.year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
