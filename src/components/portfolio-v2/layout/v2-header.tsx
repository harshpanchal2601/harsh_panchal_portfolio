"use client";

import { type MouseEvent, useLayoutEffect, useRef } from "react";

import {
  scrollV2To,
  V2_HEADER_REVEAL_EVENT,
} from "@/animations/gsap/scroll-runtime";
import { V2_NAV_ITEMS } from "@/components/portfolio-v2/scenes/hero/hero-content";

const TOP_VISIBILITY_LIMIT = 40;
const HIDE_THRESHOLD = 12;
const SHOW_THRESHOLD = 8;
const HEADER_SAMPLE_Y = 80;

type HeaderTone = "dark" | "light";

type SceneToneRange = {
  tone: HeaderTone;
  sectionId?: string;
  top: number;
  bottom: number;
};

export function V2Header() {
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return;
    }

    let previousY = window.scrollY;
    let direction: "up" | "down" | null = null;
    let accumulatedDelta = 0;
    let updateFrame = 0;
    let cachedToneRanges: SceneToneRange[] = [];

    const refreshToneRanges = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>("[data-scene-header-tone]"),
      );

      const scrollY = window.scrollY;
      cachedToneRanges = elements
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const top = rect.top + scrollY;
          const bottom = top + rect.height;
          const tone = (element.dataset.sceneHeaderTone as HeaderTone) || "dark";
          const section = element.closest<HTMLElement>("section[id]");
          return {
            tone,
            sectionId: section?.id,
            top,
            bottom,
          };
        })
        .sort((a, b) => a.top - b.top);
    };

    const resolveHeaderContext = (currentY: number) => {
      const sampleY = currentY + HEADER_SAMPLE_Y;

      for (let i = cachedToneRanges.length - 1; i >= 0; i -= 1) {
        const range = cachedToneRanges[i];
        if (sampleY >= range.top && sampleY < range.bottom) {
          return { tone: range.tone, sectionId: range.sectionId };
        }
      }

      return { tone: "dark" as HeaderTone };
    };

    const setVisibility = (visible: boolean) => {
      const next = visible ? "visible" : "hidden";

      if (header.dataset.headerVisibility !== next) {
        header.dataset.headerVisibility = next;
      }
    };

    const updateSceneContext = (currentY: number) => {
      const { tone, sectionId } = resolveHeaderContext(currentY);

      header.dataset.headerTone = tone;

      if (sectionId) {
        header.dataset.activeSection = sectionId;
      } else {
        delete header.dataset.activeSection;
      }
    };

    const updateFromScroll = () => {
      updateFrame = 0;

      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - previousY;
      previousY = currentY;

      updateSceneContext(currentY);

      if (currentY <= TOP_VISIBILITY_LIMIT) {
        direction = null;
        accumulatedDelta = 0;
        setVisibility(true);
        return;
      }

      if (Math.abs(delta) < 0.5) {
        return;
      }

      const nextDirection = delta > 0 ? "down" : "up";

      if (direction !== nextDirection) {
        direction = nextDirection;
        accumulatedDelta = 0;
      }

      accumulatedDelta += Math.abs(delta);

      if (direction === "down" && accumulatedDelta >= HIDE_THRESHOLD) {
        setVisibility(false);
        accumulatedDelta = 0;
      } else if (direction === "up" && accumulatedDelta >= SHOW_THRESHOLD) {
        setVisibility(true);
        accumulatedDelta = 0;
      }
    };

    const scheduleUpdate = () => {
      if (!updateFrame) {
        updateFrame = window.requestAnimationFrame(updateFromScroll);
      }
    };

    const onResize = () => {
      refreshToneRanges();
      scheduleUpdate();
    };

    const revealAfterHero = () => {
      header.dataset.headerReady = "true";
      refreshToneRanges();
      setVisibility(window.scrollY <= TOP_VISIBILITY_LIMIT);
      scheduleUpdate();
    };

    refreshToneRanges();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener(V2_HEADER_REVEAL_EVENT, revealAfterHero);

    if (document.querySelector('[data-hero-state="ready"]')) {
      revealAfterHero();
    } else {
      updateSceneContext(window.scrollY);
    }

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", onResize);
      window.removeEventListener(V2_HEADER_REVEAL_EVENT, revealAfterHero);
      window.cancelAnimationFrame(updateFrame);
    };
  }, []);

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>) => {
    const hash = event.currentTarget.hash;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));

    if (!target) {
      return;
    }

    event.preventDefault();

    if (window.location.hash !== hash) {
      window.history.pushState(window.history.state, "", hash);
    }

    scrollV2To(target);
  };

  return (
    <header
      className="v2-header"
      data-active-section="top"
      data-header-ready="false"
      data-header-tone="dark"
      data-header-visibility="visible"
      ref={headerRef}
    >
      <a
        className="v2-header-wordmark"
        href="#top"
        onClick={navigateToSection}
      >
        <span className="v2-header-wordmark-full">Harsh Panchal</span>
        <span className="v2-header-wordmark-short">Harsh</span>
      </a>

      <nav className="v2-header-nav" aria-label="Portfolio sections">
        {V2_NAV_ITEMS.map(({ href, label }) => (
          <a
            className="v2-header-link"
            data-nav-section={href.slice(1)}
            href={href}
            key={href}
            onClick={navigateToSection}
          >
            {label}
          </a>
        ))}
      </nav>

      <a
        className="v2-header-talk"
        href="#contact"
        onClick={navigateToSection}
      >
        Let&apos;s Talk
      </a>

      <button aria-label="Menu" className="v2-header-menu" type="button">
        Menu
      </button>
    </header>
  );
}
