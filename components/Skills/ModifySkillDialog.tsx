import { SkillForm, FormSchemaType } from "./SkillForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModifySkillDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialData: FormSchemaType;
  refreshSkills: () => void;
}

//Dialog component for modifying a skill using the initial data from the table row
export function ModifySkillDialog({
  isOpen,
  onOpenChange,
  initialData,
  refreshSkills,
}: ModifySkillDialogProps) {

  //uses refreshSkills callback function from AdminSkillClient page to refresh skill data table after form submission and close dialog
  const handleFormSubmit = () => {
    refreshSkills();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modify Skill</DialogTitle>
          <DialogDescription>
            Modify skill details here. Click save when you&apos;re done.
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
