import type { MetadataRoute } from "next";
import { getCompanyInfo } from "@/lib/company";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const company = getCompanyInfo();
  const baseUrl = company.siteUrl ? company.siteUrl.replace(/\/$/, "") : "https://example.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
