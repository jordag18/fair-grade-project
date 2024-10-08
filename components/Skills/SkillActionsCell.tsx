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
import { DeleteSkillDialog } from "./DeleteSkillDialog";
import { Dialog } from "../ui/dialog";
import { useState } from "react";
import { ModifySkillDialog } from "./ModifySkillDialog";
import { useUserRole } from "@/context/UserRoleContext";
import displayIfRole from "../DisplayIfRole";
import { UserCourseRole } from "@/types";

interface ActionsCellProps {
  row: any;
  refreshSkills: () => void;
}

//Cell for skill data table to display a dropdown menu containing operations on the data table row.
const ActionsCell = ({ row, refreshSkills }: ActionsCellProps) => {
  const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { selectedCourse } = useCourse();
  const selectedRow = row.original;
  const { role } = useUserRole();

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
            Select Skill
          </DropdownMenuItem>
          {/* Dropdown menu item to open the modify skill dialog */}
          {displayIfRole(
            role as UserCourseRole,
            <DropdownMenuItem onClick={() => setIsModifyDialogOpen(true)}>
              Modify Skill
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {/* Dropdown menu item to open the delete skill dialog */}
          {displayIfRole(
            role as UserCourseRole,
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              Delete Skill
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <ModifySkillDialog
        isOpen={isModifyDialogOpen}
        onOpenChange={setIsModifyDialogOpen}
        initialData={selectedRow}
        refreshSkills={refreshSkills}
      />
      <DeleteSkillDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        skillID={selectedRow.SkillID}
        refreshSkills={refreshSkills}
      />
    </Dialog>
  );
};

export default ActionsCell;
