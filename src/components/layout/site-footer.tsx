import Link from "next/link";
import { SITE_METADATA } from "@/constants/site";

const footerLinks = [
  {
    label: "GitHub",
    href: "https://github.com/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
  },
  {
    label: "Email",
    href: `mailto:${SITE_METADATA.email}`,
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="flex w-full flex-col items-start overflow-hidden border-t border-border/30 bg-background px-[5vw] py-16 md:py-24">
      <div className="mb-10 font-display text-[56px] font-bold leading-none tracking-[-0.05em] text-foreground md:text-[80px]">
        HP.
      </div>
      <div className="flex w-full flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <nav aria-label="Footer links" className="flex flex-col gap-4">
          {footerLinks.map((link) => (
            <Link
              className="font-display text-[38px] font-bold uppercase leading-none text-muted-foreground transition-all duration-500 hover:text-accent hover:tracking-widest sm:text-[48px] md:text-[96px] lg:text-[112px]"
              href={link.href}
              key={link.label}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              target={link.href.startsWith("http") ? "_blank" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-left text-xs font-semibold uppercase leading-relaxed tracking-widest text-muted-foreground md:text-right">
          &copy; {new Date().getFullYear()} {SITE_METADATA.name}.
          <br />
          Architecting the Infinite.
        </p>
      </div>
    </footer>
  );
}
