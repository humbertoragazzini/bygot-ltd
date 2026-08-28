import type { MetadataRoute } from "next";
import { getCompanyInfo } from "@/lib/company";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const company = getCompanyInfo();
  const baseUrl = company.siteUrl ? company.siteUrl.replace(/\/$/, "") : "https://example.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
