"use client";
import { ReactElement, useContext, createContext, useMemo, useState, useEffect } from "react";
import { DataService } from "@/services/DataService";

export type Station = {
    id: number;
    name: string;
    location: {
        type: string;
        coordinates: [number, number];
    };
    website_url: string;
    accuweather_location: {
        current_weather_description: string;
        weather_condition_icon: {
            asset: string;
        };
    };
};

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
                setStations(response);
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
