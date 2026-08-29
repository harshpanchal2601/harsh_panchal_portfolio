import {
  gsap,
  ScrollTrigger,
} from "@/animations/gsap/register-plugins";

import { createSceneContext } from "@/components/portfolio-v2/motion/scene-context";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function removeRouteTransition(immediate = false): void {
  const transition = document.getElementById("v2-project-transition");

  if (!transition) {
    return;
  }

  if (immediate) {
    transition.remove();
    return;
  }

  gsap.to(transition, {
    autoAlpha: 0,
    duration: 0.32,
    ease: "power2.out",
    onComplete: () => transition.remove(),
  });
}

function settleProject(scope: HTMLElement): void {
  const select = gsap.utils.selector(scope);

  gsap.set(
    select(
      "[data-project-eyebrow], [data-project-title], [data-project-summary], [data-project-meta], [data-project-media], [data-project-reveal]",
    ),
    { autoAlpha: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
  );
  removeRouteTransition(true);
}

export function playProjectCaseStudy(scope: HTMLElement): gsap.Context {
  return createSceneContext(scope, () => {
    if (prefersReducedMotion()) {
      settleProject(scope);
      return;
    }

    const select = gsap.utils.selector(scope);
    const eyebrow = select("[data-project-eyebrow]");
    const title = select("[data-project-title]");
    const summary = select("[data-project-summary]");
    const meta = select("[data-project-meta]");
    const media = select("[data-project-media]");
    const reveals = gsap.utils.toArray<HTMLElement>(
      select("[data-project-reveal]"),
    );

    gsap.set(eyebrow, { autoAlpha: 0, y: 10 });
    gsap.set(title, { autoAlpha: 0, y: 34 });
    gsap.set([summary, meta], { autoAlpha: 0, y: 18 });
    gsap.set(media, {
      autoAlpha: 0,
      y: 28,
      clipPath: "inset(8% 0% 0% 0%)",
    });

    const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });

    entrance
      .to(eyebrow, { autoAlpha: 1, duration: 0.38, y: 0 }, 0.05)
      .to(title, { autoAlpha: 1, duration: 0.72, y: 0 }, 0.1)
      .to(summary, { autoAlpha: 1, duration: 0.48, y: 0 }, 0.28)
      .to(meta, { autoAlpha: 1, duration: 0.45, y: 0 }, 0.34)
      .to(
        media,
        {
          autoAlpha: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.8,
          y: 0,
        },
        0.36,
      );

    removeRouteTransition(false);

    const revealTweens = reveals.map((element) => {
      gsap.set(element, { autoAlpha: 0, y: 24 });

      return gsap.to(element, {
        autoAlpha: 1,
        duration: 0.62,
        ease: "power2.out",
        paused: true,
        y: 0,
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      revealTweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
      entrance.kill();
      document.getElementById("v2-project-transition")?.remove();
    };
  });
}
