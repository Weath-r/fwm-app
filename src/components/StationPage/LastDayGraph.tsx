import { WeatherDataResponse, GraphVariables } from "@/types";
import { useState } from "react";
import { useT } from "@/i18n/client";
import { manipulateGraphDataLastNDays } from "@/helpers/stationPage/getExtremeValues";

import AreaGraphDateTime from "@/components/Graphs/AreaGraphDateTime";
import DropdownMenu from "@/components/Common/DropdownMenu";

type GraphData = number[][];
type OptionsProp = {
    label: string;
    value: GraphVariables;
};

export default function LastDayGraph({ weatherData }: { weatherData: WeatherDataResponse[] }) {
    const { i18n } = useT("weather_conditions");
    const selectedLanguage = i18n.language;

    const dropdownOptions = Object.values(GraphVariables).map((elem) => {
        return {
            label: i18n.getFixedT(selectedLanguage, "weather_conditions")(elem),
            value: elem,
        };
    });

    const [selectedFilter, setSelectedFilter] = useState<GraphVariables>(
        GraphVariables.temperature
    );

    const pastTwoDaysArray = manipulateGraphDataLastNDays({
        weatherData,
        variable: selectedFilter,
        numberOfDays: 2,
    }).filter((v): v is number[] => v !== undefined);
    const [graphData, setGraphData] = useState<GraphData>(pastTwoDaysArray);

    const handleUserSelection = (opt: OptionsProp) => {
        const updateGraphData = manipulateGraphDataLastNDays({
            weatherData,
            variable: opt.value,
            numberOfDays: 2,
        }).filter((v): v is number[] => v !== undefined);
        setGraphData(updateGraphData);
        setSelectedFilter(opt.value);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <h4 className="mb-2 text-lg font-bold text-primary">
                    {i18n.getFixedT(selectedLanguage, "common")("StationPage.lastTwoDays")}
                </h4>
                <DropdownMenu
                    options={dropdownOptions}
                    handleChangeVal={handleUserSelection}
                    selectedValue={dropdownOptions.find((opt) => opt.value === selectedFilter)!}
                ></DropdownMenu>
            </div>
            <AreaGraphDateTime
                graphData={graphData}
                variable={selectedFilter}
                i18n={i18n}
                graphStyle={{
                    height: "240px",
                }}
            ></AreaGraphDateTime>
        </div>
    );
}
