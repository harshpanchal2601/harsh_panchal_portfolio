import Link from "next/link";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { MAIN_NAVIGATION, SITE_ROUTES } from "@/constants/routes";

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-border bg-background/80 px-[5vw] py-4 backdrop-blur-xl md:py-5">
        <Link
          className="font-display text-[28px] font-bold leading-none text-foreground transition-colors hover:text-primary md:text-[34px]"
          href={SITE_ROUTES.home}
        >
          HP.
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {MAIN_NAVIGATION.map((item) => (
            <Link
              className="group relative text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-primary"
              href={item.href}
              key={item.href}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
          <a
            className="rounded-full border border-border bg-white px-5 py-2 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-[0_14px_34px_rgba(23,23,23,0.08)] active:scale-95"
            href="/Harsh-Panchal-Resume.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            Download Resume
          </a>
          <Link
            className="ml-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[0_12px_30px_rgba(109,94,246,0.18)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-accent hover:shadow-[0_16px_38px_rgba(109,94,246,0.25)] active:scale-95"
            href={SITE_ROUTES.contact}
          >
            Lets Connect
          </Link>
        </nav>

        <MobileNavigation />
    </header>
  );
}
