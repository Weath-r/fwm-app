import { WeatherDataResponse, GraphVariables } from "@/types";
import { useEffect, useState } from "react";
import { dateValueOf } from "@/utils/dateManipulation";
import { useT } from "@/i18n/client";

import LineGraphDateTime from "@/components/Graphs/LineGraphDateTime";
import DropdownMenu from "@/components/Common/DropdownMenu";

type GraphData = number[][];
type DropdownOptions = {
    label: string;
    value: string;
};

export default function MonthGraph({ weatherData }: { weatherData: WeatherDataResponse[]}) {
    const [selectedFilter, setSelectedFilter] = useState<GraphVariables>(GraphVariables.temperature);
    const [graphData, setGraphData] = useState<GraphData>([]);
    const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions[]>([]);

    const { i18n } = useT("weather_conditions");
    const { i18n:i18nCommon } = useT("common");
    const selectedLanguage = i18n.language;

    useEffect(() => {
        const transformedMonthData = weatherData
            .map(data => [dateValueOf(data.date_created), data[selectedFilter] as number])
            .reverse();
        setGraphData(transformedMonthData);
    }, [selectedFilter]);

    useEffect(() => {
        const dropdownMenuOptions = Object.values(GraphVariables).map(elem => {
            return {
                label: i18n.getFixedT(selectedLanguage, "weather_conditions")(elem),
                value: elem,
            };
        });
        setDropdownOptions(dropdownMenuOptions);
    }, []);
    
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h4 className="mb-2 text-lg font-bold text-primary">
                    {i18nCommon.getFixedT(selectedLanguage, "common")("StationPage.thirtyDays")}
                </h4>
                <DropdownMenu 
                    options={dropdownOptions} 
                    handleChangeVal={setSelectedFilter}
                ></DropdownMenu>
            </div>
            <LineGraphDateTime 
                graphData={graphData}
                variable={selectedFilter}
                i18n={i18n}
            ></LineGraphDateTime>
        </div>
    );
}