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
import { DeleteCourseDialog } from "./DeleteCourseDialog";
import { Dialog } from "../ui/dialog";
import { useState } from "react";
import { ModifyCourseDialog } from "./ModifyCourseDialog";

//Action dropdown menu for Course DataTable, displays operations for selecting, modifying, and deleting of the course displayed in the selected row
const ActionsCell = ({ row }: { row: any }) => {
  const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { setSelectedCourse, selectedCourse } = useCourse();
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
          <DropdownMenuItem onClick={() => {setSelectedCourse(selectedRow);
          console.log("Selected Course Data: ",  selectedRow)
          }}>
            Select Course
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {setIsModifyDialogOpen(true)
            console.log(selectedRow)
          }}>
            Modify Course
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete Course
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ModifyCourseDialog
        isOpen={isModifyDialogOpen}
        onOpenChange={setIsModifyDialogOpen}
        initialData={selectedRow}
      />
      <DeleteCourseDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        courseID={selectedRow.CourseID}
      />
    </Dialog>
  );
};

export default ActionsCell;

