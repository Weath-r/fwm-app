"use client";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { useT } from "@/i18n/client";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { toGreeklish } from "@/utils/greeklish";
import { StationSearchItem, StationSearchResult } from "@/types";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";

const SEARCH_DEBOUNCE_MS = 300;

type SearchInputProps = {
    data: StationSearchItem[];
    onResultsChange: (results: StationSearchResult[]) => void;
    onClear: () => void;
};

export function SearchInput({ data, onResultsChange, onClear }: SearchInputProps) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const debouncedSearchTerm = useDebouncedValue(searchTerm, SEARCH_DEBOUNCE_MS);

    const { i18n, t } = useT("search");
    const selectedLanguage = i18n.language;

    const searchableData = useMemo(
        () => data.map((station) => ({ ...station, name_el_latin: toGreeklish(station.name_el) })),
        [data]
    );

    const fuse = useMemo(() => {
        const keys = selectedLanguage === "el" ? ["name_el", "name_el_latin"] : ["name_en"];
        return new Fuse(searchableData, { keys, includeScore: true, threshold: 0.2 });
    }, [searchableData, selectedLanguage]);

    useEffect(() => {
        if (!debouncedSearchTerm.trim()) {
            return;
        }
        onResultsChange(fuse.search(debouncedSearchTerm));
    }, [debouncedSearchTerm, fuse]);

    const handleClearSearch = () => {
        setSearchTerm("");
        onClear();
    };
    return (
        <div
            id="searchField"
            className="mb-4 w-full flex items-center gap-2 rounded-lg border border-gray bg-light_white px-3 py-2.5 transition-shadow focus-within:border-accent focus-within:shadow-[0_0_0_4px_rgba(63,182,196,0.16)]"
        >
            <MagnifyingGlassIcon className="size-5 shrink-0 text-gray" />
            <input
                id="searchInput"
                type="text"
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchInputAriaLabel")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full flex-1 bg-transparent text-primary outline-none placeholder:text-gray"
            />
            {searchTerm.length > 0 && (
                <button
                    id="clearSearch"
                    title="Clear search"
                    aria-label="Clear search"
                    className="shrink-0 text-gray hover:text-danger"
                    onClick={handleClearSearch}
                >
                    <XMarkIcon className="size-5" />
                </button>
            )}
        </div>
    );
}
