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
import { Station, StationResponse, GroupedWarnings } from "@/types";
import { buildStation } from "@/utils/weatherDataFormatUtils";

interface CurrentStationContextType {
    stations: Station[];
    warnings: GroupedWarnings[];
    shouldRenderWarnings: boolean;
}

const StationsContext = createContext<CurrentStationContextType>({
    stations: [],
    warnings: [],
    shouldRenderWarnings: false,
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
    const [shouldRenderWarnings, setShouldRenderWarnings] = useState<boolean>(false);

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
                    const geojson = warning.warning_location_id.geojson;
                    const order = warning.warning_location_id.order;
                    const warningLevel = warning.level_id;
                    const indexOfAcc = acc.findIndex(elem => elem.assetName === location);
                    if (indexOfAcc < 0) {
                        acc.push({
                            assetName: location,
                            location: warning.warning_location_id.label,
                            warnings: [warning],
                            geojson,
                            warningLevel,
                            order,
                        });
                    } else {
                        acc[indexOfAcc].warnings.push(warning);
                        (acc[indexOfAcc].warningLevel.id < warning.level_id.id) 
                            ? acc[indexOfAcc].warningLevel = warning.level_id 
                            : "";
                    }
                    return acc;
                },[] as GroupedWarnings[]);
                setWarnings(warnings);

                const perRegionWarnings = Object.values(warnings).reduce((acc, current):number => {
                    const warningsLegth = current.warnings.length;
                    acc += warningsLegth;
                    return acc;
                },0);
                setShouldRenderWarnings(!!perRegionWarnings);
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
            shouldRenderWarnings,
        }),
        [stations, warnings, shouldRenderWarnings]
    );

    return <StationsContext.Provider value={value}>{children}</StationsContext.Provider>;
};

export const useStationsProvider = () => {
    return useContext(StationsContext);
};
