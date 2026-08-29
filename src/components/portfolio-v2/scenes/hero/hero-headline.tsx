import { cn } from "@/lib/utils";
import {
  HERO_COPY_STATEMENT,
  HERO_HEADLINE_DESKTOP,
  HERO_HEADLINE_MOBILE,
} from "@/components/portfolio-v2/scenes/hero/hero-content";

function HeadlineVisual() {
  return (
    <>
      <div className="v2-hero-headline-set is-desktop">
        {HERO_HEADLINE_DESKTOP.map((line, lineIndex) => (
          <p
            className="v2-hero-headline-line"
            key={`desktop-${lineIndex}`}
          >
            {line.map((fragment) => (
              <span
                className="v2-hero-frag"
                data-frag={fragment.id}
                key={fragment.id}
              >
                {fragment.text}
              </span>
            ))}
          </p>
        ))}
      </div>

      <div className="v2-hero-headline-set is-mobile">
        {HERO_HEADLINE_MOBILE.map((line, lineIndex) => (
          <p
            className={cn(
              "v2-hero-headline-line",
              line[0].offset && "is-offset",
            )}
            key={`mobile-${lineIndex}`}
          >
            {line.map((fragment) => (
              <span
                className="v2-hero-frag"
                data-frag={fragment.id}
                key={fragment.id}
              >
                {fragment.text}
              </span>
            ))}
          </p>
        ))}
      </div>
    </>
  );
}

export function HeroHeadline() {
  return (
    <>
      <h1 className="v2-sr-only">{HERO_COPY_STATEMENT}</h1>

      <div
        aria-hidden="true"
        className="v2-hero-headline"
      >
        <HeadlineVisual />
      </div>
    </>
  );
}
