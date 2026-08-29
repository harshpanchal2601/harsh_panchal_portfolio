import {
  gsap,
  ScrollTrigger,
} from "@/animations/gsap/register-plugins";

import {
  pauseV2Scroll,
  resumeV2Scroll,
  V2_HEADER_REVEAL_EVENT,
  V2_HERO_READY_EVENT,
} from "@/animations/gsap/scroll-runtime";

import { createSceneContext } from "@/components/portfolio-v2/motion/scene-context";

import {
  HERO_FRAGMENT_MOTION_DESKTOP,
  HERO_FRAGMENT_MOTION_MOBILE,
} from "@/components/portfolio-v2/scenes/hero/hero-content";

type FragmentMotion = {
  xPercent: number;
  y: number;
  rotation: number;
  at: number;
};

type MotionMode = "desktop" | "mobile";

const CLIP_HIDDEN = "inset(50% 50% 50% 50%)";
const CLIP_PEEK_DESKTOP = "inset(36% 41% 36% 41%)";
const CLIP_PEEK_MOBILE = "inset(32% 26% 32% 26%)";
const CLIP_OPEN = "inset(0% 0% 0% 0%)";

const HERO_EXIT_TRIGGER_ID = "v2-hero-exit";

function announceHeaderReveal(): void {
  window.dispatchEvent(new Event(V2_HEADER_REVEAL_EVENT));
}

function announceHeroReady(): void {
  window.dispatchEvent(new Event(V2_HERO_READY_EVENT));
}

function settleHero(scope: HTMLElement): void {
  const select = gsap.utils.selector(scope);

  scope.dataset.heroState = "ready";

  gsap.set(select(".v2-hero-intro"), {
    autoAlpha: 0,
    x: 0,
    y: 0,
  });

  gsap.set(select(".v2-hero-media"), {
    clipPath: CLIP_OPEN,
  });

  gsap.set(select(".v2-hero-frag"), {
    x: 0,
    y: 0,
    xPercent: 0,
    rotation: 0,
    opacity: 1,
  });

  resumeV2Scroll();
  announceHeaderReveal();
  announceHeroReady();
}

function killHeroExitTrigger(): void {
  ScrollTrigger.getById(HERO_EXIT_TRIGGER_ID)?.kill();
}

function createHeroExitScroll(
  scope: HTMLElement,
  mode: MotionMode,
): () => void {
  killHeroExitTrigger();

  const select = gsap.utils.selector(scope);
  const mobile = mode === "mobile";

  const media = select(".v2-hero-media");
  const photo = select(".v2-hero-photo");
  const headline = select(".v2-hero-headline");
  const lines = gsap.utils.toArray<HTMLElement>(
    select(
      mobile
        ? ".v2-hero-headline-set.is-mobile .v2-hero-headline-line"
        : ".v2-hero-headline-set.is-desktop .v2-hero-headline-line",
    ),
  );
  const [lineOne, lineTwo, lineThree, lineFour] = lines;

  gsap.set(photo, {
    transformOrigin: mobile ? "46% 24%" : "50% 42%",
    scale: 1,
    yPercent: 0,
  });

  gsap.set(media, {
    clipPath: CLIP_OPEN,
  });

  gsap.set(lines, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    opacity: 1,
  });

  gsap.set(headline, {
    autoAlpha: 1,
  });

  const timeline = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      id: HERO_EXIT_TRIGGER_ID,
      trigger: scope,
      start: "top top",
      end: mobile ? "+=96%" : "+=128%",
      pin: true,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  if (mobile) {
    if (lineOne) {
      timeline.to(
        lineOne,
        {
          xPercent: -5,
          y: "-3.5vw",
          duration: 0.36,
        },
        0.12,
      );
    }

    if (lineTwo) {
      timeline.to(
        lineTwo,
        {
          xPercent: 6,
          duration: 0.36,
        },
        0.12,
      );
    }

    if (lineThree) {
      timeline.to(
        lineThree,
        {
          xPercent: -4,
          duration: 0.36,
        },
        0.12,
      );
    }

    if (lineFour) {
      timeline.to(
        lineFour,
        {
          xPercent: 5,
          y: "3.5vw",
          duration: 0.36,
        },
        0.12,
      );
    }
  } else {
    if (lineOne) {
      timeline.to(
        lineOne,
        {
          xPercent: -10,
          duration: 0.36,
        },
        0.12,
      );
    }

    if (lineTwo) {
      timeline.to(
        lineTwo,
        {
          xPercent: 10,
          duration: 0.36,
        },
        0.12,
      );
    }

    if (lineThree) {
      timeline.to(
        lineThree,
        {
          xPercent: -7,
          duration: 0.36,
        },
        0.12,
      );
    }
  }

  timeline.to(
    lines,
    {
      opacity: 0.9,
      duration: 0.08,
    },
    0.4,
  );

  timeline.to(
    photo,
    {
      scale: mobile ? 1.035 : 1.055,
      yPercent: mobile ? -2 : -3,
      duration: 0.52,
    },
    0.2,
  );

  if (mobile) {
    if (lineOne) {
      timeline.to(
        lineOne,
        {
          xPercent: -7,
          y: "-16vw",
          opacity: 0,
          duration: 0.28,
        },
        0.72,
      );
    }

    if (lineTwo) {
      timeline.to(
        lineTwo,
        {
          xPercent: 7,
          y: "-10vw",
          opacity: 0,
          duration: 0.28,
        },
        0.72,
      );
    }

    if (lineThree) {
      timeline.to(
        lineThree,
        {
          xPercent: -6,
          y: "8vw",
          opacity: 0,
          duration: 0.28,
        },
        0.72,
      );
    }

    if (lineFour) {
      timeline.to(
        lineFour,
        {
          xPercent: 7,
          y: "18vw",
          opacity: 0,
          duration: 0.28,
        },
        0.72,
      );
    }
  } else {
    if (lineOne) {
      timeline.to(
        lineOne,
        {
          xPercent: -22,
          yPercent: -42,
          opacity: 0,
          duration: 0.28,
        },
        0.72,
      );
    }

    if (lineTwo) {
      timeline.to(
        lineTwo,
        {
          xPercent: 24,
          yPercent: 6,
          opacity: 0,
          duration: 0.28,
        },
        0.72,
      );
    }

    if (lineThree) {
      timeline.to(
        lineThree,
        {
          xPercent: -18,
          yPercent: 48,
          opacity: 0,
          duration: 0.28,
        },
        0.72,
      );
    }
  }

  timeline.to(
    headline,
    {
      autoAlpha: 0,
      duration: 0.18,
    },
    0.82,
  );

  timeline.to(
    photo,
    {
      scale: mobile ? 1.04 : 1.06,
      yPercent: mobile ? -3.5 : -4,
      duration: 0.28,
    },
    0.72,
  );

  ScrollTrigger.refresh();

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
    killHeroExitTrigger();
  };
}

function buildOpeningTimeline(
  scope: HTMLElement,
  mode: MotionMode,
): () => void {
  pauseV2Scroll();

  const select = gsap.utils.selector(scope);

  const mobile = mode === "mobile";

  const motion = (
    mobile
      ? HERO_FRAGMENT_MOTION_MOBILE
      : HERO_FRAGMENT_MOTION_DESKTOP
  ) as Record<string, FragmentMotion>;

  const peekClip = mobile
    ? CLIP_PEEK_MOBILE
    : CLIP_PEEK_DESKTOP;

  const intro = select(".v2-hero-intro");
  const introInner = select(".v2-hero-intro-inner");
  const harsh = select(".v2-hero-intro-name--harsh");
  const panchal = select(".v2-hero-intro-name--panchal");
  const media = select(".v2-hero-media");
  const fragments = select(".v2-hero-frag");

  gsap.set(intro, {
    autoAlpha: 1,
    x: 0,
    y: 0,
  });

  gsap.set(introInner, {
    yPercent: 110,
  });

  gsap.set([harsh, panchal], {
    x: 0,
    y: 0,
  });

  gsap.set(media, {
    clipPath: CLIP_HIDDEN,
  });

  gsap.set(fragments, {
    opacity: 0,
  });

  Object.entries(motion).forEach(([id, config]) => {
    const target = select(`[data-frag="${id}"]`);

    gsap.set(target, {
      xPercent: config.xPercent,
      y: config.y,
      rotation: config.rotation,
      opacity: 0,
    });
  });

  scope.dataset.heroState = "playing";

  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  timeline.addLabel("intro:start", 0);

  timeline.addLabel("intro:title", 0);

  timeline.to(
    introInner,
    {
      yPercent: 0,
      duration: mobile ? 0.48 : 0.56,
      stagger: 0.06,
      ease: "power4.out",
    },
    "intro:title",
  );

  timeline.addLabel(
    "intro:split",
    mobile ? 0.36 : 0.4,
  );

  if (mobile) {
    timeline.to(
      harsh,
      {
        y: "-8vh",
        duration: 0.52,
        ease: "power3.inOut",
      },
      "intro:split",
    );

    timeline.to(
      panchal,
      {
        y: "8vh",
        duration: 0.52,
        ease: "power3.inOut",
      },
      "intro:split",
    );
  } else {
    timeline.to(
      harsh,
      {
        x: "-15vw",
        duration: 0.6,
        ease: "power3.inOut",
      },
      "intro:split",
    );

    timeline.to(
      panchal,
      {
        x: "15vw",
        duration: 0.6,
        ease: "power3.inOut",
      },
      "intro:split",
    );
  }

  timeline.addLabel(
    "media:peek",
    mobile ? 0.46 : 0.52,
  );

  timeline.to(
    media,
    {
      clipPath: peekClip,
      duration: mobile ? 0.3 : 0.36,
      ease: "power3.out",
    },
    "media:peek",
  );

  timeline.addLabel(
    "media:expand",
    mobile ? 0.78 : 0.9,
  );

  timeline.to(
    media,
    {
      clipPath: CLIP_OPEN,
      duration: mobile ? 0.72 : 0.86,
      ease: "power4.inOut",
    },
    "media:expand",
  );

  timeline.addLabel(
    "header:resolve",
    mobile ? 0.96 : 1.1,
  );

  timeline.to(
    intro,
    {
      autoAlpha: 0,
      y: mobile ? "-5vh" : "-8vh",
      x: mobile ? 0 : "-5vw",
      duration: 0.46,
      ease: "power3.inOut",
    },
    "header:resolve",
  );

  timeline.call(
    announceHeaderReveal,
    [],
    "header:resolve+=0.08",
  );

  timeline.addLabel(
    "headline:scatter",
    mobile ? 1.2 : 1.4,
  );

  timeline.addLabel(
    "headline:assemble",
    mobile ? 1.28 : 1.48,
  );

  Object.entries(motion).forEach(([id, config]) => {
    const target = select(`[data-frag="${id}"]`);

    timeline.to(
      target,
      {
        x: 0,
        y: 0,
        xPercent: 0,
        rotation: 0,
        opacity: 1,
        duration: mobile ? 0.58 : 0.72,
        ease: "power3.out",
      },
      `headline:assemble+=${config.at}`,
    );
  });

  timeline.addLabel(
    "hero:ready",
    mobile ? 2.15 : 2.5,
  );

  let killHeroExit = () => {};
  let exitAttached = false;

  timeline.call(
    () => {
      if (exitAttached) {
        return;
      }

      exitAttached = true;
      settleHero(scope);
      killHeroExit = createHeroExitScroll(scope, mode);
    },
    [],
    "hero:ready",
  );

  /*
   * Important:
   * Do NOT finish the animation on every window resize.
   *
   * Mobile Chrome changes viewport height when its browser chrome
   * expands/collapses and fires resize events. The previous code
   * would therefore unexpectedly jump the timeline to 100%.
   *
   * gsap.matchMedia() handles breakpoint changes for us.
   */

  const onVisibilityChange = () => {
    if (
      document.hidden &&
      timeline.isActive()
    ) {
      timeline.progress(1);
    }
  };

  document.addEventListener(
    "visibilitychange",
    onVisibilityChange,
  );

  return () => {
    document.removeEventListener(
      "visibilitychange",
      onVisibilityChange,
    );

    killHeroExit();
    timeline.kill();

    resumeV2Scroll();
  };
}

export function playHeroOpening(
  scope: HTMLElement,
): gsap.Context {
  return createSceneContext(scope, () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      settleHero(scope);
      return;
    }

    const matchMedia = gsap.matchMedia();

    matchMedia.add(
      "(min-width: 1024px)",
      () =>
        buildOpeningTimeline(
          scope,
          "desktop",
        ),
    );

    matchMedia.add(
      "(max-width: 1023px)",
      () =>
        buildOpeningTimeline(
          scope,
          "mobile",
        ),
    );

    return () => {
      matchMedia.revert();
      resumeV2Scroll();
    };
  });
}
