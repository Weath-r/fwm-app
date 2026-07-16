import "server-only";
import { cache } from "react";
import configuration from "@/app/appConfig";
import { ConfigurationSchema } from "@/schemas";
import { CACHE_TAGS } from "@/services/cacheTags";
import { BASE_MENU } from "@/constants/navigation";
import { Configurations, FeatureFlags, MenuLink } from "@/types";

/**
 * Server-side source of truth for the Directus `configurations` feature flags.
 *
 * The flags are fetched once per `revalidate` window and shared across every
 * request via the Next.js Data Cache (tagged so they can be revalidated on
 * demand). React `cache()` additionally dedupes calls within a single request,
 * so multiple server components awaiting the config trigger a single fetch.
 */

export const CONFIGURATION_CACHE_TAG = CACHE_TAGS.configurations;

const CONFIGURATION_REVALIDATE_SECONDS = 3600;

const CONFIGURATION_ENDPOINT =
    "items/configurations?filter[_and][0][frontend][_eq]=true&fields=id,value,config";

const fetchConfigurations = async (): Promise<Configurations[]> => {
    const baseUrl = configuration.baseUrl?.replace(/\/$/, "");
    const response = await fetch(`${baseUrl}/${CONFIGURATION_ENDPOINT}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        next: {
            revalidate: CONFIGURATION_REVALIDATE_SECONDS,
            tags: [CONFIGURATION_CACHE_TAG],
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch configuration: ${response.status}`);
    }

    const json = await response.json();
    return ConfigurationSchema.parse(json.data) as Configurations[];
};

export const getConfiguration = cache(async (): Promise<FeatureFlags> => {
    try {
        const configurations = await fetchConfigurations();
        return configurations.reduce<FeatureFlags>((featureFlags, currentConfiguration) => {
            featureFlags[currentConfiguration.value] = currentConfiguration.config;
            return featureFlags;
        }, {});
    } catch (error) {
        console.error("Failed to load configuration feature flags", error);
        return {};
    }
});

export const getMenu = cache(async (): Promise<MenuLink[]> => {
    return BASE_MENU;
});
