import BaseWeatherIcon from "@/components/BaseComponents/BaseWeatherIcon";
import SvgInline from "@/components/Common/SvgInline";
import { Measurements, SearchableStation, StationSearchResult } from "@/types";
import { calculateWindToBft } from "@/utils/weatherConvertUnits";
import { saveRecentSearch } from "@/utils/localStorage";
import StationLink from "@/components/Common/StationLink";

type SearchResultsProps = {
    results: StationSearchResult[] | SearchableStation[];
    selectedLanguage: string;
};

const isStationSearchResult = (
    result: StationSearchResult | SearchableStation
): result is StationSearchResult => "item" in result;

export function SearchResults({ results, selectedLanguage }: SearchResultsProps) {
    if (results.length === 0) {
        return null;
    }

    const stations = results.map((result) =>
        isStationSearchResult(result) ? result.item : result
    );

    return (
        <div id="resultList" className="flex flex-col divide-y divide-light_white">
            {stations.map((item) => {
                const stationName = selectedLanguage === "el" ? item.name_el : item.name_en;
                const prefectureName =
                    selectedLanguage === "el" ? item.prefecture_el : item.prefecture_en;
                return (
                    <StationLink
                        key={item.id}
                        stationId={item.id}
                        pageName="station"
                        stationName={stationName}
                        lang={selectedLanguage}
                        className="result-row flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-light_white"
                        onBeforeNavigate={() => saveRecentSearch(item)}
                    >
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-light_white">
                            <BaseWeatherIcon
                                assetId={item.weatherConditionIcon}
                                weatherDescriptionText={stationName}
                                className="size-9"
                            />
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block truncate font-bold text-primary">
                                {stationName}
                            </span>
                            <span className="block text-xs text-primary opacity-30">
                                {prefectureName}
                            </span>
                        </span>
                        <span className="flex shrink-0 flex-col items-end gap-1">
                            <span className="text-base font-semibold tabular-nums text-primary">
                                {item.temperature} {Measurements.CELCIUS}
                            </span>
                            <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold tabular-nums text-primary/70">
                                <span
                                    className="size-5"
                                    style={{ transform: `rotate(${item.windDirection}deg)` }}
                                >
                                    <SvgInline
                                        path="/weather_icons/v2/wind.svg"
                                        title="Wind direction"
                                        className="fill-primary/70"
                                    />
                                </span>
                                {calculateWindToBft(item.windSpeed)} {Measurements.BFT}
                            </span>
                        </span>
                    </StationLink>
                );
            })}
        </div>
    );
}
