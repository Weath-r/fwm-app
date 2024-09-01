import { WeatherDataResponse, GraphVariables } from "@/types";
import { useEffect, useState } from "react";
import { dateValueOf } from "@/utils/dateManipulation";

import LineGraphDateTime from "@/components/Graphs/LineGraphDateTime";
import DropdownMenu from "@/components/Common/DropdownMenu";

type GraphData = number[][];
type DropdownOptions = {
    label: string;
};

export default function MonthGraph({ weatherData }: { weatherData: WeatherDataResponse[]}) {
    const [selectedFilter, setSelectedFilter] = useState<GraphVariables>(GraphVariables.temperature);
    const [graphData, setGraphData] = useState<GraphData>([]);
    const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions[]>([]);

    useEffect(() => {
        const transformedMonthData = weatherData
            .map(data => [dateValueOf(data.date_created), data[selectedFilter] as number])
            .reverse();
        setGraphData(transformedMonthData);
    }, [weatherData, selectedFilter]);

    useEffect(() => {
        const dropdownMenuOptions = Object.values(GraphVariables).map(elem => {
            return {
                label: elem,
            };
        });
        setDropdownOptions(dropdownMenuOptions);
    }, []);
    
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h4 className="mb-2 text-lg font-bold text-primary">Last 30 days</h4>
                <DropdownMenu 
                    options={dropdownOptions} 
                    handleChangeVal={setSelectedFilter}
                ></DropdownMenu>
            </div>
            <LineGraphDateTime 
                graphData={graphData}
                variable={selectedFilter}
            ></LineGraphDateTime>
        </div>
    );
}