import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  Gauge,
  GitBranch,
  Inbox,
  Layers,
  Mail,
  MapPin,
  PanelTop,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PROJECT_ROUTES } from "@/constants/routes";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata(PROJECT_ROUTES.beige);

const liveUrl = "https://beige.app";

const tocItems = [
  { label: "Overview", href: "#overview" },
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Modules", href: "#modules" },
  { label: "Workflow", href: "#workflow" },
  { label: "Panels", href: "#panels" },
  { label: "Stack", href: "#stack" },
  { label: "Challenges", href: "#challenges" },
  { label: "Role", href: "#role" },
  { label: "Impact", href: "#impact" },
  { label: "Gallery", href: "#gallery" },
] as const;

const highlights = [
  { label: "Product type", value: "Booking + CRM" },
  { label: "Panels", value: "6+ roles" },
  { label: "Position", value: "Main developer" },
] as const;

const modules = [
  {
    title: "Booking System",
    description:
      "End-to-end booking flow for photography and videography shoots, from user request to operational follow-through.",
    icon: Camera,
  },
  {
    title: "AI Matchmaking",
    description:
      "Matching logic to find nearby suitable creative professionals based on availability, fit, and booking needs.",
    icon: MapPin,
  },
  {
    title: "CRM Workflow",
    description:
      "Sales and operations workflow management for tracking leads, clients, bookings, and follow-ups.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Payment System",
    description:
      "Stripe-powered payment flow connected to the booking lifecycle and operational status.",
    icon: CreditCard,
  },
  {
    title: "Multi-Panel Architecture",
    description:
      "Separate panels for Sales, CP, End User, Client, Admin, and Super Admin workflows.",
    icon: PanelTop,
  },
  {
    title: "Communication",
    description:
      "SendGrid integration for transactional emails and booking-related communication.",
    icon: Mail,
  },
] as const;

const workflowSteps = [
  "User request",
  "Match creative professional",
  "Sales and CRM review",
  "Booking confirmation",
  "Stripe payment",
  "Shoot operations",
] as const;

const panels = [
  {
    title: "Sales",
    description: "Lead handling, booking coordination, and CRM follow-up.",
    icon: BadgeDollarSign,
  },
  {
    title: "CP",
    description: "Creative professional workflow and assigned shoot visibility.",
    icon: Camera,
  },
  {
    title: "End User",
    description: "Booking discovery, request submission, and payment journey.",
    icon: Users,
  },
  {
    title: "Client",
    description: "Client-side booking status, project details, and updates.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Admin",
    description: "Operational management, permissions, and workflow control.",
    icon: ShieldCheck,
  },
  {
    title: "Super Admin",
    description: "High-level platform control and system oversight.",
    icon: Gauge,
  },
] as const;

const stackGroups = [
  { label: "Frontend", items: ["Next.js"] },
  { label: "Backend", items: ["Node.js"] },
  { label: "Database", items: ["MongoDB Atlas", "AWS RDS"] },
  { label: "Cloud", items: ["AWS EC2", "AWS S3"] },
  { label: "Payments", items: ["Stripe"] },
  { label: "Email", items: ["SendGrid"] },
  { label: "DevOps", items: ["AWS Deployment", "CI/CD"] },
] as const;

const challenges = [
  {
    title: "Building the product foundation as the main developer",
    text: "The early architecture had to support booking, CRM, payments, panels, and operational workflows without becoming difficult to extend. I worked on the foundation so new flows could be added without rewriting the core product structure.",
  },
  {
    title: "Managing complex role-based workflows",
    text: "Each panel needed different permissions, data visibility, and actions. The challenge was keeping those workflows separate enough for safety while still allowing the platform to move one booking through a shared lifecycle.",
  },
  {
    title: "Designing scalable booking logic",
    text: "Booking logic needed to account for shoot type, user details, creative professional assignment, sales review, payments, and operational status. I focused on clear state transitions so the workflow remained understandable.",
  },
  {
    title: "Handling payment flow",
    text: "Stripe payments had to connect cleanly with booking status and user actions. Payment handling needed reliable success and failure paths so operations could trust what the system showed.",
  },
  {
    title: "Connecting CRM and booking operations",
    text: "The CRM could not be a separate tool sitting beside the booking flow. Sales and operations needed context from each request, so the CRM workflow was tied back to booking data and follow-up actions.",
  },
  {
    title: "Building multiple panels with different permissions",
    text: "More than six panels meant repeated patterns, but not identical screens. I built panel-specific experiences while keeping shared behavior consistent across authentication, navigation, data access, and status changes.",
  },
  {
    title: "Coordinating team direction and implementation",
    text: "As the main developer, part of the work was turning product needs into implementation direction. That included clarifying flows, sequencing development work, and keeping the technical approach consistent.",
  },
  {
    title: "Deployment and production stability",
    text: "The platform needed dependable deployment and asset handling across AWS services. I worked on deployment flow, production configuration, and stability concerns so releases were manageable.",
  },
] as const;

const responsibilities = [
  "Full stack development across the booking, CRM, panel, and payment workflows.",
  "Main developer responsibility for product foundation and implementation direction.",
  "Backend workflow design for bookings, role behavior, CRM operations, and payment status.",
  "Frontend panel development for Sales, CP, End User, Client, Admin, and Super Admin users.",
  "Stripe payment integration connected to the booking lifecycle.",
  "AWS deployment and production configuration across EC2 and S3.",
  "Technical coordination to keep implementation aligned across product areas.",
] as const;

const impactItems = [
  "Delivered a connected booking platform for photography and videography workflows.",
  "Created role-specific panels for sales, creatives, customers, clients, and administrators.",
  "Connected CRM activity with booking operations instead of treating them as separate systems.",
  "Integrated payments and communication into the booking lifecycle.",
  "Established a stronger production foundation for ongoing platform development.",
] as const;

const galleryItems = [
  "Booking request flow",
  "CRM operations panel",
  "Multi-role dashboard",
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
      <h2 className="font-display text-[32px] font-bold leading-[1.12] text-foreground md:text-[44px] lg:text-[48px]">
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

export default function BeigeProjectPage() {
  return (
    <div className="bg-background">
      <section className="mesh-gradient relative overflow-hidden border-b border-border px-[5vw] py-16 md:py-24">
        <div className="pointer-events-none absolute left-0 top-12 h-72 w-72 rounded-full bg-secondary/30 blur-[110px]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-1/2 rounded-full bg-primary/10 blur-[130px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.68fr_0.32fr]">
          <Reveal>
            <Link
              className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              href="/#work"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back to Projects
            </Link>
            <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Engineering Case Study
            </span>
            <h1 className="max-w-4xl font-display text-[42px] font-bold leading-[1.05] text-foreground sm:text-[56px] md:text-[72px]">
              Beige
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-[1.75] text-muted-foreground md:text-xl">
              A photography and videography booking platform for Beige Studio,
              built around booking operations, CRM workflows, payments, AI
              matchmaking, and multiple role-based panels.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-[0_18px_44px_rgba(109,94,246,0.22)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-accent hover:shadow-[0_22px_54px_rgba(109,94,246,0.28)] active:scale-[0.98]"
                href={liveUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                View Live Project
                <ExternalLink
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <span className="inline-flex items-center justify-center rounded-full border border-border bg-white px-7 py-3.5 font-semibold text-foreground">
                Full Stack Developer / Main Developer
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-xl border border-border bg-white/76 p-5 shadow-[0_24px_70px_rgba(23,23,23,0.08)] backdrop-blur-xl">
              <div className="rounded-xl border border-border bg-[linear-gradient(rgba(23,23,23,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(23,23,23,0.045)_1px,transparent_1px),radial-gradient(circle_at_20%_20%,rgba(109,94,246,0.14),transparent_30%),radial-gradient(circle_at_75%_70%,rgba(215,199,163,0.32),transparent_34%),#ffffff] bg-[size:30px_30px,30px_30px,auto,auto,auto] p-5">
                <div className="mb-8 flex items-center justify-between">
                  <span className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    Booking Flow
                  </span>
                  <Workflow aria-hidden="true" className="size-5 text-primary" />
                </div>
                <div className="grid gap-3">
                  {workflowSteps.slice(0, 4).map((step, index) => (
                    <div
                      className="flex items-center gap-3 rounded-xl border border-border bg-white/88 p-3 shadow-[0_12px_32px_rgba(23,23,23,0.05)]"
                      key={step}
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {highlights.map((item) => (
                  <div
                    className="rounded-xl border border-border bg-white p-4"
                    key={item.label}
                  >
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {item.label}
                    </span>
                    <span className="mt-2 block font-display text-[24px] font-bold leading-tight">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-[5vw] py-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-20">
        <aside className="hidden lg:block">
          <nav
            aria-label="Case study table of contents"
            className="sticky top-28 rounded-xl border border-border bg-white/72 p-4 shadow-[0_18px_50px_rgba(23,23,23,0.05)] backdrop-blur-xl"
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Contents
            </span>
            <div className="grid gap-1">
              {tocItems.map((item) => (
                <a
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition duration-300 hover:bg-primary/8 hover:text-primary"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </aside>

        <div className="min-w-0 space-y-18 md:space-y-24">
          <Reveal>
            <section
              className="grid gap-8 md:grid-cols-[0.68fr_0.32fr]"
              id="overview"
            >
              <SectionIntro
                eyebrow="Project Overview"
                title="A booking platform connected to real business operations."
                text="Beige helps end users find nearby creative professionals for shoots and gives the business the internal tools needed to manage the full booking lifecycle."
              />
              <div className="rounded-xl border border-border bg-white p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)]">
                <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Product Scope
                </span>
                <p className="text-base leading-[1.75] text-muted-foreground">
                  Booking workflow, CRM, payments, AI matchmaking, sales
                  operations, and multiple panels for different user roles.
                </p>
              </div>
            </section>
          </Reveal>

          <section className="grid gap-6 md:grid-cols-2">
            <Reveal
              className="rounded-xl border border-border bg-white p-7 shadow-[0_18px_50px_rgba(23,23,23,0.05)]"
              id="problem"
            >
              <SectionIntro
                eyebrow="The Business Problem"
                title="Creative bookings need more than a request form."
              />
              <p className="mt-6 text-base leading-[1.75] text-muted-foreground md:text-lg">
                Photography and videography bookings involve discovery,
                matching, sales coordination, client communication, payments,
                and operational follow-up. Handling these steps across separate
                tools makes the process slower and harder to track.
              </p>
            </Reveal>
            <Reveal
              className="rounded-xl border border-border bg-white p-7 shadow-[0_18px_50px_rgba(23,23,23,0.05)]"
              delay={0.1}
              id="solution"
            >
              <SectionIntro
                eyebrow="The Platform Solution"
                title="A single workflow from request to completed shoot."
              />
              <p className="mt-6 text-base leading-[1.75] text-muted-foreground md:text-lg">
                Beige connects customer booking, professional matching, CRM
                operations, payment status, and role-based panels so each team
                member works from the same booking context.
              </p>
            </Reveal>
          </section>

          <section id="modules">
            <Reveal className="mb-10">
              <SectionIntro
                eyebrow="Core Modules"
                title="The product is built around operational modules, not isolated screens."
                text="Each module supports a different part of the booking lifecycle while sharing the same product foundation."
              />
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {modules.map((module, index) => {
                const Icon = module.icon;

                return (
                  <Reveal
                    className="group rounded-xl border border-border bg-white p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_64px_rgba(109,94,246,0.12)]"
                    delay={index * 0.04}
                    key={module.title}
                  >
                    <Icon aria-hidden="true" className="mb-5 size-7 text-primary" />
                    <h3 className="mb-3 font-display text-[24px] font-bold leading-[1.2]">
                      {module.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {module.description}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section
            className="rounded-xl border border-border bg-white/72 p-6 shadow-[0_24px_70px_rgba(23,23,23,0.06)] md:p-8"
            id="workflow"
          >
            <Reveal className="mb-8">
              <SectionIntro
                eyebrow="Workflow Architecture"
                title="A simplified view of the booking flow."
                text="This placeholder maps the main product states from user request through matching, CRM review, payment, and operations."
              />
            </Reveal>
            <Reveal>
              <div className="rounded-xl border border-border bg-[linear-gradient(rgba(23,23,23,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(23,23,23,0.045)_1px,transparent_1px),radial-gradient(circle_at_20%_20%,rgba(109,94,246,0.12),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(215,199,163,0.28),transparent_34%),#ffffff] bg-[size:34px_34px,34px_34px,auto,auto,auto] p-5 md:p-8">
                <div className="grid gap-4 md:grid-cols-3">
                  {workflowSteps.map((step, index) => (
                    <div
                      className="relative rounded-xl border border-border bg-white/88 p-5 shadow-[0_16px_46px_rgba(23,23,23,0.06)] backdrop-blur-md"
                      key={step}
                    >
                      <span className="mb-5 grid size-10 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      <h3 className="font-display text-[22px] font-bold leading-tight">
                        {step}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        Booking state 0{index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          <section id="panels">
            <Reveal className="mb-10">
              <SectionIntro
                eyebrow="Role-Based Panels"
                title="Different panels for different responsibilities."
                text="The platform supports more than six panels, each with its own permissions, workflow priorities, and user expectations."
              />
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {panels.map((panel, index) => {
                const Icon = panel.icon;

                return (
                  <Reveal
                    className="rounded-xl border border-border bg-white p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_64px_rgba(109,94,246,0.1)]"
                    delay={index * 0.04}
                    key={panel.title}
                  >
                    <Icon aria-hidden="true" className="mb-5 size-7 text-primary" />
                    <h3 className="mb-3 font-display text-[24px] font-bold leading-tight">
                      {panel.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {panel.description}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section className="grid gap-8 md:grid-cols-[0.38fr_0.62fr]" id="stack">
            <Reveal>
              <SectionIntro
                eyebrow="Tech Stack"
                title="A full stack setup for booking operations and production delivery."
                text="The stack covers frontend panels, backend workflows, database needs, cloud deployment, payments, email, and CI/CD."
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
                        className="rounded-full border border-border/80 bg-white px-3 py-1.5 text-sm font-medium text-muted-foreground transition duration-300 hover:border-primary/35 hover:bg-primary/8 hover:text-primary"
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

          <section id="challenges">
            <Reveal className="mb-10">
              <SectionIntro
                eyebrow="Engineering Challenges"
                title="The challenge was making many workflows behave like one product."
                text="Beige required practical engineering across booking logic, panel permissions, payments, CRM operations, team direction, and production deployment."
              />
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2">
              {challenges.map((challenge, index) => (
                <Reveal
                  className="rounded-xl border border-border bg-white p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_64px_rgba(109,94,246,0.1)]"
                  delay={index * 0.035}
                  key={challenge.title}
                >
                  <span className="mb-4 inline-flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <h3 className="mb-3 font-display text-[22px] font-bold leading-[1.2]">
                    {challenge.title}
                  </h3>
                  <p className="text-base leading-[1.75] text-muted-foreground">
                    {challenge.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </section>

          <section
            className="grid gap-8 rounded-xl border border-border bg-white/72 p-6 shadow-[0_24px_70px_rgba(23,23,23,0.06)] md:grid-cols-[0.4fr_0.6fr] md:p-8"
            id="role"
          >
            <Reveal>
              <SectionIntro
                eyebrow="Role & Responsibilities"
                title="Main developer across product foundation and delivery."
                text="My role covered implementation, architecture decisions, workflow design, frontend panels, payment integration, AWS deployment, and technical coordination."
              />
            </Reveal>
            <div className="space-y-4">
              {responsibilities.map((item, index) => (
                <Reveal
                  className="flex gap-4 rounded-xl border border-border bg-white p-5"
                  delay={index * 0.04}
                  key={item}
                >
                  {index === 2 ? (
                    <GitBranch
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-primary"
                    />
                  ) : index === 3 ? (
                    <PanelTop
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-primary"
                    />
                  ) : index === 4 ? (
                    <CreditCard
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-primary"
                    />
                  ) : index === 5 ? (
                    <Layers
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-primary"
                    />
                  ) : index === 6 ? (
                    <Workflow
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

          <section className="grid gap-8 md:grid-cols-[0.45fr_0.55fr]" id="impact">
            <Reveal>
              <SectionIntro
                eyebrow="Impact"
                title="A stronger operating system for creative bookings."
              />
            </Reveal>
            <div className="space-y-4">
              {impactItems.map((item, index) => (
                <Reveal
                  className="group flex gap-4 rounded-xl border border-border bg-white p-5 shadow-[0_18px_50px_rgba(23,23,23,0.05)] transition duration-300 hover:border-primary/25"
                  delay={index * 0.04}
                  key={item}
                >
                  <Sparkles
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

          <section id="gallery">
            <Reveal className="mb-10">
              <SectionIntro
                eyebrow="Gallery Placeholder"
                title="Reserved space for product screens and workflow captures."
                text="The placeholders keep the case study layout ready for future screenshots without changing the current soft-light visual direction."
              />
            </Reveal>
            <div className="grid gap-5 md:grid-cols-3">
              {galleryItems.map((item, index) => (
                <Reveal
                  className="group min-h-[240px] rounded-xl border border-border bg-[radial-gradient(circle_at_22%_20%,rgba(109,94,246,0.16),transparent_28%),radial-gradient(circle_at_70%_70%,rgba(215,199,163,0.30),transparent_34%),linear-gradient(135deg,#ffffff,#f5f2ec)] p-5 shadow-[0_18px_50px_rgba(23,23,23,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_64px_rgba(109,94,246,0.12)]"
                  delay={index * 0.05}
                  key={item}
                >
                  <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-white/78 p-5 backdrop-blur-md">
                    <Inbox aria-hidden="true" className="size-7 text-primary" />
                    <div>
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        Placeholder 0{index + 1}
                      </span>
                      <h3 className="font-display text-[22px] font-bold leading-tight">
                        {item}
                      </h3>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <Reveal>
            <section className="rounded-xl border border-border bg-foreground p-7 text-white shadow-[0_28px_80px_rgba(23,23,23,0.14)] md:p-10">
              <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                    Live Project CTA
                  </span>
                  <h2 className="font-display text-[32px] font-bold leading-[1.12] md:text-[42px]">
                    View Beige live.
                  </h2>
                </div>
                <a
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
                  href={liveUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Visit Website
                  <ExternalLink
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <nav
              aria-label="Next project navigation"
              className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <Link
                className="inline-flex items-center gap-2 font-bold text-muted-foreground transition-colors hover:text-primary"
                href={PROJECT_ROUTES.wikipointAi}
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Previous Project: Wikipoint AI
              </Link>
              <Link
                className="group inline-flex items-center gap-2 font-bold text-foreground transition-colors hover:text-primary"
                href={PROJECT_ROUTES.erpSystem}
              >
                Next Project: ERP System
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
            </nav>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
