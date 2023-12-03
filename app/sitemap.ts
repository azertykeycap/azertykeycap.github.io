import { getArticles, getProfileSlugs } from "@/lib/api/contentful";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profileSlugs = await getProfileSlugs();

  return [
    {
      url: "https://azertykeycaps.fr",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://azertykeycaps.fr/informations",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://azertykeycaps.fr/dropshipping",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...(profileSlugs.map((slug) => ({
      url: `https://azertykeycaps.fr/profil/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })) as MetadataRoute.Sitemap),
  ];
}
