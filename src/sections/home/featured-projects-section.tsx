"use client";

import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { primaryProjectPreviews, secondaryProjectPreviews } from "@/data/projects";

/* ──────────────────────────────────────────────
   Main Project Card — Full-Width Zig-Zag Layout
   ────────────────────────────────────────────── */
function MainProjectCard({ 
  project, 
  index 
}: { 
  project: typeof primaryProjectPreviews[number]; 
  index: number;
}) {
  const isReversed = index % 2 !== 0;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isReversed ? "lg:[direction:rtl]" : ""}`}>
      {/* Image Side */}
      <div 
        className={`overflow-hidden rounded-2xl border border-stone-border premium-shadow group reveal-on-scroll ${isReversed ? "lg:[direction:ltr]" : ""}`}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <div className="w-full aspect-[16/10] bg-gradient-to-br from-secondary/5 via-primary/5 to-secondary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
          <span className="material-symbols-outlined text-6xl text-primary/20">image</span>
        </div>
      </div>

      {/* Content Side */}
      <div className={`${isReversed ? "lg:[direction:ltr]" : ""}`}>
        <span 
          className="inline-block px-3 py-1 bg-primary/5 text-primary font-label-md text-label-sm uppercase tracking-widest mb-4 border border-primary/10 reveal-on-scroll"
          style={{ transitionDelay: `${index * 200 + 50}ms` }}
        >
          Featured Project
        </span>
        <h3 
          className="font-headline-lg text-headline-lg mb-3 reveal-on-scroll"
          style={{ transitionDelay: `${index * 200 + 100}ms` }}
        >
          {project.title}
        </h3>
        <p 
          className="font-label-sm text-label-sm text-secondary mb-4 reveal-on-scroll"
          style={{ transitionDelay: `${index * 200 + 120}ms` }}
        >
          {project.role}
        </p>
        <p 
          className="font-body-md text-body-md text-[#44474d] mb-6 leading-relaxed reveal-on-scroll"
          style={{ transitionDelay: `${index * 200 + 150}ms` }}
        >
          {project.summary}
        </p>
        <p 
          className="font-body-md text-body-md text-[#44474d] mb-8 leading-relaxed reveal-on-scroll"
          style={{ transitionDelay: `${index * 200 + 170}ms` }}
        >
          <strong className="text-primary">Challenge:</strong> {project.challenge}
        </p>

        {/* Tech Tags */}
        <div 
          className="flex flex-wrap gap-2 mb-8 reveal-on-scroll"
          style={{ transitionDelay: `${index * 200 + 200}ms` }}
        >
          {project.tech.map((t) => (
            <span key={t} className="px-3 py-1 bg-primary/5 text-[11px] font-bold uppercase border border-primary/10 tracking-widest rounded-full hover:bg-primary/10 transition-colors">
              {t}
            </span>
          ))}
        </div>

        {/* Animated View Work Button */}
        <div 
          className="flex items-center gap-4 reveal-on-scroll"
          style={{ transitionDelay: `${index * 200 + 250}ms` }}
        >
          <Link 
            href={project.href}
            className="group inline-flex items-center gap-3 bg-primary-container text-on-primary px-8 py-4 rounded-full font-label-md text-label-md magnetic-btn hover:scale-105 transition-all"
          >
            View Work
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
          </Link>
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary font-label-md text-label-md transition-colors magnetic-btn"
            >
              Live Site
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Secondary Project Card — Compact Grid Card
   ────────────────────────────────────────────── */
function SecondaryProjectCard({ 
  project, 
  index 
}: { 
  project: typeof secondaryProjectPreviews[number]; 
  index: number;
}) {
  return (
    <div className="group flex flex-col h-full">
      <div 
        className="overflow-hidden rounded-xl border border-stone-border premium-shadow mb-6 reveal-on-scroll flex-shrink-0"
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        <div className="w-full aspect-video bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-700">
          <span className="material-symbols-outlined text-4xl text-primary/30">image</span>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow justify-between items-start reveal-on-scroll" style={{ transitionDelay: `${index * 150 + 50}ms` }}>
        <div className="w-full">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t} className="px-2 py-0.5 bg-primary/5 text-[10px] font-bold uppercase border border-primary/10 tracking-widest">
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-2 py-0.5 bg-primary/5 text-[10px] font-bold uppercase border border-primary/10 tracking-widest">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
          <h3 className="font-headline-md text-headline-md group-hover:text-secondary transition-colors mb-2">
            {project.title}
          </h3>
          <p className="font-label-sm text-label-sm text-[#44474d] mb-3 opacity-70">
            {project.role}
          </p>
          <p className="font-body-md text-body-md text-[#44474d] leading-relaxed mb-6">
            {project.summary}
          </p>
        </div>
        
        <Link 
          href={project.href}
          className="group/btn inline-flex items-center gap-2 font-label-md text-primary hover:text-secondary transition-colors"
        >
          View Work
          <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform duration-300">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Featured Projects Section
   ────────────────────────────────────────────── */
export function FeaturedProjectsSection() {
  useRevealOnScroll();

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="work">
      <div className="mb-20">
        <h2 className="font-headline-lg text-headline-lg mb-4 reveal-on-scroll">Selected Works</h2>
        <p className="font-body-md text-body-md text-[#44474d] max-w-lg reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
          Cinematic showcases of digital solutions tailored for performance and scale.
        </p>
      </div>

      {/* Main Projects — Zig-Zag */}
      <div className="space-y-28 mb-28">
        {primaryProjectPreviews.map((project, index) => (
          <MainProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-6 mb-20 reveal-on-scroll">
        <div className="flex-1 h-px bg-stone-border"></div>
        <span className="font-label-md text-label-sm uppercase tracking-widest text-[#44474d]/50">More Projects</span>
        <div className="flex-1 h-px bg-stone-border"></div>
      </div>

      {/* Secondary Projects — Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
        {secondaryProjectPreviews.map((project, index) => (
          <SecondaryProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
