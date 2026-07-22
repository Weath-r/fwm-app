import { DataService } from "@/services/DataService";
import { WeatherDataResponse } from "@/types";
import { calculateWindToBft } from "@/utils/weatherConvertUnits";
import { urlStationName } from "@/helpers/createStationName";
import HomepageStationsSectionView, {
    type StationCardData,
} from "@/components/Home/Stations/HomepageStationsSectionView";

type HomepageStationsSectionProps = {
    lng: string;
};

function toCardData(station: WeatherDataResponse, lng: string): StationCardData {
    const weatherStation = station.weather_station_id;
    const translatedName =
        weatherStation.translations?.find((translation) => translation.languages_code === lng)
            ?.name ?? weatherStation.name;
    const prefectureName =
        weatherStation.prefecture_id.translations?.find(
            (translation) => translation.languages_code === lng
        )?.name ?? weatherStation.prefecture_id.label;
    return {
        id: weatherStation.id,
        translatedName,
        prefectureKey: weatherStation.prefecture_id.label,
        prefectureName,
        conditionIcon: station.weather_condition_icon ?? "",
        conditionText: station.weather_condition ?? "",
        temperature: Math.round(station.temperature),
        windBeaufort: calculateWindToBft(station.windspd),
        rainMm: Math.round((station.percipitation ?? 0) * 10) / 10,
        href: `/${lng}/station/${weatherStation.id}/${urlStationName(translatedName)}`,
    };
}

export default async function HomepageStationsSection({ lng }: HomepageStationsSectionProps) {
    const dataService = new DataService();
    const cards = await dataService
        .fetchWeatherStationsWithData()
        .then((data) => data.map((stationData) => toCardData(stationData, lng)))
        .catch(() => [] as StationCardData[]);

    if (cards.length === 0) return null;

    return <HomepageStationsSectionView lng={lng} cards={cards} />;
}
