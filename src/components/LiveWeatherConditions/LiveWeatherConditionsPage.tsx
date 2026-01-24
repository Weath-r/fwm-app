"use client";
import { WeatherData } from "@/types";
import { StationModalHeading } from "@/components/LiveWeatherConditions/components/StationModalHeading";
import { StationModalBody } from "@/components/LiveWeatherConditions/components/StationModalBody";
import { StationWeatherForecastDetails } from "./StationWeatherForecastDetails";
import { BackToHomepageButton } from "./buttons/BackToHomepageButton";
import StationLink from "@/components/Common/StationLink";

import { useConfigurationStore } from "@/stores/configurationStore";
import { useT } from "@/i18n/client";

type StationPageProps = {
    params: {
        id: string;
        name: string;
        lng: string;
    },
    weatherData: WeatherData[];
};

export default function LiveWeatherConditionsPage({ weatherData, params }: StationPageProps) {
    const { featureFlags } = useConfigurationStore();
    const isFullStationPageEnabled = featureFlags?.standalone_station?.moreDetailsModalUrl;
    const { i18n } = useT("stationModal");
    const selectedLanguage = i18n.language;

    return (
        weatherData.map((elem: WeatherData) => {
            return (
                <div className="relative flex h-full flex-col gap-2 text-black" key={elem.station.id}>
                    <BackToHomepageButton language={params.lng} />
                    <StationModalHeading {...elem } />

                    <StationModalBody {...elem} />
                    <StationWeatherForecastDetails {...elem} />
                    {isFullStationPageEnabled && (
                        <div className="flex justify-center">
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
        })
    );
}
