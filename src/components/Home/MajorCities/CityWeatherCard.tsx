"use client";
import Image from "next/image";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import BaseWeatherIcon from "@/components/BaseComponents/BaseWeatherIcon";
import { useT } from "@/i18n/client";
import { Measurements } from "@/types/measurements";
import { StationEnvironmentalConditions } from "@/types";
import SVGInline from "@/components/Common/SvgInline";
import { AirQualityCalculateCategory, UVCalculateCategory } from "@/helpers/weatherCalculations";
import { AirQualityColorList, UVColorList } from "@/constants/Colors";

type ForecastSlot = {
    time: string;
    temp: number;
    assetId: string;
    description: string;
};

export type CityWeatherCardProps = {
    city: string;
    imageSrc: string;
    currentAssetId: string;
    currentDescription: string;
    currentTemp: number;
    windBeaufort: number;
    rainMm: number;
    forecast: ForecastSlot[];
    href: string;
    environmentalConditions: StationEnvironmentalConditions;
};

export default function CityWeatherCard({
    city,
    imageSrc,
    currentAssetId,
    currentDescription,
    currentTemp,
    windBeaufort,
    rainMm,
    forecast,
    href,
    environmentalConditions,
}: Readonly<CityWeatherCardProps>) {
    const { t } = useT("weather_conditions");
    const { t: tUv } = useT("uv");
    const { t: tAqi } = useT("aqi");
    const posthog = usePostHog();

    const { uvIndex, airQualityIndex } = environmentalConditions;
    const uvCategory = uvIndex !== null ? UVCalculateCategory(uvIndex) : null;
    const uvColor = uvCategory ? UVColorList[uvCategory] : undefined;
    const aqiCategory =
        airQualityIndex !== null ? AirQualityCalculateCategory(airQualityIndex) : null;
    const aqiColor = aqiCategory ? AirQualityColorList[aqiCategory] : undefined;

    return (
        <Link
            href={href}
            onClick={() =>
                posthog?.capture("homepage_city_card_clicked", {
                    city,
                    href,
                })
            }
            className="group flex flex-col rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full"
        >
            <div className="relative h-52 overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={`${city} cityscape`}
                    fill
                    sizes="(max-width: 640px) 80vw, 288px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/65 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-4 z-10">
                    <div className="size-16 mb-1">
                        <BaseWeatherIcon
                            assetId={currentAssetId}
                            weatherDescriptionText={currentDescription}
                        />
                    </div>
                    <h2 className="text-white text-xl font-bold tracking-wide">{city}</h2>
                    <span className="text-secondary text-4xl font-bold leading-snug">
                        {currentTemp}
                        {Measurements.CELCIUS}
                    </span>
                </div>
            </div>

            <div className="bg-primary flex flex-col gap-3 px-4 pt-3 pb-4 flex-1">
                <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                        <p className="text-secondary text-sm font-bold leading-tight">
                            {windBeaufort} {Measurements.BFT}
                        </p>
                        <p className="text-secondary/60 text-[10px] uppercase tracking-wider">
                            {t("wind")}
                        </p>
                    </div>
                    <div className="w-px h-7 bg-secondary/20" />
                    <div className="text-center">
                        <p className="text-secondary text-sm font-bold leading-tight">
                            {rainMm} {Measurements.MILLIMETER}
                        </p>
                        <p className="text-secondary/60 text-[10px] uppercase tracking-wider">
                            {t("rain")}
                        </p>
                    </div>
                </div>

                <div className="border-t border-secondary/20" />
                <div className="flex flex-col gap-2 text-secondary py-1 text-sm">
                    {uvIndex !== null && uvIndex > 0 && (
                        <>
                            <div className="flex items-center gap-1">
                                <SVGInline
                                    path="/weather_icons/v2/uv.svg"
                                    title={tUv("title")}
                                    style={{ stroke: uvColor, opacity: 1 }}
                                    className="inline-block size-4"
                                />
                                <p className="text-xs">
                                    <span>UV</span>
                                    <span className="font-bold mx-1 inline-block">{uvIndex}</span>·
                                    <span
                                        className="font-bold inline-block ml-1"
                                        style={{ color: uvColor }}
                                    >
                                        {tUv(`category.${uvCategory}`)}
                                    </span>
                                </p>
                            </div>
                        </>
                    )}
                    {uvIndex === 0 && (
                        <>
                            <div className="flex items-center gap-1">
                                <SVGInline
                                    path="/weather_icons/v2/uv_zero.svg"
                                    title={tUv("title")}
                                    style={{ fill: uvColor, opacity: 0.4 }}
                                    className="inline-block size-4"
                                />
                                <p className="text-secondary/40 text-xs">{tUv("compact.night")}</p>
                            </div>
                        </>
                    )}
                    {aqiCategory && (
                        <div className="flex items-center gap-1 ">
                            <SVGInline
                                path="/weather_icons/v2/aqi.svg"
                                title={tAqi("title")}
                                style={{ fill: aqiColor }}
                                className="inline-block size-4"
                            />
                            <p className="text-xs">
                                <span className="inline-block mr-1">{tAqi("homepageTitle")}</span>·
                                <span
                                    className="font-bold inline-block ml-1"
                                    style={{ color: aqiColor }}
                                >
                                    {tAqi(`category.${aqiCategory}`)}
                                </span>
                            </p>
                        </div>
                    )}
                </div>

                <div className="border-t border-secondary/20" />

                <div className="grid grid-cols-4 gap-1">
                    {forecast.map((slot) => (
                        <div key={slot.time} className="flex flex-col items-center gap-1">
                            <span className="text-secondary/60 text-[10px] font-medium">
                                {slot.time}
                            </span>
                            <div className="size-6">
                                <BaseWeatherIcon
                                    assetId={slot.assetId}
                                    weatherDescriptionText={slot.description}
                                />
                            </div>
                            <span className="text-secondary text-xs font-semibold">
                                {slot.temp}
                                {Measurements.CELCIUS}
                            </span>
                        </div>
                    ))}
                </div>

                <p className="text-right text-secondary/50 text-xs mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    View details
                </p>
            </div>
        </Link>
    );
}
