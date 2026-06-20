"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMagneticEffect } from "@/hooks/use-magnetic-effect";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { useSplash } from "@/context/splash-context";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSplashActive } = useSplash();
  useMagneticEffect();
  useRevealOnScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant/30 transition-all ${isScrolled ? "py-3" : "py-5"}`}>
      <nav className="flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex items-center gap-3 reveal-on-scroll">
          <AnimatePresence>
            {!isSplashActive && (
              <motion.div
                layoutId="avatar-container"
                className="w-10 h-10 rounded-full overflow-hidden border border-stone-border bg-white flex items-center justify-center premium-shadow"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                <motion.img
                  layoutId="avatar-image"
                  src="/images/avatar.png"
                  alt="Avatar"
                  className="w-full h-full object-cover object-[center_30%]"
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="font-headline-md text-headline-md font-bold text-primary">HP</div>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <Link className="text-label-md font-label-md text-[#44474d] hover:text-primary transition-colors magnetic-btn reveal-on-scroll" href="/#about" style={{ transitionDelay: "50ms" }}>
            About
          </Link>
          <Link className="text-label-md font-label-md text-[#44474d] hover:text-primary transition-colors magnetic-btn reveal-on-scroll" href="/#work" style={{ transitionDelay: "100ms" }}>
            Work
          </Link>
          <Link className="text-label-md font-label-md text-[#44474d] hover:text-primary transition-colors magnetic-btn reveal-on-scroll" href="/#journey" style={{ transitionDelay: "150ms" }}>
            Journey
          </Link>
          <Link className="text-label-md font-label-md text-[#44474d] hover:text-primary transition-colors magnetic-btn reveal-on-scroll" href="/#contact" style={{ transitionDelay: "200ms" }}>
            Contact
          </Link>
        </div>
        <a
          href="/Harsh-Panchal-Resume.pdf"
          download
          className="bg-primary-container text-on-primary px-6 py-2.5 rounded-full font-label-md text-label-md magnetic-btn hover:scale-105 transition-all reveal-on-scroll inline-flex items-center gap-2"
          style={{ transitionDelay: "250ms" }}
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          Download Resume
        </a>
      </nav>
    </header>
  );
}

