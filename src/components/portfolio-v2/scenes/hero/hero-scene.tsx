"use client";

import { useLayoutEffect, useRef } from "react";

import { HeroHeadline } from "@/components/portfolio-v2/scenes/hero/hero-headline";
import { HeroIntroTitle } from "@/components/portfolio-v2/scenes/hero/hero-intro-title";
import { HeroMedia } from "@/components/portfolio-v2/scenes/hero/hero-media";
import { playHeroOpening } from "@/components/portfolio-v2/scenes/hero/hero-motion";

import "@/components/portfolio-v2/scenes/hero/hero-scene.css";

export function HeroScene() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const context = playHeroOpening(root);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="Opening"
      className="v2-hero"
      data-scene-header-tone="dark"
      data-hero-state="intro"
      id="top"
    >
      <HeroMedia />

      <HeroHeadline />

      <HeroIntroTitle />
    </section>
  );
}
