"use client";
import { PropsWithChildren } from "react";
import { fetchWeatherStations } from "@/api/fetchStations";
import { withAsync } from "@/helpers/withAsync";
import { useEffect, useState, createContext } from "react";

interface CurrentStationContextType {
    stations: any[];
    isStationModalOpen: boolean,
    handleModal: any
}

const StationsContext = createContext<CurrentStationContextType>({stations: [], isStationModalOpen: false, handleModal: null});

function Provider(props: PropsWithChildren) {
    // Need to rename this Provider context
    // it is going to be a more global one
    const [stations, setStations] = useState([]);
    const [isStationModalOpen, setIsStationModalOpen] = useState(false);

    const fetchStationsData = async () => {
        const {response, error} = await withAsync(fetchWeatherStations);
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
        handleModal: setIsStationModalOpen
        }}>
        {props.children}
    </StationsContext.Provider>
};

export { Provider };
export default StationsContext;