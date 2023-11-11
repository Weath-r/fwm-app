"use client";
import { PropsWithChildren } from "react";
import { fetchWeatherStations } from "@/api/fetchStations";
import { withAsync } from "@/helpers/withAsync";
import { useEffect, useState, createContext } from "react";

interface CurrentStationContextType {
    stations: any[];
    isStationModalOpen: boolean,
    handleModal: any,
    appVersion: string
}

const StationsContext = createContext<CurrentStationContextType>({
    stations: [],
    isStationModalOpen: false,
    handleModal: null,
    appVersion: "0.0.1",
});

function Provider(props: PropsWithChildren) {
    // Need to rename this Provider context
    // it is going to be a more global one
    const [stations, setStations] = useState([]);
    const [isStationModalOpen, setIsStationModalOpen] = useState(false);

    const fetchStationsData = async () => {
        const { response } = await withAsync(fetchWeatherStations);
        if (response) {
            setStations(response.data.data);
        }
    };
    
    useEffect(() => {
        fetchStationsData(); 
    }, []);

    return <StationsContext.Provider value={{
        stations: stations,
        isStationModalOpen: isStationModalOpen,
        handleModal: setIsStationModalOpen,
        appVersion: process.env.NEXT_PUBLIC_APP_VERSION || "",
    }}>
        {props.children}
    </StationsContext.Provider>;
};

export { Provider };
export default StationsContext;