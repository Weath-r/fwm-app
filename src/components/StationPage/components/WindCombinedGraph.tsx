import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import noDataToDisplay from "highcharts/modules/no-data-to-display";
import windbarb from "highcharts/modules/windbarb";
import { useEffect, useState } from "react";
import { dateOnlyMonthYear } from "@/utils/dateTimeUtils";
import { windDirectionCalc } from "@/helpers/windDirectionCalculator";
import { GraphVariables, GraphVariablesSuffixes } from "@/types";
import { useT } from "@/i18n/client";

type WindGraphDateTimeProps = {
    graphData: number[][];
};

if (typeof Highcharts === "object") {
    noDataToDisplay(Highcharts);
    windbarb(Highcharts);
}

export default function WindCombinedGraph(props: WindGraphDateTimeProps) {
    const { i18n } = useT("station");
    const selectedLanguage = i18n.language;

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
            spacing: [10,0,10,0],
        },
        legend: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
        xAxis: {
            lineColor: "#F5F0ED",
            tickColor: "#F5F0ED",
            gridLineWidth: 0,
            type: "datetime",
            labels: {
                formatter: function () {
                    return `<p class="fill-primary/70 text-sm">${dateOnlyMonthYear(this.value)}</p>`;
                },
            },
        },
        yAxis: {
            title: {
                text: undefined,
            },
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            labels: {
                useHTML: true,
                formatter: function () {
                    return `<span class="text-primary/70 text-xs">${this.value} ${GraphVariablesSuffixes[GraphVariables.windspd]}</span>`;
                },
            },
        },
        tooltip: {
            formatter: function (this: Highcharts.TooltipFormatterContextObject): string {
                if (!this.points || !this.key) {
                    return "";
                }

                const tooltipText: string[] = [];

                tooltipText.push(`${dateOnlyMonthYear(this.key)}`);

                this.points.forEach(point => {
                    if (typeof point.y === "number") {
                        tooltipText.push(
                            `<br/>${point.series.name}: <b>${point.y} ${(point.series as any).tooltipOptions?.valueSuffix ?? ""}</b>`
                        );
                    } else {
                        const winddir = windDirectionCalc((point.point as any).direction ?? 0);
                        //
                        tooltipText.push(
                            `<br/>${point.series.name}: <b>
                            ${i18n.getFixedT(selectedLanguage, "weather_conditions")(`windDir.${winddir}`)} (${(point.point as any).direction ?? ""})</b
                            </b>`
                        );
                    }
                });

                return tooltipText.join("");
            },
            shared: true,
        },
        plotOptions: {
            series: {
                lineWidth: 1,
                connectNulls: true,
                marker: {
                    enabled: false,
                },
            },
            windbarb: {
                vectorLength: 16,
                lineWidth: 2,
                color: "#2c72fe",
            },
        },
    });

    useEffect(() => {
        setChartOptions(prevOptions => ({
            ...prevOptions,
            series: [{
                type: "area",
                keys: ["x", "y"],
                data: props.graphData,
                fillColor: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        [0, "var(--highcharts-color-0, #2c72fe)"],
                        [
                            1,
                            `color-mix(
                        in srgb,
                        var(--highcharts-color-0, #2caffe) 25%,
                        transparent
                    )`
                        ]
                    ],
                },
                name: i18n.getFixedT(selectedLanguage, "weather_conditions")("windspd"),
                tooltip: {
                    valueSuffix: GraphVariablesSuffixes.windspd,
                },
                states: {
                    inactive: {
                        opacity: 1,
                    },
                },
            }, {
                type: "windbarb",
                data: props.graphData,
                name: i18n.getFixedT(selectedLanguage, "weather_conditions")("wind direction"),
                showInLegend: false,
                tooltip: {
                    valueSuffix: GraphVariablesSuffixes.windspd,
                    
                },
            }],
        }));
    }, [props.graphData]);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
        />
    );
}