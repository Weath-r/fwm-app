"use client";
import { WeatherData } from "@/types";
import { useT } from "@/i18n/client";

import { Dialog, DialogTrigger, DialogContent } from "@/components/Common/CommonDialog";
import { StationModalWeatherSummary } from "@/components/LiveWeatherConditions/StationModalWeatherSummary";
import { StationWeatherForecastDetails } from "@/components/LiveWeatherConditions/StationWeatherForecastDetails";
import { StationModalHeading } from "@/components/LiveWeatherConditions/StationModalHeading";
import { CloseModalButton } from "@/components/LiveWeatherConditions/buttons/CloseModalButton";

type StationPageProps = {
    params: {
        id: string;
        name: string;
        lng: string;
    },
    weatherData: WeatherData[];
};

export default function LiveWeatherConditionsModalPage({ params, weatherData }: StationPageProps) {
    const { i18n } =  useT("stationModal");
    const dialogTitle = (<div className="text-sm font-bold uppercase text-primary">
        {i18n.getFixedT(params.lng, "stationModal")("currentlyOutside")}
    </div>);

    return (
        <Dialog 
            open 
            defaultOpen
        >
            <DialogTrigger className="sr-only">Dialog trigger</DialogTrigger>
            <DialogContent
                dialogTitle={dialogTitle}
                closeModalButton={<CloseModalButton />}
            >
                {weatherData && weatherData.map((elem: WeatherData) => {
                    return (
                        <div className="relative flex h-full flex-col gap-2 text-black" key={elem.station.id}>
                            <div className="w-full">
                                <StationModalHeading {...elem } />
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