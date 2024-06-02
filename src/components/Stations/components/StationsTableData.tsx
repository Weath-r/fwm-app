import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    SortingFn,
    SortingState
} from "@tanstack/react-table";
import { WeatherDataResponse, Measurements, WeatherConditions } from "@/types";
import BaseWeatherIcon from "@/components/BaseComponents/BaseWeatherIcon";
import SvgInline from "@/components/Common/SvgInline";

import { useState } from "react";
import { formatDateToNumeric } from "@/utils/weatherDataFormatUtils";

type TableDataProps = {
    data: WeatherDataResponse[]
};

// Sorting Fns
const sortStatusFn: SortingFn<WeatherDataResponse> = (rowA, rowB) => {
    return rowA.original.weather_station_id.name.localeCompare(rowB.original.weather_station_id.name);
};
const sortTemperatureFn: SortingFn<WeatherDataResponse> = (rowA, rowB) => {
    return rowA.original.temperature - rowB.original.temperature; 
};

// Columns initialisation
const columnHelper = createColumnHelper<WeatherDataResponse>();
const columns = [
    columnHelper.accessor(row => `${row.weather_station_id.name}--${row.weather_station_id.prefecture_id.label}`, {
        id: "stationName",
        cell: info => {
            const label = info.getValue().split("--");
            return (
                <p className="pr-6 font-bold text-primary whitespace-nowrap">{label[0]} <span className="block text-primary opacity-30 font-normal">{label[1]}</span></p>
            );
        },
        header: () => <span>Station name</span>,
        sortingFn: sortStatusFn,
    }),
    columnHelper.accessor(row => row.weather_condition_icon, {
        id: "stationWeatherIcon",
        cell: info => {
            return (
                <div className="w-10">
                    <BaseWeatherIcon assetId={info.getValue()} weatherDescriptionText="icon" ></BaseWeatherIcon>
                </div>
            );
        },
        header: () => <span>Current conditions</span>,
    }),
    columnHelper.accessor(row => `${row.temperature}--${row.temp_difference}`, {
        id: "stationTemp",
        cell: info => {
            const tempLabel = info.getValue().split("--");
            const trendArrowStyle = +tempLabel[1] > 0 ? "fill-success" : "fill-danger";
            const trendArrowIcon = +tempLabel[1] > 0 ? "icons/arrow-up.svg" : "icons/arrow-down.svg";
            const trendArrow = +tempLabel[1] !== 0 && <SvgInline 
                path={trendArrowIcon}
                title={`${tempLabel[1]}${Measurements.CELCIUS} in last 30 mins`}
                className={`w-2 ${trendArrowStyle}`}
            ></SvgInline>;
            return (
                <p className="flex items-center gap-1">
                    {tempLabel[0]}
                    {trendArrow}
                </p>
            );
        },
        header: () => <p>{WeatherConditions.TEMP}<span className="text-xs ml-1">({Measurements.CELCIUS})</span></p>,
        sortingFn: sortTemperatureFn,
    }),
    columnHelper.accessor(row => row.humidity, {
        id: "stationHum",
        cell: info => <span>{info.getValue()}</span>,
        header: () => <p>{WeatherConditions.HUMIDITY}<span className="text-xs ml-1">({Measurements.PERCENTAGE})</span></p>,
    }),
    columnHelper.accessor(row => row.percipitation, {
        id: "stationPerc",
        cell: info => <span>{info.getValue()}</span>,
        header: () => <p>{WeatherConditions.RAIN}<span className="text-xs ml-1">({Measurements.MILLIMETER})</span></p>,
    }),
    columnHelper.accessor(row => row.windspd, {
        id: "stationWindSpd",
        cell: info => <span>{info.getValue()}</span>,
        header: () => <p>{WeatherConditions.WIND}<span className="text-xs ml-1">({Measurements.SPEED})</span></p>,
    }),
    columnHelper.accessor(row => row.winddir, {
        id: "stationWindDir",
        cell: info => {
            const windspd = info.getValue();
            return (
                <div className="h-4 w-6">
                    <SvgInline
                        path="weather_icons/wind.svg"
                        title="Wind icon"
                        className="fill-primary"
                        style={{
                            transform: `rotate(${windspd}deg)`,
                        }}
                    />
                </div>
            );
        },
        header: () => <p>{WeatherConditions.WINDDIR}</p>,
    }),
    columnHelper.accessor(row => row.date_created, {
        id: "stationUpdate",
        cell: info => {
            return <span>{formatDateToNumeric(info.getValue())}</span>;
        },
        header: () => <p>Last update</p>,
        enableSorting: false,
    })
];
  
export default function StationsTableData(props: Readonly<TableDataProps>) {
    const { data } = props;
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    });
    return (
        <table className="w-full text-sm text-left text-primary">
            <thead className="text-xs text-primary uppercase">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} scope="col" className="px-6 py-3" colSpan={header.colSpan}>
                                {header.isPlaceholder
                                    ? null
                                    : (
                                        <div
                                            className={
                                                header.column.getCanSort()
                                                    ? "cursor-pointer select-none flex items-center gap-1"
                                                    : ""
                                            }
                                            onClick={header.column.getToggleSortingHandler()}
                                            title={
                                                header.column.getCanSort()
                                                    ? header.column.getNextSortingOrder() === "asc"
                                                        ? "Sort ascending"
                                                        : header.column.getNextSortingOrder() === "desc"
                                                            ? "Sort descending"
                                                            : "Clear sort"
                                                    : undefined
                                            }
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: <SvgInline
                                                    path="icons/caret-up.svg"
                                                    title="Sort ascending"
                                                    className="w-2 fill-primary"
                                                />,
                                                desc: <SvgInline
                                                    path="icons/caret-down.svg"
                                                    title="Sort descending"
                                                    className="w-2 fill-primary"
                                                />,
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </div>
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="border-b border-secondary">
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="px-6 py-4">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
