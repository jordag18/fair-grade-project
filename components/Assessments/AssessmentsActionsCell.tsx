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
import { DeleteAssessmentDialog } from "./DeleteAssessmentDialog";
import { Dialog } from "../ui/dialog";
import { useState } from "react";
import { ModifyAssessmentDialog } from "./ModifyAssessmentDialog";

interface ActionsCellProps {
  row: any;
  refreshAssessments: () => void;
}

const ActionsCell = ({ row, refreshAssessments }: ActionsCellProps) => {
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
            Select Assessment
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsModifyDialogOpen(true)}>
            Modify Assessment
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete Assessment
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ModifyAssessmentDialog
        isOpen={isModifyDialogOpen}
        onOpenChange={setIsModifyDialogOpen}
        initialData={selectedRow}
        refreshAssessments={refreshAssessments}
      />
      <DeleteAssessmentDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        assessmentID={selectedRow.AssessmentID}
        refreshAssessments={refreshAssessments}
      />
    </Dialog>
  );
};

export default ActionsCell;