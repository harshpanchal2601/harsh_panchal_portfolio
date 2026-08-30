"use client";

import { useEffect, type RefObject } from "react";
import Lenis from "lenis";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/animations/gsap/register-plugins";

const ACTIVE_CLASS = "portfolio-v2-active";
const PAUSED_CLASS = "portfolio-v2-scroll-paused";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const GSAP_DEFAULT_LAG_SMOOTHING = 500;

export const V2_HERO_READY_EVENT = "portfolio-v2:hero-ready";
export const V2_HEADER_REVEAL_EVENT = "portfolio-v2:header-reveal";

let lenisInstance: Lenis | null = null;
let scrollPaused = false;

function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function markReducedMotion(root: HTMLElement, reduced: boolean): void {
  root.dataset.v2ReducedMotion = reduced ? "true" : "false";
}

function activateDocument(): void {
  document.documentElement.classList.add(ACTIVE_CLASS);
  document.body.classList.add(ACTIVE_CLASS);
}

function deactivateDocument(): void {
  scrollPaused = false;

  lenisInstance?.start();

  document.documentElement.classList.remove(ACTIVE_CLASS);
  document.documentElement.classList.remove(PAUSED_CLASS);
  document.body.classList.remove(ACTIVE_CLASS);
}

function removeStaleIntroGuard(): void {
  document.getElementById("hp-intro-guard")?.remove();
}

export function pauseV2Scroll(): void {
  scrollPaused = true;
  document.documentElement.classList.add(PAUSED_CLASS);
  lenisInstance?.stop();
}

export function resumeV2Scroll(): void {
  scrollPaused = false;
  document.documentElement.classList.remove(PAUSED_CLASS);
  lenisInstance?.start();
}

export function scrollV2To(
  target: number | HTMLElement,
  options?: { immediate?: boolean },
): void {
  const immediate = options?.immediate ?? prefersReducedMotion();

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      immediate,
    });
    return;
  }

  if (target instanceof HTMLElement) {
    target.scrollIntoView({
      behavior: immediate ? "auto" : "smooth",
      block: "start",
    });
    return;
  }

  window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
}

/**
 * Authoritative V2 scroll loop: Lenis is driven by the GSAP ticker,
 * which then updates ScrollTrigger. No extra requestAnimationFrame loop.
 */
export function useV2ScrollRuntime(rootRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    registerGsapPlugins();
    activateDocument();
    removeStaleIntroGuard();

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    let teardownRuntime: (() => void) | undefined;
    let initialHashHandled = false;

    const resolveSceneTarget = (hash: string): number | HTMLElement | null => {
      const cleanHash = decodeURIComponent(hash.replace(/^#/, ""));
      if (!cleanHash || cleanHash === "top") {
        return 0;
      }

      const target = document.getElementById(cleanHash);
      if (!target) {
        return null;
      }

      const triggerMap: Record<string, string> = {
        about: "v2-about-copy",
        capabilities: "v2-capabilities-master",
        work: "v2-work-master",
        process: "v2-process-master",
        contact: "v2-contact-enter",
      };

      const triggerId = triggerMap[cleanHash];
      if (triggerId) {
        const trigger = ScrollTrigger.getById(triggerId);
        if (trigger && typeof trigger.start === "number") {
          return trigger.start;
        }
      }

      return target;
    };

    const scrollToCurrentHash = (immediate = false) => {
      if (!window.location.hash) {
        return;
      }

      const target = resolveSceneTarget(window.location.hash);
      if (target === null) {
        return;
      }

      lenisInstance?.resize();
      ScrollTrigger.refresh();
      window.requestAnimationFrame(() => {
        scrollV2To(target, { immediate });
        ScrollTrigger.update();
      });
      initialHashHandled = true;
    };

    const onHeroReady = () => {
      if (!initialHashHandled) {
        scrollToCurrentHash(true);
      }
    };

    const onHashChange = () => {
      scrollToCurrentHash(false);
    };

    window.addEventListener(V2_HERO_READY_EVENT, onHeroReady);
    window.addEventListener("hashchange", onHashChange);

    const startNativeScroll = () => {
      markReducedMotion(root, true);
      const onResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);
      ScrollTrigger.refresh();
      return () => {
        window.removeEventListener("resize", onResize);
      };
    };

    const startSmoothScroll = () => {
      markReducedMotion(root, false);

      const lenis = new Lenis({
        autoRaf: false,
        autoResize: true,
        content: root,
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1.15,
      });

      lenisInstance = lenis;
      if (scrollPaused) {
        lenis.stop();
      }

      const onLenisScroll = () => {
        ScrollTrigger.update();
      };
      lenis.on("scroll", onLenisScroll);

      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      const onResize = () => {
        lenis.resize();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);
      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("resize", onResize);
        gsap.ticker.remove(onTick);
        gsap.ticker.lagSmoothing(GSAP_DEFAULT_LAG_SMOOTHING);
        lenis.off("scroll", onLenisScroll);
        lenis.destroy();
        if (lenisInstance === lenis) {
          lenisInstance = null;
        }
      };
    };

    const syncRuntime = () => {
      teardownRuntime?.();
      teardownRuntime = prefersReducedMotion()
        ? startNativeScroll()
        : startSmoothScroll();
    };

    syncRuntime();

    if (root.querySelector('[data-hero-state="ready"]')) {
      scrollToCurrentHash(true);
    }

    mediaQuery.addEventListener("change", syncRuntime);

    return () => {
      window.removeEventListener(V2_HERO_READY_EVENT, onHeroReady);
      window.removeEventListener("hashchange", onHashChange);
      mediaQuery.removeEventListener("change", syncRuntime);
      teardownRuntime?.();
      deactivateDocument();
    };
  }, [rootRef]);
}
