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
    <footer className="flex w-full flex-col items-start overflow-hidden bg-background px-[5vw] py-32">
      <div className="mb-12 font-display text-[80px] font-bold leading-none tracking-[-0.05em] text-foreground">
        HP.
      </div>
      <div className="flex w-full flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <nav aria-label="Footer links" className="flex flex-col gap-4">
          {footerLinks.map((link) => (
            <Link
              className="font-display text-[64px] font-bold uppercase leading-none text-muted-foreground transition-all duration-500 hover:text-accent hover:tracking-widest md:text-[120px]"
              href={link.href}
              key={link.label}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              target={link.href.startsWith("http") ? "_blank" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-right text-xs font-semibold uppercase leading-relaxed tracking-widest text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_METADATA.name}.
          <br />
          Architecting the Infinite.
        </p>
      </div>
    </footer>
  );
}
