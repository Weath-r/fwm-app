import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import noDataToDisplay from "highcharts/modules/no-data-to-display";
import { useRef, useEffect, useState } from "react";
import { dateWithMsToDay, fullDateWithTime } from "@/utils/dateTimeUtils";

type LineGraphDateTimeProps = {
    graphData: number[][];
    variable: string;
    i18n: any;
};
if (typeof Highcharts === "object") {
    noDataToDisplay(Highcharts);
}

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
        tooltip: {
            formatter: function () {
                if (this.points && this.key) {
                    return this.points.reduce(
                        (s, point) => `${s}<br/>
                            ${point.series.name}: <b>${point.y}</b>`,
                        `${fullDateWithTime(this.key)}`
                    );};
            },
            shared: true,
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
            gridLineWidth: 0,
            tickInterval: 24 * 3600 * 1000,
            labels: {
                enabled: true,
                formatter: function () {
                    const labelValue = this.value;
                    return `<p className="text-primary">${dateWithMsToDay(labelValue)}</p>`;
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
            area: {
                lineWidth: 3,
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
        setChartOptions(prevOptions => ({
            ...prevOptions,
            series: [{ 
                type: "line",
                name: props.i18n.getFixedT(selectedLanguage, "weather_conditions")(props.variable),
                data: props.graphData,
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