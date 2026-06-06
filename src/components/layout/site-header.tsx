import Link from "next/link";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { MAIN_NAVIGATION, SITE_ROUTES } from "@/constants/routes";

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-background/35 px-[5vw] py-5 backdrop-blur-xl md:bg-transparent md:py-8 md:backdrop-blur-none">
        <Link
          className="font-display text-[40px] font-bold leading-none tracking-[-0.06em] text-foreground transition-colors hover:text-primary md:text-[56px]"
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
              className="font-medium text-muted-foreground transition-colors duration-300 hover:text-primary"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="ml-4 rounded-full bg-[#6366f1] px-6 py-2 font-bold text-white shadow-[inset_2px_2px_4px_rgba(139,92,246,0.3)] transition-all active:scale-95 active:opacity-80"
            href="/#contact"
          >
            Hire Me
          </Link>
        </nav>

        <MobileNavigation />
    </header>
  );
}
