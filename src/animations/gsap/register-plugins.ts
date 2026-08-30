"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Registers GSAP plugins once per runtime. Safe to call from any client scene.
 * SplitText is present in this GSAP build but is not registered until a scene needs it.
 */
export function registerGsapPlugins(): void {
  if (registered || typeof window === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  if (typeof window !== "undefined") {
    (window as unknown as { ScrollTrigger: typeof ScrollTrigger; gsap: typeof gsap }).ScrollTrigger = ScrollTrigger;
    (window as unknown as { ScrollTrigger: typeof ScrollTrigger; gsap: typeof gsap }).gsap = gsap;
  }
  registered = true;
}

export { gsap, ScrollTrigger };
