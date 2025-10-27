"use client";
import { DataService } from "@/services/DataService";
import { useConfigurationStore } from "@/stores/configurationStore";
import { GroupedWarnings, Station, StationResponse } from "@/types";
import { translatedContent } from "@/utils/transformTranslations";
import { buildStation } from "@/utils/weatherDataFormatUtils";
import { useParams } from "next/navigation";
import { createContext, ReactElement, useContext, useEffect, useMemo, useState } from "react";

interface CurrentStationContextType {
    stations: Station[];
}

interface WarningsContextType {
    warnings: GroupedWarnings[];
    shouldRenderWarnings: boolean;
}

const StationsContext = createContext<CurrentStationContextType>({
    stations: [],
});

const WarningsContext = createContext<WarningsContextType>({
    warnings: [],
    shouldRenderWarnings: false,
});

type StationsProviderProps = {
    children: ReactElement;
};

function getTodayAtMidnight(): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString();
}

export const StationsProvider = ({ children }: StationsProviderProps) => {
    const dataService = new DataService();
    const [stations, setStations] = useState<Station[]>([]);
    const [warnings, setWarnings] = useState<GroupedWarnings[]>([]);
    const [shouldRenderWarnings, setShouldRenderWarnings] = useState<boolean>(false);
    const { featureFlags } = useConfigurationStore();
    const areWarningsEnabled = featureFlags.warnings?.showWarningsPanel;
    const params = useParams();
    const currentLanguage = Array.isArray(params.lng) ? params.lng[0] : params.lng;

    const fetchStationsData = async () => {
        await dataService
            .fetchWeatherStations()
            .then((response) => {
                const exportedStations = response
                    .map((elem: StationResponse) => {
                        return buildStation(elem);
                    })
                    .map((station) => {
                        if (currentLanguage && station.translations) {
                            const translation = station.translations.find(
                                (t) => t.languages_code === currentLanguage
                            );
                            if (translation) {
                                return { ...station, name: translation.name };
                            }
                        }
                        return station;
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

                    const translatedLevels = translatedContent({
                        data: [warning.level_id],
                        selectedLanguage: currentLanguage,
                    });
                    const translatedHazard = translatedContent({
                        data: [warning.hazard_id],
                        selectedLanguage: currentLanguage,
                    });

                    const translatedLocation = translatedContent({
                        data: [warning.warning_location_id],
                        selectedLanguage: currentLanguage,
                    });

                    const warningLevel = {
                        ...translatedLevels[0],
                        id: warning.level_id.id,
                        color: translatedLevels[0].color ?? "",
                    };

                    const newWarning = {
                        ...warning,
                        hazard_id: { ...warning.hazard_id, ...translatedHazard[0] },
                    };

                    const indexOfAcc = acc.findIndex((elem) => elem.assetName === location);
                    if (indexOfAcc < 0) {
                        acc.push({
                            assetName: location,
                            location: translatedLocation[0].label,
                            warnings: [newWarning],
                            geojson,
                            warningLevel,
                            order,
                        });
                    } else {
                        acc[indexOfAcc].warnings.push(warning);
                        acc[indexOfAcc].warningLevel.id < warning.level_id.id
                            ? (acc[indexOfAcc].warningLevel = warning.level_id)
                            : "";
                    }
                    return acc;
                }, [] as GroupedWarnings[]);
                setWarnings(warnings);

                const perRegionWarnings = Object.values(warnings).reduce((acc, current): number => {
                    const warningsLegth = current.warnings.length;
                    acc += warningsLegth;
                    return acc;
                }, 0);
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
    }, []);

    useEffect(() => {
        areWarningsEnabled && fetchWarnings();
    }, [areWarningsEnabled]);

    const stationValue = useMemo(() => ({ stations }), [stations]);

    const warningsValue = useMemo(
        () => ({
            warnings,
            shouldRenderWarnings,
        }),
        [warnings]
    );

    return (
        <StationsContext.Provider value={stationValue}>
            <WarningsContext.Provider value={warningsValue}>{children}</WarningsContext.Provider>
        </StationsContext.Provider>
    );
};

export const useStationsProvider = () => {
    return useContext(StationsContext);
};

export const useWarningsProvider = () => {
    return useContext(WarningsContext);
};
