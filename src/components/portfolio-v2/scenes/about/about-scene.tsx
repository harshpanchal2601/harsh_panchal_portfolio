"use client";

import { useEffect, useRef } from "react";

import {
  V2_HEADER_REVEAL_EVENT,
  V2_HERO_READY_EVENT,
} from "@/animations/gsap/scroll-runtime";

import "@/components/portfolio-v2/scenes/about/about-scene.css";

const ABOUT_LEAD =
  "Full-stack engineer building production products across frontend, backend, cloud, and delivery — turning complex requirements into systems that stay clear, scalable, and useful.";

const ABOUT_FOLLOW_FAST = "I don’t stop at screens.";

const ABOUT_FOLLOW_REST =
  "I connect product thinking, APIs, infrastructure, and deployment into one working system.";

const PROOF_LINES = [
  "Full-stack engineer.",
  "Frontend → backend.",
  "Cloud → delivery.",
  "Built for production.",
] as const;

let aboutMotionPromise:
  | Promise<typeof import("@/components/portfolio-v2/scenes/about/about-motion")>
  | undefined;

function preloadAboutMotion() {
  aboutMotionPromise ??= import(
    "@/components/portfolio-v2/scenes/about/about-motion"
  );
  return aboutMotionPromise;
}

function WordPhrase({
  text,
  pace,
}: {
  text: string;
  pace?: "fast";
}) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span
            className="v2-about-word"
            data-word=""
            {...(pace ? { "data-word-pace": pace } : {})}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

function SystemTile() {
  return (
    <div className="v2-about-tile" data-about-tile="">
      <div className="v2-about-tile-inner">
        <p className="v2-about-tile-flow">
          <span>Idea</span>
          <span aria-hidden="true" className="v2-about-tile-arrow">
            ↓
          </span>
          <span>Product</span>
          <span aria-hidden="true" className="v2-about-tile-arrow">
            ↓
          </span>
          <span>Production</span>
        </p>

        <p className="v2-about-tile-layers">
          <span data-about-chip="">UI</span>
          <span data-about-chip="">API</span>
          <span data-about-chip="">Cloud</span>
        </p>
      </div>
    </div>
  );
}

export function AboutScene() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    let cancelled = false;
    let initialized = false;
    let cleanup: (() => void) | undefined;

    const preload = () => {
      void preloadAboutMotion().catch(() => {
        root.dataset.motionState = "unavailable";
      });
    };

    const initialize = () => {
      if (initialized) {
        return;
      }

      initialized = true;
      void preloadAboutMotion()
        .then(({ playAboutScene }) => {
          if (cancelled) {
            return;
          }

          const context = playAboutScene(root);
          cleanup = () => context.revert();
        })
        .catch(() => {
          root.dataset.motionState = "unavailable";
        });
    };

    window.addEventListener(V2_HEADER_REVEAL_EVENT, preload);
    window.addEventListener(V2_HERO_READY_EVENT, initialize);

    if (document.querySelector('[data-header-ready="true"]')) {
      preload();
    }

    if (document.querySelector('[data-hero-state="ready"]')) {
      initialize();
    }

    return () => {
      cancelled = true;
      window.removeEventListener(V2_HEADER_REVEAL_EVENT, preload);
      window.removeEventListener(V2_HERO_READY_EVENT, initialize);
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="v2-about-heading"
      className="v2-about"
      data-scene-header-tone="dark"
      id="about"
    >
      <h2 className="v2-sr-only" id="v2-about-heading">
        About
      </h2>

      <div className="v2-about-stage">
        <div className="v2-about-layout">
          <aside className="v2-about-proof">
            <p className="v2-about-kicker">02 / About</p>

            {PROOF_LINES.map((line) => (
              <p className="v2-about-proof-line" key={line}>
                {line}
              </p>
            ))}
          </aside>

          <div className="v2-about-copy">
            <p className="v2-about-lead">
              <WordPhrase text={ABOUT_LEAD} />
            </p>

            <p className="v2-about-follow">
              <WordPhrase pace="fast" text={ABOUT_FOLLOW_FAST} />
              {" "}
              <WordPhrase text={ABOUT_FOLLOW_REST} />
            </p>
          </div>

          <SystemTile />
        </div>
      </div>
    </section>
  );
}
