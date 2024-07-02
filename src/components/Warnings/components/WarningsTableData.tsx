import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    SortingFn,
    SortingState
} from "@tanstack/react-table";
import { WeatherWarnings } from "@/types";
import HazardIcon from "./HazardIcon";
import SvgInline from "@/components/Common/SvgInline";

import { useState } from "react";
import { timeOnlyUtil, fullDateNoTime } from "@/utils/dateTimeUtils";
import { printIssuedByUser } from "../utils/warningsHelpers";

type TableDataProps = {
    data: WeatherWarnings[]
};

// Sorting Fns
const sortHazardFn: SortingFn<WeatherWarnings> = (rowA, rowB) => {
    return rowA.original.hazard_id.asset.localeCompare(rowB.original.hazard_id.asset);
};

// Columns initialisation
const columnHelper = createColumnHelper<WeatherWarnings>();
const columns = [
    columnHelper.accessor(row => row.date_created, {
        id: "dateCreated",
        cell: info => {
            return <p>{fullDateNoTime(info.getValue())} <span className="block opacity-60">{timeOnlyUtil(info.getValue())}</span></p>;
        },
        header: () => <p>Date created</p>,
    }),
    columnHelper.accessor(row => row.warning_location_id.label, {
        id: "location",
        cell: info => <span>{info.getValue()}</span>,
        header: () => <span>Location</span>,
    }),
    columnHelper.accessor(row => row.level_id, {
        id: "warningLevel",
        cell: info => <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-lg" style={{ backgroundColor: info.getValue().color }}></div>
            <p>
                {info.getValue().label}
            </p>
        </div>,
        header: () => <span>Level</span>,
    }),
    columnHelper.accessor(row => row.hazard_id, {
        id: "hazard",
        cell: info => {
            const { label, asset } = info.getValue();
            return <HazardIcon label={label} asset={asset} className="w-6 h-6 fill-primary"></HazardIcon>;
        },
        header: () => <span>Hazard</span>,
        sortingFn: sortHazardFn,
    }),
    columnHelper.accessor(row => row.description_en, {
        id: "warningDescription",
        cell: info => <span>{info.getValue()}</span>,
        header: () => <span>Description</span>,
        enableSorting: false,
    }),
    columnHelper.accessor(row => row.start_date, {
        id: "warningStart",
        cell: info => {
            return <p>{fullDateNoTime(info.getValue())} <span className="block opacity-60">{timeOnlyUtil(info.getValue())}</span></p>;
        },
        header: () => <p>Starting time</p>,
        enableSorting: false,
    }),
    columnHelper.accessor(row => row.end_date, {
        id: "warningEnd",
        cell: info => {
            return <p>{fullDateNoTime(info.getValue())} <span className="block opacity-60">{timeOnlyUtil(info.getValue())}</span></p>;
        },
        header: () => <p>Ending time</p>,
        enableSorting: false,
    }),
    columnHelper.accessor(row => row.meteoalarm_warning_id, {
        id: "userCreated",
        cell: info => {
            const warningId = info.getValue();
            return <span>{printIssuedByUser(warningId)}</span>;
        },
        header: () => <span>Issued by</span>,
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
