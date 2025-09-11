import StationPage from "@/components/StationPage/StationPage";
import { DataService } from "@/services/DataService";
import { properStationName } from "@/helpers/createStationName";
import { getT } from "@/i18n";

type StationPageProps = {
    params: {
        id: string;
        name: string;
        lng: string;
    }
};

export async function generateMetadata({ params }: StationPageProps) {
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

export default async function StationPageView({ params }: StationPageProps) {
    const dataService = new DataService();
    const end_date = "$NOW";
    const start_date = "$NOW(-1 month)";
    const currentWeather = await dataService.fetchWeatherDataByStationPaginated({
        station_id: +params.id,
        start_date,
        end_date,
        page: 1,
        limit: -1,
    });
    const { lng } = params;

    const translatedResponse = currentWeather.map(station => {
        if (station.weather_station_id.translations) {
            const translatedStationName = station.weather_station_id.translations.find(t => t.languages_code === lng);
            if (translatedStationName) {
                station.weather_station_id.name = translatedStationName.name;
            }
        }
        return station;
    });

    return (
        <>
            <StationPage params={params} weatherData={translatedResponse} />
        </>
    );
}