import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import noDataToDisplay from "highcharts/modules/no-data-to-display";
import { useEffect, useState } from "react";
import { dateOnlyMonthYear } from "@/utils/dateTimeUtils";
import { GraphVariables, GraphVariablesSuffixes, StationPageCombinedGraph } from "@/types";

type LineGraphDateTimeProps = {
    graphData: StationPageCombinedGraph[];
};

if (typeof Highcharts === "object") {
    noDataToDisplay(Highcharts);
}

export default function TemperaturePercipitationGraph(props: LineGraphDateTimeProps) {
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
            zooming: {
                type: "xy",
            },
            spacing: [10, 0, 10, 0],
        },
        legend: {
            enabled: false,
        },
        credits: {
            enabled: false,
        },
        xAxis: [
            {
                lineColor: "#F5F0ED",
                tickColor: "#F5F0ED",
                gridLineWidth: 0,
                labels: {
                    formatter: function () {
                        return `<p class="fill-primary/70 text-sm">${dateOnlyMonthYear(this.value)}</p>`;
                    },
                },
            },
        ],
        yAxis: [
            {
                title: {
                    text: undefined,
                },
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                labels: {
                    useHTML: true,
                    formatter: function () {
                        return `<span class="text-primary/70 text-xs">${this.value} ${GraphVariablesSuffixes[GraphVariables.temperature]}</span>`;
                    },
                },
            },
            {
                title: {
                    text: undefined,
                },
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                labels: {
                    useHTML: true,
                    formatter: function () {
                        return `<span class="text-primary/70 text-xs">${this.value} ${GraphVariablesSuffixes[GraphVariables.percipitation]}</span>`;
                    },
                },
                opposite: true,
            },
        ],
        tooltip: {
            // eslint-disable-next-line react-hooks/unsupported-syntax
            formatter: function (this: Highcharts.TooltipFormatterContextObject) {
                if (this.points && this.key) {
                    return this.points.reduce(
                        (s, point) => `${s}<br/>
                            ${point.series.name}: <b>${point.y} ${(point.series as any).tooltipOptions?.valueSuffix}</b> `,
                        `${dateOnlyMonthYear(this.key)}`
                    );
                }
            },
            shared: true,
        },
        plotOptions: {
            spline: {
                lineWidth: 4,
                connectNulls: true,
                marker: {
                    enabled: false,
                },
            },
            column: {
                borderRadius: 12,
                groupPadding: 0.4,
                borderWidth: 0,
                color: "rgba(0, 36, 85, 0.4)",
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: "#FFFFFF",
                    inside: true,
                    verticalAlign: "top",
                    format: "{point.y:.1f}", // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: "10px",
                        fontFamily: "Verdana, sans-serif",
                    },
                },
            },
        },
    });

    useEffect(() => {
        setChartOptions((prevOptions) => ({
            ...prevOptions,
            series: props.graphData,
        }));
    }, [props.graphData]);

    return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
