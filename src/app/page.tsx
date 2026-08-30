import { AboutScene } from "@/components/portfolio-v2/scenes/about/about-scene";
import { CapabilitiesScene } from "@/components/portfolio-v2/scenes/capabilities/capabilities-scene";
import { PortfolioExperienceShell } from "@/components/portfolio-v2/layout/portfolio-experience-shell";
import { HeroScene } from "@/components/portfolio-v2/scenes/hero/hero-scene";
import { ContactScene } from "@/components/portfolio-v2/scenes/contact/contact-scene";
import { ProcessScene } from "@/components/portfolio-v2/scenes/process/process-scene";
import { WorkScene } from "@/components/portfolio-v2/scenes/work/work-scene";
import { HomepageJsonLd } from "@/components/seo/structured-data";

export default function PortfolioPage() {
  return (
    <>
      <HomepageJsonLd />
      <PortfolioExperienceShell>
        <HeroScene />
        <AboutScene />
        <CapabilitiesScene />
        <WorkScene />
        <ProcessScene />
        <ContactScene />
      </PortfolioExperienceShell>
    </>
  );
}
