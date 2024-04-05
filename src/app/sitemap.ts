import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://www.emojitell.com",
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 0.7,
        },
        {
            url: "https://www.emojitell.com/about",
            lastModified: new Date().toISOString(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: "https://www.emojitell.com/discovery",
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://www.emojitell.com/emojis",
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly",
        }
    ];
}