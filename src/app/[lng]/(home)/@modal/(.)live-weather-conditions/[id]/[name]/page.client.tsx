"use client";
import { useT } from "@/i18n/client";
import { WeatherData } from "@/types";

import { Dialog, DialogContent, DialogTrigger } from "@/components/Common/CommonDialog";
import { StationModalHeading } from "@/components/LiveWeatherConditions/StationModalHeading";
import { StationModalWeatherSummary } from "@/components/LiveWeatherConditions/StationModalWeatherSummary";
import { StationWeatherForecastDetails } from "@/components/LiveWeatherConditions/StationWeatherForecastDetails";
import { CloseModalButton } from "@/components/LiveWeatherConditions/buttons/CloseModalButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
                                className="relative flex h-full flex-col gap-2 text-black"
                                key={elem.station.id}
                            >
                                <div className="w-full">
                                    <StationModalHeading {...elem} />
                                </div>
                                <StationModalWeatherSummary {...elem} />
                                <StationWeatherForecastDetails {...elem} />
                            </div>
                        );
                    })}
            </DialogContent>
        </Dialog>
    );
}
