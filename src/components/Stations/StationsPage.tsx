import { useAppStore } from "@/hooks/useAppStore";
import { DataService } from "@/services/DataService";
import { WeatherDataResponse, WeatherStation } from "@/types";
import { AccessorFnColumnDef } from "@tanstack/react-table";
import { useMemo, useState, useEffect } from "react";
import StationsTableData from "./components/StationsTableData";
import { getColumns } from "./components/StationTableColumns";
import { useT } from "@/i18n/client";

const getStationsTable = (
    title: string,
    weatherTableData: WeatherDataResponse[],
    columns: (
        | AccessorFnColumnDef<WeatherDataResponse, string>
        | AccessorFnColumnDef<WeatherDataResponse, number>
        | AccessorFnColumnDef<WeatherDataResponse, WeatherStation>
    )[],
    activeText: string
) => {
    return (
        <div className="mx-4 mt-4 md:container md:mx-auto">
            <h2 className="mb-4 text-2xl text-primary">
                {title}
                <small className="block text-sm lowercase text-primary opacity-60">
                    {weatherTableData.length} {activeText}
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
    const { i18n } = useT("common");
    const { i18n:i18nConditions } = useT("weather_conditions");
    const selectedLanguage = i18n.language;

    const getWeatherData = async () => {
        await dataService
            .fetchWeatherStationsWithData()
            .then((response) => {
                const translatedResponse = response.map(station => {
                    if (selectedLanguage && station.weather_station_id.translations) {
                        const translatedStationName = station.weather_station_id.translations.find(t => t.languages_code === selectedLanguage);
                        const translatedPrefectureName = station.weather_station_id.prefecture_id.translations.find(t => t.languages_code === selectedLanguage);

                        if (translatedStationName) {
                            station.weather_station_id.name = translatedStationName.name;
                        }
                        if (translatedPrefectureName) {
                            station.weather_station_id.prefecture_id.label = translatedPrefectureName.name;
                        }
                    }
                    return station;
                });
                setWeatherTableData(translatedResponse);
            })
            .catch((error) => {
                // TO-DO handle error properly
                console.log(error);
                return setWeatherTableData([]);
            });
    };

    useEffect(() => {
        getWeatherData();
    }, [selectedLanguage]);

    const favSet = new Set(favouriteStations);
    const favStations: WeatherDataResponse[] = [];
    const remainingStations: WeatherDataResponse[] = [];

    weatherTableData.forEach((station) => {
        if (favSet.has(station.weather_station_id.id)) {
            favStations.push(station);
        } else {
            remainingStations.push(station);
        }
    });

    const columns = useMemo(
        () => getColumns("Stations list",
            handleFavouriteStationButton,
            isStationFavourite,
            i18n,
            i18nConditions,
            selectedLanguage
        ),
        [selectedLanguage]
    );
    const favColumns = useMemo(
        () => getColumns("My Favourite list",
            handleFavouriteStationButton,
            isStationFavourite,
            i18n,
            i18nConditions,
            selectedLanguage
        ),
        [selectedLanguage]
    );
    const favStationsTitle = i18n.getFixedT(selectedLanguage, "common")("StationsPage.favoriteStationsTitle");
    const stationsListTitle = i18n.getFixedT(selectedLanguage, "common")("StationsPage.stationsListTitle");
    const activeText = i18n.getFixedT(selectedLanguage, "common")("StationsPage.active");
    return (
        <>
            {favouriteStations.length > 0 &&
                getStationsTable(favStationsTitle, favStations, favColumns, activeText)}
            {getStationsTable(stationsListTitle, remainingStations, columns, activeText)}
        </>
    );
}
