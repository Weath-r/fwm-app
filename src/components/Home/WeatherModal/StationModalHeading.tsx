import { WeatherData } from "@/types";
import { timeFromNowUtil } from "@/utils/dateTimeUtils";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/solid";

export function StationModalHeading(elem: Readonly<WeatherData>) {
    return (
        <div className="flex flex-col border-b-[2px] border-light_white">
            <h2 className="text-2xl text-primary font-bold flex items-center">
                <a
                    href={elem.station.website_url}
                    target="_blank"
                    rel="noreferrer"
                >
                    {elem.station.name}
                </a>
            </h2>
            <div className="flex items-center gap-3 my-2">
                <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4 fill-primary/70"></ClockIcon>
                    <p className="text-sm text-primary/70">
                        Last update {timeFromNowUtil(elem.dateCreated)}
                    </p>
                </div>
                <div className="flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4 fill-primary/70"></MapPinIcon>
                    <p className="text-sm text-primary/70">
                        {elem.station.prefecture_id.label}
                    </p>
                </div>
            </div>
        </div>
    );
}