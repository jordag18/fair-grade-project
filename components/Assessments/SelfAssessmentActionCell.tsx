"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
//import { ModifySelfAssessmentDialog } from "./ModifySelfAssessmentDialog";
//import { DeleteSelfAssessmentDialog } from "./DeleteSelfAssessmentDialog";

interface SelfAssessmentActionCellProps {
    row: {
      original: any;
    };
    refreshSelfAssessments: () => void;
  }

const SelfAssessmentActionsCell: React.FC<SelfAssessmentActionCellProps> = ({
    row,
    refreshSelfAssessments,
  }) => {
  const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
              setIsModifyDialogOpen(true);
            }}
          >
            Modify Self-Assessment
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete Self-Assessment
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </Dialog>
  );
};

export default SelfAssessmentActionsCell;
