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
          className="border-border bg-white text-foreground backdrop-blur-xl hover:bg-muted md:hidden"
          size="icon"
          type="button"
          variant="outline"
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        aria-describedby={undefined}
        className="border-border bg-background p-0 text-foreground backdrop-blur-2xl"
      >
        <SheetHeader className="border-b border-border p-6 text-left">
          <SheetTitle asChild>
            <Link
              className="text-base font-semibold tracking-normal text-foreground"
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
                className="rounded-lg px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-white hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href={item.href}
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <a
              className="mt-2 rounded-lg border border-border bg-white px-3 py-3 text-base font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="/Harsh-Panchal-Resume.pdf"
              rel="noopener noreferrer"
              target="_blank"
            >
              Download Resume
            </a>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
