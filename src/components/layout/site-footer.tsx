"use client";

import Link from "next/link";
import { SITE_METADATA } from "@/constants/site";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";

const footerLinks = [
  { label: "GitHub", href: "https://github.com/harshpanchal2601" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/harshpanchal2601/" },
  { label: "Email", href: "mailto:harshpanchal7979@gmail.com" },
] as const;

export function SiteFooter() {
  useRevealOnScroll();

  return (
    <footer className="w-full py-section-gap border-t border-outline-variant bg-surface">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-gutter">
        <div className="font-label-md text-label-md uppercase tracking-widest text-primary font-bold reveal-on-scroll">
          {SITE_METADATA.name}
        </div>
        <div className="text-[#44474d] font-body-md text-body-md text-center reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
          © {new Date().getFullYear()} Crafted with intellectual rigor.
        </div>
        <div className="flex gap-6 reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              className="text-[#44474d] hover:text-primary transition-colors font-label-md text-label-md"
              href={link.href}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              target={link.href.startsWith("http") ? "_blank" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
