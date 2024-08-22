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
import { useUserRole } from "@/context/UserRoleContext";
import displayIfRole from "../DisplayIfRole";
import { UserCourseRole } from "@/types";
import { AssessmentDetailDialog } from "./AssessmentDetailDialog";

interface ActionsCellProps {
  row: any;
  refreshAssessments: () => void;
}

//Cell for assessment data table to display a dropdown menu containing operations on the data table row.
const ActionsCell = ({ row, refreshAssessments }: ActionsCellProps) => {
  const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const { selectedCourse } = useCourse();
  const selectedRow = row.original;
  const { role } = useUserRole();

  return (
    <Dialog
      open={isModifyDialogOpen || isDeleteDialogOpen || isDetailDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          setIsModifyDialogOpen(false);
          setIsDeleteDialogOpen(false);
          setIsDetailDialogOpen(false);
        }
      }}
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
              setIsDetailDialogOpen(true);
              console.log("Selected Row Data: ", selectedRow);
            }}
          >
            Select Assessment
          </DropdownMenuItem>
          {displayIfRole(
            role as UserCourseRole,
            <DropdownMenuItem
              onClick={() => {
                setIsModifyDialogOpen(true);
                console.log("selected row: ", selectedRow);
              }}
            >
              Modify Assessment
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {displayIfRole(
            role as UserCourseRole,
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              Delete Assessment
            </DropdownMenuItem>
          )}
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
      <AssessmentDetailDialog
        isOpen={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen} 
        assessment={selectedRow}
      />
    </Dialog>
  );
};

export default ActionsCell;
