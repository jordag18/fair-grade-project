"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import ActionsCell from "@/components/Course/CourseActionsCell";
import { format } from "date-fns";
import { Course } from "@/types";

const formatDateRange = (startDate: Date, endDate: Date) => {
  const start = format(new Date(startDate), "LLL dd, y");
  const end = format(new Date(endDate), "LLL dd, y");
  return `${start} - ${end}`;
};

//array of column definitions of type Course, determines how each column and cell in the table should be rendered and what data from the DataTable data to be displayed.
export const courseColumns: ColumnDef<Course>[] = [
  {
    accessorKey: "CourseTag",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course Tag" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("CourseTag")}</div>
    ),
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
      <div className="w-[100px]">
        {formatDateRange(row.original.StartDate, row.original.EndDate)}
      </div>
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
