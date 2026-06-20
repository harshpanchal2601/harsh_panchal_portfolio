import Link from "next/link";
import { SITE_METADATA } from "@/constants/site";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const footerLinks = [
  { label: "GitHub", href: "https://github.com/harshpanchal2601", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/harshpanchal2601/", icon: FaLinkedin },
  { label: "Email", href: "mailto:harshpanchal7979@gmail.com", icon: Mail },
] as const;

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-white/55 px-[5vw] py-16 md:py-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-1/2 -translate-x-1/2 bg-primary/4 blur-[80px]" />
      
      <div className="relative mx-auto max-w-7xl">
        {/* Top row */}
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <div className="mb-3 font-display text-[38px] font-bold leading-none text-foreground md:text-[48px]">
              HP.
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Full Stack Developer building scalable products across frontend, backend, AI, and cloud.
            </p>
          </div>
          
          <div className="flex gap-12">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">Navigation</span>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">Connect</span>
              <ul className="space-y-3">
                {footerLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <a
                        className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        href={link.href}
                        rel="noopener noreferrer"
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                      >
                        <Icon className="size-3.5" />
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-8 md:flex-row md:items-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE_METADATA.name}. Built with care.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-muted-foreground">Available for new opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
