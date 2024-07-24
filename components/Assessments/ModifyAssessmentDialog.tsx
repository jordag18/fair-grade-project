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

export function ModifyAssessmentDialog({
  isOpen,
  onOpenChange,
  initialData,
  refreshAssessments,
}: ModifyAssessmentDialogProps) {

  const handleFormSubmit = () => {
    refreshAssessments();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modify Assessment</DialogTitle>
          <DialogDescription>
            Modify the details of the assessment below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <AssessmentForm
          onFormSubmit={handleFormSubmit}
          initialData={initialData}
          isEditMode
        />
      </DialogContent>
    </Dialog>
  );
}
