import type { MetadataRoute } from "next";
import { PROJECT_ROUTES } from "@/constants/routes";

const routes = [
  "/",
  "/contact",
  PROJECT_ROUTES.wikipointAi,
  PROJECT_ROUTES.beige,
  PROJECT_ROUTES.erpSystem,
  PROJECT_ROUTES.hrManagementSystem,
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: route,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
