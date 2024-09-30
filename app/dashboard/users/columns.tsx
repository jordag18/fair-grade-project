/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { User } from "@/types";
import ActionsCell from "@/components/User/UsersActionsCell";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateUserRole } from "@/components/User/UserServerActions"; 
import { UserCourseRole } from "@/types";
import { useCourse } from "@/context/CourseContext";


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
    cell: ({ row }) => {
      const { selectedCourse } = useCourse();
      const currentRole = row.getValue("role");
      const userId = row.original.id;
      const [selectedRole, setSelectedRole] = useState(currentRole);
  
      const handleRoleChange = async (newRole: string) => {
        // Ensure newRole is a valid enum value before proceeding
        if (Object.values(UserCourseRole).includes(newRole as UserCourseRole)) {
          setSelectedRole(newRole);
          console.log("role changed:", newRole);
          await updateUserRole(userId, selectedCourse?.CourseID as string, newRole);
          refreshUsers();
        } else {
          console.error("Invalid role selected:", newRole);
        }
      };
  
      return (
        <Select
          value={selectedRole as string}
          onValueChange={handleRoleChange}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(UserCourseRole).map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
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

