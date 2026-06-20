"use client";

import { useEffect } from "react";
import { useSplash } from "@/context/splash-context";

export function useRevealOnScroll() {
  const { isSplashActive } = useSplash();

  useEffect(() => {
    // Wait until splash is complete before observing
    if (isSplashActive) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [isSplashActive]);
}
