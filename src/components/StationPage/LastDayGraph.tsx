import { WeatherDataResponse, GraphVariables } from "@/types";
import { useEffect, useState } from "react";
import { isWithinPastNDays, dateValueOf } from "@/utils/dateManipulation";

import AreaGraphDateTime from "@/components/Graphs/AreaGraphDateTime";
import DropdownMenu from "@/components/Common/DropdownMenu";

type GraphData = number[][];
type DropdownOptions = {
    label: string;
};

export default function LastDayGraph({ weatherData }: { weatherData: WeatherDataResponse[]}) {
    const [selectedFilter, setSelectedFilter] = useState<GraphVariables>(GraphVariables.temperature);
    const [graphData, setGraphData] = useState<GraphData>([]);
    const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions[]>([]);

    useEffect(() => {
        const pastTwoDaysArray = weatherData
            .filter(data => isWithinPastNDays({ inputDate: data.date_created, numberOfDays: 2 }) && data[selectedFilter] !== undefined)
            .map(data => [dateValueOf(data.date_created), data[selectedFilter] as number])
            .reverse();
        setGraphData(pastTwoDaysArray);
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
                <h4 className="mb-2 text-lg font-bold text-primary">Last 2 days {selectedFilter}</h4>
                <DropdownMenu 
                    options={dropdownOptions} 
                    handleChangeVal={setSelectedFilter}
                ></DropdownMenu>
            </div>
            <AreaGraphDateTime
                graphData={graphData}
                variable={selectedFilter}
                graphStyle={{
                    height: "240px",
                }}
            ></AreaGraphDateTime>
        </div>
    );
}