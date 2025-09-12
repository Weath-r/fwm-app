import { useState, useEffect } from "react";
import { DataService } from "@/services/DataService";
import { useT } from "@/i18n/client";
import { WeatherWarnings } from "@/types";
import WarningsTableData from "./components/WarningsTableData";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { translatedContent } from "@/utils/transformTranslations";

export default function StationsPage() {
    const dataService = new DataService();
    const [weatherWarningsTabelData, setWeatherWarningsTabelData] = useState<WeatherWarnings[]>([]);
    const [activePage, setActivePage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const { i18n } = useT("warnings");
    const selectedLanguage = i18n.language;

    const getWarningsData = async () => {
        await dataService
            .fetchAllWeatherWarnings(activePage)
            .then((response) => {
                setTotalPages(response.totalPages);

                const translatedResponse = response.warnings.map(elem => {
                    const translatedHazards = translatedContent({
                        data: [elem.hazard_id],
                        selectedLanguage,
                    });
                    const translatedWarningLevels = translatedContent({
                        data: [elem.level_id],
                        selectedLanguage,
                    });
                    const translatedWarningLocations = translatedContent({
                        data: [elem.warning_location_id],
                        selectedLanguage,
                    });

                    return {
                        ...elem,
                        hazard_id: {
                            ...elem.hazard_id,
                            asset: translatedHazards[0].asset || "",
                            label: translatedHazards[0].label,
                        },
                        level_id: {
                            ...elem.level_id,
                            color: translatedWarningLevels[0].color || "",
                            label: translatedWarningLevels[0].label || "",
                            id: translatedWarningLevels[0].id || 0,
                        },
                        warning_location_id: {
                            ...elem.warning_location_id,
                            value: translatedWarningLocations[0].value || "",
                            label: translatedWarningLocations[0].label,
                        },
                    };
                });
                return setWeatherWarningsTabelData(translatedResponse);
            })
            .catch((error) => {
                // TO-DO handle error properly
                console.log(error);
                return setWeatherWarningsTabelData([]);
            });
    };

    useEffect(() => {
        getWarningsData();
    }, [activePage, selectedLanguage]);

    const handleNextPageBtn = () => {
        setActivePage(activePage + 1);
    };
    const handlePrevPageBtn = () => {
        setActivePage(activePage - 1);
    };

    return (
        <div className="mx-4 mt-4 md:container md:mx-auto">
            <h2 className="mb-4 text-2xl text-primary">
                {i18n.getFixedT(selectedLanguage, "warnings")("warningsPageTitle")}
                <small className="block text-sm text-primary opacity-60">
                    {i18n.getFixedT(selectedLanguage, "warnings")("untilToday")}
                </small>
            </h2>
            <div className="my-4 w-full overflow-x-scroll rounded-xl bg-white p-4 drop-shadow-md md:overflow-x-auto">
                <WarningsTableData 
                    data={weatherWarningsTabelData}
                    i18n={i18n}
                ></WarningsTableData>
                <div className="my-4 flex items-center justify-center gap-3">
                    {activePage > 1 && 
                        <button 
                            className="rounded bg-primary p-1 text-white"
                            onClick={handlePrevPageBtn}
                        >
                            <ArrowLeftIcon className="size-4"></ArrowLeftIcon>
                        </button>}
                    { totalPages > 1 && <p className="text-primary">
                        {i18n.getFixedT(selectedLanguage, "common")("page")} {activePage}
                    </p>}
                    {activePage !== totalPages && 
                        <button 
                            className="rounded bg-primary p-1 text-white"
                            onClick={handleNextPageBtn}
                        >
                            <ArrowRightIcon className="size-4"></ArrowRightIcon>
                        </button>}
                </div>
            </div>
        </div>
    );
}