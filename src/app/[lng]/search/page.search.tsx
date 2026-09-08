"use client";
import { useState } from "react";
import { useT } from "@/i18n/client";
import { toGreeklish } from "@/utils/greeklish";
import { SearchInput } from "@/components/SearchPage/SearchInput";
import { SearchResults } from "@/components/SearchPage/SearchResults";
import CommonButton from "@/components/Common/CommonButton";
import { StationSearchItem, StationSearchResult } from "@/types";
import { getRecentSearches, clearRecentSearches } from "@/utils/localStorage";
import { ClockIcon, NoSymbolIcon } from "@heroicons/react/24/solid";

type SearchPageClientProps = {
    data: StationSearchItem[];
};

export default function SearchPageClient({ data }: Readonly<SearchPageClientProps>) {
    const [results, setResults] = useState<StationSearchResult[]>([]);
    const [userTouchedResult, setUserToutchedResult] = useState<boolean>(false);
    const [previousSearchIds, setPreviousSearchIds] = useState(getRecentSearches);

    const previousSearches = data
        .filter((item) => previousSearchIds.includes(item.id))
        .map((item) => ({
            id: item.id,
            temperature: item.temperature,
            windSpeed: item.windSpeed,
            windDirection: item.windDirection,
            weatherConditionIcon: item.weatherConditionIcon,
            name_el: item.name_el,
            name_en: item.name_en,
            prefecture_el: item.prefecture_el,
            prefecture_en: item.prefecture_en,
            name_el_latin: toGreeklish(item.name_el),
        }));

    const handleUserSearchAction = (results: StationSearchResult[]) => {
        setUserToutchedResult(true);
        setResults(results);
    };

    const handleUserClearAction = () => {
        setResults([]);
        setUserToutchedResult(false);
    };

    const handleUserClearRecentSearchesAction = () => {
        clearRecentSearches();
        setPreviousSearchIds([]);
    };

    const { t, i18n } = useT("search");
    const showLastUserSearches = results.length === 0 && !userTouchedResult;
    const showNoResults = results.length === 0 && userTouchedResult;
    return (
        <>
            <SearchInput
                data={data}
                onResultsChange={handleUserSearchAction}
                onClear={handleUserClearAction}
            />
            {showLastUserSearches && (
                <div className="flex flex-col gap-2">
                    <div className="mb-1 flex items-center gap-1 px-1 text-xs font-bold uppercase tracking-wide">
                        <ClockIcon className="size-3.5 text-primary opacity-50" />
                        <p className="text-primary opacity-50">{t("recentlyViewed")}</p>
                        {previousSearches.length > 0 && (
                            <CommonButton
                                className="ml-auto text-primary uppercase"
                                handleClick={handleUserClearRecentSearchesAction}
                            >
                                {t("clearSearches")}
                            </CommonButton>
                        )}
                    </div>
                    <SearchResults results={previousSearches} selectedLanguage={i18n.language} />
                </div>
            )}
            {showNoResults && (
                <div className="flex-col items-center gap-3 px-4 py-10 text-center flex">
                    <div className="flex size-12 items-center justify-center rounded-full bg-light_white">
                        <NoSymbolIcon className="size-6 fill-primary" />
                    </div>
                    <p className="font-bold text-primary">No stations match</p>
                    <p className="max-w-[26ch] text-sm text-primary opacity-50">
                        Try a nearby town, or check the spelling — station names use their local
                        Greek spelling.
                    </p>
                </div>
            )}
            {results.length > 0 && (
                <p className="mb-1 flex items-center gap-1 px-1 text-xs font-bold uppercase tracking-wide text-primary opacity-50">
                    {t("searchResults")}
                </p>
            )}
            <SearchResults results={results} selectedLanguage={i18n.language} />
        </>
    );
}
