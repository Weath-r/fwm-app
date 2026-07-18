import { CurrentWeatherShareableCard } from "@/components/ShareableCards/CurrentWeatherShareableCard";
import { StationUnavailableShareableCard } from "@/components/ShareableCards/StationUnavailableShareableCard";
import { FetchLiveWeatherStationData } from "@/components/LiveWeatherConditions/helpers/fetchWeatherData";
import { getT } from "@/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
    params: Promise<{ id: string; lng: string }>;
};

export default async function Image({ params }: Props) {
    const { id, lng } = await params;

    const { i18n } = await getT("shareableCards", { keyPrefix: "currentWeather" });
    i18n.changeLanguage(lng);

    const { weatherData } = await FetchLiveWeatherStationData({
        lng,
        stationId: +id,
        isForecastEnabled: false,
    });

    if (!weatherData) {
        return StationUnavailableShareableCard(lng);
    }

    const data = weatherData[0];

    return CurrentWeatherShareableCard({
        stationName: data.station.name,
        weatherDescription: data.weatherDescription,
        temperature: data.temperature,
        humidity: data.humidity,
        precipitation: data.percipitation,
        windSpeed: data.windspd,
        weatherIcon: data.assetId,
    });
}
