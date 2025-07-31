import { FthiotidaForecastObject } from "@/types";
import FthiotidaForecastsIndividualForecastCard from "./FthiotidaForecastsIndividualForecastCard";
import FthiotidaForecastsIndividualWindCard from "./FthiotidaForecastsIndividualWindCard";
import { useEffect, useState } from "react";
import { locationsObject, LocationMetadata } from "@/helpers/fthiotidaForecastLocations";

type ForecastsSectionProps = {
    forecasts: { [key: string]: FthiotidaForecastObject };
};

type StructuredForecast = Record<
    string,
    {
        forecast: FthiotidaForecastObject;
        metadata: LocationMetadata;
    }[]
>;
export default function FthioridaForecastsSection(props: Readonly<ForecastsSectionProps>) {
    const [structuredForecast, setStructuredForecast] = useState<StructuredForecast>({ wind: [], forecast: [] });

    useEffect(() => {
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
        setStructuredForecast(groupedForecasts);
    }, [props.forecasts]);

    return (
        <section className="my-4">
            <h3 className="my-2 text-lg font-semibold text-primary">
                Forecasts
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
                {structuredForecast["forecast"].map((elem,index) => {
                    return <FthiotidaForecastsIndividualForecastCard
                        key={`${elem.metadata.label}-${index}`}
                        metadata={elem.metadata}
                        forecast={elem.forecast}
                    ></FthiotidaForecastsIndividualForecastCard>;
                })}
            </div>
            <h3 className="my-2 text-lg font-semibold text-primary">
                Winds
            </h3>
            <div className="flex gap-1 overflow-hidden overflow-x-auto overscroll-contain py-3">
                {structuredForecast["wind"].map((elem,index) => {
                    return <FthiotidaForecastsIndividualWindCard
                        key={index}
                        metadata={elem.metadata}
                        forecast={elem.forecast}
                    ></FthiotidaForecastsIndividualWindCard>;
                })}
            </div>
        
        </section>
    );
}