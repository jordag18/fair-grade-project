import { User } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModifyUserDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialData: User;
  refreshUsers: () => void;
}

export function ModifyUserDialog({
  isOpen,
  onOpenChange,
  initialData,
  refreshUsers,
}: ModifyUserDialogProps) {
  const handleFormSubmit = () => {
    refreshUsers();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modify User</DialogTitle>
          <DialogDescription>
            Modify user role details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}