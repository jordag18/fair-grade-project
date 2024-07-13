"use client";

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";

export type User = {
  Email: String;
  Name: string;
  Courses: string[];
  Role: string;
  DateAdded: Date;
};

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "Email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-[200px]">{row.getValue("Email")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("Name")}</div>
    ),
  },
  {
    accessorKey: "Courses",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Courses" />
    ),
    cell: ({ row }) => (
        <div className="w-[80px]">
        {row.getValue<string[]>("Courses").map((course, index, array) => (
          <span key={index}>
            {course}
            {index < array.length - 1 && <>,<br/></>}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "Role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("Role")}</div>
    ),
  },
  {
    accessorKey: "DateAdded",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Added" />
    ),
    cell: ({ row }) => {
        const date: Date = row.getValue("DateAdded");
        const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
        return <div className="w-[120px]">{formattedDate}</div>;
    },
  },
];
