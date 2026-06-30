import type { MetadataRoute } from "next";

const BASE_URL = "https://myweathr.com";
import { DataService } from "@/services/DataService";
import { urlStationName } from "@/helpers/createStationName";

type SitemapEntry = MetadataRoute.Sitemap[0];
type EntryOptions = Pick<SitemapEntry, "lastModified" | "changeFrequency" | "priority">;

function bilingualEntries(enUrl: string, elUrl: string, options: EntryOptions): MetadataRoute.Sitemap {
    const alternates = {
        languages: {
            en: enUrl,
            el: elUrl,
            "x-default": enUrl,
        },
    };
    return [
        { url: enUrl, ...options, alternates },
        { url: elUrl, ...options, alternates },
    ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    const routes: MetadataRoute.Sitemap = [
        ...bilingualEntries(`${BASE_URL}/en`, `${BASE_URL}/el`, {
            lastModified: now,
            changeFrequency: "hourly",
            priority: 1,
        }),
        ...bilingualEntries(`${BASE_URL}/en/weather-map`, `${BASE_URL}/el/weather-map`, {
            lastModified: now,
            changeFrequency: "hourly",
            priority: 0.9,
        }),
        ...bilingualEntries(`${BASE_URL}/en/stations`, `${BASE_URL}/el/stations`, {
            lastModified: now,
            changeFrequency: "hourly",
            priority: 0.8,
        }),
        ...bilingualEntries(`${BASE_URL}/en/warnings`, `${BASE_URL}/el/warnings`, {
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.5,
        }),
        ...bilingualEntries(`${BASE_URL}/en/fthiotida-forecast`, `${BASE_URL}/el/fthiotida-forecast`, {
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.8,
        }),
        ...bilingualEntries(`${BASE_URL}/en/about-us`, `${BASE_URL}/el/about-us`, {
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.5,
        }),
    ];

    const dataService = new DataService();
    try {
        const response = await dataService.fetchWeatherStations();

        const stationEntries = response.flatMap((station) =>
            bilingualEntries(
                `${BASE_URL}/en/station/${station.id}/${urlStationName(station.name)}`,
                `${BASE_URL}/el/station/${station.id}/${urlStationName(station.name)}`,
                { lastModified: now, changeFrequency: "hourly", priority: 0.8 }
            )
        );

        const liveWeatherEntries = response.flatMap((station) =>
            bilingualEntries(
                `${BASE_URL}/en/live-weather-conditions/${station.id}/${urlStationName(station.name)}`,
                `${BASE_URL}/el/live-weather-conditions/${station.id}/${urlStationName(station.name)}`,
                { lastModified: now, changeFrequency: "hourly", priority: 0.5 }
            )
        );

        routes.push(...stationEntries, ...liveWeatherEntries);
    } catch (error) {
        console.error("Failed to fetch weather stations:", error);
    }

    return routes;
}
