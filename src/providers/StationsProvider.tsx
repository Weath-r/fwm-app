"use client";
import {
    ReactElement,
    useContext,
    useMemo,
    useEffect,
    useState,
    createContext
} from "react";
import { DataService } from "@/services/DataService";

interface CurrentStationContextType {
    stations: any[];
    isStationModalOpen: boolean;
    handleModal: (isStationModalOpen: boolean) => void;
}

const StationsContext = createContext<CurrentStationContextType>({
    stations: [],
    isStationModalOpen: false,
    handleModal: () => null,
});

type StationsProviderProps = {
    children: ReactElement;
};

export const StationsProvider = ({ children }: StationsProviderProps) => {
    // TO-DO move generic states to AppStore
    const dataService = new DataService();
    const [stations, setStations] = useState([]);
    const [isStationModalOpen, setIsStationModalOpen] = useState(false);

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

    const handleModal = (isStationModalOpen: boolean) => {
        setIsStationModalOpen(isStationModalOpen);
    };

    useEffect(() => {
        fetchStationsData();
    }, []);

    const value = useMemo(
        () => ({
            stations,
            isStationModalOpen,
            handleModal,
        }),
        [stations, isStationModalOpen]
    );

    return (
        <StationsContext.Provider value={value}>
            {children}
        </StationsContext.Provider>
    );
};

export const useStationsProvider = () => {
    return useContext(StationsContext);
};
