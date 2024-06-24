"use client";
import { 
    ReactElement, 
    useContext, 
    createContext, 
    useMemo, 
    useState, 
    useEffect 
} from "react";
import { DataService } from "@/services/DataService";
import { Station, StationResponse, WeatherWarnings } from "@/types";
import { buildStation } from "@/utils/weatherDataFormatUtils";

interface CurrentStationContextType {
    stations: Station[];
    warnings: GroupedWarnings[];
}

type GroupedWarnings = {
    assetName: string;
    location: string;
    warnings: WeatherWarnings[]
};

const StationsContext = createContext<CurrentStationContextType>({
    stations: [],
    warnings: [],
});

type StationsProviderProps = {
    children: ReactElement;
};

function getTodayAtMidnight():string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString();
}

export const StationsProvider = ({ children }: StationsProviderProps) => {
    const dataService = new DataService();
    const [stations, setStations] = useState<Station[]>([]);
    const [warnings, setWarnings] = useState<GroupedWarnings[]>([]);

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

    const fetchWarnings = async () => {
        const filterDate = getTodayAtMidnight();
        await dataService
            .fetchWeatherWarningsByCreatedDate(filterDate)
            .then((response) => {
                const warnings = response.reduce((acc, warning) => {
                    const location = warning.warning_location_id.value;
                    const indexOfAcc = acc.findIndex(elem => elem.assetName === location);
                    if (indexOfAcc < 0) {
                        acc.push({
                            assetName: location,
                            location: warning.warning_location_id.label,
                            warnings: [warning],
                        });
                    } else {
                        acc[indexOfAcc].warnings.push(warning);
                    }
                    
                    return acc;
                },[] as GroupedWarnings[]);
                setWarnings(warnings);
            })
            .catch((error) => {
                // TO-DO handle error properly
                console.log(error);
                setStations([]);
            });
    };

    useEffect(() => {
        fetchStationsData();
        fetchWarnings();
    }, []);

    const value = useMemo(
        () => ({
            stations,
            warnings,
        }),
        [stations, warnings]
    );

    return <StationsContext.Provider value={value}>{children}</StationsContext.Provider>;
};

export const useStationsProvider = () => {
    return useContext(StationsContext);
};
