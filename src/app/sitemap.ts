import type { MetadataRoute } from "next";
import configuration from "./appConfig";

import { getWeatherStations } from "@/services/getWeatherStations";
import { urlStationName } from "@/helpers/createStationName";

type SitemapEntry = MetadataRoute.Sitemap[0];
type EntryOptions = Pick<SitemapEntry, "lastModified" | "changeFrequency" | "priority">;

function bilingualEntries(
    enUrl: string,
    elUrl: string,
    options: EntryOptions
): MetadataRoute.Sitemap {
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
        ...bilingualEntries(
            `${configuration.metadata.site_url}/en`,
            `${configuration.metadata.site_url}/el`,
            {
                lastModified: now,
                changeFrequency: "hourly",
                priority: 1,
            }
        ),
        ...bilingualEntries(
            `${configuration.metadata.site_url}/en/weather-map`,
            `${configuration.metadata.site_url}/el/weather-map`,
            {
                lastModified: now,
                changeFrequency: "hourly",
                priority: 0.9,
            }
        ),
        ...bilingualEntries(
            `${configuration.metadata.site_url}/en/stations`,
            `${configuration.metadata.site_url}/el/stations`,
            {
                lastModified: now,
                changeFrequency: "hourly",
                priority: 0.8,
            }
        ),
        ...bilingualEntries(
            `${configuration.metadata.site_url}/en/warnings`,
            `${configuration.metadata.site_url}/el/warnings`,
            {
                lastModified: now,
                changeFrequency: "daily",
                priority: 0.5,
            }
        ),
        ...bilingualEntries(
            `${configuration.metadata.site_url}/en/fthiotida-forecast`,
            `${configuration.metadata.site_url}/el/fthiotida-forecast`,
            {
                lastModified: now,
                changeFrequency: "daily",
                priority: 0.8,
            }
        ),
        ...bilingualEntries(
            `${configuration.metadata.site_url}/en/about-us`,
            `${configuration.metadata.site_url}/el/about-us`,
            {
                lastModified: now,
                changeFrequency: "yearly",
                priority: 0.5,
            }
        ),
    ];

    try {
        const response = await getWeatherStations();

        const stationEntries = response.flatMap((station) =>
            bilingualEntries(
                `${configuration.metadata.site_url}/en/station/${station.id}/${urlStationName(station.name)}`,
                `${configuration.metadata.site_url}/el/station/${station.id}/${urlStationName(station.name)}`,
                { lastModified: now, changeFrequency: "hourly", priority: 0.8 }
            )
        );

        const liveWeatherEntries = response.flatMap((station) =>
            bilingualEntries(
                `${configuration.metadata.site_url}/en/live-weather-conditions/${station.id}/${urlStationName(station.name)}`,
                `${configuration.metadata.site_url}/el/live-weather-conditions/${station.id}/${urlStationName(station.name)}`,
                { lastModified: now, changeFrequency: "hourly", priority: 0.5 }
            )
        );

        routes.push(...stationEntries, ...liveWeatherEntries);
    } catch (error) {
        console.error("Failed to fetch weather stations:", error);
    }

    return routes;
}
