import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormSchemaType, CreateCourseForm } from "./CourseForm";

interface ModifyCourseDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialData: FormSchemaType;
}

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modify Course</DialogTitle>
          <DialogDescription>
            Modify course details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <CreateCourseForm
          onFormSubmit={handleFormSubmit}
          initialData={initialData}
          isEditMode={true}
        />
      </DialogContent>
    </Dialog>
  );
}
