import ClientPageLiveWeatherConditions from "./page.client";
import { getT } from "@/i18n";
import { properStationName } from "@/helpers/createStationName";
import { getCachedLiveWeatherStationData } from "@/components/LiveWeatherConditions/helpers/fetchWeatherData";
import { getConfiguration } from "@/services/getConfiguration";
import StationStructuredData from "@/components/Seo/StationStructuredData";
import StationUnavailable from "@/components/StationUnavailable/StationUnavailable";
import configuration from "@/app/appConfig";

type LiveWeatherConditionsProps = {
    params: Promise<{
        id: string;
        name: string;
        lng: string;
    }>;
};

export async function generateMetadata(props: LiveWeatherConditionsProps) {
    const params = await props.params;
    const stationName = decodeURI(properStationName(params.name));
    const { t, i18n } = await getT("pages");
    const featureFlags = await getConfiguration();
    const isForecastEnabled = featureFlags.forecasts.modalForecast || false;
    const { weatherData } = await getCachedLiveWeatherStationData(
        params.lng,
        +params.id,
        isForecastEnabled
    );

    const keywords_en = [
        `${stationName} weather`,
        `${stationName} weather station`,
        `live weather ${stationName}`,
        `real-time weather ${stationName}`,
        "personal weather station",
        "weather station",
        "weather data",
        `weather station ${stationName}`,
    ];
    const keywords_el = [
        `${stationName} καιρός`,
        `${stationName} μετεωρολογικός σταθμός`,
        `καιρικές συνθήκες ${stationName}`,
        `καιρός αύριο ${stationName}`,
        "προσωπικός μετεωρολογικός σταθμός",
        "μετεωρολογικά δεδομένα",
        `σταθμός καιρού ${stationName}`,
    ];

    return {
        title: t("stationIndividual.title", { station: stationName }),
        description: t("stationIndividual.description", { station: stationName }),
        keywords: i18n.language === "en" ? keywords_en : keywords_el,
        alternates: {
            canonical: `/${params.lng}/live-weather-conditions/${params.id}/${params.name}`,
            languages: {
                en: `/en/live-weather-conditions/${params.id}/${params.name}`,
                el: `/el/live-weather-conditions/${params.id}/${params.name}`,
                "x-default": `/en/live-weather-conditions/${params.id}/${params.name}`,
            },
        },
        openGraph: {
            title: t("stationIndividual.title", { station: stationName }),
            description: t("stationIndividual.description", { station: stationName }),
            url: `${configuration.metadata.site_url}/${params.lng}/live-weather-conditions/${params.id}/${params.name}`,
            siteName: t("stationIndividual.title", { station: stationName }),
            locale: i18n.language,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t("stationIndividual.title", { station: stationName }),
            description: t("stationIndividual.description", { station: stationName }),
        },
        ...(!weatherData && { robots: { index: false, follow: false } }),
    };
}

export default async function StationPageView(props: LiveWeatherConditionsProps) {
    const params = await props.params;
    const featureFlags = await getConfiguration();
    const isForecastEnabled = featureFlags.forecasts.modalForecast || false;
    const { lng, id } = params;

    const result = await getCachedLiveWeatherStationData(lng, +id, isForecastEnabled);

    if (!result.weatherData) {
        const { t } = await getT("stationUnavailable");
        return <StationUnavailable lng={lng} t={t} variant="page" />;
    }

    const { weatherData, environmentalConditions } = result;

    return (
        <>
            <StationStructuredData
                stationId={+id}
                stationName={decodeURI(properStationName(params.name))}
                lng={lng}
                routeSegment="live-weather-conditions"
                nameSegment={params.name}
            />
            <ClientPageLiveWeatherConditions
                params={params}
                weatherData={weatherData}
                environmentalConditions={environmentalConditions}
            ></ClientPageLiveWeatherConditions>
        </>
    );
}
