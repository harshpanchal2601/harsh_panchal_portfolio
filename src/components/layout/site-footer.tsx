import Link from "next/link";
import { SITE_METADATA } from "@/constants/site";
const footerLinks = [
  {
    label: "GitHub",
    href: "https://github.com/harshpanchal2601",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/harshpanchal2601/",
  },
  {
    label: "Email",
    href: "mailto:harshpanchal7979@gmail.com",
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="flex w-full flex-col items-start overflow-hidden border-t border-border bg-white/55 px-[5vw] py-12 md:py-16">
      <div className="mb-8 font-display text-[38px] font-bold leading-none text-foreground md:text-[52px]">
        HP.
      </div>
      <div className="flex w-full flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <nav aria-label="Footer links" className="flex flex-wrap gap-4 md:gap-6">
          {footerLinks.map((link) => (
            <Link
              className="text-base font-semibold text-muted-foreground transition-colors hover:text-primary md:text-lg"
              href={link.href}
              key={link.label}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              target={link.href.startsWith("http") ? "_blank" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-left text-xs font-semibold uppercase leading-relaxed tracking-[0.16em] text-muted-foreground md:text-right">
          &copy; {new Date().getFullYear()} {SITE_METADATA.name}.
          <br />
          Built with care.
        </p>
      </div>
    </footer>
  );
}
