import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { PROGRAMS } from "@/constants/programs";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const staticRoutes = [
    "",
    "/programs",
    "/space",
    "/reservation",
    "/faq",
    "/location",
    "/login",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const programRoutes = PROGRAMS.map((p) => ({
    url: `${base}/programs/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...programRoutes];
}
