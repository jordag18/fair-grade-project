import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormSchemaType, SkillForm } from "./SkillForm";

interface ModifySkillDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialData: FormSchemaType;
}

export function ModifySkillDialog({
  isOpen,
  onOpenChange,
  initialData,
}: ModifySkillDialogProps) {
  const handleFormSubmit = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modify Skill</DialogTitle>
          <DialogDescription>
            Modify course details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <SkillForm
          onFormSubmit={handleFormSubmit}
          initialData={initialData}
          isEditMode={true}
        />
      </DialogContent>
    </Dialog>
  );
}
