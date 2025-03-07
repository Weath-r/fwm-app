import { useAppStore } from "@/hooks/useAppStore";
import { DataService } from "@/services/DataService";
import { WeatherDataResponse, WeatherStation } from "@/types";
import { AccessorFnColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import StationsTableData from "./components/StationsTableData";
import { getColumns } from "./components/StationTableColumns";

const getStationsTable = (
    title: string,
    weatherTableData: WeatherDataResponse[],
    columns: (
        | AccessorFnColumnDef<WeatherDataResponse, string>
        | AccessorFnColumnDef<WeatherDataResponse, number>
        | AccessorFnColumnDef<WeatherDataResponse, WeatherStation>
    )[]
) => {
    return (
        <div className="mx-4 mt-4 md:container md:mx-auto">
            <h2 className="mb-4 text-2xl text-primary">
                {title}
                <small className="block text-sm text-primary opacity-60">
                    {weatherTableData.length} active
                </small>
            </h2>
            <div className="my-4 w-full overflow-x-scroll rounded-xl bg-white p-4 drop-shadow-md md:overflow-x-auto">
                <StationsTableData
                    title={title}
                    data={weatherTableData}
                    columns={columns}
                ></StationsTableData>
            </div>
        </div>
    );
};

export default function StationsPage() {
    const dataService = new DataService();
    const [weatherTableData, setWeatherTableData] = useState<WeatherDataResponse[]>([]);
    const { favouriteStations, isStationFavourite, handleFavouriteStationButton } = useAppStore();

    const getWeatherData = async () => {
        await dataService
            .fetchWeatherStationsWithData()
            .then((response) => {
                setWeatherTableData(response);
            })
            .catch((error) => {
                // TO-DO handle error properly
                console.log(error);
                return setWeatherTableData([]);
            });
    };

    useMemo(() => {
        getWeatherData();
    }, []);

    const favSet = new Set(favouriteStations);
    const favStations: WeatherDataResponse[] = [];
    const remainingStations: WeatherDataResponse[] = [];

    weatherTableData.forEach((station) => {
        if (favSet.has(station.weather_station_id.id)) {
            console.log(station.weather_station_id.id);
            favStations.push(station);
        } else {
            remainingStations.push(station);
        }
    });

    const columns = useMemo(
        () => getColumns("Stations list", handleFavouriteStationButton, isStationFavourite),
        []
    );
    const favColumns = useMemo(
        () => getColumns("My Favourite list", handleFavouriteStationButton, isStationFavourite),
        []
    );
    return (
        <>
            {favouriteStations.length > 0 &&
                getStationsTable("My Favourite Stations", favStations, favColumns)}
            {getStationsTable("Stations list", remainingStations, columns)}
        </>
    );
}
