"use client";
import { StationEnvironmentalConditions, WeatherData } from "@/types";

import { Dialog, DialogContent, DialogTrigger } from "@/components/Common/CommonDialog";
import LiveWeatherConditionsPage from "@/components/LiveWeatherConditions/LiveWeatherConditionsPage";
import { CloseModalButton } from "@/components/LiveWeatherConditions/buttons/CloseModalButton";
import StationUnavailable from "@/components/StationUnavailable/StationUnavailable";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useT } from "@/i18n/client";

type StationPageProps = {
    params: {
        id: string;
        name: string;
        lng: string;
    };
    weatherData: WeatherData[] | null;
    environmentalConditions: StationEnvironmentalConditions | null;
};

export default function LiveWeatherConditionsModalPage({
    params,
    weatherData,
    environmentalConditions,
}: StationPageProps) {
    const { i18n } = useT("stationModal");
    const { t: tStationUnavailable } = useT("stationUnavailable");
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
                flush
                scrollable
                dialogTitle={dialogTitle}
                closeModalButton={<CloseModalButton />}
                onClose={() => {
                    setOpen(false);
                    router.back();
                }}
            >
                {weatherData ? (
                    <LiveWeatherConditionsPage
                        params={params}
                        weatherData={weatherData}
                        environmentalConditions={
                            environmentalConditions as StationEnvironmentalConditions
                        }
                        variant="modal"
                    />
                ) : (
                    <StationUnavailable lng={params.lng} t={tStationUnavailable} variant="modal" />
                )}
            </DialogContent>
        </Dialog>
    );
}
