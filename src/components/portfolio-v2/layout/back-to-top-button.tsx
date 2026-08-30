"use client";

import { useEffect, useState } from "react";

import { scrollV2To } from "@/animations/gsap/scroll-runtime";

const VISIBILITY_THRESHOLD = 480;

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let updateFrame = 0;

    const updateVisibility = () => {
      updateFrame = 0;
      setIsVisible(window.scrollY >= VISIBILITY_THRESHOLD);
    };

    const scheduleVisibilityUpdate = () => {
      if (!updateFrame) {
        updateFrame = window.requestAnimationFrame(updateVisibility);
      }
    };

    updateVisibility();
    window.addEventListener("scroll", scheduleVisibilityUpdate, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", scheduleVisibilityUpdate);
      window.cancelAnimationFrame(updateFrame);
    };
  }, []);

  return (
    <button
      aria-hidden={!isVisible}
      aria-label="Back to top"
      className="v2-back-to-top"
      data-visible={isVisible ? "true" : "false"}
      onClick={() => scrollV2To(0)}
      tabIndex={isVisible ? 0 : -1}
      title="Back to top"
      type="button"
    >
      <span aria-hidden="true" className="v2-back-to-top-icon">
        <svg viewBox="0 0 24 24">
          <path d="M12 20V4M6 10l6-6 6 6" />
        </svg>
      </span>
    </button>
  );
}
