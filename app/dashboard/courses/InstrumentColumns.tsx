import { ColumnDef } from "@tanstack/react-table";
import { Skill } from "@/types";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import InstrumentActionCell from "@/components/Instrument/InstrumentActionCell";
interface Instrument {
    InstrumentID: string;
    InstrumentName: string;
    CreatedBy: string;
    CourseID: string;
    Skills: Skill[];
    CreatedAt: Date;
    UpdatedAt: Date;
  }

  export const instrumentColumns: (
    refreshInstruments: () => void
  ) => ColumnDef<Instrument>[] = (refreshInstruments) => [
    {
      accessorKey: "InstrumentName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Instrument Name" />
      ),
      cell: ({ row }) => <div>{row.getValue("InstrumentName")}</div>,
    },
    {
      accessorKey: "CreatedBy",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created By" />
      ),
      cell: ({ row }) => <div>{row.getValue("CreatedBy")}</div>,
    },
    {
      accessorKey: "CreatedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => <div>{new Date(row.getValue("CreatedAt")).toLocaleString()}</div>,
    },
    {
      accessorKey: "UpdatedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Updated At" />
      ),
      cell: ({ row }) => <div>{new Date(row.getValue("UpdatedAt")).toLocaleString()}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <InstrumentActionCell row={row} refreshInstruments={refreshInstruments} />,
    },
  ];
