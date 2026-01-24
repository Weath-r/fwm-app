"use client";
import { WeatherData } from "@/types";

import { Dialog, DialogContent, DialogTrigger } from "@/components/Common/CommonDialog";
import { StationModalHeading } from "@/components/LiveWeatherConditions/components/StationModalHeading";
import { StationModalBody } from "@/components/LiveWeatherConditions/components/StationModalBody";

import { StationWeatherForecastDetails } from "@/components/LiveWeatherConditions/StationWeatherForecastDetails";
import { CloseModalButton } from "@/components/LiveWeatherConditions/buttons/CloseModalButton";
import StationLink from "@/components/Common/StationLink";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useConfigurationStore } from "@/stores/configurationStore";
import { useT } from "@/i18n/client";

type StationPageProps = {
    params: {
        id: string;
        name: string;
        lng: string;
    };
    weatherData: WeatherData[];
};

export default function LiveWeatherConditionsModalPage({ params, weatherData }: StationPageProps) {
    const { i18n } = useT("stationModal");
    const selectedLanguage = i18n.language;
    const { featureFlags } = useConfigurationStore();
    const isFullStationPageEnabled = featureFlags?.standalone_station?.moreDetailsModalUrl;

    const router = useRouter();
    const dialogTitle = (
        <div className="text-sm font-bold uppercase text-primary">
            {i18n.getFixedT(params.lng, "stationModal")("currentlyOutside")}
        </div>
    );
    const [open, setOpen] = useState(true);

    const handleOpenChange = (value: boolean) => {
        setOpen(value);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger className="sr-only">Dialog trigger</DialogTrigger>
            <DialogContent
                dialogTitle={dialogTitle}
                closeModalButton={<CloseModalButton />}
                onClose={() => {
                    setOpen(false);
                    router.back();
                }}
            >
                {weatherData &&
                    weatherData.map((elem: WeatherData) => {
                        return (
                            <div
                                className="relative flex h-screen flex-col gap-2 text-black"
                                key={elem.station.id}
                            >
                                <StationModalHeading {...elem} />
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
                    })}
            </DialogContent>
        </Dialog>
    );
}
