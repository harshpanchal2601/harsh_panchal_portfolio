"use client";

import { useRef } from "react";
import { useV2ScrollRuntime } from "@/animations/gsap/scroll-runtime";
import { BackToTopButton } from "@/components/portfolio-v2/layout/back-to-top-button";
import { V2Header } from "@/components/portfolio-v2/layout/v2-header";
import "@/components/portfolio-v2/foundation/portfolio-v2.css";

type PortfolioExperienceShellProps = Readonly<{
  children: React.ReactNode;
}>;

export function PortfolioExperienceShell({
  children,
}: PortfolioExperienceShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useV2ScrollRuntime(rootRef);

  return (
    <div ref={rootRef} className="portfolio-v2" data-portfolio-v2="">
      <V2Header />
      <main id="main-content" className="portfolio-v2-main">
        {children}
      </main>
      <BackToTopButton />
    </div>
  );
}
