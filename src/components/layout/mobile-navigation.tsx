"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MAIN_NAVIGATION, SITE_ROUTES } from "@/constants/routes";

export function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Open navigation menu"
          className="border-border/70 bg-charcoal/70 text-mist backdrop-blur-xl hover:bg-graphite/80 md:hidden"
          size="icon"
          type="button"
          variant="outline"
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        aria-describedby={undefined}
        className="border-border/70 bg-ink/95 p-0 text-mist backdrop-blur-2xl"
      >
        <SheetHeader className="border-b border-border/70 p-6 text-left">
          <SheetTitle asChild>
            <Link
              className="text-base font-semibold tracking-normal text-mist"
              href={SITE_ROUTES.home}
            >
              Harsh Panchal
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile primary navigation" className="grid gap-2 p-4">
          {MAIN_NAVIGATION.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                className="rounded-lg px-3 py-3 text-base text-smoke transition-colors hover:bg-charcoal hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href={item.href}
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
