import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { deleteAssessment } from "./AssessmentServerActions";
import { toast } from "../ui/use-toast";

interface DeleteAssessmentDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  assessmentID: string;
  refreshAssessments: () => void;
}

//dialog component for deleting a assessment in the selected row of the assessment data table.
export function DeleteAssessmentDialog({
  isOpen,
  onOpenChange,
  assessmentID,
  refreshAssessments,
}: DeleteAssessmentDialogProps) {

  const handleDelete = async () => {
    const response = await deleteAssessment(assessmentID);
    if (response.success) {
      toast({
        title: "Assessment Deleted",
        description: `Assessment was deleted successfully.`,
      });
      onOpenChange(false);
      refreshAssessments();
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
            This action cannot be undone. This will permanently delete the selected assessment.
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
