"use client";

import { useCourse } from "@/context/CourseContext";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { Dialog } from "../ui/dialog";
import { useState } from "react";
import { ModifyUserDialog } from "./ModifyUserDialog";

interface ActionsCellProps {
  row: any;
  refreshUsers: () => void;
}

const ActionsCell = ({ row, refreshUsers }: ActionsCellProps) => {
  const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { selectedCourse } = useCourse();
  const selectedRow = row.original;

  return (
    <Dialog
      open={isModifyDialogOpen || isDeleteDialogOpen}
      onOpenChange={
        isModifyDialogOpen ? setIsModifyDialogOpen : setIsDeleteDialogOpen
      }
    >
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              console.log("Selected Course:", selectedCourse);
            }}
          >
            Select User
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsModifyDialogOpen(true)}>
            Modify User
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ModifyUserDialog
        isOpen={isModifyDialogOpen}
        onOpenChange={setIsModifyDialogOpen}
        initialData={selectedRow}
        refreshUsers={refreshUsers}
      />
      <DeleteUserDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        userID={selectedRow.UserID}
        refreshUsers={refreshUsers}
      />
    </Dialog>
  );
};

export default ActionsCell;