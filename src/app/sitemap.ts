import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "/",
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 0.7,
        },
        {
            url: "/about",
            lastModified: new Date().toISOString(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: "/discovery",
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "/emojis",
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly",
        }
    ];
}