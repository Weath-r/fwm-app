"use client";
import { StationEnvironmentalConditions, WeatherData } from "@/types";
import { StationModalHeading } from "@/components/LiveWeatherConditions/components/StationModalHeading";
import { StationModalBody } from "@/components/LiveWeatherConditions/components/StationModalBody";
import { StationWeatherForecastDetails } from "./StationWeatherForecastDetails";
import StationLink from "@/components/Common/StationLink";

import { useConfigurationStore } from "@/stores/configurationStore";
import { useT } from "@/i18n/client";

type StationPageProps = {
    params: {
        id: string;
        name: string;
        lng: string;
    };
    weatherData: WeatherData[];
    environmentalConditions: StationEnvironmentalConditions;
    variant?: "page" | "modal";
};

export default function LiveWeatherConditionsPage({
    weatherData,
    params,
    environmentalConditions,
    variant = "page",
}: StationPageProps) {
    const { featureFlags } = useConfigurationStore();
    const isFullStationPageEnabled = featureFlags?.standalone_station?.moreDetailsModalUrl;
    const { i18n } = useT("stationModal");
    const selectedLanguage = i18n.language;
    const isPage = variant === "page";
    const fullForecastData = {
        forecast: weatherData[0].full_forecast || [],
        station: weatherData[0].station.name,
    };

    return weatherData.map((elem: WeatherData) => {
        return (
            <div
                className={`relative flex flex-col ${isPage ? "h-full" : ""}`}
                key={elem.station.id}
            >
                <StationModalHeading
                    {...elem}
                    environmentalConditions={environmentalConditions}
                    variant={variant}
                    language={params.lng}
                />
                <StationModalBody {...elem} variant={variant} />
                <StationWeatherForecastDetails {...fullForecastData} variant={variant} />
                {isFullStationPageEnabled && (
                    <div className="flex justify-center px-4 pb-6 pt-1">
                        <StationLink
                            stationId={elem.station.id}
                            stationName={elem.station.name}
                            pageName="station"
                            lang={selectedLanguage}
                            className="text-sm font-bold uppercase text-primary"
                        >
                            {i18n.getFixedT(selectedLanguage, "stationModal")("moreDetails")}
                        </StationLink>
                    </div>
                )}
            </div>
        );
    });
}
