"use client";

import { useEffect } from "react";

export function useMagneticEffect() {
  useEffect(() => {
    const magneticBtns = document.querySelectorAll(".magnetic-btn");
    
    const handleMouseMove = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const mouseEvent = e as MouseEvent;
      const rect = btn.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left - rect.width / 2;
      const y = mouseEvent.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const handleMouseLeave = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      btn.style.transform = "translate(0, 0)";
    };

    magneticBtns.forEach((btn) => {
      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      magneticBtns.forEach((btn) => {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);
}
