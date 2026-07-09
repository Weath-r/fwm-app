import CityWeatherCard, {
    type CityWeatherCardProps,
} from "@/components/Home/MajorCities/CityWeatherCard";
import { DataService } from "@/services/DataService";
import { calculateWindToBft } from "@/utils/weatherConvertUnits";
import { urlStationName } from "@/helpers/createStationName";
import {
    WeatherDataResponse,
    WeatherForecastResponse,
    ForecastData,
    EnvironmentalData,
} from "@/types";

type MajorCitiesSectionProps = {
    stationIds: number[];
    lng: string;
    heading: string;
    subheading: string;
};

type BuildCityCardProps = {
    stationId: number;
    current: WeatherDataResponse;
    forecastRecord: WeatherForecastResponse | undefined;
    environmentalData: EnvironmentalData;
    lng: string;
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

function pickEnvironmentalData(environmentalData: EnvironmentalData): EnvironmentalData {
    if (!environmentalData.hourly || !environmentalData.hourly.time.length) {
        return environmentalData;
    }
    const now = new Date();

    const nearestIndex = environmentalData.hourly.time.reduce((nearestIdx, timeStr, idx) => {
        const timeMs = new Date(timeStr).getTime();
        const nowMs = now.getTime();
        const nearestTimeMs = new Date(environmentalData.hourly.time[nearestIdx]).getTime();
        return Math.abs(timeMs - nowMs) < Math.abs(nearestTimeMs - nowMs) ? idx : nearestIdx;
    }, 0);

    const pickedEnvironmentalData = {
        cluster: environmentalData.cluster,
        current: environmentalData.current,
        hourly: {
            time: [environmentalData.hourly.time[nearestIndex]],
            uv_index: [environmentalData.hourly.uv_index[nearestIndex]],
            european_aqi: [environmentalData.hourly.european_aqi[nearestIndex]],
        },
        units: environmentalData.units,
        date_updated: environmentalData.date_updated,
    };

    return pickedEnvironmentalData;
}

function buildCityCard({
    stationId,
    current,
    forecastRecord,
    environmentalData,
    lng,
}: BuildCityCardProps): CityWeatherCardProps {
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
        environmental: pickEnvironmentalData(environmentalData),
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

    const findClusterIds = currentResults.flat().map((result) => result.weather_station_id.cluster);

    const environmentalDataResults = await Promise.all(
        findClusterIds.map((clusterId) =>
            dataService.fetchEnvironmentalDataByStation(clusterId).catch(() => [])
        )
    );

    const cityCards = stationIds
        .map((stationId, index) => {
            const current = currentResults[index][0];
            const environmentalData = environmentalDataResults[index][0];
            return current
                ? buildCityCard({
                      stationId,
                      current,
                      forecastRecord: forecastResults[index][0],
                      environmentalData,
                      lng,
                  })
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
