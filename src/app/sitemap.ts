import type { MetadataRoute } from "next";
const BASE_URL = "https://myweathr.com";
import { DataService } from "@/services/DataService";
import { urlStationName } from "@/helpers/createStationName";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "hourly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/stations`,
            lastModified: new Date(),
            changeFrequency: "hourly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/warnings`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/about-us`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
        }
    ];

    const dataService = new DataService();
    try {
        const response = await dataService.fetchWeatherStations();
        const sitemapEntries: MetadataRoute.Sitemap = response.map((station) => ({
            url: `${BASE_URL}/station/${station.id}/${urlStationName(station.name)}`,
            lastModified: new Date(),
            changeFrequency: "hourly",
            priority: 0.9,
        }));

        routes.push(...sitemapEntries);
    } catch (error) {
        console.error("Failed to fetch weather stations:", error);
    }

    return routes;
}