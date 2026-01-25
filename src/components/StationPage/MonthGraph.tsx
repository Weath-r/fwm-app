import { WeatherDataResponse, GraphVariables } from "@/types";
import { useState } from "react";
import { dateValueOf } from "@/utils/dateManipulation";
import { useT } from "@/i18n/client";
import dayjs from "@/utils/dateTimeUtils";

import LineGraphDateTime from "@/components/Graphs/LineGraphDateTime";
import DropdownMenu from "@/components/Common/DropdownMenu";

type GraphData = number[][];
type OptionsProp = {
    label: string;
    value: GraphVariables;
};

function aggregatePerFourHoursData(weatherData: WeatherDataResponse[]) {
    if (weatherData.length === 0) return [];

    const result: WeatherDataResponse[] = [];
    let lastPushed = weatherData[0];
    result.push(lastPushed);

    for (let i = 1; i < weatherData.length; i++) {
        const current = weatherData[i];
        const diffHours = dayjs(current.date_created).diff(dayjs(lastPushed.date_created), "hour");
        if (Math.abs(diffHours) > 3) {
            result.push(current);
            lastPushed = current;
        }
    }

    return result;
}

export default function MonthGraph({ weatherData }: { weatherData: WeatherDataResponse[] }) {
    const { i18n } = useT("weather_conditions");
    const { i18n: i18nCommon } = useT("common");
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

    const transformedMonthData = (selectedFilter: GraphVariables) =>
        aggregatePerFourHoursData(weatherData)
            .map((data) => [dateValueOf(data.date_created), data[selectedFilter] as number])
            .reverse();

    const [graphData, setGraphData] = useState<GraphData>(
        transformedMonthData(GraphVariables.temperature)
    );

    const handleUserSelection = (opt: OptionsProp) => {
        setSelectedFilter(opt.value);
        const newData = transformedMonthData(opt.value);
        setGraphData(newData);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <h4 className="mb-2 text-lg font-bold text-primary">
                    {i18nCommon.getFixedT(selectedLanguage, "common")("StationPage.thirtyDays")}
                </h4>
                <DropdownMenu
                    options={dropdownOptions}
                    handleChangeVal={handleUserSelection}
                    selectedValue={dropdownOptions.find((opt) => opt.value === selectedFilter)!}
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
