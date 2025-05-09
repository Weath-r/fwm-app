import { WeatherData } from "@/types";
import { timeFromNowUtil } from "@/utils/dateTimeUtils";
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/solid";
import { FavoriteStationButton } from "@/components/Common/Favorite/favoriteStationButton";

export function StationModalHeading(elem: Readonly<WeatherData>) {
    const headerElemement = elem.station.website_url.includes("http") ?
        <a
            href={elem.station.website_url}
            target="_blank"
            rel="noreferrer"
        >
            {elem.station.name}
        </a> : 
        <span>{elem.station.name}</span>;

    return (
        <div className="flex flex-col border-b-2 border-light_white">
            <h2 className="flex items-center text-2xl font-bold text-primary">
                {headerElemement}
            </h2>
            <div className="my-2 flex items-center gap-3">
                <div className="flex items-center gap-1">
                    <ClockIcon className="size-4 fill-primary/70"></ClockIcon>
                    <p className="text-sm text-primary/70">
                        Last update {timeFromNowUtil(elem.dateCreated)}
                    </p>
                </div>
                <div className="flex items-center gap-1">
                    <MapPinIcon className="size-4 fill-primary/70"></MapPinIcon>
                    <p className="text-sm text-primary/70">
                        {elem.station.prefecture_id.label}
                    </p>
                </div>
                <div className="flex items-center gap-1">
                    <FavoriteStationButton></FavoriteStationButton>
                </div>
            </div>
        </div>
    );
}