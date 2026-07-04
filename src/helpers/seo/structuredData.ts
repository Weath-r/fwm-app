import { z } from "zod";
import { WeatherStationSchema } from "@/schemas/WeatherStations";
import configuration from "@/app/appConfig";
/**
 * Canonical production origin. Kept in sync with `metadataBase`, sitemap.ts and robots.ts.
 */
export const SITE_URL = configuration.metadata.site_url;
export const SITE_NAME = configuration.metadata.site_name;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

type WeatherStation = z.infer<typeof WeatherStationSchema>;

type SchemaObject = Record<string, unknown>;

export type BreadcrumbItem = {
    name: string;
    url: string;
};

/**
 * Absolute URL for a given path, guarding against duplicate slashes.
 */
function absoluteUrl(path: string): string {
    if (path.startsWith("http")) return path;
    return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function buildOrganizationSchema(): SchemaObject {
    return {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
            "@type": "ImageObject",
            url: absoluteUrl("/assets/metadata/android-chrome-512x512.png"),
            width: 512,
            height: 512,
        },
        areaServed: {
            "@type": "Place",
            name: "Central Greece",
        },
    };
}

export function buildWebSiteSchema(lng: string): SchemaObject {
    return {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: lng,
        publisher: { "@id": ORGANIZATION_ID },
    };
}

export function buildWebApplicationSchema(
    lng: string,
    strings: { name: string; description: string; featureList: string[] }
): SchemaObject {
    return {
        "@type": "WebApplication",
        name: strings.name,
        url: SITE_URL,
        description: strings.description,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        inLanguage: lng,
        featureList: strings.featureList,
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
        },
        publisher: { "@id": ORGANIZATION_ID },
    };
}

/**
 * Sitewide identity graph rendered once in the root layout.
 */
export function buildSiteGraph(
    lng: string,
    webApp: { name: string; description: string; featureList: string[] }
): SchemaObject {
    return {
        "@context": "https://schema.org",
        "@graph": [
            buildOrganizationSchema(),
            buildWebSiteSchema(lng),
            buildWebApplicationSchema(lng, webApp),
        ],
    };
}

/**
 * A weather-station location as a schema.org Place with geo coordinates.
 * Station coordinates are stored in GeoJSON order: [longitude, latitude].
 */
export function buildStationPlaceSchema(params: {
    station: Pick<WeatherStation, "location" | "elevation">;
    stationName: string;
    pagePath: string;
    lng: string;
}): SchemaObject {
    const { station, stationName, pagePath, lng } = params;
    const [longitude, latitude] = station.location.coordinates;

    return {
        "@context": "https://schema.org",
        "@type": "Place",
        name: stationName,
        url: absoluteUrl(pagePath),
        inLanguage: lng,
        geo: {
            "@type": "GeoCoordinates",
            latitude,
            longitude,
            elevation: station.elevation,
        },
        isPartOf: { "@id": WEBSITE_ID },
    };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): SchemaObject {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.url),
        })),
    };
}

export function buildAboutPageSchema(params: {
    lng: string;
    name: string;
    description: string;
    pagePath: string;
}): SchemaObject {
    return {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: params.name,
        description: params.description,
        url: absoluteUrl(params.pagePath),
        inLanguage: params.lng,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
    };
}
