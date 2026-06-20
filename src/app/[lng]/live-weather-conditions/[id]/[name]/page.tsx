import ClientPageLiveWeatherConditions from "./page.client";
import { getT } from "@/i18n";
import { properStationName } from "@/helpers/createStationName";
import { FetchLiveWeatherStationData } from "@/components/LiveWeatherConditions/helpers/fetchWeatherData";
import { getConfiguration } from "@/services/getConfiguration";

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
            },
        },
        openGraph: {
            title: t("stationIndividual.title", { station: stationName }),
            description: t("stationIndividual.description", { station: stationName }),
            url: `https://myweathr.com/${params.lng}/live-weather-conditions/${params.id}/${params.name}`,
            siteName: t("stationIndividual.title", { station: stationName }),
            locale: i18n.language,
            type: "website",
        },
    };
}

export default async function StationPageView(props: LiveWeatherConditionsProps) {
    const params = await props.params;
    const featureFlags = await getConfiguration();
    const isForecastEnabled = featureFlags.forecasts.modalForecast || false;
    const { lng, id } = params;

    const { weatherData } = await FetchLiveWeatherStationData({
        lng,
        stationId: +id,
        isForecastEnabled,
    });
    return (
        <ClientPageLiveWeatherConditions
            params={params}
            weatherData={weatherData}
        ></ClientPageLiveWeatherConditions>
    );
}
