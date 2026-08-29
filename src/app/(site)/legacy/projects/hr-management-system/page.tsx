import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  Database,
  FileClock,
  KeyRound,
  Network,
  Server,
  UserRoundCheck,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PROJECT_ROUTES } from "@/constants/routes";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata(
  PROJECT_ROUTES.hrManagementSystem,
);

const features = [
  { title: "Employee Management", icon: Users },
  { title: "Attendance Tracking", icon: CalendarCheck },
  { title: "Leave Management", icon: FileClock },
  { title: "Department Management", icon: Network },
  { title: "Recruitment Workflow", icon: BriefcaseBusiness },
  { title: "Reporting", icon: BarChart3 },
  { title: "Role-Based Access", icon: KeyRound },
] as const;

const stackGroups = [
  { label: "Frontend", items: ["React / Angular"] },
  { label: "Backend", items: ["Node.js", "Express.js"] },
  { label: "Database", items: ["MongoDB"] },
  { label: "Architecture", items: ["REST APIs"] },
] as const;

const responsibilities = [
  "Built frontend modules for employee, attendance, leave, and administrative workflows.",
  "Developed backend APIs for HR records and internal operations.",
  "Worked on authentication workflows and role-based access behavior.",
  "Implemented reporting features for employee and workflow visibility.",
  "Supported administrative modules used by internal teams.",
  "Collaborated on testing and deployment support during delivery.",
] as const;

const impactItems = [
  "Centralized HR operations into a single internal platform.",
  "Reduced manual administrative work across employee and leave workflows.",
  "Improved visibility across employee data, attendance, departments, and reporting.",
] as const;

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </span>
      <h2 className="font-display text-[32px] font-bold leading-[1.12] text-foreground md:text-[44px]">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 text-base leading-[1.75] text-muted-foreground md:text-lg">
          {text}
        </p>
      ) : null}
    </div>
  );
}

export default function HrManagementSystemProjectPage() {
  return (
    <div className="bg-background">
      <section className="mesh-gradient relative overflow-hidden border-b border-border px-[5vw] py-16 md:py-22">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 rounded-full bg-primary/10 blur-[130px]" />
        <div className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.68fr_0.32fr] md:items-end">
          <Reveal>
            <Link
              className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              href="/#work"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back to Projects
            </Link>
            <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Enterprise Case Study
            </span>
            <h1 className="font-display text-[42px] font-bold leading-[1.05] text-foreground sm:text-[56px] md:text-[68px]">
              HR Management System
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-[1.75] text-muted-foreground md:text-xl">
              An HR platform built to manage employee operations, attendance,
              leave tracking, departments, and internal administrative
              workflows.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-xl border border-border bg-white/82 p-6 shadow-[0_24px_70px_rgba(23,23,23,0.08)] backdrop-blur-xl">
              <UserRoundCheck
                aria-hidden="true"
                className="mb-6 size-8 text-primary"
              />
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Role
              </span>
              <p className="font-display text-[26px] font-bold leading-tight">
                Junior Full Stack Developer
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-[5vw] py-14 md:space-y-20 md:py-20">
        <Reveal>
          <section className="grid gap-8 md:grid-cols-[0.62fr_0.38fr]">
            <SectionIntro
              eyebrow="Overview"
              title="A focused internal system for HR operations."
              text="The system helped bring employee records, attendance, leave, departments, recruitment, reporting, and access control into one administrative workflow."
            />
            <div className="rounded-xl border border-border bg-white p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)]">
              <Database aria-hidden="true" className="mb-5 size-7 text-primary" />
              <p className="text-base leading-[1.75] text-muted-foreground">
                The implementation focused on practical internal workflows,
                reliable data handling, and clear access boundaries.
              </p>
            </div>
          </section>
        </Reveal>

        <section className="grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-xl border border-border bg-white p-7 shadow-[0_18px_50px_rgba(23,23,23,0.05)]">
            <SectionIntro
              eyebrow="Business Problem"
              title="HR work was spread across manual processes."
            />
            <p className="mt-6 text-base leading-[1.75] text-muted-foreground md:text-lg">
              Employee data, attendance, leave requests, departments, and
              reporting needed a clearer system so administrative teams could
              manage daily HR operations with less manual tracking.
            </p>
          </Reveal>
          <Reveal
            className="rounded-xl border border-border bg-white p-7 shadow-[0_18px_50px_rgba(23,23,23,0.05)]"
            delay={0.1}
          >
            <SectionIntro
              eyebrow="Solution"
              title="A centralized HR workflow with role-based access."
            />
            <p className="mt-6 text-base leading-[1.75] text-muted-foreground md:text-lg">
              The platform connected HR modules through REST APIs, MongoDB, and
              authentication workflows so internal users could manage employee
              operations from a single system.
            </p>
          </Reveal>
        </section>

        <section>
          <Reveal className="mb-10">
            <SectionIntro
              eyebrow="Core Features"
              title="Administrative modules for everyday HR work."
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Reveal
                  className="group rounded-xl border border-border bg-white p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_64px_rgba(109,94,246,0.1)]"
                  delay={index * 0.035}
                  key={feature.title}
                >
                  <Icon aria-hidden="true" className="mb-5 size-7 text-primary" />
                  <h3 className="font-display text-[22px] font-bold leading-tight">
                    {feature.title}
                  </h3>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-[0.38fr_0.62fr]">
          <Reveal>
            <SectionIntro
              eyebrow="Tech Stack"
              title="A REST API based full stack implementation."
              text="The stack used familiar web technologies for internal modules, backend workflows, database integration, and role-based access."
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {stackGroups.map((group, index) => (
              <Reveal
                className="rounded-xl border border-border bg-white p-5 shadow-[0_18px_50px_rgba(23,23,23,0.05)]"
                delay={index * 0.04}
                key={group.label}
              >
                <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      className="rounded-full border border-border/80 bg-white px-3 py-1.5 text-sm font-medium text-muted-foreground"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="grid gap-8 rounded-xl border border-border bg-white/72 p-6 shadow-[0_24px_70px_rgba(23,23,23,0.06)] md:grid-cols-[0.4fr_0.6fr] md:p-8">
          <Reveal>
            <SectionIntro
              eyebrow="Responsibilities"
              title="Contributing across modules, APIs, auth, reporting, and delivery."
            />
          </Reveal>
          <div className="space-y-4">
            {responsibilities.map((item, index) => (
              <Reveal
                className="flex gap-4 rounded-xl border border-border bg-white p-5"
                delay={index * 0.04}
                key={item}
              >
                {index === 1 ? (
                  <Server
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-primary"
                  />
                ) : index === 2 ? (
                  <KeyRound
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-primary"
                  />
                ) : (
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-primary"
                  />
                )}
                <p className="text-base leading-relaxed text-muted-foreground">
                  {item}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-[0.4fr_0.6fr]">
          <Reveal>
            <SectionIntro
              eyebrow="Impact"
              title="Clearer HR visibility and less manual administration."
            />
          </Reveal>
          <div className="space-y-4">
            {impactItems.map((item, index) => (
              <Reveal
                className="flex gap-4 rounded-xl border border-border bg-white p-5 shadow-[0_18px_50px_rgba(23,23,23,0.05)]"
                delay={index * 0.04}
                key={item}
              >
                <BarChart3
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-primary"
                />
                <p className="text-base leading-relaxed text-muted-foreground">
                  {item}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <nav
            aria-label="Project navigation"
            className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <Link
              className="inline-flex items-center gap-2 font-bold text-muted-foreground transition-colors hover:text-primary"
              href={PROJECT_ROUTES.erpSystem}
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Previous Project: ERP System
            </Link>
            <Link
              className="group inline-flex items-center gap-2 font-bold text-foreground transition-colors hover:text-primary"
              href="/#work"
            >
              Back to Projects
            </Link>
          </nav>
        </Reveal>
      </div>
    </div>
  );
}
