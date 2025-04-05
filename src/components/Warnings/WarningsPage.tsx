import { useState, useEffect } from "react";
import { DataService } from "@/services/DataService";
import { WeatherWarnings } from "@/types";
import WarningsTableData from "./components/WarningsTableData";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function StationsPage() {
    const dataService = new DataService();
    const [weatherWarningsTabelData, setWeatherWarningsTabelData] = useState<WeatherWarnings[]>([]);
    const [activePage, setActivePage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const getWarningsData = async () => {
        await dataService
            .fetchAllWeatherWarnings(activePage)
            .then((response) => {
                setTotalPages(response.totalPages);
                return setWeatherWarningsTabelData(response.warnings);
            })
            .catch((error) => {
                // TO-DO handle error properly
                console.log(error);
                return setWeatherWarningsTabelData([]);
            });
    };

    useEffect(() => {
        getWarningsData();
    }, [activePage]);

    const handleNextPageBtn = () => {
        setActivePage(activePage + 1);
    };
    const handlePrevPageBtn = () => {
        setActivePage(activePage - 1);
    };

    return (
        <div className="mx-4 mt-4 md:container md:mx-auto">
            <h2 className="mb-4 text-2xl text-primary">
                Weather warnings
                <small className="block text-sm text-primary opacity-60">
                    until today
                </small>
            </h2>
            <div className="my-4 w-full overflow-x-scroll rounded-xl bg-white p-4 drop-shadow-md md:overflow-x-auto">
                <WarningsTableData data={weatherWarningsTabelData}></WarningsTableData>
                <div className="my-4 flex items-center justify-center gap-3">
                    {activePage > 1 && 
                        <button 
                            className="rounded bg-primary p-1 text-white"
                            onClick={handlePrevPageBtn}
                        >
                            <ArrowLeftIcon className="size-4"></ArrowLeftIcon>
                        </button>}
                    { totalPages > 1 && <p className="text-primary">
                        Page {activePage}
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