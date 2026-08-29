"use client";

import gsap from "gsap";
import { registerGsapPlugins } from "@/animations/gsap/register-plugins";

/**
 * Future scenes must animate through a scoped GSAP context, never via
 * document-wide selectors. Each scene owns its wrapper ref, ScrollTriggers,
 * and cleanup (`context.revert()`).
 */
export function createSceneContext(
  scope: Element,
  setup: () => void | (() => void),
): gsap.Context {
  registerGsapPlugins();
  return gsap.context(setup, scope);
}
