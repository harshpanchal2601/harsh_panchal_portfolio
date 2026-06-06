import { AboutSection } from "@/sections/home/about-section";
import { CareerJourneySection } from "@/sections/home/career-journey-section";
import { EducationSection } from "@/sections/home/education-section";
import { EngineeringPhilosophySection } from "@/sections/home/engineering-philosophy-section";
import { ExperienceTimelineSection } from "@/sections/home/experience-timeline-section";
import { FeaturedProjectsSection } from "@/sections/home/featured-projects-section";
import { HeroSection } from "@/sections/home/hero-section";
import { TechnicalExpertiseSection } from "@/sections/home/technical-expertise-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TechnicalExpertiseSection />
      <ExperienceTimelineSection />
      <CareerJourneySection />
      <EngineeringPhilosophySection />
      <FeaturedProjectsSection />
      <EducationSection />
    </>
  );
}
