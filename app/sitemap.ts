import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/contact`, priority: 0.8 },
    { url: `${site.url}/mentions-legales`, priority: 0.2 },
  ];
}
