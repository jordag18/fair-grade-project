import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { deleteSelectedSkill } from "./SkillServerActions";
import { toast } from "../ui/use-toast";

interface DeleteSkillDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  skillID: string;
  refreshSkills: () => void;
}

//Dialog component that takes in skillID from row data and refreshSkills callback function from AdminSkillClientPage
export function DeleteSkillDialog({
  isOpen,
  onOpenChange,
  skillID,
  refreshSkills,
}: DeleteSkillDialogProps) {

  //Deletes skill from database using skillID and refreshes skill table post deletion.
  const handleDelete = async () => {
    const response = await deleteSelectedSkill(skillID);
    if (response.success) {
      toast({
        title: "Skill Deleted",
        description: `Skill was deleted successfully.`,
      });
      onOpenChange(false);
      refreshSkills();
    } else {
      toast({
        title: "Error",
        description: `Failed to delete the skill`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the selected skill.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-red-500" onClick={handleDelete}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
