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

export type CustomColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  headerAlign?: "top" | "center";
};

interface DataTableProps<TData, TValue> {
  columns: CustomColumnDef<TData, TValue>[];
  data: TData[];
  columnKey: string;
  placeholder?: string;
  actions?: (rowSelection: Record<string, boolean>) => React.ReactNode;
  headerHeight?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  columnKey,
  placeholder,
  actions,
  headerHeight = "h-12",
}: DataTableProps<TData, TValue>) {
  //States for row selection, column visibility, column filters, and sorting.
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  //table intialization
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

  return (
    <div className="space-y-4">
      {actions && actions(rowSelection)}
      <DataTableToolbar
        table={table}
        columnKey={columnKey}
        placeholder={placeholder}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader className="border-black border-2">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const align =
                    (header.column.columnDef as CustomColumnDef<TData>)
                      .headerAlign || "center";
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`border-black border-2 h-96 max-w-2 align-${align}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-black border-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
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
