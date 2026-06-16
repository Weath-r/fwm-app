import CityWeatherCard, {
    type CityWeatherCardProps,
} from "@/components/Home/MajorCities/CityWeatherCard";
import { DataService } from "@/services/DataService";
import { calculateWindToBft } from "@/utils/weatherConvertUnits";
import { urlStationName } from "@/helpers/createStationName";
import { WeatherDataResponse, WeatherForecastResponse, ForecastData } from "@/types";

type MajorCitiesSectionProps = {
    stationIds: number[];
    lng: string;
    heading: string;
    subheading: string;
};

function pickForecastSlots(forecast: ForecastData[]): CityWeatherCardProps["forecast"] {
    if (!forecast.length) return [];

    const now = new Date();
    const nowMs = now.getTime();
    const todayStartMs = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const nextCanonicalMs =
        [0, 6, 12, 18]
            .map((hour) => todayStartMs + hour * 3600 * 1000)
            .find((slotMs) => slotMs > nowMs) ?? todayStartMs + 24 * 3600 * 1000;

    return Array.from({ length: 4 }, (_item, slotIndex) => {
        const targetMs = nextCanonicalMs + slotIndex * 6 * 3600 * 1000;
        const closest = forecast.reduce((best, entry) =>
            Math.abs(entry.time - targetMs) < Math.abs(best.time - targetMs) ? entry : best
        );
        const slotDate = new Date(targetMs);
        const hour = slotDate.getHours();
        const isTomorrow = targetMs >= todayStartMs + 24 * 3600 * 1000;
        const timeLabel = isTomorrow
            ? `+1 ${String(hour).padStart(2, "0")}:00`
            : `${String(hour).padStart(2, "0")}:00`;
        return {
            time: timeLabel,
            temp: Math.round(closest.temperature),
            assetId: closest.forecastIcon ?? "",
            description: `${String(hour).padStart(2, "0")}:00 forecast`,
        };
    });
}

function buildCityCard(
    stationId: number,
    current: WeatherDataResponse,
    forecastRecord: WeatherForecastResponse | undefined,
    lng: string
): CityWeatherCardProps {
    const station = current.weather_station_id;
    const translatedName =
        station.translations?.find((translation) => translation.languages_code === lng)?.name ??
        station.name;

    return {
        city: translatedName,
        imageSrc: `/assets/cities/${urlStationName(station.name).toLowerCase()}.jpg`,
        currentAssetId: current.weather_condition_icon ?? "",
        currentDescription: current.weather_condition ?? "",
        currentTemp: Math.round(current.temperature),
        windBeaufort: calculateWindToBft(current.windspd),
        rainMm: Math.round((current.percipitation ?? 0) * 10) / 10,
        forecast: pickForecastSlots(forecastRecord?.full_forecast ?? []),
        href: `/${lng}/station/${stationId}/${urlStationName(translatedName)}`,
    };
}

export default async function MajorCitiesSection({
    stationIds,
    lng,
    heading,
    subheading,
}: MajorCitiesSectionProps) {
    const dataService = new DataService();

    const [currentResults, forecastResults] = await Promise.all([
        Promise.all(
            stationIds.map((stationId) =>
                dataService.fetchWeatherDataByStation(stationId).catch(() => [])
            )
        ),
        Promise.all(
            stationIds.map((stationId) =>
                dataService.fetchForecastByStation(stationId).catch(() => [])
            )
        ),
    ]);

    const cityCards = stationIds
        .map((stationId, index) => {
            const current = currentResults[index][0];
            return current
                ? buildCityCard(stationId, current, forecastResults[index][0], lng)
                : null;
        })
        .filter((card): card is CityWeatherCardProps => card !== null);

    if (cityCards.length === 0) return null;

    return (
        <section className="bg-white rounded-lg w-full p-4">
            <h2 className="text-primary font-bold text-lg mb-1">{heading}</h2>
            <p className="text-primary/70 text-sm mb-4">{subheading}</p>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                {cityCards.map((cardProps) => (
                    <div key={cardProps.city} className="snap-start shrink-0 w-72">
                        <CityWeatherCard {...cardProps} />
                    </div>
                ))}
            </div>
        </section>
    );
}
