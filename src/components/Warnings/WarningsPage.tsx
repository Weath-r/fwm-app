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
        <div className="mx-4 md:container md:mx-auto mt-4">
            <h2 className="text-primary text-2xl mb-4">
                Weather warnings
                <small className="text-primary text-sm block opacity-60">
                    until today
                </small>
            </h2>
            <div className="rounded-xl bg-white drop-shadow-md p-4 w-full my-4 overflow-x-scroll md:overflow-x-auto">
                <WarningsTableData data={weatherWarningsTabelData}></WarningsTableData>
                <div className="my-4 flex items-center justify-center gap-3">
                    {activePage > 1 && 
                        <button 
                            className="text-white rounded bg-primary p-1"
                            onClick={handlePrevPageBtn}
                        >
                            <ArrowLeftIcon className="w-4 h-4"></ArrowLeftIcon>
                        </button>}
                    { totalPages > 1 && <p className="text-primary">
                        Page {activePage}
                    </p>}
                    {activePage !== totalPages && 
                        <button 
                            className="text-white rounded bg-primary p-1"
                            onClick={handleNextPageBtn}
                        >
                            <ArrowRightIcon className="w-4 h-4"></ArrowRightIcon>
                        </button>}
                </div>
            </div>
        </div>
    );
}