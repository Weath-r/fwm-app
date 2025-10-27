import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import noDataToDisplay from "highcharts/modules/no-data-to-display";
import { useRef, useEffect, useState } from "react";
import { dateWithMsToDay, fullDateWithTime } from "@/utils/dateTimeUtils";
import { GraphVariables, GraphVariablesSuffixes, TickIntervalPerVariable } from "@/types";
import { 
    temperatureZones,
    windSpeedZones,
    humidityZones,
    pressureZones,
    windPlotBands
} from "@/helpers/graphHelpers";

type LineGraphDateTimeProps = {
    graphData: number[][];
    variable: string;
    i18n: any;
};
if (typeof Highcharts === "object") {
    noDataToDisplay(Highcharts);
}

const graphOptions = {
    zones: {
        [GraphVariables.temperature]: temperatureZones,
        [GraphVariables.barometer]: pressureZones,
        [GraphVariables.humidity]: humidityZones,
        [GraphVariables.percipitation]: [],
        [GraphVariables.rainrate]: [],
        [GraphVariables.windspd]: windSpeedZones,
    },
    plotBands: {
        [GraphVariables.temperature]: [],
        [GraphVariables.barometer]: [],
        [GraphVariables.humidity]: [],
        [GraphVariables.percipitation]: [],
        [GraphVariables.rainrate]: [],
        [GraphVariables.windspd]: windPlotBands,
    },
};

export default function LineGraphDateTime(props: LineGraphDateTimeProps) {
    const selectedLanguage = props.i18n.language;

    const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
        title: {
            text: "",
        },
        time: {
            useUTC: false,
        },
        lang: {
            noData: "Loading weather data",
        },
        noData: {
            useHTML: true,
            style: {
                fontWeight: "normal",
                fontSize: "16px",
                color: "teal",
            },
        },
        chart: {
            type: "line",
            spacing: [10,0,10,0],
        },
        legend: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
        
        xAxis: {
            type: "datetime",
            dateTimeLabelFormats: {
                month: "%e. %b",
                year: "%b",
            },
            title: {
                text: "",
            },
            lineColor: "#F5F0ED",
            tickColor: "#F5F0ED",
            gridLineWidth: 0,
            tickInterval: 24 * 3600 * 1000,
            labels: {
                formatter: function () {
                    return `<p class="fill-primary/70 text-sm">${dateWithMsToDay(this.value)}</p>`;
                },
            },
        },
        yAxis: {
            title: {
                text: undefined,
            },
            gridLineWidth: 0,
            minorGridLineWidth: 0,
        },
        plotOptions: {
            line: {
                lineWidth: 1,
                connectNulls: true,
                marker: {
                    enabled: false,
                    symbol: "circle",
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true,
                        },
                    },
                },
            },
        },
        series: [{ 
            type: "area",
            name: "",
            color: "#006b7b",
            data: [] as number[],
        }],
    });
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    useEffect(() => {
        const maxYValue = props.graphData.reduce((max, entry) => (entry[1] > max ? entry[1] : max), 0);
        const minYValue = props.graphData.reduce((min, entry) => (entry[1] < min ? entry[1] : min), Infinity);
            
        setChartOptions(prevOptions => ({
            ...prevOptions,
            yAxis: {
                ...(prevOptions.yAxis as Highcharts.YAxisOptions),
                max: maxYValue,
                min: minYValue,
                tickInterval: TickIntervalPerVariable[props.variable as keyof typeof TickIntervalPerVariable],
                labels: {
                    useHTML: true,
                    formatter: function () {
                        return `<span class="text-primary/70 text-xs">${this.value} ${GraphVariablesSuffixes[props.variable as keyof typeof GraphVariablesSuffixes]}</span>`;
                    },
                },
                plotBands: graphOptions.plotBands[props.variable as keyof typeof graphOptions.plotBands],

            },
            tooltip: {
                formatter: function () {
                    if (this.points && this.key) {
                        return this.points.reduce(
                            (s, point) => `${s}<br/>
                            ${point.series.name}: <b>${point.y} ${GraphVariablesSuffixes[props.variable as keyof typeof GraphVariablesSuffixes]}</b>`,
                            `${fullDateWithTime(this.key)}`
                        );};
                },
                shared: true,
            },
            series: [{ 
                type: "line",
                name: props.i18n.getFixedT(selectedLanguage, "weather_conditions")(props.variable),
                data: props.graphData,
                zones: graphOptions.zones[props.variable as keyof typeof graphOptions.zones],
            }],
        }));
    }, [props.graphData]);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            ref={chartComponentRef}
        />
    );
}