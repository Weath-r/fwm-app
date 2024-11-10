import SvgInline from "@/components/Common/SvgInline";
import { WeatherDataResponse } from "@/types";
import {
    AccessorFnColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import { useState } from "react";

type TableDataProps = {
    title: string;
    data: WeatherDataResponse[];
    columns: (
        | AccessorFnColumnDef<WeatherDataResponse, string>
        | AccessorFnColumnDef<WeatherDataResponse, number>
    )[];
};

export default function StationsTableData(props: Readonly<TableDataProps>) {
    const { data, columns } = props;
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
        <table className="w-full text-left text-sm text-primary">
            <thead className="text-xs uppercase text-primary">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                scope="col"
                                className="px-6 py-3"
                                colSpan={header.colSpan}
                            >
                                {header.isPlaceholder ? null : (
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
                                            asc: (
                                                <SvgInline
                                                    path="icons/caret-up.svg"
                                                    title="Sort ascending"
                                                    className="w-2 fill-primary"
                                                />
                                            ),
                                            desc: (
                                                <SvgInline
                                                    path="icons/caret-down.svg"
                                                    title="Sort descending"
                                                    className="w-2 fill-primary"
                                                />
                                            ),
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-b border-secondary">
                        {row.getVisibleCells().map((cell) => (
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
