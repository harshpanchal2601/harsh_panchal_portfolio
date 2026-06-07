import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  GitBranch,
  Mail,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata("/contact");

const contactLinks = [
  {
    label: "Email",
    value: "harshpanchal7979@gmail.com",
    href: "mailto:harshpanchal7979@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "harshpanchal2601",
    href: "https://www.linkedin.com/in/harshpanchal2601/",
    icon: BriefcaseBusiness,
  },
  {
    label: "GitHub",
    value: "harshpanchal2601",
    href: "https://github.com/harshpanchal2601",
    icon: GitBranch,
  },
] as const;

const availabilityItems = [
  "Full-time opportunities",
  "Freelance projects",
  "Product development",
  "Technical consulting",
] as const;

export default function ContactPage() {
  return (
    <div className="bg-background">
      <section className="mesh-gradient relative overflow-hidden border-b border-border px-[5vw] py-16 md:py-24">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 rounded-full bg-primary/10 blur-[130px]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.68fr_0.32fr] md:items-end">
          <Reveal>
            <Link
              className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              href="/"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back Home
            </Link>
            <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Contact
            </span>
            <h1 className="max-w-4xl font-display text-[42px] font-bold leading-[1.05] text-foreground sm:text-[56px] md:text-[72px]">
              Let&apos;s build something meaningful.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-[1.75] text-muted-foreground md:text-xl">
              Whether it&apos;s a product idea, a scalable platform, or a
              cloud-based solution, I&apos;m always open to discussing
              interesting opportunities.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-[0_18px_44px_rgba(109,94,246,0.22)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-accent hover:shadow-[0_22px_54px_rgba(109,94,246,0.28)] active:scale-[0.98]"
                href="mailto:harshpanchal7979@gmail.com"
              >
                Email Me
                <Mail aria-hidden="true" className="size-4" />
              </a>
              <a
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-7 py-3.5 font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/40 hover:text-primary hover:shadow-[0_16px_40px_rgba(23,23,23,0.08)] active:scale-[0.98]"
                href="https://www.linkedin.com/in/harshpanchal2601/"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-7 py-3.5 font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/40 hover:text-primary hover:shadow-[0_16px_40px_rgba(23,23,23,0.08)] active:scale-[0.98]"
                href="https://github.com/harshpanchal2601"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-7 py-3.5 font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/40 hover:text-primary hover:shadow-[0_16px_40px_rgba(23,23,23,0.08)] active:scale-[0.98]"
                href="/Harsh-Panchal-Resume.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                Download Resume
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-xl border border-border bg-white/82 p-6 shadow-[0_24px_70px_rgba(23,23,23,0.08)] backdrop-blur-xl">
              <MessageCircle
                aria-hidden="true"
                className="mb-6 size-8 text-primary"
              />
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Harsh Panchal
              </span>
              <p className="font-display text-[26px] font-bold leading-tight">
                Full Stack Developer
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-[5vw] py-14 md:space-y-20 md:py-20">
        <section className="grid gap-8 md:grid-cols-[0.42fr_0.58fr]">
          <Reveal>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Availability
            </span>
            <h2 className="font-display text-[32px] font-bold leading-[1.12] text-foreground md:text-[44px]">
              Currently available for focused product and engineering work.
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {availabilityItems.map((item, index) => (
              <Reveal
                className="flex gap-4 rounded-xl border border-border bg-white p-5 shadow-[0_18px_50px_rgba(23,23,23,0.05)]"
                delay={index * 0.04}
                key={item}
              >
                <BriefcaseBusiness
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-primary"
                />
                <p className="text-base font-semibold leading-relaxed text-foreground">
                  {item}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {contactLinks.map((link, index) => {
            const Icon = link.icon;
            const isExternal = link.href.startsWith("http");

            return (
              <Reveal
                className="group rounded-xl border border-border bg-white p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_64px_rgba(109,94,246,0.1)]"
                delay={index * 0.05}
                key={link.label}
              >
                <a
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  href={link.href}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  target={isExternal ? "_blank" : undefined}
                >
                  <Icon aria-hidden="true" className="mb-5 size-7 text-primary" />
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {link.label}
                  </span>
                  <span className="block break-words text-base font-semibold leading-relaxed text-foreground">
                    {link.value}
                  </span>
                </a>
              </Reveal>
            );
          })}
        </section>

        <Reveal>
          <section className="rounded-xl border border-border bg-white/72 p-7 shadow-[0_24px_70px_rgba(23,23,23,0.06)] md:p-10">
            <Sparkles aria-hidden="true" className="mb-6 size-7 text-primary" />
            <p className="max-w-3xl font-display text-[28px] font-bold leading-[1.22] text-foreground md:text-[38px]">
              I enjoy working on products that solve real problems. If you have
              an idea or an opportunity, feel free to reach out.
            </p>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
