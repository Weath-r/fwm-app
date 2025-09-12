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
    data: WeatherWarnings[];
    i18n: any;
};

// Sorting Fns
const sortHazardFn: SortingFn<WeatherWarnings> = (rowA, rowB) => {
    return rowA.original.hazard_id.asset.localeCompare(rowB.original.hazard_id.asset);
};

// Columns initialisation
const columnHelper = createColumnHelper<WeatherWarnings>();
const createColumns = (i18n: any, selectedLanguage: string) => {
    const descriptionColumnId = `description_${selectedLanguage}`;

    return [
        columnHelper.accessor(row => row.date_created, {
            id: "dateCreated",
            cell: info => {
                return <p>{fullDateNoTime(info.getValue())} <span className="block opacity-60">{timeOnlyUtil(info.getValue())}</span></p>;
            },
            header: () => <p>{i18n.getFixedT(selectedLanguage, "warnings")("tableData.dateCreated")}</p>,
        }),
        columnHelper.accessor(row => row.warning_location_id.label, {
            id: "location",
            cell: info => <span>{info.getValue()}</span>,
            header: () => <span>{i18n.getFixedT(selectedLanguage, "warnings")("tableData.location")}</span>,
        }),
        columnHelper.accessor(row => row.level_id, {
            id: "warningLevel",
            cell: info => <div className="flex items-center gap-2">
                <div className="size-4 rounded-lg" style={{ backgroundColor: info.getValue().color }}></div>
                <p>
                    {info.getValue().label}
                </p>
            </div>,
            header: () => <span>{i18n.getFixedT(selectedLanguage, "warnings")("tableData.warningLevel")}</span>,
        }),
        columnHelper.accessor(row => row.hazard_id, {
            id: "hazard",
            cell: info => {
                const { label, asset } = info.getValue();
                return <HazardIcon label={label} asset={asset} className="size-6 fill-primary"></HazardIcon>;
            },
            header: () => <span>{i18n.getFixedT(selectedLanguage, "warnings")("tableData.warningHazard")}</span>,
            sortingFn: sortHazardFn,
        }),
        columnHelper.accessor(row => row[descriptionColumnId], {
            id: "warningDescription",
            cell: info => <span>{info.getValue()}</span>,
            header: () => <span>{i18n.getFixedT(selectedLanguage, "warnings")("tableData.warningDescription")}</span>,
            enableSorting: false,
        }),
        columnHelper.accessor(row => row.start_date, {
            id: "warningStart",
            cell: info => {
                return <p>{fullDateNoTime(info.getValue())} <span className="block opacity-60">{timeOnlyUtil(info.getValue())}</span></p>;
            },
            header: () => <p>{i18n.getFixedT(selectedLanguage, "warnings")("tableData.startingTime")}</p>,
            enableSorting: false,
        }),
        columnHelper.accessor(row => row.end_date, {
            id: "warningEnd",
            cell: info => {
                return <p>{fullDateNoTime(info.getValue())} <span className="block opacity-60">{timeOnlyUtil(info.getValue())}</span></p>;
            },
            header: () => <p>{i18n.getFixedT(selectedLanguage, "warnings")("tableData.endingTime")}</p>,
            enableSorting: false,
        }),
        columnHelper.accessor(row => row.meteoalarm_warning_id, {
            id: "userCreated",
            cell: info => {
                const warningId = info.getValue();
                return <span>{printIssuedByUser(warningId)}</span>;
            },
            header: () => <span>{i18n.getFixedT(selectedLanguage, "warnings")("tableData.issuedBy")}</span>,
            enableSorting: false,
        })
    ];
};
  
export default function StationsTableData(props: Readonly<TableDataProps>) {
    const { data } = props;
    const [sorting, setSorting] = useState<SortingState>([]);
    const selectedLanguage = props.i18n.language;

    const table = useReactTable({
        data,
        columns: createColumns(props.i18n, selectedLanguage),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    });
    return (
        <table className="w-full text-left text-sm text-primary">
            <thead className="text-xs uppercase text-primary">
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
                                                    ? "flex cursor-pointer select-none items-center gap-1"
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
