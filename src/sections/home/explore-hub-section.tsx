import Link from "next/link";
import {
  BriefcaseBusiness,
  Cloud,
  FolderKanban,
  GitBranch,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const modules = [
  {
    title: "Project Missions",
    description:
      "Explore the strongest product builds, engineering tradeoffs, and case-study outcomes.",
    href: "/#work",
    icon: FolderKanban,
  },
  {
    title: "Skill System",
    description:
      "Inspect the frontend, backend, cloud, and AI capabilities behind the work.",
    href: "/#skills",
    icon: Sparkles,
  },
  {
    title: "Career Path",
    description:
      "Trace the progression from fundamentals to production delivery and team responsibility.",
    href: "/#journey",
    icon: BriefcaseBusiness,
  },
  {
    title: "Cloud Ops",
    description:
      "See how deployment, AWS services, and release workflows fit into the overall system.",
    href: "/#skills",
    icon: Cloud,
  },
  {
    title: "About Harsh",
    description:
      "Get a quick read on work style, engineering philosophy, and product-builder mindset.",
    href: "/#about",
    icon: UserRound,
  },
  {
    title: "Contact Portal",
    description:
      "Move from exploration into conversation through email, social links, and the resume.",
    href: "/#contact",
    icon: GitBranch,
  },
] as const;

const principles = [
  "Clear systems over clever complexity",
  "Practical product thinking with production discipline",
  "Interface, backend, and cloud working as one experience",
] as const;

export function ExploreHubSection() {
  return (
    <section
      className="border-t border-border bg-white/48 px-[5vw] py-16 md:py-24"
      id="explore"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 md:mb-14">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Explore Hub
              </span>
              <h2 className="font-display text-[32px] font-bold leading-[1.12] text-foreground md:text-[44px] lg:text-[48px]">
                Choose what part of Harsh OS to inspect next.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">
                Instead of a long resume scroll, this hub gives you clearer paths
                into projects, skills, cloud work, career progression, and contact.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white/78 px-5 py-4 shadow-[0_18px_50px_rgba(23,23,23,0.05)] backdrop-blur-md">
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Mode
              </span>
              <span className="mt-2 block font-display text-[24px] font-bold text-foreground">
                Harsh OS
              </span>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module, index) => {
            const Icon = module.icon;

            return (
              <Reveal delay={index * 0.04} key={module.title}>
                <Link
                  className="group block h-full rounded-xl border border-border bg-white/88 p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_64px_rgba(109,94,246,0.12)] focus-visible:border-primary/40"
                  href={module.href}
                >
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/8 text-primary transition duration-300 group-hover:scale-[1.05] group-hover:bg-primary/12">
                      <Icon aria-hidden="true" className="size-5 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mb-3 font-display text-[24px] font-bold leading-[1.16] text-foreground">
                    {module.title}
                  </h3>
                  <p className="text-base leading-[1.75] text-muted-foreground">
                    {module.description}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div
              className="rounded-xl border border-border bg-white p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)] md:p-7"
              id="about"
            >
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                About Harsh
              </span>
              <h3 className="font-display text-[28px] font-bold leading-[1.14] text-foreground md:text-[34px]">
                Full stack builder focused on useful software, clean execution,
                and production-ready systems.
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">
                Harsh works across interface, backend, deployment, and real product
                workflows. The goal is simple: make systems understandable, stable,
                and easy to keep improving.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-xl border border-border bg-white/82 p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)] backdrop-blur-md md:p-7">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                How It Runs
              </span>
              <div className="grid gap-4">
                {principles.map((principle) => (
                  <div
                    className="rounded-xl border border-border/80 bg-white px-4 py-4 transition duration-300 hover:border-primary/25 hover:bg-primary/5"
                    key={principle}
                  >
                    <p className="text-base font-medium leading-relaxed text-foreground">
                      {principle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
