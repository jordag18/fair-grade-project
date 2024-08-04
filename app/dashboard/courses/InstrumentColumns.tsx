import { ColumnDef } from "@tanstack/react-table";
import { Skill } from "@/types";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";

interface Instrument {
    InstrumentID: string;
    InstrumentName: string;
    CreatedBy: string;
    CourseID: string;
    Skills: Skill[];
    CreatedAt: Date;
    UpdatedAt: Date;
  }

export const instrumentColumns: ColumnDef<Instrument>[] = [
  {
    accessorKey: "InstrumentName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instrument Name" />
    ),
    cell: ({ row }) => <div className="w-[150px]">{row.getValue("InstrumentName")}</div>,
  },
  {
    accessorKey: "CreatedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
    cell: ({ row }) => <div className="w-[150px]">{row.getValue("CreatedBy")}</div>,
  },
  {
    accessorKey: "CourseID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course ID" />
    ),
    cell: ({ row }) => <div className="w-[150px]">{row.getValue("CourseID")}</div>,
  },
  {
    accessorKey: "CreatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => <div className="w-[150px]">{row.getValue("CreatedAt")}</div>,
  },
  {
    accessorKey: "UpdatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => <div className="w-[150px]">{row.getValue("UpdatedAt")}</div>,
  },
];
