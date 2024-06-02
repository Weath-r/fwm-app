import { useState, useEffect } from "react";
import { DataService } from "@/services/DataService";
import { WeatherDataResponse } from "@/types";
import StationsTableData from "./components/StationsTableData";

export default function StationsPage() {
    const dataService = new DataService();
    const [weatherTableData, setWeatherTableData] = useState<WeatherDataResponse[]>([]);
    const getWeatherData = async () => {
        await dataService
            .fetchWeatherStationsWithData()
            .then((response) => {
                return setWeatherTableData(response);
            })
            .catch((error) => {
                // TO-DO handle error properly
                console.log(error);
                return setWeatherTableData([]);
            });
    };

    useEffect(() => {
        getWeatherData();
    }, []);
   
    return (
        <div className="mx-4 md:container md:mx-auto mt-4">
            <h2 className="text-primary text-2xl mb-4">
                Stations list
                <small className="text-primary text-sm block opacity-60">
                    {weatherTableData.length} active
                </small>
            </h2>
            <div className="rounded-xl bg-white drop-shadow-md p-4 w-full my-4 overflow-x-scroll md:overflow-x-auto">
                <StationsTableData data={weatherTableData}></StationsTableData>
            </div>
        </div>
    );
}