import { Reveal } from "@/components/motion/reveal";

const expertise = [
  {
    title: "The Frontend",
    icon: "layers",
    description:
      "I craft interfaces using React, Angular, and Next.js where every transition, state, and interaction supports a clear product workflow.",
  },
  {
    title: "The Core",
    icon: "database",
    description:
      "My backend work centers on Node.js, Express.js, REST APIs, MongoDB, RDS, and production services designed for predictable business operations.",
  },
  {
    title: "The Cloud",
    icon: "cloud_done",
    description:
      "I deploy and maintain AWS infrastructure across EC2, S3, RDS, Lambda, DynamoDB, DNS, CI/CD automation, and hosting workflows.",
  },
] as const;

export function TechnicalExpertiseSection() {
  return (
    <section className="border-y border-border/20 bg-[#191c1e] px-[5vw] py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 text-center md:mb-24">
          <h2 className="mb-6 font-display text-[38px] font-bold leading-[1.12] tracking-[-0.025em] md:text-[60px]">
            Narrative Engineering
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-[1.75] tracking-[0.01em] text-muted-foreground md:text-lg">
            Deep technical mastery is more than a list of tools. It is how those
            tools work together to solve real business problems.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {expertise.map((item) => (
            <Reveal className="space-y-6" key={item.title}>
              <span className="text-5xl text-primary" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="font-display text-[28px] font-bold leading-[1.2] tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
