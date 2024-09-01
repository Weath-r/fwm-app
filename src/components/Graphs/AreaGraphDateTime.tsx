import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import noDataToDisplay from "highcharts/modules/no-data-to-display";
import { useRef, useEffect, useState } from "react";
import { dateWithMsToDay } from "@/utils/dateTimeUtils";

type GraphStyle = {
    height: string;
};

type AreaGraphDateTimeProps = {
    graphData: number[][];
    variable: string;
    graphStyle: GraphStyle;
};

if (typeof Highcharts === "object") {
    noDataToDisplay(Highcharts);
}

export default function AreaGraphDateTime(props: AreaGraphDateTimeProps) {
    const [xAxisLabels, setxAxisLabels] = useState<Array<string | number>>([]);
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
            type: "area",
            height: props.graphStyle.height,
            spacing: [10,0,10,0],
        },
        legend: {
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
            lineWidth: 0,
            tickLength: 0,
            tickInterval: 24 * 3600 * 1000,
            labels: {
                enabled: false,
                formatter: function () {
                    const labelValue = this.value;
                    setxAxisLabels(prevValues => {
                        if (!prevValues.includes(labelValue)) {
                            return [...prevValues, labelValue];
                        }
                        return prevValues;
                    });
                    return "";
                },
            },
        },
        credits: {
            enabled: false,
        },
        yAxis: {
            title: {
                text: undefined,
            },
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            tickInterval: 20,
        },
        plotOptions: {
            area: {
                lineWidth: 3,
                connectNulls: true,
                fillOpacity: 0.2,
                color: "#006b7b",
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
            data: [] as number[],
        }],
    });
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    useEffect(() => {
        setChartOptions(prevOptions => {
            const newPlotLines = xAxisLabels
                .map(value => {
                    const numericValue = typeof value === "string" ? parseFloat(value) : value;
                    if (isNaN(numericValue)) {
                        return null;
                    }
                    return {
                        color: "rgba(61,83,97,0.1)",
                        width: 2,
                        dashStyle: "longdashdot" as Highcharts.DashStyleValue,
                        value: numericValue,
                        label: {
                            rotation: 360,
                            useHTML: true,
                            text: `<p class="text-primary/70">${dateWithMsToDay(numericValue)}</p>`,
                        },
                    } as Highcharts.XAxisPlotLinesOptions;;
                })
                .filter((plotLine): plotLine is Highcharts.XAxisPlotLinesOptions => plotLine !== null);
    
            return {
                ...prevOptions,
                xAxis: {
                    ...(prevOptions.xAxis as Highcharts.XAxisOptions),
                    plotLines: newPlotLines,
                },
                series: [{ 
                    type: "area",
                    name: props.variable,
                    data: props.graphData,
                }],
            };
        });
    }, [props.graphData, xAxisLabels]);
    

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            ref={chartComponentRef}
        />
    );
}