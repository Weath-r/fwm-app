import JsonLd from "@/components/Seo/JsonLd";
import { DataService } from "@/services/DataService";
import { getT } from "@/i18n";
import { buildStationPlaceSchema, buildBreadcrumbSchema } from "@/helpers/seo/structuredData";

type StationStructuredDataProps = {
    stationId: number;
    stationName: string;
    lng: string;
    /** Route segment for the current page, e.g. "station" or "live-weather-conditions". */
    routeSegment: string;
    /** URL-encoded station name segment from the route params. */
    nameSegment: string;
};

/**
 * Server component that emits a Place (with geo coordinates) and a BreadcrumbList
 * for a single weather station. Renders breadcrumbs only if the station location
 * cannot be resolved, so a data hiccup never breaks the page.
 */
export default async function StationStructuredData({
    stationId,
    stationName,
    lng,
    routeSegment,
    nameSegment,
}: StationStructuredDataProps) {
    const { t } = await getT("pages");
    const pagePath = `/${lng}/${routeSegment}/${stationId}/${nameSegment}`;

    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: t("breadcrumbs.home"), url: `/${lng}` },
        { name: t("breadcrumbs.stations"), url: `/${lng}/stations` },
        { name: stationName, url: pagePath },
    ]);

    let placeSchema: Record<string, unknown> | null = null;
    try {
        const stations = await new DataService().fetchWeatherStations();
        const station = stations.find((entry) => entry.id === stationId);
        if (station) {
            placeSchema = buildStationPlaceSchema({ station, stationName, pagePath, lng });
        }
    } catch (error) {
        console.error("Failed to build station Place schema:", error);
    }

    return (
        <>
            {placeSchema && <JsonLd data={placeSchema} />}
            <JsonLd data={breadcrumbSchema} />
        </>
    );
}
