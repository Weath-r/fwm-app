"use client";
import { useEffect, useState } from "react";
import { useConfigurationStore } from "@/stores/configurationStore";
import { DataService } from "@/services/DataService";
import { calculateWindToBft } from "@/utils/weatherConvertUnits";
import { urlStationName } from "@/helpers/createStationName";
import { WeatherDataResponse, WeatherForecastResponse, ForecastData } from "@/types";
import CityWeatherCard, { type CityWeatherCardProps } from "@/components/Home/CityWeatherCard";
import HomepageAboutSection from "@/components/Home/HomepageAboutSection";
import HomepageWarningsSection from "@/components/Home/HomepageWarningsSection";
import HomepageStationsSection from "@/components/Home/HomepageStationsSection";
import { useT } from "@/i18n/client";

type MajorCitiesFlag = { enable: boolean; stationIds: number[] };
type HomepageProps = { lng: string };

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
        station.translations?.find((t) => t.languages_code === lng)?.name ?? station.name;

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

export default function Homepage({ lng }: HomepageProps) {
    const { t } = useT("homepage");

    const configLoaded = useConfigurationStore(
        (state) => Object.keys(state.featureFlags).length > 0
    );

    const [cityCards, setCityCards] = useState<CityWeatherCardProps[]>([]);
    const [fetchDone, setFetchDone] = useState(false);

    const cardsLoading = !configLoaded || (!fetchDone && cityCards.length === 0);

    useEffect(() => {
        let cancelled = false;
        const unwatchRef: { fn: (() => void) | null } = { fn: null };

        const fetchCards = (ids: number[]) => {
            const dataService = new DataService();
            Promise.all([
                Promise.all(
                    ids.map((id) => dataService.fetchWeatherDataByStation(id).catch(() => []))
                ),
                Promise.all(
                    ids.map((id) => dataService.fetchForecastByStation(id).catch(() => []))
                ),
            ])
                .then(([currentResults, forecastResults]) => {
                    if (cancelled) return;
                    const cards = ids
                        .map((id, index) => {
                            const current = currentResults[index][0];
                            return current
                                ? buildCityCard(id, current, forecastResults[index][0], lng)
                                : null;
                        })
                        .filter((card): card is CityWeatherCardProps => card !== null);
                    setCityCards(cards);
                    setFetchDone(true);
                })
                .catch(() => {
                    if (!cancelled) setFetchDone(true);
                });
        };

        const startFromFlags = (featureFlags: Record<string, unknown>) => {
            const majorCities = featureFlags["major_cities"] as MajorCitiesFlag | undefined;
            const ids = majorCities?.enable ? majorCities.stationIds : [];
            if (ids.length > 0) {
                fetchCards(ids);
            } else if (!cancelled) {
                setFetchDone(true);
            }
        };

        const currentFlags = useConfigurationStore.getState().featureFlags;
        if (Object.keys(currentFlags).length > 0) {
            startFromFlags(currentFlags);
        } else {
            unwatchRef.fn = useConfigurationStore.subscribe((state) => {
                if (Object.keys(state.featureFlags).length === 0) return;
                unwatchRef.fn?.();
                unwatchRef.fn = null;
                startFromFlags(state.featureFlags);
            });
        }

        return () => {
            cancelled = true;
            unwatchRef.fn?.();
        };
    }, [lng]);

    return (
        <main className="h-fit container mx-auto flex flex-col gap-4 py-8">
            <h1 className="text-xl md:text-2xl font-bold text-primary px-1">{t("h1")}</h1>

            {(cardsLoading || cityCards.length > 0) && (
                <div className="bg-white rounded-lg w-full p-4">
                    <h2 className="text-primary font-bold text-lg mb-1">
                        {t("majorCities.heading")}
                    </h2>
                    <p className="text-primary/70 text-sm mb-4">{t("majorCities.subheading")}</p>
                    {cardsLoading ? (
                        <div className="flex gap-4">
                            {[1, 2, 3, 4].map((n) => (
                                <div
                                    key={n}
                                    className="shrink-0 w-72 h-80 animate-pulse rounded-xl bg-secondary"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                            {cityCards.map((cardProps) => (
                                <div key={cardProps.city} className="snap-start shrink-0 w-72">
                                    <CityWeatherCard {...cardProps} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <HomepageWarningsSection />
            <HomepageStationsSection lng={lng} />
            <HomepageAboutSection />
        </main>
    );
}
