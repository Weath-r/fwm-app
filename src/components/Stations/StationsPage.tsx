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
        <div className="mx-4 mt-4 md:container md:mx-auto">
            <h2 className="mb-4 text-2xl text-primary">
                Stations list
                <small className="block text-sm text-primary opacity-60">
                    {weatherTableData.length} active
                </small>
            </h2>
            <div className="my-4 w-full overflow-x-scroll rounded-xl bg-white p-4 drop-shadow-md md:overflow-x-auto">
                <StationsTableData data={weatherTableData}></StationsTableData>
            </div>
        </div>
    );
}