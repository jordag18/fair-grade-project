import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormSchemaType, CourseForm } from "./CourseForm";

interface ModifyCourseDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialData: FormSchemaType;
}

//Dialog component for modifying Course data from selected row
export function ModifyCourseDialog({
  isOpen,
  onOpenChange,
  initialData,
}: ModifyCourseDialogProps) {
  const handleFormSubmit = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-screen overflow-hidden">
        <DialogHeader>
          <DialogTitle>Modify Course</DialogTitle>
          <DialogDescription>
            Modify course details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[75vh]">
          <CourseForm
            onFormSubmit={handleFormSubmit}
            initialData={initialData}
            isEditMode={true}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
