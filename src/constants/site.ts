export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://harsh-panchal-portfolio-kappa.vercel.app/";

export const SITE_METADATA = {
  name: "Harsh Panchal",
  title: "Harsh Panchal — Full-Stack Developer & Software Engineer",
  description:
    "Harsh Panchal is a full-stack engineer building production-ready web applications, scalable backend services, cloud systems, and AI integrations with Next.js, React, Node.js, and AWS.",
  author: "Harsh Panchal",
  url: SITE_ORIGIN,
  twitterHandle: "@harshpanchal",
  email: "harshpanchal7979@gmail.com",
} as const;
