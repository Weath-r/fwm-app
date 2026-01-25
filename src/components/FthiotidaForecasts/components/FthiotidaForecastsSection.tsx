import { FthiotidaForecastObject } from "@/types";
import FthiotidaForecastsIndividualForecastCard from "./FthiotidaForecastsIndividualForecastCard";
import FthiotidaForecastsIndividualWindCard from "./FthiotidaForecastsIndividualWindCard";
import { useState } from "react";
import { locationsObject, LocationMetadata } from "@/helpers/fthiotidaForecastLocations";

type ForecastsSectionProps = {
    forecasts: { [key: string]: FthiotidaForecastObject };
    i18n: any;
};

type StructuredForecast = Record<
    string,
    {
        forecast: FthiotidaForecastObject;
        metadata: LocationMetadata;
    }[]
>;
export default function FthioridaForecastsSection(props: Readonly<ForecastsSectionProps>) {
    const selectedLanguage = props.i18n.language;

    const groupedForecasts = Object.keys(props.forecasts).reduce(
        (accumulator, currentValue) => {
            const location = currentValue.toLowerCase();
            const forecastType = locationsObject[location]?.type || "forecast";
            if (!accumulator[forecastType]) {
                accumulator[forecastType] = [];
            }
            accumulator[forecastType].push({
                forecast: props.forecasts[currentValue],
                metadata: locationsObject[location],
            });
            return accumulator;
        },
        { wind: [], forecast: [] } as StructuredForecast
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [structuredForecast, setStructuredForecast] =
        useState<StructuredForecast>(groupedForecasts);

    return (
        <section>
            <h3 className="my-2 text-lg font-semibold text-primary">
                {props.i18n.getFixedT(
                    selectedLanguage,
                    "forecasts"
                )("FthiotidaForecasts.weatherConditions")}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
                {structuredForecast["forecast"].map((elem, index) => {
                    return (
                        <FthiotidaForecastsIndividualForecastCard
                            key={`${elem.metadata.value}-${index}`}
                            metadata={elem.metadata}
                            forecast={elem.forecast}
                            i18n={props.i18n}
                        ></FthiotidaForecastsIndividualForecastCard>
                    );
                })}
            </div>
            <h3 className="my-4 text-lg font-semibold text-primary">
                {props.i18n.getFixedT(selectedLanguage, "forecasts")("FthiotidaForecasts.winds")}
            </h3>
            <div className="flex gap-1 overflow-hidden overflow-x-auto overscroll-contain py-3">
                {structuredForecast["wind"].map((elem, index) => {
                    return (
                        <FthiotidaForecastsIndividualWindCard
                            key={index}
                            metadata={elem.metadata}
                            forecast={elem.forecast}
                            i18n={props.i18n}
                        ></FthiotidaForecastsIndividualWindCard>
                    );
                })}
            </div>
        </section>
    );
}
