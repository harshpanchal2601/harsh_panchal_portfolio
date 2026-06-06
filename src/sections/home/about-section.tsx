import { Reveal } from "@/components/motion/reveal";
import Image from "next/image";

const aboutParagraphs = [
  "I'm Harsh Panchal, a Full Stack Engineer focused on building scalable web applications, cloud-native systems, and production-ready digital products.",
  "Over the last year, I've worked across the complete software lifecycle from frontend experiences and backend architecture to AWS infrastructure, CI/CD automation, and deployment workflows.",
  "My core expertise lies in the MERN and MEAN ecosystems, Next.js, REST API development, and AWS cloud services including EC2, S3, RDS, Lambda, DynamoDB, DNS management, and hosting infrastructure.",
  "I enjoy transforming ideas into reliable products that solve real business problems while remaining scalable, maintainable, and user-focused.",
] as const;

export function AboutSection() {
  return (
    <section className="relative px-[5vw] py-[160px]" id="about">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
        <Reveal className="group relative md:col-span-5">
          <div className="absolute -inset-4 bg-primary/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
          <Image
            alt="Harsh Profile"
            className="relative w-full rounded-lg grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0"
            height={1440}
            src="/images/profile.png"
            width={1080}
          />
        </Reveal>

        <Reveal className="md:col-span-7 md:pl-20">
          <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            The Mindset
          </span>
          <h2 className="mb-8 font-display text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-[80px]">
            I architect <span className="text-secondary italic">digital reality</span>{" "}
            from production needs.
          </h2>
          <div className="max-w-2xl space-y-6 text-lg leading-[1.8] tracking-[0.01em] text-muted-foreground">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
