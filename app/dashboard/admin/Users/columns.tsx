"use client";

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { User } from "@/types";
import ActionsCell from "@/components/User/UsersActionsCell";

export const columns: (props: {
  refreshUsers: () => void;
}) => ColumnDef<User>[] = ({ refreshUsers }) => [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("email")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "courses",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Courses" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        {row.getValue<string[]>("courses").map((course, index, array) => (
          <span key={index}>
            {course}
            {index < array.length - 1 && (
              <>
                ,<br />
              </>
            )}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Added" />
    ),
    cell: ({ row }) => {
      const date: Date = row.getValue("createdAt");
      const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
      return <div className="w-[120px]">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} refreshUsers={refreshUsers} />,
  },
];

