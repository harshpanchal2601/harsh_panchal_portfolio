import { ImageResponse } from "next/og";
import { SITE_METADATA } from "@/constants/site";
import { getV2CaseStudyProject, v2CaseStudySlugs } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return v2CaseStudySlugs.map((slug) => ({ slug }));
}

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const project = getV2CaseStudyProject(slug);

  const title = project?.title || "Case Study";
  const summary = project?.summary || "Production web engineering case study.";
  const tech = project?.tech.slice(0, 4).join(" / ") || "Next.js / TypeScript";
  const domainText = SITE_METADATA.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f0e0c",
          padding: "64px 80px",
          color: "#eee4d7",
          fontFamily: "sans-serif",
          backgroundImage:
            "radial-gradient(circle at 75% 35%, rgba(185, 97, 67, 0.22) 0%, transparent 55%), linear-gradient(135deg, #0f0e0c 0%, #15110e 100%)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: "18px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#d68a68",
              fontWeight: 600,
            }}
          >
            Project Case Study — Harsh Panchal
          </div>
          <div
            style={{
              fontSize: "16px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(238, 228, 215, 0.6)",
            }}
          >
            {domainText}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: "#f3e4d0",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "22px",
              lineHeight: 1.35,
              color: "rgba(238, 228, 215, 0.8)",
              maxWidth: "950px",
            }}
          >
            {summary}
          </div>
          <div
            style={{
              fontSize: "18px",
              letterSpacing: "0.14em",
              color: "#d68a68",
              textTransform: "uppercase",
              fontWeight: 600,
              marginTop: "8px",
            }}
          >
            {tech}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(238, 228, 215, 0.15)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              fontSize: "15px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(238, 228, 215, 0.8)",
            }}
          >
            Built for Production
          </div>
          <div
            style={{
              fontSize: "15px",
              letterSpacing: "0.12em",
              color: "#d68a68",
              fontWeight: 600,
            }}
          >
            Read Case Study ↗
          </div>
        </div>
      </div>
    ),
    size,
  );
}
