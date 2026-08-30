import {
  gsap,
  ScrollTrigger,
} from "@/animations/gsap/register-plugins";

import { createSceneContext } from "@/components/portfolio-v2/motion/scene-context";

const CONTACT_TRIGGER_ID = "v2-contact-enter";
const TEXT_LERP = 0.2;
const BACKGROUND_LERP = 0.09;
const STRENGTH_LERP = 0.11;
const BACKGROUND_PARALLAX = 0.64;
const REST_BACKGROUND_STRENGTH = 0.25;

function killContactTrigger(): void {
  ScrollTrigger.getById(CONTACT_TRIGGER_ID)?.kill();
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function canFollowPointer(): boolean {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    window.matchMedia("(hover: hover)").matches
  );
}

function settleContactScene(scope: HTMLElement): void {
  const select = gsap.utils.selector(scope);

  gsap.set(select("[data-contact-kicker]"), { autoAlpha: 1, y: 0 });
  gsap.set(select("[data-contact-visual]"), {
    autoAlpha: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
  });
  gsap.set(select("[data-contact-form], [data-contact-rail], [data-contact-end]"), {
    autoAlpha: 1,
    y: 0,
  });
}

function bindContactPointer(scope: HTMLElement): () => void {
  const root = scope.querySelector<HTMLElement>("[data-contact-pointer]");

  if (!root) {
    return () => {};
  }

  if (prefersReducedMotion() || !canFollowPointer()) {
    root.style.setProperty("--contact-text-x", "70%");
    root.style.setProperty("--contact-text-y", "68%");
    root.style.setProperty("--contact-text-strength", "0.34");
    scope.style.setProperty("--contact-bg-x", "65%");
    scope.style.setProperty("--contact-bg-y", "30%");
    scope.style.setProperty("--contact-bg-strength", "0.48");
    return () => {};
  }

  let rootRect = root.getBoundingClientRect();
  let scopeRect = scope.getBoundingClientRect();

  const updateRects = () => {
    rootRect = root.getBoundingClientRect();
    scopeRect = scope.getBoundingClientRect();
  };

  const initialTextX = rootRect.width * 0.64;
  const initialTextY = rootRect.height * 0.34;
  const initialBgX = scopeRect.width * 0.65;
  const initialBgY = scopeRect.height * 0.3;

  let targetTextX = initialTextX;
  let targetTextY = initialTextY;
  let currentTextX = initialTextX;
  let currentTextY = initialTextY;
  let targetBgX = initialBgX;
  let targetBgY = initialBgY;
  let currentBgX = initialBgX;
  let currentBgY = initialBgY;
  let targetTextStrength = 0;
  let currentTextStrength = 0;
  let targetBgStrength = REST_BACKGROUND_STRENGTH;
  let currentBgStrength = REST_BACKGROUND_STRENGTH;
  let frame = 0;

  const stopLoop = () => {
    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };

  const write = () => {
    root.style.setProperty("--contact-text-x", `${currentTextX}px`);
    root.style.setProperty("--contact-text-y", `${currentTextY}px`);
    root.style.setProperty(
      "--contact-text-strength",
      currentTextStrength.toFixed(3),
    );
    scope.style.setProperty("--contact-bg-x", `${currentBgX}px`);
    scope.style.setProperty("--contact-bg-y", `${currentBgY}px`);
    scope.style.setProperty(
      "--contact-bg-strength",
      currentBgStrength.toFixed(3),
    );
  };

  const tick = () => {
    currentTextX += (targetTextX - currentTextX) * TEXT_LERP;
    currentTextY += (targetTextY - currentTextY) * TEXT_LERP;
    currentBgX += (targetBgX - currentBgX) * BACKGROUND_LERP;
    currentBgY += (targetBgY - currentBgY) * BACKGROUND_LERP;
    currentTextStrength +=
      (targetTextStrength - currentTextStrength) * STRENGTH_LERP;
    currentBgStrength +=
      (targetBgStrength - currentBgStrength) * STRENGTH_LERP;
    write();

    const settled =
      Math.abs(targetTextX - currentTextX) < 0.15 &&
      Math.abs(targetTextY - currentTextY) < 0.15 &&
      Math.abs(targetBgX - currentBgX) < 0.15 &&
      Math.abs(targetBgY - currentBgY) < 0.15 &&
      Math.abs(targetTextStrength - currentTextStrength) < 0.004 &&
      Math.abs(targetBgStrength - currentBgStrength) < 0.004;

    if (settled) {
      frame = 0;
      return;
    }

    frame = requestAnimationFrame(tick);
  };

  const startLoop = () => {
    if (!frame) {
      frame = requestAnimationFrame(tick);
    }
  };

  const onEnter = () => {
    updateRects();
  };

  const onMove = (event: PointerEvent) => {
    const pointerX = event.clientX - rootRect.left;
    const pointerY = event.clientY - rootRect.top;
    const scopePointerX = event.clientX - scopeRect.left;
    const scopePointerY = event.clientY - scopeRect.top;
    const scopeCenterX = scopeRect.width / 2;
    const scopeCenterY = scopeRect.height * 0.42;

    targetTextX = pointerX;
    targetTextY = pointerY;
    targetBgX =
      scopeCenterX + (scopePointerX - scopeCenterX) * BACKGROUND_PARALLAX;
    targetBgY =
      scopeCenterY + (scopePointerY - scopeCenterY) * BACKGROUND_PARALLAX;
    targetTextStrength = 1;
    targetBgStrength = 0.85;
    startLoop();
  };

  const onLeave = () => {
    targetTextX = rootRect.width * 0.7;
    targetTextY = rootRect.height * 0.68;
    targetBgX = scopeRect.width * 0.65;
    targetBgY = scopeRect.height * 0.3;
    targetTextStrength = 0;
    targetBgStrength = REST_BACKGROUND_STRENGTH;
    startLoop();
  };

  root.addEventListener("pointerenter", onEnter);
  root.addEventListener("pointermove", onMove);
  root.addEventListener("pointerleave", onLeave);
  window.addEventListener("resize", updateRects);

  return () => {
    root.removeEventListener("pointerenter", onEnter);
    root.removeEventListener("pointermove", onMove);
    root.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("resize", updateRects);
    stopLoop();
  };
}

function buildContactEntrance(scope: HTMLElement): () => void {
  killContactTrigger();

  const select = gsap.utils.selector(scope);
  const kicker = select("[data-contact-kicker]");
  const visual = select("[data-contact-visual]");
  const form = select("[data-contact-form]");
  const rail = select("[data-contact-rail]");
  const end = select("[data-contact-end]");

  gsap.set(kicker, { autoAlpha: 0, y: 10 });
  gsap.set(visual, {
    autoAlpha: 0,
    y: 18,
    clipPath: "inset(12% 0% 0% 0%)",
  });
  gsap.set([form, rail, end], { autoAlpha: 0, y: 16 });

  const timeline = gsap.timeline({
    defaults: {
      ease: "power2.out",
    },
    scrollTrigger: {
      id: CONTACT_TRIGGER_ID,
      trigger: scope,
      start: "top 78%",
      once: true,
      pin: false,
    },
  });

  timeline.to(
    kicker,
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.45,
    },
    0,
  );

  timeline.to(
    visual,
    {
      autoAlpha: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.7,
    },
    0.08,
  );

  timeline.to(
    form,
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.45,
    },
    0.28,
  );

  timeline.to(
    [rail, end],
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.08,
    },
    0.36,
  );

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
    killContactTrigger();
  };
}

export function playContactScene(scope: HTMLElement): gsap.Context {
  return createSceneContext(scope, () => {
    const unbindPointer = bindContactPointer(scope);

    if (prefersReducedMotion()) {
      settleContactScene(scope);
      return () => {
        unbindPointer();
      };
    }

    const killEntrance = buildContactEntrance(scope);

    return () => {
      unbindPointer();
      killEntrance();
    };
  });
}
