"use client";
import { Measurements, StationPageForecastData } from "@/types";
import { useState } from "react";
import {
    timeOnlyUtil,
    fullDateNoTime,
    dayWithNameUtilWithCustom,
    dateObjectInputDDMMYY,
} from "@/utils/dateTimeUtils";
import { useT } from "@/i18n/client";
import { useConfigurationStore } from "@/stores/configurationStore";

import BaseWeatherIcon from "@/components/BaseComponents/BaseWeatherIcon";
import SvgInline from "@/components/Common/SvgInline";
import CommonButton from "@/components/Common/CommonButton";
import { ForecastSummary } from "./components/forecast/ForecastSummary";

type handleDateSelectionBtn = {
    date: string;
};

type CalcPercipitationFn = {
    snow: number;
    percipitation: number;
    temperature: number;
    accumulated_snow: number;
};

const convertTimeStampToDate = (timestamp: number): string => {
    const dateNow = new Date(timestamp);
    return timeOnlyUtil(dateNow);
};

const convertStringToDate = (date: string): string => {
    return dayWithNameUtilWithCustom(date);
};

const setCurrentDateActive = (dateNow: Date): string => {
    if (dateNow.getHours() === 23 && dateNow.getMinutes() > 10) {
        dateNow.setDate(dateNow.getDate() + 1);
    }
    const activeDate = fullDateNoTime(dateNow);
    return activeDate;
};

export function StationWeatherForecastDetails({
    variant = "page",
    ...elem
}: StationPageForecastData & { variant?: "page" | "modal" }) {
    const { i18n } = useT("stationModal");
    const selectedLanguage = i18n.language;
    const title = i18n.getFixedT(selectedLanguage, "stationModal")("nextDays");
    const dateNow = new Date();
    const activeDate = setCurrentDateActive(dateNow);
    const { featureFlags } = useConfigurationStore();
    const isForecastSummaryEnabled = featureFlags?.forecasts?.forecastSummary;

    const [activeBtn, setActiveBtn] = useState(activeDate);
    const [forecastDate, setForecastDate] = useState(activeDate);

    const structuredForecast = Object.groupBy(elem.forecast, (forecast) => {
        const currentForecastTime = new Date(forecast.time);
        const date = fullDateNoTime(currentForecastTime);
        return date;
    });

    const handleDateSelectionBtn = ({ date }: handleDateSelectionBtn) => {
        setActiveBtn(date);
        setForecastDate(date);
    };

    const getExtremeDayValues = (date: string) => {
        const valuesArr = [];
        if (!structuredForecast[date]) return {};
        for (const value of structuredForecast[date]) {
            if (value.temperature) {
                valuesArr.push(value.temperature);
            }
        }
        return {
            max: Math.max(...valuesArr),
            min: Math.min(...valuesArr),
        };
    };

    const SNOW_MODE_TEMP = 1.5;

    const calculatePercipitation = ({
        snow,
        percipitation,
        temperature,
        accumulated_snow,
    }: CalcPercipitationFn) => {
        const isCold = temperature <= SNOW_MODE_TEMP;
        const hasAccumulatedSnow = accumulated_snow > 0;
        const hasFreshSnow = snow > 0;

        // Snow mode: cold + accumulated snow we need to show the proper suffix
        if (isCold && hasAccumulatedSnow) {
            return {
                value: hasFreshSnow ? snow : percipitation,
                suffix: Measurements.CM,
            };
        }

        // Cold but no accumulated snow -> show fresh snow only
        if (isCold && hasFreshSnow) {
            return {
                value: snow,
                suffix: Measurements.CM,
            };
        }

        // Warm weather -> rain
        return {
            value: percipitation,
            suffix: Measurements.MILLIMETER,
        };
    };

    return (
        <div className="px-4 pb-6 pt-5">
            <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wide text-primary">
                {title}
            </h4>
            {elem.forecast.length > 0 && (
                <section>
                    <div className="flex gap-2 overflow-x-auto pb-1.5">
                        {Object.keys(structuredForecast).map((item, index, datesArray) => {
                            const isActive = activeBtn === item;
                            const shouldRenderDate =
                                index === datesArray.length - 1
                                    ? true
                                    : dateObjectInputDDMMYY(item).valueOf() >=
                                        dateObjectInputDDMMYY(activeDate).valueOf()
                                      ? true
                                      : false;
                            return (
                                shouldRenderDate && (
                                    <div key={item} className="relative w-full min-w-[76px]">
                                        <CommonButton
                                            color="primary"
                                            className={`w-full rounded-xl p-2 text-sm ${
                                                isActive
                                                    ? "!bg-primary !text-white"
                                                    : "bg-light_white"
                                            }`}
                                            handleClick={() =>
                                                handleDateSelectionBtn({
                                                    date: item,
                                                })
                                            }
                                        >
                                            <div className="flex h-12 items-center gap-4 md:h-16">
                                                <div className="w-full">
                                                    <p className="text-sm font-bold">
                                                        {convertStringToDate(item)}
                                                    </p>
                                                </div>
                                                <div className="flex w-full flex-col">
                                                    <p>{getExtremeDayValues(item).max}</p>
                                                    <p>{getExtremeDayValues(item).min}</p>
                                                </div>
                                            </div>
                                        </CommonButton>
                                        {isActive && (
                                            <span className="pointer-events-none absolute inset-x-[22%] bottom-[-5px] h-[3px] rounded bg-accent shadow-[0_0_12px_#3FB6C4]" />
                                        )}
                                    </div>
                                )
                            );
                        })}
                    </div>
                    <div
                        className={`my-2 h-fit ${
                            variant === "modal"
                                ? ""
                                : "max-h-[350px] overflow-y-auto md:max-h-[300px]"
                        }`}
                        key={forecastDate}
                    >
                        {isForecastSummaryEnabled && (
                            <div className="mb-3 rounded-xl border border-accent/20 bg-secondary/60 p-3">
                                {structuredForecast[forecastDate] && (
                                    <ForecastSummary
                                        forecast={structuredForecast}
                                        activeDate={forecastDate}
                                    />
                                )}
                            </div>
                        )}

                        {structuredForecast[forecastDate] &&
                            structuredForecast[forecastDate].map(
                                (forecast, index, forecastArray) => {
                                    const forecastTime = new Date(forecast.time);
                                    const shouldRenderForecast =
                                        index === forecastArray.length - 1
                                            ? true
                                            : forecastTime.valueOf() >= dateNow.valueOf()
                                              ? true
                                              : false;

                                    const precipitation = calculatePercipitation({
                                        snow: forecast.snow || 0,
                                        percipitation: forecast.percipitation || 0,
                                        temperature: forecast.temperature || 0,
                                        accumulated_snow: forecast.accumulated_snow || 0,
                                    });

                                    return (
                                        shouldRenderForecast && (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between gap-2 border-b border-[#eef1f2] py-3 last:border-b-0"
                                            >
                                                <p className="text-primary/60">
                                                    {convertTimeStampToDate(forecast.time)}
                                                </p>
                                                <div className="size-10">
                                                    <BaseWeatherIcon
                                                        assetId={forecast.forecastIcon}
                                                        weatherDescriptionText={elem.station}
                                                    ></BaseWeatherIcon>
                                                </div>
                                                <p className="text-primary">
                                                    {forecast.temperature}
                                                    <span className="ml-1 text-sm">
                                                        {Measurements.CELCIUS}
                                                    </span>
                                                </p>
                                                <div className="flex items-center">
                                                    <div className="h-4 w-6">
                                                        <SvgInline
                                                            path="/weather_icons/wind.svg"
                                                            title="Wind icon"
                                                            className="fill-primary"
                                                            style={{
                                                                transform: `rotate(${forecast.winddir}deg)`,
                                                            }}
                                                        />
                                                    </div>
                                                    <p className="ml-1 text-primary">
                                                        {forecast.windspd}
                                                        <span className="ml-1 text-sm">
                                                            {Measurements.SPEED}
                                                        </span>
                                                    </p>
                                                </div>
                                                <p className="text-primary">
                                                    {precipitation?.value}
                                                    <span className="ml-1 text-sm">
                                                        {precipitation?.suffix}
                                                    </span>
                                                </p>
                                            </div>
                                        )
                                    );
                                }
                            )}
                    </div>
                </section>
            )}
            {elem.forecast.length === 0 && (
                <p className="text-sm text-primary">
                    {i18n.getFixedT(selectedLanguage, "stationModal")("forecastNotAvailable")}
                </p>
            )}
        </div>
    );
}
