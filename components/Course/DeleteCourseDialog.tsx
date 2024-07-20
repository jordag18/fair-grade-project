import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { deleteSelectedCourse } from "./CourseServerActions";
import { toast } from "../ui/use-toast";

interface DeleteCourseDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  courseID: string;
}


export function DeleteCourseDialog({
  isOpen,
  onOpenChange,
  courseID,
}: DeleteCourseDialogProps) {
  const handleDelete = async () => {
    const response = await deleteSelectedCourse(courseID);
    if (response.success) {
      toast({
        title: "Course Deleted",
        description: `Course was deleted successfully.`,
      });
      onOpenChange(false);
    } else {
      toast({
        title: "Error",
        description: `Failed to delete the course`,
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
            This action cannot be undone. This will permanently delete the selected course.
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
