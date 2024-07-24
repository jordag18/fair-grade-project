import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { deleteUser } from "./UserServerActions";
import { toast } from "../ui/use-toast";

interface DeleteUserDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  userID: string;
  refreshUsers: () => void;
}

export function DeleteUserDialog({
  isOpen,
  onOpenChange,
  userID,
  refreshUsers,
}: DeleteUserDialogProps) {
  const handleDelete = async () => {
    const response = await deleteUser(userID);
    if (response.success) {
      toast({
        title: "User Deleted",
        description: `User was deleted successfully.`,
      });
      onOpenChange(false);
      refreshUsers();
    } else {
      toast({
        title: "Error",
        description: `Failed to delete the user`,
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
            This action cannot be undone. This will permanently delete the selected user.
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