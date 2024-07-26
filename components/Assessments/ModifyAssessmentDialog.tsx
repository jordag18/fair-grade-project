"use client";

import { AssessmentForm, FormSchemaType } from "./AssessmentForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ModifyAssessmentDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialData: FormSchemaType;
  refreshAssessments: () => void;
}

//Dialog for modifying an existing assessment in the selected row of the assessment data table.
export function ModifyAssessmentDialog({
  isOpen,
  onOpenChange,
  initialData,
  refreshAssessments,
}: ModifyAssessmentDialogProps) {

  //uses callback function refreshAssessment from AssessmentClientPage to refresh assessment data table on form submission and close dialog
  const handleFormSubmit = () => {
    refreshAssessments();
    onOpenChange(false);
  };
  console.log("modify dialog inital data: ", initialData)

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modify Assessment</DialogTitle>
          <DialogDescription>
            Modify the details of the assessment below. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <AssessmentForm
          onFormSubmit={handleFormSubmit}
          initialData={initialData}
          isEditMode={true}
        />
      </DialogContent>
    </Dialog>
  );
}
