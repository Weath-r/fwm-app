"use client";
import { ReactElement, useContext, createContext, useMemo, useState, useEffect } from "react";
import { DataService } from "@/services/DataService";

interface CurrentStationContextType {
    stations: any[];
}

const StationsContext = createContext<CurrentStationContextType>({
    stations: [],
});

type StationsProviderProps = {
    children: ReactElement;
};

export const StationsProvider = ({ children }: StationsProviderProps) => {
    const dataService = new DataService();
    const [stations, setStations] = useState([]);

    const fetchStationsData = async () => {
        await dataService
            .fetchWeatherStations()
            .then((response) => {
                setStations(response.data.data);
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
