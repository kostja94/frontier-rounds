import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";
import { investorProfiles } from "@/data/investors/profiles";
import { productProfiles } from "@/data/products";
import { getAllTypeSummaries } from "@/data/investors/typeDirectory";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE_URL}/leaderboard`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/investors`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/investor-types`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const investorTypePages: MetadataRoute.Sitemap = getAllTypeSummaries().map((t) => ({
    url: `${SITE_URL}/investor-types/${t.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const investorPages: MetadataRoute.Sitemap = investorProfiles.map((p) => ({
    url: `${SITE_URL}/investors/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const productPages: MetadataRoute.Sitemap = productProfiles.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...investorTypePages, ...investorPages, ...productPages];
}
