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
  registered = true;
}

export { gsap, ScrollTrigger };
