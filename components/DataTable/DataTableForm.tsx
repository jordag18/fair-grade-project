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
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columnKey: string;
  placeholder?: string;
  actions?: (rowSelection: Record<string, boolean>) => React.ReactNode;
  headerHeight?: string;
  onAddNew?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  columnKey,
  placeholder,
  actions,
  headerHeight = "h-12",
  onAddNew,
}: DataTableProps<TData, TValue>) {
  // States for row selection, column visibility, column filters, and sorting.
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // State for editing and adding rows
  const [newRow, setNewRow] = React.useState<Partial<TData> | null>(null);
  const [editingRowId, setEditingRowId] = React.useState<string | null>(null);

  // Table initialization
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

  const formContext = useFormContext();

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
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`border-black border-2 max-w-2 ${headerHeight}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {newRow && (
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id as string}>
                    {renderInputForColumn(
                      column as ColumnDef<TData>,
                      newRow,
                      setNewRow
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <Button onClick={handleSaveNewRow}>Save</Button>
                  <Button onClick={() => setNewRow(null)}>Cancel</Button>
                </TableCell>
              </TableRow>
            )}
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {editingRowId === row.id
                      ? renderInputForColumn(
                          cell.column.columnDef as ColumnDef<TData>,
                          row.original,
                          setNewRow
                        )
                      : flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                  </TableCell>
                ))}
                <TableCell>
                  {editingRowId === row.id ? (
                    <>
                      <Button onClick={handleSaveChanges}>Save</Button>
                      <Button onClick={() => setEditingRowId(null)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setEditingRowId(row.id)}>
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <Button onClick={() => setNewRow({} as Partial<TData>)}>
        Add New Assessment
      </Button>
    </div>
  );

  // Save new row to server
  async function handleSaveNewRow() {
    try {
      console.log("Assessment Creation Data:", newRow);
      //await createInstructorAssessment(newRow);
      setNewRow(null);
      onAddNew && onAddNew(); // Call refresh or other actions
    } catch (error) {
      console.error("Failed to save new assessment:", error);
    }
  }

  // Save changes to the server
  async function handleSaveChanges() {
    try {
      console.log("Assessment Update Data:", editingRowId, newRow);
      //await updateInstructorAssessment(editingRowId, newRow);
      setEditingRowId(null);
      onAddNew && onAddNew(); // Call refresh or other actions
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  }

  // Render input fields based on the column type
  function renderInputForColumn<TData>(
    column: ColumnDef<TData, unknown>,
    rowData: Partial<TData>,
    setRowData: React.Dispatch<React.SetStateAction<Partial<TData> | null>>
  ) {
    // Type guard to check if accessorKey exists
    if ('accessorKey' in column && column.accessorKey) {
      const accessor = column.accessorKey as keyof TData;
  
      if (accessor === "InstrumentName") {
        return (
          <FormField
            control={formContext.control}
            name={`instrumentID`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    type="text"
                    {...field}
                    value={rowData[accessor] as string || ""}
                    onChange={(e) =>
                      setRowData((prev) => ({
                        ...(prev || {}),
                        [accessor]: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      }
  
      if (accessor === "AssessmentDate") {
        return (
          <FormField
            control={formContext.control}
            name={`assessmentDate`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    type="date"
                    {...field}
                    value={rowData[accessor] as string || ""}
                    onChange={(e) =>
                      setRowData((prev) => ({
                        ...(prev || {}),
                        [accessor]: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      }
  
      if (accessor === "Skills") {
        return (
          <ScrollArea className="max-h-96">
            {Array.isArray(rowData[accessor]) &&
              rowData[accessor]?.map(
                (skill: { Score: any }, index: number) => (
                  <div key={index} className="flex items-center">
                    <FormField
                      control={formContext.control}
                      name={`skills.${index}.Score`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input
                              type="number"
                              {...field}
                              value={skill.Score || 0}
                              onChange={(e) => {
                                const newSkills = [...(rowData[accessor] as any[])];
                                newSkills[index].Score = parseInt(e.target.value, 10);
                                setRowData((prev) => ({
                                  ...(prev || {}),
                                  [accessor]: newSkills,
                                }));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )
              )}
          </ScrollArea>
        );
      }
  
      return (
        <FormField
          control={formContext.control}
          name={accessor as any}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  type="text"
                  {...field}
                  value={rowData[accessor] as string || ""}
                  onChange={(e) =>
                    setRowData((prev) => ({
                      ...(prev || {}),
                      [accessor]: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
  
    // Fallback: Handle cases where column does not have accessorKey
    return null;
  }
}
