import { Reveal } from "@/components/motion/reveal";

const journeyParagraphs = [
  "My journey into software development started with curiosity and gradually evolved into a professional career centered around building production systems.",
  "While pursuing my Bachelor of Science (Computer Applications & Information Technology) at K. S. School of Business Management & Information Technology, Gujarat University, I focused heavily on practical engineering experience beyond academics.",
  "From learning HTML, CSS, and JavaScript fundamentals to mastering modern frameworks, backend systems, cloud infrastructure, and deployment pipelines, every project became an opportunity to deepen my engineering skills.",
  "Today, I work as a Full Stack Developer at Shambhavi Technovation, contributing to large-scale products, leading technical initiatives, and building solutions used by real businesses and customers.",
] as const;

export function CareerJourneySection() {
  return (
    <section className="bg-[#323537]/30 px-[5vw] py-[160px]" id="journey">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mb-24 text-center font-display text-[48px] font-bold leading-[1.2] tracking-[-0.02em]">
            A Non-Linear Evolution
          </h2>
        </Reveal>
        <div className="relative">
          <div className="journey-line absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 opacity-30 md:block" />
          <div className="space-y-32">
            {journeyParagraphs.map((paragraph, index) => (
              <Reveal
                className={`relative flex flex-col items-center gap-12 md:flex-row ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                key={paragraph}
              >
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:text-right" : ""
                  }`}
                >
                  <span className="mb-2 block text-2xl font-bold text-primary">
                    0{index + 1}
                  </span>
                  <h3 className="mb-4 font-display text-[32px] font-bold leading-[1.2] tracking-[-0.02em]">
                    {index === 0
                      ? "Curiosity"
                      : index === 1
                        ? "Practical Engineering"
                        : index === 2
                          ? "Modern Systems"
                          : "Production Work"}
                  </h3>
                  <p className="text-muted-foreground">{paragraph}</p>
                </div>
                <div className="absolute left-1/2 z-10 hidden size-4 -translate-x-1/2 rounded-full border-4 border-background bg-primary md:block" />
                <div className="w-full md:w-1/2" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
