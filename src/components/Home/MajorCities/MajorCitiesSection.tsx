import CityWeatherCard, {
    type CityWeatherCardProps,
} from "@/components/Home/MajorCities/CityWeatherCard";
import dayjs from "@/utils/dateTimeUtils";
import { DataService } from "@/services/DataService";
import { calculateWindToBft } from "@/utils/weatherConvertUnits";
import { urlStationName } from "@/helpers/createStationName";
import { resolveEnvironmentalConditions } from "@/helpers/weatherCalculations";
import { assetUrl } from "@/helpers/assetsHandling";
import {
    WeatherDataResponse,
    WeatherForecastResponse,
    ForecastData,
    StationEnvironmentalConditions,
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
    environmentalConditions: StationEnvironmentalConditions;
    lng: string;
};

const FORECAST_TIMEZONE = "Europe/Athens";

function pickForecastSlots(forecast: ForecastData[]): CityWeatherCardProps["forecast"] {
    if (!forecast.length) return [];

    const now = dayjs().tz(FORECAST_TIMEZONE);
    const todayStart = now.startOf("day");
    const nowMs = now.valueOf();
    const tomorrowStartMs = todayStart.add(1, "day").valueOf();

    const nextCanonicalMs =
        [0, 6, 12, 18]
            .map((hour) => todayStart.hour(hour).valueOf())
            .find((slotMs) => slotMs > nowMs) ?? tomorrowStartMs;

    return Array.from({ length: 4 }, (_item, slotIndex) => {
        const targetMs = nextCanonicalMs + slotIndex * 6 * 3600 * 1000;
        const closest = forecast.reduce((best, entry) =>
            Math.abs(entry.time - targetMs) < Math.abs(best.time - targetMs) ? entry : best
        );
        const hour = dayjs(targetMs).tz(FORECAST_TIMEZONE).hour();
        const isTomorrow = targetMs >= tomorrowStartMs;
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

function buildCityCard({
    stationId,
    current,
    forecastRecord,
    environmentalConditions,
    lng,
}: BuildCityCardProps): CityWeatherCardProps {
    const station = current.weather_station_id;
    const translatedName =
        station.translations?.find((translation) => translation.languages_code === lng)?.name ??
        station.name;

    return {
        city: translatedName,
        imageSrc: assetUrl(current.weather_station_id.header_bg),
        currentAssetId: current.weather_condition_icon ?? "",
        currentDescription: current.weather_condition ?? "",
        currentTemp: Math.round(current.temperature),
        windBeaufort: calculateWindToBft(current.windspd),
        rainMm: Math.round((current.percipitation ?? 0) * 10) / 10,
        forecast: pickForecastSlots(forecastRecord?.full_forecast ?? []),
        href: `/${lng}/station/${stationId}/${urlStationName(translatedName)}`,
        environmentalConditions,
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

    // Indexed per station slot rather than over a flattened list, so a station
    // whose current weather failed cannot shift the others out of alignment.
    // Environmental data is supplementary: a failure degrades that card's
    // readings to null instead of dropping the card or breaking the section.
    const environmentalDataResults = await Promise.all(
        currentResults.map((stationCurrent, index) => {
            const clusterId = stationCurrent[0]?.weather_station_id.cluster;
            if (clusterId === undefined) {
                return Promise.resolve(null);
            }
            return dataService.fetchEnvironmentalDataByStation(clusterId).catch((error) => {
                console.error(
                    `Environmental data unavailable for station ${stationIds[index]} (cluster ${clusterId}):`,
                    error
                );
                return null;
            });
        })
    );

    const cityCards = stationIds
        .map((stationId, index) => {
            const current = currentResults[index][0];
            return current
                ? buildCityCard({
                      stationId,
                      current,
                      forecastRecord: forecastResults[index][0],
                      environmentalConditions: resolveEnvironmentalConditions(
                          environmentalDataResults[index]
                      ),
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
