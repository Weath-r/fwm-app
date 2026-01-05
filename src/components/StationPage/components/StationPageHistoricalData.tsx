"use client";
import { WeatherHistoricalData, GraphVariablesSuffixes, StationPageCombinedGraph } from "@/types";
import { useT } from "@/i18n/client";
import { dateObjectWithMonthYear } from "@/utils/dateTimeUtils";
import { dateValueOf } from "@/utils/dateManipulation";
import { temperatureZones } from "@/helpers/graphHelpers";
import TemperaturePercipitationGraph from "@/components/StationPage/components/TemperaturePercipitationGraph";
import WindCombinedGraph from "@/components/StationPage/components/WindCombinedGraph";

type StationPageHistoricalDataProps = {
    historicalData: WeatherHistoricalData[];
};

export default function StationPageHistoricalData({ historicalData } : StationPageHistoricalDataProps) {

    const { i18n } = useT("station");
    const selectedLanguage = i18n.language;

    const temperatureGraphData = historicalData.map(data => {
        const date = dateObjectWithMonthYear(`${data.month}-${data.year}`);
        return {
            x: dateValueOf(date.format()),
            y: data.avg_temperature,
        };
    });
    const PrecipGraphData = historicalData.map(data => {
        const date = dateObjectWithMonthYear(`${data.month}-${data.year}`);
        return {
            x: dateValueOf(date.format()),
            y: data.total_percipitation,
        };
    });
    const WindGraphData = historicalData.map(data => {
        const date = dateObjectWithMonthYear(`${data.month}-${data.year}`);
        return [
            dateValueOf(date.format()), data.avg_windspd, data.avg_winddir
        ];
    });
    const temperatureOption: StationPageCombinedGraph = {
        name: i18n.getFixedT(selectedLanguage, "weather_conditions")("temperature"),
        type: "spline",
        data: temperatureGraphData,
        tooltip: {
            valueSuffix: GraphVariablesSuffixes.temperature,
        },
        zones: temperatureZones,
    };
    const percipOption: StationPageCombinedGraph = {
        name: i18n.getFixedT(selectedLanguage, "weather_conditions")("percipitation"),
        type: "column",
        yAxis: 1,
        data: PrecipGraphData,
        tooltip: {
            valueSuffix: GraphVariablesSuffixes.percipitation,
        },
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <h4 className="mb-2 text-lg font-bold text-primary">
                    {i18n.getFixedT(selectedLanguage, "station")("history.tempPrecipGraph")}
                </h4>
            </div>
            <TemperaturePercipitationGraph graphData={[temperatureOption, percipOption]} />
            <div className="flex flex-col md:flex-row items-center justify-between">
                <h4 className="mb-2 text-lg font-bold text-primary">
                    {i18n.getFixedT(selectedLanguage, "station")("history.windDirSpdGraph")}
                </h4>
            </div>
            <WindCombinedGraph graphData={WindGraphData} />
        </div>
    );
}