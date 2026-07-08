"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WeatherData, Measurements } from "@/types";
import { timeFromNowUtil } from "@/utils/dateTimeUtils";
import { useT } from "@/i18n/client";
import {
    MapPinIcon,
    ClockIcon,
    ShareIcon,
    HeartIcon,
    ChevronLeftIcon,
} from "@heroicons/react/24/solid";
import { windDirectionCalc } from "@/helpers/weatherCalculations";
import { useAppStore } from "@/hooks/useAppStore";
import BaseWeatherIcon from "@/components/BaseComponents/BaseWeatherIcon";
import HeroBackground from "./HeroBackground";
import { FrostWarning } from "./FrostWarning";
import { Share } from "@/components/Common/Share/";

type StationHeroProps = WeatherData & {
    variant?: "page" | "modal";
    language: string;
};

export function StationModalHeading({
    variant = "page",
    language,
    ...elem
}: Readonly<StationHeroProps>) {
    const { i18n } = useT("stationModal");
    const { i18n: i18n_icons } = useT("weather_icons");
    const { i18n: i18n_conditions } = useT("weather_conditions");
    const selectedLanguage = i18n.language;
    const pathname = usePathname();

    const { isStationFavourite, handleFavouriteStationButton } = useAppStore();
    const isFavourite = isStationFavourite(elem.station.id);

    const isPage = variant === "page";
    const conditionLabel = i18n_icons.getFixedT(
        selectedLanguage,
        "weather_icons"
    )(elem.weatherDescription);

    const stationNameElement = elem.station.website_url.includes("http") ? (
        <a href={elem.station.website_url} target="_blank" rel="noreferrer" className="text-white">
            {elem.station.name}
        </a>
    ) : (
        <span>{elem.station.name}</span>
    );

    const shareData: ShareData = {
        title: i18n.getFixedT(
            selectedLanguage,
            "stationModal",
            "shareStationData"
        )("title", { stationName: elem.station.name }),
        text: i18n.getFixedT(
            selectedLanguage,
            "stationModal",
            "shareStationData"
        )("text", {
            stationName: elem.station.name,
            condition: conditionLabel,
            temp: elem.temperature,
            humidity: elem.humidity,
            windDir: i18n_conditions.getFixedT(
                selectedLanguage,
                "weather_conditions",
                "windDir"
            )(windDirectionCalc(elem.winddir)),
            windSpeed: elem.windspd,
            precip: elem.percipitation,
        }),
        url: `https://myweathr.com${pathname}`,
    };

    return (
        <div
            className={`relative isolate flex flex-col overflow-hidden px-5 pt-4 text-white ${
                isPage ? "min-h-[250px]" : "min-h-[212px]"
            }`}
        >
            <HeroBackground
                headerBackground={elem.station.header_bg}
                weatherDescription={elem.weatherDescription}
                dateCreated={elem.dateCreated}
                altText={`${elem.station.name} — ${conditionLabel}`}
            />

            <div className="flex items-center gap-2 [text-shadow:0_1px_8px_rgba(0,0,0,.4)]">
                {isPage && (
                    <Link
                        href={`/${language}`}
                        aria-label="Go to homepage"
                        title="Go to homepage"
                        className="lw-icon-btn"
                    >
                        <ChevronLeftIcon className="size-4 fill-white" />
                    </Link>
                )}
                <div className="ml-auto flex items-center gap-2">
                    {elem.frost_data && elem.frost_data.frost_level > 0 && (
                        <span className="flex items-center rounded-full border border-white/35 bg-white/85 px-2 py-1 backdrop-blur">
                            <FrostWarning warningLevel={elem.frost_data.frost_level} />
                        </span>
                    )}
                    <button
                        type="button"
                        onClick={() => handleFavouriteStationButton(elem.station.id)}
                        aria-label="Toggle favorite"
                        title="Toggle favorite"
                        className="lw-icon-btn"
                    >
                        <HeartIcon
                            className={`size-4 ${isFavourite ? "fill-[#ff6b81]" : "fill-white"}`}
                        />
                    </button>
                    <div className="lw-share">
                        <Share shareData={shareData}>
                            <ShareIcon className="size-4 fill-white" />
                        </Share>
                    </div>
                </div>
            </div>

            <div className="mt-auto pb-10">
                {isPage ? (
                    <h1 className="truncate text-[30px] font-extrabold leading-tight [text-shadow:0_2px_14px_rgba(0,0,0,.5)]">
                        {stationNameElement}
                    </h1>
                ) : (
                    <h2 className="truncate text-2xl font-extrabold leading-tight [text-shadow:0_2px_14px_rgba(0,0,0,.5)]">
                        {stationNameElement}
                    </h2>
                )}

                <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,.5)]">
                    <span className="inline-flex items-center gap-1">
                        <MapPinIcon className="size-3.5 fill-white/85" />
                        {elem.station.prefecture_id.label}
                    </span>
                    {isPage && elem.station.elevation != null && (
                        <>
                            <span className="opacity-50">·</span>
                            <span>
                                {elem.station.elevation} {Measurements.METER}
                            </span>
                        </>
                    )}
                    <span className="opacity-50">·</span>
                    <span className="inline-flex items-center gap-1">
                        <ClockIcon className="size-3.5 fill-white/85" />
                        {i18n.getFixedT(selectedLanguage, "stationModal")("lastUpdated")}{" "}
                        {timeFromNowUtil(elem.dateCreated)}
                    </span>
                </div>

                <div className="mt-4 flex items-center gap-3.5 mb-2">
                    <div className={isPage ? "size-16" : "size-12"}>
                        <BaseWeatherIcon
                            assetId={elem.assetId}
                            weatherDescriptionText={elem.weatherDescription}
                        />
                    </div>
                    <div
                        className={`flex items-start font-extrabold leading-none tracking-tight [text-shadow:0_2px_18px_rgba(0,0,0,.45)] ${
                            isPage ? "text-[60px]" : "text-[50px]"
                        }`}
                    >
                        {elem.temperature}
                        <span className={`mt-1.5 font-bold ${isPage ? "text-[26px]" : "text-xl"}`}>
                            {Measurements.CELCIUS}
                        </span>
                    </div>
                    <div className="self-center text-base font-semibold capitalize [text-shadow:0_1px_8px_rgba(0,0,0,.5)]">
                        {conditionLabel}
                    </div>
                </div>
            </div>
        </div>
    );
}
