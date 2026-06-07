import { Reveal } from "@/components/motion/reveal";

const expertise = [
  {
    title: "Frontend",
    icon: "layers",
    description:
      "I build interfaces with React, Angular, and Next.js, with attention to layout, state, performance, and the small details users notice.",
  },
  {
    title: "Backend",
    icon: "database",
    description:
      "I create REST APIs and services with Node.js, Express.js, MongoDB, and SQL-backed systems for product and business workflows.",
  },
  {
    title: "Cloud",
    icon: "cloud_done",
    description:
      "I deploy and maintain applications on AWS using EC2, S3, RDS, Lambda, DynamoDB, DNS, and GitHub Actions based CI/CD.",
  },
] as const;

export function TechnicalExpertiseSection() {
  return (
    <section className="border-y border-border bg-white/55 px-[5vw] py-18 md:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center md:mb-16">
          <h2 className="mb-5 font-display text-[32px] font-bold leading-[1.12] md:text-[44px] lg:text-[48px]">
            Technical Focus
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">
            I work across the parts of a product that need to connect well:
            the interface, the API, the database, and the deployment.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {expertise.map((item) => (
            <Reveal className="group rounded-xl border border-border bg-white p-6 shadow-[0_18px_50px_rgba(23,23,23,0.05)] transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_64px_rgba(109,94,246,0.12)]" key={item.title}>
              <span className="mb-6 block text-4xl text-primary" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="mb-3 font-display text-[24px] font-bold leading-[1.2] md:text-[28px]">
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
