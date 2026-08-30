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

type HeadlineMode = "desktop" | "mobile";

type HeroMotionProfile = Readonly<{
  name: "phone" | "tablet" | "compact" | "desktop";
  headlineMode: HeadlineMode;
  fragmentTravel: number;
  introTitleDuration: number;
  introSplitAt: number;
  introSplitX: string;
  introSplitY: string;
  introSplitDuration: number;
  mediaPeekClip: string;
  mediaPeekAt: number;
  mediaPeekDuration: number;
  mediaExpandAt: number;
  mediaExpandDuration: number;
  headerResolveAt: number;
  introResolveX: string | number;
  introResolveY: string;
  headlineAssembleAt: number;
  headlineAssembleDuration: number;
  heroReadyAt: number;
  exitScrollDistance: string;
  exitTravel: number;
  photoTransformOrigin: string;
  photoDriftScale: number;
  photoDriftY: number;
  photoExitScale: number;
  photoExitY: number;
}>;

const CLIP_HIDDEN = "inset(50% 50% 50% 50%)";
const CLIP_PEEK_DESKTOP = "inset(36% 41% 36% 41%)";
const CLIP_PEEK_MOBILE = "inset(32% 26% 32% 26%)";
const CLIP_PHONE_INITIAL = "inset(46% 42% 46% 42%)";
const CLIP_OPEN = "inset(0% 0% 0% 0%)";

const HERO_EXIT_TRIGGER_ID = "v2-hero-exit";

const HERO_MEDIA_QUERIES = {
  phone: "(max-width: 599px)",
  tablet: "(min-width: 600px) and (max-width: 899px)",
  compact: "(min-width: 900px) and (max-width: 1279px)",
  desktop: "(min-width: 1280px)",
} as const;

function getHeroMotionProfile(width: number, height: number): HeroMotionProfile {
  if (width >= 1280) {
    return {
      name: "desktop",
      headlineMode: "desktop",
      fragmentTravel: 1,
      introTitleDuration: 0.56,
      introSplitAt: 0.4,
      introSplitX: "15vw",
      introSplitY: "0svh",
      introSplitDuration: 0.6,
      mediaPeekClip: CLIP_PEEK_DESKTOP,
      mediaPeekAt: 0.52,
      mediaPeekDuration: 0.36,
      mediaExpandAt: 0.9,
      mediaExpandDuration: 0.86,
      headerResolveAt: 1.1,
      introResolveX: "-5vw",
      introResolveY: "-8vh",
      headlineAssembleAt: 1.48,
      headlineAssembleDuration: 0.72,
      heroReadyAt: 2.5,
      exitScrollDistance: "+=128%",
      exitTravel: 1,
      photoTransformOrigin: "50% 42%",
      photoDriftScale: 1.055,
      photoDriftY: -3,
      photoExitScale: 1.06,
      photoExitY: -4,
    };
  }

  if (width >= 900) {
    const shortScreen = height <= 800;

    return {
      name: "compact",
      headlineMode: "desktop",
      fragmentTravel: shortScreen ? 0.68 : 0.78,
      introTitleDuration: 0.52,
      introSplitAt: 0.38,
      introSplitX: shortScreen ? "10vw" : "12vw",
      introSplitY: "0svh",
      introSplitDuration: 0.56,
      mediaPeekClip: "inset(35% 38% 35% 38%)",
      mediaPeekAt: 0.5,
      mediaPeekDuration: 0.34,
      mediaExpandAt: 0.84,
      mediaExpandDuration: 0.78,
      headerResolveAt: 1.02,
      introResolveX: "-3vw",
      introResolveY: shortScreen ? "-4svh" : "-6svh",
      headlineAssembleAt: 1.32,
      headlineAssembleDuration: 0.64,
      heroReadyAt: shortScreen ? 2.16 : 2.25,
      exitScrollDistance: shortScreen ? "+=104%" : "+=116%",
      exitTravel: shortScreen ? 0.7 : 0.8,
      photoTransformOrigin: "50% 39%",
      photoDriftScale: 1.045,
      photoDriftY: -2.5,
      photoExitScale: 1.05,
      photoExitY: -3.5,
    };
  }

  if (width >= 600) {
    return {
      name: "tablet",
      headlineMode: "mobile",
      fragmentTravel: 1.1,
      introTitleDuration: 0.54,
      introSplitAt: 0.4,
      introSplitX: "0vw",
      introSplitY: "9svh",
      introSplitDuration: 0.6,
      mediaPeekClip: "inset(34% 31% 34% 31%)",
      mediaPeekAt: 0.54,
      mediaPeekDuration: 0.36,
      mediaExpandAt: 0.88,
      mediaExpandDuration: 0.8,
      headerResolveAt: 1.08,
      introResolveX: 0,
      introResolveY: "-6svh",
      headlineAssembleAt: 1.42,
      headlineAssembleDuration: 0.66,
      heroReadyAt: 2.38,
      exitScrollDistance: "+=108%",
      exitTravel: 0.72,
      photoTransformOrigin: "48% 27%",
      photoDriftScale: 1.042,
      photoDriftY: -2.25,
      photoExitScale: 1.047,
      photoExitY: -3.25,
    };
  }

  return {
    name: "phone",
    headlineMode: "mobile",
    fragmentTravel: 1,
    introTitleDuration: 0.44,
    introSplitAt: 0.3,
    introSplitX: "0vw",
    introSplitY: "8svh",
    introSplitDuration: 0.48,
    mediaPeekClip: CLIP_PEEK_MOBILE,
    mediaPeekAt: 0.34,
    mediaPeekDuration: 0.28,
    mediaExpandAt: 0.64,
    mediaExpandDuration: 0.62,
    headerResolveAt: 0.84,
    introResolveX: 0,
    introResolveY: "-5svh",
    headlineAssembleAt: 1.06,
    headlineAssembleDuration: 0.54,
    heroReadyAt: 1.86,
    exitScrollDistance: "+=96%",
    exitTravel: 1,
    photoTransformOrigin: "46% 24%",
    photoDriftScale: 1.035,
    photoDriftY: -2,
    photoExitScale: 1.04,
    photoExitY: -3.5,
  };
}

function announceHeaderReveal(): void {
  window.dispatchEvent(new Event(V2_HEADER_REVEAL_EVENT));
}

function announceHeroReady(): void {
  window.dispatchEvent(new Event(V2_HERO_READY_EVENT));
}

function negativeLength(value: string): string {
  return value.startsWith("-") ? value.slice(1) : `-${value}`;
}

function revealCoverClips(inset: string): string[] {
  const values = Array.from(inset.matchAll(/([\d.]+)%/g), (match) =>
    Number.parseFloat(match[1]),
  );
  const [top = 50, right = 50, bottom = 50, left = 50] = values;

  return [
    `inset(0% 0% ${100 - top}% 0%)`,
    `inset(${top}% 0% ${bottom}% ${100 - right}%)`,
    `inset(${100 - bottom}% 0% 0% 0%)`,
    `inset(${top}% ${100 - left}% ${bottom}% 0%)`,
  ];
}

function applySettledHeroVisuals(scope: HTMLElement): void {
  const select = gsap.utils.selector(scope);

  gsap.set(select(".v2-hero-intro"), {
    autoAlpha: 0,
    x: 0,
    y: 0,
  });

  const openRevealClips = revealCoverClips(CLIP_OPEN);
  gsap.set(select(".v2-hero-reveal-cover"), {
    clipPath: (index: number) => openRevealClips[index],
  });

  gsap.set(select(".v2-hero-frag"), {
    x: 0,
    y: 0,
    xPercent: 0,
    rotation: 0,
    opacity: 1,
  });
}

function settleHero(scope: HTMLElement): void {
  scope.dataset.heroState = "ready";
  applySettledHeroVisuals(scope);

  resumeV2Scroll();
  announceHeaderReveal();
  announceHeroReady();
}

function killHeroExitTrigger(): void {
  ScrollTrigger.getById(HERO_EXIT_TRIGGER_ID)?.kill();
}

function createHeroExitScroll(
  scope: HTMLElement,
  profile: HeroMotionProfile,
): () => void {
  killHeroExitTrigger();

  const select = gsap.utils.selector(scope);
  const mobile = profile.headlineMode === "mobile";

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
    transformOrigin: profile.photoTransformOrigin,
    scale: 1,
    yPercent: 0,
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
      end: profile.exitScrollDistance,
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
          xPercent: -5 * profile.exitTravel,
          y: `${-3.5 * profile.exitTravel}vw`,
          duration: 0.36,
        },
        0.12,
      );
    }

    if (lineTwo) {
      timeline.to(
        lineTwo,
        {
          xPercent: 6 * profile.exitTravel,
          duration: 0.36,
        },
        0.12,
      );
    }

    if (lineThree) {
      timeline.to(
        lineThree,
        {
          xPercent: -4 * profile.exitTravel,
          duration: 0.36,
        },
        0.12,
      );
    }

    if (lineFour) {
      timeline.to(
        lineFour,
        {
          xPercent: 5 * profile.exitTravel,
          y: `${3.5 * profile.exitTravel}vw`,
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
          xPercent: -10 * profile.exitTravel,
          duration: 0.36,
        },
        0.12,
      );
    }

    if (lineTwo) {
      timeline.to(
        lineTwo,
        {
          xPercent: 10 * profile.exitTravel,
          duration: 0.36,
        },
        0.12,
      );
    }

    if (lineThree) {
      timeline.to(
        lineThree,
        {
          xPercent: -7 * profile.exitTravel,
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
      scale: profile.photoDriftScale,
      yPercent: profile.photoDriftY,
      duration: 0.52,
    },
    0.2,
  );

  if (mobile) {
    if (lineOne) {
      timeline.to(
        lineOne,
        {
          xPercent: -7 * profile.exitTravel,
          y: `${-16 * profile.exitTravel}vw`,
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
          xPercent: 7 * profile.exitTravel,
          y: `${-10 * profile.exitTravel}vw`,
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
          xPercent: -6 * profile.exitTravel,
          y: `${8 * profile.exitTravel}vw`,
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
          xPercent: 7 * profile.exitTravel,
          y: `${18 * profile.exitTravel}vw`,
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
          xPercent: -22 * profile.exitTravel,
          yPercent: -42 * profile.exitTravel,
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
          xPercent: 24 * profile.exitTravel,
          yPercent: 6 * profile.exitTravel,
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
          xPercent: -18 * profile.exitTravel,
          yPercent: 48 * profile.exitTravel,
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
      scale: profile.photoExitScale,
      yPercent: profile.photoExitY,
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
  profile: HeroMotionProfile,
): () => void {
  pauseV2Scroll();

  const select = gsap.utils.selector(scope);

  const mobile = profile.headlineMode === "mobile";

  const motion = (
    mobile
      ? HERO_FRAGMENT_MOTION_MOBILE
      : HERO_FRAGMENT_MOTION_DESKTOP
  ) as Record<string, FragmentMotion>;

  const intro = select(".v2-hero-intro");
  const introInner = select(".v2-hero-intro-inner");
  const harsh = select(".v2-hero-intro-name--harsh");
  const panchal = select(".v2-hero-intro-name--panchal");
  const revealCovers = select(".v2-hero-reveal-cover");
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

  const hiddenRevealClips = revealCoverClips(
    profile.name === "phone" ? CLIP_PHONE_INITIAL : CLIP_HIDDEN,
  );
  gsap.set(revealCovers, {
    clipPath: (index: number) => hiddenRevealClips[index],
  });

  gsap.set(fragments, {
    opacity: 0,
  });

  Object.entries(motion).forEach(([id, config]) => {
    const target = select(`[data-frag="${id}"]`);

    gsap.set(target, {
      xPercent: config.xPercent * profile.fragmentTravel,
      y: config.y * profile.fragmentTravel,
      rotation: config.rotation * profile.fragmentTravel,
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
      duration: profile.introTitleDuration,
      stagger: 0.06,
      ease: "power4.out",
    },
    "intro:title",
  );

  timeline.addLabel(
    "intro:split",
    profile.introSplitAt,
  );

  timeline.to(
    harsh,
    {
      x: negativeLength(profile.introSplitX),
      y: negativeLength(profile.introSplitY),
      duration: profile.introSplitDuration,
      ease: "power3.inOut",
    },
    "intro:split",
  );

  timeline.to(
    panchal,
    {
      x: profile.introSplitX,
      y: profile.introSplitY,
      duration: profile.introSplitDuration,
      ease: "power3.inOut",
    },
    "intro:split",
  );

  timeline.addLabel(
    "media:peek",
    profile.mediaPeekAt,
  );

  timeline.to(
    revealCovers,
    {
      clipPath: (index: number) =>
        revealCoverClips(profile.mediaPeekClip)[index],
      duration: profile.mediaPeekDuration,
      ease: "power3.out",
    },
    "media:peek",
  );

  timeline.addLabel(
    "media:expand",
    profile.mediaExpandAt,
  );

  timeline.to(
    revealCovers,
    {
      clipPath: (index: number) => revealCoverClips(CLIP_OPEN)[index],
      duration: profile.mediaExpandDuration,
      ease: "power4.inOut",
    },
    "media:expand",
  );

  timeline.addLabel(
    "header:resolve",
    profile.headerResolveAt,
  );

  timeline.to(
    intro,
    {
      autoAlpha: 0,
      y: profile.introResolveY,
      x: profile.introResolveX,
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
    profile.headlineAssembleAt - 0.08,
  );

  timeline.addLabel(
    "headline:assemble",
    profile.headlineAssembleAt,
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
        duration: profile.headlineAssembleDuration,
        ease: "power3.out",
      },
      `headline:assemble+=${config.at}`,
    );
  });

  timeline.addLabel(
    "hero:ready",
    profile.heroReadyAt,
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
      killHeroExit = createHeroExitScroll(scope, profile);
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
      const profile = getHeroMotionProfile(
        window.innerWidth,
        window.innerHeight,
      );
      const killHeroExit = createHeroExitScroll(scope, profile);
      return () => {
        killHeroExit();
      };
    }

    const matchMedia = gsap.matchMedia();

    matchMedia.add(HERO_MEDIA_QUERIES, () => {
      const profile = getHeroMotionProfile(
        window.innerWidth,
        window.innerHeight,
      );

      if (scope.dataset.heroState === "ready") {
        applySettledHeroVisuals(scope);
        return createHeroExitScroll(scope, profile);
      }

      return buildOpeningTimeline(scope, profile);
    });

    return () => {
      matchMedia.revert();
      resumeV2Scroll();
    };
  });
}
