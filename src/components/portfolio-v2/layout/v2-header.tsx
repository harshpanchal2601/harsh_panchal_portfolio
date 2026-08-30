"use client";

import { type MouseEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  pauseV2Scroll,
  resumeV2Scroll,
  scrollV2To,
  V2_HEADER_REVEAL_EVENT,
  V2_VIEWPORT_GEOMETRY_CHANGE_EVENT,
} from "@/animations/gsap/scroll-runtime";
import { V2_NAV_ITEMS } from "@/components/portfolio-v2/scenes/hero/hero-content";
import { prewarmV2Scene } from "@/components/portfolio-v2/motion/near-viewport-motion";

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

const MOBILE_NAV_ITEMS = [
  { href: "#work", label: "Work", index: "01" },
  { href: "#about", label: "About", index: "02" },
  { href: "#capabilities", label: "Capabilities", index: "03" },
  { href: "#process", label: "Process", index: "04" },
  { href: "#contact", label: "Contact", index: "05" },
] as const;

export function V2Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    resumeV2Scroll();
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      if (next) {
        pauseV2Scroll();
      } else {
        resumeV2Scroll();
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

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
      if (isMenuOpen) {
        header.dataset.headerVisibility = "visible";
        return;
      }

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

      if (isMenuOpen || currentY <= TOP_VISIBILITY_LIMIT) {
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

    const onViewportGeometryChange = () => {
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
    window.addEventListener(
      V2_VIEWPORT_GEOMETRY_CHANGE_EVENT,
      onViewportGeometryChange,
    );
    window.addEventListener(V2_HEADER_REVEAL_EVENT, revealAfterHero);

    if (document.querySelector('[data-hero-state="ready"]')) {
      revealAfterHero();
    } else {
      updateSceneContext(window.scrollY);
    }

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener(
        V2_VIEWPORT_GEOMETRY_CHANGE_EVENT,
        onViewportGeometryChange,
      );
      window.removeEventListener(V2_HEADER_REVEAL_EVENT, revealAfterHero);
      window.cancelAnimationFrame(updateFrame);
    };
  }, [isMenuOpen]);

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const hash = event.currentTarget.hash;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));

    if (isMenuOpen) {
      closeMenu();
    }

    if (!target) {
      return;
    }

    prewarmV2Scene(target.id);
    scrollV2To(target);
  };

  return (
    <>
      <header
        className="v2-header"
        data-active-section="top"
        data-header-menu-open={isMenuOpen ? "true" : "false"}
        data-header-ready="false"
        data-header-tone={isMenuOpen ? "light" : "dark"}
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

        <button
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="v2-header-menu"
          onClick={toggleMenu}
          type="button"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </header>

      {/* Fullscreen editorial mobile menu */}
      <div
        aria-hidden={!isMenuOpen}
        aria-label="Mobile navigation"
        className="v2-header-mobile-menu"
        data-menu-open={isMenuOpen ? "true" : "false"}
        role="dialog"
      >
        <div className="v2-header-mobile-menu-inner">
          <nav className="v2-header-mobile-nav" aria-label="Mobile portfolio sections">
            {MOBILE_NAV_ITEMS.map(({ href, label, index }) => (
              <a
                className="v2-header-mobile-link"
                href={href}
                key={href}
                onClick={navigateToSection}
              >
                <span className="v2-header-mobile-link-index">{index}</span>
                <span className="v2-header-mobile-link-label">{label}</span>
                <span aria-hidden="true" className="v2-header-mobile-link-arrow">
                  ↗
                </span>
              </a>
            ))}
          </nav>

          <div className="v2-header-mobile-footer">
            <a
              className="v2-header-mobile-talk"
              href="#contact"
              onClick={navigateToSection}
            >
              <span>Start a Project</span>
              <span aria-hidden="true" className="v2-header-mobile-talk-arrow">
                ↗
              </span>
            </a>

            <div className="v2-header-mobile-meta">
              <a
                href="mailto:harshpanchal7979@gmail.com"
                className="v2-header-mobile-email"
              >
                harshpanchal7979@gmail.com
              </a>
              <div className="v2-header-mobile-socials">
                <a
                  href="https://www.linkedin.com/in/harshpanchal2601/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/harshpanchal2601"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
