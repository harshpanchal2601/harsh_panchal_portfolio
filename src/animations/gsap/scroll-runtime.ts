"use client";

import { useEffect, type RefObject } from "react";
import type Lenis from "lenis";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/animations/gsap/register-plugins";

const ACTIVE_CLASS = "portfolio-v2-active";
const PAUSED_CLASS = "portfolio-v2-scroll-paused";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const NATIVE_TOUCH_QUERY = "(pointer: coarse), (hover: none)";
const GSAP_DEFAULT_LAG_SMOOTHING = 500;
const VIEWPORT_REFRESH_DELAY = 140;
const WORK_RETURN_INTENT_KEY = "portfolio-v2:work-return";
const WORK_RETURN_INTENT_TTL = 20_000;

export const V2_HERO_READY_EVENT = "portfolio-v2:hero-ready";
export const V2_HEADER_REVEAL_EVENT = "portfolio-v2:header-reveal";
export const V2_WORK_READY_EVENT = "portfolio-v2:work-ready";
export const V2_VIEWPORT_GEOMETRY_CHANGE_EVENT =
  "portfolio-v2:viewport-geometry-change";

let lenisInstance: Lenis | null = null;
let pendingScrollTarget: number | HTMLElement | null = null;
let scrollPaused = false;

type V2RuntimeWindow = Window & {
  __portfolioV2PreviousScrollRestoration?: History["scrollRestoration"];
};

function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function usesNativeTouchScroll(): boolean {
  return (
    window.matchMedia(NATIVE_TOUCH_QUERY).matches ||
    window.navigator.maxTouchPoints > 0
  );
}

export function canonicalizeV2HomepageUrl(): void {
  if (
    window.location.pathname === "/" &&
    window.location.search
  ) {
    window.history.replaceState(window.history.state, "", "/");
  }
}

export function setV2WorkReturnIntent(slug: string): void {
  try {
    window.sessionStorage.setItem(
      WORK_RETURN_INTENT_KEY,
      JSON.stringify({ slug, createdAt: Date.now() }),
    );
  } catch {
    // Navigation remains valid when storage is unavailable.
  }
}

export function readV2WorkReturnIntent(): string | null {
  try {
    const serialized = window.sessionStorage.getItem(WORK_RETURN_INTENT_KEY);
    if (!serialized) {
      return null;
    }

    const intent = JSON.parse(serialized) as {
      slug?: unknown;
      createdAt?: unknown;
    };
    const { createdAt, slug } = intent;

    if (
      typeof slug === "string" &&
      slug.length > 0 &&
      typeof createdAt === "number" &&
      Date.now() - createdAt >= 0 &&
      Date.now() - createdAt <= WORK_RETURN_INTENT_TTL
    ) {
      return slug;
    }

    window.sessionStorage.removeItem(WORK_RETURN_INTENT_KEY);
  } catch {
    try {
      window.sessionStorage.removeItem(WORK_RETURN_INTENT_KEY);
    } catch {
      // Storage can be unavailable in restricted browsing contexts.
    }
  }

  return null;
}

export function clearV2WorkReturnIntent(): void {
  try {
    window.sessionStorage.removeItem(WORK_RETURN_INTENT_KEY);
  } catch {
    // The intent is already inaccessible in this browsing context.
  }
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
    pendingScrollTarget = null;
    return;
  }

  pendingScrollTarget = target;

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
    ScrollTrigger.config({ ignoreMobileResize: true });
    canonicalizeV2HomepageUrl();

    const runtimeWindow = window as V2RuntimeWindow;
    const previousScrollRestoration =
      runtimeWindow.__portfolioV2PreviousScrollRestoration ??
      window.history.scrollRestoration;

    delete runtimeWindow.__portfolioV2PreviousScrollRestoration;
    window.history.scrollRestoration = "manual";

    activateDocument();
    removeStaleIntroGuard();

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const nativeTouchQuery = window.matchMedia(NATIVE_TOUCH_QUERY);
    let teardownRuntime: (() => void) | undefined;

    const resetStaleHomepageLocation = () => {
      if (
        window.location.pathname !== "/" ||
        (!window.location.search && !window.location.hash)
      ) {
        return;
      }

      canonicalizeV2HomepageUrl();
      ScrollTrigger.update();
    };

    const bindMeaningfulViewportRefresh = (
      nativeTouch: boolean,
      beforeRefresh?: () => void,
    ) => {
      let viewportWidth = window.innerWidth;
      let viewportHeight = window.innerHeight;
      let refreshTimer = 0;
      let refreshPending = false;

      const performRefresh = () => {
        refreshPending = false;
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
        beforeRefresh?.();
        window.dispatchEvent(new Event(V2_VIEWPORT_GEOMETRY_CHANGE_EVENT));
        ScrollTrigger.refresh();
      };

      const refresh = () => {
        refreshTimer = 0;

        if (ScrollTrigger.isScrolling()) {
          refreshPending = true;
          return;
        }

        performRefresh();
      };

      const scheduleRefresh = (force = false) => {
        const widthChanged = window.innerWidth !== viewportWidth;
        const heightChanged = window.innerHeight !== viewportHeight;

        if (!force && !widthChanged && (nativeTouch || !heightChanged)) {
          return;
        }

        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(refresh, VIEWPORT_REFRESH_DELAY);
      };

      const onResize = () => scheduleRefresh();
      const onOrientationChange = () => scheduleRefresh(true);
      const onScrollEnd = () => {
        if (refreshPending) {
          performRefresh();
        }
      };

      window.addEventListener("resize", onResize, { passive: true });
      window.addEventListener("orientationchange", onOrientationChange, {
        passive: true,
      });
      ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);

      return () => {
        window.clearTimeout(refreshTimer);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onOrientationChange);
        ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
      };
    };

    const restoreWorkTarget = (lenis?: Lenis) => {
      const returnSlug =
        readV2WorkReturnIntent() ||
        (typeof window !== "undefined" && window.location.hash === "#work"
          ? "wikipoint-ai"
          : null);

      if (!returnSlug) {
        return;
      }

      const trigger = ScrollTrigger.getById("v2-work-master");
      const timeline = trigger?.animation as gsap.core.Timeline | undefined;
      const labelTime = timeline?.labels[`work:project:${returnSlug}`];
      const duration = timeline?.duration() ?? 0;

      if (trigger && labelTime !== undefined && duration > 0) {
        const progress = gsap.utils.clamp(0, 1, labelTime / duration);
        const targetY =
          trigger.start + (trigger.end - trigger.start) * progress;

        if (lenis) {
          lenis.scrollTo(targetY, { immediate: true });
        } else {
          window.scrollTo({ top: targetY, behavior: "auto" });
        }

        clearV2WorkReturnIntent();
      }
    };

    const startNativeScroll = (reducedMotion: boolean) => {
      markReducedMotion(root, reducedMotion);
      const unbindViewportRefresh = bindMeaningfulViewportRefresh(true);
      ScrollTrigger.refresh();
      restoreWorkTarget();
      return unbindViewportRefresh;
    };

    const startSmoothScroll = (LenisConstructor: typeof Lenis) => {
      markReducedMotion(root, false);

      const lenis = new LenisConstructor({
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

      const unbindViewportRefresh = bindMeaningfulViewportRefresh(
        false,
        () => lenis.resize(),
      );
      ScrollTrigger.refresh();

      if (pendingScrollTarget !== null) {
        const target = pendingScrollTarget;
        pendingScrollTarget = null;
        lenis.scrollTo(target, { immediate: true });
        ScrollTrigger.update();
      } else {
        restoreWorkTarget(lenis);
      }

      return () => {
        unbindViewportRefresh();
        gsap.ticker.remove(onTick);
        gsap.ticker.lagSmoothing(GSAP_DEFAULT_LAG_SMOOTHING);
        lenis.off("scroll", onLenisScroll);
        lenis.destroy();
        if (lenisInstance === lenis) {
          lenisInstance = null;
        }
      };
    };

    let runtimeGeneration = 0;

    const syncRuntime = () => {
      const generation = ++runtimeGeneration;
      teardownRuntime?.();
      const reducedMotion = prefersReducedMotion();

      if (reducedMotion || usesNativeTouchScroll()) {
        teardownRuntime = startNativeScroll(reducedMotion);
        return;
      }

      let cancelled = false;
      teardownRuntime = () => {
        cancelled = true;
      };

      void import("lenis")
        .then(({ default: LenisConstructor }) => {
          if (cancelled || generation !== runtimeGeneration) {
            return;
          }

          const teardownSmoothScroll = startSmoothScroll(LenisConstructor);
          teardownRuntime = () => {
            cancelled = true;
            teardownSmoothScroll();
          };
        })
        .catch(() => {
          if (cancelled || generation !== runtimeGeneration) {
            return;
          }

          teardownRuntime = startNativeScroll(false);
        });
    };

    syncRuntime();

    mediaQuery.addEventListener("change", syncRuntime);
    nativeTouchQuery.addEventListener("change", syncRuntime);
    window.addEventListener("hashchange", resetStaleHomepageLocation);
    window.addEventListener("popstate", resetStaleHomepageLocation);

    return () => {
      mediaQuery.removeEventListener("change", syncRuntime);
      nativeTouchQuery.removeEventListener("change", syncRuntime);
      window.removeEventListener("hashchange", resetStaleHomepageLocation);
      window.removeEventListener("popstate", resetStaleHomepageLocation);
      teardownRuntime?.();
      window.history.scrollRestoration = previousScrollRestoration;
      deactivateDocument();
    };
  }, [rootRef]);
}
