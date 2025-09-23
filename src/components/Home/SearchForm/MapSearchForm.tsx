"use client";
import { useStationsProvider } from "@/providers/StationsProvider";
import { Station, StationParamsUrlProp } from "@/types";
import { useT } from "@/i18n/client";
import { Select, SelectItem } from "@/components/Common/CommonSelect";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function MapSearchForm() {
    const { stations } = useStationsProvider();
    const router = useRouter();
    const queryParams: StationParamsUrlProp = { isForecastEnabled: "true" };
    const sortedStations = stations.toSorted((a, b) => a.name.localeCompare(b.name));

    const { i18n } = useT("common");
    const selectedLanguage = i18n.language;

    const handleOnChange = (selectedStation: string) => {
        const { name } = stations.find((station) => station.id.toString() === selectedStation) as Station; 
        router.push(`/${selectedLanguage}/live-weather-conditions/${selectedStation}/${name}?${queryParams.isForecastEnabled}=true`);
    };

    return (
        <div className="relative inline-flex min-w-[35px] items-center justify-center rounded-lg bg-white text-primary outline-none">
            <Select 
                onValueChange={(value) => handleOnChange(value)}
                placeholder={<MagnifyingGlassIcon className="size-4" />}
            >
                {sortedStations.map((station) => {
                    return (
                        <SelectItem 
                            key={station.id} 
                            value={station.id.toString()}
                            className="cursor-pointer p-2"
                        >
                            {station.name}
                        </SelectItem>
                    );
                })}
            </Select>
        </div>
    );
}
