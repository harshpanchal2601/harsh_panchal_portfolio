import { AboutSection } from "@/sections/home/about-section";
import { EducationSection } from "@/sections/home/education-section";
import { EngineeringPhilosophySection } from "@/sections/home/engineering-philosophy-section";
import { ExperienceTimelineSection } from "@/sections/home/experience-timeline-section";
import { FeaturedProjectsSection } from "@/sections/home/featured-projects-section";
import { HeroSection } from "@/sections/home/hero-section";
import { TechnicalExpertiseSection } from "@/sections/home/technical-expertise-section";
import { PortfolioEntryIntro } from "@/components/intro/portfolio-entry-intro";
import { PageParticles } from "@/components/motion/page-particles";

export default function HomePage() {
  return (
    <>
      <div
        id="hp-intro-guard"
        className="fixed inset-0 z-[99998] bg-background"
        style={{
          background:
            "linear-gradient(rgba(23,23,23,0.032) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.032) 1px, transparent 1px), radial-gradient(circle at 68% 38%, rgba(109,94,246,0.18), transparent 34%), radial-gradient(circle at 22% 18%, rgba(215,199,163,0.34), transparent 32%), #f7f4ef",
          backgroundSize: "46px 46px, 46px 46px, auto, auto, auto",
        }}
      />
      {/* Global ambient particle layer - sits behind all sections */}
      <PageParticles />
      <PortfolioEntryIntro />
      <HeroSection />
      <AboutSection />
      <TechnicalExpertiseSection />
      <ExperienceTimelineSection />
      <EngineeringPhilosophySection />
      <FeaturedProjectsSection />
      <EducationSection />
    </>
  );
}
