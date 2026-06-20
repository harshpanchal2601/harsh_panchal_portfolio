import { HeroSection } from "@/sections/home/hero-section";
import { AboutSection } from "@/sections/home/about-section";
import { CareerJourneySection } from "@/sections/home/career-journey-section";
import { FeaturedProjectsSection } from "@/sections/home/featured-projects-section";
import { EngineeringPhilosophySection } from "@/sections/home/engineering-philosophy-section";
import { ExperienceSection } from "@/sections/home/experience-section";
import { EducationSection } from "@/sections/home/education-section";
import { ContactSection } from "@/sections/home/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CareerJourneySection />
      <FeaturedProjectsSection />
      <EngineeringPhilosophySection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}

