import { SkillForm, FormSchemaType } from "./SkillForm";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModifySkillDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialData: FormSchemaType;
  refreshSkills: () => void;
}

export function ModifySkillDialog({
  isOpen,
  onOpenChange,
  initialData,
  refreshSkills,
}: ModifySkillDialogProps) {
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
            Modify skill details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <SkillForm
          onFormSubmit={handleFormSubmit}
          initialData={initialData}
          isEditMode={true}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
