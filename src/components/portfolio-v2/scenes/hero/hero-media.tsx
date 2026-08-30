import Image from "next/image";
import { HERO_IMAGE_SRC } from "@/components/portfolio-v2/scenes/hero/hero-content";

export function HeroMedia() {
  return (
    <div className="v2-hero-media">
      <Image
        src={HERO_IMAGE_SRC}
        alt="Harsh Panchal"
        fill
        priority
        quality={80}
        draggable={false}
        sizes="(max-width: 899px) 100vw, 100vw"
        className="v2-hero-photo"
      />

      <div
        aria-hidden="true"
        className="v2-hero-media-shade"
      />

      <div aria-hidden="true" className="v2-hero-reveal">
        <span className="v2-hero-reveal-cover" data-hero-reveal="top" />
        <span className="v2-hero-reveal-cover" data-hero-reveal="right" />
        <span className="v2-hero-reveal-cover" data-hero-reveal="bottom" />
        <span className="v2-hero-reveal-cover" data-hero-reveal="left" />
      </div>
    </div>
  );
}
