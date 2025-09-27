import LiveWeatherConditionsPage from "@/components/LiveWeatherConditions/LiveWeatherConditionsPage";
import { getT } from "@/i18n";
import { properStationName } from "@/helpers/createStationName";
import { FetchLiveWeatherStationData } from "@/components/LiveWeatherConditions/helpers/fetchWeatherDara";

import { StationParamsUrlProp } from "@/types";

type LiveWeatherConditionsProps = {
    params: {
        id: string;
        name: string;
        lng: string;
    },
    searchParams: StationParamsUrlProp
};

export async function generateMetadata({ params }: LiveWeatherConditionsProps) {
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
        `weather station ${stationName}`
    ];
    const keywords_el = [
        `${stationName} καιρός`, 
        `${stationName} μετεωρολογικός σταθμός`,
        `καιρικές συνθήκες ${stationName}`,
        `καιρός αύριο ${stationName}`,
        "προσωπικός μετεωρολογικός σταθμός",
        "μετεωρολογικά δεδομένα",
        `σταθμός καιρού ${stationName}`
    ];
    
    return {
        title: t("stationIndividual.title", { station: stationName }),
        description: t("stationIndividual.description", { station: stationName }),
        keywords: i18n.language === "en" ? keywords_en : keywords_el,
    };
}

export default async function StationPageView({ params, searchParams }: LiveWeatherConditionsProps) {
    const { id, lng } = params;

    const isForecastEnabled = !!searchParams.isForecastEnabled || false;

    const { weatherData } = await FetchLiveWeatherStationData({
        lng,
        stationId: +id,
        isForecastEnabled,
    });

    return (
        <main className="flex flex-1 flex-col">
            <div className="mx-2 md:container md:mx-auto">
                <div className="my-4 w-full overflow-x-scroll rounded-xl bg-white p-4 drop-shadow-md md:overflow-x-auto">
                    <LiveWeatherConditionsPage params={params} weatherData={weatherData} />
                </div>
            </div>
        </main>
    );
}