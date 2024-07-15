"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { format } from "date-fns";

export type Assessment = {
  CoachName: String;
  StudentName: String;
  Comment: String;
  Instrument: String;
  DateCreated: Date;
};

export const columns: ColumnDef<Assessment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "CoachName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coach" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("CoachName")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "StudentName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("StudentName")}</div>
    ),
  },
  {
    accessorKey: "Comment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comment" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("Comment")}</div>
    ),
  },
  {
    accessorKey: "Instrument",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instrument" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("Instrument")}</div>
    ),
  },
  {
    accessorKey: "DateCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      const date: Date = row.getValue("DateCreated");
      const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
      return <div className="w-[120px]">{formattedDate}</div>;
    },
  },
];
