import type { MetadataRoute } from "next";
const BASE_URL = "https://myweathr.com";
import { DataService } from "@/services/DataService";
import { urlStationName } from "@/helpers/createStationName";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/en`,
            lastModified: new Date(),
            changeFrequency: "hourly",
            priority: 1,
            alternates: {
                languages: {
                    el: `${BASE_URL}/el`,
                },
            },
        },
        {
            url: `${BASE_URL}/en/stations`,
            lastModified: new Date(),
            changeFrequency: "hourly",
            priority: 0.8,
            alternates: {
                languages: {
                    el: `${BASE_URL}/el/stations`,
                },
            },
        },
        {
            url: `${BASE_URL}/en/warnings`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.5,
            alternates: {
                languages: {
                    el: `${BASE_URL}/el/warnings`,
                },
            },
        },
        {
            url: `${BASE_URL}/en/fthiotida-forecast`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
            alternates: {
                languages: {
                    el: `${BASE_URL}/el/fthiotida-forecast`,
                },
            },
        },
        {
            url: `${BASE_URL}/en/about-us`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
            alternates: {
                languages: {
                    el: `${BASE_URL}/el/about-us`,
                },
            },
        }
    ];

    const dataService = new DataService();
    try {
        const response = await dataService.fetchWeatherStations();
        const sitemapEntries: MetadataRoute.Sitemap = response.map((station) => ({
            url: `${BASE_URL}/en/station/${station.id}/${urlStationName(station.name)}`,
            lastModified: new Date(),
            changeFrequency: "hourly",
            priority: 0.8,
            alternates: {
                languages: {
                    el: `${BASE_URL}/en/station/${station.id}/${urlStationName(station.name)}`,
                },
            },
        }));

        routes.push(...sitemapEntries);
    } catch (error) {
        console.error("Failed to fetch weather stations:", error);
    }

    return routes;
}