"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./DataTablePagnation";
import { DataTableToolbar } from "@/components/DataTable/DataTableToolbar";

export type CustomColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  headerAlign?: "top" | "center";
};

interface DataTableProps<TData, TValue> {
  columns: CustomColumnDef<TData, TValue>[];
  data: TData[];
  columnKey: string;
  placeholder?: string;
  actions?: (rowSelection: Record<string, boolean>) => React.ReactNode;
  headerHeight?: string;
  initialSorting?: { id: string; desc: boolean };
  enableSecondToolbar?: boolean;
  secondColumnKey?: string;
  secondPlaceholder?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  columnKey,
  placeholder,
  actions,
  headerHeight = "h-12",
  initialSorting,
  enableSecondToolbar = false,
  secondColumnKey,
  secondPlaceholder,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting ? [initialSorting] : []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

    // Function to determine the row class based on row data
    const getRowClassName = (row: any) => {
      // Example logic to color rows based on a hypothetical `status` property
      if (row.InstrumentDescription == "Student-Assessment") {
        return "bg-purple-100"; // Apply green background for rows with a SelfAssessmentID
      }
      else if (row.InstrumentDescription == "Assessment") {
        return "bg-blue-100";
      }
      return "bg-white"; // Default background for other rows
    };
  

  return (
    <div className="space-y-4">
      {actions && actions(rowSelection)}
      <div className="flex space-x-2">
        <DataTableToolbar
          table={table}
          columnKey={columnKey}
          placeholder={placeholder}
        />
        {enableSecondToolbar && (
          <DataTableToolbar
            table={table}
            columnKey={secondColumnKey || columnKey}
            placeholder={secondPlaceholder}
          />
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="border-black border-2">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const align = (header.column.columnDef as CustomColumnDef<TData>).headerAlign || "center";
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan} className={`border-black border-2 align-${align} ${headerHeight}`}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className={getRowClassName(row.original)}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-black border-2 p-[1px] flex-col items-center justify-center text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

