"use client";
import { ReactElement, useContext, createContext, useMemo, useState, useEffect } from "react";
import { DataService } from "@/services/DataService";
import { Station, StationResponse } from "@/types";
import { buildStation } from "@/utils/weatherDataFormatUtils";

interface CurrentStationContextType {
    stations: Station[];
}

const StationsContext = createContext<CurrentStationContextType>({
    stations: [],
});

type StationsProviderProps = {
    children: ReactElement;
};

export const StationsProvider = ({ children }: StationsProviderProps) => {
    const dataService = new DataService();
    const [stations, setStations] = useState<Station[]>([]);

    const fetchStationsData = async () => {
        await dataService
            .fetchWeatherStations()
            .then((response) => {
                const exportedStations = response.map((elem: StationResponse) => {
                    return buildStation(elem);
                });
                setStations(exportedStations);
            })
            .catch((error) => {
                // TO-DO handle error properly
                console.log(error);
                setStations([]);
            });
    };

    useEffect(() => {
        fetchStationsData();
    }, []);

    const value = useMemo(
        () => ({
            stations,
        }),
        [stations]
    );

    return <StationsContext.Provider value={value}>{children}</StationsContext.Provider>;
};

export const useStationsProvider = () => {
    return useContext(StationsContext);
};
