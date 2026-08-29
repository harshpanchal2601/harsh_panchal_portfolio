import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Boxes,
  Brain,
  Cloud,
  Database,
  ExternalLink,
  Globe,
  Layers,
  LockKeyhole,
  MessageSquare,
  Network,
  RefreshCw,
  Server,
  Share2,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PROJECT_ROUTES } from "@/constants/routes";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata(PROJECT_ROUTES.wikipointAi);

const liveUrl = "https://wikipoint.ai";

const tocItems = [
  { label: "Overview", href: "#overview" },
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Features", href: "#features" },
  { label: "Stack", href: "#stack" },
  { label: "AWS", href: "#aws" },
  { label: "Challenges", href: "#challenges" },
  { label: "Impact", href: "#impact" },
  { label: "Role", href: "#role" },
  { label: "Gallery", href: "#gallery" },
] as const;

const metrics = [
  { label: "Platform goal", value: "Under 2 min" },
  { label: "Product scope", value: "4 channels" },
  { label: "Role", value: "Full Stack + AWS" },
] as const;

const features = [
  {
    title: "Dynamic Website Generation",
    description:
      "Professional websites are generated and maintained automatically from business information.",
    icon: Globe,
  },
  {
    title: "AI Assistant",
    description:
      "A business-aware chatbot stays available for customer questions and routine guidance.",
    icon: Bot,
  },
  {
    title: "Social Content Generation",
    description:
      "Content is produced around the business identity so channels stay consistent.",
    icon: Share2,
  },
  {
    title: "Immersive 3D Space",
    description:
      "Interactive digital spaces give customers a richer way to explore the business.",
    icon: Boxes,
  },
  {
    title: "Unified Digital Presence",
    description:
      "The website, assistant, content, and experience layer are managed as one ecosystem.",
    icon: Network,
  },
  {
    title: "Real-Time Updates",
    description:
      "Content changes flow through connected channels without requiring separate updates.",
    icon: RefreshCw,
  },
] as const;

const stackGroups = [
  { label: "Frontend", items: ["Angular"] },
  { label: "Backend", items: ["Node.js", "Express"] },
  { label: "Database", items: ["MongoDB"] },
  { label: "AI", items: ["RAG", "LLMs"] },
  { label: "Cloud", items: ["AWS"] },
  { label: "DevOps", items: ["CI/CD", "GitHub Actions"] },
] as const;

const awsServices = [
  "EC2",
  "Lambda",
  "S3",
  "CloudWatch",
  "Secrets Manager",
  "RDS",
  "DynamoDB",
  "DNS Hosting",
  "DNS Management",
] as const;

const architectureNodes = [
  { label: "Angular App", icon: Globe },
  { label: "Node API", icon: Server },
  { label: "RAG Pipeline", icon: Brain },
  { label: "MongoDB", icon: Database },
  { label: "AWS Runtime", icon: Cloud },
  { label: "Monitoring", icon: Workflow },
] as const;

const challenges = [
  {
    title: "Building the foundation architecture",
    text: "The platform needed a base that could support websites, AI assistants, generated content, and 3D experiences without treating each piece as an isolated project. The architecture had to keep business data central while still allowing each service to evolve independently.",
  },
  {
    title: "Designing scalable backend services",
    text: "Backend services had to handle business setup, generated assets, AI requests, content updates, and deployment workflows. I focused on separating responsibilities clearly so API behavior stayed predictable as more platform features were connected.",
  },
  {
    title: "Creating and improving the RAG pipeline",
    text: "The assistant needed useful business-specific answers instead of generic responses. That meant shaping the retrieval flow, improving source context, and testing how the model behaved when information was incomplete, duplicated, or updated.",
  },
  {
    title: "Managing AI context retrieval",
    text: "Context retrieval had to be accurate enough for customer-facing answers while staying efficient. I worked on keeping the retrieved information relevant, scoped to the business, and structured in a way the assistant could use reliably.",
  },
  {
    title: "AWS infrastructure setup",
    text: "The infrastructure involved multiple AWS services with different responsibilities across compute, storage, monitoring, DNS, and secrets. The goal was to keep deployments repeatable and production operations observable.",
  },
  {
    title: "Security and secret management",
    text: "API keys, service credentials, and environment-specific values needed to be handled outside the codebase. Secrets Manager and controlled deployment configuration helped reduce manual handling and accidental exposure risk.",
  },
  {
    title: "Deployment automation",
    text: "Manual deployment would slow the team down and create inconsistent releases. GitHub Actions and CI/CD workflows helped standardize build, deployment, and release steps across the services involved.",
  },
  {
    title: "Multi-service communication",
    text: "The product depends on several services working together: backend APIs, AI retrieval, generated website data, storage, DNS, and monitoring. A major part of the work was making those boundaries explicit and easier to debug.",
  },
] as const;

const impactItems = [
  "Created an end-to-end digital presence platform for business onboarding and management.",
  "Reduced the time needed to move from business information to a usable digital experience.",
  "Centralized management across websites, AI assistants, social content, and immersive spaces.",
  "Supported AI-powered automation without removing business control from the workflow.",
  "Established a production-ready deployment architecture across AWS and CI/CD workflows.",
] as const;

const responsibilities = [
  "Built full stack product flows across Angular, Node.js, Express, and MongoDB.",
  "Worked on AI assistant behavior, RAG retrieval, and business-aware response context.",
  "Configured AWS services for runtime, storage, monitoring, DNS, and secret management.",
  "Set up deployment automation with GitHub Actions and CI/CD practices.",
  "Improved communication between platform services and production workflows.",
] as const;

const galleryItems = [
  "Generated website management",
  "AI assistant workflow",
  "Unified business dashboard",
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

export default function WikipointAiProjectPage() {
  return (
    <div className="bg-background">
      <section className="mesh-gradient relative overflow-hidden border-b border-border px-[5vw] py-16 md:py-24">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 rounded-full bg-primary/10 blur-[130px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.74fr_0.26fr]">
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
              Wikipoint AI
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-[1.75] text-muted-foreground md:text-xl">
              An AI platform that helps businesses build and manage their
              complete digital presence in under two minutes.
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
                Full Stack Developer & AWS/DevOps Engineer
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:pt-22">
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {metrics.map((metric) => (
                <div
                  className="rounded-xl border border-border bg-white/82 p-5 shadow-[0_18px_50px_rgba(23,23,23,0.05)] backdrop-blur-md"
                  key={metric.label}
                >
                  <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {metric.label}
                  </span>
                  <span className="mt-2 block font-display text-[26px] font-bold leading-tight">
                    {metric.value}
                  </span>
                </div>
              ))}
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
              className="grid gap-8 md:grid-cols-[0.72fr_0.28fr]"
              id="overview"
            >
              <SectionIntro
                eyebrow="Project Overview"
                title="A connected platform for digital visibility."
                text="Wikipoint AI creates and maintains the channels a business needs to be visible online: a website, an AI assistant, social content, and an immersive customer experience."
              />
              <div className="rounded-xl border border-border bg-white p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)]">
                <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Core Idea
                </span>
                <p className="text-base leading-[1.75] text-muted-foreground">
                  Business owners should not need technical expertise to launch
                  and maintain a useful digital presence.
                </p>
              </div>
            </section>
          </Reveal>

          <section className="grid gap-6 md:grid-cols-2" id="problem">
            <Reveal className="rounded-xl border border-border bg-white p-7 shadow-[0_18px_50px_rgba(23,23,23,0.05)]">
              <SectionIntro
                eyebrow="The Problem"
                title="Digital setup is still fragmented."
              />
              <p className="mt-6 text-base leading-[1.75] text-muted-foreground md:text-lg">
                A business often needs separate tools, vendors, and workflows
                for its website, customer assistant, content updates, and
                customer experience layer. That creates delays, inconsistent
                information, and ongoing maintenance overhead.
              </p>
            </Reveal>
            <Reveal
              className="rounded-xl border border-border bg-white p-7 shadow-[0_18px_50px_rgba(23,23,23,0.05)]"
              delay={0.1}
              id="solution"
            >
              <SectionIntro
                eyebrow="The Solution"
                title="One business source, many connected outputs."
              />
              <p className="mt-6 text-base leading-[1.75] text-muted-foreground md:text-lg">
                Wikipoint AI centralizes business information and uses it to
                power generated websites, AI assistants, social content, and 3D
                spaces. Updating the source content updates the connected
                channels around it.
              </p>
            </Reveal>
          </section>

          <section id="features">
            <Reveal className="mb-10">
              <SectionIntro
                eyebrow="Platform Features"
                title="Product capabilities designed as one ecosystem."
                text="Each feature is useful on its own, but the engineering value is in making them share context and stay consistent."
              />
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <Reveal
                    className="group rounded-xl border border-border bg-white p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_64px_rgba(109,94,246,0.12)]"
                    delay={index * 0.04}
                    key={feature.title}
                  >
                    <Icon aria-hidden="true" className="mb-5 size-7 text-primary" />
                    <h3 className="mb-3 font-display text-[24px] font-bold leading-[1.2]">
                      {feature.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section className="grid gap-8 md:grid-cols-[0.4fr_0.6fr]" id="stack">
            <Reveal>
              <SectionIntro
                eyebrow="Technology Stack"
                title="Built with a practical full stack foundation."
                text="The stack was selected around maintainable application code, API services, data storage, AI retrieval, and cloud operations."
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

          <section
            className="rounded-xl border border-border bg-white/72 p-6 shadow-[0_24px_70px_rgba(23,23,23,0.06)] md:p-8"
            id="aws"
          >
            <Reveal className="mb-8">
              <SectionIntro
                eyebrow="AWS Architecture"
                title="A production architecture across compute, storage, DNS, monitoring, and secrets."
                text="This visual is a simplified architecture placeholder showing the main service responsibilities and communication flow."
              />
            </Reveal>
            <Reveal>
              <div className="relative overflow-hidden rounded-xl border border-border bg-[linear-gradient(rgba(23,23,23,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(23,23,23,0.045)_1px,transparent_1px),radial-gradient(circle_at_20%_20%,rgba(109,94,246,0.13),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(215,199,163,0.28),transparent_34%),#ffffff] bg-[size:34px_34px,34px_34px,auto,auto,auto] p-5 md:p-8">
                <div className="grid gap-4 md:grid-cols-3">
                  {architectureNodes.map((node, index) => {
                    const Icon = node.icon;

                    return (
                      <div
                        className="rounded-xl border border-border bg-white/86 p-5 shadow-[0_16px_46px_rgba(23,23,23,0.06)] backdrop-blur-md"
                        key={node.label}
                      >
                        <Icon
                          aria-hidden="true"
                          className="mb-4 size-6 text-primary"
                        />
                        <span className="font-semibold text-foreground">
                          {node.label}
                        </span>
                        <span className="mt-2 block text-sm text-muted-foreground">
                          Layer 0{index + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {awsServices.map((service) => (
                    <span
                      className="rounded-full border border-border bg-white/90 px-3 py-1.5 text-sm font-medium text-muted-foreground"
                      key={service}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          <section id="challenges">
            <Reveal className="mb-10">
              <SectionIntro
                eyebrow="Engineering Challenges"
                title="The hard parts were in the connections between systems."
                text="The work was not just building screens or calling an AI model. The platform needed a dependable base for product data, generated outputs, cloud services, and AI context."
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

          <section className="grid gap-8 md:grid-cols-[0.45fr_0.55fr]" id="impact">
            <Reveal>
              <SectionIntro
                eyebrow="Impact"
                title="A faster path from business identity to digital presence."
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

          <section
            className="grid gap-8 rounded-xl border border-border bg-white/72 p-6 shadow-[0_24px_70px_rgba(23,23,23,0.06)] md:grid-cols-[0.4fr_0.6fr] md:p-8"
            id="role"
          >
            <Reveal>
              <SectionIntro
                eyebrow="Role & Responsibilities"
                title="Full stack product work with AWS ownership."
                text="My role covered application development, backend services, AI workflow support, deployment, and infrastructure setup."
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
                    <Brain
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-primary"
                    />
                  ) : index === 2 ? (
                    <Cloud
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-primary"
                    />
                  ) : index === 3 ? (
                    <Workflow
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-primary"
                    />
                  ) : index === 4 ? (
                    <Layers
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-primary"
                    />
                  ) : (
                    <LockKeyhole
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

          <section id="gallery">
            <Reveal className="mb-10">
              <SectionIntro
                eyebrow="Project Gallery"
                title="Visual placeholders for product screens."
                text="These placeholders reserve the case study rhythm for future screenshots without changing the current theme."
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
                    <MessageSquare
                      aria-hidden="true"
                      className="size-7 text-primary"
                    />
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
                    Explore Wikipoint AI live.
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
                href="/#work"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to Projects
              </Link>
              <Link
                className="group inline-flex items-center gap-2 font-bold text-foreground transition-colors hover:text-primary"
                href={PROJECT_ROUTES.beige}
              >
                Next Project: Beige
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
