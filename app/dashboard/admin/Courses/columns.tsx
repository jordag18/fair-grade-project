"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { DropdownMenu, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useCourse } from "@/context/CourseContext";
import ActionsCell from "@/components/Course/CourseActionsCell";

export type Course = {
  CourseID: String;
  CourseName: string;
  StartDate: Date;
  EndDate: Date;
  TimeRange: string;
  Location: string;
  Instructor: string;
};
//TODO: Fix row display for start and end date
export const Columns: ColumnDef<Course>[] = [
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
    accessorKey: "CourseID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("CourseID")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "CourseName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("CourseName")}</div>
    ),
  },
  {
    accessorKey: "DateRange",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Range" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("DateRange")}</div>
    ),
  },
  {
    accessorKey: "TimeRange",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time Range" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("TimeRange")}</div>
    ),
  },
  {
    accessorKey: "Location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("Location")}</div>
    ),
  },
  {
    accessorKey: "Instructor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instructor" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("Instructor")}</div>
    ),
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];
